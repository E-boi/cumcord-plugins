(function(a,i,e,r,s){"use strict";var d=()=>a.injectCSS(".linkChannels{display:none}div[class*=iconVisibility]:hover .linkChannels{display:block;cursor:pointer}.linkChannels{z-index:999}");let c,l;const o=i.webpack.find(n=>n.default?.displayName==="ChannelItem");var p=()=>({onLoad(){l=d(),c=a.after("default",o,([{channel:n}],t)=>(t.props.children.props.children[1].props.children[1].props.children.unshift(e.React.createElement(h,{onClick:()=>{s.copyText(`<#${n.id}>`),r.showToast({title:`Copied mention for #${n.name}`,duration:3e3})}})),t)),o.default.displayName="ChannelItem"},onUnload(){l?.(),c?.()}});class h extends e.React.Component{render(){const t=i.webpack.findByProps("iconItem"),u=i.webpack.findByDisplayName("Link"),{TooltipContainer:C}=i.webpack.findByProps("TooltipContainer");return e.React.createElement(C,{className:t.iconItem,text:"Copy Channel",position:"top",color:"black"},e.React.createElement("div",{className:"linkChannels"},e.React.createElement("svg",{className:t.actionIcon,viewBox:"0 0 20 20",onClick:this.props.onClick,children:e.React.createElement(u,{height:"20"})})))}}return p})(cumcord.patcher,cumcord.modules,cumcord.modules.common,cumcord.ui.toasts,cumcord.utils);