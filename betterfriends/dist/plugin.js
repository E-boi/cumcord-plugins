(function(x,s,n,d,R){"use strict";const{getRelationships:D}=s.webpack.findByProps("getRelationships"),{MenuItem:g}=s.webpack.findByProps("MenuGroup","MenuItem"),S=["DMUserContextMenu","GroupDMUserContextMenu","GuildChannelUserContextMenu"];function I(){const i=t=>D()[t]===1,e=t=>this.FAVORITE_FRIENDS.some(r=>r.id===t);S.forEach(t=>{const r=s.webpack.find(a=>a.default?.displayName===t);this.injections.ContextMenu.push(d.after("default",r,([{user:a}],o)=>{if(i(a.id)){const p=R.findInReactTree(o,f=>Array.isArray(f)&&f.find(u=>u&&u.props&&u.props.id==="block"));e(a.id)?p.push(n.React.createElement(g,{id:"ccbf-remove",label:"Remove Favorite",action:()=>{this.FAVORITE_FRIENDS=this.FAVORITE_FRIENDS.filter(f=>f.id!==a.id),this.settings.set("favfriends",this.FAVORITE_FRIENDS),this.reload("ContextMenu")}})):p.push(n.React.createElement(g,{id:"ccbf-add",label:"Add as Favorite",action:()=>{this.FAVORITE_FRIENDS.push({id:a.id,since:Date.now()}),this.settings.set("favfriends",this.FAVORITE_FRIENDS),this.reload("ContextMenu")}}))}return o})),r.default.displayName=t})}const m=s.webpack.findByProps("push","popWithKey"),w=s.webpack.findByProps("TooltipContainer").TooltipContainer,F=i=>n.React.createElement("span",{...i,className:`${i.className||""} ${s.webpack.findByProps("editIcon").editIcon}`}),C=s.webpack.findByDisplayName("ConfirmModal"),c=s.webpack.findByDisplayName("Text"),M=s.webpack.findByDisplayName("Mention"),N=i=>m.push(()=>n.React.createElement(i)),E=()=>m.pop(),T={...s.webpack.findByProps("topSection")};var y=({header:i})=>n.React.createElement("div",{className:`ccbf-badge ${T.topSection}`},n.React.createElement(w,{className:"cssbf-star-tooltip",text:"Favorited Friend",position:"top"},n.React.createElement("div",{className:`${!i&&"ccbf-star-member"} ccbf-star`})));const A=s.webpack.find(i=>i.default?.name==="b"&&!i.default?.displayName),_=s.webpack.findByDisplayName("MemberListItem").prototype;function O(){if(!this.settings.get("displaystar"))return;const i=e=>this.FAVORITE_FRIENDS.some(t=>t.id===e);this.injections.DisplayStar.push(d.after("renderDecorators",_,(e,t)=>(i(t._owner.pendingProps.user?.id)&&t.props.children.unshift(n.React.createElement(y)),t))),this.injections.DisplayStar.push(d.after("default",A,([{message:e}],t)=>(i(e?.author?.id)&&t.props.children[1].props.children.push(n.React.createElement(y,{header:!0})),t)))}const v={...s.webpack.findByProps("privateChannelsHeaderContainer")};var z=({friends:i,_this:e,expanded:t})=>{const[r,a]=n.React.useState(t);return!i||i.length===0?null:n.React.createElement("h2",{className:`ccbf-fav-friends-header ${v.privateChannelsHeaderContainer} container-2ax-kl`},n.React.createElement("span",{className:v.headerText},"Favorite Friends"),n.React.createElement("svg",{className:`ccbf-expand-fav-friends ${r?"expanded":"collapsed"}`,height:15,width:15,viewBox:"0 0 20 20",onClick:()=>{e.expanded=!r,a(e.expanded),document.querySelector(".scroller-1JbKMe").dispatchEvent(new Event("focusin")),document.querySelector(".scroller-1JbKMe").dispatchEvent(new Event("focusout"))}},n.React.createElement("path",{fill:"var(--channels-default)",d:"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"})))};const{getGuild:B}=s.webpack.findByProps("getGuild"),{getUser:P}=s.webpack.findByProps("getUser"),{getChannel:L}=s.webpack.findByProps("getChannel"),{transitionTo:U}=s.webpack.findByProps("transitionTo"),{marginBottom20:l}=s.webpack.findByProps("marginBottom20");s.webpack.find(i=>i.prototype?.toISOString);var j=({user:i,channel:e,friend:t})=>{const r=P(i),a=e&&L(e),o=a&&B(a.guild_id);return console.log(t),n.React.createElement(C,{red:!1,transitionState:0,header:`${r.username} Information`,cancelText:"Alright",onCancel:E,onClose:()=>{}},n.React.createElement("div",{className:"ccbf-information-modal"},!a&&n.React.createElement(c,{size:c.Sizes.SIZE_16,className:l},r.username," hasn't been seen anywhere recently."),a&&n.React.createElement(c,{size:c.Sizes.SIZE_16,className:l},r.username," was last seen in"," ",o?n.React.createElement(M,{iconType:"text",onClick:()=>{U?.(n.constants.Routes.CHANNEL(o.id,a.id)),E()}},a.name):a.recipients.length<=2?"your DMs":a.name),n.React.createElement(c,{size:c.Sizes.SIZE_16,className:l},"Favorite friend since ",new Date(t.since).toLocaleDateString()," ",new Date(t.since).toLocaleTimeString()),n.React.createElement(c,{size:c.Sizes.SIZE_16,className:l},"Joined discord on ",r.createdAt.toLocaleDateString()," ",r.createdAt.toLocaleTimeString())))};const k=s.webpack.find(i=>i.default?.displayName==="ConnectedPrivateChannelsList"),V=s.webpack.findByDisplayName("PrivateChannel").prototype,{getChannel:h}=s.webpack.findByProps("getChannel"),{DirectMessage:G}=s.webpack.findByProps("DirectMessage"),{getDMFromUserId:b}=s.webpack.findByProps("getDMFromUserId");function H(){this.expanded=!1,this.injections.FavoriteFriends.push(d.after("render",V,(i,e)=>{const t=e.props.subText?._owner?.pendingProps?.channel?.recipients?.[0];return t&&this.FAVORITE_FRIENDS.some(r=>r.id===t)&&(e.props.className.includes("ccbf-favoritefriend")||(e.props.className+=" ccbf-favoritefriend"),e.props.children=[n.React.createElement(w,{text:"User Information",position:"top"},n.React.createElement(F,{className:"ccbf-information",onClick:r=>{r.stopPropagation(),r.preventDefault();const a=this.FRIEND_DATA.lastMessageID[t];N(()=>n.React.createElement(j,{user:t,channel:a?.channel,friend:this.FAVORITE_FRIENDS.find(o=>o.id===t)}))}})),e.props.children]),e})),this.injections.FavoriteFriends.push(d.after("default",k,(i,e)=>{if(e.props.privateChannelIds=e.props.privateChannelIds.filter(a=>{const o=h(a);return o.type!==1||!this.FAVORITE_FRIENDS.some(p=>o.recipients[0]===p.id)}),e.props.children.find(a=>a?.toString()?.includes("()=>t")))return e;const t=n.React.createElement(z,{_this:this,expanded:this.expanded,friends:this.FAVORITE_FRIENDS}),r=this.FAVORITE_FRIENDS.map(a=>()=>h(b(a.id))&&!this.expanded&&n.React.createElement(G,{"aria-posinset":7,"aria-setsize":54,tabIndex:-1,channel:h(b(a.id)),selected:e.props.selectedChannelId===b(a.id)}));return e.props.children.push(()=>t,...r),e})),k.default.displayName="ConnectedPrivateChannelsList"}function q(){const i=({message:e})=>{this.FAVORITE_FRIENDS.some(t=>t.id===e.author.id)&&(this.FRIEND_DATA.lastMessageID[e.author.id]={id:e.id,channel:e.channel_id})};this.injections.InformationModal.push(()=>n.FluxDispatcher.unsubscribe("MESSAGE_CREATE",i)),this.settings.get("infomodal")?n.FluxDispatcher.subscribe("MESSAGE_CREATE",i):n.FluxDispatcher.unsubscribe("MESSAGE_CREATE",i)}var K={ContextMenu:I,DisplayStar:O,InformationModal:q,FavoriteFriends:H},Z=()=>cumcord.patcher.injectCSS(`.ccbf-friend{margin:6px;width:32px;height:32px;float:left;border-radius:360px}.ccbf-favoritefriend>.layout-2DM8Md>.children-gzQq2t{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.ccbf-favoritefriend>.layout-2DM8Md>.children-gzQq2t [aria-label="User Information"]{margin:0 5px}.ccbf-friend-name{color:#fff;float:left;font-family:"Whitney","Helvetica Neue","Helvetica","Arial",sans-serif;font-weight:700;margin-left:8px;font-size:20px}.ccbf-friend-discrim{color:#fff9;float:left;font-family:"Whitney","Helvetica Neue","Helvetica","Arial",sans-serif;font-size:16px;position:relative;top:4px;padding-right:6px}.ccbf-friend-discrim.ccbf-friend-discrim:before{content:"#"}.ccbf-friend-name,.ccbf-friend-discrim{margin-top:8px}.ccbf-star{display:inline;position:relative;top:6px;margin-left:5px;padding-right:5px;padding-left:5px;background:url(https://cdn.discordapp.com/attachments/770304534203334678/891085095459512340/e4d52f4d69d7bba67e5fd70ffe26b70d.png) no-repeat;background-size:10px 10px}.ccbf-star-member{margin-left:4px}.ccbf-badge,.ccbf-badge.topSectionNormal-2-vo2m{background:none;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.ccbf-badge~.botTagRegular-2HEhHi{margin-left:8px}.privateChannels-1nO12o .ccbf-badge,.badges>.ccbf-badge{height:20px!important;width:auto!important}.ccbf-information{left:82%;display:none;opacity:.4}.ccbf-fav-friends-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.ccbf-expand-fav-friends{margin-left:auto;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ccbf-expand-fav-friends.expanded{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ccbf-information:hover{opacity:.9}.channel-2QD9_O:hover .ccbf-information{display:block}.ccbf-user-settings{width:auto!important;margin-bottom:32px;border-radius:5px;padding:10px 10px 0}.ccbf-friend-item{padding:6px 6px 6px 18px;margin-top:4px;margin-bottom:4px;height:auto}.ccbf-notification-sounds{width:auto!important;padding-bottom:64px}.ccbf-notification-sounds-icon{background:url(https://canary.discordapp.com/assets/f9b93aa0d9985bd2b678da58ed0d75d2.svg) 50% no-repeat!important;width:auto;height:auto}.ccbf-notification-sounds>div>div>div>.divider-3573oO.marginTop20-3TxNs6{display:none}.searchBar-2_Yu-C{width:100%}html body .ccbf-ff-header{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-align:center;-ms-flex-align:center;align-items:center}html body .ccbf-ff-header svg{margin-right:5px;-webkit-transition:.2s;transition:.2s;width:18px;height:18px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}html body .ccbf-ff-header.opened svg{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ccbf-status-userinline{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;display:-webkit-box;display:-ms-flexbox;display:flex}.ccbf-status-popup{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background-color:#212121}.ccbf-status-popup .header{background-color:transparent;-webkit-box-shadow:none;box-shadow:none;padding:0;position:absolute;top:8px;right:8px}.ccbf-status-popup .header>span{display:none}.ccbf-status-popup .contents{padding:0}.ccbf-status-popup .contents .inner{background-color:transparent;border:none;padding-bottom:0;margin-bottom:2px}.ccbf-status-popup-text{color:#fff;font-weight:600;margin-right:8px}.pc-scroller{max-height:300px}.ccbf-container{-webkit-box-sizing:border-box;box-sizing:border-box;text-overflow:ellipsis;white-space:nowrap;text-transform:uppercase;font-size:12px;line-height:16px;font-weight:600;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;color:var(--channels-default)}.ccbf-mutualGuilds{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;margin-right:15px;margin-bottom:10px;position:inherit}.ccbf-mutualGuilds .icon-3o6xvg{border-radius:12px}.ccbf-mutualGuilds>div{margin-right:-5px}.ccbf-header{border-left:2px solid var(--background-modifier-accent);-webkit-box-sizing:border-box;box-sizing:border-box}.headerCellContent-1pLtOr{margin:auto}.ccbf-nameCell{width:-webkit-min-content;width:-moz-min-content;width:min-content;padding:0 30px}@media screen and (max-width: 975px){.ccbf-nameCell{padding:0 10px}}@media screen and (min-width: 1200px){.ccbf-nameCell{padding:0 10px}}@media screen and (min-width: 1400px){.ccbf-nameCell{padding:0 30px}}@media screen and (min-width: 1500px){.ccbf-nameCell{padding:0 40px}}
`);const J=[["favfriends",[]],["notifsounds",{}],["infomodal",!0],["displaystar",!0],["statuspopup",!0]];class Q{constructor(e){this.settings=new W(e),this.FRIEND_DATA={statusStorage:{},lastMessageID:{}},this.FAVORITE_FRIENDS=this.settings.get("favfriends")||[],this.MODULES=K,this.injections={},this.css=null}onLoad(){this.settings.get("favfriends")||J.forEach(e=>this.settings.set(e[0],e[1])),this.css=Z(),Object.keys(this.MODULES).forEach(e=>{this.MODULES[e]=this.MODULES[e].bind(this),this.injections[e]=[]}),x.log(this.injections),this.load()}onUnload(){this.unload(),this.css?.(),x.log("bye")}load(e){e?this.MODULES[e]():Object.keys(this.MODULES).forEach(t=>{this.MODULES[t]()})}unload(e){e?this.injections[e].forEach(t=>t()):Object.keys(this.MODULES).forEach(t=>{this.injections[t].forEach(r=>r())})}reload(e){e?(this.unload(e),this.load(e)):(this.unload(),this.load())}}class W{constructor(e){this.persist=e}get(e){return this.persist.ghost[e]}set(e,t){this.persist.store[e]=t}}var Y=({persist:i})=>new Q(i);return Y})(cumcord.utils.logger,cumcord.modules,cumcord.modules.common,cumcord.patcher,cumcord.utils);