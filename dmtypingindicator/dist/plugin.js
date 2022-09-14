(function(I,l,u,N,i,E,b){"use strict";function _(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if(n!=="default"){var s=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,s.get?s:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var r=_(I);const[k,R,j,D,ye,H,fe,{default:A,DefaultColorButton:G,CustomColorButton:W,CustomColorPicker:L},w,V,Ce]=u.batchFind(e=>{e.findByDisplayName("FormItem"),e.findByDisplayName("FormText"),e.findByDisplayName("FormDivider"),e.findByDisplayName("Flex"),e.findByDisplayName("TextInput"),e.findByDisplayName("Slider"),e.findByDisplayName("SelectTempWrapper"),e.find(t=>t.default?.displayName==="ColorPicker"&&!t.default.defaultProps),e.findByDisplayName("Tooltip"),e.findByDisplayName("Popout"),e.findByProps("Sizes","Colors","Looks","DropdownSizes")}),$=b.webpack.findByProps("dividerDefault").dividerDefault;var Y=({className:e})=>r.createElement(j,{className:[$,e].join(" ")});const f={...b.webpack.findByProps("marginBottom20"),...b.webpack.findByProps("formText"),...D};var x=({title:e,required:t,className:n,note:s,divider:c=!0,children:o}={})=>r.createElement(k,{title:e,required:t,className:[f.marginBottom20,n].join(" ")},o,s&&r.createElement(R,{className:`${f.description} ${f.marginTop8}`},s),c&&r.createElement(Y,{className:[f.marginTop20].join(" ")}));function q(e){const t=e.children;return delete e.children,r.createElement(x,{title:t,note:e.note,required:e.required},r.createElement(H,{...e}))}function g(e){if(e.colors||(e.colors=l.constants.ROLE_COLORS),typeof e.children!="string")throw new Error("Children has to be a string");return e.customColor=e.customColor||e.value===e.defaultColor||e.colors.some(t=>t===e.value)?null:e.value,r.createElement(x,{title:e.children,note:e.note,required:e.required},r.createElement(A,{...e,renderDefaultButton:K,renderCustomButton:t=>r.createElement(z,{...t,onChange:e.onChange})}))}g.utils=u.findByProps("hex2int");function z(e){return r.createElement(V,{renderPopout:()=>!e.disabled&&r.createElement(L,{value:e.customColor,onChange:e.onChange}),position:e.pickerPosition||"right"},t=>r.createElement(w,{text:l.i18n.Messages.CUSTOM_COLOR,position:"bottom"},n=>r.createElement("div",{...n,...t},r.createElement(W,{...e,"aria-label":l.i18n.Messages.CUSTOM_COLOR}))))}function K(e){return r.createElement(w,{text:l.i18n.Messages.DEFAULT,position:"bottom"},t=>r.createElement("div",{...t},r.createElement(G,{...e})))}const X=u.findByDisplayName("RadioGroup");var J=e=>{const t=e.children;return delete e.children,r.createElement(x,{title:t,note:e.note,required:e.required},r.createElement(X,{...e}))},C=u.findByDisplayName("SwitchItem");u.batchFind(e=>{e.findByDisplayName("Card"),e.findByProps("HomeButton"),e.findByProps("getUsers"),e.findByDisplayName("LegacyText")}),u.findByDisplayName("FormTitle");var Q=()=>(E.useNest(i.persist),r.createElement("div",null,r.createElement(J,{options:[{name:"Badge: Show a badge on the home icon.",value:"badge"},{name:"Icon: Show just an icon below the home icon.",value:"icon"},{name:"Text: Show just text.",value:"text"},{name:"Both: Show both an icon and text.",value:"both"}],value:i.persist.ghost.indicatorStyle||"icon",onChange:e=>i.persist.store.indicatorStyle=e.value},"Indicator Style"),i.persist.ghost.indicatorStyle==="badge"&&r.createElement(g,{note:"The background color of the badge indicator.",defaultColor:g.utils.hex2int("#43b581"),value:g.utils.hex2int(i.persist.ghost.indicatorBgColor||"#43b581"),onChange:e=>i.persist.store.indicatorBgColor=g.utils.int2hex(e)},"Badge Background Color"),(i.persist.ghost.indicatorStyle==="text"||i.persist.ghost.indicatorStyle==="both")&&r.createElement(q,{className:"dmti-settings-slider",note:"The maximum amount of users to display on the tooltip.",stickToMarkers:!0,initialValue:i.persist.ghost.maxTypingUsers||3,defaultValue:3,markers:[3,4,5,6,7,8],onMarkerRender:e=>e===3?l.i18n.Messages.DEFAULT:l.i18n.Messages.NUM_USERS.format({num:e}),onValueChange:e=>i.persist.store.maxTypingUsers=e},"Tooltip Max Users"),r.createElement(C,{note:"Prevents the indicator from showing if the current channel with typing users is open.",value:i.persist.ghost.hideWhenViewed??!0,onChange:()=>i.persist.store.hideWhenViewed=!i.persist.store.hideWhenViewed},"Hide Indicator"),r.createElement(C,{note:"Don't show indicator for users who are blocked.",value:i.persist.ghost.ignoreBlocked??!0,onChange:()=>i.persist.store.ignoreBlocked=!i.persist.store.ignoreBlocked},"Ignore Blocked Users"),r.createElement(C,{note:"Don't show indicator for users who you are not friends with.",value:i.persist.ghost.ignoreNonFriend??!0,onChange:()=>i.persist.store.ignoreNonFriend=!i.persist.store.ignoreNonFriend},"Ignore Non-Friend Users"),r.createElement(C,{note:"Animate the indicator.",value:i.persist.ghost.animateIndicator??!0,onChange:()=>i.persist.store.animateIndicator=!i.persist.store.animateIndicator},"Animate Indicator")));const T=new String("{count} typing...");T.format=function(e){let t=T.toString();return Object.entries(e).forEach(n=>t=t.replace(`{${n[0]}}`,n[1])),t};const[U,{TooltipContainer:Z},ee,te,{transitionTo:ne}]=u.batchFind(e=>{e.findByDisplayName("Spinner"),e.findByProps("TooltipContainer"),e.findByProps("hasChannel"),e.findByProps("openPrivateChannel"),e.findByProps("transitionTo")});var re=({typingUsers:e,typingUserFlat:t,className:n,badge:s,clickable:c})=>{if(E.useNest(i.persist),i.persist.ghost.indicatorStyle==="badge"){if(!s)return null;const o={backgroundColor:i.persist.ghost.indicatorBgColor||"#43b581"},p=i.persist.ghost.animateIndicator??!0;return r.createElement(U,{type:"pulsingEllipsis",animated:p,className:"dm-typing-badge",itemClassName:"dm-typing-badge-spinner",style:o})}return r.createElement("div",{className:n,onClick:()=>c&&ie(e,t)},r.createElement(Z,{color:"black",position:"right",text:oe(t),className:["dm-typing-indicator",c&&"clickable"].join(" ")},se(t)))};function ie(e,[t]){const n=Object.keys(e);if(!n[0])return;const s=Object.values(ee.getMutablePrivateChannels()).find(c=>c.isGroupDM()&&c.id===n[0]);return s?ne(Routes.CHANNEL("@me",s.id)):te.openPrivateChannel(t.id)}function oe(e){const t=[],n=e.map(a=>a.username);if(n.length===1)return l.i18n.Messages.ONE_USER_TYPING.format({a:n[0]});const c=l.i18n.Messages.THREE_USERS_TYPING.format({a:null,b:null,c:null}).filter(a=>typeof a=="string"),o=Object.fromEntries(c.map((a,d)=>[[["user","comma","and","typing"][t.length>3?d:d+1]],a]));o.extra=a=>{const y=l.i18n.Messages.ACTIVITY_FEED_NOW_PLAYING_HEADER_TWO_KNOWN.format({user1:null,user2:null,extras:a}).filter(m=>typeof m=="string");return y[y.length-1]};const p=i.persist.ghost.maxTypingUsers||3;e:for(let a=0;a<n.length;a++){const d=n.length-a;switch(!0){case a===p:t.push(`${o.extra(d)}${o.typing}`);break e;case a===n.length-1:t.push(o.and);break;case a!==0:t.push(o.comma)}t.push(r.createElement("strong",null,n[a])),a===n.length-1&&t.push(o.typing)}return t}function se(e){const t=[],n=i.persist.ghost.indicatorStyle||"icon",s=i.persist.ghost.animateIndicator??!0;return(n==="icon"||n==="both")&&e.length>0&&t.push(r.createElement(U,{type:"pulsingEllipsis",animated:s,style:{opacity:.7,marginBottom:n==="both"?5:"",height:"10px"}})),(n==="text"||n==="both")&&t.push(T.format({count:e.length})),t}const[B,F,M,ae]=u.batchFind(e=>{e.findByProps("hasChannel"),e.findByProps("isBlocked","isFriend"),e.findByProps("getUser","getCurrentUser"),e.findByProps("getPrivateChannelIds")}),h={};function le({channelId:e,userId:t}){if(!B?.getMutablePrivateChannels()[e])return;const n=Object.assign({},h[e]||Object.freeze({})),s=t===M?.getCurrentUser()?.id,c=i.persist.ghost.ignoreNonFriend??!0?F.isFriend(t):!0,o=i.persist.ghost.ignoreBlocked??!0?F.isBlocked(t):!1;!s&&c&&!o&&(n[t]=M?.getUser(t),h[e]=n,l.FluxDispatcher.dispatch({type:"CCDMTI_REFRESH_HOME"}))}function O({channelId:e,userId:t}){if(!B?.getMutablePrivateChannels()[e])return;const n=Object.assign({},h[e]);n&&n[t]&&(delete n[t],Object.keys(n).length>0?h[e]=n:delete h[e],l.FluxDispatcher.dispatch({type:"CCDMTI_REFRESH_HOME"}))}function ce({channelId:e,message:t}){!B?.getMutablePrivateChannels()[e]||O({channelId:e,userId:t.author.id})}class de extends l.Flux.Store{getFlattenedDMTypingUsers(){return(ae?.getPrivateChannelIds()).map(n=>Object.values(h[n]||{})).flat()}getDMTypingUsers(t){return t?h[t]||{}:h}}var S=new de(l.FluxDispatcher,{TYPING_START:le,TYPING_STOP:O,MESSAGE_CREATE:ce}),ue=()=>N.injectCSS(".dm-typing-indicator{font-size:10px;font-weight:500;line-height:1.3;text-align:center;text-transform:uppercase;word-wrap:normal;width:62px;min-height:10px;color:var(--text-muted)}.dm-typing-indicator.clickable:hover{cursor:pointer;color:var(--interactive-hover)}.dm-typing-indicator.false{display:none}.dm-typing-badge{border-radius:8px;width:20px;padding:4px 4px 4px 5px;margin:0 0 1px 5px;height:7px}.dm-typing-badge-spinner{width:4.5px;height:4.5px}.dmti-preview-container{float:right;margin-left:8px;width:90px}.dmti-preview{float:right;padding:8px}.dmti-preview .dm-typing-badge{padding:8px;width:28px}.dmti-settings-title{margin-bottom:15px}.dmti-settings-slider{margin:20px 12px 0;width:calc(100% - 24px)}.dmti-settings-slider .markValue-2DwdXI{white-space:nowrap}");const he=u.findByProps("HomeButton"),{listItem:me}=u.findByProps("guildSeparator","listItem"),v=[];var ge={onLoad(){const e=l.Flux.connectStores([S],({typingUsers:t,typingUsersFlat:n})=>({...t,...n}))(re);v.push(N.after("HomeButton",he,([t],n)=>{const s=r.useState({})[1];r.useEffect(()=>{const d=()=>s({});return l.FluxDispatcher.subscribe("CCDMTI_REFRESH_HOME",d),()=>l.FluxDispatcher.unsubscribe("CCDMTI_REFRESH_HOME",d)},[]),Array.isArray(n)||(n=[n]);const c=t.typingUserFlat||S.getFlattenedDMTypingUsers(),o=t.typingUsers||S.getDMTypingUsers(),p=i.persist.ghost.indicatorStyle||"icon";if(i.persist.ghost.hideWhenViewed??!0){const d=window.location.href.match(/@me\/(\d+)/)&&window.location.href.match(/@me\/(\d+)/)[1];if(d&&Object.keys(o).length===1&&o[d])return n}if(p==="badge"&&c.length>0){const d=n[0].type;d&&(n[0].type=(...y)=>{const m=d(...y),P=E.findInReactTree(m,pe=>pe.type?.displayName==="BlobMask");return P&&(P.props.lowerBadgeWidth=28,P.props.lowerBadge=r.createElement(e,{badge:!0,typingUserFlat:o,typingUsers:o})),m})}else n.splice(1,0,r.createElement(e,{className:me,clickable:c.length===1,typingUsers:o,typingUserFlat:c}));return n})),v.push(ue())},onUnload(){v.forEach(e=>e?.())},settings:Q};return ge})(cumcord.modules.common.React,cumcord.modules.common,cumcord.modules.webpack,cumcord.patcher,cumcord.pluginData,cumcord.utils,cumcord.modules);
