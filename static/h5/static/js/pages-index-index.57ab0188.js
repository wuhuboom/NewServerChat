(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0f43":function(e,t,n){"use strict";n.r(t);var i=n("6ff8"),s=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=s.a},"6ff8":function(e,t,n){"use strict";var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n("3c2d")),a=i(n("7621")),o={data:function(){return{title:"Hello",baseUrl:getApp().globalData.baseUrl,wsBaseUrl:getApp().globalData.wsBaseUrl,visitors:[],token:"",timer:null,wsOpen:!1,noticeContent:"通知: 无",innerAudioContext:null}},onShow:function(){var e=uni.getStorageSync("app");console.log(e),e&&(this.token=e.token),this.checkAuth(),this.getOnlineUser(),this.initPush()},onLoad:function(){},methods:{onlineIntime:function(){var e=this,t=null;uni.connectSocket({url:this.wsBaseUrl+"?token="+this.token}),uni.onSocketClose((function(e){clearInterval(t),console.log("WebSocket 连接断开")})),uni.onSocketOpen((function(e){console.log("WebSocket 连接已打开");var n={type:"ping",data:""};t=setInterval((function(){uni.sendSocketMessage({data:JSON.stringify(n)})}),5e3)})),uni.onSocketMessage((function(t){var n=JSON.parse(t.data);switch(n.type){case"allUsers":break;case"userOnline":e.addOnlineUser(n.data),a.default.playVoice();break;case"userOffline":e.removeOfflineUser(n.data);break;case"notice":break;case"message":e.recvMessage(n.data);break}}))},getOnlineUser:function(){var e=this,t=this.baseUrl;uni.request({url:t+"/kefu/onlineVisitors?token="+e.token,method:"GET",success:function(t){console.log(t),t.data.result&&(e.visitors=t.data.result)},fail:function(e){}})},addOnlineUser:function(e){this.visitors=s.default.addVisitor(this.visitors,e),this.showNoticeBar(e.username+"来了")},removeOfflineUser:function(e){this.visitors=s.default.removeVisitor(this.visitors,e.visitor_id),this.showNoticeBar(e.name+"离线")},chatVisitor:function(e,t){uni.navigateTo({url:"/pages/index/detail?visitor_id="+t})},recvMessage:function(e){this.visitors=s.default.receiveMessage(this.visitors,e),this.showNoticeBar(e.name+":"+e.content),"yes"!=e.is_kefu&&a.default.playVoice()},initPush:function(){},showNotice:function(e){},showNoticeBar:function(e){var t=this;t.noticeContent=e},checkAuth:function(){var e=this;uni.request({url:e.baseUrl+"/uc/v1/refreshToken?token="+e.token,method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(t){var n=t.data.code;2e4!=n?uni.navigateTo({url:"/pages/index/login"}):(uni.setStorageSync("app",{token:t.data.result.token}),e.onlineIntime())}})},registerClient:function(e){var t=this,n=this.baseUrl;uni.request({url:n+"/kefu/appClient?token="+t.token,data:{client_id:e},method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(e){console.log(e)}})},showLastMessage:function(e){return""==e?"无消息":e},showUnreadNum:function(e){return 0==e||"0"==e?"dot":e},formatTime:function(e){e=Math.round(new Date(e).getTime()/1e3);return a.default.beautifyTime(e)}}};t.default=o},"72ad":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniNoticeBar:n("b452").default,uniList:n("498f").default,uniListChat:n("cec3").default,uniIcons:n("f281").default},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content"},[n("uni-notice-bar",{staticClass:"flyNoticeBar",attrs:{showClose:"false",showIcon:!0,single:"true",text:e.noticeContent}}),n("uni-list",{staticClass:"mt20",attrs:{border:!0}},e._l(e.visitors,(function(t){return n("uni-list-chat",{attrs:{clickable:!0,title:t.username,avatar:e.baseUrl+t.avator,note:e.showLastMessage(t.last_message),time:e.formatTime(t.updated_at),"badge-positon":"left","badge-text":e.showUnreadNum(t.unread_num)},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.chatVisitor(n,t.visitor_id)}}})})),1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:0==e.visitors.length,expression:"visitors.length==0"}],staticClass:"flyNotice"},[n("uni-icons",{staticClass:"mr-10",attrs:{type:"chatboxes",color:"#808080",size:"30"}}),e._v("暂无在线访客")],1)],1)},a=[]},d6c9:function(e,t,n){"use strict";n.r(t);var i=n("72ad"),s=n("0f43");for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);var o,r=n("f0c5"),u=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,"0ac1c07d",null,!1,i["a"],o);t["default"]=u.exports}}]);