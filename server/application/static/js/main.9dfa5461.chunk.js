(this.webpackJsonpwebsite=this.webpackJsonpwebsite||[]).push([[0],{59:function(e,t,c){"use strict";c.r(t);var s=c(0),n=c.n(s),a=c(26),i=c.n(a),r=c(6),l=c(12),o=c.n(l),d=(c(52),c(61)),j=c(62),u=c(63),b=c(29),m=c(1);function h(e){var t=e.playlist,c=e.setSelected,s=e.setTotal;return Object(m.jsxs)("div",{className:"d-flex align-items-center",style:{border:"2px solid #dedede",borderRadius:"5px",padding:"10px",backgroundColor:"#f1f1f1",minWidth:"20rem",maxWidth:"20rem"},children:[Object(m.jsx)("img",{src:t.image,style:{height:"64px"},alt:"somthinf"}),Object(m.jsxs)("div",{className:"ml-2",children:[Object(m.jsx)("div",{children:t.name}),Object(m.jsx)("div",{className:"text-muted",children:t.owner})]}),Object(m.jsx)("input",{type:"checkbox",onClick:function(e){c((function(c){return e.target.checked?[].concat(Object(b.a)(c),[t.id]):c.filter((function(e){return e!==t.id}))})),s((function(c){return e.target.checked?c+t.total_tracks:c-t.total_tracks}))}})]})}function O(e){var t=e.selected,c=e.total;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("ul",{className:"list-group",children:[Object(m.jsxs)("li",{className:"list-group-item list-group-item-light",children:["Playlists: ",t.length]}),Object(m.jsxs)("li",{className:"list-group-item list-group-item-light",children:["Total Songs: ",c]})]}),Object(m.jsx)("div",{className:"d-flex align-content-center justify-content-center",style:{marginTop:"1rem"},children:Object(m.jsx)("button",{className:"btn btn-primary",children:" Done "})})]})}function x(e){var t=e.spotify,c=(e.dezzers,Object(s.useState)([])),n=Object(r.a)(c,2),a=n[0],i=n[1],l=Object(s.useState)([]),b=Object(r.a)(l,2),x=b[0],p=b[1],f=Object(s.useState)(0),g=Object(r.a)(f,2),y=g[0],k=g[1];return Object(s.useEffect)((function(){t&&o.a.get("https://api.spotify.com/v1/me/playlists",{params:{access_token:t}}).then((function(e){console.log(e.data),i(e.data.items.map((function(e){return{id:e.uri,name:e.name,image:e.images[0].url,owner:e.owner.display_name,description:e.description,total_tracks:e.tracks.total}})))})).catch((function(e){return console.log(e)}))}),[t]),Object(m.jsx)(d.a,{fluid:!0,style:{marginTop:"1rem",marginBottom:"1rem"},children:Object(m.jsxs)(j.a,{children:[Object(m.jsxs)(u.a,{xs:10,md:8,children:[Object(m.jsx)("h1",{className:"text-center border-bottom mb-8",children:"Your playlists"}),Object(m.jsx)(j.a,{children:a.map((function(e){return Object(m.jsx)(u.a,{style:{margin:"5px"},children:Object(m.jsx)(h,{playlist:e,setSelected:p,setTotal:k},e.id)})}))})]}),Object(m.jsx)(u.a,{md:3,children:Object(m.jsx)(O,{selected:x,total:y},1)})]})})}var p=function(){var e=Object(s.useState)(""),t=Object(r.a)(e,2),c=t[0],n=t[1],a=Object(s.useState)(""),i=Object(r.a)(a,2),l=i[0],d=i[1];return Object(s.useEffect)((function(){o.a.get("/test").then((function(e){n(e.data.spotify),d(e.data.dezzers)})).catch((function(e){return console.log(e)}))}),[]),Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(x,{spotify:c,dezzers:l},"helo")})},f=c(28);i.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(f.a,{children:Object(m.jsx)(p,{})})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.9dfa5461.chunk.js.map