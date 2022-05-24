(function(l,c,y,N,o,W,T){"use strict";function Z(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if(n!=="default"){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var i=Z(W);const L=o.webpack.findByProps("TooltipContainer").TooltipContainer,J=o.webpack.findByDisplayName("Arrow"),Q=o.webpack.findByDisplayName("Clickable"),x=o.webpack.findByProps("ModalRoot"),S=o.webpack.findByDisplayName("Pin"),Y=o.webpack.findByDisplayName("FormTitle"),M=o.webpack.find(e=>e.DropdownSizes),K=o.webpack.findByDisplayName("ListSectionItem"),_=o.webpack.findByProps("openModalLazy");let A;const X=e=>A=_.openModal(t=>(e.props={...e.props,...t},e)),ee=()=>_.closeModal(A),{default:te,MenuSeparator:ne,MenuItem:ie,MenuCheckboxItem:re}=c.findByProps("MenuGroup"),{closeContextMenu:se}=c.findByProps("openContextMenu");function w(e){switch(e.id=`cc-pd-${e.id}`,e.type){case"item":return i.createElement(ie,{...e},e.items?.()?.map(w));case"separator":return i.createElement(ne,null);case"checkbox":return i.createElement(re,{...e});default:return null}}var ae=e=>(e.items=e.items.map(w),e.rawItems?[...e.items]:i.createElement(te,{onClose:()=>se()},e.items));const R={dividerDefault:o.webpack.findByProps("dividerDefault").dividerDefault,divider:o.webpack.find(e=>e.divider?.includes("divider-_")).divider};var ce=({className:e})=>i.createElement("div",{className:`${R.divider} ${R.dividerDefault} ${e}`});const le=o.webpack.findByDisplayName("FormItem"),oe=o.webpack.findByDisplayName("FormText"),m={...o.webpack.findByProps("marginBottom20"),...o.webpack.findByProps("formText"),...o.webpack.findByDisplayName("Flex")};var de=e=>i.createElement(le,{title:e.title,required:e.required,className:`${m.Direction.VERTICAL} ${m.Justify.START} ${m.Align.STRETCH} ${m.Wrap.NO_WRAP} ${m.marginBottom20}`},e.children,e.note&&i.createElement(oe,{className:`${m.description} ${m.marginTop8}`},e.note),i.createElement(ce,{className:[m.marginTop20].join(" ")}));const F=o.webpack.findByDisplayName("TextInput");var U=e=>{Array.isArray(e.children)||(e.children=[e.children]);const t=e.children;return delete e.children,i.createElement(de,{title:t[0],required:e.required,note:e.note},t[1]?i.createElement("div",{className:"cc-pp-setting-input"},i.createElement(F,{...e}),t[1]):i.createElement(F,{...e}))},pe=({transitionState:e,dmId:t})=>{const[n,r]=i.useState("");return i.createElement(x.ModalRoot,{transitionState:e},i.createElement(x.ModalHeader,null,i.createElement(Y,{tag:"h3"},"New Catgory")),i.createElement(x.ModalContent,null,i.createElement(U,{placeholder:"Category name",value:n,onChange:r},"New Category:")),i.createElement(x.ModalFooter,null,i.createElement(M,{disabled:!n,onClick:()=>{const a=f("categories",[]);a.push({name:n,dms:[t],pos:a.length,collapsed:!1}),h("categories",a),ee(),D()}},"Save")))};const{scroller:ue}=c.findByProps("privateChannelsHeaderContainer");function D(){const e=document.getElementsByClassName(ue)[0];!e||(e.dispatchEvent(new Event("focusin")),setTimeout(()=>{e.dispatchEvent(new Event("focusout"))},10))}function b(e,t){let n=[];const r=f("categories",[]).find(s=>s.dms.includes(e.id)),a=f("guildlist",[]).includes(e.id);if(r?n.push({type:"item",id:"remove-from-category",color:"colorDanger",label:`Remove from ${r.name}`,action(){r.dms=r.dms.filter(s=>s!==e.id),h(`categories[${r.pos}]`,r),D()}}):n.push({type:"item",id:"catgory-submenu",label:"Pin to Channel List",items(){const s=[{type:"item",id:"create-new-catgory",color:"colorBrand",label:"Add to new catgory",action(){X(l.React.createElement(pe,{dmId:e.id}))}},{type:"separator"}];return f("categories",[]).forEach(d=>s.push({type:"item",id:`add-to-category-${d.name}`,label:d.name,action(){d.dms.push(e.id),h(`categories[${d.pos}]`,d),D()}})),[...s]}}),a?n.push({type:"item",id:"remove-from-list",label:"Unpin from Server List",color:"colorDanger",action:()=>{const s=f("guildlist",[]).filter(d=>d!==e.id);h("guildlist",s),l.FluxDispatcher.dirtyDispatch({type:"PDM_GUILDLIST_REMOVE"})}}):n.push({type:"item",id:"add-to-list",label:"Pin to Server List",action:()=>{const s=f("guildlist",[]);s.push(e.id),h("guildlist",s),l.FluxDispatcher.dirtyDispatch({type:"PDM_GUILDLIST_ADD"})}}),t){const s=n;n=[{type:"item",label:"PinDMs",id:"submenu",items:()=>[...s]}]}return ae({items:n,rawItems:t})}function h(e,t){window._.set(T.persist.store,e,t)}function f(e,t){return window._.get(T.persist.ghost,e)??t}const{GroupDM:fe,DirectMessage:he}=c.findByProps("DirectMessage"),{getChannel:me}=c.findByProps("getChannel","hasChannel");var j=({channelId:e,selected:t})=>{const n=me(e);return n?n.type===3?i.createElement(fe,{channel:n,selected:t,tabIndex:-1}):i.createElement(he,{channel:n,selected:t,tabIndex:-1}):null};const P={...c.findByProps("privateChannelsHeaderContainer"),...c.findByProps("containerDefault","name")};var ye=({category:e})=>{const[t,n]=i.useState(e.collapsed);return e.dms.length?i.createElement(Q,{tabIndex:-1,className:[P.clickable,"cc-pd-header"].join(" "),onClick:()=>{e.collapsed=!t,h(`categories[${e.pos}]`,e),D(),n(!t)}},i.createElement(K,{className:P.privateChannelsHeaderContainer},i.createElement("span",{className:P.headerText},e.name),i.createElement(J,{className:"cc-pd-arrow",direction:t?"LEFT":"DOWN"}))):null};const{default:ge}=c.findByProps("DirectMessage"),Ee=c.findByDisplayName("ConnectedPrivateChannelsList",!1),{openContextMenu:De}=c.findByProps("openContextMenu"),{lastMessageId:O}=c.findByProps("lastMessageId");function Ce(){this.injections.push(y.after("render",ge.prototype,function(e,t){const n=t.props.children({role:"listitem"});return t.props.children=()=>{const r=l.React.createElement(L,{text:"Pin",position:"top"},l.React.createElement(S,{className:"cc-pd-pin",onClick:a=>{a.preventDefault();const s=b(this.props.channel);De(a,()=>s)},icon:S}));return n.props.children.props.children.splice(1,0,r),n},t})),this.injections.push(y.after("default",Ee,(e,t)=>{const n=[],r=N.findInReactTree(t,s=>s?.selectedChannelId);if(!r)return t;const a=f("categories",[]);return a.forEach(s=>n.push(...s.dms)),r.privateChannelIds=r.privateChannelIds.filter(s=>!n.includes(s)),r.children=[...r.children],a.forEach(s=>{const d=l.React.createElement(ye,{category:s});if(r.children.push(d),s.collapsed){if(s.dms.includes(r.selectedChannelId)){const p=s.dms.find(u=>u===r.selectedChannelId);if(!p)return;r.children.push(l.React.createElement(j,{channelId:p,selected:!0}))}}else{const p=s.dms.sort((u,$)=>O($)-O(u)).map(u=>l.React.createElement(j,{channelId:u,selected:r.selectedChannelId===u}));r.children.push(...p)}}),t}))}const{default:xe}=c.findByProps("DirectMessage"),{getUser:Me}=c.findByProps("getUser","findByTag"),{isMobileOnline:ve,getStatus:k,getState:be}=c.findByProps("isMobileOnline"),{getChannel:Pe}=c.findByProps("getDMFromUserId"),{listItemTooltip:Ie}=c.findByProps("listItemTooltip"),{openContextMenu:$e}=c.findByProps("openContextMenu"),{transitionTo:Be}=c.findByProps("transitionTo"),{getMentionCount:G}=c.findByProps("getMentionCount"),Ne=c.findByDisplayName("AnimatedHalfPill");var Te=()=>{const[e,t]=i.useState(f("guildlist",[]));return i.useEffect(()=>{const n=({removeAll:r})=>t(r?[]:[...f("guildlist",[])]);return l.FluxDispatcher.subscribe("PDM_GUILDLIST_ADD",n),l.FluxDispatcher.subscribe("PDM_GUILDLIST_REMOVE",n),()=>{l.FluxDispatcher.unsubscribe("PDM_GUILDLIST_ADD",n),l.FluxDispatcher.unsubscribe("PDM_GUILDLIST_REMOVE",n)}}),e.map(n=>i.createElement(Le,{channelId:n}))};function Le({channelId:e}){const[t,n]=i.useState(!1),[r,a]=i.useState(!1),[s,d]=i.useState(!!G(e)),p=Pe(e);if(!p)return null;const u=Me(p.recipients[0]),[$,ke]=i.useState(k(u?.id)),B=xe.prototype.renderAvatar.call({props:{user:u,channel:p,status:$,isMobile:ve.bind({getState:()=>be()})(u?.id)}});return B.props.src=B.props.src.replace("size=32","size=64"),i.useEffect(()=>{const v=E=>E.user?.id===u?.id&&ke(k(E.user.id)),V=E=>{E.channelId===p.id?a(!0):a(!1)},q=E=>E.id===e&&d(!!G(e));return l.FluxDispatcher.subscribe("PRESENCE_UPDATE",v),l.FluxDispatcher.subscribe("PDM_UPDATE",q),l.FluxDispatcher.subscribe("CHANNEL_SELECT",V),()=>{l.FluxDispatcher.unsubscribe("PRESENCE_UPDATE",v),l.FluxDispatcher.unsubscribe("CHANNEL_SELECT",V),l.FluxDispatcher.unsubscribe("PDM_UPDATE",q)}}),i.createElement(L,{text:p.type===3?p.name:u.username,position:"left","aria-label":!1,tooltipClassName:Ie},i.createElement("div",{onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onContextMenu:v=>{$e(v,()=>b(p))},onClick:()=>Be(l.constants.Routes.CHANNEL("@me",p.id)),className:"cc-pd-guildpins"},i.createElement(Ne,{className:"pill-L_aLMQ",unread:s,selected:r,hovered:t}),B))}const Se=c.findByProps("HomeButton"),_e=c.findByDisplayName("TransitionGroup",!1);function Ae(){this.injections.push(y.after("HomeButton",Se,(e,t)=>(Array.isArray(t)||(t=[t]),f("guildlist",[]).includes(t[0].props.selectedChannelId)&&(t[0].props.selected=!1),t.push(l.React.createElement(Te)),t))),this.injections.push(y.after("render",_e.default.prototype,(e,t)=>(t.props.children.length&&t.props.children.forEach((n,r)=>{f("guildlist",[]).includes(n.key.replace(".$",""))&&(t.props.children.splice(r,1),l.FluxDispatcher.dirtyDispatch({type:"PDM_UPDATE",id:n.key.replace(".$","")}))}),t)))}const we=["DMUserContextMenu","GroupDMUserContextMenu","GuildChannelUserContextMenu","GroupDMContextMenu"],{getDMFromUserId:H,getChannel:z}=c.findByProps("getDMFromUserId");async function I(e,t){const n=c.findByDisplayName(e,!1);if(n)t(n);else{const r=c.findByProps("openContextMenuLazy");this.injections.unshift(y.before("openContextMenuLazy",r,a=>{const s=a[1];return a[1]=async()=>{const d=await s(a[0]);return p=>{const u=d(p);return u?.type?.displayName===e&&t&&(this.injections[0](),t(c.findByDisplayName(e,!1)),t=!1),u}},a}))}}function Re(){I=I.bind(this),we.forEach(e=>{I(e,t=>{this.injections.push(y.after("default",t,([n],r)=>{const a=N.findInReactTree(r,s=>Array.isArray(s)&&s.find(d=>d?.props?.id==="user-profile"||d?.props?.id==="remove-icon"));if(!a)return r;if(n.channel||z(H(n.user.id)))return a.push(b(n.channel||z(H(n.user.id)),this.settings)),r}))})})}var g={Categories:Ce,GuildList:Ae,ContextMenus:Re},Fe=()=>y.injectCSS(".channel-1Shao0>.interactive-1vLZ_I{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.cc-pd-pin{width:15px;min-width:15px;min-height:15px;height:15px;display:none;opacity:.4}.channel-1Shao0>.interactive-1vLZ_I:hover .cc-pd-pin{display:block;opacity:.8}.cc-pd-guildpins{display:flex;justify-content:center;position:relative;cursor:pointer}.cc-pd-guildpins .wrapper-1VLyxH{margin-bottom:8px;height:48px!important;width:48px!important}.cc-pd-header{display:flex;justify-content:center;align-items:center}.cc-pd-arrow{height:18px;width:18px}.cc-pd-arrow>polygon{fill:var(--channels-default)}.cc-pd-header:hover .cc-pd-arrow polygon{fill:var(--interactive-hover)}.cc-pp-setting-input{display:flex}.cc-pp-setting-input .inputWrapper-1YNMmM{width:-webkit-fill-available}.cc-pp-setting-input button{margin-left:9px;min-width:130px;min-height:40px}");function Ue({category:e,onDelete:t}){const[n,r]=i.useState(e.name);return i.createElement(U,{value:n,onChange:a=>{e.name=a,h(`categories[${e.pos}]`,e),r(a)}},n,i.createElement(M,{color:M.Colors.RED,onClick:()=>t?.(e.pos)},"Delete Category"))}var je=()=>{const[e,t]=i.useState(f("categories",[]));return e?i.createElement("div",null,e.map(n=>i.createElement(Ue,{category:n,onDelete:r=>{e.splice(r,1),e.forEach((a,s)=>a.pos=s),h("categories",e),t(null),setTimeout(()=>t(e))}})),i.createElement(M,{onClick:()=>{e.push({name:"New Category",dms:[],pos:e.length,collapsed:!1}),h("categories",e),t(null),setTimeout(()=>t(e))}},"Add a category")):null};const C={};var Oe=()=>(Object.keys(g).forEach(e=>{C[e]=[],g[e]=g[e].bind({injections:C[e]})}),{onLoad(){Object.keys(g).forEach(e=>g[e]()),C.css=[Fe()]},onUnload(){Object.keys(g).forEach(e=>{C[e].forEach(t=>t?.())}),C.css[0]?.(),D(),l.FluxDispatcher.dirtyDispatch({type:"PDM_GUILDLIST_REMOVE",removeAll:!0})},settings:l.React.createElement(je)});return Oe})(cumcord.modules.common,cumcord.modules.webpack,cumcord.patcher,cumcord.utils,cumcord.modules,cumcord.modules.common.React,cumcord.pluginData);
