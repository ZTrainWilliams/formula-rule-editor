import{B as $e,C as De,S as Pe,D as qe,G as He,H as Fe,I as Me,J as Ie,K as Ke,j as C,L as ge,M,b as U,N as ze,g as we,o as B,m as $,w as R,f as V,n as Je,O as We,h as Ge,e as le,s as Xe,p as Y,l as Z,k as Qe,c as Ye,F as Ze,q as et,v as tt,a as L}from"./index.9947bbcf.js";var rt=200;function nt(t,e,r,a){var n=-1,i=qe,o=!0,l=t.length,s=[],p=e.length;if(!l)return s;r&&(e=$e(e,De(r))),a?(i=He,o=!1):e.length>=rt&&(i=Fe,o=!1,e=new Pe(e));e:for(;++n<l;){var m=t[n],h=r==null?m:r(m);if(m=a||m!==0?m:0,o&&h===h){for(var d=p;d--;)if(e[d]===h)continue e;s.push(m)}else i(e,h,a)||s.push(m)}return s}function at(t){return t&&t.length?Me(t):[]}var st=Ie(function(t,e){return Ke(t)?nt(t,e):[]}),it=st,re={exports:{}},xe=function(e,r){return function(){for(var n=new Array(arguments.length),i=0;i<n.length;i++)n[i]=arguments[i];return e.apply(r,n)}},ot=xe,_=Object.prototype.toString;function ne(t){return _.call(t)==="[object Array]"}function ee(t){return typeof t=="undefined"}function lt(t){return t!==null&&!ee(t)&&t.constructor!==null&&!ee(t.constructor)&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}function ut(t){return _.call(t)==="[object ArrayBuffer]"}function ct(t){return typeof FormData!="undefined"&&t instanceof FormData}function dt(t){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&t.buffer instanceof ArrayBuffer,e}function ft(t){return typeof t=="string"}function ht(t){return typeof t=="number"}function Ce(t){return t!==null&&typeof t=="object"}function H(t){if(_.call(t)!=="[object Object]")return!1;var e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}function pt(t){return _.call(t)==="[object Date]"}function mt(t){return _.call(t)==="[object File]"}function vt(t){return _.call(t)==="[object Blob]"}function Ee(t){return _.call(t)==="[object Function]"}function yt(t){return Ce(t)&&Ee(t.pipe)}function bt(t){return typeof URLSearchParams!="undefined"&&t instanceof URLSearchParams}function gt(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function wt(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function ae(t,e){if(!(t===null||typeof t=="undefined"))if(typeof t!="object"&&(t=[t]),ne(t))for(var r=0,a=t.length;r<a;r++)e.call(null,t[r],r,t);else for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.call(null,t[n],n,t)}function te(){var t={};function e(n,i){H(t[i])&&H(n)?t[i]=te(t[i],n):H(n)?t[i]=te({},n):ne(n)?t[i]=n.slice():t[i]=n}for(var r=0,a=arguments.length;r<a;r++)ae(arguments[r],e);return t}function xt(t,e,r){return ae(e,function(n,i){r&&typeof n=="function"?t[i]=ot(n,r):t[i]=n}),t}function Ct(t){return t.charCodeAt(0)===65279&&(t=t.slice(1)),t}var E={isArray:ne,isArrayBuffer:ut,isBuffer:lt,isFormData:ct,isArrayBufferView:dt,isString:ft,isNumber:ht,isObject:Ce,isPlainObject:H,isUndefined:ee,isDate:pt,isFile:mt,isBlob:vt,isFunction:Ee,isStream:yt,isURLSearchParams:bt,isStandardBrowserEnv:wt,forEach:ae,merge:te,extend:xt,trim:gt,stripBOM:Ct},j=E;function ue(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Se=function(e,r,a){if(!r)return e;var n;if(a)n=a(r);else if(j.isURLSearchParams(r))n=r.toString();else{var i=[];j.forEach(r,function(s,p){s===null||typeof s=="undefined"||(j.isArray(s)?p=p+"[]":s=[s],j.forEach(s,function(h){j.isDate(h)?h=h.toISOString():j.isObject(h)&&(h=JSON.stringify(h)),i.push(ue(p)+"="+ue(h))}))}),n=i.join("&")}if(n){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+n}return e},Et=E;function K(){this.handlers=[]}K.prototype.use=function(e,r,a){return this.handlers.push({fulfilled:e,rejected:r,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1};K.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};K.prototype.forEach=function(e){Et.forEach(this.handlers,function(a){a!==null&&e(a)})};var St=K,kt=E,At=function(e,r){kt.forEach(e,function(n,i){i!==r&&i.toUpperCase()===r.toUpperCase()&&(e[r]=n,delete e[i])})},ke=function(e,r,a,n,i){return e.config=r,a&&(e.code=a),e.request=n,e.response=i,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},Ot=ke,Ae=function(e,r,a,n,i){var o=new Error(e);return Ot(o,r,a,n,i)},Rt=Ae,_t=function(e,r,a){var n=a.config.validateStatus;!a.status||!n||n(a.status)?e(a):r(Rt("Request failed with status code "+a.status,a.config,null,a.request,a))},P=E,Tt=P.isStandardBrowserEnv()?function(){return{write:function(r,a,n,i,o,l){var s=[];s.push(r+"="+encodeURIComponent(a)),P.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),P.isString(i)&&s.push("path="+i),P.isString(o)&&s.push("domain="+o),l===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(r){var a=document.cookie.match(new RegExp("(^|;\\s*)("+r+")=([^;]*)"));return a?decodeURIComponent(a[3]):null},remove:function(r){this.write(r,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),jt=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},Nt=function(e,r){return r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e},Lt=jt,Bt=Nt,Ut=function(e,r){return e&&!Lt(r)?Bt(e,r):r},W=E,Vt=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],$t=function(e){var r={},a,n,i;return e&&W.forEach(e.split(`
`),function(l){if(i=l.indexOf(":"),a=W.trim(l.substr(0,i)).toLowerCase(),n=W.trim(l.substr(i+1)),a){if(r[a]&&Vt.indexOf(a)>=0)return;a==="set-cookie"?r[a]=(r[a]?r[a]:[]).concat([n]):r[a]=r[a]?r[a]+", "+n:n}}),r},ce=E,Dt=ce.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a"),a;function n(i){var o=i;return e&&(r.setAttribute("href",o),o=r.href),r.setAttribute("href",o),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}return a=n(window.location.href),function(o){var l=ce.isString(o)?n(o):o;return l.protocol===a.protocol&&l.host===a.host}}():function(){return function(){return!0}}(),q=E,Pt=_t,qt=Tt,Ht=Se,Ft=Ut,Mt=$t,It=Dt,G=Ae,de=function(e){return new Promise(function(a,n){var i=e.data,o=e.headers,l=e.responseType;q.isFormData(i)&&delete o["Content-Type"];var s=new XMLHttpRequest;if(e.auth){var p=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(p+":"+m)}var h=Ft(e.baseURL,e.url);s.open(e.method.toUpperCase(),Ht(h,e.params,e.paramsSerializer),!0),s.timeout=e.timeout;function d(){if(!!s){var A="getAllResponseHeaders"in s?Mt(s.getAllResponseHeaders()):null,S=!l||l==="text"||l==="json"?s.responseText:s.response,k={data:S,status:s.status,statusText:s.statusText,headers:A,config:e,request:s};Pt(a,n,k),s=null}}if("onloadend"in s?s.onloadend=d:s.onreadystatechange=function(){!s||s.readyState!==4||s.status===0&&!(s.responseURL&&s.responseURL.indexOf("file:")===0)||setTimeout(d)},s.onabort=function(){!s||(n(G("Request aborted",e,"ECONNABORTED",s)),s=null)},s.onerror=function(){n(G("Network Error",e,null,s)),s=null},s.ontimeout=function(){var S="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(S=e.timeoutErrorMessage),n(G(S,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",s)),s=null},q.isStandardBrowserEnv()){var c=(e.withCredentials||It(h))&&e.xsrfCookieName?qt.read(e.xsrfCookieName):void 0;c&&(o[e.xsrfHeaderName]=c)}"setRequestHeader"in s&&q.forEach(o,function(S,k){typeof i=="undefined"&&k.toLowerCase()==="content-type"?delete o[k]:s.setRequestHeader(k,S)}),q.isUndefined(e.withCredentials)||(s.withCredentials=!!e.withCredentials),l&&l!=="json"&&(s.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&s.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&s.upload&&s.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(S){!s||(s.abort(),n(S),s=null)}),i||(i=null),s.send(i)})},y=E,fe=At,Kt=ke,zt={"Content-Type":"application/x-www-form-urlencoded"};function he(t,e){!y.isUndefined(t)&&y.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function Jt(){var t;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(t=de),t}function Wt(t,e,r){if(y.isString(t))try{return(e||JSON.parse)(t),y.trim(t)}catch(a){if(a.name!=="SyntaxError")throw a}return(r||JSON.stringify)(t)}var z={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:Jt(),transformRequest:[function(e,r){return fe(r,"Accept"),fe(r,"Content-Type"),y.isFormData(e)||y.isArrayBuffer(e)||y.isBuffer(e)||y.isStream(e)||y.isFile(e)||y.isBlob(e)?e:y.isArrayBufferView(e)?e.buffer:y.isURLSearchParams(e)?(he(r,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):y.isObject(e)||r&&r["Content-Type"]==="application/json"?(he(r,"application/json"),Wt(e)):e}],transformResponse:[function(e){var r=this.transitional,a=r&&r.silentJSONParsing,n=r&&r.forcedJSONParsing,i=!a&&this.responseType==="json";if(i||n&&y.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(i)throw o.name==="SyntaxError"?Kt(o,this,"E_JSON_PARSE"):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};z.headers={common:{Accept:"application/json, text/plain, */*"}};y.forEach(["delete","get","head"],function(e){z.headers[e]={}});y.forEach(["post","put","patch"],function(e){z.headers[e]=y.merge(zt)});var se=z,Gt=E,Xt=se,Qt=function(e,r,a){var n=this||Xt;return Gt.forEach(a,function(o){e=o.call(n,e,r)}),e},Oe=function(e){return!!(e&&e.__CANCEL__)},pe=E,X=Qt,Yt=Oe,Zt=se;function Q(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var er=function(e){Q(e),e.headers=e.headers||{},e.data=X.call(e,e.data,e.headers,e.transformRequest),e.headers=pe.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),pe.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]});var r=e.adapter||Zt.adapter;return r(e).then(function(n){return Q(e),n.data=X.call(e,n.data,n.headers,e.transformResponse),n},function(n){return Yt(n)||(Q(e),n&&n.response&&(n.response.data=X.call(e,n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})},b=E,Re=function(e,r){r=r||{};var a={},n=["url","method","data"],i=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],l=["validateStatus"];function s(d,c){return b.isPlainObject(d)&&b.isPlainObject(c)?b.merge(d,c):b.isPlainObject(c)?b.merge({},c):b.isArray(c)?c.slice():c}function p(d){b.isUndefined(r[d])?b.isUndefined(e[d])||(a[d]=s(void 0,e[d])):a[d]=s(e[d],r[d])}b.forEach(n,function(c){b.isUndefined(r[c])||(a[c]=s(void 0,r[c]))}),b.forEach(i,p),b.forEach(o,function(c){b.isUndefined(r[c])?b.isUndefined(e[c])||(a[c]=s(void 0,e[c])):a[c]=s(void 0,r[c])}),b.forEach(l,function(c){c in r?a[c]=s(e[c],r[c]):c in e&&(a[c]=s(void 0,e[c]))});var m=n.concat(i).concat(o).concat(l),h=Object.keys(e).concat(Object.keys(r)).filter(function(c){return m.indexOf(c)===-1});return b.forEach(h,p),a};const tr="axios@^0.21.1",rr="axios@0.21.4",nr=!1,ar="sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==",sr="/axios",ir={},or={type:"range",registry:!0,raw:"axios@^0.21.1",name:"axios",escapedName:"axios",rawSpec:"^0.21.1",saveSpec:null,fetchSpec:"^0.21.1"},lr=["#USER","/"],ur="https://registry.npmmirror.com/axios/-/axios-0.21.4.tgz",cr="c67b90dc0568e5c1cf2b0b858c43ba28e2eda575",dr="axios@^0.21.1",fr="C:\\project\\mine\\GitHub\\business-formula-rule-editor",hr={name:"Matt Zabriskie"},pr={"./lib/adapters/http.js":"./lib/adapters/xhr.js"},mr={url:"https://github.com/axios/axios/issues"},vr=!1,yr=[{path:"./dist/axios.min.js",threshold:"5kB"}],br={"follow-redirects":"^1.14.0"},gr=!1,wr="Promise based HTTP client for the browser and node.js",xr={coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},Cr="https://axios-http.com",Er="dist/axios.min.js",Sr=["xhr","http","ajax","promise","node"],kr="MIT",Ar="index.js",Or="axios",Rr={type:"git",url:"git+https://github.com/axios/axios.git"},_r={build:"NODE_ENV=production grunt build",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",examples:"node ./examples/server.js",fix:"eslint --fix lib/**/*.js",postversion:"git push && git push --tags",preversion:"npm test",start:"node ./sandbox/server.js",test:"grunt test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},Tr="./index.d.ts",jr="dist/axios.min.js",Nr="0.21.4";var Lr={_from:tr,_id:rr,_inBundle:nr,_integrity:ar,_location:sr,_phantomChildren:ir,_requested:or,_requiredBy:lr,_resolved:ur,_shasum:cr,_spec:dr,_where:fr,author:hr,browser:pr,bugs:mr,bundleDependencies:vr,bundlesize:yr,dependencies:br,deprecated:gr,description:wr,devDependencies:xr,homepage:Cr,jsdelivr:Er,keywords:Sr,license:kr,main:Ar,name:Or,repository:Rr,scripts:_r,typings:Tr,unpkg:jr,version:Nr},_e=Lr,ie={};["object","boolean","number","function","string","symbol"].forEach(function(t,e){ie[t]=function(a){return typeof a===t||"a"+(e<1?"n ":" ")+t}});var me={},Br=_e.version.split(".");function Te(t,e){for(var r=e?e.split("."):Br,a=t.split("."),n=0;n<3;n++){if(r[n]>a[n])return!0;if(r[n]<a[n])return!1}return!1}ie.transitional=function(e,r,a){var n=r&&Te(r);function i(o,l){return"[Axios v"+_e.version+"] Transitional option '"+o+"'"+l+(a?". "+a:"")}return function(o,l,s){if(e===!1)throw new Error(i(l," has been removed in "+r));return n&&!me[l]&&(me[l]=!0,console.warn(i(l," has been deprecated since v"+r+" and will be removed in the near future"))),e?e(o,l,s):!0}};function Ur(t,e,r){if(typeof t!="object")throw new TypeError("options must be an object");for(var a=Object.keys(t),n=a.length;n-- >0;){var i=a[n],o=e[i];if(o){var l=t[i],s=l===void 0||o(l,i,t);if(s!==!0)throw new TypeError("option "+i+" must be "+s);continue}if(r!==!0)throw Error("Unknown option "+i)}}var Vr={isOlderVersion:Te,assertOptions:Ur,validators:ie},je=E,$r=Se,ve=St,ye=er,J=Re,Ne=Vr,N=Ne.validators;function D(t){this.defaults=t,this.interceptors={request:new ve,response:new ve}}D.prototype.request=function(e){typeof e=="string"?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=J(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var r=e.transitional;r!==void 0&&Ne.assertOptions(r,{silentJSONParsing:N.transitional(N.boolean,"1.0.0"),forcedJSONParsing:N.transitional(N.boolean,"1.0.0"),clarifyTimeoutError:N.transitional(N.boolean,"1.0.0")},!1);var a=[],n=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(e)===!1||(n=n&&d.synchronous,a.unshift(d.fulfilled,d.rejected))});var i=[];this.interceptors.response.forEach(function(d){i.push(d.fulfilled,d.rejected)});var o;if(!n){var l=[ye,void 0];for(Array.prototype.unshift.apply(l,a),l=l.concat(i),o=Promise.resolve(e);l.length;)o=o.then(l.shift(),l.shift());return o}for(var s=e;a.length;){var p=a.shift(),m=a.shift();try{s=p(s)}catch(h){m(h);break}}try{o=ye(s)}catch(h){return Promise.reject(h)}for(;i.length;)o=o.then(i.shift(),i.shift());return o};D.prototype.getUri=function(e){return e=J(this.defaults,e),$r(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};je.forEach(["delete","get","head","options"],function(e){D.prototype[e]=function(r,a){return this.request(J(a||{},{method:e,url:r,data:(a||{}).data}))}});je.forEach(["post","put","patch"],function(e){D.prototype[e]=function(r,a,n){return this.request(J(n||{},{method:e,url:r,data:a}))}});var Dr=D;function oe(t){this.message=t}oe.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")};oe.prototype.__CANCEL__=!0;var Le=oe,Pr=Le;function I(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(n){e=n});var r=this;t(function(n){r.reason||(r.reason=new Pr(n),e(r.reason))})}I.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};I.source=function(){var e,r=new I(function(n){e=n});return{token:r,cancel:e}};var qr=I,Hr=function(e){return function(a){return e.apply(null,a)}},Fr=function(e){return typeof e=="object"&&e.isAxiosError===!0},be=E,Mr=xe,F=Dr,Ir=Re,Kr=se;function Be(t){var e=new F(t),r=Mr(F.prototype.request,e);return be.extend(r,F.prototype,e),be.extend(r,e),r}var O=Be(Kr);O.Axios=F;O.create=function(e){return Be(Ir(O.defaults,e))};O.Cancel=Le;O.CancelToken=qr;O.isCancel=Oe;O.all=function(e){return Promise.all(e)};O.spread=Hr;O.isAxiosError=Fr;re.exports=O;re.exports.default=O;var Ue=re.exports;const Ve={__name:"index",props:{modelValue:{type:Array,default:()=>[]},data:{type:Array,default:()=>[]},url:{type:String,default:""},query:{type:Object,default:()=>{}},formatter:{type:Function,default:t=>{var e;return(e=t==null?void 0:t.data)!=null?e:[]}},props:{type:Object,default:()=>({label:"title",value:"id",children:"children",disabled:"disabled"})},checkStrictly:{type:Boolean,default:!0},showCheckbox:{type:Boolean,default:!0}},emits:["update","change","treeChange"],setup(t,{expose:e,emit:r}){const a=(u,f)=>Ue({url:u,method:"get",params:f}),n=t,i=r,o=C(!1),l=C(n.data),s=C([]),p=C(null),m=()=>{n.url&&o.value===!1&&(o.value=!0,a(n.url,n.query).then(u=>{u&&(l.value=n.formatter(u),k(s.value))}).finally(()=>{o.value=!1}))},h=(u,f)=>{var v;i("treeChange",u,f),d((v=p.value)==null?void 0:v.getCheckedKeys())},d=u=>{s.value=u,i("update:modelValue",s.value),i("change",s.value)},c=(u,f=[])=>(u.forEach(v=>{v.children&&v.children.length>0&&c(v.children,f),!v.disabled&&f.push(v.key)}),f),A=(u,f)=>{const v=new Set;u.forEach(g=>v.add(g));for(let g=0;g<f.length;g+=1)if(!v.has(f[g]))return!1;return!0},S=u=>{var g,w;if(u.disabled)return!1;const f=(g=p.value)==null?void 0:g.getCheckedKeys(),v=[...c((w=u.children)!=null?w:[]),u.key];Z(()=>{let x=[];A(f,v)?(x=it(f,...v),p.value.setCheckedKeys()):x=at([...f,...v]),p.value.setCheckedKeys(x),d(x)})},k=u=>{u&&Array.isArray(u)&&Z(()=>{p.value.setCheckedKeys([...u])})};return ge(()=>{m()}),M(()=>n.data,u=>{n.url||u&&(l.value=Array.isArray(u)?u:[])}),M(()=>n.modelValue,u=>{u&&Array.isArray(u)&&(s.value=u,k(u))},{immediate:!0}),e({setCheckedKeys:k}),(u,f)=>{const v=U("el-button"),g=U("el-tree-v2"),w=ze("loading");return we((B(),$(g,{ref_key:"treeV2Ref",ref:p,data:l.value,props:n.props,"check-strictly":n.checkStrictly,showCheckbox:n.showCheckbox,onCheckChange:h},{default:R(({node:x,data:T})=>[V("span",{class:Je(["prefix",{"is-leaf":x.isLeaf}])},[T.children&&T.children.length?(B(),$(v,{key:0,link:"",type:"primary",onClick:We(Jr=>S(x,T),["stop"]),disabled:x.disabled},{default:R(()=>[Ge(u.$slots,"select-all-title",{},()=>[le(" [\u5168\u9009] ")])]),_:2},1032,["onClick","disabled"])):Xe("",!0),le(" "+Y(x.label),1)],2)]),_:3},8,["data","props","check-strictly","showCheckbox"])),[[w,o.value]])}}},zr={__name:"index",props:{modelValue:{type:Array,default:()=>[]},data:{type:Array,default:()=>[]},url:{type:String,default:""},query:{type:Object,default:()=>{}},formatterSelect:{type:Function,default:t=>{var e;return(e=t==null?void 0:t.data)!=null?e:[]}},props:{type:Object,default:()=>({label:"title",value:"id",children:"children",disabled:"disabled"})},checkStrictly:{type:Boolean,default:!0},showCheckbox:{type:Boolean,default:!0},collapseTags:{type:Boolean,default:!0},collapseTagsTooltip:{type:Boolean,default:!0},clearable:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},size:{type:String,default:"default"},height:{type:Number,default:320}},emits:["update","change"],setup(t,{expose:e,emit:r}){const a=(u,f)=>Ue({url:u,method:"get",params:f}),n=(u,f="children")=>{const v=[],g=w=>{(w||[]).forEach(x=>{const T={...x};delete T[f],v.push(T),x[f]&&g(x[f])})};return g(u),v},i=t,o=r,l=C(i.data),s=C([]),p=C(!1),m=Qe(()=>n(l.value)),h=C(),d=()=>{i.url&&p.value===!1&&(p.value=!0,a(i.url,i.query).then(u=>{u&&(l.value=i.formatterSelect(u.data),k(s.value))}).finally(()=>{p.value=!1}))},c=u=>{const f=s.value.indexOf(u);f!==-1&&s.value.splice(f,1),o("update:modelValue",s.value),o("change",s.value)},A=()=>{s.value=[],o("update:modelValue",s.value),o("change",s.value)},S=u=>{s.value=u,o("update:modelValue",s.value),o("change",s.value)},k=u=>{Z(()=>{h.value.setCheckedKeys(s.value)})};return ge(()=>{d()}),M(()=>i.data,u=>{u&&Array.isArray(u)&&(l.value=u)}),M(()=>i.modelValue,u=>{u&&Array.isArray(u)&&(s.value=u)},{immediate:!0}),e({setCheckedKeys:k}),(u,f)=>{const v=U("el-option"),g=U("el-select");return B(),$(g,{modelValue:s.value,"onUpdate:modelValue":f[1]||(f[1]=w=>s.value=w),data:l.value,multiple:"","collapse-tags":t.collapseTags,"collapse-tags-tooltip":t.collapseTagsTooltip,clearable:t.clearable,disabled:t.disabled,size:t.size,style:{width:"100%"},onRemoveTag:c,onClear:A},{default:R(()=>[(B(!0),Ye(Ze,null,et(m.value,w=>we((B(),$(v,{key:w[i.value],label:w[i.label],value:w[i.value]},null,8,["label","value"])),[[tt,!1]])),128)),L(v,{disabled:"",style:{height:"auto",background:"#fff"}},{default:R(()=>[L(Ve,{modelValue:s.value,"onUpdate:modelValue":f[0]||(f[0]=w=>s.value=w),ref_key:"treeV2Ref",ref:h,data:l.value,props:i.props,"check-strictly":t.checkStrictly,showCheckbox:t.showCheckbox,style:{"min-width":"220px"},onChange:S},null,8,["modelValue","data","props","check-strictly","showCheckbox"])]),_:1})]),_:1},8,["modelValue","data","collapse-tags","collapse-tags-tooltip","clearable","disabled","size"])}}},Gr={__name:"index",setup(t){const e=C(["treeV2","selectTreeV2"]),r=C([]),a=C({label:"title",value:"id",children:"children",disabled:"disabled"}),n=C([]),i=C([{id:"1",title:"Level one 1",children:[{id:"1-1",title:"Level two 1-1",children:[{id:"1-1-1",title:"Level three 1-1-1"}]},{id:"1-2",title:"Level two 1-2",children:[{id:"1-2-1",title:"Level three 1-2-1"},{id:"1-2-2",title:"Level three 1-2-2"}]}]},{id:"2",title:"Level one 2",children:[{id:"2-1",title:"Level two 2-1",children:[{id:"2-1-1",title:"Level three 2-1-1"}]},{id:"2-2",title:"Level two 2-2",children:[{id:"2-2-1",title:"Level three 2-2-1"}]}]},{id:"3",title:"Level one 3",children:[{id:"3-1",title:"Level two 3-1",children:[{id:"3-1-1",title:"Level three 3-1-1"}]},{id:"3-2",title:"Level two 3-2",children:[{id:"3-2-1",title:"Level three 3-2-1"}]}]}]);return(o,l)=>{const s=U("el-collapse-item"),p=U("el-collapse");return B(),$(p,{modelValue:e.value,"onUpdate:modelValue":l[2]||(l[2]=m=>e.value=m),accordion:""},{default:R(()=>[L(s,{title:"treeV2",name:"treeV2"},{default:R(()=>[V("div",null,[L(Ve,{modelValue:r.value,"onUpdate:modelValue":l[0]||(l[0]=m=>r.value=m),data:i.value,"check-strictly":!0,showCheckbox:!0,style:{"min-width":"200px"}},null,8,["modelValue","data"])]),V("div",null,Y(r.value),1)]),_:1}),L(s,{title:"selectTreeV2",name:"SelectTreeV2"},{default:R(()=>[V("div",null,[L(zr,{modelValue:n.value,"onUpdate:modelValue":l[1]||(l[1]=m=>n.value=m),data:i.value,props:a.value},null,8,["modelValue","data","props"])]),V("div",null,Y(n.value),1)]),_:1})]),_:1},8,["modelValue"])}}};export{Gr as default};
