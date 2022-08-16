(function(W,Z,d,J,s,K,i,h,Q){"use strict";function X(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach(function(r){if(r!=="default"){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}}),n.default=e,Object.freeze(n)}var t=X(Z);const D=i.findByDisplayName("TextInput"),z=i.findByDisplayName("SwitchItem"),v=i.findByDisplayName("Text")||i.findByDisplayName("LegacyText"),M=i.findByProps("Sizes","Tags"),ee=i.findByDisplayName("UserActivityContainer"),U=i.findByDisplayName("FormItem"),te=i.findByDisplayName("ArrowDropDown"),se=i.findByDisplayName("ArrowDropUp"),L=i.findByDisplayName("SelectTempWrapper"),y=i.find(e=>e.DropdownSizes),c=i.findByDisplayName("Flex"),{ScrollerThin:re}=i.findByProps("ScrollerThin"),ne=i.findByDisplayName("SlideIn"),oe=i.findByDisplayName("SettingsNotice"),ae=i.findByDisplayName("TransitionGroup"),P=i.findByProps("ModalRoot"),le=i.findByProps("openModalLazy"),$=e=>le.openModal(n=>(e.props={...e.props,...n},e)),ie=d.webpack.findByProps("dividerDefault").dividerDefault,ce=d.webpack.findByDisplayName("FormDivider");var w=({className:e})=>t.createElement(ce,{className:[ie,e].join(" ")});const S={...d.webpack.findByProps("marginBottom20")};var N=e=>{Array.isArray(e.children)||(e.children=[e.children]);const n=e.children[0];e.children.splice(0,1);const r=e.children.map(o=>o&&t.createElement(c.Child,{className:"crpc-lowerMargin",grow:0,shrink:0,wrap:!0},o));return delete e.children,t.createElement(U,{title:n,className:S.marginBottom20,required:e.required},r.length?t.createElement(c,null,t.createElement(c.Child,{grow:1,shrink:1,wrap:!0},t.createElement(L,{...e})),[...r]):t.createElement(L,{...e}),!e.noDivider&&t.createElement(w,{className:[S.marginTop20,S.marginBottom20].join(" ")}))};const A={...d.webpack.findByProps("marginBottom20")};var g=e=>{const n=e.children;return delete e.children,t.createElement(U,{title:n,required:e.required,className:A.marginBottom20},t.createElement(D,{...e}),!e.noDivider&&t.createElement(w,{className:[A.marginTop20,A.marginBottom20].join(" ")}))};const u={...d.webpack.findByProps("wrapper","base"),...d.webpack.findByProps("flex"),...d.webpack.findByProps("size20"),...d.webpack.findByProps("marginBottom20"),...d.webpack.findByProps("dividerDefault")};var x=({opened:e,children:n,title:r,onChange:o})=>(Array.isArray(n)||(n=[n]),t.createElement("div",null,t.createElement("div",{onClick:()=>o?.(),className:[u.flex,u.alignCenter,u.marginBottom8].join(" ")},e?t.createElement(se,{className:u.base,width:32,height:32}):t.createElement(te,{className:u.base,width:32,height:32}),t.createElement(v,{className:[u.base,u.size16,u.marginLeft8].join(" ")},r)),e?t.createElement("div",{className:[u.marginLeft8,u.marginBottom20].join(" ")},[...n]):null,!e&&t.createElement(w,{className:u.marginBottom20})));const F=i.findByProps("getActivities"),{useStateFromStores:me}=i.findByProps("useStateFromStores");var k=({user:e})=>{const n=me([F],()=>F.getActivities(e.id));return t.createElement(re,{className:"userProfileScroll-crpc"},n.map(r=>t.createElement(ee,{type:"Profile",activity:r,user:e,source:"Profile Modal",className:["userProfile-crpc","newProfileActivityStyles"].join(" ")},r.application_id," - ",r.session_id," - ",r.name)))};const{noticeRegion:de}=i.findByProps("noticeRegion");var pe=({onReset:e,onSave:n})=>t.createElement(ae,null,t.createElement(ne,{className:[de,"crpc-notice"].join(" ")},t.createElement(oe,{onReset:e,onSave:n,theme:"dark"})));const{getAssetIds:ue,getAssets:ge}=i.findByProps("getAssetIds");function he(){if(s.persist.ghost.converte)return;const e=s.persist.ghost.rpc1?Object.entries(s.persist.ghost):Object.entries(s.persist.ghost.rpcs),n=e.map(o=>{if(typeof o[1]!="object")return;const p=o[1];return p.buttons=[],p.buttons.push(p.button1||b.buttons[0]),p.buttons.push(p.button2||b.buttons[1]),p}).filter(o=>o),r=typeof s.persist.ghost.selected!="number"?e.findIndex(o=>o[0]===s.persist.ghost.selected):s.persist.ghost.selected;s.persist.store.rpc1=null,s.persist.store.rpc2=null,s.persist.store.rpc3=null,s.persist.store.rpcs=n,s.persist.store.selected=r,s.persist.store.disabled=s.persist.ghost.disable,s.persist.store.converte=!0}async function C(e){const n=e&&await fe(e);W.FluxDispatcher.dispatch({type:"LOCAL_ACTIVITY_UPDATE",socketId:"cumcord-epic-sex",pid:69,activity:n})}async function fe(e){const n=await ue(e.client_id,[e.large_image,e.small_image]),r={application_id:e.client_id,name:e.name,details:e.details,state:e.type!==1?e.state:null,assets:{large_image:e.type!==1?n[0]:null,small_image:e.type!==1?n[1]:null,large_text:e.type!==1?e.large_text:null,small_text:e.type!==1?e.small_text:null},timestamps:e.show_time&&{start:Date.now()},party:e.party&&e.party_size&&{size:[e.party,e.party_size],id:"cum"},type:e.type,url:e.url};return e.buttons?.forEach(o=>{o?.url&&o?.label&&(r.buttons||(r.buttons=[]),r.metadata||(r.metadata={button_urls:[]}),r.buttons.push(o.label),r.metadata.button_urls.push(o.url))}),r}async function Ee(e){const n=await ge(e),r=Object.values(n).filter(o=>o.type===1);return r.unshift({name:"",type:1}),r.filter(o=>o.type===1).map(o=>({label:o.name,value:o.name}))}const b={show_time:!0,client_id:"892203377503658064",name:"cum",state:"eating cum",details:"Browsing cum",large_image:"cumcord",small_image:"cumcord",large_text:"cuming",small_text:"made with cum",buttons:[{label:"",url:""},{label:"",url:""}],type:0},{getCurrentUser:ye}=i.findByProps("getCurrentUser"),R={...i.findByProps("h5"),...i.findByProps("marginBottom20")},E=({children:e,grow:n,shrink:r,wrap:o})=>(Array.isArray(e)||(e=[e]),e.map(p=>t.createElement(c.Child,{wrap:o,grow:n||1,shrink:r||1},p)));var q=({rpcName:e,transitionState:n,onClose:r})=>{const[o,p]=h.useState(),[G,j]=h.useState(),[H,T]=h.useState(),[ve,V]=h.useState(),[B,we]=h.useState(),[a,Se]=h.useState(Object.assign({},s.persist.ghost.rpcs[e]));h.useEffect(()=>{a.buttons=a.buttons.map(l=>({label:l.label,url:l.url}))});const m=l=>{const f=l||a;Se(Object.assign({},f)),_.isEqual(Object.assign({},s.persist.ghost.rpcs[e]),f)?V(!1):V(!0)};return B||Ee(a.client_id).then(l=>we(l)).catch(()=>{}),t.createElement(P.ModalRoot,{className:"crpc-edit",transitionState:n},t.createElement(P.ModalHeader,{separator:!1},t.createElement(E,null,t.createElement(M,{size:M.Sizes.SIZE_20,tag:"h2"},"Edit RPC"),t.createElement(P.ModalCloseButton,{onClick:r}))),t.createElement(P.ModalContent,null,t.createElement(c,{wrap:c.Wrap.WRAP},t.createElement(c.Child,{wrap:!0},t.createElement(c,{wrap:c.Wrap.WRAP},t.createElement(E,{wrap:!0,grow:0,shrink:0},t.createElement(g,{required:!0,noDivider:!0,value:a.client_id,onChange:l=>{a.client_id=l,m()}},"Client id"),t.createElement(g,{noDivider:!0,value:a.name,onChange:l=>{a.name=l,m()}},"Name"),t.createElement(g,{noDivider:!0,value:a.details,onChange:l=>{a.details=l,m()}},"Details"),t.createElement(g,{noDivider:!0,value:a.state,onChange:l=>{a.state=l,m()}},"State")),t.createElement(c.Child,null,t.createElement(z,{value:a.show_time,onChange:()=>{a.show_time=!a.show_time,m()}},"Show Time"),t.createElement(x,{title:"Images",opened:G,onChange:()=>!j(!G)&&!T(!1)&&p(!1)},t.createElement(c,{wrap:c.Wrap.WRAP},t.createElement(E,{wrap:!0,grow:1,shrink:1},B&&t.createElement(N,{value:a.large_image,options:B,onChange:l=>{a.large_image=l.value,m()}},"Large Image"),t.createElement(g,{value:a.large_text,onChange:l=>{a.large_text=l,m()}},"Large Image Text"))),t.createElement(c,{wrap:c.Wrap.WRAP},t.createElement(E,{wrap:!0,grow:1,shrink:1},B&&t.createElement(N,{value:a.small_image,options:B,onChange:l=>{a.small_image=l.value,m()}},"Small Image"),t.createElement(g,{value:a.small_text,onChange:l=>{a.small_text=l,m()}},"Small Image Text")))),t.createElement(x,{title:"Buttons",opened:o,onChange:()=>!p(!o)&&!j(!1)&&T(!1)},a.buttons.map((l,f)=>t.createElement(c,{wrap:c.Wrap.WRAP},t.createElement(E,{wrap:!0,grow:1,shrink:1},t.createElement(g,{value:l.url,placeholder:"https://",onChange:O=>{a.buttons[f].url=O,m()}},"Button ",f+1," URL"),t.createElement(g,{value:l.label,onChange:O=>{a.buttons[f].label=O,m()}},"Button ",f+1," Text"))))),t.createElement(x,{title:"Party",opened:H,onChange:()=>!T(!H)&&!p(!1)&&j(!1)},t.createElement(c,{wrap:c.Wrap.WRAP},t.createElement(E,{wrap:!0,grow:1,shrink:1},t.createElement(g,{value:a.party,onChange:l=>{try{a.party=l?parseInt(l):void 0,m()}catch{}}},"Members in party"),t.createElement(g,{value:a.party_size,onChange:l=>{try{a.party_size=l?parseInt(l):void 0,m()}catch{}}},"Size of the party")))),t.createElement(v,{className:`${R.h5} ${R.marginBottom8}`},"Your RPC:"),t.createElement("div",{className:R.marginBottom20,style:{backgroundColor:"var(--background-floating)"}},t.createElement(k,{user:ye()})))))),ve&&t.createElement(pe,{onReset:()=>{m(s.persist.ghost.rpcs[e])},onSave:()=>{s.persist.store.rpcs[e]=a,m(),s.persist.ghost.selected===e&&C(a)}})))};const{getCurrentUser:Ce}=d.webpack.findByProps("getCurrentUser"),I={...d.webpack.findByProps("h5"),...d.webpack.findByProps("marginBottom20")};var Be=()=>{J.useNest(s.persist);const[e,n]=h.useState(s.persist.ghost.selected);return t.createElement("div",null,t.createElement(z,{value:s.persist.ghost.disabled,onChange:()=>{s.persist.store.disabled=!s.persist.ghost.disabled,C(s.persist.ghost.disabled?null:s.persist.ghost.rpcs[e])}},"Disabled"),t.createElement(N,{value:e,onChange:r=>n(r.value),options:s.persist.ghost.rpcs.map((r,o)=>({label:r.name,value:o}))},"RPC'S",!isNaN(e)&&s.persist.ghost.selected!==e&&t.createElement(y,{disabled:s.persist.ghost.selected===e,onClick:()=>{s.persist.store.selected=e,s.persist.ghost.disabled||C(s.persist.ghost.rpcs[e])}},"Set as RPC"),e!==null&&t.createElement(y,{onClick:()=>$(t.createElement(q,{rpcName:e}))},"Edit RPC"),t.createElement(y,{onClick:()=>{s.persist.store.rpcs.push(b),n(s.persist.ghost.rpcs.length-1),$(t.createElement(q,{rpcName:s.persist.ghost.rpcs.length-1}))}},"Create new RPC"),t.createElement(y,{color:y.Colors.RED,onClick:()=>K.showConfirmationModal({confirmText:"Delete",content:"Are you sure you want to delete that rpc?",type:"danger"},r=>{!r||(s.persist.store.rpcs.splice(e,1),s.persist.store.selected=null,n(null))})},"Delete RPC")),t.createElement(v,{className:`${I.h5} ${I.marginBottom8}`},"Your RPC:"),t.createElement("div",{className:I.marginBottom20,style:{backgroundColor:"var(--background-floating)"}},t.createElement(k,{user:Ce()})))},Pe=()=>Q.injectCSS(".rpcsetting-select{display:flex}.rpcsetting-select .select-1YfRS9{width:-webkit-fill-available}.rpcsetting-select button{margin-left:9px}.userProfileScroll-crpc{padding:8px 0;height:100%}.userProfile-crpc{position:relative;padding:16px}.crpc-edit{width:800px}.crpc-notice{position:fixed}.crpc-lowerMargin{margin-left:5px;margin-right:5px}");let Y;function _e(){s.persist.store.rpcs=[],s.persist.store.rpcs.push(b),s.persist.store.selected=0}var be=()=>(!s.persist.ghost.converte&&(s.persist.ghost.rpc1||s.persist.ghost.rpcs)?he():s.persist.ghost.rpcs||_e(),{onLoad(){Y=Pe(),C(s.persist.ghost.rpcs[s.persist.ghost.selected])},onUnload(){Y?.(),C(null)},settings:W.React.createElement(Be)});return be})(cumcord.modules.common,cumcord.modules.common.React,cumcord.modules,cumcord.utils,cumcord.pluginData,cumcord.ui.modals,cumcord.modules.webpack,cumcord.modules.common.React,cumcord.patcher);
