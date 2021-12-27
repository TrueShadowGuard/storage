/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-mousewheel",function(e,t){var n="DOMMouseScroll",r=function(t){var r=e.Array(t,0,!0),i;return e.UA.gecko?(r[0]=n,i=e.config.win):i=e.config.doc,r.length<3?r[2]=i:r.splice(2,0,i),r};e.Env.evt.plugins.mousewheel={on:function(){return e.Event._attach(r(arguments))},detach:function(){return e.Event.detach.apply(e.Event,r(arguments))}}},"3.17.2",{requires:["node-base"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-resize",function(e,t){e.Event.define("windowresize",{on:e.UA.gecko&&e.UA.gecko<1.91?function(t,n,r){n._handle=e.Event.attach("resize",function(e){r.fire(e)})}:function(t,n,r){var i=e.config.windowResizeDelay||100;n._handle=e.Event.attach("resize",function(t){n._timer&&n._timer.cancel(),n._timer=e.later(i,e,function(){r.fire(t)})})},detach:function(e,t){t._timer&&t._timer.cancel(),t._handle.detach()}})},"3.17.2",{requires:["node-base","event-synthetic"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-hover",function(e,t){var n=e.Lang.isFunction,r=function(){},i={processArgs:function(e){var t=n(e[2])?2:3;return n(e[t])?e.splice(t,1)[0]:r},on:function(e,t,n,r){var i=t.args?t.args.slice():[];i.unshift(null),t._detach=e[r?"delegate":"on"]({mouseenter:function(e){e.phase="over",n.fire(e)},mouseleave:function(e){var n=t.context||this;i[0]=e,e.type="hover",e.phase="out",t._extra.apply(n,i)}},r)},detach:function(e,t,n){t._detach.detach()}};i.delegate=i.on,i.detachDelegate=i.detach,e.Event.define("hover",i)},"3.17.2",{requires:["event-mouseenter"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-touch",function(e,t){var n="scale",r="rotation",i="identifier",s=e.config.win,o={};e.DOMEventFacade.prototype._touch=function(t,s,o){var u,a,f,l,c;if(t.touches){this.touches=[],c={};for(u=0,a=t.touches.length;u<a;++u)l=t.touches[u],c[e.stamp(l)]=this.touches[u]=new e.DOMEventFacade(l,s,o)}if(t.targetTouches){this.targetTouches=[];for(u=0,a=t.targetTouches.length;u<a;++u)l=t.targetTouches[u],f=c&&c[e.stamp(l,!0)],this.targetTouches[u]=f||new e.DOMEventFacade(l,s,o)}if(t.changedTouches){this.changedTouches=[];for(u=0,a=t.changedTouches.length;u<a;++u)l=t.changedTouches[u],f=c&&c[e.stamp(l,!0)],this.changedTouches[u]=f||new e.DOMEventFacade(l,s,o)}n in t&&(this[n]=t[n]),r in t&&(this[r]=t[r]),i in t&&(this[i]=t[i])},e.Node.DOM_EVENTS&&e.mix(e.Node.DOM_EVENTS,{touchstart:1,touchmove:1,touchend:1,touchcancel:1,gesturestart:1,gesturechange:1,gestureend:1,MSPointerDown:1,MSPointerUp:1,MSPointerMove:1,MSPointerCancel:1,pointerdown:1,pointerup:1,pointermove:1,pointercancel:1}),s&&"ontouchstart"in s&&!(e.UA.chrome&&e.UA.chrome<6)?(o.start=["touchstart","mousedown"],o.end=["touchend","mouseup"],o.move=["touchmove","mousemove"],o.cancel=["touchcancel","mousecancel"]):s&&s.PointerEvent?(o.start="pointerdown",o.end="pointerup",o.move="pointermove",o.cancel="pointercancel"):s&&"msPointerEnabled"in s.navigator?(o.start="MSPointerDown",o.end="MSPointerUp",o.move="MSPointerMove",o.cancel="MSPointerCancel"):(o.start="mousedown",o.end="mouseup",o.move="mousemove",o.cancel="mousecancel"),e.Event._GESTURE_MAP=o},"3.17.2",{requires:["node-base"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-move",function(e,t){var n=e.Event._GESTURE_MAP,r={start:n.start,end:n.end,move:n.move},i="start",s="move",o="end",u="gesture"+s,a=u+o,f=u+i,l="_msh",c="_mh",h="_meh",p="_dmsh",d="_dmh",v="_dmeh",m="_ms",g="_m",y="minTime",b="minDistance",w="preventDefault",E="button",S="ownerDocument",x="currentTarget",T="target",N="nodeType",C=e.config.win&&"msPointerEnabled"in e.config.win.navigator,k="msTouchActionCount",L="msInitTouchAction",A=function(t,n,r){var i=r?4:3,s=n.length>i?e.merge(n.splice(i,1)[0]):{};return w in s||(s[w]=t.PREVENT_DEFAULT),s},O=function(e,t){return t._extra.root||e.get(N)===9?e:e.get(S)},M=function(t){var n=t.getDOMNode();return t.compareTo(e.config.doc)&&n.documentElement?n.documentElement:!1},_=function(e,t,n){e.pageX=t.pageX,e.pageY=t.pageY,e.screenX=t.screenX,e.screenY=t.screenY,e.clientX=t.clientX,e.clientY=t.clientY,e[T]=e[T]||t[T],e[x]=e[x]||t[x],e[E]=n&&n[E]||1},D=function(t){var n=M(t)||t.getDOMNode(),r=t.getData(k);C&&(r||(r=0,t.setData(L,n.style.msTouchAction)),n.style.msTouchAction=e.Event._DEFAULT_TOUCH_ACTION,r++,t.setData(k,r))},P=function(e){var t=M(e)||e.getDOMNode(),n=e.getData(k),r=e.getData(L);C&&(n--,e.setData(k,n),n===0&&t.style.msTouchAction!==r&&(t.style.msTouchAction=r))},H=function(e,t){t&&(!t.call||t(e))&&e.preventDefault()},B=e.Event.define;e.Event._DEFAULT_TOUCH_ACTION="none",B(f,{on:function(e,t,n){D(e),t[l]=e.on(r[i],this._onStart,this,e,t,n)},delegate:function(e,t,n,s){var o=this;t[p]=e.delegate(r[i],function(r){o._onStart(r,e,t,n,!0)},s)},detachDelegate:function(e,t,n,r){var i=t[p];i&&(i.detach(),t[p]=null),P(e)},detach:function(e,t,n){var r=t[l];r&&(r.detach(),t[l]=null),P(e)},processArgs:function(e,t){var n=A(this,e,t);return y in n||(n[y]=this.MIN_TIME),b in n||(n[b]=this.MIN_DISTANCE),n},_onStart:function(t,n,i,u,a){a&&(n=t[x]);var f=i._extra,l=!0,c=f[y],h=f[b],p=f.button,d=f[w],v=O(n,i),m;t.touches?t.touches.length===1?_(t,t.touches[0],f):l=!1:l=p===undefined||p===t.button,l&&(H(t,d),c===0||h===0?this._start(t,n,u,f):(m=[t.pageX,t.pageY],c>0&&(f._ht=e.later(c,this,this._start,[t,n,u,f]),f._hme=v.on(r[o],e.bind(function(){this._cancel(f)},this))),h>0&&(f._hm=v.on(r[s],e.bind(function(e){(Math.abs(e.pageX-m[0])>h||Math.abs(e.pageY-m[1])>h)&&this._start(t,n,u,f)},this)))))},_cancel:function(e){e._ht&&(e._ht.cancel(),e._ht=null),e._hme&&(e._hme.detach(),e._hme=null),e._hm&&(e._hm.detach(),e._hm=null)},_start:function(e,t,n,r){r&&this._cancel(r),e.type=f,t.setData(m,e),n.fire(e)},MIN_TIME:0,MIN_DISTANCE:0,PREVENT_DEFAULT:!1}),B(u,{on:function(e,t,n){D(e);var i=O(e,t,r[s]),o=i.on(r[s],this._onMove,this,e,t,n);t[c]=o},delegate:function(e,t,n,i){var o=this;t[d]=e.delegate(r[s],function(r){o._onMove(r,e,t,n,!0)},i)},detach:function(e,t,n){var r=t[c];r&&(r.detach(),t[c]=null),P(e)},detachDelegate:function(e,t,n,r){var i=t[d];i&&(i.detach(),t[d]=null),P(e)},processArgs:function(e,t){return A(this,e,t)},_onMove:function(e,t,n,r,i){i&&(t=e[x]);var s=n._extra.standAlone||t.getData(m),o=n._extra.preventDefault;s&&(e.touches&&(e.touches.length===1?_(e,e.touches[0]):s=!1),s&&(H(e,o),e.type=u,r.fire(e)))},PREVENT_DEFAULT:!1}),B(a,{on:function(e,t,n){D(e);var i=O(e,t),s=i.on(r[o],this._onEnd,this,e,t,n);t[h]=s},delegate:function(e,t,n,i){var s=this;t[v]=e.delegate(r[o],function(r){s._onEnd(r,e,t,n,!0)},i)},detachDelegate:function(e,t,n,r){var i=t[v];i&&(i.detach(),t[v]=null),P(e)},detach:function(e,t,n){var r=t[h];r&&(r.detach(),t[h]=null),P(e)},processArgs:function(e,t){return A(this,e,t)},_onEnd:function(e,t,n,r,i){i&&(t=e[x]);var s=n._extra.standAlone||t.getData(g)||t.getData(m),o=n._extra.preventDefault;s&&(e.changedTouches&&(e.changedTouches.length===1?_(e,e.changedTouches[0]):s=!1),s&&(H(e,o),e.type=a,r.fire(e),t.clearData(m),t.clearData(g)))},PREVENT_DEFAULT:!1})},"3.17.2",{requires:["node-base","event-touch","event-synthetic"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-flick",function(e,t){var n=e.Event._GESTURE_MAP,r={start:n.start,end:n.end,move:n.move},i="start",s="end",o="move",u="ownerDocument",a="minVelocity",f="minDistance",l="preventDefault",c="_fs",h="_fsh",p="_feh",d="_fmh",v="nodeType";e.Event.define("flick",{on:function(e,t,n){var s=e.on(r[i],this._onStart,this,e,t,n);t[h]=s},detach:function(e,t,n){var r=t[h],i=t[p];r&&(r.detach(),t[h]=null),i&&(i.detach(),t[p]=null)},processArgs:function(t){var n=t.length>3?e.merge(t.splice(3,1)[0]):{};return a in n||(n[a]=this.MIN_VELOCITY),f in n||(n[f]=this.MIN_DISTANCE),l in n||(n[l]=this.PREVENT_DEFAULT),n},_onStart:function(t,n,i,a){var f=!0,l,h,m,g=i._extra.preventDefault,y=t;t.touches&&(f=t.touches.length===1,t=t.touches[0]),f&&(g&&(!g.call||g(t))&&y.preventDefault(),t.flick={time:(new Date).getTime()},i[c]=t,l=i[p],m=n.get(v)===9?n:n.get(u),l||(l=m.on(r[s],e.bind(this._onEnd,this),null,n,i,a),i[p]=l),i[d]=m.once(r[o],e.bind(this._onMove,this),null,n,i,a))},_onMove:function(e,t,n,r){var i=n[c];i&&i.flick&&(i.flick.time=(new Date).getTime())},_onEnd:function(e,t,n,r){var i=(new Date).getTime(),s=n[c],o=!!s,u=e,h,p,v,m,g,y,b,w,E=n[d];E&&(E.detach(),delete n[d]),o&&(e.changedTouches&&(e.changedTouches.length===1&&e.touches.length===0?u=e.changedTouches[0]:o=!1),o&&(m=n._extra,v=m[l],v&&(!v.call||v(e))&&e.preventDefault(),h=s.flick.time,i=(new Date).getTime(),p=i-h,g=[u.pageX-s.pageX,u.pageY-s.pageY],m.axis?w=m.axis:w=Math.abs(g[0])>=Math.abs(g[1])?"x":"y",y=g[w==="x"?0:1],b=p!==0?y/p:0,isFinite(b)&&Math.abs(y)>=m[f]&&Math.abs(b)>=m[a]&&(e.type="flick",e.flick={time:p,distance:y,velocity:b,axis:w,start:s},r.fire(e)),n[c]=null))},MIN_VELOCITY:0,MIN_DISTANCE:0,PREVENT_DEFAULT:!1})},"3.17.2",{requires:["node-base","event-touch","event-synthetic"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-valuechange",function(e,t){var n="_valuechange",r="value",i="nodeName",s,o={POLL_INTERVAL:50,TIMEOUT:1e4,_poll:function(t,r){var i=t._node,s=r.e,u=t._data&&t._data[n],a=0,f,l,c,h,p,d;if(!i||!u){o._stopPolling(t);return}l=u.prevVal,h=u.nodeName,u.isEditable?c=i.innerHTML:h==="input"||h==="textarea"?c=i.value:h==="select"&&(p=i.options[i.selectedIndex],c=p.value||p.text),c!==l&&(u.prevVal=c,f={_event:s,currentTarget:s&&s.currentTarget||t,newVal:c,prevVal:l,target:s&&s.target||t},e.Object.some(u.notifiers,function(e){var t=e.handle.evt,n;a!==1?e.fire(f):t.el===d&&e.fire(f),n=t&&t._facade?t._facade.stopped:0,n>a&&(a=n,a===1&&(d=t.el));if(a===2)return!0}),o._refreshTimeout(t))},_refreshTimeout:function(e,t){if(!e._node)return;var r=e.getData(n);o._stopTimeout(e),r.timeout=setTimeout(function(){o._stopPolling(e,t)},o.TIMEOUT)},_startPolling:function(t,s,u){var a,f;if(!t.test("input,textarea,select")&&!(f=o._isEditable(t)))return;a=t.getData(n),a||(a={nodeName:t.get(i).toLowerCase(),isEditable:f,prevVal:f?t.getDOMNode().innerHTML:t.get(r)},t.setData(n,a)),a.notifiers||(a.notifiers={});if(a.interval){if(!u.force){a.notifiers[e.stamp(s)]=s;return}o._stopPolling(t,s)}a.notifiers[e.stamp(s)]=s,a.interval=setInterval(function(){o._poll(t,u)},o.POLL_INTERVAL),o._refreshTimeout(t,s)},_stopPolling:function(t,r){if(!t._node)return;var i=t.getData(n)||{};clearInterval(i.interval),delete i.interval,o._stopTimeout(t),r?i.notifiers&&delete i.notifiers[e.stamp(r)]:i.notifiers={}},_stopTimeout:function(e){var t=e.getData(n)||{};clearTimeout(t.timeout),delete t.timeout},_isEditable:function(e){var t=e._node;return t.contentEditable==="true"||t.contentEditable===""},_onBlur:function(e,t){o._stopPolling(e.currentTarget,t)},_onFocus:function(e,t){var s=e.currentTarget,u=s.getData(n);u||(u={isEditable:o._isEditable(s),nodeName:s.get(i).toLowerCase()},s.setData(n,u)),u.prevVal=u.isEditable?s.getDOMNode().innerHTML:s.get(r),o._startPolling(s,t,{e:e})},_onKeyDown:function(e,t){o._startPolling(e.currentTarget,t,{e:e})},_onKeyUp:function(e,t){(e.charCode===229||e.charCode===197)&&o._startPolling(e.currentTarget,t,{e:e,force:!0})},_onMouseDown:function(e,t){o._startPolling(e.currentTarget,t,{e:e})},_onSubscribe:function(t,s,u,a){var f,l,c,h,p;l={blur:o._onBlur,focus:o._onFocus,keydown:o._onKeyDown,keyup:o._onKeyUp,mousedown:o._onMouseDown},f=u._valuechange={};if(a)f.delegated=!0,f.getNodes=function(){return h=t.all("input,textarea,select").filter(a),p=t.all('[contenteditable="true"],[contenteditable=""]').filter(a),h.concat(p)},f.getNodes().each(function(e){e.getData(n)||e.setData(n,{nodeName:e.get(i).toLowerCase(),isEditable:o._isEditable(e),prevVal:c?e.getDOMNode().innerHTML:e.get(r)})}),u._handles=e.delegate(l,t,a,null,u);else{c=o._isEditable(t);if(!t.test("input,textarea,select")&&!c)return;t.getData(n)||t.setData(n,{nodeName:t.get(i).toLowerCase(),isEditable:c,prevVal:c?t.getDOMNode().innerHTML:t.get(r)}),u._handles=t.on(l,null,null,u)}},_onUnsubscribe:function(e,t,n){var r=n._valuechange;n._handles&&n._handles.detach(),r.delegated?r.getNodes().each(function(e){o._stopPolling(e,n)}):o._stopPolling(e,n)}};s={detach:o._onUnsubscribe,on:o._onSubscribe,delegate:o._onSubscribe,detachDelegate:o._onUnsubscribe,publishConfig:{emitFacade:!0}},e.Event.define("valuechange",s),e.Event.define("valueChange",s),e.ValueChange=o},"3.17.2",{requires:["event-focus","event-synthetic"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-tap",function(e,t){function a(t,n){n=n||e.Object.values(u),e.Array.each(n,function(e){var n=t[e];n&&(n.detach(),t[e]=null)})}var n=e.config.doc,r=e.Event._GESTURE_MAP,i=r.start,s="tap",o=/pointer/i,u={START:"Y_TAP_ON_START_HANDLE",END:"Y_TAP_ON_END_HANDLE",CANCEL:"Y_TAP_ON_CANCEL_HANDLE"};e.Event.define(s,{publishConfig:{preventedFn:function(e){var t=e.target.once("click",function(e){e.preventDefault()});setTimeout(function(){t.detach()},100)}},processArgs:function(e,t){if(!t){var n=e[3];return e.splice(3,1),n}},on:function(e,t,n){t[u.START]=e.on(i,this._start,this,e,t,n)},detach:function(e,t,n){a(t)},delegate:function(t,n,r,s){n[u.START]=e.delegate(i,function(e){this._start(e,t,n,r,!0)},t,s,this)},detachDelegate:function(e,t,n){a(t)},_start:function(e,t,n,i,s){var a={canceled:!1,eventType:e.type},f=n.preventMouse||!1;if(e.button&&e.button===3)return;if(e.touches&&e.touches.length!==1)return;a.node=s?e.currentTarget:t,e.touches?a.startXY=[e.touches[0].pageX,e.touches[0].pageY]:a.startXY=[e.pageX,e.pageY],e.touches?(n[u.END]=t.once("touchend",this._end,this,t,n,i,s,a),n[u.CANCEL]=t.once("touchcancel",this.detach,this,t,n,i,s,a),n.preventMouse=!0):a.eventType.indexOf("mouse")!==-1&&!f?(n[u.END]=t.once("mouseup",this._end,this,t,n,i,s,a),n[u.CANCEL]=t.once("mousecancel",this.detach,this,t,n,i,s,a)):a.eventType.indexOf("mouse")!==-1&&f?n.preventMouse=!1:o.test(a.eventType)&&(n[u.END]=t.once(r.end,this._end,this,t,n,i,s,a),n[u.CANCEL]=t.once(r.cancel,this.detach,this,t,n,i,s,a))},_end:function(e,t,n,r,i,o){var f=o.startXY,l,c,h=15;n._extra&&n._extra.sensitivity>=0&&(h=n._extra.sensitivity),e.changedTouches?(l=[e.changedTouches[0].pageX,e.changedTouches[0].pageY],c=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]):(l=[e.pageX,e.pageY],c=[e.clientX,e.clientY]),Math.abs(l[0]-f[0])<=h&&Math.abs(l[1]-f[1])<=h&&(e.type=s,e.pageX=l[0],e.pageY=l[1],e.clientX=c[0],e.clientY=c[1],e.currentTarget=o.node,r.fire(e)),a(n,[u.END,u.CANCEL])}})},"3.17.2",{requires:["node-base","event-base","event-touch","event-synthetic"]});
/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("io-form",function(e,t){var n=encodeURIComponent;e.IO.stringify=function(t,n){n=n||{};var r=e.IO.prototype._serialize({id:t,useDisabled:n.useDisabled},n.extra&&typeof n.extra=="object"?e.QueryString.stringify(n.extra):n.extra);return r},e.mix(e.IO.prototype,{_serialize:function(t,r){var i=[],s=t.useDisabled||!1,o=0,u=typeof t.id=="string"?t.id:t.id.getAttribute("id"),a,f,l,c,h,p,d,v,m,g;u||(u=e.guid("io:"),t.id.setAttribute("id",u)),f=e.config.doc.getElementById(u);if(!f||!f.elements)return r||"";for(p=0,d=f.elements.length;p<d;++p){a=f.elements[p],h=a.disabled,l=a.name;if(s?l:l&&!h){l=n(l)+"=",c=n(a.value);switch(a.type){case"select-one":a.selectedIndex>-1&&(g=a.options[a.selectedIndex],i[o++]=l+n(g.attributes.value&&g.attributes.value.specified?g.value:g.text));break;case"select-multiple":if(a.selectedIndex>-1)for(v=a.selectedIndex,m=a.options.length;v<m;++v)g=a.options[v],g.selected&&(i[o++]=l+n(g.attributes.value&&g.attributes.value.specified?g.value:g.text));break;case"radio":case"checkbox":a.checked&&(i[o++]=l+c);break;case"file":case undefined:case"reset":case"button":break;case"submit":default:i[o++]=l+c}}}return r&&(i[o++]=r),i.join("&")}},!0)},"3.17.2",{requires:["io-base","node-base"]});
YUI.add("moodle-mod_quiz-autosave",function(i,t){M.mod_quiz=M.mod_quiz||{},M.mod_quiz.autosave={TINYMCE_DETECTION_DELAY:500,TINYMCE_DETECTION_REPEATS:20,WATCH_HIDDEN_DELAY:1e3,FAILURES_BEFORE_NOTIFY:1,FIRST_SUCCESSFUL_SAVE:-1,SELECTORS:{QUIZ_FORM:"#responseform",VALUE_CHANGE_ELEMENTS:'input, textarea, [contenteditable="true"]',CHANGE_ELEMENTS:"input, select",HIDDEN_INPUTS:"input[type=hidden]",CONNECTION_ERROR:"#connection-error",CONNECTION_OK:"#connection-ok"},AUTOSAVE_HANDLER:M.cfg.wwwroot+"/mod/quiz/autosave.ajax.php",delay:12e4,form:null,dirty:!1,delay_timer:null,save_transaction:null,savefailures:0,editor_change_handler:null,hidden_field_values:{},init:function(t){this.form=i.one(this.SELECTORS.QUIZ_FORM),this.form&&(this.delay=1e3*t,this.form.delegate("valuechange",this.value_changed,this.SELECTORS.VALUE_CHANGE_ELEMENTS,this),this.form.delegate("change",this.value_changed,this.SELECTORS.CHANGE_ELEMENTS,this),this.form.on("submit",this.stop_autosaving,this),this.init_tinymce(this.TINYMCE_DETECTION_REPEATS),this.save_hidden_field_values(),this.watch_hidden_fields())},save_hidden_field_values:function(){this.form.all(this.SELECTORS.HIDDEN_INPUTS).each(function(t){var e=t.get("name");e&&(this.hidden_field_values[e]=t.get("value"))},this)},watch_hidden_fields:function(){this.detect_hidden_field_changes(),i.later(this.WATCH_HIDDEN_DELAY,this,this.watch_hidden_fields)},detect_hidden_field_changes:function(){this.form.all(this.SELECTORS.HIDDEN_INPUTS).each(function(t){var e=t.get("name"),i=t.get("value");e&&(e in this.hidden_field_values&&i===this.hidden_field_values[e]||(this.hidden_field_values[e]=i,this.value_changed({target:t})))},this)},init_tinymce:function(t){"undefined"!=typeof window.tinyMCE?(this.editor_change_handler=i.bind(this.editor_changed,this),window.tinyMCE.onAddEditor.add(i.bind(this.init_tinymce_editor,this))):0<t&&i.later(this.TINYMCE_DETECTION_DELAY,this,this.init_tinymce,[t-1])},init_tinymce_editor:function(t,e){e.onChange.add(this.editor_change_handler),e.onRedo.add(this.editor_change_handler),e.onUndo.add(this.editor_change_handler),e.onKeyDown.add(this.editor_change_handler)},value_changed:function(t){var e=t.target.getAttribute("name");"thispage"===e||"scrollpos"===e||e&&e.match(/_:flagged$/)||(e=e||"#"+t.target.getAttribute("id"),this.start_save_timer_if_necessary())},editor_changed:function(t){this.start_save_timer_if_necessary()},start_save_timer_if_necessary:function(){this.dirty=!0,this.delay_timer||this.save_transaction||this.start_save_timer()},start_save_timer:function(){this.cancel_delay(),this.delay_timer=i.later(this.delay,this,this.save_changes)},cancel_delay:function(){this.delay_timer&&!0!==this.delay_timer&&this.delay_timer.cancel(),this.delay_timer=null},save_changes:function(){if(this.cancel_delay(),this.dirty=!1,this.is_time_nearly_over())this.stop_autosaving();else{"undefined"!=typeof window.tinyMCE&&window.tinyMCE.triggerSave();var t=this.form.all("input[type=submit], button[type=submit]");t.setAttribute("type","button"),this.save_transaction=i.io(this.AUTOSAVE_HANDLER,{method:"POST",form:{id:this.form},on:{success:this.save_done,failure:this.save_failed},context:this}),t.setAttribute("type","submit")}},save_done:function(t,e){"OK"===e.responseText?(this.save_transaction=null,this.dirty&&this.start_save_timer(),0<this.savefailures?(i.one(this.SELECTORS.CONNECTION_ERROR).hide(),i.one(this.SELECTORS.CONNECTION_OK).show(),this.savefailures=this.FIRST_SUCCESSFUL_SAVE):this.savefailures===this.FIRST_SUCCESSFUL_SAVE&&(i.one(this.SELECTORS.CONNECTION_OK).hide(),this.savefailures=0)):this.save_failed(t,e)},save_failed:function(){this.save_transaction=null,this.start_save_timer(),this.savefailures=Math.max(1,this.savefailures+1),this.savefailures===this.FAILURES_BEFORE_NOTIFY&&(i.one(this.SELECTORS.CONNECTION_ERROR).show(),i.one(this.SELECTORS.CONNECTION_OK).hide())},is_time_nearly_over:function(){return M.mod_quiz.timer&&M.mod_quiz.timer.endtime&&(new Date).getTime()+2*this.delay>M.mod_quiz.timer.endtime},stop_autosaving:function(){this.cancel_delay(),this.delay_timer=!0,this.save_transaction&&this.save_transaction.abort()}}},"@VERSION@",{requires:["base","node","event","event-valuechange","node-event-delegate","io-form"]});