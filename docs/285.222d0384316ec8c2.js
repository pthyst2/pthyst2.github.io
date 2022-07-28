"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[285],{7285:(g,u,r)=>{r.r(u),r.d(u,{LayoutErrorModule:()=>Z});var d=r(6895),l=r(7509),s=r(6384),p=r(801),t=r(8256),m=r(4001),i=r(6485),c=r(3868);let h=(()=>{class o{constructor(e,n){this.router=e,this.seo=n,this.faUser=p.ILF,this.title="Authentication Error",this.description="You need to logged in or granted permission to continue.",this.btn={label:"Login"}}ngOnInit(){this.setSEO()}setSEO(){this.seo.setTitle("Error: Authentication")}goLogin(){this.router.navigate(["auth/login"])}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(s.F0),t.Y36(m.v))},o.\u0275cmp=t.Xpm({type:o,selectors:[["page-error-authentication"]],decls:8,vars:4,consts:[[1,"text-center"],[1,"mb-8"],[1,"mb-4","text-xl","text-main"],[1,"text-greyDark"],[3,"label","click"],[3,"icon"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"p",2),t._uU(3),t.qZA(),t.TgZ(4,"p",3),t._uU(5),t.qZA()(),t.TgZ(6,"button-icon-fa",4),t.NdJ("click",function(){return n.goLogin()}),t._UZ(7,"fa-icon",5),t.qZA()()),2&e&&(t.xp6(3),t.Oqu(n.title),t.xp6(2),t.Oqu(n.description),t.xp6(1),t.Q6J("label",n.btn.label),t.xp6(1),t.Q6J("icon",n.faUser))},dependencies:[i.u,c.BN]}),o})(),f=(()=>{class o{constructor(e,n){this.router=e,this.seo=n,this.faHome=p.J9Y,this.title="Page Not Found",this.description="The page you looking for is broken or not existed.",this.btn={label:"Go to homepage"}}ngOnInit(){this.setSEO()}setSEO(){this.seo.setTitle("Error: Page Not Found")}goHome(){this.router.navigate(["home"])}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(s.F0),t.Y36(m.v))},o.\u0275cmp=t.Xpm({type:o,selectors:[["page-error-not-found"]],decls:8,vars:4,consts:[[1,"text-center"],[1,"mb-8"],[1,"mb-4","text-xl","text-main"],[1,"text-greyDark"],[3,"label","click"],[3,"icon"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"p",2),t._uU(3),t.qZA(),t.TgZ(4,"p",3),t._uU(5),t.qZA()(),t.TgZ(6,"button-icon-fa",4),t.NdJ("click",function(){return n.goHome()}),t._UZ(7,"fa-icon",5),t.qZA()()),2&e&&(t.xp6(3),t.Oqu(n.title),t.xp6(2),t.Oqu(n.description),t.xp6(1),t.Q6J("label",n.btn.label),t.xp6(1),t.Q6J("icon",n.faHome))},dependencies:[i.u,c.BN]}),o})();var E=r(1240),v=r(2340);const y=function(){return["/home"]};let C=(()=>{class o{constructor(){this.logoUrl=v.N.imageUrls.logos+"logo-empaty.svg"}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["partial-header-error"]],decls:3,vars:3,consts:[[1,"py-4","px-8","md:px-page_px_md","lg:px-page_px_lg","bg-blackest"],[3,"routerLink"],[3,"src"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"a",1),t._UZ(2,"img",2),t.qZA()()),2&e&&(t.xp6(1),t.Q6J("routerLink",t.DdM(2,y)),t.xp6(1),t.Q6J("src",n.logoUrl,t.LSH))},dependencies:[s.yS]}),o})();const L=[{path:"",component:(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["layout-error"]],decls:5,vars:0,consts:[[1,"flex","flex-col","min-h-screen"],[1,"py-8","grow","flex","justify-center","items-center"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t._UZ(1,"partial-header-error"),t.TgZ(2,"div",1),t._UZ(3,"router-outlet"),t.qZA(),t._UZ(4,"partial-copyright"),t.qZA())},dependencies:[s.lC,E.F,C]}),o})(),children:[{path:"page-not-found",component:f},{path:"authentication",component:h}]}];let T=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[s.Bz.forChild(L),s.Bz]}),o})(),Z=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[d.ez,T,l.G]}),o})()},4001:(g,u,r)=>{r.d(u,{v:()=>p});var d=r(2340),l=r(8256),s=r(1481);let p=(()=>{class t{constructor(i,c){this.meta=i,this.title=c}addMeta(i,c){this.meta.addTag({name:i,content:c})}setTitle(i,c){this.title.setTitle(i+=c&&1==c?"":" - "+d.N.appName)}}return t.\u0275fac=function(i){return new(i||t)(l.LFG(s.h_),l.LFG(s.Dx))},t.\u0275prov=l.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);