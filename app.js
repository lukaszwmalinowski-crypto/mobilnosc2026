const sharedDays={
intro:['Poniedziałek','13:45-19:30',['Spotkanie w lobby Flisvos Hotel','Zwiedzanie centrum Kalamata','Wprowadzenie do kursu i Areadne LLC']],
trip:['Czwartek','08:00-19:00',['Wyjazd edukacyjny: wielokulturowość w kontekście','Castle of Pylos - Niokastron','Methoni Castle','Lunch i plaża Finikounda, powrót do Kalamata']],
final:['Piątek','16:00-18:30',['Facilitation, Evaluation & Final Project']]
};
const commonSchedule=[
[sharedDays.intro[0],sharedDays.intro[1],sharedDays.intro[2]],
sharedDays.trip,
[sharedDays.final[0],sharedDays.final[1],sharedDays.final[2]]
];
const buildDays=({intro,tuesday,wednesday,final})=>[
['Poniedziałek',sharedDays.intro[1],[intro]],
tuesday,
wednesday,
['Piątek',sharedDays.final[1],final]
];
const courses=[
{title:'Media Literacy, Fake News and Critical Thinking',short:'Fake news, krytyczne myślenie i odporność na manipulację',goals:['Rozpoznawanie fake newsów i dezinformacji','Wzmacnianie odporności na manipulację','Rozwijanie krytycznego myślenia','Ograniczanie stresu związanego z nadmiarem informacji','Promowanie wartości demokratycznych i odpowiedzialności medialnej'],days:buildDays({intro:'Media literacy, ekosystemy informacji, misinformation i disinformation',tuesday:['Wtorek','14:00-18:30',['Fake news, manipulacja i bias','Fact-checking i techniki weryfikacji','Analiza przykładów informacji','Krytyczne myślenie i ocena źródeł']],wednesday:['Środa','16:00-20:30',['Społecznie wrażliwe tematy i wpływ mediów','Polityka, migracja, uchodźcy i wojna w narracjach medialnych','Wartości UE i odpowiedzialna komunikacja','Zdrowe nawyki korzystania z mediów']],final:['Facylitacja i angażowanie uczestników','Ewaluacja, etyka i trendy']})},
{title:'Effective Communication & Public Speaking',short:'Komunikacja, wystąpienia publiczne i prezentacje',goals:['Budowanie pewności i jasności wypowiedzi','Poprawa jakości komunikacji edukacyjnej','Zwiększanie zaangażowania odbiorców','Rozwijanie asertywności i inteligencji emocjonalnej','Wzmacnianie autorefleksji w komunikacji'],days:buildDays({intro:'Podstawy skutecznej komunikacji i autoocena stylów',tuesday:['Wtorek','14:00-18:30',['Public speaking essentials','Głos, artykulacja i struktura wypowiedzi','Pokonywanie tremy','Planowanie prezentacji i storytelling']],wednesday:['Środa','16:00-20:30',['Komunikacja niewerbalna','Mowa ciała i aktywne słuchanie','Asertywność, inteligencja emocjonalna i leadership','Prezentacje końcowe i plan działania']],final:['Techniki facylitacji','Ewaluacja i pomiar wpływu','Wyzwania, etyka i trendy']})},
{title:'Gamification & Game-Based Learning',short:'Gamifikacja i projektowanie aktywności edukacyjnych',goals:['Poznanie podstaw wykorzystania gier w edukacji dorosłych','Rozróżnienie gamifikacji i game-based learning','Analiza własnych praktyk dydaktycznych','Projektowanie aktywności gamifikowanych','Rozwijanie kreatywności, współpracy i kompetencji cyfrowych'],days:buildDays({intro:'Gamification & Adult Learning: motywacja i uczenie dorosłych',tuesday:['Wtorek','14:00-18:30',['Mechanics, Dynamics & Player Experience','Punkty, odznaki, poziomy, nagrody i rankingi','Player types i learner personas','Serious games, escape roomy, symulacje i platformy cyfrowe']],wednesday:['Środa','16:00-20:30',['Instructional Design & Gamified Learning Design','Cele uczenia się i gamified outcomes','Model ADDIE i ocena przez gry','Dostępność i inkluzywność w game-based learning']],final:['Zarządzanie zaangażowaniem uczestników','Evaluation & Impact Measurement','Wyzwania, etyka i trendy gamifikacji']})}
];
const courseList=document.getElementById('courseList');
const renderDays=(days,openFirst=false)=>days.map((d,idx)=>`<details class="day" ${openFirst&&idx===0?'open':''}><summary><span>${d[0]}</span><time>${d[1]}</time></summary><ul>${d[2].map(x=>`<li>${x}</li>`).join('')}</ul></details>`).join('');
courseList.innerHTML=courses.map((c,i)=>`<article class="course-card ${i===0?'open':''}"><button class="course-button" type="button"><span><h3>${c.title}</h3><p>${c.short}</p></span><span class="chev">⌄</span></button><div class="course-content"><div class="goals"><h4>Główne cele</h4><ul>${c.goals.map(g=>`<li>${g}</li>`).join('')}</ul></div><div class="days"><h4>Tematy tylko dla tego kursu</h4>${renderDays(c.days,true)}</div></div></article>`).join('');
document.getElementById('commonSchedule').innerHTML=`<div class="section-head compact"><span>Bez powtórzeń</span><h2>Wspólny harmonogram</h2></div><div class="shared-card">${renderDays(commonSchedule)}</div>`;
document.querySelectorAll('.course-button').forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.course-card');document.querySelectorAll('.course-card').forEach(c=>{if(c!==card)c.classList.remove('open')});card.classList.toggle('open')}));
let deferredPrompt;const installBtn=document.getElementById('installBtn');window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false});installBtn?.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;installBtn.hidden=true;deferredPrompt=null});if('serviceWorker'in navigator){navigator.serviceWorker.register('service-worker.js').then(()=>{document.getElementById('status').textContent='Aplikacja gotowa do działania offline.'}).catch(()=>{})}
