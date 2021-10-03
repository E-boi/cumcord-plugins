(function(l,K,R,e){"use strict";const M=l.webpack.findByProps("push","popWithKey"),F=t=>M.push(()=>e.React.createElement(t)),z=()=>M.pop(),f=l.webpack.findByDisplayName("DeprecatedModal");l.webpack.findByDisplayName("Text");const _=l.webpack.find(t=>t.DropdownSizes),C=l.webpack.findByDisplayName("Spinner"),q="https://raw.githubusercontent.com/E-boi/assets/main/star.svg",P="https://raw.githubusercontent.com/E-boi/assets/main/ghfork.svg",H="https://raw.githubusercontent.com/E-boi/assets/main/folder.svg",O="https://raw.githubusercontent.com/E-boi/assets/main/ghfile.svg",E=l.webpack.findByDisplayName("Arrow"),W=l.webpack.findByProps("parse","parseTopic");var U=({file:t,path:a})=>e.React.createElement("div",null,e.React.createElement("div",{className:"Gpath"},e.React.createElement("p",null,`/${a}`)),t.isImage?e.React.createElement("div",{className:"Gimg scrollbarGhostHairline-1mSOM1"},e.React.createElement("img",{src:`data:${t.type};base64,${t.content}`})):W.defaultRules.codeBlock.react({content:t.content,lang:t.type},null,{})),B=({dir:t,onClick:a,path:i})=>e.React.createElement("div",{className:i?"Gin-folder":"Gout-folder"},i&&e.React.createElement("div",{className:"Gpath"},e.React.createElement("p",null,`/${i}`)),t?.map(r=>e.React.createElement("p",{className:r.type==="dir"?"Gfolder":`Gfile ${r.name.split(".")[r.name.split(".").length-1]} ${r.name.includes(".")?"":"blank"}`},r.type==="dir"?[e.React.createElement("img",{src:H,height:16,width:16}),e.React.createElement("a",{onClick:()=>a(r.path,"folder")},r.name)]:[e.React.createElement("img",{src:O,height:16,width:16}),e.React.createElement("a",{onClick:()=>a(r.name,"file")},r.name)])));const G={divider:l.webpack.findByPropsAll("divider")[1].divider,dividerDefault:l.webpack.findByProps("dividerDefault").dividerDefault};var L=({className:t})=>e.React.createElement("div",{className:`${G.divider} ${G.dividerDefault} ${t}`});const J=l.webpack.findByDisplayName("FormItem"),Q=l.webpack.findByDisplayName("SelectTempWrapper"),k={...l.webpack.findByProps("marginBottom20")};var V=t=>{const a=t.children;return delete t.children,e.React.createElement(J,{title:a,className:k.marginBottom20,required:t.required},e.React.createElement(Q,{...t}),e.React.createElement(L,{className:[k.marginTop20,k.marginBottom20].join(" ")}))};const $={...l.webpack.findByProps("emptyStateImage","emptyStateSubtext")},X=["png","jpg"];var Y=({url:t,key:a})=>{const[i,r]=e.React.useState(),[o,g]=e.React.useState(),[c,b]=e.React.useState(),[s,x]=e.React.useState(),[y,pe]=e.React.useState(),[h,Z]=e.React.useState(),[u,de]=e.React.useState();o||ae(t,a).then(n=>{Z(n.default_branch),g(n)}).catch(n=>de(n.message)),o&&!i&&N(t,h,a).then(n=>r(n)),y||te(t,a).then(n=>pe(n));let m;if(c&&!s){const n=c[0]?.path.split("/");m=c[0].path.replace(`/${n[n.length-1]}`,"")}else s&&(m=s.path);return e.React.createElement(f,{className:`githubModel ${s?"infile":""}`},e.React.createElement(f.Header,null,e.React.createElement("a",{className:"repo-name",href:o?.html_urk||`https://github.com/${t}`,target:"_blank"},o?.name||t),o&&e.React.createElement("a",{className:"star-svg",href:`${o.html_url}/stargazers`,target:"_blank"},e.React.createElement("img",{src:q}),e.React.createElement("p",null,o.stargazers_count)),c&&!s&&e.React.createElement("div",{className:"back-outfile",onClick:()=>{const n=ee(c);n||b(null),v(t,n,h,a).then(p=>b(p))}},e.React.createElement(E,{direction:"LEFT"})),s&&e.React.createElement("div",{className:"back-outfile",onClick:()=>x(null)},e.React.createElement(E,{direction:"LEFT"})),y&&e.React.createElement(V,{className:"Gbranches",value:h,onChange:({value:n})=>{h!==n&&(b(null),x(null),Z(n),N(t,n,a).then(p=>r(p)))},options:y.map(n=>({label:n.name,value:n.name}))})),e.React.createElement(f.Content,null,u&&e.React.createElement("div",{className:"Gerror"},e.React.createElement("div",{className:$.emptyStateImage}),e.React.createElement("p",{className:`Gerror-text ${$.emptyStateSubtext}`},u)),!o&&!u&&e.React.createElement("p",{className:"Gfetching"},"Getting repo",e.React.createElement(C,{type:"wanderingCubes"})),i&&!c&&!u&&!s&&e.React.createElement(B,{dir:i,onClick:(n,p)=>p==="folder"?v(t,n,h,a).then(d=>b(d)):A(i,n).then(d=>x(d))}),c&&!u&&!s&&e.React.createElement(B,{dir:c,onClick:(n,p)=>p==="folder"?v(t,n,h,a).then(d=>b(d)):A(c,n).then(d=>x(d)),path:m}),s&&!u&&e.React.createElement(U,{file:s,path:m})),e.React.createElement(f.Footer,null,e.React.createElement(_,{onClick:()=>z()},"Close"),o&&e.React.createElement("div",{className:"repo-info"},e.React.createElement("a",{className:"owner-profile",href:o.owner.html_url,target:"_blank"},e.React.createElement("img",{height:32,width:32,src:o.owner.avatar_url}),e.React.createElement("p",null,o.owner.login)),e.React.createElement("a",{className:"fork-svg",href:`${o.html_url}/network/members`,target:"_blank"},e.React.createElement("img",{src:P}),e.React.createElement("p",null,o.forks)))))};function ee(t){const a=t[0].path.split("/");if(a.length!==2)return t[0].path.replace(`/${a[a.length-2]}/${a[a.length-1]}`,"")}async function te(t,a){const i=await fetch(`https://api.github.com/repos/${t}/branches?per_page=100`,{headers:a&&{Authorization:`token ${a}`}});return i.ok?await i.json():void 0}async function ae(t,a){const i=await fetch(`https://api.github.com/repos/${t}`,{headers:a&&{Authorization:`token ${a}`}});if(!i.ok)throw Error((await i.json()).message);return await i.json()}async function N(t,a,i){const r=await fetch(`https://api.github.com/repos/${t}/contents?ref=${a}`,{headers:i&&{Authorization:`token ${i}`}});return r.ok?await r.json():void 0}async function v(t,a,i,r){const o=await fetch(`https://api.github.com/repos/${t}/contents/${a}?ref=${i}`,{headers:r&&{Authorization:`token ${r}`}});return o.ok?await o.json():void 0}async function A(t,a){const i=t.filter(c=>c.type==="file"&&c.name===a),r=a.split(".");if(i.length===0)return;const g=await(await fetch(i[0].download_url)).text();return{path:i[0].path,content:g,type:r[r.length-1],isImage:X[r[r.length-1]]}}var re=()=>cumcord.patcher.injectCSS(`.infile{height:700px!important;width:800px!important}.infile .content-1LAB8Z{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.infile .hljs{padding:0!important}.infile .hljs .powercord-codeblock-table{margin-left:7px}.infile .hljs .powercord-codeblock-lang{padding:4px;font-size:12px}.infile .hljs .powercord-codeblock-copy-btn{position:absolute;height:20px;opacity:1;top:29px}.infile .hljs .powercord-codeblock-copy-btn:hover{background-color:var(--background-primary)}.Gpath{margin:0!important;height:25px}.Gpath p{position:absolute;padding-left:10px;left:0;top:-6px}.githubModel{border-radius:10px;width:700px;height:450px}.githubModel .header-1TKi98{border-bottom:solid 2px var(--background-secondary);-webkit-box-shadow:none!important;box-shadow:none!important;color:var(--text-normal);padding:0 0 0 10px;border-radius:0;overflow:unset;height:60px}.githubModel .header-1TKi98 .back-outfile{background-color:#0000001a;border:solid 1px rgba(32,34,37,.5);border-radius:7px;position:absolute;padding:6px 10px;right:317px}.githubModel .header-1TKi98 .back-outfile:hover{background-color:var(--background-tertiary);cursor:pointer}.githubModel .header-1TKi98 .repo-name{color:var(--text-normal);text-transform:capitalize;font-size:24px;margin:0}.githubModel .header-1TKi98 .repo-name:hover{text-decoration:underline;cursor:pointer}.githubModel .header-1TKi98 .star-svg{color:var(--text-normal);border-left:solid 1px rgba(255,255,255,.1);position:relative;margin-left:8px;padding-left:8px;display:-webkit-box;display:-ms-flexbox;display:flex;height:25px;bottom:2px}.githubModel .header-1TKi98 .star-svg img{fill:var(--text-normal);position:relative;height:20px;top:4px}.githubModel .header-1TKi98 .star-svg p{position:relative;font-size:18px;bottom:9px;left:5px}.githubModel .header-1TKi98 .star-svg p:hover{text-decoration:underline;cursor:pointer}.githubModel .header-1TKi98 .marginBottom20-32qID7{position:absolute;width:300px;right:10px;margin:0}.githubModel .header-1TKi98 .marginBottom20-32qID7 .css-gvi9bl-control{border-radius:7px}.githubModel .header-1TKi98 .marginBottom20-32qID7 .divider-3573oO,.githubModel .header-1TKi98 .marginBottom20-32qID7 .css-o3gndj-placeholder{display:none}.githubModel .header-1TKi98 .marginBottom20-32qID7 .css-6fzn47-control{border-radius:7px}.githubModel .header-1TKi98 .marginBottom20-32qID7 .css-3vaxre-menu{margin-top:7px!important;border-radius:7px}.githubModel .header-1TKi98 .marginBottom20-32qID7 .css-3vaxre-menu ::-webkit-scrollbar{display:none}.githubModel .header-1TKi98 .marginBottom20-32qID7:hover{cursor:pointer}.githubModel .content-1LAB8Z{border-radius:0;padding:0}.githubModel .content-1LAB8Z .Gimg{overflow-x:auto}.githubModel .content-1LAB8Z .Gerror{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.githubModel .content-1LAB8Z .Gerror div{margin-top:20px;margin-bottom:20px}.githubModel .content-1LAB8Z .Gfetching{display:-ms-grid;display:grid;-ms-grid-rows:2rem;grid-template-rows:2rem;text-align:center;color:var(--text-normal)}.githubModel .content-1LAB8Z .Gpath{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:var(--text-normal);margin-top:7px;padding-bottom:7px;border-bottom:solid 2px var(--background-secondary)}.githubModel .content-1LAB8Z .Gback-button{margin-bottom:12px;margin-top:-11px}.githubModel .content-1LAB8Z .Gback-button img{padding:3px 10px 0;position:relative;height:20px;width:20px;top:3px}.githubModel .content-1LAB8Z .Gback-button a{background-color:var(--background-secondary);color:var(--text-normal);border-radius:7px;padding:5px 20px}.githubModel .content-1LAB8Z .Gback-button a:hover{background-color:var(--background-tertiary)}.githubModel .content-1LAB8Z .Gfile,.githubModel .content-1LAB8Z .Gfolder{border-top:solid 1px var(--background-secondary);padding:10px 0 0 10px;margin:10px 0}.githubModel .content-1LAB8Z .Gfile a,.githubModel .content-1LAB8Z .Gfolder a{color:var(--text-normal);padding-left:7px}.githubModel .content-1LAB8Z .Gfile a:hover,.githubModel .content-1LAB8Z .Gfolder a:hover{text-decoration:underline;color:var(--text-link)}.githubModel .content-1LAB8Z .Gfile img,.githubModel .content-1LAB8Z .Gfolder img{position:relative;top:2px}.githubModel .content-1LAB8Z::-webkit-scrollbar{display:none}.githubModel .content-1LAB8Z .Gin-folder .Gback-button{margin-bottom:13px!important;padding-top:14px}.githubModel .footer-2gL1pp{border-top:solid 2px var(--background-secondary-alt);border-radius:0 0 7px 7px;overflow:unset;height:57px;padding:0}.githubModel .footer-2gL1pp .button-38aScr{background-color:var(--background-tertiary);border-radius:7px;position:absolute;width:40%;right:6px;top:10px}.githubModel .footer-2gL1pp .button-38aScr:hover{background-color:var(--background-primary)}.githubModel .footer-2gL1pp .repo-info{color:var(--text-normal);position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;left:10px;width:57.5%}.githubModel .footer-2gL1pp .owner-profile{color:var(--text-normal);position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;top:7px}.githubModel .footer-2gL1pp .owner-profile img{border-radius:5px;height:40px;width:40px}.githubModel .footer-2gL1pp .owner-profile p{text-transform:capitalize;padding:11px 0 0 8px;font-size:18px;margin:0}.githubModel .footer-2gL1pp .owner-profile p:hover{text-decoration:underline;cursor:pointer}.githubModel .footer-2gL1pp .fork-svg{color:var(--text-normal);padding:18px 4px 0 0;position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;right:4px}.githubModel .footer-2gL1pp .fork-svg p{padding-left:4px;font-size:20px;margin:0}.githubModel .footer-2gL1pp .fork-svg p:hover{text-decoration:underline;cursor:pointer}.githubModel .footer-2gL1pp .fork-svg img{fill:var(--text-normal);height:20px}
`);const ie=l.webpack.findByDisplayName("TextInput"),ne=l.webpack.findByDisplayName("FormItem"),w={...l.webpack.findByProps("marginBottom20")};var oe=t=>{const a=t.children;return delete t.children,e.React.createElement(ne,{title:a,required:t.required,className:w.marginBottom20},e.React.createElement(ie,{...t}),e.React.createElement(L,{className:[w.marginTop20,w.marginBottom20].join(" ")}))},le=({persist:t})=>(R.useNest(t),e.React.createElement("div",null,e.React.createElement(oe,{value:t.ghost.apikey,onChange:a=>t.store.apikey=a},"Api key"),e.React.createElement("p",null,e.React.createElement("a",{href:"https://github.com/settings/tokens/new?description=GitHub%20in%20Discord&scopes=public_repo",target:"_blank"},"Make a token (just scroll down and click generate token and copy and paste the token)"))));const T=l.webpack.findByProps("MenuGroup","MenuItem"),I=l.webpack.find(t=>t.default?.displayName==="MessageContextMenu"),j=/^https?:\/\/(www.)?github.com\/[\w-]+\/[\w-]+\/?/;let D,S;var ce=({persist:t})=>({onLoad(){S=re(),D=K.after("default",I,([{message:a,target:i}],r)=>{if(!a.content.includes("https://github.com/")||!a.content.includes("https://github.com/"))return;const o=i.href?.match(j)?.[0]||se(a.content);if(o.split("/").length<5)return r;R.findInReactTree(r,g=>g?.props?.id==="githubModal")||r.props.children.splice(4,0,e.React.createElement(T.MenuGroup,null,e.React.createElement(T.MenuItem,{action:()=>F(()=>e.React.createElement(Y,{url:`${o.split("/")[3]}/${o.split("/")[4]}`,key:t.ghost.apikey})),id:"githubModal",label:"Open"})))}),I.default.displayName="MessageContextMenu"},onUnload(){S?.(),D?.()},settings:e.React.createElement(le,{persist:t})});function se(t){return t.replace("tree","blob").replace(/(?:\n|<|>|\*|_|`)/g," ").split(" ").filter(i=>i.match(j))[0]}return ce})(cumcord.modules,cumcord.patcher,cumcord.utils,cumcord.modules.common);