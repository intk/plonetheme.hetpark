/* This is a bundle that uses RequireJS to pull in dependencies.
   These dependencies are defined in the registry.xml file */

/* do not include jquery multiple times */
if (window.jQuery) {
  define('jquery', [], function() {
    return window.jQuery;
  });
}

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);

/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2014 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

var define_backup = define;
define = undefined;

/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return-1==n.indexOf(t)&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return-1!=n&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=0,o=i[n];t=t||[];for(var r=this._onceEvents&&this._onceEvents[e];o;){var s=r&&r[o];s&&(this.off(e,o),delete r[o]),o.apply(this,t),n+=s?0:1,o=i[n]}return this}},t.allOff=t.removeAllListeners=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){var t=[];if(Array.isArray(e))t=e;else if("number"==typeof e.length)for(var i=0;i<e.length;i++)t.push(e[i]);else t.push(e);return t}function o(e,t,r){return this instanceof o?("string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=n(e),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(e,t,r)}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&d[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});

/*"use strict";!function(t){var i,n;i=function(){function i(i,n){var o;this.options=n,this.$element=t(i),this.didInit=!1,o=this,this.$element.on("click.slickLightbox",this.options.itemSelector,function(i){var n,e;if(i.preventDefault(),n=t(this),n.blur(),"function"!=typeof o.options.shouldOpen||o.options.shouldOpen(o,n,i))return e=o.$element.find(o.options.itemSelector),o.elementIsSlick()&&(e=o.filterOutSlickClones(e),n=o.handlePossibleCloneClick(n,e)),o.init(e.index(n))})}return i.prototype.init=function(t){return this.didInit=!0,this.detectIE(),this.createModal(),this.bindEvents(),this.initSlick(t),this.open()},i.prototype.createModalItems=function(){var i,n,o,e,s,l;return e=this.options.lazyPlaceholder||"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",o=function(t,i,n){return'<div class="slick-lightbox-slick-item">\n  <div class="slick-lightbox-slick-item-inner">\n    <img class="slick-lightbox-slick-img" '+(!0===n?' data-lazy="'+t+'" src="'+e+'" ':' src="'+t+'" ')+" />\n    "+i+"\n  </div>\n</div>"},this.options.images?l=t.map(this.options.images,function(t){return function(i){return o(i,t.options.lazy)}}(this)):(i=this.filterOutSlickClones(this.$element.find(this.options.itemSelector)),s=i.length,n=function(t){return function(i,n){var e,l,r;return l={index:n,length:s},e=t.getElementCaption(i,l),r=t.getElementSrc(i),o(r,e,t.options.lazy)}}(this),l=t.map(i,n)),l},i.prototype.createModal=function(){var i,n;return n=this.createModalItems(),i='<div class="slick-lightbox slick-lightbox-hide-init'+(this.isIE?" slick-lightbox-ie":"")+'" style="background: '+this.options.background+';">\n  <div class="slick-lightbox-inner">\n    <div class="slick-lightbox-slick slick-caption-'+this.options.captionPosition+'">'+n.join("")+"</div>\n  <div>\n<div>",this.$modalElement=t(i),this.$parts={},this.$parts.closeButton=t(this.options.layouts.closeButton),this.$modalElement.find(".slick-lightbox-inner").append(this.$parts.closeButton),t("body").append(this.$modalElement)},i.prototype.initSlick=function(i){var n;return n={initialSlide:i},this.options.lazy&&(n.lazyLoad="ondemand"),null!=this.options.slick?"function"==typeof this.options.slick?this.slick=this.options.slick(this.$modalElement):this.slick=this.$modalElement.find(".slick-lightbox-slick").slick(t.extend({},this.options.slick,n)):this.slick=this.$modalElement.find(".slick-lightbox-slick").slick(n),this.$modalElement.trigger("init.slickLightbox")},i.prototype.open=function(){return this.options.useHistoryApi&&this.writeHistory(),this.$element.trigger("show.slickLightbox"),setTimeout(function(t){return function(){return t.$element.trigger("shown.slickLightbox")}}(this),this.getTransitionDuration()),this.$modalElement.removeClass("slick-lightbox-hide-init")},i.prototype.close=function(){return this.$element.trigger("hide.slickLightbox"),setTimeout(function(t){return function(){return t.$element.trigger("hidden.slickLightbox")}}(this),this.getTransitionDuration()),this.$modalElement.addClass("slick-lightbox-hide"),this.destroy()},i.prototype.bindEvents=function(){var i;if(i=function(t){return function(){var i;return i=t.$modalElement.find(".slick-lightbox-inner").height(),t.$modalElement.find(".slick-lightbox-slick-item").height(i),t.$modalElement.find(".slick-lightbox-slick-img, .slick-lightbox-slick-item-inner").css("max-height",Math.round(t.options.imageMaxHeight*i))}}(this),t(window).on("orientationchange.slickLightbox resize.slickLightbox",i),this.options.useHistoryApi&&t(window).on("popstate.slickLightbox",function(t){return function(){return t.close()}}(this)),this.$modalElement.on("init.slickLightbox",i),this.$modalElement.on("destroy.slickLightbox",function(t){return function(){return t.destroy()}}(this)),this.$element.on("destroy.slickLightbox",function(t){return function(){return t.destroy(!0)}}(this)),this.$parts.closeButton.on("click.slickLightbox touchstart.slickLightbox",function(t){return function(i){return i.preventDefault(),t.close()}}(this)),(this.options.closeOnEscape||this.options.navigateByKeyboard)&&t(document).on("keydown.slickLightbox",function(t){return function(i){var n;if(n=i.keyCode?i.keyCode:i.which,t.options.navigateByKeyboard&&(37===n?t.slideSlick("left"):39===n&&t.slideSlick("right")),t.options.closeOnEscape&&27===n)return t.close()}}(this)),this.options.closeOnBackdropClick)return this.$modalElement.on("click.slickLightbox touchstart.slickLightbox",".slick-lightbox-slick-img",function(t){return t.stopPropagation()}),this.$modalElement.on("click.slickLightbox",".slick-lightbox-slick-item",function(t){return function(i){return i.preventDefault(),t.close()}}(this))},i.prototype.slideSlick=function(t){return"left"===t?this.slick.slick("slickPrev"):this.slick.slick("slickNext")},i.prototype.detectIE=function(){if(this.isIE=!1,/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&new Number(RegExp.$1)<9)return this.isIE=!0},i.prototype.getElementCaption=function(i,n){return this.options.caption?'<span class="slick-lightbox-slick-caption">'+function(){switch(typeof this.options.caption){case"function":return this.options.caption(i,n);case"string":return t(i).data(this.options.caption)}}.call(this)+"</span>":""},i.prototype.getElementSrc=function(i){switch(typeof this.options.src){case"function":return this.options.src(i);case"string":return t(i).attr(this.options.src);default:return i.href}},i.prototype.unbindEvents=function(){return t(window).off(".slickLightbox"),t(document).off(".slickLightbox"),this.$modalElement.off(".slickLightbox")},i.prototype.destroy=function(t){if(null==t&&(t=!1),this.didInit&&(this.unbindEvents(),setTimeout(function(t){return function(){return t.$modalElement.remove()}}(this),this.options.destroyTimeout)),t)return this.$element.off(".slickLightbox"),this.$element.off(".slickLightbox",this.options.itemSelector)},i.prototype.destroyPrevious=function(){return t("body").children(".slick-lightbox").trigger("destroy.slickLightbox")},i.prototype.getTransitionDuration=function(){var t;return this.transitionDuration?this.transitionDuration:(t=this.$modalElement.css("transition-duration"),this.transitionDuration=void 0===t?500:t.indexOf("ms")>-1?parseFloat(t):1e3*parseFloat(t))},i.prototype.writeHistory=function(){return"undefined"!=typeof history&&null!==history&&"function"==typeof history.pushState?history.pushState(null,null,""):void 0},i.prototype.filterOutSlickClones=function(i){return this.elementIsSlick()?i=i.filter(function(){var i;return i=t(this),!i.hasClass("slick-cloned")&&0===i.parents(".slick-cloned").length}):i},i.prototype.handlePossibleCloneClick=function(i,n){var o;return this.elementIsSlick()&&i.closest(".slick-slide").hasClass("slick-cloned")?(o=i.attr("href"),n.filter(function(){return t(this).attr("href")===o}).first()):i},i.prototype.elementIsSlick=function(){return this.$element.hasClass("slick-slider")},i}(),n={background:"rgba(0,0,0,.8)",closeOnEscape:!0,closeOnBackdropClick:!0,destroyTimeout:500,itemSelector:"a",navigateByKeyboard:!0,src:!1,caption:!1,captionPosition:"dynamic",images:!1,slick:{},useHistoryApi:!1,layouts:{closeButton:'<button type="button" class="slick-lightbox-close"></button>'},shouldOpen:null,imageMaxHeight:.9,lazy:!1},t.fn.slickLightbox=function(o){return o=t.extend({},n,o),t(this).each(function(){return this.slickLightbox=new i(this,o)}),this},t.fn.unslickLightbox=function(){return t(this).trigger("destroy.slickLightbox").each(function(){return this.slickLightbox=null})}}(jQuery);
*/

'use strict';
(function ($) {
    var SlickLightbox, defaults;
    SlickLightbox = function () {
        /*
  The core class.
   */
        function SlickLightbox(element, options1) {
            var slickLightbox;
            this.options = options1;
            /* Binds the plugin. */
            this.$element = $(element);
            this.didInit = false;
            slickLightbox = this;
            this.$element.on('click.slickLightbox', this.options.itemSelector, function (e) {
                var $clickedItem, $items;
                e.preventDefault();
                $clickedItem = $(this);
                $clickedItem.blur();
                if (typeof slickLightbox.options.shouldOpen === 'function') {
                    if (!slickLightbox.options.shouldOpen(slickLightbox, $clickedItem, e)) {
                        return;
                    }
                }
                $items = slickLightbox.$element.find(slickLightbox.options.itemSelector);
                if (slickLightbox.elementIsSlick()) {
                    $items = slickLightbox.filterOutSlickClones($items);
                    $clickedItem = slickLightbox.handlePossibleCloneClick($clickedItem, $items);
                }
                return slickLightbox.init($items.index($clickedItem));
            });
        }
        SlickLightbox.prototype.init = function (index) {
            /* Creates the lightbox, opens it, binds events and calls `slick`. Accepts `index` of the element, that triggered it (so that we know, on which slide to start slick). */
            this.didInit = true;
            this.detectIE();
            this.createModal();
            this.bindEvents();
            this.initSlick(index);
            return this.open();
        };
        SlickLightbox.prototype.createModalItems = function () {
            /* Creates individual slides to be used with slick. If `options.images` array is specified, it uses it's contents, otherwise loops through elements' `options.itemSelector`. */
            var $items, createItem, itemTemplate, lazyPlaceholder, length, links;
            lazyPlaceholder = this.options.lazyPlaceholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            itemTemplate = function (source, caption, lazy, srcset) {
                var imgSourceParams;
                
                if (lazy === true) {
                    imgSourceParams = ' data-lazy="' + source + '" src="' + lazyPlaceholder + '" ';
                } else {
                	if (srcset != undefined) {
                    	imgSourceParams = ' src="' + source + '" srcset="' + srcset + '" ';
                	} else {
                		imgSourceParams = ' src="' + source + '" ';
                	}
                }
                return '<div class="slick-lightbox-slick-item">\n  <div class="slick-lightbox-slick-item-inner">\n    <img class="slick-lightbox-slick-img" ' + imgSourceParams + ' />\n    ' + caption + '\n  </div>\n</div>';
            };
            if (this.options.images) {
                links = $.map(this.options.images, function (_this) {
                    return function (img) {
                        return itemTemplate(img, _this.options.lazy);
                    };
                }(this));
            } else {
                $items = this.filterOutSlickClones(this.$element.find(this.options.itemSelector));
                length = $items.length;
                createItem = function (_this) {
                    return function (el, index) {
                        var caption, info, src;
                        info = {
                            index: index,
                            length: length
                        };
                        caption = _this.getElementCaption(el, info);
                        src = _this.getElementSrc(el);
                        srcset = _this.getElementSrcSet(el);
                        return itemTemplate(src, caption, _this.options.lazy, srcset);
                    };
                }(this);
                links = $.map($items, createItem);
            }
            return links;
        };
        SlickLightbox.prototype.createModal = function () {
            /* Creates a `slick`-friendly modal. */
            var html, links;
            links = this.createModalItems();
            html = '<div class="slick-lightbox slick-lightbox-hide-init' + (this.isIE ? ' slick-lightbox-ie' : '') + '" style="background: ' + this.options.background + ';">\n  <div class="slick-lightbox-inner">\n    <div class="slick-lightbox-slick slick-caption-' + this.options.captionPosition + '">' + links.join('') + '</div>\n  <div>\n<div>';
            this.$modalElement = $(html);
            this.$parts = {};
            this.$parts['closeButton'] = $(this.options.layouts.closeButton);
            this.$modalElement.find('.slick-lightbox-inner').append(this.$parts['closeButton']);
            return $('body').append(this.$modalElement);
        };
        SlickLightbox.prototype.initSlick = function (index) {
            /* Runs slick by default, using `options.slick` if provided. If `options.slick` is a function, it gets fired instead of us initializing slick. Merges in initialSlide option. */
            var additional;
            additional = { initialSlide: index };
            if (this.options.lazy) {
                additional.lazyLoad = 'ondemand';
            }
            if (this.options.slick != null) {
                if (typeof this.options.slick === 'function') {
                    this.slick = this.options.slick(this.$modalElement);
                } else {
                    this.slick = this.$modalElement.find('.slick-lightbox-slick').slick($.extend({}, this.options.slick, additional));
                }
            } else {
                this.slick = this.$modalElement.find('.slick-lightbox-slick').slick(additional);
            }
            return this.$modalElement.trigger('init.slickLightbox');
        };
        SlickLightbox.prototype.open = function () {
            /* Opens the lightbox. */
            if (this.options.useHistoryApi) {
                this.writeHistory();
            }
            this.$element.trigger('show.slickLightbox');
            setTimeout(function (_this) {
                return function () {
                    return _this.$element.trigger('shown.slickLightbox');
                };
            }(this), this.getTransitionDuration());
            return this.$modalElement.removeClass('slick-lightbox-hide-init');
        };
        SlickLightbox.prototype.close = function () {
            /* Closes the lightbox and destroys it, maintaining the original element bindings. */
            this.$element.trigger('hide.slickLightbox');
            setTimeout(function (_this) {
                return function () {
                    return _this.$element.trigger('hidden.slickLightbox');
                };
            }(this), this.getTransitionDuration());
            this.$modalElement.addClass('slick-lightbox-hide');
            return this.destroy();
        };
        SlickLightbox.prototype.bindEvents = function () {
            /* Binds global events. */
            var resizeSlides;
            resizeSlides = function (_this) {
                return function () {
                    var h;
                    h = _this.$modalElement.find('.slick-lightbox-inner').height();
                    _this.$modalElement.find('.slick-lightbox-slick-item').height(h);
                    return _this.$modalElement.find('.slick-lightbox-slick-img, .slick-lightbox-slick-item-inner').css('max-height', Math.round(_this.options.imageMaxHeight * h));
                };
            }(this);
            $(window).on('orientationchange.slickLightbox resize.slickLightbox', resizeSlides);
            if (this.options.useHistoryApi) {
                $(window).on('popstate.slickLightbox', function (_this) {
                    return function () {
                        return _this.close();
                    };
                }(this));
            }
            this.$modalElement.on('init.slickLightbox', resizeSlides);
            this.$modalElement.on('destroy.slickLightbox', function (_this) {
                return function () {
                    return _this.destroy();
                };
            }(this));
            this.$element.on('destroy.slickLightbox', function (_this) {
                return function () {
                    return _this.destroy(true);
                };
            }(this));
            this.$parts['closeButton'].on('click.slickLightbox touchstart.slickLightbox', function (_this) {
                return function (e) {
                    e.preventDefault();
                    return _this.close();
                };
            }(this));
            if (this.options.closeOnEscape || this.options.navigateByKeyboard) {
                $(document).on('keydown.slickLightbox', function (_this) {
                    return function (e) {
                        var code;
                        code = e.keyCode ? e.keyCode : e.which;
                        if (_this.options.navigateByKeyboard) {
                            if (code === 37) {
                                _this.slideSlick('left');
                            } else if (code === 39) {
                                _this.slideSlick('right');
                            }
                        }
                        if (_this.options.closeOnEscape) {
                            if (code === 27) {
                                return _this.close();
                            }
                        }
                    };
                }(this));
            }
            if (this.options.closeOnBackdropClick) {
                this.$modalElement.on('click.slickLightbox touchstart.slickLightbox', '.slick-lightbox-slick-img', function (e) {
                    return e.stopPropagation();
                });
                return this.$modalElement.on('click.slickLightbox', '.slick-lightbox-slick-item', function (_this) {
                    return function (e) {
                        e.preventDefault();
                        return _this.close();
                    };
                }(this));
            }
        };
        SlickLightbox.prototype.slideSlick = function (direction) {
            /* Moves the slick prev or next. */
            if (direction === 'left') {
                return this.slick.slick('slickPrev');
            } else {
                return this.slick.slick('slickNext');
            }
        };
        SlickLightbox.prototype.detectIE = function () {
            /* Detects usage of IE8 and lower. */
            var ieversion;
            this.isIE = false;
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                ieversion = new Number(RegExp.$1);
                if (ieversion < 9) {
                    return this.isIE = true;
                }
            }
        };
        SlickLightbox.prototype.getElementCaption = function (el, info) {
            /* Returns caption for each slide based on the type of `options.caption`. */
            var c;
            if (!this.options.caption) {
                return '';
            }
            c = function () {
                switch (typeof this.options.caption) {
                case 'function':
                    return this.options.caption(el, info);
                case 'string':
                    return $(el).data(this.options.caption);
                }
            }.call(this);
            return '<span class="slick-lightbox-slick-caption">' + c + '</span>';
        };
        SlickLightbox.prototype.getElementSrc = function (el) {
            /* Returns src for each slide image based on the type of `options.src`. */
            switch (typeof this.options.src) {
            case 'function':
                return this.options.src(el);
            case 'string':
                return $(el).attr(this.options.src);
            default:
                return el.href;
            }
        };

        SlickLightbox.prototype.getElementSrcSet = function (el) {
            /* Returns src for each slide image based on the type of `options.src`. */
            switch (typeof this.options.srcset) {
            case 'string':
                return $(el).attr(this.options.srcset);
            default:
                return el.srcset;
            }
        };

        SlickLightbox.prototype.unbindEvents = function () {
            /* Unbinds global events. */
            $(window).off('.slickLightbox');
            $(document).off('.slickLightbox');
            return this.$modalElement.off('.slickLightbox');
        };
        SlickLightbox.prototype.destroy = function (unbindAnchors) {
            if (unbindAnchors == null) {
                unbindAnchors = false;
            }
            /* Destroys the lightbox and unbinds global events. If `true` is passed as an argument, unbinds the original element as well. */
            if (this.didInit) {
                this.unbindEvents();
                setTimeout(function (_this) {
                    return function () {
                        return _this.$modalElement.remove();
                    };
                }(this), this.options.destroyTimeout);
            }
            if (unbindAnchors) {
                this.$element.off('.slickLightbox');
                return this.$element.off('.slickLightbox', this.options.itemSelector);
            }
        };
        SlickLightbox.prototype.destroyPrevious = function () {
            /* Destroys lightboxes currently in DOM. */
            return $('body').children('.slick-lightbox').trigger('destroy.slickLightbox');
        };
        SlickLightbox.prototype.getTransitionDuration = function () {
            /* Detects the transition duration to know when to remove stuff from DOM etc. */
            var duration;
            if (this.transitionDuration) {
                return this.transitionDuration;
            }
            duration = this.$modalElement.css('transition-duration');
            if (typeof duration === 'undefined') {
                return this.transitionDuration = 500;
            } else {
                return this.transitionDuration = duration.indexOf('ms') > -1 ? parseFloat(duration) : parseFloat(duration) * 1000;
            }
        };
        SlickLightbox.prototype.writeHistory = function () {
            /* Writes an empty state to the history API if supported. */
            return typeof history !== 'undefined' && history !== null ? typeof history.pushState === 'function' ? history.pushState(null, null, '') : void 0 : void 0;
        };
        SlickLightbox.prototype.filterOutSlickClones = function ($items) {
            /* Removes all slick clones from the set of elements. Only does so, if the target element is a slick slider. */
            if (!this.elementIsSlick()) {
                return $items;
            }
            return $items = $items.filter(function () {
                var $item;
                $item = $(this);
                return !$item.hasClass('slick-cloned') && $item.parents('.slick-cloned').length === 0;
            });
        };
        SlickLightbox.prototype.handlePossibleCloneClick = function ($clickedItem, $items) {
            var href;
            if (!this.elementIsSlick()) {
                return $clickedItem;
            }
            if (!$clickedItem.closest('.slick-slide').hasClass('slick-cloned')) {
                return $clickedItem;
            }
            href = $clickedItem.attr('href');
            return $items.filter(function () {
                return $(this).attr('href') === href;
            }).first();
        };
        SlickLightbox.prototype.elementIsSlick = function () {
            return this.$element.hasClass('slick-slider');
        };
        return SlickLightbox;
    }();
    defaults = {
        background: 'rgba(0,0,0,.8)',
        closeOnEscape: true,
        closeOnBackdropClick: true,
        destroyTimeout: 500,
        itemSelector: 'a',
        navigateByKeyboard: true,
        src: false,
        caption: false,
        captionPosition: 'dynamic',
        images: false,
        slick: {},
        useHistoryApi: false,
        layouts: { closeButton: '<button type="button" class="slick-lightbox-close"></button>' },
        shouldOpen: null,
        imageMaxHeight: 0.9,
        lazy: false,
        srcset: "srcset"
    };
    $.fn.slickLightbox = function (options) {
        /* Fires the plugin. */
        options = $.extend({}, defaults, options);
        $(this).each(function () {
            return this.slickLightbox = new SlickLightbox(this, options);
        });
        return this;
    };
    $.fn.unslickLightbox = function () {
        /* Removes everything. */
        return $(this).trigger('destroy.slickLightbox').each(function () {
            return this.slickLightbox = null;
        });
    };
}(jQuery));


define = define_backup;


/*!
 * HC-Sticky
 * =========
 * Version: 2.1.7
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
!function(t,e){"use strict";if("object"==typeof module&&"object"==typeof module.exports){if(!t.document)throw new Error("HC-Sticky requires a browser to run.");module.exports=e(t)}else"function"==typeof define&&define.amd?define("hcSticky",[],e(t)):e(t)}("undefined"!=typeof window?window:this,function(V){"use strict";var Y={top:0,bottom:0,bottomEnd:0,innerTop:0,innerSticker:null,stickyClass:"sticky",stickTo:null,followScroll:!0,queries:null,queryFlow:"down",onStart:null,onStop:null,onBeforeResize:null,onResize:null,resizeDebounce:100,disable:!1},$=V.document,Q=function(i,p){if("string"==typeof i&&(i=$.querySelector(i)),!i)return!1;var u={},d=Q.Helpers,s=i.parentNode;"static"===d.getStyle(s,"position")&&(s.style.position="relative");var g=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};d.isEmptyObject(t)&&!d.isEmptyObject(u)||(u=Object.assign({},Y,u,t))},t=function(){return u.disable},e=function(){if(u.queries){var t=V.innerWidth,e=u.queryFlow,o=u.queries;if(f=p,u=Object.assign({},Y,f||{}),"up"===e)for(var n in o)n<=t&&!d.isEmptyObject(o[n])&&g(o[n]);else{var i=[];for(var s in u.queries){var r={};r[s]=o[s],i.push(r)}for(var l=i.length-1;0<=l;l--){var a=i[l],c=Object.keys(a)[0];t<=c&&!d.isEmptyObject(a[c])&&g(a[c])}}}var f},r={css:{},position:null,stick:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};d.hasClass(i,u.stickyClass)||(!1===l.isAttached&&l.attach(),r.position="fixed",i.style.position="fixed",i.style.left=l.offsetLeft+"px",i.style.width=l.width,void 0===t.bottom?i.style.bottom="auto":i.style.bottom=t.bottom+"px",void 0===t.top?i.style.top="auto":i.style.top=t.top+"px",i.classList?i.classList.add(u.stickyClass):i.className+=" "+u.stickyClass,u.onStart&&u.onStart.call(i,u))},release:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(t.stop=t.stop||!1,!0===t.stop||"fixed"===r.position||null===r.position||!(void 0===t.top&&void 0===t.bottom||void 0!==t.top&&(parseInt(d.getStyle(i,"top"))||0)===t.top||void 0!==t.bottom&&(parseInt(d.getStyle(i,"bottom"))||0)===t.bottom)){!0===t.stop?!0===l.isAttached&&l.detach():!1===l.isAttached&&l.attach();var e=t.position||r.css.position;r.position=e,i.style.position=e,i.style.left=!0===t.stop?r.css.left:l.positionLeft+"px",i.style.width="absolute"!==e?r.css.width:l.width,void 0===t.bottom?i.style.bottom=!0===t.stop?"":"auto":i.style.bottom=t.bottom+"px",void 0===t.top?i.style.top=!0===t.stop?"":"auto":i.style.top=t.top+"px",i.classList?i.classList.remove(u.stickyClass):i.className=i.className.replace(new RegExp("(^|\\b)"+u.stickyClass.split(" ").join("|")+"(\\b|$)","gi")," "),u.onStop&&u.onStop.call(i,u)}}},l={el:$.createElement("div"),offsetLeft:null,positionLeft:null,width:null,isAttached:!1,init:function(){for(var t in r.css)l.el.style[t]=r.css[t];l.el.style["z-index"]="-1";var e=d.getStyle(i);l.offsetLeft=d.offset(i).left-(parseInt(e.marginLeft)||0),l.positionLeft=d.position(i).left,l.width=d.getStyle(i,"width")},attach:function(){s.insertBefore(l.el,i),l.isAttached=!0},detach:function(){l.el=s.removeChild(l.el),l.isAttached=!1}},a=void 0,c=void 0,f=void 0,m=void 0,y=void 0,h=void 0,v=void 0,b=void 0,S=void 0,w=void 0,E=void 0,k=void 0,x=void 0,L=void 0,T=void 0,j=void 0,O=void 0,C=void 0,o=function(){var t,e,o,n;r.css=(t=i,e=d.getCascadedStyle(t),o=d.getStyle(t),n={height:t.offsetHeight+"px",left:e.left,right:e.right,top:e.top,bottom:e.bottom,position:o.position,display:o.display,verticalAlign:o.verticalAlign,boxSizing:o.boxSizing,marginLeft:e.marginLeft,marginRight:e.marginRight,marginTop:e.marginTop,marginBottom:e.marginBottom,paddingLeft:e.paddingLeft,paddingRight:e.paddingRight},e.float&&(n.float=e.float||"none"),e.cssFloat&&(n.cssFloat=e.cssFloat||"none"),o.MozBoxSizing&&(n.MozBoxSizing=o.MozBoxSizing),n.width="auto"!==e.width?e.width:"border-box"===n.boxSizing||"border-box"===n.MozBoxSizing?t.offsetWidth+"px":o.width,n),l.init(),a=!(!u.stickTo||!("document"===u.stickTo||u.stickTo.nodeType&&9===u.stickTo.nodeType||"object"==typeof u.stickTo&&u.stickTo instanceof("undefined"!=typeof HTMLDocument?HTMLDocument:Document))),c=u.stickTo?a?$:"string"==typeof u.stickTo?$.querySelector(u.stickTo):u.stickTo:s,T=(C=function(){var t=i.offsetHeight+(parseInt(r.css.marginTop)||0)+(parseInt(r.css.marginBottom)||0),e=(T||0)-t;return-1<=e&&e<=1?T:t})(),m=(O=function(){return a?Math.max($.documentElement.clientHeight,$.body.scrollHeight,$.documentElement.scrollHeight,$.body.offsetHeight,$.documentElement.offsetHeight):c.offsetHeight})(),y=a?0:d.offset(c).top,h=u.stickTo?a?0:d.offset(s).top:y,v=V.innerHeight,j=i.offsetTop-(parseInt(r.css.marginTop)||0),f=u.innerSticker?"string"==typeof u.innerSticker?$.querySelector(u.innerSticker):u.innerSticker:null,b=isNaN(u.top)&&-1<u.top.indexOf("%")?parseFloat(u.top)/100*v:u.top,S=isNaN(u.bottom)&&-1<u.bottom.indexOf("%")?parseFloat(u.bottom)/100*v:u.bottom,w=f?f.offsetTop:u.innerTop?u.innerTop:0,E=isNaN(u.bottomEnd)&&-1<u.bottomEnd.indexOf("%")?parseFloat(u.bottomEnd)/100*v:u.bottomEnd,k=y-b+w+j},z=V.pageYOffset||$.documentElement.scrollTop,N=0,R=void 0,n=function(){T=C(),m=O(),x=y+m-b-E,L=v<T;var t=V.pageYOffset||$.documentElement.scrollTop,e=Math.round(d.offset(i).top),o=e-t,n=void 0;R=t<z?"up":"down",N=t-z,k<(z=t)?x+b+(L?S:0)-(u.followScroll&&L?0:b)<=t+T-w-(v-(k-w)<T-w&&u.followScroll&&0<(n=T-v-w)?n:0)?r.release({position:"absolute",bottom:h+s.offsetHeight-x-b}):L&&u.followScroll?"down"===R?Math.floor(o+T+S)<=v?r.stick({bottom:S}):"fixed"===r.position&&r.release({position:"absolute",top:e-b-k-N+w}):Math.ceil(o+w)<0&&"fixed"===r.position?r.release({position:"absolute",top:e-b-k+w-N}):t+b-w<=e&&r.stick({top:b-w}):r.stick({top:b-w}):r.release({stop:!0})},H=!1,A=!1,B=function(){H&&(d.event.unbind(V,"scroll",n),H=!1)},I=function(){null!==i.offsetParent&&"none"!==d.getStyle(i,"display")?(o(),m<=T?B():(n(),H||(d.event.bind(V,"scroll",n),H=!0))):B()},q=function(){i.style.position="",i.style.left="",i.style.top="",i.style.bottom="",i.style.width="",i.classList?i.classList.remove(u.stickyClass):i.className=i.className.replace(new RegExp("(^|\\b)"+u.stickyClass.split(" ").join("|")+"(\\b|$)","gi")," "),r.css={},!(r.position=null)===l.isAttached&&l.detach()},M=function(){q(),e(),t()?B():I()},F=function(){u.onBeforeResize&&u.onBeforeResize.call(i,u),M(),u.onResize&&u.onResize.call(i,u)},D=u.resizeDebounce?d.debounce(F,u.resizeDebounce):F,P=function(){A&&(d.event.unbind(V,"resize",D),A=!1),B()},W=function(){A||(d.event.bind(V,"resize",D),A=!0),e(),t()?B():I()};this.options=function(t){return t?u.option||null:Object.assign({},u)},this.reinit=M,this.update=function(t){g(t),p=Object.assign({},p,t||{}),M()},this.attach=W,this.detach=P,this.destroy=function(){P(),q()},g(p),W(),d.event.bind(V,"load",M)};if(void 0!==V.jQuery){var n=V.jQuery;n.fn.extend({hcSticky:function(o){return this.length?this.each(function(){var t="hcSticky",e=n.data(this,t);e?e.update(o):(e=new Q(this,o),n.data(this,t,e))}):this}})}return V.hcSticky=V.hcSticky||Q,Q}),function(c){"use strict";var t=c.hcSticky,f=c.document;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var o=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(null!=i)for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(o[s]=i[s])}return o},writable:!0,configurable:!0}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,o;if(null==this)throw new TypeError("this is null or not defined");var n=Object(this),i=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(1<arguments.length&&(e=arguments[1]),o=0;o<i;){var s;o in n&&(s=n[o],t.call(e,s,o,n)),o++}});var e=function(){var t=f.documentElement,e=function(){};function n(t){var e=c.event;return e.target=e.target||e.srcElement||t,e}t.addEventListener?e=function(t,e,o){t.addEventListener(e,o,!1)}:t.attachEvent&&(e=function(e,t,o){e[t+o]=o.handleEvent?function(){var t=n(e);o.handleEvent.call(o,t)}:function(){var t=n(e);o.call(e,t)},e.attachEvent("on"+t,e[t+o])});var o=function(){};return t.removeEventListener?o=function(t,e,o){t.removeEventListener(e,o,!1)}:t.detachEvent&&(o=function(e,o,n){e.detachEvent("on"+o,e[o+n]);try{delete e[o+n]}catch(t){e[o+n]=void 0}}),{bind:e,unbind:o}}(),r=function(t,e){return c.getComputedStyle?e?f.defaultView.getComputedStyle(t,null).getPropertyValue(e):f.defaultView.getComputedStyle(t,null):t.currentStyle?e?t.currentStyle[e.replace(/-\w/g,function(t){return t.toUpperCase().replace("-","")})]:t.currentStyle:void 0},l=function(t){var e=t.getBoundingClientRect(),o=c.pageYOffset||f.documentElement.scrollTop,n=c.pageXOffset||f.documentElement.scrollLeft;return{top:e.top+o,left:e.left+n}};t.Helpers={isEmptyObject:function(t){for(var e in t)return!1;return!0},debounce:function(n,i,s){var r=void 0;return function(){var t=this,e=arguments,o=s&&!r;clearTimeout(r),r=setTimeout(function(){r=null,s||n.apply(t,e)},i),o&&n.apply(t,e)}},hasClass:function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},offset:l,position:function(t){var e=t.offsetParent,o=l(e),n=l(t),i=r(e),s=r(t);return o.top+=parseInt(i.borderTopWidth)||0,o.left+=parseInt(i.borderLeftWidth)||0,{top:n.top-o.top-(parseInt(s.marginTop)||0),left:n.left-o.left-(parseInt(s.marginLeft)||0)}},getStyle:r,getCascadedStyle:function(t){var e=t.cloneNode(!0);e.style.display="none",Array.prototype.slice.call(e.querySelectorAll('input[type="radio"]')).forEach(function(t){t.removeAttribute("name")}),t.parentNode.insertBefore(e,t.nextSibling);var o=void 0;e.currentStyle?o=e.currentStyle:c.getComputedStyle&&(o=f.defaultView.getComputedStyle(e,null));var n={};for(var i in o)!isNaN(i)||"string"!=typeof o[i]&&"number"!=typeof o[i]||(n[i]=o[i]);if(Object.keys(n).length<3)for(var s in n={},o)isNaN(s)||(n[o[s].replace(/-\w/g,function(t){return t.toUpperCase().replace("-","")})]=o.getPropertyValue(o[s]));if(n.margin||"auto"!==n.marginLeft?n.margin||n.marginLeft!==n.marginRight||n.marginLeft!==n.marginTop||n.marginLeft!==n.marginBottom||(n.margin=n.marginLeft):n.margin="auto",!n.margin&&"0px"===n.marginLeft&&"0px"===n.marginRight){var r=t.offsetLeft-t.parentNode.offsetLeft,l=r-(parseInt(n.left)||0)-(parseInt(n.right)||0),a=t.parentNode.offsetWidth-t.offsetWidth-r-(parseInt(n.right)||0)+(parseInt(n.left)||0)-l;0!==a&&1!==a||(n.margin="auto")}return e.parentNode.removeChild(e),e=null,n},event:e}}(window);


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function do_ecommerce_transactions() {
  /* Checkout steps */
  if (jQuery("body.template-cart").length > 0) {
    setTimeout(function() {
      var category = "Product";
      if (jQuery("body.section-tickets").length > 0) {
        category = "Ticket";
      }
      /* Checkout step 1. */
      products = [];
      cart_items = jQuery("tr.cart_item");
      for (var i = 0; i < cart_items.length; i++) {
        var title = jQuery(cart_items[i]).find('.cart_item_title').text();
        var price = jQuery(cart_items[i]).find('.cart_item_price').text();
        var raw_quantity = jQuery(cart_items[i]).find('.cart_item_count').val();
        var quantity = parseInt(raw_quantity);
        if (quantity > 0) {
          var new_product = {
            "name": title,
            "price": price,
            "quantity": quantity,
            "category": category
          }
          products.push(new_product);
        }
      }

      if (typeof dataLayer != 'undefined') {
        dataLayer.push({
          'event': 'checkout',
          'ecommerce': {
            'checkout': {
              'actionField': {'step': 1},
              'products': products
           }
         },
         'eventCallback': function() {
            // do nothing
         }
        });
      }
    }, 2000);
  };

  /* Checkout step 2. */
  if (jQuery("body.template-checkout").length > 0 && !jQuery("body.template-checkout #cart.final-checkout").length) {
    var category = "Product";
    if (jQuery("body.section-tickets").length > 0) {
      category = "Ticket";
    }

    if (typeof dataLayer != 'undefined') {
      dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
          'checkout': {
            'actionField': {'step': 2},
            'products': []
         }
       },
       'eventCallback': function() {
          // do nothing
       }
      });
    }
  };

  /* Checkout step 3. */
  if (jQuery("body.template-checkout").length > 0 && jQuery("body.template-checkout #cart.final-checkout").length) {
    var category = "Product";
    if (jQuery("body.section-tickets").length > 0) {
      category = "Ticket";
    }

    setTimeout(function() {
      products = [];
      cart_items = jQuery("tr.cart_item");
      for (var i = 0; i < cart_items.length; i++) {
        var title = jQuery(cart_items[i]).find('.cart_item_title').text();
        var price = jQuery(cart_items[i]).find('.cart_item_original_price').text();
        var raw_quantity = jQuery(cart_items[i]).find('.cart_item_count').text();
        var quantity = parseInt(raw_quantity);
        if (quantity > 0) {
          var new_product = {
            "name": title,
            "price": price,
            "quantity": quantity,
            "category": category
          }
          products.push(new_product);
        }
      }

      if (typeof dataLayer != 'undefined') {
        dataLayer.push({
          'event': 'checkout',
          'ecommerce': {
            'checkout': {
              'actionField': {'step': 3},
              'products': products
           }
         },
         'eventCallback': function() {
            // do nothing
         }
        });
      }
    }, 1500); 
  };

  if (jQuery("body.template-checkout #cart.final-checkout").length > 0) {
    jQuery("#form-checkout").submit(function(evt) {
      var category = "Product";
      if (jQuery("body.section-tickets").length > 0) {
        category = "Ticket";
      }

      products = [];
      cart_items = jQuery("tr.cart_item");
      for (var i = 0; i < cart_items.length; i++) {
        var title = jQuery(cart_items[i]).find('.cart_item_title').text();
        var price = jQuery(cart_items[i]).find('.cart_item_original_price').text();
        var raw_quantity = jQuery(cart_items[i]).find('.cart_item_count').text();
        var quantity = parseInt(raw_quantity);
        if (quantity > 0) {
          var new_product = {
            "name": title,
            "price": price,
            "quantity": quantity,
            "category": category
          }
          products.push(new_product);
        }
      };

      if (typeof dataLayer != 'undefined') {
        dataLayer.push({
          'event': 'checkout',
          'ecommerce': {
            'checkout': {
              'actionField': {'step': 4},
              'products': products
           }
         },
         'eventCallback': function() {
            // do nothing
         }
        });
      }
    });
  };
};

$(document).ready(function () {

	

  /*var $search_form = jQuery('#searchform.search-form-faceted').submit(function(e) {
  	e.preventDefault();
  	
  	var searchable_text = $search_form.find('input[name="c5"]').val();
  	var only_archive = $search_form.find('input[name="c12"]').val();

  	window.location.href = $search_form.attr('action')+"#c5="+searchable_text+"&c12="+only_archive;
  });*/

  /*var $main_search_form = jQuery('#searchGadget_form').submit(function(e) {
  	e.preventDefault();
  	var searchable_text = $main_search_form.find('input[name="SearchableText"]').val();
  	window.location.href = $main_search_form.attr('facetedaction')+"#c5="+searchable_text;
  });*/



  var $form = $('#newsletter-subscriber-form');
  if ($form.length > 0) {
  	$form.each(function(index, value) {
  		$(value).find('input[type="submit"]').bind('click', function (event) {
      	if (event) event.preventDefault()
      	register($(value));
    	})
  	})
  }

  

  (function(){
	var backTop = document.getElementsByClassName('js-cd-top')[0],
		// browser window scroll (in pixels) after which the "back to top" link is shown
		offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offsetOpacity = 1200,
		scrollDuration = 700,
		scrolling = false;
	if( backTop ) {
		//update back to top visibility on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
			}
		});
		//smooth scroll to top
		backTop.addEventListener('click', function(event) {
			event.preventDefault();
			(!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
		});
	}

	function checkBackToTop() {
		var windowTop = window.scrollY || document.documentElement.scrollTop;
		( windowTop > offset ) ? addClass(backTop, 'cd-top--show') : removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
		( windowTop > offsetOpacity ) && addClass(backTop, 'cd-top--fade-out');
		scrolling = false;
	}
	
	function scrollTop(duration) {
	    var start = window.scrollY || document.documentElement.scrollTop,
	        currentTime = null;
	        
	    var animateScroll = function(timestamp){
	    	if (!currentTime) currentTime = timestamp;        
	        var progress = timestamp - currentTime;
	        var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
	        window.scrollTo(0, val);
	        if(progress < duration) {
	            window.requestAnimationFrame(animateScroll);
	        }
	    };

	    window.requestAnimationFrame(animateScroll);
	}

	Math.easeInOutQuad = function (t, b, c, d) {
 		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
	})();
});

function register($form) {

  var $loader = jQuery('.plone-loader');
  if($loader.size() === 0){
    $loader = $('<div class="plone-loader"><div class="loader"/></div>');
    jQuery('body').append($loader);
  }

  $loader.show();
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { 
    	$form.find('#form-widgets-email').css('borderColor', '#e70518');
    	$form.find('#subscribe-result .success-msg').hide();
    	$form.find('#subscribe-result .error-msg').show();
    	$loader.hide();
    },
    success: function (data) {
      
      if (data.result === 'success') {
        // Yeahhhh Success
        $form.find('#form-widgets-email').css('borderColor', '#c3c3c3')
        $form.find('#subscribe-result').css('color', 'rgb(53, 114, 210)')
        $form.find('#subscribe-result .success-msg').show();
    	$form.find('#subscribe-result .error-msg').hide();
        $form.find('#form-widgets-email').val('');
        $loader.hide();
      } else {
        // Something went wrong, do something to notify the user.
        $form.find('#form-widgets-email').css('borderColor', '#e70518');
        $form.find('#subscribe-result').css('color', '#e70518');
        $form.find('#subscribe-result .success-msg').hide();

        if (data.msg.indexOf("reeds geabonneerd op lijst") > 0 || data.msg.indexOf("zich al ingeschreven") > 0) {
       		$form.find('#subscribe-result .error-msg').html(data.msg);
       	}
    	$form.find('#subscribe-result .error-msg').show();
    	$loader.hide();
      }
    }
  })
};

jQuery(document).ready(function($) {
  +function(t,e,i){"use strict";var r={calc:!1};e.fn.rrssb=function(t){var r=e.extend({description:i,emailAddress:i,emailBody:i,emailSubject:i,image:i,title:i,url:i},t);r.emailSubject=r.emailSubject||r.title,r.emailBody=r.emailBody||(r.description?r.description:"")+(r.url?"\n\n"+r.url:"");for(var s in r)r.hasOwnProperty(s)&&r[s]!==i&&(r[s]=a(r[s]));r.url!==i&&(e(this).find(".rrssb-facebook a").attr("href","https://www.facebook.com/sharer/sharer.php?u="+r.url),e(this).find(".rrssb-tumblr a").attr("href","http://tumblr.com/share/link?url="+r.url+(r.title!==i?"&name="+r.title:"")+(r.description!==i?"&description="+r.description:"")),e(this).find(".rrssb-linkedin a").attr("href","http://www.linkedin.com/shareArticle?mini=true&url="+r.url+(r.title!==i?"&title="+r.title:"")+(r.description!==i?"&summary="+r.description:"")),e(this).find(".rrssb-twitter a").attr("href","https://twitter.com/intent/tweet?text="+(r.description!==i?r.description:"")+"%20"+r.url),e(this).find(".rrssb-hackernews a").attr("href","https://news.ycombinator.com/submitlink?u="+r.url+(r.title!==i?"&text="+r.title:"")),e(this).find(".rrssb-reddit a").attr("href","http://www.reddit.com/submit?url="+r.url+(r.description!==i?"&text="+r.description:"")+(r.title!==i?"&title="+r.title:"")),e(this).find(".rrssb-googleplus a").attr("href","https://plus.google.com/share?url="+(r.description!==i?r.description:"")+"%20"+r.url),e(this).find(".rrssb-pinterest a").attr("href","http://pinterest.com/pin/create/button/?url="+r.url+(r.image!==i?"&amp;media="+r.image:"")+(r.description!==i?"&description="+r.description:"")),e(this).find(".rrssb-pocket a").attr("href","https://getpocket.com/save?url="+r.url),e(this).find(".rrssb-github a").attr("href",r.url),e(this).find(".rrssb-print a").attr("href","javascript:window.print()"),e(this).find(".rrssb-whatsapp a").attr("href","whatsapp://send?text="+(r.description!==i?r.description+"%20":r.title!==i?r.title+"%20":"")+r.url)),(r.emailAddress!==i||r.emailSubject)&&e(this).find(".rrssb-email a").attr("href","mailto:"+(r.emailAddress?r.emailAddress:"")+"?"+(r.emailSubject!==i?"subject="+r.emailSubject:"")+(r.emailBody!==i?"&body="+r.emailBody:""))};var s=function(){var t=e("<div>"),i=["calc","-webkit-calc","-moz-calc"];e("body").append(t);for(var s=0;s<i.length;s++)if(t.css("width",i[s]+"(1px)"),1===t.width()){r.calc=i[s];break}t.remove()},a=function(t){if(t!==i&&null!==t){if(null===t.match(/%[0-9a-f]{2}/i))return encodeURIComponent(t);t=decodeURIComponent(t),a(t)}},n=function(){e(".rrssb-buttons").each(function(t){var i=e(this),r=e("li:visible",i),s=r.length,a=100/s;r.css("width",a+"%").attr("data-initwidth",a)})},l=function(){e(".rrssb-buttons").each(function(t){var i=e(this),r=i.width(),s=e("li",i).not(".small").eq(0).width(),a=e("li.small",i).length;if(s>170&&1>a){i.addClass("tiny-format");var n=s/12+"px";i.css("font-size",n)}else i.removeClass("large-format"),i.css("font-size","");25*a>r?i.removeClass("tiny-format").addClass("tiny-format"):i.removeClass("tiny-format")})},o=function(){e(".rrssb-buttons").each(function(t){var i=e(this),r=e("li",i),s=r.filter(".small"),a=0,n=0,l=s.eq(0),o=parseFloat(l.attr("data-size"))+55,c=s.length;if(c===r.length){var h=42*c,u=i.width();u>h+o&&(i.removeClass("small-format"),s.eq(0).removeClass("small"),d())}else{r.not(".small").each(function(t){var i=e(this),r=parseFloat(i.attr("data-size"))+55,s=parseFloat(i.width());a+=s,n+=r});var m=a-n;m>o&&(l.removeClass("small"),d())}})},c=function(t){e(".rrssb-buttons").each(function(t){var i=e(this),r=e("li",i);e(r.get().reverse()).each(function(t,i){var s=e(this);if(s.hasClass("small")===!1){var a=parseFloat(s.attr("data-size"))+55,n=parseFloat(s.width());if(a>n){var l=r.not(".small").last();e(l).addClass("small"),d()}}--i||o()})}),t===!0&&u(d)},d=function(){e(".rrssb-buttons").each(function(t){var i,s,a,l,o,c=e(this),d=e("li",c),h=d.filter(".small"),u=h.length;u>0&&u!==d.length?(c.removeClass("small-format"),h.css("width","42px"),a=42*u,i=d.not(".small").length,s=100/i,o=a/i,r.calc===!1?(l=(c.innerWidth()-1)/i-o,l=Math.floor(1e3*l)/1e3,l+="px"):l=r.calc+"("+s+"% - "+o+"px)",d.not(".small").css("width",l)):u===d.length?(c.addClass("tiny-format"),n()):(c.removeClass("tiny-format"),n())}),l()},h=function(){e(".rrssb-buttons").each(function(t){e(this).addClass("rrssb-"+(t+1))}),s(),n(),e(".rrssb-buttons li .rrssb-text").each(function(t){var i=e(this),r=i.width();i.closest("li").attr("data-size",r)}),c(!0)},u=function(t){e(".rrssb-buttons li.small").removeClass("small"),c(),t()},m=function(e,r,s,a){var n=t.screenLeft!==i?t.screenLeft:screen.left,l=t.screenTop!==i?t.screenTop:screen.top,o=t.innerWidth?t.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,c=t.innerHeight?t.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,d=o/2-s/2+n,h=c/3-a/3+l,u=t.open(e,r,"scrollbars=yes, width="+s+", height="+a+", top="+h+", left="+d);u&&u.focus&&u.focus()},f=function(){var t={};return function(e,i,r){r||(r="Don't call this twice without a uniqueId"),t[r]&&clearTimeout(t[r]),t[r]=setTimeout(e,i)}}();e(document).ready(function(){try{e(document).on("click",".rrssb-buttons a.popup",{},function(t){var i=e(this);m(i.attr("href"),i.find(".rrssb-text").html(),580,470),t.preventDefault()})}catch(i){}e(t).resize(function(){u(d),f(function(){u(d)},200,"finished resizing")}),h()}),t.rrssbInit=h}(window,jQuery);

  if (document.documentMode) {
     document.documentElement.className+=' ie'+document.documentMode;
  }

	if (jQuery('#masonry-grid').length) {
	  imagesLoaded('#masonry-grid', function() {
	    var elem = document.querySelector('#masonry-grid');
	    jQuery("#masonry-grid").masonry({
	       itemSelector: '#masonry-grid .grid-item',
	       horizontalOrder: true,
	       percentPosition: true
	    });
	    
	    $("#masonry-grid").addClass('init');
	  });
	}

	if (jQuery('body.portaltype-portlet-page').length) {
		jQuery(".frontpage-portlet-collection .thumb-wrapper").each(function() {
			var imagescount = jQuery(this).data('imagescount');
			if (imagescount > 1) {
				jQuery(this).slickLightbox({
				    itemSelector: 'img.tileImage',
				    src: function(element) {
				    	$elem = jQuery(element);
				    	return $elem.data('lazy');
				    },
				    lazy: false,
				    caption: 'caption',
				    useHistoryApi: 'true',
				    slick: {
				    	fade:true,
				    	speed: 50
				    }
				});
			}
		});
	};

	if (jQuery('body.portaltype-event').length) {
		jQuery(".extra-info-wrapper .thumb-wrapper").each(function() {
			var imagescount = jQuery(this).data('imagescount');
			if (imagescount > 1) {
				jQuery(this).slickLightbox({
				    itemSelector: 'img.tileImage',
				    src: function(element) {
				    	$elem = jQuery(element);
				    	return $elem.data('lazy');
				    },
				    lazy: false,
				    caption: 'caption',
				    useHistoryApi: 'true',
				    slick: {
				    	fade:true,
				    	speed: 50
				    }
				});
			}
		});
	};



   var is_chrome = !!window.chrome && !is_opera;
   var isEdge = navigator.userAgent.indexOf('Edge') > 0;
   var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
   var is_firefox = typeof window.InstallTrigger !== 'undefined';
   var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
   var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	var positionStickySupport = function() {
	 var el = document.createElement('a'),
	     mStyle = el.style;
	     mStyle.cssText = "position:sticky;position:-webkit-sticky;position:-ms-sticky;";
	     return mStyle.position.indexOf('sticky')!==-1;
	}();

	if (!isMobile.any()) {

		if (is_safari) {
			jQuery('html').addClass('safari');
		}

		if (is_firefox) {
			jQuery('html').addClass('firefox');
		}

		if (is_explorer) {
			jQuery('html').addClass('ie');
		}

		if (is_chrome) {
			jQuery('html').addClass('chrome');
		}

		if (positionStickySupport) {
			jQuery('html').addClass('sticky-support');
		};

		if ((!is_safari && !is_chrome && !is_firefox)|| !positionStickySupport) {
			jQuery(".sticky-img-stick").hcSticky();
		}

	} else {
		jQuery(".sticky-img-stick").hcSticky();
	}
  

  var body = document.body,
    timer;

   if (jQuery("body").hasClass('template-advancedsearch')) {
      jQuery("#advanced_search_form").submit(function() {
          jQuery('input').each(function() {
              if (jQuery(this).val() == '') {
                  jQuery(this).attr("name", '');
              }
          });

          var content_motifs = document.getElementById('content_motifs');
          if (content_motifs != undefined) {
          	var content_motifs_value = content_motifs.value;
          	if (content_motifs_value != "") {
          		content_motifs.value = content_motifs_value + "*";
          	}
          }
      });
  }

  jQuery(".rrssb-buttons a.popup").on("click", function(event) {
    event.preventDefault();
  });

  jQuery('#images-only-filter').change(function(){
    if (jQuery(this).attr('checked')){
        jQuery(this).val('False');
        jQuery(this).removeAttr('checked');
    } else { 
        jQuery(this).val('True');
        jQuery(this).attr('checked', "checked");
    }
  });

  jQuery('#onview-only-filter').change(function(){
    if (jQuery(this).attr('checked')){
        jQuery(this).val('False');
        jQuery(this).removeAttr('checked');
    } else { 
        jQuery(this).val('True');
        jQuery(this).attr('checked', "checked");
    }
  });

  if (jQuery(".entries").length) {
    jQuery('.tileImage').hover(function() {
      jQuery(this).parents('article.entry, .col-lg-4').find('.item-title a').addClass('hover');
    },
    function() {
      jQuery(this).parents('article.entry, .col-lg-4').find('.item-title a').removeClass('hover');
    });
  }

  jQuery('ul.nav li.dropdown').click(function() {
      jQuery(this).closest('.dropdown-menu').stop(true, true).show();
      jQuery(this).toggleClass("open");
  });
  
  if (isMobile.any()) {
    jQuery("body").addClass("mobile");
  } else {
    jQuery("body").addClass("no-touch");

    var hover_limit = 1050;
    if (jQuery("body").hasClass('plone-toolbar-left-expanded')) {
      hover_limit = 1150;
    }

    jQuery('ul.nav li.dropdown').hover(function() {
        if (window.innerWidth >= hover_limit) {
          jQuery(this).closest('.dropdown-menu').stop(true, true).show();
          jQuery(this).addClass('open');
        }
    }, function() {
        if (window.innerWidth >= hover_limit) {
          jQuery(this).closest('.dropdown-menu').stop(true, true).hide();
          jQuery(this).removeClass('open');
        }
    });
  }
  
  var isLateralNavAnimating = false;
  
  //open/close lateral navigation
  jQuery('.cd-nav-trigger, .cd-nav-trigger-menu, .cta-nav-trigger').on('click touchstart', function(event) {
    event.preventDefault();

    if (slickCarousel != undefined) {
      if (slickCarousel.playing) {
        slickCarousel.pauseCurrentSlide();
      }
    }
    if( !isLateralNavAnimating ) {
      if(jQuery(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 
      jQuery('body').toggleClass('navigation-is-open');
      
      jQuery('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        //animation is over
        
        isLateralNavAnimating = false;
      });
    }
  });

  /* --- ECOMMERCE --- */
  do_ecommerce_transactions();
  /* ----------------- */
});

jQuery(document).ready(function($){
  var mainHeader = jQuery('.cd-auto-hide-header'),
    secondaryNavigation = jQuery('.cd-secondary-nav'),
    //this applies only if secondary nav is below intro section
    belowNavHeroContent = jQuery('.sub-nav-hero'),
    headerHeight = mainHeader.height();
  
  //set scrolling variables
  var scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 150;

  mainHeader.on('click', '.nav-trigger', function(event){
    // open primary navigation on mobile
    event.preventDefault();
    mainHeader.toggleClass('nav-open');
  });

  jQuery(window).on('resize', function(){
    headerHeight = mainHeader.height();
  });

  function autoHideHeader() {
    var currentTop = jQuery(window).scrollTop();

    ( belowNavHeroContent.length > 0 ) 
      ? checkStickyNavigation(currentTop) // secondary navigation below intro
      : checkSimpleNavigation(currentTop);

      previousTop = currentTop;
    scrolling = false;
  }

  function checkSimpleNavigation(currentTop) {
    //there's no secondary nav or secondary nav is below primary nav
      if (previousTop - currentTop > scrollDelta) {
        //if scrolling up...
        mainHeader.removeClass('is-hidden');
      } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        //if scrolling down...
        mainHeader.addClass('is-hidden');
      }
  }

  function checkStickyNavigation(currentTop) {
    //secondary nav below intro section - sticky secondary nav
    var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
    
    if (previousTop >= currentTop ) {
        //if scrolling up... 
        if( currentTop < secondaryNavOffsetTop ) {
          //secondary nav is not fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('fixed slide-up');
          belowNavHeroContent.removeClass('secondary-nav-fixed');
        } else if( previousTop - currentTop > scrollDelta ) {
          //secondary nav is fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }
        
      } else {
        //if scrolling down...  
        if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
          //hide primary nav
          mainHeader.addClass('is-hidden');
          secondaryNavigation.addClass('fixed slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        } else if( currentTop > secondaryNavOffsetTop ) {
          //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.addClass('fixed').removeClass('slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }
      }
  }

  

});

jQuery(document).ready(function($){
	var animating = false;

	//update arrows visibility and detect which section is visible in the viewport
	setSlider();
	$(window).on('scroll resize', function(){
		(!window.requestAnimationFrame) ? setSlider() : window.requestAnimationFrame(setSlider);
	});

	//move to next/previous section clicking on arrows
    $('.cd-vertical-nav .cd-prev').on('click', function(){
    	prevSection();
    });
    $('.cd-vertical-nav .cd-next').on('click', function(){
    	nextSection();
    });
    

    //move to next/previous using the keyboards
    $(document).keydown(function(event){
		if( event.which=='38' || event.which=='37' ) {
			prevSection();
			event.preventDefault();
		} else if( event.which=='40' || event.which=='39' ) {
			nextSection();
			event.preventDefault();
		}
	});

	//go to next section
	function nextSection() {
		if (!animating) {
			if ($('.is-visible[data-type="slider-item"]').next().length > 0) smoothScroll($('.is-visible[data-type="slider-item"]').next());
		}
	}

	//go to previous section
	function prevSection() {
		if (!animating) {
			var prevSection = $('.is-visible[data-type="slider-item"]');
			if(prevSection.length > 0 && $(window).scrollTop() != prevSection.offset().top) {
				smoothScroll(prevSection);
			} else if(prevSection.prev().length > 0 && $(window).scrollTop() == prevSection.offset().top) {
				smoothScroll(prevSection.prev('[data-type="slider-item"]'));
			}
		}
	}

	function setSlider() {
		checkNavigation();
		checkVisibleSection();
	}

	//update the visibility of the navigation arrows
	function checkNavigation() {
	}

	//detect which section is visible in the viewport
	function checkVisibleSection() {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height();

		$('[data-type="slider-item"]').each(function(){
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top;
			//add/remove .is-visible class if the section is in the viewport - it is used to navigate through the sections
			if ( offset >= 0 && offset < windowHeight ) {
				actualBlock.addClass('is-visible');
			} else { 
				actualBlock.removeClass('is-visible');
			}
		});
	}

	function smoothScroll(target) {
		animating = true;
        $('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
	}
});


/* Responsive storytelling enhancement */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

_logger = {};
_logger.debug = false;

_logger.log = function(text) {
  if (_logger.debug) {
    console.log(text);
  }
};

/*require(['jquery', 'pat-registry'],
  function(jQuery, registry) {
    jQuery(document).on('readyAgain', function(event, data) {
      var scansearch = jQuery('body');
      if (event.type == "readyAgain") {
        scansearch = data.fieldset_id;
        registry.scan(jQuery(scansearch));
      }
    });
});*/

/*require([
  'jquery',
], function($, dep1, logger){
  'use strict';
  // initialize only if we are in top frame
  if (window.parent === window) {
    jQuery(document).ready(function() {
      jQuery('body').addClass('hetpark-main');
    });
  }
});*/


