webpackJsonp([7],{"+mJu":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{name:"login",method:"POST",desc:"登录",path:"/admin/auth/dologin",isMock:!1,mockPath:"",params:{account:"",password:"",code:""}},{name:"verificationCode",method:"GET",desc:"获取验证码",path:"/common/public/verificationCode",mockPath:"",isMock:!1,params:{}},{name:"permissionList",method:"GET",desc:"获取这个用户的全部权限",path:"/common/public/permissionList",mockPath:"",isMock:!1,params:{}},{name:"logout",method:"GET",desc:"退出登录",path:"/admin/auth/logout",mockPath:"",isMock:!1,params:{}}]},"/31p":function(t,e,n){var a={"./demoTemplate/config/store.js":"oiL+"};function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="/31p"},"0csv":function(t,e){},"0xDb":function(t,e,n){"use strict";e.b=function(t,e){var n=!1;(Object(l.isArray)(t)||Object(l.isObject)(t))&&(n=!0,t=d()(t));t.includes("#{")&&(t=t.replace(/#{(.+?)}/g,function(t,n){return Object(l.isObject)(e)?c()(e,n)?i()(e,n):"":e}));return n?JSON.parse(t):t},n.d(e,"a",function(){return m}),n.d(e,"d",function(){return p}),n.d(e,"e",function(){return f}),n.d(e,"c",function(){return h});var a=n("Dd8w"),r=n.n(a),o=n("dxoA"),i=n.n(o),s=n("iD6E"),c=n.n(s),u=n("mvHQ"),d=n.n(u),l=n("M4fF");n.n(l);var m=n("zNUS");m.XHR.prototype.__send=m.XHR.prototype.send,m.XHR.prototype.send=function(){this.custom.xhr&&(this.custom.xhr.withCredentials=this.withCredentials||!1),this.__send.apply(this,arguments)},m.setup({timeout:"200-1000"});var p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"success";return{code:e,data:t=m.mock(t),message:n}},f=function(t){return t=m.mock(t),p(r()({current_page:1,from:1,last_page:1,per_page:15,to:3,total:15},t))},h=function(t){var e=t.type,n=t.url,a=t.body,r={type:e=m.Random.lower(e),params:{},url:n};if("get"===e){var o=n.split("?");if(r.url=o[0],o[1])o[1].split("&").forEach(function(t){t=t.split("="),r.params[t[0]]=t[1]})}else if("post"===e&&a){try{a=JSON.parse(a)}catch(t){}r.params=a}return r}},"8R3u":function(t,e){},"8dFY":function(t,e){},"911s":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{name:"developmentOtherIndex",method:"GET",desc:"获取开发日志",path:"/admin/log/developmentOtherIndex",mockPath:"",isMock:!1,params:{page:1,limit:20,sort:"desc"}},{name:"developmentOtherAdd",method:"POST",desc:"添加开发日志",path:"/admin/log/developmentOtherAdd",mockPath:"",isMock:!1,params:{title:"",description:"",content:""}},{name:"developmentOtherUpdate",method:"POST",desc:"更新开发日志",path:"/admin/log/developmentOtherUpdate",mockPath:"",isMock:!1,params:{id:null,title:"",description:"",content:""}}]},"96fi":function(t,e){},"9xJm":function(t,e,n){var a={"./auth/config/api.js":"+mJu","./dashboard/config/api.js":"ytbg","./demoTemplate/config/api.js":"YztB","./log/config/api.js":"911s"};function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="9xJm"},EQJ6:function(t,e,n){var a={"./dashboard/config/mock.js":"jjL+","./demoTemplate/config/mock.js":"qFFv"};function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="EQJ6"},"J+8z":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("mvHQ"),r=n.n(a),o={name:"submenu",props:{item:Object},data:function(){return{}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.item.childs?n("el-submenu",{attrs:{index:String(t.item.index)}},[n("template",{slot:"title"},[n("icon",{attrs:{type:t.item.icon}}),t._v(" "),n("span",[t._v(t._s(t.item.text))])],1),t._v(" "),t._l(t.item.childs,function(t,e){return n("submenu",{key:e,attrs:{item:t}})})],2):n("el-menu-item",{attrs:{route:t.item.route,index:t.item.path}},[n("icon",{attrs:{type:t.item.icon}}),t._v(" "),n("span",[t._v(t._s(t.item.text))])],1)},staticRenderFns:[]};var s={name:"side-navigation",data:function(){return{isCollapse:!1}},computed:{sidebarData:function(){return this.handleNavIndex(JSON.parse(r()(this.$config.SIDE_NAV_MENU)))}},components:{submenu:n("VU/8")(o,i,!1,function(t){n("JLU9")},null,null).exports},methods:{handleNavIndex:function(t,e){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.forEach(function(t,r){t.index=e?e+"-"+(r+1):r+1,t.path=a.path?a.path+"/"+t.path:t.path,t.childs&&n.handleNavIndex(t.childs,t.index,t)}),t}},mounted:function(){var t=this;window.$variable.vbus.$on("collapseLeftNav",function(e){t.isCollapse=e})}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-aside",{class:["side-nav",t.isCollapse?"hide-side":"show-side"]},[n("div",{staticClass:"logo",on:{click:function(e){t.$router.push("/")}}},[n("img",{attrs:{src:"https://cn.vuejs.org/images/logo.png",alt:""}}),t._v(" "+t._s(t.isCollapse?"":t.$config.TITLE)+"\n  ")]),t._v(" "),n("el-menu",{staticClass:"el-menu-vertical",attrs:{"default-active":t.$route.path,router:!0,collapse:t.isCollapse,"background-color":"#001529","text-color":"#fff","active-text-color":"#1890ff"}},t._l(t.sidebarData,function(t,e){return n("submenu",{key:e,attrs:{item:t}})}))],1)},staticRenderFns:[]};var u=n("VU/8")(s,c,!1,function(t){n("RZ80")},"data-v-7d7200fc",null).exports,d=n("M4fF"),l={name:"header-navigation",data:function(){return{isShowSide:!1,name:""}},methods:{logout:function(){var t=this;this.$api.authLogout().then(function(e){localStorage.clear(),t.$router.push("/login")})},collapse:function(){this.isShowSide=!this.isShowSide,window.$variable.vbus.$emit("collapseLeftNav",this.isShowSide)},changeWindow:function(){this.$store.commit("updateWindowSize",window.innerWidth),window.innerWidth>991?(this.isShowSide=!1,window.$variable.vbus.$emit("collapseLeftNav",!1)):(this.isShowSide=!0,window.$variable.vbus.$emit("collapseLeftNav",!0))}},mounted:function(){var t=this;window.onresize=Object(d.debounce)(this.changeWindow,300,{maxWait:600}),this.$nextTick(function(){t.changeWindow()})},created:function(){this.name=this.getLocalStorage("user",!0).name}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-header",{class:["header-navigation",t.isShowSide?"hide-nav":"show-nav"]},[n("div",{staticClass:"logo",on:{click:t.collapse}},[n("icon",{attrs:{type:t.isShowSide?"fold-right":"fold-left"}})],1),t._v(" "),n("div",{staticClass:"right"},[n("el-dropdown",{attrs:{trigger:"click"}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n        "+t._s(t.name)),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[n("router-link",{attrs:{to:"/"}},[t._v("修改密码")])],1),t._v(" "),n("el-dropdown-item",{attrs:{divided:""}},[n("p",{on:{click:t.logout}},[t._v("退出登录")])])],1)],1)],1)])},staticRenderFns:[]};var p={name:"general-layout",data:function(){return{isCollapse:!1}},components:{sideNavigation:u,headerNavigation:n("VU/8")(l,m,!1,function(t){n("PJIV")},"data-v-23e90890",null).exports},mounted:function(){var t=this;window.$variable.vbus.$on("collapseLeftNav",function(e){t.isCollapse=e})}},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"general-layout"},[e("header-navigation"),this._v(" "),e("el-container",[e("side-navigation"),this._v(" "),e("el-main",{class:["main",this.isCollapse?"hide-main":"show-main"]},[e("c-breadcrumb",{attrs:{routes:this.$route.matched}}),this._v(" "),e("div",{staticClass:"main-container"},[e("transition",{attrs:{name:"fade"}},[e("router-view")],1)],1),this._v(" "),e("c-footer")],1)],1)],1)},staticRenderFns:[]};var h=n("VU/8")(p,f,!1,function(t){n("Lbc9")},"data-v-1426ce3d",null);e.default=h.exports},JLU9:function(t,e){},Lbc9:function(t,e){},Lbij:function(t,e,n){var a={"./BlankLayout.vue":"tAuZ","./GeneralLayout.vue":"J+8z"};function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="Lbij"},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={};n.d(a,"TITLE",function(){return T}),n.d(a,"API_PREFIX",function(){return P}),n.d(a,"AXIOS_DEFAULT_CONFIG",function(){return S}),n.d(a,"defaultFormLayout",function(){return D}),n.d(a,"API_DEFAULT_CONFIG",function(){return C}),n.d(a,"SIDE_NAV_MENU",function(){return $}),n.d(a,"AUTH_DEBUG",function(){return R});var r=n("7+uW"),o=n("Lbij"),i={};o.keys().forEach(function(t){var e=(t=o(t).default).name;t&&(i[e]=t)});var s=i,c={name:"app",data:function(){return{currentLayout:null}},watch:{$route:{handler:function(){var t=this.$route,e=t.meta.layout||"general";this.currentLayout=s[e+"-layout"],window.$variable.vbus.$emit("updateRouter",t)},immediate:!0}}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e(this.currentLayout,{tag:"component"})],1)},staticRenderFns:[]};var d=n("VU/8")(c,u,!1,function(t){n("8R3u")},null,null).exports,l=n("Dd8w"),m=n.n(l),p=n("NYxO");r.default.use(p.a);var f=n("/31p"),h={};f.keys().forEach(function(t){var e=t.split("/");4===e.length&&(t=f(t).default,h[e[1]]=t)});var v=new p.a.Store({state:{windowSize:0},getters:{},mutations:{updateWindowSize:function(t,e){t.windowSize=e}},modules:m()({},h)}),b=n("fZjL"),g=n.n(b),y=n("C4MV"),w=n.n(y),k=n("Zrlr"),_=n.n(k),x=n("wxAW"),j=n.n(x),O=n("mtWM"),E=n.n(O),T="后台管理系统",P="http://39.107.98.143:4001/api",S={timeout:6e3,maxContentLength:2e3,headers:{},withCredentials:!0},D={md:{span:24},lg:{span:15}},C={mockBaseURL:"",mock:!0,debug:!1,sep:"/"},$=[{text:"首页",icon:"home",path:"/"},{text:"Dashboard",icon:"dashboard",path:"/dashboard",childs:[{text:"决战双11数据统计",icon:"list",path:"list"},{text:"站点信息数据统计",icon:"list",path:"website"}]},{text:"开发日志",icon:"log",path:"/log"}],R=!0,N=n("//Fk"),L=n.n(N),F=n("zL8q"),M=n.n(F);var A={};(A=E.a.create(S)).interceptors.request.use(function(t){var e=C.mock?C.mockBaseURL+t.url:P+t.url;return!1===t.isMock&&(e=P+t.url),t.url=e,t},function(t){return L.a.reject(t)}),A.interceptors.response.use(function(t){var e=t.data,n=e.code;switch(n){case 200:return e.data;case 401:return F.Message.error("请登录!"),window.location.href=window.location.origin+"/#/login",L.a.reject(e);default:var a=t.config._code;return a&&(a instanceof Array||(a=[a]),a.includes(n))?L.a.reject(e):(F.Message.error(e.message),L.a.reject(e))}},function(t){return F.Message.error("服务器出错，请联系管理员!"),L.a.reject(t)});var U=A,B=n("M4fF"),I=n("9xJm"),G={};I.keys().forEach(function(t){var e=t.replace(/\.\/(.*)\/.*\/.*\.js$/,"$1");(t=I(t).default)&&(G[e]=t)});var V=G;var H=new(function(){function t(e){_()(this,t),this.api={},this.apiBuilder(e)}return j()(t,[{key:"apiBuilder",value:function(t){var e=this,n=t.sep,a=void 0===n?"|":n,r=t.config,o=void 0===r?{}:r,i=t.mock,s=void 0!==i&&i,c=t.debug,u=void 0!==c&&c,d=t.mockBaseURL,l=void 0===d?"":d;g()(o).map(function(t){e._apiSingleBuilder({namespace:t,mock:s,mockBaseURL:l,sep:a,debug:u,config:o[t]})})}},{key:"_apiSingleBuilder",value:function(t){var e=this,n=t.namespace,a=(t.sep,t.config),r=void 0===a?{}:a,o=t.mock,i=void 0!==o&&o,s=t.debug,c=void 0!==s&&s,u=t.mockBaseURL,d=void 0===u?"":u;r.forEach(function(t){var a=t.name,r=t.desc,o=t.params,s=t.method,u=t.path,l=t.mockPath,m=t.isMock,p=a.substring(0,1).toUpperCase()+a.substring(1),f=""+n+p,h=i&&l||u,v=i&&d;c&&console.info("调用服务层接口"+f+"，接口描述为"+r),w()(e.api,f,{value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t._code;n&&(e._code=n);var a=Object(B.isEmpty)(t)?o:Object(B.pick)(Object(B.assign)({},o,t),g()(o));return U(function(t,e){t.method=t.method?t.method.toUpperCase():"GET","POST"===t.method?t.data=e:"GET"===t.method&&(t.params=e);return t}(Object(B.assign)({url:h,desc:r,baseURL:v,method:s,isMock:m},e),a))}})})}}]),t}())(m()({config:V},C)).api,J=n("mvHQ"),W=n.n(J),q=n("pFYg"),z=n.n(q),Y={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("i",{class:["iconfont","icon-"+t.type],style:[t.rotate?{transform:"rotate("+this.rotate+"deg)"}:""],on:{click:function(e){t.$emit("click")}}})},staticRenderFns:[]};var Q=n("VU/8")({name:"icon",props:["type","rotate"]},Y,!1,function(t){n("dH1/")},null,null).exports,X={name:"strong-dialog",props:{value:Boolean,operating:{type:Boolean,default:function(){return!0}}},data:function(){return{visible:this.value,dialogParams:{title:"添加数据"}}},watch:{visible:function(t){this.$emit("input",t)}}},Z={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{staticClass:"strong-dialog",attrs:{title:t.dialogParams.title?t.dialogParams.title:"添加数据",visible:t.visible},on:{"update:visible":function(e){t.visible=e},close:function(e){t.visible=!1}}},[t._t("default"),t._v(" "),t.operating?n("div",{staticStyle:{"text-align":"center"}},[n("el-button",{attrs:{type:"danger"},on:{click:function(e){t.visible=!1}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.$emit("submit")}}},[t._v("提交")])],1):t._e()],2)},staticRenderFns:[]};var K=n("VU/8")(X,Z,!1,function(t){n("hBOs")},null,null).exports,tt={name:"strong-list",props:{filter:{type:Object,default:function(){return{page:1,limit:15}}},getData:{type:Function},isPage:{type:Boolean,default:function(){return!0}}},data:function(){return{total:0,listData:[],response:{},loading:!1,initFilterParams:Object(B.cloneDeep)(this.filter)}},methods:{updateData:function(){var t=this,e=this.filter;this.getData&&(this.loading=!0,this.getData(e,function(n){t.response=n,t.isPage?(e.page=n.current_page,t.total=n.total,t.listData=n.data):t.listData=n,t.loading=!1}))},handleFilter:function(t){this.updateData()},handlePage:function(t){this.filter.page=t,this.updateData()},resetFilter:function(){var t=this.filter,e=this.initFilterParams;g()(t).forEach(function(n){t[n]=e[n]}),this.updateData(),this.$emit("resetFilter")}},created:function(){this.updateData()}},et={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"strong-list"},[t.$slots.operating?n("div",{staticClass:"header"},[t._t("operating")],2):t._e(),t._v(" "),t.$slots.filter?n("div",{staticClass:"filter"},[n("el-form",{attrs:{inline:!0,size:"small"},nativeOn:{submit:function(e){return e.preventDefault(),t.handleFilter(e)}}},[t._t("filter"),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary","native.type":"submit"},on:{click:t.handleFilter}},[t._v("查询")]),t._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:t.resetFilter}},[t._v("重置")])],1)],2)],1):t._e(),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-list"},[t._t("list",null,{data:t.listData}),t._v(" "),t.isPage?n("div",{staticClass:"page"},[n("div",[t._t("list-info",null,{data:t.response})],2),t._v(" "),n("el-pagination",{attrs:{"page-size":t.filter.limit,background:"",layout:"prev, pager, next, total, jumper","current-page":t.filter.page,total:t.total},on:{"current-change":t.handlePage,"update:currentPage":function(e){t.$set(t.filter,"page",e)}}})],1):t._e()],2)])},staticRenderFns:[]};var nt=n("VU/8")(tt,et,!1,function(t){n("96fi")},"data-v-0ae83c78",null).exports,at=n("BO1k"),rt=n.n(at),ot=n("woOf"),it=n.n(ot),st=n("0xDb"),ct={name:"c-breadcrumb",props:{routes:{type:Array},data:{type:Array,default:function(){return[]}},config:{type:Object,default:function(){return{}}}},data:function(){return{isObject:B.isObject,breadData:this.data}},methods:{breadCrumb:function(){var t=[],e=it()(this.$route.query,this.$route.params),n=!0,a=!1,r=void 0;try{for(var o,i=rt()(this.$route.matched);!(n=(o=i.next()).done);n=!0){var s=o.value;if(s.meta.bread){var c=!0,u=!1,d=void 0;try{for(var l,m=rt()(s.meta.bread);!(c=(l=m.next()).done);c=!0){var p=l.value;t.push(Object(st.b)(p,e))}}catch(t){u=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(u)throw d}}}}}catch(t){a=!0,r=t}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}this.breadData=t}},watch:{routes:{handler:function(t){t&&this.breadCrumb()},immediate:!0}}},ut={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-breadcrumb",{attrs:{separator:"/"}},[t._l(t.breadData,function(e,a){return["首页"==e?n("el-breadcrumb-item",{key:a,attrs:{to:"/"}},[t._v(t._s(e))]):t.isObject(e)?n("el-breadcrumb-item",{key:a},[n("span",{staticClass:"breadcrumb-a",on:{click:function(n){t.$router.push({name:e.url,params:e.params?e.params:{}})}}})]):n("el-breadcrumb-item",{key:a},[t._v(t._s(e))])]})],2)},staticRenderFns:[]};var dt={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("p",{staticClass:"statement"},[this._v("声明: 本项目里面的所有数据，均是本人结合互联网数据然后意想出来的，数据绝逼是假的，大家关注技术就好(*/ω＼*)")]),this._v(" "),e("p",{staticClass:"link"},[e("a",{attrs:{target:"_blank",href:"https://github.com/yuanjie007/vue-project"}},[this._v("GitHub项目")]),this._v(" "),e("a",{attrs:{target:"_blank",href:"http://www.yjgeek.com"}},[this._v("我的博客")])]),this._v(" "),e("p",[this._v("粤ICP备18024016号-1")])])}]};var lt={data:function(){return{}},computed:{windowSize:function(){return this.$store.state.windowSize}},methods:{getLocalStorage:function(t,e){if(t)return!!localStorage[t]&&(e?JSON.parse(localStorage[t]):localStorage[t])},setLocalStorage:function(t,e){if(!t)return console.warn("key不能为空!"),!1;"object"===(void 0===e?"undefined":z()(e))?localStorage[t]=W()(e):localStorage[t]=e},sortObj:function(t){return function(e,n){var a=e[t],r=n[t];return isNaN(Number(a))||isNaN(Number(r))||(a=Number(a),r=Number(r)),a<r?-1:a>r?1:0}}},components:{Icon:Q,StrongList:nt,StrongDialog:K,CBreadcrumb:n("VU/8")(ct,ut,!1,function(t){n("8dFY")},"data-v-14ef00ce",null).exports,CFooter:n("VU/8")({name:"c-footer",data:function(){return{}}},dt,!1,function(t){n("0csv")},"data-v-24404858",null).exports}},mt={auth:{inserted:function(t,e){var n=e.value,a=!0;"string"==typeof n&&(n=[n]);var r=!0,o=!1,i=void 0;try{for(var s,c=rt()(n.values());!(r=(s=c.next()).done);r=!0){var u="/api/admin/"+s.value;if(window.$variable.vm.$auth.includes(u)){a=!1;break}}}catch(t){o=!0,i=t}finally{try{!r&&c.return&&c.return()}finally{if(o)throw i}}a&&t.remove()}}},pt=n("Xxa5"),ft=n.n(pt),ht=n("exGp"),vt=n.n(ht),bt=n("5bDK"),gt=n("e6iP"),yt=new(function(){function t(){_()(this,t),this.connent=null}return j()(t,[{key:"initDB",value:function(){var t=vt()(ft.a.mark(function t(){var e,n,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"db",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return ft.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=new bt.Instance(new gt),t.next=3,e.isDbExist(a);case 3:return(n=t.sent)?e.openDb(a):e.createDb({name:a,tables:r}),this.connent=e,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"add",value:function(){var t=vt()(ft.a.mark(function t(e,n){return ft.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=n instanceof Array?n:[n],this.connent){t.next=4;break}return t.next=4,this.initDB();case 4:return this.connent.insert({into:e,values:n}),t.abrupt("return",n);case 6:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()},{key:"update",value:function(){var t=vt()(ft.a.mark(function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments[2];return ft.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connent){t.next=3;break}return t.next=3,this.initDB();case 3:return a=a||{id:n.id},this.connent.update({in:e,set:n,where:a}),t.abrupt("return",n);case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"remove",value:function(){var t=vt()(ft.a.mark(function t(e,n){var a;return ft.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connent){t.next=3;break}return t.next=3,this.initDB();case 3:return a={},"number"==typeof n?a.id=n:n instanceof Array?a.id={in:n}:a=n,this.connent.remove({from:e,where:a}),t.abrupt("return",!0);case 7:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()},{key:"select",value:function(){var t=vt()(ft.a.mark(function t(e){var n,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return ft.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connent){t.next=3;break}return t.next=3,this.initDB();case 3:return t.next=5,this.connent.select(m()({from:e,where:a},r));case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"page",value:function(){var t=vt()(ft.a.mark(function t(e){var n,a,r,o,i,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:15,page:1},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return ft.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.connent){t.next=3;break}return t.next=3,this.initDB();case 3:return n=s.limit,a=s.page,delete s.limit,delete s.page,"{}"===W()(s)&&(s=null),r=(a-1)*n,(o={}).order={by:"id",type:"desc"},c=m()({},o,c,{skip:r,limit:n}),i={},t.next=15,this.connent.select(m()({from:e},c,{where:s}));case 15:return i.data=t.sent,t.next=18,this.connent.count({from:e,where:s});case 18:return i.totalCount=t.sent,i.totalPage=Math.ceil(i.totalCount/n),i.page=a,t.abrupt("return",i);case 22:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}]),t}()),wt=n("zNUS"),kt=n("EQJ6");kt.keys().forEach(function(t){4===t.split("/").length&&(t=kt(t).default,g()(t).forEach(function(e){var n=t[e],a=n.type,r=n.template;e="^"+e,wt.mock(new RegExp(e),a,r)}))});var _t=n("fpSO"),xt=[];_t.keys().forEach(function(t){4===t.split("/").length&&(t=_t(t).default,xt.push(t))});var jt={tables:[],datas:{}};xt.forEach(function(t){t.tables&&t.tables instanceof Array&&(jt.tables=jt.tables.concat(t.tables)),t.datas&&(jt.datas=it()(jt.datas,t.datas))});var Ot=jt,Et={install:function(t){document.title=T,t.prototype.$config=a,t.prototype.$api=H,t.prototype.$auth=localStorage.auth?JSON.parse(localStorage.auth):[],t.prototype.$db=yt,yt.initDB("db",Ot.tables).then(function(t){t||g()(Ot.datas).forEach(function(t){yt.add(t,Ot.datas[t])})}),t.mixin(lt),g()(mt).forEach(function(e){t.directive(e,mt[e])})}},Tt=n("/ocq"),Pt=n("Gu7T"),St=n.n(Pt),Dt=n("w0qU"),Ct=[];Dt.keys().forEach(function(t){4===t.split("/").length&&((t=Dt(t).default)instanceof Array?Ct=[].concat(St()(Ct),St()(t)):Ct.push(t))});var $t=[{path:"/",component:function(t){return n.e(5).then(function(){return t(n("e5va"))}.bind(null,n)).catch(n.oe)},meta:{bread:["首页"]},children:[{path:"",name:"index",component:function(t){return n.e(4).then(function(){return t(n("tlXl"))}.bind(null,n)).catch(n.oe)}}].concat(St()(Ct))},{path:"/login",name:"login",component:function(t){return n.e(2).then(function(){return t(n("drqn"))}.bind(null,n)).catch(n.oe)},meta:{auth:!1,layout:"blank"}},{path:"**",redirect:"/"}];r.default.use(Tt.a);var Rt=new Tt.a({routes:$t});Rt.beforeEach(function(t,e,n){if(!1!==t.meta.auth)return localStorage.user?(n(),!1):(n("/login"),!1);n(),n()});var Nt=Rt;n("tvR6"),n("sfy8");r.default.use(M.a),r.default.use(Et),r.default.config.productionTip=!1,window.$variable={},window.$variable.vbus=new r.default,window.$variable.vm=new r.default({el:"#app",router:Nt,store:v,template:"<App/>",components:{App:d}})},PJIV:function(t,e){},RZ80:function(t,e){},"VDW+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={path:"/user",name:"user",component:function(t){return n.e(3).then(function(){return t(n("tQke"))}.bind(null,n)).catch(n.oe)}}},YztB:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{name:"index",method:"GET",desc:"登录",path:"/admin/user/index",mockPath:"",params:{account:"",password:"",code:""}}]},"d/ES":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Dd8w"),r=n.n(a),o=n("5bDK"),i=(n.n(o),n("0xDb"));e.default={tables:[{name:"product",columns:[{name:"id",primaryKey:!0,autoIncrement:!0},{name:"itemName",notNull:!0,dataType:o.DATA_TYPE.String},{name:"price",notNull:!0,dataType:o.DATA_TYPE.Number},{name:"quantity",notNull:!0,dataType:o.DATA_TYPE.Number}]},{name:"user",columns:[{name:"id",primaryKey:!0,autoIncrement:!0},{name:"itemName",notNull:!0,dataType:o.DATA_TYPE.String},{name:"price",notNull:!0,dataType:o.DATA_TYPE.Number},{name:"quantity",notNull:!0,dataType:o.DATA_TYPE.Number}]}],datas:r()({},i.a.mock({"product|1-10":[r()({itemName:i.a.mock("@name")},i.a.mock({"price|1-1000":1}),i.a.mock({"quantity|100-1000":1}))]}),i.a.mock({"user|1-10":[r()({itemName:i.a.mock("@name")},i.a.mock({"price|1-1000":1}),i.a.mock({"quantity|100-1000":1}))]}))}},"dH1/":function(t,e){},duLQ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){return n.e(0).then(function(){return t(n("XyHc"))}.bind(null,n)).catch(n.oe)};e.default={path:"/dashboard",component:function(t){return n.e(0).then(function(){return t(n("s8uY"))}.bind(null,n)).catch(n.oe)},meta:{bread:["仪表盘管理"]},children:[{path:"",name:"dashboard",component:a,meta:{bread:["双11巅峰对决"]}},{path:"list",name:"dashboardList",component:a,meta:{bread:["双11巅峰对决"]}},{path:"website",name:"dashboardWebsite",component:function(t){return n.e(0).then(function(){return t(n("xFwA"))}.bind(null,n)).catch(n.oe)},meta:{bread:["站点统计"]}}]}},ekVF:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={path:"/log",name:"log",component:function(t){return n.e(1).then(function(){return t(n("/3fu"))}.bind(null,n)).catch(n.oe)},meta:{bread:["日志中心"]}}},fpSO:function(t,e,n){var a={"./demoTemplate/config/table.js":"d/ES"};function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="fpSO"},hBOs:function(t,e){},"jjL+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("bOdI"),r=n.n(a),o=n("Dd8w"),i=n.n(o),s=n("0xDb"),c=n("M4fF");n.n(c);e.default={"/dashboard/list/platformTransactionLumpSum?.*":{type:"get",template:function(){return Object(s.d)([i()({title:"淘宝商城"},s.a.mock({"total|1000-3000":1}),{color:s.a.Random.color(),icon:"taobao"}),i()({title:"京东商城"},s.a.mock({"total|1000-3000":1}),{color:s.a.Random.color(),icon:"jingdong"}),i()({title:"天猫超市"},s.a.mock({"total|1000-3000":1}),{color:s.a.Random.color(),icon:"tianmao"}),i()({title:"小米商城"},s.a.mock({"total|1000-3000":1}),{color:s.a.Random.color(),icon:"xiaomi"})])}},"/dashboard/list/platform24HourCount?.*":{type:"get",template:function(){var t=[],e=["淘宝商城","京东商城","天猫超市","小米商城","唯品会","拼多多"],n=[200,30,20,10,0,80,0],a=[50,30,10,6,16,40,2],o=1;do{e.forEach(function(e,c){t.push(i()({time:o,name:e},s.a.mock(r()({},"price|"+n[c]+"-"+(n[c]+a[c]),1)))),n[c]+=a[c]}),o++}while(o<=24);return Object(s.d)(t)}},"/dashboard/list/platformProductTop10?.*":{type:"get",template:function(){var t;return t=["保健食品","牛奶粉","面膜","纸尿裤","面部精华","婴幼儿营养品","乳液","洁面","卸妆产品","化妆水"].map(function(t){return i()({name:t},s.a.mock({"price|100-500":1}))}),Object(s.d)(t)}},"/dashboard/list/platformRanking?.*":{type:"get",template:function(){var t={provinces:{color:s.a.Random.color(),data:[]},citys:{color:s.a.Random.color(),data:[]},progressCitys:{color:s.a.Random.color(),data:[]},countries:{color:s.a.Random.color(),data:[]}},e=50,n=1,a=["日本","美国","韩国","澳大利亚","德国","英国","法国","西班牙","新西兰","意大利"];do{t.provinces.data.push(i()({name:s.a.Random.province()},s.a.mock(r()({},"val|"+e+"-"+(e+50),1)))),t.citys.data.push(i()({name:s.a.Random.city()},s.a.mock(r()({},"val|"+e+"-"+(e+50),1)))),t.progressCitys.data.push(i()({name:s.a.Random.city()},s.a.mock(r()({},"val|"+e+"-"+(e+50),1)))),t.countries.data.push(i()({name:a[n-1]},s.a.mock(r()({},"val|"+e+"-"+(e+50),1)))),n++,e+=50}while(n<=10);return t.provinces.data=t.provinces.data.reverse(),t.citys.data=t.citys.data.reverse(),t.progressCitys.data=t.progressCitys.data.reverse(),t.countries.data=t.countries.data.reverse(),Object(s.d)(t)}},"/dashboard/website/realTimeTraffic?.*":{type:"get",template:function(t){var e={},n=0,a=["today","yesterday","predictionToday"];"2"===(Object(s.c)(t).params||{}).type&&(a=["yesterdayNow","everyDay","history"]);do{e[a[n]]=i()({},s.a.mock({"pv|1-1000":100}),s.a.mock({"uv|1-1000":100}),s.a.mock({"ip|1-1000":100}),s.a.mock({"target|1-100.1-10":1}),s.a.mock({"conversion|1-100.1-10":1}),{time:s.a.mock("@time")}),n++}while(n<3);return Object(s.d)(e)}},"/dashboard/website/trend?.*":{type:"get",template:function(t){var e=[],n=1,a=s.a.Random.now("yyyy-MM-dd"),r=new Date((new Date).getTime()-864e5);do{e.push(i()({time:n,date:r.getFullYear()+"-"+r.getMonth()+"-"+r.getDate()},s.a.mock({"val|0-1000":1}))),e.push(i()({time:n,date:a,dateMask:a},s.a.mock({"val|0-1000":1}))),n++}while(n<=24);return Object(s.d)(e)}},"/dashboard/website/keyword?.*":{type:"get",template:function(t){var e=[],n=0;do{e.push(i()({x:s.a.mock(["@cname","@word"][parseInt(20*Math.random()/10)])},s.a.mock({"value|0-3000":1}),{category:["百度","Google","搜狗","必应","360搜索","今日头条","虚位以待"][parseInt(70*Math.random()/10)]})),n++}while(n<49);return e.push({x:"袁杰的博客",value:8e3,category:"Google"}),Object(s.d)(e)}},"/dashboard/website/sourceWebsite?.*":{type:"get",template:function(t){var e=[],n=["百度","Google","搜狗","必应","360搜索","今日头条","虚位以待","微博","QQ","袁杰的博客"],a=0;do{e.push(i()({},s.a.mock({"pv|0-3000":1}),{type:n[parseInt(Math.random()*(10*n.length)/10)]})),a++}while(a<10);return Object(s.d)(Object(c.sortBy)(e,["pv"]).reverse())}},"/dashboard/website/sourcePage?.*":{type:"get",template:function(t){var e=[],n=0;do{e.push(i()({},s.a.mock({"pv|0-3000":1}),{type:"http://"+s.a.mock("@domain()")})),n++}while(n<10);return Object(s.d)(Object(c.sortBy)(e,["pv"]).reverse())}},"/dashboard/website/pageTop10?.*":{type:"get",template:function(t){var e=[],n=0;do{e.push(i()({},s.a.mock({"pv|0-3000":1}),{type:"http://"+s.a.mock("@domain()")})),n++}while(n<10);return Object(s.d)(Object(c.sortBy)(e,["pv"]).reverse())}},"/dashboard/website/userInfo?.*":{type:"get",template:function(t){var e=[];return e.push(i()({type:"浏览量"},s.a.mock({"new|0-3000":1}),s.a.mock({"old|0-3000":1}))),e.push(i()({type:"访客数"},s.a.mock({"new|0-3000":1}),s.a.mock({"old|0-3000":1}))),e.push(i()({type:"跳出率"},s.a.mock({"new|0-100":1}),s.a.mock({"old|0-100":1}))),e.push({type:"平局访问时长",new:s.a.Random.now("HH:mm:ss"),old:s.a.Random.now("HH:mm:ss")}),e.push(i()({type:"平均访问页数"},s.a.mock({"new|1-100.1-10":1}),s.a.mock({"old|1-100.1-10":1}))),Object(s.d)(e)}}}},"oiL+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={namespace:!0,state:{aa:11}}},qFFv:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("0xDb");e.default={"/admin/user/index?.*":{type:"get",template:Object(a.e)({"data|1-10":[{id:a.a.Random.id(),isAdmin:!0,email:a.a.Random.email(),created_at:a.a.Random.date(),name:a.a.Random.first(),phone:"13800138000",qq:15645623,status:1,updated_at:a.a.Random.date(),userR:[{id:1,name:"超级管理员"}],weixin:null}]})},"/admin/user/add":{type:"post",template:function(t){var e=Object(a.c)(t).params;return Object(a.d)(e)}}}},sNAl:function(t,e){},sfy8:function(t,e){},tAuZ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"blank-layout"},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"blank-layout",data:function(){return{}}},a,!1,function(t){n("sNAl")},"data-v-ca8d97b8",null);e.default=r.exports},tvR6:function(t,e){},w0qU:function(t,e,n){var a={"./dashboard/config/router.js":"duLQ","./demoTemplate/config/router.js":"VDW+","./log/config/router.js":"ekVF"};function r(t){return n(o(t))}function o(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}r.keys=function(){return Object.keys(a)},r.resolve=o,t.exports=r,r.id="w0qU"},ytbg:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{name:"platformTransactionLumpSum",method:"GET",desc:"双11各大平台交易总额",path:"/dashboard/list/platformTransactionLumpSum",mockPath:"",params:{}},{name:"platform24HourCount",method:"GET",desc:"各大平台24小时每个小时的成交额",path:"/dashboard/list/platform24HourCount",mockPath:"",params:{}},{name:"platformProductTop10",method:"GET",desc:"全网平台销售前10的商品",path:"/dashboard/list/platformProductTop10",mockPath:"",params:{}},{name:"platformRanking",method:"GET",desc:"全网平台各种排行",path:"/dashboard/list/platformRanking",mockPath:"",params:{}},{name:"realTimeTraffic",method:"GET",desc:"type===1?今日实时流量 昨日流量 预计今日流量:昨天这个时候流量 每日平均访问量 历史访问峰值",path:"/dashboard/website/realTimeTraffic",mockPath:"",params:{type:1}},{name:"trend",method:"GET",desc:"访问趋势，和昨天对比",path:"/dashboard/website/trend",mockPath:"",params:{type:"PV数"}},{name:"keyword",method:"GET",desc:"检索关键字 做成一个词云",path:"/dashboard/website/keyword",mockPath:"",params:{}},{name:"sourceWebsite",method:"GET",desc:"来源站点",path:"/dashboard/website/sourceWebsite",mockPath:"",params:{}},{name:"sourcePage",method:"GET",desc:"来源页面",path:"/dashboard/website/sourcePage",mockPath:"",params:{}},{name:"pageTop10",method:"GET",desc:"受欢迎的页面Top10",path:"/dashboard/website/pageTop10",mockPath:"",params:{}},{name:"userInfo",method:"GET",desc:"新老访客",path:"/dashboard/website/userInfo",mockPath:"",params:{}}]}},["NHnr"]);
//# sourceMappingURL=app.8088ebbc35f6ccbe5f03.js.map