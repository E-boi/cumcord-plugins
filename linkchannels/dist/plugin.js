(function(c,i,e,l,r){"use strict";var d=()=>c.injectCSS(".linkChannels{display:none}div[class*=iconVisibility]:hover .linkChannels{display:block;cursor:pointer}.linkChannels{z-index:999}");let a,o;const s=i.webpack.find(n=>n.default?.displayName==="ChannelItem");var p=()=>({onLoad(){o=d(),a=c.after("default",s,([{channel:n}],t)=>(t.props.children.props.children[1].props.children[1].props.children.unshift(e.React.createElement(h,{onClick:()=>{r.copyText(`<#${n.id}>`),l.showToast({title:`Copied mention for #${n.name}`,duration:3e3})}})),t)),s.default.displayName="ChannelItem"},onUnload(){o?.(),a?.()}});class h extends e.React.Component{render(){const t=i.webpack.findByProps("iconItem"),u=i.webpack.findByDisplayName("Link"),{TooltipContainer:C}=i.webpack.findByProps("TooltipContainer");return e.React.createElement(C,{className:t.iconItem,text:"Copy Channel",position:"top",color:"black"},e.React.createElement("div",{className:"linkChannels"},e.React.createElement("svg",{className:t.actionIcon,viewBox:"0 0 20 20",onClick:this.props.onClick,children:e.React.createElement(u,{height:"20"})})))}}return p})(cumcord.patcher,cumcord.modules,cumcord.modules.common,cumcord.ui.toasts,cumcord.utils);
