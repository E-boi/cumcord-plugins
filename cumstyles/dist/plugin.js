(function(o,f,h,v,i){"use strict";function b(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(r){if(r!=="default"){var l=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,l.get?l:{enumerable:!0,get:function(){return e[r]}})}}),t.default=e,Object.freeze(t)}var n=b(h);const y=()=>Math.random().toString(16).substring(2),a=new Map;async function u(e,t){const r=await fetch(e);!r.ok||a.set(t,o.injectCSS(await r.text()))}function g(e){Object.entries(e).filter(t=>t).forEach(t=>t[1].applied&&u(t[1].url,t[0]))}function E(e,t){const r=y();return e.themes[r]={url:t,applied:!1},{[r]:t}}function w(){a.forEach(e=>e()),a.clear()}function s(e){a.get(e)?.(),a.delete(e)}const d={divider:i.webpack.findByPropsAll("divider")[1].divider,dividerDefault:i.webpack.findByProps("dividerDefault").dividerDefault};var j=({className:e})=>n.createElement("div",{className:`${d.divider} ${d.dividerDefault} ${e}`});const x=i.webpack.findByDisplayName("TextInput"),k=i.webpack.findByDisplayName("FormItem"),m={...i.webpack.findByProps("marginBottom20")};var D=e=>{const t=[e.children];return delete e.children,n.createElement(k,{title:e.title,required:e.required,className:m.marginBottom20},n.createElement("div",{className:"cumstyles-textinput"},n.createElement(x,{...e}),t),n.createElement(j,{className:[m.marginTop20,m.marginBottom20].join(" ")}))};const c=i.webpack.find(e=>e.DropdownSizes);var N=({persist:e})=>(v.useNest(e),n.createElement("div",null,Object.entries(e.ghost.themes||{}).filter(t=>t).map((t,r)=>n.createElement(D,{title:`Theme ${++r}`,onChange:l=>e.store.themes[t[0]].url=l,value:t[1].url},n.createElement(c,{onClick:()=>{!t[1]?.url||(s(t[0]),u(t[1].url,t[0]),t[1].applied=!0,e.store.themes[t[0]]=t[1])}},"Apply"),n.createElement(c,{onClick:()=>{s(t[0]),t[1].applied=!1,e.store.themes[t[0]]=t[1]}},"Disable"),n.createElement(c,{onClick:()=>{s(t[0]),delete e.store.themes[t[0]]}},"Remove"))),n.createElement(c,{onClick:()=>E(e.store)},"Add Theme"))),T=()=>o.injectCSS(".cumstyles-textinput{display:flex}.cumstyles-textinput>div{flex:auto}.cumstyles-textinput button{margin-left:10px}");let p;var $=({persist:e})=>({onLoad(){p=T(),e.ghost.themes&&g(e.ghost.themes)},onUnload(){p?.(),w()},settings:f.React.createElement(N,{persist:e})});return $})(cumcord.patcher,cumcord.modules.common,cumcord.modules.common.React,cumcord.utils,cumcord.modules);
