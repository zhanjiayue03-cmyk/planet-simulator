import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./index-Bco-m_c9.js";var d=new WeakMap;function f(e,t){d.set(e,t)}function p(e,t){(d.get(e)??d.get(e.closest?.(`.app-shell`)??e))?.prepare(t)()}function m(e,t,n){n.addEventListener(`click`,n=>{n.defaultPrevented||p(e,t.open?`droplet`:`bloom`)})}var h=[1,3600,21600,86400,864e3,2592e3],g=Object.freeze({batchMs:8,batchSteps:512,jumpMs:3e4,jumpSteps:1e6,snapshotMs:40,progressMs:250,commitMs:3e4});function _(e,t,n=g.jumpSteps){if(!Number.isFinite(e)||e<=0||!Number.isFinite(t)||t<=0||!Number.isSafeInteger(n)||n<1)return{ok:!1,error:`INVALID_DURATION`};if(e>t*n)return{ok:!1,error:`STEP_BUDGET`};let r=Math.round(e/t);return!Number.isSafeInteger(r)||r<1||!Number.isFinite(r*t)?{ok:!1,error:`INVALID_DURATION`}:{ok:!0,steps:r,seconds:r*t}}function v(e,t=g.jumpSteps){return{min:e/2/86400,max:e*t/86400}}function y(e,t,n=g.jumpSteps){let r=v(t,n);return Number.isFinite(e)&&e>r.max?{ok:!1,error:`STEP_BUDGET`}:_(e===r.max?t*n:e===r.min?t/2:e*86400,t,n)}var b=new Intl.DateTimeFormat(`zh-CN`,{timeZone:`UTC`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hourCycle:`h23`});function x(e){if(!Number.isFinite(e))throw RangeError(`Invalid simulation time`);return b.format(new Date(Date.UTC(2e3,0,1,12)+e*1e3))}var S=[`star`,`terrestrial-planet`,`gas-giant`,`moon`,`dwarf-planet`,`asteroid`,`comet`,`black-hole`];function C(e,t,n=[]){return{ok:!1,error:{code:e,field:t,bodyIds:n}}}function w(e){return e.collision.boundary===`capture-radius`?e.collision.captureRadiusM:e.radiusM}function T(e,t,n=0){let r={x:t.positionM.x-e.positionM.x,y:t.positionM.y-e.positionM.y,z:t.positionM.z-e.positionM.z},i=Math.hypot(r.x,r.y,r.z),a=w(e)+w(t),o=[e.id,t.id];return!Number.isFinite(i)||!Number.isFinite(a)?C(`NON_FINITE_CALCULATION`,`pairDistance`,o):i===0?C(`COINCIDENT_BODIES`,`pairDistance`,o):i<=a&&!(n>0&&a-i<=n)?C(`PHYSICAL_OVERLAP`,`collisionBoundary`,o):i<=32*2**-52*Math.max(Math.abs(e.positionM.x),Math.abs(e.positionM.y),Math.abs(e.positionM.z),Math.abs(t.positionM.x),Math.abs(t.positionM.y),Math.abs(t.positionM.z))?C(`NUMERICAL_RANGE`,`separationResolution`,o):{ok:!0,value:{separationM:r,distanceM:i,gapM:i-a}}}var E={minPeriodSeconds:360,maxPeriodSeconds:36e7};function D(e){if(!e||typeof e!=`object`)return!1;let t=e;return Number.isFinite(t.periodSeconds)&&t.periodSeconds>=E.minPeriodSeconds&&t.periodSeconds<=E.maxPeriodSeconds&&Number.isFinite(t.tiltDegrees)&&t.tiltDegrees>=0&&t.tiltDegrees<=180&&(t.direction===1||t.direction===-1)&&Number.isFinite(t.phaseDegrees)&&t.phaseDegrees>=0&&t.phaseDegrees<360&&Number.isFinite(t.epochSeconds)&&t.epochSeconds>=0}function O(e,t){let n=(t-e.epochSeconds)%e.periodSeconds/e.periodSeconds;return((e.phaseDegrees+e.direction*n*360)%360+360)%360}function k(e,t){return e===t||!!e&&!!t&&e.periodSeconds===t.periodSeconds&&e.tiltDegrees===t.tiltDegrees&&e.direction===t.direction&&e.phaseDegrees===t.phaseDegrees&&e.epochSeconds===t.epochSeconds}function A(e){if(!e||typeof e!=`object`)return!1;let t=e;return Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)}function j(e){return typeof e==`number`&&Number.isFinite(e)&&e>0}function M(e){return j(e)?{ok:!0,value:e}:C(`INVALID_INPUT`,`timeStepSeconds`)}function N(e){if(!Array.isArray(e))return C(`INVALID_INPUT`,`bodies`);let t=new Set;for(let n of e){if(!n||typeof n!=`object`)return C(`INVALID_INPUT`,`body`);for(let e of[`id`,`name`,`materialId`])if(typeof n[e]!=`string`||!n[e].trim())return C(`INVALID_INPUT`,e);if(t.has(n.id))return C(`INVALID_INPUT`,`duplicateId`,[n.id]);if(t.add(n.id),!S.includes(n.kind))return C(`INVALID_INPUT`,`kind`,[n.id]);if(n.displaySpin!==void 0&&(n.kind===`black-hole`||!D(n.displaySpin)))return C(`INVALID_INPUT`,`displaySpin`,[n.id]);for(let e of[`massKg`,`radiusM`])if(!j(n[e]))return C(`INVALID_INPUT`,e,[n.id]);for(let e of[`positionM`,`velocityMS`])if(!A(n[e]))return C(`INVALID_INPUT`,e,[n.id]);let e=n.collision;if(!e||(n.kind===`black-hole`?e.boundary!==`capture-radius`||!j(e.captureRadiusM):e.boundary!==`physical-radius`))return C(`INVALID_INPUT`,`collision`,[n.id])}return{ok:!0,value:e}}function P(e){return e.map(e=>({...e,positionM:{...e.positionM},velocityMS:{...e.velocityMS},collision:{...e.collision},...e.displaySpin?{displaySpin:{...e.displaySpin}}:{}}))}var F=(e,t)=>JSON.stringify(e<t?[e,t]:[t,e]),I=66743e-15,L=299792458,R=149597870700;function ee(e,t){let n=N(e);if(!n.ok)return n;let r=e.map(()=>({x:0,y:0,z:0}));for(let n=0;n<e.length;n+=1){let i=e[n];for(let a=n+1;a<e.length;a+=1){let o=e[a],s=T(i,o,t?t.get(F(i.id,o.id))??0:0);if(!s.ok)return s;let{distanceM:c,separationM:l}=s.value,u=I*o.massKg/c/c,d=I*i.massKg/c/c;if(!Number.isFinite(u)||!Number.isFinite(d))return C(`NON_FINITE_CALCULATION`,`pairAcceleration`,[i.id,o.id]);if(u===0||d===0)return C(`NUMERICAL_RANGE`,`accelerationUnderflow`,[i.id,o.id]);for(let e of[`x`,`y`,`z`]){let t=l[e]/c;r[n][e]+=t*u,r[a][e]-=t*d}}}return r.every(A)?{ok:!0,value:r}:C(`NON_FINITE_CALCULATION`,`totalAcceleration`)}function z(e,t){let n=M(t);if(!n.ok)return n;let r=ee(e);return r.ok?{ok:!0,value:{schemaVersion:1,elapsedSeconds:0,config:{timeStepSeconds:t},bodies:P(e)}}:r}function B(e){return{...e,config:{...e.config},bodies:P(e.bodies)}}var V=e=>2*I*e/L**2;function H(e){return e.kind===`black-hole`?{...e,collision:{boundary:`capture-radius`,captureRadiusM:V(e.massKg)}}:{...e,collision:{boundary:`physical-radius`}}}function te(e){return Array.isArray(e)&&e.length<=100&&e.every((t,n)=>{let r=t?.event;return Number.isSafeInteger(t?.id)&&t.id>0&&(n===0||t.id>e[n-1].id)&&!!r&&Number.isFinite(r.timeSeconds)&&r.timeSeconds>=0&&Number.isFinite(r.densityKgM3)&&r.densityKgM3>0&&Array.isArray(r.sourceIds)&&r.sourceIds.length>=2&&new Set(r.sourceIds).size===r.sourceIds.length&&r.sourceIds.every(e=>typeof e==`string`&&!!e)&&Array.isArray(r.sourceNames)&&r.sourceNames.length===r.sourceIds.length&&r.sourceNames.every(e=>typeof e==`string`&&!!e)&&N([r.body]).ok&&r.sourceIds.includes(r.body.id)&&Number.isFinite(r.retainedMassKg)&&r.retainedMassKg>0&&Number.isFinite(r.addedMassKg)&&r.addedMassKg>0&&Math.abs(r.retainedMassKg+r.addedMassKg-r.body.massKg)<=8*2**-52*r.body.massKg&&(r.kind===`merge`&&r.body.kind!==`black-hole`||r.kind===`absorption`&&r.body.kind===`black-hole`)})}function U(e){try{if(!e||e.schemaVersion!==1||!Number.isFinite(e.elapsedSeconds)||e.elapsedSeconds<0||e.config?.timeStepSeconds!==300||!Array.isArray(e.bodies)||e.bodies.length>256||!z(e.bodies,300).ok)return!1;x(e.elapsedSeconds);for(let t=0;t<e.bodies.length;t++){let n=e.bodies[t];if(n.kind===`black-hole`&&(n.collision.boundary!==`capture-radius`||n.collision.captureRadiusM!==V(n.massKg)))return!1;for(let r=t+1;r<e.bodies.length;r++)if(!T(n,e.bodies[r]).ok)return!1}return!0}catch{return!1}}var ne={fileBytes:2e6,bodies:256,records:200,automatic:10,thumbnailBytes:4e5},W=e=>!!e&&[e.x,e.y,e.z].every(e=>Number.isFinite(e)&&Math.abs(e)<0xe8d4a51000);function re(e,t){return!!e&&[`cosmos`,`atelier`].includes(e.theme)&&[`off`,`reference`,`well`].includes(e.gravity)&&[e.axis,e.names,e.shadows,e.orbits].every(e=>typeof e==`boolean`)&&!!e.camera&&W(e.camera.position)&&W(e.camera.target)&&typeof e.camera.followId==`string`&&typeof e.camera.overview==`boolean`&&(e.camera.overview||t.bodies.some(t=>t.id===e.camera.followId))&&(e.camera.distanceLayout===void 0||e.camera.overview&&e.camera.distanceLayout===`compressed`)&&(e.camera.near===void 0||Number.isFinite(e.camera.near)&&e.camera.near>0)&&(e.camera.far===void 0||Number.isFinite(e.camera.far)&&e.camera.far>(e.camera.near??0))&&Number.isFinite(e.camera.minDistance)&&Number.isFinite(e.camera.maxDistance)&&e.camera.minDistance>0&&e.camera.maxDistance>e.camera.minDistance&&Math.hypot(e.camera.position.x-e.camera.target.x,e.camera.position.y-e.camera.target.y,e.camera.position.z-e.camera.target.z)>0}function ie(e){try{return!!e&&e.schemaVersion===1&&typeof e.id==`string`&&e.id.length>0&&e.id.length<100&&Number.isFinite(e.createdAt)&&e.createdAt>0&&Number.isFinite(new Date(e.createdAt).getTime())&&typeof e.name==`string`&&e.name.length<=80&&[`manual`,`checkpoint`,`workspace`].includes(e.kind)&&typeof e.pinned==`boolean`&&Array.isArray(e.state?.bodies)&&e.state.bodies.length<=ne.bodies&&e.state.config?.timeStepSeconds===300&&U(e.state)&&re(e.view,e.state)&&Number.isInteger(e.speedIndex)&&e.speedIndex>=0&&e.speedIndex<6}catch{return!1}}function ae(e,t,n,r,i=``,a=crypto.randomUUID()){let o={schemaVersion:1,id:a,createdAt:Date.now(),name:i.slice(0,80),kind:r,pinned:!1,state:B(e),view:structuredClone(t),speedIndex:n};if(!ie(o))throw Error(`file`);return o}function oe(e,t){let n=e.filter(e=>e.id!==t.id).concat(t),r=n.filter(e=>e.kind===`checkpoint`&&!e.pinned).sort((e,t)=>t.createdAt-e.createdAt||t.id.localeCompare(e.id)),i=new Set(r.slice(ne.automatic).map(e=>e.id)),a=n.filter(e=>!i.has(e.id));if(a.length>ne.records)throw Error(`quota`);return a}async function se(e=`planet-simulator-scenes`){let t=await new Promise((t,n)=>{let r=!1,i=e=>{r||(r=!0,clearTimeout(a),n(e))},a=setTimeout(()=>i(Error(`blocked`)),3e3),o=indexedDB.open(e,1);o.onupgradeneeded=()=>{o.result.createObjectStore(`scenes`,{keyPath:`id`}),o.result.createObjectStore(`images`)},o.onsuccess=()=>{r?o.result.close():(r=!0,clearTimeout(a),t(o.result))},o.onerror=()=>i(o.error),o.onblocked=()=>i(Error(`blocked`))});t.onversionchange=()=>t.close();let n=(e,n)=>new Promise((r,i)=>{let a=n(t.transaction(e,`readonly`).objectStore(e));a.onsuccess=()=>r(a.result),a.onerror=()=>i(a.error)});return{async list(){let e=await n(`scenes`,e=>e.getAll());if(!e.every(ie))throw Error(`file`);return e.sort((e,t)=>t.createdAt-e.createdAt)},async image(e){return await n(`images`,t=>t.get(e))??null},put(e,n,r){return!ie(e)||n!==void 0&&(!n.startsWith(`data:image/jpeg;base64,`)||n.length>ne.thumbnailBytes)?Promise.reject(Error(`file`)):new Promise((i,a)=>{let o=t.transaction([`scenes`,`images`],`readwrite`),s=o.objectStore(`scenes`),c=o.objectStore(`images`),l=s.getAll();o.oncomplete=()=>i(),o.onerror=()=>a(o.error),o.onabort=()=>a(o.error??Error(`quota`)),l.onsuccess=()=>{try{let t=l.result;if(!t.every(ie))throw Error(`file`);let i=oe(t,e),a=new Set(i.map(e=>e.id));for(let e of t)a.has(e.id)||(s.delete(e.id),c.delete(e.id));let o=r?.preserveName?{...e,name:t.find(t=>t.id===e.id)?.name??e.name}:e;a.has(e.id)&&(s.put(structuredClone(o)),n!==void 0&&c.put(n,e.id))}catch{o.abort()}}})},rename(e,n){return typeof n!=`string`||n.length>80?Promise.reject(Error(`file`)):new Promise((r,i)=>{let a=t.transaction(`scenes`,`readwrite`),o=a.objectStore(`scenes`),s=o.get(e);a.oncomplete=()=>r(),a.onerror=()=>i(a.error),a.onabort=()=>i(a.error??Error(`file`)),s.onsuccess=()=>{ie(s.result)?o.put({...s.result,name:n}):a.abort()}})},remove(e){return new Promise((n,r)=>{let i=t.transaction([`scenes`,`images`],`readwrite`);i.objectStore(`scenes`).delete(e),i.objectStore(`images`).delete(e),i.oncomplete=()=>n(),i.onerror=()=>r(i.error),i.onabort=()=>r(i.error)})},close(){t.close()}}}var ce={epoch:{jd:2451545,timeScale:`TDB`,calendar:`2000-01-01 12:00:00 TDB`,note:`Query instant in TDB; standard J2000.0 reference epoch is defined in TT.`},frame:`Solar System Barycenter; fixed Horizons J2000 ecliptic axes derived from ICRF`,units:`SI`,gravitationalConstantSI:66743e-15,bodies:[{id:`sun`,targetId:10,kind:`star`,name:`sun`,gmKm3S2:132712440041.93938,massKg:1988409871326422e15,radiusM:6957e5,positionM:{x:-1067706805.380953,y:-418275271.8194473,z:30861817.2547682},velocityMS:{x:9.312571926520471,y:-12.82475570794162,z:-.1633507186350417},materialId:`sun`,collision:{boundary:`physical-radius`},provenance:{rawFile:`sun.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM, km^3/s^2          = 132712440041.93938`,radiusSourceLine:`Vol. mean radius, km  = 695700`,sha256:`cb2e2c6611002ddc3cbbdcec9e5c78bd8eb96fae92861fcb2ffd7bf2a6e5d1ae`}},{id:`mercury`,targetId:199,kind:`terrestrial-planet`,name:`mercury`,gmKm3S2:22031.86855,massKg:33010006367708975e7,radiusM:2439400,positionM:{x:-20529433161.23468,y:-67331550535.34345,z:-3648992526.494771},velocityMS:{x:37004.30442920571,y:-11177.24068132644,z:-4307.7914693768535},materialId:`mercury`,collision:{boundary:`physical-radius`},provenance:{rawFile:`mercury.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM (km^3/s^2)         = 22031.86855`,radiusSourceLine:`Vol. Mean Radius (km) =  2439.4`,sha256:`67df65e146fe7bdeb0102708b3db1ac2a787bd9fd7743b5843350dbe17431935`}},{id:`venus`,targetId:299,kind:`terrestrial-planet`,name:`venus`,gmKm3S2:324858.592,massKg:4867305814842006e9,radiusM:6051840,positionM:{x:-108524200857.5715,y:-5303290247.691983,z:6166496116.973171},velocityMS:{x:1391.2186011899669,y:-35153.11993215464,z:-560.2056890007159},materialId:`venus`,collision:{boundary:`physical-radius`},provenance:{rawFile:`venus.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM (km^3/s^2)         = 324858.592`,radiusSourceLine:`Vol. Mean Radius (km) =  6051.84`,sha256:`746de16bf756bd0d97207a4fa40745f09e5b4fcfd43ae2a20279356ab9ff9049`}},{id:`earth`,targetId:399,kind:`terrestrial-planet`,name:`earth`,gmKm3S2:398600.435436,massKg:5972168398723462e9,radiusM:6371010,positionM:{x:-27566740482.81145,y:144279021520.7299,z:30250667.8288132},velocityMS:{x:-29784.947498510883,y:-5482.119695478543,z:.01843295986780902},materialId:`earth`,collision:{boundary:`physical-radius`},provenance:{rawFile:`earth.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM, km^3/s^2             = 398600.435436`,radiusSourceLine:`Vol. Mean Radius (km)    = 6371.01`,sha256:`d58d6b539428bddb6fbba53d24004c9fdf384894d11ff50a87b1a314a68bda40`}},{id:`moon`,targetId:301,kind:`moon`,name:`moon`,gmKm3S2:4902.800066,massKg:7345789170399893e7,radiusM:1737530,positionM:{x:-27858348866.99916,y:144004041779.0567,z:66521864.45580423},velocityMS:{x:-29141.41610952193,y:-6213.103678165645,z:-11.48803177931867},materialId:`moon`,collision:{boundary:`physical-radius`},provenance:{rawFile:`moon.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM, km^3/s^2          = 4902.800066`,radiusSourceLine:`Vol. mean radius, km  = 1737.53`,sha256:`6312a38c25eaddb0e3b9d307ef5df4bbb1ca121c1782e3d6b61aa683a7295315`}},{id:`mars`,targetId:499,kind:`terrestrial-planet`,name:`mars`,gmKm3S2:42828.375662,massKg:641690898850816e9,radiusM:3389920,positionM:{x:206980433836.461,y:-2425327899.844669,z:-5125427142.013254},velocityMS:{x:1171.984975692608,y:26283.23978975472,z:522.1336722766505},materialId:`mars`,collision:{boundary:`physical-radius`},provenance:{rawFile:`mars.json`,apiVersion:`1.2`,targetEphemeris:`mar099`,gmSourceLine:`GM (km^3/s^2)         = 42828.375662`,radiusSourceLine:`Vol. mean radius (km) = 3389.92`,sha256:`dd24dc0047e12c586fb493e1c7a72a7e4cba84ba97c52f371aa90c1b1ab4c2c4`}},{id:`jupiter`,targetId:599,kind:`gas-giant`,name:`jupiter`,gmKm3S2:126686531.9,massKg:18981246258034552e11,radiusM:69911e3,positionM:{x:597499917851.6835,y:439186404676.3535,z:-15195999855.73271},velocityMS:{x:-7900.547720245487,y:11143.392770659339,z:130.7023308637314},materialId:`jupiter`,collision:{boundary:`physical-radius`},provenance:{rawFile:`jupiter.json`,apiVersion:`1.2`,targetEphemeris:`jup365_merged`,gmSourceLine:`GM (km^3/s^2)         = 126686531.900`,radiusSourceLine:`Vol. Mean Radius (km) = 69911`,sha256:`8752ceb731b878c45b34f483c8972d1a6a6398ff290c7db7f87d0d466fb176bb`}},{id:`saturn`,targetId:699,kind:`gas-giant`,name:`saturn`,gmKm3S2:37931206.234,massKg:5683173701212113e11,radiusM:58232e3,positionM:{x:957317652110.3407,y:982438007687.5085,z:-55182117881.50037},velocityMS:{x:-7421.90038683812,y:6723.930997200832,z:177.5749426205731},materialId:`saturn`,collision:{boundary:`physical-radius`},provenance:{rawFile:`saturn.json`,apiVersion:`1.2`,targetEphemeris:`sat441l`,gmSourceLine:`GM (km^3/s^2)         = 37931206.234`,radiusSourceLine:`Vol. Mean Radius (km) = 58232`,sha256:`33448109a5a8b5567862de01f31158876fb245322a558cac7cca10394cad3f03`}},{id:`uranus`,targetId:799,kind:`gas-giant`,name:`uranus`,gmKm3S2:5793950.6103,massKg:8680986186266726e10,radiusM:25362e3,positionM:{x:2157907112723.4167,y:-2055043811740.0369,z:-35594639499.61483},velocityMS:{x:4646.584677611653,y:4614.773473441427,z:-43.085218888708745},materialId:`uranus`,collision:{boundary:`physical-radius`},provenance:{rawFile:`uranus.json`,apiVersion:`1.2`,targetEphemeris:`ura184_merged`,gmSourceLine:`GM (km^3/s^2)         = 5793950.6103`,radiusSourceLine:`Vol. Mean Radius (km) = 25362`,sha256:`49f90b187a455dd1f7a22cc1b4d57f74e3bef95c0a717ae7f84a22f96ced84e1`}},{id:`neptune`,targetId:899,kind:`gas-giant`,name:`neptune`,gmKm3S2:6835099.97,massKg:1024092409690904e11,radiusM:24624e3,positionM:{x:2513978816984.908,y:-3739132842893.97,z:19063078769.80734},velocityMS:{x:4474.58791838248,y:3063.15514301819,z:-166.4119952893173},materialId:`neptune`,collision:{boundary:`physical-radius`},provenance:{rawFile:`neptune.json`,apiVersion:`1.2`,targetEphemeris:`nep098_merged`,gmSourceLine:`GM (km^3/s^2)         = 6835099.97`,radiusSourceLine:`Vol. mean radius (km) = 24624`,sha256:`6c26f9f4c11557f401eed5f6d923fcf778875ed21f5c4e8c8ff1136cb9e29431`}}]},le=Object.freeze({...ce.epoch}),ue=Object.freeze(ce.bodies.map(e=>Object.freeze({id:e.id,name:e.name,kind:e.kind,massKg:e.massKg,radiusM:e.radiusM,positionM:Object.freeze({...e.positionM}),velocityMS:Object.freeze({...e.velocityMS}),materialId:e.materialId,collision:Object.freeze({boundary:`physical-radius`})})));function de(e=300){return z(ue,e)}var fe=[`alignment`,`binary`,`retrograde`],G=e=>structuredClone(ue.find(t=>t.id===e)),pe={x:0,y:0,z:0};function me(e){let t=e.reduce((e,t)=>e+t.massKg,0),n={...pe},r={...pe};for(let i of e)for(let e of[`x`,`y`,`z`])n[e]+=i.massKg/t*i.positionM[e],r[e]+=i.massKg/t*i.velocityMS[e];return e.map(e=>({...e,positionM:{x:e.positionM.x-n.x,y:e.positionM.y-n.y,z:e.positionM.z-n.z},velocityMS:{x:e.velocityMS.x-r.x,y:e.velocityMS.y-r.y,z:e.velocityMS.z-r.z}}))}function he(e,t,n,r,i=1){let a=Math.sqrt(I*(t.massKg+e.massKg)/n),o=Math.cos(r),s=Math.sin(r);return{...e,positionM:{x:n*o,y:n*s,z:0},velocityMS:{x:-i*a*s,y:i*a*o,z:0}}}function K(e,t,n=t){let r={...G(`sun`),positionM:{...pe},velocityMS:{...pe}},i;if(e===`alignment`){let e=[`mercury`,`venus`,`earth`,`mars`,`jupiter`,`saturn`,`uranus`].map(G),t=G(`sun`);i=[r,...e.map(e=>he(e,r,Math.hypot(e.positionM.x-t.positionM.x,e.positionM.y-t.positionM.y,e.positionM.z-t.positionM.z),0))]}else if(e===`binary`){let e=1.5*R,a=Math.sqrt(I*r.massKg/(2*e));i=[{...r,id:`experiment-primary`,name:n,materialId:`procedural`,positionM:{x:-e/2,y:0,z:0},velocityMS:{x:0,y:-a,z:0}},{...r,id:`experiment-companion`,name:t,materialId:`procedural`,positionM:{x:e/2,y:0,z:0},velocityMS:{x:0,y:a,z:0}}]}else{let e={...G(`earth`),id:`experiment-traveler`,name:t,materialId:`procedural`};i=[r,he(G(`earth`),r,R,0),he(e,r,1.6*R,Math.PI*.65,-1)]}let a=z(me(i),300);if(!a.ok)throw Error(`experiment`);return a.value}var ge={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},q={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},J=1e3,_e=1001,ve=1002,ye=1003,be=1004,xe=1005,Se=1006,Ce=1007,we=1008,Te=1009,Ee=1010,De=1011,Oe=1012,ke=1013,Ae=1014,je=1015,Me=1016,Ne=1017,Pe=1018,Fe=1020,Ie=35902,Le=35899,Re=1021,ze=1022,Be=1023,Ve=1026,He=1027,Ue=1028,We=1029,Ge=1030,Ke=1031,qe=1033,Je=33776,Ye=33777,Xe=33778,Ze=33779,Qe=35840,$e=35841,et=35842,tt=35843,nt=36196,rt=37492,it=37496,at=37488,ot=37489,st=37490,ct=37491,lt=37808,ut=37809,dt=37810,ft=37811,pt=37812,mt=37813,ht=37814,gt=37815,_t=37816,vt=37817,yt=37818,bt=37819,xt=37820,St=37821,Ct=36492,wt=36494,Tt=36495,Et=36283,Dt=36284,Ot=36285,kt=36286,At=2300,jt=2301,Mt=2302,Nt=2303,Pt=2400,Ft=2401,It=2402,Lt=3200,Rt=`srgb`,zt=`srgb-linear`,Bt=`linear`,Vt=`srgb`,Ht=7680,Ut=35044,Wt=2e3;function Gt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Kt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function qt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Jt(){let e=qt(`canvas`);return e.style.display=`block`,e}var Yt={};function Xt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Zt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function Y(...e){e=Zt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function X(...e){e=Zt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qt(...e){let t=e.join(` `);t in Yt||(Yt[t]=!0,Y(...e))}function $t(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var en={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},tn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},nn=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),rn=1234567,an=Math.PI/180,on=180/Math.PI;function sn(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(nn[e&255]+nn[e>>8&255]+nn[e>>16&255]+nn[e>>24&255]+`-`+nn[t&255]+nn[t>>8&255]+`-`+nn[t>>16&15|64]+nn[t>>24&255]+`-`+nn[n&63|128]+nn[n>>8&255]+`-`+nn[n>>16&255]+nn[n>>24&255]+nn[r&255]+nn[r>>8&255]+nn[r>>16&255]+nn[r>>24&255]).toLowerCase()}function cn(e,t,n){return Math.max(t,Math.min(n,e))}function ln(e,t){return(e%t+t)%t}function un(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function dn(e,t,n){return e===t?0:(n-e)/(t-e)}function fn(e,t,n){return(1-n)*e+n*t}function pn(e,t,n,r){return fn(e,t,1-Math.exp(-n*r))}function mn(e,t=1){return t-Math.abs(ln(e,t*2)-t)}function hn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function gn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function _n(e,t){return e+Math.floor(Math.random()*(t-e+1))}function vn(e,t){return e+Math.random()*(t-e)}function yn(e){return e*(.5-Math.random())}function bn(e){e!==void 0&&(rn=e);let t=rn+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xn(e){return e*an}function Sn(e){return e*on}function Cn(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function wn(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Tn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function En(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:Y(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Dn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function On(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var kn={DEG2RAD:an,RAD2DEG:on,generateUUID:sn,clamp:cn,euclideanModulo:ln,mapLinear:un,inverseLerp:dn,lerp:fn,damp:pn,pingpong:mn,smoothstep:hn,smootherstep:gn,randInt:_n,randFloat:vn,randFloatSpread:yn,seededRandom:bn,degToRad:xn,radToDeg:Sn,isPowerOfTwo:Cn,ceilPowerOfTwo:wn,floorPowerOfTwo:Tn,setQuaternionFromProperEuler:En,normalize:On,denormalize:Dn},Z=class e{static#e=e.prototype.isVector2=!0;constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=cn(this.x,e.x,t.x),this.y=cn(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=cn(this.x,e,t),this.y=cn(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(cn(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(cn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},An=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:Y(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(cn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Q=class e{static#e=e.prototype.isVector3=!0;constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=cn(this.x,e.x,t.x),this.y=cn(this.y,e.y,t.y),this.z=cn(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=cn(this.x,e,t),this.y=cn(this.y,e,t),this.z=cn(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(cn(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jn.copy(this).projectOnVector(e),this.sub(jn)}reflect(e){return this.sub(jn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(cn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jn=new Q,Mn=new An,Nn=class e{static#e=e.prototype.isMatrix3=!0;constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Qt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Pn.makeScale(e,t)),this}rotate(e){return Qt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Pn.makeRotation(-e)),this}translate(e,t){return Qt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Pn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pn=new Nn,Fn=new Nn().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),In=new Nn().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ln(){let e={enabled:!0,workingColorSpace:zt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=zn(e.r),e.g=zn(e.g),e.b=zn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Bn(e.r),e.g=Bn(e.g),e.b=Bn(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Bt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Qt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Qt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[zt]:{primaries:t,whitePoint:r,transfer:Bt,toXYZ:Fn,fromXYZ:In,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:t,whitePoint:r,transfer:Vt,toXYZ:Fn,fromXYZ:In,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}}),e}var Rn=Ln();function zn(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Bn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Vn,Hn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vn===void 0&&(Vn=qt(`canvas`)),Vn.width=e.width,Vn.height=e.height;let t=Vn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Vn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=qt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=zn(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(zn(t[e]/255)*255):t[e]=zn(t[e]);return{data:t,width:e.width,height:e.height}}return Y(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Un=0,Wn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Un++}),this.uuid=sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Gn(r[t].image)):e.push(Gn(r[t]))}else e=Gn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Gn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Hn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Y(`Texture: Unable to serialize Texture.`),{})}var Kn=0,qn=new Q,Jn=class e extends tn{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=_e,i=_e,a=Se,o=we,s=Be,c=Te,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kn++}),this.uuid=sn(),this.name=``,this.source=new Wn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Z(0,0),this.repeat=new Z(1,1),this.center=new Z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qn).x}get height(){return this.source.getSize(qn).y}get depth(){return this.source.getSize(qn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Y(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?Y(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case J:e.x-=Math.floor(e.x);break;case _e:e.x=e.x<0?0:1;break;case ve:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case J:e.y-=Math.floor(e.y);break;case _e:e.y=e.y<0?0:1;break;case ve:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jn.DEFAULT_IMAGE=null,Jn.DEFAULT_MAPPING=300,Jn.DEFAULT_ANISOTROPY=1;var Yn=class e{static#e=e.prototype.isVector4=!0;constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=cn(this.x,e.x,t.x),this.y=cn(this.y,e.y,t.y),this.z=cn(this.z,e.z,t.z),this.w=cn(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=cn(this.x,e,t),this.y=cn(this.y,e,t),this.z=cn(this.z,e,t),this.w=cn(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(cn(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xn=class extends tn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Se,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yn(0,0,e,t),this.scissorTest=!1,this.viewport=new Yn(0,0,e,t),this.textures=[];let r=new Jn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Se,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Wn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Zn=class extends Xn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Qn=class extends Jn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ye,this.minFilter=ye,this.wrapR=_e,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},$n=class extends Jn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ye,this.minFilter=ye,this.wrapR=_e,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},er=class e{static#e=e.prototype.isMatrix4=!0;constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/tr.setFromMatrixColumn(e,0).length(),i=1/tr.setFromMatrixColumn(e,1).length(),a=1/tr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rr,e,ir)}lookAt(e,t,n){let r=this.elements;return sr.subVectors(e,t),sr.lengthSq()===0&&(sr.z=1),sr.normalize(),ar.crossVectors(n,sr),ar.lengthSq()===0&&(Math.abs(n.z)===1?sr.x+=1e-4:sr.z+=1e-4,sr.normalize(),ar.crossVectors(n,sr)),ar.normalize(),or.crossVectors(sr,ar),r[0]=ar.x,r[4]=or.x,r[8]=sr.x,r[1]=ar.y,r[5]=or.y,r[9]=sr.y,r[2]=ar.z,r[6]=or.z,r[10]=sr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=tr.set(r[0],r[1],r[2]).length(),o=tr.set(r[4],r[5],r[6]).length(),s=tr.set(r[8],r[9],r[10]).length();i<0&&(a=-a),nr.copy(this);let c=1/a,l=1/o,u=1/s;return nr.elements[0]*=c,nr.elements[1]*=c,nr.elements[2]*=c,nr.elements[4]*=l,nr.elements[5]*=l,nr.elements[6]*=l,nr.elements[8]*=u,nr.elements[9]*=u,nr.elements[10]*=u,t.setFromRotationMatrix(nr),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Wt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Wt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},tr=new Q,nr=new er,rr=new Q(0,0,0),ir=new Q(1,1,1),ar=new Q,or=new Q,sr=new Q,cr=new er,lr=new An,ur=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-cn(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(cn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-cn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(cn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-cn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:Y(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cr.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cr,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lr.setFromEuler(this),this.setFromQuaternion(lr,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ur.DEFAULT_ORDER=`XYZ`;var dr=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},fr=0,pr=new Q,mr=new An,hr=new er,gr=new Q,_r=new Q,vr=new Q,yr=new An,br=new Q(1,0,0),xr=new Q(0,1,0),Sr=new Q(0,0,1),Cr={type:`added`},wr={type:`removed`},Tr={type:`childadded`,child:null},Er={type:`childremoved`,child:null},Dr=class e extends tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fr++}),this.uuid=sn(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Q,n=new ur,r=new An,i=new Q(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new er},normalMatrix:{value:new Nn}}),this.matrix=new er,this.matrixWorld=new er,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mr.setFromAxisAngle(e,t),this.quaternion.multiply(mr),this}rotateOnWorldAxis(e,t){return mr.setFromAxisAngle(e,t),this.quaternion.premultiply(mr),this}rotateX(e){return this.rotateOnAxis(br,e)}rotateY(e){return this.rotateOnAxis(xr,e)}rotateZ(e){return this.rotateOnAxis(Sr,e)}translateOnAxis(e,t){return pr.copy(e).applyQuaternion(this.quaternion),this.position.add(pr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(br,e)}translateY(e){return this.translateOnAxis(xr,e)}translateZ(e){return this.translateOnAxis(Sr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gr.copy(e):gr.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hr.lookAt(_r,gr,this.up):hr.lookAt(gr,_r,this.up),this.quaternion.setFromRotationMatrix(hr),r&&(hr.extractRotation(r.matrixWorld),mr.setFromRotationMatrix(hr),this.quaternion.premultiply(mr.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(X(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cr),Tr.child=e,this.dispatchEvent(Tr),Tr.child=null):X(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wr),Er.child=e,this.dispatchEvent(Er),Er.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hr.multiply(e.parent.matrixWorld)),e.applyMatrix4(hr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cr),Tr.child=e,this.dispatchEvent(Tr),Tr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,e,vr),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,yr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Dr.DEFAULT_UP=new Q(0,1,0),Dr.DEFAULT_MATRIX_AUTO_UPDATE=!0,Dr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Or=class extends Dr{constructor(){super(),this.isGroup=!0,this.type=`Group`}},kr={type:`move`},Ar=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Or,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Or,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Or,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Or;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},jr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mr={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function Pr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Fr=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rn.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Rn.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rn.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Rn.workingColorSpace){if(e=ln(e,1),t=cn(t,0,1),n=cn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Pr(i,r,e+1/3),this.g=Pr(i,r,e),this.b=Pr(i,r,e-1/3)}return Rn.colorSpaceToWorking(this,r),this}setStyle(e,t=Rt){function n(t){t!==void 0&&parseFloat(t)<1&&Y(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:Y(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);Y(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){let n=jr[e.toLowerCase()];return n===void 0?Y(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zn(e.r),this.g=zn(e.g),this.b=zn(e.b),this}copyLinearToSRGB(e){return this.r=Bn(e.r),this.g=Bn(e.g),this.b=Bn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return Rn.workingToColorSpace(Ir.copy(this),e),Math.round(cn(Ir.r*255,0,255))*65536+Math.round(cn(Ir.g*255,0,255))*256+Math.round(cn(Ir.b*255,0,255))}getHexString(e=Rt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rn.workingColorSpace){Rn.workingToColorSpace(Ir.copy(this),t);let n=Ir.r,r=Ir.g,i=Ir.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Rn.workingColorSpace){return Rn.workingToColorSpace(Ir.copy(this),t),e.r=Ir.r,e.g=Ir.g,e.b=Ir.b,e}getStyle(e=Rt){Rn.workingToColorSpace(Ir.copy(this),e);let t=Ir.r,n=Ir.g,r=Ir.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Mr),this.setHSL(Mr.h+e,Mr.s+t,Mr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mr),e.getHSL(Nr);let n=fn(Mr.h,Nr.h,t),r=fn(Mr.s,Nr.s,t),i=fn(Mr.l,Nr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ir=new Fr;Fr.NAMES=jr;var Lr=class extends Dr{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ur,this.environmentIntensity=1,this.environmentRotation=new ur,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rr=new Q,zr=new Q,Br=new Q,Vr=new Q,Hr=new Q,Ur=new Q,Wr=new Q,Gr=new Q,Kr=new Q,qr=new Q,Jr=new Yn,Yr=new Yn,Xr=new Yn,Zr=class e{constructor(e=new Q,t=new Q,n=new Q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rr.subVectors(e,t),r.cross(Rr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Rr.subVectors(r,t),zr.subVectors(n,t),Br.subVectors(e,t);let a=Rr.dot(Rr),o=Rr.dot(zr),s=Rr.dot(Br),c=zr.dot(zr),l=zr.dot(Br),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Vr)!==null&&Vr.x>=0&&Vr.y>=0&&Vr.x+Vr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Vr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Vr.x),s.addScaledVector(a,Vr.y),s.addScaledVector(o,Vr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Jr.setScalar(0),Yr.setScalar(0),Xr.setScalar(0),Jr.fromBufferAttribute(e,t),Yr.fromBufferAttribute(e,n),Xr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Jr,i.x),a.addScaledVector(Yr,i.y),a.addScaledVector(Xr,i.z),a}static isFrontFacing(e,t,n,r){return Rr.subVectors(n,t),zr.subVectors(e,t),Rr.cross(zr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rr.subVectors(this.c,this.b),zr.subVectors(this.a,this.b),Rr.cross(zr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Hr.subVectors(r,n),Ur.subVectors(i,n),Gr.subVectors(e,n);let s=Hr.dot(Gr),c=Ur.dot(Gr);if(s<=0&&c<=0)return t.copy(n);Kr.subVectors(e,r);let l=Hr.dot(Kr),u=Ur.dot(Kr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Hr,a);qr.subVectors(e,i);let f=Hr.dot(qr),p=Ur.dot(qr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ur,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Wr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Wr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Hr,a).addScaledVector(Ur,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qr=class{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ei):ei.fromBufferAttribute(r,t),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),ti.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),ti.copy(e.boundingBox)),ti.applyMatrix4(e.matrixWorld),this.union(ti)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ci),li.subVectors(this.max,ci),ni.subVectors(e.a,ci),ri.subVectors(e.b,ci),ii.subVectors(e.c,ci),ai.subVectors(ri,ni),oi.subVectors(ii,ri),si.subVectors(ni,ii);let t=[0,-ai.z,ai.y,0,-oi.z,oi.y,0,-si.z,si.y,ai.z,0,-ai.x,oi.z,0,-oi.x,si.z,0,-si.x,-ai.y,ai.x,0,-oi.y,oi.x,0,-si.y,si.x,0];return!fi(t,ni,ri,ii,li)||(t=[1,0,0,0,1,0,0,0,1],!fi(t,ni,ri,ii,li))?!1:(ui.crossVectors(ai,oi),t=[ui.x,ui.y,ui.z],fi(t,ni,ri,ii,li))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||($r[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$r[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$r[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$r[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$r[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$r[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$r[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$r[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($r)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$r=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],ei=new Q,ti=new Qr,ni=new Q,ri=new Q,ii=new Q,ai=new Q,oi=new Q,si=new Q,ci=new Q,li=new Q,ui=new Q,di=new Q;function fi(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){di.fromArray(e,a);let o=i.x*Math.abs(di.x)+i.y*Math.abs(di.y)+i.z*Math.abs(di.z),s=t.dot(di),c=n.dot(di),l=r.dot(di);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var pi=new Q,mi=new Z,hi=0,gi=class extends tn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hi++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ut,this.updateRanges=[],this.gpuType=je,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mi.fromBufferAttribute(this,t),mi.applyMatrix3(e),this.setXY(t,mi.x,mi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pi.fromBufferAttribute(this,t),pi.applyMatrix3(e),this.setXYZ(t,pi.x,pi.y,pi.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pi.fromBufferAttribute(this,t),pi.applyMatrix4(e),this.setXYZ(t,pi.x,pi.y,pi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pi.fromBufferAttribute(this,t),pi.applyNormalMatrix(e),this.setXYZ(t,pi.x,pi.y,pi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pi.fromBufferAttribute(this,t),pi.transformDirection(e),this.setXYZ(t,pi.x,pi.y,pi.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=On(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),n=On(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),n=On(n,this.array),r=On(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),n=On(n,this.array),r=On(r,this.array),i=On(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},_i=class extends gi{constructor(e,t,n){super(new Uint16Array(e),t,n)}},vi=class extends gi{constructor(e,t,n){super(new Uint32Array(e),t,n)}},yi=class extends gi{constructor(e,t,n){super(new Float32Array(e),t,n)}},bi=new Qr,xi=new Q,Si=new Q,Ci=class{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?bi.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xi.subVectors(e,this.center);let t=xi.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(xi,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Si.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xi.copy(e.center).add(Si)),this.expandByPoint(xi.copy(e.center).sub(Si))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wi=0,Ti=new er,Ei=new Dr,Di=new Q,Oi=new Qr,ki=new Qr,Ai=new Q,ji=class e extends tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wi++}),this.uuid=sn(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Gt(e)?vi:_i)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Nn().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,t,n){return Ti.makeTranslation(e,t,n),this.applyMatrix4(Ti),this}scale(e,t,n){return Ti.makeScale(e,t,n),this.applyMatrix4(Ti),this}lookAt(e){return Ei.lookAt(e),Ei.updateMatrix(),this.applyMatrix4(Ei.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new yi(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&Y(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)X(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Oi.setFromBufferAttribute(n),this.morphTargetsRelative?(Ai.addVectors(this.boundingBox.min,Oi.min),this.boundingBox.expandByPoint(Ai),Ai.addVectors(this.boundingBox.max,Oi.max),this.boundingBox.expandByPoint(Ai)):(this.boundingBox.expandByPoint(Oi.min),this.boundingBox.expandByPoint(Oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&X(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)X(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Q,1/0);else if(e){let n=this.boundingSphere.center;if(Oi.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ki.setFromBufferAttribute(n),this.morphTargetsRelative?(Ai.addVectors(Oi.min,ki.min),Oi.expandByPoint(Ai),Ai.addVectors(Oi.max,ki.max),Oi.expandByPoint(Ai)):(Oi.expandByPoint(ki.min),Oi.expandByPoint(ki.max))}Oi.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Ai.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Ai));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Ai.fromBufferAttribute(a,t),o&&(Di.fromBufferAttribute(e,t),Ai.add(Di)),r=Math.max(r,n.distanceToSquared(Ai))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&X(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){X(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new gi(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new Q,s[e]=new Q;let c=new Q,l=new Q,u=new Q,d=new Z,f=new Z,p=new Z,m=new Q,h=new Q;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new Q,y=new Q,b=new Q,x=new Q;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new gi(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Q,i=new Q,a=new Q,o=new Q,s=new Q,c=new Q,l=new Q,u=new Q;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ai.fromBufferAttribute(e,t),Ai.normalize(),e.setXYZ(t,Ai.x,Ai.y,Ai.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new gi(a,r,i)}if(this.index===null)return Y(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Mi=new Q,Ni=new Q,Pi=new Nn,Fi=class{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Mi.subVectors(n,t).cross(Ni.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Mi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pi.getNormalMatrix(e),r=this.coplanarPoint(Mi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ii=0,Li=class extends tn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ii++}),this.uuid=sn(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fr(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ht,this.stencilZFail=Ht,this.stencilZPass=Ht,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Y(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?Y(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Fr().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Fi().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Z().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Z().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ri=new Q,zi=new Q,Bi=new Q,Vi=new Q,Hi=class{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){zi.copy(e).add(t).multiplyScalar(.5),Bi.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(zi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Bi),o=Vi.dot(this.direction),s=-Vi.dot(Bi),c=Vi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(zi).addScaledVector(Bi,d),f}intersectSphere(e,t){if(e.radius<0)return null;Ri.subVectors(e.center,this.origin);let n=Ri.dot(this.direction),r=Ri.dot(Ri)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,R=E-F*D,ee=O-P*A,z=k-F*A,B=j-P*N,V=M-F*N,H=B*z-V*ee,te=L*V-R*B,U=ee*R-z*L;if(r){if(H<0||te<0||U<0)return null}else if((H<0||te<0||U<0)&&(H>0||te>0||U>0))return null;let ne=H+te+U;if(ne===0)return null;let W=I*(H*D+te*A+U*N);return(ne>0?W<0:W>0)?null:this.at(W/ne,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ui=class extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Fr(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ur,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wi=new er,Gi=new Hi,Ki=new Ci,qi=new Q,Ji=new Q,Yi=new Q,Xi=new Q,Zi=new Q,Qi=new Q,$i=new Q,ea=new Q,ta=class extends Dr{constructor(e=new ji,t=new Ui){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Qi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Zi.fromBufferAttribute(s,e),a?Qi.addScaledVector(Zi,r):Qi.addScaledVector(Zi.sub(t),r))}t.add(Qi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ki.copy(n.boundingSphere),Ki.applyMatrix4(i),Gi.copy(e.ray).recast(e.near),!(Ki.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(Ki,qi)===null||Gi.origin.distanceToSquared(qi)>(e.far-e.near)**2))&&(Wi.copy(i).invert(),Gi.copy(e.ray).applyMatrix4(Wi),(n.boundingBox===null||Gi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ra(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ra(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ra(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ra(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function na(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ea.copy(s),ea.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ea);return l<n.near||l>n.far?null:{distance:l,point:ea.clone(),object:e}}function ra(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ji),e.getVertexPosition(c,Yi),e.getVertexPosition(l,Xi);let u=na(e,t,n,r,Ji,Yi,Xi,$i);if(u){let e=new Q;Zr.getBarycoord($i,Ji,Yi,Xi,e),i&&(u.uv=Zr.getInterpolatedAttribute(i,s,c,l,e,new Z)),a&&(u.uv1=Zr.getInterpolatedAttribute(a,s,c,l,e,new Z)),o&&(u.normal=Zr.getInterpolatedAttribute(o,s,c,l,e,new Q),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Q,materialIndex:0};Zr.getNormal(Ji,Yi,Xi,t.normal),u.face=t,u.barycoord=e}return u}var ia=class extends Jn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=ye,l=ye,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},aa=new Ci,oa=new Z(.5,.5),sa=new Q,ca=class{constructor(e=new Fi,t=new Fi,n=new Fi,r=new Fi,i=new Fi,a=new Fi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Wt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),aa.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),aa.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(aa)}intersectsSprite(e){return aa.center.set(0,0,0),aa.radius=.7071067811865476+oa.distanceTo(e.center),aa.applyMatrix4(e.matrixWorld),this.intersectsSphere(aa)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(sa.x=r.normal.x>0?e.max.x:e.min.x,sa.y=r.normal.y>0?e.max.y:e.min.y,sa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(sa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},la=class extends Li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Fr(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ua=new Q,da=new Q,fa=new er,pa=new Hi,ma=new Ci,ha=new Q,ga=new Q,_a=class extends Dr{constructor(e=new ji,t=new la){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ua.fromBufferAttribute(t,e-1),da.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ua.distanceTo(da);e.setAttribute(`lineDistance`,new yi(n,1))}else Y(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),ma.radius+=i,e.ray.intersectsSphere(ma)===!1)return;fa.copy(r).invert(),pa.copy(e.ray).applyMatrix4(fa);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=va(this,e,pa,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=va(this,e,pa,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=va(this,e,pa,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=va(this,e,pa,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function va(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(ua.fromBufferAttribute(s,i),da.fromBufferAttribute(s,a),n.distanceSqToSegment(ua,da,ha,ga)>r)return;ha.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ha);if(!(c<t.near||c>t.far))return{distance:c,point:ga.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ya=new Q,ba=new Q,xa=class extends _a{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ya.fromBufferAttribute(t,e),ba.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ya.distanceTo(ba);e.setAttribute(`lineDistance`,new yi(n,1))}else Y(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Sa=class extends Li{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Fr(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ca=new er,wa=new Hi,Ta=new Ci,Ea=new Q,Da=class extends Dr{constructor(e=new ji,t=new Sa){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(r),Ta.radius+=i,e.ray.intersectsSphere(Ta)===!1)return;Ca.copy(r).invert(),wa.copy(e.ray).applyMatrix4(Ca);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ea.fromBufferAttribute(l,n),Oa(Ea,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ea.fromBufferAttribute(l,a),Oa(Ea,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Oa(e,t,n,r,i,a,o){let s=wa.distanceSqToPoint(e);if(s<n){let n=new Q;wa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ka=class extends Jn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Aa=class extends Jn{constructor(e,t,n=Ae,r,i,a,o=ye,s=ye,c,l=Ve,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ja=class extends Aa{constructor(e,t=Ae,n=301,r,i,a=ye,o=ye,s,c=Ve){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ma=class extends Jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Na=class e extends ji{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new yi(c,3)),this.setAttribute(`normal`,new yi(l,3)),this.setAttribute(`uv`,new yi(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Q;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Pa=class e extends ji{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new yi(u,3)),this.setAttribute(`normal`,new yi(d,3)),this.setAttribute(`uv`,new yi(f,2));function _(){let a=new Q,_=new Q,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new Z,m=new Q,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fa=class e extends Pa{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ia=class e extends ji{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new yi(p,3)),this.setAttribute(`normal`,new yi(m,3)),this.setAttribute(`uv`,new yi(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},La=class e extends ji{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new Q,p=new Z;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new yi(s,3)),this.setAttribute(`normal`,new yi(c,3)),this.setAttribute(`uv`,new yi(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Ra=class e extends ji{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new Q,d=new Q,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new yi(p,3)),this.setAttribute(`normal`,new yi(m,3)),this.setAttribute(`uv`,new yi(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function za(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Va(i))i.isRenderTargetTexture?(Y(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Va(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ba(e){let t={};for(let n=0;n<e.length;n++){let r=za(e[n]);for(let e in r)t[e]=r[e]}return t}function Va(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ha(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ua(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Rn.workingColorSpace}var Wa={clone:za,merge:Ba},Ga=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ka=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qa=class extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ga,this.fragmentShader=Ka,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=za(e.uniforms),this.uniformsGroups=Ha(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Fr().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Z().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new Q().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Yn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Nn().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new er().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ja=class extends qa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ya=class extends Li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Fr(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fr(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ur,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Xa=class extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Lt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Za=class extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Qa=class extends la{constructor(e){super(),this.isLineDashedMaterial=!0,this.type=`LineDashedMaterial`,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function $a(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function eo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var to=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},no=class extends to{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pt,endingEnd:Pt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ft:i=e,o=2*t-n;break;case It:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ft:a=e,s=2*n-t;break;case It:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ro=class extends to{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},io=class extends to{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ao=class extends to{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=co(n,t,g,y,r);i[p]=oo(x,o,_,b,m)}return i}};function oo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function so(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function co(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=oo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=so(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var lo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=$a(t,this.TimeBufferType),this.values=$a(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$a(e.times,Array),values:$a(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),eo(e.settings)&&(n.settings={inTangents:$a(e.settings.inTangents,Array),outTangents:$a(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new no(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ao(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case At:t=this.InterpolantFactoryMethodDiscrete;break;case jt:t=this.InterpolantFactoryMethodLinear;break;case Mt:t=this.InterpolantFactoryMethodSmooth;break;case Nt:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return Y(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return At;case this.InterpolantFactoryMethodLinear:return jt;case this.InterpolantFactoryMethodSmooth:return Mt;case this.InterpolantFactoryMethodBezier:return Nt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;eo(this.settings)&&(uo(this.settings.inTangents,e),uo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(X(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(X(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){X(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){X(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Kt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){X(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Mt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,eo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function uo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}lo.prototype.ValueTypeName=``,lo.prototype.TimeBufferType=Float32Array,lo.prototype.ValueBufferType=Float32Array,lo.prototype.DefaultInterpolation=jt;var fo=class extends lo{constructor(e,t,n){super(e,t,n)}};fo.prototype.ValueTypeName=`bool`,fo.prototype.ValueBufferType=Array,fo.prototype.DefaultInterpolation=At,fo.prototype.InterpolantFactoryMethodLinear=void 0,fo.prototype.InterpolantFactoryMethodSmooth=void 0;var po=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}};po.prototype.ValueTypeName=`color`;var mo=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}};mo.prototype.ValueTypeName=`number`;var ho=class extends to{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)An.slerpFlat(i,0,a,c-o,a,c,s);return i}},go=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ho(this.times,this.values,this.getValueSize(),e)}};go.prototype.ValueTypeName=`quaternion`,go.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends lo{constructor(e,t,n){super(e,t,n)}};_o.prototype.ValueTypeName=`string`,_o.prototype.ValueBufferType=Array,_o.prototype.DefaultInterpolation=At,_o.prototype.InterpolantFactoryMethodLinear=void 0,_o.prototype.InterpolantFactoryMethodSmooth=void 0;var vo=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}};vo.prototype.ValueTypeName=`vector`;var yo={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(bo(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!bo(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function bo(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var xo=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},So=class{constructor(e){this.manager=e===void 0?xo:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};So.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Co=new WeakMap,wo=class extends So{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=yo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Co.get(a);e===void 0&&(e=[],Co.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=qt(`img`);function s(){l(),t&&t(this);let n=Co.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Co.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),yo.remove(`image:${e}`);let n=Co.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Co.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),yo.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},To=class extends So{constructor(e){super(e)}load(e,t,n,r){let i=new Jn,a=new wo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Eo=class extends Dr{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Fr(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Do=class extends Eo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Dr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fr(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Oo=new er,ko=new Q,Ao=new Q,jo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z(512,512),this.mapType=Te,this.map=null,this.mapPass=null,this.matrix=new er,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ca,this._frameExtents=new Z(1,1),this._viewportCount=1,this._viewports=[new Yn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ko.setFromMatrixPosition(e.matrixWorld),t.position.copy(ko),Ao.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ao),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Oo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Oo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Oo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Mo=new Q,No=new An,Po=new Q,Fo=class extends Dr{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new er,this.projectionMatrix=new er,this.projectionMatrixInverse=new er,this.coordinateSystem=Wt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Mo,No,Po),Po.x===1&&Po.y===1&&Po.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Mo,No,Po.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Mo,No,Po),Po.x===1&&Po.y===1&&Po.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Mo,No,Po.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Io=new Q,Lo=new Z,Ro=new Z,zo=class extends Fo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=on*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(an*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return on*2*Math.atan(Math.tan(an*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Io.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Io.x,Io.y).multiplyScalar(-e/Io.z),Io.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Io.x,Io.y).multiplyScalar(-e/Io.z)}getViewSize(e,t){return this.getViewBounds(e,Lo,Ro),t.subVectors(Ro,Lo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(an*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bo=class extends jo{constructor(){super(new zo(90,1,.5,500)),this.isPointLightShadow=!0}},Vo=class extends Eo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Bo}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ho=class extends Fo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Uo=class extends jo{constructor(){super(new Ho(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Wo=class extends Eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Dr.DEFAULT_UP),this.updateMatrix(),this.target=new Dr,this.shadow=new Uo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Go=-90,Ko=1,qo=class extends Dr{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new zo(Go,Ko,e,t);r.layers=this.layers,this.add(r);let i=new zo(Go,Ko,e,t);i.layers=this.layers,this.add(i);let a=new zo(Go,Ko,e,t);a.layers=this.layers,this.add(a);let o=new zo(Go,Ko,e,t);o.layers=this.layers,this.add(o);let s=new zo(Go,Ko,e,t);s.layers=this.layers,this.add(s);let c=new zo(Go,Ko,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Jo=class extends zo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Yo=`\\[\\]\\.:\\/`,Xo=RegExp(`[\\[\\]\\.:\\/]`,`g`),Zo=`[^\\[\\]\\.:\\/]`,Qo=`[^`+Yo.replace(`\\.`,``)+`]`,$o=`((?:WC+[\\/:])*)`.replace(`WC`,Zo),es=`(WCOD+)?`.replace(`WCOD`,Qo),ts=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Zo),ns=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Zo),rs=RegExp(`^`+$o+es+ts+ns+`$`),is=[`material`,`materials`,`bones`,`map`],as=class{constructor(e,t,n){let r=n||os.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},os=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Xo,``)}static parseTrackName(e){let t=rs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);is.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Y(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){X(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){X(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){X(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){X(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){X(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){X(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){X(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;X(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){X(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){X(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};os.Composite=as,os.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},os.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},os.prototype.GetterByBindingType=[os.prototype._getValue_direct,os.prototype._getValue_array,os.prototype._getValue_arrayElement,os.prototype._getValue_toArray],os.prototype.SetterByBindingTypeAndVersioning=[[os.prototype._setValue_direct,os.prototype._setValue_direct_setNeedsUpdate,os.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[os.prototype._setValue_array,os.prototype._setValue_array_setNeedsUpdate,os.prototype._setValue_array_setMatrixWorldNeedsUpdate],[os.prototype._setValue_arrayElement,os.prototype._setValue_arrayElement_setNeedsUpdate,os.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[os.prototype._setValue_fromArray,os.prototype._setValue_fromArray_setNeedsUpdate,os.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ss=new er,cs=class{constructor(e,t,n=0,r=1/0){this.ray=new Hi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):X(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return ss.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ss),this}intersectObject(e,t=!0,n=[]){return us(e,this,n,t),n.sort(ls),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)us(e[r],this,n,t);return n.sort(ls),n}};function ls(e,t){return e.distance-t.distance}function us(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)us(r[e],t,n,!0)}}var ds=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=cn(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(cn(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static#e=e.prototype.isMatrix2=!0;constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var fs=new Q,ps,ms,hs=class extends Dr{constructor(e=new Q(0,0,1),t=new Q(0,0,0),n=1,r=16776960,i=n*.2,a=i*.2){super(),this.type=`ArrowHelper`,ps===void 0&&(ps=new ji,ps.setAttribute(`position`,new yi([0,0,0,0,1,0],3)),ms=new Fa(.5,1,5,1),ms.translate(0,-.5,0)),this.position.copy(t),this.line=new _a(ps,new la({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ta(ms,new Ui({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,i,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{fs.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(fs,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},gs=class extends tn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function _s(e,t,n,r){let i=vs(r);switch(n){case Re:return e*t;case Ue:return e*t/i.components*i.byteLength;case We:return e*t/i.components*i.byteLength;case Ge:return e*t*2/i.components*i.byteLength;case Ke:return e*t*2/i.components*i.byteLength;case ze:return e*t*3/i.components*i.byteLength;case Be:return e*t*4/i.components*i.byteLength;case qe:return e*t*4/i.components*i.byteLength;case Je:case Ye:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Xe:case Ze:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case $e:case tt:return Math.max(e,16)*Math.max(t,8)/4;case Qe:case et:return Math.max(e,8)*Math.max(t,8)/2;case nt:case rt:case at:case ot:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case it:case st:case ct:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ut:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case dt:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ft:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case pt:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case mt:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ht:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case gt:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _t:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case vt:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case yt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case bt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case St:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ct:case wt:case Tt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Et:case Dt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ot:case kt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function vs(e){switch(e){case Te:case Ee:return{byteLength:1,components:1};case Oe:case De:case Me:return{byteLength:2,components:1};case Ne:case Pe:return{byteLength:2,components:4};case Ae:case ke:case je:return{byteLength:4,components:1};case Ie:case Le:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?Y(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ys(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function bs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var xs={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new Fr(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nn},alphaMap:{value:null},alphaMapTransform:{value:new Nn},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nn}},envmap:{envMap:{value:null},envMapRotation:{value:new Nn},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nn}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nn}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nn},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nn},normalScale:{value:new Z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nn},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nn}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nn}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nn}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fr(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new Fr(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nn},alphaTest:{value:0},uvTransform:{value:new Nn}},sprite:{diffuse:{value:new Fr(16777215)},opacity:{value:1},center:{value:new Z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nn},alphaMap:{value:null},alphaMapTransform:{value:new Nn},alphaTest:{value:0}}},Ss={basic:{uniforms:Ba([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:xs.meshbasic_vert,fragmentShader:xs.meshbasic_frag},lambert:{uniforms:Ba([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Fr(0)},envMapIntensity:{value:1}}]),vertexShader:xs.meshlambert_vert,fragmentShader:xs.meshlambert_frag},phong:{uniforms:Ba([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Fr(0)},specular:{value:new Fr(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xs.meshphong_vert,fragmentShader:xs.meshphong_frag},standard:{uniforms:Ba([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Fr(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xs.meshphysical_vert,fragmentShader:xs.meshphysical_frag},toon:{uniforms:Ba([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Fr(0)}}]),vertexShader:xs.meshtoon_vert,fragmentShader:xs.meshtoon_frag},matcap:{uniforms:Ba([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:xs.meshmatcap_vert,fragmentShader:xs.meshmatcap_frag},points:{uniforms:Ba([$.points,$.fog]),vertexShader:xs.points_vert,fragmentShader:xs.points_frag},dashed:{uniforms:Ba([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xs.linedashed_vert,fragmentShader:xs.linedashed_frag},depth:{uniforms:Ba([$.common,$.displacementmap]),vertexShader:xs.depth_vert,fragmentShader:xs.depth_frag},normal:{uniforms:Ba([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:xs.meshnormal_vert,fragmentShader:xs.meshnormal_frag},sprite:{uniforms:Ba([$.sprite,$.fog]),vertexShader:xs.sprite_vert,fragmentShader:xs.sprite_frag},background:{uniforms:{uvTransform:{value:new Nn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xs.background_vert,fragmentShader:xs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nn}},vertexShader:xs.backgroundCube_vert,fragmentShader:xs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xs.cube_vert,fragmentShader:xs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xs.equirect_vert,fragmentShader:xs.equirect_frag},distance:{uniforms:Ba([$.common,$.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xs.distance_vert,fragmentShader:xs.distance_frag},shadow:{uniforms:Ba([$.lights,$.fog,{color:{value:new Fr(0)},opacity:{value:1}}]),vertexShader:xs.shadow_vert,fragmentShader:xs.shadow_frag}};Ss.physical={uniforms:Ba([Ss.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nn},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nn},clearcoatNormalScale:{value:new Z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nn},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nn},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nn},sheen:{value:0},sheenColor:{value:new Fr(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nn},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nn},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nn},transmissionSamplerSize:{value:new Z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nn},attenuationDistance:{value:0},attenuationColor:{value:new Fr(0)},specularColor:{value:new Fr(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nn},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nn},anisotropyVector:{value:new Z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nn}}]),vertexShader:xs.meshphysical_vert,fragmentShader:xs.meshphysical_frag};var Cs={r:0,b:0,g:0},ws=new er,Ts=new Nn;Ts.set(-1,0,0,0,1,0,0,0,1);function Es(e,t,n,r,i,a){let o=new Fr(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new ta(new Na(1,1,1),new qa({name:`BackgroundCubeMaterial`,uniforms:za(Ss.backgroundCube.uniforms),vertexShader:Ss.backgroundCube.vertexShader,fragmentShader:Ss.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ws.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ts),l.material.toneMapped=Rn.getTransfer(i.colorSpace)!==Vt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new ta(new Ia(2,2),new qa({name:`BackgroundMaterial`,uniforms:za(Ss.background.uniforms),vertexShader:Ss.background.vertexShader,fragmentShader:Ss.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Rn.getTransfer(i.colorSpace)!==Vt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Cs,Ua(e)),n.buffers.color.setClear(Cs.r,Cs.g,Cs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ds(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Os(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ks(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(Y(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&Y(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function As(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Fi,s=new Nn,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var js=4,Ms=6,Ns=20,Ps=256,Fs=new Ho,Is=new Fr,Ls=null,Rs=0,zs=0,Bs=!1,Vs=new Q,Hs=new Q,Us=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Vs}=i;Ls=this._renderer.getRenderTarget(),Rs=this._renderer.getActiveCubeFace(),zs=this._renderer.getActiveMipmapLevel(),Bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ys(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ls,Rs,zs),this._renderer.xr.enabled=Bs,e.scissorTest=!1,Ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ls=this._renderer.getRenderTarget(),Rs=this._renderer.getActiveCubeFace(),zs=this._renderer.getActiveMipmapLevel(),Bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Se,minFilter:Se,generateMipmaps:!1,type:Me,format:Be,colorSpace:zt,depthBuffer:!1},r=Gs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ws(r)),this._blurMaterial=Js(r,e,t),this._ggxMaterial=qs(r,e,t)}return r}_compileMaterial(e){let t=new ta(new ji,e);this._renderer.compile(t,Fs)}_sceneToCubeUV(e,t,n,r,i){let a=new zo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Is),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ta(new Na,new Ui({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Is),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Ks(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ys());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ks(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Fs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-js?n-d+js:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Ks(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Fs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Ks(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Fs)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Ks(t,3*l*(r>this._lodMax-js?r-this._lodMax+js:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Fs)}};function Ws(e){let t=[],n=[],r=e,i=e-js+1+Ms;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Hs.set(1,r,n):e===1?Hs.set(-n,1,-r):e===2?Hs.set(-n,r,1):e===3?Hs.set(-1,r,-n):e===4?Hs.set(-n,-1,r):Hs.set(n,r,-1),Hs.toArray(l,(e*6+t)*3)}}let u=new ji;u.setAttribute(`position`,new gi(c,3)),u.setAttribute(`outputDirection`,new gi(l,3)),n.push(new ta(u,null)),r>js&&r--}return{lodMeshes:n,sizeLods:t}}function Gs(e,t,n){let r=new Zn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ks(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function qs(e,t,n){return new qa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Js(e,t,n){return new qa({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Zs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ys(){return new qa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xs(){return new qa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Qs=class extends Zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ka(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Na(5,5,5),i=new qa({name:`CubemapFromEquirect`,uniforms:za(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new ta(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Se),new qo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function $s(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Qs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Us(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Us(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ec(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Qt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function tc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?vi:_i)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function nc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function rc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:X(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ic(e,t,n){let r=new WeakMap,i=new Yn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Qn(h,p,m,u);g.type=je,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Z(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ac(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var oc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function sc(e,t,n,r,i,a){let o=new Zn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ji;l.setAttribute(`position`,new yi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new yi([0,2,0,0,2,0],2));let u=new Ja({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ta(l,u),f=new Ho(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Zn(t,n,{type:Me,depthBuffer:!1,stencilBuffer:!1}),c=new Zn(t,n,{type:Me,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Rn.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=oc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var cc=new Jn,lc=new Aa(1,1),uc=new Qn,dc=new $n,fc=new ka,pc=[],mc=[],hc=new Float32Array(16),gc=new Float32Array(9),_c=new Float32Array(4);function vc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=pc[i];if(a===void 0&&(a=new Float32Array(i),pc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function yc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function bc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function xc(e,t){let n=mc[t];n===void 0&&(n=new Int32Array(t),mc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Sc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(yc(n,t))return;e.uniform2fv(this.addr,t),bc(n,t)}}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(yc(n,t))return;e.uniform3fv(this.addr,t),bc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(yc(n,t))return;e.uniform4fv(this.addr,t),bc(n,t)}}function Ec(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(yc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),bc(n,t)}else{if(yc(n,r))return;_c.set(r),e.uniformMatrix2fv(this.addr,!1,_c),bc(n,r)}}function Dc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(yc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),bc(n,t)}else{if(yc(n,r))return;gc.set(r),e.uniformMatrix3fv(this.addr,!1,gc),bc(n,r)}}function Oc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(yc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),bc(n,t)}else{if(yc(n,r))return;hc.set(r),e.uniformMatrix4fv(this.addr,!1,hc),bc(n,r)}}function kc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(yc(n,t))return;e.uniform2iv(this.addr,t),bc(n,t)}}function jc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(yc(n,t))return;e.uniform3iv(this.addr,t),bc(n,t)}}function Mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(yc(n,t))return;e.uniform4iv(this.addr,t),bc(n,t)}}function Nc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(yc(n,t))return;e.uniform2uiv(this.addr,t),bc(n,t)}}function Fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(yc(n,t))return;e.uniform3uiv(this.addr,t),bc(n,t)}}function Ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(yc(n,t))return;e.uniform4uiv(this.addr,t),bc(n,t)}}function Lc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(lc.compareFunction=n.isReversedDepthBuffer()?518:515,a=lc):a=cc,n.setTexture2D(t||a,i)}function Rc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||dc,i)}function zc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||fc,i)}function Bc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||uc,i)}function Vc(e){switch(e){case 5126:return Sc;case 35664:return Cc;case 35665:return wc;case 35666:return Tc;case 35674:return Ec;case 35675:return Dc;case 35676:return Oc;case 5124:case 35670:return kc;case 35667:case 35671:return Ac;case 35668:case 35672:return jc;case 35669:case 35673:return Mc;case 5125:return Nc;case 36294:return Pc;case 36295:return Fc;case 36296:return Ic;case 35678:case 36198:case 36298:case 36306:case 35682:return Lc;case 35679:case 36299:case 36307:return Rc;case 35680:case 36300:case 36308:case 36293:return zc;case 36289:case 36303:case 36311:case 36292:return Bc}}function Hc(e,t){e.uniform1fv(this.addr,t)}function Uc(e,t){let n=vc(t,this.size,2);e.uniform2fv(this.addr,n)}function Wc(e,t){let n=vc(t,this.size,3);e.uniform3fv(this.addr,n)}function Gc(e,t){let n=vc(t,this.size,4);e.uniform4fv(this.addr,n)}function Kc(e,t){let n=vc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function qc(e,t){let n=vc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Jc(e,t){let n=vc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Yc(e,t){e.uniform1iv(this.addr,t)}function Xc(e,t){e.uniform2iv(this.addr,t)}function Zc(e,t){e.uniform3iv(this.addr,t)}function Qc(e,t){e.uniform4iv(this.addr,t)}function $c(e,t){e.uniform1uiv(this.addr,t)}function el(e,t){e.uniform2uiv(this.addr,t)}function tl(e,t){e.uniform3uiv(this.addr,t)}function nl(e,t){e.uniform4uiv(this.addr,t)}function rl(e,t,n){let r=this.cache,i=t.length,a=xc(n,i);yc(r,a)||(e.uniform1iv(this.addr,a),bc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?lc:cc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function il(e,t,n){let r=this.cache,i=t.length,a=xc(n,i);yc(r,a)||(e.uniform1iv(this.addr,a),bc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||dc,a[e])}function al(e,t,n){let r=this.cache,i=t.length,a=xc(n,i);yc(r,a)||(e.uniform1iv(this.addr,a),bc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||fc,a[e])}function ol(e,t,n){let r=this.cache,i=t.length,a=xc(n,i);yc(r,a)||(e.uniform1iv(this.addr,a),bc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||uc,a[e])}function sl(e){switch(e){case 5126:return Hc;case 35664:return Uc;case 35665:return Wc;case 35666:return Gc;case 35674:return Kc;case 35675:return qc;case 35676:return Jc;case 5124:case 35670:return Yc;case 35667:case 35671:return Xc;case 35668:case 35672:return Zc;case 35669:case 35673:return Qc;case 5125:return $c;case 36294:return el;case 36295:return tl;case 36296:return nl;case 35678:case 36198:case 36298:case 36306:case 35682:return rl;case 35679:case 36299:case 36307:return il;case 35680:case 36300:case 36308:case 36293:return al;case 36289:case 36303:case 36311:case 36292:return ol}}var cl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vc(t.type)}},ll=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sl(t.type)}},ul=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},dl=/(\w+)(\])?(\[|\.)?/g;function fl(e,t){e.seq.push(t),e.map[t.id]=t}function pl(e,t,n){let r=e.name,i=r.length;for(dl.lastIndex=0;;){let a=dl.exec(r),o=dl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){fl(n,l===void 0?new cl(s,e,t):new ll(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ul(s),fl(n,e)),n=e}}}var ml=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);pl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function hl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var gl=37297,_l=0;function vl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var yl=new Nn;function bl(e){Rn._getMatrix(yl,Rn.workingColorSpace,e);let t=`mat3( ${yl.elements.map(e=>e.toFixed(4))} )`;switch(Rn.getTransfer(e)){case Bt:return[t,`LinearTransferOETF`];case Vt:return[t,`sRGBTransferOETF`];default:return Y(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function xl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+vl(e.getShaderSource(t),r)}return i}function Sl(e,t){let n=bl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Cl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function wl(e,t){let n=Cl[t];return n===void 0?(Y(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Tl=new Q;function El(){return Rn.getLuminanceCoefficients(Tl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Tl.x.toFixed(4)}, ${Tl.y.toFixed(4)}, ${Tl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Dl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Al).join(`
`)}function Ol(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function kl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Al(e){return e!==``}function jl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ml(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Nl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pl(e){return e.replace(Nl,Il)}var Fl=new Map;function Il(e,t){let n=xs[t];if(n===void 0){let e=Fl.get(t);if(e!==void 0)n=xs[e],Y(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Pl(n)}var Ll=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(e){return e.replace(Ll,zl)}function zl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Bl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Vl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Hl(e){return Vl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ul={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Wl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ul[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Gl={302:`ENVMAP_MODE_REFRACTION`};function Kl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Gl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ql={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Jl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ql[e.combine]||`ENVMAP_BLENDING_NONE`}function Yl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Xl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Hl(n),l=Wl(n),u=Kl(n),d=Jl(n),f=Yl(n),p=Dl(n),m=Ol(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Al).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Al).join(`
`),_.length>0&&(_+=`
`)):(g=[Bl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Al).join(`
`),_=[Bl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:xs.tonemapping_pars_fragment,n.toneMapping===0?``:wl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,xs.colorspace_pars_fragment,Sl(`linearToOutputTexel`,n.outputColorSpace),El(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Al).join(`
`)),o=Pl(o),o=jl(o,n),o=Ml(o,n),s=Pl(s),s=jl(s,n),s=Ml(s,n),o=Rl(o),s=Rl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=hl(i,i.VERTEX_SHADER,y),S=hl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=xl(i,x,`vertex`),n=xl(i,S,`fragment`);X(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):Y(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new ml(i,h),T=kl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,gl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=_l++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Zl=0,Ql=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new $l(e),t.set(e,n)),n}},$l=class{constructor(e){this.id=Zl++,this.code=e,this.usedTimes=0}};function eu(e){return e===1030||e===37490||e===36285}function tu(e,t,n,r,i,a){let o=new dr,s=new Ql,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&Y(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ss[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,R=!!i.aoMap,ee=!!i.lightMap,z=!!i.bumpMap&&i.wireframe===!1,B=!!i.normalMap,V=!!i.displacementMap,H=!!i.emissiveMap,te=!!i.metalnessMap,U=!!i.roughnessMap,ne=i.anisotropy>0,W=i.clearcoat>0,re=i.dispersion>0,ie=i.retroreflectivity>0,ae=i.iridescence>0,oe=i.sheen>0,se=i.transmission>0,ce=ne&&!!i.anisotropyMap,le=W&&!!i.clearcoatMap,ue=W&&!!i.clearcoatNormalMap,de=W&&!!i.clearcoatRoughnessMap,fe=ae&&!!i.iridescenceMap,G=ae&&!!i.iridescenceThicknessMap,pe=oe&&!!i.sheenColorMap,me=oe&&!!i.sheenRoughnessMap,he=!!i.specularMap,K=!!i.specularColorMap,ge=!!i.specularIntensityMap,q=se&&!!i.transmissionMap,J=se&&!!i.thicknessMap,_e=!!i.gradientMap,ve=!!i.alphaMap,ye=i.alphaTest>0,be=!!i.alphaHash,xe=!!i.extensions,Se=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Se=e.toneMapping);let Ce={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Rn.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:R,lightMap:ee,bumpMap:z,normalMap:B,displacementMap:V,emissiveMap:H,normalMapObjectSpace:B&&i.normalMapType===1,normalMapTangentSpace:B&&i.normalMapType===0,packedNormalMap:B&&i.normalMapType===0&&eu(i.normalMap.format),metalnessMap:te,roughnessMap:U,anisotropy:ne,anisotropyMap:ce,clearcoat:W,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:de,dispersion:re,retroreflection:ie,iridescence:ae,iridescenceMap:fe,iridescenceThicknessMap:G,sheen:oe,sheenColorMap:pe,sheenRoughnessMap:me,specularMap:he,specularColorMap:K,specularIntensityMap:ge,transmission:se,transmissionMap:q,thicknessMap:J,gradientMap:_e,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ve,alphaTest:ye,alphaHash:be,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:R&&m(i.aoMap.channel),lightMapUv:ee&&m(i.lightMap.channel),bumpMapUv:z&&m(i.bumpMap.channel),normalMapUv:B&&m(i.normalMap.channel),displacementMapUv:V&&m(i.displacementMap.channel),emissiveMapUv:H&&m(i.emissiveMap.channel),metalnessMapUv:te&&m(i.metalnessMap.channel),roughnessMapUv:U&&m(i.roughnessMap.channel),anisotropyMapUv:ce&&m(i.anisotropyMap.channel),clearcoatMapUv:le&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ue&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:G&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:me&&m(i.sheenRoughnessMap.channel),specularMapUv:he&&m(i.specularMap.channel),specularColorMapUv:K&&m(i.specularColorMap.channel),specularIntensityMapUv:ge&&m(i.specularIntensityMap.channel),transmissionMapUv:q&&m(i.transmissionMap.channel),thicknessMapUv:J&&m(i.thicknessMap.channel),alphaMapUv:ve&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(B||ne),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||ve),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&B===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Se,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Rn.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:H&&i.emissiveMap.isVideoTexture===!0&&Rn.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:xe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(xe&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ss[t];n=Wa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Xl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function nu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ru(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function iu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function au(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ru),r.length>1&&r.sort(t||iu),i.length>1&&i.sort(t||iu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ou(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new au,e.set(t,[i])):n>=r.length?(i=new au,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function su(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Q,color:new Fr};break;case`SpotLight`:n={position:new Q,direction:new Q,color:new Fr,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Q,color:new Fr,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Q,skyColor:new Fr,groundColor:new Fr};break;case`RectAreaLight`:n={color:new Fr,position:new Q,halfWidth:new Q,halfHeight:new Q}}return e[t.id]=n,n}}}function cu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var lu=0;function uu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function du(e){let t=new su,n=cu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Q);let i=new Q,a=new er,o=new er;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(uu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=lu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function fu(e){let t=new du(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function pu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new fu(e),t.set(n,[a])):r>=i.length?(a=new fu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var mu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,gu=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],_u=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],vu=new er,yu=new Q,bu=new Q;function xu(e,t,n){let r=new ca,i=new Z,a=new Z,o=new Yn,s=new Xa,c=new Za,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new qa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z},radius:{value:4}},vertexShader:mu,fragmentShader:hu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ji;m.setAttribute(`position`,new gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new ta(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(Y(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){Y(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){Y(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Zn(i.x,i.y,{format:Ge,type:Me,minFilter:Se,magFilter:Se,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Aa(i.x,i.y,je),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ve,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ye,d.map.depthTexture.magFilter=ye}else l.isPointLight?(d.map=new Qs(i.x),d.map.depthTexture=new ja(i.x,Ae)):(d.map=new Zn(i.x,i.y),d.map.depthTexture=new Aa(i.x,i.y,Ae)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ve,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Se,d.map.depthTexture.magFilter=Se):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ye,d.map.depthTexture.magFilter=ye);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),yu.setFromMatrixPosition(l.matrixWorld),e.position.copy(yu),bu.copy(e.position),bu.add(gu[t]),e.up.copy(_u[t]),e.lookAt(bu),e.updateMatrixWorld(),n.makeTranslation(-yu.x,-yu.y,-yu.z),vu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(vu,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Zn(i.x,i.y,{format:Ge,type:Me}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Su(e,t){function n(){let t=!1,n=new Yn,r=null,i=new Yn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?te(e.DEPTH_TEST):U(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=en[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?te(e.STENCIL_TEST):U(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Fr(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},R=e.getParameter(e.SCISSOR_BOX),ee=e.getParameter(e.VIEWPORT),z=new Yn().fromArray(R),B=new Yn().fromArray(ee);function V(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let H={};H[e.TEXTURE_2D]=V(e.TEXTURE_2D,e.TEXTURE_2D,1),H[e.TEXTURE_CUBE_MAP]=V(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[e.TEXTURE_2D_ARRAY]=V(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),H[e.TEXTURE_3D]=V(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),te(e.DEPTH_TEST),o.setFunc(3),ce(!1),le(1),te(e.CULL_FACE),oe(0);function te(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function U(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ne(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function W(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function re(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ie={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ie[103]=e.MIN,ie[104]=e.MAX;let ae={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function oe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(U(e.BLEND),g=!1);else if(g===!1&&(te(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:X(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:X(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:X(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:X(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ie[n],ie[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ae[r],ae[i],ae[o],ae[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function se(t,n){t.side===2?U(e.CULL_FACE):te(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ce(r),t.blending===1&&t.transparent===!1?oe(0):oe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),de(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?te(e.SAMPLE_ALPHA_TO_COVERAGE):U(e.SAMPLE_ALPHA_TO_COVERAGE)}function ce(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function le(t){t===0?U(e.CULL_FACE):(te(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ue(t){t!==k&&(N&&e.lineWidth(t),k=t)}function de(t,n,r){t?(te(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):U(e.POLYGON_OFFSET_FILL)}function fe(t){t?te(e.SCISSOR_TEST):U(e.SCISSOR_TEST)}function G(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function pe(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||H[t]),i.type=t,i.texture=n)}function me(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function he(){try{e.compressedTexImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function K(){try{e.compressedTexImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function ge(){try{e.texSubImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function q(){try{e.texSubImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function J(){try{e.compressedTexSubImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function _e(){try{e.compressedTexSubImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function ve(){try{e.texStorage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function ye(){try{e.texStorage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function be(){try{e.texImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function xe(){try{e.texImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function Se(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ce(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function we(t){z.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),z.copy(t))}function Te(t){B.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),B.copy(t))}function Ee(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function De(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Oe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Fr(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,z.set(0,0,e.canvas.width,e.canvas.height),B.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:te,disable:U,bindFramebuffer:ne,drawBuffers:W,useProgram:re,setBlending:oe,setMaterial:se,setFlipSided:ce,setCullFace:le,setLineWidth:ue,setPolygonOffset:de,setScissorTest:fe,activeTexture:G,bindTexture:pe,unbindTexture:me,compressedTexImage2D:he,compressedTexImage3D:K,texImage2D:be,texImage3D:xe,pixelStorei:Ce,getParameter:Se,updateUBOMapping:Ee,uniformBlockBinding:De,texStorage2D:ve,texStorage3D:ye,texSubImage2D:ge,texSubImage3D:q,compressedTexSubImage2D:J,compressedTexSubImage3D:_e,scissor:we,viewport:Te,reset:Oe}}function Cu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Z,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):qt(`canvas`)}function g(e,t,n){let r=1,i=he(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),Y(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&Y(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];Y(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||Y(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Bt:Rn.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,Y(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&Y(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&pe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)Y(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)Y(`WebGLRenderer: Texture marked for update but image is incomplete`);else{U(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?U(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function I(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?U(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function L(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ne(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let R={[J]:e.REPEAT,[_e]:e.CLAMP_TO_EDGE,[ve]:e.MIRRORED_REPEAT},ee={[ye]:e.NEAREST,[be]:e.NEAREST_MIPMAP_NEAREST,[xe]:e.NEAREST_MIPMAP_LINEAR,[Se]:e.LINEAR,[Ce]:e.LINEAR_MIPMAP_NEAREST,[we]:e.LINEAR_MIPMAP_LINEAR},z={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function B(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&Y(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,R[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,R[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,R[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ee[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ee[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,z[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function V(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function H(e,t,n){return Math.floor(Math.floor(e/n)/t)}function te(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=H(n.start,r.width,4),c=H(t.start,r.width,4);n.start<=i+1&&a===c&&H(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function U(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=V(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Rn.getPrimaries(Rn.workingColorSpace),r=o.colorSpace===``?null:Rn.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=me(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);B(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===He,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&te(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=_s(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else Y(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?Y(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=_s(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=he(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=he(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ne(t,o,s){if(o.image.length!==6)return;let c=V(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Rn.getPrimaries(Rn.workingColorSpace),r=o.colorSpace===``?null:Rn.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=me(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);B(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?Y(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=he(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function W(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),G(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,fe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function re(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;G(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,fe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,fe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);G(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,fe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,fe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ie(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),B(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=fe(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)G(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)G(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ae(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ie(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ie(i.__webglFramebuffer[0],t,0):ie(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),re(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),re(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function oe(t,n,i){let a=r.get(t);n!==void 0&&W(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ae(t)}function se(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&G(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=fe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),re(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),B(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)W(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else W(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),B(c,a),W(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),B(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)W(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else W(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ae(t)}function ce(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let le=[],ue=[];function de(t){if(t.samples>0){if(G(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(le.length=0,ue.length=0,le.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(le.push(l),ue.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ue)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,le))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function fe(e){return Math.min(i.maxSamples,e.samples)}function G(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function pe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Rn.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&Y(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):X(`WebGLTextures: Unsupported texture color space:`,n)),t}function he(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=F,this.setTexture3D=I,this.setTextureCube=L,this.rebindTextures=oe,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=W,this.useMultisampledRTT=G,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function wu(e,t){function n(n,r=``){let i,a=Rn.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Tu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Eu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Du=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ma(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new qa({vertexShader:Tu,fragmentShader:Eu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ta(new Ia(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ou=class extends tn{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Du,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new Z,C=null,w=null,T=new zo;T.viewport=new Yn;let E=new zo;E.viewport=new Yn;let D=[T,E],O=new Jo,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Ar,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Ar,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Ar,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,B.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&Y(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&Y(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?He:Ve,a=_.stencil?Fe:Ae);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Zn(d.textureWidth,d.textureHeight,{format:Be,type:Te,depthTexture:new Aa(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Zn(f.framebufferWidth,f.framebufferHeight,{format:Be,type:Te,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),B.setContext(r),B.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let P=new Q,F=new Q;function I(e,t,n){P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(F),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function L(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;L(O,i);for(let e=0;e<a.length;e++)L(a[e],i);a.length===2?I(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),R(e,O,i)};function R(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=on*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ee=null;function z(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new zo,o.layers.enable(n),o.viewport=new Yn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ma,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ee&&ee(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let B=new ys;B.setAnimationLoop(z),this.setAnimationLoop=function(e){ee=e},this.dispose=function(){}}},ku=new er,Au=new Nn;Au.set(-1,0,0,0,1,0,0,0,1);function ju(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ua(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ku.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Au),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Mu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return X(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?Y(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):Y(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Nu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Pu=null;function Fu(){return Pu===null&&(Pu=new ia(Nu,16,16,Ge,Me),Pu.name=`DFG_LUT`,Pu.minFilter=Se,Pu.magFilter=Se,Pu.wrapS=_e,Pu.wrapT=_e,Pu.generateMipmaps=!1,Pu.needsUpdate=!0),Pu}var Iu=class{constructor(e={}){let{canvas:t=Jt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Te}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([qe,Ke,We]),g=new Set([Te,Ae,Oe,Fe,Ne,Pe]),_=new Uint32Array(4),v=new Int32Array(4),y=new Q,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Rt;let j=0,M=0,N=null,P=-1,F=null,I=new Yn,L=new Yn,R=null,ee=new Fr(0),z=0,B=t.width,V=t.height,H=1,te=null,U=null,ne=new Yn(0,0,B,V),W=new Yn(0,0,B,V),re=!1,ie=new ca,ae=!1,oe=!1,se=new er,ce=new Q,le=new Yn,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},de=!1;function fe(){return N===null?H:1}let G=n;function pe(e,n){return t.getContext(e,n)}let me,he,K,ge,q,J,_e,ve,ye,be,xe,Se,Ce,Ee,De,ke,je,Ie,Le,Re,ze,Be,Ve;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Ge,!1),t.addEventListener(`webglcontextrestored`,Je,!1),t.addEventListener(`webglcontextcreationerror`,Ye,!1),G===null){let t=`webgl2`;if(G=pe(t,e),G===null)throw pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}He()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),X(`WebGLRenderer: `+e.message),e}function He(){me=new ec(G),me.init(),ze=new wu(G,me),he=new ks(G,me,e,ze),K=new Su(G,me),he.reversedDepthBuffer&&d&&K.buffers.depth.setReversed(!0),O=G.createFramebuffer(),k=G.createFramebuffer(),A=G.createFramebuffer(),ge=new rc(G),q=new nu,J=new Cu(G,me,K,q,he,ze,ge),_e=new $s(T),ve=new bs(G),Be=new Ds(G,ve),ye=new tc(G,ve,ge,Be),be=new ac(G,ye,ve,Be,ge),Ie=new ic(G,he,J),De=new As(q),xe=new tu(T,_e,me,he,Be,De),Se=new ju(T,q),Ce=new ou,Ee=new pu(me),je=new Es(T,_e,K,be,p,s),ke=new xu(T,be,he),Ve=new Mu(G,ge,he,K),Le=new Os(G,me,ge),Re=new nc(G,me,ge),ge.programs=xe.programs,T.capabilities=he,T.extensions=me,T.properties=q,T.renderLists=Ce,T.shadowMap=ke,T.state=K,T.info=ge}m!==1009&&(w=new sc(m,t.width,t.height,o,r,i));let Ue=new Ou(T,G);this.xr=Ue,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let e=me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(e){e!==void 0&&(H=e,this.setSize(B,V,!1))},this.getSize=function(e){return e.set(B,V)},this.setSize=function(e,n,r=!0){Ue.isPresenting?Y(`WebGLRenderer: Can't change size while VR device is presenting.`):(B=e,V=n,t.width=Math.floor(e*H),t.height=Math.floor(n*H),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(B*H,V*H).floor()},this.setDrawingBufferSize=function(e,n,r){B=e,V=n,H=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)X(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){Y(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(ne)},this.setViewport=function(e,t,n,r){e.isVector4?ne.set(e.x,e.y,e.z,e.w):ne.set(e,t,n,r),K.viewport(I.copy(ne).multiplyScalar(H).round())},this.getScissor=function(e){return e.copy(W)},this.setScissor=function(e,t,n,r){e.isVector4?W.set(e.x,e.y,e.z,e.w):W.set(e,t,n,r),K.scissor(L.copy(W).multiplyScalar(H).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(e){K.setScissorTest(re=e)},this.setOpaqueSort=function(e){te=e},this.setTransparentSort=function(e){U=e},this.getClearColor=function(e){return e.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=je.getClearColor(),r=je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,G.clearBufferuiv(G.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,G.clearBufferiv(G.COLOR,0,v))}else r|=G.COLOR_BUFFER_BIT}t&&(r|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&G.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),je.dispose(),Ce.dispose(),Ee.dispose(),q.dispose(),_e.dispose(),be.dispose(),Be.dispose(),Ve.dispose(),xe.dispose(),Ue.dispose(),Ue.removeEventListener(`sessionstart`,nt),Ue.removeEventListener(`sessionend`,rt),it.stop()};function Ge(e){e.preventDefault(),Xt(`WebGLRenderer: Context Lost.`),E=!0}function Je(){Xt(`WebGLRenderer: Context Restored.`),E=!1;let e=ge.autoReset,t=ke.enabled,n=ke.autoUpdate,r=ke.needsUpdate,i=ke.type;He(),ge.autoReset=e,ke.enabled=t,ke.autoUpdate=n,ke.needsUpdate=r,ke.type=i}function Ye(e){X(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),Ze(t)}function Ze(e){Qe(e),q.remove(e)}function Qe(e){let t=q.get(e).programs;t!==void 0&&(t.forEach(function(e){xe.releaseProgram(e)}),e.isShaderMaterial&&xe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ue);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=mt(e,t,n,r,i);K.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ye.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Be.setup(i,r,s,n,c);let h,g=Le;if(c!==null&&(h=ve.get(c),g=Re,g.setIndex(h)),i.isMesh)r.wireframe===!0?(K.setLineWidth(r.wireframeLinewidth*fe()),g.setMode(G.LINES)):g.setMode(G.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),K.setLineWidth(e*fe()),i.isLineSegments?g.setMode(G.LINES):i.isLineLoop?g.setMode(G.LINE_LOOP):g.setMode(G.LINE_STRIP)}else i.isPoints?g.setMode(G.POINTS):i.isSprite&&g.setMode(G.TRIANGLES);if(i.isBatchedMesh){if(me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ve.get(c).bytesPerElement:1,o=q.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(G,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function $e(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),ae===!0&&De.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ut(e,t,r),e.side=0,e.needsUpdate=!0,ut(e,t,r),e.side=2):ut(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ee.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),oe=this.localClippingEnabled,ae=De.init(this.clippingPlanes,oe),ae===!0&&De.setGlobalState(this.clippingPlanes,t),D!==null&&ke.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];$e(o,n,t,e),r.add(o)}else $e(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=q.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let et=null;function tt(e){et&&et(e)}function nt(){it.stop()}function rt(){it.start()}let it=new ys;it.setAnimationLoop(tt),typeof self<`u`&&it.setContext(self),this.setAnimationLoop=function(e){et=e,Ue.setAnimationLoop(e),e===null?it.stop():it.start()},Ue.addEventListener(`sessionstart`,nt),Ue.addEventListener(`sessionend`,rt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){X(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ue.enabled===!0&&Ue.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(t),t=Ue.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Ee.get(e,C.length),x.init(t),x.state.textureUnits=J.getTextureUnits(),C.push(x),se.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ie.setFromProjectionMatrix(se,Wt,t.reversedDepth),oe=this.localClippingEnabled,ae=De.init(this.clippingPlanes,oe),b=Ce.get(e,S.length),b.init(),S.push(b),Ue.enabled===!0&&Ue.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&at(e,t,-1/0,T.sortObjects)}at(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(te,U),de=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,de&&je.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ae===!0&&De.beginShadows();let i=x.state.shadowsArray;if(ke.render(i,e,t),ae===!0&&De.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];st(n,r,e,a)}de&&je.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ot(b,e,n,n.viewport)}}else r.length>0&&st(n,r,e,t),de&&je.render(e),ot(b,e,t)}N!==null&&M===0&&(J.updateMultisampleRenderTarget(N),J.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Be.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],J.setTextureUnits(x.state.textureUnits),ae===!0&&De.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function at(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ie)){r&&le.setFromMatrixPosition(e.matrixWorld).applyMatrix4(se);let i=be.update(e),a=e.material;a.visible&&b.push(e,i,a,n,le.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ie))){let i=be.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),le.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),le.copy(e.boundingSphere.center)),le.applyMatrix4(e.matrixWorld).applyMatrix4(se)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,le.z,s,t)}}else a.visible&&b.push(e,i,a,n,le.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)at(i[e],t,n,r)}function ot(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ae===!0&&De.setGlobalState(T.clippingPlanes,n),r&&K.viewport(I.copy(r)),i.length>0&&ct(i,t,n),a.length>0&&ct(a,t,n),o.length>0&&ct(o,t,n),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function st(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=me.has(`EXT_color_buffer_half_float`)||me.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Zn(1,1,{generateMipmaps:!0,type:e?Me:Te,minFilter:we,samples:Math.max(4,he.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Rn.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ee),z=T.getClearAlpha(),z<1&&T.setClearColor(16777215,.5),T.clear(),de&&je.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ae===!0&&De.setGlobalState(T.clippingPlanes,r),ct(e,n,r),J.updateMultisampleRenderTarget(a),J.updateRenderTargetMipmap(a),me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,lt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(J.updateMultisampleRenderTarget(a),J.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ee,z),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&lt(o,t,n,s,l,c)}}function lt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ut(e,t,n){t.isScene!==!0&&(t=ue);let r=q.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=xe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=xe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=_e.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ft(e,s),d}else s.uniforms=xe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=xe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=De.uniform),ft(e,s),r.needsLights=gt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=ml.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ft(e,t){let n=q.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function pt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function mt(e,t,n,r,i){t.isScene!==!0&&(t=ue),J.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Rn.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=_e.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=q.get(r),y=x.state.lights;if(ae===!0&&(oe===!0||e!==F)){let t=e===F&&r.id===P;De.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==De.numPlanes||v.numIntersection!==De.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ut(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(K.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=pt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||F!==e){K.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(G,`projectionMatrix`,e.projectionMatrix),O.setValue(G,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(G,ce.setFromMatrixPosition(e.matrixWorld)),he.logarithmicDepthBuffer&&O.setValue(G,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(G,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(G,`sunShadowMap`,y.state.sunShadowMap,J),y.state.directionalShadowMap.length>0&&O.setValue(G,`directionalShadowMap`,y.state.directionalShadowMap,J),y.state.spotShadowMap.length>0&&O.setValue(G,`spotShadowMap`,y.state.spotShadowMap,J),y.state.pointShadowMap.length>0&&O.setValue(G,`pointShadowMap`,y.state.pointShadowMap,J)),i.isSkinnedMesh){O.setOptional(G,i,`bindMatrix`),O.setOptional(G,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(G,`boneTexture`,e.boneTexture,J))}i.isBatchedMesh&&(O.setOptional(G,i,`batchingTexture`),O.setValue(G,`batchingTexture`,i._matricesTexture,J),O.setOptional(G,i,`batchingIdTexture`),O.setValue(G,`batchingIdTexture`,i._indirectTexture,J),O.setOptional(G,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(G,`batchingColorTexture`,i._colorsTexture,J));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ie.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(G,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Fu()),w){if(O.setValue(G,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&ht(k,E),a&&r.fog===!0&&Se.refreshFogUniforms(k,a),Se.refreshMaterialUniforms(k,r,H,V,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}ml.upload(G,dt(v),k,J)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(ml.upload(G,dt(v),k,J),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(G,`center`,i.center),O.setValue(G,`modelViewMatrix`,i.modelViewMatrix),O.setValue(G,`normalMatrix`,i.normalMatrix),O.setValue(G,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ve.update(n,S),Ve.bind(n,S)}}return S}function ht(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function gt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=q.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),q.get(e.texture).__webglTexture=t,q.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=q.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=q.get(e);if(o.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(G.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),L.copy(e.scissor),R=e.scissorTest,K.viewport(I),K.scissor(L),K.setScissorTest(R),P=-1;return}if(o.__webglFramebuffer===void 0)J.setupRenderTarget(e);else if(o.__hasExternalTextures)J.rebindTextures(e,q.get(e.texture).__webglTexture,q.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&q.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);J.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=q.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&J.useMultisampledRTT(e)===!1?q.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),L.copy(e.scissor),R=e.scissorTest}else I.copy(ne).multiplyScalar(H).floor(),L.copy(W).multiplyScalar(H).floor(),R=re;if(n!==0&&(r=O),K.bindFramebuffer(G.FRAMEBUFFER,r)&&K.drawBuffers(e,r),K.viewport(I),K.scissor(L),K.setScissorTest(R),i){let r=q.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=q.get(e.textures[t]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=q.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,t.__webglTexture,n)}P=-1};function _t(e){let t=q.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=he.textureFormatReadable(e.format),t.__typeReadable=he.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){X(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){K.bindFramebuffer(G.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let u=_t(o);if(u.__formatReadable===!1){X(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){X(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&G.readPixels(t,n,r,i,ze.convert(c),ze.convert(l),a)}finally{let e=N===null?null:q.get(N).__webglFramebuffer;K.bindFramebuffer(G.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){K.bindFramebuffer(G.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let d=_t(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.bufferData(G.PIXEL_PACK_BUFFER,a.byteLength,G.STREAM_READ),G.readPixels(t,n,r,i,ze.convert(l),ze.convert(u),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let p=N===null?null:q.get(N).__webglFramebuffer;K.bindFramebuffer(G.FRAMEBUFFER,p);let m=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await $t(G,m,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,a),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(f),G.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;J.setTexture2D(e,0),G.copyTexSubImage2D(G.TEXTURE_2D,n,0,0,o,s,i,a),K.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ze.convert(t.format),_=ze.convert(t.type),v;t.isData3DTexture?(J.setTexture3D(t,0),v=G.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(J.setTexture2DArray(t,0),v=G.TEXTURE_2D_ARRAY):(J.setTexture2D(t,0),v=G.TEXTURE_2D),K.activeTexture(G.TEXTURE0),K.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,t.flipY),K.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),K.pixelStorei(G.UNPACK_ALIGNMENT,t.unpackAlignment);let y=K.getParameter(G.UNPACK_ROW_LENGTH),b=K.getParameter(G.UNPACK_IMAGE_HEIGHT),x=K.getParameter(G.UNPACK_SKIP_PIXELS),S=K.getParameter(G.UNPACK_SKIP_ROWS),C=K.getParameter(G.UNPACK_SKIP_IMAGES);K.pixelStorei(G.UNPACK_ROW_LENGTH,h.width),K.pixelStorei(G.UNPACK_IMAGE_HEIGHT,h.height),K.pixelStorei(G.UNPACK_SKIP_PIXELS,l),K.pixelStorei(G.UNPACK_SKIP_ROWS,u),K.pixelStorei(G.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=q.get(e),r=q.get(t),h=q.get(n.__renderTarget),g=q.get(r.__renderTarget);K.bindFramebuffer(G.READ_FRAMEBUFFER,h.__webglFramebuffer),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(e).__webglTexture,i,d+n),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(t).__webglTexture,a,m+n)),G.blitFramebuffer(l,u,o,s,f,p,o,s,G.DEPTH_BUFFER_BIT,G.NEAREST);K.bindFramebuffer(G.READ_FRAMEBUFFER,null),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||q.has(e)){let n=q.get(e),r=q.get(t);K.bindFramebuffer(G.READ_FRAMEBUFFER,k),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,n.__webglTexture,i),T?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,r.__webglTexture,a),i===0?T?G.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):G.copyTexSubImage2D(v,a,f,p,l,u,o,s):G.blitFramebuffer(l,u,o,s,f,p,o,s,G.COLOR_BUFFER_BIT,G.NEAREST);K.bindFramebuffer(G.READ_FRAMEBUFFER,null),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?G.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h);K.pixelStorei(G.UNPACK_ROW_LENGTH,y),K.pixelStorei(G.UNPACK_IMAGE_HEIGHT,b),K.pixelStorei(G.UNPACK_SKIP_PIXELS,x),K.pixelStorei(G.UNPACK_SKIP_ROWS,S),K.pixelStorei(G.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&G.generateMipmap(v),K.unbindTexture()},this.initRenderTarget=function(e){q.get(e).__webglFramebuffer===void 0&&J.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?J.setTextureCube(e,0):e.isData3DTexture?J.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?J.setTexture2DArray(e,0):J.setTexture2D(e,0),K.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,K.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Wt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Rn._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rn._getUnpackColorSpace()}},Lu=1.7*R,Ru=.12,zu=e=>e.find(e=>e.id===`sun`&&e.kind===`star`)?.positionM??null;function Bu(e,t=zu(e)){return t?e.map(e=>({...e,positionM:Vu(e.positionM,t)})):e}function Vu(e,t,n=!1){if(!t)return e;let r=e.x-t.x,i=e.y-t.y,a=Math.hypot(r,i);if(a<=Lu)return e;let o=n?1/Ru:Ru,s=(Lu+(a-Lu)*o)/a;return{x:t.x+r*s,y:t.y+i*s,z:e.z}}function Hu(e,t){let n=10/R;return{x:(e.x-t.x)*n,y:(e.z-t.z)*n,z:-(e.y-t.y)*n}}var Uu=new Set([`sun`,`mercury`,`venus`,`earth`,`moon`,`mars`]);function Wu(e,t,n,r){if(!e)return null;let i=r.clone().cross(n);i.lengthSq()<1e-12&&i.set(1,0,0),i.normalize();let a=n.clone().cross(i).normalize(),o=e.points,s=o.map(({p:e})=>e.dot(i)),c=o.map(({p:e})=>e.dot(a)),l=e.center.clone();l.addScaledVector(i,(Math.min(...s)+Math.max(...s))/2-l.dot(i)),l.addScaledVector(a,(Math.min(...c)+Math.max(...c))/2-l.dot(a));let u=Math.tan(t.fov*Math.PI/360),d=u*t.aspect,f=.84,p=.64,m=-.44,h=.1;for(let{p:e,r:t}of o){let r=e.clone().sub(l),o=r.dot(i),s=r.dot(a),c=r.dot(n);h=Math.max(h,c+t+.001,c+(Math.abs(o)+t*Math.hypot(1,f*d))/(f*d),(s+p*c*u+t*Math.hypot(1,p*u))/(.54*u),(-s-m*c*u+t*Math.hypot(1,m*u))/(.54*u))}return Number.isFinite(h)?{target:l.addScaledVector(a,-.1*h*u),distance:h,bounds:e}:null}function Gu(e){if(!e.length)return null;let t=e.map(e=>new Q().copy(Hu(e.positionM,{x:0,y:0,z:0})));if(t.some(e=>![e.x,e.y,e.z].every(Number.isFinite)))return null;let n=t[0].clone(),r=n.clone();for(let e of t)n.min(e),r.max(e);let i=n.add(r).multiplyScalar(.5),a=Math.max(10,...t.map((t,n)=>t.distanceTo(i)+e[n].radiusM/R*10));return Number.isFinite(a)?{center:i,radius:a,ids:e.map(e=>e.id).sort().join(`\0`),points:t.map((t,n)=>({p:t,r:e[n].radiusM/R*10}))}:null}var Ku=class{camera;controls;innerSolarSystem;previous=null;fittedDistance=0;fitView=null;constructor(e,t,n=!1){this.camera=e,this.controls=t,this.innerSolarSystem=n}bounds(e){if(this.innerSolarSystem&&e.some(e=>e.id===`sun`&&e.kind===`star`)){let t=e.filter(e=>Uu.has(e.id));if(t.some(e=>e.id!==`sun`&&e.id!==`moon`))return Gu(t)}return Gu(e)}frame(e,t){let{camera:n,controls:r}=this,i=t===void 0?void 0:t*Math.PI/180,a=(i===void 0?this.innerSolarSystem?new Q(0,3,2):new Q(0,1.15,3.1):new Q(0,Math.sin(i),Math.cos(i))).normalize(),o=Wu(this.bounds(e),n,a,n.up);return o?(r.target.copy(o.target),n.position.copy(r.target).addScaledVector(a,o.distance),Ju(n,r),this.rebaseBounds(o.bounds),this.extendBounds(o.bounds.radius),r.update(),!0):!1}resize(e,t){let n=this.camera.position.clone().sub(this.controls.target).normalize(),r=this.bounds(e),i=Wu(r,t,n,this.camera.up),a=Wu(r,this.camera,n,this.camera.up);if(!i||!a)return;let o=a.distance/i.distance;this.camera.position.sub(i.target).multiplyScalar(o).add(a.target),this.controls.target.sub(i.target).multiplyScalar(o).add(a.target),this.rebaseBounds(a.bounds),this.extendBounds(a.bounds.radius),this.controls.update()}resetTracking(e){this.rebaseBounds(this.bounds(e))}track(e,t=!1){let n=this.bounds(e),r=this.previous;if(!n){this.rebaseBounds(null);return}if(!r||r.ids!==n.ids){this.rebaseBounds(n);return}if(n.points.every(({p:e,r:t},n)=>e.equals(r.points[n].p)&&t===r.points[n].r))return;if(t){this.rebaseBounds(n);return}(!this.fitView||this.fitView.fov!==this.camera.fov||this.fitView.aspect!==this.camera.aspect)&&this.rebaseBounds(r);let i=this.fitView.direction,a=Wu(r,this.camera,i,this.camera.up),o=Wu(n,this.camera,i,this.camera.up);if(!a||!o)return;let s=Math.max(this.fittedDistance,o.distance),c=s/this.fittedDistance;this.camera.position.sub(a.target).multiplyScalar(c).add(o.target),this.controls.target.sub(a.target).multiplyScalar(c).add(o.target),this.previous={...n,radius:Math.max(r.radius,n.radius)},this.fittedDistance=s,this.fitView={direction:i,fov:this.camera.fov,aspect:this.camera.aspect},this.extendBounds(this.previous.radius),this.camera.updateMatrixWorld()}rebaseBounds(e){this.previous=e;let t=this.camera.position.clone().sub(this.controls.target).normalize();this.fittedDistance=Wu(e,this.camera,t,this.camera.up)?.distance??0,this.fitView={direction:t,fov:this.camera.fov,aspect:this.camera.aspect}}extendBounds(e){let t=this.camera.position.distanceTo(this.controls.target);this.controls.maxDistance=Math.max(1500,t*2),this.camera.far=Math.max(5e3,t+e*4),this.camera.updateProjectionMatrix()}};function qu(e,t,n,r=1){let i=n/R*10,a=e.fov*Math.PI/360,o=Math.atan(Math.tan(a)*Math.min(1,e.aspect)),s=i*r/Math.sin(Math.atan(.16*Math.tan(o)));if(!(i>0&&r>=1&&s>i&&Number.isFinite(s)&&s<=t.maxDistance&&s+i*r<e.far))return!1;let c=t.enableDamping;t.enableDamping=!1,t.update(),t.enableDamping=c;let l=e.position.clone().sub(t.target);return l.lengthSq()===0&&l.set(0,.03,.08),l.normalize(),t.target.set(0,0,0),e.position.copy(l.multiplyScalar(s)),t.minDistance=i*1.5,e.near=Math.min(1e-5,i/100),e.updateProjectionMatrix(),t.update(),e.updateMatrixWorld(),!0}function Ju(e,t){t.minDistance=.001,e.near=1e-5,e.updateProjectionMatrix()}function Yu(e,t,n,r,i){let a=i>0?Math.max(1,Math.min(1e9,.1/i)):1;if(a===1){e.render(t,n);return}r.copy(n),r.position.multiplyScalar(a),r.near*=a,r.far*=a,r.updateProjectionMatrix(),r.updateMatrixWorld();let o=t.scale.clone();t.scale.multiplyScalar(a);try{e.render(t,r)}finally{t.scale.copy(o),t.updateMatrixWorld(!0)}}function Xu(e,t,r){let i=K(e,n(`experiment.${e}.companion`),n(`experiment.binary.primary`)),a=new zo(40,r>0&&Number.isFinite(r)?r:1,1e-5,5e3),o={target:new Q,minDistance:.001,maxDistance:1500,update:()=>!0};new Ku(a,o).frame(i.bodies);let s=e=>({x:e.x,y:e.y,z:e.z});return ae(i,{theme:t,gravity:`off`,axis:!1,names:!1,shadows:!0,orbits:t===`cosmos`,camera:{position:s(a.position),target:s(o.target),followId:i.bodies[0].id,overview:!0,minDistance:o.minDistance,maxDistance:o.maxDistance,near:a.near,far:a.far}},2,`manual`,n(`experiment.${e}.name`),`builtin-${e}`)}function Zu(e){let t=new Map,i=!1;return{render(o){return fe.map(c=>{let l=Xu(c,o,1),u=`experiment:${c}`,d=e.selected()===u,f=document.createElement(`article`);f.className=`save-card experiment-card`,f.dataset.experiment=c,f.dataset.selected=String(d);let p=document.createElement(`img`);s(p,`alt`,()=>n(`gallery.thumbnail`)),p.width=160,p.height=110,p.hidden=!0;let m=document.createElement(`span`);m.className=`save-preview-fallback`,r(m,()=>n(`experiment.preview`));let h=document.createElement(`button`);h.type=`button`,h.className=`save-thumbnail`,a(h,`aria-label`,()=>n(`gallery.chooseSave`,{name:n(`experiment.${c}.name`)})),h.setAttribute(`aria-expanded`,String(d)),h.disabled=!e.canLoad,h.append(p,m);let g=document.createElement(`h3`);g.className=`experiment-name`,r(g,()=>n(`experiment.${c}.name`));let _=document.createElement(`p`);_.className=`save-info`,r(_,()=>n(`experiment.info`,{count:l.state.bodies.length}));let v=document.createElement(`div`);v.className=`save-actions`,v.hidden=!d,v.id=`experiment-${c}-actions`,h.setAttribute(`aria-controls`,v.id);let y=document.createElement(`p`);y.className=`experiment-description`,r(y,()=>n(`experiment.${c}.description`)),v.append(y);let b=()=>{e.canLoad&&e.canInteract()&&(e.selected()===u?e.load(c):(e.select(u),f.dataset.selected=`true`,v.hidden=!1,h.setAttribute(`aria-expanded`,`true`)))};h.onclick=e=>{e.stopPropagation(),b()},f.onclick=e=>{e.target instanceof Element&&!e.target.closest(`button,a,input,select,textarea,form,[role="button"]`)&&b()},v.onkeydown=t=>{t.key===`Escape`&&(t.preventDefault(),t.stopPropagation(),e.closeMenus(),h.focus())},f.append(h,g,_,v);let x=`${o}:${c}`;t.has(x)||t.set(x,Promise.resolve().then(()=>{if(i)throw Error(`disposed`);return e.thumbnail(l)}));let S=t.get(x);return S.then(e=>{!i&&p.isConnected&&(p.src=e,p.hidden=!1,m.hidden=!0)}).catch(()=>{t.get(x)===S&&t.delete(x),!i&&m.isConnected&&r(m,()=>n(`gallery.thumbnailUnavailable`))}),f})},dispose(){i=!0,t.clear()}}}var Qu={position:`<path d="M12 3v18M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4"/>`,radius:`<circle cx="11" cy="13" r="7"/><path d="M11 13L21 3M15 3h6v6"/>`,mass:`<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M1 12h2M21 12h2"/>`,velocity:`<path d="M4 20L20 4M11 4h9v9M4 13v7h7"/>`,spin:`<circle cx="12" cy="12" r="6.5"/><path d="M12 2v20"/>`,delete:`<path d="M5 6h14M9 6V3h6v3M7 6l1 15h8l1-15M10 10v7M14 10v7"/>`};function $u(e){return td(Qu[e])}var ed=Object.fromEntries(Object.entries({add:`<path d="M12 4v16M4 12h16" stroke-width="3.4"/>`,play:`<path d="M8.5 6 18.5 12 8.5 18Z" fill="black" stroke-width="2.8"/>`,pause:`<path d="M8.5 5v14M15.5 5v14" stroke-width="2.8"/>`,undo:`<path d="m8 5-5 5 5 5M3.5 10H14a5.5 5.5 0 0 1 0 11h-3" stroke-width="2.6"/>`,redo:`<path d="m16 5 5 5-5 5M20.5 10H10a5.5 5.5 0 0 0 0 11h3" stroke-width="2.6"/>`,history:`<path d="M4.1 7.7a8.5 8.5 0 1 1-1.2 7.7M4 2.8v5.3h5.3" stroke-width="2.6"/><path d="M12 6.8v5.4l3.4 2.1" stroke-width="2.3"/>`,settings:`<g transform="translate(.55 .7)"><path fill="black" stroke="none" fill-rule="evenodd" d="m9.4 3-.6 2.1-1.6.9-2.1-.5-2 3.5 1.5 1.6v1.8l-1.5 1.6 2 3.5 2.1-.5 1.6.9.6 2.1h4.1l.6-2.1 1.6-.9 2.1.5 2-3.5-1.5-1.6v-1.8l1.5-1.6-2-3.5-2.1.5-1.6-.9L13.5 3Z M11.45 8.2a3.1 3.1 0 1 0 0 6.2a3.1 3.1 0 1 0 0-6.2Z"/></g>`,more:`<circle cx="5" cy="12" r="1.3" fill="black"/><circle cx="12" cy="12" r="1.3" fill="black"/><circle cx="19" cy="12" r="1.3" fill="black"/>`,overview:`<path d="M10.5 21A9 9 0 1 1 19 16M18.1 10.3 19 16l4-3.5" stroke-width="1.8"/>`,screenshot:`<path d="M3.5 9V3.5H9M15 3.5h5.5V9m0 6v5.5H15m-6 0H3.5V15" stroke-width="1.8"/>`,close:`<path d="m14.5 5-7 7 7 7"/>`,restart:`<path d="M4.1 7.7a8.5 8.5 0 1 1-1.2 7.7M4 2.8v5.3h5.3"/>`,cancelJump:`<path d="m6 6 12 12M18 6 6 18" stroke-width="2.8"/>`,jump:`<path d="m3.5 6 5.5 6-5.5 6M10.5 6l5.5 6-5.5 6M21 5v14" stroke-width="2.5"/>`}).map(([e,t])=>[e,td(t)]));function td(e){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`)}")`}function nd(e,t,n,i=!0){let o=typeof t==`function`?t:()=>t;r(e,o),a(e,`aria-label`,o),i===!0?s(e,`title`,o):i===!1&&e.setAttribute(`data-no-tooltip`,``),e.className.split(` `).includes(`icon-control`)||(e.className+=` icon-control`),e.style.getPropertyValue?.(`--interface-icon`)!==ed[n]&&e.style.setProperty(`--interface-icon`,ed[n])}function rd(e){let t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`planet-scene-${e.createdAt}.json`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function id(e,i){let o=document.createElement(`aside`);o.className=`history-gallery`,a(o,`aria-label`,()=>n(`gallery.title`));let c=document.createElement(`button`);c.className=`history-edge`,r(c,()=>n(`gallery.title`)),c.setAttribute(`aria-expanded`,`false`),nd(c,()=>n(`gallery.title`),`history`);let l=document.createElement(`span`);l.className=`history-edge-badge`,l.setAttribute(`aria-hidden`,`true`),c.append(l);let u=document.createElement(`section`);u.className=`history-panel`;let d=document.createElement(`div`);d.className=`history-drawer`,d.id=`history-drawer`,d.hidden=d.inert=!0,c.setAttribute(`aria-controls`,d.id);let f=document.createElement(`h2`);r(f,()=>n(`gallery.title`));let m=de(`gallery.close`,()=>V());m.className=`gallery-close`,nd(m,()=>n(`gallery.close`),`close`);let h=document.createElement(`p`);h.className=`gallery-status`,h.setAttribute(`role`,`status`),r(h,()=>n(`gallery.info`));let g=document.createElement(`select`);a(g,`aria-label`,()=>n(`gallery.filter`));for(let e of[`all`,`manual`,`checkpoints`,`pinned`,`experiments`]){let t=document.createElement(`option`);t.value=e,r(t,()=>n(`gallery.${e}`)),g.append(t)}let _=document.createElement(`span`);_.className=`gallery-filter`,_.append(g);let v=document.createElement(`div`);v.className=`gallery-tools`,v.append(_,de(`gallery.exportCurrent`,()=>void pe(async()=>rd(fe(`manual`)),!1,`success`)));let y=document.createElement(`div`);y.className=`gallery-cards`;let b=de(`gallery.undoDelete`,()=>void q());b.className=`gallery-delete-undo`,b.hidden=!0;let S=document.createElement(`div`);S.className=`gallery-feedback`,S.append(h,b);let C=document.createElement(`header`);C.className=`gallery-header`;let w=document.createElement(`div`);w.className=`gallery-header-row`,w.append(v,f),C.append(w,S),u.append(C,y),d.append(u,m),o.append(c,d),e.append(o);let T=!1,E=!1,D=!1,O=[],k=``,A=-1,j=``,M=null,N=null,P=null,F=``,I=!1,L=null,R=new Set,ee=crypto.randomUUID(),z=new Map,B=null;function V(){T&&!E&&!I&&!i.busy()&&(B=!1,i.open(!1))}let H=()=>!E&&!I&&T&&!i.busy(),te=e=>{he(),N=e,ue(`gallery.selected`)},U=Zu({thumbnail:i.thumbnail,closeMenus:he,selected:()=>N,select:te,canInteract:H,canLoad:!!i.store,load:t=>{E||I||!T||i.busy()||!i.store||pe(async()=>{if(await me(fe(`workspace`)),D||!T||i.busy())throw Error(`busy`);let n=Xu(t,i.view().theme,e.clientWidth/Math.max(1,e.clientHeight));M=i.view(),I=i.load(n),m.disabled=!!I,I?ue(`gallery.restoring`):(ue(`gallery.busy`),p(e,`error`))},!0,`load`)}}),W=null,re=e=>e instanceof Node&&o.contains(e),ie=(e,t)=>[...z.keys()].some(n=>getComputedStyle(n).visibility!==`hidden`&&[...n.getClientRects()].some(n=>n.width>0&&n.height>0&&e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)),oe=e=>{W=T&&e.button===0&&!re(e.target)&&!ie(e.clientX,e.clientY)?{id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1}:null},se=e=>{W?.id===e.pointerId&&Math.hypot(e.clientX-W.x,e.clientY-W.y)>6&&(W.moved=!0)},ce=()=>{W=null},le=e=>{if(!T||re(e.target))return;e.stopImmediatePropagation();let t=W;W=null,t&&!t.moved&&Math.hypot(e.clientX-t.x,e.clientY-t.y)<=6&&!ie(e.clientX,e.clientY)&&!E&&!I&&(V(),i.onBackdropClose?.())};e.addEventListener(`pointerdown`,oe,!0),e.addEventListener(`pointermove`,se,!0),e.addEventListener(`pointercancel`,ce,!0),e.addEventListener(`click`,le,!0);let ue=e=>{r(h,()=>n(e))};function de(e,t){let i=document.createElement(`button`);return i.type=`button`,r(i,()=>n(e)),i.onclick=t,i}function fe(e,t=``){let n=i.current();if(!n||i.busy()||n.jump||n.localStep)throw Error(`busy`);return ae(n.state,i.view(),n.speedIndex,e,t,e===`workspace`?`workspace`:crypto.randomUUID())}async function G(){i.store&&(O=await i.store.list(),D||await J())}async function pe(t,n=!1,r){if(!(E||D)){E=!0,o.dataset.working=`true`,m.disabled=!0,n||ue(`gallery.working`);try{await t(),D||(await G(),n||ue(`gallery.done`),r&&r!==`load`&&p(e,r))}catch(t){D||(ue(t instanceof SyntaxError||t instanceof Error&&t.message===`file`?`gallery.invalidFile`:t instanceof Error&&t.message===`busy`?`gallery.busy`:`gallery.failed`),r&&p(e,`error`))}finally{E=!1,o.dataset.working=`false`,m.disabled=!!I}}}async function me(e){if(!i.store)throw Error(`storage`);let t;try{t=await i.thumbnail(e)}catch{}await i.store.put(e,t,{preserveName:e.kind===`workspace`})}function he(){N=null;for(let e of y.querySelectorAll(`.save-actions`))e.hidden=!0;for(let e of y.querySelectorAll(`.save-thumbnail`))e.setAttribute(`aria-expanded`,`false`);for(let e of y.querySelectorAll(`.save-card`))e.dataset.selected=`false`}o.addEventListener(`click`,e=>{e.target instanceof Element&&!e.target.closest(`.save-card`)&&he()});function K(t){E||I||!T||i.busy()||!i.store||pe(async()=>{if(await me(fe(`workspace`)),D||!T||i.busy())throw Error(`busy`);M=i.view(),I=i.load(t),m.disabled=!!I,ue(I?`gallery.restoring`:`gallery.busy`),I||p(e,`error`)},!0,`load`)}async function ge(e){H()&&i.store&&await pe(async()=>{let t=await i.store.image(e.id);await i.store.remove(e.id),!D&&(L={file:structuredClone(e),image:t},b.hidden=!1,he(),ue(`gallery.deleted`))},!0,`success`)}async function q(){H()&&i.store&&L&&await pe(async()=>{let e=L,t=await i.store.list(),n=t.some(t=>t.id===e.file.id),r=e.file.kind===`checkpoint`&&!e.file.pinned&&t.filter(e=>e.kind===`checkpoint`&&!e.pinned).length>=ne.automatic,a=n||r?{...e.file,id:crypto.randomUUID(),kind:`manual`,pinned:!0}:e.file;await i.store.put(a,e.image??void 0),L=null,b.hidden=!0,ue(`gallery.deleteUndone`)},!0,`success`)}async function J(){let o=++_e;y.replaceChildren(),T&&(g.value===`all`||g.value===`experiments`)&&y.append(...U.render(i.view().theme));for(let c of O.filter(e=>g.value===`all`||g.value===`manual`&&e.kind===`manual`||g.value===`checkpoints`&&e.kind===`checkpoint`||g.value===`pinned`&&e.pinned)){let l=document.createElement(`article`);l.className=`save-card`,l.dataset.id=c.id,l.dataset.selected=String(N===c.id);let u=()=>c.name||n(`gallery.${c.kind}`),d=document.createElement(`img`);s(d,`alt`,()=>n(`gallery.thumbnail`)),d.width=160,d.height=110,d.hidden=!0;let f=document.createElement(`span`);f.className=`save-preview-fallback`,r(f,()=>n(`gallery.thumbnailUnavailable`));let m=()=>{H()&&(N===c.id?K(c):(te(c.id),l.dataset.selected=`true`,O.hidden=!1,h.setAttribute(`aria-expanded`,`true`)))},h=de(`gallery.thumbnail`,m);h.onclick=e=>{e.stopPropagation(),m()},h.className=`save-thumbnail`,a(h,`aria-label`,()=>n(`gallery.chooseSave`,{name:u()})),h.setAttribute(`aria-expanded`,String(N===c.id)),h.setAttribute(`aria-controls`,`save-actions-${c.id}`),h.replaceChildren(d,f),l.onclick=e=>{e.target instanceof Element&&!e.target.closest(`button,a,input,select,textarea,form,[role="button"]`)&&m()};let g=document.createElement(`h3`);g.className=`save-name`,r(g,()=>u()),s(g,`title`,()=>`${u()}\n${n(`gallery.renameHint`)}`),g.tabIndex=0,g.setAttribute(`role`,`button`),a(g,`aria-label`,()=>n(`gallery.editName`,{name:u()})),g.hidden=P===c.id;let _=document.createElement(`form`);_.className=`save-inline-name-form`,_.hidden=P!==c.id;let v=document.createElement(`input`);v.value=P===c.id?F:c.name,s(v,`placeholder`,()=>u()),v.maxLength=80,a(v,`aria-label`,()=>n(`gallery.rename`)),a(v,`title`,()=>n(`gallery.renameHint`)),_.append(v);let b=()=>{P=null,F=``,_.hidden=!0,g.hidden=!1},S=()=>{E||I||!i.store||(he(),P=c.id,F=c.name,v.value=F,g.hidden=!0,_.hidden=!1,v.focus(),v.setSelectionRange(0,0))},C=()=>{if(P!==c.id||E||I)return;if(F===c.name){b();return}let e=F;pe(async()=>{await i.store.rename(c.id,e),b()},!1,`ready`)};g.onclick=S,g.onkeydown=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),S())},v.oninput=()=>{F=v.value},v.onblur=C,v.onkeydown=e=>{e.key===`Escape`&&!e.isComposing&&(e.preventDefault(),e.stopPropagation(),b(),g.focus())},_.onsubmit=e=>{e.preventDefault(),E||C()};let w=()=>new Intl.DateTimeFormat(t(),{month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(new Date(c.createdAt)),T=document.createElement(`p`);T.className=`save-info`,r(T,()=>n(`gallery.cardInfo`,{date:w(),type:n(c.kind===`workspace`?`gallery.workspaceType`:`gallery.${c.kind}`),count:c.state.bodies.length})),s(l,`title`,()=>n(`gallery.metadata`,{date:new Date(c.createdAt).toLocaleString(t()),time:x(c.state.elapsedSeconds),count:c.state.bodies.length,type:n(`gallery.${c.kind}`)}));let O=document.createElement(`div`);O.className=`save-actions`,O.id=`save-actions-${c.id}`,O.hidden=N!==c.id,O.setAttribute(`role`,`group`),a(O,`aria-label`,()=>n(`gallery.actions`)),O.onkeydown=e=>{e.key===`Escape`&&(e.stopPropagation(),he(),h.focus())},c.kind===`workspace`?O.append(de(`gallery.keepWorkspace`,()=>void pe(async()=>i.store.put({...c,id:crypto.randomUUID(),createdAt:Date.now(),kind:`manual`,pinned:!0,name:u()},await i.store.image(c.id)??void 0),!1,`success`))):O.append(de(c.pinned?`gallery.unpin`:`gallery.pin`,()=>void pe(()=>i.store.put({...c,pinned:!c.pinned}),!1,`ready`))),O.append(de(`gallery.export`,()=>{rd(c),p(e,`success`)})),O.append(de(`gallery.delete`,()=>void ge(c))),l.append(h,g,_,T,O),y.append(l),i.store&&i.store.image(c.id).then(e=>{e&&!D&&o===_e&&(d.src=e,d.hidden=!1,f.hidden=!0)}).catch(()=>ue(`gallery.failed`))}}let _e=0;g.onchange=()=>{he(),J(),y.scrollTop=0,p(e,`page`)},c.onclick=()=>{!E&&!I&&!i.busy()&&(B=!T,i.open(!T))};function ve(t){if(T===t)return;let r=!t&&d.contains(document.activeElement),a=t&&document.activeElement===c;if(T=t,d.hidden=d.inert=!t,o.dataset.open=String(t),c.setAttribute(`aria-expanded`,String(t)),e.dataset.gallery=String(t),a?m.focus({preventScroll:!0}):r&&c.focus({preventScroll:!0}),B===t&&(B=null,p(e,t?`bloom`:`droplet`)),W=null,t){i.onOpen?.();for(let t of[...e.children,...e.querySelectorAll(`.spatial-handle`)])t instanceof HTMLElement&&t!==o&&!t.classList.contains(`scene-host`)&&(z.set(t,t.inert),t.inert=!0);G().then(()=>{T&&!D&&(y.scrollTop=0)}).catch(()=>ue(`gallery.failed`))}else he(),z.forEach((e,t)=>{t.inert=e}),z.clear(),h.textContent===n(`gallery.restored`)&&ue(`gallery.info`)}let ye=setInterval(()=>{let e=i.current();if(!e||i.busy()||e.galleryOpen||e.jump||e.localStep||e.physicsIssue||E||I||!i.store)return;let t=i.view(),n=e.speedIndex,r=JSON.stringify([e.version,t,n]);r!==k&&pe(async()=>{await me(ae(e.state,t,n,`workspace`,``,`workspace`)),k=r},!0)},1e4);return i.store?G().catch(()=>ue(`gallery.failed`)):ue(`gallery.unavailable`),{close:V,update(t){if(ve(!!t.galleryOpen),c.disabled=i.busy()||!!t.jump||!!t.localStep,m.disabled=E||!!I,I&&t.recoveryResult?.operation===`loadScene`&&t.recoveryResult.requestId===I){I=!1;let n=t.recoveryResult.outcome===`committed`;ue(n?`gallery.restored`:`gallery.failed`),p(e,n?`success`:`error`),n&&(he(),i.onRestored?.(),i.open(!1))}if(t.jump&&t.jump.taskId!==j&&(j=t.jump.taskId,M=i.view()),t.history?.revision!==A&&!E&&!I&&!t.jump&&!t.localStep&&!i.busy()&&i.store){let e=(i.archive()?.checkpoints??[]).find(e=>!R.has(e.id));if(e){let n=structuredClone(M??i.view());e.state.bodies.some(e=>e.id===n.camera.followId)||(n.camera.overview=!0),pe(async()=>{await me(ae(e.state,n,t.speedIndex,`checkpoint`,``,`checkpoint-${ee}-${e.id}`)),R.add(e.id)},!0)}else A=t.history?.revision??-1}},fail(){B=null,I=!1,ve(!1),ue(`gallery.failed`)},async flushWorkspace(){i.store&&!i.busy()&&!E&&await me(fe(`workspace`))},dispose(){D=!0,L=null,U.dispose(),clearInterval(ye),_e++,e.removeEventListener(`pointerdown`,oe,!0),e.removeEventListener(`pointermove`,se,!0),e.removeEventListener(`pointercancel`,ce,!0),e.removeEventListener(`click`,le,!0),z.forEach((e,t)=>{t.inert=e}),delete e.dataset.gallery,o.remove(),i.store?.close()}}}function ad(e){let t=[];return e.traverse(e=>{let n=e;for(let e of n.material?Array.isArray(n.material)?n.material:[n.material]:[]){let n=e;t.push([n.uuid,n.side,n.transparent,n.forceSinglePass,n.alphaTest,n.toneMapped,n.vertexColors,n.flatShading,n.map?.uuid,n.map?.channel,n.map?.colorSpace,n.alphaMap?.uuid,n.customProgramCacheKey(),JSON.stringify(n.defines),n.vertexShader,n.fragmentShader].join(`:`))}}),e.traverseVisible(e=>{let n=e;n.isLight&&t.push(`light:${n.type}`)}),t.join(`|`)}var od=class{compile;failure;ready=null;pending=!1;failed=null;generation=0;disposed=!1;starts=0;completions=0;constructor(e,t=()=>{}){this.compile=e,this.failure=t}canRender(e){if(this.disposed)return!1;if(this.ready===e)return!0;if(this.pending||this.failed===e)return!1;this.pending=!0,this.starts++;let t=this.generation;return Promise.resolve().then(()=>{if(!(this.disposed||t!==this.generation))return this.compile()}).then(()=>{this.disposed||t!==this.generation||(this.ready=e,this.pending=!1,this.completions++)},n=>{this.disposed||t!==this.generation||(this.pending=!1,this.failed=e,this.failure(n))}),!1}diagnostics(e){return{pending:this.pending,failed:this.failed===e,starts:this.starts,completions:this.completions,readyLength:this.ready?.length??0,keyLength:e.length}}invalidate(){this.generation++,this.ready=null,this.pending=!1,this.failed=null}dispose(){this.disposed=!0,this.invalidate()}},sd=2e4;async function cd(e,t,n,r,i,a,o){if(!r())return;let s=performance.now(),c=Math.min(s+sd,o??1/0),l=0,u=!1,d=()=>{if(!Number.isFinite(c)||performance.now()>=c)throw Error(`Shader preparation timed out`)};try{d();try{e.compile(t,n)}finally{l=performance.now()-s}if(!r())return;d();let o=e.getContext(),f=o.getExtension(`KHR_parallel_shader_compile`);u=!!f;for(let t of e.info.programs??[]){if(!r()||o.isContextLost())return;d();let e=t.program;if(!e||i.has(e))continue;for(;f;){if(!r()||o.isContextLost())return;if(d(),t.program!==e||o.getProgramParameter(e,f.COMPLETION_STATUS_KHR))break;await new Promise(e=>setTimeout(e,Math.min(10,Math.max(0,c-performance.now()))))}if(!r()||o.isContextLost())return;if(d(),t.program!==e)continue;let n=o.getProgramParameter(e,o.LINK_STATUS);if(d(),!n){let n=[o.getProgramInfoLog(e),o.getShaderInfoLog(t.vertexShader),o.getShaderInfoLog(t.fragmentShader)].filter(Boolean).join(`
`);throw Error(`Shader link failed\n${n}`)}i.add(e)}if(!r())return;d(),a?.({submitMs:l,wallMs:performance.now()-s,parallel:u,failed:!1})}catch(e){throw a?.({submitMs:l,wallMs:performance.now()-s,parallel:u,failed:!0}),e}}var ld=class{upload;schedule;tasks=[];cancel=null;disposed=!1;constructor(e,t=e=>{let t=requestAnimationFrame(e);return()=>cancelAnimationFrame(t)}){this.upload=e,this.schedule=t}prepare(e){return this.disposed?Promise.resolve():new Promise((t,n)=>{this.tasks.push({texture:e,resolve:t,reject:n}),this.request()})}request(){this.cancel||this.disposed||!this.tasks.length||(this.cancel=this.schedule(()=>{this.cancel=null;let e=this.tasks.shift();if(e){try{this.upload(e.texture),e.resolve()}catch(t){e.reject(t)}this.request()}}))}dispose(){this.disposed=!0,this.cancel?.(),this.cancel=null;for(let e of this.tasks.splice(0))e.resolve()}},ud={sun:{file:`2k_sun.jpg`,width:2048,height:1024},mercury:{file:`2k_mercury.jpg`,width:2048,height:1024},venus:{file:`2k_venus_atmosphere.jpg`,width:2048,height:1024},earth:{file:`earth-scope-2k.jpg`,width:2048,height:1024},moon:{file:`moon-2k.jpg`,width:2048,height:1024},jupiter:{file:`jupiter-cassini-2k.jpg`,width:2048,height:1024},mars:{file:`2k_mars.jpg`,width:2048,height:1024},saturn:{file:`2k_saturn.jpg`,width:2048,height:1024},uranus:{file:`2k_uranus.jpg`,width:2048,height:1024},neptune:{file:`2k_neptune.jpg`,width:2048,height:1024},"saturn-ring":{file:`2k_saturn_ring_alpha.png`,width:2048,height:125}};function dd(e,t,n=ud){let r=n[e];return t===`close`?r.close??r:r}var fd=class{fetch;status;base;catalog;prepare;entries=new Map;textures=new Set;failed=new Set;states=new Map;disposed=!1;constructor(e=e=>new To().loadAsync(e),t=()=>{},n=`/planet-simulator/`,r=ud,i){this.fetch=e,this.status=t,this.base=n,this.catalog=r,this.prepare=i}report(e,t,n){this.states.set(t,n);let r=[...this.states].filter(([t])=>t.startsWith(`${e}:`)).map(([,e])=>e);this.status(e,r.includes(`failed`)?`failed`:r.includes(`loading`)?`loading`:`ready`)}get(e,t=`base`){if(this.disposed)return Promise.resolve(null);let n=dd(e,t,this.catalog),r=`${e}:${n.file}`,i=this.entries.get(r);if(i)return i;this.report(e,r,`loading`);let a=this.fetch(`${this.base}assets/samples/${n.file}`).then(t=>{if(this.disposed)return t.dispose(),null;t.colorSpace=Rt,t.wrapS=J,t.wrapT=_e,t.anisotropy=4,this.textures.add(t);let n=()=>this.disposed?null:(this.report(e,r,`ready`),t);return this.prepare?this.prepare(t).then(n,e=>{throw this.textures.delete(t)&&t.dispose(),e}):n()}).catch(()=>(this.disposed||(this.failed.add(r),this.report(e,r,`failed`)),null));return this.entries.set(r,a),a}retry(e,t=`base`){let n=`${e}:${dd(e,t,this.catalog).file}`;return this.failed.delete(n)&&this.entries.delete(n),this.get(e,t)}prepareResident(){return Promise.all([...this.textures].map(e=>this.prepare?.(e)))}diagnostics(){return{textureEntries:this.entries.size,residentTextures:this.textures.size,loadingTextures:[...this.states.values()].filter(e=>e===`loading`).length}}dispose(){this.disposed||(this.disposed=!0,this.textures.forEach(e=>e.dispose()),this.textures.clear(),this.entries.clear(),this.states.clear(),this.failed.clear())}},pd=`
float sunSpot(vec2 uv, vec2 center, vec2 size) {
  vec2 delta = uv - center;
  delta.x = mod(delta.x + 0.5, 1.0) - 0.5;
  // Display-only 3x enlargement: keep reference centers, avoid tiny pin-dot silhouettes.
  vec2 local = delta / (size * 3.0);
  float angle = atan(local.y, local.x + 0.0001);
  float radius = length(local) * (1.0 + 0.12 * sin(angle * 3.0) + 0.06 * sin(angle * 7.0));
  float edge = max(fwidth(radius), 0.025);
  float core = 1.0 - smoothstep(0.35 - edge, 0.56 + edge, radius);
  float penumbra = 1.0 - smoothstep(0.62 - edge, 1.06 + edge, radius);
  return core * 0.68 + penumbra * 0.26;
}
vec3 quietSun(vec2 uv, float detail, float facing, float atelier) {
  // Orthographic photo projection; see archived reference-placement.json.
  float spots = 0.0;
  spots = max(spots, sunSpot(uv, vec2(0.3349395,0.5624605), vec2(0.0015805,0.0027215)));
  spots = max(spots, sunSpot(uv, vec2(0.3359666,0.5522855), vec2(0.0011042,0.0018940)));
  spots = max(spots, sunSpot(uv, vec2(0.3517053,0.5421641), vec2(0.0008387,0.0013464)));
  spots = max(spots, sunSpot(uv, vec2(0.3545601,0.5401453), vec2(0.0007221,0.0011435)));
  spots = max(spots, sunSpot(uv, vec2(0.3643263,0.5435109), vec2(0.0014762,0.0022229)));
  spots = max(spots, sunSpot(uv, vec2(0.3662957,0.5462069), vec2(0.0009056,0.0013488)));
  spots = max(spots, sunSpot(uv, vec2(0.4329655,0.5247155), vec2(0.0020464,0.0016733)));
  spots = max(spots, sunSpot(uv, vec2(0.4349007,0.5173588), vec2(0.0018484,0.0014703)));
  // Restrained continuum-inspired orange; deeper ochre separates Atelier from ivory.
  vec3 continuum = mix(vec3(.80,.12,.004), vec3(1.0,.43,.035), pow(clamp(facing,0.0,1.0),.65));
  vec3 base = mix(continuum, vec3(.70,.36,.070), atelier);
  float limb = .64 + .36 * pow(clamp(facing, 0.0, 1.0), .45);
  float textureDetail = .96 + .04 * smoothstep(.05,.75,detail);
  return base * limb * textureDetail * (1.0 - spots);
}
`,md={cosmos:{background:`#090d14`,ambient:`#c1d3ea`,fill:1.1,key:`#fff1df`,keyIntensity:2.4},atelier:{background:`#E9E3D8`,ambient:`#f5ead7`,fill:1.75,key:`#fff8ed`,keyIntensity:1.7}},hd=[`sun`,`mercury`,`venus`,`earth`,`moon`,`mars`,`jupiter`,`saturn`,`uranus`,`neptune`];function gd(e,t){let n={value:+(t===`atelier`)},r={value:new Z(1/2048,1/1024)},i=e===`sun`?new Ui({color:`#ffffff`,toneMapped:!1}):new Ya({color:`#ffffff`,roughness:1,metalness:0});return i.onBeforeCompile=t=>{if(t.uniforms.sampleAtelier=n,t.uniforms.sampleTexel=r,t.fragmentShader=`uniform float sampleAtelier;
uniform vec2 sampleTexel;
`+t.fragmentShader,e===`sun`){let e=`varying vec3 sampleSunView;
varying vec3 sampleSunNormal;
`;t.vertexShader=e+t.vertexShader.replace(`#include <project_vertex>`,`
        #include <project_vertex>
        sampleSunView = -mvPosition.xyz;
        sampleSunNormal = normalize(normalMatrix * normal);
      `),t.fragmentShader=e+pd+t.fragmentShader}t.fragmentShader=t.fragmentShader.replace(`#include <map_fragment>`,`
      #ifdef USE_MAP
        vec4 sampled = texture2D(map, vMapUv);
        vec3 softColor = (texture2D(map, vMapUv + vec2(sampleTexel.x, 0.0)).rgb
          + texture2D(map, vMapUv - vec2(sampleTexel.x, 0.0)).rgb
          + texture2D(map, vMapUv + vec2(0.0, sampleTexel.y)).rgb
          + texture2D(map, vMapUv - vec2(0.0, sampleTexel.y)).rgb + sampled.rgb * 4.0) / 8.0;
        vec3 surfaceColor = mix(sampled.rgb, softColor, sampleAtelier * 0.65);
        ${e===`earth`?`
          // Muted blue-green ocean treatment; keep the approved source land and coastline UVs.
          float ocean = step(surfaceColor.r * 1.8, surfaceColor.b)
            * step(surfaceColor.g * 0.95, surfaceColor.b)
            * (1.0 - smoothstep(0.06, 0.18, dot(surfaceColor, vec3(0.2126, 0.7152, 0.0722))));
          vec3 oceanColor = mix(vec3(0.024, 0.095, 0.15), vec3(0.05, 0.12, 0.155), sampleAtelier);
          surfaceColor = mix(surfaceColor, oceanColor, ocean * 0.7);
        `:``}
        float luminance = dot(surfaceColor, vec3(0.2126, 0.7152, 0.0722));
        ${e===`sun`?`
          surfaceColor = quietSun(vMapUv, luminance,
            dot(normalize(sampleSunNormal), normalize(sampleSunView)), sampleAtelier);
        `:`
          surfaceColor = mix(surfaceColor, vec3(luminance), sampleAtelier * 0.32);
          surfaceColor = mix(surfaceColor, vec3(0.68, 0.65, 0.59), sampleAtelier * 0.07);
        `}
        diffuseColor *= vec4(surfaceColor, sampled.a);
      #endif
    `)},i.customProgramCacheKey=()=>`sample-surface-v3-${e===`sun`?`sun`:e===`earth`?`earth`:`standard`}`,{material:i,setTheme(e){n.value=+(e===`atelier`)},setResolution(e,t){r.value.set(1/e,1/t)}}}function _d(e){return new Fr(md[e].background)}function vd(){let e=[],t=317,n=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296);for(let t=0;t<380;t++){let t=n()*2-1,r=n()*Math.PI*2,i=Math.sqrt(1-t*t);e.push(Math.cos(r)*i*3e3,t*3e3,Math.sin(r)*i*3e3)}let r=new ji;r.setAttribute(`position`,new yi(e,3));let i=new Sa({color:`#b5bed0`,size:1.1,sizeAttenuation:!1,transparent:!0,opacity:.48,depthWrite:!1}),a=new Da(r,i);return a.frustumCulled=!1,{stars:a,dispose(){r.dispose(),i.dispose()}}}var yd={source:`https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc`,version:`pck00011, 2022-12-27`,retrieved:`2026-10-22`,extraction:`Numeric orientation subset transcribed from the official web-readable kernel; direct raw download timed out. Zero-only harmonic arrays and unused system angles omitted. Not the original kernel file.`,epochJdTdb:2451545,eclipticObliquityArcsec:84381.448,obliquitySource:`https://ssd.jpl.nasa.gov/astro_par.html; also archived Horizons earth.json reference-frame header`,units:`degrees; pole polynomials and phase-angle polynomials in Julian centuries; prime-meridian polynomial in TDB days; epoch JD2451545.0 TDB`,limits:`Display only. IAU_EARTH and IAU_MOON text models are not high-precision terrestrial/lunar orientation. Texture longitude registration is illustrative, not calibrated to the model prime meridian. Gas giants and Sun are reference-system rotation, not evolving cloud or differential-rotation models.`,bodies:{sun:{ra:[286.13,0,0],dec:[63.87,0,0],pm:[84.176,14.1844,0]},mercury:{ra:[281.0103,-.0328,0],dec:[61.4155,-.0049,0],pm:[329.5988,6.1385108,0],angles:[[174.7910857,149472.53587500003],[349.5821714,298945.07175000006],[164.3732571,448417.60762500006],[339.1643429,597890.1435000001],[153.9554286,747362.679375]],pmTerms:[.01067257,-.00112309,-1104e-7,-2539e-8,-571e-8]},venus:{ra:[272.76,0,0],dec:[67.16,0,0],pm:[160.2,-1.4813688,0]},earth:{ra:[0,-.641,0],dec:[90,-.557,0],pm:[190.147,360.9856235,0]},moon:{ra:[269.9949,.0031,0],dec:[66.5392,.013,0],pm:[38.3213,13.17635815,-14e-13],angles:[[125.045,-1935.5364525],[250.089,-3871.072905],[260.008,475263.3328725],[176.625,487269.629985],[357.529,35999.0509575],[311.589,964468.49931],[134.963,477198.869325],[276.617,12006.300765],[34.226,63863.5132425],[15.134,-5806.6093575],[119.743,131.84064],[239.961,6003.1503825],[25.053,473327.79642]],raTerms:[-3.8787,-.1204,.07,-.0172,0,.0072,0,0,0,-.0052,0,0,.0043],decTerms:[1.5419,.0239,-.0278,.0068,0,-.0029,9e-4,0,0,8e-4,0,0,-9e-4],pmTerms:[3.561,.1208,-.0642,.0158,.0252,-.0066,-.0047,-.0046,.0028,.0052,.004,.0019,-.0044]},mars:{ra:[317.269202,-.10927547,0],dec:[54.432516,-.05827105,0],pm:[176.049863,350.891982443297,0],angles:[[190.72646643,15917.10818695,0],[21.4689247,31834.27934054,0],[332.86082793,19139.89694742,0],[394.93256437,38280.79631835,0],[189.6327156,41215158.1842005,12.711923222],[121.46893664,660.22803474,0],[231.05028581,660.9912354,0],[251.37314025,1320.50145245,0],[217.98635955,38279.9612555,0],[196.19729402,19139.83628608,0],[198.991226,19139.4819985,0],[226.292679,38280.8511281,0],[249.663391,57420.7251593,0],[266.18351,76560.636795,0],[79.398797,.5042615,0],[122.433576,19139.9407476,0],[43.058401,38280.8753272,0],[57.663379,57420.7517205,0],[79.476401,76560.6495004,0],[166.325722,.5042615,0],[129.071773,19140.0328244,0],[36.352167,38281.0473591,0],[56.668646,57420.929536,0],[67.364003,76560.2552215,0],[104.79268,95700.4387578,0],[95.391654,.5042615,0]],raTerms:[0,0,0,0,0,0,0,0,0,0,68e-6,238e-6,52e-6,9e-6,.419057],decTerms:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51e-6,141e-6,31e-6,5e-6,1.591274],pmTerms:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,145e-6,157e-6,4e-5,1e-6,1e-6,.584542]},jupiter:{ra:[268.056595,-.006499,0],dec:[64.495303,.002413,0],pm:[284.95,870.536,0],angles:[[73.32,91472.9],[24.62,45137.2],[283.9,4850.7],[355.8,1191.3],[119.9,262.1],[229.8,64.3],[352.25,2382.6],[113.35,6070],[146.64,182945.8],[49.24,90274.4],[99.360714,4850.4046],[175.895369,1191.9605],[300.323162,262.5475],[114.012305,6070.2476],[49.511251,64.3]],raTerms:[0,0,0,0,0,0,0,0,0,0,117e-6,938e-6,.001432,3e-5,.00215],decTerms:[0,0,0,0,0,0,0,0,0,0,5e-5,404e-6,617e-6,-13e-6,926e-6]},saturn:{ra:[40.589,-.036,0],dec:[83.537,-.004,0],pm:[38.9,810.7939024,0]},uranus:{ra:[257.311,0,0],dec:[-15.175,0,0],pm:[203.81,-501.1600928,0]},neptune:{ra:[299.36,0,0],dec:[43.46,0,0],pm:[249.978,541.1397757,0],angles:[[357.85,52.316],[323.92,62606.6],[220.51,55064.2],[354.27,46564.5],[75.31,26109.4],[35.36,14325.4],[142.61,2824.6],[177.85,52.316],[647.84,125213.2],[355.7,104.632],[533.55,156.948],[711.4,209.264],[889.25,261.58],[1067.1,313.896],[1244.95,366.212],[1422.8,418.528],[1600.65,470.844]],raTerms:[.7,0,0,0,0,0,0,0,0],decTerms:[-.51,0,0,0,0,0,0,0,0],pmTerms:[-.48,0,0,0,0,0,0,0,0]}}},bd={star:[600,7],"terrestrial-planet":[24,23],"gas-giant":[10,3],moon:[648,7],"dwarf-planet":[9,4],asteroid:[5,25],comet:[12,30]};function xd(e){if(e===`black-hole`)return;let[t,n]=bd[e];return{periodSeconds:t*3600,tiltDegrees:n,direction:1,phaseDegrees:0,epochSeconds:0}}var Sd=yd.bodies,Cd=Math.PI/180,wd=86400,Td=36525,Ed=yd.eclipticObliquityArcsec/3600*Cd,Dd=new Q(0,1,0),Od=new Map(ue.map(e=>[e.id,e])),kd={earth:-1.9,jupiter:.4},Ad=(e,t)=>e.reduceRight((e,n)=>e*t+n,0);function jd(e,t){let n=Sd[e];if(!n||!Number.isFinite(t))return null;let r=t/wd,i=r/Td,a=(n.angles??[]).map(e=>Ad(e,i)%360*Cd),o=(e,t=!1)=>(e??[]).reduce((e,n,r)=>e+n*(t?Math.cos(a[r]):Math.sin(a[r])),0),s=Ad(n.ra,i)+o(n.raTerms),c=Ad(n.dec,i)+o(n.decTerms,!0),l=Ad(n.pm,r)+o(n.pmTerms);return[s,c,l].every(Number.isFinite)?{ra:s,dec:c,meridian:l}:null}function Md(e,t){let n=jd(e,t);if(!n)return null;let r=n.ra*Cd,i=n.dec*Cd,a=Math.cos(i)*Math.cos(r),o=Math.cos(i)*Math.sin(r),s=Math.sin(i);return new Q(a,-o*Math.sin(Ed)+s*Math.cos(Ed),-o*Math.cos(Ed)-s*Math.sin(Ed)).normalize()}function Nd(e,t){let n=Md(e,t),r=jd(e,t),i=jd(e,0);if(!n||!r||!i)return null;let a=(r.meridian-i.meridian)%360*Cd+(kd[e]??0),o=r.ra*Cd,s=new Q(-Math.sin(o),-Math.cos(o)*Math.sin(Ed),-Math.cos(o)*Math.cos(Ed)).normalize(),c=new er().makeBasis(s,n,s.clone().cross(n).normalize());return new An().setFromRotationMatrix(c).multiply(new An().setFromAxisAngle(Dd,a))}function Pd(e){let t=Od.get(e.id);return!!t&&t.kind===e.kind&&t.massKg===e.massKg&&t.radiusM===e.radiusM&&t.materialId===e.materialId}function Fd(e){return Pd(e)&&!D(e.displaySpin)}function Id(e){let t=Sd[e]?.pm[1];return t?360/Math.abs(t)*wd:null}function Ld(e){if(e.kind===`black-hole`||Fd(e))return;let t=e.displaySpin??xd(e.kind);return D(t)?t:void 0}function Rd(e,t){let n=e*Cd,r=t?Math.atan2(t.z,t.x):0,i=new Q(Math.sin(n)*Math.cos(r),Math.cos(n),Math.sin(n)*Math.sin(r));return new An().setFromUnitVectors(Dd,i)}function zd(e,t){if(!Fd(e))return Ld(e);let n=Nd(e.id,t),r=Md(e.id,t),i=Id(e.id),a=Sd[e.id]?.pm[1];if(!n||!r||!i||!a)return xd(e.kind);let o=Math.acos(Math.max(-1,Math.min(1,r.y)))/Cd,s=Rd(o,r).invert().multiply(n);return{periodSeconds:i,tiltDegrees:o,direction:a<0?-1:1,phaseDegrees:(2*Math.atan2(s.y,s.w)/Cd+720)%360,epochSeconds:t}}function Bd(e,t){if(!Number.isFinite(t))return null;if(Fd(e))return Nd(e.id,t);let n=Ld(e);if(!n)return null;let r=Pd(e)?Md(e.id,n.epochSeconds):null;return Rd(n.tiltDegrees,r).multiply(new An().setFromAxisAngle(Dd,O(n,t)*Cd))}var Vd={inner:66900/58232,outer:136780/58232};function Hd(e){let t=new La(Vd.inner,Vd.outer,128),n=t.getAttribute(`position`),r=t.getAttribute(`uv`);for(let e=0;e<n.count;e++)r.setXY(e,(Math.hypot(n.getX(e),n.getY(e))-Vd.inner)/(Vd.outer-Vd.inner),.5);t.rotateX(-Math.PI/2);let i=gd(`saturn-ring`,`cosmos`);i.material.side=2,i.material.transparent=!0,i.material.opacity=.88,i.material.depthWrite=!1,i.material.alphaTest=.015;let a=new ta(t,i.material);a.visible=!1,a.raycast=()=>{};let o=!1,s=!1;async function c(t=!1){let n=await(t?e.retry(`saturn-ring`):e.get(`saturn-ring`));!s&&n&&(i.material.map=n,i.material.needsUpdate=!0,a.visible=!0,i.setResolution(2048,125))}return{mesh:a,request(){o||(o=!0,c())},retry(){o&&c(!0)},setTheme(e){i.setTheme(e),i.material.opacity=e===`atelier`?.65:.88},dispose(){s=!0,a.removeFromParent(),t.dispose(),i.material.dispose()}}}var Ud=`
float rockHash(vec3 p) {return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float rockNoise(vec3 p) {
  vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(mix(rockHash(i),rockHash(i+vec3(1,0,0)),f.x),
    mix(rockHash(i+vec3(0,1,0)),rockHash(i+vec3(1,1,0)),f.x),f.y),
    mix(mix(rockHash(i+vec3(0,0,1)),rockHash(i+vec3(1,0,1)),f.x),
    mix(rockHash(i+vec3(0,1,1)),rockHash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
vec2 rockCells(vec3 p) {
  vec3 cell=floor(p);float nearest=10.0,second=10.0;
  for(int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) for(int z=-1;z<=1;z++) {
    vec3 c=cell+vec3(float(x),float(y),float(z));
    vec3 offset=vec3(rockHash(c),rockHash(c+17.0),rockHash(c+43.0));
    float d=length(c+offset-p);
    if(d<nearest) {second=nearest;nearest=d;} else second=min(second,d);
  }
  return vec2(nearest,second-nearest);
}
vec2 craterField(vec3 p) {
  float height=0.0,mark=0.0,weathering=rockNoise(p*65.0);
  for(int i=0;i<76;i++) {
    float n=float(i),y=rockHash(vec3(n,3,11))*2.0-1.0,angle=rockHash(vec3(n,17,9))*6.2831853;
    vec3 center=vec3(sqrt(1.0-y*y)*cos(angle),y,sqrt(1.0-y*y)*sin(angle));
    float radius=.025+.17*pow(rockHash(vec3(n,7,2)),2.0);
    float d=length(p-center)/(radius*(.86+.28*weathering));
    float pit=1.0-smoothstep(.05,.93,d),rim=exp(-pow((d-.96)/.10,2.0));
    height+=radius*(-.075*pit+.0015*rim);mark+=-.22*pit+.008*rim;
  }
  return vec2(mark,height);
}
`,Wd={star:`
    float granules=rockNoise(p*32.0),flow=rockNoise(p*7.0+vec3(.4,2.0,.7));
    float filament=sin(p.y*38.0+flow*6.0+rockNoise(p*17.0)*2.0)*.5+.5;
    vec3 warm=mix(vec3(.68,.29,.13),vec3(1.0,.67,.30),.38+.40*granules+.22*filament);
    return vec4(warm,0.0);`,"terrestrial-planet":`
    float continent=rockNoise(p*3.6+vec3(6.0,1.0,3.0))*.72
      +rockNoise(p*11.0+vec3(2.0,9.0,4.0))*.28;
    float land=smoothstep(.48,.57,continent);
    float terrain=rockNoise(p*16.0),shelf=rockNoise(p*7.0);
    vec3 sea=mix(vec3(.025,.19,.21),vec3(.10,.34,.33),shelf);
    vec3 ground=mix(vec3(.32,.32,.22),vec3(.65,.43,.26),terrain);
    float polar=smoothstep(.78,.93,abs(p.y))*(.55+.45*terrain);
    vec3 color=mix(sea,ground,land);
    color=mix(color,vec3(.77,.79,.73),polar*.62);
    return vec4(color,land*(terrain-.5)*.006);`,"gas-giant":`
    float flow=rockNoise(p*vec3(6.0,15.0,6.0));
    float latitude=p.y+.040*(flow-.5)+.018*(rockNoise(p*31.0)-.5);
    float band=.5+.5*sin(latitude*47.0+flow*5.0);
    float haze=rockNoise(p*vec3(10.0,35.0,10.0));
    vec3 cloud=mix(vec3(.20,.36,.40),vec3(.74,.72,.62),smoothstep(.25,.82,band*.75+haze*.25));
    cloud=mix(cloud,vec3(.42,.51,.53),smoothstep(.72,.96,abs(p.y))*.45);
    return vec4(cloud,0.0);`,moon:`
    vec2 crater=craterField(p);
    float dust=rockNoise(p*22.0),fineGrain=rockNoise(p*86.0)-.5;
    vec3 stone=mix(vec3(.36,.35,.29),vec3(.65,.59,.45),dust);
    return vec4(stone*(1.0+crater.x*.65+fineGrain*.12*fine),crater.y*.7+fineGrain*.001*fine);`,"dwarf-planet":`
    vec2 crater=craterField(p);
    float mottling=rockNoise(p*7.0),grain=rockNoise(p*95.0)-.5;
    float bright=exp(-pow(length(p-normalize(vec3(-.4,.2,1.0)))/.075,2.0));
    float rubble=rockNoise(p*27.0)-.5;
    float tone=.92+crater.x+.22*(mottling-.5)+rubble*.13+grain*.18*fine;
    return vec4(vec3(.29,.275,.25)*tone+bright*.13,crater.y+rubble*.0015+grain*.001*fine);`,asteroid:`
    vec2 cell=rockCells(p*9.0);float dust=rockNoise(p*70.0)-.5;
    float cracks=1.0-smoothstep(.015,.09,cell.y);
    float stone=1.0-smoothstep(.12,.85,cell.x);
    float tone=.62+stone*.65-cracks*.16+dust*.13*fine;
    return vec4(vec3(.19,.195,.19)*tone,.018*stone-.006*cracks+dust*.0015*fine);`,comet:`
    float terrain=rockNoise(p*4.0),grain=rockNoise(p*115.0)-.5;
    float cliff=smoothstep(.48,.68,rockNoise(p*5.0));
    float layer=.5+.5*sin(dot(p,vec3(.5,1.0,.3))*75.0+rockNoise(p*8.0)*5.0);
    vec2 pits=rockCells(p*5.0);
    float pocket=1.0-smoothstep(.05,.26,pits.x);
    float gravel=rockNoise(p*38.0)-.5;
    float tone=.82+terrain*.28+cliff*(layer-.5)*.13-pocket*.16+gravel*.28+grain*.22*fine;
    return vec4(vec3(.19,.17,.145)*tone,.005*terrain+cliff*layer*.0012-pocket*.007+gravel*.003+grain*.002*fine);`};function Gd(e,t){if(e!==`black-hole`&&!(e in Wd))return null;let n={value:+(t===`atelier`)},r=e===`black-hole`||e===`star`?new Ui({color:`#ffffff`,toneMapped:!1}):new Ya({color:`#ffffff`,roughness:1,metalness:0});return r.userData.presentation=e===`black-hole`?`illustrative-dark-boundary`:`original-3d-${e}`,r.onBeforeCompile=t=>{if(t.uniforms.minorAtelier=n,e===`black-hole`){let e=`varying vec3 holeNormal;
varying vec3 holeView;
`;t.vertexShader=e+t.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
        holeNormal=normalize(normalMatrix*normal);holeView=-mvPosition.xyz;`),t.fragmentShader=`uniform float minorAtelier;
`+e+t.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
        float facing=abs(dot(normalize(holeNormal),normalize(holeView)));
        float rim=pow(1.0-facing,4.0);
        vec3 core=mix(vec3(.0005,.0008,.0015),vec3(.012,.014,.017),minorAtelier);
        vec3 edge=mix(vec3(.065,.080,.095),vec3(.060,.065,.070),minorAtelier);
        diffuseColor.rgb=mix(core,edge,rim);`)}else{let n=`varying vec3 rockLocalPosition;
varying float rockDisplayScale;
`;t.vertexShader=n+t.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
        rockLocalPosition=position;rockDisplayScale=length(modelMatrix[0].xyz);`),t.fragmentShader=`uniform float minorAtelier;
`+n+Ud+`
        vec4 rockField(vec3 p,float fine) {${Wd[e]}}
      `+t.fragmentShader.replace(`#include <map_fragment>`,`
        vec3 rockPoint=normalize(rockLocalPosition);
        float fine=1.0-smoothstep(.015,.06,length(fwidth(rockPoint)));
        vec4 rock=rockField(rockPoint,fine);
        float gray=dot(rock.rgb,vec3(.2126,.7152,.0722));
        ${e===`star`?`diffuseColor.rgb*=mix(rock.rgb,rock.rgb*vec3(.80,.67,.62),minorAtelier);`:`diffuseColor.rgb*=mix(rock.rgb,mix(rock.rgb,vec3(gray),.22)*1.12,minorAtelier);`}
      `).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
        // Derivative surface-gradient bump, as in Three.js' MIT bump shader.
        vec3 sigmaX=dFdx(-vViewPosition),sigmaY=dFdy(-vViewPosition);
        vec3 r1=cross(sigmaY,normal),r2=cross(normal,sigmaX);
        float determinant=dot(sigmaX,r1);
        float height=rock.a*rockDisplayScale*mix(1.0,.65,minorAtelier);
        if(abs(determinant)>1e-14) normal=normalize(abs(determinant)*normal
          -sign(determinant)*(dFdx(height)*r1+dFdy(height)*r2));
      `)}},r.customProgramCacheKey=()=>`minor-surface-v3-${e}`,{material:r,setTheme(e){n.value=+(e===`atelier`)}}}function Kd(e,t,n,r,i){let a=e/R*10,o=i*2*t*Math.tan(n*Math.PI/360)/Math.max(1,r);return Math.max(a,o)}var qd={sun:`#e8c98d`,mercury:`#aaa8a3`,venus:`#cfb793`,earth:`#79a0b4`,moon:`#babcb9`,mars:`#b78772`,jupiter:`#b89b86`,saturn:`#c9bba0`,uranus:`#95bfc5`,neptune:`#7c96bb`},Jd={sun:`star`,mercury:`terrestrial-planet`,venus:`terrestrial-planet`,earth:`terrestrial-planet`,moon:`moon`,mars:`terrestrial-planet`,jupiter:`gas-giant`,saturn:`gas-giant`,uranus:`gas-giant`,neptune:`gas-giant`};function Yd(e){return e.kind===`black-hole`?null:hd.find(t=>t===e.materialId&&Jd[t]===e.kind)??null}function Xd(e,t={}){let n=new Lr,r=new Ra(1,72,48),i=new Map,a=new Map,o=new Map,s=new Map,c=new Map,l=new Set,u=new Set,d=t.textures??ud,f=new fd(t.fetchTexture,t.onSurfaceStatus,void 0,d,t.prepareTexture),p=vd();n.add(p.stars);let m=new Map,h=new Do(`#c1d3ea`,`#6c7687`,1.1),g=new Wo(`#fff1df`,1.7);g.position.set(-20,25,50);let _=new Vo(`#fff1df`,2.4,0,0);n.add(h,g,_);let v=new ji;v.setAttribute(`position`,new yi([0,-1.45,0,0,-1.04,0,0,1.04,0,0,1.45,0],3));let y=new la({color:`#b7c7d4`,transparent:!0,opacity:.6,depthTest:!1}),b=new xa(v,y);b.visible=!1,b.renderOrder=2,b.raycast=()=>{},n.add(b);let x=`cosmos`,S=!1,C=new Map,w=0;function T(e){x=e;let t=md[x];n.background=_d(x),h.color.set(t.ambient),h.groundColor.set(x===`atelier`?`#b2a18d`:`#6c7687`),h.intensity=t.fill,g.color.set(t.key),g.intensity=t.keyIntensity,_.color.set(t.key),_.intensity=t.keyIntensity,g.visible=x===`atelier`,_.visible=x===`cosmos`,y.color.set(x===`atelier`?`#56636d`:`#b7c7d4`),p.stars.visible=x===`cosmos`,o.forEach(e=>e.style.setTheme(x)),s.forEach(e=>e.setTheme(x)),m.forEach(e=>e.setTheme(x))}function E(e){C.delete(e);let t=i.get(e);t&&n.remove(t),i.delete(e),a.get(e)?.dispose(),a.delete(e),o.delete(e),s.delete(e),c.delete(e),l.delete(e),u.delete(e),m.get(e)?.dispose(),m.delete(e)}function D(e){let t=new Set(e.map(e=>e.id));for(let e of i.keys())t.has(e)||E(e);for(let t of e){let e=Yd(t),l=e??t.kind;if(i.has(t.id)&&c.get(t.id)===l)continue;i.has(t.id)&&E(t.id);let u=e?gd(e,x):null,d=e?null:Gd(t.kind,x),p=u?.material??d?.material??new Ya({color:`#a2a19b`,roughness:1,metalness:0});d&&s.set(t.id,d),u&&e&&(o.set(t.id,{surface:e,style:u}),p.color.set(qd[e]??`#ffffff`)),a.set(t.id,p),c.set(t.id,l);let h=new ta(r,p);h.userData.bodyId=t.id,i.set(t.id,h),n.add(h);let g=e?Nd(e,0):null;if(g&&h.quaternion.copy(g),t.id===`saturn`&&t.kind===`gas-giant`){let e=Hd(f);e.setTheme(x),m.set(t.id,e),h.add(e.mesh)}}}async function O(e,t=!1,n=!1){let r=o.get(e);if(!r)return;let i=n?`close`:`base`,a=await(t?f.retry(r.surface,i):f.get(r.surface,i));if(!a||S||o.get(e)!==r||!n&&r.style.material.map?.userData.sampleClose)return;n&&(a.userData.sampleClose=!0),r.style.material.map=a,r.style.material.color.set(`#ffffff`),r.style.material.needsUpdate=!0;let s=dd(r.surface,i,d);r.style.setResolution(s.width,s.height)}return D(e),T(x),{scene:n,meshes:i,rings:m,axis:b,sync:D,setTheme:T,prepareTextures:()=>f.prepareResident(),diagnostics:()=>({rotationComputations:w,rotationEntries:C.size,meshes:i.size,...f.diagnostics()}),requestSurface(e,t){let n=o.get(e);t<3||!n||(l.has(e)||(l.add(e),O(e)),d[n.surface].close&&t>=90&&!u.has(e)&&(u.add(e),O(e,!1,!0)),m.get(e)?.request())},retryTextures(){o.forEach((e,t)=>{O(t,!0),u.has(t)&&O(t,!0,!0)}),m.forEach(e=>e.retry())},updateRotation(e,t,n=null,r=!1){b.visible=!1;for(let a of e){let e=i.get(a.id);if(!e)continue;let o=C.get(a.id),s=o?.key;if(!o||o.seconds!==t||!s||s.kind!==a.kind||s.massKg!==a.massKg||s.radiusM!==a.radiusM||s.materialId!==a.materialId||!k(s.displaySpin,a.displaySpin)){let n=Bd(a,t);w++,o={seconds:t,key:{kind:a.kind,massKg:a.massKg,radiusM:a.radiusM,materialId:a.materialId,...a.displaySpin?{displaySpin:{...a.displaySpin}}:{}},orientation:n},C.set(a.id,o),n&&e.quaternion.copy(n)}let c=o.orientation;r&&c&&a.id===n&&e.visible&&(b.position.copy(e.position),b.quaternion.copy(e.quaternion),b.scale.setScalar(e.scale.x),b.visible=!0)}},updateBackdrop(e,t=[]){let n=t.filter(e=>e.kind===`star`).sort((e,t)=>t.massKg-e.massKg)[0],r=n?i.get(n.id):void 0;_.visible=x===`cosmos`&&!!r,g.visible=x===`atelier`||!r,r&&_.position.copy(r.position),p.stars.position.copy(e.position)},dispose(){S||(S=!0,r.dispose(),a.forEach(e=>e.dispose()),m.forEach(e=>e.dispose()),f.dispose(),p.dispose(),v.dispose(),y.dispose(),n.clear(),i.clear(),a.clear(),m.clear(),o.clear(),s.clear(),c.clear(),l.clear(),u.clear(),C.clear())}}}function Zd(e,t){return!Number.isFinite(e)||e<=0||!Number.isFinite(t)||t<=0?0:Math.min(1.3,Math.log1p(Math.min(0xe8d4a51000,e/t)*1e6)/Math.log1p(1e6))}function Qd(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0?0:Math.max(0,Math.min(1,Math.log2(t/e)/3))}function $d(e,t){return Number.isFinite(t)?e?t>Math.sin(2*Math.PI/180):t>Math.sin(5*Math.PI/180):!1}function ef(e){return new qa({transparent:!0,depthTest:!0,depthWrite:!1,side:2,uniforms:{halfSpan:{value:e/2},gridColor:{value:new Fr(`#93a8ba`)},opacity:{value:.32},minorDetail:{value:0}},vertexShader:`#include <common>
   #include <logdepthbuf_pars_vertex>
   attribute vec2 gridCoordinate;
   varying vec2 latticeCoordinate;
   void main(){latticeCoordinate=gridCoordinate;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
   #include <logdepthbuf_vertex>
   }`,fragmentShader:`#include <logdepthbuf_pars_fragment>
   uniform float halfSpan;
   uniform vec3 gridColor;
   uniform float opacity;
   uniform float minorDetail;
   varying vec2 latticeCoordinate;
   float gridCoverage(vec2 coordinate){
    vec2 derivative=max(fwidth(coordinate),vec2(0.000001));
    vec2 distanceToLine=abs(fract(coordinate-0.5)-0.5)/derivative;
    float coverage=1.0-clamp(min(distanceToLine.x,distanceToLine.y),0.0,1.0);
    // Avoid a bright carpet where cells are smaller than pixels near the horizon.
    return coverage*clamp(1.0/max(max(derivative.x,derivative.y),1.0),0.0,1.0);
   }
   void main(){
   #include <logdepthbuf_fragment>
   float major=gridCoverage(latticeCoordinate);
   float minor=gridCoverage(latticeCoordinate*2.0);
   float coverage=mix(major,max(major,minor),minorDetail);
   float edge=max(abs(latticeCoordinate.x-halfSpan),abs(latticeCoordinate.y-halfSpan))/halfSpan;
   float fade=1.0-smoothstep(0.60,1.0,edge);
   float alpha=opacity*coverage*fade;
   if(alpha<0.001) discard;
   gl_FragColor=vec4(gridColor,alpha);
   #include <colorspace_fragment>
   }`})}var tf=2,nf=4800;function rf(e,t,n,r,i,a,o){let s=2*r/48,c=Hu({x:0,y:0,z:0},t).y,l=Math.round(n.x/s)*s,u=Math.round(n.z/s)*s,d=e.filter(e=>Number.isFinite(e.massKg)&&e.massKg>0&&Object.values(e.positionM).every(Number.isFinite)).map(e=>({position:Hu(e.positionM,t),mass:e.massKg,radius:Math.max(0,o.get(e.id)??Hu({x:e.radiusM,y:0,z:0},{x:0,y:0,z:0}).x)})).filter(e=>Math.abs(e.position.x-l)<r*1.3&&Math.abs(e.position.z-u)<r*1.3&&Math.abs(e.position.y-(n.y??0))<r*1.3),f=Math.max(n.y??0,...d.map(e=>e.position.y))+r*.025,p=d.map(e=>({...e,width:Math.max(s*(.65+2*Zd(e.mass,i)),e.radius*1.6,(f-e.position.y+e.radius)*4),floor:e.position.y-e.radius,strength:Zd(e.mass,i)}));return{point:(e,t)=>{let n=l-r+e*s,i=u-r+t*s,o=c;if(a){o=f;let e=0,t=1;for(let a of p){let c=Math.hypot(n-a.position.x,i-a.position.z),l=c/a.width;t=Math.min(t,1-Math.exp(-((c/(a.radius*2+s*.7))**2))),e=Math.max(e,r*.055*a.strength*a.strength*l*l*Math.exp(-l*l*1.5));let u=f-(f-a.floor)*Math.exp(-l*l*1.5),d=r*.001,p=Math.max(d-Math.abs(o-u),0)/d;o=Math.min(o,u)-p*p*d*.25}o+=e*t;for(let e of p){let t=Math.hypot(n-e.position.x,i-e.position.z),a=e.radius+Math.SQRT2*s/2,c=Math.max(0,Math.min(1,(t-a)/Math.max(s,e.radius*.75,(f-e.floor)*4))),l=e.floor+(f-e.floor+r*.1)*c*c*(3-2*c);o=Math.min(o,l)}}return[n,o,i]},shade:(e,t)=>{let n=l-r+e*s,i=u-r+t*s;return Math.min(1,p.reduce((e,t)=>{let r=Math.hypot(n-t.position.x,i-t.position.z)/t.width;return Math.max(e,t.strength*Math.exp(-r*r*1.5))},0))},centerX:l,centerZ:u}}var af=new Map;function of(){let e=nf,t=new yi(new Float32Array(e*3),3),n=new ji;n.setAttribute(`position`,t);let r=new yi(new Float32Array(e),1);n.setAttribute(`gridFade`,r);let i=new la({color:`#93a8ba`,transparent:!0,opacity:.32,depthWrite:!1});i.onBeforeCompile=e=>{e.vertexShader=`attribute float gridFade;
varying float gridOpacity;
`+e.vertexShader.replace(`void main() {`,`void main() {
 gridOpacity = gridFade;`),e.fragmentShader=`varying float gridOpacity;
`+e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
 diffuseColor.a *= gridOpacity;`)},i.customProgramCacheKey=()=>`faded-potential-grid-v1`;let a=new xa(n,i);a.frustumCulled=!1,a.visible=!1,a.raycast=()=>{};let o=new ji,s=new yi(new Float32Array(28227),3),c=new yi(new Float32Array(9409),1),l=new yi(new Float32Array(18818),2);for(let e=0;e<=96;e++)for(let t=0;t<=96;t++)l.setXY(e*97+t,t*48/96,e*48/96);o.setAttribute(`gridCoordinate`,l);let u=new yi(new Float32Array(9409),1);o.setAttribute(`position`,s),o.setAttribute(`edgeFade`,c),o.setAttribute(`basinShade`,u);let d=[];for(let e=0;e<96;e++)for(let t=0;t<96;t++){let n=e*97+t,r=n+1,i=n+96+1,a=i+1;d.push(n,i,r,r,i,a)}o.setIndex(d);let f=new qa({transparent:!1,depthTest:!1,depthWrite:!1,side:2,uniforms:{baseColor:{value:new Fr(`#E9E3D8`)}},vertexShader:`#include <common>
      #include <logdepthbuf_pars_vertex>
      attribute float edgeFade;
      attribute float basinShade;
      varying float cavity;
      varying float alpha;
      varying vec3 slopeNormal;
      void main(){alpha=edgeFade;cavity=basinShade;slopeNormal=normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
      #include <logdepthbuf_vertex>
      }`,fragmentShader:`#include <logdepthbuf_pars_fragment>
      uniform vec3 baseColor;
      varying float cavity;
      varying float alpha;
      varying vec3 slopeNormal;
      void main(){
      #include <logdepthbuf_fragment>
      if(alpha<.01) discard;
      vec3 light=normalize(vec3(.65,1.0,.65));
      float slope=dot(normalize(slopeNormal),light)-light.y;
      float shade=clamp(1.0+slope*1.4-cavity*.32,.30,1.16);
      gl_FragColor=vec4(baseColor*mix(1.0,shade,alpha),1.0);
      #include <colorspace_fragment>
      }`}),p=ef(48),m=new ta(o,p);m.visible=!1,m.frustumCulled=!1,m.raycast=()=>{};let h=new ta(o,f);h.renderOrder=-10,h.visible=!1,h.frustumCulled=!1,h.raycast=()=>{};let g=`off`,_=!0,v=!0,y=!1,b=0,x=-1/0,S=``,C=()=>{a.visible=_&&g===`reference`,m.visible=_&&g===`well`,h.visible=!_&&v};return{mesh:a,well:m,relief:h,updateView(e,t,n=0){let r=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z);y=$d(y,r>0?(e.y-t.y)/r:0),f.depthTest=y,f.depthWrite=y,b=Math.max(0,Math.min(1,Number.isFinite(n)?n:0)),p.uniforms.minorDetail.value=b},setRelief(e){v=e,C(),S=``,x=-1/0},setMode(e){e!==g&&(x=-1/0,S=``),g=e,C()},setTheme(e){_!==e&&(x=-1/0,S=``),_=e,C()},update(e,i,l,d,f,p,v=af){if(!a.visible&&!m.visible&&!h.visible||p-x<100||![d,f,l.x,l.z].every(Number.isFinite)||!Number.isFinite(l.y??0)||d<=0||f<=0)return!1;let y=[g,_,i.x,i.y,i.z,l.x,l.y??0,l.z,d,...a.visible?[]:[f,...e.flatMap(e=>[e.id,e.massKg,e.positionM.x,e.positionM.y,e.positionM.z,v.get(e.id)??e.radiusM])]].join(`:`);if(x=p,y===S)return!1;let{point:b,shade:C,centerX:w,centerZ:T}=rf(e,i,l,d,f,!_||g===`well`,v);if(h.visible||m.visible){for(let e=0;e<=96;e++)for(let t=0;t<=96;t++){let n=e*97+t,[r,i,a]=b(t*48/96,e*48/96);s.setXYZ(n,r,i,a),h.visible&&u.setX(n,C(t*48/96,e*48/96));let o=Math.max(Math.abs(r-w),Math.abs(a-T))/d,l=Math.max(0,Math.min(1,(o-.65)/.35));c.setX(n,1-l*l*(3-2*l))}return s.needsUpdate=!0,c.needsUpdate=!0,h.visible&&(u.needsUpdate=!0,o.computeVertexNormals()),S=y,!0}let E=0,D=(e,n,i=1)=>{let[a,o,s]=b(e,n);t.setXYZ(E,a,o,s);let c=Math.max(Math.abs(a-w),Math.abs(s-T))/d,l=Math.max(0,Math.min(1,(c-.6)/.4));r.setX(E++,i*(1-l*l*(3-2*l)))};for(let e=0;e<=48;e+=tf)for(let t=0;t<48;t++)D(t,e),D(t+1,e),D(e,t),D(e,t+1);return n.setDrawRange(0,E),t.needsUpdate=!0,r.needsUpdate=!0,S=y,!0},dispose(){n.dispose(),i.dispose(),o.dispose(),f.dispose(),p.dispose(),a.removeFromParent(),m.removeFromParent(),h.removeFromParent()}}}function sf(e={}){let t=new Iu({antialias:!0,preserveDrawingBuffer:!0,logarithmicDepthBuffer:!0});t.setSize(320,220),t.setPixelRatio(1);let n=e.profileContext?.(t.getContext());t.debug.checkShaderErrors=!1;let r=new WeakSet,i=new ld(e=>t.initTexture(e));t.toneMapping=4,t.toneMappingExposure=1.1;let a=new Set,o=Xd([],{prepareTexture:e=>i.prepare(e),onSurfaceStatus:(e,t)=>{t===`loading`?a.add(e):a.delete(e)}}),s=of();o.scene.add(s.mesh,s.well,s.relief);let c=new zo(40,320/220,1e-5,5e3),l=new Q,u=Promise.resolve(),d=!1;function f(e){if(d)throw Error(`disposed`);if(performance.now()>=e)throw Error(`Thumbnail preparation timed out`)}async function p(e,n){f(n);let i=e.state.bodies,u={x:0,y:0,z:0};o.sync(i),o.setTheme(e.view.theme),new Ku(c,{target:l,minDistance:.001,maxDistance:1500,update:()=>(c.lookAt(l),c.updateMatrixWorld(),!0)}).frame(i);for(let e of i){let t=o.meshes.get(e.id);t.position.copy(Hu(e.positionM,u)),t.scale.setScalar(Kd(e.radiusM,c.position.distanceTo(t.position),40,220,e.id===`sun`?7:4)),o.requestSurface(e.id,8)}let p=Math.min(n,performance.now()+1500);for(;a.size&&performance.now()<p&&!d;)await new Promise(e=>setTimeout(e,Math.min(20,Math.max(0,p-performance.now()))));f(n),o.updateRotation(i,e.state.elapsedSeconds),o.updateBackdrop(c,i),s.setTheme(e.view.theme===`cosmos`),s.setMode(e.view.gravity),s.setRelief(e.view.shadows);let m=c.position.distanceTo(l)*Math.tan(Math.PI/9)*2.2;for(s.updateView(c.position,l,Qd(m,m)),s.update(i,u,l,m,Math.max(1,...i.map(e=>e.massKg)),performance.now(),new Map([...o.meshes].map(([e,t])=>[e,t.scale.x])));;){f(n);let e=ad(o.scene);if(await cd(t,o.scene,c,()=>!d,r,void 0,n),f(n),e===ad(o.scene))break}t.render(o.scene,c),f(n);let h=t.domElement.toDataURL(`image/jpeg`,.78);return f(n),h}return{capture(e){let t=performance.now()+sd,n=u.then(()=>p(e,t));return u=n.catch(()=>{}),n},dispose(){d||(d=!0,i.dispose(),s.dispose(),o.dispose(),t.dispose(),t.forceContextLoss(),n?.())}}}function cf(e,t){let n=null,r=-1/0,i=null;for(let a of t){if(a.id===e.id||((!i||a.massKg>i.massKg)&&(i=a),a.massKg<e.massKg))continue;let t=Math.hypot(a.positionM.x-e.positionM.x,a.positionM.y-e.positionM.y,a.positionM.z-e.positionM.z),o=Math.log(a.massKg)-3*Math.log(t);t>0&&Number.isFinite(o)&&o>r&&(n=a,r=o)}return n??i}function lf(e,t){if(t?.kind!==`star`)return null;let n=cf(t,e);return n?.kind===`star`&&cf(n,e)?.id===t.id?[t,n]:null}var uf={bodies:64,points:256,computeMs:8,wallMs:2e3,radiusRatio:32,perturbationRatio:.1},df={computeMs:32,refreshMs:1e3};function ff(e,t){let n=new Set,r=t.state.bodies.reduce((e,t)=>!e||t.massKg>e.massKg?t:e,null),i=lf(t.state.bodies,r),a=i?.map(e=>e.id);return!!e&&e.baseVersion===t.baseVersion&&e.startSeconds===t.state.elapsedSeconds&&e.rootId===(r?.id??null)&&e.requested===Math.max(0,t.state.bodies.length-1)+ +!!i&&[`complete`,`compute-limit`,`wall-limit`,`body-limit`,`invalid`].includes(e.stop)&&[e.computeMs,e.wallMs].every(e=>Number.isFinite(e)&&e>=0)&&Array.isArray(e.results)&&e.results.length<=Math.min(e.requested,uf.bodies)&&(e.stop!==`complete`||e.results.length===e.requested)&&e.results.every(r=>!r||r.bodyId===e.rootId&&!i||n.has(r.bodyId)||!t.state.bodies.some(e=>e.id===r.bodyId)||!t.state.bodies.some(e=>e.id===r.referenceId)||(a?.includes(r.bodyId)?r.frame!==`barycentric`||r.referenceId!==a.find(e=>e!==r.bodyId):r.frame!==void 0)?!1:(n.add(r.bodyId),pf(r,{...t,bodyId:r.bodyId,referenceId:r.referenceId})))&&(!i||e.results.filter(e=>e.frame===`barycentric`).length%2==0)}function pf(e,t){return!!e&&e.bodyId===t.bodyId&&e.referenceId===t.referenceId&&e.baseVersion===t.baseVersion&&e.startSeconds===t.state.elapsedSeconds&&[`complete`,`contact`,`extent-limit`,`compute-limit`,`wall-limit`,`body-limit`,`perturbed`,`invalid`].includes(e.stop)&&[null,`ellipse`,`open`,`radial`].includes(e.kind)&&(e.periodSeconds===null||Number.isFinite(e.periodSeconds)&&e.periodSeconds>0)&&(e.perturbationRatio===null||Number.isFinite(e.perturbationRatio)&&e.perturbationRatio>=0)&&Number.isFinite(e.computeMs)&&e.computeMs>=0&&Number.isFinite(e.wallMs)&&e.wallMs>=0&&Array.isArray(e.points)&&e.points.length<=uf.points&&e.points.every((t,n)=>t&&Number.isFinite(t.progress)&&t.progress>=0&&t.progress<=1&&(n===0||t.progress>e.points[n-1].progress)&&[t.positionM,t.referenceM].every(e=>e&&[e.x,e.y,e.z].every(Number.isFinite)))&&(![`invalid`,`perturbed`,`body-limit`,`compute-limit`,`wall-limit`].includes(e.stop)||e.points.length===0)}var mf=class{done;failed;create;type;valid;worker=null;serial=0;active=null;constructor(e,t,n,r,i){this.done=e,this.failed=t,this.create=n,this.type=r,this.valid=i}request(e){this.cancel();try{let t=this.worker??this.create();this.worker=t,t.onmessage=e=>{this.worker===t&&this.active&&(!e.data||!Number.isSafeInteger(e.data.id)?this.fault(t):e.data.id===this.active.id&&(this.valid(e.data.result,this.active.input)?(this.active=null,this.done(e.data.result)):this.fault(t)))},t.onerror=()=>this.fault(t);let n={id:++this.serial,input:{...e,state:B(e.state)}};this.active=n,t.postMessage({type:this.type,...n})}catch{this.fault(this.worker)}}fault(e){this.worker===e&&(this.worker?.terminate(),this.worker=null,this.active=null,this.failed())}cancel(){this.active=null,this.worker?.postMessage({type:`cancel`})}dispose(){this.active=null;let e=this.worker;this.worker=null,e?.terminate()}},hf=()=>new Worker(new URL(`/planet-simulator/assets/prediction.worker-CZ67X8vI.js`,``+import.meta.url),{type:`module`}),gf=class extends mf{constructor(e,t,n=hf){super(e,t,n,`predict`,pf)}},_f=class extends mf{constructor(e,t,n=hf){super(e,t,n,`predictScene`,ff)}},vf=class{changed;now;view={enabled:!1,phase:`off`,result:null};client;editor=null;context=``;version=-1;requestedVersion=-1;pending=!1;disposed=!1;lastRequest=-1/0;timer=null;constructor(e,t,n=()=>performance.now()){this.changed=e,this.now=n,this.client=new _f(e=>{this.pending=!1,this.view.result=e,this.view.phase=`ready`,this.changed(this.view),this.schedule()},()=>{this.pending=!1,this.view.result=null,this.view.phase=`failed`,this.changed(this.view)},t)}setEnabled(e){this.view.enabled=e,this.clear(e?`waiting`:`off`),this.editor&&this.update(this.editor)}update(e){if(this.editor=e,this.disposed||!this.view.enabled)return;let t=e.state;if(!t||e.busy||e.hasGesture||e.error||e.blocked||t.jump||t.localStep||t.physicsIssue){this.clear(`waiting`);return}let n=[e.generation,t.history?.revision,t.collisionContext?.revision,t.recoveryResult?.requestId,t.state.bodies.map(e=>e.id).join(`,`)].join(`|`);n!==this.context&&(this.clear(`waiting`),this.context=n),this.version=t.version,this.schedule()}schedule(){if(this.disposed||!this.view.enabled||this.pending||this.version===this.requestedVersion||!this.editor||this.view.phase===`waiting`&&!this.context||this.timer!==null)return;let e=Math.max(0,df.refreshMs-(this.now()-this.lastRequest));if(e>0){this.timer=setTimeout(()=>{this.timer=null,this.schedule()},e);return}let t=this.editor.state;t&&(this.pending=!0,this.lastRequest=this.now(),this.requestedVersion=t.version,this.view.phase=`computing`,this.changed(this.view),this.client.request({state:t.state,baseVersion:t.version}))}clear(e){this.timer!==null&&clearTimeout(this.timer),this.timer=null,this.pending&&this.client.cancel(),this.pending=!1,this.version=this.requestedVersion=-1,this.context=``,this.view.result=null,this.view.phase=e,this.changed(this.view)}dispose(){this.disposed=!0,this.clear(`off`),this.client.dispose()}},yf=class{changed;client;signature=``;lastSnapshot=null;context=``;editor=null;view={visible:!1,phase:`idle`,result:null,referenceName:``,enabled:!0,startSeconds:0};constructor(e,t){this.changed=e,this.client=new gf(e=>{this.view.enabled&&this.view.visible&&this.view.phase===`computing`&&(this.view.result=e,this.view.phase=`ready`,this.changed(this.view))},()=>{this.view.enabled&&this.view.phase===`computing`&&(this.view.result=null,this.view.phase=`failed`,this.changed(this.view))},t)}update(e){this.editor=e;let t=e.state,n=t!==this.lastSnapshot;this.lastSnapshot=t;let r=e.body,i=e.phase===`editing-new`,a=!!t&&!!r&&(i||[`viewing`,`editing-existing`].includes(e.phase)&&[`position`,`velocity`].includes(e.tool));this.view.visible=a;let s=[e.generation,e.phase,r?.id,e.tool,t?.collisionContext?.revision,t?.state.bodies.map(e=>e.id).join(`,`)].join(`|`);if(!a||!this.view.enabled){this.clear(`idle`),this.context=s;return}if(e.hasGesture){this.clear(`waiting`),this.context=s;return}if(e.error||t.jump||t.localStep||t.physicsIssue||e.blocked&&e.phase===`viewing`){this.clear(`invalid`),this.context=s;return}if(e.phase===`viewing`&&t.playing){this.clear(`pause`),this.context=s;return}if(i&&n&&s===this.context&&this.signature)return;this.context=s;let c=t.state.bodies,l=i?c.find(t=>t.id===e.creationReferenceId):cf(r,c);if(!l){this.clear(`invalid`);return}let u=B(t.state),d={state:{...u,bodies:i?[...u.bodies,r]:u.bodies.map(e=>e.id===r.id?r:e)},bodyId:r.id,referenceId:l.id,baseVersion:t.version},f=JSON.stringify([s,t.version,l.id,r.massKg,r.radiusM,r.collision,r.positionM,r.velocityMS]);f!==this.signature&&(this.signature=f,this.view.phase=`computing`,this.view.result=null,this.view.referenceId=l.materialId===`procedural`?void 0:l.id,this.view.referenceName=l.materialId===`procedural`?l.name:o(l.id),this.view.startSeconds=u.elapsedSeconds,this.changed(this.view),this.client.request(d))}clear(e){(this.view.phase===`computing`||this.signature||this.view.result)&&this.client.cancel(),this.signature=``,this.view.result=null,this.view.phase=e,this.changed(this.view)}setEnabled(e){this.view.enabled=e,this.refresh()}cancel(){this.client.cancel(),this.view.phase=`cancelled`,this.view.result=null,this.changed(this.view)}refresh(){this.clear(`idle`),this.context=``,this.editor&&this.update(this.editor)}dispose(){this.client.dispose()}};function bf(e){let t=document.createElement(`span`);t.className=`liquid-toggle`;let n=document.createElement(`span`);return n.className=`liquid-track`,n.setAttribute(`aria-hidden`,`true`),t.append(e,n),t}function xf(t,r){let i=document.createElement(`label`);i.className=`prediction-setting`;let o=document.createElement(`input`);return o.type=`checkbox`,o.checked=r.view.enabled,a(o,`aria-label`,()=>n(`prediction.show`)),i.append(bf(o),e(()=>n(`prediction.show`))),o.onchange=()=>r.setEnabled(o.checked),t.append(i),{dispose(){i.remove()}}}function Sf(e,t,i,a){let o=document.createElement(`button`);o.type=`button`,o.className=`interface-hide`,r(o,()=>n(`interface.hide`));let c=document.createElement(`button`);c.type=`button`,c.className=`interface-restore`,r(c,()=>n(`interface.restore`)),c.hidden=!0,s(c,`title`,()=>n(`interface.restoreHint`)),t.append(o),e.append(c);let l=!1,u=new Map;function d(t){if(!(t===l||t&&!i())){if(l=t,e.dataset.uiHidden=String(l),c.hidden=!l,l){for(let t of Array.from(e.children))t.classList.contains(`scene-host`)||t===c||t.classList.contains(`scene-status`)||(u.set(t,t.inert),t.inert=!0);a(!1),c.focus()}else{for(let[e,t]of u)e.inert=t;u.clear(),a(!0),o.focus()}}}return o.onclick=()=>{!l&&i()&&(d(!0),p(e,`toggle`))},c.onclick=()=>{l&&(d(!1),p(e,`toggle`))},{get hidden(){return l},restore(){d(!1)},update(){o.disabled=!i(),s(o,`title`,()=>n(o.disabled?`interface.busy`:`interface.hideHint`))},dispose(){l&&d(!1),o.remove(),c.remove(),delete e.dataset.uiHidden}}}function Cf(e,t,i){let o=document.createElement(`div`);o.className=`screenshot-preview-root`,o.hidden=!0;let s=document.createElement(`button`);s.type=`button`,s.className=`screenshot-thumb`,a(s,`aria-label`,()=>n(`camera.preview`));let c=document.createElement(`img`);c.alt=``,s.append(c);let l=document.createElement(`button`);l.type=`button`,l.className=`screenshot-thumb-close`,l.textContent=`×`,a(l,`aria-label`,()=>n(`camera.dismissPreview`));let u=document.createElement(`div`);u.className=`screenshot-lightbox`,u.hidden=!0,u.setAttribute(`role`,`dialog`),u.setAttribute(`aria-modal`,`true`),a(u,`aria-label`,()=>n(`camera.preview`));let d=document.createElement(`div`);d.className=`screenshot-backdrop`;let f=document.createElement(`img`);f.className=`screenshot-large`,f.alt=``;let p=document.createElement(`button`);p.type=`button`,p.className=`screenshot-preview-close`,p.textContent=`×`,a(p,`aria-label`,()=>n(`camera.closePreview`));let m=document.createElement(`a`);m.className=`screenshot-preview-download`,r(m,()=>n(`camera.downloadImage`)),u.append(d,f,p,m),o.append(s,l,u),e.append(o);let h=null,g=!1,_=0,v=null,y=null,b=1,x=1,S,C=()=>{window.clearTimeout(S),o.hidden=!0,h&&URL.revokeObjectURL(h),h=null,c.removeAttribute(`src`),f.removeAttribute(`src`)},w=()=>{u.hidden=!0,d.style.opacity=`1`,C(),t.focus()},T=()=>window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,E=()=>{let e=s.getBoundingClientRect();return{x:e.left,y:e.top,width:e.width,height:e.height}},D=()=>{let e=Math.min(innerWidth-40,(innerHeight-112)*b/x),t=e*x/b;return{x:(innerWidth-e)/2,y:(innerHeight-t)/2,width:e,height:t}},O=(e,t)=>`translate(${e.x-t.x}px,${e.y-t.y}px) scale(${e.width/t.width},${e.height/t.height})`;function k(e,n){let r=++_,i=D(),a=E(),m=v?getComputedStyle(f).transform:null,h=y?Number(getComputedStyle(d).opacity):null;v?.cancel(),y?.cancel(),v=y=null,Object.assign(f.style,{left:`${i.x}px`,top:`${i.y}px`,width:`${i.width}px`,height:`${i.height}px`});let g=m&&m!==`none`?m:e?O(a,i):`none`,b=e?`none`:O(a,i);if(!e&&(!s.isConnected||!a.width||!a.height)){if(n||T()){w();return}f.style.transform=g,d.style.opacity=`0`,v=f.animate([{opacity:1},{opacity:0}],{duration:160,easing:`ease-out`,fill:`both`}),y=d.animate([{opacity:h??1},{opacity:0}],{duration:160,easing:`ease-out`,fill:`both`});let e=v;e.finished.then(()=>{r===_&&(e.cancel(),y?.cancel(),v=y=null,w())}).catch(()=>{});return}if(n||T()||!s.isConnected||!a.width||!a.height){f.style.transform=e?`none`:b,d.style.opacity=`1`,u.hidden=!e,c.style.visibility=e?`hidden`:``,l.style.visibility=e?`hidden`:``,e?p.focus():(s.isConnected&&!o.hidden?s:t).focus();return}f.style.transform=b,v=f.animate([{transform:g},{transform:b}],{duration:e?220:160,easing:`cubic-bezier(.23,1,.32,1)`,fill:`both`});let x=h!==null&&Number.isFinite(h)?h:+!e;d.style.opacity=e?`1`:`0`,y=d.animate([{opacity:x},{opacity:+!!e}],{duration:e?220:160,easing:`cubic-bezier(.23,1,.32,1)`,fill:`both`});let S=v;S.finished.then(()=>{r===_&&(S.cancel(),v=null,y?.cancel(),y=null,!e&&s.hidden?w():e?p.focus():(u.hidden=!0,d.style.opacity=`1`,c.style.visibility=``,l.style.visibility=``,s.focus()))}).catch(()=>{})}function A(e){h&&!g&&(g=!0,u.hidden=!1,c.style.visibility=`hidden`,l.style.visibility=`hidden`,p.focus(),k(!0,e.detail===0),i?.open())}function j(e=!1){if(!g&&(!e||u.hidden))return;let t=g;g=!1,k(!1,e),t&&i?.close()}let M=e=>{u.hidden||(e.key===`Escape`?(e.preventDefault(),e.stopImmediatePropagation(),j(!0)):e.key===`Tab`&&(e.shiftKey&&document.activeElement===p?(e.preventDefault(),m.focus()):!e.shiftKey&&document.activeElement===m&&(e.preventDefault(),p.focus())))};return window.addEventListener(`keydown`,M,!0),s.onclick=A,p.onclick=d.onclick=e=>j(e.detail===0),m.onclick=()=>i?.download(),l.onclick=()=>{g||(C(),t.focus(),i?.close())},{set(e,n){let r=URL.createObjectURL(e),i=h;h=r,window.clearTimeout(S),s.hidden=!1,l.hidden=!1,s.disabled=!0,c.onload=()=>{b=c.naturalWidth||1,x=c.naturalHeight||1,s.disabled=!1},c.src=f.src=m.href=r,m.download=n,o.hidden=!1,i&&URL.revokeObjectURL(i),S=window.setTimeout(()=>{if(s.hidden=!0,l.hidden=!0,u.hidden){let e=document.activeElement===s||document.activeElement===l;C(),e&&t.focus()}},3e3)},get url(){return h},dispose(){_++,v?.cancel(),y?.cancel(),window.clearTimeout(S),window.removeEventListener(`keydown`,M,!0),h&&URL.revokeObjectURL(h),o.remove()}}}function wf(e,t,i){let a=document.createElement(`div`);a.className=`scene-screenshot`;let o=document.createElement(`button`);o.type=`button`,nd(o,()=>n(`camera.screenshot`),`screenshot`,`custom`);let s=document.createElement(`p`);s.className=`scene-screenshot-error`,s.setAttribute(`role`,`status`),s.hidden=!0,r(s,()=>n(`camera.screenshotFailed`)),a.append(o,s),e.append(a);let c=Cf(e,o,{open:()=>i?.prepare(`bloom`)(),close:()=>p(e,`droplet`),download:()=>p(e,`success`)}),l=!1,u=!1,d;return o.onclick=async()=>{if(u)return;u=!0,o.setAttribute(`aria-busy`,`true`),s.hidden=!0,window.clearTimeout(d);let e=i?.prepare(`success`),n=i?.prepare(`error`);try{let n=await t();if(l)return;let r=`planet-simulator-${new Date().toISOString().replace(/[:.]/g,`-`)}.png`;c.set(n,r);let i=document.createElement(`a`);i.href=c.url,i.download=r,i.click(),e?.()}catch{l||(s.hidden=!1,n?.(),d=window.setTimeout(()=>{s.hidden=!0},4e3))}finally{u=!1,o.setAttribute(`aria-busy`,`false`)}},{dispose(){l=!0,window.clearTimeout(d),c.dispose(),a.remove()}}}var Tf=1.6,Ef=.018,Df=(e,t,n,r={})=>({kind:`tone`,waveform:`sine`,frequency:e*Tf,glideTo:e,glideTime:Ef,attack:.001,decay:t,peak:n,...r}),Of=[[1,1],[2.76,.3],[5.4,.1]],kf=[[1,1],[3.99,.2]],Af=5e3,jf=.003,Mf=.028,Nf=.75;function Pf(e,t,n,r,{from:i}={}){return r.filter(([t])=>e*t<=Af).map(([r,a],o)=>{let s=o===0?i:i??`normal`;return{kind:`tone`,waveform:`sine`,frequency:e*r,attack:jf,decay:Math.max(Mf,t/r**Nf),peak:n*a,...s?{from:s}:{}}})}var Ff=(e,t,n={})=>({kind:`noise`,filterType:`lowpass`,filterFrequency:e,filterQ:-3,attack:.001,decay:.0035,peak:t,...n}),If=(e,t,n={})=>({kind:`noise`,filterType:`bandpass`,filterFrequency:e,filterQ:8,attack:.001,decay:.0055,peak:t,...n}),Lf=.675,Rf=(e,t,n={})=>[If(e,t,n),If(e*Lf,t*.5,{filterQ:2,...n})],zf=(e,t,n,r,i={})=>({kind:`noise`,filterType:`bandpass`,filterFrequency:e,glideTo:t,glideTime:n,filterQ:1.5,attack:.008,decay:n,peak:r,...i}),Bf=(e,t,n,r={})=>({kind:`noise`,filterType:`lowpass`,filterFrequency:e,filterQ:.7,attack:.001,decay:t,peak:n,...r}),Vf=[[1,1,1],[2,.9,.5],[3,1,.04],[4,.73,.056]],Hf=1.09,Uf=.015,Wf=.11;function Gf(e,t,n,{from:r}={}){let i=Math.min(Wf,t/2);return Vf.map(([a,o,s],c)=>{let l=c<2?r:r??`normal`;return{note:!0,kind:`tone`,waveform:`sine`,frequency:e*a*Hf,glideTo:e*a,glideTime:Uf,attack:i,decay:t*o,peak:n*s,...l?{from:l}:{}}})}var Kf=(e,t,n,r,i,a={})=>({kind:`tone`,waveform:`sine`,frequency:e,glideTo:t,glideTime:n,attack:.002,decay:r,peak:i,...a}),qf=(e,t,n,r={})=>Kf(e,e*1.5,.04,t,n,r),Jf=(e,t,n,r={})=>Kf(e,e*1.5,.012,t,n,{attack:.001,...r}),Yf=(e,t,n={})=>({kind:`noise`,filterType:`lowpass`,filterFrequency:e,filterQ:.9,attack:.001,decay:.0032,peak:t,...n}),Xf={pitch:.06,level:.1},Zf={pitch:0,level:.08},Qf={tap:{masterGain:.411,layers:[Df(300,.0216,.06),qf(600,.0489,.014,{attack:.012}),Df(600,.0165,.015,{from:`normal`}),Df(150,.0389,.05,{from:`strong`})],vary:{pitch:.08,level:.1}},type:{masterGain:.383,layers:[Df(415,.0151,.06),Yf(2500,.03,{from:`normal`}),Df(208,.0278,.05,{from:`strong`})],vary:{pitch:.1,level:.2}},select:{masterGain:.214,layers:[Jf(700,.0278,.05),Yf(3e3,.075,{from:`normal`}),qf(350,.0606,.03,{from:`strong`})],vary:{pitch:.03,level:.1}},toggle:{masterGain:.175,layers:[{kind:`noise`,filterType:`lowpass`,filterFrequency:900,filterQ:.9,attack:.001,decay:.00779,peak:.12},Kf(330,660,.06,.0791,.045,{attack:.003}),Kf(990,1485,.02,.045,.01,{from:`normal`,attack:.03}),Kf(165,330,.06,.0969,.03,{from:`strong`})],vary:{pitch:.04,level:.1}},open:{masterGain:.221,layers:[Kf(220,520,.14,.0692,.04,{attack:.1}),Kf(330,780,.14,.0866,.012,{from:`normal`,attack:.1}),Kf(110,260,.14,.0969,.03,{from:`strong`,attack:.1})],vary:Xf},close:{masterGain:.357,layers:[Kf(700,220,.07,.0905,.045,{attack:.004}),Yf(1200,.06,{from:`normal`}),Kf(350,110,.07,.121,.03,{from:`strong`,attack:.004})],vary:Xf},success:{masterGain:.52,layers:[Kf(523.25,783.99,.08,.323,.04,{attack:.003}),Kf(1046.5,1567.98,.08,.12,.01,{from:`normal`,attack:.003}),Kf(261.63,392,.08,.391,.02,{from:`strong`,attack:.003})],room:2,vary:Zf},error:{masterGain:.387,layers:[Kf(349.23,261.63,.14,.226,.045,{attack:.004}),Yf(900,.12,{from:`normal`}),Df(147,.0556,.05,{from:`strong`})],vary:Zf},navigate:{masterGain:.554,layers:[Kf(300,1500,.09,.0943,.035,{attack:.01}),{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1500,glideTo:3e3,glideTime:.09,filterQ:1,attack:.02,decay:.0778,peak:.05},Kf(150,600,.1,.125,.025,{from:`strong`,attack:.01})],vary:Xf},warning:{masterGain:.436,layers:[Kf(500,440,.05,.181,.045),Yf(1800,.09,{from:`normal`}),{from:`strong`,kind:`tone`,waveform:`sine`,frequency:220,attack:.003,decay:.225,peak:.025}],vary:Zf},loading:{masterGain:.194,layers:[{kind:`noise`,filterType:`lowpass`,filterFrequency:900,filterQ:.7,attack:.35,decay:.727,peak:.03},Kf(400,600,.35,.953,.016,{attack:.35}),{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1800,filterQ:1.5,attack:.35,decay:.749,peak:.004},{from:`strong`,kind:`noise`,filterType:`lowpass`,filterFrequency:400,filterQ:.7,attack:.35,decay:.807,peak:.04}],vary:Zf},ready:{masterGain:.532,layers:[Kf(1400,700,.012,.0242,.03,{attack:.001}),Kf(392,587.33,.06,.288,.04,{attack:.012}),Yf(2e3,.03,{from:`normal`}),Kf(196,294,.08,.391,.02,{from:`strong`,attack:.012})],room:2,vary:Zf},attention:{masterGain:.666,layers:[Kf(659.25,880,.14,.295,.035,{attack:.003}),Yf(2200,.12,{from:`normal`}),qf(329.63,.261,.02,{from:`strong`})],vary:Zf},count:{masterGain:.267,layers:[{stretch:!0,kind:`noise`,filterType:`lowpass`,filterFrequency:900,glideTo:1800,glideTime:.6,filterQ:.7,attack:.15,decay:.634,peak:.04},{...Kf(587.33,880,.6,.717,.02,{attack:.15}),stretch:!0},Yf(1600,.05,{from:`normal`}),{...Kf(293.66,440,.6,.717,.02,{attack:.15,from:`strong`}),stretch:!0}],vary:Xf}},$f={tap:{masterGain:.964,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:2650,filterQ:1.5,attack:.001,decay:.00413,peak:.08},Df(455,.0156,.02),{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:4600,filterQ:2,attack:.001,decay:.00222,peak:.05},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:215,filterQ:2,attack:.001,decay:.0216,peak:.3}],vary:{pitch:.02,level:.1}},type:{masterGain:.484,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:3e3,filterQ:1.2,attack:.001,decay:.003,peak:.1},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:2150,filterQ:5,attack:.001,decay:.00737,peak:.18},{kind:`noise`,filterType:`bandpass`,filterFrequency:750,filterQ:3,attack:.001,decay:.00898,peak:.22},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:330,filterQ:2.5,attack:.001,decay:.0173,peak:.3}],vary:{pitch:.05,level:.15}},select:{masterGain:.295,layers:[{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:3650,filterQ:3,attack:.001,decay:.00273,peak:.2},{kind:`noise`,filterType:`bandpass`,filterFrequency:1500,filterQ:8,attack:.001,decay:.00762,peak:.35},{kind:`tone`,waveform:`sine`,frequency:1480,attack:.001,decay:.0433,peak:.012},Df(250,.0188,.025,{from:`strong`})]},toggle:{masterGain:.293,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:1650,filterQ:2,attack:.001,decay:.00381,peak:.14},Df(330,.0288,.04),{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:2650,filterQ:3,attack:.001,decay:.00553,peak:.18},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:250,filterQ:2,attack:.001,decay:.0259,peak:.3}]},open:{masterGain:.869,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:2150,filterQ:3,attack:.001,decay:.00375,peak:.16},{kind:`noise`,filterType:`bandpass`,filterFrequency:1160,glideTo:2150,glideTime:.05,filterQ:2,attack:.02,decay:.031,peak:.08},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1330,filterQ:5,attack:.001,decay:.00763,peak:.14},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:290,filterQ:2,attack:.001,decay:.0265,peak:.25}]},close:{masterGain:.96,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:2150,glideTo:1080,glideTime:.04,filterQ:2,attack:.015,decay:.0288,peak:.04},{kind:`noise`,filterType:`bandpass`,filterFrequency:1e3,filterQ:4,attack:.001,decay:.00898,peak:.22},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:3300,filterQ:2,attack:.001,decay:.003,peak:.1},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:180,filterQ:2,attack:.001,decay:.0302,peak:.3}]},success:{masterGain:.662,layers:[Ff(2200,.05),...Pf(698.46,.121,.03,Of),...Pf(1046.5,.149,.026,Of),...Pf(1760,.106,.018,Of),{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:4150,filterQ:2,attack:.001,decay:.00324,peak:.06}]},error:{masterGain:.59,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:430,filterQ:4,attack:.001,decay:.0173,peak:.3},...Pf(293.66,.0678,.045,Of),...Pf(698.46,.0522,.02,Of),{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1830,filterQ:3,attack:.001,decay:.006,peak:.1},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:150,filterQ:2,attack:.001,decay:.0345,peak:.3}]},navigate:{masterGain:.804,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:750,glideTo:1400,glideTime:.13,filterQ:1.8,attack:.05,decay:.096,peak:.1},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:2500,filterQ:4,attack:.001,decay:.003,peak:.1},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:250,filterQ:1.5,attack:.04,decay:.109,peak:.12}]},warning:{masterGain:.484,layers:[Ff(2e3,.05),...Pf(587.33,.0922,.04,Of),...Pf(880,.0969,.03,Of),{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:300,filterQ:2,attack:.001,decay:.0265,peak:.25}]},loading:{masterGain:.223,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:500,filterQ:1,attack:.35,decay:.848,peak:.03},{kind:`tone`,waveform:`sine`,frequency:233.08,attack:.35,decay:.965,peak:.015},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1e3,filterQ:2,attack:.35,decay:.883,peak:.005},{from:`strong`,kind:`noise`,filterType:`lowpass`,filterFrequency:250,filterQ:.7,attack:.35,decay:.807,peak:.04}]},ready:{masterGain:.546,layers:[Ff(2e3,.05),...Pf(523.25,.178,.05,Of),...Pf(261.63,.242,.03,Of,{from:`strong`})]},attention:{masterGain:.481,layers:[Ff(2500,.04),...Pf(880,.231,.04,Of),...Pf(1318.51,.242,.03,Of),{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:300,filterQ:2,attack:.001,decay:.0265,peak:.25}]},count:{masterGain:.654,layers:[{stretch:!0,kind:`noise`,filterType:`bandpass`,filterFrequency:500,glideTo:900,glideTime:.6,filterQ:2,attack:.1,decay:.648,peak:.06},{stretch:!0,from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1900,glideTo:3300,glideTime:.6,filterQ:4,attack:.1,decay:.606,peak:.03},{stretch:!0,from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:220,filterQ:2,attack:.1,decay:.5,peak:.1}],vary:{pitch:.03,level:.1}}},ep=65.41,tp=82.41,np=110,rp=196,ip=220,ap=261.63,op=329.63,sp=392,cp=440,lp=523.25,up=659.25,dp=880,fp=4e3,pp=4800,mp=[0,4,9],hp={pitch:0,level:.08},gp={tap:{masterGain:.0431,layers:[...Rf(fp,.53),...Gf(ep,1.36,.12),Bf(200,.0472,.15,{from:`strong`})],release:Rf(pp,.28,{from:`normal`}),walk:mp,vary:hp},type:{masterGain:.297,layers:[...Rf(4200,.25),Df(305,.0288,.04),Df(150,.0424,.03,{from:`strong`})],release:[If(4100,.08,{from:`normal`}),If(1e3,.06,{filterQ:2,from:`normal`}),Df(414,.0216,.012,{from:`normal`})],vary:{pitch:.08,level:.15}},select:{masterGain:.442,layers:[...Rf(pp,.12),Df(700,.0196,.02),Df(350,.0326,.02,{from:`strong`})],release:[If(pp,.03,{from:`normal`})],vary:{pitch:.02,level:.1}},toggle:{masterGain:.0571,layers:[...Rf(fp,.245),Df(330,.0389,.05),...Gf(tp,.324,.06),Df(165,.05,.05,{from:`strong`})],release:Rf(pp,.1,{from:`normal`}),vary:hp},open:{masterGain:.0857,layers:[...Rf(pp,.15),Df(440,.0363,.03),zf(1600,3200,.035,.1),...Gf(np,.827,.08),Bf(260,.039,.12,{from:`strong`})],release:[If(pp,.05,{from:`normal`})],walk:mp,vary:hp},close:{masterGain:.099,layers:[...Rf(3200,.204),Df(130.81,.0432,.06),zf(1800,700,.04,.1,{from:`normal`}),...Gf(ep,.258,.08),Bf(180,.0364,.2,{from:`strong`})],vary:hp},success:{masterGain:.102,layers:[...Gf(ap,1.47,.072),...Gf(sp,1.51,.06),...Gf(up,1.36,.045),...Gf(ap/2,1.64,.036,{from:`strong`})],room:2},error:{masterGain:.0708,layers:[...Gf(np,.487,.12),...Gf(lp,.461,.04),Bf(200,.0545,.2,{attack:.01}),Bf(120,.0727,.2,{from:`strong`})]},navigate:{masterGain:.837,layers:[...Rf(pp,.15),zf(600,1400,.0877,.12,{filterQ:1}),Df(587.33,.0207,.015,{from:`normal`}),Bf(300,.0487,.12,{from:`strong`})],vary:hp},warning:{masterGain:.0716,layers:[...Gf(ip,.905,.096),...Gf(op,.84,.072),...Gf(ip/2,1.01,.048,{from:`strong`})]},loading:{masterGain:.0661,layers:[{kind:`tone`,waveform:`sine`,frequency:rp,attack:.35,decay:.889,peak:.05},{from:`normal`,kind:`tone`,waveform:`sine`,frequency:392,attack:.35,decay:.9,peak:.01},{from:`strong`,kind:`tone`,waveform:`sine`,frequency:rp/2,attack:.35,decay:.969,peak:.03}]},ready:{masterGain:.0983,layers:[...Gf(rp,1.78,.108),...Gf(rp/2,1.98,.054,{from:`strong`})],room:2},attention:{masterGain:.125,layers:[...Gf(cp,2.34,.067),...Gf(up,2.24,.048),...Gf(dp,1.89,.024),...Gf(cp/2,2.61,.034,{from:`strong`})]},count:{masterGain:.362,layers:[{stretch:!0,kind:`noise`,filterType:`bandpass`,filterFrequency:900,glideTo:1800,glideTime:.6,filterQ:2,attack:.15,decay:.568,peak:.08},{stretch:!0,kind:`noise`,filterType:`lowpass`,filterFrequency:200,glideTo:500,glideTime:.6,filterQ:.7,attack:.15,decay:.594,peak:.06},{stretch:!0,from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:2600,glideTo:3600,glideTime:.6,filterQ:4,attack:.15,decay:.587,peak:.02},{stretch:!0,from:`strong`,kind:`noise`,filterType:`lowpass`,filterFrequency:150,glideTo:300,glideTime:.6,filterQ:.7,attack:.15,decay:.568,peak:.08}],vary:{pitch:.02,level:.1}}},_p={tap:{masterGain:.39,layers:[{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:4500,filterQ:1.2,attack:.001,decay:.00242,peak:.03},{kind:`tone`,waveform:`sine`,frequency:1174.66,attack:.001,decay:.18,peak:.0135},{kind:`tone`,waveform:`sine`,frequency:1180,attack:.001,decay:.164,peak:.008},{kind:`tone`,waveform:`sine`,frequency:3242,attack:.001,decay:.0827,peak:.0055},Df(300,.0261,.02,{from:`normal`}),{from:`strong`,kind:`tone`,waveform:`sine`,frequency:587.33,attack:.002,decay:.246,peak:.009},Df(150,.0489,.014,{from:`strong`})],vary:{pitch:.012,level:.12}},type:{masterGain:.375,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:3900,filterQ:.8,attack:.001,decay:.00517,peak:.08},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:1550,filterQ:3.5,attack:.001,decay:.0144,peak:.22},{kind:`noise`,filterType:`bandpass`,filterFrequency:310,filterQ:2.5,attack:.002,decay:.0254,peak:.35},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:140,filterQ:2,attack:.002,decay:.037,peak:.45}],vary:{pitch:.07,level:.2}},select:{masterGain:.306,layers:[{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:2800,filterQ:2.2,attack:.001,decay:.00749,peak:.16},Df(415,.0194,.03),Df(208,.0313,.025,{from:`strong`})]},toggle:{masterGain:.24,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:1830,filterQ:1.6,attack:.001,decay:.0156,peak:.12},Df(330,.0339,.045),{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:3150,filterQ:1.6,attack:.001,decay:.0124,peak:.08},Df(165,.0375,.025,{from:`strong`})]},open:{masterGain:.335,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:600,glideTo:1500,glideTime:.1,filterQ:1.4,attack:.05,decay:.0558,peak:.168},{kind:`tone`,waveform:`sine`,frequency:659.25,attack:.05,decay:.165,peak:.015},{from:`normal`,kind:`tone`,waveform:`sine`,frequency:1318.51,attack:.05,decay:.0883,peak:.005},{from:`strong`,kind:`noise`,filterType:`lowpass`,filterFrequency:250,filterQ:.7,attack:.04,decay:.0779,peak:.12}]},close:{masterGain:.258,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:1400,glideTo:540,glideTime:.07,filterQ:1.4,attack:.02,decay:.054,peak:.216},{kind:`tone`,waveform:`sine`,frequency:261.63,attack:.003,decay:.104,peak:.02},{from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:350,filterQ:2,attack:.001,decay:.0273,peak:.2},{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:165,filterQ:2,attack:.001,decay:.0345,peak:.3}]},success:{masterGain:.566,layers:[Ff(1500,.04),...Pf(523.25,.333,.022,kf),...Pf(783.99,.391,.02,kf),...Pf(1318.51,.335,.014,kf),...Pf(261.63,.469,.02,kf,{from:`strong`})],room:2},error:{masterGain:.501,layers:[Ff(900,.05),...Pf(293.66,.138,.04,kf),...Pf(698.46,.106,.018,kf),{from:`strong`,kind:`noise`,filterType:`bandpass`,filterFrequency:250,filterQ:1.5,attack:.001,decay:.0273,peak:.2}]},navigate:{masterGain:.322,layers:[{kind:`noise`,filterType:`bandpass`,filterFrequency:400,glideTo:1100,glideTime:.21,filterQ:1.2,attack:.12,decay:.111,peak:.18},{from:`normal`,kind:`noise`,filterType:`lowpass`,filterFrequency:540,filterQ:.7,attack:.09,decay:.109,peak:.045},{from:`strong`,kind:`noise`,filterType:`lowpass`,filterFrequency:230,filterQ:.7,attack:.1,decay:.144,peak:.1}]},warning:{masterGain:.437,layers:[Ff(1200,.04),...Pf(440,.163,.038,kf),...Pf(659.25,.145,.03,kf),...Pf(220,.261,.02,kf,{from:`strong`})]},loading:{masterGain:.106,layers:[{kind:`tone`,waveform:`sine`,frequency:196,attack:.35,decay:.969,peak:.03},{kind:`tone`,waveform:`sine`,frequency:392,attack:.35,decay:.9,peak:.01},{from:`normal`,kind:`noise`,filterType:`lowpass`,filterFrequency:500,filterQ:.7,attack:.35,decay:.844,peak:.006},{from:`strong`,kind:`tone`,waveform:`sine`,frequency:98,attack:.35,decay:1.04,peak:.02}]},ready:{masterGain:.467,layers:[Ff(1500,.02),...Pf(392,.497,.026,Of),{kind:`tone`,waveform:`sine`,frequency:393.2,attack:.003,decay:.462,peak:.012},...Pf(196,.612,.016,Of,{from:`strong`})],room:2},attention:{masterGain:.551,layers:[Ff(2500,.02),...Pf(880,.599,.018,Of),{kind:`tone`,waveform:`sine`,frequency:882,attack:.003,decay:.57,peak:.01},...Pf(1318.51,.559,.014,Of),...Pf(440,.649,.012,Of,{from:`strong`})]},count:{masterGain:.336,layers:[{stretch:!0,kind:`noise`,filterType:`bandpass`,filterFrequency:700,glideTo:1400,glideTime:.6,filterQ:1.2,attack:.15,decay:.611,peak:.05},{stretch:!0,kind:`tone`,waveform:`sine`,frequency:1046.5,attack:.15,decay:.721,peak:.012},{stretch:!0,from:`normal`,kind:`noise`,filterType:`bandpass`,filterFrequency:2e3,glideTo:3200,glideTime:.6,filterQ:2,attack:.15,decay:.652,peak:.02},{stretch:!0,from:`strong`,kind:`tone`,waveform:`sine`,frequency:261.63,attack:.15,decay:.758,peak:.015}],vary:{pitch:.02,level:.12}}};Object.keys(_p);var vp={chime:`success`,sparkle:`success`,droplet:`close`,bloom:`open`,whisper:`select`,tick:`select`,press:`tap`,release:`tap`,page:`navigate`,pulse:`tap`,scan:`select`,arrival:`navigate`},yp=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);function bp(e){return typeof e==`string`?yp(_p,e)?e:yp(vp,e)?vp[e]:null:null}var xp={default:_p,mech:$f,bubble:Qf,press:gp};Object.keys(xp);function Sp(e){return typeof e==`string`&&Object.prototype.hasOwnProperty.call(xp,e)}var Cp={pitch:1,level:1,length:1,bright:1,tail:1,sweep:1,time:1},wp=2500,Tp={subtle:{level:.8,length:.85,bright:.75},normal:{},strong:{pitch:.98,level:1.08,length:1.2,bright:1.1}},Ep={subtle:0,normal:1,strong:2},Dp={printable:{},space:{pitch:.86,level:1.08,length:1.15},delete:{pitch:.92,level:.9,bright:.8},enter:{pitch:.8,level:1.12,length:1.25}},Op={mouse:{},touch:{pitch:.97,level:.92,bright:.45},pen:{pitch:1.02,bright:1.3},keyboard:{pitch:.94,length:.85,bright:.7}},kp=.05,Ap=220,jp=new Set([`type`,`select`,`tap`,`toggle`,`navigate`]),Mp=800,Np=300,Pp=2e3,Fp=new Set([`navigate`,`toggle`,`count`]);function Ip(e,t){return e.filter(e=>Ep[t]>=Ep[e.from??`subtle`])}var Lp=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);function Rp(e){return typeof e==`string`&&Lp(Tp,e)?e:`normal`}var zp=(e,t,n)=>Math.min(n,Math.max(t,e)),Bp={forward:1,back:-1};function Vp(e){let t={};if(!e)return t;let{direction:n,key:r,input:i,duration:a}=e;return typeof n==`string`&&Lp(Bp,n)&&(t.direction=Bp[n]),typeof r==`string`&&Lp(Dp,r)&&(t.key=r),typeof i==`string`&&Lp(Op,i)&&(t.input=i),typeof a==`number`&&Number.isFinite(a)&&(t.duration=zp(a,Np,Pp)),t}function Hp(e){let t=Math.min(1,Math.max(0,(Ap-e)/150));return{level:1-.22*t,length:1-.25*t,bright:1-.2*t,tail:1-.8*t}}function Up(e,t,n,r){let i=[Tp[n]];jp.has(e)&&i.push(Hp(r)),e===`type`&&t.key&&i.push(Dp[t.key]),e===`tap`&&t.input&&i.push(Op[t.input]),e===`select`&&t.direction&&i.push({pitch:1+kp*t.direction}),e===`count`&&t.duration&&i.push({time:t.duration/Mp}),Fp.has(e)&&t.direction===-1&&i.push({sweep:-1});let a={...Cp};for(let e of i)for(let t of Object.keys(e))a[t]*=e[t];return a}function Wp(e,t){let n=e.kind===`tone`?e.frequency:e.filterFrequency,r=t.level*(n>=wp?t.bright:1)*((e.offset??0)>0?t.tail:1);return{pitch:zp(t.pitch,.75,1.25),gain:zp(r,0,1.5),length:zp(t.length,.6,1.6)}}var Gp=5.8,Kp=.7,qp=1025,Jp=.015;function Yp(e,t){let n=e.currentTime;for(let{gain:e}of t.live)e.cancelScheduledValues(n),e.setValueAtTime(e.value,n),e.linearRampToValueAtTime(0,n+Jp);t.live.clear()}var Xp=1;function Zp(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/2**32}}function Qp(e){let t=Zp(Xp);for(let n=0;n<e.length;n++)e[n]=2*t()-1}function $p(e,t){if(t.noise)return t.noise;let n=Math.max(1,Math.floor(2*e.sampleRate));return t.noise=e.createBuffer(1,n,e.sampleRate),Qp(t.noise.getChannelData(0)),t.noise}var em=.25,tm=3500,nm=.08,rm=[3110,5639],im=48e3;function am(e,t,n){let r=Zp(n),i=3*Math.LN10,a=new Float32Array(Math.floor(em*im)),o=0;for(let e=0;e<a.length;e++){let t=e/im;a[e]=t<.008?0:(2*r()-1)*Math.exp(-i*t/em),o+=a[e]*a[e]}let s=1/Math.sqrt(o);for(let n=0;n<a.length;n++){let r=n/im*t,i=Math.floor(r),o=r-i;i<e.length&&(e[i]+=a[n]*s*(1-o)),i+1<e.length&&(e[i+1]+=a[n]*s*o)}}function om(e,t){let n=e.sampleRate,r=Math.max(1,Math.floor(em*n)),i=e.createBuffer(2,r,n);rm.forEach((e,t)=>am(i.getChannelData(t),n,e));let a=e.createConvolver();a.normalize=!1,a.buffer=i;let o=e.createBiquadFilter();return o.type=`lowpass`,o.frequency.value=tm,o.Q.value=-3,o.connect(a).connect(t),o}function sm(e){let t=Math.abs(e)-Kp;return t<=0?e:Math.sign(e)*(Kp+t-t*t/.6000000000000001)}function cm(e){let t=e.createGain();t.gain.value=Gp;let n=e.createWaveShaper();n.curve=Float32Array.from({length:qp},(e,t)=>sm(2*t/1024-1));let r=e.createBiquadFilter();return r.type=`highpass`,r.frequency.value=40,r.Q.value=-3,t.connect(r).connect(n).connect(e.destination),{output:t,room:om(e,t),noise:null,live:new Set}}var lm=.05,um=60,dm=e=>e/(um/20*Math.LN10),fm=.05;function pm(e,t,n,r){e.setValueAtTime(t,r),n.glideTo!==void 0&&e.exponentialRampToValueAtTime(n.glideTo,r+(n.glideTime??n.attack+n.decay))}function mm(e,t,n){e.setValueAtTime(0,n),e.linearRampToValueAtTime(t.peak,n+t.attack),e.setTargetAtTime(0,n+t.attack,dm(t.decay))}function hm(e,t,n,r){let i=e.createOscillator();i.type=n.waveform,pm(i.frequency,n.frequency,n,r),n.detune&&(i.detune.value=n.detune);let a=e.createGain();mm(a.gain,n,r),i.connect(a).connect(t),i.start(r),i.stop(r+n.attack+n.decay+lm)}function gm(e,t,n,r,i){let a=r.attack+r.decay+lm,o=e.createBufferSource();o.buffer=$p(e,t),o.loop=!0;let s=e.createBiquadFilter();s.type=r.filterType,pm(s.frequency,r.filterFrequency,r,i),r.filterQ!==void 0&&(s.Q.value=r.filterQ);let c=e.createGain();mm(c.gain,r,i),o.connect(s).connect(c).connect(n),o.start(i,Math.random()*2),o.stop(i+a)}function _m(e){return Math.max(...e.map(e=>(e.offset??0)+e.attack+e.decay+lm))}var vm=e=>1+(Math.random()*2-1)*e,ym={pitch:1,force:1},bm=.1,xm=.005,Sm=.08,Cm=.4,wm=.09;function Tm(e,t,n,r,i){let a=Wp(e,t),o=e.kind===`tone`?r?vm(xm):1:n.force,s=a.pitch*n.pitch*o*(e.note?i:1),c=e.peak*a.gain*n.force,l=e.stretch?t.time:1,u=e.decay*a.length*l*(r?vm(bm):1),d=e.kind===`tone`?e.frequency:e.filterFrequency,[f,p]=t.sweep<0&&e.glideTo!==void 0?[e.glideTo,d]:[d,e.glideTo],m=p===void 0?void 0:p*s,h={offset:(e.offset??0)*t.time,attack:e.attack*l,glideTime:e.glideTime===void 0?void 0:e.glideTime*l};return e.kind===`tone`?{...e,...h,frequency:f*s,glideTo:m,peak:c,decay:u}:{...e,...h,filterFrequency:f*s,glideTo:m,peak:c,decay:u}}function Em({recipe:e,emphasis:t,shape:n,step:r},i){let a=[];i!==`release`&&a.push([e.layers,0]),i!==`press`&&e.release&&a.push([e.release,i===`both`?wm:0]);let o=2**((e.walk?.[r]??0)/12),{vary:s}=e,c=s?{pitch:vm(s.pitch),force:vm(s.level)}:ym;return a.flatMap(([e,r])=>Ip(e,t).map(e=>{let t=Tm(e,n,c,s,o);return{...t,offset:(t.offset??0)+r}}))}function Dm(e,t,n,r,i,a){let{recipe:o,volume:s}=i,c=Em(i,a);if(c.length===0)return;let l=e.currentTime,u=t(),{output:d,room:f}=u,p=e.createGain();p.gain.value=o.masterGain*s,p.connect(d);let m=e.createGain();if(m.gain.value=nm*(o.room??1),p.connect(m).connect(f),u.live.add(p),a!==`release`){let e=n.get(r);e&&(e.gain.gain.setValueAtTime(e.gain.gain.value,l),e.gain.gain.exponentialRampToValueAtTime(1e-4,l+e.fade));let t=o.layers.some(e=>e.note)?Cm:Sm;n.set(r,{gain:p,fade:t})}for(let t of c){let n=l+(t.offset??0);t.kind===`tone`?hm(e,p,t,n):gm(e,u,p,t,n)}let h=(_m(c)+fm)*1e3;setTimeout(()=>{n.get(r)?.gain===p&&n.delete(r),u.live.delete(p),p.disconnect(),m.disconnect()},h)}var Om=1e3,km=null,Am=null,jm=new Map,Mm=!0,Nm=1,Pm=`default`;function Fm(e,t){return typeof e==`number`&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t}function Im(e){typeof e==`boolean`&&(Mm=e,!e&&(Um.clear(),jm.clear(),km&&Am&&Yp(km,Am)))}function Lm(e){Nm=Fm(e,Nm)}function Rm(){return typeof navigator<`u`&&navigator.userActivation?.hasBeenActive===!1}function zm(){let e=Rm()?null:Bm();if(!e)return Promise.resolve(!1);if(e.state===`running`)return Promise.resolve(!0);try{return e.resume().then(()=>e.state===`running`,()=>!1)}catch{return Promise.resolve(!1)}}function Bm(){if(km)return km;if(typeof window>`u`)return null;let e=window.AudioContext??window.webkitAudioContext;if(!e)return null;try{km=new e}catch{return null}return km}var Vm=new Map,Hm=new Map,Um=new Map;function Wm(e){let t=performance.now(),n=t-(Vm.get(e)??-1/0);return Vm.set(e,t),n}function Gm(e=`tap`,t){qm(e,t,Vp(t))}function Km(e,t,n){let r=t.walk?.length??0,i=r>0&&n<Om?((Hm.get(e)??-1)+1)%r:0;return Hm.set(e,i),i}function qm(e,t,n,r=`both`,i){let a=bp(e);if(!Mm||!a||Rm())return;let o=i?`${a}:${i}`:a,s;if(r===`release`){let e=Um.get(o);if(!e)return;Um.delete(o),s=e}else{Um.delete(o);let e=Nm*Fm(t?.volume,1);if(e===0)return;let i=t?.theme,c=xp[Sp(i)?i:Pm][a],l=Rp(t?.emphasis),u=Wm(a);s={recipe:c,volume:e,emphasis:l,shape:Up(a,n,l,u),step:Km(a,c,u)},r===`press`&&Um.set(o,s)}let c=Bm();if(!c)return;let l=()=>Am??=cm(c);if(c.state===`running`)Dm(c,l,jm,a,s,r);else try{c.resume().then(()=>{Mm&&c.state===`running`&&Dm(c,l,jm,a,s,r)},()=>{})}catch{}}var Jm=`planet-simulator-audio-v1`,Ym={enabled:!0,volume:.35},Xm={success:.55,ready:.35,bloom:.4,droplet:.22,page:.26,tick:.24,toggle:.28,error:.28},Zm={"counter-step":.32,"volume-step":.27,"time-rate":.45};function Qm(){try{return localStorage}catch{return null}}var $m=class{options;preferences={...Ym};generation=0;disposed=!1;hidden=!1;failed=!1;pending=!1;unlockInFlight=null;lastSoftSound=-1/0;lastError=-1/0;lastAdjustment=new Map;storage;constructor(e={}){this.options=e,this.storage=e.storage===void 0?Qm():e.storage;try{let e=this.storage?.getItem(Jm);if(e&&e.length<512){let t=JSON.parse(e);typeof t.enabled==`boolean`&&Number.isFinite(t.volume)&&t.volume>=0&&t.volume<=1&&(this.preferences={enabled:t.enabled,volume:t.volume})}}catch{}this.syncOutput()}get state(){return{...this.preferences,failed:this.failed,pending:this.pending}}changed(){this.options.change?.()}persist(){try{this.storage?.setItem(Jm,JSON.stringify(this.preferences))}catch{}}canSound(){return!this.disposed&&!this.hidden&&this.preferences.enabled&&this.preferences.volume>0}syncOutput(){Lm(this.preferences.volume),Im(this.canSound())}async setEnabled(e){if(this.disposed)return;let t=++this.generation;if(this.preferences.enabled=e,this.failed=!1,this.pending=this.canSound(),this.persist(),this.syncOutput(),this.changed(),!this.pending)return;let n=await this.ensureUnlocked(!0);t!==this.generation||this.disposed||(this.pending=!1,this.failed=!n,this.changed())}setVolume(e){return this.disposed||!Number.isFinite(e)||e<0||e>1?!1:(e===0&&this.preferences.volume!==0&&(this.generation++,this.pending=!1),this.preferences.volume=e,this.persist(),this.syncOutput(),this.changed(),!0)}warm(){this.canSound()&&this.ensureUnlocked(!0)}ensureUnlocked(e=!1){if(!e&&this.unlockInFlight)return this.unlockInFlight;let t=zm();return this.unlockInFlight=t,t.then(e=>{this.unlockInFlight===t&&(this.unlockInFlight=null,e&&this.canSound()&&this.failed&&(this.failed=!1,this.changed()))}),t}prepare(e){if(!this.canSound())return()=>{};let t=this.generation,n=this.ensureUnlocked(),r=!1;return()=>{r||(r=!0,(this.unlockInFlight??n).then(n=>{t===this.generation&&this.canSound()&&(n&&this.play(e),this.failed!==!n&&(this.failed=!n,this.changed()))}))}}play(e){let t=performance.now();if(e===`counter-step`||e===`volume-step`||e===`time-rate`){if(t-(this.lastAdjustment.get(e)??-1/0)<80)return;this.lastAdjustment.set(e,t),Gm(`select`,{volume:Zm[e],emphasis:`subtle`})}else{if(e===`error`){if(t-this.lastError<160)return;this.lastError=t}else if(e!==`success`&&e!==`ready`){if(t-this.lastSoftSound<105)return;this.lastSoftSound=t}Gm(e,{volume:Xm[e],emphasis:`subtle`})}}setHidden(e){this.hidden===e||this.disposed||(this.hidden=e,this.generation++,this.pending=!1,this.syncOutput(),this.changed())}dispose(){this.disposed||(this.disposed=!0,this.generation++,Im(!1))}};function eh(e){return!!e.closest(`#app[data-ui-pointer]`)&&!globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches}function th(e){let t=document.createElement(`span`);t.className=`wake-slider`;let n=document.createElement(`span`);n.className=`wake-track`,n.setAttribute(`aria-hidden`,`true`);let r=Array.from({length:32},()=>{let e=document.createElement(`span`);return e.className=`wake-bar`,n.append(e),e}),i=document.createElement(`output`);i.setAttribute(`aria-hidden`,`true`),t.append(n,e,i);let a=new Float32Array(r.length),o=0,s=0,c=0;function l(){if(c||typeof requestAnimationFrame!=`function`)return;let e=performance.now(),t=n=>{let i=Math.exp(-6.5*Math.min(.05,(n-e)/1e3));e=n;let o=!1;r.forEach((e,t)=>{let n=a[t]*i;a[t]=n>.002?n:0,e.style.transform=`scaleY(${1+a[t]*1.25})`,o||=a[t]>0}),c=o?requestAnimationFrame(t):0};c=requestAnimationFrame(t)}return{element:t,sync(t=!1){let n=Number(e.value),c=Math.ceil(n/100*r.length);i.value=String(n);let u=`${n}%`;e.setAttribute(`aria-valuetext`,u),r.forEach((e,t)=>{e.dataset.on=String(t<c)});let d=t&&c!==o;if(d&&eh(e)){let e=performance.now(),t=Math.abs(c-o)/Math.max(.008,(e-s)/1e3),n=1-Math.exp(-t/180);for(let e=Math.max(0,Math.min(c,o)-1);e<Math.max(c,o);e++)a[e]=Math.max(a[e],n);s=e,l()}return o=c,d},dispose(){c&&cancelAnimationFrame(c)}}}function nh(t){let i=document.createElement(`details`);i.className=`audio-controls`;let o=document.createElement(`summary`);r(o,()=>n(`audio.title`)),m(t,i,o);let s=document.createElement(`label`),c=document.createElement(`input`);c.type=`checkbox`,c.dataset.soundPreference=``,a(c,`aria-label`,()=>n(`audio.enabled`)),s.append(bf(c),e(()=>n(`audio.enabled`)));let l=document.createElement(`label`);l.className=`audio-volume`,r(l,()=>n(`audio.volume`));let u=document.createElement(`input`);u.type=`range`,u.min=`0`,u.max=`100`,u.step=`1`,a(u,`aria-label`,()=>n(`audio.volume`));let d=th(u);l.append(d.element);let f=document.createElement(`p`);f.setAttribute(`role`,`status`),f.className=`audio-status`;let h=new $m({change:g});function g(){let e=h.state;c.checked=e.enabled,u.value=String(Math.round(e.volume*100)),d.sync(),f.hidden=!e.failed&&!e.pending,r(f,()=>n(e.failed?`audio.failed`:e.pending?`audio.loading`:e.enabled?`audio.on`:`audio.off`))}return c.onchange=()=>void h.setEnabled(c.checked).then(()=>{h.state.enabled&&p(t,`toggle`)}),u.oninput=()=>{let e=d.sync(!0);h.setVolume(Number(u.value)/100),e&&p(t,`volume-step`)},i.append(o,s,l,f),t.insertBefore(i,t.querySelector(`.display-actions`)),g(),{audio:h,dispose(){d.dispose(),h.dispose(),i.remove()}}}var rh=`planet-simulator-hints-v1`;function ih(){try{return localStorage}catch{return null}}function ah(e,t,i){let o=i.storage===void 0?ih():i.storage,s=document.createElement(`section`);s.className=`opening-hint`,s.hidden=!0,a(s,`aria-label`,()=>n(`hints.title`));let c=document.createElement(`p`);r(c,()=>n(`hints.explore`));let l=document.createElement(`button`);l.type=`button`,r(l,()=>n(`hints.dismiss`));let u=document.createElement(`button`);u.type=`button`,u.className=`hints-replay`,r(u,()=>n(`hints.show`)),s.append(c,l),e.append(s),t.append(u);let d=e.querySelector(`.creation-toggle`),f=t.closest(`.display-settings`),m=!1,h=!1,g=!1,_;try{m=o?.getItem(rh)===`dismissed`}catch{}let v=()=>d?.classList.remove(`opening-highlight`),y=()=>{g=!1,s.hidden=!0,v(),_&&clearTimeout(_)};function b(e=!0){h||(g=!0,s.hidden=!1,v(),e&&d?.classList.add(`opening-highlight`),_&&clearTimeout(_),_=setTimeout(y,12e3))}l.onclick=()=>{m=!0;try{o?.setItem(rh,`dismissed`)}catch{}y(),p(e,`droplet`)};let x=()=>{f?.open&&y()};return u.onclick=t=>{f&&(f.open=!1),b(t.detail!==0),g&&p(e,`bloom`)},d?.addEventListener(`click`,y),f?.addEventListener(`toggle`,x),i.fresh&&!m&&b(),{setBusy(e){h=e,h&&g&&y()},dispose(){y(),d?.removeEventListener(`click`,y),f?.removeEventListener(`toggle`,x),s.remove(),u.remove()}}}function oh(e,t){if(e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;let n=e.target;e.key===`Escape`?(t.hidden()?t.restore():t.cancel(),e.preventDefault()):n?.closest(`button,select,textarea,summary,a,[contenteditable="true"]`)||n?.closest(`.time-controls`)||(e.key===`Enter`&&t.editing()&&n?.closest(`.body-editor input,.scene-canvas`)?(e.preventDefault(),t.confirm()):e.code===`Space`&&!e.repeat&&!n?.closest(`input`)&&(e.preventDefault(),t.togglePlay()))}function sh(e,t,n){return{position:{...e.position},target:{...t.target},followId:n.followId,overview:n.overview,minDistance:t.minDistance,maxDistance:t.maxDistance,near:e.near,far:e.far}}function ch(e,t,n,r){let i=t.enableDamping;t.enableDamping=!1,t.update(),n.setView(r.followId,r.overview),e.position.copy(r.position),t.target.copy(r.target),t.minDistance=r.minDistance,t.maxDistance=r.maxDistance,e.near=r.near??Math.min(1e-5,r.minDistance/150),e.far=r.far??Math.max(5e3,e.position.distanceTo(t.target)*4),e.updateProjectionMatrix(),t.update(),t.enableDamping=i,e.updateMatrixWorld()}var lh=class{previous=null;remember(e,t){(t.overview||t.followId!==e)&&(this.previous=structuredClone(t))}take(e){let t=this.previous;return this.previous=null,t&&(t.overview||e.some(e=>e.id===t.followId))?t:null}clear(){this.previous=null}};function uh(e){let t=new Map;return{publish(n){let r=new Set(n.map(e=>e.id));for(let[e,n]of t)r.has(e)||(n.remove(),t.delete(e));for(let r of n){let n=t.get(r.id);n||(n=document.createElement(`span`),n.className=`body-label`,n.dataset.bodyId=r.id,t.set(r.id,n),e.append(n)),n.textContent=r.text,n.hidden=r.hidden,n.style.left=`${r.x}px`,n.style.top=`${r.y}px`,n.dataset.selected=String(r.selected)}},hide(){for(let e of t.values())e.hidden=!0},dispose(){for(let e of t.values())e.remove();t.clear()}}}function dh(e){let t=document.createElement(`span`),i=document.createElement(`span`);t.className=`candidate-placement-marker`,t.hidden=!0,t.setAttribute(`aria-hidden`,`true`),i.className=`candidate-placement-label`,t.append(i),e.append(t);let a=null;return{get id(){return a},update(e){t.hidden=!e,e?(a=e.id,t.dataset.bodyId=a,t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.style.width=t.style.height=`${Math.max(2,e.radius*2)}px`,r(i,()=>n(`creation.materialPreparing`,{name:e.name}))):a=null},dispose(){a=null,t.remove()}}}function fh(e,t,n,r){let i=t.map(e=>e.visible);try{for(let e of t)e.visible=!1;n();let i=e;if(r){i=document.createElement(`canvas`),i.width=e.width,i.height=e.height;let t=i.getContext(`2d`);if(!t)throw Error(`Screenshot composition failed`);t.drawImage(e,0,0),t.drawImage(r,0,0,i.width,i.height)}return new Promise((e,t)=>i.toBlob(n=>n?e(n):t(Error(`Screenshot encoding failed`)),`image/png`))}catch(e){return Promise.reject(e)}finally{t.forEach((e,t)=>{e.visible=i[t]})}}function ph(e,t){return{sun:`255,222,169`,mercury:`208,211,216`,venus:`255,222,172`,earth:`151,210,255`,mars:`255,174,145`,jupiter:`245,222,190`,saturn:`251,228,179`,uranus:`159,230,234`,neptune:`137,190,255`}[e]??(t===`gas-giant`?`181,221,224`:t===`terrestrial-planet`?`164,220,210`:t===`dwarf-planet`?`215,210,200`:`255,222,169`)}function mh(e){let t=document.createElement(`canvas`);t.className=`scene-star-glow`,t.setAttribute(`aria-hidden`,`true`),t.hidden=!0,e.append(t);let n=!1,r=[],i=null;return{canvas:t,get enabled(){return n},setEnabled(e){n=e,e||(t.hidden=!0,i=null)},update(e,a,o,s){if(!n||a<1||o<1)return;let c=t.width!==a||t.height!==o;if(!c&&i===s&&e.length===r.length&&e.every(({x:e,y:t,radius:n,depth:i,kind:a,color:o},s)=>{let c=r[s];return e===c.x&&t===c.y&&n===c.radius&&i===c.depth&&a===c.kind&&o===c.color}))return;c&&(t.width=a,t.height=o);let l=t.getContext(`2d`);if(l){l.clearRect(0,0,a,o),r=e,i=s;for(let t of e){let{x:n,y:r,radius:i,kind:c,color:u}=t;if(c!==`star`)continue;let d=i*2.15;l.save();for(let i of e)i!==t&&i.depth>=t.depth||Math.hypot(i.x-n,i.y-r)>d+i.radius||(l.beginPath(),l.rect(0,0,a,o),l.moveTo(i.x+i.radius,i.y),l.arc(i.x,i.y,i.radius,0,2*Math.PI),l.clip(`evenodd`));let f=l.createRadialGradient(n,r,0,n,r,d),p=c===`star`?1:.65;f.addColorStop(0,`rgba(${u},${(s===`cosmos`?.28:.2)*p})`),f.addColorStop(.46,`rgba(${u},${(s===`cosmos`?.14:.1)*p})`),f.addColorStop(.66,`rgba(${u},${(s===`cosmos`?.045:.035)*p})`),f.addColorStop(.84,`rgba(${u},.008)`),f.addColorStop(1,`rgba(${u},0)`),l.fillStyle=f,l.fillRect(n-d,r-d,2*d,2*d),l.restore()}}},dispose(){t.remove(),t.width=t.height=0}}}function hh(e,t,n,r){let i=Number.isFinite(e)?Math.max(1,e):1,a=Number.isFinite(t)?Math.max(1,t):1;return Math.max(.5,Math.min(Number.isFinite(n)?Math.max(1,n):1,r?1.5:2,Math.sqrt((r?12e5:3e6)/(i*a))))}function gh(e,t=4){e.traverse(e=>{e.renderOrder=t;let n=e.material;for(let e of n?Array.isArray(n)?n:[n]:[])e.depthTest=!1,e.depthWrite=!1,e.transparent=!0})}function _h(e,t,n,r){let i=2*t*Math.tan(n*Math.PI/360)/Math.max(1,r),a=Math.min(e*.15,12*i);return{length:a,width:a*.4}}function vh(e,t){let n=Math.max(e.massKg,t.massKg),r=e.massKg/n,i=t.massKg/n;return[r/(r+i),i/(r+i)]}function yh(e,t){let[n,r]=vh(e,t);return{x:n*e.positionM.x+r*t.positionM.x,y:n*e.positionM.y+r*t.positionM.y,z:n*e.positionM.z+r*t.positionM.z}}function bh(e,t,n,r=null){return e.points.flatMap(e=>{let i={x:e.positionM.x-e.referenceM.x,y:e.positionM.y-e.referenceM.y,z:e.positionM.z-e.referenceM.z},a=r?Hu(Vu({x:i.x+t.x,y:i.y+t.y,z:i.z+t.z},r),n):Hu({x:i.x+(t.x-n.x),y:i.y+(t.y-n.y),z:i.z+(t.z-n.z)},{x:0,y:0,z:0});return[a.x,a.y,a.z]})}function xh(e=!1){let t=e?new la({color:`#9ca9b7`,transparent:!0,opacity:.3,depthWrite:!1}):new Qa({color:`#7bacb6`,transparent:!0,opacity:.8,dashSize:1,gapSize:.65,depthWrite:!1}),n=new _a(new ji,t);gh(n,e?3:4),n.visible=!1,n.raycast=()=>{},n.frustumCulled=!1;let r=null,i=``;return{line:n,setResult(e){if(r=e,i=``,n.visible=!1,n.geometry.dispose(),n.geometry=new ji,!e||e.points.length<2)return;let t=bh(e,{x:0,y:0,z:0},{x:0,y:0,z:0});t.some(e=>!Number.isFinite(Math.fround(e)))?r=null:(n.geometry.setAttribute(`position`,new yi(t,3)),n.computeLineDistances())},setTheme(n){t.color.set(e?n?`#9ca9b7`:`#706f6a`:n?`#7bacb6`:`#4f8088`)},update(a,o,s,c=!0,l=null){let u=r?.referenceId,d=u?a.find(e=>e.id===u):null,f=r?.frame===`barycentric`?a.find(e=>e.id===r.bodyId):null;if(n.visible=c&&!!d&&!!r&&r.points.length>1,r?.frame===`barycentric`&&(!e||!f||f.kind!==`star`||d?.kind!==`star`)&&(n.visible=!1),!n.visible||!r||!d)return;let p=r.frame===`barycentric`?yh(f,d):d.positionM,m={x:0,y:0,z:0},h=l?JSON.stringify([l,p,o]):``;if(h!==i){let e=bh(r,l?p:m,l?o:m,l);if(e.some(e=>!Number.isFinite(Math.fround(e)))){n.visible=!1;return}let t=n.geometry.getAttribute(`position`);t.array.set(e),t.needsUpdate=!0,n.computeLineDistances(),i=h}let g=l?m:Hu(p,o);if(![g.x,g.y,g.z].every(e=>Number.isFinite(Math.fround(e))))n.visible=!1;else{if(n.position.set(g.x,g.y,g.z),t instanceof Qa){let e=Math.max(1e-12,s*.006);t.dashSize=e,t.gapSize=e*.65}n.userData.pointCount=r.points.length}},dispose(){n.geometry.dispose(),t.dispose(),n.removeFromParent()}}}function Sh(){let e=new Or,t=new Map,n=!0;return{group:e,setResult(r){let i=r?.results.filter(e=>e.points.length>1)??[],a=new Set(i.map(e=>e.bodyId));for(let[e,n]of t)a.has(e)||(n.dispose(),t.delete(e));for(let r of i){let i=t.get(r.bodyId);i||(i=xh(!0),i.setTheme(n),t.set(r.bodyId,i),e.add(i.line)),i.setResult(r),i.line.userData.bodyId=r.bodyId}},setTheme(e){n=e,t.forEach(t=>t.setTheme(e))},update(e,n,r,i,a,o=null){for(let[s,c]of t)c.update(e,n,r,i&&e.some(e=>e.id===s)&&!(a?.bodyId===s&&a.points.length>1),o)},dispose(){t.forEach(e=>e.dispose()),t.clear(),e.removeFromParent()}}}var Ch={type:`change`},wh={type:`start`},Th={type:`end`},Eh=new Hi,Dh=new Fi,Oh=Math.cos(70*kn.DEG2RAD),kh=new Q,Ah=2*Math.PI,jh={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Mh=1e-6,Nh=class extends gs{constructor(e,t=null){super(e,t),this.state=jh.NONE,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:ge.ROTATE,MIDDLE:ge.DOLLY,RIGHT:ge.PAN},this.touches={ONE:q.ROTATE,TWO:q.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new An,this._lastTargetPosition=new Q,this._quat=new An().setFromUnitVectors(e.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ds,this._sphericalDelta=new ds,this._scale=1,this._panOffset=new Q,this._rotateStart=new Z,this._rotateEnd=new Z,this._rotateDelta=new Z,this._panStart=new Z,this._panEnd=new Z,this._panDelta=new Z,this._dollyStart=new Z,this._dollyEnd=new Z,this._dollyDelta=new Z,this._dollyDirection=new Q,this._mouse=new Z,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Fh.bind(this),this._onPointerDown=Ph.bind(this),this._onPointerUp=Ih.bind(this),this._onContextMenu=Uh.bind(this),this._onMouseWheel=zh.bind(this),this._onKeyDown=Bh.bind(this),this._onTouchStart=Vh.bind(this),this._onTouchMove=Hh.bind(this),this._onMouseDown=Lh.bind(this),this._onMouseMove=Rh.bind(this),this._interceptControlDown=Wh.bind(this),this._interceptControlUp=Gh.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=jh.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ch),this.update(),this.state=jh.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;kh.copy(t).sub(this.target),kh.applyQuaternion(this._quat),this._spherical.setFromVector3(kh),this.autoRotate&&this.state===jh.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Ah:n>Math.PI&&(n-=Ah),r<-Math.PI?r+=Ah:r>Math.PI&&(r-=Ah),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(kh.setFromSpherical(this._spherical),kh.applyQuaternion(this._quatInverse),t.copy(this.target).add(kh),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=kh.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new Q(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new Q(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=kh.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Eh.origin.copy(this.object.position),Eh.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Eh.direction))<Oh?this.object.lookAt(this.target):(Dh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Eh.intersectPlane(Dh,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Mh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Mh||this._lastTargetPosition.distanceToSquared(this.target)>Mh?(this.dispatchEvent(Ch),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Ah/60/60*this.autoRotateSpeed:Ah/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){kh.setFromMatrixColumn(t,0),kh.multiplyScalar(-e),this._panOffset.add(kh)}_panUp(e,t){this.screenSpacePanning===!0?kh.setFromMatrixColumn(t,1):(kh.setFromMatrixColumn(t,0),kh.crossVectors(this.object.up,kh)),kh.multiplyScalar(e),this._panOffset.add(kh)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;kh.copy(r).sub(this.target);let i=kh.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Ah*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ah*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ah*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ah*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ah*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ah*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Ah*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ah*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Z,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ph(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Fh(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Ih(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Th),this.state=jh.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function Lh(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ge.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=jh.DOLLY;break;case ge.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=jh.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=jh.ROTATE}break;case ge.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=jh.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=jh.PAN}break;default:this.state=jh.NONE}this.state!==jh.NONE&&this.dispatchEvent(wh)}function Rh(e){switch(this.state){case jh.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case jh.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case jh.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function zh(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===jh.NONE&&(e.preventDefault(),this.dispatchEvent(wh),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Th))}function Bh(e){this.enabled!==!1&&this._handleKeyDown(e)}function Vh(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case q.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=jh.TOUCH_ROTATE;break;case q.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=jh.TOUCH_PAN;break;default:this.state=jh.NONE}break;case 2:switch(this.touches.TWO){case q.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=jh.TOUCH_DOLLY_PAN;break;case q.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=jh.TOUCH_DOLLY_ROTATE;break;default:this.state=jh.NONE}break;default:this.state=jh.NONE}this.state!==jh.NONE&&this.dispatchEvent(wh)}function Hh(e){switch(this._trackPointer(e),this.state){case jh.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case jh.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case jh.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case jh.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=jh.NONE}}function Uh(e){this.enabled!==!1&&e.preventDefault()}function Wh(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Gh(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Kh(e,t,n){let r=Number.isFinite(e)?Math.max(1,Math.floor(e)):1,i=Number.isFinite(t)?Math.max(1,Math.floor(t)):1;return{width:r,height:i,pixelRatio:Number.isFinite(n)?Math.min(2,Math.max(1,n)):1,aspect:r/i}}function qh(e,t=!1){return 2*Math.atan(Math.tan((t?32:23)*Math.PI/180)/(Number.isFinite(e)&&e>0?Math.max(.25,Math.min(1,e)):1))*180/Math.PI}function Jh(e,t,n,r){let i=e===`sun`?9:e===`moon`?4:5,a=Kh(t,n,1);return i*(r?Math.max(1,Math.min(3,Math.min(a.width,a.height)/480)):1)}var Yh=e=>e===`touch`?12:e===`pen`?8:5,Xh=e=>{let t=ce.bodies.find(t=>t.id===e);return Object.freeze({example:e,massKg:t.massKg,radiusM:t.radiusM,source:`data/horizons/${e}.json`,definition:`archived GM / G, mean radius`})},Zh=Object.freeze({star:Xh(`sun`),"terrestrial-planet":Xh(`earth`),"gas-giant":Xh(`jupiter`),moon:Xh(`moon`),"dwarf-planet":Object.freeze({example:`ceres`,massKg:0x32df235c0f16f80000,radiusM:469700,source:`data/horizons/planet-parameters.html`,definition:`Ceres mass in 10^18 kg; mean radius in km × 1000`}),asteroid:Object.freeze({example:`bennu`,massKg:7329e7,radiusM:245.023,source:`https://pmc.ncbi.nlm.nih.gov/articles/PMC7375169/`,definition:`Scheeres et al. 2020 Table 1: kg, mean radius m`}),comet:Object.freeze({example:`67p`,massKg:9982e9,radiusM:Math.cbrt(564e8/(4*Math.PI)),source:`https://doi.org/10.1016/j.icarus.2016.05.002`,definition:`Jorda et al. 2016: kg, equivalent-volume sphere from 18.8 km³ × 1e9`}),"black-hole":Object.freeze({example:`ten-solar`,massKg:10*Xh(`sun`).massKg,radiusM:V(10*Xh(`sun`).massKg),source:`data/horizons/sun.json; https://imagine.gsfc.nasa.gov/science/objects/black_holes2.html`,definition:`Defined nonrotating uncharged 10-solar-mass example; initial radius field = 2GM/c² capture boundary`})});function Qh(e,t){if(!e||typeof e.anchorId!=`string`||!e.offsetM||!A(e.offsetM))return C(`INVALID_INPUT`,`placementAnchor`);let n=t.find(t=>t.id===e.anchorId);if(!n)return C(`INVALID_INPUT`,`placementAnchor`);let r={x:n.positionM.x+e.offsetM.x,y:n.positionM.y+e.offsetM.y,z:n.positionM.z+e.offsetM.z};return A(r)?{ok:!0,value:r}:C(`NON_FINITE_CALCULATION`,`placementAnchor`)}var $h=1e4,eg=e=>P([e])[0],tg=H;function ng(e,t,n,r){let i=xd(e);return tg({id:t,name:n,kind:e,materialId:`procedural`,massKg:Zh[e].massKg,radiusM:Zh[e].radiusM,positionM:{...r},velocityMS:{x:0,y:0,z:0},collision:{boundary:`physical-radius`},...i?{displaySpin:i}:{}})}function rg(e,t,n){let r=null;for(let i of t){if(i.id===n)continue;let t=Math.hypot(e.x-i.positionM.x,e.y-i.positionM.y,e.z-i.positionM.z);Number.isFinite(t)&&(!r||t<r.distanceM)&&(r={body:i,distanceM:t})}return r}function ig(e){return e>=14959787070?{value:e/R,unit:`AU`}:e>=1e3?{value:e/1e3,unit:`km`}:{value:e,unit:`m`}}function ag(e,t){return{x:t.x,y:t.y,z:e.z}}function og(e,t){return{...e,z:t}}function sg(e,t,n){return e*t/n}var cg=e=>10**e,lg=e=>Math.log10(e);function ug(e,t,n,r,i){return Math.max(r,Math.min(i,e+t/Math.max(1,n)*(i-r)))}function dg(e){let t=e.massKg/(4*Math.PI/3*e.radiusM**3);return Number.isFinite(t)&&t>0?t:null}function fg(e){return{x:e.positionM.x+e.velocityMS.x*$h,y:e.positionM.y+e.velocityMS.y*$h,z:e.positionM.z+e.velocityMS.z*$h}}function pg(e,t){return{x:(t.x-e.positionM.x)/$h,y:(t.y-e.positionM.y)/$h,z:e.velocityMS.z}}function mg(e,t,n){let r=N([e]);if(!r.ok)return r;if(n===`manual`)return{ok:!0,value:{...e.velocityMS}};if(!t)return C(`INVALID_INPUT`,`referenceBody`);let i=N([e,t]);if(!i.ok)return i;let a=T(t,e);if(!a.ok)return a;if(n===`inherit`)return{ok:!0,value:{...t.velocityMS}};let o=a.value.separationM,s=Math.hypot(o.x,o.y);if(s===0)return C(`INVALID_INPUT`,`orbitalPlane`);let c=Math.sqrt(I*t.massKg/a.value.distanceM+I*e.massKg/a.value.distanceM),l={x:t.velocityMS.x-c*o.y/s,y:t.velocityMS.y+c*o.x/s,z:t.velocityMS.z};return Object.values(l).every(Number.isFinite)?{ok:!0,value:l}:C(`NON_FINITE_CALCULATION`,`circularVelocity`)}var hg=class{identity=``;min=0;max=0;update(e,t,n){let r=2**-52*Math.max(1,Math.abs(t),Math.abs(this.min),Math.abs(this.max))*4,i=this.identity===e&&(t<this.min-r||t>this.max+r);return(this.identity!==e||i)&&(this.identity=e,this.min=t-n,this.max=t+n),i}};function gg(e,t,n){let r=`captured`,i=e.ownerDocument?.defaultView,a=e=>r!==`ended`&&e.pointerId===t.pointerId&&!(e.timeStamp<t.timeStamp),o=e=>{r===`captured`&&a(e)&&n.move(e)},s=e=>{e.stopPropagation(),p(),n.up(e)},c=e=>{a(e)&&s(e)},l=e=>{a(e)&&(p(),n.interrupt(`pointer-cancel`))},u=t=>{a(t)&&!e.hasPointerCapture(t.pointerId)&&(t.buttons===0&&i?r=`released`:(p(),n.interrupt(`capture-lost`)))},d=e=>{r===`released`&&a(e)&&(p(),n.interrupt(`capture-lost`))},f=e=>{r===`released`&&t.pointerType===`mouse`&&e.button===0&&!(e.buttons&1)&&!(e.timeStamp<t.timeStamp)&&s(e)};function p(){r!==`ended`&&(r=`ended`,i?.removeEventListener(`pointerup`,c,!0),i?.removeEventListener(`pointercancel`,l,!0),i?.removeEventListener(`pointerdown`,d,!0),i?.removeEventListener(`mouseup`,f,!0),e.onpointermove===o&&(e.onpointermove=null),e.onpointerup===c&&(e.onpointerup=null),e.onpointercancel===l&&(e.onpointercancel=null),e.onlostpointercapture===u&&(e.onlostpointercapture=null),e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId))}return i?.addEventListener(`pointerup`,c,!0),i?.addEventListener(`pointercancel`,l,!0),i?.addEventListener(`pointerdown`,d,!0),i?.addEventListener(`mouseup`,f,!0),e.onpointermove=o,e.onpointerup=c,e.onpointercancel=l,e.onlostpointercapture=u,e.setPointerCapture(t.pointerId),{release:p}}function _g(e,t,n){let r=null,i=()=>{let e=r;r=null,e?.capture.release()};e.onpointerdown=i=>{if(i.button!==0||!t.canStartGesture)return;i.preventDefault(),i.stopPropagation();let o=n(i);o&&(t.beginGesture(o.prepare,o.apply,n=>{r={token:n,capture:gg(e,i,{move:e=>{t.ownsGesture(n)&&(o.move(e),t.moveGesture(n))},up:e=>{r=null,t.ownsGesture(n)&&(o.move(e),t.endGesture(n))},interrupt:e=>{r=null,t.ownsGesture(n)&&t.cancel(e)}})}},o.complete),a())};function a(){r&&!t.ownsGesture(r.token)&&i()}return{sync:a,get captured(){return!!r},dispose(){i(),e.onpointerdown=null}}}function vg(e){let t=t=>{t.target===window&&e.cancel(`window-blur`)},n=()=>[window.innerWidth,window.innerHeight,window.devicePixelRatio,window.visualViewport?.width,window.visualViewport?.height,window.visualViewport?.scale,window.visualViewport?.offsetLeft,window.visualViewport?.offsetTop],r=n(),i=()=>{let t=n(),i=!Number.isFinite(r[0])||!Number.isFinite(r[1])||t.some((e,t)=>e!==r[t]);r=t,i&&(e.hasGesture||e.phase===`creating-preview`)&&e.cancel(`resize`)},a=()=>{document.hidden&&e.cancel(`hidden`)},o=()=>e.cancel(`pagehide`);return window.addEventListener(`blur`,t),window.addEventListener(`resize`,i),window.addEventListener(`pagehide`,o),document.addEventListener(`visibilitychange`,a),()=>{window.removeEventListener(`blur`,t),window.removeEventListener(`resize`,i),window.removeEventListener(`pagehide`,o),document.removeEventListener(`visibilitychange`,a)}}function yg(e){return Number.isFinite(e.x)&&Number.isFinite(e.y)&&Math.hypot(e.x,e.y)>=8}function bg(e,t){return{x:e.x-t.width/2,y:e.y-t.height/2,width:t.width,height:t.height}}function xg(e,t,n,r,i){let{width:a,height:o}=t;if(![e.x,e.y,a,o,n.width,n.height].every(Number.isFinite)||a<=0||o<=0||n.width<a+16||n.height<o+16)return null;let s=8+a/2,c=n.width-8-a/2,l=8+o/2,u=n.height-8-o/2,d=e=>Math.max(s,Math.min(c,e)),f=e=>Math.max(l,Math.min(u,e)),p=new Set([d(e.x),s,c]),m=new Set([f(e.y),l,u]);for(let e of r)p.add(d(e.x-8-a/2)),p.add(d(e.x+e.width+8+a/2)),m.add(f(e.y-8-o/2)),m.add(f(e.y+e.height+8+o/2));let h=null,g=1/0;for(let n of p)for(let i of m){let a=bg({x:n,y:i},t);if(r.some(e=>a.x<e.x+e.width+8&&a.x+a.width+8>e.x&&a.y<e.y+e.height+8&&a.y+a.height+8>e.y))continue;let o=(n-e.x)**2+(i-e.y)**2;o<g&&(h={x:n,y:i},g=o)}if(h&&i&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&i.x>=s&&i.x<=c&&i.y>=l&&i.y<=u){let n=bg(i,t),a=!r.some(e=>n.x<e.x+e.width+8&&n.x+n.width+8>e.x&&n.y<e.y+e.height+8&&n.y+n.height+8>e.y),o=Math.hypot(i.x-e.x,i.y-e.y);if(a&&o<=Math.sqrt(g)+24)return i}return h}function Sg(e,t,n){let r=10/R,i=new Fi(new Q(0,1,0),-(n-t.z)*r),a=e.intersectPlane(i,new Q);if(!a||a.distanceToSquared(e.origin)===0)return null;let o={x:t.x+a.x/r,y:t.y-a.z/r,z:n};return A(o)?o:null}function Cg(e){let t=new cs,i=new La(1,1.018,72),c=new Ui({color:`#d9cbb0`,transparent:!0,opacity:.6,depthTest:!1}),l=new ta(i,c);gh(l,3),e.scene.add(l);let u=new hs(new Q(1,0,0),new Q,1,`#d6bb86`);gh(u,5),e.scene.add(u);let d=new ji,f=new la({color:`#a6b3c2`,transparent:!0,opacity:.3,depthTest:!1}),p=new _a(d,f);gh(p,3),e.scene.add(p);let m=document.createElement(`span`);m.className=`distance-label`,e.host.append(m);let h=document.createElement(`button`);h.type=`button`,h.className=`spatial-handle`;let g=document.createElement(`button`);g.type=`button`,g.className=`spatial-handle height-handle`,r(g,()=>n(`editor.heightHandle`)),a(g,`aria-label`,()=>n(`editor.heightHandle`));let _=document.createElement(`span`),v=document.createElement(`span`);for(let e of[_,v])e.className=`handle-guide`,e.setAttribute(`aria-hidden`,`true`);e.host.append(_,v,h,g);let y=null,b=null,x=null,S=10/R,C=(t,n=e.origin(),r=e.distanceCenter?.()??null)=>Hu(Vu(t,r),n);function w(t){let n=C(t),r=new Q(n.x,n.y,n.z).project(e.camera);return{x:(r.x+1)*e.host.clientWidth/2,y:(1-r.y)*e.host.clientHeight/2,visible:r.z>=-1&&r.z<=1&&Math.abs(r.x)<1&&Math.abs(r.y)<1}}function E(n,r,i,a=e.camera,o=e.origin(),s=e.distanceCenter?.()??null){let c=e.canvas.getBoundingClientRect();t.setFromCamera(new Z((n-c.left)/c.width*2-1,-(r-c.top)/c.height*2+1),a);let l=Sg(t.ray,o,i);return l?Vu(l,s,!0):null}function D(t,n){let{left:r,top:i,width:a,height:o}=e.canvas.getBoundingClientRect();if(a<=0||o<=0)return null;e.camera.updateMatrixWorld();let s=e.bodies(),c=ng(t,`keyboard-placement`,``,e.origin()),l=[[Math.min(.72,.5+80/a),.5],[.76,.5],[.63,.62],[.63,.38],[.5,.62],[.5,.38],[.38,.5],[.24,.5],[.76,.64],[.76,.36],[.24,.64],[.24,.36]];for(let[e,t]of l){let l=E(r+e*a,i+t*o,n);if(!l)continue;let u={...c,positionM:l};if(s.every(e=>T(u,e).ok))return l}return null}function O(t,n){let r=e.canvas.getBoundingClientRect(),i=document.elementFromPoint(t.clientX,t.clientY);if(t.clientX<r.left||t.clientX>r.right||t.clientY<r.top||t.clientY>r.bottom||i?.closest(`.creation-entry,.body-editor,.time-controls,button,select,input`))return null;let a=e.editor.creationPosition({x:0,y:0,z:n.z},n.anchorOrigin).z;return E(t.clientX,t.clientY,a,n.camera,e.origin())}function k(t,n=e.camera,r=e.origin()){let i=C(t.positionM,r),a=n.position.distanceTo(new Q(i.x,i.y,i.z));return Math.max(t.radiusM*2,110*a*Math.tan(n.fov*Math.PI/360)/Math.max(1,e.host.clientHeight)/S)}function j(t,n){e.camera.updateMatrixWorld();let r=e.camera.clone(),i={...e.origin()},a=e.distanceCenter?.()??null,o=t.clientX,s=t.clientY,c=null,l=0,u=null,d={...e.editor.creationOrigin},f={x:0,y:0},p=t=>{let n=C(t,i,a),o=new Q(n.x,n.y,n.z).project(r);return{x:(o.x+1)*e.host.clientWidth/2,y:(1-o.y)*e.host.clientHeight/2}};return{prepare:o=>{if(n===`position`&&e.editor.phase===`editing-existing`&&(e.onPositionDrag?.(),e.camera.updateMatrixWorld(),r.copy(e.camera),Object.assign(i,e.origin()),a=e.distanceCenter?.()??null),c=o,l=k(o,r,i),n===`height`){let e=p(o.positionM),t=p({...o.positionM,z:o.positionM.z+l});return f={x:t.x-e.x,y:t.y-e.y},yg(f)}let s=n===`velocity`?fg(o).z:o.positionM.z;return u=E(t.clientX,t.clientY,s,r,i,a),u!==null},move:e=>{o=e.clientX,s=e.clientY},apply:()=>{if(!c)return!1;if(n===`height`){let n=((o-t.clientX)*f.x+(s-t.clientY)*f.y)/(f.x**2+f.y**2)*l;return e.editor.change({positionM:e.editor.creationPosition(og(c.positionM,c.positionM.z+n),d)}),!0}let p=n===`velocity`?fg(c).z:c.positionM.z,m=E(o,s,p,r,i,a);if(!m||!u)return!1;let h=m.x-u.x,g=m.y-u.y;if(h===0&&g===0)return n===`position`?e.editor.change({positionM:e.editor.creationPosition(c.positionM,d)}):n===`radius`?e.editor.change({radiusM:c.radiusM}):e.editor.change({velocityMS:{...c.velocityMS}}),!0;if(n===`position`)e.editor.change({positionM:e.editor.creationPosition(ag(c.positionM,{x:c.positionM.x+h,y:c.positionM.y+g,z:p}),d)});else if(n===`radius`)e.editor.change({radiusM:sg(c.radiusM,Math.hypot(l+h,g),l)});else{let t=fg(c);e.editor.change({velocityMS:pg(c,{x:t.x+h,y:t.y+g,z:p})})}return!0}}}let M=_g(h,e.editor,t=>j(t,e.editor.tool));function N(e){g.disabled=!e,r(g,()=>n(e?`editor.heightHandle`:`editor.heightUnavailable`)),s(g,`title`,()=>e?``:n(`editor.heightUnavailableHint`)),a(g,`aria-description`,()=>g.title)}let P=_g(g,e.editor,t=>{let n=e.editor.body;if(g.disabled||!n)return null;e.camera.updateMatrixWorld();let r=w(n.positionM),i=w({...n.positionM,z:n.positionM.z+k(n)});return yg({x:i.x-r.x,y:i.y-r.y})?j(t,`height`):(N(!1),null)});function F(){let t=e.host.getBoundingClientRect();return[...e.host.parentElement?.querySelectorAll(`.body-editor,.arc-tool,.time-controls,.creation-entry,.theme-controls,.display-settings > summary,.scene-status`)??[]].filter(e=>!e.hidden).map(e=>e.getBoundingClientRect()).filter(e=>e.width>0&&e.height>0).map(e=>({x:e.left-t.left,y:e.top-t.top,width:e.width,height:e.height}))}function I(e,t,n,r){if(e.hidden=!n,t.hidden=!0,!n)return;e.style.left=`${n.x}px`,e.style.top=`${n.y}px`;let i=n.x-r.x,a=n.y-r.y,o=Math.hypot(i,a);o>3&&(t.hidden=!1,t.style.left=`${r.x}px`,t.style.top=`${r.y}px`,t.style.width=`${o}px`,t.style.transform=`rotate(${Math.atan2(a,i)}rad)`)}function L(t){let n=b;b=null,n?.generation===e.editor.generation&&e.editor.cancel(t),n?.capture.release()}let ee=e=>{x&&e.timeStamp<x.started||(x=x||e.button!==0||e.isPrimary===!1?null:{x:e.clientX,y:e.clientY,id:e.pointerId,started:e.timeStamp,slop:Yh(e.pointerType)})},z=e=>{x&&e.pointerId===x.id&&Math.hypot(e.clientX-x.x,e.clientY-x.y)>x.slop&&(x=null)},B=e=>{x&&`pointerId`in e&&(e.pointerId!==x.id||e.timeStamp<x.started)||(x=null)},V=n=>{if(n.button!==0||!x||n.pointerId!==x.id||n.timeStamp<x.started)return;let r=x;if(x=null,Math.hypot(n.clientX-r.x,n.clientY-r.y)>r.slop||e.editor.busy)return;let i=e.canvas.getBoundingClientRect();t.setFromCamera(new Z((n.clientX-i.left)/i.width*2-1,-(n.clientY-i.top)/i.height*2+1),e.camera);let a=t.intersectObjects([...e.meshes()],!1)[0],o=a?String(a.object.userData.bodyId):null;e.editor.select(o),o&&e.editor.selectedId===o?e.onBodyClick?.(o):o||e.onEmptyClick?.()};e.canvas.addEventListener(`pointerdown`,ee),e.canvas.addEventListener(`pointermove`,z),e.canvas.addEventListener(`pointerup`,V),e.canvas.addEventListener(`pointercancel`,B),e.canvas.addEventListener(`blur`,B);function H(e,t,n,r){let i=C(n),a=C(r);[...Object.values(i),...Object.values(a)].every(e=>Number.isFinite(Math.fround(e)))?(t.setAttribute(`position`,new yi([i.x,i.y,i.z,a.x,a.y,a.z],3)),t.computeBoundingSphere(),e.visible=!0):e.visible=!1}return{sceneOverlays:[l,u,p],setTheme(e){let t=e===`atelier`?`#596775`:`#c6d1db`;c.color.set(t),f.color.set(t),u.setColor(e===`atelier`?`#93683d`:`#d6bb86`)},beginCreation(t,r){if(t.button!==0||e.editor.busy||e.editor.blocked)return;t.preventDefault(),t.stopPropagation();let{planeZ:i,referenceId:a,anchorId:o}=e.creationContext?.()??{planeZ:e.origin().z,referenceId:null,anchorId:null};if(!e.editor.beginCreate(r,null,n(`editor.exampleName`,{kind:n(`kind.${r}`)}),a,o))return;if(!t.isTrusted){e.editor.place(D(r,i)),e.editor.releaseCreation();return}let s=t.currentTarget;e.camera.updateMatrixWorld();let c={z:i,anchorOrigin:{...e.editor.creationOrigin},generation:e.editor.generation,camera:e.camera.clone()};b={...c,capture:gg(s,t,{move:t=>{b?.generation===c.generation&&e.editor.generation===c.generation&&e.editor.place(O(t,b))},up:t=>{let n=b;n?.generation===c.generation&&(b=null,e.editor.generation===c.generation&&(e.editor.place(O(t,n)),e.editor.releaseCreation()))},interrupt:e=>{b?.generation===c.generation&&L(e)}})}},update(t=!0){if(M.sync(),P.sync(),b&&(b.generation!==e.editor.generation||e.editor.phase!==`creating-preview`)){let e=b;b=null,e.capture.release()}let i=e.editor.body;if(l.visible=p.visible=u.visible=!1,h.hidden=!M.captured,g.hidden=!P.captured,m.hidden=!0,_.hidden=v.hidden=!0,!t||!i||!A(i.positionM)||!A(i.velocityMS)||!Number.isFinite(i.radiusM)||i.radiusM<=0||!Number.isFinite(i.massKg)||i.massKg<=0)return;let s=C(i.positionM);l.position.set(s.x,s.y,s.z),l.quaternion.copy(e.camera.quaternion);let f=e.meshes().find(e=>e.userData.bodyId===i.id)?.scale.x??0,x=Math.max(f*1.12,Kd(i.radiusM,e.camera.position.distanceTo(l.position),e.camera.fov,e.host.clientHeight,23));if(!Object.values(s).every(e=>Number.isFinite(Math.fround(e)))||!Number.isFinite(Math.fround(x)))return;l.scale.setScalar(x),l.visible=!e.editor.state?.jump,c.opacity=e.editor.tool===`mass`?.3+Math.min(.35,Math.max(0,Math.log10(i.massKg)/100)):.6;let S=e.editor.canStartGesture||M.captured||P.captured,T=k(i),E={...i.positionM,x:i.positionM.x+T};e.editor.tool===`position`&&(E=i.positionM),e.editor.tool===`velocity`&&(E=fg(i));let D=C(E);if(Object.values(D).every(e=>Number.isFinite(Math.fround(e)))){if(S&&e.editor.tool!==`mass`&&e.editor.tool!==`spin`){let t=w(E),o=w({...i.positionM,z:i.positionM.z+T});if(r(h,()=>n(e.editor.tool===`position`?`editor.moveHandle`:e.editor.tool===`radius`?`editor.radiusHandle`:`editor.velocityHandle`)),!e.editor.hasGesture){N(yg({x:o.x-t.x,y:o.y-t.y})),h.hidden=!1,g.hidden=e.editor.tool!==`position`;let n={width:e.host.clientWidth,height:e.host.clientHeight},r=F(),i=h.getBoundingClientRect(),a=g.getBoundingClientRect(),s=t.visible?xg(t,i,n,r):null;s&&r.push(bg(s,i)),y={handle:s,height:e.editor.tool===`position`&&t.visible?xg(o,a,n,r):null}}if(I(h,_,y?.handle??null,t),I(g,v,e.editor.tool===`position`?y?.height??null:null,o),a(h,`aria-label`,()=>h.textContent??``),e.editor.tool!==`position`){let t=D,n=new Q(t.x-s.x,t.y-s.y,t.z-s.z),r=n.length();if(r>0&&Number.isFinite(Math.fround(r))){u.position.set(s.x,s.y,s.z),u.setDirection(n.normalize());let i=_h(r,e.camera.position.distanceTo(new Q(t.x,t.y,t.z)),e.camera.fov,e.host.clientHeight);u.setLength(r,i.length,i.width),u.visible=!0}}}if(e.editor.candidate&&[`creating-preview`,`editing-new`].includes(e.editor.phase)){let t=rg(i.positionM,e.bodies(),i.id);if(t){H(p,d,i.positionM,t.body.positionM);let a=C(t.body.positionM),c=new Q().copy(s).lerp(a,.5).project(e.camera),l={x:(c.x+1)*e.host.clientWidth/2,y:(1-c.y)*e.host.clientHeight/2,visible:c.z>=-1&&c.z<=1&&Math.abs(c.x)<1&&Math.abs(c.y)<1},u=ig(t.distanceM);m.hidden=!l.visible,r(m,()=>n(`editor.distance`,{body:t.body.materialId===`procedural`?t.body.name:o(t.body.id),value:u.value.toFixed(1),unit:u.unit})),m.style.left=`${l.x}px`,m.style.top=`${l.y}px`}}}},dispose(){M.dispose(),P.dispose(),L(`disposed`),e.canvas.removeEventListener(`pointerdown`,ee),e.canvas.removeEventListener(`pointermove`,z),e.canvas.removeEventListener(`pointerup`,V),e.canvas.removeEventListener(`pointercancel`,B),e.canvas.removeEventListener(`blur`,B),i.dispose(),c.dispose(),d.dispose(),f.dispose(),u.dispose(),e.scene.remove(l,p,u),h.remove(),g.remove(),_.remove(),v.remove(),m.remove()}}}function wg(e,t,n,r){let i=Hu(r,n),a=new Q(i.x,i.y,i.z);e.position.sub(a),t.sub(a),e.updateMatrixWorld()}var Tg=class{camera;target;followId=`earth`;overview=!1;locked=null;lastCollisionId=0;lastRecoveryId;constructor(e,t){this.camera=e,this.target=t}creationTarget(e){let t=this.overview?`sun`:this.followId;return e.some(e=>e.id===t)?t:null}creationContext(e){return{referenceId:this.creationTarget(e),anchorId:this.overview?null:this.followId,planeZ:this.base(e).z}}base(e,t){return this.overview?{x:0,y:0,z:0}:t?.get(this.followId)??e.find(e=>e.id===this.followId)?.positionM??{x:0,y:0,z:0}}origin(e,t,n){let r=this.base(e,n);return t?(this.locked??={...r},this.locked):(this.release(e,n),r)}settle(e,t){t.outcome!==`rejected`&&this.release(e)}release(e,t){this.locked&&=(wg(this.camera,this.target,this.locked,this.base(e,t)),null)}reconcile(e,t,n){let r=n?.recoveryResult,i=!!r&&r.requestId!==this.lastRecoveryId&&r.outcome===`committed`,a=i&&r.operation===`delete`;if(r&&(this.lastRecoveryId=r.requestId),a){let e=t.some(e=>e.id===this.followId)?this.followId:t.find(e=>e.id===`earth`)?.id??t[0]?.id??``;return this.setView(e,!0),`deleted`}if(i&&!this.overview&&!t.some(e=>e.id===this.followId))return this.setView(t.find(e=>e.id===`earth`)?.id??t[0]?.id??``,!0),`missing`;let o=(n?.collisions??[]).filter(e=>e.id>this.lastCollisionId);if(this.lastCollisionId=Math.max(this.lastCollisionId,...o.map(e=>e.id)),t.some(e=>e.id===this.followId))return;let s=this.followId,c=0;for(let e of o)e.event.sourceIds.includes(s)&&(s=e.event.body.id,c=e.id);if(c&&n?.collisionContext?.activeEventIds.includes(c)&&t.some(e=>e.id===s)){this.followId=s,this.locked=null;return}let l=this.base(e);this.followId=t.find(e=>e.id===`earth`)?.id??t[0]?.id??``,t.length||(this.overview=!0),wg(this.camera,this.target,l,this.base(t))}setView(e,t=!1){this.followId=e,this.overview=t,this.locked=null}};function Eg(e,t){return t.theme===`cosmos`||e===t.candidateId?!0:t.overview?t.showOverviewNames:e===t.observedId}function Dg(e,t){let r=new Iu({antialias:!0,logarithmicDepthBuffer:!0}),i=t.profileContext?.(r.getContext());r.debug.checkShaderErrors=!1,r.toneMapping=4,r.toneMappingExposure=1.1;let s=new ld(e=>{let n=t.onTextureUploadMetrics?performance.now():0;if(r.initTexture(e),t.onTextureUploadMetrics){let r=e.image;t.onTextureUploadMetrics({width:r?.width??0,height:r?.height??0,cpuMs:performance.now()-n})}}),c=Xd(t.bodies,{prepareTexture:e=>s.prepare(e),...t.onSurfaceStatus?{onSurfaceStatus:t.onSurfaceStatus}:{}}),l=dh(e),u=Sh();c.scene.add(u.group);let d=xh();c.scene.add(d.line);let f=of();c.scene.add(f.mesh,f.well,f.relief);let p=0,m=null,h=!1,g=!1,_=t.bodies,v=null,y=null,b,x,S=`cosmos`,C=!0,w={gravity:`off`,axis:!1,names:!1,shadows:!0},T=null,E=null,D=new zo(qh(1,t.widePerspectivePreview),1,1e-5,5e3),O=D.clone();D.position.set(0,.03,.08);let k=r.domElement;k.className=`scene-canvas`,k.setAttribute(`role`,`img`),a(k,`aria-label`,()=>n(`scene.label`)),k.tabIndex=0,e.append(k);let A=mh(e);A.setEnabled(!0);let j=new Nh(D,k);j.enableDamping=!0,j.dampingFactor=.08,j.touches.ONE=q.ROTATE,j.touches.TWO=q.DOLLY_PAN,j.minDistance=.001,j.maxDistance=1500,j.listenToKeyEvents(k),j.update(),j.saveState();let M=new Tg(D,j.target),P=new Ku(D,j,t.innerSolarSystemPreview),F=()=>t.compressedOverview&&M.overview?zu(_):null,I=()=>Bu(_,F()),L=e=>{D.up.set(e&&t.compressedOverview?.2:0,1,0).normalize()},R=()=>(L(!0),P.frame(I(),t.overviewElevationDegrees)),ee=()=>M.origin(_,b?.holdsObservation??!1,y),z=uh(e),B=new lh,V=new Q,H=!1,te=()=>{let n=Kh(e.clientWidth,e.clientHeight,window.devicePixelRatio),i={aspect:D.aspect,fov:D.fov};r.setPixelRatio(hh(n.width,n.height,window.devicePixelRatio,window.matchMedia(`(pointer:coarse)`).matches)),r.setSize(n.width,n.height,!1),D.aspect=n.aspect,D.fov=qh(n.aspect,t.widePerspectivePreview),D.updateProjectionMatrix(),H&&M.overview&&!(b?.busy??!1)&&P.resize(I(),i),H=!0},U=new ResizeObserver(te);U.observe(e),window.addEventListener(`resize`,te),te(),pe();let ne=!1,W=!1,re=0,ie=!1,ae=new WeakSet,oe=new od(()=>{let e=re;return cd(r,c.scene,D,()=>!ie&&!ne&&e===re,ae,t.onPreparationMetrics)},e=>{console.error(e),t.onRenderFailure?.()}),se=()=>{ne=!1,W=!0;let e=++re;oe.invalidate(),c.prepareTextures().then(()=>{!ie&&e===re&&(W=!1,t.onContextRestored())},n=>{!ie&&e===re&&(console.error(n),t.onRenderFailure?.())})},ce=e=>{e.preventDefault(),ne=!0,re++,oe.invalidate(),A.canvas.hidden=!0,t.onContextLost()};k.addEventListener(`webglcontextlost`,ce),k.addEventListener(`webglcontextrestored`,se);let le=0,ue=!1,de=()=>Yu(r,c.scene,D,O,D.position.distanceTo(j.target));return r.setAnimationLoop(()=>{let n=t.onFrameMetrics?performance.now():0;j.update(),M.overview&&P.track(I(),b?.busy??!1);let i=ee(),a=F();D.updateMatrixWorld();let s=b?.candidate,w=s&&N([s]).ok?s:null,E=w?_.some(e=>e.id===w.id)?_.map(e=>e.id===w.id?w:e):[..._,w]:v??_;c.sync(E);let O=[],L=A.enabled?[]:null,R=w&&!_.some(e=>e.id===w.id)?w.id:l.id,B=null,H={theme:S,overview:M.overview,showOverviewNames:g,observedId:M.followId,candidateId:w?.id??null},te=[],U=null;for(let t of E){let n=c.meshes.get(t.id);if(!n)continue;let r=Hu(Vu(y?.get(t.id)??t.positionM,a),i);if(n.position.set(r.x,r.y,r.z),!Object.values(r).every(e=>Number.isFinite(Math.fround(e)))){n.visible=!1;continue}let s=n.material;s.transparent=t.id===w?.id,s.opacity=t.id===w?.id?.5:1;let l=Jh(t.id,e.clientWidth,e.clientHeight,M.overview),u=M.overview?D.position.distanceTo(j.target):D.position.distanceTo(n.position),d=Kd(t.radiusM,u,D.fov,e.clientHeight,l);if(!Number.isFinite(Math.fround(d))){n.visible=!1;continue}n.visible=!0,n.scale.setScalar(d);let f=d/(2*D.position.distanceTo(n.position)*Math.tan(D.fov*Math.PI/360))*e.clientHeight;V.copy(n.position).project(D),V.z>=-1&&V.z<=1&&Math.abs(V.x)<=1.2&&Math.abs(V.y)<=1.2&&c.requestSurface(t.id,f);let p=(V.x+1)*e.clientWidth/2;L&&Number.isFinite(f)&&f>0&&V.z>=-1&&V.z<=1&&Math.abs(V.x)<=1.5&&Math.abs(V.y)<=1.5&&L.push({x:p,y:(1-V.y)*e.clientHeight/2,radius:f,depth:V.z,kind:t.kind===`star`?`star`:t.kind===`terrestrial-planet`||t.kind===`gas-giant`||t.kind===`dwarf-planet`?`planet`:`other`,color:ph(t.materialId,t.kind)}),t.id===R&&V.z>=-1&&V.z<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1&&(B={id:t.id,x:p,y:(1-V.y)*e.clientHeight/2,radius:f,name:t.name}),t.id===b?.body?.id&&(U={id:t.id,x:p,y:(1-V.y)*e.clientHeight/2,radius:f,visible:V.z>=-1&&V.z<=1&&Math.abs(V.x)<=1&&Math.abs(V.y)<=1});let m=(1-V.y)*e.clientHeight/2+f*(c.rings.has(t.id)?Vd.outer:1)+8+(M.overview&&t.id===`moon`?16:0),h=!C||!Eg(t.id,H)||V.z>1||V.z<-1||Math.abs(V.x)>1||Math.abs(V.y)>1||te.some(e=>Math.abs(e.x-p)<42&&Math.abs(e.y-m)<18);h||te.push({x:p,y:m}),O.push({id:t.id,text:t.materialId===`procedural`?t.name:o(t.id),x:p,y:m,hidden:h,selected:b?.selectedId===t.id})}x?.update(C);let re=t.onFrameMetrics?performance.now():0;c.updateRotation(E,m??p,b?.selectedId??null,C&&(h||b?.tool===`spin`)),c.updateBackdrop(D,E);let ie=t.onFrameMetrics?performance.now():0,ae=(M.overview?void 0:E.find(e=>e.id===M.followId))??E.reduce((e,t)=>!e||t.massKg>e.massKg?t:e,void 0),se=Math.max(1e-12,Math.min(2e3,D.position.distanceTo(j.target)*Math.tan(D.fov*Math.PI/360)*2.2)),ce=Bu(E,a),fe=Math.max(10,...ce.map(e=>{let t=Hu(e.positionM,{x:0,y:0,z:0});return Math.hypot(t.x,t.y,t.z)}))*2.7,G=ae?Hu(ae.positionM,i).y:0;f.updateView(D.position,{x:j.target.x,y:G,z:j.target.z},Qd(se,fe)),f.update(ce,i,j.target,se,ae?.massKg??1,performance.now(),new Map([...c.meshes].map(([e,t])=>[e,t.scale.x])));let pe=t.onFrameMetrics?performance.now():0;u.update(_,i,D.position.distanceTo(j.target),C&&!y&&!(b?.busy??!1),T,a),d.update(_,i,D.position.distanceTo(j.target),C&&!y,a);let me=t.onFrameMetrics?performance.now():0,he=ad(c.scene),K=!ne&&!W&&oe.canRender(he);k.setAttribute(`aria-busy`,String(!K));let ge=!K&&!ne&&C&&!!B;l.update(ge?B:null),K?(de(),ue=!0,L&&(A.update(L,e.clientWidth,e.clientHeight,S),A.canvas.hidden=!1),z.publish(O),t.onBodyAnchor?.(U)):C||z.hide(),t.onFrameMetrics&&(t.onFrameMetrics({cpuMs:performance.now()-n,intervalMs:le?n-le:0,preparation:oe.diagnostics(he),prepared:K,candidateFallback:ge,bodies:E.length,geometries:r.info.memory.geometries,textures:r.info.memory.textures,programs:r.info.programs?.length??0,width:e.clientWidth,height:e.clientHeight,pixelRatio:r.getPixelRatio(),phases:{layoutMs:re-n,rotationMs:ie-re,gravityMs:pe-ie,pathsMs:me-pe,renderMs:performance.now()-me}}),le=n)}),{configuration(){let e=sh(D,j,M);return F()&&(e.distanceLayout=`compressed`),{theme:S,...w,orbits:!1,camera:e}},restoreCamera(e){B.clear(),L(e.overview),ch(D,j,M,e),e.overview&&!!F()!=(e.distanceLayout===`compressed`)?R():P.resetTracking(I())},setSceneReferences(e){e!==E&&(E=e,u.setResult(e))},setPrediction(e){e!==T&&(T=e,d.setResult(e))},setUIVisible(e){C=e,f.setMode(e?w.gravity:`off`),x?.update(e)},screenshot(){if(ie||ne||W||!ue||b?.busy||y||!oe.canRender(ad(c.scene)))return Promise.reject(Error(`No clean frame available`));let e=fh(k,[u.group,d.line,f.mesh,f.well,c.axis,...x?.sceneOverlays??[]],de,A.canvas.hidden?void 0:A.canvas);return de(),e},setTheme(e){S=e,u.setTheme(e===`cosmos`),d.setTheme(e===`cosmos`),c.setTheme(e),f.setTheme(e===`cosmos`),x?.setTheme(e)},setDisplay(e,t,n=!1,r=!0){w={gravity:e,axis:t,names:n,shadows:r},f.setMode(C?e:`off`),h=t,g=n,f.setRelief(r)},retryTextures(){c.retryTextures()},refreshEditor(){x?.update(C)},attachEditor(n){b=n,x=Cg({host:e,canvas:k,camera:D,scene:c.scene,editor:n,bodies:()=>_,origin:ee,distanceCenter:F,creationContext:()=>M.creationContext(_),meshes:()=>[...c.meshes.values()].filter(e=>_.some(t=>t.id===e.userData.bodyId)),onBodyClick:e=>{fe(e)&&t.onUserViewChange?.()},onEmptyClick:()=>{M.overview||(G(),t.onUserViewChange?.())},onPositionDrag:()=>{M.overview||(B.clear(),M.setView(M.followId,!0),R(),j.update())}}),x.setTheme(S)},beginCreation(e,t){x?.beginCreation(e,t)},focusBody:fe,settleMutation(e){M.settle(_,e),j.update()},showOverview:pe,update(e,t,n=p){let r=M.overview,i=M.reconcile(_,e,t);_=e,i===`deleted`?r?(B.clear(),P.track(I(),!0)):G():i===`missing`&&(B.clear(),pe()),p=n,y=null,v=null,m=null},previewPositions(e,t,n=p){v=t??null,y=new Map(e.map(e=>[e.id,e.positionM])),m=n},dispose(){ie||(ie=!0,x?.dispose(),oe.dispose(),s.dispose(),r.setAnimationLoop(null),U.disconnect(),window.removeEventListener(`resize`,te),k.removeEventListener(`webglcontextlost`,ce),k.removeEventListener(`webglcontextrestored`,se),j.dispose(),u.dispose(),d.dispose(),f.dispose(),l.dispose(),c.dispose(),z.dispose(),A.dispose(),r.dispose(),r.forceContextLoss(),i?.(),k.remove())}};function fe(e){if(b?.busy)return;let t=_.find(t=>t.id===e);if(!t)return;let n=M.overview||M.followId!==e,r=sh(D,j,M);if(qu(D,j,t.radiusM,c.rings.has(e)?Vd.outer:1))return B.remember(e,r),M.setView(e),L(!1),j.update(),n}function G(){if(b?.busy)return;let e=B.take(_);e?(L(e.overview),ch(D,j,M,e),P.resetTracking(I())):pe()}function pe(){b?.busy||(B.clear(),M.setView(M.followId,!0),R(),b?.select(null))}}function Og(e){let t=document.createElement(`main`);t.className=`app-shell`;let i=document.createElement(`div`);i.className=`scene-host`;let a=document.createElement(`header`);a.className=`scene-heading`;let o=document.createElement(`h1`);r(o,()=>n(`app.title`));let s=document.createElement(`p`);r(s,()=>n(`app.stage`,{count:`—`})),a.append(o,s);let c=document.createElement(`p`);c.className=`scene-origin`,r(c,()=>n(`time.origin`)),a.append(c);let l=document.createElement(`p`);return l.className=`scene-status`,l.setAttribute(`role`,`alert`),l.hidden=!0,t.append(i,a,l),e.append(t),{sceneHost:i,controlsHost:t,updateBodyCount(e){r(s,()=>n(`app.stage`,{count:e}))},showError(e){r(l,()=>typeof e==`function`?e():e),l.hidden=!1},clearError(){l.hidden=!0,r(l,()=>``)},dispose(){t.remove()}}}function kg(e){let t=document.createElement(`button`);t.type=`button`,t.className=`diagnostic-export`,t.hidden=!0,r(t,()=>n(`risk.exportDiagnostic`)),e.append(t);let i=null;return t.onclick=()=>{if(!i?.diagnostic)return;let t=URL.createObjectURL(new Blob([JSON.stringify({epoch:le,...i},null,2)],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`planet-failure-diagnostic.json`,n.click(),URL.revokeObjectURL(t),p(e,`ready`)},{update(e){i=e??null,t.hidden=!i?.diagnostic}}}function Ag(e,t){if(!e||e.schemaVersion!==1||!t(e.before)||e.outerStepSeconds!==e.before.config.timeStepSeconds||![`play`,`jump`].includes(e.operation)||!e.work)return!1;let n=e.work;return Number.isFinite(n.wallMs)&&n.wallMs>=0&&Number.isFinite(n.localBudgetMs)&&n.localBudgetMs>0&&(n.localBudgetElapsedMs===null||Number.isFinite(n.localBudgetElapsedMs)&&n.localBudgetElapsedMs>=0)&&(n.rounds===void 0||Number.isSafeInteger(n.rounds)&&n.rounds>=1)&&(n.activeComputeMs===void 0||Number.isFinite(n.activeComputeMs)&&n.activeComputeMs>=0)&&[n.attempts,n.evaluationsUsed].every(e=>Number.isSafeInteger(e)&&e>=0)&&[n.attemptLimit,n.evaluationLimit].every(e=>Number.isSafeInteger(e)&&e>0)}function jg(e,t,n){return!!e&&Number.isSafeInteger(e.revision)&&e.revision>=0&&Array.isArray(e.activeEventIds)&&e.activeEventIds.length<=100&&new Set(e.activeEventIds).size===e.activeEventIds.length&&e.activeEventIds.every(e=>Number.isSafeInteger(e)&&t.some(t=>t.id===e&&n.bodies.some(e=>e.id===t.event.body.id&&e.massKg===t.event.body.massKg&&e.radiusM===t.event.body.radiusM&&e.kind===t.event.body.kind)))&&new Set(e.activeEventIds.map(e=>t.find(t=>t.id===e).event.body.id)).size===e.activeEventIds.length}function Mg(e,t){let n=e.collisions?.find(e=>e.id===t)?.event;return n&&e.collisionContext?.activeEventIds.includes(t)&&e.state.bodies.some(e=>e.id===n.body.id)?n.body.id:null}var Ng=[`solar`,`earth`,`moon`,`kg`,`tonne`],Pg=Object.freeze({solar:ce.bodies.find(e=>e.id===`sun`).massKg,earth:ce.bodies.find(e=>e.id===`earth`).massKg,moon:ce.bodies.find(e=>e.id===`moon`).massKg,kg:1,tonne:1e3});function Fg(e,t){let n=e*Pg[t];return e>0&&Number.isFinite(e)&&n>0&&Number.isFinite(n)?n:null}function Ig(e,t){let n=e/Pg[t];return e>0&&Number.isFinite(e)&&n>0&&Number.isFinite(n)?n:null}function Lg(e){return e>=.1*Pg.solar?`solar`:e>=.1*Pg.earth?`earth`:e>=.01*Pg.moon?`moon`:e>=1e6?`tonne`:`kg`}var Rg=Pg.earth,zg=Pg.moon,Bg={"zh-CN":new Intl.NumberFormat(`zh-CN`,{maximumSignificantDigits:3}),"en-US":new Intl.NumberFormat(`en-US`,{maximumSignificantDigits:3})},Vg={"zh-CN":new Intl.NumberFormat(`zh-CN`,{notation:`compact`,maximumSignificantDigits:3}),"en-US":new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumSignificantDigits:3})};function Hg(e){return e>=Pg.solar*.1?n(`collision.solarMass`,{value:Bg[t()].format(e/Pg.solar)}):e>=Rg*.1?n(`collision.earthMass`,{value:Bg[t()].format(e/Rg)}):e>=zg*.1?n(`collision.moonMass`,{value:Bg[t()].format(e/zg)}):e>=zg*1e-5?n(`collision.moonPercent`,{value:Bg[t()].format(100*e/zg)}):e>=1e3?n(`collision.tonnes`,{value:Vg[t()].format(e/1e3)}):n(`collision.kg`,{value:Bg[t()].format(e)})}function Ug(e,t){return t===e&&o(e)!==n(`body.unknown`)?o(e):t}function Wg(e){let r=Ug(e.body.id,e.body.name);return n(`collision.summary`,{names:e.sourceIds.map((t,n)=>Ug(t,e.sourceNames[n])).join(t()===`en-US`?`, `:`、`),result:r,added:Hg(e.addedMassKg),total:Hg(e.body.massKg)})}function Gg(e,t,i=e){let a=document.createElement(`button`),o=document.createElement(`button`);a.type=o.type=`button`,a.disabled=o.disabled=!0,r(a,()=>n(`history.undo`)),r(o,()=>n(`history.redo`)),a.onclick=()=>{y(),t.undo?.()},o.onclick=()=>{y(),t.redo?.()};let c=document.createElement(`button`);c.type=`button`,c.hidden=!0,r(c,()=>n(`history.experiment`)),c.onclick=()=>{y(),t.experiment?.()},i.append(c);let l=document.createElement(`p`);l.className=`jump-details`,l.hidden=!0,r(l,()=>n(`history.experimentNote`));let u=document.createElement(`p`);u.className=`recovery-feedback`,u.setAttribute(`role`,`status`);let d=document.createElement(`p`);d.className=`collision-notice`,d.setAttribute(`role`,`status`);let f=document.createElement(`button`);f.type=`button`,r(f,()=>n(`collision.inspect`)),f.className=`collision-inspect`;let m=document.createElement(`p`);m.className=`collision-applicability`;let h=document.createElement(`div`);h.className=`collision-actions`,h.append(f,m),e.append(u,d,h),i.append(l);let g=-1,_=!1,v,y=()=>{r(u,()=>``),u.hidden=!0};return{undo:a,redo:o,clearFeedback:y,update(i,b){let S=i?.history;a.disabled=b||!S?.undo,o.disabled=b||!S?.redo,c.hidden=!S?.experimentStart,c.disabled=b||!S?.experimentStart,l.hidden=c.hidden,s(c,`title`,()=>S?.experimentStart?n(`history.experimentHint`,{date:x(S.experimentStart.timeSeconds)}):``);let C=i?.recoveryResult;if(C&&C.requestId!==v&&(v=C.requestId,C.outcome===`committed`?y():r(u,()=>n(C.error===`EDITOR_BUSY`?`history.busy`:C.error===`STALE_EDIT`?`history.stale`:C.error===`BODY_NOT_FOUND`?`history.missing`:`history.rejected`))),u.hidden=!u.textContent,i&&(i.collisionContext?.revision??0)>=g){g=i.collisionContext?.revision??0;let a=i.collisions?.at(-1),o=a?.event,s=!!a&&Mg(i,a.id)!==null;r(d,()=>o?n(s?o.kind===`absorption`?`collision.currentAbsorption`:`collision.current`:`collision.historical`,{date:x(o.timeSeconds)})+` `+Wg(o):``),d.hidden=h.hidden=f.hidden=m.hidden=!o,r(m,()=>o&&!s?n(`collision.inactive`):``),m.hidden=!m.textContent,_=s,f.onclick=()=>{!f.disabled&&a&&t.collisionResult&&(t.collisionResult(a.id),p(e,`bloom`))}}f.disabled=b||!_}}}function Kg(e,r){let i=e.bodyIds.map(e=>{let t=r.find(t=>t.id===e);return t?.materialId===`procedural`?t.name:o(e)}).join(t()===`en-US`?`, `:`、`),a=e.code===`INVALID_INPUT`?`risk.input`:e.code===`COLLISION_BUDGET`?`risk.collisionBudget`:e.code===`COINCIDENT_BODIES`||e.code===`PHYSICAL_OVERLAP`?`risk.overlap`:e.code===`UNSAFE_TIMESTEP`?`risk.step`:e.code===`NON_FINITE_CALCULATION`?`risk.nonFinite`:`risk.range`;return n(a,{bodies:i||n(`risk.system`)})}function qg(e,t){if(!Number.isFinite(e))return``;let n=Number(e.toFixed(t));return e!==0&&n===0||Math.abs(e)>=1e21?e.toExponential(4):String(n)}function Jg(e){let t=qg(e,2),n=t.includes(`e`)?e.toExponential(2):t;return Number.isFinite(Number(n))?n:String(e)}var Yg={"zh-CN":new Intl.NumberFormat(`zh-CN`,{maximumFractionDigits:2}),"en-US":new Intl.NumberFormat(`en-US`,{maximumFractionDigits:2})},Xg=e=>Yg[t()].format(e);function Zg(e,t,i){let o=document.createElement(`div`);o.className=`speed-steps`,o.setAttribute(`role`,`group`),a(o,`aria-label`,()=>n(`time.speedLevels`));let s=document.createElement(`span`);s.className=`speed-track`,s.setAttribute(`aria-hidden`,`true`),o.append(s);let c=document.createElement(`span`);c.className=`speed-fill`,s.append(c);let l=document.createElement(`span`);l.className=`speed-thumb`,s.append(l);let u=new Map,d=null,f=(n,r=!0)=>{e.disabled||(e.value!==String(n)&&(e.value=String(n),t(n),r&&i?.()),_())},p=null;for(let t of[1,2,3,4,5]){let r=document.createElement(`button`);r.type=`button`,r.className=`speed-step`,a(r,`aria-label`,()=>n(`time.speed${t}`));let i=document.createElement(`span`);i.className=`speed-dot`,i.setAttribute(`aria-hidden`,`true`),r.append(i),r.onclick=()=>f(t),r.onkeydown=n=>{let r=n.key===`Home`?1:n.key===`End`?5:[`ArrowRight`,`ArrowUp`].includes(n.key)?Math.min(5,t+1):[`ArrowLeft`,`ArrowDown`].includes(n.key)?Math.max(1,t-1):null;r!==null&&(n.preventDefault(),p??=e.value,f(r,!1),u.get(r).focus())},u.set(t,r),o.append(r)}o.onkeyup=t=>{p!==null&&[`Home`,`End`,`ArrowRight`,`ArrowUp`,`ArrowLeft`,`ArrowDown`].includes(t.key)&&(p!==e.value&&i?.(),p=null)},o.addEventListener(`focusout`,e=>{p!==null&&!o.contains(e.relatedTarget)&&(p=null)});let m=document.createElement(`span`);m.className=`speed-current`,o.append(m);let h=e=>{let t=o.getBoundingClientRect(),n=(e-t.left)/Math.max(1,t.width)*100;return{index:Math.max(1,Math.min(5,Math.floor(n/20)+1)),position:Math.max(10,Math.min(90,n))}};o.onpointerdown=t=>{if(!(t.button!==0||e.disabled||d||t.target===o||t.target===m)){t.preventDefault();for(let e of u.values())e.blur?.();d={id:t.pointerId,...h(t.clientX)},o.setPointerCapture(t.pointerId),_()}},o.onpointermove=e=>{d?.id===e.pointerId&&(Object.assign(d,h(e.clientX)),_())};let g=()=>{if(!d)return;let e=d.id;d=null,o.hasPointerCapture(e)&&o.releasePointerCapture(e),_()};o.onpointerup=e=>{if(d?.id!==e.pointerId)return;let{index:t}=h(e.clientX);g(),f(t)},o.onpointercancel=e=>{d?.id===e.pointerId&&g()},o.onlostpointercapture=e=>{e.target===o&&d?.id===e.pointerId&&g()};function _(){e.disabled&&(d=null);let t=d?.index??Number(e.value),i=t>=1?(t-.5)*20:10;o.dataset.dragging=String(!!d),o.style.setProperty(`--speed-drag-position`,`${d?.position??i}%`),o.dataset.realtime=String(t===0),o.dataset.last=String(t===5),o.style.setProperty(`--speed-position`,`${i}%`),o.style.setProperty(`--speed-fill-end`,`${Math.max(0,t)*20}%`),o.dataset.disabled=String(e.disabled);for(let[t,n]of u)n.disabled=e.disabled,n.setAttribute(`aria-pressed`,String(t===Number(e.value))),n.tabIndex=t===Number(e.value)||Number(e.value)===0&&t===1?0:-1;r(m,()=>n(`time.speedShort${t}`))}return _(),{element:o,sync:_}}function Qg(e,t){let r=document.createElement(`div`);r.className=`rolling-counter`;let i=document.createElement(`span`);i.className=`rolling-window`;let o=document.createElement(`span`);o.className=`rolling-digits`,o.setAttribute(`aria-hidden`,`true`);let s=document.createElement(`span`);s.className=`rolling-decimal`;let c=Array.from({length:4},(e,t)=>{let n=document.createElement(`span`);n.className=`rolling-column`;let r=document.createElement(`span`);r.className=`rolling-strip`;for(let e of`01234567890`){let t=document.createElement(`span`);t.textContent=e,r.append(t)}return n.append(r),o.append(n),{column:n,strip:r,place:3-t,position:0,velocity:0,target:0,next:0,due:0}});o.append(s),i.append(o,e);let l=e=>{let t=document.createElement(`button`);return t.type=`button`,t.className=`rolling-key`,t.textContent=e<0?`−`:`+`,a(t,`aria-label`,()=>n(e<0?`time.fewerDays`:`time.moreDays`)),t},u=l(-1),d=l(1);r.append(u,i,d);let f=``,p=0,m=0,h,g=()=>globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1;function _(){for(let e of c){let t=(e.position%10+10)%10;e.strip.style.transform=`translateY(calc(${-t} * var(--rolling-cell)))`;let n=Math.min(1.5,Math.abs(e.velocity)*1.2);e.strip.style.filter=n>.15?`blur(${n.toFixed(2)}px)`:``}}function v(){if(p)return;let e=0,t=n=>{let r=e?Math.min(2.5,(n-e)/16.67):1;e=n;let i=!1;for(let e of c){e.due&&(n>=e.due||g())&&(e.target=e.next,e.due=0);let t=e.target-e.position;Math.abs(t)>24&&(e.position+=Math.round((t-Math.sign(t)*24)/10)*10),e.velocity=(e.velocity+(e.target-e.position)*.152*r)*.71**r,e.position+=e.velocity*r,g()||Math.abs(e.target-e.position)<.004&&Math.abs(e.velocity)<.004?(e.position=e.target,e.velocity=0):i=!0,i||=e.due!==0}_(),p=i?requestAnimationFrame(t):0};p=requestAnimationFrame(t)}function y(){clearTimeout(h),h=void 0}function b(){m&&cancelAnimationFrame(m),m=0}function x(){u.disabled=d.disabled=e.disabled,e.disabled&&(y(),b());let t=e.value;if(t===f)return;let n=/^(\d{1,4})(\.\d+)?$/.exec(t),i=n?.[1]??``,a=!!f&&!!n&&eh(e)&&typeof requestAnimationFrame==`function`;f=t;for(let e of c){e.column.dataset.on=String(e.place<i.length);let t=Math.floor(Number(i)/10**e.place);a&&e.next!==t?(e.next=t,e.due=performance.now()+e.place*45):a||(e.next=e.target=e.position=t,e.velocity=e.due=0)}s.textContent=n?n[2]??``:t||`–`,r.style.setProperty(`--rolling-width`,String(Math.max(2,Math.min(8,t.length)))),a?v():(p&&cancelAnimationFrame(p),p=0,_())}function S(t){if(e.disabled)return!1;let n=e.value,r=e.valueAsNumber,i=Number(((Number.isFinite(r)?r:0)+t).toPrecision(12));return e.value=String(Math.min(Number(e.max),Math.max(Number(e.min),i))),e.value!==n&&(e.dispatchEvent(new Event(`input`,{bubbles:!0})),!0)}for(let[n,r]of[[u,-1],[d,1]]){let i=!1;n.onpointerdown=n=>{if(n.button!==0||e.disabled)return;b(),y(),i=!1;let a=performance.now(),o=()=>{if(e.disabled)return;i=!0;let n=performance.now()-a;S(r*(n>1500?10:1))&&t?.(),h=setTimeout(o,n>900?55:90)};h=setTimeout(o,380)},n.onpointerup=n.onpointerleave=n.onpointercancel=n.onblur=y,n.onclick=e=>{y(),b(),(e.detail===0||!i)&&S(r)&&t?.(),i=!1}}let C=null,w=!1;function T(e){let t=Math.trunc(e/12);return t&&S(t),e-t*12}return e.onpointerdown=t=>{t.button===0&&t.isPrimary&&(b(),w=!1,C={id:t.pointerId,y:t.clientY,remainder:0,velocity:0,time:performance.now(),active:!1,startValue:e.value})},e.onpointermove=t=>{if(!C||C.id!==t.pointerId||!t.buttons||e.disabled)return;let n=C.y-t.clientY;if(!C.active&&Math.abs(n)<12)return;C.active||(e.setPointerCapture(t.pointerId),e.blur(),C.active=w=!0),t.preventDefault();let r=performance.now();C.velocity=.6*C.velocity+.4*n/Math.max(1,r-C.time),C.y=t.clientY,C.time=r,C.remainder=T(C.remainder+n)},e.onpointerup=n=>{if(C?.id!==n.pointerId)return;let r=C;if(C=null,r.active&&e.value!==r.startValue&&t?.(),!r.active||g()||performance.now()-r.time>90)return;let i=Math.max(-48,Math.min(48,r.velocity*16.67)),a=r.remainder;if(Math.abs(i)<2)return;let o=()=>{a=T(a+i),i*=.94,m=Math.abs(i)>.4&&!e.disabled?requestAnimationFrame(o):0};m=requestAnimationFrame(o)},e.onpointercancel=e.onlostpointercapture=()=>{C=null},e.addEventListener(`click`,e=>{w&&e.detail!==0?(e.preventDefault(),e.stopImmediatePropagation()):b(),w=!1},!0),{element:r,sync:x,dispose(){y(),b(),p&&cancelAnimationFrame(p)}}}var $g=1;function e_(e,t){let i=document.createElement(`section`);i.className=`time-controls`;let o=document.createElement(`p`);o.className=`simulation-date`,r(o,()=>n(`time.current`,{date:x(0)})),a(o,`aria-label`,()=>n(`time.dateLabel`));let c=document.createElement(`div`);c.className=`time-row`;let l=e=>{let t=document.createElement(`button`);return t.type=`button`,r(t,()=>n(e)),t},u=e=>e>=86400?n(`time.durationDays`,{value:Xg(e/86400)}):e>=3600?n(`time.durationHours`,{value:qg(e/3600,3)}):n(`time.durationSeconds`,{value:e}),d=l(`time.pause`);d.disabled=!0,nd(d,()=>n(`time.pause`),`pause`),d.className+=` time-play`;let f=document.createElement(`select`);a(f,`aria-label`,()=>n(`time.speed`)),f.disabled=!0,h.forEach((e,t)=>{let i=document.createElement(`option`);i.value=String(t),r(i,()=>n(`time.speed${t}`)),f.append(i)}),f.value=`2`;let m=Zg(f,e=>U(()=>t.speed(e)),()=>p(e,`time-rate`)),g=l(`time.startJump`);g.type=`submit`,nd(g,()=>n(`time.startJump`),`jump`),g.className+=` time-jump-start`;let _=document.createElement(`form`);_.className=`jump-form`,_.noValidate=!0;let b=document.createElement(`input`);b.type=`number`,b.min=String($g),b.step=`any`,b.value=`15`,b.required=!0;let S=Qg(b,()=>p(e,`counter-step`)),C=document.createElement(`span`);C.className=`jump-unit`,r(C,()=>n(`time.unitDays`));let w=document.createElement(`p`);w.id=`jump-limit`,w.hidden=!0;let T=document.createElement(`p`);T.className=`jump-details`,T.id=`jump-validation`,T.setAttribute(`role`,`alert`),b.setAttribute(`aria-describedby`,`jump-limit jump-validation`),a(b,`aria-label`,()=>n(`time.days`));let E=l(`time.resumeJump`);E.hidden=!0;let D=l(`time.adoptJump`);D.hidden=!0,_.append(g,S.element,C);let O=document.createElement(`div`);O.className=`jump-progress`,O.hidden=!0,O.append(E,D);let k=document.createElement(`p`);k.className=`time-notice`,k.setAttribute(`role`,`status`),r(k,()=>n(`time.loading`));let A=document.createElement(`div`);A.className=`time-row`,A.hidden=!0;let j=l(`time.resumeLocal`),M=l(`time.cancelLocal`);A.append(j,M);let N=document.createElement(`div`);N.className=`time-row time-recovery-actions`,N.hidden=!0,i.append(c,m.element,o,w,T,O,k,A,N);let P=kg(i),F=Gg(i,t,N);nd(F.undo,()=>n(`history.undo`),`undo`),F.undo.className+=` time-undo`,nd(F.redo,()=>n(`history.redo`),`redo`),c.replaceChildren(F.undo,d,_,F.redo),e.append(i);let I,L=!1,R=0,ee=!1,z=!1,B=()=>!L&&(!!I?.jump||!!t.jumpPending?.()),V=()=>{E.disabled=D.disabled=L||ee,j.disabled=M.disabled=L||ee,d.disabled=!L&&(ee||B()||!!I?.localStep||I?.physicsIssue?.scope===`live`&&!I.edit),f.disabled=L||ee||B()||!!I?.localStep,m.sync(),b.disabled=L||ee||z||!!I?.localStep||B(),F.update(I,L||ee||z||B()||!!I?.edit||!!I?.localStep),F.redo.hidden=!I?.history?.redo,H()},H=()=>{let e=I?.state.config.timeStepSeconds??300,t=v(e);b.max=String(t.max),S.sync(),r(w,()=>n(`time.jumpLimitBrief`,{days:Xg(t.max)})),s(b,`title`,()=>n(`time.exactRange`,{minimum:b.min,maximum:b.max,unit:n(`time.unitDays`)})),a(b,`aria-label`,()=>n(`time.days`));let i=b.valueAsNumber,o=i<$g?{ok:!1,error:`INVALID_DURATION`}:y(i,e),c=Number.isFinite(b.valueAsNumber)&&b.valueAsNumber>0?qg(b.valueAsNumber,2):`–`,l=B();return g.dataset.cancelling!==String(l)&&(g.dataset.cancelling=String(l),nd(g,()=>n(l?`time.cancel`:`time.startJump`),l?`cancelJump`:`jump`)),s(g,`title`,()=>l?``:n(`time.jumpDuration`,{amount:c,unit:n(`time.unitDays`)})),a(g,`aria-description`,()=>l?``:g.title),r(T,()=>o.ok?n(`time.roundedJumpBrief`,{duration:u(o.seconds)}):o.error===`STEP_BUDGET`?n(`time.jumpUnitLimit`,{amount:qg(t.max,2),unit:n(`time.unitDays`)}):n(`time.invalid`)),s(T,`title`,()=>o.ok?n(`time.roundedJump`,{steps:o.steps,seconds:o.seconds}):b.title),T.hidden=o.ok,b.setAttribute(`aria-invalid`,String(!o.ok)),g.disabled=l?ee||!!I?.jump?.ready:L||ee||z||I?.physicsIssue?.scope===`live`||!!I?.localStep||!o.ok,o};b.oninput=()=>{let t=!T.hidden;!H().ok&&!t&&p(e,`error`)},H();let te=b.value;b.onfocus=()=>{te=b.value},b.onkeydown=t=>{t.key===`Enter`&&(t.preventDefault(),b.value!==te&&H().ok&&p(e,`counter-step`),b.blur())};let U=e=>{F.clearFeedback(),e()};return d.onclick=()=>U(()=>t.play(L||I?.error&&I.physicsIssue?.scope!==`live`?!0:!I?.playing)),f.onchange=()=>{m.sync(),U(()=>{t.speed(Number(f.value)),p(e,`time-rate`)})},b.onclick=()=>{F.clearFeedback(),b.select?.()},g.onclick=e=>{B()&&(e.preventDefault(),g.disabled||U(t.cancel))},_.onsubmit=e=>{if(e.preventDefault(),B())return;let n=H();n.ok&&!g.disabled&&(r(k,()=>``),U(()=>t.jump(n.seconds)),V())},E.onclick=()=>U(()=>{t.resume(),p(e,`toggle`)}),D.onclick=()=>U(t.adopt),j.onclick=()=>U(()=>{t.resumeLocal?.(),p(e,`toggle`)}),M.onclick=()=>U(()=>{t.cancelLocal?.(),p(e,`droplet`)}),{setEditorBusy(e){e&&!z&&F.clearFeedback(),z=e,V(),H()},setOperationPending(e){e&&!ee&&F.clearFeedback(),ee=e,V()},update(e){I=e,L=!1,P.update(e.physicsIssue),r(o,()=>n(`time.current`,{date:x(e.state.elapsedSeconds)})),i.dataset.elapsedSeconds=String(e.state.elapsedSeconds),i.dataset.stateVersion=String(e.version),i.dataset.bodyCount=String(e.state.bodies.length),i.dataset.editId=e.edit?.editId??``,i.dataset.computeSteps=String(e.stats.steps),i.dataset.computeMs=String(e.stats.computeMs),i.dataset.maxBatchMs=String(e.stats.maxBatchMs),i.dataset.updates=String(++R),i.dataset.batches=String(e.stats.batches),i.dataset.batchWaitMs=String(e.stats.batchWaitMs),i.dataset.maxBatchWaitMs=String(e.stats.maxBatchWaitMs),i.dataset.lastJump=JSON.stringify(e.stats.lastJump??null);for(let[t,n]of Object.entries(e.stats.transport??{}))i.dataset[t]=String(n);let t=e.physicsIssue?.scope===`live`;i.dataset.physicsBlocked=String(t),d.disabled=!!e.jump||!!e.localStep||t&&!e.edit,f.disabled=!!e.jump||!!e.localStep,nd(d,()=>n(t&&!e.edit?`risk.paused`:e.error&&!t?`time.continue`:e.playing?`time.pause`:`time.play`),e.error&&!t?`restart`:e.playing&&!t?`pause`:`play`),f.value=String(e.speedIndex),i.dataset.actualSpeed=String(e.actualSpeed);let a=e.jump,s=e.localStep,c=a?.phase===`budget-paused`?null:s;i.dataset.localPhase=s?.phase??``,i.dataset.localRound=String(s?.round??0),i.dataset.localAttempts=String(s?.work.attempts??0),i.dataset.localEvaluations=String(s?.work.evaluationsUsed??0),j.hidden=c?.phase!==`budget-paused`,M.hidden=!c||!!a,A.hidden=j.hidden&&M.hidden,i.dataset.jobPhase=a?.phase??``,i.dataset.jobCompleted=String(a?.completedSteps??0),i.dataset.jobTotal=String(a?.totalSteps??0),i.dataset.jobRound=String(a?.round??0),i.dataset.jobWallMs=String(a?.wallMs??0),i.dataset.jobComputeMs=String(a?.computeMs??0),i.dataset.jobWaitingMs=String(a?.waitingMs??0),E.hidden=a?.phase!==`budget-paused`,D.hidden=a?.phase!==`budget-paused`||a.completedSteps<1,O.hidden=E.hidden&&D.hidden,V(),N.hidden=!e.history?.experimentStart,r(k,()=>c?n(c.phase===`budget-paused`?`time.localPaused`:`time.localComputing`,{round:c.round,attempts:c.work.attempts,limit:c.work.attemptLimit}):e.physicsIssue?(e.physicsIssue.scope===`jump`?n(`risk.jumpStopped`):n(`risk.liveStopped`))+Kg(e.physicsIssue.error,e.state.bodies)+n(e.physicsIssue.error.code===`COLLISION_BUDGET`?`risk.budgetAdjust`:e.physicsIssue.scope===`jump`?`risk.jumpAdjust`:`risk.adjust`)+(e.history?.experimentStart?n(`risk.experimentAvailable`):``)+(e.history?.undo?n(`risk.undoAvailable`):``)+(e.history?.checkpoints.length?n(`risk.checkpointAvailable`):``):e.error?n(e.error===`STEP_BUDGET`?`time.stepBudget`:e.error===`COMMIT_TIMEOUT`?`time.commitTimeout`:e.error===`TIME_BUDGET`?`time.wallBudget`:e.error===`INVALID_DURATION`?`time.invalid`:`time.physicsError`):a?.ready?n(`time.ready`):a?.phase===`budget-paused`?n(a.completedSteps>0?`time.budgetPaused`:`time.budgetPausedEmpty`):!e.playing&&e.recovery&&e.stats.lastJump?.outcome===`adopted`&&e.state.elapsedSeconds===e.stats.lastJump.actualSeconds?n(`time.adopted`,{date:x(e.stats.lastJump.actualSeconds)}):e.limited?n(`time.limited`):``)},updatePreview(e){i.dataset.previewSeconds=e?String(e.elapsedSeconds):``},fail(){L=!0,d.disabled=!1,nd(d,()=>n(`time.continue`),`restart`),f.disabled=!0,m.sync(),g.disabled=!0,O.hidden=!0,E.hidden=!0,D.hidden=!0,A.hidden=!0,r(k,()=>n(`time.workerError`)),V()},dispose(){S.dispose(),i.remove()}}}function t_(e,t){return!!e&&Array.isArray(e.undo)&&e.undo.length<=30&&Array.isArray(e.redo)&&e.redo.length<=30&&Array.isArray(e.checkpoints)&&e.checkpoints.length<=10&&Number.isSafeInteger(e.serial)&&e.serial>=0&&Number.isSafeInteger(e.revision)&&e.revision>=0&&[...e.undo,...e.redo,...e.checkpoints].every(e=>!!e&&[`create`,`edit`,`delete`,`restore`,`jump`].includes(e.label)&&t(e.state))&&e.checkpoints.every((t,n)=>Number.isSafeInteger(t.id)&&t.id>0&&t.id<=e.serial&&(n===0||t.id>e.checkpoints[n-1].id))&&(e.experimentStart===void 0||t(e.experimentStart))}function n_(e){return!!e&&e.schemaVersion===1&&Number.isFinite(e.elapsedSeconds)&&e.elapsedSeconds>=0&&!!e.config&&z(e.bodies,e.config.timeStepSeconds).ok}function r_(e,t){return!!e&&typeof e.taskId==`string`&&Number.isSafeInteger(e.baseVersion)&&e.baseVersion===t.version&&Number.isSafeInteger(e.completedSteps)&&Number.isSafeInteger(e.totalSteps)&&e.totalSteps>0&&e.totalSteps<=1e6&&e.completedSteps>=0&&e.completedSteps<=e.totalSteps&&Number.isSafeInteger(e.round)&&e.round>=1&&[`computing`,`budget-paused`,`ready`].includes(e.phase)&&e.ready===(e.phase===`ready`)&&(e.phase!==`ready`||e.completedSteps===e.totalSteps)&&e.candidateSeconds===t.state.elapsedSeconds+e.completedSteps*t.state.config.timeStepSeconds&&e.targetSeconds===t.state.elapsedSeconds+e.totalSteps*t.state.config.timeStepSeconds&&[e.candidateSeconds,e.targetSeconds,e.computeMs,e.wallMs,e.waitingMs].every(e=>Number.isFinite(e)&&e>=0)&&(e.stepsPerSecond===null||Number.isFinite(e.stepsPerSecond)&&e.stepsPerSecond>0)&&(e.remainingSeconds===null||Number.isFinite(e.remainingSeconds)&&e.remainingSeconds>=0)}function i_(e,t,n){let r=e.bodies??n.state.bodies;return e.bodies&&!n_({...n.state,bodies:e.bodies})?!1:e.taskId===t.taskId&&e.baseVersion===t.baseVersion&&e.completedSteps===t.completedSteps&&e.elapsedSeconds===t.candidateSeconds&&Array.isArray(e.positions)&&e.positions.length===r.length&&e.positions.every((e,t)=>e.id===r[t].id&&A(e.positionM))}function a_(e){let t=e.localStep;if(!t)return!0;let n=t.work;return typeof t.taskId==`string`&&!!t.taskId&&t.baseVersion===e.version&&[`play`,`jump`].includes(t.operation)&&[`computing`,`budget-paused`].includes(t.phase)&&(t.operation!==`jump`||!!e.jump&&e.jump.phase!==`ready`)&&Number.isSafeInteger(t.round)&&t.round>=1&&!!n&&[n.attempts,n.evaluationsUsed].every(e=>Number.isSafeInteger(e)&&e>=0)&&n.attempts<=n.attemptLimit&&n.evaluationsUsed<=n.evaluationLimit&&n.localBudgetElapsedMs!==null&&Number.isFinite(n.localBudgetElapsedMs)&&n.localBudgetElapsedMs>=0}var o_=class{initial;options;port;sessionId=``;commandId=0;sequence=0;last;pendingTask=null;pendingRequestId=0;pendingEndId=0;pendingStep=0;cancelledTask=null;committedTask=null;disposed=!1;previewEnabled=!0;previewRequestId=0;operationId=0;pendingEdit=null;pendingCreation=null;creating=!1;archive;pendingRecovery=null;constructor(e,t){this.initial=e,this.options=t,this.start(e,t.initialPlaying??!0,null)}send(e){this.port?.postMessage({...e,sessionId:this.sessionId,commandId:++this.commandId})}lockOperation(){this.operationId=this.commandId+1,this.options.onOperationPending?.(!0)}acknowledgeOperation(e){this.operationId&&e>=this.operationId&&(this.operationId=0,this.options.onOperationPending?.(!1))}fail=()=>{this.port?.terminate(),this.port=void 0,this.pendingTask=null,this.pendingEdit=null,this.pendingCreation=null,this.creating=!1,this.pendingRecovery=null,this.acknowledgeOperation(1/0),this.options.onPreview?.(null),this.options.onFailure()};ready(e,t){t<this.pendingRequestId||e.taskId!==this.pendingTask||e.taskId===this.cancelledTask||(this.pendingStep=Math.max(this.pendingStep,e.completedSteps),e.ready&&e.taskId!==this.committedTask&&(this.committedTask=e.taskId,this.pendingEndId=this.commandId+1,this.send({type:`commitJump`,taskId:e.taskId,baseVersion:e.baseVersion})))}start(e,t,n){if(this.disposed)return;this.port?.terminate(),this.sessionId=crypto.randomUUID(),this.commandId=0,this.sequence=0,this.pendingTask=null,this.pendingRequestId=0,this.pendingEndId=0,this.pendingStep=0,this.cancelledTask=null,this.committedTask=null,this.pendingEdit=null,this.pendingCreation=null,this.creating=!1,this.pendingRecovery=null,this.acknowledgeOperation(1/0),this.options.onPreview?.(null),this.port=this.options.createWorker?.()??new Worker(new URL(`/planet-simulator/assets/physics.worker-DekJi9Sl.js`,``+import.meta.url),{type:`module`});let r=this.port;r.onmessage=e=>{if(this.port!==r||this.disposed)return;let t=e.data;if(!t||t.sessionId!==this.sessionId||!Number.isSafeInteger(t.sequence)||t.sequence<=this.sequence||!Number.isSafeInteger(t.commandId)||t.commandId<1||t.commandId>this.commandId)return;if(`kind`in t&&t.kind===`jump`){if(!this.last||t.version!==this.last.version||t.commandId<this.pendingRequestId||t.jump?.taskId!==this.pendingTask||this.cancelledTask===this.pendingTask||this.committedTask===this.pendingTask||!r_(t.jump,this.last)||t.jump.completedSteps<this.pendingStep||this.last.jump?.taskId===t.jump.taskId&&t.jump.round<this.last.jump.round)return;if(t.preview&&!i_(t.preview,t.jump,this.last)){this.fail();return}this.sequence=t.sequence,this.pendingStep=t.jump.completedSteps,this.last={...this.last,jump:{...t.jump},stats:{...t.stats}},this.acknowledgeOperation(t.commandId),this.ready(t.jump,t.commandId),this.options.onSnapshot(structuredClone(this.last)),t.preview&&this.previewEnabled&&this.cancelledTask!==t.jump.taskId&&this.options.onPreview?.(t.preview);return}if(!(`snapshot`in t))return;if(!t.snapshot||!a_(t.snapshot)||t.snapshot.collisions&&!te(t.snapshot.collisions)||!Number.isSafeInteger(t.snapshot.version)||t.snapshot.version<0||!n_(t.snapshot.state)||t.snapshot.collisionContext&&!jg(t.snapshot.collisionContext,t.snapshot.collisions??[],t.snapshot.state)||t.snapshot.physicsIssue?.diagnostic&&(!Ag(t.snapshot.physicsIssue.diagnostic,n_)||t.snapshot.physicsIssue.diagnostic.operation!==(t.snapshot.physicsIssue.scope===`live`?`play`:`jump`))||t.snapshot.recovery!==null&&!n_(t.snapshot.recovery)){this.fail();return}if(this.sequence>0&&this.last&&(t.snapshot.version<this.last.version||(t.snapshot.collisionContext?.revision??0)<(this.last.collisionContext?.revision??0)))return;if(t.snapshot.edit&&(!Number.isSafeInteger(t.snapshot.edit.baseVersion)||t.snapshot.edit.baseVersion!==t.snapshot.version||!t.snapshot.state.bodies.some(e=>e.id===t.snapshot.edit.bodyId))||t.snapshot.jump&&!r_(t.snapshot.jump,t.snapshot)){this.fail();return}if(t.snapshot.jump&&(t.snapshot.jump.taskId!==this.pendingTask||t.commandId<this.pendingRequestId||t.snapshot.jump.completedSteps<this.pendingStep||this.last?.jump?.taskId===t.snapshot.jump.taskId&&t.snapshot.jump.round<this.last.jump.round))return;if(t.historyArchive){if(!t_(t.historyArchive,n_)||t.historyArchive.revision!==t.snapshot.history?.revision){this.fail();return}this.archive=structuredClone(t.historyArchive)}this.pendingRecovery&&t.commandId>=this.pendingRecovery.requestId&&t.snapshot.recoveryResult?.requestId===this.pendingRecovery.id&&(this.pendingRecovery=null);let n=t.commandId<this.previewRequestId?this.previewEnabled:t.snapshot.previewEnabled;this.previewEnabled=n,this.sequence=t.sequence,this.last=structuredClone({...t.snapshot,previewEnabled:n}),this.acknowledgeOperation(t.commandId);let i=t.snapshot.jump;i&&this.ready(i,t.commandId),!i&&this.pendingTask&&t.commandId>=this.pendingRequestId&&t.commandId>=this.pendingEndId&&(this.pendingTask=null,this.pendingRequestId=0,this.pendingEndId=0,this.pendingStep=0,this.committedTask=null,this.cancelledTask=null,this.options.onPreview?.(null)),this.options.onSnapshot({...t.snapshot,previewEnabled:n});let a=this.pendingEdit,o=t.snapshot.edit,s=t.snapshot.mutation;if(a&&t.commandId>=a.requestId){o?.editId===a.id&&!a.ready&&!a.endId&&(a.ready=!0,this.options.onEditReady?.({...o},eg(this.last.state.bodies.find(e=>e.id===o.bodyId))));let e=a.endId||(a.ready?0:a.requestId);e&&s?.transactionId===a.id&&t.commandId>=e&&(s.outcome===`rejected`&&o?.editId===a.id?a.endId=0:this.pendingEdit=null,this.options.onMutation?.({...s}))}let c=this.pendingCreation;c&&t.commandId>=c.requestId&&s?.transactionId===c.id&&(this.pendingCreation=null,s.outcome===`committed`&&(this.creating=!1),this.options.onMutation?.({...s}))},r.onerror=e=>{e.preventDefault(),this.port===r&&this.fail()},r.onmessageerror=()=>{this.port===r&&this.fail()},this.send({type:`initialize`,state:B(e),playing:t,recovery:n===null?null:B(n),...this.archive?{history:structuredClone(this.archive)}:{},...this.last?.collisions?{collisionLog:structuredClone(this.last.collisions)}:{},...this.last?.collisionContext?{collisionContext:structuredClone(this.last.collisionContext)}:{}}),this.last&&(this.send({type:`speed`,index:this.last.speedIndex}),this.setPreview(this.previewEnabled))}play(e){this.disposed||(this.port?this.pendingRecovery||this.last?.localStep||this.send({type:`play`,playing:e}):this.restart())}setSpeed(e){this.pendingRecovery||this.last?.localStep||this.send({type:`speed`,index:e})}setPreview(e){this.disposed||(this.previewEnabled=e,this.previewRequestId=this.commandId+1,this.send({type:`preview`,enabled:e}),e||this.options.onPreview?.(null))}get jumpPending(){return this.pendingTask!==null}beginJump(e){if(!(this.disposed||this.pendingRecovery||this.pendingTask||this.pendingEdit||this.pendingCreation||this.creating||this.last?.localStep||!this.port))return this.pendingTask=crypto.randomUUID(),this.cancelledTask=null,this.committedTask=null,this.pendingStep=0,this.pendingRequestId=this.commandId+1,this.pendingEndId=0,this.send({type:`beginJump`,taskId:this.pendingTask,durationSeconds:e}),!0}resumeJump(){this.pendingTask&&!this.operationId&&!this.cancelledTask&&!this.committedTask&&this.last?.jump?.phase===`budget-paused`&&(this.lockOperation(),this.send({type:`resumeJump`,taskId:this.pendingTask,pausedRound:this.last.jump.round}))}cancelJump(){if(!this.pendingTask||this.operationId||this.committedTask||this.cancelledTask===this.pendingTask)return;this.lockOperation(),this.cancelledTask=this.pendingTask,this.pendingEndId=this.commandId+1,this.options.onPreview?.(null);let e=this.last?.jump;this.send(e?.phase===`budget-paused`?{type:`cancelJump`,taskId:this.pendingTask,pausedRound:e.round,baseVersion:e.baseVersion}:{type:`cancelJump`,taskId:this.pendingTask})}adoptJump(){let e=this.last?.jump;!this.pendingTask||this.operationId||this.cancelledTask||this.committedTask||!e||e.taskId!==this.pendingTask||e.phase!==`budget-paused`||e.completedSteps<1||(this.lockOperation(),this.committedTask=this.pendingTask,this.pendingEndId=this.commandId+1,this.send({type:`adoptJump`,taskId:this.pendingTask,pausedRound:e.round,baseVersion:e.baseVersion}))}resumeLocalStep(){let e=this.last?.localStep;this.port&&e&&e.phase===`budget-paused`&&!this.operationId&&!this.disposed&&(this.lockOperation(),this.send({type:`resumeLocalStep`,taskId:e.taskId,baseVersion:e.baseVersion,pausedRound:e.round}))}cancelLocalStep(){let e=this.last?.localStep;this.port&&e&&!this.operationId&&!this.disposed&&(this.lockOperation(),this.send({type:`cancelLocalStep`,taskId:e.taskId,baseVersion:e.baseVersion,pausedRound:e.round}))}restore(){!this.pendingTask&&!this.pendingRecovery&&!this.pendingEdit&&!this.pendingCreation&&!this.creating&&this.send({type:`restore`})}get taskBlocked(){return this.disposed||!this.port||!!this.pendingRecovery||!!this.pendingTask||!!this.pendingCreation||!!this.pendingEdit||!!this.last?.localStep}get storageBlocked(){return this.taskBlocked||this.creating||!!this.operationId}get editingBlocked(){return this.taskBlocked||!!this.last?.galleryOpen}setGallery(e){this.storageBlocked||(this.lockOperation(),this.send({type:`gallery`,open:e}))}loadScene(e){if(this.storageBlocked||!this.last||!U(e))return!1;let t=crypto.randomUUID();return this.pendingRecovery={id:t,requestId:this.commandId+1},this.lockOperation(),this.send({type:`loadScene`,state:B(e),requestId:t,baseVersion:this.last.version}),t}historyArchive(){return this.archive?structuredClone(this.archive):null}recover(e,t){if(this.editingBlocked||this.creating||!this.last?.history)return;let n=crypto.randomUUID();this.pendingRecovery={id:n,requestId:this.commandId+1},this.lockOperation(),this.send({type:`history`,operation:e,requestId:n,baseVersion:this.last.version,historyRevision:this.last.history.revision,...t===void 0?{}:{checkpointId:t}})}deleteBody(e){if(this.editingBlocked||this.creating||!this.last?.history)return;let t=crypto.randomUUID();this.pendingRecovery={id:t,requestId:this.commandId+1},this.lockOperation(),this.send({type:`deleteBody`,bodyId:e,requestId:t,baseVersion:this.last.version,historyRevision:this.last.history.revision})}setCreating(e){return e&&this.editingBlocked?!1:(this.creating=e,!0)}beginEdit(e){if(this.editingBlocked||this.creating)return!1;let t=crypto.randomUUID();return this.pendingEdit={id:t,requestId:this.commandId+1,endId:0,ready:!1},this.send({type:`beginEdit`,editId:t,bodyId:e}),!0}commitEdit(e){let t=this.pendingEdit,n=this.last?.edit;return!t||!t.ready||t.endId||n?.editId!==t.id?!1:(t.endId=this.commandId+1,this.send({type:`commitEdit`,editId:t.id,baseVersion:n.baseVersion,body:eg(e)}),!0)}cancelEdit(){let e=this.pendingEdit;return!e||e.endId?!1:(e.endId=this.commandId+1,this.send({type:`cancelEdit`,editId:e.id}),!0)}createBody(e,t,n=`circular`,r){if(this.editingBlocked)return!1;let i=crypto.randomUUID();return this.pendingCreation={id:i,requestId:this.commandId+1},this.send({type:`createBody`,creationId:i,body:eg(e),...t?{referenceId:t,creationMotion:n}:{},...r?{placement:structuredClone(r)}:{}}),!0}restart(){this.start(this.last?.state??this.initial,!1,this.last?.recovery??null)}dispose(){this.cancelEdit(),this.disposed=!0,this.port?.terminate(),this.port=void 0,this.pendingTask=null,this.pendingEdit=null,this.pendingCreation=null}},s_=class{client;changed;selectedId=null;tool=`velocity`;phase=`viewing`;candidate=null;creationReferenceId=null;creationMotion=`circular`;creationSuggestionKey=``;originalBody=null;error=null;errorDetails=null;feedback=null;settlement=null;gesture=null;gestureSerial=0;state=null;revision=0;get generation(){return this.revision}get creating(){return this.creationSpec!==null}readyCallback=null;previousSelection=null;creationSpec=null;clearCreation(){this.creationSpec&&this.tool===`position`&&(this.tool=`velocity`),this.creationSpec=null,this.creationPlacement=null,this.placementAnchorId=null}creationPlacement=null;placementAnchorId=null;get creationOrigin(){return this.state?.state.bodies.find(e=>e.id===this.placementAnchorId)?.positionM??{x:0,y:0,z:0}}creationPosition(e,t){if(!this.creationSpec)return{...e};let n=this.creationOrigin;return{x:e.x+(n.x-t.x),y:e.y+(n.y-t.y),z:e.z+(n.z-t.z)}}rememberPlacement(){if(!this.candidate||!this.placementAnchorId)return;if(!A(this.candidate.positionM)){this.creationPlacement=null;return}let e=this.candidate.positionM,t=this.creationOrigin;this.creationPlacement={anchorId:this.placementAnchorId,offsetM:{x:e.x-t.x,y:e.y-t.y,z:e.z-t.z}}}constructor(e,t){this.client=e,this.changed=t}get body(){return this.candidate??this.state?.state.bodies.find(e=>e.id===this.selectedId)??null}get busy(){return this.phase!==`viewing`}get blocked(){return!!this.state?.jump||this.client.editingBlocked}update(e){let t=e.recoveryResult?.outcome===`committed`&&e.recoveryResult.requestId!==this.state?.recoveryResult?.requestId;if(this.state=e,this.creationPlacement&&this.creationSpec&&[`creating-preview`,`editing-new`,`committing`].includes(this.phase)){let t=Qh(this.creationPlacement,e.state.bodies);if(t.ok&&this.candidate)this.candidate={...this.candidate,positionM:t.value};else if(!t.ok){this.error=`PLACEMENT_REFERENCE_MISSING`,this.errorDetails=null,this.changed();return}}t&&this.phase===`viewing`&&(this.feedback=null,this.originalBody=null),this.phase===`viewing`&&this.selectedId&&!e.state.bodies.some(e=>e.id===this.selectedId)&&(this.selectedId=null,this.feedback=null,this.originalBody=null),this.phase===`viewing`&&this.feedback?.kind===`worker-failed`&&(this.error=null,this.feedback=null),this.phase===`editing-new`&&this.refreshCreationVelocity(),this.changed()}refreshCreationVelocity(e=!1){if(!this.candidate||this.phase!==`editing-new`)return;if(this.placementAnchorId&&!this.state?.state.bodies.some(e=>e.id===this.placementAnchorId)){this.error=`PLACEMENT_REFERENCE_MISSING`,this.errorDetails=null;return}let t=this.state?.state.bodies.find(e=>e.id===this.creationReferenceId)??null,n=JSON.stringify([this.creationMotion,this.creationReferenceId,this.candidate.positionM,this.candidate.massKg,this.candidate.radiusM,t]);if(!e&&n===this.creationSuggestionKey)return;this.creationSuggestionKey=n;let r=N([this.candidate]);if(!r.ok){this.error=r.error.code;return}let i=mg(this.candidate,t,this.creationMotion);i.ok?(this.candidate={...this.candidate,velocityMS:i.value},this.error=null,this.errorDetails=null):(this.error=i.error.field===`referenceBody`?`REFERENCE_REQUIRED`:i.error.field===`orbitalPlane`?`INVALID_ORBITAL_PLANE`:i.error.code,this.errorDetails=i.error)}selectCreationReference(e){this.phase===`editing-new`&&(this.creationReferenceId=e||null,this.refreshCreationVelocity(!0),this.changed())}selectCreationMotion(e){this.phase===`editing-new`&&[`circular`,`inherit`].includes(e)&&(this.creationMotion=e,this.refreshCreationVelocity(!0),this.changed())}deleteSelected(){!this.busy&&!this.blocked&&this.selectedId&&this.client.deleteBody(this.selectedId)}inspectCollisionResult(e){if(this.busy||this.blocked||!this.state)return;let t=Mg(this.state,e);t&&(this.select(t),this.setTool(`mass`))}select(e){this.busy||(this.selectedId=e,this.body?.kind===`black-hole`&&this.tool===`spin`&&(this.tool=`velocity`),this.error=null,this.errorDetails=null,this.feedback=null,this.originalBody=null,this.changed())}get canSwitchTool(){return!this.gesture&&[`viewing`,`editing-existing`,`editing-new`].includes(this.phase)}get canEditValues(){return!this.gesture&&[`editing-existing`,`editing-new`].includes(this.phase)}get canStartGesture(){return!this.gesture&&this.error!==`INVALID_INPUT`&&[`viewing`,`editing-existing`,`editing-new`].includes(this.phase)&&!!this.body&&(this.phase!==`viewing`||!this.blocked)}get hasGesture(){return this.gesture!==null}get holdsObservation(){return this.phase===`editing-existing`||this.phase===`committing`&&this.creationSpec===null}get hasChanges(){let e=this.candidate,t=this.originalBody;return!e||!t?!1:e.name!==t.name||e.massKg!==t.massKg||e.radiusM!==t.radiusM||!k(e.displaySpin,t.displaySpin)||[`x`,`y`,`z`].some(n=>e.positionM[n]!==t.positionM[n]||e.velocityMS[n]!==t.velocityMS[n])}setTool(e){this.canSwitchTool&&(this.tool=e,this.changed())}ownsGesture(e){return this.gesture?.token===e}beginGesture(e,t,n,r){if(!this.canStartGesture)return!1;let i={token:++this.gestureSerial,stage:`waiting`,prepare:e,apply:t,complete:r};this.gesture=i,n(i.token);let a=()=>{this.gesture===i&&this.candidate&&(!i.prepare(this.candidate)||!i.apply()?this.cancel(`invalid-position`):i.stage===`released`?(this.gesture=null,i.complete?.(),this.finishDrag()):(i.stage=`active`,this.changed()))};if(this.phase===`editing-new`||this.phase===`editing-existing`)a();else if(!this.startExisting(a))return this.gesture=null,this.changed(),!1;return!0}moveGesture(e){this.ownsGesture(e)&&this.gesture.stage===`active`&&this.gesture.apply()}endGesture(e){if(!this.ownsGesture(e))return;let t=this.gesture;t.stage===`waiting`?t.stage=`released`:t.apply()?(this.gesture=null,t.complete?.(),this.finishDrag()):this.cancel(`invalid-position`)}startExisting(e){return this.phase===`editing-existing`?(e?.(),!0):this.busy||!this.selectedId||!this.client.beginEdit(this.selectedId)?(this.error=`EDITOR_BUSY`,this.changed(),!1):(this.clearCreation(),this.revision++,this.phase=`awaiting-freeze`,this.error=null,this.errorDetails=null,this.feedback=null,this.readyCallback=e??null,this.changed(),!0)}freezeReady(e,t){if(this.phase!==`awaiting-freeze`)return;this.candidate=eg(t),this.originalBody=eg(t),this.phase=`editing-existing`,this.changed();let n=this.readyCallback;this.readyCallback=null,n?.()}beginCreate(e,t,n,r=null,i=null){if(this.busy||!this.client.setCreating(!0))return this.error=`EDITOR_BUSY`,this.changed(),!1;let a=1,o=new Set(this.state?.state.bodies.map(e=>e.name));for(;o.has(`${n} ${a}`);)a++;return this.creationReferenceId=this.state?.state.bodies.some(e=>e.id===r)?r:null,this.creationMotion=`circular`,this.creationSuggestionKey=``,this.creationSpec={kind:e,id:crypto.randomUUID(),name:`${n} ${a}`},this.placementAnchorId=i,this.creationPlacement=null,this.revision++,this.previousSelection=this.selectedId,this.candidate=null,this.phase=`creating-preview`,this.tool=`position`,this.feedback=null,this.errorDetails=null,this.originalBody=null,this.error=`INVALID_PLACEMENT`,t?this.place(t):this.changed(),!0}place(e){if(this.phase!==`creating-preview`||!this.creationSpec)return;if(!e){this.error=`INVALID_PLACEMENT`,this.changed();return}let t=this.creationSpec;this.candidate=this.candidate?{...this.candidate,positionM:{...e}}:ng(t.kind,t.id,t.name,e),this.rememberPlacement(),this.originalBody??=eg(this.candidate),this.selectedId=t.id,this.error=null,this.changed()}releaseCreation(){this.phase===`creating-preview`&&(!this.candidate||this.error===`INVALID_PLACEMENT`?this.cancel(`invalid-position`):(this.phase=`editing-new`,this.refreshCreationVelocity(),this.changed()))}change(e){if(!this.candidate||![`editing-existing`,`editing-new`].includes(this.phase))return;let{displaySpin:t,...n}=e,r={...this.candidate,...n};t?r.displaySpin=t:`displaySpin`in e&&delete r.displaySpin,this.candidate=tg(r),this.errorDetails=null,this.phase===`editing-new`&&e.positionM&&this.rememberPlacement();let i=N([this.candidate]);this.error=i.ok?null:i.error.code,i.ok&&this.phase===`editing-new`&&this.refreshCreationVelocity(!0),this.changed()}preset(e,t){if(!this.candidate)return;let n=this.state?.state.bodies.find(e=>e.id===t)??null,r=mg(this.candidate,n,e);r.ok?this.change({velocityMS:r.value}):(this.error=r.error.field===`referenceBody`?`REFERENCE_REQUIRED`:r.error.field===`orbitalPlane`?`INVALID_ORBITAL_PLANE`:r.error.code,this.changed())}confirm(){if(!this.candidate||this.gesture||![`editing-existing`,`editing-new`].includes(this.phase))return;if(this.phase===`editing-new`&&(this.refreshCreationVelocity(!this.error),this.error||!this.creationReferenceId)){this.feedback={kind:`rejected`},this.changed();return}let e=N([this.candidate]);e.ok?this.phase===`editing-existing`&&!this.hasChanges?this.cancel(`unchanged`):(this.phase===`editing-new`?this.client.createBody(this.candidate,this.creationReferenceId,this.creationMotion,this.creationPlacement??void 0):this.client.commitEdit(this.candidate))?(this.revision++,this.settlement=null,this.phase=`committing`,this.error=null,this.changed()):(this.error=`EDITOR_BUSY`,this.changed()):(this.error=e.error.code,this.changed())}finishDrag(){this.phase===`editing-existing`?this.confirm():this.phase===`editing-new`&&this.changed()}cancel(e=`user`){if(this.phase===`committing`||this.phase===`viewing`)return;this.readyCallback=null,this.gesture=null,this.revision++;let t=e===`user`?{kind:`cancelled`}:e===`unchanged`?{kind:`unchanged`}:e===`invalid-position`?{kind:`invalid-position`}:{kind:`interrupted`,cause:e};[`awaiting-freeze`,`editing-existing`].includes(this.phase)?this.client.cancelEdit()&&(this.settlement=t,this.phase=`committing`,this.candidate=null,this.changed()):(this.client.setCreating(!1),this.candidate=null,this.clearCreation(),this.selectedId=this.previousSelection,this.phase=`viewing`,this.error=null,this.errorDetails=null,this.feedback=t,this.changed())}mutation(e){this.revision++,e.outcome===`rejected`?(this.phase=this.candidate?e.kind===`create`?`editing-new`:`editing-existing`:`viewing`,this.error=e.error,this.errorDetails=e.details??null,this.feedback={kind:`rejected`},this.settlement=null,this.changed()):(this.candidate=null,this.clearCreation(),this.phase=`viewing`,this.error=null,this.errorDetails=null,this.feedback=e.outcome===`committed`?{kind:`committed`}:this.settlement??{kind:`cancelled`},this.settlement=null,this.changed())}fail(){this.revision++,this.readyCallback=null,this.gesture=null,this.settlement=null,this.feedback={kind:`worker-failed`},this.candidate=null,this.clearCreation(),this.phase=`viewing`,this.error=`WORKER_ERROR`,this.errorDetails=null,this.changed()}},c_=-Math.PI/3,l_=2*Math.PI/3,u_=8,d_=0,f_=e=>document.createElementNS(`http://www.w3.org/2000/svg`,e);function p_(e,t=`editor.velocityDetails`){let i=document.createElement(`div`);i.className=`velocity-arc`,i.setAttribute(`role`,`group`),i.hidden=!0;let o=f_(`svg`);o.setAttribute(`aria-hidden`,`true`);let s=f_(`path`),c=f_(`path`),l=f_(`path`),u=f_(`path`);s.setAttribute(`class`,`velocity-arc-well`),c.setAttribute(`class`,`velocity-arc-liquid`),l.setAttribute(`class`,`velocity-arc-knob`),u.setAttribute(`class`,`velocity-arc-hit`);let d=f_(`path`);d.id=`velocity-arc-label-${++d_}`,d.setAttribute(`fill`,`none`);let f=f_(`text`),p=f_(`textPath`);p.setAttribute(`href`,`#${d.id}`),p.setAttribute(`startOffset`,`50%`),f.append(p),o.append(s,c,l,u,d,f);let m=document.createElement(`button`);m.type=`button`,m.className=`velocity-arc-details`,a(m,`aria-label`,()=>n(t)),i.append(o,m),e.append(i);let h=64,g=-1,_=0,v=0,y=0,b=0,x=0,S=15,C=[],w=[];function T(e,t=50,n=``){let i=f_(`path`),a=f_(`text`),s=f_(`textPath`);return i.id=`velocity-arc-label-${++d_}`,i.setAttribute(`fill`,`none`),s.setAttribute(`href`,`#${i.id}`),s.setAttribute(`startOffset`,`${t}%`),n&&a.setAttribute(`class`,n),a.append(s),o.append(i,a),C.push({path:i,offset:e}),S=Math.max(S,e),e=>r(s,e)}function E(e,t,n=50){e.className+=` arc-inline-control`,w.push({element:e,offset:t,percent:n})}function D(e){let t=f_(`path`);t.setAttribute(`class`,`arc-label-divider`),o.append(t),C.push({path:t,offset:e})}let O=(e,t)=>`${g*e*Math.cos(t)} ${-e*Math.sin(t)}`,k=(e,t,n)=>`M ${O(e,t)} A ${e} ${e} 0 0 ${+(g<0==n>t)} ${O(e,n)}`;function A(){if(y<=0){c.setAttribute(`d`,``);return}if(y>=100){c.setAttribute(`d`,k(h,c_,c_+l_)),c.setAttribute(`data-full`,`true`);return}let e=c_+l_*y/100,t=x/h,n=e=>Math.max(c_,Math.min(c_+l_,e)),r=h+u_,i=h-u_,a=+(g<0),o=1-a;c.setAttribute(`data-full`,`false`),c.setAttribute(`d`,`M ${O(r,c_)} A ${r} ${r} 0 0 ${a} ${O(r,n(e+t))} L ${O(i,n(e-t))} A ${i} ${i} 0 0 ${o} ${O(i,c_)} A ${u_} ${u_} 0 0 ${a} ${O(r,c_)} Z`)}function j(){let e=c_+l_*b/100;l.setAttribute(`d`,`M ${O(h-u_+3,e)} L ${O(h+u_-3,e)}`)}return{element:i,toggle:m,hit:u,drawing:{element:i,paintFill(e,t){y=e,x=t,A()},paintKnob(e){b=e,j()}},addReadout:T,placeInput:E,addDivider:D,layout(t,n,r){let a=Math.max(54,t.radius+21),c=a+S+20,l=2*(a*Math.sin(c_+l_)+22),f=e=>({x:e<0?t.x-c:t.x+a/2-20,y:t.y-l/2,width:c-a/2+20,height:l}),p=e=>Math.max(0,8-e.x)+Math.max(0,e.x+e.width+8-n.width)+r.reduce((t,n)=>t+Math.max(0,Math.min(n.x+n.width,e.x+e.width)-Math.max(n.x,e.x))*Math.max(0,Math.min(n.y+n.height,e.y+e.height)-Math.max(n.y,e.y))/e.height,0),y=p(f(-1))<=p(f(1))?-1:1;i.style.setProperty(`--parameter-label-x`,`${y*(a+S)}px`);let b=e.getBoundingClientRect();if(_=b.left+t.x,v=b.top+t.y,i.style.left=`${t.x}px`,i.style.top=`${t.y}px`,h!==a||g!==y||!o.getAttribute(`viewBox`)){h=a,g=y,o.setAttribute(`viewBox`,`-${c} -${c} ${2*c} ${2*c}`),o.style.width=o.style.height=`${2*c}px`;let e=k(h,c_,c_+l_);s.setAttribute(`d`,e),u.setAttribute(`d`,e),d.setAttribute(`d`,g<0?k(h+15,c_,c_+l_):k(h+15,c_+l_,c_));for(let{path:e,offset:t}of C)e.setAttribute(`d`,g<0?k(h+t,c_,c_+l_):k(h+t,c_+l_,c_));for(let{element:e,offset:t,percent:n}of w){let r=c_+l_*(g<0?n:100-n)/100,i=h+t;e.style.left=`${g*i*Math.cos(r)}px`,e.style.top=`${-i*Math.sin(r)}px`,e.style.setProperty(`--arc-control-angle`,`${g*(Math.PI/2-r)}rad`)}let t=c_+l_;m.style.left=`${g*(h*Math.cos(t)-22*Math.sin(t))}px`,m.style.top=`${-h*Math.sin(t)-22*Math.cos(t)}px`,i.style.setProperty(`--arc-choice-x`,`${g*(h*Math.cos(t)-22*Math.sin(t))}px`),i.style.setProperty(`--arc-choice-y`,`${-h*Math.sin(t)-22*Math.cos(t)}px`),m.style.setProperty(`--velocity-arrow-angle`,`${-g*t}rad`),A(),j()}return{bounds:f(g),side:g,detailsRadius:h+S+14}},dragStart(e,t){let n=e=>(Math.atan2(v-e.clientY,g*(e.clientX-_))-c_)/l_,r=n(e),i=Math.abs(r-t)*h*l_<=10,a=r;return{onThumb:i,initial:r,read(e){if(e.clientX===_&&e.clientY===v)return a;let t=n(e),r=2*Math.PI/l_;return a=t+Math.round((a-t)/r)*r,a}}},expanded(e){m.setAttribute(`aria-expanded`,String(e))},setSpeed(e){r(p,e),a(i,`aria-label`,e)}}}function m_(){let e=document.createElement(`span`);e.className=`slosh-slider`;let t=document.createElement(`span`);t.className=`slosh-track`,t.setAttribute(`aria-hidden`,`true`);let n=document.createElement(`span`);n.className=`slosh-fill`;let r=document.createElement(`span`);return r.className=`slosh-knob`,t.append(n,r),e.append(t),{element:e,paintFill(e,t){n.style.width=`${e}%`,n.style.setProperty(`--slosh-lean`,`${t}px`)},paintKnob(e){r.style.left=`calc(${e}% + ${7-.14*e}px)`}}}function h_(e,t=m_()){let{element:n}=t;n.append(e);let r=0,i=0,a=0,o=0,s=0,c=(e,t,n)=>Math.max(t,Math.min(n,e));function l(){t.paintFill(i,c(1.35*a,-14,14))}function u(){o&&cancelAnimationFrame(o),o=s=0}function d(e){let t=s?c((e-s)/16.67,0,2.5):1;s=e,a=(a+(r-i)*.2965*t)*.773**t,i+=a*t,(i<0||i>100)&&(i=c(i,0,100),a*=-.42);let n=Math.abs(r-i)<.02&&Math.abs(a)<.02;n&&(i=r,a=0,s=0),l(),o=n?0:requestAnimationFrame(d)}return{element:n,sync(n=!1){let s=Number(e.min),f=Number(e.max),p=e.valueAsNumber;if(!Number.isFinite(p)||f<=s)return;let m=c((p-s)/(f-s)*100,0,100);(n||m!==r||!o)&&(r=m,t.paintKnob(r),!n||!eh(e)||typeof requestAnimationFrame!=`function`?(u(),i=r,a=0,l()):!o&&i!==r&&(o=requestAnimationFrame(d)))},dispose:u}}new Intl.NumberFormat(`zh-CN`,{maximumSignificantDigits:4,notation:`compact`}),new Intl.NumberFormat(`en-US`,{maximumSignificantDigits:4,notation:`compact`});function g_(e,t){let n=Ig(e,t);return n===null?null:Jg(n)}function __(e,t,i){let o=document.createElement(`label`);o.className=`mass-value-label`;let s=document.createElement(`span`);r(s,()=>n(`mass.value`)),o.append(s);let c=document.createElement(`input`);c.type=`number`,c.className=`mass-value`,c.step=`any`,a(c,`aria-label`,()=>n(`mass.value`));let l=document.createElement(`select`);l.className=`mass-unit`,a(l,`aria-label`,()=>n(`mass.unit`));for(let e of Ng){let t=document.createElement(`option`);t.value=e,r(t,()=>n(`mass.unit.${e}`)),l.append(t)}let u=document.createElement(`p`);u.className=`editor-hint mass-input-hint`,u.setAttribute(`role`,`status`),u.hidden=!0,o.append(c,l),e.append(o,u);let d=null,f=`kg`,m=!1,h=e=>{r(u,()=>e?n(e):``),u.hidden=!e},g=()=>{if(t.phase!==`viewing`||t.blocked)return;let e=t.selectedId;t.startExisting(()=>{t.selectedId===e&&t.phase===`editing-existing`&&c.focus()})};return c.onfocus=g,c.onclick=g,c.oninput=()=>{if(!t.canEditValues)return;let e=Fg(c.valueAsNumber,f);m=e===null,h(m?`mass.fixInput`:null),t.change({massKg:e??NaN})},l.onchange=()=>{if(!t.body)return;let n=l.value;m?(l.value=f,h(`mass.fixInput`)):Ig(t.body.massKg,n)===null?(l.value=f,h(`mass.unitRange`),p(e,`error`)):(n!==f&&p(e,`tick`),f=n,h(null),c.value=g_(t.body.massKg,f),i?.())},{element:o,input:c,units:l,get unit(){return f},update(){let e=t.body;if(!e)return;let n=t.canEditValues;d!==e.id&&(d=e.id,f=Lg(e.massKg),m=!1,h(null)),m&&Number.isFinite(e.massKg)&&e.massKg>0&&(m=!1,h(null),c.value=g_(e.massKg,f)??``),t.busy||(m=!1,h(null)),l.value=f,l.disabled=t.phase===`awaiting-freeze`||t.phase===`committing`||t.hasGesture,c.readOnly=!n,c.disabled=t.phase===`committing`,c.setAttribute(`aria-busy`,String(t.phase===`awaiting-freeze`)),!m&&(!n||document.activeElement!==c)&&(c.value=g_(e.massKg,f)??``)}}}var v_=Math.log10(E.minPeriodSeconds),y_=Math.log10(E.maxPeriodSeconds),b_=(e,t,n)=>Math.max(t,Math.min(n,e));function x_(e,t){let i=p_(e,`spin.direction`);i.element.className+=` display-spin-controls`;let o=document.createElement(`input`);o.type=`range`,o.min=String(v_),o.max=String(y_),o.step=`any`,a(o,`aria-label`,()=>n(`spin.period`));let s=h_(o,i.drawing),c=document.createElement(`span`);c.className=`spin-angle`,c.hidden=!0;let l=document.createElement(`button`);l.type=`button`,l.className=`spin-tip`,c.append(l),e.append(c);let u=document.createElement(`p`);u.className=`spin-angle-readout`,u.hidden=!0;let d=document.createElement(`div`);d.className=`spin-directions`,d.id=`spin-directions`,d.hidden=!0,i.toggle.setAttribute(`aria-controls`,d.id),i.element.append(d);let f={x:0,y:0},m=null,h=()=>t.state?.state.elapsedSeconds??0,g=e=>zd(e,h()),_=(e,n)=>{let r=g(e);if(Object.entries(n).every(([e,t])=>r[e]===t)){t.candidate?.displaySpin!==e.displaySpin&&t.change({displaySpin:e.displaySpin});return}let i=h();t.change({displaySpin:{...r,...n,phaseDegrees:O(r,i),epochSeconds:i}})},v=e=>{t.canStartGesture&&t.body&&!Object.entries(e).every(([e,n])=>g(t.body)[e]===n)&&t.startExisting(()=>{t.candidate&&(_(t.candidate,e),t.confirm())})},y=[1,-1].map(e=>{let t=document.createElement(`button`);return t.type=`button`,r(t,()=>n(e===1?`spin.prograde`:`spin.retrograde`)),t.onclick=()=>{d.hidden=!0,i.expanded(!1),i.toggle.focus(),v({direction:e})},d.append(t),t});i.toggle.onclick=()=>{t.hasGesture||(d.hidden=!d.hidden,i.expanded(!d.hidden),p(e,d.hidden?`droplet`:`bloom`))},d.onkeydown=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),d.hidden=!0,i.expanded(!1),i.toggle.focus())};let b=_g(i.hit,t,e=>{let t=Number(o.value),n=i.dragStart(e,(t-v_)/(y_-v_)),r,a=n.initial;return{prepare(e){return r=e,!0},move(e){a=n.read(e)},apply(){let e=Math.log10(g(r).periodSeconds),t=b_(n.onThumb?e+(a-n.initial)*(y_-v_):v_+a*(y_-v_),v_,y_);return _(r,{periodSeconds:t===e?g(r).periodSeconds:b_(10**t,E.minPeriodSeconds,E.maxPeriodSeconds)}),o.value=String(t),s.sync(!0),!0}}}),x=_g(l,t,e=>{let t=e=>Math.atan2(e.clientX-f.x,f.y-e.clientY),n=t(e),r=0,i;return{prepare(e){return i=e,!0},move(e){if(Math.hypot(e.clientX-f.x,e.clientY-f.y)<8)return;let i=t(e),a=i-n;n=i,r+=Math.atan2(Math.sin(a),Math.cos(a))*180/Math.PI},apply(){return _(i,{tiltDegrees:b_(g(i).tiltDegrees+r,0,180)}),!0}}});return o.onkeydown=e=>{if(![`ArrowLeft`,`ArrowRight`,`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(e.key))return;e.preventDefault();let n=g(t.body).periodSeconds,r=e.key===`Home`?E.minPeriodSeconds:e.key===`End`?E.maxPeriodSeconds:b_(n*10**([`ArrowLeft`,`ArrowDown`].includes(e.key)?-.025:.025),E.minPeriodSeconds,E.maxPeriodSeconds);v({periodSeconds:r})},l.onkeydown=e=>{if(![`ArrowLeft`,`ArrowRight`,`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(e.key))return;e.preventDefault();let n=g(t.body).tiltDegrees,r=e.key===`Home`?0:e.key===`End`?180:b_(n+([`ArrowLeft`,`ArrowUp`].includes(e.key)?-1:1),0,180);v({tiltDegrees:r})},{arc:i,angleReadout:u,layout(t){if(c.style.visibility=t?.visible?`visible`:`hidden`,!t?.visible)return;let n=e.getBoundingClientRect();f={x:n.left+t.x,y:n.top+t.y},c.style.left=`${t.x}px`,c.style.top=`${t.y}px`,c.style.setProperty(`--spin-tip-distance`,`${Math.max(25,t.radius+10)}px`)},update(){b.sync(),x.sync();let e=t.body,f=!!e&&!t.creating&&t.tool===`spin`&&e.kind!==`black-hole`;if(i.element.hidden=!f,c.hidden=!0,u.hidden=!0,(!f||!e||m!==e.id)&&(d.hidden=!0,i.expanded(!1)),!f||!e)return;m=e.id;let p=g(e),h=()=>n(`spin.periodReadout`,{value:Jg(p.periodSeconds/3600)});i.setSpeed(h),o.setAttribute(`aria-disabled`,String(!t.canStartGesture&&!b.captured)),a(o,`aria-valuetext`,h),t.hasGesture||(o.value=String(Math.log10(p.periodSeconds)),s.sync()),l.setAttribute(`aria-disabled`,String(!t.canStartGesture&&!x.captured));for(let[e,n]of y.entries())n.disabled=!t.canStartGesture,n.setAttribute(`aria-pressed`,String(p.direction===(e===0?1:-1)));c.hidden=!1,l.dataset.dragging=String(x.captured),c.style.setProperty(`--spin-angle`,`${p.tiltDegrees}deg`);let _=()=>n(`spin.tiltReadout`,{value:Jg(p.tiltDegrees)});a(l,`aria-label`,_),u.hidden=!x.captured,u.hidden||r(u,_)},dispose(){b.dispose(),x.dispose(),s.dispose(),c.remove(),i.element.remove()}}}function S_(e,t,i,o,s){let c=document.createElement(`section`);c.className=`creation-entry`,a(c,`aria-label`,()=>n(`creation.bar`));let l=document.createElement(`button`);l.type=`button`,l.className=`creation-toggle`,l.setAttribute(`aria-expanded`,`false`);let u=document.createElement(`span`);u.className=`creation-caption`,r(u,()=>n(`creation.add`)),l.append(u),nd(l,()=>n(`creation.add`),`add`,!1);let d=document.createElement(`div`);d.className=`creation-rail`,d.id=`creation-options`,d.hidden=!0,l.setAttribute(`aria-controls`,d.id);let f=new Map,m=null;for(let e of S){let o=document.createElement(`button`);o.type=`button`,o.className=`creation-kind`,o.dataset.kind=e,a(o,`aria-label`,()=>n(`creation.dragKind`,{kind:n(`kind.${e}`)}));let c=document.createElement(`span`);c.className=`body-thumbnail thumbnail-${e}`,c.setAttribute(`aria-hidden`,`true`);let l=document.createElement(`span`);l.className=`creation-kind-name`,r(l,()=>n(`kind.${e}`)),o.append(c,l),o.onpointerdown=n=>{n.button!==0||t.busy||t.blocked||(m=o,i(n,e))},o.onclick=e=>{e.detail!==0||t.busy||t.blocked||(o.dispatchEvent(new PointerEvent(`pointerdown`,{pointerId:1,button:0,bubbles:!0})),s?.())},f.set(e,o),d.append(o)}let h=document.createElement(`p`);h.className=`creation-rail-hint`,r(h,()=>n(`creation.dragHint`)),d.append(h);let g=e=>{d.hidden=!e,l.setAttribute(`aria-expanded`,String(e)),a(l,`aria-label`,()=>n(e?`creation.collapse`:`creation.add`))};l.onclick=()=>{let t=d.hidden===!0;t&&o?.(),g(t),p(e,t?`bloom`:`droplet`)},c.onkeydown=n=>{n.key!==`Escape`||d.hidden||t.busy||(n.preventDefault(),n.stopPropagation(),g(!1),l.focus(),p(e,`droplet`))};let _=document.createElement(`button`);_.type=`button`,_.className=`creation-cancel`,r(_,()=>n(`editor.cancel`)),_.onclick=()=>t.cancel(),_.hidden=!0;let v=document.createElement(`p`);return v.className=`placement-notice`,v.setAttribute(`role`,`status`),c.append(l,d,_,v),e.append(c),{notice:v,focusToggle:()=>l.focus(),close(){t.phase!==`creating-preview`&&g(!1)},update(){let e=t.phase===`creating-preview`;l.disabled=t.busy;for(let n of f.values())n.disabled=(t.busy||t.blocked)&&!(e&&n===m);_.hidden=!e,e||(m=null)},dispose(){c.remove()}}}function C_(e,t){let i=document.createElement(`div`);i.className=`arc-toolbar`,i.hidden=!0,i.setAttribute(`role`,`toolbar`),a(i,`aria-label`,()=>n(`editor.tools`));let o=new Map;for(let s of[`radius`,`mass`,`velocity`,`spin`,`delete`]){let c=document.createElement(`button`);c.type=`button`,c.className=`arc-tool`,c.dataset.tool=s;let l=()=>n(s===`spin`?`spin.tool`:`editor.${s}`);r(c,()=>l()),a(c,`aria-label`,()=>l()),c.style.setProperty(`--tool-icon`,$u(s)),c.onclick=()=>{s===`delete`?t.deleteSelected():t.canSwitchTool&&t.tool!==s&&(t.setTool(s),p(e,`bloom`))},i.append(c),o.set(s,c)}return e.append(i),{element:i,get buttonCount(){return[...o.values()].filter(e=>!e.hidden).length},update(){let e=t.body,r=t.phase===`editing-new`;i.hidden=!e||t.phase===`creating-preview`;for(let[i,a]of o)a.hidden=i===`spin`&&(r||e?.kind===`black-hole`),a.disabled=i===`delete`?t.busy||t.blocked:!t.canSwitchTool||r&&i===`velocity`,i!==`delete`&&a.setAttribute(`aria-pressed`,String(t.tool===i)),s(a,`title`,()=>r&&i===`velocity`?n(`creation.velocityAfter`):r&&i===`delete`?n(`creation.cancelInstead`):``)},place(e,t){i.style.visibility=e?`visible`:`hidden`,e&&(i.style.left=`${e.x}px`,i.style.top=`${e.y}px`,[...o.values()].filter(e=>!e.hidden).forEach((e,n)=>{let r=t[n];e.style.left=`${r.x}px`,e.style.top=`${r.y}px`}))},dispose(){i.remove()}}}var w_=22,T_=52,E_=(e,t)=>e.x<t.x+t.width&&e.x+e.width>t.x&&e.y<t.y+t.height&&e.y+e.height>t.y;function D_(e,t,n,r,i,a=1,o=4){if(![e.x,e.y,e.radius].every(Number.isFinite)||e.radius<0)return null;let s=bg(e,{width:2*e.radius+16,height:2*e.radius+16}),c=e.visible?[...r,s]:[...r],l=Math.max(54,e.radius+32)+11+(o===5?8:0),u=2*Math.asin(T_/(2*l)),d=t=>Array.from({length:o},(n,r)=>{let i=(r-(o-1)/2)*u;return{x:e.x+t*l*Math.cos(i),y:e.y+l*Math.sin(i)}}),f={width:44,height:44},p=e=>e.every(e=>{let n=bg(e,f);return n.x>=8&&n.y>=8&&n.x+n.width<=t.width-8&&n.y+n.height<=t.height-8&&!r.some(e=>E_(n,e))}),m=null,h=[],g=a===1?`right`:`left`;if(e.visible){let n=d(a),r=d(-a),i=p(n)?n:p(r)?r:null,o=i??n,s=Math.min(...o.map(e=>e.x))-w_,l=Math.min(...o.map(e=>e.y))-w_,u=Math.max(...o.map(e=>e.x))+w_-s,f=Math.max(...o.map(e=>e.y))+w_-l,_=i?{x:s+u/2,y:l+f/2}:xg({x:s+u/2,y:e.y},{width:u,height:f},t,c);_&&(m=bg(_,{width:u,height:f}),h=o.map(e=>({x:e.x-s,y:e.y-l})),g=_.x<e.x?`left`:`right`)}let _=xg({x:e.x+(g===`right`?-1:1)*(e.radius+20+n.width/2),y:e.y},n,t,[...c,...m?[m]:[]],i);return{arc:m,points:h,panel:_?bg(_,n):null,side:g}}function O_(e,t,n,r,i,a){let o=t.height/2;if(t.height===0||o>=i||t.width<140)return null;let s=i-Math.sqrt(i**2-o**2),c=e.x+r*(i-s),l={x:r===-1?c-t.width:c,y:e.y-o,width:t.width,height:t.height};return l.x<8||l.y<8||l.x+l.width>n.width-8||l.y+l.height>n.height-8||a.some(e=>E_(l,e))?null:{box:l,depth:s}}function k_(e){let t=document.createElement(`div`);t.className=`editor-title`;let i=document.createElement(`button`);i.type=`button`,i.className=`editor-title-name`;let c=document.createElement(`form`);c.className=`editor-title-name-form`,c.hidden=!0;let l=document.createElement(`input`);l.type=`text`,l.maxLength=80,a(l,`aria-label`,()=>n(`editor.name`)),c.append(l),t.append(i,c);let u=null,d=!1,f=!1,m=()=>{u=null,d=!1,c.hidden=!0,i.hidden=!1},h=t=>{let n=u;if(!n)return;let r=l.value.trim();m(),t&&r&&e.phase===`editing-new`&&e.canEditValues&&e.candidate?.id===n&&r!==e.candidate.name&&e.change({name:r})};return i.onclick=()=>{let n=e.body;!f&&n&&e.phase===`editing-new`&&e.canEditValues&&!e.hasGesture&&(u=n.id,l.value=n.name,i.hidden=!0,c.hidden=!1,l.focus(),l.setSelectionRange(0,0),p(t,`bloom`))},l.addEventListener(`compositionstart`,()=>{d=!0}),l.addEventListener(`compositionend`,()=>{d=!1}),l.onkeydown=e=>{e.isComposing||d?e.stopPropagation():(e.key===`Enter`||e.key===`Escape`)&&(e.preventDefault(),e.stopPropagation(),h(e.key===`Enter`),i.focus(),e.key===`Escape`&&p(t,`droplet`))},l.onblur=()=>{f||h(!0)},c.onsubmit=e=>{e.preventDefault(),e.stopPropagation(),d||(h(!0),i.focus())},{element:t,update(){let t=e.body,c=!!t&&e.phase===`editing-new`&&e.canEditValues&&!e.hasGesture;u&&(t?.id!==u||!c)&&m(),i.disabled=!c,r(i,()=>t?t.materialId===`procedural`?t.name:o(t.id):``),a(i,`aria-label`,()=>n(`editor.editName`,{name:i.textContent})),s(i,`title`,()=>c?n(`editor.renameHint`):``)},dispose(){f=!0,m(),t.remove()}}}var A_={EDITOR_BUSY:`editor.busy`,WORKER_ERROR:`editor.workerError`,STALE_EDIT:`editor.stale`,INVALID_INPUT:`editor.invalidInput`,INVALID_PLACEMENT:`editor.invalidPlacement`,PLACEMENT_REFERENCE_MISSING:`creation.placementMissing`,COINCIDENT_BODIES:`editor.overlap`,PHYSICAL_OVERLAP:`editor.overlap`,UNSAFE_TIMESTEP:`editor.unsafe`,NUMERICAL_RANGE:`editor.range`,NON_FINITE_CALCULATION:`editor.nonFinite`,REFERENCE_REQUIRED:`editor.referenceRequired`,INVALID_ORBITAL_PLANE:`editor.orbitalPlane`},j_=e=>e.kind===`interrupted`?{"pointer-cancel":`editor.pointerCancelled`,"capture-lost":`editor.captureLost`,"window-blur":`editor.windowBlur`,hidden:`editor.hidden`,resize:`editor.resized`,pagehide:`editor.pageLeft`,disposed:`editor.pageLeft`}[e.cause]:{committed:`editor.committed`,cancelled:`editor.cancelled`,unchanged:`editor.unchanged`,"invalid-position":`editor.invalidPosition`,rejected:`editor.rejected`,"worker-failed":`editor.workerError`}[e.kind];function M_(e,t,i,c,u){let d=e=>{let t=document.createElement(`button`);return t.type=`button`,r(t,()=>n(e)),t},f=!1,m=S_(e,t,i,u,()=>{t.phase===`editing-new`?(f=!0,V.focus()):m.focusToggle()}),h=C_(e,t),g=p_(e),_=p_(e),v=p_(e),y=x_(e,t),b=[g,_,v,y.arc],x=_.addReadout(16,34,`arc-mass-number`),S=_.addReadout(16,65,`arc-mass-unit`),C=_.addReadout(38),w=v.addReadout(16,50,`arc-radius-number`),T=v.addReadout(38);v.addDivider(27),_.toggle.hidden=v.toggle.hidden=!0,_.element.className+=` parameter-arc parameter-arc-mass`,v.element.className+=` parameter-arc parameter-arc-radius`;let E=m.notice,D=null,O=document.createElement(`section`);O.className=`body-editor`,O.hidden=!0;let k=document.createElement(`div`);k.className=`editor-panel-shape`,k.setAttribute(`aria-hidden`,`true`);let A=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);A.setAttribute(`preserveAspectRatio`,`none`);let j=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);j.setAttribute(`vector-effect`,`non-scaling-stroke`),A.append(j),k.append(A);let M=`M 4 1 H 98 Q 99 1 98 3 C 71 25 71 75 98 97 Q 99 99 98 99 H 4 Q 1 99 1 94 V 6 Q 1 1 4 1 Z`;function N(e,t){A.getAttribute(`viewBox`)!==e&&A.setAttribute(`viewBox`,e),j.getAttribute(`d`)!==t&&j.setAttribute(`d`,t)}N(`0 0 100 100`,M);let P=k_(t),F=new Map;for(let e of[`position`,`radius`,`mass`,`velocity`]){let t=document.createElement(`div`);t.className=`editor-fields`,F.set(e,t)}let I=F.get(`position`),L=document.createElement(`p`);L.className=`creation-speed editor-hint`;let R=document.createElement(`p`);R.className=`creation-target-error`,R.id=`creation-target-error`,R.setAttribute(`role`,`status`),R.hidden=!0;let ee=document.createElement(`label`);ee.className=`creation-orbit`;let z=document.createElement(`span`);z.className=`creation-orbit-caption`,r(z,()=>n(`creation.orbitQuestion`));let B=document.createElement(`span`);B.className=`creation-required`,r(B,()=>n(`creation.required`)),B.setAttribute(`aria-hidden`,`true`),z.append(B);let V=document.createElement(`select`);a(V,`aria-label`,()=>n(`creation.orbitQuestion`)),V.required=!0,V.onchange=()=>{let n=V.value!==t.creationReferenceId;t.selectCreationReference(V.value),n&&!t.error&&p(e,`toggle`)},ee.append(z,V);let H=document.createElement(`label`);r(H,()=>n(`creation.motion`));let te=document.createElement(`select`);a(te,`aria-label`,()=>n(`creation.motion`));for(let e of[`circular`,`inherit`]){let t=document.createElement(`option`);t.value=e,r(t,()=>n(e===`circular`?`creation.orbit`:`creation.fall`)),te.append(t)}te.onchange=()=>{let n=te.value!==t.creationMotion;t.selectCreationMotion(te.value),n&&!t.error&&p(e,`toggle`)},H.append(te);let U=document.createElement(`fieldset`);U.className=`creation-fields`;let ne=document.createElement(`legend`);r(ne,()=>n(`creation.motionGroup`)),U.append(ne,ee,R,H,L);let W=d(`editor.focus`);W.onclick=c;let re=new Map,ie=!1,ae=null,oe=null,se=(e,t)=>e===`radius`?t.radiusM/1e3:t.velocityMS[e[1]]/1e3;function ce(e,i,o,s,c){let l=document.createElement(`label`);r(l,()=>c??n(o));let u=document.createElement(`input`);u.type=`number`,u.step=`any`,a(u,`aria-label`,()=>n(o));let d=i.startsWith(`v`),f=()=>{if(t.phase!==`viewing`||t.blocked)return;let e=t.selectedId;d&&(ie=!0),!t.startExisting(()=>{t.selectedId===e&&t.phase===`editing-existing`&&t.candidate&&(u.value=Jg(se(i,t.candidate)),d?document.activeElement!==u&&!O.contains(document.activeElement)&&t.confirm():u.focus())})&&d&&(ie=!1)};return u.onfocus=f,u.onclick=f,u.oninput=()=>{t.canEditValues&&(d&&(ie=!0,ye.value=`manual`),s(u.valueAsNumber))},l.append(u),e.append(l),re.set(i,u),u}function le(e,n,r){let i=t.candidate;i&&(e===`positionM`&&n===`z`?t.change({positionM:og(i.positionM,r*1e3)}):t.change({[e]:{...i[e],[n]:r*1e3}}))}let ue=document.createElement(`div`);ue.className=`editor-velocity-components`;let de=document.createElement(`span`);de.className=`editor-velocity-units`,de.textContent=`km/s`,F.get(`velocity`).append(de,ue);for(let e of[`x`,`y`,`z`])ce(ue,`v${e}`,`editor.v${e}`,t=>le(`velocityMS`,e,t),e.toUpperCase());let fe=ce(v.element,`radius`,`editor.radiusValue`,e=>t.change({radiusM:e*1e3})),G=__(_.element,t,()=>pe());_.placeInput(G.input,16,34),_.placeInput(G.units,16,65);let pe=()=>{x(()=>G.input.value),S(()=>n(`mass.unit.${G.unit}`))};v.placeInput(fe,16);let me=new Map,he=new Map,K=new Map,ge=null,q=[],J=new Map;function _e(i,o,s,c,l,u,d){let f=document.createElement(`input`);f.type=`range`,f.step=`any`,a(f,`aria-label`,()=>n(s));let m=!!d,h=h_(f,d?.drawing);he.set(o,h);let g=(n,r=!1)=>{let i=Number(f.min),a=Number(f.max),s=Number(f.value),g=f.getBoundingClientRect(),_=Math.max(1,g.width-16),v=g.left+8,y=(s-i)/(a-i),b=m&&!r?d.dragStart(n,y):null,x=b?b.read:e=>(e.clientX-v)/_,S=b?.initial??x(n),C=b?.onThumb??Math.abs(S-y)*_<=8,w=S,T=0,E,D;return{prepare:e=>(E=e,T=c(),D={...t.creationOrigin},Number.isFinite(T)),move:e=>{w=x(e)},complete:()=>{t.creating&&!t.error&&c()!==T&&p(e,`tick`)},apply:()=>{let e=(C?ug(s,w-S,1,i,a):ug(i,w,1,i,a))-s,n=t.creationPosition(E.positionM,D);return e===0?u({...E,positionM:n}):l(T+e+(o===`height`?(n.z-E.positionM.z)/1e3:0)),f.value=String(T+e),h.sync(!0),!0}}},_=[_g(m?d.hit:f,t,e=>g(e))];m&&_.push(_g(f,t,e=>g(e,!0))),q.push(..._),J.set(o,_);let v=null;if(f.oninput=()=>{t.canEditValues&&(v??=c(),l(Number(f.value)),h.sync(!0))},f.onblur=()=>{v=null},f.onkeydown=n=>{if(n.key===`Enter`&&!n.isComposing&&t.canEditValues)n.preventDefault(),n.stopPropagation(),t.creating?(v!==null&&c()!==v&&!t.error&&p(e,`tick`),v=null):t.confirm();else if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(n.key)){if(t.phase===`viewing`){n.preventDefault();let e=Number(f.value),r=Number(f.min),i=Number(f.max),a=n.key===`Home`?r:n.key===`End`?i:ug(e,[`ArrowLeft`,`ArrowDown`].includes(n.key)?-1:1,100,r,i);t.startExisting(()=>l(c()+a-e))}else t.canEditValues||n.preventDefault()}},i){let e=document.createElement(`label`);e.className=`slosh-label`,r(e,()=>n(s)),e.append(h.element),i.append(e)}return me.set(o,f),K.set(o,new hg),f}_e(I,`height`,`editor.height`,()=>t.body.positionM.z/1e3,e=>le(`positionM`,`z`,e),e=>t.change({positionM:{...t.body.positionM,z:e.positionM.z}})),_e(null,`mass`,`editor.massSlider`,()=>lg(t.body.massKg),e=>t.change({massKg:cg(e)}),e=>t.change({massKg:e.massKg}),_),_e(null,`radius`,`editor.radiusSlider`,()=>Math.log10(t.body.radiusM),e=>t.change({radiusM:10**e}),e=>t.change({radiusM:e.radiusM}),v),_e(null,`vertical`,`editor.verticalVelocity`,()=>t.body.velocityMS.z/1e3,e=>le(`velocityMS`,`z`,e),e=>t.change({velocityMS:{...t.body.velocityMS,z:e.velocityMS.z}}),g);let ve=document.createElement(`select`);a(ve,`aria-label`,()=>n(`editor.reference`));let ye=document.createElement(`select`);a(ye,`aria-label`,()=>n(`editor.velocityPreset`));for(let e of[`manual`,`inherit`,`circular`]){let t=document.createElement(`option`);t.value=e,r(t,()=>n(`editor.${e}`)),ye.append(t)}ye.onchange=ve.onchange=()=>{let e=ye.value,n=ve.value,r=t.selectedId;ye.disabled||e!==`inherit`&&e!==`circular`||!n||t.startExisting(()=>{t.selectedId===r&&t.phase===`editing-existing`&&(t.preset(e,n),t.error||t.confirm())})};let be=document.createElement(`label`);r(be,()=>n(`editor.reference`)),be.append(ve);let xe=document.createElement(`label`);r(xe,()=>n(`editor.velocityPreset`)),xe.append(ye),F.get(`velocity`).append(be,xe);let Se=d(`editor.confirm`),Ce=d(`editor.cancel`);Se.onclick=()=>t.confirm(),Ce.onclick=()=>t.cancel();let we=document.createElement(`div`);we.className=`editor-actions`,we.append(W,Se,Ce);for(let[e,n]of[[_.element,G.input],[v.element,fe]])n.onkeydown=e=>{e.key===`Enter`&&!e.isComposing&&(e.preventDefault(),e.stopPropagation(),t.creating||t.confirm())},e.addEventListener(`focusout`,n=>{!t.creating&&t.phase===`editing-existing`&&!t.hasGesture&&!t.error&&!e.contains(n.relatedTarget)&&t.confirm()});O.addEventListener(`focusout`,e=>{t.tool===`velocity`&&ie&&t.canEditValues&&!t.creating&&!t.error&&!O.contains(e.relatedTarget)&&t.confirm()});let Te=document.createElement(`p`);Te.className=`editor-notice`,Te.setAttribute(`role`,`status`);let Ee=document.createElement(`div`);Ee.className=`editor-content`,Ee.append(U,F.get(`radius`),F.get(`mass`),F.get(`velocity`));let De=document.createElement(`details`);De.className=`editor-precision-details`,De.id=`editor-precision-details`,De.open=!1,g.toggle.setAttribute(`aria-controls`,De.id);let Oe=document.createElement(`summary`);Oe.hidden=!0,r(Oe,()=>n(`editor.velocityDetails`)),De.append(Oe,Ee);let ke=!1,Ae=()=>{let e=!t.creating&&t.tool===`velocity`,n=!t.creating&&t.tool!==`position`,r=!t.creating&&(t.tool===`position`||n&&!De.open);O.dataset.compact=String(r),O.dataset.tool=t.tool;let i=n&&!De.open,a=n&&!t.busy;a!==ke&&((a?Me:O).append(we),ke=a),Te.hidden=!Te.textContent||i&&!t.error||(r&&t.phase===`viewing`||t.phase===`editing-new`)&&!t.error&&!t.feedback,k.hidden=i&&Te.hidden,g.expanded(e&&De.open),O.hidden=!t.body||t.phase===`creating-preview`||n&&!De.open&&Te.hidden&&!t.busy};De.addEventListener(`toggle`,Ae);let je=()=>{t.hasGesture||(De.open=!De.open,Ae(),p(e,De.open?`bloom`:`droplet`))};g.toggle.onclick=je;let Me=document.createElement(`div`);Me.className=`editor-scroll`,Me.append(I,De),Me.append(Te,y.angleReadout),O.append(k,P.element,Me,we),e.append(O);let Ne=t.tool,Pe=null,Fe=null,Ie=e=>t.state?.state.bodies.find(t=>t.id===e)?.materialId===`procedural`?t.state.state.bodies.find(t=>t.id===e).name:o(e),Le=(e,t,i)=>{let a=e.value;if(e.replaceChildren(),i){let t=document.createElement(`option`);t.value=``,r(t,()=>n(`creation.chooseReference`)),e.append(t)}t.forEach(t=>{let n=document.createElement(`option`);n.value=t,r(n,()=>Ie(t)),e.append(n)}),t.includes(a)&&(e.value=a)};return{closeCreation:()=>m.close(),layout(n){if(!n||!t.body||t.phase===`creating-preview`){Pe=null,Fe=null,h.place(null,[]),y.layout(null);for(let e of b)e.element.style.visibility=`hidden`;return}if(Fe!==n.id&&(Pe=null,Fe=n.id),t.hasGesture||t.phase===`committing`||t.busy&&document.activeElement?.closest(`.body-editor`)===O)return;let r=e.getBoundingClientRect(),i={width:e.clientWidth,height:e.clientHeight},a=[...e.querySelectorAll(`.time-controls,.creation-entry,.theme-controls,.display-settings > summary,.scene-heading`)].filter(e=>!e.hidden).map(e=>e.getBoundingClientRect()).filter(e=>e.width>0&&e.height>0).map(e=>({x:e.left-r.left,y:e.top-r.top,width:e.width,height:e.height})),o=e.querySelector(`.time-controls`)?.getBoundingClientRect(),s=Math.max(110,...a.filter(e=>e.y<160&&e.height<220).map(e=>e.y+e.height+12)),c=o?o.top-r.top-12:i.height-24,l=t.tool===`mass`?_:t.tool===`radius`?v:t.tool===`spin`?y.arc:g;y.layout(n);let u=!O.hidden&&!l.element.hidden&&De.open,d=Math.max(100,c-s),f=u?Math.min(d,Math.max(126,2*n.radius+12)):d;O.style.maxHeight=`${f}px`;for(let e of b)e.element.style.visibility=e===l&&n.visible?`visible`:`hidden`;let p=!l.element.hidden&&n.visible?l.layout(n,i,a):null,m=O.getBoundingClientRect(),x=p?[...a,p.bounds]:a,S=p?.side===1?-1:1,C=D_(n,i,m,x,Pe,S,h.buttonCount);h.place(C?.arc??null,C?.points??[]);let w=u&&p?O_(n,m,i,p.side,p.detailsRadius,[...a,...C?.arc?[C.arc]:[]]):null,T=w?.box??C?.panel;if(O.dataset.notch=T&&T.x+T.width/2>n.x?`left`:`right`,O.dataset.velocityFit=String(!!w),w&&p){let{width:e,height:t}=w.box;O.style.setProperty(`--velocity-notch`,`${w.depth}px`);let n=e-1,r=t-1,i=p.detailsRadius;N(`0 0 ${e} ${t}`,`M 8 1 H ${n} A ${i} ${i} 0 0 0 ${n} ${r} H 8 Q 1 ${r} 1 ${t-8} V 8 Q 1 1 8 1 Z`)}else N(`0 0 100 100`,M);Pe=T?{x:T.x+T.width/2,y:T.y+T.height/2}:null,O.style.left=`${T?.x??12}px`,O.style.top=`${T?.y??s}px`},update(i=!0){let a=t.feedback,o=t.hasGesture||t.phase===`creating-preview`?null:t.error??(a?.kind===`invalid-position`?`INVALID_PLACEMENT`:null);i&&o&&o!==ae?p(e,`error`):i&&!o&&a!==oe&&a?.kind===`cancelled`&&p(e,`droplet`),ae=o,oe=a,q.forEach(e=>e.sync());let c=t.body,u=t.state?.state.bodies??[];m.update(),h.update(),P.update(),y.update();let d=t.creating,b=!d&&O.dataset.creating===`true`&&t.phase===`viewing`;(d||c?.id!==D?.id)&&(D=null),b&&c&&t.feedback?.kind===`committed`&&(D={id:c.id,name:c.name}),E.dataset.outcome=D?`created`:``,r(E,()=>D?n(`creation.created`,{name:D.name}):t.error===`INVALID_PLACEMENT`?n(`editor.invalidPlacement`):!c&&t.feedback?n(j_(t.feedback)):``),E.hidden=!E.textContent,O.dataset.creating=String(d),!d&&f&&(f=!1,m.focusToggle());let x=!!c&&t.phase!==`creating-preview`;if(g.element.hidden=!x||t.creating||t.tool!==`velocity`,_.element.hidden=!x||t.tool!==`mass`,v.element.hidden=!x||t.tool!==`radius`,!x||!c){O.hidden=!0;return}let S=t.phase===`viewing`&&O.dataset.phase!==`viewing`;(S||t.tool!==`velocity`)&&(ie=!1),S&&(ye.value=`manual`),O.dataset.phase=t.phase,O.dataset.selectedId=c.id;let k=ge!==c.id;k&&(ge=c.id,m.close(),ye.value=`manual`),(k||Ne!==t.tool||b)&&(De.open=d),De.hidden=t.tool===`position`&&!d,P.element.hidden=t.tool!==`position`;let A=Math.hypot(c.velocityMS.x,c.velocityMS.y,c.velocityMS.z)/1e3;g.setSpeed(()=>n(`editor.speedTotal`,{value:Number.isFinite(A)?Jg(A):n(`editor.outOfRange`)}));let j=dg(c),M=()=>n(`editor.radiusReadout`,{value:Jg(c.radiusM/1e3)});w(M),C(M),T(()=>n(`editor.density`,{value:j===null?n(`editor.outOfRange`):Jg(j)})),d&&(De.open=!0),(k||Ne!==t.tool||S)&&(Ee.scrollTop=0,Ne=t.tool),W.hidden=t.tool!==`position`||!u.some(e=>e.id===c.id),W.disabled=t.busy;for(let[e,n]of F)n.hidden=e!==t.tool||d&&(e===`position`||e===`velocity`);let N=t.canEditValues;G.update(),pe();for(let[e,r]of re)if(r.readOnly=!N,r.setAttribute(`aria-busy`,String(t.phase===`awaiting-freeze`)),r.disabled=t.phase===`committing`,!N||document.activeElement!==r){let t=se(e,c);r.value=Jg(t),s(r,`title`,()=>Number.isFinite(t)?n(`editor.preciseValue`,{value:String(t)}):n(`editor.invalidInput`))}for(let[e,n]of me)if(n.disabled=!t.canStartGesture&&!J.get(e).some(e=>e.captured),!t.hasGesture){let t=e===`mass`?lg(c.massKg):e===`radius`?Math.log10(c.radiusM):e===`height`?c.positionM.z/1e3:c.velocityMS.z/1e3,r=e===`mass`||e===`radius`?Math.log10(2):e===`height`?1e4:1;if(Number.isFinite(t)){let i=K.get(e);i.update(c.id,t,r),n.min=String(i.min),n.max=String(i.max),n.value=String(t),he.get(e).sync()}}let I=u.filter(e=>e.id!==c.id).map(e=>e.id),ee=d+I.join(`|`);ve.dataset.ids!==ee&&(ve.dataset.ids=ee,Le(ve,I,d)),k&&d&&(ve.value=``),U.hidden=!d;let z=I.join(`|`);V.dataset.ids!==z&&(V.dataset.ids=z,Le(V,I,!0)),V.value=t.creationReferenceId??``,V.disabled=!N,te.value=t.creationMotion,te.disabled=!N;let B=d&&!t.creationReferenceId,H=u.length?`creation.orbitRequired`:`creation.orbitEmpty`;R.hidden=!B,r(R,()=>B?n(H):``),V.setAttribute(`aria-invalid`,String(B)),V.setAttribute(`aria-describedby`,B?R.id:``),L.hidden=B,r(L,()=>t.creationReferenceId?n(t.error?`creation.orbitInvalid`:t.creationMotion===`inherit`?`creation.fallSuggestion`:`creation.orbitSuggestion`,{name:Ie(t.creationReferenceId)}):``),ye.disabled=ve.disabled=d||!I.length||!(N||t.phase===`viewing`&&!t.blocked),d&&(c.kind===`star`||c.kind===`black-hole`)&&l(L,()=>` `+n(`creation.highMass`));let ne=t.phase===`committing`;we.setAttribute(`aria-busy`,String(ne)),r(Se,()=>n(d?ne?`creation.submitting`:`creation.confirm`:`editor.confirm`)),Ce.hidden=!t.busy,Se.hidden=Ce.hidden||!d&&t.tool===`velocity`&&(ie||ne),Se.disabled=!N||!!t.error,Ce.disabled=ne,we.hidden=W.hidden&&Se.hidden&&Ce.hidden;let ce=t.candidate?[...u.filter(e=>e.id!==t.candidate.id),t.candidate]:u;r(Te,()=>B&&t.error===`REFERENCE_REQUIRED`?``:t.errorDetails&&t.errorDetails.code!==`INVALID_INPUT`?Kg(t.errorDetails,ce)+n(`risk.notCommitted`):t.error?n(A_[t.error]??`editor.invalid`):t.state?.jump?n(`editor.busy`):t.phase===`awaiting-freeze`?n(`editor.awaiting`):t.phase===`committing`?n(`editor.committing`):t.feedback&&t.feedback.kind!==`committed`?n(j_(t.feedback)):``),Ae()},dispose(){g.element.remove(),_.element.remove(),v.element.remove(),y.dispose(),he.forEach(e=>e.dispose()),q.forEach(e=>e.dispose()),m.dispose(),h.dispose(),P.dispose(),O.remove()}}}function N_(e){let o=document.createElement(`div`);o.className=`language-setting`;let s=document.createElement(`span`);r(s,()=>n(`locale.label`));let c=document.createElement(`div`);c.className=`theme-choices language-choices`,c.setAttribute(`role`,`group`),a(c,`aria-label`,()=>n(`locale.label`));let l=new Map;for(let[r,i,o]of[[`zh-CN`,`CN`,`locale.chinese`],[`en-US`,`EN`,`locale.english`]]){let s=document.createElement(`button`);s.type=`button`,s.textContent=i,s.lang=r,a(s,`aria-label`,()=>n(o)),s.onpointerdown=e=>e.preventDefault(),s.onclick=()=>{t()!==r&&(u(r),p(e,`toggle`))},c.append(s),l.set(r,s)}let d=()=>l.forEach((e,n)=>e.setAttribute(`aria-pressed`,String(n===t()))),f=i(d);return d(),o.append(s,c),e.append(o),{dispose(){f(),o.remove()}}}var P_=`planet-simulator-orbit-visibility-v1`,F_={cosmos:!0,atelier:!1};function I_(){try{return localStorage}catch{return null}}var L_=class{storage;overrides={};constructor(e=I_()){this.storage=e;try{let t=e?.getItem(P_);if(t&&t.length<256){let e=JSON.parse(t);if(e&&typeof e==`object`)for(let t of[`cosmos`,`atelier`]){let n=e[t];typeof n==`boolean`&&(this.overrides[t]=n)}}}catch{}}enabled(e){return this.overrides[e]??F_[e]}choose(e,t){this.overrides[e]=t;try{this.storage?.setItem(P_,JSON.stringify(this.overrides))}catch{}}};function R_(e,t,i){let o=document.createElement(`details`);o.className=`spatial-menu`;let s=document.createElement(`summary`);nd(s,()=>n(`theme.spatialControls`),`more`);let c=document.createElement(`div`);c.className=`spatial-menu-panel`,c.setAttribute(`role`,`group`),a(c,`aria-label`,()=>n(`theme.spatialControls`)),m(o,o,s);let l=document.createElement(`div`);l.className=`spatial-grid-options`;let u=new Map;for(let[i,c]of[[`off`,`theme.gravityOff`],[`reference`,`theme.gravityReference`],[`well`,`theme.gravityWell`]]){let d=document.createElement(`button`);d.type=`button`,r(d,()=>n(c)),a(d,`aria-label`,()=>n(c)),d.onclick=()=>{let n=e.value!==i;e.value=i,t(),o.open=!1,s.focus(),p(o,n?`toggle`:`droplet`)},u.set(i,d),l.append(d)}return e.hidden=!0,c.append(e,l,i),o.append(s,c),o.onkeydown=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),o.open=!1,s.focus(),p(o,`droplet`))},{element:o,sync(t){l.hidden=t!==`cosmos`,i.hidden=t!==`atelier`;for(let[t,n]of u)n.setAttribute(`aria-pressed`,String(e.value===t))}}}function z_(i,s,c,l=()=>{},u=()=>{},d=()=>{},f,h=`cosmos`){let g=document.createElement(`section`);g.className=`theme-controls`,a(g,`aria-label`,()=>n(`theme.label`));let _=document.createElement(`div`);_.className=`theme-choices`;let v=new Map,y=h,b=new L_,x,S=()=>{let e=b.enabled(y);U.checked=e,x!==e&&(x=e,u(e))},C=e=>{y=e,i.dataset.theme=y,document.documentElement.dataset.theme=y,v.forEach((e,t)=>e.setAttribute(`aria-pressed`,String(t===y))),ee.sync(y),ee.element.open=!1,I.hidden=y!==`atelier`,s(y),S()};for(let e of[`atelier`,`cosmos`]){let t=document.createElement(`button`);t.type=`button`;let o=n(e===`atelier`?`theme.atelier`:`theme.cosmos`);r(t,()=>o),a(t,`aria-label`,()=>o),t.addEventListener(`click`,()=>{let t=y!==e;C(e),t&&p(i,`toggle`)}),v.set(e,t),_.append(t)}let w=document.createElement(`details`);w.className=`theme-credits`;let T=document.createElement(`summary`);r(T,()=>n(`theme.sources`));let E=document.createElement(`div`),D=document.createElement(`details`);D.className=`display-settings`;let O=document.createElement(`summary`);r(O,()=>n(`theme.settings`)),nd(O,()=>n(`theme.settings`),`settings`,!1),m(i,D,O),m(i,w,T),D.onkeydown=e=>{e.key===`Escape`&&D.open&&(e.preventDefault(),e.stopPropagation(),D.open=!1,O.focus(),p(i,`droplet`))};let k=e=>{D.open&&!e.composedPath().includes(D)&&(D.open=!1)};i.addEventListener(`click`,k,!0);let A=document.createElement(`div`);A.className=`display-settings-panel`;let j=document.createElement(`select`);a(j,`aria-label`,()=>n(`theme.gravity`));for(let[e,t]of[[`off`,`theme.gravityOff`],[`reference`,`theme.gravityReference`],[`well`,`theme.gravityWell`]]){let i=document.createElement(`option`);i.value=e,r(i,()=>n(t)),j.append(i)}j.value=`off`;let M=document.createElement(`label`),N=document.createElement(`input`);N.type=`checkbox`,N.checked=!0,M.className=`theme-display-option`,a(N,`aria-label`,()=>n(`theme.softShadows`)),M.append(bf(N),e(()=>n(`theme.softShadows`)));let P=document.createElement(`label`),F=document.createElement(`input`);F.type=`checkbox`,a(F,`aria-label`,()=>n(`theme.axis`)),P.append(bf(F),e(()=>n(`theme.axis`)));let I=document.createElement(`label`),L=document.createElement(`input`);L.type=`checkbox`,a(L,`aria-label`,()=>n(`theme.overviewNames`)),I.append(bf(L),e(()=>n(`theme.overviewNames`)));let R=()=>{l(j.value,F.checked,L.checked,N.checked),ee.sync(y)},ee=R_(j,R,M),z=[D,ee.element],B=()=>{for(let e of z)e.open=!1};for(let e of z)e.addEventListener(`toggle`,()=>{if(e.open){for(let t of z)t!==e&&(t.open=!1);f?.()}});let V=document.createElement(`div`);V.className=`scene-view-tools`;let H=document.createElement(`button`);H.type=`button`,H.className=`overview-reset`,nd(H,()=>n(`camera.overview`),`overview`),H.onclick=()=>{H.disabled||d()},V.append(H,ee.element),j.addEventListener(`change`,R),F.addEventListener(`change`,R),L.addEventListener(`change`,R),N.addEventListener(`change`,()=>{R(),ee.element.open=!1});let te=document.createElement(`label`),U=document.createElement(`input`);U.type=`checkbox`,a(U,`aria-label`,()=>n(`orbitScene.show`)),te.append(bf(U),e(()=>n(`orbitScene.show`))),U.onchange=()=>{b.choose(y,U.checked),S()};let ne=document.createElement(`p`);ne.className=`orbit-scene-status`,ne.setAttribute(`role`,`status`),ne.hidden=!0;for(let[e,t]of[[`theme.earthCredit`,`https://www.solarsystemscope.com/textures/`],[`theme.earthLicense`,`https://creativecommons.org/licenses/by/4.0/`],[`theme.otherCredit`,`https://www.solarsystemscope.com/textures/`],[`theme.rotationCredit`,`https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc`],[`theme.moonCredit`,`https://svs.gsfc.nasa.gov/4720/`],[`theme.jupiterCredit`,`https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map/`]]){let i=document.createElement(`p`),a=document.createElement(`a`);r(a,()=>n(e)),a.href=t,a.target=`_blank`,a.rel=`noreferrer`,i.append(a),E.append(i)}w.append(T,E);let W=document.createElement(`div`);W.className=`display-actions`;let re=N_(A);A.append(te,ne,I,P,w,W),D.append(O,A);let ie=document.createElement(`p`);ie.setAttribute(`role`,`status`);let ae=document.createElement(`button`);ae.type=`button`,r(ae,()=>n(`theme.retry`)),ae.hidden=!0,ae.addEventListener(`click`,()=>{c(),p(i,`toggle`)}),g.append(_,D,ie,ae),i.append(g,V),C(y);let oe=new Map;return{actionsHost:A,secondaryActionsHost:W,closePanels:B,setCameraBusy(e){H.disabled=e},initializeOrbits(){u(b.enabled(y))},restore(e,t=!0){j.value=e.gravity,F.checked=e.axis,L.checked=e.names,N.checked=e.shadows,t&&b.choose(e.theme,e.orbits),C(e.theme),R()},updateOrbits(e){U.checked=e.enabled,ne.dataset.phase=e.phase;let t=e.result,i=t?.results.filter(e=>e.points.length>1).length??0;ne.dataset.shown=String(i),ne.dataset.version=String(t?.baseVersion??``),ne.dataset.computeMs=String(t?.computeMs??``);let a=t?t.requested-i:0;ne.hidden=!e.enabled||e.phase!==`failed`&&e.phase!==`waiting`&&!a,r(ne,()=>e.phase===`failed`?n(`orbitScene.failed`):a?n(`orbitScene.omitted`,{count:a}):e.phase===`waiting`?n(`orbitScene.briefWaiting`):``)},update(e,i){oe.set(e,i);let a=[...oe].filter(([,e])=>e===`failed`).map(([e])=>e),s=[...oe.values()].some(e=>e===`loading`);ae.hidden=a.length===0,r(ie,()=>a.length?n(`theme.failed`,{names:a.map(e=>o(e)).join(t()===`en-US`?`, `:`、`)}):s?n(`theme.loading`):``),ie.hidden=ie.textContent===``},dispose(){i.removeEventListener(`click`,k,!0),re.dispose(),g.remove(),V.remove(),delete document.documentElement.dataset.theme}}}async function B_(e){document.documentElement.lang=c,s(document,`title`,()=>n(`app.title`));let t=new URLSearchParams(window.location.search),r=t.get(`larger-planets`)===`1`,i=t.get(`inner-system`)===`1`,a=Og(e),o=null,l;try{o=await se(r?`planet-simulator-large-preview`:void 0),l=(await o.list()).find(e=>e.kind===`workspace`)}catch{o?.close(),o=null}let u=l?.view.theme??`atelier`,d=l?{ok:!0,value:l.state}:de();if(!d.ok)throw Error(d.error.code);a.updateBodyCount(d.value.bodies.length);let m,h,g=null,_,v,y,b,x=!1,S=!1,C=e=>p(a.controlsHost,e),w=e=>{_&&(_.play(e),C(`toggle`))},T,E,D,O,k,A,j=e_(a.controlsHost,{play:w,speed:e=>_?.setSpeed(e),jump:e=>{_?.beginJump(e)&&(x=!0)},cancel:()=>_?.cancelJump(),jumpPending:()=>_?.jumpPending??!1,restore:()=>_?.restore(),resume:()=>_?.resumeJump(),adopt:()=>_?.adoptJump(),resumeLocal:()=>_?.resumeLocalStep(),cancelLocal:()=>_?.cancelLocalStep(),collisionResult:e=>v?.inspectCollisionResult(e),undo:()=>_?.recover(`undo`),redo:()=>_?.recover(`redo`),checkpoint:e=>_?.recover(`checkpoint`,e),experiment:()=>_?.recover(`experiment`)}),M,N=z_(a.controlsHost,e=>M?.setTheme(e),()=>M?.retryTextures(),(e,t,n,r)=>M?.setDisplay(e,t,n,r),e=>E?.setEnabled(e),()=>{!v?.busy&&!b?.jump&&!b?.localStep&&(M?.showOverview(),C(`toggle`))},()=>y?.closeCreation(),u);N.setCameraBusy(!0);let P=nh(N.actionsHost);f(a.controlsHost,P.audio);let F=e=>{e.isTrusted&&e.target instanceof Node&&a.controlsHost.contains(e.target)&&(e.type!==`pointerdown`||e.pointerType===`mouse`)&&P.audio.warm()},I=[`click`,`keydown`,`pointerdown`,`pointerup`,`touchend`];for(let e of I)window.addEventListener(e,F,!0);let L=e=>{e.isTrusted&&e.target instanceof HTMLInputElement&&e.target.type===`checkbox`&&e.target.closest(`.display-settings-panel,.spatial-menu-panel`)&&!e.target.hasAttribute(`data-sound-preference`)&&C(`toggle`)};a.controlsHost.addEventListener(`change`,L);let R=()=>P.audio.setHidden(document.hidden);R(),document.addEventListener(`visibilitychange`,R);try{M=Dg(a.sceneHost,{onContextLost:()=>a.showError(()=>n(`error.contextLost`)),onContextRestored:()=>a.clearError(),onRenderFailure:()=>a.showError(()=>n(`error.webgl`)),bodies:d.value.bodies,widePerspectivePreview:t.get(`wide-perspective`)===`1`,innerSolarSystemPreview:i,compressedOverview:!0,overviewElevationDegrees:34,onSurfaceStatus:(e,t)=>N.update(e,t),onBodyAnchor:e=>y?.layout(e),onUserViewChange:()=>C(`toggle`)}),M.setTheme(u);let e=d.value.bodies,r=null;_=new o_(d.value,{initialPlaying:!l,onOperationPending:e=>j.setOperationPending(e),onSnapshot:t=>{let n=b;b=t,t.physicsIssue?.scope===`live`&&O?.restore(),O?.update(),k?.setBusy(!!v?.busy||!!t.galleryOpen||!!t.jump||!!t.localStep),a.updateBodyCount(t.state.bodies.length),e=t.state.bodies,(!t.jump||r!==t.jump.taskId)&&(M?.update(e,t,t.state.elapsedSeconds),r=null),j.update(t),t.jump||j.updatePreview(null),S=!0;try{v?.update(t)}finally{S=!1}N.setCameraBusy(!!v?.busy||!!t.jump||!!t.localStep),g&&t.recoveryResult?.requestId===g.id&&(t.recoveryResult.outcome===`committed`&&(N.restore(g.file.view),M?.restoreCamera(g.file.view.camera),_?.setSpeed(g.file.speedIndex)),g=null),m?.update(t);let i=t.recoveryResult;i&&i.operation!==`loadScene`&&i.requestId!==n?.recoveryResult?.requestId&&C(i.outcome===`rejected`?`error`:i.operation===`delete`?`success`:`ready`);let o=t.stats.lastJump;x&&o&&o.taskId!==n?.stats.lastJump?.taskId&&(x=!1,C(o.outcome===`failed`?`error`:o.outcome===`cancelled`?`droplet`:`ready`))},onPreview:t=>{r=t?.taskId??null,t?M?.previewPositions(t.positions,t.bodies,t.elapsedSeconds):M?.update(e,void 0,b?.state.elapsedSeconds??0),j.updatePreview(t)},onEditReady:(e,t)=>v?.freezeReady(e,t),onMutation:e=>{M?.settleMutation(e),v?.mutation(e),e.outcome===`committed`&&C(e.kind===`create`?`success`:`tick`)},onFailure:()=>{g=null,x=!1,O?.restore(),v?.fail(),j.fail(),m?.fail()}}),v=new s_(_,()=>{M?.refreshEditor(),y?.update(!S),v&&(T?.update(v),E?.update(v)),j.setEditorBusy(v?.busy??!1),O?.update(),k?.setBusy(!!v?.busy||!!b?.galleryOpen||!!b?.jump||!!b?.localStep),N.setCameraBusy(!!v?.busy||!!b?.jump||!!b?.localStep)}),M.attachEditor(v),A=vg(v),y=M_(a.controlsHost,v,(e,t)=>M?.beginCreation(e,t),()=>{v?.selectedId&&M?.focusBody(v.selectedId)&&C(`toggle`)},N.closePanels),E=new vf(e=>{N.updateOrbits(e),M?.setSceneReferences(e.result)}),N.initializeOrbits(),T=new yf(e=>M?.setPrediction(e.result)),D=xf(N.actionsHost,T),k=ah(a.controlsHost,N.secondaryActionsHost,{fresh:!l}),l&&(N.restore(l.view,!1),M.showOverview(),_.setSpeed(l.speedIndex)),m=id(a.controlsHost,{store:o,current:()=>b,view:()=>({...M.configuration(),orbits:E?.view.enabled??!1}),onOpen:()=>{N.closePanels(),y?.closeCreation()},onRestored:()=>M?.showOverview(),onBackdropClose:()=>{matchMedia(`(max-width:600px)`).matches&&M?.showOverview()},busy:()=>!!v?.busy||(_?.storageBlocked??!0),open:e=>_?.setGallery(e),archive:()=>_?.historyArchive()??null,thumbnail:e=>(h??=sf(),h.capture(e)),load:e=>{let t=_?.loadScene(e.state);return t?(g={id:t,file:e},t):!1}}),b&&(v.update(b),m.update(b))}catch(e){console.error(e),a.showError(()=>n(`error.webgl`))}O=Sf(a.controlsHost,N.secondaryActionsHost,()=>!v?.busy&&!b?.jump&&!b?.localStep&&!b?.galleryOpen,e=>M?.setUIVisible(e)),O.update();let ee=M?wf(a.controlsHost,()=>M.screenshot(),P.audio):void 0,z=e=>{b?.galleryOpen?e.key===`Escape`&&!e.defaultPrevented&&m?.close():oh(e,{hidden:()=>O?.hidden??!1,restore:()=>O?.restore(),cancel:()=>v?.cancel(),confirm:()=>v?.confirm(),editing:()=>v?.busy??!1,togglePlay:()=>w(!b?.playing)})};return window.addEventListener(`keydown`,z),{dispose(){for(let e of I)window.removeEventListener(e,F,!0);a.controlsHost.removeEventListener(`change`,L),document.removeEventListener(`visibilitychange`,R),k?.dispose(),P.dispose(),window.removeEventListener(`keydown`,z),A?.(),m?.dispose(),h?.dispose(),ee?.dispose(),O?.dispose(),v?.cancel(`disposed`),y?.dispose(),E?.dispose(),T?.dispose(),D?.dispose(),_?.dispose(),j.dispose(),N.dispose(),M?.dispose(),a.dispose()}}}export{B_ as createApp};