/* يومك حلو — طبقة Firebase (المصادقة + Firestore + الإشعارات) */
import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import{getAuth,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,signInWithRedirect,getRedirectResult,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,signOut as fbSignOut,updateProfile}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{initializeFirestore,persistentLocalCache,persistentMultipleTabManager,getFirestore,doc,getDoc,setDoc,deleteDoc,collection,getDocs,addDoc,onSnapshot,query,where,orderBy,limit,arrayUnion,arrayRemove}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import{getMessaging,getToken,isSupported,onMessage}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const C=window.YH_CONFIG||{};
export const ok=!!C.apiKey&&String(C.apiKey).indexOf("YOUR_")<0;
const ADMIN=String(C.adminEmail||"ahmed.eskhlil@gmail.com").toLowerCase();
let app,auth,db;
if(ok){
  app=initializeApp(C.firebase||C);
  auth=getAuth(app);
  try{db=initializeFirestore(app,{localCache:persistentLocalCache({tabManager:persistentMultipleTabManager()})})}catch(e){db=getFirestore(app)}
  getRedirectResult(auth).catch(()=>{});
}
const clean=o=>JSON.parse(JSON.stringify(o));
const nop=()=>{};

/* ---------- المصادقة ---------- */
export const isAdmin=u=>!!(u&&u.email&&u.emailVerified&&u.email.toLowerCase()===ADMIN);
export const onAuth=cb=>onAuthStateChanged(auth,async u=>{if(u&&!u.emailVerified){try{await u.reload()}catch(e){}}cb(auth.currentUser)});
export const signInEmail=(e,p)=>signInWithEmailAndPassword(auth,e,p);
export async function register(email,pw,name){
  const r=await createUserWithEmailAndPassword(auth,email,pw);
  try{await updateProfile(r.user,{displayName:name})}catch(e){}
  try{await sendEmailVerification(r.user)}catch(e){}
  return r.user;
}
export async function google(){
  const p=new GoogleAuthProvider();
  try{await signInWithPopup(auth,p)}
  catch(e){
    if(e.code==="auth/popup-blocked"||e.code==="auth/operation-not-supported-in-this-environment")await signInWithRedirect(auth,p);
    else throw e;
  }
}
export const resetPassword=e=>sendPasswordResetEmail(auth,e);
export const signOut=()=>fbSignOut(auth);

/* ---------- الملف الشخصي والأيام ---------- */
export function watchProfile(uid,cb){return onSnapshot(doc(db,"users",uid),s=>cb(s.exists()?s.data():null),e=>cb(null,e))}
export const createProfile=(uid,d)=>setDoc(doc(db,"users",uid),clean(d));
export const saveProfile=(uid,d)=>setDoc(doc(db,"users",uid),clean(d),{merge:true});
export async function loadDays(uid){const s=await getDocs(collection(db,"users",uid,"days"));return s.docs.map(d=>({id:d.id,...d.data()}))}
export const saveDay=(uid,id,d)=>setDoc(doc(db,"users",uid,"days",id),clean(d));
export const saveStats=(uid,d)=>setDoc(doc(db,"stats",uid),clean(d));

/* ---------- المجتمع والرسائل والترتيب ---------- */
export function watchStats(cb){return onSnapshot(collection(db,"stats"),s=>{const m={};s.forEach(d=>m[d.id]=d.data());cb(m)},nop)}
export function watchUsers(cb){return onSnapshot(collection(db,"users"),s=>{const m={};s.forEach(d=>m[d.id]=d.data());cb(m)},nop)}
export function watchPosts(cb){return onSnapshot(query(collection(db,"posts"),orderBy("createdAt","desc"),limit(60)),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),nop)}
export const addPost=p=>addDoc(collection(db,"posts"),clean({...p,createdAt:Date.now()}));
export const toggleLike=(id,uid,has)=>setDoc(doc(db,"posts",id),{likes:has?arrayRemove(uid):arrayUnion(uid)},{merge:true});
export const delPost=id=>deleteDoc(doc(db,"posts",id));
export function watchNotifs(uid,cb){return onSnapshot(query(collection(db,"notifications"),where("to","in",["all",uid]),limit(60)),s=>cb(s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>b.createdAt-a.createdAt)),nop)}
export const sendNotif=n=>addDoc(collection(db,"notifications"),clean({...n,createdAt:Date.now()}));

/* ---------- المدير ---------- */
export const setStatus=(uid,status)=>setDoc(doc(db,"users",uid),{status},{merge:true});
export async function getUow(){try{const s=await getDoc(doc(db,"config","uow"));return s.exists()?s.data():null}catch(e){return null}}
export const setUow=o=>setDoc(doc(db,"config","uow"),clean(o));
export const saveReport=(date,d)=>setDoc(doc(db,"dailyReports",date),clean(d));

/* ---------- Push (FCM) ---------- */
export async function enablePush(uid,payload){
  try{
    if(!(await isSupported()))return{ok:false,msg:"المتصفح ده مش بيدعم الإشعارات. على الآيفون لازم تثبّت التطبيق على الشاشة الرئيسية الأول (iOS 16.4+)."};
    if(!C.vapidKey||String(C.vapidKey).indexOf("YOUR_")>=0)return{ok:false,msg:"مفتاح VAPID مش مضبوط في config.js"};
    const perm=await Notification.requestPermission();
    if(perm!=="granted")return{ok:false,msg:"الإذن اترفض. فعّله من إعدادات المتصفح."};
    const reg=await navigator.serviceWorker.ready;
    const token=await getToken(getMessaging(app),{vapidKey:C.vapidKey,serviceWorkerRegistration:reg});
    await setDoc(doc(db,"fcmTokens",uid),Object.assign(clean(payload),{tokens:arrayUnion(token)}),{merge:true});
    return{ok:true,msg:"اتفعلت الإشعارات ✅"};
  }catch(e){return{ok:false,msg:"تعذر تفعيل الإشعارات: "+(e.code||e.message)}}
}
export const savePush=(uid,payload)=>setDoc(doc(db,"fcmTokens",uid),clean(payload),{merge:true}).catch(nop);
export function onPush(cb){isSupported().then(s=>{if(s&&ok)onMessage(getMessaging(app),cb)}).catch(nop)}
