(function(E,a,t,g,A){"use strict";const{getRelationships:B}=a.webpack.findByProps("getRelationships"),{MenuItem:R}=a.webpack.findByProps("MenuGroup","MenuItem"),_=["DMUserContextMenu","GroupDMUserContextMenu","GuildChannelUserContextMenu"];function P(){const n=i=>B()[i]===1,e=i=>this.FAVORITE_FRIENDS.some(c=>c.id===i);_.forEach(i=>{const c=a.webpack.find(s=>s.default?.displayName===i);this.injections.ContextMenu.push(g.after("default",c,([{user:s}],l)=>{if(n(s.id)){const h=A.findInReactTree(l,d=>Array.isArray(d)&&d.find(o=>o&&o.props&&o.props.id==="block"));e(s.id)?h.push(t.React.createElement(R,{id:"ccbf-remove",label:"Remove Favorite",action:()=>{this.FAVORITE_FRIENDS=this.FAVORITE_FRIENDS.filter(d=>d.id!==s.id),this.settings.set("favfriends",this.FAVORITE_FRIENDS),this.reload("ContextMenu")}})):h.push(t.React.createElement(R,{id:"ccbf-add",label:"Add as Favorite",action:()=>{this.FAVORITE_FRIENDS.push({id:s.id,since:Date.now()}),this.settings.set("favfriends",this.FAVORITE_FRIENDS),this.reload("ContextMenu")}}))}return l})),c.default.displayName=i})}const k=a.webpack.findByProps("push","popWithKey"),x=a.webpack.findByProps("TooltipContainer").TooltipContainer,v=a.webpack.findByDisplayName("ArrowDropDown"),N=a.webpack.findByDisplayName("ArrowDropUp"),z=n=>t.React.createElement("span",{...n,className:`${n.className||""} ${a.webpack.findByProps("editIcon").editIcon}`}),j=a.webpack.findByDisplayName("ConfirmModal"),b=a.webpack.findByDisplayName("Text"),G=a.webpack.findByDisplayName("Mention"),U=n=>k.push(()=>t.React.createElement(n)),S=()=>k.pop(),K={...a.webpack.findByProps("topSection")};var D=({header:n})=>t.React.createElement("div",{className:`ccbf-badge ${K.topSection}`},t.React.createElement(x,{className:"cssbf-star-tooltip",text:"Favorited Friend",position:"top"},t.React.createElement("div",{className:`${!n&&"ccbf-star-member"} ccbf-star`})));const V=a.webpack.find(n=>n.default?.name==="b"&&!n.default?.displayName),Q=a.webpack.findByDisplayName("MemberListItem").prototype;function H(){if(!this.settings.get("displaystar"))return;const n=e=>this.FAVORITE_FRIENDS.some(i=>i.id===e);this.injections.DisplayStar.push(g.after("renderDecorators",Q,(e,i)=>(n(i._owner.pendingProps.user?.id)&&i.props.children.unshift(t.React.createElement(D)),i))),this.injections.DisplayStar.push(g.after("default",V,([{message:e}],i)=>(n(e?.author?.id)&&i.props.children[1].props.children.push(t.React.createElement(D,{header:!0})),i)))}({...a.webpack.findByProps("privateChannelsHeaderContainer")});const{getGuild:q}=a.webpack.findByProps("getGuild"),{getUser:Z}=a.webpack.findByProps("getUser"),{getChannel:W}=a.webpack.findByProps("getChannel"),{transitionTo:J}=a.webpack.findByProps("transitionTo"),{marginBottom20:m}=a.webpack.findByProps("marginBottom20");a.webpack.find(n=>n.prototype?.toISOString);var Y=({user:n,channel:e,friend:i})=>{const c=Z(n),s=e&&W(e),l=s&&q(s.guild_id);return console.log(i),t.React.createElement(j,{red:!1,transitionState:0,header:`${c.username} Information`,cancelText:"Alright",onCancel:S,onClose:()=>{}},t.React.createElement("div",{className:"ccbf-information-modal"},!s&&t.React.createElement(b,{size:b.Sizes.SIZE_16,className:m},c.username," hasn't been seen anywhere recently."),s&&t.React.createElement(b,{size:b.Sizes.SIZE_16,className:m},c.username," was last seen in"," ",l?t.React.createElement(G,{iconType:"text",onClick:()=>{J?.(t.constants.Routes.CHANNEL(l.id,s.id)),S()}},s.name):s.recipients.length<=2?"your DMs":s.name),t.React.createElement(b,{size:b.Sizes.SIZE_16,className:m},"Favorite friend since ",new Date(i.since).toLocaleDateString()," ",new Date(i.since).toLocaleTimeString()),t.React.createElement(b,{size:b.Sizes.SIZE_16,className:m},"Joined discord on ",c.createdAt.toLocaleDateString()," ",c.createdAt.toLocaleTimeString())))};const X=a.webpack.find(n=>n.default?.displayName==="ConnectedPrivateChannelsList"),$=a.webpack.findByDisplayName("PrivateChannel").prototype;a.webpack.findByProps("getChannel"),a.webpack.findByProps("DirectMessage"),a.webpack.findByProps("getDMFromUserId");function ee(){this.expanded=!1,this.injections.FavoriteFriends.push(g.after("render",$,(n,e)=>{const i=e.props.subText?._owner?.pendingProps?.channel?.recipients?.[0];return i&&this.FAVORITE_FRIENDS.some(c=>c.id===i)&&(e.props.className.includes("ccbf-favoritefriend")||(e.props.className+=" ccbf-favoritefriend"),e.props.children=[t.React.createElement(x,{text:"User Information",position:"top"},t.React.createElement(z,{className:"ccbf-information",onClick:c=>{c.stopPropagation(),c.preventDefault();const s=this.FRIEND_DATA.lastMessageID[i];U(()=>t.React.createElement(Y,{user:i,channel:s?.channel,friend:this.FAVORITE_FRIENDS.find(l=>l.id===i)}))}})),e.props.children]),e})),X.default.displayName="ConnectedPrivateChannelsList"}const te={...a.webpack.findByProps("iconContainer")},I=a.webpack.findByProps("GuildIcon").GuildIcon;var ie=({guild:n})=>t.React.createElement(x,{text:n.name,position:"top"},t.React.createElement("div",{className:`${te.iconContainer} ccbf-icon`},t.React.createElement(I,{animate:!0,size:I.Sizes.LARGE,guild:n})));const C=a.webpack.findByDisplayName("Flex"),{Messages:F}=t.i18n,u=a.webpack.findByProps("headerCell"),ne=a.webpack.findByDisplayName("SearchBar"),w=()=>{document.querySelector(".peopleList-3c4jOR").dispatchEvent(new Event("focusin")),setTimeout(()=>document.querySelector(".peopleList-3c4jOR").dispatchEvent(new Event("focusout")))};var ae=({title:n,_this:e})=>{const[i,c]=t.React.useState(e.sortKey),[s,l]=t.React.useState(e.sortReversed),[h,d]=t.React.useState(e.searchQuery);return t.React.createElement(C,{align:C.Align.CENTER},t.React.createElement("div",{className:`ccbf-header ccbf-nameCell ${u.headerCell}`},t.React.createElement("div",{className:u.headerCellContent},n)),[{key:"usernameLower",label:F.FRIENDS_COLUMN_NAME},{key:"statusIndex",label:F.FRIENDS_COLUMN_STATUS},{key:"isFavorite",label:"Favorite"}].map(o=>t.React.createElement("div",{className:["ccbf-header ccbf-nameCell",u.headerCell,i===o.key&&u.headerCellSorted,u.clickable].join(" "),onClick:()=>{i===o.key?s?(c(""),l(!1),e.sortKey="",e.sortReversed=!1,w()):(l(!0),e.sortReversed=!0,w()):(c(o.key),l(!1),e.sortKey=o.key,e.sortReversed=!1,w())}},t.React.createElement("div",{className:u.headerCellContent},o.label,i===o.key&&s?t.React.createElement(v,{className:u.sortIcon}):t.React.createElement(N,{className:u.sortIcon})))),t.React.createElement(ne,{query:h,placeholder:"name",onChange:o=>{d(o),e.searchQuery=o,setTimeout(()=>w(),100)},onClear:()=>{d(""),e.searchQuery=""}}))};const{Messages:se}=t.i18n,{RelationshipTypes:y,StatusTypes:re}=t.constants,M=a.webpack.findByDisplayName("TabBar").prototype,oe=a.webpack.findByDisplayName("FriendRow").prototype,{getRelationships:ce}=a.webpack.findByProps("getRelationships"),{getStatus:le}=a.webpack.findByProps("getStatus"),T=a.webpack.find(n=>n.default?.displayName==="PeopleListSectionedNonLazy"),pe={online:0,streaming:1,idle:2,dnd:3,offline:4,invisible:5,unknown:6};function de(){this.sortKey="",this.sortReversed=!1,this.searchQuery="";const n=()=>{console.log(M),this.injections.FriendsList.push(g.after("render",M,(c,s)=>{if(s.props["aria-label"]!==se.FRIENDS)return s;const l=ce(),h=Object.entries(l).filter(r=>r[1]===y.FRIEND&&le(r[0])!==re.OFFLINE).length,d=Object.values(l).filter(r=>r===y.FRIEND).length,o=Object.values(l).filter(r=>r===y.PENDING_INCOMING).length,f=Object.values(l).filter(r=>r===y.PENDING_OUTGOING).length,p=Object.values(l).filter(r=>r===y.BLOCKED).length;return s.props.children.forEach(r=>{switch(r.props.id){case"ONLINE":r.props.children+=` - ${h}`;break;case"ALL":r.props.children+=` - ${d}`;break;case"PENDING":Array.isArray(r.props.children)?r.props.children[1]=null:r.props.children=[r.props.children+=" - "],r.props.children.push(t.React.createElement(x,{text:"Incoming",position:"bottom",children:t.React.createElement(v,{className:"bfl-down",height:"20"})}),o,t.React.createElement(x,{text:"Outgoing",position:"bottom",children:t.React.createElement(N,{className:"bfl-down",height:"20"})}),f);break;case"BLOCKED":r.props.children+=` - ${p}`;break}}),s}))},e=()=>{this.injections.FriendsList.push(g.after("render",oe,(c,s)=>{const l=s.props.children,h=s._owner.stateNode.props.mutualGuilds;return s.props.children=(...d)=>{const o=l(...d);return o.props.children.splice(1,0,t.React.createElement("div",{className:"ccbf-mutualGuilds ccbf-container"})),h.forEach(f=>{const p=t.React.createElement(ie,{guild:f});o.props.children[1].props.children?o.props.children[1].props.children.unshift(p):o.props.children[1].props.children=[p]}),o},s}))},i=()=>{this.injections.FriendsList.push(g.after("default",T,(c,s)=>{const l=s.props.children.props.children;return s.props.children.props.children=(...h)=>{const d=l(...h),o=d.props.children[0].props.children[0].props;return o.title=[t.React.createElement(ae,{title:o.title,_this:this})],d.props.children[0].props.children=d.props.children[0].props.children.map(f=>(f.props||(this.sortKey&&(f=f.map(p=>(p.statusIndex=pe[p.props.status],p.isFavorite=this.FAVORITE_FRIENDS.some(r=>r.id===p.key),p)),this.sortKey==="isFavorite"&&(f=f.filter(p=>p[this.sortKey])),f.sort((p,r)=>{let L=this.sortKey==="statusIndex"?p[this.sortKey]:p.props[this.sortKey],O=this.sortKey==="statusIndex"?r[this.sortKey]:r.props[this.sortKey];return L<O?-1:L>O?1:0})),this.searchQuery&&(f=f.filter(p=>p.props.usernameLower.includes(this.searchQuery))),this.sortReversed&&f.reverse()),f)),d},s})),T.default.displayName="PeopleListSectionedNonLazy"};this.settings.get("showtotal")&&n(),this.settings.get("mutualguilds")&&e(),this.settings.get("sortoptions")&&i()}function fe(){const n=({message:e})=>{this.FAVORITE_FRIENDS.some(i=>i.id===e.author.id)&&(this.FRIEND_DATA.lastMessageID[e.author.id]={id:e.id,channel:e.channel_id})};this.injections.InformationModal.push(()=>t.FluxDispatcher.unsubscribe("MESSAGE_CREATE",n)),this.settings.get("infomodal")?t.FluxDispatcher.subscribe("MESSAGE_CREATE",n):t.FluxDispatcher.unsubscribe("MESSAGE_CREATE",n)}var he={ContextMenu:P,DisplayStar:H,InformationModal:fe,FavoriteFriends:ee,FriendsList:de},be=()=>cumcord.patcher.injectCSS(`.ccbf-friend{margin:6px;width:32px;height:32px;float:left;border-radius:360px}.ccbf-favoritefriend>.layout-2DM8Md>.children-gzQq2t{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.ccbf-favoritefriend>.layout-2DM8Md>.children-gzQq2t [aria-label="User Information"]{margin:0 5px}.ccbf-friend-name{color:#fff;float:left;font-family:"Whitney","Helvetica Neue","Helvetica","Arial",sans-serif;font-weight:700;margin-left:8px;font-size:20px}.ccbf-friend-discrim{color:#fff9;float:left;font-family:"Whitney","Helvetica Neue","Helvetica","Arial",sans-serif;font-size:16px;position:relative;top:4px;padding-right:6px}.ccbf-friend-discrim.ccbf-friend-discrim:before{content:"#"}.ccbf-friend-name,.ccbf-friend-discrim{margin-top:8px}.ccbf-star{display:inline;position:relative;top:6px;margin-left:5px;padding-right:5px;padding-left:5px;background:url(https://cdn.discordapp.com/attachments/770304534203334678/891085095459512340/e4d52f4d69d7bba67e5fd70ffe26b70d.png) no-repeat;background-size:10px 10px}.ccbf-star-member{margin-left:4px}.ccbf-badge,.ccbf-badge.topSectionNormal-2-vo2m{background:none;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.ccbf-badge~.botTagRegular-2HEhHi{margin-left:8px}.privateChannels-1nO12o .ccbf-badge,.badges>.ccbf-badge{height:20px!important;width:auto!important}.ccbf-information{left:82%;display:none;opacity:.4}.ccbf-fav-friends-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.ccbf-expand-fav-friends{margin-left:auto;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ccbf-expand-fav-friends.expanded{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ccbf-information:hover{opacity:.9}.channel-2QD9_O:hover .ccbf-information{display:block}.ccbf-user-settings{width:auto!important;margin-bottom:32px;border-radius:5px;padding:10px 10px 0}.ccbf-friend-item{padding:6px 6px 6px 18px;margin-top:4px;margin-bottom:4px;height:auto}.ccbf-notification-sounds{width:auto!important;padding-bottom:64px}.ccbf-notification-sounds-icon{background:url(https://canary.discordapp.com/assets/f9b93aa0d9985bd2b678da58ed0d75d2.svg) 50% no-repeat!important;width:auto;height:auto}.ccbf-notification-sounds>div>div>div>.divider-3573oO.marginTop20-3TxNs6{display:none}.searchBar-2_Yu-C{width:100%}html body .ccbf-ff-header{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;-webkit-box-align:center;-ms-flex-align:center;align-items:center}html body .ccbf-ff-header svg{margin-right:5px;-webkit-transition:.2s;transition:.2s;width:18px;height:18px;-webkit-transform-origin:50% 50%;transform-origin:50% 50%}html body .ccbf-ff-header.opened svg{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ccbf-status-userinline{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;display:-webkit-box;display:-ms-flexbox;display:flex}.ccbf-status-popup{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background-color:#212121}.ccbf-status-popup .header{background-color:transparent;-webkit-box-shadow:none;box-shadow:none;padding:0;position:absolute;top:8px;right:8px}.ccbf-status-popup .header>span{display:none}.ccbf-status-popup .contents{padding:0}.ccbf-status-popup .contents .inner{background-color:transparent;border:none;padding-bottom:0;margin-bottom:2px}.ccbf-status-popup-text{color:#fff;font-weight:600;margin-right:8px}.pc-scroller{max-height:300px}.ccbf-container{-webkit-box-sizing:border-box;box-sizing:border-box;text-overflow:ellipsis;white-space:nowrap;text-transform:uppercase;font-size:12px;line-height:16px;font-weight:600;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;color:var(--channels-default)}.ccbf-mutualGuilds{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;margin-right:15px;margin-bottom:10px;position:inherit}.ccbf-mutualGuilds .icon-3o6xvg{border-radius:12px}.ccbf-mutualGuilds>div{margin-right:-5px}.ccbf-header{border-left:2px solid var(--background-modifier-accent);-webkit-box-sizing:border-box;box-sizing:border-box}.headerCellContent-1pLtOr{margin:auto}.ccbf-nameCell{width:-webkit-min-content;width:-moz-min-content;width:min-content;padding:0 30px}@media screen and (max-width: 975px){.ccbf-nameCell{padding:0 10px}}@media screen and (min-width: 1200px){.ccbf-nameCell{padding:0 10px}}@media screen and (min-width: 1400px){.ccbf-nameCell{padding:0 30px}}@media screen and (min-width: 1500px){.ccbf-nameCell{padding:0 40px}}.ccbf-icon>div{height:30px;width:30px;line-height:32px!important;font-size:14px!important}
`);const ue=[["favfriends",[]],["notifsounds",{}],["infomodal",!0],["displaystar",!0],["statuspopup",!0],["showtotal",!0],["mutualguilds",!0],["sortoptions",!0]];class ge{constructor(e){this.settings=new xe(e),this.FRIEND_DATA={statusStorage:{},lastMessageID:{}},this.FAVORITE_FRIENDS=this.settings.get("favfriends")||[],this.MODULES=he,this.injections={},this.css=null}onLoad(){this.settings.get("favfriends")||ue.forEach(e=>this.settings.set(e[0],e[1])),this.css=be(),Object.keys(this.MODULES).forEach(e=>{this.MODULES[e]=this.MODULES[e].bind(this),this.injections[e]=[]}),E.log(this.injections),this.load()}onUnload(){this.unload(),this.css?.(),E.log("bye")}load(e){e?this.MODULES[e]():Object.keys(this.MODULES).forEach(i=>{this.MODULES[i]()})}unload(e){e?this.injections[e].forEach(i=>i()):Object.keys(this.MODULES).forEach(i=>{this.injections[i].forEach(c=>c())})}reload(e){e?(this.unload(e),this.load(e)):(this.unload(),this.load())}}class xe{constructor(e){this.persist=e}get(e){return this.persist.ghost[e]}set(e,i){this.persist.store[e]=i}}var ye=({persist:n})=>new ge(n);return ye})(cumcord.utils.logger,cumcord.modules,cumcord.modules.common,cumcord.patcher,cumcord.utils);
