/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Sep 5 10:30
*/
KISSY.add("resizable",function(r,g,s,h,t){function n(a){var a=a.newVal,e=this.dds,f=this.get("node");this.destroy();for(b=0;b<a.length;b++){var c=a[b],d=o("<div class='"+p+" "+p+"-"+c+"'></div>").prependTo(f,t),c=e[c]=new u({node:d,cursor:null});c.on("drag",v,this);c.on("dragstart",w,this)}}function w(){var a=this.get("node");this._width=a.width();this._top=parseInt(a.css("top"));this._left=parseInt(a.css("left"));this._height=a.height()}function v(a){var e=this.get("node"),f=a.target,c;a:{c=this.dds;
for(var d in c)if(c[d]==f){c=d;break a}c=0}d=this._width;var x=this._height,l=this.get("minWidth"),i=this.get("maxWidth"),j=this.get("minHeight"),g=this.get("maxHeight"),h=a.top-f.get("startNodePos").top,a=a.left-f.get("startNodePos").left,a=k[c](l,i,j,g,this._top,this._left,d,x,h,a),f=["width","height","top","left"];for(b=0;b<f.length;b++)a[b]&&e.css(f[b],a[b])}function m(a){var e;m.superclass.constructor.apply(this,arguments);this.on("afterHandlersChange",n,this);e=this.get("node");this.dds={};
"static"==e.css("position")&&e.css("position","relative");n.call(this,{newVal:this.get("handlers")})}var o=g.all,b,u=h.Draggable,p="ks-resizable-handler",h=["l","r"],q=["t","b"],k={t:function(a,e,b,c,d,g,l,i,j){a=Math.min(Math.max(b,i-j),c);return[0,a,d+i-a,0]},b:function(a,e,b,c,d,g,l,i,j){return[0,Math.min(Math.max(b,i+j),c),0,0]},r:function(a,b,f,c,d,g,l,i,j,h){return[Math.min(Math.max(a,l+h),b),0,0,0]},l:function(a,b,f,c,d,g,h,i,j,k){a=Math.min(Math.max(a,h-k),b);return[a,0,0,g+h-a]}};for(b=0;b<
h.length;b++)for(g=0;g<q.length;g++)(function(a,e){k[a+e]=k[e+a]=function(){var f=k[a].apply(this,arguments),c=k[e].apply(this,arguments),d=[];for(b=0;b<f.length;b++)d[b]=f[b]||c[b];return d}})(h[b],q[g]);r.extend(m,s,{destroy:function(){var a=this.dds,b;for(b in a)a.hasOwnProperty(b)&&(a[b].destroy(),a[b].get("node").remove(),delete a[b])}},{ATTRS:{node:{setter:function(a){return o(a)}},minWidth:{value:0},minHeight:{value:0},maxWidth:{value:Number.MAX_VALUE},maxHeight:{value:Number.MAX_VALUE},handlers:{value:[]}}});
return m},{requires:["node","base","dd"]});