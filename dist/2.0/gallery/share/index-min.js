KISSY.add("brix/gallery/share/index",function(e,t){function i(){i.superclass.constructor.apply(this,arguments)}return i.ATTRS={name:{value:"Share"},isFord:{value:!1},hasTips:{value:""}},i.METHODS={clearTimer:function(e){e.timer&&(clearTimeout(e.timer),e.timer=0)},turn:function(e,t,i,a,n,r,o){"Function"==typeof r&&r(),"animate"==t?e.animate(o,i,a,n):e[t](i,n,a)},unfold:function(e){var t=this;"popup"==t.get("type")?t.show(e):t.expand(e)},fold:function(e){var t=this;"popup"==t.get("type")?t.hide(e):t.shrink(e)},expand:function(t){var i=e.all,a=this,n=a.get("el"),r=i(".ext",n),o=i(".icon-arrow",n),s={width:"toggle"};r.hasClass("ext-v")&&(s={height:"toggle"}),a.turn(r,"animate",.3,"easeOut",function(){t(),o.filter(".icon-arrow-l").html("&#402;"),o.filter(".icon-arrow-r").html("&#403;"),o.filter(".icon-arrow-d").html("&#404;")},void 0,s)},shrink:function(t){var i=e.all,a=this,n=a.get("el"),r=i(".ext",n),o=i(".icon-arrow",n),s={width:"toggle"};r.hasClass("ext-v")&&(s={height:"toggle"}),a.turn(r,"animate",.3,"easeIn",function(){t(),o.filter(".icon-arrow-l").html("&#403;"),o.filter(".icon-arrow-r").html("&#402;"),o.filter(".icon-arrow-d").html("&#405;")},void 0,s)},show:function(t){var i=e.all,a=this,n=a.get("el"),r=" popup-share-active",o=e.one(".panel-popup",n);i(n).addClass(r),a.turn(o,"fadeIn",.3,"easeOut",t)},hide:function(t){var i=e.all,a=this,n=a.get("el"),r="popup-share-active",o=e.one(".panel-popup",n);a.turn(o,"fadeOut",.3,"easeIn",function(){t(),i(n).removeClass(r)})},showTips:function(t,i){var a=this,n=e.one(".tips",t),r=e.one(".angle",n),o=t.offset().left+Math.round(t.outerWidth()/2),s=Math.round((n.width()+n.outerWidth())/2),l={"margin-left":0-s+"px"},c=3;n&&(n.hasClass("tips-up")&&(c>o-s&&(l={"margin-left":0-(o-c)+"px"},0==t.offset().left?n.hasClass(".tips-up-left")||n.addClass(".tips-up-left"):r.css({"margin-left":o-s-c-5+"px"})),o+s+c>=e.DOM.viewportWidth()&&(l={"margin-left":0-(s+o+s+c-e.DOM.viewportWidth())+"px"},t.offset().left+t.outerWidth()+c>=e.DOM.viewportWidth()?(n.hasClass(".tips-up-right")||n.addClass(".tips-up-right"),r.css({left:s+Math.floor(n.width()/2)-3+"px"})):r.css({"margin-left":o+s+c-e.DOM.viewportWidth()-5+"px"})),n.css(l)),a.turn(n,"fadeIn",.3,"easeNone",i))},hideTips:function(t,i){var a=this,n=e.one(".tips",t);n&&a.turn(n,"fadeOut",.3,"easeNone",i)}},i.EVENTS={"":{mouseenter:function(){e.all;var t=this,i=t.get("isFord"),a=t.dispatcher,n=300;a&&t.clearTimer(a),i||(a.timer=setTimeout(function(){t.unfold(function(){t.set("isFord",!0)})},n))},mouseleave:function(){e.all;var t=this,i=t.get("isFord"),a=t.dispatcher,n=300;a&&t.clearTimer(a),i&&(a.timer=setTimeout(function(){t.fold(function(){t.set("isFord",!1)})},n))}},".btn-share":{mouseenter:function(t){var i=e.all,a=this,n=300,r=t.currentTarget.dispatcher,o=i(t.currentTarget);a.clearTimer(r),r.isTipsShow&&(r.timer=setTimeout(function(){a.get("hastips")&&(i(".btn-share",a.get("el")).each(function(e){e.children(".tips").hide(),e[0].dispatcher.isTipsShow=!0}),a.showTips(o,function(){r.isTipsShow=!1}))},n))},mouseleave:function(t){var i=e.all,a=this,n=300,r=t.currentTarget.dispatcher,o=i(t.currentTarget);a.clearTimer(r),r.isTipsShow||(r.timer=setTimeout(function(){a.get("hastips")&&a.hideTips(o,function(){r.isTipsShow=!0})},n))}}},e.extend(i,t,{initialize:function(){var t=e.all,i=this;i.dispatcher={timer:0},t(".btn-share",i.get("el")).each(function(e){e[0].dispatcher={isTipsShow:!0,timer:0}})}}),e.augment(i,i.METHODS),i},{requires:["brix/core/brick"]});