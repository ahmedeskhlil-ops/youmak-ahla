/* يومك حلو — منطق التطبيق والواجهة */
import {D} from "./data.js";
import * as P from "./platform.js";
var ORDER=["sat","sun","mon","tue","wed","thu","fri"],GID=["sun","mon","tue","wed","thu","fri","sat"],DM={},UID="",AUSER=null,IS_ADMIN=false,U=null,S=null,view="auth",authMode="login",pend="",msg="",wo=0,bkTxt="",ad="dash",adu="",stuckN=3,ALLU={},ALLS={},NOTIFS=[],POSTS=[],UOW=null,loading=true,dirtyD={},dirtyP=false,tmr=0,PUSH_ON=false,prevPend=null,UNS=[],PROF_UNSUB=null,now=new Date(),todayId=GID[now.getDay()],cur=todayId,wk=new Date(now.getFullYear(),now.getMonth(),now.getDate()-(now.getDay()+1)%7);
var GL={lose:"تنزيل وزن مع بناء عضلات",keep:"ثبات وزن مع بناء عضلات",fit:"صحة ولياقة عامة"},GD={lose:"البرنامج كامل: 4 أيام تمرين، وعجز سعرات معتدل حسب سنك.",keep:"4 أيام بتمارين أقل + وجبة خفيفة إضافية، والسعرات على الثبات.",fit:"3 أيام تمرين بتمارين أقل + وجبتين خفيفتين، والسعرات على الثبات."};
var CITY={riyadh:["الرياض",24.71,46.68,"u"],jeddah:["جدة",21.54,39.17,"u"],makkah:["مكة",21.42,39.83,"u"],madinah:["المدينة",24.47,39.61,"u"],dammam:["الدمام",26.43,50.1,"u"],dubai:["دبي",25.2,55.27,"u"],kuwait:["الكويت",29.38,47.98,"u"],doha:["الدوحة",25.29,51.53,"u"],cairo:["القاهرة",30.04,31.24,"e"],ismailia:["الإسماعيلية",30.59,32.27,"e"],alex:["الإسكندرية",31.2,29.92,"e"],amman:["عمّان",31.95,35.93,"e"],istanbul:["إسطنبول",41.01,28.98,"t"],ankara:["أنقرة",39.93,32.86,"t"]};
var FC=[["وجبات سريعة",[350,650,1000]],["مشروبات غازية",[140,200,350]],["مخبوزات",[250,400,600]],["حلويات",[200,350,550]],["مقليات",[250,450,700]],["أكل صحي (فاكهة / خضار / بروتين)",[100,200,300]]],SZ=["وجبة صغيرة","وجبة متوسطة","وجبة كبيرة"];
var XA=[["تسوق 🛒",2.5,"🛒"],["مشي بالهواء 🚶",3.5,"🚶"],["ركوب دراجة 🚴",6,"🚴"],["لعب كرة ⚽",7,"⚽"],["نط حبل 🪢",11,"🪢"],["ترتيب المنزل 🧹",3.3,"🧹"],["ضغط (Push-ups) 10 مرات × 3",4,"💪"],["بلانك ثبات 30 ثانية × 3",3.5,"💪"],["باي سبس بالبار 12 عدة × 2",4,"💪"],["نشاط آخر (اكتب اسمه)",3.5,"⭐",1]];
var SEC=[["🌅 الصحيان والصلاة","الصلاة في وقتها حركة لكل أعضاء جسمك، وورد القرآن ولو صفحة."],["🏋️ التمرين (ساعة بالكتير)",""],["🍳 الفطار والمكملات",""],["☀️ نهار اليوم والظهر",""],["🌤 العصر والمغرب",""],["🌙 المساء والنوم",""]];
var BWP=[["","press","ضغط أرضي","3 × 8–15","60 ث","إيدك أعرض من كتفك شوية|جسمك خط مستقيم|انزل عد 3 وادفع لفوق","لو صعب: ركبتك على الأرض."],["","squat","قعود بوزن الجسم (Squat)","3 × 12–20","60 ث","رجليك بعرض كتفك|انزل كأنك هتقعد على كرسي وضهرك مفرود|ازفر وإنت طالع","انزل في مدى من غير ألم."],["","dead","بلانك ثبات","3 × 30 ثانية","45 ث","كوعك تحت كتفك|جسمك خط مستقيم وبطنك مشدودة|تنفس عادي","لو صعب: ركبتك على الأرض."],["","bridge","رفع الحوض (Glute Bridge)","3 × 12–15","45 ث","نام على ضهرك وركبتك مثنية|ارفع حوضك واضغط على المؤخرة|انزل عد 3",""]];
var RST={wed:["🚶","مشي 30–40 دقيقة {T} بسرعة مريحة وتقدر تتكلم وإنت ماشي. بعده 5 دقايق تمدد: صدر وكتف وفخذ قدام وورا، 30 ثانية لكل واحد.",35],sat:["🚶","مشي سريع 30–40 دقيقة {T}. بعده 10 دقايق تمدد: صدر وكتف وفخذ وورك، 30 ثانية لكل واحد.",40],sun:["🛌","راحة كاملة. لو حبيت: 10 دقايق تمدد خفيف أو مشي هادي 15 دقيقة.",15]};
var QT=["ما تكسلش.. شد حيلك! كل تمرين النهاردة استثمار في جسمك بكرة.","خليك قوي: اللي هينفعك مع تقدم العمر هو اللي بتعمله في جسمك النهاردة.","لما تبقى قوي ومتوازن وجسمك كويس مهما كبرت، هتقدر تقيم عبادتك وعمرك ما تكسل ولا تستنى خدمة من حد.","«المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف» (حديث شريف).","ما تهملش دلوقتي وتستنى العون من حد.. السن ما بيرحمش، لكن كن إنت العون للجميع وما تكسلش.","خليك جامد لآخر يوم 💪","الصلاة في وقتها حركة لكل أعضاء جسمك: قيام وركوع وسجود. حافظ عليها وعلى ورد القرآن ولو صفحة.","الاستمرارية أهم من الكمال: يوم ناقص أحسن من يوم ضايع.","النوم 7–8 ساعات جزء من التمرين، مش رفاهية.","كل زجاجة مية بتشربها النهاردة بتدعم تركيزك وطاقتك."];
var FLT='<p class="fl">🎯 قرّب من الفشل العضلي من غير ما توصله (سيب 1–3 عدات)، والعدة بطيئة: نزول عد 3. لا تتسرع.</p>';
var RULES='<details class="tip"><summary><b>📌 قواعد التمرين المنزلي</b></summary><ol><li>اختار وزن الدمبل أو البار على قدرتك، وابدأ خفيف وتدرّج.</li><li>لما الوزن يبقى خفيف، زوّده باعتدال (1–2.5 كجم) وغيّره من ملفك عشان الروتين يتظبط عليه.</li><li>قرّب من الفشل العضلي من غير ما توصله: وقّف وفاضل عدة لـ 3 عدات.</li><li>العدة بطيئة ومتحكم فيها: انزل عد 3 ولا تتسرع.</li><li>هدفنا اللياقة والصحة والحفاظ على النعمة وجودة الحياة، مش بطولات.</li></ol></details>';
D.forEach(function(d){DM[d.id]=d});
function dateOf(id,o){return new Date(wk.getFullYear(),wk.getMonth(),wk.getDate()+ORDER.indexOf(id)+7*(o||0))}
function fmt(x){return x.toLocaleDateString("ar-EG",{day:"numeric",month:"short"})}
function tm(s){var p=s.split(":");return+p[0]*60+ +p[1]}
function hm(m){m=((Math.round(m)%1440)+1440)%1440;return("0"+Math.floor(m/60)).slice(-2)+":"+("0"+m%60).slice(-2)}
function lastW(u){var k=Object.keys(u.wl).sort();return k.length?u.wl[k[k.length-1]]:0}
function wkey(){return ds(dateOf(U.wd||"fri",0))}
function lv(p){return p>=90?["ممتاز 🌟","أداء رائع النهاردة! كمّل بنفس الحماس.","أسبوع مبهر! التزامك بيبني عادة قوية."]:p>=75?["جيد جدًا 👏","قربت جدًا من الكمال، شد حيلك شوية كمان.","أسبوع قوي جدًا، استمر وهتوصل."]:p>=50?["جيد 👍","بداية حلوة، وبكرة أحسن بإذن الله.","أسبوع كويس، حاول تزود التزامك الأسبوع الجاي."]:p>=25?["مقبول 💪","كل خطوة بتفرق، ما تقلقش وكمّل.","الأسبوع ده كان صعب، والأسبوع الجاي فرصة جديدة."]:["ابدأ بقوة 🚀","النهاردة فرصة جديدة، ابدأ بخطوة صغيرة.","ابدأ الأسبوع الجاي بخطة بسيطة وخطوة ثابتة."]}
function pray(dt,c){var R=Math.PI/180,tz=-dt.getTimezoneOffset()/60,D2=Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate(),12)/864e5+2440587.5-2451545,g=(357.529+0.98560028*D2)*R,q=280.459+0.98564736*D2,L=(q+1.915*Math.sin(g)+0.02*Math.sin(2*g))*R,e=(23.439-3.6e-7*D2)*R,ra=(Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L))/R/15+24)%24,dec=Math.asin(Math.sin(e)*Math.sin(L)),eq=((q/15)%24+24)%24-ra;
 if(eq>12)eq-=24;if(eq<-12)eq+=24;var la=c[1]*R,noon=12+tz-c[2]/15-eq;
 function ang(a){var v=(-Math.sin(a*R)-Math.sin(dec)*Math.sin(la))/(Math.cos(dec)*Math.cos(la));return Math.acos(Math.max(-1,Math.min(1,v)))/R/15}
 var as=Math.acos((Math.sin(Math.atan(1/(1+Math.tan(Math.abs(la-dec)))))-Math.sin(dec)*Math.sin(la))/(Math.cos(dec)*Math.cos(la)))/R/15,mg=noon+ang(0.833);
 return{fajr:Math.round((noon-ang(c[3]=="e"?19.5:c[3]=="t"?18:18.5))*60),dhuhr:Math.round((noon+0.03)*60),asr:Math.round((noon+as)*60),maghrib:Math.round(mg*60),isha:Math.round((c[3]=="e"?noon+ang(17.5):c[3]=="t"?noon+ang(17):mg+1.5)*60)}}
function bmr(u){return 10*(lastW(u)||70)+6.25*u.h-5*u.a+(u.sx=="f"?-161:5)}
function kc(m,n){return Math.round(m*(lastW(U)||70)*n/60)}
function need(n){return/عقلة/.test(n)?"pu":/بالبار|بار /.test(n)?"bb":/دمبل|رفرفة|هامر|تراي|لنج/.test(n)?"db":"bw"}
function gd(id){var d=DM[id],g=U?U.g:"lose";
 if(g=="fit"&&id=="fri")return Object.assign({},d,{k:"r",t:"راحة نشطة — مشي خفيف",s:"من غير أوزان",i:DM.wed.i,ex:[]});
 if(g!="lose"&&d.ex.length>4)return Object.assign({},d,{ex:d.ex.slice(0,d.ex.length-(g=="fit"?2:1))});
 return d}
function exs(d){var e=U.eq||{},r=[],tot=0;
 function add(x,id){var q=Math.max(3,Math.round((parseInt(x[3])||3)*(45+(parseInt(x[4])||60))/60));if(tot+q>50)return;tot+=q;r.push({id:id,i:x[1],n:x[2],r:x[3],rest:x[4],st:(x[5]||"").split("|"),note:x[6]||"",tool:x.tl||"وزن الجسم",min:q,kc:kc(4,q)})}
 d.ex.forEach(function(x,i){var id=d.id+"-e"+i;if((S.del[d.id]||[]).indexOf(id)>=0)return;var nd=need(x[2]),y=x.slice();
  if(nd=="pu"){if(!e.pu)return;y.tl="العقلة"}else if(nd=="db"){if(!e.db)return;y.tl="دمبل "+e.db+" كجم × 2"}else if(nd=="bb"){if(e.bb)y.tl="بار "+e.bb+" كجم";else if(e.db){y[2]=y[2].replace(/بالبار/g,"بالدمبل");y.tl="دمبل "+e.db+" كجم × 2"}else return}
  add(y,id)});
 if(d.k!="r")BWP.forEach(function(b,j){var id=d.id+"-b"+j;if(r.length<4&&(S.del[d.id]||[]).indexOf(id)<0)add(b,id)});
 return r}
function plan(d){var u=U,tr=d.k!="r",E=tr?exs(d):[],bp=0,rs=null,g=u.g,sp=u.sp;
 E.forEach(function(x){bp+=x.kc});
 if(!tr){var z=RST[d.id]||RST.wed;rs={ic:z[0],x:z[1].replace("{T}",u.eq.tm?"على التريدميل (سرعة 5–6 كم/س وميل 3–5%)":"عادي (بره البيت أو جوه)"),kc:kc(d.id=="sun"?2.5:3.5,z[2])};bp=rs.kc}
 var base=Math.round(bmr(u)*1.25),ref=base+bp,pc=g=="lose"?(u.a>=60?0.12:u.a>=50?0.17:0.2):0,tg=Math.min(ref,Math.max(u.sx=="f"?1200:1500,Math.round(ref*(1-pc)/10)*10)),sh={bk:0.23,lu:0.26,dn:0.34,ev:0.09},mk={},t=0,k;
 if(g=="fit")sh.am=0.07;if(g!="lose")sh.pm=0.07;if(u.a>=50)sh.dy=0.06;
 var bud=Math.max(0,tg-130-(sp.pr?130:0));for(k in sh)t+=sh[k];for(k in sh)mk[k]=Math.round(bud*sh[k]/t/5)*5;
 return{E:E,rs:rs,base:base,ref:ref,tg:tg,tdef:ref-tg,mk:mk}}
function sched(d,o,P){var u=U,W=tm(u.wk||"07:00"),pr=pray(dateOf(d.id,o),CITY[u.city]||CITY.riyadh),tr=d.k!="r",g=u.g,sp=u.sp,eq=u.eq,mk=P.mk,sc=[[],[],[],[],[],[]];
 function A(s,t,id,ic,x,p){var r={id:id,t:t,ic:ic,x:x};if(p)for(var k in p)r[k]=p[k];sc[s].push(r)}
 A(0,pr.fajr,"fj","🕌","صلاة الفجر في وقتها (قبل الشروق)",{k:"pr"});
 A(0,W,"wk","⏰","الصحيان");
 A(0,W+5,"dr","💧","كوب مية فاتر + معلقة زيت زيتون + عصرة لمون (على الريق)",{k:"fx",i:130});
 A(0,W+15,"qr","📖","ورد قرآني يومي (ولو صفحة)",{k:"q"});
 [[20,0],[95,1],[150,2],[240,3],[330,3],[450,4],[540,4],[620,4],[700,5],[780,5]].forEach(function(b,i){A(b[1],W+b[0],"b"+i,"💧","زجاجة مية 300 مل (رقم "+(i+1)+" من 10)",{k:"w"})});
 if(tr){var t=W+30;A(1,t,"wu","🔥","إحماء 5 دقايق: حركة مفاصل + "+(eq.tm?"تريدميل بميل خفيف":"مشي في المكان")+" + مجموعة خفيفة من أول تمرين");t+=5;P.E.forEach(function(x){A(1,t,x.id,x.i,x.n,{k:"ex",ex:x});t+=x.min});A(1,t,"st","🧘","تمدد 5 دقايق لكل العضلات اللي اشتغلت")}
 else A(1,W+30,"rs",P.rs.ic,P.rs.x,{out:P.rs.kc});
 if(sp.pr)A(2,W+100,"pr","🥤","واي بروتين (نوع جيد ومضمون)",{k:"fx",i:130});
 if(sp.cr)A(2,W+100,"cr","💊","كرياتين مونوهيدرات 5 جم",{k:"sp"});
 A(2,W+105,"bk","🍳","الفطار: 2 بيض + خبز بر محمص + جبنة + قهوة (بعد الأكل)",{k:"ml",i:mk.bk});
 A(2,W+110,"d3","💊","فيتامين D3 5000 + B12 (مع الفطار)",{k:"sp"});
 var lt=Math.max(W+270,Math.min(W+390,pr.asr-25));
 A(3,W+210,"t1","🍵","شاي أخضر (مرة)",{k:"sp"});
 if(g=="fit")A(3,W+235,"am","🥛","وجبة خفيفة: زبادي + حفنة مكسرات (لوز أو جوز)",{k:"ml",i:mk.am});
 A(3,pr.dhuhr,"dh","🕌","صلاة الظهر",{k:"pr"});
 A(3,lt,"lu","🥗","الغدا: 2 بيض + سلطة + خبز بر محمص",{k:"ml",i:mk.lu});
 A(3,lt+10,"zn","💊","زنك 22 مج (بيكولينات) بعد الغدا",{k:"sp"});
 A(4,pr.asr,"as","🕌","صلاة العصر",{k:"pr"});
 if(u.a>=50)A(4,pr.asr+15,"dy","🥛","كوب لبن أو زبادي (كالسيوم وبروتين للعظام)",{k:"ml",i:mk.dy});
 if(g!="lose")A(4,pr.asr+40,"pm","🍎","وجبة خفيفة: فاكهة + بيضة مسلوقة أو جبنة قريش",{k:"ml",i:mk.pm});
 A(4,pr.asr+60,"t2","🍵","شاي أخضر (مرة تانية، اختياري)",{k:"op"});
 A(4,pr.maghrib,"mg","🕌","صلاة المغرب",{k:"pr"});
 A(5,Math.max(W+660,pr.maghrib+20),"dn","🍗","الوجبة الرئيسية: لحمة أو فراخ أو سمك + خضار مطبوخ + رز أو خبز بر",{k:"ml",i:mk.dn});
 A(5,Math.max(W+700,pr.maghrib+60),"ev","🍎","حبتين فاكهة مختلفتين أو حبة بطاطا",{k:"ml",i:mk.ev});
 A(5,pr.isha,"is","🕌","صلاة العشاء",{k:"pr"});
 A(5,W+900,"pn","📵","جهّز للنوم: قلل الإضاءة والشاشات");
 A(5,W+960,"sl","😴","النوم 7–8 ساعات");
 sc.forEach(function(s){s.sort(function(a,b){return a.t-b.t})});return sc}
function stats(d,o){d=gd(d.id);var dt=ds(dateOf(d.id,o)),P=plan(d),sc=sched(d,o,P),dn=S.done[dt]||{},sn=S.sets[dt]||{},a=0,b=0,c=0,e=0,x=0,wn=0,wd=0,mt=0,mc=0,inn=0,bu=0;
 sc.forEach(function(s){s.forEach(function(r){var ck=dn[r.id];if(r.k=="ex")return;if(r.k=="w"){wn++;if(ck)wd++;return}if(r.k=="op")return;a++;if(ck){b++;inn+=r.i||0;bu+=r.out||0}if(r.k=="ml"){mt++;if(ck)mc++}})});
 P.E.forEach(function(q){c++;var v=Math.max(0,sn[q.id]||0);e+=v;bu+=v*q.kc});
 (S.ex[dt]||[]).forEach(function(q){var v=Math.max(0,sn[q.id]||0);x+=v*q.min/30;bu+=v*kc(q.met,q.min)});
 (S.food[dt]||[]).forEach(function(f){inn+=f.kc});
 var t=a+c+2,comp=Math.max(0,Math.min(100,Math.round((b+e+x+2*wd/wn)*100/t))),def=Math.round(P.base+bu-inn),past=dateOf(d.id,o)<new Date(now.getFullYear(),now.getMonth(),now.getDate()),cs=comp,g=U.g;
 if((past||mc/mt>=0.7)&&mc){if(g=="lose"){var r=P.tdef?def/P.tdef:0;cs=r<=0?0:r<1?r*100:r<=1.4?100:Math.max(0,100-(r-1.4)*150)}else{var ab=Math.abs(def);cs=ab<=200?100:Math.max(0,100-(ab-200)/3)}}
 return{p:Math.round(0.65*comp+0.35*cs),comp:comp,cs:Math.round(cs),intake:Math.round(inn),burn:Math.round(bu),def:def-0,tg:P.tg,tdef:P.tdef,base:P.base,mc:mc,mt:mt,past:past,wd:wd,wn:wn,a:a,b:b,c:c,e:e,P:P,sc:sc}}
function gmsg(s){var g=U.g;if(!s.mc)return"سجّل وجباتك عشان تظهر لك حسبة السعرات.";if(s.mc/s.mt<0.7&&!s.past)return"الإرشاد النهائي هيظهر بعد ما تسجّل أغلب وجباتك.";var d=s.def;
 if(g=="lose"){var r=s.tdef?d/s.tdef:0;return r<0.6?"العجز أقل من المطلوب: شد حيلك شوية، زوّد الحركة أو قلل الأكل الإضافي.":r>1.4?"العجز كبير: كمّل وجباتك عشان ما تخسرش عضل ولا تجوّع نفسك.":"ممتاز! العجز في المدى المطلوب، كمّل بنفس الالتزام."}
 return d<-200?"في زيادة سعرات عن المطلوب: محتاج شغل أكتر أو قلل الأكل الإضافي.":d>250?"في عجز أكبر من المطلوب: كُل وجباتك كاملة عشان ثبات الوزن.":"ممتاز! سعراتك متوازنة مع هدفك."}
function tips(d){var dd=dateOf(d.id),doy=Math.floor((dd-new Date(dd.getFullYear(),0,0))/864e5),t1=/Lower/.test(d.t)?"النهاردة يوم الرجل: اهتم بتمرين عضلات رجلك، هي عكازك لما تكبر في السن.":/Upper/.test(d.t)?"النهاردة يوم الجزء العلوي: ركّز على الأداء الصح قبل الوزن.":"النهاردة راحة نشطة: امشي وتمدد، الراحة جزء من التمرين.";return'<div class="tip"><b>💬 تنبيه اليوم</b><p>'+t1+'</p><p>'+QT[doy%QT.length]+'</p></div>'}
function rb(id,v){return'<div class="rt">'+[[1,"✔ 100%","g"],[0.5,"½ 50%","m"],[-1,"✖ لم ينفذ","n"]].map(function(o){return'<button class="st '+o[2]+(v==o[0]?" on":"")+'" data-a="r" data-id="'+id+'" data-n="'+o[0]+'">'+o[1]+'</button>'}).join("")+'</div>'}
function bar(v){return'<div class="pb"><b style="width:'+(v>0?v*100:0)+'%"></b></div><p class="hint">'+(v==1?"✅ اتنفذ 100%":v==0.5?"🟡 اتنفذ 50%":v<0?"❌ لم ينفذ":"لسه ماتقيمش")+'</p>'}
function opt(a,s){return a.map(function(o){return'<option value="'+o[0]+'"'+(o[0]==s?" selected":"")+'>'+o[1]+'</option>'}).join("")}
function rng(a,b,st,sf,none){var r=[["0",none]];for(var i=a;i<=b;i+=st)r.push([String(i),i+sf]);return r}
function lb(t,h){return'<label class="fl2"><span>'+t+'</span>'+h+'</label>'}
function fields(u){u=u||{};var e=u.eq||{db:8,bb:0,pu:0,tm:0},sp=u.sp||{cr:1,pr:1},w=u.wl?(u.wl[wkey()]||lastW(u)||""):"",wo2=[];for(var m=270;m<=540;m+=30)wo2.push([hm(m),hm(m)]);
 return lb("الجنس",'<select id="fsx">'+opt([["m","ذكر"],["f","أنثى"]],u.sx||"m")+'</select>')+lb("السن (التطبيق للرجال والنساء فوق 40)",'<input id="fa" type="number" inputmode="numeric" value="'+(u.a||"")+'">')+lb("الطول (سم)",'<input id="fh" type="number" inputmode="numeric" value="'+(u.h||"")+'">')+lb("الوزن (كجم)",'<input id="fw" type="number" inputmode="decimal" step="0.1" value="'+w+'">')
 +lb("هدفك",'<select id="fg">'+opt(Object.keys(GL).map(function(k){return[k,GL[k]]}),u.g||"lose")+'</select>')
 +lb("وقت الصحيان (غالبًا 7 ص، وتقدر تقدّمه أو تأخره لحد 9 ص والجدول يتظبط عليه)",'<select id="fwk">'+opt(wo2,u.wk||"07:00")+'</select>')
 +lb("مدينتك (لمواعيد الصلاة التقريبية)",'<select id="fct">'+opt(Object.keys(CITY).map(function(k){return[k,CITY[k][0]]}),u.city||"riyadh")+'</select>')
 +'<b>🧰 أدواتك</b>'+lb("الدمبل (وزن الواحد، وبتستخدم اتنين)",'<select id="fdb">'+opt(rng(2,20,1," كجم","مفيش دمبل"),String(e.db||0))+'</select>')+lb("بار الحديد (الوزن الكلي)",'<select id="fbb">'+opt(rng(10,100,5," كجم","مفيش بار"),String(e.bb||0))+'</select>')+lb("عقلة",'<select id="fpu">'+opt([["0","مفيش"],["1","موجودة"]],String(e.pu||0))+'</select>')+lb("تريدميل (لو مفيش: مشي عادي)",'<select id="ftm">'+opt([["0","مفيش"],["1","موجود"]],String(e.tm||0))+'</select>')
 +'<b>💊 المكملات</b><p class="hint">فيتامين D3 5000 و B12 والزنك 22 مج (بيكولينات) ثابتين في الروتين.</p>'+lb("كرياتين مونوهيدرات",'<select id="fcr">'+opt([["1","هستخدمه"],["0","لا"]],String(sp.cr))+'</select>')+lb("واي بروتين (نوع جيد ومضمون)",'<select id="fpr">'+opt([["1","هستخدمه"],["0","لا"]],String(sp.pr))+'</select>')}
function readF(){return{sx:val("fsx"),a:+val("fa"),h:+val("fh"),w:+val("fw"),g:val("fg"),wk:val("fwk"),city:val("fct"),eq:{db:+val("fdb"),bb:+val("fbb"),pu:+val("fpu"),tm:+val("ftm")},sp:{cr:+val("fcr"),pr:+val("fpr")}}}
function vDay(){var d=gd(cur),dt=ds(dateOf(cur)),st=stats(d,0),P=st.P,dn=S.done[dt]||{},sn=S.sets[dt]||{},tr=d.k!="r",h="",sum=0,L=lv(st.p),cg=gmsg(st);
 nav.innerHTML="";
 ORDER.forEach(function(id){var x=DM[id],p=stats(x,0).p,b=document.createElement("button");sum+=p;b.textContent=x.n+" "+p+"%"+(id==todayId?" •":"");b.style.setProperty("--c","var(--"+x.k+")");if(id==cur)b.className="on";b.onclick=function(){cur=id;pend="";render();window.scrollTo({top:0,behavior:"instant"})};nav.appendChild(b)});
 h+=drCard()+tips(d)+'<div class="alert">💧 <b>تنبيه مهم:</b> اشرب 3 لتر مياه على الأقل النهاردة (10 زجاجات × 300 مل). شربت <b>'+st.wd+'</b> من <b>'+st.wn+'</b>.</div>'+RULES+(cur==todayId&&todayId==U.wd&&!U.wl[wkey()]?'<div class="tip"><b>⚖️ النهاردة يوم الميزان</b><p>قِس وزنك الصبح قبل الأكل وسجّله في تبويب ملفي.</p></div>':'');
 h+='<section class="sum" style="--c:var(--'+d.k+');--p:'+st.p+'"><div class="ring"><i>'+st.p+'%</i></div><div><h2>'+d.n+' — '+d.t+'</h2><p>'+dateOf(cur).toLocaleDateString("ar-EG",{weekday:"long",day:"numeric",month:"long"})+(cur==todayId?" (النهاردة)":"")+'</p><p>🎯 '+GL[U.g]+'</p><p>✅ إنجاز الجدول: '+st.comp+'%</p><p>📅 متوسط الأسبوع: '+Math.round(sum/7)+'%</p></div></section>';
 h+='<section class="eval cal"><h3>🔥 السعرات (تقديرية)</h3><div class="kg"><div><b>'+st.tg+'</b><small>المستهدف للأكل</small></div><div><b>'+st.intake+'</b><small>اللي أكلته</small></div><div><b>'+st.burn+'</b><small>حرقته بالتمرين</small></div><div><b>'+(st.def>=0?"عجز ":"زيادة ")+Math.abs(st.def)+'</b><small>'+(st.tdef?"المطلوب عجز "+st.tdef:"المطلوب ثبات")+'</small></div></div><p>'+cg+'</p></section>';
 st.sc.forEach(function(s,si){h+='<section class="sec" style="--c:var(--'+d.k+')"><h3>'+(si==1&&!tr?"🚶 النشاط الخفيف":SEC[si][0])+'</h3>'+(SEC[si][1]?'<p class="hint">'+SEC[si][1]+'</p>':'')+'<ul class="tl">';
  var n=0;s.forEach(function(r){if(r.k=="ex"){var x=r.ex,v=sn[x.id]||0;n++;
   h+='<li class="exli"><article class="ex'+(v>0?" done":"")+'"><div class="pic"><svg viewBox="0 0 64 40" role="img" aria-label="'+esc(x.n)+'"><use href="#'+x.i+'"/></svg><div><b>'+n+'</b><small>'+hm(r.t)+'</small></div></div><div><div class="nm">'+esc(x.n)+'</div><div class="ch"><span class="c1">🔁 '+esc(x.r)+'</span><span class="c2">⏱ '+x.min+' د • راحة '+esc(x.rest)+'</span><span class="c1">🔥 '+x.kc+' سعر</span></div><p class="hint">🧰 '+esc(x.tool)+'</p>'+bar(v)+rb(x.id,v)+FLT+(x.st[0]?'<details><summary>طريقة الأداء</summary><ol>'+x.st.map(function(z){return"<li>"+esc(z)+"</li>"}).join("")+'</ol></details>':'')+(x.note?'<p class="nt">⚠️ '+esc(x.note)+'</p>':'')+'<button class="dl" data-a="del" data-id="'+x.id+'">'+(pend==x.id?"تأكيد الحذف ❌":"🗑 حذف التمرين")+'</button></div></article></li>';return}
   var ck=dn[r.id];h+='<li class="'+(r.k=="w"?"wt ":"")+(r.k=="pr"?"pr ":"")+(ck?"ok":"")+'"><label class="rw"><input type="checkbox" data-a="t" data-id="'+r.id+'"'+(ck?" checked":"")+'><time>'+hm(r.t)+'</time><span>'+r.ic+' '+r.x+(r.i?' <small class="kcal">+'+r.i+' سعر</small>':'')+(r.out?' <small class="kcal">🔥 '+r.out+'</small>':'')+'</span></label></li>'});
  h+='</ul></section>'});
 h+='<section class="sec"><h3>🍽 أكل إضافي</h3>';
 (S.food[dt]||[]).forEach(function(f,i){h+='<div class="pr"><span>'+esc(f.n)+' — '+f.sz+'</span><span class="'+(f.n.indexOf("صحي")>=0?"up":"dn")+'">+'+f.kc+' سعر</span><button class="x" data-a="fdel" data-i="'+i+'" aria-label="حذف">✕</button></div>'});
 h+='<div class="af"><select id="fc">'+FC.map(function(c,i){return'<option value="'+i+'">'+c[0]+'</option>'}).join("")+'</select><select id="fz">'+SZ.map(function(c,i){return'<option value="'+i+'"'+(i==1?" selected":"")+'>'+c+'</option>'}).join("")+'</select><button class="tb" data-a="fadd">إضافة الأكل</button></div></section>';
 h+='<section class="sec"><h3>➕ أنشطة إضافية (بونص)</h3><p class="hint">أي نشاط إضافي بيحرق سعرات وبيزوّد نسبة اليوم، وممكن يوصّلك 100%.</p>';
 (S.ex[dt]||[]).forEach(function(q){var v=sn[q.id]||0;h+='<article class="ex'+(v>0?" done":"")+'"><div class="pic"><div style="font-size:2rem">'+q.i+'</div></div><div><div class="nm">'+esc(q.n)+'</div><p class="hint">⏱ '+q.min+' دقيقة • 🔥 '+kc(q.met,q.min)+' سعر • بونص</p>'+rb(q.id,v)+'<button class="dl" data-a="xdel" data-id="'+q.id+'">🗑 حذف</button></div></article>'});
 h+='<div class="af"><select id="xs">'+XA.map(function(p,i){return'<option value="'+i+'">'+p[0]+'</option>'}).join("")+'</select><input id="xn" placeholder="اسم النشاط لو اخترت: نشاط آخر"><select id="xm">'+opt([["10","10 دقايق"],["20","20 دقيقة"],["30","30 دقيقة"],["45","45 دقيقة"],["60","ساعة"]],"30")+'</select><button class="tb" data-a="xadd">إضافة النشاط</button></div></section>';
 h+='<div class="tools"><button class="tb" data-a="reset">↺ صفّر تقييم اليوم</button>'+(S.del[cur]?'<button class="tb" data-a="restore">رجّع التمارين المحذوفة</button>':'')+'</div>';
 return h+'<section class="eval"><h3>🏁 تقييم اليوم</h3><div class="big">'+L[0]+' — '+st.p+'%</div><p>'+L[1]+'</p><p>'+cg+'</p></section>'}
function vRep(){var ps=[],tot=0,days=0,h="",w0=dateOf("sat",wo),w6=dateOf("fri",wo);
 ORDER.forEach(function(id){var p=stats(DM[id],wo).p;ps.push(p);tot+=p;if(p>=80)days++});
 var avg=Math.round(tot/7),L=lv(avg);
 h+='<div style="--c:var(--l)"><section class="sum" style="--p:'+avg+'"><div class="ring"><i>'+avg+'%</i></div><div><h2>تقرير الأسبوع</h2><p>'+fmt(w0)+' – '+fmt(w6)+(wo?"":" (الحالي)")+'</p><p>✅ أيام فوق 80%: '+days+' من 7</p></div></section>';
 h+='<div class="tools"><button class="tb" data-a="wp">‹ الأسبوع اللي قبله</button>'+(wo<0?'<button class="tb" data-a="wn">الأسبوع اللي بعده ›</button>':'')+'</div><h3>نتيجة كل يوم</h3>';
 ORDER.forEach(function(id,i){h+='<div class="rowd"><b>'+DM[id].n+'</b><div class="pb"><b style="width:'+ps[i]+'%"></b></div><span>'+ps[i]+'% — '+lv(ps[i])[0]+'</span></div>'});
 return h+'<section class="eval"><h3>🏆 تقدير الأسبوع</h3><div class="big">'+L[0]+' — '+avg+'%</div><p>'+L[2]+'</p></section></div>'}
function vMe(){var ks=Object.keys(U.wl).sort(),h="",w=lastW(U),s0=ks.length?U.wl[ks[0]]:0,bmi=w&&U.h?Math.round(w*1000000/(U.h*U.h))/100:0,cat=bmi<18.5?"نحافة":bmi<25?"وزن طبيعي":bmi<30?"زيادة وزن":"سمنة",d=Math.round((w-s0)*10)/10,g=U.g,pv=ks.length>1?Math.round((w-U.wl[ks[ks.length-2]])*10)/10:null,good=g=="lose"?d<0:g=="keep"?Math.abs(d)<=1:Math.abs(d)<=2,P=plan(gd(todayId));
 h+='<section class="sum" style="--c:var(--l);--p:0"><div><h2>👤 ملفي ووزني</h2><p>'+esc(U.n)+' • '+U.a+' سنة • '+U.h+' سم</p><p>🎯 '+GL[g]+'</p><p>الوزن الحالي: <b>'+w+' كجم</b>'+(bmi?' • مؤشر الكتلة '+bmi+' ('+cat+')':'')+'</p><p>🔥 احتياجك الأساسي للراحة: '+Math.round(bmr(U))+' سعر • المستهدف للأكل النهاردة: '+P.tg+' سعر</p>'+(pv!==null?'<p>🔁 مقارنة ميزان '+DM[U.wd].n+' بالأسبوع اللي فات: <b>'+(pv>0?"+":"")+pv+' كجم</b></p>':'')+'<p>'+(ks.length<2?"سجّل وزنك كل أسبوع وهتشوف تقدمك هنا.":'من أول وزن '+s0+' كجم: '+(d>0?"+":"")+d+' كجم — '+(good?"✅ ماشي في الاتجاه الصح":"⚠️ راجع الأكل والتمرين"))+'</p></div></section>';
 var vs=ks.slice(-12).map(function(k){return U.wl[k]});
 if(vs.length>1){var mn=Math.min.apply(0,vs)-1,mx=Math.max.apply(0,vs)+1,pts=vs.map(function(v,i){return[10+i*280/(vs.length-1),90-(v-mn)*80/(mx-mn)]});
  h+='<svg viewBox="0 0 300 100" class="chart" role="img" aria-label="منحنى الوزن"><polyline points="'+pts.map(function(p){return p[0].toFixed(0)+","+p[1].toFixed(0)}).join(" ")+'" fill="none" stroke="var(--l)" stroke-width="3" stroke-linejoin="round"/>'+pts.map(function(p){return'<circle cx="'+p[0].toFixed(0)+'" cy="'+p[1].toFixed(0)+'" r="4" fill="var(--l)"/>'}).join("")+'</svg>'}
 h+='<div class="af"><b>بياناتك وإعدادات الروتين (أي تغيير بيعدّل الجدول)</b>'+fields(U)+lb("يوم الميزان الأسبوعي (نفس اليوم ونفس الوقت: الصبح قبل الأكل)",'<select id="pd">'+opt(ORDER.map(function(id){return[id,DM[id].n]}),U.wd)+'</select>')+extra(U)+'<button class="tb" data-a="psv">حفظ</button></div><h3>سجل الأسابيع</h3>';
 ks.slice().reverse().slice(0,8).forEach(function(k,i,a){var p=a[i+1],df=p!=null?Math.round((U.wl[k]-U.wl[p])*10)/10:null;h+='<div class="pr"><span>أسبوع '+fmt(new Date(k+"T00:00"))+'</span><span>'+U.wl[k]+' كجم</span><span>'+(df!==null?(df>0?"+":"")+df+" كجم":"")+'</span></div>'});
 return h+'<details class="tip"><summary><b>💾 نسخة احتياطية</b></summary><p>بياناتك محفوظة على الجهاز بس. انسخ النص ده واحتفظ بيه، ولصقه هنا لاسترجاعه.</p><textarea id="bkt" rows="4" style="width:100%">'+esc(bkTxt)+'</textarea><div class="tools"><button class="tb" data-a="bk">عرض النسخة</button><button class="tb" data-a="bi">استرجاع من النص</button></div></details>'}

/* ====================== المنصة: حالة وحفظ سحابي ====================== */
var ADMIN_EMAIL=(window.YH_CONFIG&&window.YH_CONFIG.adminEmail)||"ahmed.eskhlil@gmail.com";
var LV=[[0,"مبتدئ 🌱"],[100,"ملتزم 🌿"],[300,"نشيط 💪"],[700,"قوي 🏋️"],[1500,"محترف 🏅"],[3000,"قدوة 👑"]];
var PT=[["encourage","تشجيع 💪"],["greet","صباح الخير للجميع ☀️"],["exp","تجربة 📝"]];
var DR=["اللياقة مش رفاهية، دي نعمة بنحافظ عليها. ابدأ يومك بنية صافية وخطوة صغيرة.","مش لازم تكون مثالي، لازم تكون مستمر. تمرين خفيف النهاردة أحسن من تمرين مثالي بكرة.","اشرب مية، اتحرك، وصلّ في وقتها. ثلاث حاجات بسيطة بتفرق في يومك كله.","العضلة بتتبني في الراحة والأكل والنوم، مش في التمرين بس. اهتم بالتلاتة.","قرّب من الفشل العضلي من غير ما توصله، وخلي حركتك بطيئة ومتحكم فيها.","جسمك أمانة عندك. اهتم بيه بحنية ومن غير قسوة على نفسك.","ما تقارنش نفسك بحد، قارن نفسك بنفسك إمبارح.","الأكل الصحي مش حرمان، هو اختيار ذكي بتكرره كل يوم.","الرجل القوية بتحميك لما تكبر في السن، فاهتم بتمرين الرجل وما تتجاهلوش.","نوم كويس 7–8 ساعات هو أرخص مكمل غذائي.","الصبر مفتاح التغيير، النتايج الحقيقية بتظهر بعد أسابيع من الالتزام.","لو تعبت ارتاح، ولو كسلت ابدأ بخمس دقايق وبعدها اتحرك.","مفيش وقت متأخر للبدء. أحسن وقت كان من زمان، وتاني أحسن وقت هو دلوقتي.","شارك أهلك وأصحابك التمرين، الصحبة الحلوة بتخلي الالتزام أسهل."];
var WELCOME='<h2>أهلًا بك في يومك حلو 🌿</h2><p><b>من إدارة التطبيق:</b></p><p>هذا التطبيق <b>مجاني بالكامل</b>، ولا نرجو به إلا <b>رضا الله</b>، ثم أن تنفعك صحتك ولياقتك.</p><p>فكرته أن تحفظ نعمة الجسد بحركة معتدلة وغذاء متوازن وصلاة في وقتها، وأن تبقى قويًا في عبادتك وعملك وبيتك مهما تقدّم بك العمر، فـ«المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف».</p><p>ليس سباق بطولات، بل رحلة هادئة نصحبك فيها خطوة بخطوة، ومعنا مجتمع يشجّع بعضه.</p><p class="hint">الجدول عام ولا يغني عن استشارة الطبيب. جزاك الله خيرًا.</p><p><b>— إدارة يومك حلو</b></p>';
function $(i){return document.getElementById(i)}
function val(i){var e=$(i);return e?e.value:""}
function ds(x){return x.getFullYear()+"-"+("0"+(x.getMonth()+1)).slice(-2)+"-"+("0"+x.getDate()).slice(-2)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ago(t){var m=Math.floor((Date.now()-t)/6e4);return m<1?"الآن":m<60?"من "+m+" دقيقة":m<1440?"من "+Math.floor(m/60)+" ساعة":"من "+Math.floor(m/1440)+" يوم"}
function toast(t){var e=$("toast");e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(function(){e.hidden=true},3500)}
function showModal(h){$("mbody").innerHTML=h+'<button class="tb big2" data-a="mclose">تمام</button>';$("modal").hidden=false}
function normU(){var gm={down:"lose",up:"fit"};if(gm[U.g])U.g=gm[U.g];U.g=U.g||"lose";U.wd=U.wd||"fri";U.sx=U.sx||"m";U.wk=U.wk||"07:00";U.city=U.city||"riyadh";U.eq=U.eq||{db:0,bb:0,pu:0,tm:0};U.sp=U.sp||{cr:1,pr:1};U.wl=U.wl||{};U.pf=U.pf||{pr:1,wt:1,ex:1,sl:1,ia:1,dm:1};U.del=U.del||{}}
function scoreOfDate(k){var p=k.split("-"),dd=new Date(+p[0],+p[1]-1,+p[2]),sw=new Date(+p[0],+p[1]-1,+p[2]-(dd.getDay()+1)%7);return stats(DM[GID[dd.getDay()]],Math.round((sw-wk)/6048e5)).p}
function dayPts(p){return Math.round(p/5)+(p>=80?5:0)+(p>=100?10:0)}
function gami(){var pts=0,lvl=0,st=0,w7=0,n7=0,i,bd=[],wc=0,pc=0,pf=0;
 Object.keys(S.p).forEach(function(k){pts+=dayPts(S.p[k]);var dn=S.done[k]||{};if(S.p[k]>=100)pf=1;if(["b0","b1","b2","b3","b4","b5","b6","b7","b8","b9"].every(function(x){return dn[x]}))wc++;if(["fj","dh","as","mg","is"].every(function(x){return dn[x]}))pc++});
 LV.forEach(function(l,j){if(pts>=l[0])lvl=j});
 var d0=new Date(now.getFullYear(),now.getMonth(),now.getDate());if(!(S.p[ds(d0)]>=50))d0.setDate(d0.getDate()-1);while(S.p[ds(d0)]>=50){st++;d0.setDate(d0.getDate()-1)}
 for(i=0;i<7;i++){var x=ds(new Date(now.getFullYear(),now.getMonth(),now.getDate()-i));w7+=S.p[x]||0;if(S.p[x])n7++}
 if(st>=7)bd.push("🔥 7 أيام متتالية");if(st>=30)bd.push("🏆 30 يوم متتالي");if(pf)bd.push("💯 يوم كامل");if(wc>=7)bd.push("💧 7 أيام مية كاملة");if(pc>=7)bd.push("🕌 7 أيام صلوات كاملة");if(Object.keys(U.wl).length>=4)bd.push("⚖️ 4 قياسات وزن");
 return{pts:pts,lvl:lvl,lname:LV[lvl][1],next:LV[lvl+1]?LV[lvl+1][0]:0,streak:st,week:Math.round(w7/7),n7:n7,badges:bd}}
function profPayload(){return{n:U.n,sx:U.sx,a:U.a,h:U.h,g:U.g,wk:U.wk,city:U.city,eq:U.eq,sp:U.sp,wd:U.wd,wl:U.wl,del:U.del,hide:!!U.hide,pf:U.pf,la:Date.now()}}
function sync(dt,pf){if(dt)dirtyD[dt]=1;if(pf)dirtyP=true;clearTimeout(tmr);tmr=setTimeout(flush,700)}
async function flush(){if(!UID||!S)return;var ks=Object.keys(dirtyD),pf=dirtyP;dirtyD={};dirtyP=false;
 try{for(var i=0;i<ks.length;i++){var k=ks[i];S.p[k]=scoreOfDate(k);await P.saveDay(UID,k,{done:S.done[k]||{},sets:S.sets[k]||{},ex:S.ex[k]||[],food:S.food[k]||[],p:S.p[k]})}
  if(pf||ks.length)await P.saveProfile(UID,profPayload());
  var g=gami(),wl=Object.keys(U.wl).sort();await P.saveStats(UID,{uid:UID,n:U.n,hide:!!U.hide,week:g.week,n7:g.n7,streak:g.streak,pts:g.pts,lv:g.lvl,lname:g.lname,badges:g.badges,la:Date.now(),w0:wl.length?U.wl[wl[0]]:0,w:lastW(U)})}
 catch(e){toast("تعذر الحفظ، هنحاول تاني")}}
async function loadDays(){var days=await P.loadDays(UID);S={done:{},sets:{},ex:{},food:{},p:{},del:U.del};days.forEach(function(x){S.done[x.id]=x.done||{};S.sets[x.id]=x.sets||{};S.ex[x.id]=x.ex||[];S.food[x.id]=x.food||[];if(x.p!=null)S.p[x.id]=x.p})}
/* ====================== المدير: حسابات ====================== */
function allList(){return Object.keys(ALLU).map(function(id){var u=ALLU[id],s=ALLS[id]||{},la=s.la||u.la||0;return{id:id,u:u,s:s,n:u.n||u.email,st:u.status,week:s.week||0,n7:s.n7||0,la:la,streak:s.streak||0,pts:s.pts||0,lname:s.lname||"",days:la?Math.floor((Date.now()-la)/864e5):99}})}
function appr(){return allList().filter(function(x){return x.st=="approved"})}
function pendL(){return allList().filter(function(x){return x.st=="pending"})}
function mkReport(){var l=appr(),act=l.filter(function(x){return x.la&&ds(new Date(x.la))==ds(now)}),ina=l.filter(function(x){return x.days>=3}),by=l.slice().sort(function(a,b){return b.week-a.week}),need=l.filter(function(x){return x.week<40||x.days>=3});
 return{date:ds(now),total:l.length,active:act.length,inactive:ina.length,avg:l.length?Math.round(l.reduce(function(a,x){return a+x.week},0)/l.length):0,hi:by[0]?by[0].n+" ("+by[0].week+"%)":"—",lo:by.length?by[by.length-1].n+" ("+by[by.length-1].week+"%)":"—",need:need.map(function(x){return x.n+" — "+x.week+"%"+(x.days>=3?" — غايب "+x.days+" يوم":"")})}}
async function pickUow(){var l=appr().filter(function(x){return x.u.role!="admin"&&!x.s.hide&&x.n7>=3}).sort(function(a,b){return b.week-a.week||b.pts-a.pts});
 if(!l.length){toast("مفيش مستخدمين مؤهلين (3 أيام نشاط على الأقل)");return}
 var w=l[0],o={key:ds(wk),uid:w.id,n:w.n,week:w.week,pts:w.pts};await P.setUow(o);UOW=o;
 await P.sendNotif({to:"all",title:"🏆 مستخدم الأسبوع",body:"مبروك لـ "+w.n+" على التزامه "+w.week+"% هذا الأسبوع. ربنا يبارك فيه وفيكم جميعًا 💪",kind:"uow"});toast("اتختار: "+w.n)}
function autoUow(){if(IS_ADMIN&&now.getDay()==5&&now.getHours()>=20&&(!UOW||UOW.key!=ds(wk))&&appr().length)pickUow()}
/* ====================== الواجهات الجديدة ====================== */
function drCard(){var doy=Math.floor((now-new Date(now.getFullYear(),0,0))/864e5);return'<div class="tip dr"><b>💌 رسالة اليوم من الدكتور محمد أحمد (OSO)</b><p>'+DR[doy%DR.length]+'</p></div>'}
function extra(u){var pf=u.pf||{},o=[["1","شغّال"],["0","مقفول"]];
 return lb("إظهار اسمي في لوحة الترتيب",'<select id="fhide">'+opt([["0","نعم"],["1","لا"]],String(u.hide?1:0))+'</select>')+'<b>🔔 الإشعارات</b><button class="tb" data-a="push">'+(PUSH_ON?"✅ مفعّلة على الجهاز ده (تحديث)":"تفعيل الإشعارات على الجهاز ده")+'</button>'+[["pr","تذكير الصلاة"],["wt","تذكير الماء"],["ex","تذكير التمرين"],["sl","تذكير النوم"],["ia","تذكير عدم النشاط"],["dm","رسالة اليوم التحفيزية"]].map(function(k){return lb(k[1],'<select id="np_'+k[0]+'">'+opt(o,String(pf[k[0]]==null?1:pf[k[0]]))+'</select>')}).join("")}
function vAuth(){var r=authMode=="reg",h='<section class="hero"><svg class="lgo big"><use href="#logo"/></svg><h2>يومك حلو ☀️</h2><p>تطبيق للتمرين المنزلي بالدمبل أو البار، للرجال والنساء فوق 40 سنة لتحسين جودة الحياة. هدفه اللياقة والصحة والحفاظ على النعمة، مش دخول بطولات.</p><p class="cr">فكرة وتنفيذ التطبيق: <b>أحمد السيد خليل</b><br>جدول التمارين والمكملات والوجبات: <b>الدكتور محمد أحمد السيد</b></p></section>';
 if(!P.ok)return h+'<p class="nt">⚠️ لم يتم ضبط Firebase بعد. افتح config.js وضع بيانات مشروعك (اقرأ README).</p>';
 return h+'<div class="af"><b>'+(r?"إنشاء حساب جديد":"تسجيل الدخول")+'</b>'+(r?'<input id="an" placeholder="الاسم">':'')+'<input id="ae" type="email" inputmode="email" autocomplete="email" placeholder="البريد الإلكتروني"><input id="ap" type="password" autocomplete="'+(r?"new-password":"current-password")+'" placeholder="كلمة المرور (6 أحرف على الأقل)"><button class="tb big2" data-a="'+(r?"reg":"login")+'">'+(r?"إنشاء الحساب":"دخول")+'</button><button class="tb" data-a="goog">المتابعة بحساب Google</button><div class="tools"><button class="tb" data-a="am">'+(r?"عندي حساب":"حساب جديد")+'</button>'+(r?'':'<button class="tb" data-a="fp">نسيت كلمة المرور</button>')+'</div></div><p class="hint">أي حساب جديد يحتاج موافقة إدارة التطبيق قبل الاستخدام.</p>'}
function vSetup(){return'<h3>أكمل بياناتك</h3><p class="hint">'+esc(AUSER.email||"")+'</p><div class="af"><input id="fn" placeholder="الاسم" value="'+esc(AUSER.displayName||"")+'">'+fields(null)+'<button class="tb big2" data-a="mkprof">حفظ وإرسال الطلب</button></div>'}
function vPend(){return'<section class="hero"><svg class="lgo big"><use href="#logo"/></svg><h2>طلبك وصل للإدارة 🌿</h2><p>هيتم مراجعة الطلب والموافقة عليه قريبًا بإذن الله، وهتوصلك رسالة أول ما يتم.</p></section><div class="tools"><button class="tb" data-a="wm">📜 رسالة الترحيب</button><button class="tb" data-a="out">خروج</button></div>'}
function vRej(){return'<section class="hero"><h2>لم تتم الموافقة على الطلب</h2><p>لو شايف إن في خطأ، تواصل مع إدارة التطبيق.</p></section><div class="tools"><button class="tb" data-a="out">خروج</button></div>'}
function vComm(){var h='<h3>💬 مجتمع يومك حلو</h3><div class="af"><select id="pty">'+opt(PT,"encourage")+'</select><textarea id="ptx" rows="3" maxlength="400" placeholder="اكتب رسالة تشجيع أو صباح الخير أو شارك تجربتك..."></textarea><button class="tb" data-a="post">نشر</button></div>';
 if(!POSTS.length)h+='<p class="hint">لسه مفيش مشاركات. كن أول من يشجّع الباقي!</p>';
 POSTS.forEach(function(p){var lk=(p.likes||[]).indexOf(UID)>=0;h+='<article class="post"><div class="ph"><b>'+esc(p.n)+'</b><small>'+(PT.filter(function(t){return t[0]==p.type})[0]||["", ""])[1]+' • '+ago(p.createdAt)+'</small></div><p>'+esc(p.text)+'</p><div class="pa"><button class="x'+(lk?" on":"")+'" data-a="like" data-id="'+p.id+'">'+(lk?"❤️":"🤍")+' '+(p.likes||[]).length+'</button>'+(IS_ADMIN||p.uid==UID?'<button class="x" data-a="pdel" data-id="'+p.id+'">🗑</button>':'')+'</div></article>'});
 return h}
function vBoard(){var g=gami(),l=Object.keys(ALLS).map(function(id){var s=ALLS[id];return{id:id,s:s}}).filter(function(x){return !x.s.hide||x.id==UID}).sort(function(a,b){return(b.s.week||0)-(a.s.week||0)||(b.s.pts||0)-(a.s.pts||0)}),h='<h3>🏆 لوحة الترتيب</h3>';
 h+='<section class="eval"><div class="big">'+g.lname+'</div><p>⭐ '+g.pts+' نقطة'+(g.next?' (القادم عند '+g.next+')':'')+' • 🔥 '+g.streak+' يوم متتالي • التزام الأسبوع '+g.week+'%</p><p>'+(g.badges.length?g.badges.join(" • "):"أوسمتك هتظهر هنا مع التزامك")+'</p></section>';
 l.slice(0,30).forEach(function(x,i){h+='<div class="pr'+(x.id==UID?" me":"")+'"><span>'+(["🥇","🥈","🥉"][i]||(i+1))+' <b>'+esc(x.s.n||"—")+'</b></span><span>'+(x.s.lname||"")+'</span><span>'+(x.s.week||0)+'% • 🔥'+(x.s.streak||0)+' • ⭐'+(x.s.pts||0)+'</span></div>'});
 return h}
function vInbox(){localStorage.setItem("yh_seen_"+UID,String(Date.now()));var h='<h3>📩 الرسائل والإشعارات</h3>';if(!NOTIFS.length)h+='<p class="hint">مفيش رسائل لسه.</p>';
 NOTIFS.forEach(function(n){h+='<article class="post"><div class="ph"><b>'+esc(n.title)+'</b><small>'+ago(n.createdAt)+'</small></div><p>'+esc(n.body)+'</p></article>'});return h+'<div class="tools"><button class="tb" data-a="wm">📜 رسالة الترحيب</button></div>'}
function nUnread(){var s=+localStorage.getItem("yh_seen_"+UID)||0;return NOTIFS.filter(function(n){return n.createdAt>s}).length}
function ucard(x){return'<div class="pr"><span><b>'+esc(x.n)+'</b> <small>'+esc(x.u.email||"")+'</small></span><span>'+x.week+'% • 🔥'+x.streak+' • ⭐'+x.pts+' • آخر نشاط '+(x.la?ago(x.la):"—")+'</span><span><button class="tb" data-a="ud" data-id="'+x.id+'">تفاصيل</button></span></div>'}
function vAdm(){var pc=pendL().length,h='<h3>👑 لوحة المدير</h3><div class="subnav">'+[["dash","📊 الملخص"],["req","🆕 الطلبات"+(pc?" ("+pc+")":"")],["users","👥 المستخدمين"],["stuck","🆘 المتعثرون"],["report","📝 تقرير اليوم"],["send","📣 إرسال"]].map(function(t){return'<button class="'+(ad==t[0]?"on":"")+'" data-a="ads" data-id="'+t[0]+'">'+t[1]+'</button>'}).join("")+'</div>',l=appr();
 if(adu&&ALLU[adu]){var x=allList().filter(function(y){return y.id==adu})[0],wl=Object.keys(x.u.wl||{}).sort(),w0=wl.length?x.u.wl[wl[0]]:0,w1=wl.length?x.u.wl[wl[wl.length-1]]:0;
  return h+'<button class="tb" data-a="ud" data-id="">‹ رجوع</button><section class="eval cal"><h3>'+esc(x.n)+'</h3><p>'+esc(x.u.email||"")+' • '+(x.st=="approved"?"✅ مقبول":x.st=="pending"?"⏳ معلّق":"⛔ مرفوض")+'</p><div class="kg"><div><b>'+x.week+'%</b><small>التزام الأسبوع</small></div><div><b>'+x.streak+'</b><small>أيام متتالية</small></div><div><b>'+x.pts+'</b><small>نقاط • '+esc(x.lname)+'</small></div><div><b>'+(x.la?ago(x.la):"—")+'</b><small>آخر نشاط</small></div></div><p>⚖️ الوزن: '+w0+' ← '+w1+' كجم ('+(Math.round((w1-w0)*10)/10)+') • 🎯 '+(GL[x.u.g]||"")+' • '+(x.u.a||"")+' سنة</p><p>'+((x.s.badges||[]).join(" • ")||"لا أوسمة بعد")+'</p></section><div class="af"><input id="sm_t" placeholder="عنوان الرسالة"><textarea id="sm_b" rows="2" placeholder="الرسالة"></textarea><button class="tb" data-a="dm" data-id="'+x.id+'">إرسال رسالة لـ '+esc(x.n)+'</button></div><div class="tools">'+(x.st!="approved"?'<button class="tb" data-a="apr" data-id="'+x.id+'">✅ موافقة</button>':'')+(x.st!="rejected"?'<button class="dl" data-a="rej" data-id="'+x.id+'">'+(pend==x.id?"تأكيد الرفض":"⛔ رفض / إيقاف")+'</button>':'')+'</div>'}
 if(ad=="dash"){var act=l.filter(function(y){return y.la&&ds(new Date(y.la))==ds(now)}).length,ina=l.filter(function(y){return y.days>=3}).length,avg=l.length?Math.round(l.reduce(function(a,y){return a+y.week},0)/l.length):0,top=l.slice().sort(function(a,b){return b.week-a.week||b.pts-a.pts}).slice(0,5),lag=l.filter(function(y){return y.week<40||y.days>=3}).sort(function(a,b){return a.week-b.week}).slice(0,5);
  h+='<div class="kg"><div><b>'+l.length+'</b><small>إجمالي المستخدمين</small></div><div><b>'+act+'</b><small>نشطين اليوم</small></div><div><b>'+ina+'</b><small>غير نشطين (3 أيام+)</small></div><div><b>'+avg+'%</b><small>متوسط الالتزام</small></div></div>'+(pc?'<button class="tb big2" data-a="ads" data-id="req">🆕 '+pc+' طلب تسجيل ينتظر قرارك</button>':'')+'<h3>🏅 أفضل المستخدمين</h3>'+(top.map(ucard).join("")||'<p class="hint">لا بيانات بعد.</p>')+'<h3>⚠️ المتأخرون في الالتزام</h3>'+(lag.map(ucard).join("")||'<p class="hint">لا أحد.</p>')+'<div class="tools"><button class="tb" data-a="uow">🏆 اختيار مستخدم الأسبوع الآن</button></div>'+(UOW?'<p class="hint">آخر مستخدم أسبوع: '+esc(UOW.n)+'</p>':'')}
 else if(ad=="req"){var p=pendL();h+=p.length?p.map(function(y){return'<div class="pr"><span><b>'+esc(y.n)+'</b> <small>'+esc(y.u.email||"")+'</small></span><span>'+(y.u.a||"")+' سنة • '+(GL[y.u.g]||"")+'</span><span><button class="tb" data-a="apr" data-id="'+y.id+'">✅ موافقة</button> <button class="dl" data-a="rej" data-id="'+y.id+'">'+(pend==y.id?"تأكيد":"⛔ رفض")+'</button></span></div>'}).join(""):'<p class="hint">مفيش طلبات معلّقة.</p>'}
 else if(ad=="users"){h+=allList().map(ucard).join("")||'<p class="hint">لا مستخدمين.</p>'}
 else if(ad=="stuck"){var sl=l.filter(function(y){return y.days>=stuckN}).sort(function(a,b){return b.days-a.days});h+='<p class="hint">مستخدمين مسجّلين وما سجّلوش نشاط من:</p><div class="tools">'+[3,5,7].map(function(n){return'<button class="tb'+(stuckN==n?" on":"")+'" data-a="sn" data-id="'+n+'">'+n+' أيام</button>'}).join("")+'</div>'+(sl.length?sl.map(function(y){return'<div class="pr"><span><b>'+esc(y.n)+'</b></span><span>غايب '+(y.days>=99?"من التسجيل":y.days+" يوم")+'</span><span><button class="tb" data-a="enc" data-id="'+y.id+'">💬 رسالة تشجيع</button></span></div>'}).join("")+'<div class="tools"><button class="tb" data-a="encall">💬 تشجيع كل المتعثرين</button></div>':'<p class="hint">ممتاز! مفيش متعثرين.</p>')}
 else if(ad=="report"){var r=mkReport();h+='<section class="eval cal"><h3>📝 تقرير '+r.date+'</h3><div class="kg"><div><b>'+r.active+'</b><small>نشطين</small></div><div><b>'+r.inactive+'</b><small>غير نشطين</small></div><div><b>'+r.hi+'</b><small>أعلى التزام</small></div><div><b>'+r.lo+'</b><small>أقل التزام</small></div></div><p>إجمالي '+r.total+' • متوسط الالتزام '+r.avg+'%</p><h3>يحتاجون متابعة</h3><p>'+(r.need.map(esc).join("<br>")||"لا أحد 👌")+'</p></section><div class="tools"><button class="tb" data-a="rsave">💾 حفظ التقرير</button></div>'}
 else if(ad=="send"){h+='<div class="af"><b>📣 إشعار لكل المستخدمين</b><input id="bc_t" placeholder="العنوان"><textarea id="bc_b" rows="3" placeholder="نص الرسالة"></textarea><button class="tb" data-a="bc">إرسال للجميع</button></div><div class="af"><b>✉️ رسالة لمستخدم محدد</b><select id="dm_u">'+opt(l.map(function(y){return[y.id,y.n]}),"")+'</select><input id="dm_t" placeholder="العنوان"><textarea id="dm_b" rows="2" placeholder="الرسالة"></textarea><button class="tb" data-a="dm2">إرسال</button></div>'}
 return h}
/* ====================== الرسم والتوجيه ====================== */
var nav=$("nav"),out=$("days");
function render(soft){if(soft&&document.activeElement&&/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName||""))return;
 var y=window.scrollY,m=msg,h,main=!!(U&&S&&(U.status=="approved"||IS_ADMIN));msg="";
 $("tabs").style.display=main?"":"none";
 $("who").innerHTML=AUSER?(main?'<button class="ib" data-v="inbox" aria-label="الرسائل">🔔'+(nUnread()?'<i>'+nUnread()+'</i>':'')+'</button>'+(IS_ADMIN?'<button class="ib" data-v="adm" aria-label="لوحة المدير">👑'+(pendL().length?'<i>'+pendL().length+'</i>':'')+'</button>':''):'')+'<button class="tb" data-a="out">خروج</button>':"";
 nav.style.display=main&&view=="day"?"":"none";
 if(loading)h='<p class="nt">⏳ جاري التحميل...</p>';else if(!AUSER)h=vAuth();else if(!U)h=vSetup();else if(!main)h=U.status=="rejected"?vRej():vPend();
 else h=view=="rep"?vRep():view=="me"?vMe():view=="comm"?vComm():view=="board"?vBoard():view=="inbox"?vInbox():view=="adm"&&IS_ADMIN?vAdm():vDay();
 out.innerHTML=(m?'<p class="nt">'+m+'</p>':"")+h;
 [].forEach.call(document.querySelectorAll("#tabs button"),function(b){b.className=b.dataset.v==view?"on":""});
 window.scrollTo({top:y,behavior:"instant"})}
function aerr(e){var c=e&&e.code||"";return c.indexOf("invalid-email")>=0?"البريد غير صحيح.":c.indexOf("weak-password")>=0?"كلمة المرور ضعيفة (6 أحرف على الأقل).":c.indexOf("email-already")>=0?"البريد مسجّل قبل كده، جرّب تسجيل الدخول.":c.indexOf("user-not-found")>=0||c.indexOf("wrong-password")>=0||c.indexOf("invalid-credential")>=0?"البريد أو كلمة المرور غلط.":c.indexOf("too-many")>=0?"محاولات كتير، استنى شوية.":c.indexOf("popup-closed")>=0?"اتقفلت نافذة الدخول.":"تعذر الإجراء: "+(c||e.message||"")}
function maybeWelcome(){if(U&&!localStorage.getItem("yh_w_"+UID)){localStorage.setItem("yh_w_"+UID,"1");showModal(WELCOME)}}
function maybeUow(){if(U&&(U.status=="approved"||IS_ADMIN)&&UOW&&UOW.key&&localStorage.getItem("yh_u_"+UID)!=UOW.key){localStorage.setItem("yh_u_"+UID,UOW.key);showModal('<h2>🏆 مستخدم الأسبوع</h2><p><b>'+esc(UOW.n)+'</b></p><p>التزام '+UOW.week+'% و'+UOW.pts+' نقطة. مبروك! وإنت كمان تقدر تكون القادم 💪</p>')}}
function startW(){if(UNS.length)return;
 UNS.push(P.watchNotifs(UID,function(a){var o=NOTIFS.length;NOTIFS=a;if(o&&a.length>o)toast("📩 "+a[0].title);render(true)}));
 UNS.push(P.watchPosts(function(a){POSTS=a;if(view=="comm")render(true)}));
 UNS.push(P.watchStats(function(m){ALLS=m;if(view=="board"||view=="adm")render(true);autoUow()}));
 P.getUow().then(function(u){UOW=u;maybeUow()});
 if(IS_ADMIN)UNS.push(P.watchUsers(function(m){ALLU=m;var n=pendL().length;if(prevPend!=null&&n>prevPend)toast("🆕 طلب تسجيل جديد ينتظر موافقتك");prevPend=n;render(true)}))}
function stopW(){UNS.forEach(function(f){try{f()}catch(e){}});UNS=[];prevPend=null}
async function onUser(user){if(PROF_UNSUB){PROF_UNSUB();PROF_UNSUB=null}stopW();
 if(!user){UID="";AUSER=null;IS_ADMIN=false;U=null;S=null;view="auth";loading=false;render();return}
 UID=user.uid;AUSER=user;IS_ADMIN=P.isAdmin(user);loading=true;render();PUSH_ON=localStorage.getItem("yh_push_"+UID)=="1";
 PROF_UNSUB=P.watchProfile(UID,async function(p,err){
  if(err){loading=false;msg="تعذر الاتصال بالسيرفر. تأكد من الإنترنت وقواعد Firestore.";render();return}
  if(!p){U=null;S=null;view="setup";loading=false;render();return}
  var first=!U;if(first){U=p}else{U.status=p.status;U.role=p.role}normU();
  if(U.status=="approved"||IS_ADMIN){if(first||!S)await loadDays();if(["auth","setup","pending","rejected"].indexOf(view)>=0)view="day";startW();if(PUSH_ON)P.savePush(UID,pushPayload())}
  else{view=U.status=="rejected"?"rejected":"pending";S=null}
  loading=false;render();maybeWelcome();if(first&&U.status=="approved"&&!IS_ADMIN&&!localStorage.getItem("yh_a_"+UID)){localStorage.setItem("yh_a_"+UID,"1");toast("✅ تمت الموافقة على حسابك، أهلًا بيك!")}})}
function pushPayload(){return{prefs:U.pf,city:U.city,wake:tm(U.wk),tz:-new Date().getTimezoneOffset(),updated:Date.now()}}
var DAYACT=",t,r,reset,xadd,xdel,fadd,fdel,",PACT=",del,restore,psv,";
document.addEventListener("click",async function(ev){var t=ev.target.closest("[data-a],[data-v]");if(!t)return;
 if(t.dataset.v){view=t.dataset.v;pend="";adu="";render();window.scrollTo({top:0,behavior:"instant"});return}
 var a=t.dataset.a,id=t.dataset.id,oldp=pend,dt=S?ds(dateOf(cur)):"";pend="";
 try{
 if(a=="mclose"){$("modal").hidden=true;return}
 if(a=="wm"){showModal(WELCOME);return}
 if(a=="am"){authMode=authMode=="reg"?"login":"reg"}
 else if(a=="login"){await P.signInEmail(val("ae").trim(),val("ap"))}
 else if(a=="reg"){var nm0=val("an").trim();if(!nm0){msg="اكتب اسمك.";render();return}await P.register(val("ae").trim(),val("ap"),nm0);msg="اتبعتلك إيميل لتأكيد البريد. كمّل بياناتك."}
 else if(a=="goog"){await P.google()}
 else if(a=="fp"){await P.resetPassword(val("ae").trim());msg="اتبعتلك لينك إعادة تعيين كلمة المرور."}
 else if(a=="out"){await P.signOut();return}
 else if(a=="mkprof"){var n=val("fn").trim(),o=readF();if(!n||!o.w||!o.h||!o.a){msg="اكمل الاسم والسن والطول والوزن.";render();return}
  var wl={};wl[ds(dateOf("fri",0))]=o.w;await P.createProfile(UID,{n:n,email:AUSER.email||"",role:IS_ADMIN?"admin":"user",status:IS_ADMIN?"approved":"pending",sx:o.sx,a:o.a,h:o.h,g:o.g,wk:o.wk,city:o.city,eq:o.eq,sp:o.sp,wd:"fri",wl:wl,del:{},hide:false,pf:{pr:1,wt:1,ex:1,sl:1,ia:1,dm:1},created:Date.now(),la:Date.now()});return}
 else if(a=="push"){var r0=await P.enablePush(UID,pushPayload());toast(r0.msg);if(r0.ok){PUSH_ON=true;localStorage.setItem("yh_push_"+UID,"1")}}
 else if(a=="post"){var tx=val("ptx").trim();if(!tx){msg="اكتب رسالتك الأول.";render();return}await P.addPost({uid:UID,n:U.n,type:val("pty"),text:tx,likes:[]})}
 else if(a=="like"){var pp=POSTS.filter(function(q){return q.id==id})[0];await P.toggleLike(id,UID,(pp.likes||[]).indexOf(UID)>=0)}
 else if(a=="pdel"){await P.delPost(id)}
 else if(IS_ADMIN&&a=="ads"){ad=id;adu=""}
 else if(IS_ADMIN&&a=="ud"){adu=id}
 else if(IS_ADMIN&&a=="sn")stuckN=+id;
 else if(IS_ADMIN&&a=="apr"){await P.setStatus(id,"approved");await P.sendNotif({to:id,title:"✅ تمت الموافقة على حسابك",body:"أهلًا بيك في يومك حلو 🌿 ابدأ رحلتك خطوة بخطوة، وربنا يبارك في صحتك.",kind:"approval"});toast("تمت الموافقة")}
 else if(IS_ADMIN&&a=="rej"){if(oldp==id){await P.setStatus(id,"rejected");toast("تم الرفض")}else pend=id}
 else if(IS_ADMIN&&a=="uow"){await pickUow()}
 else if(IS_ADMIN&&a=="enc"){var u1=ALLU[id];await P.sendNotif({to:id,title:"وحشتنا يا "+(u1.n||"")+" 🌿",body:"خطوة صغيرة النهاردة تكفي: كوب مية وصلاة وتمرين خفيف. إحنا معاك 💪",kind:"encourage"});toast("اتبعتت رسالة التشجيع")}
 else if(IS_ADMIN&&a=="encall"){var ls=appr().filter(function(y){return y.days>=stuckN});for(var i=0;i<ls.length;i++)await P.sendNotif({to:ls[i].id,title:"وحشتنا يا "+ls[i].n+" 🌿",body:"خطوة صغيرة النهاردة تكفي: كوب مية وصلاة وتمرين خفيف. إحنا معاك 💪",kind:"encourage"});toast("اتبعتت لـ "+ls.length)}
 else if(IS_ADMIN&&a=="bc"){var bt=val("bc_t").trim(),bb=val("bc_b").trim();if(!bt||!bb){msg="اكتب العنوان والرسالة.";render();return}await P.sendNotif({to:"all",title:bt,body:bb,kind:"admin"});toast("اتبعتت للجميع")}
 else if(IS_ADMIN&&a=="dm2"){var d2=val("dm_t").trim(),b2=val("dm_b").trim();if(!d2||!b2||!val("dm_u")){msg="اختار المستخدم واكتب العنوان والرسالة.";render();return}await P.sendNotif({to:val("dm_u"),title:d2,body:b2,kind:"admin"});toast("اتبعتت")}
 else if(IS_ADMIN&&a=="dm"){var d3=val("sm_t").trim(),b3=val("sm_b").trim();if(!d3||!b3){msg="اكتب العنوان والرسالة.";render();return}await P.sendNotif({to:id,title:d3,body:b3,kind:"admin"});toast("اتبعتت")}
 else if(IS_ADMIN&&a=="rsave"){await P.saveReport(ds(now),mkReport());toast("اتحفظ التقرير")}
 else if(S){
  S.done[dt]=S.done[dt]||{};S.sets[dt]=S.sets[dt]||{};
  if(a=="t"){if(t.checked)S.done[dt][id]=1;else delete S.done[dt][id]}
  else if(a=="r"){var nn=+t.dataset.n;S.sets[dt][id]=S.sets[dt][id]==nn?0:nn}
  else if(a=="del"){if(oldp==id){S.del[cur]=S.del[cur]||[];S.del[cur].push(id)}else pend=id}
  else if(a=="restore")delete S.del[cur];
  else if(a=="reset"){S.done[dt]={};S.sets[dt]={}}
  else if(a=="xadd"){var xp=XA[+val("xs")],xn=xp[3]?val("xn").trim():xp[0];if(!xn){msg="اكتب اسم النشاط.";render();return}var xid="x"+Date.now();S.ex[dt]=S.ex[dt]||[];S.ex[dt].push({id:xid,n:xn,i:xp[2],met:xp[1],min:+val("xm")});S.sets[dt][xid]=1}
  else if(a=="xdel")S.ex[dt]=(S.ex[dt]||[]).filter(function(q){return q.id!=id});
  else if(a=="fadd"){var fc=FC[+val("fc")],fz=+val("fz");S.food[dt]=S.food[dt]||[];S.food[dt].push({n:fc[0],sz:SZ[fz],kc:fc[1][fz]})}
  else if(a=="fdel")(S.food[dt]||[]).splice(+t.dataset.i,1);
  else if(a=="wp")wo--;else if(a=="wn")wo++;
  else if(a=="psv"){var o2=readF();if(o2.h)U.h=o2.h;if(o2.a)U.a=o2.a;Object.assign(U,{sx:o2.sx,g:o2.g,wk:o2.wk,city:o2.city,eq:o2.eq,sp:o2.sp,wd:val("pd")||"fri",hide:val("fhide")=="1"});["pr","wt","ex","sl","ia","dm"].forEach(function(k){U.pf[k]=+val("np_"+k)});if(o2.w)U.wl[wkey()]=o2.w;if(PUSH_ON)P.savePush(UID,pushPayload());msg="اتحفظت بياناتك واتظبط الروتين."}
  else if(a=="bk")bkTxt=JSON.stringify({u:profPayload(),s:{done:S.done,sets:S.sets,ex:S.ex,food:S.food}});
  else if(a=="bi"){try{var nx=JSON.parse(val("bkt"));if(!nx.u||!nx.s)throw 0;var sv={status:U.status,role:U.role,email:U.email};Object.assign(U,nx.u,sv);normU();["done","sets","ex","food"].forEach(function(k){S[k]=nx.s[k]||{}});S.del=U.del;Object.keys(S.done).forEach(function(k){dirtyD[k]=1});dirtyP=true;sync();bkTxt="";msg="اتسترجعت النسخة."}catch(e){msg="النص مش نسخة صحيحة."}}
  if(DAYACT.indexOf(","+a+",")>=0)sync(dt,false);if(PACT.indexOf(","+a+",")>=0)sync(null,true)}
 }catch(e){msg=aerr(e)}
 render()});
document.addEventListener("keydown",function(ev){if(ev.key=="Escape")$("modal").hidden=true});
/* ====================== التثبيت والتشغيل ====================== */
var dp=null;window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();dp=e});
var isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform=="MacIntel"&&navigator.maxTouchPoints>1),isSA=window.navigator.standalone||matchMedia("(display-mode: standalone)").matches;
if(isSA)$("inst").style.display="none";
function steps(h){var b=$("ih");b.innerHTML=h;b.hidden=false}
$("ib-a").onclick=function(){if(dp){dp.prompt();dp.userChoice.then(function(){dp=null});return}steps('<b>على الأندرويد:</b><ol><li>افتح الصفحة في <b>Chrome</b>.</li><li>اضغط ⋮ (القايمة) فوق.</li><li>اختار <b>تثبيت التطبيق</b> (Install app) أو <b>إضافة إلى الشاشة الرئيسية</b>.</li></ol>')};
$("ib-i").onclick=function(){steps('<b>على الآيفون (3 خطوات):</b><ol><li>افتح الصفحة من <b>Safari</b> (مش من جوه واتساب).</li><li>اضغط زرار المشاركة ⬆️ (المربع اللي فيه سهم) تحت.</li><li>اسحب لتحت واضغط <b>إضافة إلى الشاشة الرئيسية</b> ثم <b>إضافة</b>.</li></ol><p class="hint">الإشعارات على الآيفون بتشتغل بعد التثبيت (iOS 16.4 أو أحدث).</p>')};
if("serviceWorker" in navigator)addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});
D.forEach(function(d){DM[d.id]=d});
if(P.ok){P.onPush(function(p){toast("🔔 "+(p.data&&p.data.title||""))});P.onAuth(onUser)}else{loading=false;render()}
