(this["webpackJsonptalbot-racing"]=this["webpackJsonptalbot-racing"]||[]).push([[0],{29:function(e,t,a){e.exports=a.p+"static/media/logo.8dd30f00.png"},33:function(e,t,a){e.exports=a(47)},38:function(e,t,a){},39:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),c=a.n(l),o=(a(38),a(20)),i=a(10),u=(a(39),a(26)),s=a(21),m=a(29),d=a.n(m),h=a(14),p=a(15),E=a(16),b=a(18),f=function(e){Object(b.a)(a,e);var t=Object(E.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"this page is under consrtuction"))}}]),a}(r.a.PureComponent),g=function(e){Object(b.a)(a,e);var t=Object(E.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).getWeather=function(){fetch("https://api.climacell.co/v3/weather/realtime?lat=43.292660&lon=-81.717686&unit_system=us&fields=temp,dewpoint,wind_speed,wind_gust,baro_pressure,humidity,wind_direction",{method:"GET",headers:{"Content-Type":"application/JSON","Content-Encoding":"gzip",apikey:"IBoiXSHtYCB6Z5lPWXS6y74W9aPjqvdD"}}).then((function(e){200===e.status&&e.json().then((function(e){n.setState({data:e})}))}))},n.buildWeatherTable=function(){var e=n.state.data,t=[];for(var a in e)"lat"!==a&&"lon"!==a&&"observation_time"!==a&&t.push(r.a.createElement("tr",{key:a},r.a.createElement("td",null,a),r.a.createElement("td",null,e[a].value+" "+e[a].units)));return t},n.state={data:null},n.getWeather(),n}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Grand Bend Motorplex"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Data"),r.a.createElement("th",null,"Measurement"))),r.a.createElement("tbody",null,this.buildWeatherTable())))}}]),a}(r.a.PureComponent),v=function(){return r.a.createElement(o.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(u.a,{bg:"primary",variant:"dark"},r.a.createElement(u.a.Brand,{href:"/"},r.a.createElement("img",{alt:"",src:d.a,width:"30",height:"30",className:"d-inline-block align-top"})),r.a.createElement(s.a,{className:"mr-auto"},r.a.createElement(s.a.Link,{as:o.b,to:"/add-pass",href:"/add-pass"},"Add Pass"),r.a.createElement(s.a.Link,{as:o.b,to:"/weather",href:"/weather"},"Weather")))),r.a.createElement("body",null,r.a.createElement(i.a,{path:"/",exact:!0,component:f}),r.a.createElement(i.a,{path:"/weather",exact:!0,component:g}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.8597796d.chunk.js.map