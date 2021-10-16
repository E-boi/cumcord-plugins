(function(f,n,t,C){"use strict";var B=()=>cumcord.patcher.injectCSS(`:root{--blur-effect: blur(1px);--blur-timing: 1s}.nsfw-text{background-color:#f04747;padding:0 6px;white-space:nowrap;text-overflow:ellipsis;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:8px;min-width:16px;min-height:16px;font-size:12px;line-height:16px;font-weight:600;color:#fff;text-align:center;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.nsfw-badge{position:relative;margin-left:4px;line-height:0}.blur .embedWrapper-lXpS3L img,.blur .embedWrapper-lXpS3L video{transition:var(--blur-timing)!important;filter:var(--blur-effect)!important}.blur .embedWrapper-lXpS3L img:hover,.blur .embedWrapper-lXpS3L video:hover{transition:var(--blur-timing)!important;filter:none!important}.blurnsfwsetting-textinput{display:flex}.blurnsfwsetting-textinput div{width:-webkit-fill-available}.blurnsfwsetting-textinput button{margin-left:9px}
`);const g=n.webpack.findByDisplayName("SwitchItem"),s=n.webpack.find(e=>e.DropdownSizes),p={divider:n.webpack.findByPropsAll("divider")[1].divider,dividerDefault:n.webpack.findByProps("dividerDefault").dividerDefault};var m=({className:e})=>t.React.createElement("div",{className:`${p.divider} ${p.dividerDefault} ${e}`});const N=n.webpack.findByDisplayName("Text"),D=n.webpack.findByDisplayName("ArrowDropDown"),T=n.webpack.findByDisplayName("ArrowDropUp"),r={...n.webpack.findByProps("wrapper","base"),...n.webpack.findByProps("flex"),...n.webpack.findByProps("size20"),...n.webpack.findByProps("marginBottom20"),...n.webpack.findByProps("dividerDefault")};var w=({opened:e,children:a,title:l,onChange:c})=>t.React.createElement("div",null,t.React.createElement("div",{onClick:()=>c?.(),className:[r.flex,r.alignCenter,r.marginBottom8].join(" ")},e?t.React.createElement(T,{className:r.base,width:32,height:32}):t.React.createElement(D,{className:r.base,width:32,height:32}),t.React.createElement(N,{className:[r.base,r.size16,r.marginLeft8].join(" ")},l)),e?t.React.createElement("div",{className:[r.marginLeft8,r.marginBottom20].join(" ")},[...a]):null,!e&&t.React.createElement(m,{className:r.marginBottom20}));const S=n.webpack.findByDisplayName("FormItem"),$=n.webpack.findByDisplayName("FormText"),i={...n.webpack.findByProps("marginBottom20"),...n.webpack.findByProps("formText"),...n.webpack.findByDisplayName("Flex")};var v=e=>t.React.createElement(S,{title:e.title,required:e.required,className:`${i.Direction.VERTICAL} ${i.Justify.START} ${i.Align.STRETCH} ${i.Wrap.NO_WRAP} ${i.marginBottom20}`},e.children,e.note&&t.React.createElement($,{className:`${i.description} ${i.marginTop8}`},e.note),t.React.createElement(m,{className:[i.marginTop20].join(" ")}));const A=n.webpack.findByDisplayName("Slider"),I={...n.webpack.findByProps("marginBottom20")};var y=e=>{const a=e.children;return delete e.children,t.React.createElement(v,{title:a,note:e.note,required:e.required},t.React.createElement(A,{...e,className:`${e.className} ${I.marginTop8}`}))};const k=n.webpack.findByDisplayName("TextInput");var R=e=>{Array.isArray(e.children)||(e.children=[e.children]);const a=e.children;return delete e.children,t.React.createElement(v,{title:a[0],required:e.required,note:e.note},a[1]?t.React.createElement("div",{className:"blurnsfwsetting-textinput"},t.React.createElement(k,{...e}),a[1]):t.React.createElement(k,{...e}))},P=({persist:e})=>{const[a,l]=t.React.useState(),[c,W]=t.React.useState();return C.useNest(e),t.React.createElement("div",null,t.React.createElement(g,{note:"Blur images/video in dms",value:e.ghost.dm,onChange:()=>e.store.dm=!e.ghost.dm},"Blur DMs"),t.React.createElement(g,{note:"Blur images/video in group chats",value:e.ghost.gc,onChange:()=>e.store.gc=!e.ghost.gc},"Blur Group chats"),t.React.createElement(g,{note:"Adds a more visible tags for nsfw channels",value:!e.ghost.notags,onChange:()=>e.store.notags=!e.ghost.notags},"NSFW Tags"),t.React.createElement(y,{stickToMarkers:!0,minValue:1,maxValue:75,initialValue:e.ghost.blur??10,markers:[5,10,15,20,25,30,35,40,45,50,65,60,70,75],onValueChange:d=>e.store.blur=d},"Blur effect"),t.React.createElement(y,{stickToMarkers:!0,minValue:.2,maxValue:10,initialValue:e.ghost.timing??1,markers:[.2,.5,1,2,3,4,5,6,7,8,9,10],onValueChange:d=>e.store.timing=d},"Blur Timing (in seconds)"),t.React.createElement(w,{opened:a,onChange:()=>l(!a),title:"Blocked channels (uneffected channels)"},e.ghost.blocked?.map((d,o)=>t.React.createElement(R,{placeholder:"Enter a channel/user id",value:d,onChange:u=>e.store.blocked[o]=u},"",t.React.createElement(s,{color:s.Colors.RED,onClick:()=>e.store.blocked=e.ghost.blocked.filter((u,h)=>h!==o)},"Remove"))),t.React.createElement(s,{onClick:()=>e.store.blocked=e.ghost.blocked?e.ghost.blocked.concat(""):[""]},"Add channel")),t.React.createElement(w,{opened:c,onChange:()=>W(!c),title:"Blur specific channels"},e.ghost.blurChannels?.map((d,o)=>t.React.createElement(R,{placeholder:"Enter a channel/user id",value:d,onChange:u=>e.store.blurChannels[o]=u},"",t.React.createElement(s,{color:s.Colors.RED,onClick:()=>e.store.blurChannels=e.ghost.blurChannels.filter((u,h)=>h!==o)},"Remove"))),t.React.createElement(s,{onClick:()=>e.store.blurChannels=e.ghost.blurChannels?e.ghost.blurChannels.concat(""):[""]},"Add channel")))};const b=[];let E;const x=n.webpack.find(e=>e.default?.displayName==="ChannelItem"),L=n.webpack.find(e=>e.type&&e.type.render&&e.type.render.displayName==="ChannelTextAreaContainer");var V=({persist:e})=>({onLoad(){E=B(),b.push(f.after("default",x,([{channel:a}],l)=>{!a.nsfw||e.ghost.notags||l.props.children.props.children[1].props.children[1].props.children.push(t.React.createElement("div",{className:"nsfw-badge"},t.React.createElement("div",{className:"nsfw-text"},"NSFW")))})),b.push(f.after("render",L.type,([{channel:a}],l)=>(e.ghost.blocked?.includes(a.id)||e.ghost.blocked?.includes(a.recipients[0])||(a.nsfw||a.type===1&&e.ghost.dm||a.type===3&&e.ghost.gc||e.ghost.blurChannels?.includes(a.id)||e.ghost.blurChannels?.includes(a.recipients[0])?F(e.ghost):document.body.classList.remove("blur")),l))),x.default.displayName="ChannelItem"},onUnload(){E?.(),b.forEach(a=>a())},settings:t.React.createElement(P,{persist:e})});function F(e){const a=e.blur||10,l=e.timing||1,c=document.body;c.style.setProperty("--blur-effect",`blur(${a}px)`),c.style.setProperty("--blur-timing",`${l}s`),c.classList.add("blur")}return V})(cumcord.patcher,cumcord.modules,cumcord.modules.common,cumcord.utils);
