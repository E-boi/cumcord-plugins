(function(a,p,i,n,N,g,o){"use strict";function b(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach(function(t){if(t!=="default"){var s=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,s.get?s:{enumerable:!0,get:function(){return e[t]}})}}),r.default=e,Object.freeze(r)}var c=b(N);const v={dividerDefault:o.webpack.findByProps("dividerDefault").dividerDefault,divider:o.webpack.find(e=>e.divider?.includes("divider-_")).divider};var B=({className:e})=>c.createElement("div",{className:`${v.divider} ${v.dividerDefault} ${e}`});const P=o.webpack.findByDisplayName("FormItem"),T=o.webpack.findByDisplayName("FormText"),d={...o.webpack.findByProps("marginBottom20"),...o.webpack.findByProps("formText"),...o.webpack.findByDisplayName("Flex")};var S=e=>c.createElement(P,{title:e.title,required:e.required,className:`${d.Direction.VERTICAL} ${d.Justify.START} ${d.Align.STRETCH} ${d.Wrap.NO_WRAP} ${d.marginBottom20}`},e.children,e.note&&c.createElement(T,{className:`${d.description} ${d.marginTop8}`},e.note),c.createElement(B,{className:[d.marginTop20].join(" ")}));const R=o.webpack.findByDisplayName("TextInput");var I=e=>{const r=e.children;return delete e.children,c.createElement(S,{title:r,required:e.required,note:e.note},c.createElement(R,{...e}))};const A=a.findByDisplayName("SwitchItem");var j=()=>(g.useNest(n.persist),c.createElement("div",null,c.createElement(A,{value:n.persist.ghost.hour12,onChange:()=>n.persist.store.hour12=!n.persist.ghost.hour12},"12-hour time format"),c.createElement(A,{value:n.persist.ghost.custom,onChange:()=>n.persist.store.custom=!n.persist.ghost.custom},"Custom time format"),c.createElement(I,{value:n.persist.ghost.format||"%d.%m.%y, %H:%M:%S %ampm",onChange:e=>n.persist.store.format=e,disabled:!n.persist.ghost.custom},"Format"))),M=()=>p.injectCSS(".createdAt-text{padding:0 0 16px 16px;user-select:text}.createdAt-text-skin{user-select:text}");const m=[],u=a.findByDisplayName("Text")||a.findByDisplayName("LegacyText"),$=a.findByProps("UserPopoutInfo"),C=a.findByDisplayName("UsernameSection",!1),{getMember:E}=a.findByProps("getMember"),{getGuildId:x}=a.findByProps("getLastSelectedGuildId");let y=!1;var F={async onLoad(){y=!1,m.push(M()),m.push(p.after("UserPopoutInfo",$,([{user:r}],t)=>{const s=E(x(),r.id),l=s&&f(new Date(s.joinedAt)),h=f(r.createdAt);return t.props.children.splice(2,0,i.React.createElement("div",null,i.React.createElement(u,{className:"createdAt-text-skin"},"Created on ",h),l&&i.React.createElement(u,{className:"createdAt-text-skin"},"Joined on ",l))),t})),m.push(p.after("default",C,([{user:r}],t)=>{const s=E(x(),r.id),l=s&&f(new Date(s.joinedAt)),h=f(r.createdAt);return g.findInReactTree(t,w=>w?.copyValue)?.children?.props?.children?.push?.(i.React.createElement("div",null,i.React.createElement(u,{className:"createdAt-text-skin"},"Created on ",h),l&&i.React.createElement(u,{className:"createdAt-text-skin"},"Joined on ",l))),t}));const e=await a.findAsync(()=>a.findByDisplayName("UserProfileModalHeader",!1));y||m.push(p.after("default",e,([{user:r}],t)=>{const s=f(r.createdAt);return t.props.children.splice(3,0,i.React.createElement(u,{className:"createdAt-text"},"Created on ",s)),t}))},onUnload(){y=!0,m.forEach(e=>e?.())},settings:i.React.createElement(j)};function f(e){if(!e||e==="-")return"-";const r=n.persist.ghost.custom,t=n.persist.ghost.hour12;if(n.persist.ghost.custom||r){let s=e.getHours(),l="";return t&&(l=s>=12?"PM":"AM",s=s%12||12),(n.persist.ghost.format||"%d.%m.%y, %H:%M:%S %ampm").replace(/%d/g,("0"+e.getDate()).substr(-2)).replace(/%m/g,("0"+(e.getMonth()+1)).substr(-2)).replace(/%y/g,e.getFullYear()).replace(/%H/g,("0"+s).substr(-2)).replace(/%M/g,("0"+e.getMinutes()).substr(-2)).replace(/%S/g,("0"+e.getSeconds()).substr(-2)).replace(/%ampm/g,l)}return e.toLocaleString(i.i18n.getLocale(),{hour12:t})}return F})(cumcord.modules.webpack,cumcord.patcher,cumcord.modules.common,cumcord.pluginData,cumcord.modules.common.React,cumcord.utils,cumcord.modules);
