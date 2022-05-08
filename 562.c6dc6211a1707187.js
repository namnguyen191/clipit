"use strict";(self.webpackChunkclipit=self.webpackChunkclipit||[]).push([[562],{6562:(ae,y,a)=>{a.r(y),a.d(y,{VideoModule:()=>oe});var p=a(9808),d=a(2382),C=a(4466),c=a(7565),f=a(4004),e=a(5e3),T=a(3900),A=a(9646),q=a(7566),w=a(1205);let U=(()=>{class n{constructor(t,o){this.angularFirestore=t,this.angularFireAuth=o,this.CLIPS_COLLECTION_ID="clips",this._clipsCollection=this.angularFirestore.collection(this.CLIPS_COLLECTION_ID)}createClip(t){return this._clipsCollection.add(t)}getUserClips(){return this.angularFireAuth.user.pipe((0,T.w)(t=>t?this._clipsCollection.ref.where("uid","==",t.uid).get():(0,A.of)(null)),(0,f.U)(t=>{var o;return null!==(o=null==t?void 0:t.docs)&&void 0!==o?o:null}))}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(q.ST),e.LFG(w.zQ))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),F=(()=>{class n{constructor(t,o,r){this.router=t,this.activatedRouter=o,this.clipService=r,this.videosSortOrder="asc",this.clips$=r.getUserClips().pipe((0,f.U)(l=>{var u;return null!==(u=null==l?void 0:l.map(g=>Object.assign(Object.assign({},g.data()),{docID:g.id})))&&void 0!==u?u:null})),this.clips$.subscribe(l=>console.log("Nam data is: ",l))}ngOnInit(){this.activatedRouter.queryParamMap.subscribe(t=>{const o=t.get("sort");o&&("asc"===o||"desc"===o)&&(this.videosSortOrder=o)})}sort(t){const{value:o}=t.target;this.router.navigate([],{relativeTo:this.activatedRouter,queryParams:{sort:o}})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(c.F0),e.Y36(c.gz),e.Y36(U))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-manage"]],decls:112,vars:2,consts:[[1,"container","mx-auto","my-8","bg-secondary","p-6"],[1,"rounded","relative","flex","justify-between"],["routerLink","/video/upload",1,"bg-indigo-400","text-white","py-4","px-10","text-xl"],[1,"text-black","px-8","text-xl","outline-none","appearance-none",3,"change"],["value","asc",3,"selected"],["value","desc",3,"selected"],[1,"container","mx-auto","my-8"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4"],[1,"mt-6","rounded-tl-2xl","rounded-br-2xl","shadow-xl","bg-secondary","flex","flex-col","justify-start"],["href","#"],["src","assets/img/1.jpg",1,"card-img-top","rounded-tl-2xl","w-full"],[1,"p-6","text-2xl"],["href","#",1,"font-bold","mb-2"],["href","#",1,"bg-gray-400","text-white","px-2","py-1","ml-2","text-sm","rounded"],[1,"flex","text-center","text-2xl","bg-gray-800","p-2","mt-auto"],["href","#",1,"flex-1","p-2","border-right","border-r-2","border-gray-700","transition","hover:text-indigo-400"],[1,"material-icons","text-base"],["href","#",1,"flex-1","p-2","rounded-br-2xl","transition","hover:text-indigo-400"],[1,"hidden"],[1,"text-2xl","font-bold"],[1,"mt-4"],[1,"block","text-xl","mb-4"],["placeholder","Enter Title",1,"block","w-full","py-1.5","px-3","text-gray-200","border","border-gray-400","transition","duration-500","focus:outline-none","rounded","bg-transparent","focus:border-indigo-400"],[1,"mt-4","text-right"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","shadow-sm","rounded-md","text-white","bg-indigo-600","focus:outline-none"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"a",2),e._uU(3,"Upload Videos"),e.qZA(),e.TgZ(4,"select",3),e.NdJ("change",function(l){return o.sort(l)}),e.TgZ(5,"option",4),e._uU(6," Recent Uploads "),e.qZA(),e.TgZ(7,"option",5),e._uU(8," Oldest Uploads "),e.qZA()()()(),e.TgZ(9,"div",6)(10,"div",7)(11,"div",8)(12,"a",9),e._UZ(13,"img",10),e.qZA(),e.TgZ(14,"div",11)(15,"a",12),e._uU(16," Game Highlighting Clip "),e.qZA(),e.TgZ(17,"a",13),e._uU(18," Copy Link "),e.qZA()(),e.TgZ(19,"div",14)(20,"a",15)(21,"span",16),e._uU(22,"build"),e.qZA()(),e.TgZ(23,"a",17)(24,"span",16),e._uU(25,"delete"),e.qZA()()()(),e.TgZ(26,"div",8)(27,"a",9),e._UZ(28,"img",10),e.qZA(),e.TgZ(29,"div",11)(30,"a",12),e._uU(31," Game Highlighting Clip "),e.qZA(),e.TgZ(32,"a",13),e._uU(33," Copy Link "),e.qZA()(),e.TgZ(34,"div",14)(35,"a",15)(36,"span",16),e._uU(37,"build"),e.qZA()(),e.TgZ(38,"a",17)(39,"span",16),e._uU(40,"delete"),e.qZA()()()(),e.TgZ(41,"div",8)(42,"a",9),e._UZ(43,"img",10),e.qZA(),e.TgZ(44,"div",11)(45,"a",12),e._uU(46," Game Highlighting Clip "),e.qZA(),e.TgZ(47,"a",13),e._uU(48," Copy Link "),e.qZA()(),e.TgZ(49,"div",14)(50,"a",15)(51,"span",16),e._uU(52,"build"),e.qZA()(),e.TgZ(53,"a",17)(54,"span",16),e._uU(55,"delete"),e.qZA()()()(),e.TgZ(56,"div",8)(57,"a",9),e._UZ(58,"img",10),e.qZA(),e.TgZ(59,"div",11)(60,"a",12),e._uU(61," Game Highlighting Clip "),e.qZA(),e.TgZ(62,"a",13),e._uU(63," Copy Link "),e.qZA()(),e.TgZ(64,"div",14)(65,"a",15)(66,"span",16),e._uU(67,"build"),e.qZA()(),e.TgZ(68,"a",17)(69,"span",16),e._uU(70,"delete"),e.qZA()()()(),e.TgZ(71,"div",8)(72,"a",9),e._UZ(73,"img",10),e.qZA(),e.TgZ(74,"div",11)(75,"a",12),e._uU(76," Game Highlighting Clip "),e.qZA(),e.TgZ(77,"a",13),e._uU(78," Copy Link "),e.qZA()(),e.TgZ(79,"div",14)(80,"a",15)(81,"span",16),e._uU(82,"build"),e.qZA()(),e.TgZ(83,"a",17)(84,"span",16),e._uU(85,"delete"),e.qZA()()()(),e.TgZ(86,"div",8)(87,"a",9),e._UZ(88,"img",10),e.qZA(),e.TgZ(89,"div",11)(90,"a",12),e._uU(91," Game Highlighting Clip "),e.qZA(),e.TgZ(92,"a",13),e._uU(93," Copy Link "),e.qZA()(),e.TgZ(94,"div",14)(95,"a",15)(96,"span",16),e._uU(97,"build"),e.qZA()(),e.TgZ(98,"a",17)(99,"span",16),e._uU(100,"delete"),e.qZA()()()()()(),e.TgZ(101,"div",18)(102,"p",19),e._uU(103,"Edit Video"),e.qZA(),e.TgZ(104,"form")(105,"div",20)(106,"label",21),e._uU(107,"Title"),e.qZA(),e._UZ(108,"input",22),e.qZA(),e.TgZ(109,"div",23)(110,"button",24),e._uU(111," Update "),e.qZA()()()()),2&t&&(e.xp6(5),e.Q6J("selected","asc"===o.videosSortOrder),e.xp6(2),e.Q6J("selected","desc"===o.videosSortOrder))},directives:[c.yS,d.YN,d.Kr,d._Y,d.JL],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0}),n})();var m,S=a(5861),L=a(127),b=a(7579),E=a(8746),O=a(3103),D=new Uint8Array(16);function M(){if(!m&&!(m="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return m(D)}const I=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,$=function P(n){return"string"==typeof n&&I.test(n)};for(var s=[],h=0;h<256;++h)s.push((h+256).toString(16).substr(1));const J=function R(n,i,t){var o=(n=n||{}).random||(n.rng||M)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,i){t=t||0;for(var r=0;r<16;++r)i[t+r]=o[r];return i}return function N(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=(s[n[i+0]]+s[n[i+1]]+s[n[i+2]]+s[n[i+3]]+"-"+s[n[i+4]]+s[n[i+5]]+"-"+s[n[i+6]]+s[n[i+7]]+"-"+s[n[i+8]]+s[n[i+9]]+"-"+s[n[i+10]]+s[n[i+11]]+s[n[i+12]]+s[n[i+13]]+s[n[i+14]]+s[n[i+15]]).toLowerCase();if(!$(t))throw TypeError("Stringified UUID is invalid");return t}(o)};var k=a(2084),B=a(7556);let V=(()=>{class n{handleEvent(t){t.preventDefault()}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=e.lG2({type:n,selectors:[["","appEventBlocker",""]],hostBindings:function(t,o){1&t&&e.NdJ("drop",function(l){return o.handleEvent(l)})("dragover",function(l){return o.handleEvent(l)})}}),n})();var Y=a(8549),G=a(235);const j=function(n){return{"bg-indigo-400 border-indigo-400 border-solid":n}};function Q(n,i){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",5),e.NdJ("dragend",function(){return e.CHM(t),e.oxw().isDragOver=!1})("dragover",function(){return e.CHM(t),e.oxw().isDragOver=!0})("dragenter",function(){return e.CHM(t),e.oxw().isDragOver=!0})("dragleave",function(){return e.CHM(t),e.oxw().isDragOver=!1})("mouseleave",function(){return e.CHM(t),e.oxw().isDragOver=!1})("drop",function(r){return e.CHM(t),e.oxw().onFileDrop(r)}),e.TgZ(2,"h5"),e._uU(3,"Drop your file here (mp4 only!)"),e.qZA()(),e.TgZ(4,"input",6),e.NdJ("change",function(r){return e.CHM(t),e.oxw().onFileSelect(r)}),e.qZA(),e.BQk()}if(2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngClass",e.VKq(1,j,t.isDragOver))}}function z(n,i){if(1&n&&(e.TgZ(0,"p"),e._uU(1),e.ALo(2,"percent"),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.hij(" ",e.lcZ(2,1,t)," ")}}function X(n,i){if(1&n&&(e.TgZ(0,"app-alert",22)(1,"p"),e._uU(2),e.qZA(),e.YNc(3,z,3,3,"p",7),e.ALo(4,"async"),e.qZA()),2&n){const t=e.oxw().$implicit,o=e.oxw(2);e.Q6J("color",t.color),e.xp6(2),e.Oqu(t.msg),e.xp6(1),e.Q6J("ngIf",e.lcZ(4,3,o.uploadPercentage$))}}function K(n,i){if(1&n&&(e.ynx(0),e.YNc(1,X,5,5,"app-alert",21),e.BQk()),2&n){const t=i.$implicit;e.xp6(1),e.Q6J("ngIf",t.show)}}const W=function(n,i){return{"opacity-50":n,"hover:bg-indigo-700":i}};function ee(n,i){if(1&n){const t=e.EpF();e.YNc(0,K,2,1,"ng-container",7),e.ALo(1,"async"),e.TgZ(2,"form",8),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().uploadFile()}),e.TgZ(3,"h2",9),e._uU(4,"Select a Thumbnail"),e.qZA(),e.TgZ(5,"div",10)(6,"div",11),e._UZ(7,"img",12),e.qZA(),e.TgZ(8,"div",13),e._UZ(9,"img",14),e.qZA(),e.TgZ(10,"div",13),e._UZ(11,"img",15),e.qZA()(),e.TgZ(12,"div",16)(13,"label",17),e._uU(14,"Title"),e.qZA(),e._UZ(15,"app-input",18),e.qZA(),e.TgZ(16,"div",19)(17,"button",20),e.ALo(18,"async"),e.ALo(19,"async"),e.ALo(20,"async"),e._uU(21," Publish "),e.qZA()()()}if(2&n){const t=e.oxw();e.Q6J("ngIf",e.lcZ(1,5,t.alert$)),e.xp6(2),e.Q6J("formGroup",t.uploadForm),e.xp6(13),e.Q6J("control",t.title),e.xp6(2),e.Q6J("disabled",e.lcZ(18,7,t.isProcessingRequest$))("ngClass",e.WLB(13,W,e.lcZ(19,9,t.isProcessingRequest$),!1===e.lcZ(20,11,t.isProcessingRequest$)))}}const te=[{path:"manage",component:F},{path:"upload",component:(()=>{class n{constructor(t,o,r,l){this.angularFireStorage=t,this.authService=o,this.clipService=r,this.router=l,this.CLIP_UPLOADING_MESSAGE="Please wait! Your clip is being uploaded",this.isDragOver=!1,this.file=null,this.user=null,this.alert$=new b.x,this.formEnabled=!1,this.title=new d.NI("",[d.kI.required,d.kI.minLength(3)]),this.uploadForm=new d.cw({title:this.title}),this.isProcessingRequest$=new b.x,this.uploadPercentage$=null,this.uploadTask=null,this.authService.user$.subscribe(u=>this.user=u)}ngOnDestroy(){this.uploadTask&&this.uploadTask.cancel()}onFileDrop(t){var o,r;this.isDragOver=!1;const l=null!==(r=null===(o=t.dataTransfer)||void 0===o?void 0:o.files[0])&&void 0!==r?r:null;this.setFile(l)}onFileSelect(t){var o,r;const l=null!==(r=null===(o=t.target.files)||void 0===o?void 0:o[0])&&void 0!==r?r:null;this.setFile(l)}setFile(t){var o;if(t){if(this.file=t,"video/mp4"!==this.file.type)return void console.log("Nam data is: ",null===(o=this.file)||void 0===o?void 0:o.type);this.title.setValue(this.file.name.replace(/\.[^/.]+$/,"")),this.formEnabled=!0}}uploadFile(){var t=this;if(!this.file)return;this.uploadForm.disable(),this.alert$.next({show:!0,color:"blue",msg:this.CLIP_UPLOADING_MESSAGE}),this.isProcessingRequest$.next(!0);const o=J(),r=`clips/${o}.mp4`;this.uploadTask=this.angularFireStorage.upload(r,this.file);const l=this.angularFireStorage.ref(r);var u;this.uploadPercentage$=this.uploadTask.percentageChanges().pipe((0,f.U)(u=>u?u/100:0),(0,E.x)(()=>this.uploadPercentage$=null)),this.uploadTask.snapshotChanges().pipe((0,O.Z)(),(0,T.w)(()=>l.getDownloadURL())).subscribe({next:(u=(0,S.Z)(function*(g){var v,_,Z,x;const ie={uid:null!==(_=null===(v=t.user)||void 0===v?void 0:v.uuid)&&void 0!==_?_:"unknow",displayName:null!==(x=null===(Z=t.user)||void 0===Z?void 0:Z.name)&&void 0!==x?x:"unknow user displayName",title:t.title.value,fileName:`${o}.mp4`,url:g,timestamp:L.Z.firestore.FieldValue.serverTimestamp()},re=yield t.clipService.createClip(ie);setTimeout(()=>{t.router.navigate(["clips",re.id])},1e3),t.alert$.next({color:"green",msg:"Success! Your clip is now ready to be shared with the world.",show:!0})}),function(v){return u.apply(this,arguments)}),error:u=>{this.uploadForm.enable(),this.alert$.next({color:"red",msg:"Upload failed. Please try again later",show:!0}),console.log("Nam data is: ",u)}})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(k.Q1),e.Y36(B.e),e.Y36(U),e.Y36(c.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-upload"]],decls:7,vars:2,consts:[[1,"container","mx-auto","my-8","bg-secondary","p-6"],[1,"rounded","relative","flex","flex-col"],[1,"font-bold","mb-6"],[4,"ngIf","ngIfElse"],["uploadFormTpl",""],["appEventBlocker","",1,"w-full","px-10","py-40","rounded","text-center","cursor-pointer","border","border-dashed","border-gray-400","transition","duration-500","hover:text-white","hover:bg-indigo-400","hover:border-indigo-400","hover:border-solid","text-xl",3,"ngClass","dragend","dragover","dragenter","dragleave","mouseleave","drop"],["type","file",1,"mt-4",3,"change"],[4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"mb-4","text-xl"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4"],[1,"border-8","cursor-pointer","border-green-400"],["src","assets/img/1.jpg"],[1,"border-8","cursor-pointer","border-transparent"],["src","assets/img/2.jpg"],["src","assets/img/3.jpg"],[1,"mt-4"],[1,"block","text-xl","mb-4"],["placeHolder","Enter title",3,"control"],[1,"mt-4","text-right"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","shadow-sm","rounded-md","text-white","bg-indigo-600","focus:outline-none",3,"disabled","ngClass"],[3,"color",4,"ngIf"],[3,"color"]],template:function(t,o){if(1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._uU(3,"Upload Video"),e.qZA(),e.YNc(4,Q,5,3,"ng-container",3),e.YNc(5,ee,22,16,"ng-template",null,4,e.W1O),e.qZA()()),2&t){const r=e.MAs(6);e.xp6(4),e.Q6J("ngIf",!o.formEnabled)("ngIfElse",r)}},directives:[p.O5,V,p.mk,Y.w,d._Y,d.JL,d.sg,G.a],pipes:[p.Ov,p.Zx],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0}),n})()},{path:"manage-clips",redirectTo:"manage"}];let ne=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[c.Bz.forChild(te)],c.Bz]}),n})(),oe=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[p.ez,ne,C.m,d.UX]]}),n})()}}]);