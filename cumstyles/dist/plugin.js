(function(f,a,v,c){"use strict";const m=()=>Math.random().toString(16).substring(2),r=new Map;async function d(e,t){const n=await fetch(e);!n.ok||r.set(t,f.injectCSS(await n.text()))}function p(e){Object.entries(e).filter(t=>t).forEach(t=>t[1].applied&&d(t[1].url,t[0]))}function g(e,t){const n=m();return e.themes[n]={url:t,applied:!1},{[n]:t}}function h(){r.forEach(e=>e()),r.clear()}function l(e){r.get(e)?.(),r.delete(e)}const u={divider:c.webpack.findByPropsAll("divider")[1].divider,dividerDefault:c.webpack.findByProps("dividerDefault").dividerDefault};var y=({className:e})=>a.React.createElement("div",{className:`${u.divider} ${u.dividerDefault} ${e}`});const E=c.webpack.findByDisplayName("TextInput"),R=c.webpack.findByDisplayName("FormItem"),s={...c.webpack.findByProps("marginBottom20")};var b=e=>{const t=[e.children];return delete e.children,a.React.createElement(R,{title:e.title,required:e.required,className:s.marginBottom20},a.React.createElement("div",{className:"cumstyles-textinput"},a.React.createElement(E,{...e}),t),a.React.createElement(y,{className:[s.marginTop20,s.marginBottom20].join(" ")}))};const i=c.webpack.find(e=>e.DropdownSizes);var k=({persist:e})=>(v.useNest(e),a.React.createElement("div",null,Object.entries(e.ghost.themes||{}).filter(t=>t).map((t,n)=>a.React.createElement(b,{title:`Theme ${++n}`,onChange:w=>e.store.themes[t[0]].url=w,value:t[1].url},a.React.createElement(i,{onClick:()=>{!t[1]?.url||(l(t[0]),d(t[1].url,t[0]),t[1].applied=!0,e.store.themes[t[0]]=t[1])}},"Apply"),a.React.createElement(i,{onClick:()=>{l(t[0]),t[1].applied=!1,e.store.themes[t[0]]=t[1]}},"Disable"),a.React.createElement(i,{onClick:()=>{l(t[0]),delete e.store.themes[t[0]]}},"Remove"))),a.React.createElement(i,{onClick:()=>g(e.store)},"Add Theme"))),x=()=>cumcord.patcher.injectCSS(".cumstyles-textinput{display:flex}.cumstyles-textinput>div{flex:auto}.cumstyles-textinput button{margin-left:10px}");let o;var T=({persist:e})=>({onLoad(){o=x(),e.ghost.themes&&p(e.ghost.themes)},onUnload(){o?.(),h()},settings:a.React.createElement(k,{persist:e})});return T})(cumcord.patcher,cumcord.modules.common,cumcord.utils,cumcord.modules);
