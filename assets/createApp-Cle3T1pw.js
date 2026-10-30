import{n as e,r as t,t as n}from"./index-DV7U6zaX.js";var r=[1,3600,21600,86400,864e3,2592e3],i=Object.freeze({batchMs:8,batchSteps:512,jumpMs:3e4,jumpSteps:1e6,snapshotMs:40,progressMs:250,commitMs:3e4});function a(e,t,n=i.jumpSteps){if(!Number.isFinite(e)||e<=0||!Number.isFinite(t)||t<=0||!Number.isSafeInteger(n)||n<1)return{ok:!1,error:`INVALID_DURATION`};if(e>t*n)return{ok:!1,error:`STEP_BUDGET`};let r=Math.round(e/t);return!Number.isSafeInteger(r)||r<1||!Number.isFinite(r*t)?{ok:!1,error:`INVALID_DURATION`}:{ok:!0,steps:r,seconds:r*t}}function o(e,t=i.jumpSteps){return{min:e/2/86400,max:e*t/86400}}function s(e,t,n=i.jumpSteps){let r=o(t,n);return Number.isFinite(e)&&e>r.max?{ok:!1,error:`STEP_BUDGET`}:a(e===r.max?t*n:e===r.min?t/2:e*86400,t,n)}var c=new Intl.DateTimeFormat(`zh-CN`,{timeZone:`UTC`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hourCycle:`h23`});function l(e){if(!Number.isFinite(e))throw RangeError(`Invalid simulation time`);return c.format(new Date(Date.UTC(2e3,0,1,12)+e*1e3))}var u=[`star`,`terrestrial-planet`,`gas-giant`,`moon`,`dwarf-planet`,`asteroid`,`comet`,`black-hole`];function d(e,t,n=[]){return{ok:!1,error:{code:e,field:t,bodyIds:n}}}function f(e){return e.collision.boundary===`capture-radius`?e.collision.captureRadiusM:e.radiusM}function p(e,t,n=0){let r={x:t.positionM.x-e.positionM.x,y:t.positionM.y-e.positionM.y,z:t.positionM.z-e.positionM.z},i=Math.hypot(r.x,r.y,r.z),a=f(e)+f(t),o=[e.id,t.id];return!Number.isFinite(i)||!Number.isFinite(a)?d(`NON_FINITE_CALCULATION`,`pairDistance`,o):i===0?d(`COINCIDENT_BODIES`,`pairDistance`,o):i<=a&&!(n>0&&a-i<=n)?d(`PHYSICAL_OVERLAP`,`collisionBoundary`,o):i<=32*2**-52*Math.max(Math.abs(e.positionM.x),Math.abs(e.positionM.y),Math.abs(e.positionM.z),Math.abs(t.positionM.x),Math.abs(t.positionM.y),Math.abs(t.positionM.z))?d(`NUMERICAL_RANGE`,`separationResolution`,o):{ok:!0,value:{separationM:r,distanceM:i,gapM:i-a}}}var m={minPeriodSeconds:360,maxPeriodSeconds:36e7};function h(e){if(!e||typeof e!=`object`)return!1;let t=e;return Number.isFinite(t.periodSeconds)&&t.periodSeconds>=m.minPeriodSeconds&&t.periodSeconds<=m.maxPeriodSeconds&&Number.isFinite(t.tiltDegrees)&&t.tiltDegrees>=0&&t.tiltDegrees<=180&&(t.direction===1||t.direction===-1)&&Number.isFinite(t.phaseDegrees)&&t.phaseDegrees>=0&&t.phaseDegrees<360&&Number.isFinite(t.epochSeconds)&&t.epochSeconds>=0}function g(e,t){let n=(t-e.epochSeconds)%e.periodSeconds/e.periodSeconds;return((e.phaseDegrees+e.direction*n*360)%360+360)%360}function _(e,t){return e===t||!!e&&!!t&&e.periodSeconds===t.periodSeconds&&e.tiltDegrees===t.tiltDegrees&&e.direction===t.direction&&e.phaseDegrees===t.phaseDegrees&&e.epochSeconds===t.epochSeconds}function v(e){if(!e||typeof e!=`object`)return!1;let t=e;return Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)}function y(e){return typeof e==`number`&&Number.isFinite(e)&&e>0}function b(e){return y(e)?{ok:!0,value:e}:d(`INVALID_INPUT`,`timeStepSeconds`)}function x(e){if(!Array.isArray(e))return d(`INVALID_INPUT`,`bodies`);let t=new Set;for(let n of e){if(!n||typeof n!=`object`)return d(`INVALID_INPUT`,`body`);for(let e of[`id`,`name`,`materialId`])if(typeof n[e]!=`string`||!n[e].trim())return d(`INVALID_INPUT`,e);if(t.has(n.id))return d(`INVALID_INPUT`,`duplicateId`,[n.id]);if(t.add(n.id),!u.includes(n.kind))return d(`INVALID_INPUT`,`kind`,[n.id]);if(n.displaySpin!==void 0&&(n.kind===`black-hole`||!h(n.displaySpin)))return d(`INVALID_INPUT`,`displaySpin`,[n.id]);for(let e of[`massKg`,`radiusM`])if(!y(n[e]))return d(`INVALID_INPUT`,e,[n.id]);for(let e of[`positionM`,`velocityMS`])if(!v(n[e]))return d(`INVALID_INPUT`,e,[n.id]);let e=n.collision;if(!e||(n.kind===`black-hole`?e.boundary!==`capture-radius`||!y(e.captureRadiusM):e.boundary!==`physical-radius`))return d(`INVALID_INPUT`,`collision`,[n.id])}return{ok:!0,value:e}}function S(e){return e.map(e=>({...e,positionM:{...e.positionM},velocityMS:{...e.velocityMS},collision:{...e.collision},...e.displaySpin?{displaySpin:{...e.displaySpin}}:{}}))}var C=(e,t)=>JSON.stringify(e<t?[e,t]:[t,e]),w=66743e-15,T=299792458,E=149597870700;function D(e,t){let n=x(e);if(!n.ok)return n;let r=e.map(()=>({x:0,y:0,z:0}));for(let n=0;n<e.length;n+=1){let i=e[n];for(let a=n+1;a<e.length;a+=1){let o=e[a],s=p(i,o,t?t.get(C(i.id,o.id))??0:0);if(!s.ok)return s;let{distanceM:c,separationM:l}=s.value,u=w*o.massKg/c/c,f=w*i.massKg/c/c;if(!Number.isFinite(u)||!Number.isFinite(f))return d(`NON_FINITE_CALCULATION`,`pairAcceleration`,[i.id,o.id]);if(u===0||f===0)return d(`NUMERICAL_RANGE`,`accelerationUnderflow`,[i.id,o.id]);for(let e of[`x`,`y`,`z`]){let t=l[e]/c;r[n][e]+=t*u,r[a][e]-=t*f}}}return r.every(v)?{ok:!0,value:r}:d(`NON_FINITE_CALCULATION`,`totalAcceleration`)}function O(e,t){let n=b(t);if(!n.ok)return n;let r=D(e);return r.ok?{ok:!0,value:{schemaVersion:1,elapsedSeconds:0,config:{timeStepSeconds:t},bodies:S(e)}}:r}function k(e){return{...e,config:{...e.config},bodies:S(e.bodies)}}var A=e=>2*w*e/T**2;function j(e){return e.kind===`black-hole`?{...e,collision:{boundary:`capture-radius`,captureRadiusM:A(e.massKg)}}:{...e,collision:{boundary:`physical-radius`}}}function M(e){return Array.isArray(e)&&e.length<=100&&e.every((t,n)=>{let r=t?.event;return Number.isSafeInteger(t?.id)&&t.id>0&&(n===0||t.id>e[n-1].id)&&!!r&&Number.isFinite(r.timeSeconds)&&r.timeSeconds>=0&&Number.isFinite(r.densityKgM3)&&r.densityKgM3>0&&Array.isArray(r.sourceIds)&&r.sourceIds.length>=2&&new Set(r.sourceIds).size===r.sourceIds.length&&r.sourceIds.every(e=>typeof e==`string`&&!!e)&&Array.isArray(r.sourceNames)&&r.sourceNames.length===r.sourceIds.length&&r.sourceNames.every(e=>typeof e==`string`&&!!e)&&x([r.body]).ok&&r.sourceIds.includes(r.body.id)&&Number.isFinite(r.retainedMassKg)&&r.retainedMassKg>0&&Number.isFinite(r.addedMassKg)&&r.addedMassKg>0&&Math.abs(r.retainedMassKg+r.addedMassKg-r.body.massKg)<=8*2**-52*r.body.massKg&&(r.kind===`merge`&&r.body.kind!==`black-hole`||r.kind===`absorption`&&r.body.kind===`black-hole`)})}function N(e){try{if(!e||e.schemaVersion!==1||!Number.isFinite(e.elapsedSeconds)||e.elapsedSeconds<0||e.config?.timeStepSeconds!==300||!Array.isArray(e.bodies)||e.bodies.length>256||!O(e.bodies,300).ok)return!1;l(e.elapsedSeconds);for(let t=0;t<e.bodies.length;t++){let n=e.bodies[t];if(n.kind===`black-hole`&&(n.collision.boundary!==`capture-radius`||n.collision.captureRadiusM!==A(n.massKg)))return!1;for(let r=t+1;r<e.bodies.length;r++)if(!p(n,e.bodies[r]).ok)return!1}return!0}catch{return!1}}var P={fileBytes:2e6,bodies:256,records:200,automatic:10,thumbnailBytes:4e5},F=e=>!!e&&[e.x,e.y,e.z].every(e=>Number.isFinite(e)&&Math.abs(e)<0xe8d4a51000);function I(e,t){return!!e&&[`cosmos`,`atelier`].includes(e.theme)&&[`off`,`reference`,`well`].includes(e.gravity)&&[e.axis,e.names,e.shadows,e.orbits].every(e=>typeof e==`boolean`)&&!!e.camera&&F(e.camera.position)&&F(e.camera.target)&&typeof e.camera.followId==`string`&&typeof e.camera.overview==`boolean`&&(e.camera.overview||t.bodies.some(t=>t.id===e.camera.followId))&&(e.camera.near===void 0||Number.isFinite(e.camera.near)&&e.camera.near>0)&&(e.camera.far===void 0||Number.isFinite(e.camera.far)&&e.camera.far>(e.camera.near??0))&&Number.isFinite(e.camera.minDistance)&&Number.isFinite(e.camera.maxDistance)&&e.camera.minDistance>0&&e.camera.maxDistance>e.camera.minDistance&&Math.hypot(e.camera.position.x-e.camera.target.x,e.camera.position.y-e.camera.target.y,e.camera.position.z-e.camera.target.z)>0}function L(e){try{return!!e&&e.schemaVersion===1&&typeof e.id==`string`&&e.id.length>0&&e.id.length<100&&Number.isFinite(e.createdAt)&&e.createdAt>0&&Number.isFinite(new Date(e.createdAt).getTime())&&typeof e.name==`string`&&e.name.length<=80&&[`manual`,`checkpoint`,`workspace`].includes(e.kind)&&typeof e.pinned==`boolean`&&Array.isArray(e.state?.bodies)&&e.state.bodies.length<=P.bodies&&e.state.config?.timeStepSeconds===300&&N(e.state)&&I(e.view,e.state)&&Number.isInteger(e.speedIndex)&&e.speedIndex>=0&&e.speedIndex<6}catch{return!1}}function ee(e){if(new TextEncoder().encode(e).length>P.fileBytes)throw Error(`file`);let t=JSON.parse(e);if(!L(t))throw Error(`file`);return structuredClone(t)}function te(e,t,n,r,i=``,a=crypto.randomUUID()){let o={schemaVersion:1,id:a,createdAt:Date.now(),name:i.slice(0,80),kind:r,pinned:!1,state:k(e),view:structuredClone(t),speedIndex:n};if(!L(o))throw Error(`file`);return o}function ne(e,t){let n=e.filter(e=>e.id!==t.id).concat(t),r=n.filter(e=>e.kind===`checkpoint`&&!e.pinned).sort((e,t)=>t.createdAt-e.createdAt||t.id.localeCompare(e.id)),i=new Set(r.slice(P.automatic).map(e=>e.id)),a=n.filter(e=>!i.has(e.id));if(a.length>P.records)throw Error(`quota`);return a}async function R(e=`planet-simulator-scenes`){let t=await new Promise((t,n)=>{let r=!1,i=e=>{r||(r=!0,clearTimeout(a),n(e))},a=setTimeout(()=>i(Error(`blocked`)),3e3),o=indexedDB.open(e,1);o.onupgradeneeded=()=>{o.result.createObjectStore(`scenes`,{keyPath:`id`}),o.result.createObjectStore(`images`)},o.onsuccess=()=>{r?o.result.close():(r=!0,clearTimeout(a),t(o.result))},o.onerror=()=>i(o.error),o.onblocked=()=>i(Error(`blocked`))});t.onversionchange=()=>t.close();let n=(e,n)=>new Promise((r,i)=>{let a=n(t.transaction(e,`readonly`).objectStore(e));a.onsuccess=()=>r(a.result),a.onerror=()=>i(a.error)});return{async list(){let e=await n(`scenes`,e=>e.getAll());if(!e.every(L))throw Error(`file`);return e.sort((e,t)=>t.createdAt-e.createdAt)},async image(e){return await n(`images`,t=>t.get(e))??null},put(e,n,r){return!L(e)||n!==void 0&&(!n.startsWith(`data:image/jpeg;base64,`)||n.length>P.thumbnailBytes)?Promise.reject(Error(`file`)):new Promise((i,a)=>{let o=t.transaction([`scenes`,`images`],`readwrite`),s=o.objectStore(`scenes`),c=o.objectStore(`images`),l=s.getAll();o.oncomplete=()=>i(),o.onerror=()=>a(o.error),o.onabort=()=>a(o.error??Error(`quota`)),l.onsuccess=()=>{try{let t=l.result;if(!t.every(L))throw Error(`file`);let i=ne(t,e),a=new Set(i.map(e=>e.id));for(let e of t)a.has(e.id)||(s.delete(e.id),c.delete(e.id));let o=r?.preserveName?{...e,name:t.find(t=>t.id===e.id)?.name??e.name}:e;a.has(e.id)&&(s.put(structuredClone(o)),n!==void 0&&c.put(n,e.id))}catch{o.abort()}}})},rename(e,n){return typeof n!=`string`||n.length>80?Promise.reject(Error(`file`)):new Promise((r,i)=>{let a=t.transaction(`scenes`,`readwrite`),o=a.objectStore(`scenes`),s=o.get(e);a.oncomplete=()=>r(),a.onerror=()=>i(a.error),a.onabort=()=>i(a.error??Error(`file`)),s.onsuccess=()=>{L(s.result)?o.put({...s.result,name:n}):a.abort()}})},remove(e){return new Promise((n,r)=>{let i=t.transaction([`scenes`,`images`],`readwrite`);i.objectStore(`scenes`).delete(e),i.objectStore(`images`).delete(e),i.oncomplete=()=>n(),i.onerror=()=>r(i.error),i.onabort=()=>r(i.error)})},close(){t.close()}}}var re={epoch:{jd:2451545,timeScale:`TDB`,calendar:`2000-01-01 12:00:00 TDB`,note:`Query instant in TDB; standard J2000.0 reference epoch is defined in TT.`},frame:`Solar System Barycenter; fixed Horizons J2000 ecliptic axes derived from ICRF`,units:`SI`,gravitationalConstantSI:66743e-15,bodies:[{id:`sun`,targetId:10,kind:`star`,name:`sun`,gmKm3S2:132712440041.93938,massKg:1988409871326422e15,radiusM:6957e5,positionM:{x:-1067706805.380953,y:-418275271.8194473,z:30861817.2547682},velocityMS:{x:9.312571926520471,y:-12.82475570794162,z:-.1633507186350417},materialId:`sun`,collision:{boundary:`physical-radius`},provenance:{rawFile:`sun.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM, km^3/s^2          = 132712440041.93938`,radiusSourceLine:`Vol. mean radius, km  = 695700`,sha256:`cb2e2c6611002ddc3cbbdcec9e5c78bd8eb96fae92861fcb2ffd7bf2a6e5d1ae`}},{id:`mercury`,targetId:199,kind:`terrestrial-planet`,name:`mercury`,gmKm3S2:22031.86855,massKg:33010006367708975e7,radiusM:2439400,positionM:{x:-20529433161.23468,y:-67331550535.34345,z:-3648992526.494771},velocityMS:{x:37004.30442920571,y:-11177.24068132644,z:-4307.7914693768535},materialId:`mercury`,collision:{boundary:`physical-radius`},provenance:{rawFile:`mercury.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM (km^3/s^2)         = 22031.86855`,radiusSourceLine:`Vol. Mean Radius (km) =  2439.4`,sha256:`67df65e146fe7bdeb0102708b3db1ac2a787bd9fd7743b5843350dbe17431935`}},{id:`venus`,targetId:299,kind:`terrestrial-planet`,name:`venus`,gmKm3S2:324858.592,massKg:4867305814842006e9,radiusM:6051840,positionM:{x:-108524200857.5715,y:-5303290247.691983,z:6166496116.973171},velocityMS:{x:1391.2186011899669,y:-35153.11993215464,z:-560.2056890007159},materialId:`venus`,collision:{boundary:`physical-radius`},provenance:{rawFile:`venus.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM (km^3/s^2)         = 324858.592`,radiusSourceLine:`Vol. Mean Radius (km) =  6051.84`,sha256:`746de16bf756bd0d97207a4fa40745f09e5b4fcfd43ae2a20279356ab9ff9049`}},{id:`earth`,targetId:399,kind:`terrestrial-planet`,name:`earth`,gmKm3S2:398600.435436,massKg:5972168398723462e9,radiusM:6371010,positionM:{x:-27566740482.81145,y:144279021520.7299,z:30250667.8288132},velocityMS:{x:-29784.947498510883,y:-5482.119695478543,z:.01843295986780902},materialId:`earth`,collision:{boundary:`physical-radius`},provenance:{rawFile:`earth.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM, km^3/s^2             = 398600.435436`,radiusSourceLine:`Vol. Mean Radius (km)    = 6371.01`,sha256:`d58d6b539428bddb6fbba53d24004c9fdf384894d11ff50a87b1a314a68bda40`}},{id:`moon`,targetId:301,kind:`moon`,name:`moon`,gmKm3S2:4902.800066,massKg:7345789170399893e7,radiusM:1737530,positionM:{x:-27858348866.99916,y:144004041779.0567,z:66521864.45580423},velocityMS:{x:-29141.41610952193,y:-6213.103678165645,z:-11.48803177931867},materialId:`moon`,collision:{boundary:`physical-radius`},provenance:{rawFile:`moon.json`,apiVersion:`1.2`,targetEphemeris:`DE441`,gmSourceLine:`GM, km^3/s^2          = 4902.800066`,radiusSourceLine:`Vol. mean radius, km  = 1737.53`,sha256:`6312a38c25eaddb0e3b9d307ef5df4bbb1ca121c1782e3d6b61aa683a7295315`}},{id:`mars`,targetId:499,kind:`terrestrial-planet`,name:`mars`,gmKm3S2:42828.375662,massKg:641690898850816e9,radiusM:3389920,positionM:{x:206980433836.461,y:-2425327899.844669,z:-5125427142.013254},velocityMS:{x:1171.984975692608,y:26283.23978975472,z:522.1336722766505},materialId:`mars`,collision:{boundary:`physical-radius`},provenance:{rawFile:`mars.json`,apiVersion:`1.2`,targetEphemeris:`mar099`,gmSourceLine:`GM (km^3/s^2)         = 42828.375662`,radiusSourceLine:`Vol. mean radius (km) = 3389.92`,sha256:`dd24dc0047e12c586fb493e1c7a72a7e4cba84ba97c52f371aa90c1b1ab4c2c4`}},{id:`jupiter`,targetId:599,kind:`gas-giant`,name:`jupiter`,gmKm3S2:126686531.9,massKg:18981246258034552e11,radiusM:69911e3,positionM:{x:597499917851.6835,y:439186404676.3535,z:-15195999855.73271},velocityMS:{x:-7900.547720245487,y:11143.392770659339,z:130.7023308637314},materialId:`jupiter`,collision:{boundary:`physical-radius`},provenance:{rawFile:`jupiter.json`,apiVersion:`1.2`,targetEphemeris:`jup365_merged`,gmSourceLine:`GM (km^3/s^2)         = 126686531.900`,radiusSourceLine:`Vol. Mean Radius (km) = 69911`,sha256:`8752ceb731b878c45b34f483c8972d1a6a6398ff290c7db7f87d0d466fb176bb`}},{id:`saturn`,targetId:699,kind:`gas-giant`,name:`saturn`,gmKm3S2:37931206.234,massKg:5683173701212113e11,radiusM:58232e3,positionM:{x:957317652110.3407,y:982438007687.5085,z:-55182117881.50037},velocityMS:{x:-7421.90038683812,y:6723.930997200832,z:177.5749426205731},materialId:`saturn`,collision:{boundary:`physical-radius`},provenance:{rawFile:`saturn.json`,apiVersion:`1.2`,targetEphemeris:`sat441l`,gmSourceLine:`GM (km^3/s^2)         = 37931206.234`,radiusSourceLine:`Vol. Mean Radius (km) = 58232`,sha256:`33448109a5a8b5567862de01f31158876fb245322a558cac7cca10394cad3f03`}},{id:`uranus`,targetId:799,kind:`gas-giant`,name:`uranus`,gmKm3S2:5793950.6103,massKg:8680986186266726e10,radiusM:25362e3,positionM:{x:2157907112723.4167,y:-2055043811740.0369,z:-35594639499.61483},velocityMS:{x:4646.584677611653,y:4614.773473441427,z:-43.085218888708745},materialId:`uranus`,collision:{boundary:`physical-radius`},provenance:{rawFile:`uranus.json`,apiVersion:`1.2`,targetEphemeris:`ura184_merged`,gmSourceLine:`GM (km^3/s^2)         = 5793950.6103`,radiusSourceLine:`Vol. Mean Radius (km) = 25362`,sha256:`49f90b187a455dd1f7a22cc1b4d57f74e3bef95c0a717ae7f84a22f96ced84e1`}},{id:`neptune`,targetId:899,kind:`gas-giant`,name:`neptune`,gmKm3S2:6835099.97,massKg:1024092409690904e11,radiusM:24624e3,positionM:{x:2513978816984.908,y:-3739132842893.97,z:19063078769.80734},velocityMS:{x:4474.58791838248,y:3063.15514301819,z:-166.4119952893173},materialId:`neptune`,collision:{boundary:`physical-radius`},provenance:{rawFile:`neptune.json`,apiVersion:`1.2`,targetEphemeris:`nep098_merged`,gmSourceLine:`GM (km^3/s^2)         = 6835099.97`,radiusSourceLine:`Vol. mean radius (km) = 24624`,sha256:`6c26f9f4c11557f401eed5f6d923fcf778875ed21f5c4e8c8ff1136cb9e29431`}}]},z=Object.freeze({...re.epoch}),B=Object.freeze(re.bodies.map(e=>Object.freeze({id:e.id,name:e.name,kind:e.kind,massKg:e.massKg,radiusM:e.radiusM,positionM:Object.freeze({...e.positionM}),velocityMS:Object.freeze({...e.velocityMS}),materialId:e.materialId,collision:Object.freeze({boundary:`physical-radius`})})));function V(e=300){return O(B,e)}var ie=[`alignment`,`binary`,`retrograde`],H=e=>structuredClone(B.find(t=>t.id===e)),ae={x:0,y:0,z:0};function oe(e){let t=e.reduce((e,t)=>e+t.massKg,0),n={...ae},r={...ae};for(let i of e)for(let e of[`x`,`y`,`z`])n[e]+=i.massKg/t*i.positionM[e],r[e]+=i.massKg/t*i.velocityMS[e];return e.map(e=>({...e,positionM:{x:e.positionM.x-n.x,y:e.positionM.y-n.y,z:e.positionM.z-n.z},velocityMS:{x:e.velocityMS.x-r.x,y:e.velocityMS.y-r.y,z:e.velocityMS.z-r.z}}))}function U(e,t,n,r,i=1){let a=Math.sqrt(w*(t.massKg+e.massKg)/n),o=Math.cos(r),s=Math.sin(r);return{...e,positionM:{x:n*o,y:n*s,z:0},velocityMS:{x:-i*a*s,y:i*a*o,z:0}}}function W(e,t,n=t){let r={...H(`sun`),positionM:{...ae},velocityMS:{...ae}},i;if(e===`alignment`){let e=[`mercury`,`venus`,`earth`,`mars`,`jupiter`,`saturn`,`uranus`].map(H),t=H(`sun`);i=[r,...e.map(e=>U(e,r,Math.hypot(e.positionM.x-t.positionM.x,e.positionM.y-t.positionM.y,e.positionM.z-t.positionM.z),0))]}else if(e===`binary`){let e=1.5*E,a=Math.sqrt(w*r.massKg/(2*e));i=[{...r,id:`experiment-primary`,name:n,materialId:`procedural`,positionM:{x:-e/2,y:0,z:0},velocityMS:{x:0,y:-a,z:0}},{...r,id:`experiment-companion`,name:t,materialId:`procedural`,positionM:{x:e/2,y:0,z:0},velocityMS:{x:0,y:a,z:0}}]}else{let e={...H(`earth`),id:`experiment-traveler`,name:t,materialId:`procedural`};i=[r,U(H(`earth`),r,E,0),U(e,r,1.6*E,Math.PI*.65,-1)]}let a=O(oe(i),300);if(!a.ok)throw Error(`experiment`);return a.value}var se={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ce={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},le=1e3,ue=1001,de=1002,fe=1003,G=1004,pe=1005,me=1006,he=1007,ge=1008,_e=1009,K=1010,ve=1011,ye=1012,q=1013,be=1014,J=1015,xe=1016,Se=1017,Ce=1018,we=1020,Te=35902,Ee=35899,De=1021,Oe=1022,ke=1023,Ae=1026,je=1027,Me=1028,Ne=1029,Pe=1030,Fe=1031,Ie=1033,Le=33776,Re=33777,ze=33778,Be=33779,Ve=35840,He=35841,Ue=35842,We=35843,Ge=36196,Ke=37492,qe=37496,Je=37488,Ye=37489,Xe=37490,Ze=37491,Qe=37808,$e=37809,et=37810,tt=37811,nt=37812,rt=37813,it=37814,at=37815,ot=37816,st=37817,ct=37818,lt=37819,ut=37820,dt=37821,ft=36492,pt=36494,mt=36495,ht=36283,gt=36284,_t=36285,vt=36286,yt=2300,bt=2301,xt=2302,St=2303,Ct=2400,wt=2401,Tt=2402,Et=3200,Dt=`srgb`,Ot=`srgb-linear`,kt=`linear`,At=`srgb`,jt=7680,Mt=35044,Nt=2e3;function Pt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ft(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function It(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Lt(){let e=It(`canvas`);return e.style.display=`block`,e}var Rt={};function zt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Bt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function Y(...e){e=Bt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function X(...e){e=Bt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Vt(...e){let t=e.join(` `);t in Rt||(Rt[t]=!0,Y(...e))}function Ht(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ut={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Wt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Gt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Kt=1234567,qt=Math.PI/180,Jt=180/Math.PI;function Yt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Gt[e&255]+Gt[e>>8&255]+Gt[e>>16&255]+Gt[e>>24&255]+`-`+Gt[t&255]+Gt[t>>8&255]+`-`+Gt[t>>16&15|64]+Gt[t>>24&255]+`-`+Gt[n&63|128]+Gt[n>>8&255]+`-`+Gt[n>>16&255]+Gt[n>>24&255]+Gt[r&255]+Gt[r>>8&255]+Gt[r>>16&255]+Gt[r>>24&255]).toLowerCase()}function Xt(e,t,n){return Math.max(t,Math.min(n,e))}function Zt(e,t){return(e%t+t)%t}function Qt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function $t(e,t,n){return e===t?0:(n-e)/(t-e)}function en(e,t,n){return(1-n)*e+n*t}function tn(e,t,n,r){return en(e,t,1-Math.exp(-n*r))}function nn(e,t=1){return t-Math.abs(Zt(e,t*2)-t)}function rn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function an(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function on(e,t){return e+Math.floor(Math.random()*(t-e+1))}function sn(e,t){return e+Math.random()*(t-e)}function cn(e){return e*(.5-Math.random())}function ln(e){e!==void 0&&(Kt=e);let t=Kt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function un(e){return e*qt}function dn(e){return e*Jt}function fn(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function pn(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function mn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function hn(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:Y(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function gn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function _n(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var vn={DEG2RAD:qt,RAD2DEG:Jt,generateUUID:Yt,clamp:Xt,euclideanModulo:Zt,mapLinear:Qt,inverseLerp:$t,lerp:en,damp:tn,pingpong:nn,smoothstep:rn,smootherstep:an,randInt:on,randFloat:sn,randFloatSpread:cn,seededRandom:ln,degToRad:un,radToDeg:dn,isPowerOfTwo:fn,ceilPowerOfTwo:pn,floorPowerOfTwo:mn,setQuaternionFromProperEuler:hn,normalize:_n,denormalize:gn},Z=class e{static#e=e.prototype.isVector2=!0;constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xt(this.x,e.x,t.x),this.y=Xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xt(this.x,e,t),this.y=Xt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},yn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:Y(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Q=class e{static#e=e.prototype.isVector3=!0;constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xt(this.x,e.x,t.x),this.y=Xt(this.y,e.y,t.y),this.z=Xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xt(this.x,e,t),this.y=Xt(this.y,e,t),this.z=Xt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bn.copy(this).projectOnVector(e),this.sub(bn)}reflect(e){return this.sub(bn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bn=new Q,xn=new yn,Sn=class e{static#e=e.prototype.isMatrix3=!0;constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Vt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Cn.makeScale(e,t)),this}rotate(e){return Vt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Cn.makeRotation(-e)),this}translate(e,t){return Vt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Cn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Cn=new Sn,wn=new Sn().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tn=new Sn().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function En(){let e={enabled:!0,workingColorSpace:Ot,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=On(e.r),e.g=On(e.g),e.b=On(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=kn(e.r),e.g=kn(e.g),e.b=kn(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?kt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Vt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Vt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ot]:{primaries:t,whitePoint:r,transfer:kt,toXYZ:wn,fromXYZ:Tn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:t,whitePoint:r,transfer:At,toXYZ:wn,fromXYZ:Tn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),e}var Dn=En();function On(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function kn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var An,jn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{An===void 0&&(An=It(`canvas`)),An.width=e.width,An.height=e.height;let t=An.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=An}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=It(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=On(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(On(t[e]/255)*255):t[e]=On(t[e]);return{data:t,width:e.width,height:e.height}}return Y(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Mn=0,Nn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Mn++}),this.uuid=Yt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Pn(r[t].image)):e.push(Pn(r[t]))}else e=Pn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Pn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?jn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Y(`Texture: Unable to serialize Texture.`),{})}var Fn=0,In=new Q,Ln=class e extends Wt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=ue,i=ue,a=me,o=ge,s=ke,c=_e,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fn++}),this.uuid=Yt(),this.name=``,this.source=new Nn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Z(0,0),this.repeat=new Z(1,1),this.center=new Z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Sn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(In).x}get height(){return this.source.getSize(In).y}get depth(){return this.source.getSize(In).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Y(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?Y(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case le:e.x-=Math.floor(e.x);break;case ue:e.x=e.x<0?0:1;break;case de:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case le:e.y-=Math.floor(e.y);break;case ue:e.y=e.y<0?0:1;break;case de:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ln.DEFAULT_IMAGE=null,Ln.DEFAULT_MAPPING=300,Ln.DEFAULT_ANISOTROPY=1;var Rn=class e{static#e=e.prototype.isVector4=!0;constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xt(this.x,e.x,t.x),this.y=Xt(this.y,e.y,t.y),this.z=Xt(this.z,e.z,t.z),this.w=Xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xt(this.x,e,t),this.y=Xt(this.y,e,t),this.z=Xt(this.z,e,t),this.w=Xt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},zn=class extends Wt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:me,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rn(0,0,e,t),this.scissorTest=!1,this.viewport=new Rn(0,0,e,t),this.textures=[];let r=new Ln({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:me,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Nn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Bn=class extends zn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Vn=class extends Ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=fe,this.minFilter=fe,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Hn=class extends Ln{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=fe,this.minFilter=fe,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Un=class e{static#e=e.prototype.isMatrix4=!0;constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Wn.setFromMatrixColumn(e,0).length(),i=1/Wn.setFromMatrixColumn(e,1).length(),a=1/Wn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kn,e,qn)}lookAt(e,t,n){let r=this.elements;return Xn.subVectors(e,t),Xn.lengthSq()===0&&(Xn.z=1),Xn.normalize(),Jn.crossVectors(n,Xn),Jn.lengthSq()===0&&(Math.abs(n.z)===1?Xn.x+=1e-4:Xn.z+=1e-4,Xn.normalize(),Jn.crossVectors(n,Xn)),Jn.normalize(),Yn.crossVectors(Xn,Jn),r[0]=Jn.x,r[4]=Yn.x,r[8]=Xn.x,r[1]=Jn.y,r[5]=Yn.y,r[9]=Xn.y,r[2]=Jn.z,r[6]=Yn.z,r[10]=Xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Wn.set(r[0],r[1],r[2]).length(),o=Wn.set(r[4],r[5],r[6]).length(),s=Wn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Gn.copy(this);let c=1/a,l=1/o,u=1/s;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=l,Gn.elements[5]*=l,Gn.elements[6]*=l,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,t.setFromRotationMatrix(Gn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Nt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Nt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Wn=new Q,Gn=new Un,Kn=new Q(0,0,0),qn=new Q(1,1,1),Jn=new Q,Yn=new Q,Xn=new Q,Zn=new Un,Qn=new yn,$n=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Xt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Xt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:Y(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qn.setFromEuler(this),this.setFromQuaternion(Qn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$n.DEFAULT_ORDER=`XYZ`;var er=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},tr=0,nr=new Q,rr=new yn,ir=new Un,ar=new Q,or=new Q,sr=new Q,cr=new yn,lr=new Q(1,0,0),ur=new Q(0,1,0),dr=new Q(0,0,1),fr={type:`added`},pr={type:`removed`},mr={type:`childadded`,child:null},hr={type:`childremoved`,child:null},gr=class e extends Wt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tr++}),this.uuid=Yt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Q,n=new $n,r=new yn,i=new Q(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Un},normalMatrix:{value:new Sn}}),this.matrix=new Un,this.matrixWorld=new Un,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new er,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rr.setFromAxisAngle(e,t),this.quaternion.multiply(rr),this}rotateOnWorldAxis(e,t){return rr.setFromAxisAngle(e,t),this.quaternion.premultiply(rr),this}rotateX(e){return this.rotateOnAxis(lr,e)}rotateY(e){return this.rotateOnAxis(ur,e)}rotateZ(e){return this.rotateOnAxis(dr,e)}translateOnAxis(e,t){return nr.copy(e).applyQuaternion(this.quaternion),this.position.add(nr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lr,e)}translateY(e){return this.translateOnAxis(ur,e)}translateZ(e){return this.translateOnAxis(dr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ir.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ar.copy(e):ar.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ir.lookAt(or,ar,this.up):ir.lookAt(ar,or,this.up),this.quaternion.setFromRotationMatrix(ir),r&&(ir.extractRotation(r.matrixWorld),rr.setFromRotationMatrix(ir),this.quaternion.premultiply(rr.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(X(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fr),mr.child=e,this.dispatchEvent(mr),mr.child=null):X(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pr),hr.child=e,this.dispatchEvent(hr),hr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ir.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ir.multiply(e.parent.matrixWorld)),e.applyMatrix4(ir),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fr),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,e,sr),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,cr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};gr.DEFAULT_UP=new Q(0,1,0),gr.DEFAULT_MATRIX_AUTO_UPDATE=!0,gr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _r=class extends gr{constructor(){super(),this.isGroup=!0,this.type=`Group`}},vr={type:`move`},yr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new _r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},br={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xr={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Cr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var wr=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dn.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Dn.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dn.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Dn.workingColorSpace){if(e=Zt(e,1),t=Xt(t,0,1),n=Xt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Cr(i,r,e+1/3),this.g=Cr(i,r,e),this.b=Cr(i,r,e-1/3)}return Dn.colorSpaceToWorking(this,r),this}setStyle(e,t=Dt){function n(t){t!==void 0&&parseFloat(t)<1&&Y(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:Y(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);Y(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){let n=br[e.toLowerCase()];return n===void 0?Y(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=On(e.r),this.g=On(e.g),this.b=On(e.b),this}copyLinearToSRGB(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return Dn.workingToColorSpace(Tr.copy(this),e),Math.round(Xt(Tr.r*255,0,255))*65536+Math.round(Xt(Tr.g*255,0,255))*256+Math.round(Xt(Tr.b*255,0,255))}getHexString(e=Dt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dn.workingColorSpace){Dn.workingToColorSpace(Tr.copy(this),t);let n=Tr.r,r=Tr.g,i=Tr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Dn.workingColorSpace){return Dn.workingToColorSpace(Tr.copy(this),t),e.r=Tr.r,e.g=Tr.g,e.b=Tr.b,e}getStyle(e=Dt){Dn.workingToColorSpace(Tr.copy(this),e);let t=Tr.r,n=Tr.g,r=Tr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(xr),this.setHSL(xr.h+e,xr.s+t,xr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xr),e.getHSL(Sr);let n=en(xr.h,Sr.h,t),r=en(xr.s,Sr.s,t),i=en(xr.l,Sr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tr=new wr;wr.NAMES=br;var Er=class extends gr{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Dr=new Q,Or=new Q,kr=new Q,Ar=new Q,jr=new Q,Mr=new Q,Nr=new Q,Pr=new Q,Fr=new Q,Ir=new Q,Lr=new Rn,Rr=new Rn,zr=new Rn,Br=class e{constructor(e=new Q,t=new Q,n=new Q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Dr.subVectors(e,t),r.cross(Dr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Dr.subVectors(r,t),Or.subVectors(n,t),kr.subVectors(e,t);let a=Dr.dot(Dr),o=Dr.dot(Or),s=Dr.dot(kr),c=Or.dot(Or),l=Or.dot(kr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ar)!==null&&Ar.x>=0&&Ar.y>=0&&Ar.x+Ar.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Ar)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Ar.x),s.addScaledVector(a,Ar.y),s.addScaledVector(o,Ar.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Lr.setScalar(0),Rr.setScalar(0),zr.setScalar(0),Lr.fromBufferAttribute(e,t),Rr.fromBufferAttribute(e,n),zr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Lr,i.x),a.addScaledVector(Rr,i.y),a.addScaledVector(zr,i.z),a}static isFrontFacing(e,t,n,r){return Dr.subVectors(n,t),Or.subVectors(e,t),Dr.cross(Or).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dr.subVectors(this.c,this.b),Or.subVectors(this.a,this.b),Dr.cross(Or).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;jr.subVectors(r,n),Mr.subVectors(i,n),Pr.subVectors(e,n);let s=jr.dot(Pr),c=Mr.dot(Pr);if(s<=0&&c<=0)return t.copy(n);Fr.subVectors(e,r);let l=jr.dot(Fr),u=Mr.dot(Fr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(jr,a);Ir.subVectors(e,i);let f=jr.dot(Ir),p=Mr.dot(Ir);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Mr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Nr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Nr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(jr,a).addScaledVector(Mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Vr=class{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ur.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ur.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ur.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ur):Ur.fromBufferAttribute(r,t),Ur.applyMatrix4(e.matrixWorld),this.expandByPoint(Ur);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Wr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox)),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ur),Ur.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zr),Qr.subVectors(this.max,Zr),Gr.subVectors(e.a,Zr),Kr.subVectors(e.b,Zr),qr.subVectors(e.c,Zr),Jr.subVectors(Kr,Gr),Yr.subVectors(qr,Kr),Xr.subVectors(Gr,qr);let t=[0,-Jr.z,Jr.y,0,-Yr.z,Yr.y,0,-Xr.z,Xr.y,Jr.z,0,-Jr.x,Yr.z,0,-Yr.x,Xr.z,0,-Xr.x,-Jr.y,Jr.x,0,-Yr.y,Yr.x,0,-Xr.y,Xr.x,0];return!ti(t,Gr,Kr,qr,Qr)||(t=[1,0,0,0,1,0,0,0,1],!ti(t,Gr,Kr,qr,Qr))?!1:($r.crossVectors(Jr,Yr),t=[$r.x,$r.y,$r.z],ti(t,Gr,Kr,qr,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ur).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ur).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Hr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Hr=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Ur=new Q,Wr=new Vr,Gr=new Q,Kr=new Q,qr=new Q,Jr=new Q,Yr=new Q,Xr=new Q,Zr=new Q,Qr=new Q,$r=new Q,ei=new Q;function ti(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ei.fromArray(e,a);let o=i.x*Math.abs(ei.x)+i.y*Math.abs(ei.y)+i.z*Math.abs(ei.z),s=t.dot(ei),c=n.dot(ei),l=r.dot(ei);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ni=new Q,ri=new Z,ii=0,ai=class extends Wt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ii++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Mt,this.updateRanges=[],this.gpuType=J,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyMatrix3(e),this.setXY(t,ri.x,ri.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.applyMatrix3(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.applyMatrix4(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.applyNormalMatrix(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.transformDirection(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),n=_n(n,this.array),r=_n(r,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},oi=class extends ai{constructor(e,t,n){super(new Uint16Array(e),t,n)}},si=class extends ai{constructor(e,t,n){super(new Uint32Array(e),t,n)}},ci=class extends ai{constructor(e,t,n){super(new Float32Array(e),t,n)}},li=new Vr,ui=new Q,di=new Q,fi=class{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?li.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ui.subVectors(e,this.center);let t=ui.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(ui,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(di.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ui.copy(e.center).add(di)),this.expandByPoint(ui.copy(e.center).sub(di))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},pi=0,mi=new Un,hi=new gr,gi=new Q,_i=new Vr,vi=new Vr,yi=new Q,bi=class e extends Wt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pi++}),this.uuid=Yt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Pt(e)?si:oi)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Sn().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mi.makeRotationFromQuaternion(e),this.applyMatrix4(mi),this}rotateX(e){return mi.makeRotationX(e),this.applyMatrix4(mi),this}rotateY(e){return mi.makeRotationY(e),this.applyMatrix4(mi),this}rotateZ(e){return mi.makeRotationZ(e),this.applyMatrix4(mi),this}translate(e,t,n){return mi.makeTranslation(e,t,n),this.applyMatrix4(mi),this}scale(e,t,n){return mi.makeScale(e,t,n),this.applyMatrix4(mi),this}lookAt(e){return hi.lookAt(e),hi.updateMatrix(),this.applyMatrix4(hi.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new ci(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&Y(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)X(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];_i.setFromBufferAttribute(n),this.morphTargetsRelative?(yi.addVectors(this.boundingBox.min,_i.min),this.boundingBox.expandByPoint(yi),yi.addVectors(this.boundingBox.max,_i.max),this.boundingBox.expandByPoint(yi)):(this.boundingBox.expandByPoint(_i.min),this.boundingBox.expandByPoint(_i.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&X(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)X(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Q,1/0);else if(e){let n=this.boundingSphere.center;if(_i.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];vi.setFromBufferAttribute(n),this.morphTargetsRelative?(yi.addVectors(_i.min,vi.min),_i.expandByPoint(yi),yi.addVectors(_i.max,vi.max),_i.expandByPoint(yi)):(_i.expandByPoint(vi.min),_i.expandByPoint(vi.max))}_i.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)yi.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(yi));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)yi.fromBufferAttribute(a,t),o&&(gi.fromBufferAttribute(e,t),yi.add(gi)),r=Math.max(r,n.distanceToSquared(yi))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&X(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){X(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ai(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new Q,s[e]=new Q;let c=new Q,l=new Q,u=new Q,d=new Z,f=new Z,p=new Z,m=new Q,h=new Q;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new Q,y=new Q,b=new Q,x=new Q;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ai(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Q,i=new Q,a=new Q,o=new Q,s=new Q,c=new Q,l=new Q,u=new Q;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yi.fromBufferAttribute(e,t),yi.normalize(),e.setXYZ(t,yi.x,yi.y,yi.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ai(a,r,i)}if(this.index===null)return Y(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},xi=new Q,Si=new Q,Ci=new Sn,wi=class{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=xi.subVectors(n,t).cross(Si.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(xi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ci.getNormalMatrix(e),r=this.coplanarPoint(xi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ti=0,Ei=class extends Wt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ti++}),this.uuid=Yt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wr(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jt,this.stencilZFail=jt,this.stencilZPass=jt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Y(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?Y(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new wr().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new wi().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Z().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Z().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Di=new Q,Oi=new Q,ki=new Q,Ai=new Q,ji=class{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Oi.copy(e).add(t).multiplyScalar(.5),ki.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(Oi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ki),o=Ai.dot(this.direction),s=-Ai.dot(ki),c=Ai.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Oi).addScaledVector(ki,d),f}intersectSphere(e,t){if(e.radius<0)return null;Di.subVectors(e.center,this.origin);let n=Di.dot(this.direction),r=Di.dot(Di)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,ee=E-F*D,te=O-P*A,ne=k-F*A,R=j-P*N,re=M-F*N,z=R*ne-re*te,B=L*re-ee*R,V=te*ee-ne*L;if(r){if(z<0||B<0||V<0)return null}else if((z<0||B<0||V<0)&&(z>0||B>0||V>0))return null;let ie=z+B+V;if(ie===0)return null;let H=I*(z*D+B*A+V*N);return(ie>0?H<0:H>0)?null:this.at(H/ie,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mi=class extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new wr(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ni=new Un,Pi=new ji,Fi=new fi,Ii=new Q,Li=new Q,Ri=new Q,zi=new Q,Bi=new Q,Vi=new Q,Hi=new Q,Ui=new Q,Wi=class extends gr{constructor(e=new bi,t=new Mi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Vi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Bi.fromBufferAttribute(s,e),a?Vi.addScaledVector(Bi,r):Vi.addScaledVector(Bi.sub(t),r))}t.add(Vi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fi.copy(n.boundingSphere),Fi.applyMatrix4(i),Pi.copy(e.ray).recast(e.near),!(Fi.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Fi,Ii)===null||Pi.origin.distanceToSquared(Ii)>(e.far-e.near)**2))&&(Ni.copy(i).invert(),Pi.copy(e.ray).applyMatrix4(Ni),(n.boundingBox===null||Pi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ki(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ki(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ki(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ki(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Gi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ui.copy(s),Ui.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ui);return l<n.near||l>n.far?null:{distance:l,point:Ui.clone(),object:e}}function Ki(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Li),e.getVertexPosition(c,Ri),e.getVertexPosition(l,zi);let u=Gi(e,t,n,r,Li,Ri,zi,Hi);if(u){let e=new Q;Br.getBarycoord(Hi,Li,Ri,zi,e),i&&(u.uv=Br.getInterpolatedAttribute(i,s,c,l,e,new Z)),a&&(u.uv1=Br.getInterpolatedAttribute(a,s,c,l,e,new Z)),o&&(u.normal=Br.getInterpolatedAttribute(o,s,c,l,e,new Q),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Q,materialIndex:0};Br.getNormal(Li,Ri,zi,t.normal),u.face=t,u.barycoord=e}return u}var qi=class extends Ln{constructor(e=null,t=1,n=1,r,i,a,o,s,c=fe,l=fe,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ji=new fi,Yi=new Z(.5,.5),Xi=new Q,Zi=class{constructor(e=new wi,t=new wi,n=new wi,r=new wi,i=new wi,a=new wi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){return Ji.center.set(0,0,0),Ji.radius=.7071067811865476+Yi.distanceTo(e.center),Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Xi.x=r.normal.x>0?e.max.x:e.min.x,Xi.y=r.normal.y>0?e.max.y:e.min.y,Xi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Qi=class extends Ei{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new wr(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},$i=new Q,ea=new Q,ta=new Un,na=new ji,ra=new fi,ia=new Q,aa=new Q,oa=class extends gr{constructor(e=new bi,t=new Qi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)$i.fromBufferAttribute(t,e-1),ea.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=$i.distanceTo(ea);e.setAttribute(`lineDistance`,new ci(n,1))}else Y(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ra.copy(n.boundingSphere),ra.applyMatrix4(r),ra.radius+=i,e.ray.intersectsSphere(ra)===!1)return;ta.copy(r).invert(),na.copy(e.ray).applyMatrix4(ta);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=sa(this,e,na,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=sa(this,e,na,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=sa(this,e,na,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=sa(this,e,na,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function sa(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if($i.fromBufferAttribute(s,i),ea.fromBufferAttribute(s,a),n.distanceSqToSegment($i,ea,ia,aa)>r)return;ia.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ia);if(!(c<t.near||c>t.far))return{distance:c,point:aa.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ca=new Q,la=new Q,ua=class extends oa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ca.fromBufferAttribute(t,e),la.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ca.distanceTo(la);e.setAttribute(`lineDistance`,new ci(n,1))}else Y(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},da=class extends Ei{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new wr(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fa=new Un,pa=new ji,ma=new fi,ha=new Q,ga=class extends gr{constructor(e=new bi,t=new da){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),ma.radius+=i,e.ray.intersectsSphere(ma)===!1)return;fa.copy(r).invert(),pa.copy(e.ray).applyMatrix4(fa);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ha.fromBufferAttribute(l,n),_a(ha,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ha.fromBufferAttribute(l,a),_a(ha,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function _a(e,t,n,r,i,a,o){let s=pa.distanceSqToPoint(e);if(s<n){let n=new Q;pa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var va=class extends Ln{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ya=class extends Ln{constructor(e,t,n=be,r,i,a,o=fe,s=fe,c,l=Ae,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Nn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ba=class extends ya{constructor(e,t=be,n=301,r,i,a=fe,o=fe,s,c=Ae){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},xa=class extends Ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Sa=class e extends bi{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new ci(c,3)),this.setAttribute(`normal`,new ci(l,3)),this.setAttribute(`uv`,new ci(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Q;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ca=class e extends bi{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new ci(u,3)),this.setAttribute(`normal`,new ci(d,3)),this.setAttribute(`uv`,new ci(f,2));function _(){let a=new Q,_=new Q,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new Z,m=new Q,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wa=class e extends Ca{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ta=class e extends bi{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new ci(p,3)),this.setAttribute(`normal`,new ci(m,3)),this.setAttribute(`uv`,new ci(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ea=class e extends bi{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new Q,p=new Z;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new ci(s,3)),this.setAttribute(`normal`,new ci(c,3)),this.setAttribute(`uv`,new ci(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Da=class e extends bi{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new Q,d=new Q,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new ci(p,3)),this.setAttribute(`normal`,new ci(m,3)),this.setAttribute(`uv`,new ci(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Oa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Aa(i))i.isRenderTargetTexture?(Y(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Aa(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ka(e){let t={};for(let n=0;n<e.length;n++){let r=Oa(e[n]);for(let e in r)t[e]=r[e]}return t}function Aa(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ja(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ma(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Dn.workingColorSpace}var Na={clone:Oa,merge:ka},Pa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fa=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ia=class extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pa,this.fragmentShader=Fa,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Oa(e.uniforms),this.uniformsGroups=ja(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new wr().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Z().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new Q().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Rn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Sn().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Un().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},La=class extends Ia{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ra=class extends Ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new wr(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wr(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},za=class extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Et,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ba=class extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Va=class extends Qi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type=`LineDashedMaterial`,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Ha(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ua(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Wa=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ga=class extends Wa{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ct,endingEnd:Ct}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case wt:i=e,o=2*t-n;break;case Tt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case wt:a=e,s=2*n-t;break;case Tt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ka=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},qa=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ja=class extends Wa{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Za(n,t,g,y,r);i[p]=Ya(x,o,_,b,m)}return i}};function Ya(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Xa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Za(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ya(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Xa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Qa=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ha(t,this.TimeBufferType),this.values=Ha(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ha(e.times,Array),values:Ha(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ua(e.settings)&&(n.settings={inTangents:Ha(e.settings.inTangents,Array),outTangents:Ha(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ja(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case yt:t=this.InterpolantFactoryMethodDiscrete;break;case bt:t=this.InterpolantFactoryMethodLinear;break;case xt:t=this.InterpolantFactoryMethodSmooth;break;case St:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return Y(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return yt;case this.InterpolantFactoryMethodLinear:return bt;case this.InterpolantFactoryMethodSmooth:return xt;case this.InterpolantFactoryMethodBezier:return St}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ua(this.settings)&&($a(this.settings.inTangents,e),$a(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(X(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(X(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){X(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){X(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ft(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){X(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===xt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ua(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function $a(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Qa.prototype.ValueTypeName=``,Qa.prototype.TimeBufferType=Float32Array,Qa.prototype.ValueBufferType=Float32Array,Qa.prototype.DefaultInterpolation=bt;var eo=class extends Qa{constructor(e,t,n){super(e,t,n)}};eo.prototype.ValueTypeName=`bool`,eo.prototype.ValueBufferType=Array,eo.prototype.DefaultInterpolation=yt,eo.prototype.InterpolantFactoryMethodLinear=void 0,eo.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}};to.prototype.ValueTypeName=`color`;var no=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}};no.prototype.ValueTypeName=`number`;var ro=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)yn.slerpFlat(i,0,a,c-o,a,c,s);return i}},io=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ro(this.times,this.values,this.getValueSize(),e)}};io.prototype.ValueTypeName=`quaternion`,io.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends Qa{constructor(e,t,n){super(e,t,n)}};ao.prototype.ValueTypeName=`string`,ao.prototype.ValueBufferType=Array,ao.prototype.DefaultInterpolation=yt,ao.prototype.InterpolantFactoryMethodLinear=void 0,ao.prototype.InterpolantFactoryMethodSmooth=void 0;var oo=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}};oo.prototype.ValueTypeName=`vector`;var so={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(co(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!co(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function co(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var lo=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},uo=class{constructor(e){this.manager=e===void 0?lo:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};uo.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var fo=new WeakMap,po=class extends uo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=so.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=fo.get(a);e===void 0&&(e=[],fo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=It(`img`);function s(){l(),t&&t(this);let n=fo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}fo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),so.remove(`image:${e}`);let n=fo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}fo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),so.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},mo=class extends uo{constructor(e){super(e)}load(e,t,n,r){let i=new Ln,a=new po(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},ho=class extends gr{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new wr(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},go=class extends ho{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(gr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new wr(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},_o=new Un,vo=new Q,yo=new Q,bo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z(512,512),this.mapType=_e,this.map=null,this.mapPass=null,this.matrix=new Un,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zi,this._frameExtents=new Z(1,1),this._viewportCount=1,this._viewports=[new Rn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;vo.setFromMatrixPosition(e.matrixWorld),t.position.copy(vo),yo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){_o.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(_o,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(_o)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},xo=new Q,So=new yn,Co=new Q,wo=class extends gr{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Un,this.projectionMatrix=new Un,this.projectionMatrixInverse=new Un,this.coordinateSystem=Nt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xo,So,Co),Co.x===1&&Co.y===1&&Co.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xo,So,Co.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(xo,So,Co),Co.x===1&&Co.y===1&&Co.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xo,So,Co.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},To=new Q,Eo=new Z,Do=new Z,Oo=class extends wo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Jt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(qt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jt*2*Math.atan(Math.tan(qt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){To.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(To.x,To.y).multiplyScalar(-e/To.z),To.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(To.x,To.y).multiplyScalar(-e/To.z)}getViewSize(e,t){return this.getViewBounds(e,Eo,Do),t.subVectors(Do,Eo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(qt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ko=class extends bo{constructor(){super(new Oo(90,1,.5,500)),this.isPointLightShadow=!0}},Ao=class extends ho{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new ko}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},jo=class extends wo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Mo=class extends bo{constructor(){super(new jo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},No=class extends ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(gr.DEFAULT_UP),this.updateMatrix(),this.target=new gr,this.shadow=new Mo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Po=-90,Fo=1,Io=class extends gr{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Oo(Po,Fo,e,t);r.layers=this.layers,this.add(r);let i=new Oo(Po,Fo,e,t);i.layers=this.layers,this.add(i);let a=new Oo(Po,Fo,e,t);a.layers=this.layers,this.add(a);let o=new Oo(Po,Fo,e,t);o.layers=this.layers,this.add(o);let s=new Oo(Po,Fo,e,t);s.layers=this.layers,this.add(s);let c=new Oo(Po,Fo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Lo=class extends Oo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ro=`\\[\\]\\.:\\/`,zo=RegExp(`[\\[\\]\\.:\\/]`,`g`),Bo=`[^\\[\\]\\.:\\/]`,Vo=`[^`+Ro.replace(`\\.`,``)+`]`,Ho=`((?:WC+[\\/:])*)`.replace(`WC`,Bo),Uo=`(WCOD+)?`.replace(`WCOD`,Vo),Wo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Bo),Go=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Bo),Ko=RegExp(`^`+Ho+Uo+Wo+Go+`$`),qo=[`material`,`materials`,`bones`,`map`],Jo=class{constructor(e,t,n){let r=n||Yo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Yo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(zo,``)}static parseTrackName(e){let t=Ko.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);qo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Y(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){X(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){X(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){X(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){X(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){X(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){X(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){X(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;X(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){X(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){X(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Yo.Composite=Jo,Yo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Yo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Yo.prototype.GetterByBindingType=[Yo.prototype._getValue_direct,Yo.prototype._getValue_array,Yo.prototype._getValue_arrayElement,Yo.prototype._getValue_toArray],Yo.prototype.SetterByBindingTypeAndVersioning=[[Yo.prototype._setValue_direct,Yo.prototype._setValue_direct_setNeedsUpdate,Yo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Yo.prototype._setValue_array,Yo.prototype._setValue_array_setNeedsUpdate,Yo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Yo.prototype._setValue_arrayElement,Yo.prototype._setValue_arrayElement_setNeedsUpdate,Yo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Yo.prototype._setValue_fromArray,Yo.prototype._setValue_fromArray_setNeedsUpdate,Yo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xo=new Un,Zo=class{constructor(e,t,n=0,r=1/0){this.ray=new ji(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new er,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):X(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Xo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xo),this}intersectObject(e,t=!0,n=[]){return $o(e,this,n,t),n.sort(Qo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)$o(e[r],this,n,t);return n.sort(Qo),n}};function Qo(e,t){return e.distance-t.distance}function $o(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)$o(r[e],t,n,!0)}}var es=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=Xt(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static#e=e.prototype.isMatrix2=!0;constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var ts=new Q,ns,rs,is=class extends gr{constructor(e=new Q(0,0,1),t=new Q(0,0,0),n=1,r=16776960,i=n*.2,a=i*.2){super(),this.type=`ArrowHelper`,ns===void 0&&(ns=new bi,ns.setAttribute(`position`,new ci([0,0,0,0,1,0],3)),rs=new wa(.5,1,5,1),rs.translate(0,-.5,0)),this.position.copy(t),this.line=new oa(ns,new Qi({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Wi(rs,new Mi({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,i,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{ts.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(ts,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},as=class extends Wt{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function os(e,t,n,r){let i=ss(r);switch(n){case De:return e*t;case Me:return e*t/i.components*i.byteLength;case Ne:return e*t/i.components*i.byteLength;case Pe:return e*t*2/i.components*i.byteLength;case Fe:return e*t*2/i.components*i.byteLength;case Oe:return e*t*3/i.components*i.byteLength;case ke:return e*t*4/i.components*i.byteLength;case Ie:return e*t*4/i.components*i.byteLength;case Le:case Re:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ze:case Be:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case He:case We:return Math.max(e,16)*Math.max(t,8)/4;case Ve:case Ue:return Math.max(e,8)*Math.max(t,8)/2;case Ge:case Ke:case Je:case Ye:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case qe:case Xe:case Ze:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Qe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case $e:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case et:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case tt:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case nt:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case rt:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case it:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case at:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ot:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case st:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ct:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case lt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ut:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case dt:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ft:case pt:case mt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ht:case gt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case _t:case vt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ss(e){switch(e){case _e:case K:return{byteLength:1,components:1};case ye:case ve:case xe:return{byteLength:2,components:1};case Se:case Ce:return{byteLength:2,components:4};case be:case q:case J:return{byteLength:4,components:1};case Te:case Ee:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?Y(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function cs(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ls(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var us={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},$={common:{diffuse:{value:new wr(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Sn},alphaMap:{value:null},alphaMapTransform:{value:new Sn},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Sn}},envmap:{envMap:{value:null},envMapRotation:{value:new Sn},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Sn}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Sn}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Sn},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Sn},normalScale:{value:new Z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Sn},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Sn}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Sn}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Sn}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wr(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new wr(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Sn},alphaTest:{value:0},uvTransform:{value:new Sn}},sprite:{diffuse:{value:new wr(16777215)},opacity:{value:1},center:{value:new Z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Sn},alphaMap:{value:null},alphaMapTransform:{value:new Sn},alphaTest:{value:0}}},ds={basic:{uniforms:ka([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:us.meshbasic_vert,fragmentShader:us.meshbasic_frag},lambert:{uniforms:ka([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new wr(0)},envMapIntensity:{value:1}}]),vertexShader:us.meshlambert_vert,fragmentShader:us.meshlambert_frag},phong:{uniforms:ka([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new wr(0)},specular:{value:new wr(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:us.meshphong_vert,fragmentShader:us.meshphong_frag},standard:{uniforms:ka([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new wr(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:us.meshphysical_vert,fragmentShader:us.meshphysical_frag},toon:{uniforms:ka([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new wr(0)}}]),vertexShader:us.meshtoon_vert,fragmentShader:us.meshtoon_frag},matcap:{uniforms:ka([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:us.meshmatcap_vert,fragmentShader:us.meshmatcap_frag},points:{uniforms:ka([$.points,$.fog]),vertexShader:us.points_vert,fragmentShader:us.points_frag},dashed:{uniforms:ka([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:us.linedashed_vert,fragmentShader:us.linedashed_frag},depth:{uniforms:ka([$.common,$.displacementmap]),vertexShader:us.depth_vert,fragmentShader:us.depth_frag},normal:{uniforms:ka([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:us.meshnormal_vert,fragmentShader:us.meshnormal_frag},sprite:{uniforms:ka([$.sprite,$.fog]),vertexShader:us.sprite_vert,fragmentShader:us.sprite_frag},background:{uniforms:{uvTransform:{value:new Sn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:us.background_vert,fragmentShader:us.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Sn}},vertexShader:us.backgroundCube_vert,fragmentShader:us.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:us.cube_vert,fragmentShader:us.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:us.equirect_vert,fragmentShader:us.equirect_frag},distance:{uniforms:ka([$.common,$.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:us.distance_vert,fragmentShader:us.distance_frag},shadow:{uniforms:ka([$.lights,$.fog,{color:{value:new wr(0)},opacity:{value:1}}]),vertexShader:us.shadow_vert,fragmentShader:us.shadow_frag}};ds.physical={uniforms:ka([ds.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Sn},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Sn},clearcoatNormalScale:{value:new Z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Sn},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Sn},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Sn},sheen:{value:0},sheenColor:{value:new wr(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Sn},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Sn},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Sn},transmissionSamplerSize:{value:new Z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Sn},attenuationDistance:{value:0},attenuationColor:{value:new wr(0)},specularColor:{value:new wr(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Sn},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Sn},anisotropyVector:{value:new Z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Sn}}]),vertexShader:us.meshphysical_vert,fragmentShader:us.meshphysical_frag};var fs={r:0,b:0,g:0},ps=new Un,ms=new Sn;ms.set(-1,0,0,0,1,0,0,0,1);function hs(e,t,n,r,i,a){let o=new wr(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Wi(new Sa(1,1,1),new Ia({name:`BackgroundCubeMaterial`,uniforms:Oa(ds.backgroundCube.uniforms),vertexShader:ds.backgroundCube.vertexShader,fragmentShader:ds.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ps.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ms),l.material.toneMapped=Dn.getTransfer(i.colorSpace)!==At,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Wi(new Ta(2,2),new Ia({name:`BackgroundMaterial`,uniforms:Oa(ds.background.uniforms),vertexShader:ds.background.vertexShader,fragmentShader:ds.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Dn.getTransfer(i.colorSpace)!==At,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(fs,Ma(e)),n.buffers.color.setClear(fs.r,fs.g,fs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function gs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function _s(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function vs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(Y(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&Y(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function ys(e){let t=this,n=null,r=0,i=!1,a=!1,o=new wi,s=new Sn,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var bs=4,xs=6,Ss=20,Cs=256,ws=new jo,Ts=new wr,Es=null,Ds=0,Os=0,ks=!1,As=new Q,js=new Q,Ms=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=As}=i;Es=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Es,Ds,Os),this._renderer.xr.enabled=ks,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Es=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:me,minFilter:me,generateMipmaps:!1,type:xe,format:ke,colorSpace:Ot,depthBuffer:!1},r=Ps(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ps(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ns(r)),this._blurMaterial=Ls(r,e,t),this._ggxMaterial=Is(r,e,t)}return r}_compileMaterial(e){let t=new Wi(new bi,e);this._renderer.compile(t,ws)}_sceneToCubeUV(e,t,n,r,i){let a=new Oo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ts),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wi(new Sa,new Mi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ts),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Fs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=zs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Fs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ws)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-bs?n-d+bs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Fs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ws),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Fs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ws)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Fs(t,3*l*(r>this._lodMax-bs?r-this._lodMax+bs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,ws)}};function Ns(e){let t=[],n=[],r=e,i=e-bs+1+xs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?js.set(1,r,n):e===1?js.set(-n,1,-r):e===2?js.set(-n,r,1):e===3?js.set(-1,r,-n):e===4?js.set(-n,-1,r):js.set(n,r,-1),js.toArray(l,(e*6+t)*3)}}let u=new bi;u.setAttribute(`position`,new ai(c,3)),u.setAttribute(`outputDirection`,new ai(l,3)),n.push(new Wi(u,null)),r>bs&&r--}return{lodMeshes:n,sizeLods:t}}function Ps(e,t,n){let r=new Bn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Fs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Is(e,t,n){return new Ia({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Bs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ls(e,t,n){return new Ia({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Bs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(){return new Ia({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Bs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function zs(){return new Ia({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Vs=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new va(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Sa(5,5,5),i=new Ia({name:`CubemapFromEquirect`,uniforms:Oa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Wi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=me),new Io(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Hs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Vs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ms(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ms(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Us(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Vt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ws(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?si:oi)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Gs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ks(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:X(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function qs(e,t,n){let r=new WeakMap,i=new Rn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Vn(h,p,m,u);g.type=J,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Z(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Js(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ys={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Xs(e,t,n,r,i,a){let o=new Bn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new bi;l.setAttribute(`position`,new ci([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new ci([0,2,0,0,2,0],2));let u=new La({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Wi(l,u),f=new jo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Bn(t,n,{type:xe,depthBuffer:!1,stencilBuffer:!1}),c=new Bn(t,n,{type:xe,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Dn.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Ys[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Zs=new Ln,Qs=new ya(1,1),$s=new Vn,ec=new Hn,tc=new va,nc=[],rc=[],ic=new Float32Array(16),ac=new Float32Array(9),oc=new Float32Array(4);function sc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=nc[i];if(a===void 0&&(a=new Float32Array(i),nc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function cc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function lc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function uc(e,t){let n=rc[t];n===void 0&&(n=new Int32Array(t),rc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function dc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2fv(this.addr,t),lc(n,t)}}function pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(cc(n,t))return;e.uniform3fv(this.addr,t),lc(n,t)}}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4fv(this.addr,t),lc(n,t)}}function hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;oc.set(r),e.uniformMatrix2fv(this.addr,!1,oc),lc(n,r)}}function gc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;ac.set(r),e.uniformMatrix3fv(this.addr,!1,ac),lc(n,r)}}function _c(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;ic.set(r),e.uniformMatrix4fv(this.addr,!1,ic),lc(n,r)}}function vc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2iv(this.addr,t),lc(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cc(n,t))return;e.uniform3iv(this.addr,t),lc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4iv(this.addr,t),lc(n,t)}}function Sc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2uiv(this.addr,t),lc(n,t)}}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cc(n,t))return;e.uniform3uiv(this.addr,t),lc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4uiv(this.addr,t),lc(n,t)}}function Ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Qs.compareFunction=n.isReversedDepthBuffer()?518:515,a=Qs):a=Zs,n.setTexture2D(t||a,i)}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ec,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||tc,i)}function kc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||$s,i)}function Ac(e){switch(e){case 5126:return dc;case 35664:return fc;case 35665:return pc;case 35666:return mc;case 35674:return hc;case 35675:return gc;case 35676:return _c;case 5124:case 35670:return vc;case 35667:case 35671:return yc;case 35668:case 35672:return bc;case 35669:case 35673:return xc;case 5125:return Sc;case 36294:return Cc;case 36295:return wc;case 36296:return Tc;case 35678:case 36198:case 36298:case 36306:case 35682:return Ec;case 35679:case 36299:case 36307:return Dc;case 35680:case 36300:case 36308:case 36293:return Oc;case 36289:case 36303:case 36311:case 36292:return kc}}function jc(e,t){e.uniform1fv(this.addr,t)}function Mc(e,t){let n=sc(t,this.size,2);e.uniform2fv(this.addr,n)}function Nc(e,t){let n=sc(t,this.size,3);e.uniform3fv(this.addr,n)}function Pc(e,t){let n=sc(t,this.size,4);e.uniform4fv(this.addr,n)}function Fc(e,t){let n=sc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ic(e,t){let n=sc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Lc(e,t){let n=sc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Rc(e,t){e.uniform1iv(this.addr,t)}function zc(e,t){e.uniform2iv(this.addr,t)}function Bc(e,t){e.uniform3iv(this.addr,t)}function Vc(e,t){e.uniform4iv(this.addr,t)}function Hc(e,t){e.uniform1uiv(this.addr,t)}function Uc(e,t){e.uniform2uiv(this.addr,t)}function Wc(e,t){e.uniform3uiv(this.addr,t)}function Gc(e,t){e.uniform4uiv(this.addr,t)}function Kc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Qs:Zs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function qc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ec,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||tc,a[e])}function Yc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||$s,a[e])}function Xc(e){switch(e){case 5126:return jc;case 35664:return Mc;case 35665:return Nc;case 35666:return Pc;case 35674:return Fc;case 35675:return Ic;case 35676:return Lc;case 5124:case 35670:return Rc;case 35667:case 35671:return zc;case 35668:case 35672:return Bc;case 35669:case 35673:return Vc;case 5125:return Hc;case 36294:return Uc;case 36295:return Wc;case 36296:return Gc;case 35678:case 36198:case 36298:case 36306:case 35682:return Kc;case 35679:case 36299:case 36307:return qc;case 35680:case 36300:case 36308:case 36293:return Jc;case 36289:case 36303:case 36311:case 36292:return Yc}}var Zc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ac(t.type)}},Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xc(t.type)}},$c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},el=/(\w+)(\])?(\[|\.)?/g;function tl(e,t){e.seq.push(t),e.map[t.id]=t}function nl(e,t,n){let r=e.name,i=r.length;for(el.lastIndex=0;;){let a=el.exec(r),o=el.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){tl(n,l===void 0?new Zc(s,e,t):new Qc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new $c(s),tl(n,e)),n=e}}}var rl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);nl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function il(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var al=37297,ol=0;function sl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var cl=new Sn;function ll(e){Dn._getMatrix(cl,Dn.workingColorSpace,e);let t=`mat3( ${cl.elements.map(e=>e.toFixed(4))} )`;switch(Dn.getTransfer(e)){case kt:return[t,`LinearTransferOETF`];case At:return[t,`sRGBTransferOETF`];default:return Y(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ul(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+sl(e.getShaderSource(t),r)}return i}function dl(e,t){let n=ll(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var fl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function pl(e,t){let n=fl[t];return n===void 0?(Y(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ml=new Q;function hl(){return Dn.getLuminanceCoefficients(ml),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ml.x.toFixed(4)}, ${ml.y.toFixed(4)}, ${ml.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function gl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(yl).join(`
`)}function _l(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function vl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function yl(e){return e!==``}function bl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Sl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(e){return e.replace(Sl,Tl)}var wl=new Map;function Tl(e,t){let n=us[t];if(n===void 0){let e=wl.get(t);if(e!==void 0)n=us[e],Y(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Cl(n)}var El=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(e){return e.replace(El,Ol)}function Ol(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function kl(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Al={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function jl(e){return Al[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ml={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Nl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ml[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Pl={302:`ENVMAP_MODE_REFRACTION`};function Fl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Pl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Il={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ll(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Il[e.combine]||`ENVMAP_BLENDING_NONE`}function Rl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function zl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=jl(n),l=Nl(n),u=Fl(n),d=Ll(n),f=Rl(n),p=gl(n),m=_l(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(yl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(yl).join(`
`),_.length>0&&(_+=`
`)):(g=[kl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(yl).join(`
`),_=[kl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:us.tonemapping_pars_fragment,n.toneMapping===0?``:pl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,us.colorspace_pars_fragment,dl(`linearToOutputTexel`,n.outputColorSpace),hl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(yl).join(`
`)),o=Cl(o),o=bl(o,n),o=xl(o,n),s=Cl(s),s=bl(s,n),s=xl(s,n),o=Dl(o),s=Dl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=il(i,i.VERTEX_SHADER,y),S=il(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ul(i,x,`vertex`),n=ul(i,S,`fragment`);X(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):Y(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new rl(i,h),T=vl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,al)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ol++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Bl=0,Vl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Hl(e),t.set(e,n)),n}},Hl=class{constructor(e){this.id=Bl++,this.code=e,this.usedTimes=0}};function Ul(e){return e===1030||e===37490||e===36285}function Wl(e,t,n,r,i,a){let o=new er,s=new Vl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&Y(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ds[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,ee=!!i.aoMap,te=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,R=!!i.normalMap,re=!!i.displacementMap,z=!!i.emissiveMap,B=!!i.metalnessMap,V=!!i.roughnessMap,ie=i.anisotropy>0,H=i.clearcoat>0,ae=i.dispersion>0,oe=i.retroreflectivity>0,U=i.iridescence>0,W=i.sheen>0,se=i.transmission>0,ce=ie&&!!i.anisotropyMap,le=H&&!!i.clearcoatMap,ue=H&&!!i.clearcoatNormalMap,de=H&&!!i.clearcoatRoughnessMap,fe=U&&!!i.iridescenceMap,G=U&&!!i.iridescenceThicknessMap,pe=W&&!!i.sheenColorMap,me=W&&!!i.sheenRoughnessMap,he=!!i.specularMap,ge=!!i.specularColorMap,_e=!!i.specularIntensityMap,K=se&&!!i.transmissionMap,ve=se&&!!i.thicknessMap,ye=!!i.gradientMap,q=!!i.alphaMap,be=i.alphaTest>0,J=!!i.alphaHash,xe=!!i.extensions,Se=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Se=e.toneMapping);let Ce={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Dn.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:ee,lightMap:te,bumpMap:ne,normalMap:R,displacementMap:re,emissiveMap:z,normalMapObjectSpace:R&&i.normalMapType===1,normalMapTangentSpace:R&&i.normalMapType===0,packedNormalMap:R&&i.normalMapType===0&&Ul(i.normalMap.format),metalnessMap:B,roughnessMap:V,anisotropy:ie,anisotropyMap:ce,clearcoat:H,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:de,dispersion:ae,retroreflection:oe,iridescence:U,iridescenceMap:fe,iridescenceThicknessMap:G,sheen:W,sheenColorMap:pe,sheenRoughnessMap:me,specularMap:he,specularColorMap:ge,specularIntensityMap:_e,transmission:se,transmissionMap:K,thicknessMap:ve,gradientMap:ye,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:q,alphaTest:be,alphaHash:J,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:ee&&m(i.aoMap.channel),lightMapUv:te&&m(i.lightMap.channel),bumpMapUv:ne&&m(i.bumpMap.channel),normalMapUv:R&&m(i.normalMap.channel),displacementMapUv:re&&m(i.displacementMap.channel),emissiveMapUv:z&&m(i.emissiveMap.channel),metalnessMapUv:B&&m(i.metalnessMap.channel),roughnessMapUv:V&&m(i.roughnessMap.channel),anisotropyMapUv:ce&&m(i.anisotropyMap.channel),clearcoatMapUv:le&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ue&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:G&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:me&&m(i.sheenRoughnessMap.channel),specularMapUv:he&&m(i.specularMap.channel),specularColorMapUv:ge&&m(i.specularColorMap.channel),specularIntensityMapUv:_e&&m(i.specularIntensityMap.channel),transmissionMapUv:K&&m(i.transmissionMap.channel),thicknessMapUv:ve&&m(i.thicknessMap.channel),alphaMapUv:q&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(R||ie),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||q),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&R===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Se,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Dn.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:z&&i.emissiveMap.isVideoTexture===!0&&Dn.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:xe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(xe&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ds[t];n=Na.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new zl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Gl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Kl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ql(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Jl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Kl),r.length>1&&r.sort(t||ql),i.length>1&&i.sort(t||ql)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Yl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Jl,e.set(t,[i])):n>=r.length?(i=new Jl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Xl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Q,color:new wr};break;case`SpotLight`:n={position:new Q,direction:new Q,color:new wr,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Q,color:new wr,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Q,skyColor:new wr,groundColor:new wr};break;case`RectAreaLight`:n={color:new wr,position:new Q,halfWidth:new Q,halfHeight:new Q}}return e[t.id]=n,n}}}function Zl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ql=0;function $l(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function eu(e){let t=new Xl,n=Zl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Q);let i=new Q,a=new Un,o=new Un;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort($l);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ql++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function tu(e){let t=new eu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function nu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new tu(e),t.set(n,[a])):r>=i.length?(a=new tu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ru=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iu=`uniform sampler2D shadow_pass;
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
}`,au=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],ou=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],su=new Un,cu=new Q,lu=new Q;function uu(e,t,n){let r=new Zi,i=new Z,a=new Z,o=new Rn,s=new za,c=new Ba,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Ia({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z},radius:{value:4}},vertexShader:ru,fragmentShader:iu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new bi;m.setAttribute(`position`,new ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Wi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(Y(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){Y(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){Y(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Bn(i.x,i.y,{format:Pe,type:xe,minFilter:me,magFilter:me,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ya(i.x,i.y,J),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ae,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=fe,d.map.depthTexture.magFilter=fe}else l.isPointLight?(d.map=new Vs(i.x),d.map.depthTexture=new ba(i.x,be)):(d.map=new Bn(i.x,i.y),d.map.depthTexture=new ya(i.x,i.y,be)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ae,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=me,d.map.depthTexture.magFilter=me):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=fe,d.map.depthTexture.magFilter=fe);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),cu.setFromMatrixPosition(l.matrixWorld),e.position.copy(cu),lu.copy(e.position),lu.add(au[t]),e.up.copy(ou[t]),e.lookAt(lu),e.updateMatrixWorld(),n.makeTranslation(-cu.x,-cu.y,-cu.z),su.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(su,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Bn(i.x,i.y,{format:Pe,type:xe}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function du(e,t){function n(){let t=!1,n=new Rn,r=null,i=new Rn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?B(e.DEPTH_TEST):V(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ut[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?B(e.STENCIL_TEST):V(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new wr(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},ee=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),ne=new Rn().fromArray(ee),R=new Rn().fromArray(te);function re(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let z={};z[e.TEXTURE_2D]=re(e.TEXTURE_2D,e.TEXTURE_2D,1),z[e.TEXTURE_CUBE_MAP]=re(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[e.TEXTURE_2D_ARRAY]=re(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),z[e.TEXTURE_3D]=re(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),B(e.DEPTH_TEST),o.setFunc(3),ce(!1),le(1),B(e.CULL_FACE),W(0);function B(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function V(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ie(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function H(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ae(t){return h!==t&&(e.useProgram(t),h=t,!0)}let oe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};oe[103]=e.MIN,oe[104]=e.MAX;let U={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function W(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(V(e.BLEND),g=!1);else if(g===!1&&(B(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:X(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:X(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:X(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:X(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(oe[n],oe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(U[r],U[i],U[o],U[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function se(t,n){t.side===2?V(e.CULL_FACE):B(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ce(r),t.blending===1&&t.transparent===!1?W(0):W(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),de(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?B(e.SAMPLE_ALPHA_TO_COVERAGE):V(e.SAMPLE_ALPHA_TO_COVERAGE)}function ce(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function le(t){t===0?V(e.CULL_FACE):(B(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ue(t){t!==k&&(N&&e.lineWidth(t),k=t)}function de(t,n,r){t?(B(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):V(e.POLYGON_OFFSET_FILL)}function fe(t){t?B(e.SCISSOR_TEST):V(e.SCISSOR_TEST)}function G(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function pe(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||z[t]),i.type=t,i.texture=n)}function me(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function he(){try{e.compressedTexImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function ge(){try{e.compressedTexImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function _e(){try{e.texSubImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function K(){try{e.texSubImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function ve(){try{e.compressedTexSubImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function ye(){try{e.compressedTexSubImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function q(){try{e.texStorage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function be(){try{e.texStorage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function J(){try{e.texImage2D(...arguments)}catch(e){X(`WebGLState:`,e)}}function xe(){try{e.texImage3D(...arguments)}catch(e){X(`WebGLState:`,e)}}function Se(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ce(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function we(t){ne.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ne.copy(t))}function Te(t){R.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),R.copy(t))}function Ee(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function De(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Oe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new wr(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ne.set(0,0,e.canvas.width,e.canvas.height),R.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:B,disable:V,bindFramebuffer:ie,drawBuffers:H,useProgram:ae,setBlending:W,setMaterial:se,setFlipSided:ce,setCullFace:le,setLineWidth:ue,setPolygonOffset:de,setScissorTest:fe,activeTexture:G,bindTexture:pe,unbindTexture:me,compressedTexImage2D:he,compressedTexImage3D:ge,texImage2D:J,texImage3D:xe,pixelStorei:Ce,getParameter:Se,updateUBOMapping:Ee,uniformBlockBinding:De,texStorage2D:q,texStorage3D:be,texSubImage2D:_e,texSubImage3D:K,compressedTexSubImage2D:ve,compressedTexSubImage3D:ye,scissor:we,viewport:Te,reset:Oe}}function fu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Z,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):It(`canvas`)}function g(e,t,n){let r=1,i=xe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),Y(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&Y(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];Y(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||Y(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?kt:Dn.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,Y(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&Y(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&be(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)Y(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)Y(`WebGLRenderer: Texture marked for update but image is incomplete`);else{V(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?V(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function I(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?V(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function L(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ie(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ee={[le]:e.REPEAT,[ue]:e.CLAMP_TO_EDGE,[de]:e.MIRRORED_REPEAT},te={[fe]:e.NEAREST,[G]:e.NEAREST_MIPMAP_NEAREST,[pe]:e.NEAREST_MIPMAP_LINEAR,[me]:e.LINEAR,[he]:e.LINEAR_MIPMAP_NEAREST,[ge]:e.LINEAR_MIPMAP_LINEAR},ne={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function R(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&Y(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ee[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ee[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ee[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,te[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,te[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ne[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function re(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function z(e,t,n){return Math.floor(Math.floor(e/n)/t)}function B(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=z(n.start,r.width,4),c=z(t.start,r.width,4);n.start<=i+1&&a===c&&z(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function V(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=re(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Dn.getPrimaries(Dn.workingColorSpace),r=o.colorSpace===``?null:Dn.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=J(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);R(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===je,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&B(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=os(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else Y(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?Y(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=os(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=xe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=xe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ie(t,o,s){if(o.image.length!==6)return;let c=re(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Dn.getPrimaries(Dn.workingColorSpace),r=o.colorSpace===``?null:Dn.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=J(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);R(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?Y(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=xe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function H(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),q(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,ye(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ae(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;q(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ye(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ye(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);q(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ye(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ye(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function oe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),R(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=ye(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)q(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)q(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function U(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)oe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?oe(i.__webglFramebuffer[0],t,0):oe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ae(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ae(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function W(t,n,i){let a=r.get(t);n!==void 0&&H(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&U(t)}function se(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&q(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=ye(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ae(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),R(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)H(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else H(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),R(c,a),H(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),R(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)H(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else H(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&U(t)}function ce(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let _e=[],K=[];function ve(t){if(t.samples>0){if(q(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(_e.length=0,K.length=0,_e.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(_e.push(l),K.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,K)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,_e))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ye(e){return Math.min(i.maxSamples,e.samples)}function q(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function be(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function J(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Dn.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&Y(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):X(`WebGLTextures: Unsupported texture color space:`,n)),t}function xe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=F,this.setTexture3D=I,this.setTextureCube=L,this.rebindTextures=W,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=U,this.setupFrameBufferTexture=H,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function pu(e,t){function n(n,r=``){let i,a=Dn.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var mu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hu=`
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

}`,gu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new xa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ia({vertexShader:mu,fragmentShader:hu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wi(new Ta(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_u=class extends Wt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new gu,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new Z,C=null,w=null,T=new Oo;T.viewport=new Rn;let E=new Oo;E.viewport=new Rn;let D=[T,E],O=new Lo,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new yr,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new yr,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new yr,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,R.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&Y(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&Y(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?je:Ae,a=_.stencil?we:be);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Bn(d.textureWidth,d.textureHeight,{format:ke,type:_e,depthTexture:new ya(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Bn(f.framebufferWidth,f.framebufferHeight,{format:ke,type:_e,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),R.setContext(r),R.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let P=new Q,F=new Q;function I(e,t,n){P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(F),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function L(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;L(O,i);for(let e=0;e<a.length;e++)L(a[e],i);a.length===2?I(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ee(e,O,i)};function ee(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Jt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let te=null;function ne(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Oo,o.layers.enable(n),o.viewport=new Rn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new xa,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}te&&te(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let R=new cs;R.setAnimationLoop(ne),this.setAnimationLoop=function(e){te=e},this.dispose=function(){}}},vu=new Un,yu=new Sn;yu.set(-1,0,0,0,1,0,0,0,1);function bu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ma(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(vu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(yu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function xu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return X(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?Y(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):Y(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Su=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Cu=null;function wu(){return Cu===null&&(Cu=new qi(Su,16,16,Pe,xe),Cu.name=`DFG_LUT`,Cu.minFilter=me,Cu.magFilter=me,Cu.wrapS=ue,Cu.wrapT=ue,Cu.generateMipmaps=!1,Cu.needsUpdate=!0),Cu}var Tu=class{constructor(e={}){let{canvas:t=Lt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=_e}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Ie,Fe,Ne]),g=new Set([_e,be,ye,we,Se,Ce]),_=new Uint32Array(4),v=new Int32Array(4),y=new Q,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Dt;let j=0,M=0,N=null,P=-1,F=null,I=new Rn,L=new Rn,ee=null,te=new wr(0),ne=0,R=t.width,re=t.height,z=1,B=null,V=null,ie=new Rn(0,0,R,re),H=new Rn(0,0,R,re),ae=!1,oe=new Zi,U=!1,W=!1,se=new Un,ce=new Q,le=new Rn,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},de=!1;function fe(){return N===null?z:1}let G=n;function pe(e,n){return t.getContext(e,n)}let me,he,K,ve,q,J,Te,Ee,De,Oe,ke,Ae,je,Me,Pe,Le,Re,ze,Be,Ve,He,Ue,We;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,qe,!1),t.addEventListener(`webglcontextrestored`,Je,!1),t.addEventListener(`webglcontextcreationerror`,Ye,!1),G===null){let t=`webgl2`;if(G=pe(t,e),G===null)throw pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ge()}catch(e){throw t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),X(`WebGLRenderer: `+e.message),e}function Ge(){me=new Us(G),me.init(),He=new pu(G,me),he=new vs(G,me,e,He),K=new du(G,me),he.reversedDepthBuffer&&d&&K.buffers.depth.setReversed(!0),O=G.createFramebuffer(),k=G.createFramebuffer(),A=G.createFramebuffer(),ve=new Ks(G),q=new Gl,J=new fu(G,me,K,q,he,He,ve),Te=new Hs(T),Ee=new ls(G),Ue=new gs(G,Ee),De=new Ws(G,Ee,ve,Ue),Oe=new Js(G,De,Ee,Ue,ve),ze=new qs(G,he,J),Pe=new ys(q),ke=new Wl(T,Te,me,he,Ue,Pe),Ae=new bu(T,q),je=new Yl,Me=new nu(me),Re=new hs(T,Te,K,Oe,p,s),Le=new uu(T,Oe,he),We=new xu(G,ve,he,K),Be=new _s(G,me,ve),Ve=new Gs(G,me,ve),ve.programs=ke.programs,T.capabilities=he,T.extensions=me,T.properties=q,T.renderLists=je,T.shadowMap=Le,T.state=K,T.info=ve}m!==1009&&(w=new Xs(m,t.width,t.height,o,r,i));let Ke=new _u(T,G);this.xr=Ke,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let e=me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(e){e!==void 0&&(z=e,this.setSize(R,re,!1))},this.getSize=function(e){return e.set(R,re)},this.setSize=function(e,n,r=!0){Ke.isPresenting?Y(`WebGLRenderer: Can't change size while VR device is presenting.`):(R=e,re=n,t.width=Math.floor(e*z),t.height=Math.floor(n*z),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(R*z,re*z).floor()},this.setDrawingBufferSize=function(e,n,r){R=e,re=n,z=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)X(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){Y(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(ie)},this.setViewport=function(e,t,n,r){e.isVector4?ie.set(e.x,e.y,e.z,e.w):ie.set(e,t,n,r),K.viewport(I.copy(ie).multiplyScalar(z).round())},this.getScissor=function(e){return e.copy(H)},this.setScissor=function(e,t,n,r){e.isVector4?H.set(e.x,e.y,e.z,e.w):H.set(e,t,n,r),K.scissor(L.copy(H).multiplyScalar(z).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(e){K.setScissorTest(ae=e)},this.setOpaqueSort=function(e){B=e},this.setTransparentSort=function(e){V=e},this.getClearColor=function(e){return e.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Re.getClearColor(),r=Re.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,G.clearBufferuiv(G.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,G.clearBufferiv(G.COLOR,0,v))}else r|=G.COLOR_BUFFER_BIT}t&&(r|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&G.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),Re.dispose(),je.dispose(),Me.dispose(),q.dispose(),Te.dispose(),Oe.dispose(),Ue.dispose(),We.dispose(),ke.dispose(),Ke.dispose(),Ke.removeEventListener(`sessionstart`,nt),Ke.removeEventListener(`sessionend`,rt),it.stop()};function qe(e){e.preventDefault(),zt(`WebGLRenderer: Context Lost.`),E=!0}function Je(){zt(`WebGLRenderer: Context Restored.`),E=!1;let e=ve.autoReset,t=Le.enabled,n=Le.autoUpdate,r=Le.needsUpdate,i=Le.type;Ge(),ve.autoReset=e,Le.enabled=t,Le.autoUpdate=n,Le.needsUpdate=r,Le.type=i}function Ye(e){X(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),Ze(t)}function Ze(e){Qe(e),q.remove(e)}function Qe(e){let t=q.get(e).programs;t!==void 0&&(t.forEach(function(e){ke.releaseProgram(e)}),e.isShaderMaterial&&ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ue);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=mt(e,t,n,r,i);K.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=De.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ue.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=Ee.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(K.setLineWidth(r.wireframeLinewidth*fe()),g.setMode(G.LINES)):g.setMode(G.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),K.setLineWidth(e*fe()),i.isLineSegments?g.setMode(G.LINES):i.isLineLoop?g.setMode(G.LINE_LOOP):g.setMode(G.LINE_STRIP)}else i.isPoints?g.setMode(G.POINTS):i.isSprite&&g.setMode(G.TRIANGLES);if(i.isBatchedMesh){if(me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ee.get(c).bytesPerElement:1,o=q.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(G,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function $e(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),U===!0&&Pe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ut(e,t,r),e.side=0,e.needsUpdate=!0,ut(e,t,r),e.side=2):ut(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Me.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),W=this.localClippingEnabled,U=Pe.init(this.clippingPlanes,W),U===!0&&Pe.setGlobalState(this.clippingPlanes,t),D!==null&&Le.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];$e(o,n,t,e),r.add(o)}else $e(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=q.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let et=null;function tt(e){et&&et(e)}function nt(){it.stop()}function rt(){it.start()}let it=new cs;it.setAnimationLoop(tt),typeof self<`u`&&it.setContext(self),this.setAnimationLoop=function(e){et=e,Ke.setAnimationLoop(e),e===null?it.stop():it.start()},Ke.addEventListener(`sessionstart`,nt),Ke.addEventListener(`sessionend`,rt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){X(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ke.enabled===!0&&Ke.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(t),t=Ke.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Me.get(e,C.length),x.init(t),x.state.textureUnits=J.getTextureUnits(),C.push(x),se.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),oe.setFromProjectionMatrix(se,Nt,t.reversedDepth),W=this.localClippingEnabled,U=Pe.init(this.clippingPlanes,W),b=je.get(e,S.length),b.init(),S.push(b),Ke.enabled===!0&&Ke.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&at(e,t,-1/0,T.sortObjects)}at(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(B,V),de=Ke.enabled===!1||Ke.isPresenting===!1||Ke.hasDepthSensing()===!1,de&&Re.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),U===!0&&Pe.beginShadows();let i=x.state.shadowsArray;if(Le.render(i,e,t),U===!0&&Pe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];st(n,r,e,a)}de&&Re.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ot(b,e,n,n.viewport)}}else r.length>0&&st(n,r,e,t),de&&Re.render(e),ot(b,e,t)}N!==null&&M===0&&(J.updateMultisampleRenderTarget(N),J.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ue.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],J.setTextureUnits(x.state.textureUnits),U===!0&&Pe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function at(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(oe)){r&&le.setFromMatrixPosition(e.matrixWorld).applyMatrix4(se);let i=Oe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,le.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(oe))){let i=Oe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),le.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),le.copy(e.boundingSphere.center)),le.applyMatrix4(e.matrixWorld).applyMatrix4(se)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,le.z,s,t)}}else a.visible&&b.push(e,i,a,n,le.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)at(i[e],t,n,r)}function ot(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),U===!0&&Pe.setGlobalState(T.clippingPlanes,n),r&&K.viewport(I.copy(r)),i.length>0&&ct(i,t,n),a.length>0&&ct(a,t,n),o.length>0&&ct(o,t,n),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function st(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=me.has(`EXT_color_buffer_half_float`)||me.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Bn(1,1,{generateMipmaps:!0,type:e?xe:_e,minFilter:ge,samples:Math.max(4,he.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Dn.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(te),ne=T.getClearAlpha(),ne<1&&T.setClearColor(16777215,.5),T.clear(),de&&Re.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),U===!0&&Pe.setGlobalState(T.clippingPlanes,r),ct(e,n,r),J.updateMultisampleRenderTarget(a),J.updateRenderTargetMipmap(a),me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,lt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(J.updateMultisampleRenderTarget(a),J.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(te,ne),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&lt(o,t,n,s,l,c)}}function lt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ut(e,t,n){t.isScene!==!0&&(t=ue);let r=q.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=ke.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Te.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ft(e,s),d}else s.uniforms=ke.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Pe.uniform),ft(e,s),r.needsLights=gt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=rl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ft(e,t){let n=q.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function pt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function mt(e,t,n,r,i){t.isScene!==!0&&(t=ue),J.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Dn.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Te.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=q.get(r),y=x.state.lights;if(U===!0&&(W===!0||e!==F)){let t=e===F&&r.id===P;Pe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Pe.numPlanes||v.numIntersection!==Pe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ut(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(K.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=pt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||F!==e){K.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(G,`projectionMatrix`,e.projectionMatrix),O.setValue(G,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(G,ce.setFromMatrixPosition(e.matrixWorld)),he.logarithmicDepthBuffer&&O.setValue(G,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(G,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(G,`sunShadowMap`,y.state.sunShadowMap,J),y.state.directionalShadowMap.length>0&&O.setValue(G,`directionalShadowMap`,y.state.directionalShadowMap,J),y.state.spotShadowMap.length>0&&O.setValue(G,`spotShadowMap`,y.state.spotShadowMap,J),y.state.pointShadowMap.length>0&&O.setValue(G,`pointShadowMap`,y.state.pointShadowMap,J)),i.isSkinnedMesh){O.setOptional(G,i,`bindMatrix`),O.setOptional(G,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(G,`boneTexture`,e.boneTexture,J))}i.isBatchedMesh&&(O.setOptional(G,i,`batchingTexture`),O.setValue(G,`batchingTexture`,i._matricesTexture,J),O.setOptional(G,i,`batchingIdTexture`),O.setValue(G,`batchingIdTexture`,i._indirectTexture,J),O.setOptional(G,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(G,`batchingColorTexture`,i._colorsTexture,J));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&ze.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(G,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=wu()),w){if(O.setValue(G,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&ht(k,E),a&&r.fog===!0&&Ae.refreshFogUniforms(k,a),Ae.refreshMaterialUniforms(k,r,z,re,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}rl.upload(G,dt(v),k,J)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(rl.upload(G,dt(v),k,J),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(G,`center`,i.center),O.setValue(G,`modelViewMatrix`,i.modelViewMatrix),O.setValue(G,`normalMatrix`,i.normalMatrix),O.setValue(G,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];We.update(n,S),We.bind(n,S)}}return S}function ht(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function gt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=q.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),q.get(e.texture).__webglTexture=t,q.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=q.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=q.get(e);if(o.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(G.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest,K.viewport(I),K.scissor(L),K.setScissorTest(ee),P=-1;return}if(o.__webglFramebuffer===void 0)J.setupRenderTarget(e);else if(o.__hasExternalTextures)J.rebindTextures(e,q.get(e.texture).__webglTexture,q.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&q.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);J.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=q.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&J.useMultisampledRTT(e)===!1?q.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest}else I.copy(ie).multiplyScalar(z).floor(),L.copy(H).multiplyScalar(z).floor(),ee=ae;if(n!==0&&(r=O),K.bindFramebuffer(G.FRAMEBUFFER,r)&&K.drawBuffers(e,r),K.viewport(I),K.scissor(L),K.setScissorTest(ee),i){let r=q.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=q.get(e.textures[t]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=q.get(e.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,t.__webglTexture,n)}P=-1};function _t(e){let t=q.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=he.textureFormatReadable(e.format),t.__typeReadable=he.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){X(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){K.bindFramebuffer(G.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let u=_t(o);if(u.__formatReadable===!1){X(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){X(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&G.readPixels(t,n,r,i,He.convert(c),He.convert(l),a)}finally{let e=N===null?null:q.get(N).__webglFramebuffer;K.bindFramebuffer(G.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=q.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){K.bindFramebuffer(G.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+s);let d=_t(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.bufferData(G.PIXEL_PACK_BUFFER,a.byteLength,G.STREAM_READ),G.readPixels(t,n,r,i,He.convert(l),He.convert(u),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let p=N===null?null:q.get(N).__webglFramebuffer;K.bindFramebuffer(G.FRAMEBUFFER,p);let m=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Ht(G,m,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,f),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,a),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(f),G.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;J.setTexture2D(e,0),G.copyTexSubImage2D(G.TEXTURE_2D,n,0,0,o,s,i,a),K.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=He.convert(t.format),_=He.convert(t.type),v;t.isData3DTexture?(J.setTexture3D(t,0),v=G.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(J.setTexture2DArray(t,0),v=G.TEXTURE_2D_ARRAY):(J.setTexture2D(t,0),v=G.TEXTURE_2D),K.activeTexture(G.TEXTURE0),K.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,t.flipY),K.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),K.pixelStorei(G.UNPACK_ALIGNMENT,t.unpackAlignment);let y=K.getParameter(G.UNPACK_ROW_LENGTH),b=K.getParameter(G.UNPACK_IMAGE_HEIGHT),x=K.getParameter(G.UNPACK_SKIP_PIXELS),S=K.getParameter(G.UNPACK_SKIP_ROWS),C=K.getParameter(G.UNPACK_SKIP_IMAGES);K.pixelStorei(G.UNPACK_ROW_LENGTH,h.width),K.pixelStorei(G.UNPACK_IMAGE_HEIGHT,h.height),K.pixelStorei(G.UNPACK_SKIP_PIXELS,l),K.pixelStorei(G.UNPACK_SKIP_ROWS,u),K.pixelStorei(G.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=q.get(e),r=q.get(t),h=q.get(n.__renderTarget),g=q.get(r.__renderTarget);K.bindFramebuffer(G.READ_FRAMEBUFFER,h.__webglFramebuffer),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(e).__webglTexture,i,d+n),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(t).__webglTexture,a,m+n)),G.blitFramebuffer(l,u,o,s,f,p,o,s,G.DEPTH_BUFFER_BIT,G.NEAREST);K.bindFramebuffer(G.READ_FRAMEBUFFER,null),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||q.has(e)){let n=q.get(e),r=q.get(t);K.bindFramebuffer(G.READ_FRAMEBUFFER,k),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,n.__webglTexture,i),T?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,r.__webglTexture,a),i===0?T?G.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):G.copyTexSubImage2D(v,a,f,p,l,u,o,s):G.blitFramebuffer(l,u,o,s,f,p,o,s,G.COLOR_BUFFER_BIT,G.NEAREST);K.bindFramebuffer(G.READ_FRAMEBUFFER,null),K.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?G.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):G.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):G.texSubImage2D(G.TEXTURE_2D,a,f,p,o,s,g,_,h);K.pixelStorei(G.UNPACK_ROW_LENGTH,y),K.pixelStorei(G.UNPACK_IMAGE_HEIGHT,b),K.pixelStorei(G.UNPACK_SKIP_PIXELS,x),K.pixelStorei(G.UNPACK_SKIP_ROWS,S),K.pixelStorei(G.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&G.generateMipmap(v),K.unbindTexture()},this.initRenderTarget=function(e){q.get(e).__webglFramebuffer===void 0&&J.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?J.setTextureCube(e,0):e.isData3DTexture?J.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?J.setTexture2DArray(e,0):J.setTexture2D(e,0),K.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,K.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Nt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Dn._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dn._getUnpackColorSpace()}};function Eu(e,t){let n=10/E;return{x:(e.x-t.x)*n,y:(e.z-t.z)*n,z:-(e.y-t.y)*n}}function Du(e,t,n){if(!e)return null;let r=new Q(0,1,0).cross(n);r.lengthSq()<1e-12&&r.set(1,0,0),r.normalize();let i=n.clone().cross(r).normalize(),a=e.points,o=a.map(({p:e})=>e.dot(r)),s=a.map(({p:e})=>e.dot(i)),c=e.center.clone();c.addScaledVector(r,(Math.min(...o)+Math.max(...o))/2-c.dot(r)),c.addScaledVector(i,(Math.min(...s)+Math.max(...s))/2-c.dot(i));let l=Math.tan(t.fov*Math.PI/360),u=l*t.aspect,d=.84,f=.64,p=-.44,m=.1;for(let{p:e,r:t}of a){let a=e.clone().sub(c),o=a.dot(r),s=a.dot(i),h=a.dot(n);m=Math.max(m,h+t+.001,h+(Math.abs(o)+t*Math.hypot(1,d*u))/(d*u),(s+f*h*l+t*Math.hypot(1,f*l))/(.54*l),(-s-p*h*l+t*Math.hypot(1,p*l))/(.54*l))}return Number.isFinite(m)?{target:c.addScaledVector(i,-.1*m*l),distance:m,bounds:e}:null}function Ou(e){if(!e.length)return null;let t=e.map(e=>new Q().copy(Eu(e.positionM,{x:0,y:0,z:0})));if(t.some(e=>![e.x,e.y,e.z].every(Number.isFinite)))return null;let n=t[0].clone(),r=n.clone();for(let e of t)n.min(e),r.max(e);let i=n.add(r).multiplyScalar(.5),a=Math.max(10,...t.map((t,n)=>t.distanceTo(i)+e[n].radiusM/E*10));return Number.isFinite(a)?{center:i,radius:a,ids:e.map(e=>e.id).sort().join(`\0`),points:t.map((t,n)=>({p:t,r:e[n].radiusM/E*10}))}:null}var ku=class{camera;controls;previous=null;fittedDistance=0;fitView=null;constructor(e,t){this.camera=e,this.controls=t}frame(e){let{camera:t,controls:n}=this,r=new Q(0,1.15,3.1).normalize(),i=Du(Ou(e),t,r);return i?(n.target.copy(i.target),t.position.copy(n.target).addScaledVector(r,i.distance),ju(t,n),this.rebaseBounds(i.bounds),this.extendBounds(i.bounds.radius),n.update(),!0):!1}resize(e,t){let n=this.camera.position.clone().sub(this.controls.target).normalize(),r=Ou(e),i=Du(r,t,n),a=Du(r,this.camera,n);if(!i||!a)return;let o=a.distance/i.distance;this.camera.position.sub(i.target).multiplyScalar(o).add(a.target),this.controls.target.sub(i.target).multiplyScalar(o).add(a.target),this.rebaseBounds(a.bounds),this.extendBounds(a.bounds.radius),this.controls.update()}resetTracking(e){this.rebaseBounds(Ou(e))}track(e,t=!1){let n=Ou(e),r=this.previous;if(!n){this.rebaseBounds(null);return}if(!r||r.ids!==n.ids){this.rebaseBounds(n);return}if(n.points.every(({p:e,r:t},n)=>e.equals(r.points[n].p)&&t===r.points[n].r))return;if(t){this.rebaseBounds(n);return}(!this.fitView||this.fitView.fov!==this.camera.fov||this.fitView.aspect!==this.camera.aspect)&&this.rebaseBounds(r);let i=this.fitView.direction,a=Du(r,this.camera,i),o=Du(n,this.camera,i);if(!a||!o)return;let s=Math.max(this.fittedDistance,o.distance),c=s/this.fittedDistance;this.camera.position.sub(a.target).multiplyScalar(c).add(o.target),this.controls.target.sub(a.target).multiplyScalar(c).add(o.target),this.previous={...n,radius:Math.max(r.radius,n.radius)},this.fittedDistance=s,this.fitView={direction:i,fov:this.camera.fov,aspect:this.camera.aspect},this.extendBounds(this.previous.radius),this.camera.updateMatrixWorld()}rebaseBounds(e){this.previous=e;let t=this.camera.position.clone().sub(this.controls.target).normalize();this.fittedDistance=Du(e,this.camera,t)?.distance??0,this.fitView={direction:t,fov:this.camera.fov,aspect:this.camera.aspect}}extendBounds(e){let t=this.camera.position.distanceTo(this.controls.target);this.controls.maxDistance=Math.max(1500,t*2),this.camera.far=Math.max(5e3,t+e*4),this.camera.updateProjectionMatrix()}};function Au(e,t,n,r=1){let i=n/E*10,a=e.fov*Math.PI/360,o=Math.atan(Math.tan(a)*Math.min(1,e.aspect)),s=i*r/Math.sin(Math.atan(.16*Math.tan(o)));if(!(i>0&&r>=1&&s>i&&Number.isFinite(s)&&s<=t.maxDistance&&s+i*r<e.far))return!1;let c=t.enableDamping;t.enableDamping=!1,t.update(),t.enableDamping=c;let l=e.position.clone().sub(t.target);return l.lengthSq()===0&&l.set(0,.03,.08),l.normalize(),t.target.set(0,0,0),e.position.copy(l.multiplyScalar(s)),t.minDistance=i*1.5,e.near=Math.min(1e-5,i/100),e.updateProjectionMatrix(),t.update(),e.updateMatrixWorld(),!0}function ju(e,t){t.minDistance=.001,e.near=1e-5,e.updateProjectionMatrix()}function Mu(e,t,n,r,i){let a=i>0?Math.max(1,Math.min(1e9,.1/i)):1;if(a===1){e.render(t,n);return}r.copy(n),r.position.multiplyScalar(a),r.near*=a,r.far*=a,r.updateProjectionMatrix(),r.updateMatrixWorld();let o=t.scale.clone();t.scale.multiplyScalar(a);try{e.render(t,r)}finally{t.scale.copy(o),t.updateMatrixWorld(!0)}}function Nu(e,n,r){let i=W(e,t(`experiment.${e}.companion`),t(`experiment.binary.primary`)),a=new Oo(40,r>0&&Number.isFinite(r)?r:1,1e-5,5e3),o={target:new Q,minDistance:.001,maxDistance:1500,update:()=>!0};new ku(a,o).frame(i.bodies);let s=e=>({x:e.x,y:e.y,z:e.z});return te(i,{theme:n,gravity:`off`,axis:!1,names:!1,shadows:!0,orbits:n===`cosmos`,camera:{position:s(a.position),target:s(o.target),followId:i.bodies[0].id,overview:!0,minDistance:o.minDistance,maxDistance:o.maxDistance,near:a.near,far:a.far}},2,`manual`,t(`experiment.${e}.name`),`builtin-${e}`)}function Pu(e){let n=new Map,r=!1;return{render(i){return ie.map(a=>{let o=Nu(a,i,1),s=`experiment:${a}`,c=e.selected()===s,l=document.createElement(`article`);l.className=`save-card experiment-card`,l.dataset.experiment=a,l.dataset.selected=String(c);let u=document.createElement(`img`);u.alt=t(`gallery.thumbnail`),u.width=160,u.height=110,u.hidden=!0;let d=document.createElement(`span`);d.className=`save-preview-fallback`,d.textContent=t(`experiment.preview`);let f=document.createElement(`button`);f.type=`button`,f.className=`save-thumbnail`,f.setAttribute(`aria-label`,t(`gallery.chooseSave`,{name:o.name})),f.setAttribute(`aria-expanded`,String(c)),f.disabled=!e.canLoad,f.append(u,d);let p=document.createElement(`h3`);p.className=`experiment-name`,p.textContent=o.name;let m=document.createElement(`p`);m.className=`save-info`,m.textContent=t(`experiment.info`,{count:o.state.bodies.length});let h=document.createElement(`div`);h.className=`save-actions`,h.hidden=!c,h.id=`experiment-${a}-actions`,f.setAttribute(`aria-controls`,h.id);let g=document.createElement(`p`);g.className=`experiment-description`,g.textContent=t(`experiment.${a}.description`),h.append(g);let _=()=>{e.canLoad&&e.canInteract()&&(e.selected()===s?e.load(a):(e.select(s),l.dataset.selected=`true`,h.hidden=!1,f.setAttribute(`aria-expanded`,`true`)))};f.onclick=e=>{e.stopPropagation(),_()},l.onclick=e=>{e.target instanceof Element&&!e.target.closest(`button,a,input,select,textarea,form,[role="button"]`)&&_()},h.onkeydown=t=>{t.key===`Escape`&&(t.preventDefault(),t.stopPropagation(),e.closeMenus(),f.focus())},l.append(f,p,m,h);let v=`${i}:${a}`;n.has(v)||n.set(v,Promise.resolve().then(()=>{if(r)throw Error(`disposed`);return e.thumbnail(o)}));let y=n.get(v);return y.then(e=>{!r&&u.isConnected&&(u.src=e,u.hidden=!1,d.hidden=!0)}).catch(()=>{n.get(v)===y&&n.delete(v),!r&&d.isConnected&&(d.textContent=t(`gallery.thumbnailUnavailable`))}),l})},dispose(){r=!0,n.clear()}}}var Fu={position:`<path d="M12 3v18M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4"/>`,radius:`<circle cx="11" cy="13" r="7"/><path d="M11 13L21 3M15 3h6v6"/>`,mass:`<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M1 12h2M21 12h2"/>`,velocity:`<path d="M4 20L20 4M11 4h9v9M4 13v7h7"/>`,delete:`<path d="M5 6h14M9 6V3h6v3M7 6l1 15h8l1-15M10 10v7M14 10v7"/>`};function Iu(e){return Ru(Fu[e])}var Lu=Object.fromEntries(Object.entries({add:`<path d="M12 4v16M4 12h16" stroke-width="3.4"/>`,play:`<path d="M8.5 6 18.5 12 8.5 18Z" fill="black" stroke-width="2.8"/>`,pause:`<path d="M8.5 5v14M15.5 5v14" stroke-width="2.8"/>`,undo:`<path d="m8 5-5 5 5 5M3.5 10H14a5.5 5.5 0 0 1 0 11h-3" stroke-width="2.6"/>`,redo:`<path d="m16 5 5 5-5 5M20.5 10H10a5.5 5.5 0 0 0 0 11h3" stroke-width="2.6"/>`,history:`<path d="M4.1 7.7a8.5 8.5 0 1 1-1.2 7.7M4 2.8v5.3h5.3" stroke-width="2.6"/><path d="M12 6.8v5.4l3.4 2.1" stroke-width="2.3"/>`,settings:`<g transform="translate(.55 .7)"><path fill="black" stroke="none" fill-rule="evenodd" d="m9.4 3-.6 2.1-1.6.9-2.1-.5-2 3.5 1.5 1.6v1.8l-1.5 1.6 2 3.5 2.1-.5 1.6.9.6 2.1h4.1l.6-2.1 1.6-.9 2.1.5 2-3.5-1.5-1.6v-1.8l1.5-1.6-2-3.5-2.1.5-1.6-.9L13.5 3Z M11.45 8.2a3.1 3.1 0 1 0 0 6.2a3.1 3.1 0 1 0 0-6.2Z"/></g>`,more:`<circle cx="5" cy="12" r="1.3" fill="black"/><circle cx="12" cy="12" r="1.3" fill="black"/><circle cx="19" cy="12" r="1.3" fill="black"/>`,overview:`<path d="M5 5h4M5 5v4M19 5h-4M19 5v4M5 19h4M5 19v-4M19 19h-4M19 19v-4"/><path d="M3.4 16.8A10 10 0 1 1 15.8 21.2M1.5 13.5l1.9 3.3 3.8-1.1"/>`,close:`<path d="m14.5 5-7 7 7 7"/>`,restart:`<path d="M4.1 7.7a8.5 8.5 0 1 1-1.2 7.7M4 2.8v5.3h5.3"/>`,jump:`<path d="m3.5 6 5.5 6-5.5 6M10.5 6l5.5 6-5.5 6M21 5v14" stroke-width="2.5"/>`}).map(([e,t])=>[e,Ru(t)]));function Ru(e){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`)}")`}function zu(e,t,n){e.getAttribute(`aria-label`)!==t&&(e.textContent=t,e.setAttribute(`aria-label`,t)),e.title!==t&&(e.title=t),e.className.split(` `).includes(`icon-control`)||(e.className+=` icon-control`),e.style.getPropertyValue?.(`--interface-icon`)!==Lu[n]&&e.style.setProperty(`--interface-icon`,Lu[n])}function Bu(e){let t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`planet-scene-${e.createdAt}.json`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function Vu(e,n){let r=document.createElement(`aside`);r.className=`history-gallery`,r.setAttribute(`aria-label`,t(`gallery.title`));let i=document.createElement(`button`);i.className=`history-edge`,i.textContent=t(`gallery.title`),i.setAttribute(`aria-expanded`,`false`),zu(i,t(`gallery.title`),`history`);let a=document.createElement(`span`);a.className=`history-edge-badge`,a.setAttribute(`aria-hidden`,`true`),i.append(a);let o=document.createElement(`section`);o.className=`history-panel`,o.hidden=!0;let s=document.createElement(`h2`);s.textContent=t(`gallery.title`);let c=W(`gallery.close`,()=>{!x&&!M&&n.open(!1)});c.className=`gallery-close`,c.hidden=!0,zu(c,t(`gallery.close`),`close`);let u=document.createElement(`p`);u.className=`gallery-status`,u.setAttribute(`role`,`status`),u.textContent=t(`gallery.info`);let d=document.createElement(`select`);d.setAttribute(`aria-label`,t(`gallery.filter`));for(let e of[`all`,`manual`,`checkpoints`,`pinned`,`experiments`]){let n=document.createElement(`option`);n.value=e,n.textContent=t(`gallery.${e}`),d.append(n)}let f=document.createElement(`input`);f.type=`file`,f.accept=`.json,application/json`,f.hidden=!0;let p=document.createElement(`span`);p.className=`gallery-filter`,p.append(d);let m=document.createElement(`div`);m.className=`gallery-tools`,m.append(p,W(`gallery.import`,()=>f.click()),W(`gallery.exportCurrent`,()=>void le(async()=>Bu(se(`manual`)))));let h=document.createElement(`div`);h.className=`gallery-cards`;let g=W(`gallery.undoDelete`,()=>void pe());g.className=`gallery-delete-undo`,g.hidden=!0;let _=document.createElement(`div`);_.className=`gallery-feedback`,_.append(u,g);let v=document.createElement(`header`);v.className=`gallery-header`;let y=document.createElement(`div`);y.className=`gallery-header-row`,y.append(m,s),v.append(y,_),o.append(v,h,f),r.append(i,o,c),e.append(r);let b=!1,x=!1,S=!1,C=[],w=``,T=-1,E=``,D=null,O=!1,k=null,A=null,j=``,M=!1,N=null,F=new Set,I=crypto.randomUUID(),L=new Map,ne=()=>!x&&!M&&b&&!n.busy(),R=e=>{de(),k=e,U(`gallery.selected`)},re=Pu({thumbnail:n.thumbnail,closeMenus:de,selected:()=>k,select:R,canInteract:ne,canLoad:!!n.store,load:t=>{x||M||!b||n.busy()||!n.store||le(async()=>{if(await ue(se(`workspace`)),S||!b||n.busy())throw Error(`busy`);let r=Nu(t,n.view().theme,e.clientWidth/Math.max(1,e.clientHeight));D=n.view(),M=n.load(r),c.disabled=!!M,U(M?`gallery.restoring`:`gallery.busy`)},!0)}}),z=null,B=e=>e instanceof Node&&r.contains(e),V=(e,t)=>[...L.keys()].some(n=>getComputedStyle(n).visibility!==`hidden`&&[...n.getClientRects()].some(n=>n.width>0&&n.height>0&&e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)),ie=e=>{z=b&&e.button===0&&!B(e.target)&&!V(e.clientX,e.clientY)?{id:e.pointerId,x:e.clientX,y:e.clientY,moved:!1}:null},H=e=>{z?.id===e.pointerId&&Math.hypot(e.clientX-z.x,e.clientY-z.y)>6&&(z.moved=!0)},ae=()=>{z=null},oe=e=>{if(!b||B(e.target))return;e.stopImmediatePropagation();let t=z;z=null,t&&!t.moved&&Math.hypot(e.clientX-t.x,e.clientY-t.y)<=6&&!V(e.clientX,e.clientY)&&!x&&!M&&(n.open(!1),n.onBackdropClose?.())};e.addEventListener(`pointerdown`,ie,!0),e.addEventListener(`pointermove`,H,!0),e.addEventListener(`pointercancel`,ae,!0),e.addEventListener(`click`,oe,!0);let U=e=>{u.textContent=t(e)};function W(e,n){let r=document.createElement(`button`);return r.type=`button`,r.textContent=t(e),r.onclick=n,r}function se(e,t=``){let r=n.current();if(!r||n.busy()||r.jump||r.localStep)throw Error(`busy`);return te(r.state,n.view(),r.speedIndex,e,t,e===`workspace`?`workspace`:crypto.randomUUID())}async function ce(){n.store&&(C=await n.store.list(),S||await me())}async function le(e,t=!1){if(!(x||S)){x=!0,r.dataset.working=`true`,c.disabled=!0,t||U(`gallery.working`);try{await e(),S||(await ce(),t||U(`gallery.done`))}catch(e){S||U(e instanceof SyntaxError||e instanceof Error&&e.message===`file`?`gallery.invalidFile`:e instanceof Error&&e.message===`busy`?`gallery.busy`:`gallery.failed`)}finally{x=!1,r.dataset.working=`false`,c.disabled=!!M}}}async function ue(e){if(!n.store)throw Error(`storage`);let t;try{t=await n.thumbnail(e)}catch{}await n.store.put(e,t,{preserveName:e.kind===`workspace`})}function de(){k=null;for(let e of h.querySelectorAll(`.save-actions`))e.hidden=!0;for(let e of h.querySelectorAll(`.save-thumbnail`))e.setAttribute(`aria-expanded`,`false`);for(let e of h.querySelectorAll(`.save-card`))e.dataset.selected=`false`}r.addEventListener(`click`,e=>{e.target instanceof Element&&!e.target.closest(`.save-card`)&&de()});function fe(e){x||M||!b||n.busy()||!n.store||le(async()=>{if(await ue(se(`workspace`)),S||!b||n.busy())throw Error(`busy`);D=n.view(),M=n.load(e),c.disabled=!!M,U(M?`gallery.restoring`:`gallery.busy`)},!0)}async function G(e){ne()&&n.store&&await le(async()=>{let t=await n.store.image(e.id);await n.store.remove(e.id),!S&&(N={file:structuredClone(e),image:t},g.hidden=!1,de(),U(`gallery.deleted`))},!0)}async function pe(){ne()&&n.store&&N&&await le(async()=>{let e=N,t=await n.store.list(),r=t.some(t=>t.id===e.file.id),i=e.file.kind===`checkpoint`&&!e.file.pinned&&t.filter(e=>e.kind===`checkpoint`&&!e.pinned).length>=P.automatic,a=r||i?{...e.file,id:crypto.randomUUID(),kind:`manual`,pinned:!0}:e.file;await n.store.put(a,e.image??void 0),N=null,g.hidden=!0,U(`gallery.deleteUndone`)},!0)}async function me(){let e=++he,r=h.querySelector(`.add-save input`)?.value??``;h.replaceChildren();let i=document.createElement(`article`);i.className=`save-card add-save`;let a=document.createElement(`form`);a.className=`save-name-form`,a.hidden=!O;let o=document.createElement(`input`);o.placeholder=t(`gallery.name`),o.maxLength=80,o.setAttribute(`aria-label`,t(`gallery.name`)),o.value=r;let s=W(`gallery.add`,()=>{de(),O=!0,s.hidden=!0,a.hidden=!1,o.focus()});s.className=`add-save-trigger`,s.disabled=!n.store,s.hidden=O;let c=W(`gallery.save`,()=>{});c.type=`submit`;let u=W(`gallery.cancel`,()=>{O=!1,o.value=``,a.hidden=!0,s.hidden=!1,s.focus()}),f=document.createElement(`div`);f.className=`save-form-actions`,f.append(c,u),a.append(o,f),a.onsubmit=e=>{e.preventDefault(),le(async()=>{if(!b)throw Error(`busy`);await ue(se(`manual`,o.value)),O=!1,o.value=``})},a.onkeydown=e=>{e.key===`Escape`&&(e.stopPropagation(),e.preventDefault(),u.click())},i.append(s,a),h.append(i),b&&(d.value===`all`||d.value===`experiments`)&&h.append(...re.render(n.view().theme));for(let r of C.filter(e=>d.value===`all`||d.value===`manual`&&e.kind===`manual`||d.value===`checkpoints`&&e.kind===`checkpoint`||d.value===`pinned`&&e.pinned)){let i=document.createElement(`article`);i.className=`save-card`,i.dataset.id=r.id,i.dataset.selected=String(k===r.id);let a=r.name||t(`gallery.${r.kind}`),o=document.createElement(`img`);o.alt=t(`gallery.thumbnail`),o.width=160,o.height=110,o.hidden=!0;let s=document.createElement(`span`);s.className=`save-preview-fallback`,s.textContent=t(`gallery.thumbnailUnavailable`);let c=()=>{ne()&&(k===r.id?fe(r):(R(r.id),i.dataset.selected=`true`,b.hidden=!1,u.setAttribute(`aria-expanded`,`true`)))},u=W(`gallery.thumbnail`,c);u.onclick=e=>{e.stopPropagation(),c()},u.className=`save-thumbnail`,u.setAttribute(`aria-label`,t(`gallery.chooseSave`,{name:a})),u.setAttribute(`aria-expanded`,String(k===r.id)),u.setAttribute(`aria-controls`,`save-actions-${r.id}`),u.replaceChildren(o,s),i.onclick=e=>{e.target instanceof Element&&!e.target.closest(`button,a,input,select,textarea,form,[role="button"]`)&&c()};let d=document.createElement(`h3`);d.className=`save-name`,d.textContent=a,d.title=`${a}\n${t(`gallery.renameHint`)}`,d.tabIndex=0,d.setAttribute(`role`,`button`),d.setAttribute(`aria-label`,t(`gallery.editName`,{name:a})),d.hidden=A===r.id;let f=document.createElement(`form`);f.className=`save-inline-name-form`,f.hidden=A!==r.id;let p=document.createElement(`input`);p.value=A===r.id?j:r.name,p.placeholder=a,p.maxLength=80,p.setAttribute(`aria-label`,t(`gallery.rename`)),p.setAttribute(`title`,t(`gallery.renameHint`)),f.append(p);let m=()=>{A=null,j=``,f.hidden=!0,d.hidden=!1},g=()=>{x||M||!n.store||(de(),A=r.id,j=r.name,p.value=j,d.hidden=!0,f.hidden=!1,p.focus(),p.setSelectionRange(0,0))},_=()=>{if(A!==r.id||x||M)return;if(j===r.name){m();return}let e=j;le(async()=>{await n.store.rename(r.id,e),m()})};d.onclick=g,d.onkeydown=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),g())},p.oninput=()=>{j=p.value},p.onblur=_,p.onkeydown=e=>{e.key===`Escape`&&!e.isComposing&&(e.preventDefault(),e.stopPropagation(),m(),d.focus())},f.onsubmit=e=>{e.preventDefault(),x||_()};let v=new Intl.DateTimeFormat(`zh-CN`,{month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(new Date(r.createdAt)),y=document.createElement(`p`);y.className=`save-info`,y.textContent=t(`gallery.cardInfo`,{date:v,type:t(r.kind===`workspace`?`gallery.workspaceType`:`gallery.${r.kind}`),count:r.state.bodies.length}),i.title=t(`gallery.metadata`,{date:new Date(r.createdAt).toLocaleString(`zh-CN`),time:l(r.state.elapsedSeconds),count:r.state.bodies.length,type:t(`gallery.${r.kind}`)});let b=document.createElement(`div`);b.className=`save-actions`,b.id=`save-actions-${r.id}`,b.hidden=k!==r.id,b.setAttribute(`role`,`group`),b.setAttribute(`aria-label`,t(`gallery.actions`)),b.onkeydown=e=>{e.key===`Escape`&&(e.stopPropagation(),de(),u.focus())},r.kind===`workspace`?b.append(W(`gallery.keepWorkspace`,()=>void le(async()=>n.store.put({...r,id:crypto.randomUUID(),createdAt:Date.now(),kind:`manual`,pinned:!0,name:a},await n.store.image(r.id)??void 0)))):b.append(W(r.pinned?`gallery.unpin`:`gallery.pin`,()=>void le(()=>n.store.put({...r,pinned:!r.pinned})))),b.append(W(`gallery.export`,()=>Bu(r))),b.append(W(`gallery.delete`,()=>void G(r))),i.append(u,d,f,y,b),h.append(i),n.store&&n.store.image(r.id).then(t=>{t&&!S&&e===he&&(o.src=t,o.hidden=!1,s.hidden=!0)}).catch(()=>U(`gallery.failed`))}}let he=0;d.onchange=()=>{de(),me(),h.scrollTop=0},i.onclick=()=>{!x&&!M&&!n.busy()&&n.open(!b)},f.onchange=()=>void le(async()=>{let e=f.files?.[0];if(e){if(e.size>P.fileBytes)throw Error(`file`);await ue({...ee(await e.text()),id:crypto.randomUUID(),kind:`manual`,pinned:!1,createdAt:Date.now()}),f.value=``}});function ge(a){if(b!==a){if(b=a,o.hidden=!a,c.hidden=!a,r.dataset.open=String(a),i.setAttribute(`aria-expanded`,String(a)),e.dataset.gallery=String(a),z=null,a){n.onOpen?.();for(let t of[...e.children,...e.querySelectorAll(`.spatial-handle`)])t instanceof HTMLElement&&t!==r&&!t.classList.contains(`scene-host`)&&(L.set(t,t.inert),t.inert=!0);ce().then(()=>{b&&!S&&(h.scrollTop=0)}).catch(()=>U(`gallery.failed`))}else de(),L.forEach((e,t)=>{t.inert=e}),L.clear(),u.textContent===t(`gallery.restored`)&&U(`gallery.info`)}}let _e=setInterval(()=>{let e=n.current();if(!e||n.busy()||e.galleryOpen||e.jump||e.localStep||e.physicsIssue||x||M||!n.store)return;let t=n.view(),r=e.speedIndex,i=JSON.stringify([e.version,t,r]);i!==w&&le(async()=>{await ue(te(e.state,t,r,`workspace`,``,`workspace`)),w=i},!0)},1e4);return n.store?ce().catch(()=>U(`gallery.failed`)):U(`gallery.unavailable`),{update(e){if(ge(!!e.galleryOpen),i.disabled=n.busy()||!!e.jump||!!e.localStep,c.disabled=x||!!M,M&&e.recoveryResult?.operation===`loadScene`&&e.recoveryResult.requestId===M){M=!1;let t=e.recoveryResult.outcome===`committed`;U(t?`gallery.restored`:`gallery.failed`),t&&(de(),n.onRestored?.(),n.open(!1))}if(e.jump&&e.jump.taskId!==E&&(E=e.jump.taskId,D=n.view()),e.history?.revision!==T&&!x&&!M&&!e.jump&&!e.localStep&&!n.busy()&&n.store){let t=(n.archive()?.checkpoints??[]).find(e=>!F.has(e.id));if(t){let r=structuredClone(D??n.view());t.state.bodies.some(e=>e.id===r.camera.followId)||(r.camera.overview=!0),le(async()=>{await ue(te(t.state,r,e.speedIndex,`checkpoint`,``,`checkpoint-${I}-${t.id}`)),F.add(t.id)},!0)}else T=e.history?.revision??-1}},fail(){M=!1,ge(!1),U(`gallery.failed`)},async flushWorkspace(){n.store&&!n.busy()&&!x&&await ue(se(`workspace`))},dispose(){S=!0,N=null,re.dispose(),clearInterval(_e),he++,e.removeEventListener(`pointerdown`,ie,!0),e.removeEventListener(`pointermove`,H,!0),e.removeEventListener(`pointercancel`,ae,!0),e.removeEventListener(`click`,oe,!0),L.forEach((e,t)=>{t.inert=e}),delete e.dataset.gallery,r.remove(),n.store?.close()}}}function Hu(e){let t=[];return e.traverse(e=>{let n=e;for(let e of n.material?Array.isArray(n.material)?n.material:[n.material]:[]){let n=e;t.push([n.uuid,n.side,n.transparent,n.forceSinglePass,n.alphaTest,n.toneMapped,n.vertexColors,n.flatShading,n.map?.uuid,n.map?.channel,n.map?.colorSpace,n.alphaMap?.uuid,n.customProgramCacheKey(),JSON.stringify(n.defines),n.vertexShader,n.fragmentShader].join(`:`))}}),e.traverseVisible(e=>{let n=e;n.isLight&&t.push(`light:${n.type}`)}),t.join(`|`)}var Uu=class{compile;failure;ready=null;pending=!1;failed=null;generation=0;disposed=!1;starts=0;completions=0;constructor(e,t=()=>{}){this.compile=e,this.failure=t}canRender(e){if(this.disposed)return!1;if(this.ready===e)return!0;if(this.pending||this.failed===e)return!1;this.pending=!0,this.starts++;let t=this.generation;return Promise.resolve().then(()=>{if(!(this.disposed||t!==this.generation))return this.compile()}).then(()=>{this.disposed||t!==this.generation||(this.ready=e,this.pending=!1,this.completions++)},n=>{this.disposed||t!==this.generation||(this.pending=!1,this.failed=e,this.failure(n))}),!1}diagnostics(e){return{pending:this.pending,failed:this.failed===e,starts:this.starts,completions:this.completions,readyLength:this.ready?.length??0,keyLength:e.length}}invalidate(){this.generation++,this.ready=null,this.pending=!1,this.failed=null}dispose(){this.disposed=!0,this.invalidate()}},Wu=2e4;async function Gu(e,t,n,r,i,a,o){if(!r())return;let s=performance.now(),c=Math.min(s+Wu,o??1/0),l=0,u=!1,d=()=>{if(!Number.isFinite(c)||performance.now()>=c)throw Error(`Shader preparation timed out`)};try{d();try{e.compile(t,n)}finally{l=performance.now()-s}if(!r())return;d();let o=e.getContext(),f=o.getExtension(`KHR_parallel_shader_compile`);u=!!f;for(let t of e.info.programs??[]){if(!r()||o.isContextLost())return;d();let e=t.program;if(!e||i.has(e))continue;for(;f;){if(!r()||o.isContextLost())return;if(d(),t.program!==e||o.getProgramParameter(e,f.COMPLETION_STATUS_KHR))break;await new Promise(e=>setTimeout(e,Math.min(10,Math.max(0,c-performance.now()))))}if(!r()||o.isContextLost())return;if(d(),t.program!==e)continue;let n=o.getProgramParameter(e,o.LINK_STATUS);if(d(),!n){let n=[o.getProgramInfoLog(e),o.getShaderInfoLog(t.vertexShader),o.getShaderInfoLog(t.fragmentShader)].filter(Boolean).join(`
`);throw Error(`Shader link failed\n${n}`)}i.add(e)}if(!r())return;d(),a?.({submitMs:l,wallMs:performance.now()-s,parallel:u,failed:!1})}catch(e){throw a?.({submitMs:l,wallMs:performance.now()-s,parallel:u,failed:!0}),e}}var Ku=class{upload;schedule;tasks=[];cancel=null;disposed=!1;constructor(e,t=e=>{let t=requestAnimationFrame(e);return()=>cancelAnimationFrame(t)}){this.upload=e,this.schedule=t}prepare(e){return this.disposed?Promise.resolve():new Promise((t,n)=>{this.tasks.push({texture:e,resolve:t,reject:n}),this.request()})}request(){this.cancel||this.disposed||!this.tasks.length||(this.cancel=this.schedule(()=>{this.cancel=null;let e=this.tasks.shift();if(e){try{this.upload(e.texture),e.resolve()}catch(t){e.reject(t)}this.request()}}))}dispose(){this.disposed=!0,this.cancel?.(),this.cancel=null;for(let e of this.tasks.splice(0))e.resolve()}},qu={sun:{file:`2k_sun.jpg`,width:2048,height:1024},mercury:{file:`2k_mercury.jpg`,width:2048,height:1024},venus:{file:`2k_venus_atmosphere.jpg`,width:2048,height:1024},earth:{file:`earth-scope-2k.jpg`,width:2048,height:1024},moon:{file:`moon-2k.jpg`,width:2048,height:1024},jupiter:{file:`jupiter-cassini-2k.jpg`,width:2048,height:1024},mars:{file:`2k_mars.jpg`,width:2048,height:1024},saturn:{file:`2k_saturn.jpg`,width:2048,height:1024},uranus:{file:`2k_uranus.jpg`,width:2048,height:1024},neptune:{file:`2k_neptune.jpg`,width:2048,height:1024},"saturn-ring":{file:`2k_saturn_ring_alpha.png`,width:2048,height:125}};function Ju(e,t,n=qu){let r=n[e];return t===`close`?r.close??r:r}var Yu=class{fetch;status;base;catalog;prepare;entries=new Map;textures=new Set;failed=new Set;states=new Map;disposed=!1;constructor(e=e=>new mo().loadAsync(e),t=()=>{},n=`/planet-simulator/`,r=qu,i){this.fetch=e,this.status=t,this.base=n,this.catalog=r,this.prepare=i}report(e,t,n){this.states.set(t,n);let r=[...this.states].filter(([t])=>t.startsWith(`${e}:`)).map(([,e])=>e);this.status(e,r.includes(`failed`)?`failed`:r.includes(`loading`)?`loading`:`ready`)}get(e,t=`base`){if(this.disposed)return Promise.resolve(null);let n=Ju(e,t,this.catalog),r=`${e}:${n.file}`,i=this.entries.get(r);if(i)return i;this.report(e,r,`loading`);let a=this.fetch(`${this.base}assets/samples/${n.file}`).then(t=>{if(this.disposed)return t.dispose(),null;t.colorSpace=Dt,t.wrapS=le,t.wrapT=ue,t.anisotropy=4,this.textures.add(t);let n=()=>this.disposed?null:(this.report(e,r,`ready`),t);return this.prepare?this.prepare(t).then(n,e=>{throw this.textures.delete(t)&&t.dispose(),e}):n()}).catch(()=>(this.disposed||(this.failed.add(r),this.report(e,r,`failed`)),null));return this.entries.set(r,a),a}retry(e,t=`base`){let n=`${e}:${Ju(e,t,this.catalog).file}`;return this.failed.delete(n)&&this.entries.delete(n),this.get(e,t)}prepareResident(){return Promise.all([...this.textures].map(e=>this.prepare?.(e)))}diagnostics(){return{textureEntries:this.entries.size,residentTextures:this.textures.size,loadingTextures:[...this.states.values()].filter(e=>e===`loading`).length}}dispose(){this.disposed||(this.disposed=!0,this.textures.forEach(e=>e.dispose()),this.textures.clear(),this.entries.clear(),this.states.clear(),this.failed.clear())}},Xu=`
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
`,Zu={cosmos:{background:`#090d14`,ambient:`#c1d3ea`,fill:1.1,key:`#fff1df`,keyIntensity:2.4},atelier:{background:`#E9E3D8`,ambient:`#f5ead7`,fill:1.75,key:`#fff8ed`,keyIntensity:1.7}},Qu=[`sun`,`mercury`,`venus`,`earth`,`moon`,`mars`,`jupiter`,`saturn`,`uranus`,`neptune`];function $u(e,t){let n={value:+(t===`atelier`)},r={value:new Z(1/2048,1/1024)},i=e===`sun`?new Mi({color:`#ffffff`,toneMapped:!1}):new Ra({color:`#ffffff`,roughness:1,metalness:0});return i.onBeforeCompile=t=>{if(t.uniforms.sampleAtelier=n,t.uniforms.sampleTexel=r,t.fragmentShader=`uniform float sampleAtelier;
uniform vec2 sampleTexel;
`+t.fragmentShader,e===`sun`){let e=`varying vec3 sampleSunView;
varying vec3 sampleSunNormal;
`;t.vertexShader=e+t.vertexShader.replace(`#include <project_vertex>`,`
        #include <project_vertex>
        sampleSunView = -mvPosition.xyz;
        sampleSunNormal = normalize(normalMatrix * normal);
      `),t.fragmentShader=e+Xu+t.fragmentShader}t.fragmentShader=t.fragmentShader.replace(`#include <map_fragment>`,`
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
    `)},i.customProgramCacheKey=()=>`sample-surface-v3-${e===`sun`?`sun`:e===`earth`?`earth`:`standard`}`,{material:i,setTheme(e){n.value=+(e===`atelier`)},setResolution(e,t){r.value.set(1/e,1/t)}}}function ed(e){return new wr(Zu[e].background)}function td(){let e=[],t=317,n=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296);for(let t=0;t<380;t++){let t=n()*2-1,r=n()*Math.PI*2,i=Math.sqrt(1-t*t);e.push(Math.cos(r)*i*3e3,t*3e3,Math.sin(r)*i*3e3)}let r=new bi;r.setAttribute(`position`,new ci(e,3));let i=new da({color:`#b5bed0`,size:1.1,sizeAttenuation:!1,transparent:!0,opacity:.48,depthWrite:!1}),a=new ga(r,i);return a.frustumCulled=!1,{stars:a,dispose(){r.dispose(),i.dispose()}}}var nd={source:`https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc`,version:`pck00011, 2022-12-27`,retrieved:`2026-10-22`,extraction:`Numeric orientation subset transcribed from the official web-readable kernel; direct raw download timed out. Zero-only harmonic arrays and unused system angles omitted. Not the original kernel file.`,epochJdTdb:2451545,eclipticObliquityArcsec:84381.448,obliquitySource:`https://ssd.jpl.nasa.gov/astro_par.html; also archived Horizons earth.json reference-frame header`,units:`degrees; pole polynomials and phase-angle polynomials in Julian centuries; prime-meridian polynomial in TDB days; epoch JD2451545.0 TDB`,limits:`Display only. IAU_EARTH and IAU_MOON text models are not high-precision terrestrial/lunar orientation. Texture longitude registration is illustrative, not calibrated to the model prime meridian. Gas giants and Sun are reference-system rotation, not evolving cloud or differential-rotation models.`,bodies:{sun:{ra:[286.13,0,0],dec:[63.87,0,0],pm:[84.176,14.1844,0]},mercury:{ra:[281.0103,-.0328,0],dec:[61.4155,-.0049,0],pm:[329.5988,6.1385108,0],angles:[[174.7910857,149472.53587500003],[349.5821714,298945.07175000006],[164.3732571,448417.60762500006],[339.1643429,597890.1435000001],[153.9554286,747362.679375]],pmTerms:[.01067257,-.00112309,-1104e-7,-2539e-8,-571e-8]},venus:{ra:[272.76,0,0],dec:[67.16,0,0],pm:[160.2,-1.4813688,0]},earth:{ra:[0,-.641,0],dec:[90,-.557,0],pm:[190.147,360.9856235,0]},moon:{ra:[269.9949,.0031,0],dec:[66.5392,.013,0],pm:[38.3213,13.17635815,-14e-13],angles:[[125.045,-1935.5364525],[250.089,-3871.072905],[260.008,475263.3328725],[176.625,487269.629985],[357.529,35999.0509575],[311.589,964468.49931],[134.963,477198.869325],[276.617,12006.300765],[34.226,63863.5132425],[15.134,-5806.6093575],[119.743,131.84064],[239.961,6003.1503825],[25.053,473327.79642]],raTerms:[-3.8787,-.1204,.07,-.0172,0,.0072,0,0,0,-.0052,0,0,.0043],decTerms:[1.5419,.0239,-.0278,.0068,0,-.0029,9e-4,0,0,8e-4,0,0,-9e-4],pmTerms:[3.561,.1208,-.0642,.0158,.0252,-.0066,-.0047,-.0046,.0028,.0052,.004,.0019,-.0044]},mars:{ra:[317.269202,-.10927547,0],dec:[54.432516,-.05827105,0],pm:[176.049863,350.891982443297,0],angles:[[190.72646643,15917.10818695,0],[21.4689247,31834.27934054,0],[332.86082793,19139.89694742,0],[394.93256437,38280.79631835,0],[189.6327156,41215158.1842005,12.711923222],[121.46893664,660.22803474,0],[231.05028581,660.9912354,0],[251.37314025,1320.50145245,0],[217.98635955,38279.9612555,0],[196.19729402,19139.83628608,0],[198.991226,19139.4819985,0],[226.292679,38280.8511281,0],[249.663391,57420.7251593,0],[266.18351,76560.636795,0],[79.398797,.5042615,0],[122.433576,19139.9407476,0],[43.058401,38280.8753272,0],[57.663379,57420.7517205,0],[79.476401,76560.6495004,0],[166.325722,.5042615,0],[129.071773,19140.0328244,0],[36.352167,38281.0473591,0],[56.668646,57420.929536,0],[67.364003,76560.2552215,0],[104.79268,95700.4387578,0],[95.391654,.5042615,0]],raTerms:[0,0,0,0,0,0,0,0,0,0,68e-6,238e-6,52e-6,9e-6,.419057],decTerms:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51e-6,141e-6,31e-6,5e-6,1.591274],pmTerms:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,145e-6,157e-6,4e-5,1e-6,1e-6,.584542]},jupiter:{ra:[268.056595,-.006499,0],dec:[64.495303,.002413,0],pm:[284.95,870.536,0],angles:[[73.32,91472.9],[24.62,45137.2],[283.9,4850.7],[355.8,1191.3],[119.9,262.1],[229.8,64.3],[352.25,2382.6],[113.35,6070],[146.64,182945.8],[49.24,90274.4],[99.360714,4850.4046],[175.895369,1191.9605],[300.323162,262.5475],[114.012305,6070.2476],[49.511251,64.3]],raTerms:[0,0,0,0,0,0,0,0,0,0,117e-6,938e-6,.001432,3e-5,.00215],decTerms:[0,0,0,0,0,0,0,0,0,0,5e-5,404e-6,617e-6,-13e-6,926e-6]},saturn:{ra:[40.589,-.036,0],dec:[83.537,-.004,0],pm:[38.9,810.7939024,0]},uranus:{ra:[257.311,0,0],dec:[-15.175,0,0],pm:[203.81,-501.1600928,0]},neptune:{ra:[299.36,0,0],dec:[43.46,0,0],pm:[249.978,541.1397757,0],angles:[[357.85,52.316],[323.92,62606.6],[220.51,55064.2],[354.27,46564.5],[75.31,26109.4],[35.36,14325.4],[142.61,2824.6],[177.85,52.316],[647.84,125213.2],[355.7,104.632],[533.55,156.948],[711.4,209.264],[889.25,261.58],[1067.1,313.896],[1244.95,366.212],[1422.8,418.528],[1600.65,470.844]],raTerms:[.7,0,0,0,0,0,0,0,0],decTerms:[-.51,0,0,0,0,0,0,0,0],pmTerms:[-.48,0,0,0,0,0,0,0,0]}}},rd={star:[600,7],"terrestrial-planet":[24,23],"gas-giant":[10,3],moon:[648,7],"dwarf-planet":[9,4],asteroid:[5,25],comet:[12,30]};function id(e){if(e===`black-hole`)return;let[t,n]=rd[e];return{periodSeconds:t*3600,tiltDegrees:n,direction:1,phaseDegrees:0,epochSeconds:0}}var ad=nd.bodies,od=Math.PI/180,sd=86400,cd=36525,ld=nd.eclipticObliquityArcsec/3600*od,ud=new Q(0,1,0),dd=new Map(B.map(e=>[e.id,e])),fd={earth:-1.9,jupiter:.4},pd=(e,t)=>e.reduceRight((e,n)=>e*t+n,0);function md(e,t){let n=ad[e];if(!n||!Number.isFinite(t))return null;let r=t/sd,i=r/cd,a=(n.angles??[]).map(e=>pd(e,i)%360*od),o=(e,t=!1)=>(e??[]).reduce((e,n,r)=>e+n*(t?Math.cos(a[r]):Math.sin(a[r])),0),s=pd(n.ra,i)+o(n.raTerms),c=pd(n.dec,i)+o(n.decTerms,!0),l=pd(n.pm,r)+o(n.pmTerms);return[s,c,l].every(Number.isFinite)?{ra:s,dec:c,meridian:l}:null}function hd(e,t){let n=md(e,t);if(!n)return null;let r=n.ra*od,i=n.dec*od,a=Math.cos(i)*Math.cos(r),o=Math.cos(i)*Math.sin(r),s=Math.sin(i);return new Q(a,-o*Math.sin(ld)+s*Math.cos(ld),-o*Math.cos(ld)-s*Math.sin(ld)).normalize()}function gd(e,t){let n=hd(e,t),r=md(e,t),i=md(e,0);if(!n||!r||!i)return null;let a=(r.meridian-i.meridian)%360*od+(fd[e]??0),o=r.ra*od,s=new Q(-Math.sin(o),-Math.cos(o)*Math.sin(ld),-Math.cos(o)*Math.cos(ld)).normalize(),c=new Un().makeBasis(s,n,s.clone().cross(n).normalize());return new yn().setFromRotationMatrix(c).multiply(new yn().setFromAxisAngle(ud,a))}function _d(e){let t=dd.get(e.id);return!!t&&t.kind===e.kind&&t.massKg===e.massKg&&t.radiusM===e.radiusM&&t.materialId===e.materialId}function vd(e){if(e.kind===`black-hole`||_d(e))return;let t=e.displaySpin??id(e.kind);return h(t)?t:void 0}function yd(e,t){if(!Number.isFinite(t))return null;if(_d(e))return gd(e.id,t);let n=vd(e);if(!n)return null;let r=n.tiltDegrees*od,i=new Q(Math.sin(r),Math.cos(r),0);return new yn().setFromUnitVectors(ud,i).multiply(new yn().setFromAxisAngle(ud,g(n,t)*od))}var bd={inner:66900/58232,outer:136780/58232};function xd(e){let t=new Ea(bd.inner,bd.outer,128),n=t.getAttribute(`position`),r=t.getAttribute(`uv`);for(let e=0;e<n.count;e++)r.setXY(e,(Math.hypot(n.getX(e),n.getY(e))-bd.inner)/(bd.outer-bd.inner),.5);t.rotateX(-Math.PI/2);let i=$u(`saturn-ring`,`cosmos`);i.material.side=2,i.material.transparent=!0,i.material.opacity=.88,i.material.depthWrite=!1,i.material.alphaTest=.015;let a=new Wi(t,i.material);a.visible=!1,a.raycast=()=>{};let o=!1,s=!1;async function c(t=!1){let n=await(t?e.retry(`saturn-ring`):e.get(`saturn-ring`));!s&&n&&(i.material.map=n,i.material.needsUpdate=!0,a.visible=!0,i.setResolution(2048,125))}return{mesh:a,request(){o||(o=!0,c())},retry(){o&&c(!0)},setTheme(e){i.setTheme(e),i.material.opacity=e===`atelier`?.65:.88},dispose(){s=!0,a.removeFromParent(),t.dispose(),i.material.dispose()}}}var Sd=`
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
`,Cd={star:`
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
    return vec4(vec3(.19,.17,.145)*tone,.005*terrain+cliff*layer*.0012-pocket*.007+gravel*.003+grain*.002*fine);`};function wd(e,t){if(e!==`black-hole`&&!(e in Cd))return null;let n={value:+(t===`atelier`)},r=e===`black-hole`||e===`star`?new Mi({color:`#ffffff`,toneMapped:!1}):new Ra({color:`#ffffff`,roughness:1,metalness:0});return r.userData.presentation=e===`black-hole`?`illustrative-dark-boundary`:`original-3d-${e}`,r.onBeforeCompile=t=>{if(t.uniforms.minorAtelier=n,e===`black-hole`){let e=`varying vec3 holeNormal;
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
`+n+Sd+`
        vec4 rockField(vec3 p,float fine) {${Cd[e]}}
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
      `)}},r.customProgramCacheKey=()=>`minor-surface-v3-${e}`,{material:r,setTheme(e){n.value=+(e===`atelier`)}}}function Td(e,t,n,r,i){let a=e/E*10,o=i*2*t*Math.tan(n*Math.PI/360)/Math.max(1,r);return Math.max(a,o)}var Ed={sun:`#e8c98d`,mercury:`#aaa8a3`,venus:`#cfb793`,earth:`#79a0b4`,moon:`#babcb9`,mars:`#b78772`,jupiter:`#b89b86`,saturn:`#c9bba0`,uranus:`#95bfc5`,neptune:`#7c96bb`},Dd={sun:`star`,mercury:`terrestrial-planet`,venus:`terrestrial-planet`,earth:`terrestrial-planet`,moon:`moon`,mars:`terrestrial-planet`,jupiter:`gas-giant`,saturn:`gas-giant`,uranus:`gas-giant`,neptune:`gas-giant`};function Od(e){return e.kind===`black-hole`?null:Qu.find(t=>t===e.materialId&&Dd[t]===e.kind)??null}function kd(e,t={}){let n=new Er,r=new Da(1,72,48),i=new Map,a=new Map,o=new Map,s=new Map,c=new Map,l=new Set,u=new Set,d=t.textures??qu,f=new Yu(t.fetchTexture,t.onSurfaceStatus,void 0,d,t.prepareTexture),p=td();n.add(p.stars);let m=new Map,h=new go(`#c1d3ea`,`#6c7687`,1.1),g=new No(`#fff1df`,1.7);g.position.set(-20,25,50);let v=new Ao(`#fff1df`,2.4,0,0);n.add(h,g,v);let y=new bi;y.setAttribute(`position`,new ci([0,-1.45,0,0,-1.04,0,0,1.04,0,0,1.45,0],3));let b=new Qi({color:`#b7c7d4`,transparent:!0,opacity:.6,depthTest:!1}),x=new ua(y,b);x.visible=!1,x.renderOrder=2,x.raycast=()=>{},n.add(x);let S=`cosmos`,C=!1,w=new Map,T=0;function E(e){S=e;let t=Zu[S];n.background=ed(S),h.color.set(t.ambient),h.groundColor.set(S===`atelier`?`#b2a18d`:`#6c7687`),h.intensity=t.fill,g.color.set(t.key),g.intensity=t.keyIntensity,v.color.set(t.key),v.intensity=t.keyIntensity,g.visible=S===`atelier`,v.visible=S===`cosmos`,b.color.set(S===`atelier`?`#56636d`:`#b7c7d4`),p.stars.visible=S===`cosmos`,o.forEach(e=>e.style.setTheme(S)),s.forEach(e=>e.setTheme(S)),m.forEach(e=>e.setTheme(S))}function D(e){w.delete(e);let t=i.get(e);t&&n.remove(t),i.delete(e),a.get(e)?.dispose(),a.delete(e),o.delete(e),s.delete(e),c.delete(e),l.delete(e),u.delete(e),m.get(e)?.dispose(),m.delete(e)}function O(e){let t=new Set(e.map(e=>e.id));for(let e of i.keys())t.has(e)||D(e);for(let t of e){let e=Od(t),l=e??t.kind;if(i.has(t.id)&&c.get(t.id)===l)continue;i.has(t.id)&&D(t.id);let u=e?$u(e,S):null,d=e?null:wd(t.kind,S),p=u?.material??d?.material??new Ra({color:`#a2a19b`,roughness:1,metalness:0});d&&s.set(t.id,d),u&&e&&(o.set(t.id,{surface:e,style:u}),p.color.set(Ed[e]??`#ffffff`)),a.set(t.id,p),c.set(t.id,l);let h=new Wi(r,p);h.userData.bodyId=t.id,i.set(t.id,h),n.add(h);let g=e?gd(e,0):null;if(g&&h.quaternion.copy(g),t.id===`saturn`&&t.kind===`gas-giant`){let e=xd(f);e.setTheme(S),m.set(t.id,e),h.add(e.mesh)}}}async function k(e,t=!1,n=!1){let r=o.get(e);if(!r)return;let i=n?`close`:`base`,a=await(t?f.retry(r.surface,i):f.get(r.surface,i));if(!a||C||o.get(e)!==r||!n&&r.style.material.map?.userData.sampleClose)return;n&&(a.userData.sampleClose=!0),r.style.material.map=a,r.style.material.color.set(`#ffffff`),r.style.material.needsUpdate=!0;let s=Ju(r.surface,i,d);r.style.setResolution(s.width,s.height)}return O(e),E(S),{scene:n,meshes:i,rings:m,axis:x,sync:O,setTheme:E,prepareTextures:()=>f.prepareResident(),diagnostics:()=>({rotationComputations:T,rotationEntries:w.size,meshes:i.size,...f.diagnostics()}),requestSurface(e,t){let n=o.get(e);t<3||!n||(l.has(e)||(l.add(e),k(e)),d[n.surface].close&&t>=90&&!u.has(e)&&(u.add(e),k(e,!1,!0)),m.get(e)?.request())},retryTextures(){o.forEach((e,t)=>{k(t,!0),u.has(t)&&k(t,!0,!0)}),m.forEach(e=>e.retry())},updateRotation(e,t,n=null,r=!1){x.visible=!1;for(let a of e){let e=i.get(a.id);if(!e)continue;let o=w.get(a.id),s=o?.key;if(!o||o.seconds!==t||!s||s.kind!==a.kind||s.massKg!==a.massKg||s.radiusM!==a.radiusM||s.materialId!==a.materialId||!_(s.displaySpin,a.displaySpin)){let n=yd(a,t);T++,o={seconds:t,key:{kind:a.kind,massKg:a.massKg,radiusM:a.radiusM,materialId:a.materialId,...a.displaySpin?{displaySpin:{...a.displaySpin}}:{}},orientation:n},w.set(a.id,o),n&&e.quaternion.copy(n)}let c=o.orientation;r&&c&&a.id===n&&e.visible&&(x.position.copy(e.position),x.quaternion.copy(e.quaternion),x.scale.setScalar(e.scale.x),x.visible=!0)}},updateBackdrop(e,t=[]){let n=t.filter(e=>e.kind===`star`).sort((e,t)=>t.massKg-e.massKg)[0],r=n?i.get(n.id):void 0;v.visible=S===`cosmos`&&!!r,g.visible=S===`atelier`||!r,r&&v.position.copy(r.position),p.stars.position.copy(e.position)},dispose(){C||(C=!0,r.dispose(),a.forEach(e=>e.dispose()),m.forEach(e=>e.dispose()),f.dispose(),p.dispose(),y.dispose(),b.dispose(),n.clear(),i.clear(),a.clear(),m.clear(),o.clear(),s.clear(),c.clear(),l.clear(),u.clear(),w.clear())}}}function Ad(e,t){return!Number.isFinite(e)||e<=0||!Number.isFinite(t)||t<=0?0:Math.min(1.3,Math.log1p(Math.min(0xe8d4a51000,e/t)*1e6)/Math.log1p(1e6))}function jd(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0?0:Math.max(0,Math.min(1,Math.log2(t/e)/3))}function Md(e,t){return Number.isFinite(t)?e?t>Math.sin(2*Math.PI/180):t>Math.sin(5*Math.PI/180):!1}function Nd(e){return new Ia({transparent:!0,depthTest:!0,depthWrite:!1,side:2,uniforms:{halfSpan:{value:e/2},gridColor:{value:new wr(`#93a8ba`)},opacity:{value:.32},minorDetail:{value:0}},vertexShader:`#include <common>
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
   }`})}var Pd=2,Fd=4800;function Id(e,t,n,r,i,a,o){let s=2*r/48,c=Eu({x:0,y:0,z:0},t).y,l=Math.round(n.x/s)*s,u=Math.round(n.z/s)*s,d=e.filter(e=>Number.isFinite(e.massKg)&&e.massKg>0&&Object.values(e.positionM).every(Number.isFinite)).map(e=>({position:Eu(e.positionM,t),mass:e.massKg,radius:Math.max(0,o.get(e.id)??Eu({x:e.radiusM,y:0,z:0},{x:0,y:0,z:0}).x)})).filter(e=>Math.abs(e.position.x-l)<r*1.3&&Math.abs(e.position.z-u)<r*1.3&&Math.abs(e.position.y-(n.y??0))<r*1.3),f=Math.max(n.y??0,...d.map(e=>e.position.y))+r*.025,p=d.map(e=>({...e,width:Math.max(s*(.65+2*Ad(e.mass,i)),e.radius*1.6,(f-e.position.y+e.radius)*4),floor:e.position.y-e.radius,strength:Ad(e.mass,i)}));return{point:(e,t)=>{let n=l-r+e*s,i=u-r+t*s,o=c;if(a){o=f;let e=0,t=1;for(let a of p){let c=Math.hypot(n-a.position.x,i-a.position.z),l=c/a.width;t=Math.min(t,1-Math.exp(-((c/(a.radius*2+s*.7))**2))),e=Math.max(e,r*.055*a.strength*a.strength*l*l*Math.exp(-l*l*1.5));let u=f-(f-a.floor)*Math.exp(-l*l*1.5),d=r*.001,p=Math.max(d-Math.abs(o-u),0)/d;o=Math.min(o,u)-p*p*d*.25}o+=e*t;for(let e of p){let t=Math.hypot(n-e.position.x,i-e.position.z),a=e.radius+Math.SQRT2*s/2,c=Math.max(0,Math.min(1,(t-a)/Math.max(s,e.radius*.75,(f-e.floor)*4))),l=e.floor+(f-e.floor+r*.1)*c*c*(3-2*c);o=Math.min(o,l)}}return[n,o,i]},shade:(e,t)=>{let n=l-r+e*s,i=u-r+t*s;return Math.min(1,p.reduce((e,t)=>{let r=Math.hypot(n-t.position.x,i-t.position.z)/t.width;return Math.max(e,t.strength*Math.exp(-r*r*1.5))},0))},centerX:l,centerZ:u}}var Ld=new Map;function Rd(){let e=Fd,t=new ci(new Float32Array(e*3),3),n=new bi;n.setAttribute(`position`,t);let r=new ci(new Float32Array(e),1);n.setAttribute(`gridFade`,r);let i=new Qi({color:`#93a8ba`,transparent:!0,opacity:.32,depthWrite:!1});i.onBeforeCompile=e=>{e.vertexShader=`attribute float gridFade;
varying float gridOpacity;
`+e.vertexShader.replace(`void main() {`,`void main() {
 gridOpacity = gridFade;`),e.fragmentShader=`varying float gridOpacity;
`+e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
 diffuseColor.a *= gridOpacity;`)},i.customProgramCacheKey=()=>`faded-potential-grid-v1`;let a=new ua(n,i);a.frustumCulled=!1,a.visible=!1,a.raycast=()=>{};let o=new bi,s=new ci(new Float32Array(28227),3),c=new ci(new Float32Array(9409),1),l=new ci(new Float32Array(18818),2);for(let e=0;e<=96;e++)for(let t=0;t<=96;t++)l.setXY(e*97+t,t*48/96,e*48/96);o.setAttribute(`gridCoordinate`,l);let u=new ci(new Float32Array(9409),1);o.setAttribute(`position`,s),o.setAttribute(`edgeFade`,c),o.setAttribute(`basinShade`,u);let d=[];for(let e=0;e<96;e++)for(let t=0;t<96;t++){let n=e*97+t,r=n+1,i=n+96+1,a=i+1;d.push(n,i,r,r,i,a)}o.setIndex(d);let f=new Ia({transparent:!1,depthTest:!1,depthWrite:!1,side:2,uniforms:{baseColor:{value:new wr(`#E9E3D8`)}},vertexShader:`#include <common>
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
      }`}),p=Nd(48),m=new Wi(o,p);m.visible=!1,m.frustumCulled=!1,m.raycast=()=>{};let h=new Wi(o,f);h.renderOrder=-10,h.visible=!1,h.frustumCulled=!1,h.raycast=()=>{};let g=`off`,_=!0,v=!0,y=!1,b=0,x=-1/0,S=``,C=()=>{a.visible=_&&g===`reference`,m.visible=_&&g===`well`,h.visible=!_&&v};return{mesh:a,well:m,relief:h,updateView(e,t,n=0){let r=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z);y=Md(y,r>0?(e.y-t.y)/r:0),f.depthTest=y,f.depthWrite=y,b=Math.max(0,Math.min(1,Number.isFinite(n)?n:0)),p.uniforms.minorDetail.value=b},setRelief(e){v=e,C(),S=``,x=-1/0},setMode(e){e!==g&&(x=-1/0,S=``),g=e,C()},setTheme(e){_!==e&&(x=-1/0,S=``),_=e,C()},update(e,i,l,d,f,p,v=Ld){if(!a.visible&&!m.visible&&!h.visible||p-x<100||![d,f,l.x,l.z].every(Number.isFinite)||!Number.isFinite(l.y??0)||d<=0||f<=0)return!1;let y=[g,_,i.x,i.y,i.z,l.x,l.y??0,l.z,d,...a.visible?[]:[f,...e.flatMap(e=>[e.id,e.massKg,e.positionM.x,e.positionM.y,e.positionM.z,v.get(e.id)??e.radiusM])]].join(`:`);if(x=p,y===S)return!1;let{point:b,shade:C,centerX:w,centerZ:T}=Id(e,i,l,d,f,!_||g===`well`,v);if(h.visible||m.visible){for(let e=0;e<=96;e++)for(let t=0;t<=96;t++){let n=e*97+t,[r,i,a]=b(t*48/96,e*48/96);s.setXYZ(n,r,i,a),h.visible&&u.setX(n,C(t*48/96,e*48/96));let o=Math.max(Math.abs(r-w),Math.abs(a-T))/d,l=Math.max(0,Math.min(1,(o-.65)/.35));c.setX(n,1-l*l*(3-2*l))}return s.needsUpdate=!0,c.needsUpdate=!0,h.visible&&(u.needsUpdate=!0,o.computeVertexNormals()),S=y,!0}let E=0,D=(e,n,i=1)=>{let[a,o,s]=b(e,n);t.setXYZ(E,a,o,s);let c=Math.max(Math.abs(a-w),Math.abs(s-T))/d,l=Math.max(0,Math.min(1,(c-.6)/.4));r.setX(E++,i*(1-l*l*(3-2*l)))};for(let e=0;e<=48;e+=Pd)for(let t=0;t<48;t++)D(t,e),D(t+1,e),D(e,t),D(e,t+1);return n.setDrawRange(0,E),t.needsUpdate=!0,r.needsUpdate=!0,S=y,!0},dispose(){n.dispose(),i.dispose(),o.dispose(),f.dispose(),p.dispose(),a.removeFromParent(),m.removeFromParent(),h.removeFromParent()}}}function zd(e={}){let t=new Tu({antialias:!0,preserveDrawingBuffer:!0,logarithmicDepthBuffer:!0});t.setSize(320,220),t.setPixelRatio(1);let n=e.profileContext?.(t.getContext());t.debug.checkShaderErrors=!1;let r=new WeakSet,i=new Ku(e=>t.initTexture(e));t.toneMapping=4,t.toneMappingExposure=1.1;let a=new Set,o=kd([],{prepareTexture:e=>i.prepare(e),onSurfaceStatus:(e,t)=>{t===`loading`?a.add(e):a.delete(e)}}),s=Rd();o.scene.add(s.mesh,s.well,s.relief);let c=new Oo(40,320/220,1e-5,5e3),l=new Q,u=Promise.resolve(),d=!1;function f(e){if(d)throw Error(`disposed`);if(performance.now()>=e)throw Error(`Thumbnail preparation timed out`)}async function p(e,n){f(n);let i=e.state.bodies,u={x:0,y:0,z:0};o.sync(i),o.setTheme(e.view.theme),new ku(c,{target:l,minDistance:.001,maxDistance:1500,update:()=>(c.lookAt(l),c.updateMatrixWorld(),!0)}).frame(i);for(let e of i){let t=o.meshes.get(e.id);t.position.copy(Eu(e.positionM,u)),t.scale.setScalar(Td(e.radiusM,c.position.distanceTo(t.position),40,220,e.id===`sun`?7:4)),o.requestSurface(e.id,8)}let p=Math.min(n,performance.now()+1500);for(;a.size&&performance.now()<p&&!d;)await new Promise(e=>setTimeout(e,Math.min(20,Math.max(0,p-performance.now()))));f(n),o.updateRotation(i,e.state.elapsedSeconds),o.updateBackdrop(c,i),s.setTheme(e.view.theme===`cosmos`),s.setMode(e.view.gravity),s.setRelief(e.view.shadows);let m=c.position.distanceTo(l)*Math.tan(Math.PI/9)*2.2;for(s.updateView(c.position,l,jd(m,m)),s.update(i,u,l,m,Math.max(1,...i.map(e=>e.massKg)),performance.now(),new Map([...o.meshes].map(([e,t])=>[e,t.scale.x])));;){f(n);let e=Hu(o.scene);if(await Gu(t,o.scene,c,()=>!d,r,void 0,n),f(n),e===Hu(o.scene))break}t.render(o.scene,c),f(n);let h=t.domElement.toDataURL(`image/jpeg`,.78);return f(n),h}return{capture(e){let t=performance.now()+Wu,n=u.then(()=>p(e,t));return u=n.catch(()=>{}),n},dispose(){d||(d=!0,i.dispose(),s.dispose(),o.dispose(),t.dispose(),t.forceContextLoss(),n?.())}}}function Bd(e,t){let n=null,r=-1/0,i=null;for(let a of t){if(a.id===e.id||((!i||a.massKg>i.massKg)&&(i=a),a.massKg<e.massKg))continue;let t=Math.hypot(a.positionM.x-e.positionM.x,a.positionM.y-e.positionM.y,a.positionM.z-e.positionM.z),o=Math.log(a.massKg)-3*Math.log(t);t>0&&Number.isFinite(o)&&o>r&&(n=a,r=o)}return n??i}function Vd(e,t){if(t?.kind!==`star`)return null;let n=Bd(t,e);return n?.kind===`star`&&Bd(n,e)?.id===t.id?[t,n]:null}var Hd={bodies:64,points:256,computeMs:8,wallMs:2e3,radiusRatio:32,perturbationRatio:.1},Ud={computeMs:32,refreshMs:1e3};function Wd(e,t){let n=new Set,r=t.state.bodies.reduce((e,t)=>!e||t.massKg>e.massKg?t:e,null),i=Vd(t.state.bodies,r),a=i?.map(e=>e.id);return!!e&&e.baseVersion===t.baseVersion&&e.startSeconds===t.state.elapsedSeconds&&e.rootId===(r?.id??null)&&e.requested===Math.max(0,t.state.bodies.length-1)+ +!!i&&[`complete`,`compute-limit`,`wall-limit`,`body-limit`,`invalid`].includes(e.stop)&&[e.computeMs,e.wallMs].every(e=>Number.isFinite(e)&&e>=0)&&Array.isArray(e.results)&&e.results.length<=Math.min(e.requested,Hd.bodies)&&(e.stop!==`complete`||e.results.length===e.requested)&&e.results.every(r=>!r||r.bodyId===e.rootId&&!i||n.has(r.bodyId)||!t.state.bodies.some(e=>e.id===r.bodyId)||!t.state.bodies.some(e=>e.id===r.referenceId)||(a?.includes(r.bodyId)?r.frame!==`barycentric`||r.referenceId!==a.find(e=>e!==r.bodyId):r.frame!==void 0)?!1:(n.add(r.bodyId),Gd(r,{...t,bodyId:r.bodyId,referenceId:r.referenceId})))&&(!i||e.results.filter(e=>e.frame===`barycentric`).length%2==0)}function Gd(e,t){return!!e&&e.bodyId===t.bodyId&&e.referenceId===t.referenceId&&e.baseVersion===t.baseVersion&&e.startSeconds===t.state.elapsedSeconds&&[`complete`,`contact`,`extent-limit`,`compute-limit`,`wall-limit`,`body-limit`,`perturbed`,`invalid`].includes(e.stop)&&[null,`ellipse`,`open`,`radial`].includes(e.kind)&&(e.periodSeconds===null||Number.isFinite(e.periodSeconds)&&e.periodSeconds>0)&&(e.perturbationRatio===null||Number.isFinite(e.perturbationRatio)&&e.perturbationRatio>=0)&&Number.isFinite(e.computeMs)&&e.computeMs>=0&&Number.isFinite(e.wallMs)&&e.wallMs>=0&&Array.isArray(e.points)&&e.points.length<=Hd.points&&e.points.every((t,n)=>t&&Number.isFinite(t.progress)&&t.progress>=0&&t.progress<=1&&(n===0||t.progress>e.points[n-1].progress)&&[t.positionM,t.referenceM].every(e=>e&&[e.x,e.y,e.z].every(Number.isFinite)))&&(![`invalid`,`perturbed`,`body-limit`,`compute-limit`,`wall-limit`].includes(e.stop)||e.points.length===0)}var Kd=class{done;failed;create;type;valid;worker=null;serial=0;active=null;constructor(e,t,n,r,i){this.done=e,this.failed=t,this.create=n,this.type=r,this.valid=i}request(e){this.cancel();try{let t=this.worker??this.create();this.worker=t,t.onmessage=e=>{this.worker===t&&this.active&&(!e.data||!Number.isSafeInteger(e.data.id)?this.fault(t):e.data.id===this.active.id&&(this.valid(e.data.result,this.active.input)?(this.active=null,this.done(e.data.result)):this.fault(t)))},t.onerror=()=>this.fault(t);let n={id:++this.serial,input:{...e,state:k(e.state)}};this.active=n,t.postMessage({type:this.type,...n})}catch{this.fault(this.worker)}}fault(e){this.worker===e&&(this.worker?.terminate(),this.worker=null,this.active=null,this.failed())}cancel(){this.active=null,this.worker?.postMessage({type:`cancel`})}dispose(){this.active=null;let e=this.worker;this.worker=null,e?.terminate()}},qd=()=>new Worker(new URL(`/planet-simulator/assets/prediction.worker-CZ67X8vI.js`,``+import.meta.url),{type:`module`}),Jd=class extends Kd{constructor(e,t,n=qd){super(e,t,n,`predict`,Gd)}},Yd=class extends Kd{constructor(e,t,n=qd){super(e,t,n,`predictScene`,Wd)}},Xd=class{changed;now;view={enabled:!1,phase:`off`,result:null};client;editor=null;context=``;version=-1;requestedVersion=-1;pending=!1;disposed=!1;lastRequest=-1/0;timer=null;constructor(e,t,n=()=>performance.now()){this.changed=e,this.now=n,this.client=new Yd(e=>{this.pending=!1,this.view.result=e,this.view.phase=`ready`,this.changed(this.view),this.schedule()},()=>{this.pending=!1,this.view.result=null,this.view.phase=`failed`,this.changed(this.view)},t)}setEnabled(e){this.view.enabled=e,this.clear(e?`waiting`:`off`),this.editor&&this.update(this.editor)}update(e){if(this.editor=e,this.disposed||!this.view.enabled)return;let t=e.state;if(!t||e.busy||e.hasGesture||e.error||e.blocked||t.jump||t.localStep||t.physicsIssue){this.clear(`waiting`);return}let n=[e.generation,t.history?.revision,t.collisionContext?.revision,t.recoveryResult?.requestId,t.state.bodies.map(e=>e.id).join(`,`)].join(`|`);n!==this.context&&(this.clear(`waiting`),this.context=n),this.version=t.version,this.schedule()}schedule(){if(this.disposed||!this.view.enabled||this.pending||this.version===this.requestedVersion||!this.editor||this.view.phase===`waiting`&&!this.context||this.timer!==null)return;let e=Math.max(0,Ud.refreshMs-(this.now()-this.lastRequest));if(e>0){this.timer=setTimeout(()=>{this.timer=null,this.schedule()},e);return}let t=this.editor.state;t&&(this.pending=!0,this.lastRequest=this.now(),this.requestedVersion=t.version,this.view.phase=`computing`,this.changed(this.view),this.client.request({state:t.state,baseVersion:t.version}))}clear(e){this.timer!==null&&clearTimeout(this.timer),this.timer=null,this.pending&&this.client.cancel(),this.pending=!1,this.version=this.requestedVersion=-1,this.context=``,this.view.result=null,this.view.phase=e,this.changed(this.view)}dispose(){this.disposed=!0,this.clear(`off`),this.client.dispose()}},Zd=class{changed;client;signature=``;lastSnapshot=null;context=``;editor=null;view={visible:!1,phase:`idle`,result:null,referenceName:``,enabled:!0,startSeconds:0};constructor(e,t){this.changed=e,this.client=new Jd(e=>{this.view.enabled&&this.view.visible&&this.view.phase===`computing`&&(this.view.result=e,this.view.phase=`ready`,this.changed(this.view))},()=>{this.view.enabled&&this.view.phase===`computing`&&(this.view.result=null,this.view.phase=`failed`,this.changed(this.view))},t)}update(e){this.editor=e;let t=e.state,r=t!==this.lastSnapshot;this.lastSnapshot=t;let i=e.body,a=e.phase===`editing-new`,o=!!t&&!!i&&(a||[`viewing`,`editing-existing`].includes(e.phase)&&[`position`,`velocity`].includes(e.tool));this.view.visible=o;let s=[e.generation,e.phase,i?.id,e.tool,t?.collisionContext?.revision,t?.state.bodies.map(e=>e.id).join(`,`)].join(`|`);if(!o||!this.view.enabled){this.clear(`idle`),this.context=s;return}if(e.hasGesture){this.clear(`waiting`),this.context=s;return}if(e.error||t.jump||t.localStep||t.physicsIssue||e.blocked&&e.phase===`viewing`){this.clear(`invalid`),this.context=s;return}if(e.phase===`viewing`&&t.playing){this.clear(`pause`),this.context=s;return}if(a&&r&&s===this.context&&this.signature)return;this.context=s;let c=t.state.bodies,l=a?c.find(t=>t.id===e.creationReferenceId):Bd(i,c);if(!l){this.clear(`invalid`);return}let u=k(t.state),d={state:{...u,bodies:a?[...u.bodies,i]:u.bodies.map(e=>e.id===i.id?i:e)},bodyId:i.id,referenceId:l.id,baseVersion:t.version},f=JSON.stringify([s,t.version,l.id,i.massKg,i.radiusM,i.collision,i.positionM,i.velocityMS]);f!==this.signature&&(this.signature=f,this.view.phase=`computing`,this.view.result=null,this.view.referenceName=l.materialId===`procedural`?l.name:n(l.id),this.view.startSeconds=u.elapsedSeconds,this.changed(this.view),this.client.request(d))}clear(e){(this.view.phase===`computing`||this.signature||this.view.result)&&this.client.cancel(),this.signature=``,this.view.result=null,this.view.phase=e,this.changed(this.view)}setEnabled(e){this.view.enabled=e,this.refresh()}cancel(){this.client.cancel(),this.view.phase=`cancelled`,this.view.result=null,this.changed(this.view)}refresh(){this.clear(`idle`),this.context=``,this.editor&&this.update(this.editor)}dispose(){this.client.dispose()}};function Qd(e,n){let r=document.createElement(`section`);r.className=`prediction-controls`,r.hidden=!0,r.setAttribute(`aria-label`,t(`prediction.title`));let i=document.createElement(`details`),a=document.createElement(`summary`),o=document.createElement(`div`);o.className=`prediction-options`;let s=document.createElement(`label`),c=document.createElement(`input`);c.type=`checkbox`,c.checked=!0,c.setAttribute(`aria-label`,t(`prediction.show`)),s.append(c,document.createTextNode(t(`prediction.show`)));let u=document.createElement(`button`);u.type=`button`,u.textContent=t(`prediction.cancel`);let d=document.createElement(`button`);d.type=`button`,d.textContent=t(`prediction.refresh`);let f=document.createElement(`p`),p=document.createElement(`p`);p.textContent=t(`prediction.hint`);let m=document.createElement(`p`);m.className=`prediction-legend`,m.textContent=t(`prediction.legend`);let h=document.createElement(`p`);return h.className=`prediction-status`,h.setAttribute(`role`,`status`),o.append(s,u,d),i.append(a,o,f,p,m),r.append(i,h),e.append(r),c.onchange=()=>n.setEnabled(c.checked),u.onclick=()=>n.cancel(),d.onclick=()=>n.refresh(),{update(e){r.hidden=!e.visible,r.dataset.phase=e.phase,r.dataset.stop=e.result?.stop??``,r.dataset.points=String(e.result?.points.length??0),r.dataset.computeMs=String(e.result?.computeMs??``),r.dataset.baseVersion=String(e.result?.baseVersion??``),a.textContent=t(`prediction.summary`),c.checked=e.enabled,u.disabled=e.phase!==`computing`,d.disabled=!e.enabled||[`waiting`,`invalid`,`pause`].includes(e.phase),f.textContent=t(`prediction.baseline`,{date:l(e.startSeconds),name:e.referenceName});let n=e.result,i=n?t(n.stop===`complete`?`prediction.complete`:n.stop===`contact`?`prediction.contact`:n.stop===`perturbed`?`prediction.perturbed`:n.stop===`body-limit`?`prediction.bodyLimit`:n.stop===`invalid`?`prediction.invalid`:n.stop===`extent-limit`?`prediction.extent`:`prediction.limited`,{name:e.referenceName}):``;h.textContent=e.enabled?i||t(`prediction.${e.phase}`):t(`prediction.off`),h.dataset.incomplete=String(!!n&&n.stop!==`complete`)},dispose(){r.remove()}}}function $d(e,n,r,i){let a=document.createElement(`button`);a.type=`button`,a.className=`interface-hide`,a.textContent=t(`interface.hide`);let o=document.createElement(`button`);o.type=`button`,o.className=`interface-restore`,o.textContent=t(`interface.restore`),o.hidden=!0,o.title=t(`interface.restoreHint`),n.append(a),e.append(o);let s=!1,c=new Map;function l(t){if(!(t===s||t&&!r())){if(s=t,e.dataset.uiHidden=String(s),o.hidden=!s,s){for(let t of Array.from(e.children))t.classList.contains(`scene-host`)||t===o||t.classList.contains(`scene-status`)||(c.set(t,t.inert),t.inert=!0);i(!1),o.focus()}else{for(let[e,t]of c)e.inert=t;c.clear(),i(!0),a.focus()}}}return a.onclick=()=>l(!0),o.onclick=()=>l(!1),{get hidden(){return s},restore(){l(!1)},update(){a.disabled=!r(),a.title=t(a.disabled?`interface.busy`:`interface.hideHint`)},dispose(){s&&l(!1),a.remove(),o.remove(),delete e.dataset.uiHidden}}}var ef=`planet-simulator-audio-v1`,tf={enabled:!1,volume:.35},nf={tap:{frequencies:[660,990],seconds:.12},confirm:{frequencies:[523.25,783.99],seconds:.22}};function rf(){try{return localStorage}catch{return null}}var af=class{options;preferences={...tf};context=null;master=null;voices=new Set;lastTone=-1/0;generation=0;disposed=!1;failed=!1;pending=!1;storage;createContext;now;constructor(e={}){this.options=e,this.storage=e.storage===void 0?rf():e.storage,this.createContext=e.createContext??(()=>new AudioContext),this.now=e.now??(()=>performance.now());try{let e=this.storage?.getItem(ef);if(e&&e.length<512){let t=JSON.parse(e);typeof t.enabled==`boolean`&&Number.isFinite(t.volume)&&t.volume>=0&&t.volume<=1&&(this.preferences={enabled:t.enabled,volume:t.volume})}}catch{}}get state(){return{...this.preferences,failed:this.failed,pending:this.pending}}changed(){this.options.change?.()}persist(){try{this.storage?.setItem(ef,JSON.stringify(this.preferences))}catch{}}async ready(){if(this.disposed)return!1;try{if(this.context||(this.context=this.createContext(),this.master=this.context.createGain(),this.master.gain.value=this.preferences.volume,this.master.connect(this.context.destination)),this.context.state!==`running`&&await this.context.resume(),this.disposed)return!1;if(this.context.state!==`running`)throw Error(`audio blocked`);return this.failed=!1,!0}catch{return this.disposed||(this.failed=!0,this.changed()),!1}}async setEnabled(e){if(this.disposed)return;let t=++this.generation;if(this.preferences.enabled=e,this.failed=!1,this.persist(),!e){this.pending=!1,this.silence(),this.changed();return}this.pending=!0,this.changed();let n=await this.ready();t!==this.generation||this.disposed?this.preferences.enabled||this.silence():(this.pending=!1,n||(this.preferences.enabled=!1,this.persist()),this.changed())}setVolume(e){return this.disposed||!Number.isFinite(e)||e<0||e>1?!1:(this.preferences.volume=e,this.master&&(this.master.gain.value=e),e===0&&this.stopVoices(),this.persist(),this.changed(),!0)}async interact(e=`tap`){if(!this.preferences.enabled||this.disposed)return;let t=this.generation;await this.ready()&&t===this.generation&&this.preferences.enabled&&this.play(e)}async preview(e){if(this.disposed||this.preferences.volume===0)return;let t=this.generation;await this.ready()&&t===this.generation&&(this.emit(e),this.changed())}play(e){this.preferences.enabled&&this.emit(e)}emit(e){let t=this.context,n=this.master,r=this.now();if(this.disposed||!t||!n||t.state!==`running`||this.preferences.volume===0||this.voices.size>=3||r-this.lastTone<90)return;this.lastTone=r;let i=nf[e],a=[t.createGain(),t.createGain()],o=[t.createOscillator(),t.createOscillator()],s=t.currentTime,c=s+i.seconds,l=!1,u=()=>{if(!l){l=!0;for(let e of o){e.onended=null;try{e.stop()}catch{}e.disconnect()}for(let e of a)e.disconnect();this.voices.delete(u),!this.preferences.enabled&&this.voices.size===0&&this.suspendContext()}};this.voices.add(u);try{o.forEach((e,t)=>{let r=s,o=i.frequencies[t],l=a[t];l.gain.setValueAtTime(1e-4,s),l.gain.setValueAtTime(1e-4,r),l.gain.exponentialRampToValueAtTime(.025,r+.012),l.gain.exponentialRampToValueAtTime(1e-4,c),l.connect(n),e.type=`sine`,e.frequency.setValueAtTime(o,r),e.connect(l),e.onended=u,e.start(r),e.stop(c)})}catch{u(),this.failed=!0,this.changed()}}stopVoices(){for(let e of[...this.voices])e()}suspendContext(){this.context&&this.context.state!==`closed`&&this.context.suspend().catch(()=>{})}silence(){this.stopVoices(),this.suspendContext()}suspend(){this.generation++,this.pending=!1,this.silence(),this.changed()}dispose(){this.disposed||(this.disposed=!0,this.generation++,this.stopVoices(),this.master?.disconnect(),this.context&&this.context.close().catch(()=>{}),this.context=null,this.master=null)}},of=`planet-simulator-music-v1`,sf=`planet-simulator-music-v2`,cf={default:.12,max:.24,step:.001},lf=`/planet-simulator/assets/audio/aurora-intro.m4a`;function uf(){try{return localStorage}catch{return null}}var df=class{options;preferences={enabled:!1,volume:cf.default};phase=`off`;media=null;storage;generation=0;disposed=!1;hidden=!1;fade=null;fadingOut=!1;pending=!1;constructor(e={}){this.options=e,this.storage=e.storage===void 0?uf():e.storage;try{let e=this.storage?.getItem(sf),t=e??this.storage?.getItem(of);if(t&&t.length<256){let n=JSON.parse(t);typeof n.enabled==`boolean`&&Number.isFinite(n.volume)&&n.volume>=0&&n.volume<=(e?cf.max:1)&&(this.preferences={enabled:n.enabled,volume:n.volume<=cf.max?n.volume:cf.default})}}catch{}this.preferences.enabled&&(this.phase=`ready`)}get state(){return{...this.preferences,phase:this.phase}}notify(){this.options.change?.()}persist(){try{this.storage?.setItem(sf,JSON.stringify(this.preferences))}catch{}}clearFade(){this.fade!==null&&clearInterval(this.fade),this.fade=null,this.fadingOut=!1}ramp(e,t,n){this.clearFade();let r=this.media;if(!r){n?.();return}let i=this.options.now??(()=>performance.now()),a=i(),o=r.volume;this.fade=setInterval(()=>{let s=Math.min(1,Math.max(0,(i()-a)/(t*1e3)));r.volume=o+(e-o)*s,s>=1&&(this.clearFade(),n?.())},40)}fail=()=>{!this.disposed&&this.preferences.enabled&&(this.generation++,this.pending=!1,this.clearFade(),this.media&&(this.media.pause(),this.media.volume=0),this.phase=`failed`,this.notify())};async setEnabled(e){this.disposed||e&&this.preferences.enabled&&(this.phase===`playing`||this.pending)||(this.preferences.enabled=e,this.persist(),e?(this.phase=this.preferences.volume===0?`paused`:`ready`,await this.interact(),this.notify()):(this.generation++,this.pending=!1,this.phase=`off`,this.media&&!this.media.paused&&this.media.volume>0?(this.ramp(0,.25,()=>this.media?.pause()),this.fadingOut=!0):(this.clearFade(),this.media?.pause()),this.notify()))}shouldStop(){return this.disposed||this.hidden||!this.preferences.enabled||this.preferences.volume===0||this.phase===`failed`}setVolume(e){return this.disposed||!Number.isFinite(e)||e<0||e>cf.max?!1:(this.preferences.volume=e,this.persist(),this.preferences.enabled&&(e===0?(this.generation++,this.pending=!1,this.clearFade(),this.media&&(this.media.volume=0,this.media.pause()),this.phase!==`failed`&&(this.phase=`paused`)):this.phase===`playing`&&this.ramp(e,.15)),this.notify(),!0)}async interact(){if(this.disposed||this.hidden||!this.preferences.enabled||this.preferences.volume===0||this.pending||this.phase===`failed`||this.phase===`playing`&&!this.fadingOut)return;this.clearFade();let e=++this.generation;this.pending=!0,this.phase=`loading`,this.notify();try{this.media||(this.media=(this.options.createAudio??(()=>new Audio))(),this.media.preload=`none`,this.media.loop=!0,this.media.playbackRate=1,this.media.volume=0,this.media.src=lf,this.media.addEventListener(`error`,this.fail));let t=this.media;if(t.error&&t.load(),t.volume=0,await t.play(),e!==this.generation||this.disposed||this.hidden||!this.preferences.enabled){this.shouldStop()&&(t.volume=0,t.pause());return}this.pending=!1,this.phase=`playing`,this.ramp(this.preferences.volume,1.2),this.notify()}catch{e===this.generation&&!this.disposed&&this.fail()}}setHidden(e){this.hidden=e,e&&(this.generation++,this.pending=!1,this.clearFade(),this.media&&(this.media.volume=0,this.media.pause()),this.preferences.enabled?this.phase!==`failed`&&(this.phase=`paused`):this.phase=`off`,this.notify())}dispose(){this.disposed||(this.disposed=!0,this.generation++,this.pending=!1,this.clearFade(),this.media&&=(this.media.removeEventListener(`error`,this.fail),this.media.pause(),this.media.removeAttribute(`src`),this.media.load(),null))}};function ff(e){let n=document.createElement(`details`);n.className=`audio-controls`;let r=document.createElement(`summary`);r.textContent=t(`audio.title`);let i=document.createElement(`label`),a=document.createElement(`input`);a.type=`checkbox`,a.setAttribute(`aria-label`,t(`audio.enabled`)),i.append(a,document.createTextNode(t(`audio.enabled`)));let o=document.createElement(`label`);o.className=`audio-volume`,o.textContent=t(`audio.volume`);let s=document.createElement(`input`);s.type=`range`,s.min=`0`,s.max=`100`,s.step=`1`,s.setAttribute(`aria-label`,t(`audio.volume`));let c=document.createElement(`output`);o.append(s,c);let l=document.createElement(`div`);l.className=`audio-auditions`;let u=document.createElement(`button`),d=document.createElement(`button`);u.type=d.type=`button`,u.textContent=t(`audio.tap`),d.textContent=t(`audio.confirm`),l.append(u,d);let f=document.createElement(`p`);f.setAttribute(`role`,`status`),f.className=`audio-status`;let p=new af({change:m});function m(){let e=p.state;a.checked=e.enabled,s.value=String(Math.round(e.volume*100)),c.value=`${Math.round(e.volume*100)}%`,f.hidden=!e.failed&&!e.pending,f.textContent=t(e.failed?`audio.failed`:e.pending?`audio.loading`:e.enabled?`audio.on`:`audio.off`)}a.onchange=()=>void p.setEnabled(a.checked),s.oninput=()=>p.setVolume(Number(s.value)/100),u.onclick=()=>void p.preview(`tap`),d.onclick=()=>void p.preview(`confirm`);let h=document.createElement(`label`),g=document.createElement(`input`);g.type=`checkbox`,g.setAttribute(`aria-label`,t(`music.enabled`)),h.append(g,document.createTextNode(t(`music.enabled`)));let _=document.createElement(`label`);_.className=`audio-volume`,_.textContent=t(`music.volume`);let v=document.createElement(`span`);v.className=`audio-range-hint`,v.textContent=t(`music.range`,{max:100}),_.append(v);let y=document.createElement(`input`);y.type=`range`,y.min=`0`,y.max=`100`,y.step=`0.1`,y.setAttribute(`aria-label`,t(`music.volume`));let b=document.createElement(`output`);_.append(y,b);let x=document.createElement(`p`);x.className=`audio-status`,x.setAttribute(`role`,`status`);let S=document.createElement(`a`);S.textContent=t(`music.credit`),S.href=`https://www.scottbuckley.com.au/library/aurora/`,S.target=`_blank`,S.rel=`noreferrer`;let C=document.createElement(`a`);C.textContent=t(`music.license`),C.href=`https://creativecommons.org/licenses/by/4.0/`,C.target=`_blank`,C.rel=`noreferrer`;let w=document.createElement(`p`);w.className=`music-credit`,w.append(S,document.createTextNode(` · `),C);let T=new df({change:E});function E(){let e=T.state;g.checked=e.enabled;let n=Number((e.volume/cf.max*100).toFixed(1));y.value=String(n),b.value=`${n}%`,y.setAttribute(`aria-valuetext`,`${n}%`),x.hidden=e.phase===`off`||e.phase===`playing`,x.textContent=t(e.phase===`failed`?`music.failed`:e.volume===0?`music.muted`:e.phase===`loading`?`music.loading`:`music.resume`)}return g.onchange=()=>void T.setEnabled(g.checked),y.oninput=()=>{T.setVolume(Number(y.value)/100*cf.max),T.interact()},n.append(r,h,_,x,w,i,o,l,f),e.insertBefore(n,e.querySelector(`.display-actions`)),m(),E(),{audio:p,music:T,dispose(){T.dispose(),p.dispose(),n.remove()}}}var pf=`planet-simulator-hints-v1`;function mf(){try{return localStorage}catch{return null}}function hf(e,n,r){let i=r.storage===void 0?mf():r.storage,a=document.createElement(`section`);a.className=`opening-hint`,a.hidden=!0,a.setAttribute(`aria-label`,t(`hints.title`));let o=document.createElement(`p`);o.textContent=t(`hints.explore`);let s=document.createElement(`button`);s.type=`button`,s.textContent=t(`hints.dismiss`);let c=document.createElement(`button`);c.type=`button`,c.className=`hints-replay`,c.textContent=t(`hints.show`),a.append(o,s),e.append(a),n.append(c);let l=e.querySelector(`.creation-toggle`),u=n.closest(`.display-settings`),d=!1,f=!1,p=!1,m;try{d=i?.getItem(pf)===`dismissed`}catch{}let h=()=>l?.classList.remove(`opening-highlight`),g=()=>{p=!1,a.hidden=!0,h(),m&&clearTimeout(m)};function _(){f||(p=!0,a.hidden=!1,h(),l?.classList.add(`opening-highlight`),m&&clearTimeout(m),m=setTimeout(g,12e3))}s.onclick=()=>{d=!0;try{i?.setItem(pf,`dismissed`)}catch{}g()};let v=()=>{u?.open&&g()};return c.onclick=()=>{u&&(u.open=!1),_()},l?.addEventListener(`click`,g),u?.addEventListener(`toggle`,v),r.fresh&&!d&&_(),{setBusy(e){f=e,f&&p&&g()},dispose(){g(),l?.removeEventListener(`click`,g),u?.removeEventListener(`toggle`,v),a.remove(),c.remove()}}}function gf(e,t){if(e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;let n=e.target;e.key===`Escape`?(t.hidden()?t.restore():t.cancel(),e.preventDefault()):n?.closest(`button,select,textarea,summary,a,[contenteditable="true"]`)||n?.closest(`.time-controls`)||(e.key===`Enter`&&t.editing()&&n?.closest(`.body-editor input,.scene-canvas`)?(e.preventDefault(),t.confirm()):e.code===`Space`&&!e.repeat&&!n?.closest(`input`)&&(e.preventDefault(),t.togglePlay()))}function _f(e,t,n){return{position:{...e.position},target:{...t.target},followId:n.followId,overview:n.overview,minDistance:t.minDistance,maxDistance:t.maxDistance,near:e.near,far:e.far}}function vf(e,t,n,r){let i=t.enableDamping;t.enableDamping=!1,t.update(),n.setView(r.followId,r.overview),e.position.copy(r.position),t.target.copy(r.target),t.minDistance=r.minDistance,t.maxDistance=r.maxDistance,e.near=r.near??Math.min(1e-5,r.minDistance/150),e.far=r.far??Math.max(5e3,e.position.distanceTo(t.target)*4),e.updateProjectionMatrix(),t.update(),t.enableDamping=i,e.updateMatrixWorld()}var yf=class{previous=null;remember(e,t){(t.overview||t.followId!==e)&&(this.previous=structuredClone(t))}take(e){let t=this.previous;return this.previous=null,t&&(t.overview||e.some(e=>e.id===t.followId))?t:null}clear(){this.previous=null}};function bf(e){let t=new Map;return{publish(n){let r=new Set(n.map(e=>e.id));for(let[e,n]of t)r.has(e)||(n.remove(),t.delete(e));for(let r of n){let n=t.get(r.id);n||(n=document.createElement(`span`),n.className=`body-label`,n.dataset.bodyId=r.id,t.set(r.id,n),e.append(n)),n.textContent=r.text,n.hidden=r.hidden,n.style.left=`${r.x}px`,n.style.top=`${r.y}px`,n.dataset.selected=String(r.selected)}},hide(){for(let e of t.values())e.hidden=!0},dispose(){for(let e of t.values())e.remove();t.clear()}}}function xf(e){let n=document.createElement(`span`),r=document.createElement(`span`);n.className=`candidate-placement-marker`,n.hidden=!0,n.setAttribute(`aria-hidden`,`true`),r.className=`candidate-placement-label`,n.append(r),e.append(n);let i=null;return{get id(){return i},update(e){n.hidden=!e,e?(i=e.id,n.dataset.bodyId=i,n.style.left=`${e.x}px`,n.style.top=`${e.y}px`,n.style.width=n.style.height=`${Math.max(2,e.radius*2)}px`,r.textContent=t(`creation.materialPreparing`,{name:e.name})):i=null},dispose(){i=null,n.remove()}}}function Sf(e,t,n,r){let i=Number.isFinite(e)?Math.max(1,e):1,a=Number.isFinite(t)?Math.max(1,t):1;return Math.max(.5,Math.min(Number.isFinite(n)?Math.max(1,n):1,r?1.5:2,Math.sqrt((r?12e5:3e6)/(i*a))))}function Cf(e,t=4){e.traverse(e=>{e.renderOrder=t;let n=e.material;for(let e of n?Array.isArray(n)?n:[n]:[])e.depthTest=!1,e.depthWrite=!1,e.transparent=!0})}function wf(e,t,n,r){let i=2*t*Math.tan(n*Math.PI/360)/Math.max(1,r),a=Math.min(e*.15,12*i);return{length:a,width:a*.4}}function Tf(e,t){let n=Math.max(e.massKg,t.massKg),r=e.massKg/n,i=t.massKg/n;return[r/(r+i),i/(r+i)]}function Ef(e,t){let[n,r]=Tf(e,t);return{x:n*e.positionM.x+r*t.positionM.x,y:n*e.positionM.y+r*t.positionM.y,z:n*e.positionM.z+r*t.positionM.z}}function Df(e,t,n){return e.points.flatMap(e=>{let r=Eu({x:e.positionM.x-e.referenceM.x+(t.x-n.x),y:e.positionM.y-e.referenceM.y+(t.y-n.y),z:e.positionM.z-e.referenceM.z+(t.z-n.z)},{x:0,y:0,z:0});return[r.x,r.y,r.z]})}function Of(e=!1){let t=e?new Qi({color:`#9ca9b7`,transparent:!0,opacity:.3,depthWrite:!1}):new Va({color:`#7bacb6`,transparent:!0,opacity:.8,dashSize:1,gapSize:.65,depthWrite:!1}),n=new oa(new bi,t);Cf(n,e?3:4),n.visible=!1,n.raycast=()=>{},n.frustumCulled=!1;let r=null;return{line:n,setResult(e){if(r=e,n.visible=!1,n.geometry.dispose(),n.geometry=new bi,!e||e.points.length<2)return;let t=Df(e,{x:0,y:0,z:0},{x:0,y:0,z:0});t.some(e=>!Number.isFinite(Math.fround(e)))?r=null:(n.geometry.setAttribute(`position`,new ci(t,3)),n.computeLineDistances())},setTheme(n){t.color.set(e?n?`#9ca9b7`:`#706f6a`:n?`#7bacb6`:`#4f8088`)},update(i,a,o,s=!0){let c=r?.referenceId,l=c?i.find(e=>e.id===c):null,u=r?.frame===`barycentric`?i.find(e=>e.id===r.bodyId):null;if(n.visible=s&&!!l&&!!r&&r.points.length>1,r?.frame===`barycentric`&&(!e||!u||u.kind!==`star`||l?.kind!==`star`)&&(n.visible=!1),!n.visible||!r||!l)return;let d=Eu(r.frame===`barycentric`?Ef(u,l):l.positionM,a);if(![d.x,d.y,d.z].every(e=>Number.isFinite(Math.fround(e))))n.visible=!1;else{if(n.position.set(d.x,d.y,d.z),t instanceof Va){let e=Math.max(1e-12,o*.006);t.dashSize=e,t.gapSize=e*.65}n.userData.pointCount=r.points.length}},dispose(){n.geometry.dispose(),t.dispose(),n.removeFromParent()}}}function kf(){let e=new _r,t=new Map,n=!0;return{group:e,setResult(r){let i=r?.results.filter(e=>e.points.length>1)??[],a=new Set(i.map(e=>e.bodyId));for(let[e,n]of t)a.has(e)||(n.dispose(),t.delete(e));for(let r of i){let i=t.get(r.bodyId);i||(i=Of(!0),i.setTheme(n),t.set(r.bodyId,i),e.add(i.line)),i.setResult(r),i.line.userData.bodyId=r.bodyId}},setTheme(e){n=e,t.forEach(t=>t.setTheme(e))},update(e,n,r,i,a){for(let[o,s]of t)s.update(e,n,r,i&&e.some(e=>e.id===o)&&!(a?.bodyId===o&&a.points.length>1))},dispose(){t.forEach(e=>e.dispose()),t.clear(),e.removeFromParent()}}}var Af={type:`change`},jf={type:`start`},Mf={type:`end`},Nf=new ji,Pf=new wi,Ff=Math.cos(70*vn.DEG2RAD),If=new Q,Lf=2*Math.PI,Rf={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zf=1e-6,Bf=class extends as{constructor(e,t=null){super(e,t),this.state=Rf.NONE,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:se.ROTATE,MIDDLE:se.DOLLY,RIGHT:se.PAN},this.touches={ONE:ce.ROTATE,TWO:ce.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new yn,this._lastTargetPosition=new Q,this._quat=new yn().setFromUnitVectors(e.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new es,this._sphericalDelta=new es,this._scale=1,this._panOffset=new Q,this._rotateStart=new Z,this._rotateEnd=new Z,this._rotateDelta=new Z,this._panStart=new Z,this._panEnd=new Z,this._panDelta=new Z,this._dollyStart=new Z,this._dollyEnd=new Z,this._dollyDelta=new Z,this._dollyDirection=new Q,this._mouse=new Z,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Hf.bind(this),this._onPointerDown=Vf.bind(this),this._onPointerUp=Uf.bind(this),this._onContextMenu=Xf.bind(this),this._onMouseWheel=Kf.bind(this),this._onKeyDown=qf.bind(this),this._onTouchStart=Jf.bind(this),this._onTouchMove=Yf.bind(this),this._onMouseDown=Wf.bind(this),this._onMouseMove=Gf.bind(this),this._interceptControlDown=Zf.bind(this),this._interceptControlUp=Qf.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=Rf.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Af),this.update(),this.state=Rf.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;If.copy(t).sub(this.target),If.applyQuaternion(this._quat),this._spherical.setFromVector3(If),this.autoRotate&&this.state===Rf.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Lf:n>Math.PI&&(n-=Lf),r<-Math.PI?r+=Lf:r>Math.PI&&(r-=Lf),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(If.setFromSpherical(this._spherical),If.applyQuaternion(this._quatInverse),t.copy(this.target).add(If),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=If.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new Q(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new Q(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=If.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Nf.origin.copy(this.object.position),Nf.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Nf.direction))<Ff?this.object.lookAt(this.target):(Pf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Nf.intersectPlane(Pf,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>zf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zf||this._lastTargetPosition.distanceToSquared(this.target)>zf?(this.dispatchEvent(Af),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Lf/60/60*this.autoRotateSpeed:Lf/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){If.setFromMatrixColumn(t,0),If.multiplyScalar(-e),this._panOffset.add(If)}_panUp(e,t){this.screenSpacePanning===!0?If.setFromMatrixColumn(t,1):(If.setFromMatrixColumn(t,0),If.crossVectors(this.object.up,If)),If.multiplyScalar(e),this._panOffset.add(If)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;If.copy(r).sub(this.target);let i=If.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Lf*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lf*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Lf*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Lf*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Lf*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Lf*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Lf*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lf*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Z,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Vf(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Hf(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Uf(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Mf),this.state=Rf.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function Wf(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Rf.DOLLY;break;case se.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Rf.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Rf.ROTATE}break;case se.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Rf.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Rf.PAN}break;default:this.state=Rf.NONE}this.state!==Rf.NONE&&this.dispatchEvent(jf)}function Gf(e){switch(this.state){case Rf.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Rf.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Rf.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function Kf(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Rf.NONE&&(e.preventDefault(),this.dispatchEvent(jf),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Mf))}function qf(e){this.enabled!==!1&&this._handleKeyDown(e)}function Jf(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Rf.TOUCH_ROTATE;break;case ce.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Rf.TOUCH_PAN;break;default:this.state=Rf.NONE}break;case 2:switch(this.touches.TWO){case ce.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Rf.TOUCH_DOLLY_PAN;break;case ce.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Rf.TOUCH_DOLLY_ROTATE;break;default:this.state=Rf.NONE}break;default:this.state=Rf.NONE}this.state!==Rf.NONE&&this.dispatchEvent(jf)}function Yf(e){switch(this._trackPointer(e),this.state){case Rf.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Rf.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Rf.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Rf.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Rf.NONE}}function Xf(e){this.enabled!==!1&&e.preventDefault()}function Zf(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Qf(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function $f(e,t,n){let r=Number.isFinite(e)?Math.max(1,Math.floor(e)):1,i=Number.isFinite(t)?Math.max(1,Math.floor(t)):1;return{width:r,height:i,pixelRatio:Number.isFinite(n)?Math.min(2,Math.max(1,n)):1,aspect:r/i}}function ep(e){return 2*Math.atan(Math.tan(20*Math.PI/180)/(Number.isFinite(e)&&e>0?Math.max(.25,Math.min(1,e)):1))*180/Math.PI}function tp(e,t,n,r){let i=e===`sun`?9:e===`moon`?4:5,a=$f(t,n,1);return i*(r?Math.max(1,Math.min(3,Math.min(a.width,a.height)/480)):1)}var np=e=>e===`touch`?12:e===`pen`?8:5,rp=e=>{let t=re.bodies.find(t=>t.id===e);return Object.freeze({example:e,massKg:t.massKg,radiusM:t.radiusM,source:`data/horizons/${e}.json`,definition:`archived GM / G, mean radius`})},ip=Object.freeze({star:rp(`sun`),"terrestrial-planet":rp(`earth`),"gas-giant":rp(`jupiter`),moon:rp(`moon`),"dwarf-planet":Object.freeze({example:`ceres`,massKg:0x32df235c0f16f80000,radiusM:469700,source:`data/horizons/planet-parameters.html`,definition:`Ceres mass in 10^18 kg; mean radius in km × 1000`}),asteroid:Object.freeze({example:`bennu`,massKg:7329e7,radiusM:245.023,source:`https://pmc.ncbi.nlm.nih.gov/articles/PMC7375169/`,definition:`Scheeres et al. 2020 Table 1: kg, mean radius m`}),comet:Object.freeze({example:`67p`,massKg:9982e9,radiusM:Math.cbrt(564e8/(4*Math.PI)),source:`https://doi.org/10.1016/j.icarus.2016.05.002`,definition:`Jorda et al. 2016: kg, equivalent-volume sphere from 18.8 km³ × 1e9`}),"black-hole":Object.freeze({example:`ten-solar`,massKg:10*rp(`sun`).massKg,radiusM:A(10*rp(`sun`).massKg),source:`data/horizons/sun.json; https://imagine.gsfc.nasa.gov/science/objects/black_holes2.html`,definition:`Defined nonrotating uncharged 10-solar-mass example; initial radius field = 2GM/c² capture boundary`})});function ap(e,t){if(!e||typeof e.anchorId!=`string`||!e.offsetM||!v(e.offsetM))return d(`INVALID_INPUT`,`placementAnchor`);let n=t.find(t=>t.id===e.anchorId);if(!n)return d(`INVALID_INPUT`,`placementAnchor`);let r={x:n.positionM.x+e.offsetM.x,y:n.positionM.y+e.offsetM.y,z:n.positionM.z+e.offsetM.z};return v(r)?{ok:!0,value:r}:d(`NON_FINITE_CALCULATION`,`placementAnchor`)}var op=1e4,sp=e=>S([e])[0],cp=j;function lp(e,t,n,r){let i=id(e);return cp({id:t,name:n,kind:e,materialId:`procedural`,massKg:ip[e].massKg,radiusM:ip[e].radiusM,positionM:{...r},velocityMS:{x:0,y:0,z:0},collision:{boundary:`physical-radius`},...i?{displaySpin:i}:{}})}function up(e,t,n){let r=null;for(let i of t){if(i.id===n)continue;let t=Math.hypot(e.x-i.positionM.x,e.y-i.positionM.y,e.z-i.positionM.z);Number.isFinite(t)&&(!r||t<r.distanceM)&&(r={body:i,distanceM:t})}return r}function dp(e){return e>=1495978707?{value:e/E,unit:`AU`}:{value:e/1e3,unit:`km`}}function fp(e,t){return{x:t.x,y:t.y,z:e.z}}function pp(e,t){return{...e,z:t}}function mp(e,t,n){return e*t/n}var hp=e=>10**e,gp=e=>Math.log10(e);function _p(e,t,n,r,i){return Math.max(r,Math.min(i,e+t/Math.max(1,n)*(i-r)))}function vp(e){let t=e.massKg/(4*Math.PI/3*e.radiusM**3);return Number.isFinite(t)&&t>0?t:null}function yp(e){return{x:e.positionM.x+e.velocityMS.x*op,y:e.positionM.y+e.velocityMS.y*op,z:e.positionM.z+e.velocityMS.z*op}}function bp(e,t){return{x:(t.x-e.positionM.x)/op,y:(t.y-e.positionM.y)/op,z:e.velocityMS.z}}function xp(e,t,n){let r=x([e]);if(!r.ok)return r;if(n===`manual`)return{ok:!0,value:{...e.velocityMS}};if(!t)return d(`INVALID_INPUT`,`referenceBody`);let i=x([e,t]);if(!i.ok)return i;let a=p(t,e);if(!a.ok)return a;if(n===`inherit`)return{ok:!0,value:{...t.velocityMS}};let o=a.value.separationM,s=Math.hypot(o.x,o.y);if(s===0)return d(`INVALID_INPUT`,`orbitalPlane`);let c=Math.sqrt(w*t.massKg/a.value.distanceM+w*e.massKg/a.value.distanceM),l={x:t.velocityMS.x-c*o.y/s,y:t.velocityMS.y+c*o.x/s,z:t.velocityMS.z};return Object.values(l).every(Number.isFinite)?{ok:!0,value:l}:d(`NON_FINITE_CALCULATION`,`circularVelocity`)}var Sp=class{identity=``;min=0;max=0;update(e,t,n){let r=2**-52*Math.max(1,Math.abs(t),Math.abs(this.min),Math.abs(this.max))*4,i=this.identity===e&&(t<this.min-r||t>this.max+r);return(this.identity!==e||i)&&(this.identity=e,this.min=t-n,this.max=t+n),i}};function Cp(e,t,n){let r=`captured`,i=e.ownerDocument?.defaultView,a=e=>r!==`ended`&&e.pointerId===t.pointerId&&!(e.timeStamp<t.timeStamp),o=e=>{r===`captured`&&a(e)&&n.move(e)},s=e=>{e.stopPropagation(),p(),n.up(e)},c=e=>{a(e)&&s(e)},l=e=>{a(e)&&(p(),n.interrupt(`pointer-cancel`))},u=t=>{a(t)&&!e.hasPointerCapture(t.pointerId)&&(t.buttons===0&&i?r=`released`:(p(),n.interrupt(`capture-lost`)))},d=e=>{r===`released`&&a(e)&&(p(),n.interrupt(`capture-lost`))},f=e=>{r===`released`&&t.pointerType===`mouse`&&e.button===0&&!(e.buttons&1)&&!(e.timeStamp<t.timeStamp)&&s(e)};function p(){r!==`ended`&&(r=`ended`,i?.removeEventListener(`pointerup`,c,!0),i?.removeEventListener(`pointercancel`,l,!0),i?.removeEventListener(`pointerdown`,d,!0),i?.removeEventListener(`mouseup`,f,!0),e.onpointermove===o&&(e.onpointermove=null),e.onpointerup===c&&(e.onpointerup=null),e.onpointercancel===l&&(e.onpointercancel=null),e.onlostpointercapture===u&&(e.onlostpointercapture=null),e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId))}return i?.addEventListener(`pointerup`,c,!0),i?.addEventListener(`pointercancel`,l,!0),i?.addEventListener(`pointerdown`,d,!0),i?.addEventListener(`mouseup`,f,!0),e.onpointermove=o,e.onpointerup=c,e.onpointercancel=l,e.onlostpointercapture=u,e.setPointerCapture(t.pointerId),{release:p}}function wp(e,t,n){let r=null,i=()=>{let e=r;r=null,e?.capture.release()};e.onpointerdown=i=>{if(i.button!==0||!t.canStartGesture)return;i.preventDefault(),i.stopPropagation();let o=n(i);o&&(t.beginGesture(o.prepare,o.apply,n=>{r={token:n,capture:Cp(e,i,{move:e=>{t.ownsGesture(n)&&(o.move(e),t.moveGesture(n))},up:e=>{r=null,t.ownsGesture(n)&&(o.move(e),t.endGesture(n))},interrupt:e=>{r=null,t.ownsGesture(n)&&t.cancel(e)}})}}),a())};function a(){r&&!t.ownsGesture(r.token)&&i()}return{sync:a,get captured(){return!!r},dispose(){i(),e.onpointerdown=null}}}function Tp(e){let t=t=>{t.target===window&&e.cancel(`window-blur`)},n=()=>{(e.hasGesture||e.phase===`creating-preview`)&&e.cancel(`resize`)},r=()=>{document.hidden&&e.cancel(`hidden`)},i=()=>e.cancel(`pagehide`);return window.addEventListener(`blur`,t),window.addEventListener(`resize`,n),window.addEventListener(`pagehide`,i),document.addEventListener(`visibilitychange`,r),()=>{window.removeEventListener(`blur`,t),window.removeEventListener(`resize`,n),window.removeEventListener(`pagehide`,i),document.removeEventListener(`visibilitychange`,r)}}function Ep(e){return Number.isFinite(e.x)&&Number.isFinite(e.y)&&Math.hypot(e.x,e.y)>=8}function Dp(e,t){return{x:e.x-t.width/2,y:e.y-t.height/2,width:t.width,height:t.height}}function Op(e,t,n,r){let{width:i,height:a}=t;if(![e.x,e.y,i,a,n.width,n.height].every(Number.isFinite)||i<=0||a<=0||n.width<i+16||n.height<a+16)return null;let o=8+i/2,s=n.width-8-i/2,c=8+a/2,l=n.height-8-a/2,u=e=>Math.max(o,Math.min(s,e)),d=e=>Math.max(c,Math.min(l,e)),f=new Set([u(e.x),o,s]),p=new Set([d(e.y),c,l]);for(let e of r)f.add(u(e.x-8-i/2)),f.add(u(e.x+e.width+8+i/2)),p.add(d(e.y-8-a/2)),p.add(d(e.y+e.height+8+a/2));let m=null,h=1/0;for(let n of f)for(let i of p){let a=Dp({x:n,y:i},t);if(r.some(e=>a.x<e.x+e.width+8&&a.x+a.width+8>e.x&&a.y<e.y+e.height+8&&a.y+a.height+8>e.y))continue;let o=(n-e.x)**2+(i-e.y)**2;o<h&&(m={x:n,y:i},h=o)}return m}function kp(e,t,n){let r=10/E,i=new wi(new Q(0,1,0),-(n-t.z)*r),a=e.intersectPlane(i,new Q);if(!a||a.distanceToSquared(e.origin)===0)return null;let o={x:t.x+a.x/r,y:t.y-a.z/r,z:n};return v(o)?o:null}function Ap(e){let r=new Zo,i=new Ea(1,1.018,72),a=new Mi({color:`#d9cbb0`,transparent:!0,opacity:.6,depthTest:!1}),o=new Wi(i,a);Cf(o,3),e.scene.add(o);let s=new is(new Q(1,0,0),new Q,1,`#d6bb86`);Cf(s,5),e.scene.add(s);let c=new bi,l=new Qi({color:`#a6b3c2`,transparent:!0,opacity:.3,depthTest:!1}),u=new oa(c,l);Cf(u,3),e.scene.add(u);let d=document.createElement(`span`);d.className=`distance-label`,e.host.append(d);let f=document.createElement(`button`);f.type=`button`,f.className=`spatial-handle`;let p=document.createElement(`button`);p.type=`button`,p.className=`spatial-handle height-handle`,p.textContent=t(`editor.heightHandle`),p.setAttribute(`aria-label`,t(`editor.heightHandle`));let m=document.createElement(`span`),h=document.createElement(`span`);for(let e of[m,h])e.className=`handle-guide`,e.setAttribute(`aria-hidden`,`true`);e.host.append(m,h,f,p);let g=null,_=null,y=null,b=10/E;function x(t){let n=Eu(t,e.origin()),r=new Q(n.x,n.y,n.z).project(e.camera);return{x:(r.x+1)*e.host.clientWidth/2,y:(1-r.y)*e.host.clientHeight/2,visible:r.z>=-1&&r.z<=1&&Math.abs(r.x)<1&&Math.abs(r.y)<1}}function S(t,n,i,a=e.camera,o=e.origin()){let s=e.canvas.getBoundingClientRect();return r.setFromCamera(new Z((t-s.left)/s.width*2-1,-(n-s.top)/s.height*2+1),a),kp(r.ray,o,i)}function C(t,n){let r=e.canvas.getBoundingClientRect(),i=document.elementFromPoint(t.clientX,t.clientY);if(t.clientX<r.left||t.clientX>r.right||t.clientY<r.top||t.clientY>r.bottom||i?.closest(`.creation-entry,.body-editor,.time-controls,button,select,input`))return null;let a=e.editor.creationPosition({x:0,y:0,z:n.z},n.anchorOrigin).z;return S(t.clientX,t.clientY,a,n.camera,e.origin())}function w(t,n=e.camera,r=e.origin()){let i=Eu(t.positionM,r),a=n.position.distanceTo(new Q(i.x,i.y,i.z));return Math.max(t.radiusM*2,110*a*Math.tan(n.fov*Math.PI/360)/Math.max(1,e.host.clientHeight)/b)}function T(t,n){e.camera.updateMatrixWorld();let r=e.camera.clone(),i={...e.origin()},a=t.clientX,o=t.clientY,s=null,c=0,l=null,u={...e.editor.creationOrigin},d={x:0,y:0},f=t=>{let n=Eu(t,i),a=new Q(n.x,n.y,n.z).project(r);return{x:(a.x+1)*e.host.clientWidth/2,y:(1-a.y)*e.host.clientHeight/2}};return{prepare:a=>{if(n===`position`&&e.editor.phase===`editing-existing`&&(e.onPositionDrag?.(),e.camera.updateMatrixWorld(),r.copy(e.camera),Object.assign(i,e.origin())),s=a,c=w(a,r,i),n===`height`){let e=f(a.positionM),t=f({...a.positionM,z:a.positionM.z+c});return d={x:t.x-e.x,y:t.y-e.y},Ep(d)}let o=n===`velocity`?yp(a).z:a.positionM.z;return l=S(t.clientX,t.clientY,o,r,i),l!==null},move:e=>{a=e.clientX,o=e.clientY},apply:()=>{if(!s)return!1;if(n===`height`){let n=((a-t.clientX)*d.x+(o-t.clientY)*d.y)/(d.x**2+d.y**2)*c;return e.editor.change({positionM:e.editor.creationPosition(pp(s.positionM,s.positionM.z+n),u)}),!0}let f=n===`velocity`?yp(s).z:s.positionM.z,p=S(a,o,f,r,i);if(!p||!l)return!1;let m=p.x-l.x,h=p.y-l.y;if(m===0&&h===0)return n===`position`?e.editor.change({positionM:e.editor.creationPosition(s.positionM,u)}):n===`radius`?e.editor.change({radiusM:s.radiusM}):e.editor.change({velocityMS:{...s.velocityMS}}),!0;if(n===`position`)e.editor.change({positionM:e.editor.creationPosition(fp(s.positionM,{x:s.positionM.x+m,y:s.positionM.y+h,z:f}),u)});else if(n===`radius`)e.editor.change({radiusM:mp(s.radiusM,Math.hypot(c+m,h),c)});else{let t=yp(s);e.editor.change({velocityMS:bp(s,{x:t.x+m,y:t.y+h,z:f})})}return!0}}}let D=wp(f,e.editor,t=>T(t,e.editor.tool));function O(e){p.disabled=!e,p.textContent=t(e?`editor.heightHandle`:`editor.heightUnavailable`),p.title=e?``:t(`editor.heightUnavailableHint`),p.setAttribute(`aria-description`,p.title)}let k=wp(p,e.editor,t=>{let n=e.editor.body;if(p.disabled||!n)return null;e.camera.updateMatrixWorld();let r=x(n.positionM),i=x({...n.positionM,z:n.positionM.z+w(n)});return Ep({x:i.x-r.x,y:i.y-r.y})?T(t,`height`):(O(!1),null)});function A(){let t=e.host.getBoundingClientRect();return[...e.host.parentElement?.querySelectorAll(`.body-editor,.arc-tool,.time-controls,.creation-entry,.theme-controls,.display-settings > summary,.display-settings[open] > .display-settings-panel,.scene-status`)??[]].filter(e=>!e.hidden).map(e=>e.getBoundingClientRect()).filter(e=>e.width>0&&e.height>0).map(e=>({x:e.left-t.left,y:e.top-t.top,width:e.width,height:e.height}))}function j(e,t,n,r){if(e.hidden=!n,t.hidden=!0,!n)return;e.style.left=`${n.x}px`,e.style.top=`${n.y}px`;let i=n.x-r.x,a=n.y-r.y,o=Math.hypot(i,a);o>3&&(t.hidden=!1,t.style.left=`${r.x}px`,t.style.top=`${r.y}px`,t.style.width=`${o}px`,t.style.transform=`rotate(${Math.atan2(a,i)}rad)`)}function M(t){let n=_;_=null,n?.generation===e.editor.generation&&e.editor.cancel(t),n?.capture.release()}let N=e=>{y&&e.timeStamp<y.started||(y=y||e.button!==0||e.isPrimary===!1?null:{x:e.clientX,y:e.clientY,id:e.pointerId,started:e.timeStamp,slop:np(e.pointerType)})},P=e=>{y&&e.pointerId===y.id&&Math.hypot(e.clientX-y.x,e.clientY-y.y)>y.slop&&(y=null)},F=e=>{y&&`pointerId`in e&&(e.pointerId!==y.id||e.timeStamp<y.started)||(y=null)},I=t=>{if(t.button!==0||!y||t.pointerId!==y.id||t.timeStamp<y.started)return;let n=y;if(y=null,Math.hypot(t.clientX-n.x,t.clientY-n.y)>n.slop||e.editor.busy)return;let i=e.canvas.getBoundingClientRect();r.setFromCamera(new Z((t.clientX-i.left)/i.width*2-1,-(t.clientY-i.top)/i.height*2+1),e.camera);let a=r.intersectObjects([...e.meshes()],!1)[0],o=a?String(a.object.userData.bodyId):null;e.editor.select(o),o&&e.editor.selectedId===o?e.onBodyClick?.(o):o||e.onEmptyClick?.()};e.canvas.addEventListener(`pointerdown`,N),e.canvas.addEventListener(`pointermove`,P),e.canvas.addEventListener(`pointerup`,I),e.canvas.addEventListener(`pointercancel`,F),e.canvas.addEventListener(`blur`,F);function L(t,n,r,i){let a=Eu(r,e.origin()),o=Eu(i,e.origin());[...Object.values(a),...Object.values(o)].every(e=>Number.isFinite(Math.fround(e)))?(n.setAttribute(`position`,new ci([a.x,a.y,a.z,o.x,o.y,o.z],3)),n.computeBoundingSphere(),t.visible=!0):t.visible=!1}return{setTheme(e){let t=e===`atelier`?`#596775`:`#c6d1db`;a.color.set(t),l.color.set(t),s.setColor(e===`atelier`?`#93683d`:`#d6bb86`)},beginCreation(n,r){if(n.button!==0||e.editor.busy||e.editor.blocked)return;n.preventDefault(),n.stopPropagation();let{planeZ:i,referenceId:a,anchorId:o}=e.creationContext?.()??{planeZ:e.origin().z,referenceId:null,anchorId:null};if(!e.editor.beginCreate(r,null,t(`editor.exampleName`,{kind:t(`kind.${r}`)}),a,o))return;if(!n.isTrusted){e.editor.place(S(n.clientX,n.clientY,i)),e.editor.releaseCreation();return}let s=n.currentTarget;e.camera.updateMatrixWorld();let c={z:i,anchorOrigin:{...e.editor.creationOrigin},generation:e.editor.generation,camera:e.camera.clone()};_={...c,capture:Cp(s,n,{move:t=>{_?.generation===c.generation&&e.editor.generation===c.generation&&e.editor.place(C(t,_))},up:t=>{let n=_;n?.generation===c.generation&&(_=null,e.editor.generation===c.generation&&(e.editor.place(C(t,n)),e.editor.releaseCreation()))},interrupt:e=>{_?.generation===c.generation&&M(e)}})}},update(r=!0){if(D.sync(),k.sync(),_&&(_.generation!==e.editor.generation||e.editor.phase!==`creating-preview`)){let e=_;_=null,e.capture.release()}let i=e.editor.body;if(o.visible=u.visible=s.visible=!1,f.hidden=!D.captured,p.hidden=!k.captured,d.hidden=!0,m.hidden=h.hidden=!0,!r||!i||!v(i.positionM)||!v(i.velocityMS)||!Number.isFinite(i.radiusM)||i.radiusM<=0||!Number.isFinite(i.massKg)||i.massKg<=0)return;let l=Eu(i.positionM,e.origin());o.position.set(l.x,l.y,l.z),o.quaternion.copy(e.camera.quaternion);let y=e.meshes().find(e=>e.userData.bodyId===i.id)?.scale.x??0,b=Math.max(y*1.12,Td(i.radiusM,e.camera.position.distanceTo(o.position),e.camera.fov,e.host.clientHeight,23));if(!Object.values(l).every(e=>Number.isFinite(Math.fround(e)))||!Number.isFinite(Math.fround(b)))return;o.scale.setScalar(b),o.visible=!e.editor.state?.jump,a.opacity=e.editor.tool===`mass`?.3+Math.min(.35,Math.max(0,Math.log10(i.massKg)/100)):.6;let S=e.editor.canStartGesture||D.captured||k.captured,C=w(i),T={...i.positionM,x:i.positionM.x+C};e.editor.tool===`position`&&(T=i.positionM),e.editor.tool===`velocity`&&(T=yp(i));let E=Eu(T,e.origin());if(Object.values(E).every(e=>Number.isFinite(Math.fround(e)))){if(S&&e.editor.tool!==`mass`){let n=x(T),r=x({...i.positionM,z:i.positionM.z+C});if(f.textContent=t(e.editor.tool===`position`?`editor.moveHandle`:e.editor.tool===`radius`?`editor.radiusHandle`:`editor.velocityHandle`),!e.editor.hasGesture){O(Ep({x:r.x-n.x,y:r.y-n.y})),f.hidden=!1,p.hidden=e.editor.tool!==`position`;let t={width:e.host.clientWidth,height:e.host.clientHeight},i=A(),a=f.getBoundingClientRect(),o=p.getBoundingClientRect(),s=n.visible?Op(n,a,t,i):null;s&&i.push(Dp(s,a)),g={handle:s,height:e.editor.tool===`position`&&n.visible?Op(r,o,t,i):null}}if(j(f,m,g?.handle??null,n),j(p,h,e.editor.tool===`position`?g?.height??null:null,r),f.setAttribute(`aria-label`,f.textContent),e.editor.tool!==`position`){let t=Eu(T,e.origin()),n=new Q(t.x-l.x,t.y-l.y,t.z-l.z),r=n.length();if(r>0&&Number.isFinite(Math.fround(r))){s.position.set(l.x,l.y,l.z),s.setDirection(n.normalize());let i=wf(r,e.camera.position.distanceTo(new Q(t.x,t.y,t.z)),e.camera.fov,e.host.clientHeight);s.setLength(r,i.length,i.width),s.visible=!0}}}if(e.editor.candidate&&[`creating-preview`,`editing-new`].includes(e.editor.phase)){let r=up(i.positionM,e.bodies(),i.id);if(r){L(u,c,i.positionM,r.body.positionM);let e=x({x:(i.positionM.x+r.body.positionM.x)/2,y:(i.positionM.y+r.body.positionM.y)/2,z:(i.positionM.z+r.body.positionM.z)/2}),a=dp(r.distanceM);d.hidden=!e.visible,d.textContent=t(`editor.distance`,{body:r.body.materialId===`procedural`?r.body.name:n(r.body.id),value:a.value.toPrecision(4),unit:a.unit}),d.style.left=`${e.x}px`,d.style.top=`${e.y}px`}}}},dispose(){D.dispose(),k.dispose(),M(`disposed`),e.canvas.removeEventListener(`pointerdown`,N),e.canvas.removeEventListener(`pointermove`,P),e.canvas.removeEventListener(`pointerup`,I),e.canvas.removeEventListener(`pointercancel`,F),e.canvas.removeEventListener(`blur`,F),i.dispose(),a.dispose(),c.dispose(),l.dispose(),s.dispose(),e.scene.remove(o,u,s),f.remove(),p.remove(),m.remove(),h.remove(),d.remove()}}}function jp(e,t,n,r){let i=Eu(r,n),a=new Q(i.x,i.y,i.z);e.position.sub(a),t.sub(a),e.updateMatrixWorld()}var Mp=class{camera;target;followId=`earth`;overview=!1;locked=null;lastCollisionId=0;lastRecoveryId;constructor(e,t){this.camera=e,this.target=t}creationTarget(e){let t=this.overview?`sun`:this.followId;return e.some(e=>e.id===t)?t:null}creationContext(e){return{referenceId:this.creationTarget(e),anchorId:this.overview?null:this.followId,planeZ:this.base(e).z}}base(e,t){return this.overview?{x:0,y:0,z:0}:t?.get(this.followId)??e.find(e=>e.id===this.followId)?.positionM??{x:0,y:0,z:0}}origin(e,t,n){let r=this.base(e,n);return t?(this.locked??={...r},this.locked):(this.release(e,n),r)}settle(e,t){t.outcome!==`rejected`&&this.release(e)}release(e,t){this.locked&&=(jp(this.camera,this.target,this.locked,this.base(e,t)),null)}reconcile(e,t,n){let r=n?.recoveryResult,i=!!r&&r.requestId!==this.lastRecoveryId&&r.outcome===`committed`,a=i&&r.operation===`delete`;if(r&&(this.lastRecoveryId=r.requestId),a){let e=t.some(e=>e.id===this.followId)?this.followId:t.find(e=>e.id===`earth`)?.id??t[0]?.id??``;return this.setView(e,!0),`deleted`}if(i&&!this.overview&&!t.some(e=>e.id===this.followId))return this.setView(t.find(e=>e.id===`earth`)?.id??t[0]?.id??``,!0),`missing`;let o=(n?.collisions??[]).filter(e=>e.id>this.lastCollisionId);if(this.lastCollisionId=Math.max(this.lastCollisionId,...o.map(e=>e.id)),t.some(e=>e.id===this.followId))return;let s=this.followId,c=0;for(let e of o)e.event.sourceIds.includes(s)&&(s=e.event.body.id,c=e.id);if(c&&n?.collisionContext?.activeEventIds.includes(c)&&t.some(e=>e.id===s)){this.followId=s,this.locked=null;return}let l=this.base(e);this.followId=t.find(e=>e.id===`earth`)?.id??t[0]?.id??``,t.length||(this.overview=!0),jp(this.camera,this.target,l,this.base(t))}setView(e,t=!1){this.followId=e,this.overview=t,this.locked=null}};function Np(e,t){return t.theme===`cosmos`||e===t.candidateId?!0:t.overview?t.showOverviewNames:e===t.observedId}function Pp(e,r){let i=new Tu({antialias:!0,logarithmicDepthBuffer:!0}),a=r.profileContext?.(i.getContext());i.debug.checkShaderErrors=!1,i.toneMapping=4,i.toneMappingExposure=1.1;let o=new Ku(e=>{let t=r.onTextureUploadMetrics?performance.now():0;if(i.initTexture(e),r.onTextureUploadMetrics){let n=e.image;r.onTextureUploadMetrics({width:n?.width??0,height:n?.height??0,cpuMs:performance.now()-t})}}),s=kd(r.bodies,{prepareTexture:e=>o.prepare(e),...r.onSurfaceStatus?{onSurfaceStatus:r.onSurfaceStatus}:{}}),c=xf(e),l=kf();s.scene.add(l.group);let u=Of();s.scene.add(u.line);let d=Rd();s.scene.add(d.mesh,d.well,d.relief);let f=0,p=null,m=!1,h=!1,g=r.bodies,_=null,v=null,y,b,S=`cosmos`,C=!0,w={gravity:`off`,axis:!1,names:!1,shadows:!0},T=null,E=null,D=new Oo(40,1,1e-5,5e3),O=D.clone();D.position.set(0,.03,.08);let k=i.domElement;k.className=`scene-canvas`,k.setAttribute(`role`,`img`),k.setAttribute(`aria-label`,t(`scene.label`)),k.tabIndex=0,e.append(k);let A=new Bf(D,k);A.enableDamping=!0,A.dampingFactor=.08,A.touches.ONE=ce.ROTATE,A.touches.TWO=ce.DOLLY_PAN,A.minDistance=.001,A.maxDistance=1500,A.listenToKeyEvents(k),A.update(),A.saveState();let j=new Mp(D,A.target),M=new ku(D,A),N=()=>j.origin(g,y?.holdsObservation??!1,v),P=bf(e),F=new yf,I=new Q,L=!1,ee=()=>{let t=$f(e.clientWidth,e.clientHeight,window.devicePixelRatio),n={aspect:D.aspect,fov:D.fov};i.setPixelRatio(Sf(t.width,t.height,window.devicePixelRatio,window.matchMedia(`(pointer:coarse)`).matches)),i.setSize(t.width,t.height,!1),D.aspect=t.aspect,D.fov=ep(t.aspect),D.updateProjectionMatrix(),L&&j.overview&&!(y?.busy??!1)&&M.resize(g,n),L=!0},te=new ResizeObserver(ee);te.observe(e),window.addEventListener(`resize`,ee),ee(),W();let ne=!1,R=!1,re=0,z=!1,B=new WeakSet,V=new Uu(()=>{let e=re;return Gu(i,s.scene,D,()=>!z&&!ne&&e===re,B,r.onPreparationMetrics)},e=>{console.error(e),r.onRenderFailure?.()}),ie=()=>{ne=!1,R=!0;let e=++re;V.invalidate(),s.prepareTextures().then(()=>{!z&&e===re&&(R=!1,r.onContextRestored())},t=>{!z&&e===re&&(console.error(t),r.onRenderFailure?.())})},H=e=>{e.preventDefault(),ne=!0,re++,V.invalidate(),r.onContextLost()};k.addEventListener(`webglcontextlost`,H),k.addEventListener(`webglcontextrestored`,ie);let ae=0;return i.setAnimationLoop(()=>{let t=r.onFrameMetrics?performance.now():0;A.update(),j.overview&&M.track(g,y?.busy??!1);let a=N();D.updateMatrixWorld();let o=y?.candidate,w=o&&x([o]).ok?o:null,E=w?g.some(e=>e.id===w.id)?g.map(e=>e.id===w.id?w:e):[...g,w]:_??g;s.sync(E);let F=[],L=w&&!g.some(e=>e.id===w.id)?w.id:c.id,ee=null,te={theme:S,overview:j.overview,showOverviewNames:h,observedId:j.followId,candidateId:w?.id??null},re=[],z=null;for(let t of E){let r=s.meshes.get(t.id);if(!r)continue;let i=Eu(v?.get(t.id)??t.positionM,a);if(r.position.set(i.x,i.y,i.z),!Object.values(i).every(e=>Number.isFinite(Math.fround(e)))){r.visible=!1;continue}let o=r.material;o.transparent=t.id===w?.id,o.opacity=t.id===w?.id?.5:1;let c=tp(t.id,e.clientWidth,e.clientHeight,j.overview),l=Td(t.radiusM,D.position.distanceTo(r.position),D.fov,e.clientHeight,c);if(!Number.isFinite(Math.fround(l))){r.visible=!1;continue}r.visible=!0,r.scale.setScalar(l);let u=l/(2*D.position.distanceTo(r.position)*Math.tan(D.fov*Math.PI/360))*e.clientHeight;I.copy(r.position).project(D),I.z>=-1&&I.z<=1&&Math.abs(I.x)<=1.2&&Math.abs(I.y)<=1.2&&s.requestSurface(t.id,u);let d=(I.x+1)*e.clientWidth/2;t.id===L&&I.z>=-1&&I.z<=1&&Math.abs(I.x)<=1&&Math.abs(I.y)<=1&&(ee={id:t.id,x:d,y:(1-I.y)*e.clientHeight/2,radius:u,name:t.name}),t.id===y?.body?.id&&(z={id:t.id,x:d,y:(1-I.y)*e.clientHeight/2,radius:u,visible:I.z>=-1&&I.z<=1&&Math.abs(I.x)<=1&&Math.abs(I.y)<=1});let f=(1-I.y)*e.clientHeight/2+u*(s.rings.has(t.id)?bd.outer:1)+8+(j.overview&&t.id===`moon`?16:0),p=!C||!Np(t.id,te)||I.z>1||I.z<-1||Math.abs(I.x)>1||Math.abs(I.y)>1||re.some(e=>Math.abs(e.x-d)<42&&Math.abs(e.y-f)<18);p||re.push({x:d,y:f}),F.push({id:t.id,text:t.materialId===`procedural`?t.name:n(t.id),x:d,y:f,hidden:p,selected:y?.selectedId===t.id})}b?.update(C);let B=r.onFrameMetrics?performance.now():0;s.updateRotation(E,p??f,y?.selectedId??null,m),s.updateBackdrop(D,E);let ie=r.onFrameMetrics?performance.now():0,H=(j.overview?void 0:E.find(e=>e.id===j.followId))??E.reduce((e,t)=>!e||t.massKg>e.massKg?t:e,void 0),oe=Math.max(1e-12,Math.min(2e3,D.position.distanceTo(A.target)*Math.tan(D.fov*Math.PI/360)*2.2)),U=Math.max(10,...E.map(e=>{let t=Eu(e.positionM,{x:0,y:0,z:0});return Math.hypot(t.x,t.y,t.z)}))*2.7,W=H?Eu(H.positionM,a).y:0;d.updateView(D.position,{x:A.target.x,y:W,z:A.target.z},jd(oe,U)),d.update(E,a,A.target,oe,H?.massKg??1,performance.now(),new Map([...s.meshes].map(([e,t])=>[e,t.scale.x])));let se=r.onFrameMetrics?performance.now():0;l.update(g,a,D.position.distanceTo(A.target),C&&!v&&!(y?.busy??!1),T),u.update(g,a,D.position.distanceTo(A.target),C&&!v);let ce=r.onFrameMetrics?performance.now():0,le=Hu(s.scene),ue=!ne&&!R&&V.canRender(le);k.setAttribute(`aria-busy`,String(!ue));let de=!ue&&!ne&&C&&!!ee;c.update(de?ee:null),ue?(Mu(i,s.scene,D,O,D.position.distanceTo(A.target)),P.publish(F),r.onBodyAnchor?.(z)):C||P.hide(),r.onFrameMetrics&&(r.onFrameMetrics({cpuMs:performance.now()-t,intervalMs:ae?t-ae:0,preparation:V.diagnostics(le),prepared:ue,candidateFallback:de,bodies:E.length,geometries:i.info.memory.geometries,textures:i.info.memory.textures,programs:i.info.programs?.length??0,width:e.clientWidth,height:e.clientHeight,pixelRatio:i.getPixelRatio(),phases:{layoutMs:B-t,rotationMs:ie-B,gravityMs:se-ie,pathsMs:ce-se,renderMs:performance.now()-ce}}),ae=t)}),{configuration(){return{theme:S,...w,orbits:!1,camera:_f(D,A,j)}},restoreCamera(e){F.clear(),vf(D,A,j,e),M.resetTracking(g)},setSceneReferences(e){e!==E&&(E=e,l.setResult(e))},setPrediction(e){e!==T&&(T=e,u.setResult(e))},setUIVisible(e){C=e,b?.update(e)},setTheme(e){S=e,l.setTheme(e===`cosmos`),u.setTheme(e===`cosmos`),s.setTheme(e),d.setTheme(e===`cosmos`),b?.setTheme(e)},setDisplay(e,t,n=!1,r=!0){w={gravity:e,axis:t,names:n,shadows:r},d.setMode(e),m=t,h=n,d.setRelief(r)},retryTextures(){s.retryTextures()},refreshEditor(){b?.update(C)},attachEditor(t){y=t,b=Ap({host:e,canvas:k,camera:D,scene:s.scene,editor:t,bodies:()=>g,origin:N,creationContext:()=>j.creationContext(g),meshes:()=>[...s.meshes.values()].filter(e=>g.some(t=>t.id===e.userData.bodyId)),onBodyClick:oe,onEmptyClick:()=>{j.overview||U()},onPositionDrag:()=>{j.overview||(F.clear(),j.setView(j.followId,!0),M.frame(g),A.update())}}),b.setTheme(S)},beginCreation(e,t){b?.beginCreation(e,t)},focusBody:oe,settleMutation(e){j.settle(g,e),A.update()},showOverview:W,update(e,t,n=f){let r=j.overview,i=j.reconcile(g,e,t);g=e,i===`deleted`?r?(F.clear(),M.track(g,!0)):U():i===`missing`&&(F.clear(),W()),f=n,v=null,_=null,p=null},previewPositions(e,t,n=f){_=t??null,v=new Map(e.map(e=>[e.id,e.positionM])),p=n},dispose(){z||(z=!0,b?.dispose(),V.dispose(),o.dispose(),i.setAnimationLoop(null),te.disconnect(),window.removeEventListener(`resize`,ee),k.removeEventListener(`webglcontextlost`,H),k.removeEventListener(`webglcontextrestored`,ie),A.dispose(),l.dispose(),u.dispose(),d.dispose(),c.dispose(),s.dispose(),P.dispose(),i.dispose(),i.forceContextLoss(),a?.(),k.remove())}};function oe(e){if(y?.busy)return;let t=g.find(t=>t.id===e);if(!t)return;let n=_f(D,A,j);Au(D,A,t.radiusM,s.rings.has(e)?bd.outer:1)&&(F.remember(e,n),j.setView(e))}function U(){if(y?.busy)return;let e=F.take(g);e?(vf(D,A,j,e),M.resetTracking(g)):W()}function W(){y?.busy||(F.clear(),j.setView(j.followId,!0),M.frame(g),y?.select(null))}}function Fp(e){let n=document.createElement(`main`);n.className=`app-shell`;let r=document.createElement(`div`);r.className=`scene-host`;let i=document.createElement(`header`);i.className=`scene-heading`;let a=document.createElement(`h1`);a.textContent=t(`app.title`);let o=document.createElement(`p`);o.textContent=t(`app.stage`,{count:`—`}),i.append(a,o);let s=document.createElement(`p`);s.className=`scene-origin`,s.textContent=t(`time.origin`),i.append(s);let c=document.createElement(`p`);c.className=`scene-scale-note`,c.textContent=t(`app.description`);let l=document.createElement(`p`);return l.className=`scene-status`,l.setAttribute(`role`,`alert`),l.hidden=!0,n.append(r,i,c,l),e.append(n),{sceneHost:r,controlsHost:n,updateBodyCount(e){o.textContent=t(`app.stage`,{count:e})},showError(e){l.textContent=e,l.hidden=!1},clearError(){l.hidden=!0,l.textContent=``},dispose(){n.remove()}}}function Ip(e){let n=document.createElement(`button`);n.type=`button`,n.className=`diagnostic-export`,n.hidden=!0,n.textContent=t(`risk.exportDiagnostic`),e.append(n);let r=null;return n.onclick=()=>{if(!r?.diagnostic)return;let e=URL.createObjectURL(new Blob([JSON.stringify({epoch:z,...r},null,2)],{type:`application/json`})),t=document.createElement(`a`);t.href=e,t.download=`planet-failure-diagnostic.json`,t.click(),URL.revokeObjectURL(e)},{update(e){r=e??null,n.hidden=!r?.diagnostic}}}function Lp(e,t){if(!e||e.schemaVersion!==1||!t(e.before)||e.outerStepSeconds!==e.before.config.timeStepSeconds||![`play`,`jump`].includes(e.operation)||!e.work)return!1;let n=e.work;return Number.isFinite(n.wallMs)&&n.wallMs>=0&&Number.isFinite(n.localBudgetMs)&&n.localBudgetMs>0&&(n.localBudgetElapsedMs===null||Number.isFinite(n.localBudgetElapsedMs)&&n.localBudgetElapsedMs>=0)&&(n.rounds===void 0||Number.isSafeInteger(n.rounds)&&n.rounds>=1)&&(n.activeComputeMs===void 0||Number.isFinite(n.activeComputeMs)&&n.activeComputeMs>=0)&&[n.attempts,n.evaluationsUsed].every(e=>Number.isSafeInteger(e)&&e>=0)&&[n.attemptLimit,n.evaluationLimit].every(e=>Number.isSafeInteger(e)&&e>0)}function Rp(e,t,n){return!!e&&Number.isSafeInteger(e.revision)&&e.revision>=0&&Array.isArray(e.activeEventIds)&&e.activeEventIds.length<=100&&new Set(e.activeEventIds).size===e.activeEventIds.length&&e.activeEventIds.every(e=>Number.isSafeInteger(e)&&t.some(t=>t.id===e&&n.bodies.some(e=>e.id===t.event.body.id&&e.massKg===t.event.body.massKg&&e.radiusM===t.event.body.radiusM&&e.kind===t.event.body.kind)))&&new Set(e.activeEventIds.map(e=>t.find(t=>t.id===e).event.body.id)).size===e.activeEventIds.length}function zp(e,t){let n=e.collisions?.find(e=>e.id===t)?.event;return n&&e.collisionContext?.activeEventIds.includes(t)&&e.state.bodies.some(e=>e.id===n.body.id)?n.body.id:null}var Bp=[`solar`,`earth`,`moon`,`kg`,`tonne`],Vp=Object.freeze({solar:re.bodies.find(e=>e.id===`sun`).massKg,earth:re.bodies.find(e=>e.id===`earth`).massKg,moon:re.bodies.find(e=>e.id===`moon`).massKg,kg:1,tonne:1e3});function Hp(e,t){let n=e*Vp[t];return e>0&&Number.isFinite(e)&&n>0&&Number.isFinite(n)?n:null}function Up(e,t){let n=e/Vp[t];return e>0&&Number.isFinite(e)&&n>0&&Number.isFinite(n)?n:null}function Wp(e){return e>=.1*Vp.solar?`solar`:e>=.1*Vp.earth?`earth`:e>=.01*Vp.moon?`moon`:e>=1e6?`tonne`:`kg`}var Gp=Vp.earth,Kp=Vp.moon,qp=new Intl.NumberFormat(`zh-CN`,{maximumSignificantDigits:3}),Jp=new Intl.NumberFormat(`zh-CN`,{notation:`compact`,maximumSignificantDigits:3});function Yp(e){return e>=Vp.solar*.1?t(`collision.solarMass`,{value:qp.format(e/Vp.solar)}):e>=Gp*.1?t(`collision.earthMass`,{value:qp.format(e/Gp)}):e>=Kp*.1?t(`collision.moonMass`,{value:qp.format(e/Kp)}):e>=Kp*1e-5?t(`collision.moonPercent`,{value:qp.format(100*e/Kp)}):e>=1e3?t(`collision.tonnes`,{value:Jp.format(e/1e3)}):t(`collision.kg`,{value:qp.format(e)})}function Xp(e,r){return r===e&&n(e)!==t(`body.unknown`)?n(e):r}function Zp(e){let n=Xp(e.body.id,e.body.name);return t(`collision.summary`,{names:e.sourceIds.map((t,n)=>Xp(t,e.sourceNames[n])).join(`、`),result:n,added:Yp(e.addedMassKg),total:Yp(e.body.massKg)})}function Qp(e,n,r=e){let i=document.createElement(`button`),a=document.createElement(`button`);i.type=a.type=`button`,i.disabled=a.disabled=!0,i.textContent=t(`history.undo`),a.textContent=t(`history.redo`),i.onclick=()=>{_(),n.undo?.()},a.onclick=()=>{_(),n.redo?.()};let o=document.createElement(`button`);o.type=`button`,o.hidden=!0,o.textContent=t(`history.experiment`),o.onclick=()=>{_(),n.experiment?.()},r.append(o);let s=document.createElement(`p`);s.className=`jump-details`,s.hidden=!0,s.textContent=t(`history.experimentNote`);let c=document.createElement(`p`);c.className=`recovery-feedback`,c.setAttribute(`role`,`status`);let u=document.createElement(`p`);u.className=`collision-notice`,u.setAttribute(`role`,`status`);let d=document.createElement(`button`);d.type=`button`,d.textContent=t(`collision.inspect`),d.className=`collision-inspect`;let f=document.createElement(`p`);f.className=`collision-applicability`;let p=document.createElement(`div`);p.className=`collision-actions`,p.append(d,f),e.append(c,u,p),r.append(s);let m=-1,h=!1,g,_=()=>{c.textContent=``,c.hidden=!0};return{undo:i,redo:a,clearFeedback:_,update(e,r){let _=e?.history;i.disabled=r||!_?.undo,a.disabled=r||!_?.redo,o.hidden=!_?.experimentStart,o.disabled=r||!_?.experimentStart,s.hidden=o.hidden,o.title=_?.experimentStart?t(`history.experimentHint`,{date:l(_.experimentStart.timeSeconds)}):``;let v=e?.recoveryResult;if(v&&v.requestId!==g&&(g=v.requestId,c.textContent=t(v.outcome===`rejected`?v.error===`EDITOR_BUSY`?`history.busy`:v.error===`STALE_EDIT`?`history.stale`:v.error===`BODY_NOT_FOUND`?`history.missing`:`history.rejected`:v.operation===`delete`?`history.deleted`:v.operation===`experiment`?`history.experimentRestored`:`history.restored`)),c.hidden=!c.textContent,e&&(e.collisionContext?.revision??0)>=m){m=e.collisionContext?.revision??0;let r=e.collisions?.at(-1),i=r?.event,a=!!r&&zp(e,r.id)!==null;u.textContent=i?t(a?i.kind===`absorption`?`collision.currentAbsorption`:`collision.current`:`collision.historical`,{date:l(i.timeSeconds)})+` `+Zp(i):``,u.hidden=p.hidden=d.hidden=f.hidden=!i,f.textContent=i&&!a?t(`collision.inactive`):``,f.hidden=!f.textContent,h=a,d.onclick=()=>{!d.disabled&&r&&n.collisionResult?.(r.id)}}d.disabled=r||!h}}}function $p(e,r){let i=e.bodyIds.map(e=>{let t=r.find(t=>t.id===e);return t?.materialId===`procedural`?t.name:n(e)}).join(`、`),a=e.code===`INVALID_INPUT`?`risk.input`:e.code===`COLLISION_BUDGET`?`risk.collisionBudget`:e.code===`COINCIDENT_BODIES`||e.code===`PHYSICAL_OVERLAP`?`risk.overlap`:e.code===`UNSAFE_TIMESTEP`?`risk.step`:e.code===`NON_FINITE_CALCULATION`?`risk.nonFinite`:`risk.range`;return t(a,{bodies:i||t(`risk.system`)})}function em(e,t){if(!Number.isFinite(e))return``;let n=Number(e.toFixed(t));return e!==0&&n===0||Math.abs(e)>=1e21?e.toExponential(4):String(n)}function tm(e){let t=em(e,2),n=t.includes(`e`)?e.toExponential(2):t;return Number.isFinite(Number(n))?n:String(e)}var nm=new Intl.NumberFormat(`zh-CN`,{maximumFractionDigits:2}),rm=e=>nm.format(e);function im(e,n){let r=document.createElement(`div`);r.className=`speed-steps`,r.setAttribute(`role`,`group`),r.setAttribute(`aria-label`,t(`time.speedLevels`));let i=document.createElement(`span`);i.className=`speed-track`,i.setAttribute(`aria-hidden`,`true`),r.append(i);let a=document.createElement(`span`);a.className=`speed-fill`,i.append(a);let o=document.createElement(`span`);o.className=`speed-thumb`,i.append(o);let s=new Map,c=null,l=t=>{e.disabled||(e.value!==String(t)&&(e.value=String(t),n(t)),p())};for(let e of[1,2,3,4,5]){let n=document.createElement(`button`);n.type=`button`,n.className=`speed-step`,n.setAttribute(`aria-label`,t(`time.speed${e}`));let i=document.createElement(`span`);i.className=`speed-dot`,i.setAttribute(`aria-hidden`,`true`),n.append(i),n.onclick=()=>l(e),n.onkeydown=t=>{let n=t.key===`Home`?1:t.key===`End`?5:[`ArrowRight`,`ArrowUp`].includes(t.key)?Math.min(5,e+1):[`ArrowLeft`,`ArrowDown`].includes(t.key)?Math.max(1,e-1):null;n!==null&&(t.preventDefault(),l(n),s.get(n).focus())},s.set(e,n),r.append(n)}let u=document.createElement(`span`);u.className=`speed-current`,r.append(u);let d=e=>{let t=r.getBoundingClientRect();return Math.max(1,Math.min(5,Math.floor((e-t.left)/Math.max(1,t.width)*5)+1))};r.onpointerdown=t=>{if(!(t.button!==0||e.disabled||c||t.target===r||t.target===u)){t.preventDefault();for(let e of s.values())e.blur?.();c={id:t.pointerId,index:d(t.clientX)},r.setPointerCapture(t.pointerId),p()}},r.onpointermove=e=>{c?.id===e.pointerId&&(c.index=d(e.clientX),p())};let f=()=>{if(!c)return;let e=c.id;c=null,r.hasPointerCapture(e)&&r.releasePointerCapture(e),p()};r.onpointerup=e=>{if(c?.id!==e.pointerId)return;let t=d(e.clientX);f(),l(t)},r.onpointercancel=e=>{c?.id===e.pointerId&&f()},r.onlostpointercapture=e=>{e.target===r&&c?.id===e.pointerId&&f()};function p(){e.disabled&&(c=null);let n=c?.index??Number(e.value),i=n>=1?(n-.5)*20:10;r.dataset.realtime=String(n===0),r.style.setProperty(`--speed-position`,`${i}%`),r.dataset.disabled=String(e.disabled);for(let[t,n]of s)n.disabled=e.disabled,n.setAttribute(`aria-pressed`,String(t===Number(e.value))),n.tabIndex=t===Number(e.value)||Number(e.value)===0&&t===1?0:-1;u.textContent=t(`time.speed${n}`)}return p(),{element:r,sync:p}}function am(e,n){let i=document.createElement(`section`);i.className=`time-controls`;let a=document.createElement(`p`);a.className=`simulation-date`,a.textContent=t(`time.current`,{date:l(0)}),a.setAttribute(`aria-label`,t(`time.dateLabel`));let c=document.createElement(`div`);c.className=`time-row`;let u=e=>{let n=document.createElement(`button`);return n.type=`button`,n.textContent=t(e),n},d=e=>e>=86400?t(`time.durationDays`,{value:rm(e/86400)}):e>=3600?t(`time.durationHours`,{value:em(e/3600,3)}):t(`time.durationSeconds`,{value:e}),f=u(`time.pause`);f.disabled=!0,zu(f,t(`time.pause`),`pause`),f.className+=` time-play`;let p=document.createElement(`select`);p.setAttribute(`aria-label`,t(`time.speed`)),p.disabled=!0,r.forEach((e,n)=>{let r=document.createElement(`option`);r.value=String(n),r.textContent=t(`time.speed${n}`),p.append(r)}),p.value=`2`;let m=im(p,e=>W(()=>n.speed(e))),h=u(`time.startJump`);h.type=`submit`,zu(h,t(`time.startJump`),`jump`),h.className+=` time-jump-start`;let g=u(`time.restore`);g.hidden=!0;let _=document.createElement(`form`);_.className=`jump-form`,_.noValidate=!0;let v=document.createElement(`label`);v.className=`jump-duration`;let y=document.createElement(`input`);y.type=`number`,y.min=`0`,y.step=`any`,y.value=`15`,y.required=!0,v.append(y);let b=document.createElement(`select`);b.className=`jump-unit`,b.setAttribute(`aria-label`,t(`time.jumpUnit`)),b.title=t(`time.jumpUnit`);for(let e of[`days`,`years`]){let n=document.createElement(`option`);n.value=e,n.textContent=t(e===`days`?`time.unitDays`:`time.unitYears`),b.append(n)}b.value=`days`;let x=document.createElement(`p`);x.id=`jump-limit`,x.hidden=!0;let S=document.createElement(`p`);S.className=`jump-details`,S.id=`jump-validation`,S.setAttribute(`role`,`alert`),y.setAttribute(`aria-describedby`,`jump-limit jump-validation`),y.setAttribute(`aria-label`,t(`time.days`));let C=u(`time.cancel`);C.hidden=!0;let w=u(`time.resumeJump`);w.hidden=!0;let T=u(`time.adoptJump`);T.hidden=!0;let E=document.createElement(`label`);E.className=`preview-option`;let D=document.createElement(`input`);D.type=`checkbox`,D.checked=!0,E.append(D,document.createTextNode(t(`time.previewToggle`)));let O=document.createElement(`progress`);O.max=100,O.value=0,O.hidden=!0,O.setAttribute(`aria-label`,t(`time.progress`));let k=document.createElement(`p`);k.className=`jump-target`;let A=document.createElement(`p`);A.className=`jump-details jump-steps`;let j=document.createElement(`p`);j.className=`jump-details`;let M=document.createElement(`p`);M.className=`jump-details jump-eta`;let N=document.createElement(`p`);N.className=`jump-details`,_.append(h,v,b);let P=document.createElement(`div`);P.className=`jump-progress`,P.hidden=!0,P.append(w,T,C,O,A,j,M,N,k);let F=document.createElement(`p`);F.className=`time-notice`,F.setAttribute(`role`,`status`),F.textContent=t(`time.loading`);let I=document.createElement(`div`);I.className=`time-row`,I.hidden=!0;let L=u(`time.resumeLocal`),ee=u(`time.cancelLocal`);I.append(L,ee);let te=document.createElement(`details`);te.className=`time-details`;let ne=document.createElement(`summary`);ne.textContent=t(`time.preferences`),te.append(ne);let R=document.createElement(`label`);R.className=`precise-speed`,R.textContent=t(`time.preciseSpeed`),R.append(p),te.append(R,g),te.append(E),i.append(c,m.element,a,x,S,P,F,I);let re=Ip(i),z=Qp(i,n,te);zu(z.undo,t(`history.undo`),`undo`),zu(z.redo,t(`history.redo`),`redo`),c.replaceChildren(z.undo,f,_,z.redo),e.append(i);let B,V=!1,ie=0,H=!1,ae=!1,oe=()=>{w.disabled=T.disabled=V||H,L.disabled=ee.disabled=V||H,f.disabled=!V&&(H||!!B?.jump||!!B?.localStep||B?.physicsIssue?.scope===`live`&&!B.edit),p.disabled=V||H||!!B?.jump||!!B?.localStep,m.sync(),g.disabled=V||H||ae||!!B?.jump||!!B?.localStep,y.disabled=b.disabled=V||H||ae||!!B?.localStep||!!B?.jump,C.disabled=H||(B?.jump?.ready??!1),z.update(B,V||H||ae||!!B?.jump||!!B?.edit||!!B?.localStep),z.redo.hidden=!B?.history?.redo,U()},U=()=>{let e=B?.state.config.timeStepSeconds??300,n=o(e),r=b.value===`years`?365.25:1;y.min=String(n.min/r),y.max=String(n.max/r),x.textContent=t(`time.jumpLimitBrief`,{days:rm(n.max)}),y.title=t(`time.exactRange`,{minimum:y.min,maximum:y.max,unit:t(b.value===`years`?`time.unitYears`:`time.unitDays`)}),y.setAttribute(`aria-label`,t(b.value===`years`?`time.years`:`time.days`));let i=y.valueAsNumber,a=s(i===n.max/r?n.max:i===n.min/r?n.min:i*r,e),c=Number.isFinite(y.valueAsNumber)&&y.valueAsNumber>0?em(y.valueAsNumber,2):`–`;return h.title=t(`time.jumpDuration`,{amount:c,unit:t(b.value===`years`?`time.unitYears`:`time.unitDays`)}),h.setAttribute(`aria-description`,h.title),S.textContent=a.ok?t(`time.roundedJumpBrief`,{duration:d(a.seconds)}):a.error===`STEP_BUDGET`?t(`time.jumpUnitLimit`,{amount:em(n.max/r,2),unit:t(b.value===`years`?`time.unitYears`:`time.unitDays`)}):t(`time.invalid`),S.title=a.ok?t(`time.roundedJump`,{steps:a.steps,seconds:a.seconds}):y.title,S.hidden=a.ok,y.setAttribute(`aria-invalid`,String(!a.ok)),h.disabled=V||H||ae||B?.physicsIssue?.scope===`live`||!!B?.jump||!!B?.localStep||!a.ok,a};y.oninput=()=>{U()},b.onchange=()=>{z.clearFeedback(),U()},U(),y.onkeydown=e=>{e.key===`Enter`&&(e.preventDefault(),y.blur())};let W=e=>{z.clearFeedback(),e()};return f.onclick=()=>W(()=>n.play(V||B?.error&&B.physicsIssue?.scope!==`live`?!0:!B?.playing)),p.onchange=()=>{m.sync(),W(()=>n.speed(Number(p.value)))},y.onclick=()=>{z.clearFeedback(),y.select?.()},_.onsubmit=e=>{e.preventDefault();let t=U();t.ok&&!h.disabled&&(F.textContent=``,W(()=>n.jump(t.seconds)))},C.onclick=()=>W(n.cancel),g.onclick=()=>W(n.restore),w.onclick=()=>W(n.resume),T.onclick=()=>W(n.adopt),D.onchange=()=>W(()=>n.preview(D.checked)),L.onclick=()=>W(()=>n.resumeLocal?.()),ee.onclick=()=>W(()=>n.cancelLocal?.()),{settingsElement:te,setEditorBusy(e){e&&!ae&&z.clearFeedback(),ae=e,oe(),U()},setOperationPending(e){e&&!H&&z.clearFeedback(),H=e,oe()},update(e){B=e,V=!1,re.update(e.physicsIssue),a.textContent=t(`time.current`,{date:l(e.state.elapsedSeconds)}),i.dataset.elapsedSeconds=String(e.state.elapsedSeconds),i.dataset.stateVersion=String(e.version),i.dataset.bodyCount=String(e.state.bodies.length),i.dataset.editId=e.edit?.editId??``,i.dataset.computeSteps=String(e.stats.steps),i.dataset.computeMs=String(e.stats.computeMs),i.dataset.maxBatchMs=String(e.stats.maxBatchMs),i.dataset.updates=String(++ie),i.dataset.batches=String(e.stats.batches),i.dataset.batchWaitMs=String(e.stats.batchWaitMs),i.dataset.maxBatchWaitMs=String(e.stats.maxBatchWaitMs),i.dataset.lastJump=JSON.stringify(e.stats.lastJump??null);for(let[t,n]of Object.entries(e.stats.transport??{}))i.dataset[t]=String(n);let n=e.physicsIssue?.scope===`live`;i.dataset.physicsBlocked=String(n),f.disabled=!!e.jump||!!e.localStep||n&&!e.edit,p.disabled=!!e.jump||!!e.localStep,zu(f,t(n&&!e.edit?`risk.paused`:e.error&&!n?`time.continue`:e.playing?`time.pause`:`time.play`),e.error&&!n?`restart`:e.playing&&!n?`pause`:`play`),p.value=String(e.speedIndex),i.dataset.actualSpeed=String(e.actualSpeed),g.hidden=!e.recovery,g.disabled=ae||!!e.jump||!!e.localStep;let r=e.jump,o=e.localStep,s=r?.phase===`budget-paused`?null:o;i.dataset.localPhase=o?.phase??``,i.dataset.localRound=String(o?.round??0),i.dataset.localAttempts=String(o?.work.attempts??0),i.dataset.localEvaluations=String(o?.work.evaluationsUsed??0),I.hidden=!s,L.hidden=s?.phase!==`budget-paused`,ee.hidden=!s,i.dataset.jobPhase=r?.phase??``,i.dataset.jobCompleted=String(r?.completedSteps??0),i.dataset.jobTotal=String(r?.totalSteps??0),i.dataset.jobRound=String(r?.round??0),i.dataset.jobWallMs=String(r?.wallMs??0),i.dataset.jobComputeMs=String(r?.computeMs??0),i.dataset.jobWaitingMs=String(r?.waitingMs??0),U(),P.hidden=!r,C.hidden=!r||!!s,w.hidden=r?.phase!==`budget-paused`,T.hidden=r?.phase!==`budget-paused`||r.completedSteps<1,oe(),D.checked=e.previewEnabled;let c=!!r&&(r.wallMs>=250||r.phase!==`computing`);O.hidden=!c,O.value=r?r.completedSteps/r.totalSteps*100:0,A.hidden=j.hidden=M.hidden=N.hidden=!c,A.textContent=r?t(`time.steps`,{completed:r.completedSteps.toLocaleString(`zh-CN`),total:r.totalSteps.toLocaleString(`zh-CN`),round:r.round}):``,j.textContent=r?t(`time.candidateDate`,{date:l(r.candidateSeconds)}):``;let u=r?.remainingSeconds;M.textContent=u==null?t(`time.estimating`):u<60?t(`time.etaSeconds`,{seconds:Math.ceil(u/5)*5}):t(`time.etaMinutes`,{minutes:Math.ceil(u/60)}),M.hidden=!c||r?.phase!==`computing`,k.textContent=r?t(`time.target`,{date:l(r.targetSeconds)}):``,F.textContent=s?t(s.phase===`budget-paused`?`time.localPaused`:`time.localComputing`,{round:s.round,attempts:s.work.attempts,limit:s.work.attemptLimit}):e.physicsIssue?(e.physicsIssue.scope===`jump`?t(`risk.jumpStopped`):t(`risk.liveStopped`))+$p(e.physicsIssue.error,e.state.bodies)+t(e.physicsIssue.error.code===`COLLISION_BUDGET`?`risk.budgetAdjust`:e.physicsIssue.scope===`jump`?`risk.jumpAdjust`:`risk.adjust`)+(e.history?.experimentStart?t(`risk.experimentAvailable`):``)+(e.history?.undo?t(`risk.undoAvailable`):``)+(e.history?.checkpoints.length?t(`risk.checkpointAvailable`):e.recovery?t(`risk.recoveryAvailable`):``):e.error?t(e.error===`STEP_BUDGET`?`time.stepBudget`:e.error===`COMMIT_TIMEOUT`?`time.commitTimeout`:e.error===`TIME_BUDGET`?`time.wallBudget`:e.error===`INVALID_DURATION`?`time.invalid`:`time.physicsError`):r?.ready?t(`time.ready`):r?.phase===`budget-paused`?t(r.completedSteps>0?`time.budgetPaused`:`time.budgetPausedEmpty`):!e.playing&&e.recovery&&e.stats.lastJump?.outcome===`adopted`&&e.state.elapsedSeconds===e.stats.lastJump.actualSeconds?t(`time.adopted`,{date:l(e.stats.lastJump.actualSeconds)}):e.limited?t(`time.limited`):``,e.previewEnabled||(N.textContent=t(`time.previewOff`))},updatePreview(e){i.dataset.previewSeconds=e?String(e.elapsedSeconds):``,N.textContent=e?t(`time.previewDate`,{date:l(e.elapsedSeconds)}):t(`time.previewOff`)},fail(){V=!0,f.disabled=!1,zu(f,t(`time.continue`),`restart`),p.disabled=!0,m.sync(),h.disabled=!0,C.hidden=!0,w.hidden=!0,T.hidden=!0,I.hidden=!0,F.textContent=t(`time.workerError`),oe()},dispose(){i.remove(),te.remove()}}}function om(e,t){return!!e&&Array.isArray(e.undo)&&e.undo.length<=30&&Array.isArray(e.redo)&&e.redo.length<=30&&Array.isArray(e.checkpoints)&&e.checkpoints.length<=10&&Number.isSafeInteger(e.serial)&&e.serial>=0&&Number.isSafeInteger(e.revision)&&e.revision>=0&&[...e.undo,...e.redo,...e.checkpoints].every(e=>!!e&&[`create`,`edit`,`delete`,`restore`,`jump`].includes(e.label)&&t(e.state))&&e.checkpoints.every((t,n)=>Number.isSafeInteger(t.id)&&t.id>0&&t.id<=e.serial&&(n===0||t.id>e.checkpoints[n-1].id))&&(e.experimentStart===void 0||t(e.experimentStart))}function sm(e){return!!e&&e.schemaVersion===1&&Number.isFinite(e.elapsedSeconds)&&e.elapsedSeconds>=0&&!!e.config&&O(e.bodies,e.config.timeStepSeconds).ok}function cm(e,t){return!!e&&typeof e.taskId==`string`&&Number.isSafeInteger(e.baseVersion)&&e.baseVersion===t.version&&Number.isSafeInteger(e.completedSteps)&&Number.isSafeInteger(e.totalSteps)&&e.totalSteps>0&&e.totalSteps<=1e6&&e.completedSteps>=0&&e.completedSteps<=e.totalSteps&&Number.isSafeInteger(e.round)&&e.round>=1&&[`computing`,`budget-paused`,`ready`].includes(e.phase)&&e.ready===(e.phase===`ready`)&&(e.phase!==`ready`||e.completedSteps===e.totalSteps)&&e.candidateSeconds===t.state.elapsedSeconds+e.completedSteps*t.state.config.timeStepSeconds&&e.targetSeconds===t.state.elapsedSeconds+e.totalSteps*t.state.config.timeStepSeconds&&[e.candidateSeconds,e.targetSeconds,e.computeMs,e.wallMs,e.waitingMs].every(e=>Number.isFinite(e)&&e>=0)&&(e.stepsPerSecond===null||Number.isFinite(e.stepsPerSecond)&&e.stepsPerSecond>0)&&(e.remainingSeconds===null||Number.isFinite(e.remainingSeconds)&&e.remainingSeconds>=0)}function lm(e,t,n){let r=e.bodies??n.state.bodies;return e.bodies&&!sm({...n.state,bodies:e.bodies})?!1:e.taskId===t.taskId&&e.baseVersion===t.baseVersion&&e.completedSteps===t.completedSteps&&e.elapsedSeconds===t.candidateSeconds&&Array.isArray(e.positions)&&e.positions.length===r.length&&e.positions.every((e,t)=>e.id===r[t].id&&v(e.positionM))}function um(e){let t=e.localStep;if(!t)return!0;let n=t.work;return typeof t.taskId==`string`&&!!t.taskId&&t.baseVersion===e.version&&[`play`,`jump`].includes(t.operation)&&[`computing`,`budget-paused`].includes(t.phase)&&(t.operation!==`jump`||!!e.jump&&e.jump.phase!==`ready`)&&Number.isSafeInteger(t.round)&&t.round>=1&&!!n&&[n.attempts,n.evaluationsUsed].every(e=>Number.isSafeInteger(e)&&e>=0)&&n.attempts<=n.attemptLimit&&n.evaluationsUsed<=n.evaluationLimit&&n.localBudgetElapsedMs!==null&&Number.isFinite(n.localBudgetElapsedMs)&&n.localBudgetElapsedMs>=0}var dm=class{initial;options;port;sessionId=``;commandId=0;sequence=0;last;pendingTask=null;pendingRequestId=0;pendingEndId=0;pendingStep=0;cancelledTask=null;committedTask=null;disposed=!1;previewEnabled=!0;previewRequestId=0;operationId=0;pendingEdit=null;pendingCreation=null;creating=!1;archive;pendingRecovery=null;constructor(e,t){this.initial=e,this.options=t,this.start(e,t.initialPlaying??!0,null)}send(e){this.port?.postMessage({...e,sessionId:this.sessionId,commandId:++this.commandId})}lockOperation(){this.operationId=this.commandId+1,this.options.onOperationPending?.(!0)}acknowledgeOperation(e){this.operationId&&e>=this.operationId&&(this.operationId=0,this.options.onOperationPending?.(!1))}fail=()=>{this.port?.terminate(),this.port=void 0,this.pendingTask=null,this.pendingEdit=null,this.pendingCreation=null,this.creating=!1,this.pendingRecovery=null,this.acknowledgeOperation(1/0),this.options.onPreview?.(null),this.options.onFailure()};ready(e,t){t<this.pendingRequestId||e.taskId!==this.pendingTask||e.taskId===this.cancelledTask||(this.pendingStep=Math.max(this.pendingStep,e.completedSteps),e.ready&&e.taskId!==this.committedTask&&(this.committedTask=e.taskId,this.pendingEndId=this.commandId+1,this.send({type:`commitJump`,taskId:e.taskId,baseVersion:e.baseVersion})))}start(e,t,n){if(this.disposed)return;this.port?.terminate(),this.sessionId=crypto.randomUUID(),this.commandId=0,this.sequence=0,this.pendingTask=null,this.pendingRequestId=0,this.pendingEndId=0,this.pendingStep=0,this.cancelledTask=null,this.committedTask=null,this.pendingEdit=null,this.pendingCreation=null,this.creating=!1,this.pendingRecovery=null,this.acknowledgeOperation(1/0),this.options.onPreview?.(null),this.port=this.options.createWorker?.()??new Worker(new URL(`/planet-simulator/assets/physics.worker-CKVmXur_.js`,``+import.meta.url),{type:`module`});let r=this.port;r.onmessage=e=>{if(this.port!==r||this.disposed)return;let t=e.data;if(!t||t.sessionId!==this.sessionId||!Number.isSafeInteger(t.sequence)||t.sequence<=this.sequence||!Number.isSafeInteger(t.commandId)||t.commandId<1||t.commandId>this.commandId)return;if(`kind`in t&&t.kind===`jump`){if(!this.last||t.version!==this.last.version||t.commandId<this.pendingRequestId||t.jump?.taskId!==this.pendingTask||this.cancelledTask===this.pendingTask||this.committedTask===this.pendingTask||!cm(t.jump,this.last)||t.jump.completedSteps<this.pendingStep||this.last.jump?.taskId===t.jump.taskId&&t.jump.round<this.last.jump.round)return;if(t.preview&&!lm(t.preview,t.jump,this.last)){this.fail();return}this.sequence=t.sequence,this.pendingStep=t.jump.completedSteps,this.last={...this.last,jump:{...t.jump},stats:{...t.stats}},this.acknowledgeOperation(t.commandId),this.ready(t.jump,t.commandId),this.options.onSnapshot(structuredClone(this.last)),t.preview&&this.previewEnabled&&this.cancelledTask!==t.jump.taskId&&this.options.onPreview?.(t.preview);return}if(!(`snapshot`in t))return;if(!t.snapshot||!um(t.snapshot)||t.snapshot.collisions&&!M(t.snapshot.collisions)||!Number.isSafeInteger(t.snapshot.version)||t.snapshot.version<0||!sm(t.snapshot.state)||t.snapshot.collisionContext&&!Rp(t.snapshot.collisionContext,t.snapshot.collisions??[],t.snapshot.state)||t.snapshot.physicsIssue?.diagnostic&&(!Lp(t.snapshot.physicsIssue.diagnostic,sm)||t.snapshot.physicsIssue.diagnostic.operation!==(t.snapshot.physicsIssue.scope===`live`?`play`:`jump`))||t.snapshot.recovery!==null&&!sm(t.snapshot.recovery)){this.fail();return}if(this.sequence>0&&this.last&&(t.snapshot.version<this.last.version||(t.snapshot.collisionContext?.revision??0)<(this.last.collisionContext?.revision??0)))return;if(t.snapshot.edit&&(!Number.isSafeInteger(t.snapshot.edit.baseVersion)||t.snapshot.edit.baseVersion!==t.snapshot.version||!t.snapshot.state.bodies.some(e=>e.id===t.snapshot.edit.bodyId))||t.snapshot.jump&&!cm(t.snapshot.jump,t.snapshot)){this.fail();return}if(t.snapshot.jump&&(t.snapshot.jump.taskId!==this.pendingTask||t.commandId<this.pendingRequestId||t.snapshot.jump.completedSteps<this.pendingStep||this.last?.jump?.taskId===t.snapshot.jump.taskId&&t.snapshot.jump.round<this.last.jump.round))return;if(t.historyArchive){if(!om(t.historyArchive,sm)||t.historyArchive.revision!==t.snapshot.history?.revision){this.fail();return}this.archive=structuredClone(t.historyArchive)}this.pendingRecovery&&t.commandId>=this.pendingRecovery.requestId&&t.snapshot.recoveryResult?.requestId===this.pendingRecovery.id&&(this.pendingRecovery=null);let n=t.commandId<this.previewRequestId?this.previewEnabled:t.snapshot.previewEnabled;this.previewEnabled=n,this.sequence=t.sequence,this.last=structuredClone({...t.snapshot,previewEnabled:n}),this.acknowledgeOperation(t.commandId);let i=t.snapshot.jump;i&&this.ready(i,t.commandId),!i&&this.pendingTask&&t.commandId>=this.pendingRequestId&&t.commandId>=this.pendingEndId&&(this.pendingTask=null,this.pendingRequestId=0,this.pendingEndId=0,this.pendingStep=0,this.committedTask=null,this.cancelledTask=null,this.options.onPreview?.(null)),this.options.onSnapshot({...t.snapshot,previewEnabled:n});let a=this.pendingEdit,o=t.snapshot.edit,s=t.snapshot.mutation;if(a&&t.commandId>=a.requestId){o?.editId===a.id&&!a.ready&&!a.endId&&(a.ready=!0,this.options.onEditReady?.({...o},sp(this.last.state.bodies.find(e=>e.id===o.bodyId))));let e=a.endId||(a.ready?0:a.requestId);e&&s?.transactionId===a.id&&t.commandId>=e&&(s.outcome===`rejected`&&o?.editId===a.id?a.endId=0:this.pendingEdit=null,this.options.onMutation?.({...s}))}let c=this.pendingCreation;c&&t.commandId>=c.requestId&&s?.transactionId===c.id&&(this.pendingCreation=null,s.outcome===`committed`&&(this.creating=!1),this.options.onMutation?.({...s}))},r.onerror=e=>{e.preventDefault(),this.port===r&&this.fail()},r.onmessageerror=()=>{this.port===r&&this.fail()},this.send({type:`initialize`,state:k(e),playing:t,recovery:n===null?null:k(n),...this.archive?{history:structuredClone(this.archive)}:{},...this.last?.collisions?{collisionLog:structuredClone(this.last.collisions)}:{},...this.last?.collisionContext?{collisionContext:structuredClone(this.last.collisionContext)}:{}}),this.last&&(this.send({type:`speed`,index:this.last.speedIndex}),this.setPreview(this.previewEnabled))}play(e){this.disposed||(this.port?this.pendingRecovery||this.last?.localStep||this.send({type:`play`,playing:e}):this.restart())}setSpeed(e){this.pendingRecovery||this.last?.localStep||this.send({type:`speed`,index:e})}setPreview(e){this.disposed||(this.previewEnabled=e,this.previewRequestId=this.commandId+1,this.send({type:`preview`,enabled:e}),e||this.options.onPreview?.(null))}beginJump(e){this.disposed||this.pendingRecovery||this.pendingTask||this.pendingEdit||this.pendingCreation||this.creating||this.last?.localStep||!this.port||(this.pendingTask=crypto.randomUUID(),this.cancelledTask=null,this.committedTask=null,this.pendingStep=0,this.pendingRequestId=this.commandId+1,this.pendingEndId=0,this.send({type:`beginJump`,taskId:this.pendingTask,durationSeconds:e}))}resumeJump(){this.pendingTask&&!this.operationId&&!this.cancelledTask&&!this.committedTask&&this.last?.jump?.phase===`budget-paused`&&(this.lockOperation(),this.send({type:`resumeJump`,taskId:this.pendingTask,pausedRound:this.last.jump.round}))}cancelJump(){if(!this.pendingTask||this.operationId||this.committedTask||this.cancelledTask===this.pendingTask)return;this.lockOperation(),this.cancelledTask=this.pendingTask,this.pendingEndId=this.commandId+1,this.options.onPreview?.(null);let e=this.last?.jump;this.send(e?.phase===`budget-paused`?{type:`cancelJump`,taskId:this.pendingTask,pausedRound:e.round,baseVersion:e.baseVersion}:{type:`cancelJump`,taskId:this.pendingTask})}adoptJump(){let e=this.last?.jump;!this.pendingTask||this.operationId||this.cancelledTask||this.committedTask||!e||e.taskId!==this.pendingTask||e.phase!==`budget-paused`||e.completedSteps<1||(this.lockOperation(),this.committedTask=this.pendingTask,this.pendingEndId=this.commandId+1,this.send({type:`adoptJump`,taskId:this.pendingTask,pausedRound:e.round,baseVersion:e.baseVersion}))}resumeLocalStep(){let e=this.last?.localStep;this.port&&e&&e.phase===`budget-paused`&&!this.operationId&&!this.disposed&&(this.lockOperation(),this.send({type:`resumeLocalStep`,taskId:e.taskId,baseVersion:e.baseVersion,pausedRound:e.round}))}cancelLocalStep(){let e=this.last?.localStep;this.port&&e&&!this.operationId&&!this.disposed&&(this.lockOperation(),this.send({type:`cancelLocalStep`,taskId:e.taskId,baseVersion:e.baseVersion,pausedRound:e.round}))}restore(){!this.pendingTask&&!this.pendingRecovery&&!this.pendingEdit&&!this.pendingCreation&&!this.creating&&this.send({type:`restore`})}get taskBlocked(){return this.disposed||!this.port||!!this.pendingRecovery||!!this.pendingTask||!!this.pendingCreation||!!this.pendingEdit||!!this.last?.localStep}get storageBlocked(){return this.taskBlocked||this.creating||!!this.operationId}get editingBlocked(){return this.taskBlocked||!!this.last?.galleryOpen}setGallery(e){this.storageBlocked||(this.lockOperation(),this.send({type:`gallery`,open:e}))}loadScene(e){if(this.storageBlocked||!this.last||!N(e))return!1;let t=crypto.randomUUID();return this.pendingRecovery={id:t,requestId:this.commandId+1},this.lockOperation(),this.send({type:`loadScene`,state:k(e),requestId:t,baseVersion:this.last.version}),t}historyArchive(){return this.archive?structuredClone(this.archive):null}recover(e,t){if(this.editingBlocked||this.creating||!this.last?.history)return;let n=crypto.randomUUID();this.pendingRecovery={id:n,requestId:this.commandId+1},this.lockOperation(),this.send({type:`history`,operation:e,requestId:n,baseVersion:this.last.version,historyRevision:this.last.history.revision,...t===void 0?{}:{checkpointId:t}})}deleteBody(e){if(this.editingBlocked||this.creating||!this.last?.history)return;let t=crypto.randomUUID();this.pendingRecovery={id:t,requestId:this.commandId+1},this.lockOperation(),this.send({type:`deleteBody`,bodyId:e,requestId:t,baseVersion:this.last.version,historyRevision:this.last.history.revision})}setCreating(e){return e&&this.editingBlocked?!1:(this.creating=e,!0)}beginEdit(e){if(this.editingBlocked||this.creating)return!1;let t=crypto.randomUUID();return this.pendingEdit={id:t,requestId:this.commandId+1,endId:0,ready:!1},this.send({type:`beginEdit`,editId:t,bodyId:e}),!0}commitEdit(e){let t=this.pendingEdit,n=this.last?.edit;return!t||!t.ready||t.endId||n?.editId!==t.id?!1:(t.endId=this.commandId+1,this.send({type:`commitEdit`,editId:t.id,baseVersion:n.baseVersion,body:sp(e)}),!0)}cancelEdit(){let e=this.pendingEdit;return!e||e.endId?!1:(e.endId=this.commandId+1,this.send({type:`cancelEdit`,editId:e.id}),!0)}createBody(e,t,n=`circular`,r){if(this.editingBlocked)return!1;let i=crypto.randomUUID();return this.pendingCreation={id:i,requestId:this.commandId+1},this.send({type:`createBody`,creationId:i,body:sp(e),...t?{referenceId:t,creationMotion:n}:{},...r?{placement:structuredClone(r)}:{}}),!0}restart(){this.start(this.last?.state??this.initial,!1,this.last?.recovery??null)}dispose(){this.cancelEdit(),this.disposed=!0,this.port?.terminate(),this.port=void 0,this.pendingTask=null,this.pendingEdit=null,this.pendingCreation=null}},fm=class{client;changed;selectedId=null;tool=`position`;phase=`viewing`;candidate=null;creationReferenceId=null;creationMotion=`circular`;creationSuggestionKey=``;originalBody=null;error=null;errorDetails=null;feedback=null;settlement=null;gesture=null;gestureSerial=0;state=null;revision=0;get generation(){return this.revision}get creating(){return this.creationSpec!==null}readyCallback=null;previousSelection=null;creationSpec=null;clearCreation(){this.creationSpec=null,this.creationPlacement=null,this.placementAnchorId=null}creationPlacement=null;placementAnchorId=null;get creationOrigin(){return this.state?.state.bodies.find(e=>e.id===this.placementAnchorId)?.positionM??{x:0,y:0,z:0}}creationPosition(e,t){if(!this.creationSpec)return{...e};let n=this.creationOrigin;return{x:e.x+(n.x-t.x),y:e.y+(n.y-t.y),z:e.z+(n.z-t.z)}}rememberPlacement(){if(!this.candidate||!this.placementAnchorId)return;if(!v(this.candidate.positionM)){this.creationPlacement=null;return}let e=this.candidate.positionM,t=this.creationOrigin;this.creationPlacement={anchorId:this.placementAnchorId,offsetM:{x:e.x-t.x,y:e.y-t.y,z:e.z-t.z}}}constructor(e,t){this.client=e,this.changed=t}get body(){return this.candidate??this.state?.state.bodies.find(e=>e.id===this.selectedId)??null}get busy(){return this.phase!==`viewing`}get blocked(){return!!this.state?.jump||this.client.editingBlocked}update(e){let t=e.recoveryResult?.outcome===`committed`&&e.recoveryResult.requestId!==this.state?.recoveryResult?.requestId;if(this.state=e,this.creationPlacement&&this.creationSpec&&[`creating-preview`,`editing-new`,`committing`].includes(this.phase)){let t=ap(this.creationPlacement,e.state.bodies);if(t.ok&&this.candidate)this.candidate={...this.candidate,positionM:t.value};else if(!t.ok){this.error=`PLACEMENT_REFERENCE_MISSING`,this.errorDetails=null,this.changed();return}}t&&this.phase===`viewing`&&(this.feedback=null,this.originalBody=null),this.phase===`viewing`&&this.selectedId&&!e.state.bodies.some(e=>e.id===this.selectedId)&&(this.selectedId=null,this.feedback=null,this.originalBody=null),this.phase===`viewing`&&this.feedback?.kind===`worker-failed`&&(this.error=null,this.feedback=null),this.phase===`editing-new`&&this.refreshCreationVelocity(),this.changed()}refreshCreationVelocity(e=!1){if(!this.candidate||this.phase!==`editing-new`)return;if(this.placementAnchorId&&!this.state?.state.bodies.some(e=>e.id===this.placementAnchorId)){this.error=`PLACEMENT_REFERENCE_MISSING`,this.errorDetails=null;return}let t=this.state?.state.bodies.find(e=>e.id===this.creationReferenceId)??null,n=JSON.stringify([this.creationMotion,this.creationReferenceId,this.candidate.positionM,this.candidate.massKg,this.candidate.radiusM,t]);if(!e&&n===this.creationSuggestionKey)return;this.creationSuggestionKey=n;let r=x([this.candidate]);if(!r.ok){this.error=r.error.code;return}let i=xp(this.candidate,t,this.creationMotion);i.ok?(this.candidate={...this.candidate,velocityMS:i.value},this.error=null,this.errorDetails=null):(this.error=i.error.field===`referenceBody`?`REFERENCE_REQUIRED`:i.error.field===`orbitalPlane`?`INVALID_ORBITAL_PLANE`:i.error.code,this.errorDetails=i.error)}selectCreationReference(e){this.phase===`editing-new`&&(this.creationReferenceId=e||null,this.refreshCreationVelocity(!0),this.changed())}selectCreationMotion(e){this.phase===`editing-new`&&[`circular`,`inherit`].includes(e)&&(this.creationMotion=e,this.refreshCreationVelocity(!0),this.changed())}deleteSelected(){!this.busy&&!this.blocked&&this.selectedId&&this.client.deleteBody(this.selectedId)}inspectCollisionResult(e){if(this.busy||this.blocked||!this.state)return;let t=zp(this.state,e);t&&(this.select(t),this.setTool(`mass`))}select(e){this.busy||(this.selectedId=e,this.error=null,this.errorDetails=null,this.feedback=null,this.originalBody=null,this.changed())}get canSwitchTool(){return!this.gesture&&[`viewing`,`editing-existing`,`editing-new`].includes(this.phase)}get canEditValues(){return!this.gesture&&[`editing-existing`,`editing-new`].includes(this.phase)}get canStartGesture(){return!this.gesture&&this.error!==`INVALID_INPUT`&&[`viewing`,`editing-existing`,`editing-new`].includes(this.phase)&&!!this.body&&(this.phase!==`viewing`||!this.blocked)}get hasGesture(){return this.gesture!==null}get holdsObservation(){return this.phase===`editing-existing`||this.phase===`committing`&&this.creationSpec===null}get hasChanges(){let e=this.candidate,t=this.originalBody;return!e||!t?!1:e.name!==t.name||e.massKg!==t.massKg||e.radiusM!==t.radiusM||!_(e.displaySpin,t.displaySpin)||[`x`,`y`,`z`].some(n=>e.positionM[n]!==t.positionM[n]||e.velocityMS[n]!==t.velocityMS[n])}setTool(e){this.canSwitchTool&&(this.tool=e,this.changed())}ownsGesture(e){return this.gesture?.token===e}beginGesture(e,t,n){if(!this.canStartGesture)return!1;let r={token:++this.gestureSerial,stage:`waiting`,prepare:e,apply:t};this.gesture=r,n(r.token);let i=()=>{this.gesture===r&&this.candidate&&(!r.prepare(this.candidate)||!r.apply()?this.cancel(`invalid-position`):r.stage===`released`?(this.gesture=null,this.finishDrag()):(r.stage=`active`,this.changed()))};if(this.phase===`editing-new`||this.phase===`editing-existing`)i();else if(!this.startExisting(i))return this.gesture=null,this.changed(),!1;return!0}moveGesture(e){this.ownsGesture(e)&&this.gesture.stage===`active`&&!this.gesture.apply()&&this.cancel(`invalid-position`)}endGesture(e){if(!this.ownsGesture(e))return;let t=this.gesture;t.stage===`waiting`?t.stage=`released`:t.apply()?(this.gesture=null,this.finishDrag()):this.cancel(`invalid-position`)}startExisting(e){return this.phase===`editing-existing`?(e?.(),!0):this.busy||!this.selectedId||!this.client.beginEdit(this.selectedId)?(this.error=`EDITOR_BUSY`,this.changed(),!1):(this.clearCreation(),this.revision++,this.phase=`awaiting-freeze`,this.error=null,this.errorDetails=null,this.feedback=null,this.readyCallback=e??null,this.changed(),!0)}freezeReady(e,t){if(this.phase!==`awaiting-freeze`)return;this.candidate=sp(t),this.originalBody=sp(t),this.phase=`editing-existing`,this.changed();let n=this.readyCallback;this.readyCallback=null,n?.()}beginCreate(e,t,n,r=null,i=null){if(this.busy||!this.client.setCreating(!0))return this.error=`EDITOR_BUSY`,this.changed(),!1;let a=1,o=new Set(this.state?.state.bodies.map(e=>e.name));for(;o.has(`${n} ${a}`);)a++;return this.creationReferenceId=this.state?.state.bodies.some(e=>e.id===r)?r:null,this.creationMotion=`circular`,this.creationSuggestionKey=``,this.creationSpec={kind:e,id:crypto.randomUUID(),name:`${n} ${a}`},this.placementAnchorId=i,this.creationPlacement=null,this.revision++,this.previousSelection=this.selectedId,this.candidate=null,this.phase=`creating-preview`,this.tool=`position`,this.feedback=null,this.errorDetails=null,this.originalBody=null,this.error=`INVALID_PLACEMENT`,t?this.place(t):this.changed(),!0}place(e){if(this.phase!==`creating-preview`||!this.creationSpec)return;if(!e){this.error=`INVALID_PLACEMENT`,this.changed();return}let t=this.creationSpec;this.candidate=this.candidate?{...this.candidate,positionM:{...e}}:lp(t.kind,t.id,t.name,e),this.rememberPlacement(),this.originalBody??=sp(this.candidate),this.selectedId=t.id,this.error=null,this.changed()}releaseCreation(){this.phase===`creating-preview`&&(!this.candidate||this.error===`INVALID_PLACEMENT`?this.cancel(`invalid-position`):(this.phase=`editing-new`,this.refreshCreationVelocity(),this.changed()))}change(e){if(!this.candidate||![`editing-existing`,`editing-new`].includes(this.phase))return;this.candidate=cp({...this.candidate,...e}),this.errorDetails=null,this.phase===`editing-new`&&e.positionM&&this.rememberPlacement();let t=x([this.candidate]);this.error=t.ok?null:t.error.code,t.ok&&this.phase===`editing-new`&&this.refreshCreationVelocity(!0),this.changed()}preset(e,t){if(!this.candidate)return;let n=this.state?.state.bodies.find(e=>e.id===t)??null,r=xp(this.candidate,n,e);r.ok?this.change({velocityMS:r.value}):(this.error=r.error.field===`referenceBody`?`REFERENCE_REQUIRED`:r.error.field===`orbitalPlane`?`INVALID_ORBITAL_PLANE`:r.error.code,this.changed())}confirm(){if(!this.candidate||this.gesture||![`editing-existing`,`editing-new`].includes(this.phase))return;if(this.phase===`editing-new`&&(this.refreshCreationVelocity(!this.error),this.error||!this.creationReferenceId)){this.feedback={kind:`rejected`},this.changed();return}let e=x([this.candidate]);e.ok?this.phase===`editing-existing`&&!this.hasChanges?this.cancel(`unchanged`):(this.phase===`editing-new`?this.client.createBody(this.candidate,this.creationReferenceId,this.creationMotion,this.creationPlacement??void 0):this.client.commitEdit(this.candidate))?(this.revision++,this.settlement=null,this.phase=`committing`,this.error=null,this.changed()):(this.error=`EDITOR_BUSY`,this.changed()):(this.error=e.error.code,this.changed())}finishDrag(){this.phase===`editing-existing`?this.confirm():this.phase===`editing-new`&&this.changed()}cancel(e=`user`){if(this.phase===`committing`||this.phase===`viewing`)return;this.readyCallback=null,this.gesture=null,this.revision++;let t=e===`user`?{kind:`cancelled`}:e===`unchanged`?{kind:`unchanged`}:e===`invalid-position`?{kind:`invalid-position`}:{kind:`interrupted`,cause:e};[`awaiting-freeze`,`editing-existing`].includes(this.phase)?this.client.cancelEdit()&&(this.settlement=t,this.phase=`committing`,this.candidate=null,this.changed()):(this.client.setCreating(!1),this.candidate=null,this.clearCreation(),this.selectedId=this.previousSelection,this.phase=`viewing`,this.error=null,this.errorDetails=null,this.feedback=t,this.changed())}mutation(e){this.revision++,e.outcome===`rejected`?(this.phase=this.candidate?e.kind===`create`?`editing-new`:`editing-existing`:`viewing`,this.error=e.error,this.errorDetails=e.details??null,this.feedback={kind:`rejected`},this.settlement=null,this.changed()):(this.candidate=null,this.clearCreation(),this.phase=`viewing`,this.error=null,this.errorDetails=null,this.feedback=e.outcome===`committed`?{kind:`committed`}:this.settlement??{kind:`cancelled`},this.settlement=null,this.changed())}fail(){this.revision++,this.readyCallback=null,this.gesture=null,this.settlement=null,this.feedback={kind:`worker-failed`},this.candidate=null,this.clearCreation(),this.phase=`viewing`,this.error=`WORKER_ERROR`,this.errorDetails=null,this.changed()}};new Intl.NumberFormat(`zh-CN`,{maximumSignificantDigits:4,notation:`compact`});function pm(e,t){let n=Up(e,t);return n===null?null:tm(n)}function mm(e,n){let r=document.createElement(`label`);r.className=`mass-value-label`;let i=document.createElement(`span`);i.textContent=t(`mass.value`),r.append(i);let a=document.createElement(`input`);a.type=`number`,a.className=`mass-value`,a.step=`any`,a.setAttribute(`aria-label`,t(`mass.value`));let o=document.createElement(`select`);o.className=`mass-unit`,o.setAttribute(`aria-label`,t(`mass.unit`));for(let e of Bp){let n=document.createElement(`option`);n.value=e,n.textContent=t(`mass.unit.${e}`),o.append(n)}let s=document.createElement(`p`);s.className=`editor-hint mass-input-hint`,s.setAttribute(`role`,`status`),s.hidden=!0,r.append(a,o),e.append(r,s);let c=null,l=`kg`,u=!1,d=e=>{s.textContent=e?t(e):``,s.hidden=!e},f=()=>{if(n.phase!==`viewing`||n.blocked)return;let e=n.selectedId;n.startExisting(()=>{n.selectedId===e&&n.phase===`editing-existing`&&a.focus()})};return a.onfocus=f,a.onclick=f,a.oninput=()=>{if(!n.canEditValues)return;let e=Hp(a.valueAsNumber,l);u=e===null,d(u?`mass.fixInput`:null),n.change({massKg:e??NaN})},o.onchange=()=>{if(!n.body)return;let e=o.value;u?(o.value=l,d(`mass.fixInput`)):Up(n.body.massKg,e)===null?(o.value=l,d(`mass.unitRange`)):(l=e,d(null),a.value=pm(n.body.massKg,l))},{update(){let e=n.body;if(!e)return;let t=n.canEditValues;c!==e.id&&(c=e.id,l=Wp(e.massKg),u=!1,d(null)),u&&Number.isFinite(e.massKg)&&e.massKg>0&&(u=!1,d(null),a.value=pm(e.massKg,l)??``),n.busy||(u=!1,d(null)),o.value=l,o.disabled=n.phase===`awaiting-freeze`||n.phase===`committing`||n.hasGesture,a.readOnly=!t,a.disabled=n.phase===`committing`,a.setAttribute(`aria-busy`,String(n.phase===`awaiting-freeze`)),!u&&(!t||document.activeElement!==a)&&(a.value=pm(e.massKg,l)??``)}}}function hm(e,n){let r=document.createElement(`details`);r.className=`display-spin-controls`,r.hidden=!0;let i=document.createElement(`summary`);i.textContent=t(`spin.title`);let a=document.createElement(`label`);a.textContent=t(`spin.period`);let o=document.createElement(`input`);o.type=`number`,o.step=`any`,o.min=String(m.minPeriodSeconds/3600),o.max=String(m.maxPeriodSeconds/3600),o.setAttribute(`aria-label`,t(`spin.period`)),a.append(o);let s=document.createElement(`label`);s.textContent=t(`spin.tilt`);let c=document.createElement(`input`);c.type=`number`,c.step=`any`,c.min=`0`,c.max=`180`,c.setAttribute(`aria-label`,t(`spin.tilt`)),s.append(c);let l=document.createElement(`label`);l.textContent=t(`spin.direction`);let u=document.createElement(`select`);u.setAttribute(`aria-label`,t(`spin.direction`));for(let[e,n]of[[`1`,`spin.prograde`],[`-1`,`spin.retrograde`]]){let r=document.createElement(`option`);r.value=e,r.textContent=t(n),u.append(r)}l.append(u);let d=document.createElement(`p`);d.className=`editor-hint`,d.textContent=t(`spin.illustrative`),r.append(i,a,s,l,d),e.append(r);let f=null,p=e=>{let t=n.candidate;if(!t||!n.canEditValues)return;let r=t.displaySpin??id(t.kind);if(!r)return;let i=n.state?.state.elapsedSeconds??0,a=h(r)?g(r,i):0;n.change({displaySpin:{...r,...e,phaseDegrees:a,epochSeconds:i}})},_=e=>{if(n.phase!==`viewing`||n.blocked)return;let t=n.selectedId;n.startExisting(()=>{n.selectedId===t&&n.phase===`editing-existing`&&e.focus()})};for(let e of[o,c])e.onfocus=()=>_(e),e.onclick=()=>_(e);return o.oninput=()=>p({periodSeconds:o.valueAsNumber*3600}),c.oninput=()=>p({tiltDegrees:c.valueAsNumber}),u.onchange=()=>{let e=Number(u.value),t=n.selectedId;n.phase===`viewing`?n.startExisting(()=>{n.selectedId===t&&p({direction:e})}):p({direction:e})},{update(e=!0){let t=n.body;if(r.hidden=!e||!t||t.kind===`black-hole`||_d(t),!t||r.hidden)return;f!==t.id&&(f=t.id,r.open=!1);let i=t.displaySpin??id(t.kind);for(let[e,t]of[[o,i.periodSeconds/3600],[c,i.tiltDegrees]])e.readOnly=!n.canEditValues,e.disabled=n.phase===`committing`||n.hasGesture,e.setAttribute(`aria-busy`,String(n.phase===`awaiting-freeze`)),(!n.canEditValues||document.activeElement!==e)&&(e.value=tm(t));u.value=String(i.direction),u.disabled=n.phase===`committing`||n.phase===`awaiting-freeze`||n.hasGesture||n.phase===`viewing`&&n.blocked}}}function gm(e,n,r){let i=document.createElement(`section`);i.className=`creation-entry`,i.setAttribute(`aria-label`,t(`creation.bar`));let a=document.createElement(`button`);a.type=`button`,a.className=`creation-toggle`,a.setAttribute(`aria-label`,t(`creation.add`)),a.title=t(`creation.add`),a.setAttribute(`aria-expanded`,`false`);let o=document.createElement(`span`);o.className=`creation-caption`,o.textContent=t(`creation.add`),a.append(o),zu(a,t(`creation.add`),`add`);let s=document.createElement(`div`);s.className=`creation-rail`,s.hidden=!0;let c=new Map,l=null;for(let i of u){let a=document.createElement(`button`);a.type=`button`,a.className=`creation-kind`,a.dataset.kind=i,a.setAttribute(`aria-label`,t(`creation.dragKind`,{kind:t(`kind.${i}`)})),a.title=t(`kind.${i}`);let o=document.createElement(`span`);o.className=`body-thumbnail thumbnail-${i}`,o.setAttribute(`aria-hidden`,`true`);let u=document.createElement(`span`);u.className=`creation-kind-name`,u.textContent=t(`kind.${i}`),a.append(o,u),a.onpointerdown=e=>{e.button!==0||n.busy||n.blocked||(l=a,r(e,i))},a.onclick=t=>{t.detail===0&&!n.busy&&!n.blocked&&a.dispatchEvent(new PointerEvent(`pointerdown`,{pointerId:1,clientX:e.clientWidth/2+80,clientY:e.clientHeight/2,button:0,bubbles:!0}))},c.set(i,a),s.append(a)}let d=document.createElement(`p`);d.className=`creation-rail-hint`,d.textContent=t(`creation.dragHint`),s.append(d);let f=e=>{s.hidden=!e,a.setAttribute(`aria-expanded`,String(e)),a.setAttribute(`aria-label`,t(e?`creation.collapse`:`creation.add`)),a.title=t(e?`creation.collapse`:`creation.add`)};a.onclick=()=>f(s.hidden===!0);let p=document.createElement(`button`);p.type=`button`,p.className=`creation-cancel`,p.textContent=t(`editor.cancel`),p.onclick=()=>n.cancel(),p.hidden=!0;let m=document.createElement(`p`);return m.className=`placement-notice`,m.setAttribute(`role`,`status`),i.append(a,s,p,m),e.append(i),{notice:m,close(){n.phase!==`creating-preview`&&f(!1)},update(){let e=n.phase===`creating-preview`;a.disabled=n.busy;for(let t of c.values())t.disabled=(n.busy||n.blocked)&&!(e&&t===l);p.hidden=!e,e||(l=null)},dispose(){i.remove()}}}function _m(e,n){let r=document.createElement(`div`);r.className=`arc-toolbar`,r.hidden=!0,r.setAttribute(`role`,`toolbar`),r.setAttribute(`aria-label`,t(`editor.tools`));let i=Array.from({length:4},()=>{let e=document.createElement(`span`);return e.className=`arc-link`,e.setAttribute(`aria-hidden`,`true`),r.append(e),e}),a=new Map;for(let e of[`position`,`radius`,`mass`,`velocity`,`delete`]){let i=document.createElement(`button`);i.type=`button`,i.className=`arc-tool`,i.dataset.tool=e;let o=t(`editor.${e}`);i.textContent=o,i.setAttribute(`aria-label`,o),i.style.setProperty(`--tool-icon`,Iu(e)),i.onclick=()=>{e===`delete`?n.deleteSelected():n.setTool(e)},r.append(i),a.set(e,i)}return e.append(r),{element:r,update(){let e=n.body,i=n.phase===`editing-new`;r.hidden=!e||n.phase===`creating-preview`;for(let[e,r]of a)r.disabled=e===`delete`?n.busy||n.blocked:!n.canSwitchTool||i&&e===`velocity`,e!==`delete`&&r.setAttribute(`aria-pressed`,String(n.tool===e)),r.title=i&&e===`velocity`?t(`creation.velocityAfter`):i&&e===`delete`?t(`creation.cancelInstead`):``},place(e,t){r.style.visibility=e?`visible`:`hidden`,e&&(r.style.left=`${e.x}px`,r.style.top=`${e.y}px`,[...a.values()].forEach((e,n)=>{let r=t[n];e.style.left=`${r.x}px`,e.style.top=`${r.y}px`}),i.forEach((e,n)=>{let r=t[n],i=t[n+1],a=i.x-r.x,o=i.y-r.y;e.style.left=`${r.x}px`,e.style.top=`${r.y}px`,e.style.width=`${Math.hypot(a,o)}px`,e.style.transform=`rotate(${Math.atan2(o,a)}rad)`}))},dispose(){r.remove()}}}var vm={width:92,height:252};function ym(e,t,n,r){if(![e.x,e.y,e.radius].every(Number.isFinite)||e.radius<0)return null;let i=Dp(e,{width:2*e.radius+24,height:2*e.radius+24}),a=e.visible?[...r,i]:[...r],o={x:e.x+e.radius+24+vm.width/2,y:e.y},s=e.visible?Op(o,vm,t,a):null,c=s?Dp(s,vm):null,l=s&&s.x<e.x?`left`:`right`,u=[0,32,48,32,0].map((e,t)=>({x:l===`right`?22+e:vm.width-22-e,y:22+52*t})),d=Op({x:e.x+(l===`right`?-1:1)*(e.radius+24+n.width/2),y:e.y},n,t,[...a,...c?[c]:[]]);return{arc:c,points:u,panel:d?Dp(d,n):null,side:l}}function bm(e){let r=document.createElement(`div`);r.className=`editor-title`;let i=document.createElement(`button`);i.type=`button`,i.className=`editor-title-name`;let a=document.createElement(`form`);a.className=`editor-title-name-form`,a.hidden=!0;let o=document.createElement(`input`);o.type=`text`,o.maxLength=80,o.setAttribute(`aria-label`,t(`editor.name`)),a.append(o),r.append(i,a);let s=null,c=!1,l=!1,u=()=>{s=null,c=!1,a.hidden=!0,i.hidden=!1},d=t=>{let n=s;if(!n)return;let r=o.value.trim();u(),t&&r&&e.phase===`editing-new`&&e.canEditValues&&e.candidate?.id===n&&r!==e.candidate.name&&e.change({name:r})};return i.onclick=()=>{let t=e.body;!l&&t&&e.phase===`editing-new`&&e.canEditValues&&!e.hasGesture&&(s=t.id,o.value=t.name,i.hidden=!0,a.hidden=!1,o.focus(),o.setSelectionRange(0,0))},o.addEventListener(`compositionstart`,()=>{c=!0}),o.addEventListener(`compositionend`,()=>{c=!1}),o.onkeydown=e=>{e.isComposing||c?e.stopPropagation():(e.key===`Enter`||e.key===`Escape`)&&(e.preventDefault(),e.stopPropagation(),d(e.key===`Enter`),i.focus())},o.onblur=()=>{l||d(!0)},a.onsubmit=e=>{e.preventDefault(),e.stopPropagation(),c||(d(!0),i.focus())},{element:r,update(){let r=e.body,a=!!r&&e.phase===`editing-new`&&e.canEditValues&&!e.hasGesture;s&&(r?.id!==s||!a)&&u(),i.disabled=!a,i.textContent=r?r.materialId===`procedural`?r.name:n(r.id):``,i.setAttribute(`aria-label`,t(`editor.editName`,{name:i.textContent})),i.title=a?t(`editor.renameHint`):``},dispose(){l=!0,u(),r.remove()}}}var xm={EDITOR_BUSY:`editor.busy`,WORKER_ERROR:`editor.workerError`,STALE_EDIT:`editor.stale`,INVALID_INPUT:`editor.invalidInput`,INVALID_PLACEMENT:`editor.invalidPlacement`,PLACEMENT_REFERENCE_MISSING:`creation.placementMissing`,COINCIDENT_BODIES:`editor.overlap`,PHYSICAL_OVERLAP:`editor.overlap`,UNSAFE_TIMESTEP:`editor.unsafe`,NUMERICAL_RANGE:`editor.range`,NON_FINITE_CALCULATION:`editor.nonFinite`,REFERENCE_REQUIRED:`editor.referenceRequired`,INVALID_ORBITAL_PLANE:`editor.orbitalPlane`},Sm=e=>e.kind===`interrupted`?{"pointer-cancel":`editor.pointerCancelled`,"capture-lost":`editor.captureLost`,"window-blur":`editor.windowBlur`,hidden:`editor.hidden`,resize:`editor.resized`,pagehide:`editor.pageLeft`,disposed:`editor.pageLeft`}[e.cause]:{committed:`editor.committed`,cancelled:`editor.cancelled`,unchanged:`editor.unchanged`,"invalid-position":`editor.invalidPosition`,rejected:`editor.rejected`,"worker-failed":`editor.workerError`}[e.kind];function Cm(e,r,i,a){let o=e=>{let n=document.createElement(`button`);return n.type=`button`,n.textContent=t(e),n},s=gm(e,r,i),c=_m(e,r),l=s.notice,u=document.createElement(`section`);u.className=`body-editor`,u.hidden=!0;let d=bm(r),f=new Map;for(let e of[`position`,`radius`,`mass`,`velocity`]){let t=document.createElement(`div`);t.className=`editor-fields`,f.set(e,t)}let p=document.createElement(`p`);p.className=`editor-hint`;let m=document.createElement(`p`);m.className=`creation-speed editor-hint`;let h=document.createElement(`label`);h.className=`creation-orbit`,h.textContent=t(`creation.orbitQuestion`);let g=document.createElement(`select`);g.setAttribute(`aria-label`,t(`creation.orbitQuestion`)),g.onchange=()=>r.selectCreationReference(g.value),h.append(g);let _=document.createElement(`label`);_.textContent=t(`creation.motion`);let v=document.createElement(`select`);v.setAttribute(`aria-label`,t(`creation.motion`));for(let e of[`circular`,`inherit`]){let n=document.createElement(`option`);n.value=e,n.textContent=t(e===`circular`?`creation.orbit`:`creation.fall`),v.append(n)}v.onchange=()=>r.selectCreationMotion(v.value),_.append(v);let y=document.createElement(`p`);y.className=`editor-hint`;let b=o(`editor.focus`);b.onclick=a;let x=new Map,S=(e,t)=>e===`radius`?t.radiusM/1e3:e[0]===`p`?t.positionM[e[1]]/1e3:t.velocityMS[e[1]]/1e3;function C(e,n,i,a){let o=document.createElement(`label`);o.textContent=t(i);let s=document.createElement(`input`);s.type=`number`,s.step=`any`,s.setAttribute(`aria-label`,t(i));let c=()=>{if(r.phase!==`viewing`||r.blocked)return;let e=r.selectedId;r.startExisting(()=>{r.selectedId===e&&r.phase===`editing-existing`&&r.candidate&&(s.value=tm(S(n,r.candidate)),s.focus())})};return s.onfocus=c,s.onclick=c,s.oninput=()=>{[`editing-existing`,`editing-new`].includes(r.phase)&&a(s.valueAsNumber)},o.append(s),e.append(o),x.set(n,s),s}function w(e,t,n){let i=r.candidate;i&&(e===`positionM`&&t===`z`?r.change({positionM:pp(i.positionM,n*1e3)}):r.change({[e]:{...i[e],[t]:n*1e3}}))}for(let e of[`x`,`y`,`z`])C(f.get(`position`),`p${e}`,`editor.p${e}`,t=>w(`positionM`,e,t)),C(f.get(`velocity`),`v${e}`,`editor.v${e}`,t=>w(`velocityMS`,e,t));C(f.get(`radius`),`radius`,`editor.radiusValue`,e=>r.change({radiusM:e*1e3}));let T=mm(f.get(`mass`),r),E=new Map,D=new Map,O=document.createElement(`p`);O.className=`editor-hint`;let k=!1,A=null,j=[],M=new Map;function N(e,n,i,a,o,s){let c=document.createElement(`label`);c.textContent=t(n===`vertical`?`editor.verticalQuick`:i);let l=document.createElement(`input`);l.type=`range`,l.step=`any`,l.setAttribute(`aria-label`,t(i));let u=wp(l,r,e=>{let t=l.getBoundingClientRect(),i=Number(l.min),c=Number(l.max),u=Number(l.value),d=Math.max(1,t.width-16),f=t.left+8,p=f+(u-i)/(c-i)*d,m=Math.abs(e.clientX-p)<=8,h=e.clientX,g=0,_,v;return{prepare:e=>(_=e,g=a(),v={...r.creationOrigin},Number.isFinite(g)),move:e=>{h=e.clientX},apply:()=>{let t=(m?_p(u,h-e.clientX,d,i,c):_p(i,h-f,d,i,c))-u,a=r.creationPosition(_.positionM,v);return t===0?s({..._,positionM:a}):o(g+t+(n===`height`?(a.z-_.positionM.z)/1e3:0)),l.value=String(g+t),!0}}});return j.push(u),M.set(n,u),l.oninput=()=>{r.canEditValues&&o(Number(l.value))},l.onkeydown=e=>{if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(e.key)){if(r.phase===`viewing`){e.preventDefault();let t=Number(l.value),n=Number(l.min),i=Number(l.max),s=e.key===`Home`?n:e.key===`End`?i:_p(t,[`ArrowLeft`,`ArrowDown`].includes(e.key)?-1:1,100,n,i);r.startExisting(()=>o(a()+s-t))}else r.canEditValues||e.preventDefault()}},c.append(l),e.append(c),E.set(n,l),D.set(n,new Sp),l}N(f.get(`position`),`height`,`editor.height`,()=>r.body.positionM.z/1e3,e=>w(`positionM`,`z`,e),e=>r.change({positionM:{...r.body.positionM,z:e.positionM.z}})),N(f.get(`mass`),`mass`,`editor.massSlider`,()=>gp(r.body.massKg),e=>r.change({massKg:hp(e)}),e=>r.change({massKg:e.massKg}));let P=document.createElement(`div`);P.className=`editor-velocity-quick editor-fields`;let F=document.createElement(`p`);F.className=`editor-speed-total`,P.append(F),N(P,`vertical`,`editor.verticalVelocity`,()=>r.body.velocityMS.z/1e3,e=>w(`velocityMS`,`z`,e),e=>r.change({velocityMS:{...r.body.velocityMS,z:e.velocityMS.z}}));let I=document.createElement(`p`);I.className=`editor-hint`,I.textContent=t(`editor.velocityQuickHint`),P.append(I);let L=document.createElement(`select`);L.setAttribute(`aria-label`,t(`editor.reference`));let ee=document.createElement(`select`);ee.setAttribute(`aria-label`,t(`editor.velocityPreset`));for(let e of[`manual`,`inherit`,`circular`]){let n=document.createElement(`option`);n.value=e,n.textContent=t(`editor.${e}`),ee.append(n)}let te=o(`editor.applyPreset`);te.onclick=()=>r.preset(ee.value,L.value);let ne=document.createElement(`label`);ne.textContent=t(`editor.reference`),ne.append(L);let R=document.createElement(`label`);R.textContent=t(`editor.velocityPreset`),R.append(ee),f.get(`velocity`).append(ne,R,te);let re=o(`editor.confirm`),z=o(`editor.cancel`);re.onclick=()=>r.confirm(),z.onclick=()=>r.cancel();let B=document.createElement(`div`);B.className=`editor-actions`,B.append(b,re,z);let V=document.createElement(`p`);V.className=`editor-notice`,V.setAttribute(`role`,`status`);let ie=document.createElement(`details`);ie.className=`editor-mapping`;let H=document.createElement(`summary`);H.textContent=t(`editor.mapping`),ie.append(H,p);let ae=document.createElement(`div`);ae.className=`editor-content`,ae.append(h,_,m,...f.values(),O,y,ie);let oe=document.createElement(`details`);oe.className=`editor-precision-details`,oe.open=!1;let U=document.createElement(`summary`);U.textContent=t(`editor.positionDetails`),oe.append(U,ae);let W=()=>{let e=[`position`,`velocity`].includes(r.tool)&&!r.creating&&!oe.open;u.dataset.compact=String(e),u.dataset.tool=r.tool,V.hidden=(e&&r.phase===`viewing`||r.phase===`editing-new`)&&!r.error&&!r.feedback};oe.addEventListener(`toggle`,W);let se=document.createElement(`div`);se.className=`editor-prediction`;let ce=document.createElement(`div`);ce.className=`editor-scroll`,ce.append(P,oe,se);let le=hm(ce,r);ce.append(V),u.append(d.element,ce,B),e.append(u);let ue=r.tool,de=e=>r.state?.state.bodies.find(t=>t.id===e)?.materialId===`procedural`?r.state.state.bodies.find(t=>t.id===e).name:n(e),fe=(e,n,r)=>{let i=e.value;if(e.replaceChildren(),r){let n=document.createElement(`option`);n.value=``,n.textContent=t(`creation.chooseReference`),e.append(n)}n.forEach(t=>{let n=document.createElement(`option`);n.value=t,n.textContent=de(t),e.append(n)}),n.includes(i)&&(e.value=i)};return{predictionHost:se,closeCreation:()=>s.close(),layout(t){if(!t||u.hidden){c.place(null,[]);return}if(r.hasGesture||r.phase===`committing`||r.busy&&document.activeElement?.closest(`.body-editor`)===u)return;let n=e.getBoundingClientRect(),i={width:e.clientWidth,height:e.clientHeight},a=[...e.querySelectorAll(`.time-controls,.creation-entry,.theme-controls,.display-settings > summary,.display-settings[open] > .display-settings-panel,.scene-heading`)].filter(e=>!e.hidden).map(e=>e.getBoundingClientRect()).filter(e=>e.width>0&&e.height>0).map(e=>({x:e.left-n.left,y:e.top-n.top,width:e.width,height:e.height})),o=e.querySelector(`.time-controls`)?.getBoundingClientRect(),s=Math.max(110,...a.filter(e=>e.y<160&&e.height<220).map(e=>e.y+e.height+12)),l=o?o.top-n.top-12:i.height-24;u.style.maxHeight=`${Math.max(100,l-s)}px`;let d=ym(t,i,u.getBoundingClientRect(),a);c.place(d?.arc??null,d?.points??[]);let f=d?.panel;u.style.left=`${f?.x??12}px`,u.style.top=`${f?.y??s}px`},update(){j.forEach(e=>e.sync());let e=r.body,n=r.state?.state.bodies??[];if(s.update(),c.update(),d.update(),l.textContent=r.error===`INVALID_PLACEMENT`?t(`editor.invalidPlacement`):!e&&r.feedback?t(Sm(r.feedback)):``,l.hidden=!l.textContent,u.hidden=!e||r.phase===`creating-preview`,u.hidden||!e)return;let i=r.creating,a=r.phase===`viewing`&&u.dataset.phase!==`viewing`,o=a&&u.dataset.creating===`true`;u.dataset.creating=String(i),u.dataset.phase=r.phase,u.dataset.selectedId=e.id;let C=A!==e.id;C&&(A=e.id,k=!1,s.close(),i&&(ee.value=`manual`)),(C||ue!==r.tool||o)&&(oe.open=![`position`,`velocity`].includes(r.tool)||i),U.hidden=![`position`,`velocity`].includes(r.tool)||i,U.textContent=t(r.tool===`velocity`?`editor.velocityDetails`:`editor.positionDetails`),P.hidden=r.tool!==`velocity`||i;let w=Math.hypot(e.velocityMS.x,e.velocityMS.y,e.velocityMS.z)/1e3;F.textContent=t(`editor.speedTotal`,{value:Number.isFinite(w)?tm(w):t(`editor.outOfRange`)}),i&&(oe.open=!0),(C||ue!==r.tool||a)&&(ae.scrollTop=0,ue=r.tool),b.hidden=!n.some(t=>t.id===e.id),b.disabled=r.busy;for(let[e,t]of f)t.hidden=e!==r.tool||i&&(e===`position`||e===`velocity`);ie.hidden=se.hidden=i,p.textContent=t(r.tool===`velocity`?`editor.velocityHint`:`editor.frame`,{mapping:op}),r.phase===`editing-new`&&(p.textContent+=` `+t(`creation.placementHint`)),e.kind===`black-hole`&&(p.textContent+=` `+t(`editor.blackHoleHint`,{radius:e.collision.boundary===`capture-radius`?(e.collision.captureRadiusM/1e3).toPrecision(4):t(`editor.outOfRange`)}));let N=r.canEditValues;T.update(),le.update(!i),y.hidden=e.kind===`black-hole`||![`mass`,`radius`].includes(r.tool);let I=vp(e);y.textContent=t(`editor.density`,{value:I===null?t(`editor.outOfRange`):tm(I)});for(let[n,i]of x)if(i.readOnly=!N,i.setAttribute(`aria-busy`,String(r.phase===`awaiting-freeze`)),i.disabled=r.phase===`committing`,!N||document.activeElement!==i){let r=S(n,e);i.value=tm(r),i.title=Number.isFinite(r)?t(`editor.preciseValue`,{value:String(r)}):t(`editor.invalidInput`)}for(let[t,n]of E)if(n.disabled=!r.canStartGesture&&!M.get(t).captured,!r.hasGesture){let r=t===`mass`?gp(e.massKg):t===`height`?e.positionM.z/1e3:e.velocityMS.z/1e3,i=t===`mass`?Math.log10(2):t===`height`?1e4:1;if(Number.isFinite(r)){let a=D.get(t);a.update(e.id,r,i)&&(k=!0),n.min=String(a.min),n.max=String(a.max),n.value=String(r)}}let ne=n.filter(t=>t.id!==e.id).map(e=>e.id),R=i+ne.join(`|`);L.dataset.ids!==R&&(L.dataset.ids=R,fe(L,ne,i)),C&&i&&(L.value=``),h.hidden=_.hidden=m.hidden=!i;let B=ne.join(`|`);g.dataset.ids!==B&&(g.dataset.ids=B,fe(g,ne,!0)),g.value=r.creationReferenceId??``,g.disabled=!N,v.value=r.creationMotion,v.disabled=!N,m.textContent=r.creationReferenceId?t(r.error?`creation.orbitInvalid`:r.creationMotion===`inherit`?`creation.fallSuggestion`:`creation.orbitSuggestion`,{name:de(r.creationReferenceId)}):t(n.length?`creation.orbitRequired`:`creation.orbitEmpty`),te.disabled=ee.disabled=L.disabled=!N||i,O.hidden=![`position`,`velocity`].includes(r.tool)||i&&r.tool===`position`,O.textContent=O.hidden?``:t(r.tool===`position`?`editor.heightFine`:`editor.velocityFine`),k&&(O.textContent+=` `+t(`editor.rangeAdapted`)),i&&(e.kind===`star`||e.kind===`black-hole`)&&(m.textContent+=` `+t(`creation.highMass`)),re.textContent=t(i?`creation.confirm`:`editor.confirm`),re.hidden=z.hidden=!r.busy,re.disabled=!N||!!r.error,z.disabled=r.phase===`committing`;let H=r.candidate?[...n.filter(e=>e.id!==r.candidate.id),r.candidate]:n;V.textContent=i&&r.error===`REFERENCE_REQUIRED`?t(n.length?`creation.orbitRequired`:`creation.orbitEmpty`):r.errorDetails&&r.errorDetails.code!==`INVALID_INPUT`?$p(r.errorDetails,H)+t(`risk.notCommitted`):r.error?t(xm[r.error]??`editor.invalid`):r.state?.jump?t(`editor.busy`):r.phase===`awaiting-freeze`?t(`editor.awaiting`):r.phase===`committing`?t(`editor.committing`):r.phase===`editing-new`?t(`editor.newHint`,{example:t(`preset.${ip[e.kind].example}`)}):r.phase===`editing-existing`?t(`editor.frozen`):r.feedback?t(Sm(r.feedback)):t(`editor.clickNumber`),W()},dispose(){j.forEach(e=>e.dispose()),s.dispose(),c.dispose(),d.dispose(),u.remove()}}}var wm=`planet-simulator-orbit-visibility-v1`,Tm={cosmos:!0,atelier:!1};function Em(){try{return localStorage}catch{return null}}var Dm=class{storage;overrides={};constructor(e=Em()){this.storage=e;try{let t=e?.getItem(wm);if(t&&t.length<256){let e=JSON.parse(t);if(e&&typeof e==`object`)for(let t of[`cosmos`,`atelier`]){let n=e[t];typeof n==`boolean`&&(this.overrides[t]=n)}}}catch{}}enabled(e){return this.overrides[e]??Tm[e]}choose(e,t){this.overrides[e]=t;try{this.storage?.setItem(wm,JSON.stringify(this.overrides))}catch{}}};function Om(e,n,r){let i=document.createElement(`details`);i.className=`spatial-menu`;let a=document.createElement(`summary`);zu(a,t(`theme.spatialControls`),`more`);let o=document.createElement(`div`);o.className=`spatial-menu-panel`,o.setAttribute(`role`,`group`),o.setAttribute(`aria-label`,t(`theme.spatialControls`));let s=document.createElement(`div`);s.className=`spatial-grid-options`;let c=new Map;for(let[r,a]of[[`off`,`theme.gravityOff`],[`reference`,`theme.gravityReference`],[`well`,`theme.gravityWell`]]){let o=document.createElement(`button`);o.type=`button`,o.textContent=t(a),o.setAttribute(`aria-label`,t(a)),o.onclick=()=>{e.value=r,n(),i.open=!1},c.set(r,o),s.append(o)}return e.hidden=!0,o.append(e,s,r),i.append(a,o),i.onkeydown=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),i.open=!1,a.focus())},{element:i,sync(t){s.hidden=t!==`cosmos`,r.hidden=t!==`atelier`;for(let[t,n]of c)n.setAttribute(`aria-pressed`,String(e.value===t))}}}function km(e,r,i,a=()=>{},o=()=>{},s=()=>{}){let c=document.createElement(`section`);c.className=`theme-controls`,c.setAttribute(`aria-label`,t(`theme.label`));let l=document.createElement(`div`);l.className=`theme-choices`;let u=new Map,d=`cosmos`,f=new Dm,p,m=()=>{let e=f.enabled(d);P.checked=e,p!==e&&(p=e,o(e))},h=t=>{d=t,e.dataset.theme=d,document.documentElement.dataset.theme=d,u.forEach((e,t)=>e.setAttribute(`aria-pressed`,String(t===d))),A.sync(d),A.element.open=!1,D.hidden=d!==`atelier`,r(d),m()};for(let e of[`atelier`,`cosmos`]){let n=document.createElement(`button`);n.type=`button`;let r=t(e===`atelier`?`theme.atelier`:`theme.cosmos`);n.textContent=r,n.setAttribute(`aria-label`,r),n.title=r,n.addEventListener(`click`,()=>h(e)),u.set(e,n),l.append(n)}let g=document.createElement(`details`);g.className=`theme-credits`;let _=document.createElement(`summary`);_.textContent=t(`theme.sources`);let v=document.createElement(`div`),y=document.createElement(`details`);y.className=`display-settings`;let b=document.createElement(`summary`);b.textContent=t(`theme.settings`),zu(b,t(`theme.settings`),`settings`);let x=document.createElement(`div`);x.className=`display-settings-panel`;let S=document.createElement(`select`);S.setAttribute(`aria-label`,t(`theme.gravity`));for(let[e,n]of[[`off`,`theme.gravityOff`],[`reference`,`theme.gravityReference`],[`well`,`theme.gravityWell`]]){let r=document.createElement(`option`);r.value=e,r.textContent=t(n),S.append(r)}S.value=`off`;let C=document.createElement(`label`),w=document.createElement(`input`);w.type=`checkbox`,w.checked=!0,C.className=`theme-display-option`,w.setAttribute(`aria-label`,t(`theme.softShadows`)),C.append(w,document.createTextNode(t(`theme.softShadows`)));let T=document.createElement(`label`),E=document.createElement(`input`);E.type=`checkbox`,E.setAttribute(`aria-label`,t(`theme.axis`)),T.append(E,document.createTextNode(t(`theme.axis`)));let D=document.createElement(`label`),O=document.createElement(`input`);O.type=`checkbox`,O.setAttribute(`aria-label`,t(`theme.overviewNames`)),D.append(O,document.createTextNode(t(`theme.overviewNames`)));let k=()=>{a(S.value,E.checked,O.checked,w.checked),A.sync(d)},A=Om(S,k,C),j=document.createElement(`div`);j.className=`scene-view-tools`;let M=document.createElement(`button`);M.type=`button`,M.className=`overview-reset`,zu(M,t(`camera.overview`),`overview`),M.onclick=()=>{M.disabled||s()},j.append(M,A.element),S.addEventListener(`change`,k),E.addEventListener(`change`,k),O.addEventListener(`change`,k),w.addEventListener(`change`,()=>{k(),A.element.open=!1});let N=document.createElement(`label`),P=document.createElement(`input`);P.type=`checkbox`,P.setAttribute(`aria-label`,t(`orbitScene.show`)),N.append(P,document.createTextNode(t(`orbitScene.show`))),P.onchange=()=>{f.choose(d,P.checked),m()};let F=document.createElement(`p`);F.className=`orbit-scene-status`,F.setAttribute(`role`,`status`),F.hidden=!0;let I=document.createElement(`p`);I.className=`orbit-scene-brief`,I.textContent=t(`orbitScene.brief`),I.hidden=!0;for(let[e,n]of[[`theme.earthCredit`,`https://www.solarsystemscope.com/textures/`],[`theme.earthLicense`,`https://creativecommons.org/licenses/by/4.0/`],[`theme.otherCredit`,`https://www.solarsystemscope.com/textures/`],[`theme.rotationCredit`,`https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc`],[`theme.moonCredit`,`https://svs.gsfc.nasa.gov/4720/`],[`theme.jupiterCredit`,`https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map/`]]){let r=document.createElement(`p`),i=document.createElement(`a`);i.textContent=t(e),i.href=n,i.target=`_blank`,i.rel=`noreferrer`,r.append(i),v.append(r)}g.append(_,v);let L=document.createElement(`div`);L.className=`display-actions`,x.append(N,F,I,D,T,g,L),y.append(b,x);let ee=document.createElement(`p`);ee.setAttribute(`role`,`status`);let te=document.createElement(`button`);te.type=`button`,te.textContent=t(`theme.retry`),te.hidden=!0,te.addEventListener(`click`,i),c.append(l,y,ee,te),e.append(c,j),h(d);let ne=new Map;return{actionsHost:x,secondaryActionsHost:L,setCameraBusy(e){M.disabled=e},initializeOrbits(){o(f.enabled(d))},restore(e,t=!0){S.value=e.gravity,E.checked=e.axis,O.checked=e.names,w.checked=e.shadows,t&&f.choose(e.theme,e.orbits),h(e.theme),k()},updateOrbits(e){P.checked=e.enabled,F.hidden=!e.enabled,I.hidden=!e.enabled,I.textContent=t(e.phase===`waiting`?`orbitScene.briefWaiting`:`orbitScene.brief`),F.dataset.phase=e.phase;let n=e.result,r=n?.results.filter(e=>e.points.length>1).length??0;F.dataset.shown=String(r),F.dataset.version=String(n?.baseVersion??``),F.dataset.computeMs=String(n?.computeMs??``);let i=n?n.requested-r:0;F.hidden=!e.enabled||e.phase!==`failed`&&!i,F.textContent=e.phase===`failed`?t(`orbitScene.failed`):i?t(`orbitScene.omitted`,{count:i}):``},update(e,r){ne.set(e,r);let i=[...ne].filter(([,e])=>e===`failed`).map(([e])=>n(e)),a=[...ne.values()].some(e=>e===`loading`);te.hidden=i.length===0,ee.textContent=i.length?t(`theme.failed`,{names:i.join(`、`)}):a?t(`theme.loading`):``,ee.hidden=ee.textContent===``},dispose(){c.remove(),j.remove(),delete document.documentElement.dataset.theme}}}async function Am(n){document.documentElement.lang=e,document.title=t(`app.title`);let r=Fp(n),i=null,a;try{i=await R(),a=(await i.list()).find(e=>e.kind===`workspace`)}catch{i?.close(),i=null}let o=a?{ok:!0,value:a.state}:V();if(!o.ok)throw Error(o.error.code);r.updateBodyCount(o.value.bodies.length);let s,c,l=null,u,d,f,p,m,h,g,_,v,y,b=am(r.controlsHost,{play:e=>u?.play(e),speed:e=>u?.setSpeed(e),jump:e=>u?.beginJump(e),cancel:()=>u?.cancelJump(),restore:()=>u?.restore(),resume:()=>u?.resumeJump(),adopt:()=>u?.adoptJump(),preview:e=>u?.setPreview(e),resumeLocal:()=>u?.resumeLocalStep(),cancelLocal:()=>u?.cancelLocalStep(),collisionResult:e=>d?.inspectCollisionResult(e),undo:()=>u?.recover(`undo`),redo:()=>u?.recover(`redo`),checkpoint:e=>u?.recover(`checkpoint`,e),experiment:()=>u?.recover(`experiment`)}),x,S=km(r.controlsHost,e=>x?.setTheme(e),()=>x?.retryTextures(),(e,t,n,r)=>x?.setDisplay(e,t,n,r),e=>h?.setEnabled(e),()=>{!d?.busy&&!p?.jump&&!p?.localStep&&x?.showOverview()});S.setCameraBusy(!0),S.actionsHost.append(b.settingsElement);let C=ff(S.actionsHost),w=e=>{let t=e.target instanceof Element?e.target.closest(`button,summary`):null;e.isTrusted&&!e.defaultPrevented&&C.music.interact(),e.isTrusted&&!e.defaultPrevented&&t&&!t.closest(`[inert],.audio-controls,.editor-actions,.save-actions,.creation-kind`)&&C.audio.interact()},T=()=>{C.music.setHidden(document.hidden),document.hidden&&C.audio.suspend()};C.music.setHidden(document.hidden),r.controlsHost.addEventListener(`click`,w),document.addEventListener(`visibilitychange`,T);try{x=Pp(r.sceneHost,{onContextLost:()=>r.showError(t(`error.contextLost`)),onContextRestored:()=>r.clearError(),onRenderFailure:()=>r.showError(t(`error.webgl`)),bodies:o.value.bodies,onSurfaceStatus:(e,t)=>S.update(e,t),onBodyAnchor:e=>f?.layout(e)});let e=o.value.bodies,n=null;u=new dm(o.value,{initialPlaying:!a,onOperationPending:e=>b.setOperationPending(e),onSnapshot:t=>{p=t,t.physicsIssue?.scope===`live`&&_?.restore(),_?.update(),v?.setBusy(!!d?.busy||!!t.galleryOpen||!!t.jump||!!t.localStep),r.updateBodyCount(t.state.bodies.length),e=t.state.bodies,(!t.jump||n!==t.jump.taskId)&&(x?.update(e,t,t.state.elapsedSeconds),n=null),b.update(t),t.jump||b.updatePreview(null),d?.update(t),S.setCameraBusy(!!d?.busy||!!t.jump||!!t.localStep),l&&t.recoveryResult?.requestId===l.id&&(t.recoveryResult.outcome===`committed`&&(S.restore(l.file.view),x?.restoreCamera(l.file.view.camera),u?.setSpeed(l.file.speedIndex),C.audio.play(`confirm`)),l=null),s?.update(t)},onPreview:t=>{n=t?.taskId??null,t?x?.previewPositions(t.positions,t.bodies,t.elapsedSeconds):x?.update(e,void 0,p?.state.elapsedSeconds??0),b.updatePreview(t)},onEditReady:(e,t)=>d?.freezeReady(e,t),onMutation:e=>{x?.settleMutation(e),d?.mutation(e),e.outcome===`committed`&&C.audio.play(`confirm`)},onFailure:()=>{l=null,_?.restore(),d?.fail(),b.fail(),s?.fail()}}),d=new fm(u,()=>{x?.refreshEditor(),f?.update(),d&&(m?.update(d),h?.update(d)),b.setEditorBusy(d?.busy??!1),_?.update(),v?.setBusy(!!d?.busy||!!p?.galleryOpen||!!p?.jump||!!p?.localStep),S.setCameraBusy(!!d?.busy||!!p?.jump||!!p?.localStep)}),x.attachEditor(d),y=Tp(d),f=Cm(r.controlsHost,d,(e,t)=>x?.beginCreation(e,t),()=>{d?.selectedId&&x?.focusBody(d.selectedId)}),h=new Xd(e=>{S.updateOrbits(e),x?.setSceneReferences(e.result)}),S.initializeOrbits(),m=new Zd(e=>{g?.update(e),x?.setPrediction(e.result)}),g=Qd(f.predictionHost,m),v=hf(r.controlsHost,S.secondaryActionsHost,{fresh:!a}),a&&(S.restore(a.view,!1),x.restoreCamera(a.view.camera),u.setSpeed(a.speedIndex)),s=Vu(r.controlsHost,{store:i,current:()=>p,view:()=>({...x.configuration(),orbits:h?.view.enabled??!1}),onOpen:()=>f?.closeCreation(),onRestored:()=>x?.showOverview(),onBackdropClose:()=>{matchMedia(`(max-width:600px)`).matches&&x?.showOverview()},busy:()=>!!d?.busy||(u?.storageBlocked??!0),open:e=>u?.setGallery(e),archive:()=>u?.historyArchive()??null,thumbnail:e=>(c??=zd(),c.capture(e)),load:e=>{let t=u?.loadScene(e.state);return t?(l={id:t,file:e},t):!1}}),p&&(d.update(p),s.update(p))}catch(e){console.error(e),r.showError(t(`error.webgl`))}_=$d(r.controlsHost,S.secondaryActionsHost,()=>!d?.busy&&!p?.jump&&!p?.localStep&&!p?.galleryOpen,e=>x?.setUIVisible(e)),_.update();let E=e=>{p?.galleryOpen?e.key===`Escape`&&u?.setGallery(!1):gf(e,{hidden:()=>_?.hidden??!1,restore:()=>_?.restore(),cancel:()=>d?.cancel(),confirm:()=>d?.confirm(),editing:()=>d?.busy??!1,togglePlay:()=>u?.play(!p?.playing)})};return window.addEventListener(`keydown`,E),{dispose(){r.controlsHost.removeEventListener(`click`,w),document.removeEventListener(`visibilitychange`,T),v?.dispose(),C.dispose(),window.removeEventListener(`keydown`,E),y?.(),s?.dispose(),c?.dispose(),_?.dispose(),d?.cancel(`disposed`),f?.dispose(),h?.dispose(),m?.dispose(),g?.dispose(),u?.dispose(),b.dispose(),S.dispose(),x?.dispose(),r.dispose()}}}export{Am as createApp};