var be=Object.defineProperty,oe=Object.getOwnPropertySymbols,de=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable,ue=(g,h,o)=>h in g?be(g,h,{enumerable:!0,configurable:!0,writable:!0,value:o}):g[h]=o,ie=(g,h)=>{for(var o in h||(h={}))de.call(h,o)&&ue(g,o,h[o]);if(oe)for(var o of oe(h))fe.call(h,o)&&ue(g,o,h[o]);return g},ge=(g,h)=>{var o={};for(var f in g)de.call(g,f)&&h.indexOf(f)<0&&(o[f]=g[f]);if(null!=g&&oe)for(var f of oe(g))h.indexOf(f)<0&&fe.call(g,f)&&(o[f]=g[f]);return o};(self.webpackChunkclipit=self.webpackChunkclipit||[]).push([[39],{8292:(g,h,o)=>{o(5555);const{devDependencies:l}=o(3681);g.exports={corePath:`https://unpkg.com/@ffmpeg/core@${l["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`}},2187:(g,h,o)=>{var f=o(8926).default;const l=o(5555);g.exports=function(){var m=f(function*(u){let _=u;return void 0===u?new Uint8Array:("string"==typeof u?_=/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(u)?atob(u.split(",")[1]).split("").map(b=>b.charCodeAt(0)):yield(yield fetch(l(u))).arrayBuffer():(u instanceof File||u instanceof Blob)&&(_=yield(m=>new Promise((u,_)=>{const b=new FileReader;b.onload=()=>{u(b.result)},b.onerror=({target:{error:{code:w}}})=>{_(Error(`File could not be read! Code=${w}`))},b.readAsArrayBuffer(m)}))(u)),new Uint8Array(_))});return function(u){return m.apply(this,arguments)}}()},9965:(g,h,o)=>{var f=o(8926).default;const l=o(5555),{log:v}=o(6945),m=function(){var u=f(function*(_,b){v("info",`fetch ${_}`);const w=yield(yield fetch(_)).arrayBuffer();v("info",`${_} file size = ${w.byteLength} bytes`);const e=new Blob([w],{type:b}),U=URL.createObjectURL(e);return v("info",`${_} blob URL = ${U}`),U});return function(b,w){return u.apply(this,arguments)}}();g.exports=function(){var u=f(function*({corePath:_}){if("string"!=typeof _)throw Error("corePath should be a string!");const b=l(_),w=yield m(b,"application/javascript"),e=yield m(b.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),U=yield m(b.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return"undefined"==typeof createFFmpegCore?new Promise(j=>{const A=document.createElement("script"),D=()=>{A.removeEventListener("load",D),v("info","ffmpeg-core.js script loaded"),j({createFFmpegCore,corePath:w,wasmPath:e,workerPath:U})};A.src=w,A.type="text/javascript",A.addEventListener("load",D),document.getElementsByTagName("head")[0].appendChild(A)}):(v("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:w,wasmPath:e,workerPath:U}))});return function(_){return u.apply(this,arguments)}}()},1346:(g,h,o)=>{const f=o(8292),l=o(9965),v=o(2187);g.exports={defaultOptions:f,getCreateFFmpegCore:l,fetchFile:v}},6151:g=>{g.exports={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}}},9639:(g,h,o)=>{var f=o(8926).default;const{defaultArgs:l,baseOptions:v}=o(6151),{setLogging:m,setCustomLogger:u,log:_}=o(6945),b=o(5542),w=o(8333),{defaultOptions:e,getCreateFFmpegCore:U}=o(1346),{version:j}=o(3681),A=Error("ffmpeg.wasm is not ready, make sure you have completed load().");g.exports=(D={})=>{const s=ie(ie(ie({},v),e),D),{log:I,logger:Z,progress:Q}=s,B=ge(s,["log","logger","progress"]);let L=null,M=null,k=null,O=!1,R=Q;const N=({type:n,message:a})=>{_(n,a),b(a,R),(n=>{"FFMPEG_END"===n&&null!==k&&(k(),k=null,O=!1)})(a)},z=function(){var n=f(function*(){if(_("info","load ffmpeg-core"),null!==L)throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");{_("info","loading ffmpeg-core");const{createFFmpegCore:a,corePath:p,workerPath:d,wasmPath:C}=yield U(B);L=yield a({mainScriptUrlOrBlob:p,printErr:T=>N({type:"fferr",message:T}),print:T=>N({type:"ffout",message:T}),locateFile:(T,S)=>{if("undefined"!=typeof window){if(void 0!==C&&T.endsWith("ffmpeg-core.wasm"))return C;if(void 0!==d&&T.endsWith("ffmpeg-core.worker.js"))return d}return S+T}}),M=L.cwrap("proxy_main","number",["number","number"]),_("info","ffmpeg-core loaded")}});return function(){return n.apply(this,arguments)}}();return m(I),u(Z),_("info",`use ffmpeg.wasm v${j}`),{setProgress:n=>{R=n},setLogger:n=>{u(n)},setLogging:m,load:z,isLoaded:()=>null!==L,run:(...n)=>{if(_("info",`run ffmpeg command: ${n.join(" ")}`),null===L)throw A;if(O)throw Error("ffmpeg.wasm can only run one command at a time");return O=!0,new Promise(a=>{const p=[...l,...n].filter(d=>0!==d.length);k=a,M(...w(L,p))})},exit:()=>{if(null===L)throw A;O=!1,L.exit(1),L=null,M=null,k=null},FS:(n,...a)=>{if(_("info",`run FS.${n} ${a.map(p=>"string"==typeof p?p:`<${p.length} bytes binary file>`).join(" ")}`),null===L)throw A;{let p=null;try{p=L.FS[n](...a)}catch(d){throw Error("readdir"===n?`ffmpeg.FS('readdir', '${a[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`:"readFile"===n?`ffmpeg.FS('readFile', '${a[0]}') error. Check if the path exists`:"Oops, something went wrong in FS operation.")}return p}}}}},260:(g,h,o)=>{o(7854);const f=o(9639),{fetchFile:l}=o(1346);g.exports={createFFmpeg:f,fetchFile:l}},6945:g=>{let h=!1,o=()=>{};g.exports={logging:h,setLogging:m=>{h=m},setCustomLogger:m=>{o=m},log:(m,u)=>{o({type:m,message:u}),h&&console.log(`[${m}] ${u}`)}}},8333:g=>{g.exports=(h,o)=>{const f=h._malloc(o.length*Uint32Array.BYTES_PER_ELEMENT);return o.forEach((l,v)=>{const m=h._malloc(l.length+1);h.writeAsciiToMemory(l,m),h.setValue(f+Uint32Array.BYTES_PER_ELEMENT*v,m,"i32")}),[o.length,f]}},5542:g=>{let h=0,o=0;const f=l=>{const[v,m,u]=l.split(":");return 60*parseFloat(v)*60+60*parseFloat(m)+parseFloat(u)};g.exports=(l,v)=>{if("string"==typeof l)if(l.startsWith("  Duration")){const m=l.split(", ")[0].split(": ")[1],u=f(m);v({duration:u,ratio:o}),(0===h||h>u)&&(h=u)}else if(l.startsWith("frame")||l.startsWith("size")){const m=l.split("time=")[1].split(" ")[0],u=f(m);o=u/h,v({ratio:o,time:u})}else l.startsWith("video:")&&(v({ratio:1}),h=0)}},5039:(g,h,o)=>{"use strict";o.r(h),o.d(h,{VideoModule:()=>ve});var f=o(9808),l=o(3075),v=o(4466),m=o(9100),u=o(5861),_=o(1135),b=o(7579),w=o(9841),e=o(5e3),U=o(9541),j=o(1609),A=o(276),D=o(8549),I=o(235);function Z(i,y){if(1&i&&(e.TgZ(0,"app-alert",9)(1,"p"),e._uU(2),e.qZA()()),2&i){const t=e.oxw().$implicit;e.Q6J("color",t.color),e.xp6(2),e.Oqu(t.msg)}}function Q(i,y){if(1&i&&(e.ynx(0),e.YNc(1,Z,3,2,"app-alert",8),e.BQk()),2&i){const t=y.$implicit;e.xp6(1),e.Q6J("ngIf",t.show)}}const B=function(i,y){return{"opacity-50":i,"hover:bg-indigo-700":y}};let L=(()=>{class i{constructor(t){this.clipService=t,this._clip=null,this.update=new e.vpe,this.alert$=new b.x,this.isProcessingRequest$=new b.x,this.clipId=new l.NI("",[l.kI.required]),this.title=new l.NI("",[l.kI.required,l.kI.minLength(3)]),this.editForm=new l.cw({title:this.title,id:this.clipId})}set clip(t){console.log("Nam data is: setting new clip",t),this._clip=t,this.clip&&(this.clipId.setValue(this.clip.docID),this.title.setValue(this.clip.title),this.alert$.next(null))}get clip(){return this._clip}onEditFormSubmit(){var t=this;return(0,u.Z)(function*(){if(t.clip){t.isProcessingRequest$.next(!0),t.alert$.next({show:!0,msg:"Please wait while we're updating your clip",color:"blue"});try{yield t.clipService.updateClip({docID:t.clipId.value,title:t.title.value})}catch(r){return t.isProcessingRequest$.next(!1),void t.alert$.next({show:!0,color:"red",msg:"Something went wrong. Please try again later"})}t.clip.title=t.title.value,t.update.emit(t.clip),t.isProcessingRequest$.next(!1),t.alert$.next({show:!0,color:"green",msg:"Success! Your clip is now updated"})}})()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(U.Y))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-edit"]],inputs:{clip:"clip"},outputs:{update:"update"},decls:15,vars:16,consts:[[1,"text-2xl","font-bold"],[4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"mt-4"],[1,"block","text-xl","mb-4"],["placeHolder","Enter title",3,"control"],[1,"mt-4","text-right"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","shadow-sm","rounded-md","text-white","bg-indigo-600","focus:outline-none",3,"disabled","ngClass"],[3,"color",4,"ngIf"],[3,"color"]],template:function(t,r){1&t&&(e.TgZ(0,"p",0),e._uU(1,"Edit Video"),e.qZA(),e.YNc(2,Q,2,1,"ng-container",1),e.ALo(3,"async"),e.TgZ(4,"form",2),e.NdJ("ngSubmit",function(){return r.onEditFormSubmit()}),e.TgZ(5,"div",3)(6,"label",4),e._uU(7,"Title"),e.qZA(),e._UZ(8,"app-input",5),e.qZA(),e.TgZ(9,"div",6)(10,"button",7),e.ALo(11,"async"),e.ALo(12,"async"),e.ALo(13,"async"),e._uU(14," Update "),e.qZA()()()),2&t&&(e.xp6(2),e.Q6J("ngIf",e.lcZ(3,5,r.alert$)),e.xp6(2),e.Q6J("formGroup",r.editForm),e.xp6(4),e.Q6J("control",r.title),e.xp6(2),e.Q6J("disabled",e.lcZ(11,7,r.isProcessingRequest$))("ngClass",e.WLB(13,B,e.lcZ(12,9,r.isProcessingRequest$),!1===e.lcZ(13,11,r.isProcessingRequest$))))},directives:[f.O5,D.w,l._Y,l.JL,l.sg,I.a,f.mk],pipes:[f.Ov],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0}),i})();const M=function(i){return["/","clips",i]};function k(i,y){if(1&i){const t=e.EpF();e.TgZ(0,"div",11)(1,"a",12),e._UZ(2,"img",13),e.qZA(),e.TgZ(3,"div",14)(4,"a",15),e._uU(5),e.qZA(),e.TgZ(6,"a",16),e.NdJ("click",function(c){const F=e.CHM(t).$implicit;return e.oxw().copyToClipboard(c,F.docID)}),e._uU(7," Copy Link "),e.qZA()(),e.TgZ(8,"div",17)(9,"a",18),e.NdJ("click",function(c){const F=e.CHM(t).$implicit;return e.oxw().onEditLinkClick(c,F)}),e.TgZ(10,"span",19),e._uU(11,"build"),e.qZA()(),e.TgZ(12,"a",20),e.NdJ("click",function(c){const F=e.CHM(t).$implicit;return e.oxw().onDeleteLinkClick(c,F)}),e.TgZ(13,"span",19),e._uU(14,"delete"),e.qZA()()()()}if(2&i){const t=y.$implicit;e.xp6(1),e.Q6J("routerLink",e.VKq(3,M,t.docID)),e.xp6(1),e.Q6J("src",t.screenshotURL,e.LSH),e.xp6(3),e.hij(" ",t.title," ")}}let O=(()=>{class i{constructor(t,r,c,x){this.router=t,this.activatedRouter=r,this.clipService=c,this.modalService=x,this.EDIT_MODAL_ID="editModal",this.videosSortOrder="asc",this.clips$=new _.X([]),this.activeClip$=new b.x}ngOnInit(){(0,w.a)([this.activatedRouter.queryParamMap,this.clipService.getUserClips()]).subscribe(([t,r])=>{const c=t.get("sort");c&&("asc"===c||"desc"===c)&&(this.videosSortOrder=c),r&&(r.sort((x,F)=>"desc"===this.videosSortOrder?x.timestamp.seconds-F.timestamp.seconds:F.timestamp.seconds-x.timestamp.seconds),this.clips$.next(null!=r?r:[]))})}sort(t){const{value:r}=t.target;this.router.navigate([],{relativeTo:this.activatedRouter,queryParams:{sort:r}})}onEditLinkClick(t,r){t.preventDefault(),this.activeClip$.next(Object.assign({},r)),this.modalService.showModal(this.EDIT_MODAL_ID)}onDeleteLinkClick(t,r){t.preventDefault(),this.clipService.deleteClip(r).subscribe({next:()=>{const c=this.clips$.getValue().filter(x=>x.docID!==r.docID);this.clips$.next(c)}})}onClipUpdate(t){const r=this.clips$.getValue(),c=r.findIndex(x=>x.docID===t.docID);r[c]=Object.assign(Object.assign({},r[c]),t),this.clips$.next(r)}copyToClipboard(t,r){return(0,u.Z)(function*(){if(t.preventDefault(),!r)return;const c=`${location.origin}/clips/${r}`;yield navigator.clipboard.writeText(c),alert("link coppied!")})()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(m.F0),e.Y36(m.gz),e.Y36(U.Y),e.Y36(j.Z))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-manage"]],decls:16,vars:9,consts:[[1,"container","mx-auto","my-8","bg-secondary","p-6"],[1,"rounded","relative","flex","justify-between"],["routerLink","/video/upload",1,"bg-indigo-400","text-white","py-4","px-10","text-xl"],[1,"text-black","px-8","text-xl","outline-none","appearance-none",3,"change"],["value","asc",3,"selected"],["value","desc",3,"selected"],[1,"container","mx-auto","my-8"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4"],["class","mt-6 rounded-tl-2xl rounded-br-2xl shadow-xl bg-secondary flex flex-col justify-start",4,"ngFor","ngForOf"],[3,"id"],[3,"clip","update"],[1,"mt-6","rounded-tl-2xl","rounded-br-2xl","shadow-xl","bg-secondary","flex","flex-col","justify-start"],[3,"routerLink"],["crossorigin","",1,"card-img-top","rounded-tl-2xl","w-full",3,"src"],[1,"p-6","text-2xl"],["href","#",1,"font-bold","mb-2"],["href","#",1,"bg-gray-400","text-white","px-2","py-1","ml-2","text-sm","rounded",3,"click"],[1,"flex","text-center","text-2xl","bg-gray-800","p-2","mt-auto"],["href","#",1,"flex-1","p-2","border-right","border-r-2","border-gray-700","transition","hover:text-indigo-400",3,"click"],[1,"material-icons","text-base"],["href","#",1,"flex-1","p-2","rounded-br-2xl","transition","hover:text-indigo-400",3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"a",2),e._uU(3,"Upload Videos"),e.qZA(),e.TgZ(4,"select",3),e.NdJ("change",function(x){return r.sort(x)}),e.TgZ(5,"option",4),e._uU(6," Recent Uploads "),e.qZA(),e.TgZ(7,"option",5),e._uU(8," Oldest Uploads "),e.qZA()()()(),e.TgZ(9,"div",6)(10,"div",7),e.YNc(11,k,15,5,"div",8),e.ALo(12,"async"),e.qZA()(),e.TgZ(13,"app-modal",9)(14,"app-edit",10),e.NdJ("update",function(x){return r.onClipUpdate(x)}),e.ALo(15,"async"),e.qZA()()),2&t&&(e.xp6(5),e.Q6J("selected","asc"===r.videosSortOrder),e.xp6(2),e.Q6J("selected","desc"===r.videosSortOrder),e.xp6(4),e.Q6J("ngForOf",e.lcZ(12,5,r.clips$)),e.xp6(2),e.Q6J("id",r.EDIT_MODAL_ID),e.xp6(1),e.Q6J("clip",e.lcZ(15,7,r.activeClip$)))},directives:[m.yS,l.YN,l.Kr,f.sg,A.z,L],pipes:[f.Ov],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0}),i})();var R=o(127),V=o(9646),N=o(4004),z=o(4128),X=o(3900),te=o(7556),J=o(260);let H=(()=>{class i{constructor(){this._isReadyBehaviourSubject=new _.X(!1),this.isReady$=this._isReadyBehaviourSubject.asObservable(),this._ffmpeg=(0,J.createFFmpeg)({log:!0})}init(){var t=this;return(0,u.Z)(function*(){t._isReadyBehaviourSubject.getValue()||(yield t._ffmpeg.load(),t._isReadyBehaviourSubject.next(!0))})()}getScreenShots(t){var r=this;return(0,u.Z)(function*(){const c=yield(0,J.fetchFile)(t);r._ffmpeg.FS("writeFile",t.name,c);const x=[1,2,3],F=[];x.forEach(P=>{F.push("-i",t.name,"-ss",`00:00:0${P}`,"-frames:v","1","-filter:v","scale=510:-1",`output_0${P}.png`)}),yield r._ffmpeg.run(...F);const G=[];return x.forEach(P=>{const ee=r._ffmpeg.FS("readFile",`output_0${P}.png`),re=new Blob([ee.buffer],{type:"image/png"}),se=URL.createObjectURL(re);G.push(se)}),G})()}blobFromURL(t){return(0,u.Z)(function*(){return yield(yield fetch(t)).blob()})()}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),q=(()=>{class i{handleEvent(t){t.preventDefault()}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275dir=e.lG2({type:i,selectors:[["","appEventBlocker",""]],hostBindings:function(t,r){1&t&&e.NdJ("drop",function(x){return r.handleEvent(x)})("dragover",function(x){return r.handleEvent(x)})}}),i})();var K=o(2313);let s=(()=>{class i{constructor(t){this.domSanitizer=t}transform(t){return this.domSanitizer.bypassSecurityTrustUrl(t)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(K.H7,16))},i.\u0275pipe=e.Yjl({name:"safeURL",type:i,pure:!0}),i})();const n=function(i){return{"bg-indigo-400 border-indigo-400 border-solid":i}};function a(i,y){if(1&i){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",6),e.NdJ("dragend",function(){return e.CHM(t),e.oxw(2).isDragOver=!1})("dragover",function(){return e.CHM(t),e.oxw(2).isDragOver=!0})("dragenter",function(){return e.CHM(t),e.oxw(2).isDragOver=!0})("dragleave",function(){return e.CHM(t),e.oxw(2).isDragOver=!1})("mouseleave",function(){return e.CHM(t),e.oxw(2).isDragOver=!1})("drop",function(c){return e.CHM(t),e.oxw(2).onFileDrop(c)}),e.TgZ(2,"h5"),e._uU(3,"Drop your file here (mp4 only!)"),e.qZA()(),e.TgZ(4,"input",7),e.NdJ("change",function(c){return e.CHM(t),e.oxw(2).onFileSelect(c)}),e.qZA(),e.BQk()}if(2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("ngClass",e.VKq(1,n,t.isDragOver))}}function p(i,y){if(1&i&&(e.ynx(0),e.YNc(1,a,5,3,"ng-container",3),e.ALo(2,"async"),e.ALo(3,"async"),e.BQk()),2&i){const t=e.oxw(),r=e.MAs(8);e.xp6(1),e.Q6J("ngIf",e.lcZ(2,2,t.ffmpegSevice.isReady$)&&!0!==e.lcZ(3,4,t.isProcessingVideo$))("ngIfElse",r)}}function d(i,y){if(1&i&&(e.TgZ(0,"p"),e._uU(1),e.ALo(2,"percent"),e.qZA()),2&i){const t=y.$implicit;e.xp6(1),e.hij(" ",e.lcZ(2,1,t)," ")}}function C(i,y){if(1&i&&(e.TgZ(0,"app-alert",19)(1,"p"),e._uU(2),e.qZA(),e.YNc(3,d,3,3,"p",8),e.ALo(4,"async"),e.qZA()),2&i){const t=e.oxw().$implicit,r=e.oxw(2);e.Q6J("color",t.color),e.xp6(2),e.Oqu(t.msg),e.xp6(1),e.Q6J("ngIf",e.lcZ(4,3,r.uploadPercentage$))}}function T(i,y){if(1&i&&(e.ynx(0),e.YNc(1,C,5,5,"app-alert",18),e.BQk()),2&i){const t=y.$implicit;e.xp6(1),e.Q6J("ngIf",t.show)}}const S=function(i,y){return{"border-green-400":i,"border-transparent":y}};function $(i,y){if(1&i){const t=e.EpF();e.TgZ(0,"div",20),e.NdJ("click",function(){const x=e.CHM(t).$implicit;return e.oxw(2).selectedScreenshot$.next(x)}),e.ALo(1,"async"),e.ALo(2,"async"),e._UZ(3,"img",21),e.ALo(4,"safeURL"),e.qZA()}if(2&i){const t=y.$implicit,r=e.oxw(2);e.Q6J("ngClass",e.WLB(8,S,t===e.lcZ(1,2,r.selectedScreenshot$),t!==e.lcZ(2,4,r.selectedScreenshot$))),e.xp6(3),e.Q6J("src",e.lcZ(4,6,t),e.LSH)}}const E=function(i,y){return{"opacity-50":i,"hover:bg-indigo-700":y}};function ne(i,y){if(1&i){const t=e.EpF();e.YNc(0,T,2,1,"ng-container",8),e.ALo(1,"async"),e.TgZ(2,"form",9),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().uploadFile()}),e.TgZ(3,"h2",10),e._uU(4,"Select a Thumbnail"),e.qZA(),e.TgZ(5,"div",11),e.YNc(6,$,5,11,"div",12),e.ALo(7,"async"),e.qZA(),e.TgZ(8,"div",13)(9,"label",14),e._uU(10,"Title"),e.qZA(),e._UZ(11,"app-input",15),e.qZA(),e.TgZ(12,"div",16)(13,"button",17),e.ALo(14,"async"),e.ALo(15,"async"),e.ALo(16,"async"),e._uU(17," Publish "),e.qZA()()()}if(2&i){const t=e.oxw();e.Q6J("ngIf",e.lcZ(1,6,t.alert$)),e.xp6(2),e.Q6J("formGroup",t.uploadForm),e.xp6(4),e.Q6J("ngForOf",e.lcZ(7,8,t.screenshots$)),e.xp6(5),e.Q6J("control",t.title),e.xp6(2),e.Q6J("disabled",e.lcZ(14,10,t.isProcessingRequest$))("ngClass",e.WLB(16,E,e.lcZ(15,12,t.isProcessingRequest$),!1===e.lcZ(16,14,t.isProcessingRequest$)))}}function W(i,y){1&i&&(e.TgZ(0,"span",22),e._uU(1," settings "),e.qZA())}const me=[{path:"manage",component:O},{path:"upload",component:(()=>{class i{constructor(t,r,c,x){this.authService=t,this.clipService=r,this.router=c,this.ffmpegSevice=x,this.CLIP_UPLOADING_MESSAGE="Please wait! Your clip is being uploaded",this.isDragOver=!1,this.file=null,this.user=null,this.screenshots$=(0,V.of)([]),this.isProcessingVideo$=new b.x,this.selectedScreenshot$=new _.X(null),this.alert$=new b.x,this.formEnabled=!1,this.title=new l.NI("",[l.kI.required,l.kI.minLength(3)]),this.uploadForm=new l.cw({title:this.title}),this.isProcessingRequest$=new b.x,this.uploadPercentage$=new b.x,this.videoUploadTask=null,this.screenshotUploadTask=null,this.authService.user$.subscribe(F=>this.user=F),this.ffmpegSevice.init()}ngOnDestroy(){this.videoUploadTask&&this.videoUploadTask.cancel(),this.screenshotUploadTask&&this.screenshotUploadTask.cancel()}onFileDrop(t){var r,c;this.isDragOver=!1;const x=null!==(c=null===(r=t.dataTransfer)||void 0===r?void 0:r.files[0])&&void 0!==c?c:null;this.setFile(x)}onFileSelect(t){var r,c;const x=null!==(c=null===(r=t.target.files)||void 0===r?void 0:r[0])&&void 0!==c?c:null;this.setFile(x)}setFile(t){var r=this;return(0,u.Z)(function*(){var c;if(!t)return;if(r.file=t,"video/mp4"!==r.file.type)return void console.log("Nam data is: ",null===(c=r.file)||void 0===c?void 0:c.type);r.isProcessingVideo$.next(!0);const x=yield r.ffmpegSevice.getScreenShots(r.file);r.screenshots$=(0,V.of)(x),r.selectedScreenshot$.next(x[0]),r.isProcessingVideo$.next(!0),r.title.setValue(r.file.name.replace(/\.[^/.]+$/,"")),r.formEnabled=!0})()}uploadFile(){var t=this;return(0,u.Z)(function*(){if(!t.file)return;t.uploadForm.disable(),t.alert$.next({show:!0,color:"blue",msg:t.CLIP_UPLOADING_MESSAGE}),t.isProcessingRequest$.next(!0);const r=yield t.ffmpegSevice.blobFromURL(t.selectedScreenshot$.getValue()),[c,x]=t.clipService.uploadClip(t.file);t.videoUploadTask=c;const[F,G]=t.clipService.uploadScreenshot(r);var P;t.screenshotUploadTask=F,(0,w.a)([t.videoUploadTask.percentageChanges(),t.screenshotUploadTask.percentageChanges()]).pipe((0,N.U)(([P,ee])=>((P||0)+(ee||0))/200)).subscribe(P=>t.uploadPercentage$.next(P)),(0,z.D)([t.videoUploadTask.snapshotChanges(),t.screenshotUploadTask.snapshotChanges()]).pipe((0,X.w)(()=>(0,z.D)([x.getDownloadURL(),x.getMetadata(),G.getDownloadURL(),G.getMetadata()]))).subscribe({next:(P=(0,u.Z)(function*([ee,re,se,ye]){var ae,le,ce,pe;t.isProcessingRequest$.next(!1);const _e={uid:null!==(le=null===(ae=t.user)||void 0===ae?void 0:ae.uuid)&&void 0!==le?le:"unknow",displayName:null!==(pe=null===(ce=t.user)||void 0===ce?void 0:ce.name)&&void 0!==pe?pe:"unknow user displayName",title:t.title.value,fileName:re.name,url:ee,screenshotURL:se,screenshotFileName:ye.name,timestamp:R.Z.firestore.FieldValue.serverTimestamp()},xe=yield t.clipService.createClip(_e);setTimeout(()=>{t.router.navigate(["clips",xe.id])},1e3),t.alert$.next({color:"green",msg:"Success! Your clip is now ready to be shared with the world.",show:!0})}),function(re){return P.apply(this,arguments)}),error:P=>{t.isProcessingRequest$.next(!1),t.uploadForm.enable(),t.alert$.next({color:"red",msg:"Upload failed. Please try again later",show:!0}),console.log("Nam data is: ",P)}})})()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(te.e),e.Y36(U.Y),e.Y36(m.F0),e.Y36(H))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-upload"]],decls:9,vars:2,consts:[[1,"container","mx-auto","my-8","bg-secondary","p-6"],[1,"rounded","relative","flex","flex-col"],[1,"font-bold","mb-6"],[4,"ngIf","ngIfElse"],["uploadFormTpl",""],["loadingTpl",""],["appEventBlocker","",1,"w-full","px-10","py-40","rounded","text-center","cursor-pointer","border","border-dashed","border-gray-400","transition","duration-500","hover:text-white","hover:bg-indigo-400","hover:border-indigo-400","hover:border-solid","text-xl",3,"ngClass","dragend","dragover","dragenter","dragleave","mouseleave","drop"],["type","file",1,"mt-4",3,"change"],[4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"mb-4","text-xl"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4"],["class","border-8 cursor-pointer",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"mt-4"],[1,"block","text-xl","mb-4"],["placeHolder","Enter title",3,"control"],[1,"mt-4","text-right"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","shadow-sm","rounded-md","text-white","bg-indigo-600","focus:outline-none",3,"disabled","ngClass"],[3,"color",4,"ngIf"],[3,"color"],[1,"border-8","cursor-pointer",3,"ngClass","click"],[3,"src"],[1,"material-symbols-outlined","text-center","text-6xl","p-8","animate-spin"]],template:function(t,r){if(1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._uU(3,"Upload Video"),e.qZA(),e.YNc(4,p,4,6,"ng-container",3),e.YNc(5,ne,18,19,"ng-template",null,4,e.W1O),e.qZA()(),e.YNc(7,W,2,0,"ng-template",null,5,e.W1O)),2&t){const c=e.MAs(6);e.xp6(4),e.Q6J("ngIf",!r.formEnabled)("ngIfElse",c)}},directives:[f.O5,q,f.mk,D.w,l._Y,l.JL,l.sg,f.sg,I.a],pipes:[f.Ov,f.Zx,s],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0}),i})()},{path:"manage-clips",redirectTo:"manage"}];let he=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[m.Bz.forChild(me)],m.Bz]}),i})(),ve=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[f.ez,he,v.m,l.UX]]}),i})()},7854:g=>{var h=function(o){"use strict";var v,f=Object.prototype,l=f.hasOwnProperty,m="function"==typeof Symbol?Symbol:{},u=m.iterator||"@@iterator",_=m.asyncIterator||"@@asyncIterator",b=m.toStringTag||"@@toStringTag";function w(s,n,a){return Object.defineProperty(s,n,{value:a,enumerable:!0,configurable:!0,writable:!0}),s[n]}try{w({},"")}catch(s){w=function(n,a,p){return n[a]=p}}function e(s,n,a,p){var C=Object.create((n&&n.prototype instanceof Q?n:Q).prototype),T=new H(p||[]);return C._invoke=function z(s,n,a){var p=j;return function(C,T){if(p===D)throw new Error("Generator is already running");if(p===I){if("throw"===C)throw T;return K()}for(a.method=C,a.arg=T;;){var S=a.delegate;if(S){var $=X(S,a);if($){if($===Z)continue;return $}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(p===j)throw p=I,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);p=D;var E=U(s,n,a);if("normal"===E.type){if(p=a.done?I:A,E.arg===Z)continue;return{value:E.arg,done:a.done}}"throw"===E.type&&(p=I,a.method="throw",a.arg=E.arg)}}}(s,a,T),C}function U(s,n,a){try{return{type:"normal",arg:s.call(n,a)}}catch(p){return{type:"throw",arg:p}}}o.wrap=e;var j="suspendedStart",A="suspendedYield",D="executing",I="completed",Z={};function Q(){}function B(){}function L(){}var M={};w(M,u,function(){return this});var k=Object.getPrototypeOf,O=k&&k(k(q([])));O&&O!==f&&l.call(O,u)&&(M=O);var R=L.prototype=Q.prototype=Object.create(M);function V(s){["next","throw","return"].forEach(function(n){w(s,n,function(a){return this._invoke(n,a)})})}function N(s,n){function a(C,T,S,$){var E=U(s[C],s,T);if("throw"!==E.type){var ne=E.arg,W=ne.value;return W&&"object"==typeof W&&l.call(W,"__await")?n.resolve(W.__await).then(function(Y){a("next",Y,S,$)},function(Y){a("throw",Y,S,$)}):n.resolve(W).then(function(Y){ne.value=Y,S(ne)},function(Y){return a("throw",Y,S,$)})}$(E.arg)}var p;this._invoke=function d(C,T){function S(){return new n(function($,E){a(C,T,$,E)})}return p=p?p.then(S,S):S()}}function X(s,n){var a=s.iterator[n.method];if(a===v){if(n.delegate=null,"throw"===n.method){if(s.iterator.return&&(n.method="return",n.arg=v,X(s,n),"throw"===n.method))return Z;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return Z}var p=U(a,s.iterator,n.arg);if("throw"===p.type)return n.method="throw",n.arg=p.arg,n.delegate=null,Z;var d=p.arg;return d?d.done?(n[s.resultName]=d.value,n.next=s.nextLoc,"return"!==n.method&&(n.method="next",n.arg=v),n.delegate=null,Z):d:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,Z)}function te(s){var n={tryLoc:s[0]};1 in s&&(n.catchLoc=s[1]),2 in s&&(n.finallyLoc=s[2],n.afterLoc=s[3]),this.tryEntries.push(n)}function J(s){var n=s.completion||{};n.type="normal",delete n.arg,s.completion=n}function H(s){this.tryEntries=[{tryLoc:"root"}],s.forEach(te,this),this.reset(!0)}function q(s){if(s){var n=s[u];if(n)return n.call(s);if("function"==typeof s.next)return s;if(!isNaN(s.length)){var a=-1,p=function d(){for(;++a<s.length;)if(l.call(s,a))return d.value=s[a],d.done=!1,d;return d.value=v,d.done=!0,d};return p.next=p}}return{next:K}}function K(){return{value:v,done:!0}}return B.prototype=L,w(R,"constructor",L),w(L,"constructor",B),B.displayName=w(L,b,"GeneratorFunction"),o.isGeneratorFunction=function(s){var n="function"==typeof s&&s.constructor;return!!n&&(n===B||"GeneratorFunction"===(n.displayName||n.name))},o.mark=function(s){return Object.setPrototypeOf?Object.setPrototypeOf(s,L):(s.__proto__=L,w(s,b,"GeneratorFunction")),s.prototype=Object.create(R),s},o.awrap=function(s){return{__await:s}},V(N.prototype),w(N.prototype,_,function(){return this}),o.AsyncIterator=N,o.async=function(s,n,a,p,d){void 0===d&&(d=Promise);var C=new N(e(s,n,a,p),d);return o.isGeneratorFunction(n)?C:C.next().then(function(T){return T.done?T.value:C.next()})},V(R),w(R,b,"Generator"),w(R,u,function(){return this}),w(R,"toString",function(){return"[object Generator]"}),o.keys=function(s){var n=[];for(var a in s)n.push(a);return n.reverse(),function p(){for(;n.length;){var d=n.pop();if(d in s)return p.value=d,p.done=!1,p}return p.done=!0,p}},o.values=q,H.prototype={constructor:H,reset:function(s){if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.method="next",this.arg=v,this.tryEntries.forEach(J),!s)for(var n in this)"t"===n.charAt(0)&&l.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=v)},stop:function(){this.done=!0;var n=this.tryEntries[0].completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(s){if(this.done)throw s;var n=this;function a($,E){return C.type="throw",C.arg=s,n.next=$,E&&(n.method="next",n.arg=v),!!E}for(var p=this.tryEntries.length-1;p>=0;--p){var d=this.tryEntries[p],C=d.completion;if("root"===d.tryLoc)return a("end");if(d.tryLoc<=this.prev){var T=l.call(d,"catchLoc"),S=l.call(d,"finallyLoc");if(T&&S){if(this.prev<d.catchLoc)return a(d.catchLoc,!0);if(this.prev<d.finallyLoc)return a(d.finallyLoc)}else if(T){if(this.prev<d.catchLoc)return a(d.catchLoc,!0)}else{if(!S)throw new Error("try statement without catch or finally");if(this.prev<d.finallyLoc)return a(d.finallyLoc)}}}},abrupt:function(s,n){for(var a=this.tryEntries.length-1;a>=0;--a){var p=this.tryEntries[a];if(p.tryLoc<=this.prev&&l.call(p,"finallyLoc")&&this.prev<p.finallyLoc){var d=p;break}}d&&("break"===s||"continue"===s)&&d.tryLoc<=n&&n<=d.finallyLoc&&(d=null);var C=d?d.completion:{};return C.type=s,C.arg=n,d?(this.method="next",this.next=d.finallyLoc,Z):this.complete(C)},complete:function(s,n){if("throw"===s.type)throw s.arg;return"break"===s.type||"continue"===s.type?this.next=s.arg:"return"===s.type?(this.rval=this.arg=s.arg,this.method="return",this.next="end"):"normal"===s.type&&n&&(this.next=n),Z},finish:function(s){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.finallyLoc===s)return this.complete(a.completion,a.afterLoc),J(a),Z}},catch:function(s){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc===s){var p=a.completion;if("throw"===p.type){var d=p.arg;J(a)}return d}}throw new Error("illegal catch attempt")},delegateYield:function(s,n,a){return this.delegate={iterator:q(s),resultName:n,nextLoc:a},"next"===this.method&&(this.arg=v),Z}},o}(g.exports);try{regeneratorRuntime=h}catch(o){"object"==typeof globalThis?globalThis.regeneratorRuntime=h:Function("r","regeneratorRuntime = r")(h)}},5555:function(g,h,o){var f,l;f=function(){return function v(){var m=arguments.length;if(0===m)throw new Error("resolveUrl requires at least one argument; got none.");var u=document.createElement("base");if(u.href=arguments[0],1===m)return u.href;var _=document.getElementsByTagName("head")[0];_.insertBefore(u,_.firstChild);for(var w,b=document.createElement("a"),e=1;e<m;e++)b.href=arguments[e],u.href=w=b.href;return _.removeChild(u),w}},void 0!==(l=f.call(h,o,h,g))&&(g.exports=l)},8926:g=>{function h(f,l,v,m,u,_,b){try{var w=f[_](b),e=w.value}catch(U){return void v(U)}w.done?l(e):Promise.resolve(e).then(m,u)}g.exports=function o(f){return function(){var l=this,v=arguments;return new Promise(function(m,u){var _=f.apply(l,v);function b(e){h(_,m,u,b,w,"next",e)}function w(e){h(_,m,u,b,w,"throw",e)}b(void 0)})}},g.exports.__esModule=!0,g.exports.default=g.exports},3681:g=>{"use strict";g.exports=JSON.parse('{"name":"@ffmpeg/ffmpeg","version":"0.10.1","description":"FFmpeg WebAssembly version","main":"src/index.js","types":"src/index.d.ts","directories":{"example":"examples"},"scripts":{"start":"node scripts/server.js","build":"rimraf dist && webpack --config scripts/webpack.config.prod.js","prepublishOnly":"npm run build","lint":"eslint src","wait":"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js","test":"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node --experimental-wasm-threads --experimental-wasm-bulk-memory node_modules/.bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},"browser":{"./src/node/index.js":"./src/browser/index.js"},"repository":{"type":"git","url":"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},"keywords":["ffmpeg","WebAssembly","video"],"author":"Jerome Wu <jeromewus@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},"engines":{"node":">=12.16.1"},"homepage":"https://github.com/ffmpegwasm/ffmpeg.wasm#readme","dependencies":{"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},"devDependencies":{"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.10.0","@types/emscripten":"^1.39.4","babel-loader":"^8.1.0","chai":"^4.2.0","cors":"^2.8.5","eslint":"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1","express":"^4.17.1","mocha":"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.3.0","webpack":"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"}}')}}]);