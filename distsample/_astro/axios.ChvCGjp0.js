var bn,xl=new Uint8Array(16);function Fl(){if(!bn&&(bn=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!bn))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return bn(xl)}const Bl=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function jl(t){return typeof t=="string"&&Bl.test(t)}var Q=[];for(var Fr=0;Fr<256;++Fr)Q.push((Fr+256).toString(16).substr(1));function $l(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=(Q[t[e+0]]+Q[t[e+1]]+Q[t[e+2]]+Q[t[e+3]]+"-"+Q[t[e+4]]+Q[t[e+5]]+"-"+Q[t[e+6]]+Q[t[e+7]]+"-"+Q[t[e+8]]+Q[t[e+9]]+"-"+Q[t[e+10]]+Q[t[e+11]]+Q[t[e+12]]+Q[t[e+13]]+Q[t[e+14]]+Q[t[e+15]]).toLowerCase();if(!jl(n))throw TypeError("Stringified UUID is invalid");return n}function Qm(t,e,n){t=t||{};var r=t.random||(t.rng||Fl)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,$l(r)}var zs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Hl=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=t[n++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=t[n++],c=t[n++],u=t[n++],d=((s&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const o=t[n++],c=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|c&63)}}return e.join("")},na={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const o=t[s],c=s+1<t.length,u=c?t[s+1]:0,d=s+2<t.length,g=d?t[s+2]:0,E=o>>2,A=(o&3)<<4|u>>4;let P=(u&15)<<2|g>>6,O=g&63;d||(O=64,c||(P=64)),r.push(n[E],n[A],n[P],n[O])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ta(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Hl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const o=n[t.charAt(s++)],u=s<t.length?n[t.charAt(s)]:0;++s;const g=s<t.length?n[t.charAt(s)]:64;++s;const A=s<t.length?n[t.charAt(s)]:64;if(++s,o==null||u==null||g==null||A==null)throw new Vl;const P=o<<2|u>>4;if(r.push(P),g!==64){const O=u<<4&240|g>>2;if(r.push(O),A!==64){const S=g<<6&192|A;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Vl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zl=function(t){const e=ta(t);return na.encodeByteArray(e,!0)},jn=function(t){return zl(t).replace(/\./g,"")},wi=function(t){try{return na.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql=()=>Wl().__FIREBASE_DEFAULTS__,Gl=()=>{if(typeof process>"u"||typeof zs>"u")return;const t=zs.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Kl=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&wi(t[1]);return e&&JSON.parse(e)},Ti=()=>{try{return ql()||Gl()||Kl()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ra=t=>{var e,n;return(n=(e=Ti())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},ia=t=>{const e=ra(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},sa=()=>{var t;return(t=Ti())===null||t===void 0?void 0:t.config},oa=t=>{var e;return(e=Ti())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const c=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},t);return[jn(JSON.stringify(n)),jn(JSON.stringify(c)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ca(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(q())}function la(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ua(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function ha(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Xl(){const t=q();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Yl(){try{return typeof indexedDB=="object"}catch{return!1}}function Ql(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="FirebaseError";class _e extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Zl,Object.setPrototypeOf(this,_e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xe.prototype.create)}}class Xe{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,o=this.errors[e],c=o?eu(o,r):"Error",u=`${this.serviceName}: ${c} (${s}).`;return new _e(s,u,r)}}function eu(t,e){return t.replace(tu,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const tu=/\{\$([^}]+)}/g;function nu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function $n(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const o=t[s],c=e[s];if(Ws(o)&&Ws(c)){if(!$n(o,c))return!1}else if(o!==c)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Ws(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function da(t,e){const n=new ru(t,e);return n.subscribe.bind(n)}class ru{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");iu(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Br),s.error===void 0&&(s.error=Br),s.complete===void 0&&(s.complete=Br);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function iu(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Br(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(t){return t&&t._delegate?t._delegate:t}class Ae{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Jl;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(au(e))try{this.getOrInitializeService({instanceIdentifier:et})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=et){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=et){return this.instances.has(e)}getOptions(e=et){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,c]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&c.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const c=this.instances.get(s);return c&&e(c,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ou(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=et){return this.component?this.component.multipleInstances?e:et:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ou(t){return t===et?void 0:t}function au(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new su(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(j||(j={}));const lu={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},uu=j.INFO,hu={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},du=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=hu[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class er{constructor(e){this.name=e,this._logLevel=uu,this._logHandler=du,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?lu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const fu=(t,e)=>e.some(n=>t instanceof n);let qs,Gs;function pu(){return qs||(qs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gu(){return Gs||(Gs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fa=new WeakMap,ni=new WeakMap,pa=new WeakMap,jr=new WeakMap,Ei=new WeakMap;function mu(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",o),t.removeEventListener("error",c)},o=()=>{n(Ke(t.result)),s()},c=()=>{r(t.error),s()};t.addEventListener("success",o),t.addEventListener("error",c)});return e.then(n=>{n instanceof IDBCursor&&fa.set(n,t)}).catch(()=>{}),Ei.set(e,t),e}function _u(t){if(ni.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",c),t.removeEventListener("abort",c)},o=()=>{n(),s()},c=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",o),t.addEventListener("error",c),t.addEventListener("abort",c)});ni.set(t,e)}let ri={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ni.get(t);if(e==="objectStoreNames")return t.objectStoreNames||pa.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ke(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function yu(t){ri=t(ri)}function vu(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call($r(this),e,...n);return pa.set(r,e.sort?e.sort():[e]),Ke(r)}:gu().includes(t)?function(...e){return t.apply($r(this),e),Ke(fa.get(this))}:function(...e){return Ke(t.apply($r(this),e))}}function wu(t){return typeof t=="function"?vu(t):(t instanceof IDBTransaction&&_u(t),fu(t,pu())?new Proxy(t,ri):t)}function Ke(t){if(t instanceof IDBRequest)return mu(t);if(jr.has(t))return jr.get(t);const e=wu(t);return e!==t&&(jr.set(t,e),Ei.set(e,t)),e}const $r=t=>Ei.get(t);function Tu(t,e,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const c=indexedDB.open(t,e),u=Ke(c);return r&&c.addEventListener("upgradeneeded",d=>{r(Ke(c.result),d.oldVersion,d.newVersion,Ke(c.transaction),d)}),n&&c.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),u.then(d=>{o&&d.addEventListener("close",()=>o()),s&&d.addEventListener("versionchange",g=>s(g.oldVersion,g.newVersion,g))}).catch(()=>{}),u}const Eu=["get","getKey","getAll","getAllKeys","count"],Iu=["put","add","delete","clear"],Hr=new Map;function Ks(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Hr.get(e))return Hr.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Iu.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Eu.includes(n)))return;const o=async function(c,...u){const d=this.transaction(c,s?"readwrite":"readonly");let g=d.store;return r&&(g=g.index(u.shift())),(await Promise.all([g[n](...u),s&&d.done]))[0]};return Hr.set(e,o),o}yu(t=>({...t,get:(e,n,r)=>Ks(e,n)||t.get(e,n,r),has:(e,n)=>!!Ks(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Au(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Au(t){const e=t.getComponent();return e?.type==="VERSION"}const ii="@firebase/app",Js="0.10.16";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne=new er("@firebase/app"),Su="@firebase/app-compat",Ru="@firebase/analytics-compat",ku="@firebase/analytics",Pu="@firebase/app-check-compat",Cu="@firebase/app-check",Ou="@firebase/auth",Nu="@firebase/auth-compat",Du="@firebase/database",Lu="@firebase/data-connect",Uu="@firebase/database-compat",Mu="@firebase/functions",xu="@firebase/functions-compat",Fu="@firebase/installations",Bu="@firebase/installations-compat",ju="@firebase/messaging",$u="@firebase/messaging-compat",Hu="@firebase/performance",Vu="@firebase/performance-compat",zu="@firebase/remote-config",Wu="@firebase/remote-config-compat",qu="@firebase/storage",Gu="@firebase/storage-compat",Ku="@firebase/firestore",Ju="@firebase/vertexai",Xu="@firebase/firestore-compat",Yu="firebase",Qu="11.0.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si="[DEFAULT]",Zu={[ii]:"fire-core",[Su]:"fire-core-compat",[ku]:"fire-analytics",[Ru]:"fire-analytics-compat",[Cu]:"fire-app-check",[Pu]:"fire-app-check-compat",[Ou]:"fire-auth",[Nu]:"fire-auth-compat",[Du]:"fire-rtdb",[Lu]:"fire-data-connect",[Uu]:"fire-rtdb-compat",[Mu]:"fire-fn",[xu]:"fire-fn-compat",[Fu]:"fire-iid",[Bu]:"fire-iid-compat",[ju]:"fire-fcm",[$u]:"fire-fcm-compat",[Hu]:"fire-perf",[Vu]:"fire-perf-compat",[zu]:"fire-rc",[Wu]:"fire-rc-compat",[qu]:"fire-gcs",[Gu]:"fire-gcs-compat",[Ku]:"fire-fst",[Xu]:"fire-fst-compat",[Ju]:"fire-vertex","fire-js":"fire-js",[Yu]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt=new Map,eh=new Map,oi=new Map;function Xs(t,e){try{t.container.addComponent(e)}catch(n){Ne.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function De(t){const e=t.name;if(oi.has(e))return Ne.debug(`There were multiple attempts to register component ${e}.`),!1;oi.set(e,t);for(const n of Xt.values())Xs(n,t);for(const n of eh.values())Xs(n,t);return!0}function tr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function de(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Je=new Xe("app","Firebase",th);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ae("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Je.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se=Qu;function ga(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:si,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Je.create("bad-app-name",{appName:String(s)});if(n||(n=sa()),!n)throw Je.create("no-options");const o=Xt.get(s);if(o){if($n(n,o.options)&&$n(r,o.config))return o;throw Je.create("duplicate-app",{appName:s})}const c=new cu(s);for(const d of oi.values())c.addComponent(d);const u=new nh(n,r,c);return Xt.set(s,u),u}function nr(t=si){const e=Xt.get(t);if(!e&&t===si&&sa())return ga();if(!e)throw Je.create("no-app",{appName:t});return e}function rh(){return Array.from(Xt.values())}function me(t,e,n){var r;let s=(r=Zu[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const o=s.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const u=[`Unable to register library "${s}" with version "${e}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&c&&u.push("and"),c&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ne.warn(u.join(" "));return}De(new Ae(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="firebase-heartbeat-database",sh=1,Yt="firebase-heartbeat-store";let Vr=null;function ma(){return Vr||(Vr=Tu(ih,sh,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Yt)}catch(n){console.warn(n)}}}}).catch(t=>{throw Je.create("idb-open",{originalErrorMessage:t.message})})),Vr}async function oh(t){try{const n=(await ma()).transaction(Yt),r=await n.objectStore(Yt).get(_a(t));return await n.done,r}catch(e){if(e instanceof _e)Ne.warn(e.message);else{const n=Je.create("idb-get",{originalErrorMessage:e?.message});Ne.warn(n.message)}}}async function Ys(t,e){try{const r=(await ma()).transaction(Yt,"readwrite");await r.objectStore(Yt).put(e,_a(t)),await r.done}catch(n){if(n instanceof _e)Ne.warn(n.message);else{const r=Je.create("idb-set",{originalErrorMessage:n?.message});Ne.warn(r.message)}}}function _a(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah=1024,ch=30*24*60*60*1e3;class lh{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new hh(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Qs();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(c=>{const u=new Date(c.date).valueOf();return Date.now()-u<=ch}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Ne.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Qs(),{heartbeatsToSend:r,unsentEntries:s}=uh(this._heartbeatsCache.heartbeats),o=jn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return Ne.warn(n),""}}}function Qs(){return new Date().toISOString().substring(0,10)}function uh(t,e=ah){const n=[];let r=t.slice();for(const s of t){const o=n.find(c=>c.agent===s.agent);if(o){if(o.dates.push(s.date),Zs(n)>e){o.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Zs(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class hh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yl()?Ql().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await oh(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ys(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ys(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Zs(t){return jn(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dh(t){De(new Ae("platform-logger",e=>new bu(e),"PRIVATE")),De(new Ae("heartbeat",e=>new lh(e),"PRIVATE")),me(ii,Js,t),me(ii,Js,"esm2017"),me("fire-js","")}dh("");var fh="firebase",ph="11.0.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */me(fh,ph,"app");function en(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function ya(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const gh=ya,va=new Xe("auth","Firebase",ya());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn=new er("@firebase/auth");function mh(t,...e){Hn.logLevel<=j.WARN&&Hn.warn(`Auth (${Se}): ${t}`,...e)}function Cn(t,...e){Hn.logLevel<=j.ERROR&&Hn.error(`Auth (${Se}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(t,...e){throw Ii(t,...e)}function Ie(t,...e){return Ii(t,...e)}function wa(t,e,n){const r=Object.assign(Object.assign({},gh()),{[e]:n});return new Xe("auth","Firebase",r).create(e,{appName:t.name})}function rt(t){return wa(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ii(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return va.create(t,...e)}function D(t,e,...n){if(!t)throw Ii(e,...n)}function Ce(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Cn(e),new Error(e)}function Ue(t,e){t||Ce(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function _h(){return eo()==="http:"||eo()==="https:"}function eo(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_h()||ua()||"connection"in navigator)?navigator.onLine:!0}function vh(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn=class{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ue(n>e,"Short delay should be less than long delay!"),this.isMobile=ca()||ha()}get(){return yh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(t,e){Ue(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ta=class{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ce("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ce("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ce("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=new tn(3e4,6e4);function Ai(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Tt(t,e,n,r,s={}){return Ea(t,s,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});const u=lt(Object.assign({key:t.config.apiKey},c)).slice(1),d=await t._getAdditionalHeaders();d["Content-Type"]="application/json",t.languageCode&&(d["X-Firebase-Locale"]=t.languageCode);const g=Object.assign({method:e,headers:d},o);return la()||(g.referrerPolicy="no-referrer"),Ta.fetch()(Ia(t,t.config.apiHost,n,u),g)})}async function Ea(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},wh),e);try{const s=new Ih(t),o=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw An(t,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const u=o.ok?c.errorMessage:c.error.message,[d,g]=u.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw An(t,"credential-already-in-use",c);if(d==="EMAIL_EXISTS")throw An(t,"email-already-in-use",c);if(d==="USER_DISABLED")throw An(t,"user-disabled",c);const E=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(g)throw wa(t,E,g);Le(t,E)}}catch(s){if(s instanceof _e)throw s;Le(t,"network-request-failed",{message:String(s)})}}async function Eh(t,e,n,r,s={}){const o=await Tt(t,e,n,r,s);return"mfaPendingCredential"in o&&Le(t,"multi-factor-auth-required",{_serverResponse:o}),o}function Ia(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?bi(t.config,s):`${t.config.apiScheme}://${s}`}let Ih=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ie(this.auth,"network-request-failed")),Th.get())})}};function An(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Ie(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bh(t,e){return Tt(t,"POST","/v1/accounts:delete",e)}async function ba(t,e){return Tt(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ah(t,e=!1){const n=he(t),r=await n.getIdToken(e),s=Si(r);D(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,c=o?.sign_in_provider;return{claims:s,token:r,authTime:zt(zr(s.auth_time)),issuedAtTime:zt(zr(s.iat)),expirationTime:zt(zr(s.exp)),signInProvider:c||null,signInSecondFactor:o?.sign_in_second_factor||null}}function zr(t){return Number(t)*1e3}function Si(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Cn("JWT malformed, contained fewer than 3 sections"),null;try{const s=wi(n);return s?JSON.parse(s):(Cn("Failed to decode base64 JWT payload"),null)}catch(s){return Cn("Caught error parsing JWT payload as JSON",s?.toString()),null}}function to(t){const e=Si(t);return D(e,"internal-error"),D(typeof e.exp<"u","internal-error"),D(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qt(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof _e&&Sh(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Sh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rh=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ci=class{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=zt(this.lastLoginAt),this.creationTime=zt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Qt(t,ba(n,{idToken:r}));D(s?.users.length,n,"internal-error");const o=s.users[0];t._notifyReloadListener(o);const c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Aa(o.providerUserInfo):[],u=Ph(t.providerData,c),d=t.isAnonymous,g=!(t.email&&o.passwordHash)&&!u?.length,E=d?g:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new ci(o.createdAt,o.lastLoginAt),isAnonymous:E};Object.assign(t,A)}async function kh(t){const e=he(t);await Vn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ph(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Aa(t){return t.map(e=>{var{providerId:n}=e,r=en(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ch(t,e){const n=await Ea(t,{},async()=>{const r=lt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=t.config,c=Ia(t,s,"/v1/token",`key=${o}`),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Ta.fetch()(c,{method:"POST",headers:u,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Oh(t,e){return Tt(t,"POST","/v2/accounts:revokeToken",Ai(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wr=class li{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){D(e.idToken,"internal-error"),D(typeof e.idToken<"u","internal-error"),D(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):to(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){D(e.length!==0,"internal-error");const n=to(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(D(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:o}=await Ch(e,n);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:o}=n,c=new li;return r&&(D(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),s&&(D(typeof s=="string","internal-error",{appName:e}),c.accessToken=s),o&&(D(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new li,this.toJSON())}_performRefresh(){return Ce("not implemented")}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(t,e){D(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}let zn=class Vt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,o=en(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Rh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new ci(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const n=await Qt(this,this.stsTokenManager.getToken(this.auth,e));return D(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ah(this,e)}reload(){return kh(this)}_assign(e){this!==e&&(D(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Vt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){D(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Vn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(de(this.auth.app))return Promise.reject(rt(this.auth));const e=await this.getIdToken();return await Qt(this,bh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,o,c,u,d,g,E;const A=(r=n.displayName)!==null&&r!==void 0?r:void 0,P=(s=n.email)!==null&&s!==void 0?s:void 0,O=(o=n.phoneNumber)!==null&&o!==void 0?o:void 0,S=(c=n.photoURL)!==null&&c!==void 0?c:void 0,C=(u=n.tenantId)!==null&&u!==void 0?u:void 0,R=(d=n._redirectEventId)!==null&&d!==void 0?d:void 0,M=(g=n.createdAt)!==null&&g!==void 0?g:void 0,L=(E=n.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:N,emailVerified:x,isAnonymous:V,providerData:$,stsTokenManager:y}=n;D(N&&y,e,"internal-error");const f=Wr.fromJSON(this.name,y);D(typeof N=="string",e,"internal-error"),je(A,e.name),je(P,e.name),D(typeof x=="boolean",e,"internal-error"),D(typeof V=="boolean",e,"internal-error"),je(O,e.name),je(S,e.name),je(C,e.name),je(R,e.name),je(M,e.name),je(L,e.name);const p=new Vt({uid:N,auth:e,email:P,emailVerified:x,displayName:A,isAnonymous:V,photoURL:S,phoneNumber:O,tenantId:C,stsTokenManager:f,createdAt:M,lastLoginAt:L});return $&&Array.isArray($)&&(p.providerData=$.map(_=>Object.assign({},_))),R&&(p._redirectEventId=R),p}static async _fromIdTokenResponse(e,n,r=!1){const s=new Wr;s.updateFromServerResponse(n);const o=new Vt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Vn(o),o}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];D(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?Aa(s.providerUserInfo):[],c=!(s.email&&s.passwordHash)&&!o?.length,u=new Wr;u.updateFromIdToken(r);const d=new Vt({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:c}),g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ci(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!o?.length};return Object.assign(d,g),d}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=new Map;function Oe(t){Ue(t instanceof Function,"Expected a class definition");let e=no.get(t);return e?(Ue(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,no.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sa=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}};Sa.type="NONE";const ro=Sa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(t,e,n){return`firebase:${t}:${e}:${n}`}let io=class Nn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=On(this.userKey,s.apiKey,o),this.fullPersistenceKey=On("persistence",s.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?zn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Nn(Oe(ro),e,r);const s=(await Promise.all(n.map(async g=>{if(await g._isAvailable())return g}))).filter(g=>g);let o=s[0]||Oe(ro);const c=On(r,e.config.apiKey,e.name);let u=null;for(const g of n)try{const E=await g._get(c);if(E){const A=zn._fromJSON(e,E);g!==o&&(u=A),o=g;break}}catch{}const d=s.filter(g=>g._shouldAllowMigration);return!o._shouldAllowMigration||!d.length?new Nn(o,e,r):(o=d[0],u&&await o._set(c,u.toJSON()),await Promise.all(n.map(async g=>{if(g!==o)try{await g._remove(c)}catch{}})),new Nn(o,e,r))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ca(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ra(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Na(e))return"Blackberry";if(Da(e))return"Webos";if(ka(e))return"Safari";if((e.includes("chrome/")||Pa(e))&&!e.includes("edge/"))return"Chrome";if(Oa(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function Ra(t=q()){return/firefox\//i.test(t)}function ka(t=q()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Pa(t=q()){return/crios\//i.test(t)}function Ca(t=q()){return/iemobile/i.test(t)}function Oa(t=q()){return/android/i.test(t)}function Na(t=q()){return/blackberry/i.test(t)}function Da(t=q()){return/webos/i.test(t)}function Ri(t=q()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Nh(t=q()){var e;return Ri(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Dh(){return Xl()&&document.documentMode===10}function La(t=q()){return Ri(t)||Oa(t)||Da(t)||Na(t)||/windows phone/i.test(t)||Ca(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(t,e=[]){let n;switch(t){case"Browser":n=so(q());break;case"Worker":n=`${so(q())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Se}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Lh=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=o=>new Promise((c,u)=>{try{const d=e(o);c(d)}catch(d){u(d)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uh(t,e={}){return Tt(t,"GET","/v2/passwordPolicy",Ai(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=6;let xh=class{constructor(e){var n,r,s,o;const c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=c.minPasswordLength)!==null&&n!==void 0?n:Mh,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,o,c,u;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(n=d.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(s=d.containsLowercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(o=d.containsUppercaseLetter)!==null&&o!==void 0?o:!0),d.isValid&&(d.isValid=(c=d.containsNumericCharacter)!==null&&c!==void 0?c:!0),d.isValid&&(d.isValid=(u=d.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),d}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fh=class{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new oo(this),this.idTokenSubscription=new oo(this),this.beforeStateQueue=new Lh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=va,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Oe(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await io.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ba(this,{idToken:e}),r=await zn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(de(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=s?._redirectEventId,d=await this.tryRedirectSignIn(e);(!c||c===u)&&d?.user&&(s=d.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(c){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return D(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Vn(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(de(this.app))return Promise.reject(rt(this));const n=e?he(e):null;return n&&D(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&D(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return de(this.app)?Promise.reject(rt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return de(this.app)?Promise.reject(rt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Oe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Uh(this),n=new xh(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Xe("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Oh(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Oe(e)||this._popupRedirectResolver;D(n,this,"argument-error"),this.redirectPersistenceManager=await io.create(this,[Oe(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let c=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(D(u,this,"internal-error"),u.then(()=>{c||o(this.currentUser)}),typeof n=="function"){const d=e.addObserver(n,r,s);return()=>{c=!0,d()}}else{const d=e.addObserver(n);return()=>{c=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return D(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ua(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n?.error&&mh(`Error while retrieving App Check token: ${n.error}`),n?.token}};function ki(t){return he(t)}let oo=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=da(n=>this.observer=n)}get next(){return D(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Bh(t){Pi=t}function jh(t){return Pi.loadJS(t)}function $h(){return Pi.gapiScript}function Hh(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(t,e){const n=tr(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),o=n.getOptions();if($n(o,e??{}))return s;Le(s,"already-initialized")}return n.initialize({options:e})}function zh(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Oe);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Wh(t,e,n){const r=ki(t);D(r._canInitEmulator,r,"emulator-config-failed"),D(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=Ma(e),{host:c,port:u}=qh(e),d=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${c}${d}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:c,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),Gh()}function Ma(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function qh(t){const e=Ma(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:ao(r.substr(o.length+1))}}else{const[o,c]=r.split(":");return{host:o,port:ao(c)}}}function ao(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Gh(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ce("not implemented")}_getIdTokenResponse(e){return Ce("not implemented")}_linkToIdToken(e,n){return Ce("not implemented")}_getReauthenticationResolver(e){return Ce("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mt(t,e){return Eh(t,"POST","/v1/accounts:signInWithIdp",Ai(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh="http://localhost";class ot extends xa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ot(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Le("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,o=en(n,["providerId","signInMethod"]);if(!r||!s)return null;const c=new ot(r,s);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){const n=this.buildRequest();return mt(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,mt(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,mt(e,n)}buildRequest(){const e={requestUri:Kh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=lt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Fa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He extends nn{constructor(){super("facebook.com")}static credential(e){return ot._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return He.credential(e.oauthAccessToken)}catch{return null}}}He.FACEBOOK_SIGN_IN_METHOD="facebook.com";He.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends nn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ot._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Ve.credential(n,r)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze extends nn{constructor(){super("github.com")}static credential(e){return ot._fromParams({providerId:ze.PROVIDER_ID,signInMethod:ze.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ze.credentialFromTaggedObject(e)}static credentialFromError(e){return ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ze.credential(e.oauthAccessToken)}catch{return null}}}ze.GITHUB_SIGN_IN_METHOD="github.com";ze.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We extends nn{constructor(){super("twitter.com")}static credential(e,n){return ot._fromParams({providerId:We.PROVIDER_ID,signInMethod:We.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return We.credentialFromTaggedObject(e)}static credentialFromError(e){return We.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return We.credential(n,r)}catch{return null}}}We.TWITTER_SIGN_IN_METHOD="twitter.com";We.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const o=await zn._fromIdTokenResponse(e,r,s),c=co(r);return new vt({user:o,providerId:c,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=co(r);return new vt({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function co(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends _e{constructor(e,n,r,s){var o;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Wn.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Wn(e,n,r,s)}}function Ba(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Wn._fromErrorAndOperation(t,o,e,r):o})}async function Jh(t,e,n=!1){const r=await Qt(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return vt._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xh(t,e,n=!1){const{auth:r}=t;if(de(r.app))return Promise.reject(rt(r));const s="reauthenticate";try{const o=await Qt(t,Ba(r,s,e,t),n);D(o.idToken,r,"internal-error");const c=Si(o.idToken);D(c,r,"internal-error");const{sub:u}=c;return D(t.uid===u,r,"user-mismatch"),vt._forOperation(t,s,o)}catch(o){throw o?.code==="auth/user-not-found"&&Le(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yh(t,e,n=!1){if(de(t.app))return Promise.reject(rt(t));const r="signIn",s=await Ba(t,r,e),o=await vt._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(o.user),o}function Qh(t,e,n,r){return he(t).onIdTokenChanged(e,n,r)}function Zh(t,e,n){return he(t).beforeAuthStateChanged(e,n)}const qn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(qn,"1"),this.storage.removeItem(qn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed=1e3,td=10;class $a extends ja{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=La(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((c,u,d)=>{this.notifyListeners(c,d)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const c=this.storage.getItem(r);!n&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);Dh()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,td):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},ed)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}$a.type="LOCAL";const nd=$a;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha extends ja{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ha.type="SESSION";const Va=Ha;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rd(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new rr(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:o}=n.data,c=this.handlersMap[s];if(!c?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(c).map(async g=>g(n.origin,o)),d=await rd(u);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:d})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}rr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,c;return new Promise((u,d)=>{const g=Ci("",20);s.port1.start();const E=setTimeout(()=>{d(new Error("unsupported_event"))},r);c={messageChannel:s,onMessage(A){const P=A;if(P.data.eventId===g)switch(P.data.status){case"ack":clearTimeout(E),o=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(P.data.response);break;default:clearTimeout(E),clearTimeout(o),d(new Error("invalid_response"));break}}},this.handlers.add(c),s.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:g,data:n},[s.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return window}function sd(t){be().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function za(){return typeof be().WorkerGlobalScope<"u"&&typeof be().importScripts=="function"}async function od(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ad(){var t;return((t=navigator?.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function cd(){return za()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa="firebaseLocalStorageDb",ld=1,Gn="firebaseLocalStorage",qa="fbase_key";class rn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ir(t,e){return t.transaction([Gn],e?"readwrite":"readonly").objectStore(Gn)}function ud(){const t=indexedDB.deleteDatabase(Wa);return new rn(t).toPromise()}function ui(){const t=indexedDB.open(Wa,ld);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Gn,{keyPath:qa})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Gn)?e(r):(r.close(),await ud(),e(await ui()))})})}async function lo(t,e,n){const r=ir(t,!0).put({[qa]:e,value:n});return new rn(r).toPromise()}async function hd(t,e){const n=ir(t,!1).get(e),r=await new rn(n).toPromise();return r===void 0?null:r.value}function uo(t,e){const n=ir(t,!0).delete(e);return new rn(n).toPromise()}const dd=800,fd=3;class Ga{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ui(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>fd)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return za()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=rr._getInstance(cd()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await od(),!this.activeServiceWorker)return;this.sender=new id(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ad()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ui();return await lo(e,qn,"1"),await uo(e,qn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>lo(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>hd(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>uo(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=ir(s,!1).getAll();return new rn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ga.type="LOCAL";const pd=Ga;new tn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(t,e){return e?Oe(e):(D(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends xa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return mt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return mt(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function md(t){return Yh(t.auth,new Oi(t),t.bypassAuthState)}function _d(t){const{auth:e,user:n}=t;return D(n,e,"internal-error"),Xh(n,new Oi(t),t.bypassAuthState)}async function yd(t){const{auth:e,user:n}=t;return D(n,e,"internal-error"),Jh(n,new Oi(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,n,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:o,error:c,type:u}=e;if(c){this.reject(c);return}const d={auth:this.auth,requestUri:n,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(d))}catch(g){this.reject(g)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return md;case"linkViaPopup":case"linkViaRedirect":return yd;case"reauthViaPopup":case"reauthViaRedirect":return _d;default:Le(this.auth,"internal-error")}}resolve(e){Ue(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ue(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd=new tn(2e3,1e4);class gt extends Ka{constructor(e,n,r,s,o){super(e,n,s,o),this.provider=r,this.authWindow=null,this.pollId=null,gt.currentPopupAction&&gt.currentPopupAction.cancel(),gt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return D(e,this.auth,"internal-error"),e}async onExecution(){Ue(this.filter.length===1,"Popup operations only handle one event");const e=Ci();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vd.get())};e()}}gt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="pendingRedirect",Dn=new Map;class Td extends Ka{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Dn.get(this.auth._key());if(!e){try{const r=await Ed(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Dn.set(this.auth._key(),e)}return this.bypassAuthState||Dn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ed(t,e){const n=Ad(e),r=bd(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Id(t,e){Dn.set(t._key(),e)}function bd(t){return Oe(t._redirectPersistence)}function Ad(t){return On(wd,t.config.apiKey,t.name)}async function Sd(t,e,n=!1){if(de(t.app))return Promise.reject(rt(t));const r=ki(t),s=gd(r,e),c=await new Td(r,s,n).execute();return c&&!n&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=10*60*1e3;class kd{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Pd(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ja(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Ie(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rd&&this.cachedEventUids.clear(),this.cachedEventUids.has(ho(e))}saveEventToCache(e){this.cachedEventUids.add(ho(e)),this.lastProcessedEventTime=Date.now()}}function ho(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ja({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function Pd(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ja(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cd(t,e={}){return Tt(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Nd=/^https?/;async function Dd(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Cd(t);for(const n of e)try{if(Ld(n))return}catch{}Le(t,"unauthorized-domain")}function Ld(t){const e=ai(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const c=new URL(t);return c.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&c.hostname===r}if(!Nd.test(n))return!1;if(Od.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud=new tn(3e4,6e4);function fo(){const t=be().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Md(t){return new Promise((e,n)=>{var r,s,o;function c(){fo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{fo(),n(Ie(t,"network-request-failed"))},timeout:Ud.get()})}if(!((s=(r=be().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=be().gapi)===null||o===void 0)&&o.load)c();else{const u=Hh("iframefcb");return be()[u]=()=>{gapi.load?c():n(Ie(t,"network-request-failed"))},jh(`${$h()}?onload=${u}`).catch(d=>n(d))}}).catch(e=>{throw Ln=null,e})}let Ln=null;function xd(t){return Ln=Ln||Md(t),Ln}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fd=new tn(5e3,15e3),Bd="__/auth/iframe",jd="emulator/auth/iframe",$d={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Vd(t){const e=t.config;D(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?bi(e,jd):`https://${t.config.authDomain}/${Bd}`,r={apiKey:e.apiKey,appName:t.name,v:Se},s=Hd.get(t.config.apiHost);s&&(r.eid=s);const o=t._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${lt(r).slice(1)}`}async function zd(t){const e=await xd(t),n=be().gapi;return D(n,t,"internal-error"),e.open({where:document.body,url:Vd(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$d,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const c=Ie(t,"network-request-failed"),u=be().setTimeout(()=>{o(c)},Fd.get());function d(){be().clearTimeout(u),s(r)}r.ping(d).then(d,()=>{o(c)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qd=500,Gd=600,Kd="_blank",Jd="http://localhost";class po{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xd(t,e,n,r=qd,s=Gd){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const d=Object.assign(Object.assign({},Wd),{width:r.toString(),height:s.toString(),top:o,left:c}),g=q().toLowerCase();n&&(u=Pa(g)?Kd:n),Ra(g)&&(e=e||Jd,d.scrollbars="yes");const E=Object.entries(d).reduce((P,[O,S])=>`${P}${O}=${S},`,"");if(Nh(g)&&u!=="_self")return Yd(e||"",u),new po(null);const A=window.open(e||"",u,E);D(A,t,"popup-blocked");try{A.focus()}catch{}return new po(A)}function Yd(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd="__/auth/handler",Zd="emulator/auth/handler",ef=encodeURIComponent("fac");async function go(t,e,n,r,s,o){D(t.config.authDomain,t,"auth-domain-config-required"),D(t.config.apiKey,t,"invalid-api-key");const c={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Se,eventId:s};if(e instanceof Fa){e.setDefaultLanguage(t.languageCode),c.providerId=e.providerId||"",nu(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,A]of Object.entries({}))c[E]=A}if(e instanceof nn){const E=e.getScopes().filter(A=>A!=="");E.length>0&&(c.scopes=E.join(","))}t.tenantId&&(c.tid=t.tenantId);const u=c;for(const E of Object.keys(u))u[E]===void 0&&delete u[E];const d=await t._getAppCheckToken(),g=d?`#${ef}=${encodeURIComponent(d)}`:"";return`${tf(t)}?${lt(u).slice(1)}${g}`}function tf({config:t}){return t.emulator?bi(t,Zd):`https://${t.authDomain}/${Qd}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr="webStorageSupport";class nf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Va,this._completeRedirectFn=Sd,this._overrideRedirectResult=Id}async _openPopup(e,n,r,s){var o;Ue((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const c=await go(e,n,r,ai(),s);return Xd(e,c,Ci())}async _openRedirect(e,n,r,s){await this._originValidation(e);const o=await go(e,n,r,ai(),s);return sd(o),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:o}=this.eventManagers[n];return s?Promise.resolve(s):(Ue(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await zd(e),r=new kd(e);return n.register("authEvent",s=>(D(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(qr,{type:qr},s=>{var o;const c=(o=s?.[0])===null||o===void 0?void 0:o[qr];c!==void 0&&n(!!c),Le(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Dd(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return La()||ka()||Ri()}}const rf=nf;var mo="@firebase/auth",_o="1.8.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sf=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){D(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function af(t){De(new Ae("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:u}=r.options;D(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:c,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ua(t)},g=new Fh(r,s,o,d);return zh(g,n),g},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),De(new Ae("auth-internal",e=>{const n=ki(e.getProvider("auth").getImmediate());return(r=>new sf(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),me(mo,_o,of(t)),me(mo,_o,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf=5*60,lf=oa("authIdTokenMaxAge")||cf;let yo=null;const uf=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>lf)return;const s=n?.token;yo!==s&&(yo=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function hf(t=nr()){const e=tr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Vh(t,{popupRedirectResolver:rf,persistence:[pd,nd,Va]}),r=oa("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const c=uf(o.toString());Zh(n,c,()=>c(n.currentUser)),Qh(n,u=>c(u))}}const s=ra("auth");return s&&Wh(n,`http://${s}`),n}function df(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Bh({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const o=Ie("internal-error");o.customData=s,n(o)},r.type="text/javascript",r.charset="UTF-8",df().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});af("Browser");var vo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xa;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,f){function p(){}p.prototype=f.prototype,y.D=f.prototype,y.prototype=new p,y.prototype.constructor=y,y.C=function(_,v,T){for(var m=Array(arguments.length-2),Re=2;Re<arguments.length;Re++)m[Re-2]=arguments[Re];return f.prototype[v].apply(_,m)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,f,p){p||(p=0);var _=Array(16);if(typeof f=="string")for(var v=0;16>v;++v)_[v]=f.charCodeAt(p++)|f.charCodeAt(p++)<<8|f.charCodeAt(p++)<<16|f.charCodeAt(p++)<<24;else for(v=0;16>v;++v)_[v]=f[p++]|f[p++]<<8|f[p++]<<16|f[p++]<<24;f=y.g[0],p=y.g[1],v=y.g[2];var T=y.g[3],m=f+(T^p&(v^T))+_[0]+3614090360&4294967295;f=p+(m<<7&4294967295|m>>>25),m=T+(v^f&(p^v))+_[1]+3905402710&4294967295,T=f+(m<<12&4294967295|m>>>20),m=v+(p^T&(f^p))+_[2]+606105819&4294967295,v=T+(m<<17&4294967295|m>>>15),m=p+(f^v&(T^f))+_[3]+3250441966&4294967295,p=v+(m<<22&4294967295|m>>>10),m=f+(T^p&(v^T))+_[4]+4118548399&4294967295,f=p+(m<<7&4294967295|m>>>25),m=T+(v^f&(p^v))+_[5]+1200080426&4294967295,T=f+(m<<12&4294967295|m>>>20),m=v+(p^T&(f^p))+_[6]+2821735955&4294967295,v=T+(m<<17&4294967295|m>>>15),m=p+(f^v&(T^f))+_[7]+4249261313&4294967295,p=v+(m<<22&4294967295|m>>>10),m=f+(T^p&(v^T))+_[8]+1770035416&4294967295,f=p+(m<<7&4294967295|m>>>25),m=T+(v^f&(p^v))+_[9]+2336552879&4294967295,T=f+(m<<12&4294967295|m>>>20),m=v+(p^T&(f^p))+_[10]+4294925233&4294967295,v=T+(m<<17&4294967295|m>>>15),m=p+(f^v&(T^f))+_[11]+2304563134&4294967295,p=v+(m<<22&4294967295|m>>>10),m=f+(T^p&(v^T))+_[12]+1804603682&4294967295,f=p+(m<<7&4294967295|m>>>25),m=T+(v^f&(p^v))+_[13]+4254626195&4294967295,T=f+(m<<12&4294967295|m>>>20),m=v+(p^T&(f^p))+_[14]+2792965006&4294967295,v=T+(m<<17&4294967295|m>>>15),m=p+(f^v&(T^f))+_[15]+1236535329&4294967295,p=v+(m<<22&4294967295|m>>>10),m=f+(v^T&(p^v))+_[1]+4129170786&4294967295,f=p+(m<<5&4294967295|m>>>27),m=T+(p^v&(f^p))+_[6]+3225465664&4294967295,T=f+(m<<9&4294967295|m>>>23),m=v+(f^p&(T^f))+_[11]+643717713&4294967295,v=T+(m<<14&4294967295|m>>>18),m=p+(T^f&(v^T))+_[0]+3921069994&4294967295,p=v+(m<<20&4294967295|m>>>12),m=f+(v^T&(p^v))+_[5]+3593408605&4294967295,f=p+(m<<5&4294967295|m>>>27),m=T+(p^v&(f^p))+_[10]+38016083&4294967295,T=f+(m<<9&4294967295|m>>>23),m=v+(f^p&(T^f))+_[15]+3634488961&4294967295,v=T+(m<<14&4294967295|m>>>18),m=p+(T^f&(v^T))+_[4]+3889429448&4294967295,p=v+(m<<20&4294967295|m>>>12),m=f+(v^T&(p^v))+_[9]+568446438&4294967295,f=p+(m<<5&4294967295|m>>>27),m=T+(p^v&(f^p))+_[14]+3275163606&4294967295,T=f+(m<<9&4294967295|m>>>23),m=v+(f^p&(T^f))+_[3]+4107603335&4294967295,v=T+(m<<14&4294967295|m>>>18),m=p+(T^f&(v^T))+_[8]+1163531501&4294967295,p=v+(m<<20&4294967295|m>>>12),m=f+(v^T&(p^v))+_[13]+2850285829&4294967295,f=p+(m<<5&4294967295|m>>>27),m=T+(p^v&(f^p))+_[2]+4243563512&4294967295,T=f+(m<<9&4294967295|m>>>23),m=v+(f^p&(T^f))+_[7]+1735328473&4294967295,v=T+(m<<14&4294967295|m>>>18),m=p+(T^f&(v^T))+_[12]+2368359562&4294967295,p=v+(m<<20&4294967295|m>>>12),m=f+(p^v^T)+_[5]+4294588738&4294967295,f=p+(m<<4&4294967295|m>>>28),m=T+(f^p^v)+_[8]+2272392833&4294967295,T=f+(m<<11&4294967295|m>>>21),m=v+(T^f^p)+_[11]+1839030562&4294967295,v=T+(m<<16&4294967295|m>>>16),m=p+(v^T^f)+_[14]+4259657740&4294967295,p=v+(m<<23&4294967295|m>>>9),m=f+(p^v^T)+_[1]+2763975236&4294967295,f=p+(m<<4&4294967295|m>>>28),m=T+(f^p^v)+_[4]+1272893353&4294967295,T=f+(m<<11&4294967295|m>>>21),m=v+(T^f^p)+_[7]+4139469664&4294967295,v=T+(m<<16&4294967295|m>>>16),m=p+(v^T^f)+_[10]+3200236656&4294967295,p=v+(m<<23&4294967295|m>>>9),m=f+(p^v^T)+_[13]+681279174&4294967295,f=p+(m<<4&4294967295|m>>>28),m=T+(f^p^v)+_[0]+3936430074&4294967295,T=f+(m<<11&4294967295|m>>>21),m=v+(T^f^p)+_[3]+3572445317&4294967295,v=T+(m<<16&4294967295|m>>>16),m=p+(v^T^f)+_[6]+76029189&4294967295,p=v+(m<<23&4294967295|m>>>9),m=f+(p^v^T)+_[9]+3654602809&4294967295,f=p+(m<<4&4294967295|m>>>28),m=T+(f^p^v)+_[12]+3873151461&4294967295,T=f+(m<<11&4294967295|m>>>21),m=v+(T^f^p)+_[15]+530742520&4294967295,v=T+(m<<16&4294967295|m>>>16),m=p+(v^T^f)+_[2]+3299628645&4294967295,p=v+(m<<23&4294967295|m>>>9),m=f+(v^(p|~T))+_[0]+4096336452&4294967295,f=p+(m<<6&4294967295|m>>>26),m=T+(p^(f|~v))+_[7]+1126891415&4294967295,T=f+(m<<10&4294967295|m>>>22),m=v+(f^(T|~p))+_[14]+2878612391&4294967295,v=T+(m<<15&4294967295|m>>>17),m=p+(T^(v|~f))+_[5]+4237533241&4294967295,p=v+(m<<21&4294967295|m>>>11),m=f+(v^(p|~T))+_[12]+1700485571&4294967295,f=p+(m<<6&4294967295|m>>>26),m=T+(p^(f|~v))+_[3]+2399980690&4294967295,T=f+(m<<10&4294967295|m>>>22),m=v+(f^(T|~p))+_[10]+4293915773&4294967295,v=T+(m<<15&4294967295|m>>>17),m=p+(T^(v|~f))+_[1]+2240044497&4294967295,p=v+(m<<21&4294967295|m>>>11),m=f+(v^(p|~T))+_[8]+1873313359&4294967295,f=p+(m<<6&4294967295|m>>>26),m=T+(p^(f|~v))+_[15]+4264355552&4294967295,T=f+(m<<10&4294967295|m>>>22),m=v+(f^(T|~p))+_[6]+2734768916&4294967295,v=T+(m<<15&4294967295|m>>>17),m=p+(T^(v|~f))+_[13]+1309151649&4294967295,p=v+(m<<21&4294967295|m>>>11),m=f+(v^(p|~T))+_[4]+4149444226&4294967295,f=p+(m<<6&4294967295|m>>>26),m=T+(p^(f|~v))+_[11]+3174756917&4294967295,T=f+(m<<10&4294967295|m>>>22),m=v+(f^(T|~p))+_[2]+718787259&4294967295,v=T+(m<<15&4294967295|m>>>17),m=p+(T^(v|~f))+_[9]+3951481745&4294967295,y.g[0]=y.g[0]+f&4294967295,y.g[1]=y.g[1]+(v+(m<<21&4294967295|m>>>11))&4294967295,y.g[2]=y.g[2]+v&4294967295,y.g[3]=y.g[3]+T&4294967295}r.prototype.u=function(y,f){f===void 0&&(f=y.length);for(var p=f-this.blockSize,_=this.B,v=this.h,T=0;T<f;){if(v==0)for(;T<=p;)s(this,y,T),T+=this.blockSize;if(typeof y=="string"){for(;T<f;)if(_[v++]=y.charCodeAt(T++),v==this.blockSize){s(this,_),v=0;break}}else for(;T<f;)if(_[v++]=y[T++],v==this.blockSize){s(this,_),v=0;break}}this.h=v,this.o+=f},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var f=1;f<y.length-8;++f)y[f]=0;var p=8*this.o;for(f=y.length-8;f<y.length;++f)y[f]=p&255,p/=256;for(this.u(y),y=Array(16),f=p=0;4>f;++f)for(var _=0;32>_;_+=8)y[p++]=this.g[f]>>>_&255;return y};function o(y,f){var p=u;return Object.prototype.hasOwnProperty.call(p,y)?p[y]:p[y]=f(y)}function c(y,f){this.h=f;for(var p=[],_=!0,v=y.length-1;0<=v;v--){var T=y[v]|0;_&&T==f||(p[v]=T,_=!1)}this.g=p}var u={};function d(y){return-128<=y&&128>y?o(y,function(f){return new c([f|0],0>f?-1:0)}):new c([y|0],0>y?-1:0)}function g(y){if(isNaN(y)||!isFinite(y))return A;if(0>y)return R(g(-y));for(var f=[],p=1,_=0;y>=p;_++)f[_]=y/p|0,p*=4294967296;return new c(f,0)}function E(y,f){if(y.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(y.charAt(0)=="-")return R(E(y.substring(1),f));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=g(Math.pow(f,8)),_=A,v=0;v<y.length;v+=8){var T=Math.min(8,y.length-v),m=parseInt(y.substring(v,v+T),f);8>T?(T=g(Math.pow(f,T)),_=_.j(T).add(g(m))):(_=_.j(p),_=_.add(g(m)))}return _}var A=d(0),P=d(1),O=d(16777216);t=c.prototype,t.m=function(){if(C(this))return-R(this).m();for(var y=0,f=1,p=0;p<this.g.length;p++){var _=this.i(p);y+=(0<=_?_:4294967296+_)*f,f*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(S(this))return"0";if(C(this))return"-"+R(this).toString(y);for(var f=g(Math.pow(y,6)),p=this,_="";;){var v=x(p,f).g;p=M(p,v.j(f));var T=((0<p.g.length?p.g[0]:p.h)>>>0).toString(y);if(p=v,S(p))return T+_;for(;6>T.length;)T="0"+T;_=T+_}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function S(y){if(y.h!=0)return!1;for(var f=0;f<y.g.length;f++)if(y.g[f]!=0)return!1;return!0}function C(y){return y.h==-1}t.l=function(y){return y=M(this,y),C(y)?-1:S(y)?0:1};function R(y){for(var f=y.g.length,p=[],_=0;_<f;_++)p[_]=~y.g[_];return new c(p,~y.h).add(P)}t.abs=function(){return C(this)?R(this):this},t.add=function(y){for(var f=Math.max(this.g.length,y.g.length),p=[],_=0,v=0;v<=f;v++){var T=_+(this.i(v)&65535)+(y.i(v)&65535),m=(T>>>16)+(this.i(v)>>>16)+(y.i(v)>>>16);_=m>>>16,T&=65535,m&=65535,p[v]=m<<16|T}return new c(p,p[p.length-1]&-2147483648?-1:0)};function M(y,f){return y.add(R(f))}t.j=function(y){if(S(this)||S(y))return A;if(C(this))return C(y)?R(this).j(R(y)):R(R(this).j(y));if(C(y))return R(this.j(R(y)));if(0>this.l(O)&&0>y.l(O))return g(this.m()*y.m());for(var f=this.g.length+y.g.length,p=[],_=0;_<2*f;_++)p[_]=0;for(_=0;_<this.g.length;_++)for(var v=0;v<y.g.length;v++){var T=this.i(_)>>>16,m=this.i(_)&65535,Re=y.i(v)>>>16,bt=y.i(v)&65535;p[2*_+2*v]+=m*bt,L(p,2*_+2*v),p[2*_+2*v+1]+=T*bt,L(p,2*_+2*v+1),p[2*_+2*v+1]+=m*Re,L(p,2*_+2*v+1),p[2*_+2*v+2]+=T*Re,L(p,2*_+2*v+2)}for(_=0;_<f;_++)p[_]=p[2*_+1]<<16|p[2*_];for(_=f;_<2*f;_++)p[_]=0;return new c(p,0)};function L(y,f){for(;(y[f]&65535)!=y[f];)y[f+1]+=y[f]>>>16,y[f]&=65535,f++}function N(y,f){this.g=y,this.h=f}function x(y,f){if(S(f))throw Error("division by zero");if(S(y))return new N(A,A);if(C(y))return f=x(R(y),f),new N(R(f.g),R(f.h));if(C(f))return f=x(y,R(f)),new N(R(f.g),f.h);if(30<y.g.length){if(C(y)||C(f))throw Error("slowDivide_ only works with positive integers.");for(var p=P,_=f;0>=_.l(y);)p=V(p),_=V(_);var v=$(p,1),T=$(_,1);for(_=$(_,2),p=$(p,2);!S(_);){var m=T.add(_);0>=m.l(y)&&(v=v.add(p),T=m),_=$(_,1),p=$(p,1)}return f=M(y,v.j(f)),new N(v,f)}for(v=A;0<=y.l(f);){for(p=Math.max(1,Math.floor(y.m()/f.m())),_=Math.ceil(Math.log(p)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),T=g(p),m=T.j(f);C(m)||0<m.l(y);)p-=_,T=g(p),m=T.j(f);S(T)&&(T=P),v=v.add(T),y=M(y,m)}return new N(v,y)}t.A=function(y){return x(this,y).h},t.and=function(y){for(var f=Math.max(this.g.length,y.g.length),p=[],_=0;_<f;_++)p[_]=this.i(_)&y.i(_);return new c(p,this.h&y.h)},t.or=function(y){for(var f=Math.max(this.g.length,y.g.length),p=[],_=0;_<f;_++)p[_]=this.i(_)|y.i(_);return new c(p,this.h|y.h)},t.xor=function(y){for(var f=Math.max(this.g.length,y.g.length),p=[],_=0;_<f;_++)p[_]=this.i(_)^y.i(_);return new c(p,this.h^y.h)};function V(y){for(var f=y.g.length+1,p=[],_=0;_<f;_++)p[_]=y.i(_)<<1|y.i(_-1)>>>31;return new c(p,y.h)}function $(y,f){var p=f>>5;f%=32;for(var _=y.g.length-p,v=[],T=0;T<_;T++)v[T]=0<f?y.i(T+p)>>>f|y.i(T+p+1)<<32-f:y.i(T+p);return new c(v,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=g,c.fromString=E,Xa=c}).apply(typeof vo<"u"?vo:typeof self<"u"?self:typeof window<"u"?window:{});var Sn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,l){return i==Array.prototype||i==Object.prototype||(i[a]=l.value),i};function n(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Sn=="object"&&Sn];for(var a=0;a<i.length;++a){var l=i[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=n(this);function s(i,a){if(a)e:{var l=r;i=i.split(".");for(var h=0;h<i.length-1;h++){var w=i[h];if(!(w in l))break e;l=l[w]}i=i[i.length-1],h=l[i],a=a(h),a!=h&&a!=null&&e(l,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var l=0,h=!1,w={next:function(){if(!h&&l<i.length){var I=l++;return{value:a(I,i[I]),done:!1}}return h=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},u=this||self;function d(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function g(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function E(i,a,l){return i.call.apply(i.bind,arguments)}function A(i,a,l){if(!i)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,h),i.apply(a,w)}}return function(){return i.apply(a,arguments)}}function P(i,a,l){return P=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?E:A,P.apply(null,arguments)}function O(i,a){var l=Array.prototype.slice.call(arguments,1);return function(){var h=l.slice();return h.push.apply(h,arguments),i.apply(this,h)}}function S(i,a){function l(){}l.prototype=a.prototype,i.aa=a.prototype,i.prototype=new l,i.prototype.constructor=i,i.Qb=function(h,w,I){for(var k=Array(arguments.length-2),z=2;z<arguments.length;z++)k[z-2]=arguments[z];return a.prototype[w].apply(h,k)}}function C(i){const a=i.length;if(0<a){const l=Array(a);for(let h=0;h<a;h++)l[h]=i[h];return l}return[]}function R(i,a){for(let l=1;l<arguments.length;l++){const h=arguments[l];if(d(h)){const w=i.length||0,I=h.length||0;i.length=w+I;for(let k=0;k<I;k++)i[w+k]=h[k]}else i.push(h)}}class M{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function L(i){return/^[\s\xa0]*$/.test(i)}function N(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function x(i){return x[" "](i),i}x[" "]=function(){};var V=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function $(i,a,l){for(const h in i)a.call(l,i[h],h,i)}function y(i,a){for(const l in i)a.call(void 0,i[l],l,i)}function f(i){const a={};for(const l in i)a[l]=i[l];return a}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(i,a){let l,h;for(let w=1;w<arguments.length;w++){h=arguments[w];for(l in h)i[l]=h[l];for(let I=0;I<p.length;I++)l=p[I],Object.prototype.hasOwnProperty.call(h,l)&&(i[l]=h[l])}}function v(i){var a=1;i=i.split(":");const l=[];for(;0<a&&i.length;)l.push(i.shift()),a--;return i.length&&l.push(i.join(":")),l}function T(i){u.setTimeout(()=>{throw i},0)}function m(){var i=dr;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Re{constructor(){this.h=this.g=null}add(a,l){const h=bt.get();h.set(a,l),this.h?this.h.next=h:this.g=h,this.h=h}}var bt=new M(()=>new el,i=>i.reset());class el{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let At,St=!1,dr=new Re,qi=()=>{const i=u.Promise.resolve(void 0);At=()=>{i.then(tl)}};var tl=()=>{for(var i;i=m();){try{i.h.call(i.g)}catch(l){T(l)}var a=bt;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}St=!1};function Me(){this.s=this.s,this.C=this.C}Me.prototype.s=!1,Me.prototype.ma=function(){this.s||(this.s=!0,this.N())},Me.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Z(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}Z.prototype.h=function(){this.defaultPrevented=!0};var nl=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch{}return i}();function Rt(i,a){if(Z.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var l=this.type=i.type,h=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(V){e:{try{x(a.nodeName);var w=!0;break e}catch{}w=!1}w||(a=null)}}else l=="mouseover"?a=i.fromElement:l=="mouseout"&&(a=i.toElement);this.relatedTarget=a,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:rl[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Rt.aa.h.call(this)}}S(Rt,Z);var rl={2:"touch",3:"pen",4:"mouse"};Rt.prototype.h=function(){Rt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var cn="closure_listenable_"+(1e6*Math.random()|0),il=0;function sl(i,a,l,h,w){this.listener=i,this.proxy=null,this.src=a,this.type=l,this.capture=!!h,this.ha=w,this.key=++il,this.da=this.fa=!1}function ln(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function un(i){this.src=i,this.g={},this.h=0}un.prototype.add=function(i,a,l,h,w){var I=i.toString();i=this.g[I],i||(i=this.g[I]=[],this.h++);var k=pr(i,a,h,w);return-1<k?(a=i[k],l||(a.fa=!1)):(a=new sl(a,this.src,I,!!h,w),a.fa=l,i.push(a)),a};function fr(i,a){var l=a.type;if(l in i.g){var h=i.g[l],w=Array.prototype.indexOf.call(h,a,void 0),I;(I=0<=w)&&Array.prototype.splice.call(h,w,1),I&&(ln(a),i.g[l].length==0&&(delete i.g[l],i.h--))}}function pr(i,a,l,h){for(var w=0;w<i.length;++w){var I=i[w];if(!I.da&&I.listener==a&&I.capture==!!l&&I.ha==h)return w}return-1}var gr="closure_lm_"+(1e6*Math.random()|0),mr={};function Gi(i,a,l,h,w){if(Array.isArray(a)){for(var I=0;I<a.length;I++)Gi(i,a[I],l,h,w);return null}return l=Xi(l),i&&i[cn]?i.K(a,l,g(h)?!!h.capture:!!h,w):ol(i,a,l,!1,h,w)}function ol(i,a,l,h,w,I){if(!a)throw Error("Invalid event type");var k=g(w)?!!w.capture:!!w,z=yr(i);if(z||(i[gr]=z=new un(i)),l=z.add(a,l,h,k,I),l.proxy)return l;if(h=al(),l.proxy=h,h.src=i,h.listener=l,i.addEventListener)nl||(w=k),w===void 0&&(w=!1),i.addEventListener(a.toString(),h,w);else if(i.attachEvent)i.attachEvent(Ji(a.toString()),h);else if(i.addListener&&i.removeListener)i.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return l}function al(){function i(l){return a.call(i.src,i.listener,l)}const a=cl;return i}function Ki(i,a,l,h,w){if(Array.isArray(a))for(var I=0;I<a.length;I++)Ki(i,a[I],l,h,w);else h=g(h)?!!h.capture:!!h,l=Xi(l),i&&i[cn]?(i=i.i,a=String(a).toString(),a in i.g&&(I=i.g[a],l=pr(I,l,h,w),-1<l&&(ln(I[l]),Array.prototype.splice.call(I,l,1),I.length==0&&(delete i.g[a],i.h--)))):i&&(i=yr(i))&&(a=i.g[a.toString()],i=-1,a&&(i=pr(a,l,h,w)),(l=-1<i?a[i]:null)&&_r(l))}function _r(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[cn])fr(a.i,i);else{var l=i.type,h=i.proxy;a.removeEventListener?a.removeEventListener(l,h,i.capture):a.detachEvent?a.detachEvent(Ji(l),h):a.addListener&&a.removeListener&&a.removeListener(h),(l=yr(a))?(fr(l,i),l.h==0&&(l.src=null,a[gr]=null)):ln(i)}}}function Ji(i){return i in mr?mr[i]:mr[i]="on"+i}function cl(i,a){if(i.da)i=!0;else{a=new Rt(a,this);var l=i.listener,h=i.ha||i.src;i.fa&&_r(i),i=l.call(h,a)}return i}function yr(i){return i=i[gr],i instanceof un?i:null}var vr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Xi(i){return typeof i=="function"?i:(i[vr]||(i[vr]=function(a){return i.handleEvent(a)}),i[vr])}function ee(){Me.call(this),this.i=new un(this),this.M=this,this.F=null}S(ee,Me),ee.prototype[cn]=!0,ee.prototype.removeEventListener=function(i,a,l,h){Ki(this,i,a,l,h)};function ie(i,a){var l,h=i.F;if(h)for(l=[];h;h=h.F)l.push(h);if(i=i.M,h=a.type||a,typeof a=="string")a=new Z(a,i);else if(a instanceof Z)a.target=a.target||i;else{var w=a;a=new Z(h,i),_(a,w)}if(w=!0,l)for(var I=l.length-1;0<=I;I--){var k=a.g=l[I];w=hn(k,h,!0,a)&&w}if(k=a.g=i,w=hn(k,h,!0,a)&&w,w=hn(k,h,!1,a)&&w,l)for(I=0;I<l.length;I++)k=a.g=l[I],w=hn(k,h,!1,a)&&w}ee.prototype.N=function(){if(ee.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var l=i.g[a],h=0;h<l.length;h++)ln(l[h]);delete i.g[a],i.h--}}this.F=null},ee.prototype.K=function(i,a,l,h){return this.i.add(String(i),a,!1,l,h)},ee.prototype.L=function(i,a,l,h){return this.i.add(String(i),a,!0,l,h)};function hn(i,a,l,h){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var w=!0,I=0;I<a.length;++I){var k=a[I];if(k&&!k.da&&k.capture==l){var z=k.listener,Y=k.ha||k.src;k.fa&&fr(i.i,k),w=z.call(Y,h)!==!1&&w}}return w&&!h.defaultPrevented}function Yi(i,a,l){if(typeof i=="function")l&&(i=P(i,l));else if(i&&typeof i.handleEvent=="function")i=P(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(i,a||0)}function Qi(i){i.g=Yi(()=>{i.g=null,i.i&&(i.i=!1,Qi(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class ll extends Me{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Qi(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function kt(i){Me.call(this),this.h=i,this.g={}}S(kt,Me);var Zi=[];function es(i){$(i.g,function(a,l){this.g.hasOwnProperty(l)&&_r(a)},i),i.g={}}kt.prototype.N=function(){kt.aa.N.call(this),es(this)},kt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wr=u.JSON.stringify,ul=u.JSON.parse,hl=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function Tr(){}Tr.prototype.h=null;function ts(i){return i.h||(i.h=i.i())}function dl(){}var Pt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Er(){Z.call(this,"d")}S(Er,Z);function Ir(){Z.call(this,"c")}S(Ir,Z);var ut={},ns=null;function br(){return ns=ns||new ee}ut.La="serverreachability";function rs(i){Z.call(this,ut.La,i)}S(rs,Z);function Ct(i){const a=br();ie(a,new rs(a))}ut.STAT_EVENT="statevent";function is(i,a){Z.call(this,ut.STAT_EVENT,i),this.stat=a}S(is,Z);function se(i){const a=br();ie(a,new is(a,i))}ut.Ma="timingevent";function ss(i,a){Z.call(this,ut.Ma,i),this.size=a}S(ss,Z);function Ot(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},a)}function Nt(){this.g=!0}Nt.prototype.xa=function(){this.g=!1};function fl(i,a,l,h,w,I){i.info(function(){if(i.g)if(I)for(var k="",z=I.split("&"),Y=0;Y<z.length;Y++){var B=z[Y].split("=");if(1<B.length){var te=B[0];B=B[1];var ne=te.split("_");k=2<=ne.length&&ne[1]=="type"?k+(te+"="+B+"&"):k+(te+"=redacted&")}}else k=null;else k=I;return"XMLHTTP REQ ("+h+") [attempt "+w+"]: "+a+`
`+l+`
`+k})}function pl(i,a,l,h,w,I,k){i.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+w+"]: "+a+`
`+l+`
`+I+" "+k})}function ht(i,a,l,h){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+ml(i,l)+(h?" "+h:"")})}function gl(i,a){i.info(function(){return"TIMEOUT: "+a})}Nt.prototype.info=function(){};function ml(i,a){if(!i.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(i=0;i<l.length;i++)if(Array.isArray(l[i])){var h=l[i];if(!(2>h.length)){var w=h[1];if(Array.isArray(w)&&!(1>w.length)){var I=w[0];if(I!="noop"&&I!="stop"&&I!="close")for(var k=1;k<w.length;k++)w[k]=""}}}}return wr(l)}catch{return a}}var Ar={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},_l={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Sr;function dn(){}S(dn,Tr),dn.prototype.g=function(){return new XMLHttpRequest},dn.prototype.i=function(){return{}},Sr=new dn;function xe(i,a,l,h){this.j=i,this.i=a,this.l=l,this.R=h||1,this.U=new kt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new os}function os(){this.i=null,this.g="",this.h=!1}var as={},Rr={};function kr(i,a,l){i.L=1,i.v=mn(ke(a)),i.m=l,i.P=!0,cs(i,null)}function cs(i,a){i.F=Date.now(),fn(i),i.A=ke(i.v);var l=i.A,h=i.R;Array.isArray(h)||(h=[String(h)]),Es(l.i,"t",h),i.C=0,l=i.j.J,i.h=new os,i.g=js(i.j,l?a:null,!i.m),0<i.O&&(i.M=new ll(P(i.Y,i,i.g),i.O)),a=i.U,l=i.g,h=i.ca;var w="readystatechange";Array.isArray(w)||(w&&(Zi[0]=w.toString()),w=Zi);for(var I=0;I<w.length;I++){var k=Gi(l,w[I],h||a.handleEvent,!1,a.h||a);if(!k)break;a.g[k.key]=k}a=i.H?f(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),Ct(),fl(i.i,i.u,i.A,i.l,i.R,i.m)}xe.prototype.ca=function(i){i=i.target;const a=this.M;a&&Pe(i)==3?a.j():this.Y(i)},xe.prototype.Y=function(i){try{if(i==this.g)e:{const ne=Pe(this.g);var a=this.g.Ba();const pt=this.g.Z();if(!(3>ne)&&(ne!=3||this.g&&(this.h.h||this.g.oa()||Ps(this.g)))){this.J||ne!=4||a==7||(a==8||0>=pt?Ct(3):Ct(2)),Pr(this);var l=this.g.Z();this.X=l;t:if(ls(this)){var h=Ps(this.g);i="";var w=h.length,I=Pe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ye(this),Dt(this);var k="";break t}this.h.i=new u.TextDecoder}for(a=0;a<w;a++)this.h.h=!0,i+=this.h.i.decode(h[a],{stream:!(I&&a==w-1)});h.length=0,this.h.g+=i,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=l==200,pl(this.i,this.u,this.A,this.l,this.R,ne,l),this.o){if(this.T&&!this.K){t:{if(this.g){var z,Y=this.g;if((z=Y.g?Y.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(z)){var B=z;break t}}B=null}if(l=B)ht(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Cr(this,l);else{this.o=!1,this.s=3,se(12),Ye(this),Dt(this);break e}}if(this.P){l=!0;let ye;for(;!this.J&&this.C<k.length;)if(ye=yl(this,k),ye==Rr){ne==4&&(this.s=4,se(14),l=!1),ht(this.i,this.l,null,"[Incomplete Response]");break}else if(ye==as){this.s=4,se(15),ht(this.i,this.l,k,"[Invalid Chunk]"),l=!1;break}else ht(this.i,this.l,ye,null),Cr(this,ye);if(ls(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ne!=4||k.length!=0||this.h.h||(this.s=1,se(16),l=!1),this.o=this.o&&l,!l)ht(this.i,this.l,k,"[Invalid Chunked Response]"),Ye(this),Dt(this);else if(0<k.length&&!this.W){this.W=!0;var te=this.j;te.g==this&&te.ba&&!te.M&&(te.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),Mr(te),te.M=!0,se(11))}}else ht(this.i,this.l,k,null),Cr(this,k);ne==4&&Ye(this),this.o&&!this.J&&(ne==4?Ms(this.j,this):(this.o=!1,fn(this)))}else Ul(this.g),l==400&&0<k.indexOf("Unknown SID")?(this.s=3,se(12)):(this.s=0,se(13)),Ye(this),Dt(this)}}}catch{}finally{}};function ls(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function yl(i,a){var l=i.C,h=a.indexOf(`
`,l);return h==-1?Rr:(l=Number(a.substring(l,h)),isNaN(l)?as:(h+=1,h+l>a.length?Rr:(a=a.slice(h,h+l),i.C=h+l,a)))}xe.prototype.cancel=function(){this.J=!0,Ye(this)};function fn(i){i.S=Date.now()+i.I,us(i,i.I)}function us(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Ot(P(i.ba,i),a)}function Pr(i){i.B&&(u.clearTimeout(i.B),i.B=null)}xe.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(gl(this.i,this.A),this.L!=2&&(Ct(),se(17)),Ye(this),this.s=2,Dt(this)):us(this,this.S-i)};function Dt(i){i.j.G==0||i.J||Ms(i.j,i)}function Ye(i){Pr(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,es(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function Cr(i,a){try{var l=i.j;if(l.G!=0&&(l.g==i||Or(l.h,i))){if(!i.K&&Or(l.h,i)&&l.G==3){try{var h=l.Da.g.parse(a)}catch{h=null}if(Array.isArray(h)&&h.length==3){var w=h;if(w[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<i.F)En(l),wn(l);else break e;Ur(l),se(18)}}else l.za=w[1],0<l.za-l.T&&37500>w[2]&&l.F&&l.v==0&&!l.C&&(l.C=Ot(P(l.Za,l),6e3));if(1>=fs(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else Ze(l,11)}else if((i.K||l.g==i)&&En(l),!L(a))for(w=l.Da.g.parse(a),a=0;a<w.length;a++){let B=w[a];if(l.T=B[0],B=B[1],l.G==2)if(B[0]=="c"){l.K=B[1],l.ia=B[2];const te=B[3];te!=null&&(l.la=te,l.j.info("VER="+l.la));const ne=B[4];ne!=null&&(l.Aa=ne,l.j.info("SVER="+l.Aa));const pt=B[5];pt!=null&&typeof pt=="number"&&0<pt&&(h=1.5*pt,l.L=h,l.j.info("backChannelRequestTimeoutMs_="+h)),h=l;const ye=i.g;if(ye){const In=ye.g?ye.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(In){var I=h.h;I.g||In.indexOf("spdy")==-1&&In.indexOf("quic")==-1&&In.indexOf("h2")==-1||(I.j=I.l,I.g=new Set,I.h&&(Nr(I,I.h),I.h=null))}if(h.D){const xr=ye.g?ye.g.getResponseHeader("X-HTTP-Session-Id"):null;xr&&(h.ya=xr,W(h.I,h.D,xr))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-i.F,l.j.info("Handshake RTT: "+l.R+"ms")),h=l;var k=i;if(h.qa=Bs(h,h.J?h.ia:null,h.W),k.K){ps(h.h,k);var z=k,Y=h.L;Y&&(z.I=Y),z.B&&(Pr(z),fn(z)),h.g=k}else Ls(h);0<l.i.length&&Tn(l)}else B[0]!="stop"&&B[0]!="close"||Ze(l,7);else l.G==3&&(B[0]=="stop"||B[0]=="close"?B[0]=="stop"?Ze(l,7):Lr(l):B[0]!="noop"&&l.l&&l.l.ta(B),l.v=0)}}Ct(4)}catch{}}var vl=class{constructor(i,a){this.g=i,this.map=a}};function hs(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ds(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function fs(i){return i.h?1:i.g?i.g.size:0}function Or(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function Nr(i,a){i.g?i.g.add(a):i.h=a}function ps(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}hs.prototype.cancel=function(){if(this.i=gs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function gs(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const l of i.g.values())a=a.concat(l.D);return a}return C(i.i)}function wl(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(d(i)){for(var a=[],l=i.length,h=0;h<l;h++)a.push(i[h]);return a}a=[],l=0;for(h in i)a[l++]=i[h];return a}function Tl(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(d(i)||typeof i=="string"){var a=[];i=i.length;for(var l=0;l<i;l++)a.push(l);return a}a=[],l=0;for(const h in i)a[l++]=h;return a}}}function ms(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(d(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var l=Tl(i),h=wl(i),w=h.length,I=0;I<w;I++)a.call(void 0,h[I],l&&l[I],i)}var _s=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function El(i,a){if(i){i=i.split("&");for(var l=0;l<i.length;l++){var h=i[l].indexOf("="),w=null;if(0<=h){var I=i[l].substring(0,h);w=i[l].substring(h+1)}else I=i[l];a(I,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Qe(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Qe){this.h=i.h,pn(this,i.j),this.o=i.o,this.g=i.g,gn(this,i.s),this.l=i.l;var a=i.i,l=new Mt;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),ys(this,l),this.m=i.m}else i&&(a=String(i).match(_s))?(this.h=!1,pn(this,a[1]||"",!0),this.o=Lt(a[2]||""),this.g=Lt(a[3]||"",!0),gn(this,a[4]),this.l=Lt(a[5]||"",!0),ys(this,a[6]||"",!0),this.m=Lt(a[7]||"")):(this.h=!1,this.i=new Mt(null,this.h))}Qe.prototype.toString=function(){var i=[],a=this.j;a&&i.push(Ut(a,vs,!0),":");var l=this.g;return(l||a=="file")&&(i.push("//"),(a=this.o)&&i.push(Ut(a,vs,!0),"@"),i.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&i.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(Ut(l,l.charAt(0)=="/"?Al:bl,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",Ut(l,Rl)),i.join("")};function ke(i){return new Qe(i)}function pn(i,a,l){i.j=l?Lt(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function gn(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function ys(i,a,l){a instanceof Mt?(i.i=a,kl(i.i,i.h)):(l||(a=Ut(a,Sl)),i.i=new Mt(a,i.h))}function W(i,a,l){i.i.set(a,l)}function mn(i){return W(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Lt(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ut(i,a,l){return typeof i=="string"?(i=encodeURI(i).replace(a,Il),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Il(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var vs=/[#\/\?@]/g,bl=/[#\?:]/g,Al=/[#\?]/g,Sl=/[#\?@]/g,Rl=/#/g;function Mt(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Fe(i){i.g||(i.g=new Map,i.h=0,i.i&&El(i.i,function(a,l){i.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}t=Mt.prototype,t.add=function(i,a){Fe(this),this.i=null,i=dt(this,i);var l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(a),this.h+=1,this};function ws(i,a){Fe(i),a=dt(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function Ts(i,a){return Fe(i),a=dt(i,a),i.g.has(a)}t.forEach=function(i,a){Fe(this),this.g.forEach(function(l,h){l.forEach(function(w){i.call(a,w,h,this)},this)},this)},t.na=function(){Fe(this);const i=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let h=0;h<a.length;h++){const w=i[h];for(let I=0;I<w.length;I++)l.push(a[h])}return l},t.V=function(i){Fe(this);let a=[];if(typeof i=="string")Ts(this,i)&&(a=a.concat(this.g.get(dt(this,i))));else{i=Array.from(this.g.values());for(let l=0;l<i.length;l++)a=a.concat(i[l])}return a},t.set=function(i,a){return Fe(this),this.i=null,i=dt(this,i),Ts(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},t.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function Es(i,a,l){ws(i,a),0<l.length&&(i.i=null,i.g.set(dt(i,a),C(l)),i.h+=l.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var h=a[l];const I=encodeURIComponent(String(h)),k=this.V(h);for(h=0;h<k.length;h++){var w=I;k[h]!==""&&(w+="="+encodeURIComponent(String(k[h]))),i.push(w)}}return this.i=i.join("&")};function dt(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function kl(i,a){a&&!i.j&&(Fe(i),i.i=null,i.g.forEach(function(l,h){var w=h.toLowerCase();h!=w&&(ws(this,h),Es(this,w,l))},i)),i.j=a}function Pl(i,a){const l=new Nt;if(u.Image){const h=new Image;h.onload=O(Be,l,"TestLoadImage: loaded",!0,a,h),h.onerror=O(Be,l,"TestLoadImage: error",!1,a,h),h.onabort=O(Be,l,"TestLoadImage: abort",!1,a,h),h.ontimeout=O(Be,l,"TestLoadImage: timeout",!1,a,h),u.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=i}else a(!1)}function Cl(i,a){const l=new Nt,h=new AbortController,w=setTimeout(()=>{h.abort(),Be(l,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:h.signal}).then(I=>{clearTimeout(w),I.ok?Be(l,"TestPingServer: ok",!0,a):Be(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(w),Be(l,"TestPingServer: error",!1,a)})}function Be(i,a,l,h,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),h(l)}catch{}}function Ol(){this.g=new hl}function Nl(i,a,l){const h=l||"";try{ms(i,function(w,I){let k=w;g(w)&&(k=wr(w)),a.push(h+I+"="+encodeURIComponent(k))})}catch(w){throw a.push(h+"type="+encodeURIComponent("_badmap")),w}}function _n(i){this.l=i.Ub||null,this.j=i.eb||!1}S(_n,Tr),_n.prototype.g=function(){return new yn(this.l,this.j)},_n.prototype.i=function(i){return function(){return i}}({});function yn(i,a){ee.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(yn,ee),t=yn.prototype,t.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,Ft(this)},t.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xt(this)),this.readyState=0},t.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Ft(this)),this.g&&(this.readyState=3,Ft(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Is(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Is(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}t.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?xt(this):Ft(this),this.readyState==3&&Is(this)}},t.Ra=function(i){this.g&&(this.response=this.responseText=i,xt(this))},t.Qa=function(i){this.g&&(this.response=i,xt(this))},t.ga=function(){this.g&&xt(this)};function xt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Ft(i)}t.setRequestHeader=function(i,a){this.u.append(i,a)},t.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=a.next();return i.join(`\r
`)};function Ft(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(yn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function bs(i){let a="";return $(i,function(l,h){a+=h,a+=":",a+=l,a+=`\r
`}),a}function Dr(i,a,l){e:{for(h in l){var h=!1;break e}h=!0}h||(l=bs(l),typeof i=="string"?l!=null&&encodeURIComponent(String(l)):W(i,a,l))}function J(i){ee.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(J,ee);var Dl=/^https?$/i,Ll=["POST","PUT"];t=J.prototype,t.Ha=function(i){this.J=i},t.ea=function(i,a,l,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Sr.g(),this.v=this.o?ts(this.o):ts(Sr),this.g.onreadystatechange=P(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(I){As(this,I);return}if(i=l||"",l=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var w in h)l.set(w,h[w]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const I of h.keys())l.set(I,h.get(I));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(l.keys()).find(I=>I.toLowerCase()=="content-type"),w=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Ll,a,void 0))||h||w||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[I,k]of l)this.g.setRequestHeader(I,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ks(this),this.u=!0,this.g.send(i),this.u=!1}catch(I){As(this,I)}};function As(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,Ss(i),vn(i)}function Ss(i){i.A||(i.A=!0,ie(i,"complete"),ie(i,"error"))}t.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,ie(this,"complete"),ie(this,"abort"),vn(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vn(this,!0)),J.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Rs(this):this.bb())},t.bb=function(){Rs(this)};function Rs(i){if(i.h&&typeof c<"u"&&(!i.v[1]||Pe(i)!=4||i.Z()!=2)){if(i.u&&Pe(i)==4)Yi(i.Ea,0,i);else if(ie(i,"readystatechange"),Pe(i)==4){i.h=!1;try{const k=i.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var h;if(h=k===0){var w=String(i.D).match(_s)[1]||null;!w&&u.self&&u.self.location&&(w=u.self.location.protocol.slice(0,-1)),h=!Dl.test(w?w.toLowerCase():"")}l=h}if(l)ie(i,"complete"),ie(i,"success");else{i.m=6;try{var I=2<Pe(i)?i.g.statusText:""}catch{I=""}i.l=I+" ["+i.Z()+"]",Ss(i)}}finally{vn(i)}}}}function vn(i,a){if(i.g){ks(i);const l=i.g,h=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||ie(i,"ready");try{l.onreadystatechange=h}catch{}}}function ks(i){i.I&&(u.clearTimeout(i.I),i.I=null)}t.isActive=function(){return!!this.g};function Pe(i){return i.g?i.g.readyState:0}t.Z=function(){try{return 2<Pe(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),ul(a)}};function Ps(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Ul(i){const a={};i=(i.g&&2<=Pe(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<i.length;h++){if(L(i[h]))continue;var l=v(i[h]);const w=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const I=a[w]||[];a[w]=I,I.push(l)}y(a,function(h){return h.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bt(i,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||a}function Cs(i){this.Aa=0,this.i=[],this.j=new Nt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Bt("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Bt("baseRetryDelayMs",5e3,i),this.cb=Bt("retryDelaySeedMs",1e4,i),this.Wa=Bt("forwardChannelMaxRetries",2,i),this.wa=Bt("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new hs(i&&i.concurrentRequestLimit),this.Da=new Ol,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Cs.prototype,t.la=8,t.G=1,t.connect=function(i,a,l,h){se(0),this.W=i,this.H=a||{},l&&h!==void 0&&(this.H.OSID=l,this.H.OAID=h),this.F=this.X,this.I=Bs(this,null,this.W),Tn(this)};function Lr(i){if(Os(i),i.G==3){var a=i.U++,l=ke(i.I);if(W(l,"SID",i.K),W(l,"RID",a),W(l,"TYPE","terminate"),jt(i,l),a=new xe(i,i.j,a),a.L=2,a.v=mn(ke(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=a.v,l=!0),l||(a.g=js(a.j,null),a.g.ea(a.v)),a.F=Date.now(),fn(a)}Fs(i)}function wn(i){i.g&&(Mr(i),i.g.cancel(),i.g=null)}function Os(i){wn(i),i.u&&(u.clearTimeout(i.u),i.u=null),En(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function Tn(i){if(!ds(i.h)&&!i.s){i.s=!0;var a=i.Ga;At||qi(),St||(At(),St=!0),dr.add(a,i),i.B=0}}function Ml(i,a){return fs(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Ot(P(i.Ga,i,a),xs(i,i.B)),i.B++,!0)}t.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const w=new xe(this,this.j,i);let I=this.o;if(this.S&&(I?(I=f(I),_(I,this.S)):I=this.S),this.m!==null||this.O||(w.H=I,I=null),this.P)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var h=this.i[l];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break t}h=void 0}if(h===void 0)break;if(a+=h,4096<a){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=Ds(this,w,a),l=ke(this.I),W(l,"RID",i),W(l,"CVER",22),this.D&&W(l,"X-HTTP-Session-Id",this.D),jt(this,l),I&&(this.O?a="headers="+encodeURIComponent(String(bs(I)))+"&"+a:this.m&&Dr(l,this.m,I)),Nr(this.h,w),this.Ua&&W(l,"TYPE","init"),this.P?(W(l,"$req",a),W(l,"SID","null"),w.T=!0,kr(w,l,null)):kr(w,l,a),this.G=2}}else this.G==3&&(i?Ns(this,i):this.i.length==0||ds(this.h)||Ns(this))};function Ns(i,a){var l;a?l=a.l:l=i.U++;const h=ke(i.I);W(h,"SID",i.K),W(h,"RID",l),W(h,"AID",i.T),jt(i,h),i.m&&i.o&&Dr(h,i.m,i.o),l=new xe(i,i.j,l,i.B+1),i.m===null&&(l.H=i.o),a&&(i.i=a.D.concat(i.i)),a=Ds(i,l,1e3),l.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Nr(i.h,l),kr(l,h,a)}function jt(i,a){i.H&&$(i.H,function(l,h){W(a,h,l)}),i.l&&ms({},function(l,h){W(a,h,l)})}function Ds(i,a,l){l=Math.min(i.i.length,l);var h=i.l?P(i.l.Na,i.l,i):null;e:{var w=i.i;let I=-1;for(;;){const k=["count="+l];I==-1?0<l?(I=w[0].g,k.push("ofs="+I)):I=0:k.push("ofs="+I);let z=!0;for(let Y=0;Y<l;Y++){let B=w[Y].g;const te=w[Y].map;if(B-=I,0>B)I=Math.max(0,w[Y].g-100),z=!1;else try{Nl(te,k,"req"+B+"_")}catch{h&&h(te)}}if(z){h=k.join("&");break e}}}return i=i.i.splice(0,l),a.D=i,h}function Ls(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;At||qi(),St||(At(),St=!0),dr.add(a,i),i.v=0}}function Ur(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Ot(P(i.Fa,i),xs(i,i.v)),i.v++,!0)}t.Fa=function(){if(this.u=null,Us(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Ot(P(this.ab,this),i)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,se(10),wn(this),Us(this))};function Mr(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function Us(i){i.g=new xe(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=ke(i.qa);W(a,"RID","rpc"),W(a,"SID",i.K),W(a,"AID",i.T),W(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&W(a,"TO",i.ja),W(a,"TYPE","xmlhttp"),jt(i,a),i.m&&i.o&&Dr(a,i.m,i.o),i.L&&(i.g.I=i.L);var l=i.g;i=i.ia,l.L=1,l.v=mn(ke(a)),l.m=null,l.P=!0,cs(l,i)}t.Za=function(){this.C!=null&&(this.C=null,wn(this),Ur(this),se(19))};function En(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function Ms(i,a){var l=null;if(i.g==a){En(i),Mr(i),i.g=null;var h=2}else if(Or(i.h,a))l=a.D,ps(i.h,a),h=1;else return;if(i.G!=0){if(a.o)if(h==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var w=i.B;h=br(),ie(h,new ss(h,l)),Tn(i)}else Ls(i);else if(w=a.s,w==3||w==0&&0<a.X||!(h==1&&Ml(i,a)||h==2&&Ur(i)))switch(l&&0<l.length&&(a=i.h,a.i=a.i.concat(l)),w){case 1:Ze(i,5);break;case 4:Ze(i,10);break;case 3:Ze(i,6);break;default:Ze(i,2)}}}function xs(i,a){let l=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(l*=2),l*a}function Ze(i,a){if(i.j.info("Error code "+a),a==2){var l=P(i.fb,i),h=i.Xa;const w=!h;h=new Qe(h||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||pn(h,"https"),mn(h),w?Pl(h.toString(),l):Cl(h.toString(),l)}else se(2);i.G=0,i.l&&i.l.sa(a),Fs(i),Os(i)}t.fb=function(i){i?(this.j.info("Successfully pinged google.com"),se(2)):(this.j.info("Failed to ping google.com"),se(1))};function Fs(i){if(i.G=0,i.ka=[],i.l){const a=gs(i.h);(a.length!=0||i.i.length!=0)&&(R(i.ka,a),R(i.ka,i.i),i.h.i.length=0,C(i.i),i.i.length=0),i.l.ra()}}function Bs(i,a,l){var h=l instanceof Qe?ke(l):new Qe(l);if(h.g!="")a&&(h.g=a+"."+h.g),gn(h,h.s);else{var w=u.location;h=w.protocol,a=a?a+"."+w.hostname:w.hostname,w=+w.port;var I=new Qe(null);h&&pn(I,h),a&&(I.g=a),w&&gn(I,w),l&&(I.l=l),h=I}return l=i.D,a=i.ya,l&&a&&W(h,l,a),W(h,"VER",i.la),jt(i,h),h}function js(i,a,l){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new J(new _n({eb:l})):new J(i.pa),a.Ha(i.J),a}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function $s(){}t=$s.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function ge(i,a){ee.call(this),this.g=new Cs(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!L(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!L(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new ft(this)}S(ge,ee),ge.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ge.prototype.close=function(){Lr(this.g)},ge.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.u&&(l={},l.__data__=wr(i),i=l);a.i.push(new vl(a.Ya++,i)),a.G==3&&Tn(a)},ge.prototype.N=function(){this.g.l=null,delete this.j,Lr(this.g),delete this.g,ge.aa.N.call(this)};function Hs(i){Er.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){e:{for(const l in a){i=l;break e}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}S(Hs,Er);function Vs(){Ir.call(this),this.status=1}S(Vs,Ir);function ft(i){this.g=i}S(ft,$s),ft.prototype.ua=function(){ie(this.g,"a")},ft.prototype.ta=function(i){ie(this.g,new Hs(i))},ft.prototype.sa=function(i){ie(this.g,new Vs)},ft.prototype.ra=function(){ie(this.g,"b")},ge.prototype.send=ge.prototype.o,ge.prototype.open=ge.prototype.m,ge.prototype.close=ge.prototype.close,Ar.NO_ERROR=0,Ar.TIMEOUT=8,Ar.HTTP_ERROR=6,_l.COMPLETE="complete",dl.EventType=Pt,Pt.OPEN="a",Pt.CLOSE="b",Pt.ERROR="c",Pt.MESSAGE="d",ee.prototype.listen=ee.prototype.K,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha}).apply(typeof Sn<"u"?Sn:typeof self<"u"?self:typeof window<"u"?window:{});const wo="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ae.UNAUTHENTICATED=new ae(null),ae.GOOGLE_CREDENTIALS=new ae("google-credentials-uid"),ae.FIRST_PARTY=new ae("first-party-uid"),ae.MOCK_USER=new ae("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sn="11.0.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=new er("@firebase/firestore");function ve(t,...e){if(wt.logLevel<=j.DEBUG){const n=e.map(Ni);wt.debug(`Firestore (${sn}): ${t}`,...n)}}function Ya(t,...e){if(wt.logLevel<=j.ERROR){const n=e.map(Ni);wt.error(`Firestore (${sn}): ${t}`,...n)}}function ff(t,...e){if(wt.logLevel<=j.WARN){const n=e.map(Ni);wt.warn(`Firestore (${sn}): ${t}`,...n)}}function Ni(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Di(t="Unexpected state"){const e=`FIRESTORE (${sn}) INTERNAL ASSERTION FAILED: `+t;throw Ya(e),new Error(e)}function Wt(t,e){t||Di()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class le extends _e{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class pf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ae.UNAUTHENTICATED))}shutdown(){}}class gf{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class mf{constructor(e){this.t=e,this.currentUser=ae.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Wt(this.o===void 0);let r=this.i;const s=d=>this.i!==r?(r=this.i,n(d)):Promise.resolve();let o=new qt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new qt,e.enqueueRetryable(()=>s(this.currentUser))};const c=()=>{const d=o;e.enqueueRetryable(async()=>{await d.promise,await s(this.currentUser)})},u=d=>{ve("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit(d=>u(d)),setTimeout(()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?u(d):(ve("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new qt)}},0),c()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(ve("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Wt(typeof r.accessToken=="string"),new Qa(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Wt(e===null||typeof e=="string"),new ae(e)}}class _f{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ae.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class yf{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new _f(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ae.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wf{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Wt(this.o===void 0);const r=o=>{o.error!=null&&ve("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const c=o.token!==this.R;return this.R=o.token,ve("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?n(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const s=o=>{ve("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):ve("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Wt(typeof n.token=="string"),this.R=n.token,new vf(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function Tf(t){return t.name==="IndexedDbTransactionError"}class Kn{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Kn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Kn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var To,F;(F=To||(To={}))[F.OK=0]="OK",F[F.CANCELLED=1]="CANCELLED",F[F.UNKNOWN=2]="UNKNOWN",F[F.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",F[F.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",F[F.NOT_FOUND=5]="NOT_FOUND",F[F.ALREADY_EXISTS=6]="ALREADY_EXISTS",F[F.PERMISSION_DENIED=7]="PERMISSION_DENIED",F[F.UNAUTHENTICATED=16]="UNAUTHENTICATED",F[F.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",F[F.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",F[F.ABORTED=10]="ABORTED",F[F.OUT_OF_RANGE=11]="OUT_OF_RANGE",F[F.UNIMPLEMENTED=12]="UNIMPLEMENTED",F[F.INTERNAL=13]="INTERNAL",F[F.UNAVAILABLE=14]="UNAVAILABLE",F[F.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Xa([4294967295,4294967295],0);function Gr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,n,r=1e3,s=1.5,o=6e4){this.li=e,this.timerId=n,this.Qo=r,this.Ko=s,this.$o=o,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(e){this.cancel();const n=Math.floor(this.Uo+this.Ho()),r=Math.max(0,Date.now()-this.Go),s=Math.max(0,n-r);s>0&&ve("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Uo} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,s,()=>(this.Go=Date.now(),e())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,n,r,s,o){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new qt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,o){const c=Date.now()+r,u=new Li(e,n,c,s,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new le(ce.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Eo,Io;(Io=Eo||(Eo={})).na="default",Io.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bo=new Map;function bf(t,e,n,r){if(e===!0&&r===!0)throw new le(ce.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Af(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Di()}function Sf(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new le(ce.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Af(t);throw new le(ce.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new le(ce.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new le(ce.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}bf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=If((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new le(ce.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new le(ce.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new le(ce.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Za{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ao({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new le(ce.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new le(ce.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ao(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new pf;switch(r.type){case"firstParty":return new yf(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new le(ce.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=bo.get(n);r&&(ve("ComponentProvider","Removing Datastore"),bo.delete(n),r.terminate())}(this),Promise.resolve()}}function Rf(t,e,n,r={}){var s;const o=(t=Sf(t,Za))._getSettings(),c=`${e}:${n}`;if(o.host!=="firestore.googleapis.com"&&o.host!==c&&ff("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},o),{host:c,ssl:!1})),r.mockUserToken){let u,d;if(typeof r.mockUserToken=="string")u=r.mockUserToken,d=ae.MOCK_USER;else{u=aa(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new le(ce.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new ae(g)}t._authCredentials=new gf(new Qa(u,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new Ef(this,"async_queue_retry"),this.fu=()=>{const r=Gr();r&&ve("AsyncQueue","Visibility state changed to "+r.visibilityState),this.r_.Jo()},this.gu=e;const n=Gr();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.pu(),this.yu(e)}enterRestrictedMode(e){if(!this.Eu){this.Eu=!0,this.Vu=e||!1;const n=Gr();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.fu)}}enqueue(e){if(this.pu(),this.Eu)return new Promise(()=>{});const n=new qt;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Iu.push(e),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(e){if(!Tf(e))throw e;ve("AsyncQueue","Operation failed with retryable error: "+e)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(e){const n=this.gu.then(()=>(this.Ru=!0,e().catch(r=>{this.Au=r,this.Ru=!1;const s=function(c){let u=c.message||"";return c.stack&&(u=c.stack.includes(c.message)?c.stack:c.message+`
`+c.stack),u}(r);throw Ya("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Ru=!1,r))));return this.gu=n,n}enqueueAfterDelay(e,n,r){this.pu(),this.mu.indexOf(e)>-1&&(n=0);const s=Li.createAndSchedule(this,e,n,r,o=>this.Su(o));return this.du.push(s),s}pu(){this.Au&&Di()}verifyOperationInProgress(){}async bu(){let e;do e=this.gu,await e;while(e!==this.gu)}Du(e){for(const n of this.du)if(n.timerId===e)return!0;return!1}vu(e){return this.bu().then(()=>{this.du.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.du)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.bu()})}Cu(e){this.mu.push(e)}Su(e){const n=this.du.indexOf(e);this.du.splice(n,1)}}class kf extends Za{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new So,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new So(e),this._firestoreClient=void 0,await e}}}function Pf(t,e){const n=typeof t=="object"?t:nr(),r=typeof t=="string"?t:"(default)",s=tr(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=ia("firestore");o&&Rf(s,...o)}return s}(function(e,n=!0){(function(s){sn=s})(Se),De(new Ae("firestore",(r,{instanceIdentifier:s,options:o})=>{const c=r.getProvider("app").getImmediate(),u=new kf(new mf(r.getProvider("auth-internal")),new wf(r.getProvider("app-check-internal")),function(g,E){if(!Object.prototype.hasOwnProperty.apply(g.options,["projectId"]))throw new le(ce.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Kn(g.options.projectId,E)}(c,s),c);return o=Object.assign({useFetchStreams:n},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),me(wo,"4.7.5",e),me(wo,"4.7.5","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="firebasestorage.googleapis.com",tc="storageBucket",Cf=2*60*1e3,Of=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K extends _e{constructor(e,n,r=0){super(Kr(e),`Firebase Storage: ${n} (${Kr(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,K.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Kr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var G;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(G||(G={}));function Kr(t){return"storage/"+t}function Ui(){const t="An unknown error occurred, please check the error payload for server response.";return new K(G.UNKNOWN,t)}function Nf(t){return new K(G.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function Df(t){return new K(G.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Lf(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new K(G.UNAUTHENTICATED,t)}function Uf(){return new K(G.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Mf(t){return new K(G.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function xf(){return new K(G.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Ff(){return new K(G.CANCELED,"User canceled the upload/download.")}function Bf(t){return new K(G.INVALID_URL,"Invalid URL '"+t+"'.")}function jf(t){return new K(G.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function $f(){return new K(G.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+tc+"' property when initializing the app?")}function Hf(){return new K(G.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Vf(){return new K(G.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function zf(t){return new K(G.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function hi(t){return new K(G.INVALID_ARGUMENT,t)}function nc(){return new K(G.APP_DELETED,"The Firebase app was deleted.")}function Wf(t){return new K(G.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Gt(t,e){return new K(G.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function $t(t){throw new K(G.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=fe.makeFromUrl(e,n)}catch{return new fe(e,"")}if(r.path==="")return r;throw jf(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function o(x){x.path.charAt(x.path.length-1)==="/"&&(x.path_=x.path_.slice(0,-1))}const c="(/(.*))?$",u=new RegExp("^gs://"+s+c,"i"),d={bucket:1,path:3};function g(x){x.path_=decodeURIComponent(x.path)}const E="v[A-Za-z0-9_]+",A=n.replace(/[.]/g,"\\."),P="(/([^?#]*).*)?$",O=new RegExp(`^https?://${A}/${E}/b/${s}/o${P}`,"i"),S={bucket:1,path:3},C=n===ec?"(?:storage.googleapis.com|storage.cloud.google.com)":n,R="([^?#]*)",M=new RegExp(`^https?://${C}/${s}/${R}`,"i"),N=[{regex:u,indices:d,postModify:o},{regex:O,indices:S,postModify:g},{regex:M,indices:{bucket:1,path:2},postModify:g}];for(let x=0;x<N.length;x++){const V=N[x],$=V.regex.exec(e);if($){const y=$[V.indices.bucket];let f=$[V.indices.path];f||(f=""),r=new fe(y,f),V.postModify(r);break}}if(r==null)throw Bf(e);return r}}class qf{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(t,e,n){let r=1,s=null,o=null,c=!1,u=0;function d(){return u===2}let g=!1;function E(...R){g||(g=!0,e.apply(null,R))}function A(R){s=setTimeout(()=>{s=null,t(O,d())},R)}function P(){o&&clearTimeout(o)}function O(R,...M){if(g){P();return}if(R){P(),E.call(null,R,...M);return}if(d()||c){P(),E.call(null,R,...M);return}r<64&&(r*=2);let N;u===1?(u=2,N=0):N=(r+Math.random())*1e3,A(N)}let S=!1;function C(R){S||(S=!0,P(),!g&&(s!==null?(R||(u=2),clearTimeout(s),A(0)):R||(u=1)))}return A(0),o=setTimeout(()=>{c=!0,C(!0)},n),C}function Kf(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(t){return t!==void 0}function Xf(t){return typeof t=="object"&&!Array.isArray(t)}function Mi(t){return typeof t=="string"||t instanceof String}function Ro(t){return xi()&&t instanceof Blob}function xi(){return typeof Blob<"u"}function ko(t,e,n,r){if(r<e)throw hi(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw hi(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function rc(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var it;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(it||(it={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,o=e.indexOf(t)!==-1;return n||s||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e,n,r,s,o,c,u,d,g,E,A,P=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=o,this.additionalRetryCodes_=c,this.callback_=u,this.errorCallback_=d,this.timeout_=g,this.progressCallback_=E,this.connectionFactory_=A,this.retry=P,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((O,S)=>{this.resolve_=O,this.reject_=S,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Rn(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const c=u=>{const d=u.loaded,g=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(d,g)};this.progressCallback_!==null&&o.addUploadProgressListener(c),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(c),this.pendingConnection_=null;const u=o.getErrorCode()===it.NO_ERROR,d=o.getStatus();if(!u||Yf(d,this.additionalRetryCodes_)&&this.retry){const E=o.getErrorCode()===it.ABORT;r(!1,new Rn(!1,null,E));return}const g=this.successCodes_.indexOf(d)!==-1;r(!0,new Rn(g,o))})},n=(r,s)=>{const o=this.resolve_,c=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const d=this.callback_(u,u.getResponse());Jf(d)?o(d):o()}catch(d){c(d)}else if(u!==null){const d=Ui();d.serverResponse=u.getErrorText(),this.errorCallback_?c(this.errorCallback_(u,d)):c(d)}else if(s.canceled){const d=this.appDelete_?nc():Ff();c(d)}else{const d=xf();c(d)}};this.canceled_?n(!1,new Rn(!1,null,!0)):this.backoffId_=Gf(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Kf(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Rn{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function Zf(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function ep(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function tp(t,e){e&&(t["X-Firebase-GMPID"]=e)}function np(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function rp(t,e,n,r,s,o,c=!0){const u=rc(t.urlParams),d=t.url+u,g=Object.assign({},t.headers);return tp(g,e),Zf(g,n),ep(g,o),np(g,r),new Qf(d,t.method,g,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function sp(...t){const e=ip();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(xi())return new Blob(t);throw new K(G.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function op(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(t){if(typeof atob>"u")throw zf("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Jr{constructor(e,n){this.data=e,this.contentType=n||null}}function cp(t,e){switch(t){case Ee.RAW:return new Jr(ic(e));case Ee.BASE64:case Ee.BASE64URL:return new Jr(sc(t,e));case Ee.DATA_URL:return new Jr(up(e),hp(e))}throw Ui()}function ic(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const o=r,c=t.charCodeAt(++n);r=65536|(o&1023)<<10|c&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function lp(t){let e;try{e=decodeURIComponent(t)}catch{throw Gt(Ee.DATA_URL,"Malformed data URL.")}return ic(e)}function sc(t,e){switch(t){case Ee.BASE64:{const s=e.indexOf("-")!==-1,o=e.indexOf("_")!==-1;if(s||o)throw Gt(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Ee.BASE64URL:{const s=e.indexOf("+")!==-1,o=e.indexOf("/")!==-1;if(s||o)throw Gt(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=ap(e)}catch(s){throw s.message.includes("polyfill")?s:Gt(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class oc{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Gt(Ee.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=dp(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function up(t){const e=new oc(t);return e.base64?sc(Ee.BASE64,e.rest):lp(e.rest)}function hp(t){return new oc(t).contentType}function dp(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,n){let r=0,s="";Ro(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(Ro(this.data_)){const r=this.data_,s=op(r,e,n);return s===null?null:new qe(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new qe(r,!0)}}static getBlob(...e){if(xi()){const n=e.map(r=>r instanceof qe?r.data_:r);return new qe(sp.apply(null,n))}else{const n=e.map(c=>Mi(c)?cp(Ee.RAW,c).data:c.data_);let r=0;n.forEach(c=>{r+=c.byteLength});const s=new Uint8Array(r);let o=0;return n.forEach(c=>{for(let u=0;u<c.length;u++)s[o++]=c[u]}),new qe(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(t){let e;try{e=JSON.parse(t)}catch{return null}return Xf(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fp(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function pp(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function cc(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(t,e){return e}class oe{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||gp}}let kn=null;function mp(t){return!Mi(t)||t.length<2?t:cc(t)}function lc(){if(kn)return kn;const t=[];t.push(new oe("bucket")),t.push(new oe("generation")),t.push(new oe("metageneration")),t.push(new oe("name","fullPath",!0));function e(o,c){return mp(c)}const n=new oe("name");n.xform=e,t.push(n);function r(o,c){return c!==void 0?Number(c):c}const s=new oe("size");return s.xform=r,t.push(s),t.push(new oe("timeCreated")),t.push(new oe("updated")),t.push(new oe("md5Hash",null,!0)),t.push(new oe("cacheControl",null,!0)),t.push(new oe("contentDisposition",null,!0)),t.push(new oe("contentEncoding",null,!0)),t.push(new oe("contentLanguage",null,!0)),t.push(new oe("contentType",null,!0)),t.push(new oe("metadata","customMetadata",!0)),kn=t,kn}function _p(t,e){function n(){const r=t.bucket,s=t.fullPath,o=new fe(r,s);return e._makeStorageReference(o)}Object.defineProperty(t,"ref",{get:n})}function yp(t,e,n){const r={};r.type="file";const s=n.length;for(let o=0;o<s;o++){const c=n[o];r[c.local]=c.xform(r,e[c.server])}return _p(r,t),r}function uc(t,e,n){const r=ac(e);return r===null?null:yp(t,r,n)}function vp(t,e,n,r){const s=ac(e);if(s===null||!Mi(s.downloadTokens))return null;const o=s.downloadTokens;if(o.length===0)return null;const c=encodeURIComponent;return o.split(",").map(g=>{const E=t.bucket,A=t.fullPath,P="/b/"+c(E)+"/o/"+c(A),O=Fi(P,n,r),S=rc({alt:"media",token:g});return O+S})[0]}function wp(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const o=e[s];o.writable&&(n[o.server]=t[o.local])}return JSON.stringify(n)}class hc{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(t){if(!t)throw Ui()}function Tp(t,e){function n(r,s){const o=uc(t,s,e);return dc(o!==null),o}return n}function Ep(t,e){function n(r,s){const o=uc(t,s,e);return dc(o!==null),vp(o,s,t.host,t._protocol)}return n}function fc(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=Uf():s=Lf():n.getStatus()===402?s=Df(t.bucket):n.getStatus()===403?s=Mf(t.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return e}function Ip(t){const e=fc(t);function n(r,s){let o=e(r,s);return r.getStatus()===404&&(o=Nf(t.path)),o.serverResponse=s.serverResponse,o}return n}function bp(t,e,n){const r=e.fullServerUrl(),s=Fi(r,t.host,t._protocol),o="GET",c=t.maxOperationRetryTime,u=new hc(s,o,Ep(t,n),c);return u.errorHandler=Ip(e),u}function Ap(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function Sp(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=Ap(null,e)),r}function Rp(t,e,n,r,s){const o=e.bucketOnlyServerUrl(),c={"X-Goog-Upload-Protocol":"multipart"};function u(){let N="";for(let x=0;x<2;x++)N=N+Math.random().toString().slice(2);return N}const d=u();c["Content-Type"]="multipart/related; boundary="+d;const g=Sp(e,r,s),E=wp(g,n),A="--"+d+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+E+`\r
--`+d+`\r
Content-Type: `+g.contentType+`\r
\r
`,P=`\r
--`+d+"--",O=qe.getBlob(A,r,P);if(O===null)throw Hf();const S={name:g.fullPath},C=Fi(o,t.host,t._protocol),R="POST",M=t.maxUploadRetryTime,L=new hc(C,R,Tp(t,n),M);return L.urlParams=S,L.headers=c,L.body=O.uploadData(),L.errorHandler=fc(e),L}class kp{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=it.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=it.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=it.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s){if(this.sent_)throw $t("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw $t("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw $t("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw $t("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw $t("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Pp extends kp{initXhr(){this.xhr_.responseType="text"}}function pc(){return new Pp}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,n){this._service=e,n instanceof fe?this._location=n:this._location=fe.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new at(e,n)}get root(){const e=new fe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return cc(this._location.path)}get storage(){return this._service}get parent(){const e=fp(this._location.path);if(e===null)return null;const n=new fe(this._location.bucket,e);return new at(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Wf(e)}}function Cp(t,e,n){t._throwIfRoot("uploadBytes");const r=Rp(t.storage,t._location,lc(),new qe(e,!0),n);return t.storage.makeRequestWithTokens(r,pc).then(s=>({metadata:s,ref:t}))}function Op(t){t._throwIfRoot("getDownloadURL");const e=bp(t.storage,t._location,lc());return t.storage.makeRequestWithTokens(e,pc).then(n=>{if(n===null)throw Vf();return n})}function Np(t,e){const n=pp(t._location.path,e),r=new fe(t._location.bucket,n);return new at(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(t){return/^[A-Za-z]+:\/\//.test(t)}function Lp(t,e){return new at(t,e)}function gc(t,e){if(t instanceof Bi){const n=t;if(n._bucket==null)throw $f();const r=new at(n,n._bucket);return e!=null?gc(r,e):r}else return e!==void 0?Np(t,e):t}function Up(t,e){if(e&&Dp(e)){if(t instanceof Bi)return Lp(t,e);throw hi("To use ref(service, url), the first argument must be a Storage instance.")}else return gc(t,e)}function Po(t,e){const n=e?.[tc];return n==null?null:fe.makeFromBucketSpec(n,t)}function Mp(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:aa(s,t.app.options.projectId))}class Bi{constructor(e,n,r,s,o){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=o,this._bucket=null,this._host=ec,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Cf,this._maxUploadRetryTime=Of,this._requests=new Set,s!=null?this._bucket=fe.makeFromBucketSpec(s,this._host):this._bucket=Po(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=fe.makeFromBucketSpec(this._url,e):this._bucket=Po(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ko("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ko("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new at(this,e)}_makeRequest(e,n,r,s,o=!0){if(this._deleted)return new qf(nc());{const c=rp(e,this._appId,r,s,n,this._firebaseVersion,o);return this._requests.add(c),c.getPromise().then(()=>this._requests.delete(c),()=>this._requests.delete(c)),c}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const Co="@firebase/storage",Oo="0.13.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mc="storage";function u_(t,e,n){return t=he(t),Cp(t,e,n)}function h_(t){return t=he(t),Op(t)}function d_(t,e){return t=he(t),Up(t,e)}function xp(t=nr(),e){t=he(t);const r=tr(t,mc).getImmediate({identifier:e}),s=ia("storage");return s&&Fp(r,...s),r}function Fp(t,e,n,r={}){Mp(t,e,n,r)}function Bp(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new Bi(n,r,s,e,Se)}function jp(){De(new Ae(mc,Bp,"PUBLIC").setMultipleInstances(!0)),me(Co,Oo,""),me(Co,Oo,"esm2017")}jp();const $p={apiKey:"AIzaSyD9An9LiN5LQwFo_1PCnIFdGN1Y_aUHRNA",authDomain:"spius-net.firebaseapp.com",projectId:"spius-net",storageBucket:"spius-net.firebasestorage.app",messagingSenderId:"666035609005",appId:"1:666035609005:web:fe18302b7ecd6743f29524",measurementId:"G-QEPFLPHJH7"},ji=rh().length?nr():ga($p);hf(ji);Pf(ji);const f_=xp(ji);function _c(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Hp=_c,yc=new Xe("auth","Firebase",_c());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn=new er("@firebase/auth");function Vp(t,...e){Jn.logLevel<=j.WARN&&Jn.warn(`Auth (${Se}): ${t}`,...e)}function Un(t,...e){Jn.logLevel<=j.ERROR&&Jn.error(`Auth (${Se}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(t,...e){throw $i(t,...e)}function vc(t,...e){return $i(t,...e)}function wc(t,e,n){const r=Object.assign(Object.assign({},Hp()),{[e]:n});return new Xe("auth","Firebase",r).create(e,{appName:t.name})}function Mn(t){return wc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $i(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return yc.create(t,...e)}function H(t,e,...n){if(!t)throw $i(e,...n)}function Kt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Un(e),new Error(e)}function Xn(t,e){t||Kt(e)}function zp(){return Do()==="http:"||Do()==="https:"}function Do(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zp()||ua()||"connection"in navigator)?navigator.onLine:!0}function qp(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e,n){this.shortDelay=e,this.longDelay=n,Xn(n>e,"Short delay should be less than long delay!"),this.isMobile=ca()||ha()}get(){return Wp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(t,e){Xn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Kt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Kt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Kt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xp=new Gp(3e4,6e4);function Ec(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function sr(t,e,n,r,s={}){return Ic(t,s,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});const u=lt(Object.assign({key:t.config.apiKey},c)).slice(1),d=await t._getAdditionalHeaders();d["Content-Type"]="application/json",t.languageCode&&(d["X-Firebase-Locale"]=t.languageCode);const g=Object.assign({method:e,headers:d},o);return la()||(g.referrerPolicy="no-referrer"),Tc.fetch()(bc(t,t.config.apiHost,n,u),g)})}async function Ic(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Jp),e);try{const s=new Yp(t),o=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw Pn(t,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const u=o.ok?c.errorMessage:c.error.message,[d,g]=u.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pn(t,"credential-already-in-use",c);if(d==="EMAIL_EXISTS")throw Pn(t,"email-already-in-use",c);if(d==="USER_DISABLED")throw Pn(t,"user-disabled",c);const E=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(g)throw wc(t,E,g);No(t,E)}}catch(s){if(s instanceof _e)throw s;No(t,"network-request-failed",{message:String(s)})}}function bc(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Kp(t.config,s):`${t.config.apiScheme}://${s}`}class Yp{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(vc(this.auth,"network-request-failed")),Xp.get())})}}function Pn(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=vc(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qp(t,e){return sr(t,"POST","/v1/accounts:delete",e)}async function Ac(t,e){return sr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Zp(t,e=!1){const n=he(t),r=await n.getIdToken(e),s=Sc(r);H(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,c=o?.sign_in_provider;return{claims:s,token:r,authTime:Jt(Xr(s.auth_time)),issuedAtTime:Jt(Xr(s.iat)),expirationTime:Jt(Xr(s.exp)),signInProvider:c||null,signInSecondFactor:o?.sign_in_second_factor||null}}function Xr(t){return Number(t)*1e3}function Sc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Un("JWT malformed, contained fewer than 3 sections"),null;try{const s=wi(n);return s?JSON.parse(s):(Un("Failed to decode base64 JWT payload"),null)}catch(s){return Un("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Lo(t){const e=Sc(t);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function di(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof _e&&eg(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function eg({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Jt(this.lastLoginAt),this.creationTime=Jt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yn(t){var e;const n=t.auth,r=await t.getIdToken(),s=await di(t,Ac(n,{idToken:r}));H(s?.users.length,n,"internal-error");const o=s.users[0];t._notifyReloadListener(o);const c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Rc(o.providerUserInfo):[],u=rg(t.providerData,c),d=t.isAnonymous,g=!(t.email&&o.passwordHash)&&!u?.length,E=d?g:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new fi(o.createdAt,o.lastLoginAt),isAnonymous:E};Object.assign(t,A)}async function ng(t){const e=he(t);await Yn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function rg(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Rc(t){return t.map(e=>{var{providerId:n}=e,r=en(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ig(t,e){const n=await Ic(t,{},async()=>{const r=lt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=t.config,c=bc(t,s,"/v1/token",`key=${o}`),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Tc.fetch()(c,{method:"POST",headers:u,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function sg(t,e){return sr(t,"POST","/v2/accounts:revokeToken",Ec(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Lo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){H(e.length!==0,"internal-error");const n=Lo(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:o}=await ig(e,n);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:o}=n,c=new _t;return r&&(H(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),s&&(H(typeof s=="string","internal-error",{appName:e}),c.accessToken=s),o&&(H(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _t,this.toJSON())}_performRefresh(){return Kt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(t,e){H(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ge{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,o=en(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new tg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new fi(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const n=await di(this,this.stsTokenManager.getToken(this.auth,e));return H(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Zp(this,e)}reload(){return ng(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ge(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Yn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(de(this.auth.app))return Promise.reject(Mn(this.auth));const e=await this.getIdToken();return await di(this,Qp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,o,c,u,d,g,E;const A=(r=n.displayName)!==null&&r!==void 0?r:void 0,P=(s=n.email)!==null&&s!==void 0?s:void 0,O=(o=n.phoneNumber)!==null&&o!==void 0?o:void 0,S=(c=n.photoURL)!==null&&c!==void 0?c:void 0,C=(u=n.tenantId)!==null&&u!==void 0?u:void 0,R=(d=n._redirectEventId)!==null&&d!==void 0?d:void 0,M=(g=n.createdAt)!==null&&g!==void 0?g:void 0,L=(E=n.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:N,emailVerified:x,isAnonymous:V,providerData:$,stsTokenManager:y}=n;H(N&&y,e,"internal-error");const f=_t.fromJSON(this.name,y);H(typeof N=="string",e,"internal-error"),$e(A,e.name),$e(P,e.name),H(typeof x=="boolean",e,"internal-error"),H(typeof V=="boolean",e,"internal-error"),$e(O,e.name),$e(S,e.name),$e(C,e.name),$e(R,e.name),$e(M,e.name),$e(L,e.name);const p=new Ge({uid:N,auth:e,email:P,emailVerified:x,displayName:A,isAnonymous:V,photoURL:S,phoneNumber:O,tenantId:C,stsTokenManager:f,createdAt:M,lastLoginAt:L});return $&&Array.isArray($)&&(p.providerData=$.map(_=>Object.assign({},_))),R&&(p._redirectEventId=R),p}static async _fromIdTokenResponse(e,n,r=!1){const s=new _t;s.updateFromServerResponse(n);const o=new Ge({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Yn(o),o}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];H(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?Rc(s.providerUserInfo):[],c=!(s.email&&s.passwordHash)&&!o?.length,u=new _t;u.updateFromIdToken(r);const d=new Ge({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:c}),g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new fi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!o?.length};return Object.assign(d,g),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo=new Map;function tt(t){Xn(t instanceof Function,"Expected a class definition");let e=Uo.get(t);return e?(Xn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Uo.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}kc.type="NONE";const Mo=kc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(t,e,n){return`firebase:${t}:${e}:${n}`}class yt{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=Yr(this.userKey,s.apiKey,o),this.fullPersistenceKey=Yr("persistence",s.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ge._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new yt(tt(Mo),e,r);const s=(await Promise.all(n.map(async g=>{if(await g._isAvailable())return g}))).filter(g=>g);let o=s[0]||tt(Mo);const c=Yr(r,e.config.apiKey,e.name);let u=null;for(const g of n)try{const E=await g._get(c);if(E){const A=Ge._fromJSON(e,E);g!==o&&(u=A),o=g;break}}catch{}const d=s.filter(g=>g._shouldAllowMigration);return!o._shouldAllowMigration||!d.length?new yt(o,e,r):(o=d[0],u&&await o._set(c,u.toJSON()),await Promise.all(n.map(async g=>{if(g!==o)try{await g._remove(c)}catch{}})),new yt(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(og(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hg(e))return"Blackberry";if(dg(e))return"Webos";if(ag(e))return"Safari";if((e.includes("chrome/")||cg(e))&&!e.includes("edge/"))return"Chrome";if(ug(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function og(t=q()){return/firefox\//i.test(t)}function ag(t=q()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function cg(t=q()){return/crios\//i.test(t)}function lg(t=q()){return/iemobile/i.test(t)}function ug(t=q()){return/android/i.test(t)}function hg(t=q()){return/blackberry/i.test(t)}function dg(t=q()){return/webos/i.test(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(t,e=[]){let n;switch(t){case"Browser":n=xo(q());break;case"Worker":n=`${xo(q())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Se}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=o=>new Promise((c,u)=>{try{const d=e(o);c(d)}catch(d){u(d)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pg(t,e={}){return sr(t,"GET","/v2/passwordPolicy",Ec(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gg=6;class mg{constructor(e){var n,r,s,o;const c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=c.minPasswordLength)!==null&&n!==void 0?n:gg,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,o,c,u;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(n=d.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(s=d.containsLowercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(o=d.containsUppercaseLetter)!==null&&o!==void 0?o:!0),d.isValid&&(d.isValid=(c=d.containsNumericCharacter)!==null&&c!==void 0?c:!0),d.isValid&&(d.isValid=(u=d.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),d}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fo(this),this.idTokenSubscription=new Fo(this),this.beforeStateQueue=new fg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=tt(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await yt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ac(this,{idToken:e}),r=await Ge._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(de(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=s?._redirectEventId,d=await this.tryRedirectSignIn(e);(!c||c===u)&&d?.user&&(s=d.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(c){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Yn(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(de(this.app))return Promise.reject(Mn(this));const n=e?he(e):null;return n&&H(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return de(this.app)?Promise.reject(Mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return de(this.app)?Promise.reject(Mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(tt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pg(this),n=new mg(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Xe("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await sg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&tt(e)||this._popupRedirectResolver;H(n,this,"argument-error"),this.redirectPersistenceManager=await yt.create(this,[tt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const o=typeof n=="function"?n:n.next.bind(n);let c=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(u,this,"internal-error"),u.then(()=>{c||o(this.currentUser)}),typeof n=="function"){const d=e.addObserver(n,r,s);return()=>{c=!0,d()}}else{const d=e.addObserver(n);return()=>{c=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Pc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n?.error&&Vp(`Error while retrieving App Check token: ${n.error}`),n?.token}}function yg(t){return he(t)}class Fo{constructor(e){this.auth=e,this.observer=null,this.addObserver=da(n=>this.observer=n)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function vg(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(tt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}var Bo="@firebase/auth",jo="1.8.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tg(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Eg(t){De(new Ae("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:u}=r.options;H(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:c,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Pc(t)},g=new _g(r,s,o,d);return vg(g,n),g},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),De(new Ae("auth-internal",e=>{const n=yg(e.getProvider("auth").getImmediate());return(r=>new wg(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),me(Bo,jo,Tg(t)),me(Bo,jo,"esm2017")}Eg("WebExtension");function Cc(t,e){return function(){return t.apply(e,arguments)}}const{toString:Ig}=Object.prototype,{getPrototypeOf:Hi}=Object,or=(t=>e=>{const n=Ig.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),we=t=>(t=t.toLowerCase(),e=>or(e)===t),ar=t=>e=>typeof e===t,{isArray:Et}=Array,Zt=ar("undefined");function bg(t){return t!==null&&!Zt(t)&&t.constructor!==null&&!Zt(t.constructor)&&pe(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Oc=we("ArrayBuffer");function Ag(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Oc(t.buffer),e}const Sg=ar("string"),pe=ar("function"),Nc=ar("number"),cr=t=>t!==null&&typeof t=="object",Rg=t=>t===!0||t===!1,xn=t=>{if(or(t)!=="object")return!1;const e=Hi(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},kg=we("Date"),Pg=we("File"),Cg=we("Blob"),Og=we("FileList"),Ng=t=>cr(t)&&pe(t.pipe),Dg=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||pe(t.append)&&((e=or(t))==="formdata"||e==="object"&&pe(t.toString)&&t.toString()==="[object FormData]"))},Lg=we("URLSearchParams"),[Ug,Mg,xg,Fg]=["ReadableStream","Request","Response","Headers"].map(we),Bg=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function on(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let r,s;if(typeof t!="object"&&(t=[t]),Et(t))for(r=0,s=t.length;r<s;r++)e.call(null,t[r],r,t);else{const o=n?Object.getOwnPropertyNames(t):Object.keys(t),c=o.length;let u;for(r=0;r<c;r++)u=o[r],e.call(null,t[u],u,t)}}function Dc(t,e){e=e.toLowerCase();const n=Object.keys(t);let r=n.length,s;for(;r-- >0;)if(s=n[r],e===s.toLowerCase())return s;return null}const nt=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Lc=t=>!Zt(t)&&t!==nt;function pi(){const{caseless:t}=Lc(this)&&this||{},e={},n=(r,s)=>{const o=t&&Dc(e,s)||s;xn(e[o])&&xn(r)?e[o]=pi(e[o],r):xn(r)?e[o]=pi({},r):Et(r)?e[o]=r.slice():e[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&on(arguments[r],n);return e}const jg=(t,e,n,{allOwnKeys:r}={})=>(on(e,(s,o)=>{n&&pe(s)?t[o]=Cc(s,n):t[o]=s},{allOwnKeys:r}),t),$g=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Hg=(t,e,n,r)=>{t.prototype=Object.create(e.prototype,r),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},Vg=(t,e,n,r)=>{let s,o,c;const u={};if(e=e||{},t==null)return e;do{for(s=Object.getOwnPropertyNames(t),o=s.length;o-- >0;)c=s[o],(!r||r(c,t,e))&&!u[c]&&(e[c]=t[c],u[c]=!0);t=n!==!1&&Hi(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},zg=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const r=t.indexOf(e,n);return r!==-1&&r===n},Wg=t=>{if(!t)return null;if(Et(t))return t;let e=t.length;if(!Nc(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},qg=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Hi(Uint8Array)),Gg=(t,e)=>{const r=(t&&t[Symbol.iterator]).call(t);let s;for(;(s=r.next())&&!s.done;){const o=s.value;e.call(t,o[0],o[1])}},Kg=(t,e)=>{let n;const r=[];for(;(n=t.exec(e))!==null;)r.push(n);return r},Jg=we("HTMLFormElement"),Xg=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),$o=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),Yg=we("RegExp"),Uc=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),r={};on(n,(s,o)=>{let c;(c=e(s,o,t))!==!1&&(r[o]=c||s)}),Object.defineProperties(t,r)},Qg=t=>{Uc(t,(e,n)=>{if(pe(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=t[n];if(pe(r)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Zg=(t,e)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return Et(t)?r(t):r(String(t).split(e)),n},em=()=>{},tm=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e,Qr="abcdefghijklmnopqrstuvwxyz",Ho="0123456789",Mc={DIGIT:Ho,ALPHA:Qr,ALPHA_DIGIT:Qr+Qr.toUpperCase()+Ho},nm=(t=16,e=Mc.ALPHA_DIGIT)=>{let n="";const{length:r}=e;for(;t--;)n+=e[Math.random()*r|0];return n};function rm(t){return!!(t&&pe(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator])}const im=t=>{const e=new Array(10),n=(r,s)=>{if(cr(r)){if(e.indexOf(r)>=0)return;if(!("toJSON"in r)){e[s]=r;const o=Et(r)?[]:{};return on(r,(c,u)=>{const d=n(c,s+1);!Zt(d)&&(o[u]=d)}),e[s]=void 0,o}}return r};return n(t,0)},sm=we("AsyncFunction"),om=t=>t&&(cr(t)||pe(t))&&pe(t.then)&&pe(t.catch),xc=((t,e)=>t?setImmediate:e?((n,r)=>(nt.addEventListener("message",({source:s,data:o})=>{s===nt&&o===n&&r.length&&r.shift()()},!1),s=>{r.push(s),nt.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",pe(nt.postMessage)),am=typeof queueMicrotask<"u"?queueMicrotask.bind(nt):typeof process<"u"&&process.nextTick||xc,b={isArray:Et,isArrayBuffer:Oc,isBuffer:bg,isFormData:Dg,isArrayBufferView:Ag,isString:Sg,isNumber:Nc,isBoolean:Rg,isObject:cr,isPlainObject:xn,isReadableStream:Ug,isRequest:Mg,isResponse:xg,isHeaders:Fg,isUndefined:Zt,isDate:kg,isFile:Pg,isBlob:Cg,isRegExp:Yg,isFunction:pe,isStream:Ng,isURLSearchParams:Lg,isTypedArray:qg,isFileList:Og,forEach:on,merge:pi,extend:jg,trim:Bg,stripBOM:$g,inherits:Hg,toFlatObject:Vg,kindOf:or,kindOfTest:we,endsWith:zg,toArray:Wg,forEachEntry:Gg,matchAll:Kg,isHTMLForm:Jg,hasOwnProperty:$o,hasOwnProp:$o,reduceDescriptors:Uc,freezeMethods:Qg,toObjectSet:Zg,toCamelCase:Xg,noop:em,toFiniteNumber:tm,findKey:Dc,global:nt,isContextDefined:Lc,ALPHABET:Mc,generateString:nm,isSpecCompliantForm:rm,toJSONObject:im,isAsyncFn:sm,isThenable:om,setImmediate:xc,asap:am};function U(t,e,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}b.inherits(U,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:b.toJSONObject(this.config),code:this.code,status:this.status}}});const Fc=U.prototype,Bc={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Bc[t]={value:t}});Object.defineProperties(U,Bc);Object.defineProperty(Fc,"isAxiosError",{value:!0});U.from=(t,e,n,r,s,o)=>{const c=Object.create(Fc);return b.toFlatObject(t,c,function(d){return d!==Error.prototype},u=>u!=="isAxiosError"),U.call(c,t.message,e,n,r,s),c.cause=t,c.name=t.name,o&&Object.assign(c,o),c};const cm=null;function gi(t){return b.isPlainObject(t)||b.isArray(t)}function jc(t){return b.endsWith(t,"[]")?t.slice(0,-2):t}function Vo(t,e,n){return t?t.concat(e).map(function(s,o){return s=jc(s),!n&&o?"["+s+"]":s}).join(n?".":""):e}function lm(t){return b.isArray(t)&&!t.some(gi)}const um=b.toFlatObject(b,{},null,function(e){return/^is[A-Z]/.test(e)});function lr(t,e,n){if(!b.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=b.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(C,R){return!b.isUndefined(R[C])});const r=n.metaTokens,s=n.visitor||E,o=n.dots,c=n.indexes,d=(n.Blob||typeof Blob<"u"&&Blob)&&b.isSpecCompliantForm(e);if(!b.isFunction(s))throw new TypeError("visitor must be a function");function g(S){if(S===null)return"";if(b.isDate(S))return S.toISOString();if(!d&&b.isBlob(S))throw new U("Blob is not supported. Use a Buffer instead.");return b.isArrayBuffer(S)||b.isTypedArray(S)?d&&typeof Blob=="function"?new Blob([S]):Buffer.from(S):S}function E(S,C,R){let M=S;if(S&&!R&&typeof S=="object"){if(b.endsWith(C,"{}"))C=r?C:C.slice(0,-2),S=JSON.stringify(S);else if(b.isArray(S)&&lm(S)||(b.isFileList(S)||b.endsWith(C,"[]"))&&(M=b.toArray(S)))return C=jc(C),M.forEach(function(N,x){!(b.isUndefined(N)||N===null)&&e.append(c===!0?Vo([C],x,o):c===null?C:C+"[]",g(N))}),!1}return gi(S)?!0:(e.append(Vo(R,C,o),g(S)),!1)}const A=[],P=Object.assign(um,{defaultVisitor:E,convertValue:g,isVisitable:gi});function O(S,C){if(!b.isUndefined(S)){if(A.indexOf(S)!==-1)throw Error("Circular reference detected in "+C.join("."));A.push(S),b.forEach(S,function(M,L){(!(b.isUndefined(M)||M===null)&&s.call(e,M,b.isString(L)?L.trim():L,C,P))===!0&&O(M,C?C.concat(L):[L])}),A.pop()}}if(!b.isObject(t))throw new TypeError("data must be an object");return O(t),e}function zo(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(r){return e[r]})}function Vi(t,e){this._pairs=[],t&&lr(t,this,e)}const $c=Vi.prototype;$c.append=function(e,n){this._pairs.push([e,n])};$c.toString=function(e){const n=e?function(r){return e.call(this,r,zo)}:zo;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function hm(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Hc(t,e,n){if(!e)return t;const r=n&&n.encode||hm;b.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let o;if(s?o=s(e,n):o=b.isURLSearchParams(e)?e.toString():new Vi(e,n).toString(r),o){const c=t.indexOf("#");c!==-1&&(t=t.slice(0,c)),t+=(t.indexOf("?")===-1?"?":"&")+o}return t}class Wo{constructor(){this.handlers=[]}use(e,n,r){return this.handlers.push({fulfilled:e,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){b.forEach(this.handlers,function(r){r!==null&&e(r)})}}const Vc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},dm=typeof URLSearchParams<"u"?URLSearchParams:Vi,fm=typeof FormData<"u"?FormData:null,pm=typeof Blob<"u"?Blob:null,gm={isBrowser:!0,classes:{URLSearchParams:dm,FormData:fm,Blob:pm},protocols:["http","https","file","blob","url","data"]},zi=typeof window<"u"&&typeof document<"u",mi=typeof navigator=="object"&&navigator||void 0,mm=zi&&(!mi||["ReactNative","NativeScript","NS"].indexOf(mi.product)<0),_m=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ym=zi&&window.location.href||"http://localhost",vm=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:zi,hasStandardBrowserEnv:mm,hasStandardBrowserWebWorkerEnv:_m,navigator:mi,origin:ym},Symbol.toStringTag,{value:"Module"})),re={...vm,...gm};function wm(t,e){return lr(t,new re.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return re.isNode&&b.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},e))}function Tm(t){return b.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function Em(t){const e={},n=Object.keys(t);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],e[o]=t[o];return e}function zc(t){function e(n,r,s,o){let c=n[o++];if(c==="__proto__")return!0;const u=Number.isFinite(+c),d=o>=n.length;return c=!c&&b.isArray(s)?s.length:c,d?(b.hasOwnProp(s,c)?s[c]=[s[c],r]:s[c]=r,!u):((!s[c]||!b.isObject(s[c]))&&(s[c]=[]),e(n,r,s[c],o)&&b.isArray(s[c])&&(s[c]=Em(s[c])),!u)}if(b.isFormData(t)&&b.isFunction(t.entries)){const n={};return b.forEachEntry(t,(r,s)=>{e(Tm(r),s,n,0)}),n}return null}function Im(t,e,n){if(b.isString(t))try{return(e||JSON.parse)(t),b.trim(t)}catch(r){if(r.name!=="SyntaxError")throw r}return(0,JSON.stringify)(t)}const an={transitional:Vc,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=b.isObject(e);if(o&&b.isHTMLForm(e)&&(e=new FormData(e)),b.isFormData(e))return s?JSON.stringify(zc(e)):e;if(b.isArrayBuffer(e)||b.isBuffer(e)||b.isStream(e)||b.isFile(e)||b.isBlob(e)||b.isReadableStream(e))return e;if(b.isArrayBufferView(e))return e.buffer;if(b.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let u;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return wm(e,this.formSerializer).toString();if((u=b.isFileList(e))||r.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return lr(u?{"files[]":e}:e,d&&new d,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),Im(e)):e}],transformResponse:[function(e){const n=this.transitional||an.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(b.isResponse(e)||b.isReadableStream(e))return e;if(e&&b.isString(e)&&(r&&!this.responseType||s)){const c=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(e)}catch(u){if(c)throw u.name==="SyntaxError"?U.from(u,U.ERR_BAD_RESPONSE,this,null,this.response):u}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:re.classes.FormData,Blob:re.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};b.forEach(["delete","get","head","post","put","patch"],t=>{an.headers[t]={}});const bm=b.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Am=t=>{const e={};let n,r,s;return t&&t.split(`
`).forEach(function(c){s=c.indexOf(":"),n=c.substring(0,s).trim().toLowerCase(),r=c.substring(s+1).trim(),!(!n||e[n]&&bm[n])&&(n==="set-cookie"?e[n]?e[n].push(r):e[n]=[r]:e[n]=e[n]?e[n]+", "+r:r)}),e},qo=Symbol("internals");function Ht(t){return t&&String(t).trim().toLowerCase()}function Fn(t){return t===!1||t==null?t:b.isArray(t)?t.map(Fn):String(t)}function Sm(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(t);)e[r[1]]=r[2];return e}const Rm=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Zr(t,e,n,r,s){if(b.isFunction(r))return r.call(this,e,n);if(s&&(e=n),!!b.isString(e)){if(b.isString(r))return e.indexOf(r)!==-1;if(b.isRegExp(r))return r.test(e)}}function km(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,r)=>n.toUpperCase()+r)}function Pm(t,e){const n=b.toCamelCase(" "+e);["get","set","has"].forEach(r=>{Object.defineProperty(t,r+n,{value:function(s,o,c){return this[r].call(this,e,s,o,c)},configurable:!0})})}class ue{constructor(e){e&&this.set(e)}set(e,n,r){const s=this;function o(u,d,g){const E=Ht(d);if(!E)throw new Error("header name must be a non-empty string");const A=b.findKey(s,E);(!A||s[A]===void 0||g===!0||g===void 0&&s[A]!==!1)&&(s[A||d]=Fn(u))}const c=(u,d)=>b.forEach(u,(g,E)=>o(g,E,d));if(b.isPlainObject(e)||e instanceof this.constructor)c(e,n);else if(b.isString(e)&&(e=e.trim())&&!Rm(e))c(Am(e),n);else if(b.isHeaders(e))for(const[u,d]of e.entries())o(d,u,r);else e!=null&&o(n,e,r);return this}get(e,n){if(e=Ht(e),e){const r=b.findKey(this,e);if(r){const s=this[r];if(!n)return s;if(n===!0)return Sm(s);if(b.isFunction(n))return n.call(this,s,r);if(b.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Ht(e),e){const r=b.findKey(this,e);return!!(r&&this[r]!==void 0&&(!n||Zr(this,this[r],r,n)))}return!1}delete(e,n){const r=this;let s=!1;function o(c){if(c=Ht(c),c){const u=b.findKey(r,c);u&&(!n||Zr(r,r[u],u,n))&&(delete r[u],s=!0)}}return b.isArray(e)?e.forEach(o):o(e),s}clear(e){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!e||Zr(this,this[o],o,e,!0))&&(delete this[o],s=!0)}return s}normalize(e){const n=this,r={};return b.forEach(this,(s,o)=>{const c=b.findKey(r,o);if(c){n[c]=Fn(s),delete n[o];return}const u=e?km(o):String(o).trim();u!==o&&delete n[o],n[u]=Fn(s),r[u]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return b.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=e&&b.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const r=new this(e);return n.forEach(s=>r.set(s)),r}static accessor(e){const r=(this[qo]=this[qo]={accessors:{}}).accessors,s=this.prototype;function o(c){const u=Ht(c);r[u]||(Pm(s,c),r[u]=!0)}return b.isArray(e)?e.forEach(o):o(e),this}}ue.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);b.reduceDescriptors(ue.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(r){this[n]=r}}});b.freezeMethods(ue);function ei(t,e){const n=this||an,r=e||n,s=ue.from(r.headers);let o=r.data;return b.forEach(t,function(u){o=u.call(n,o,s.normalize(),e?e.status:void 0)}),s.normalize(),o}function Wc(t){return!!(t&&t.__CANCEL__)}function It(t,e,n){U.call(this,t??"canceled",U.ERR_CANCELED,e,n),this.name="CanceledError"}b.inherits(It,U,{__CANCEL__:!0});function qc(t,e,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?t(n):e(new U("Request failed with status code "+n.status,[U.ERR_BAD_REQUEST,U.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Cm(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function Om(t,e){t=t||10;const n=new Array(t),r=new Array(t);let s=0,o=0,c;return e=e!==void 0?e:1e3,function(d){const g=Date.now(),E=r[o];c||(c=g),n[s]=d,r[s]=g;let A=o,P=0;for(;A!==s;)P+=n[A++],A=A%t;if(s=(s+1)%t,s===o&&(o=(o+1)%t),g-c<e)return;const O=E&&g-E;return O?Math.round(P*1e3/O):void 0}}function Nm(t,e){let n=0,r=1e3/e,s,o;const c=(g,E=Date.now())=>{n=E,s=null,o&&(clearTimeout(o),o=null),t.apply(null,g)};return[(...g)=>{const E=Date.now(),A=E-n;A>=r?c(g,E):(s=g,o||(o=setTimeout(()=>{o=null,c(s)},r-A)))},()=>s&&c(s)]}const Qn=(t,e,n=3)=>{let r=0;const s=Om(50,250);return Nm(o=>{const c=o.loaded,u=o.lengthComputable?o.total:void 0,d=c-r,g=s(d),E=c<=u;r=c;const A={loaded:c,total:u,progress:u?c/u:void 0,bytes:d,rate:g||void 0,estimated:g&&u&&E?(u-c)/g:void 0,event:o,lengthComputable:u!=null,[e?"download":"upload"]:!0};t(A)},n)},Go=(t,e)=>{const n=t!=null;return[r=>e[0]({lengthComputable:n,total:t,loaded:r}),e[1]]},Ko=t=>(...e)=>b.asap(()=>t(...e)),Dm=re.hasStandardBrowserEnv?((t,e)=>n=>(n=new URL(n,re.origin),t.protocol===n.protocol&&t.host===n.host&&(e||t.port===n.port)))(new URL(re.origin),re.navigator&&/(msie|trident)/i.test(re.navigator.userAgent)):()=>!0,Lm=re.hasStandardBrowserEnv?{write(t,e,n,r,s,o){const c=[t+"="+encodeURIComponent(e)];b.isNumber(n)&&c.push("expires="+new Date(n).toGMTString()),b.isString(r)&&c.push("path="+r),b.isString(s)&&c.push("domain="+s),o===!0&&c.push("secure"),document.cookie=c.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Um(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Mm(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function Gc(t,e){return t&&!Um(e)?Mm(t,e):e}const Jo=t=>t instanceof ue?{...t}:t;function ct(t,e){e=e||{};const n={};function r(g,E,A,P){return b.isPlainObject(g)&&b.isPlainObject(E)?b.merge.call({caseless:P},g,E):b.isPlainObject(E)?b.merge({},E):b.isArray(E)?E.slice():E}function s(g,E,A,P){if(b.isUndefined(E)){if(!b.isUndefined(g))return r(void 0,g,A,P)}else return r(g,E,A,P)}function o(g,E){if(!b.isUndefined(E))return r(void 0,E)}function c(g,E){if(b.isUndefined(E)){if(!b.isUndefined(g))return r(void 0,g)}else return r(void 0,E)}function u(g,E,A){if(A in e)return r(g,E);if(A in t)return r(void 0,g)}const d={url:o,method:o,data:o,baseURL:c,transformRequest:c,transformResponse:c,paramsSerializer:c,timeout:c,timeoutMessage:c,withCredentials:c,withXSRFToken:c,adapter:c,responseType:c,xsrfCookieName:c,xsrfHeaderName:c,onUploadProgress:c,onDownloadProgress:c,decompress:c,maxContentLength:c,maxBodyLength:c,beforeRedirect:c,transport:c,httpAgent:c,httpsAgent:c,cancelToken:c,socketPath:c,responseEncoding:c,validateStatus:u,headers:(g,E,A)=>s(Jo(g),Jo(E),A,!0)};return b.forEach(Object.keys(Object.assign({},t,e)),function(E){const A=d[E]||s,P=A(t[E],e[E],E);b.isUndefined(P)&&A!==u||(n[E]=P)}),n}const Kc=t=>{const e=ct({},t);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:o,headers:c,auth:u}=e;e.headers=c=ue.from(c),e.url=Hc(Gc(e.baseURL,e.url),t.params,t.paramsSerializer),u&&c.set("Authorization","Basic "+btoa((u.username||"")+":"+(u.password?unescape(encodeURIComponent(u.password)):"")));let d;if(b.isFormData(n)){if(re.hasStandardBrowserEnv||re.hasStandardBrowserWebWorkerEnv)c.setContentType(void 0);else if((d=c.getContentType())!==!1){const[g,...E]=d?d.split(";").map(A=>A.trim()).filter(Boolean):[];c.setContentType([g||"multipart/form-data",...E].join("; "))}}if(re.hasStandardBrowserEnv&&(r&&b.isFunction(r)&&(r=r(e)),r||r!==!1&&Dm(e.url))){const g=s&&o&&Lm.read(o);g&&c.set(s,g)}return e},xm=typeof XMLHttpRequest<"u",Fm=xm&&function(t){return new Promise(function(n,r){const s=Kc(t);let o=s.data;const c=ue.from(s.headers).normalize();let{responseType:u,onUploadProgress:d,onDownloadProgress:g}=s,E,A,P,O,S;function C(){O&&O(),S&&S(),s.cancelToken&&s.cancelToken.unsubscribe(E),s.signal&&s.signal.removeEventListener("abort",E)}let R=new XMLHttpRequest;R.open(s.method.toUpperCase(),s.url,!0),R.timeout=s.timeout;function M(){if(!R)return;const N=ue.from("getAllResponseHeaders"in R&&R.getAllResponseHeaders()),V={data:!u||u==="text"||u==="json"?R.responseText:R.response,status:R.status,statusText:R.statusText,headers:N,config:t,request:R};qc(function(y){n(y),C()},function(y){r(y),C()},V),R=null}"onloadend"in R?R.onloadend=M:R.onreadystatechange=function(){!R||R.readyState!==4||R.status===0&&!(R.responseURL&&R.responseURL.indexOf("file:")===0)||setTimeout(M)},R.onabort=function(){R&&(r(new U("Request aborted",U.ECONNABORTED,t,R)),R=null)},R.onerror=function(){r(new U("Network Error",U.ERR_NETWORK,t,R)),R=null},R.ontimeout=function(){let x=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const V=s.transitional||Vc;s.timeoutErrorMessage&&(x=s.timeoutErrorMessage),r(new U(x,V.clarifyTimeoutError?U.ETIMEDOUT:U.ECONNABORTED,t,R)),R=null},o===void 0&&c.setContentType(null),"setRequestHeader"in R&&b.forEach(c.toJSON(),function(x,V){R.setRequestHeader(V,x)}),b.isUndefined(s.withCredentials)||(R.withCredentials=!!s.withCredentials),u&&u!=="json"&&(R.responseType=s.responseType),g&&([P,S]=Qn(g,!0),R.addEventListener("progress",P)),d&&R.upload&&([A,O]=Qn(d),R.upload.addEventListener("progress",A),R.upload.addEventListener("loadend",O)),(s.cancelToken||s.signal)&&(E=N=>{R&&(r(!N||N.type?new It(null,t,R):N),R.abort(),R=null)},s.cancelToken&&s.cancelToken.subscribe(E),s.signal&&(s.signal.aborted?E():s.signal.addEventListener("abort",E)));const L=Cm(s.url);if(L&&re.protocols.indexOf(L)===-1){r(new U("Unsupported protocol "+L+":",U.ERR_BAD_REQUEST,t));return}R.send(o||null)})},Bm=(t,e)=>{const{length:n}=t=t?t.filter(Boolean):[];if(e||n){let r=new AbortController,s;const o=function(g){if(!s){s=!0,u();const E=g instanceof Error?g:this.reason;r.abort(E instanceof U?E:new It(E instanceof Error?E.message:E))}};let c=e&&setTimeout(()=>{c=null,o(new U(`timeout ${e} of ms exceeded`,U.ETIMEDOUT))},e);const u=()=>{t&&(c&&clearTimeout(c),c=null,t.forEach(g=>{g.unsubscribe?g.unsubscribe(o):g.removeEventListener("abort",o)}),t=null)};t.forEach(g=>g.addEventListener("abort",o));const{signal:d}=r;return d.unsubscribe=()=>b.asap(u),d}},jm=function*(t,e){let n=t.byteLength;if(n<e){yield t;return}let r=0,s;for(;r<n;)s=r+e,yield t.slice(r,s),r=s},$m=async function*(t,e){for await(const n of Hm(t))yield*jm(n,e)},Hm=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:n,value:r}=await e.read();if(n)break;yield r}}finally{await e.cancel()}},Xo=(t,e,n,r)=>{const s=$m(t,e);let o=0,c,u=d=>{c||(c=!0,r&&r(d))};return new ReadableStream({async pull(d){try{const{done:g,value:E}=await s.next();if(g){u(),d.close();return}let A=E.byteLength;if(n){let P=o+=A;n(P)}d.enqueue(new Uint8Array(E))}catch(g){throw u(g),g}},cancel(d){return u(d),s.return()}},{highWaterMark:2})},ur=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",Jc=ur&&typeof ReadableStream=="function",Vm=ur&&(typeof TextEncoder=="function"?(t=>e=>t.encode(e))(new TextEncoder):async t=>new Uint8Array(await new Response(t).arrayBuffer())),Xc=(t,...e)=>{try{return!!t(...e)}catch{return!1}},zm=Jc&&Xc(()=>{let t=!1;const e=new Request(re.origin,{body:new ReadableStream,method:"POST",get duplex(){return t=!0,"half"}}).headers.has("Content-Type");return t&&!e}),Yo=64*1024,_i=Jc&&Xc(()=>b.isReadableStream(new Response("").body)),Zn={stream:_i&&(t=>t.body)};ur&&(t=>{["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!Zn[e]&&(Zn[e]=b.isFunction(t[e])?n=>n[e]():(n,r)=>{throw new U(`Response type '${e}' is not supported`,U.ERR_NOT_SUPPORT,r)})})})(new Response);const Wm=async t=>{if(t==null)return 0;if(b.isBlob(t))return t.size;if(b.isSpecCompliantForm(t))return(await new Request(re.origin,{method:"POST",body:t}).arrayBuffer()).byteLength;if(b.isArrayBufferView(t)||b.isArrayBuffer(t))return t.byteLength;if(b.isURLSearchParams(t)&&(t=t+""),b.isString(t))return(await Vm(t)).byteLength},qm=async(t,e)=>{const n=b.toFiniteNumber(t.getContentLength());return n??Wm(e)},Gm=ur&&(async t=>{let{url:e,method:n,data:r,signal:s,cancelToken:o,timeout:c,onDownloadProgress:u,onUploadProgress:d,responseType:g,headers:E,withCredentials:A="same-origin",fetchOptions:P}=Kc(t);g=g?(g+"").toLowerCase():"text";let O=Bm([s,o&&o.toAbortSignal()],c),S;const C=O&&O.unsubscribe&&(()=>{O.unsubscribe()});let R;try{if(d&&zm&&n!=="get"&&n!=="head"&&(R=await qm(E,r))!==0){let V=new Request(e,{method:"POST",body:r,duplex:"half"}),$;if(b.isFormData(r)&&($=V.headers.get("content-type"))&&E.setContentType($),V.body){const[y,f]=Go(R,Qn(Ko(d)));r=Xo(V.body,Yo,y,f)}}b.isString(A)||(A=A?"include":"omit");const M="credentials"in Request.prototype;S=new Request(e,{...P,signal:O,method:n.toUpperCase(),headers:E.normalize().toJSON(),body:r,duplex:"half",credentials:M?A:void 0});let L=await fetch(S);const N=_i&&(g==="stream"||g==="response");if(_i&&(u||N&&C)){const V={};["status","statusText","headers"].forEach(p=>{V[p]=L[p]});const $=b.toFiniteNumber(L.headers.get("content-length")),[y,f]=u&&Go($,Qn(Ko(u),!0))||[];L=new Response(Xo(L.body,Yo,y,()=>{f&&f(),C&&C()}),V)}g=g||"text";let x=await Zn[b.findKey(Zn,g)||"text"](L,t);return!N&&C&&C(),await new Promise((V,$)=>{qc(V,$,{data:x,headers:ue.from(L.headers),status:L.status,statusText:L.statusText,config:t,request:S})})}catch(M){throw C&&C(),M&&M.name==="TypeError"&&/fetch/i.test(M.message)?Object.assign(new U("Network Error",U.ERR_NETWORK,t,S),{cause:M.cause||M}):U.from(M,M&&M.code,t,S)}}),yi={http:cm,xhr:Fm,fetch:Gm};b.forEach(yi,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const Qo=t=>`- ${t}`,Km=t=>b.isFunction(t)||t===null||t===!1,Yc={getAdapter:t=>{t=b.isArray(t)?t:[t];const{length:e}=t;let n,r;const s={};for(let o=0;o<e;o++){n=t[o];let c;if(r=n,!Km(n)&&(r=yi[(c=String(n)).toLowerCase()],r===void 0))throw new U(`Unknown adapter '${c}'`);if(r)break;s[c||"#"+o]=r}if(!r){const o=Object.entries(s).map(([u,d])=>`adapter ${u} `+(d===!1?"is not supported by the environment":"is not available in the build"));let c=e?o.length>1?`since :
`+o.map(Qo).join(`
`):" "+Qo(o[0]):"as no adapter specified";throw new U("There is no suitable adapter to dispatch the request "+c,"ERR_NOT_SUPPORT")}return r},adapters:yi};function ti(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new It(null,t)}function Zo(t){return ti(t),t.headers=ue.from(t.headers),t.data=ei.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Yc.getAdapter(t.adapter||an.adapter)(t).then(function(r){return ti(t),r.data=ei.call(t,t.transformResponse,r),r.headers=ue.from(r.headers),r},function(r){return Wc(r)||(ti(t),r&&r.response&&(r.response.data=ei.call(t,t.transformResponse,r.response),r.response.headers=ue.from(r.response.headers))),Promise.reject(r)})}const Qc="1.7.9",hr={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{hr[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}});const ea={};hr.transitional=function(e,n,r){function s(o,c){return"[Axios v"+Qc+"] Transitional option '"+o+"'"+c+(r?". "+r:"")}return(o,c,u)=>{if(e===!1)throw new U(s(c," has been removed"+(n?" in "+n:"")),U.ERR_DEPRECATED);return n&&!ea[c]&&(ea[c]=!0,console.warn(s(c," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(o,c,u):!0}};hr.spelling=function(e){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${e}`),!0)};function Jm(t,e,n){if(typeof t!="object")throw new U("options must be an object",U.ERR_BAD_OPTION_VALUE);const r=Object.keys(t);let s=r.length;for(;s-- >0;){const o=r[s],c=e[o];if(c){const u=t[o],d=u===void 0||c(u,o,t);if(d!==!0)throw new U("option "+o+" must be "+d,U.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new U("Unknown option "+o,U.ERR_BAD_OPTION)}}const Bn={assertOptions:Jm,validators:hr},Te=Bn.validators;class st{constructor(e){this.defaults=e,this.interceptors={request:new Wo,response:new Wo}}async request(e,n){try{return await this._request(e,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const o=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}catch{}}throw r}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=ct(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&Bn.assertOptions(r,{silentJSONParsing:Te.transitional(Te.boolean),forcedJSONParsing:Te.transitional(Te.boolean),clarifyTimeoutError:Te.transitional(Te.boolean)},!1),s!=null&&(b.isFunction(s)?n.paramsSerializer={serialize:s}:Bn.assertOptions(s,{encode:Te.function,serialize:Te.function},!0)),Bn.assertOptions(n,{baseUrl:Te.spelling("baseURL"),withXsrfToken:Te.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let c=o&&b.merge(o.common,o[n.method]);o&&b.forEach(["delete","get","head","post","put","patch","common"],S=>{delete o[S]}),n.headers=ue.concat(c,o);const u=[];let d=!0;this.interceptors.request.forEach(function(C){typeof C.runWhen=="function"&&C.runWhen(n)===!1||(d=d&&C.synchronous,u.unshift(C.fulfilled,C.rejected))});const g=[];this.interceptors.response.forEach(function(C){g.push(C.fulfilled,C.rejected)});let E,A=0,P;if(!d){const S=[Zo.bind(this),void 0];for(S.unshift.apply(S,u),S.push.apply(S,g),P=S.length,E=Promise.resolve(n);A<P;)E=E.then(S[A++],S[A++]);return E}P=u.length;let O=n;for(A=0;A<P;){const S=u[A++],C=u[A++];try{O=S(O)}catch(R){C.call(this,R);break}}try{E=Zo.call(this,O)}catch(S){return Promise.reject(S)}for(A=0,P=g.length;A<P;)E=E.then(g[A++],g[A++]);return E}getUri(e){e=ct(this.defaults,e);const n=Gc(e.baseURL,e.url);return Hc(n,e.params,e.paramsSerializer)}}b.forEach(["delete","get","head","options"],function(e){st.prototype[e]=function(n,r){return this.request(ct(r||{},{method:e,url:n,data:(r||{}).data}))}});b.forEach(["post","put","patch"],function(e){function n(r){return function(o,c,u){return this.request(ct(u||{},{method:e,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:c}))}}st.prototype[e]=n(),st.prototype[e+"Form"]=n(!0)});class Wi{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const c=new Promise(u=>{r.subscribe(u),o=u}).then(s);return c.cancel=function(){r.unsubscribe(o)},c},e(function(o,c,u){r.reason||(r.reason=new It(o,c,u),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const e=new AbortController,n=r=>{e.abort(r)};return this.subscribe(n),e.signal.unsubscribe=()=>this.unsubscribe(n),e.signal}static source(){let e;return{token:new Wi(function(s){e=s}),cancel:e}}}function Xm(t){return function(n){return t.apply(null,n)}}function Ym(t){return b.isObject(t)&&t.isAxiosError===!0}const vi={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(vi).forEach(([t,e])=>{vi[e]=t});function Zc(t){const e=new st(t),n=Cc(st.prototype.request,e);return b.extend(n,st.prototype,e,{allOwnKeys:!0}),b.extend(n,e,null,{allOwnKeys:!0}),n.create=function(s){return Zc(ct(t,s))},n}const X=Zc(an);X.Axios=st;X.CanceledError=It;X.CancelToken=Wi;X.isCancel=Wc;X.VERSION=Qc;X.toFormData=lr;X.AxiosError=U;X.Cancel=X.CanceledError;X.all=function(e){return Promise.all(e)};X.spread=Xm;X.isAxiosError=Ym;X.mergeConfig=ct;X.AxiosHeaders=ue;X.formToJSON=t=>zc(b.isHTMLForm(t)?new FormData(t):t);X.getAdapter=Yc.getAdapter;X.HttpStatusCode=vi;X.default=X;export{X as a,h_ as g,d_ as r,f_ as s,u_ as u,Qm as v};
