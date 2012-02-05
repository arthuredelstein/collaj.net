goog.provide('clojure.browser.net');
goog.require('cljs.core');
goog.require('clojure.browser.event');
goog.require('goog.net.XhrIo');
goog.require('goog.net.EventType');
goog.require('goog.net.xpc.CfgFields');
goog.require('goog.net.xpc.CrossPageChannel');
goog.require('goog.json');
clojure.browser.net._STAR_timeout_STAR_ = 10000;
clojure.browser.net.event_types = cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__2851){
var vec__2852__2853 = p__2851;
var k__2854 = cljs.core.nth.call(null,vec__2852__2853,0,null);
var v__2855 = cljs.core.nth.call(null,vec__2852__2853,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__2854.toLowerCase()),v__2855]);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = (function() {
var connect = null;
var connect__2886 = (function (this$){
if(cljs.core.truth_((function (){var and__3546__auto____2856 = this$;

if(cljs.core.truth_(and__3546__auto____2856))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____2856;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$);
} else
{return (function (){var or__3548__auto____2857 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2857))
{return or__3548__auto____2857;
} else
{var or__3548__auto____2858 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____2858))
{return or__3548__auto____2858;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$);
}
});
var connect__2887 = (function (this$,opt1){
if(cljs.core.truth_((function (){var and__3546__auto____2859 = this$;

if(cljs.core.truth_(and__3546__auto____2859))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____2859;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1);
} else
{return (function (){var or__3548__auto____2860 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2860))
{return or__3548__auto____2860;
} else
{var or__3548__auto____2861 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____2861))
{return or__3548__auto____2861;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1);
}
});
var connect__2888 = (function (this$,opt1,opt2){
if(cljs.core.truth_((function (){var and__3546__auto____2862 = this$;

if(cljs.core.truth_(and__3546__auto____2862))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____2862;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1,opt2);
} else
{return (function (){var or__3548__auto____2863 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2863))
{return or__3548__auto____2863;
} else
{var or__3548__auto____2864 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____2864))
{return or__3548__auto____2864;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2);
}
});
var connect__2889 = (function (this$,opt1,opt2,opt3){
if(cljs.core.truth_((function (){var and__3546__auto____2865 = this$;

if(cljs.core.truth_(and__3546__auto____2865))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____2865;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1,opt2,opt3);
} else
{return (function (){var or__3548__auto____2866 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2866))
{return or__3548__auto____2866;
} else
{var or__3548__auto____2867 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____2867))
{return or__3548__auto____2867;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2,opt3);
}
});
connect = function(this$,opt1,opt2,opt3){
switch(arguments.length){
case  1 :
return connect__2886.call(this,this$);
case  2 :
return connect__2887.call(this,this$,opt1);
case  3 :
return connect__2888.call(this,this$,opt1,opt2);
case  4 :
return connect__2889.call(this,this$,opt1,opt2,opt3);
}
throw('Invalid arity: ' + arguments.length);
};
return connect;
})()
;
clojure.browser.net.transmit = (function() {
var transmit = null;
var transmit__2891 = (function (this$,opt){
if(cljs.core.truth_((function (){var and__3546__auto____2868 = this$;

if(cljs.core.truth_(and__3546__auto____2868))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____2868;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt);
} else
{return (function (){var or__3548__auto____2869 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2869))
{return or__3548__auto____2869;
} else
{var or__3548__auto____2870 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____2870))
{return or__3548__auto____2870;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt);
}
});
var transmit__2892 = (function (this$,opt,opt2){
if(cljs.core.truth_((function (){var and__3546__auto____2871 = this$;

if(cljs.core.truth_(and__3546__auto____2871))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____2871;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2);
} else
{return (function (){var or__3548__auto____2872 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2872))
{return or__3548__auto____2872;
} else
{var or__3548__auto____2873 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____2873))
{return or__3548__auto____2873;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2);
}
});
var transmit__2893 = (function (this$,opt,opt2,opt3){
if(cljs.core.truth_((function (){var and__3546__auto____2874 = this$;

if(cljs.core.truth_(and__3546__auto____2874))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____2874;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3);
} else
{return (function (){var or__3548__auto____2875 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2875))
{return or__3548__auto____2875;
} else
{var or__3548__auto____2876 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____2876))
{return or__3548__auto____2876;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3);
}
});
var transmit__2894 = (function (this$,opt,opt2,opt3,opt4){
if(cljs.core.truth_((function (){var and__3546__auto____2877 = this$;

if(cljs.core.truth_(and__3546__auto____2877))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____2877;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3,opt4);
} else
{return (function (){var or__3548__auto____2878 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2878))
{return or__3548__auto____2878;
} else
{var or__3548__auto____2879 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____2879))
{return or__3548__auto____2879;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4);
}
});
var transmit__2895 = (function (this$,opt,opt2,opt3,opt4,opt5){
if(cljs.core.truth_((function (){var and__3546__auto____2880 = this$;

if(cljs.core.truth_(and__3546__auto____2880))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____2880;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3,opt4,opt5);
} else
{return (function (){var or__3548__auto____2881 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2881))
{return or__3548__auto____2881;
} else
{var or__3548__auto____2882 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____2882))
{return or__3548__auto____2882;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4,opt5);
}
});
transmit = function(this$,opt,opt2,opt3,opt4,opt5){
switch(arguments.length){
case  2 :
return transmit__2891.call(this,this$,opt);
case  3 :
return transmit__2892.call(this,this$,opt,opt2);
case  4 :
return transmit__2893.call(this,this$,opt,opt2,opt3);
case  5 :
return transmit__2894.call(this,this$,opt,opt2,opt3,opt4);
case  6 :
return transmit__2895.call(this,this$,opt,opt2,opt3,opt4,opt5);
}
throw('Invalid arity: ' + arguments.length);
};
return transmit;
})()
;
clojure.browser.net.close = (function close(this$){
if(cljs.core.truth_((function (){var and__3546__auto____2883 = this$;

if(cljs.core.truth_(and__3546__auto____2883))
{return this$.clojure$browser$net$IConnection$close;
} else
{return and__3546__auto____2883;
}
})()))
{return this$.clojure$browser$net$IConnection$close(this$);
} else
{return (function (){var or__3548__auto____2884 = (clojure.browser.net.close[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2884))
{return or__3548__auto____2884;
} else
{var or__3548__auto____2885 = (clojure.browser.net.close["_"]);

if(cljs.core.truth_(or__3548__auto____2885))
{return or__3548__auto____2885;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.close",this$);
}
}
})().call(null,this$);
}
});
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types = (function (this$){
return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__2897){
var vec__2898__2899 = p__2897;
var k__2900 = cljs.core.nth.call(null,vec__2898__2899,0,null);
var v__2901 = cljs.core.nth.call(null,vec__2898__2899,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__2900.toLowerCase()),v__2901]);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit = (function() {
var G__2902 = null;
var G__2902__2903 = (function (this$,uri){
return clojure.browser.net.transmit.call(null,this$,uri,"GET",null,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__2902__2904 = (function (this$,uri,method){
return clojure.browser.net.transmit.call(null,this$,uri,method,null,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__2902__2905 = (function (this$,uri,method,content){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__2902__2906 = (function (this$,uri,method,content,headers){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,headers,clojure.browser.net._STAR_timeout_STAR_);
});
var G__2902__2907 = (function (this$,uri,method,content,headers,timeout){
this$.setTimeoutInterval(timeout);
return this$.send(uri,method,content,headers);
});
G__2902 = function(this$,uri,method,content,headers,timeout){
switch(arguments.length){
case  2 :
return G__2902__2903.call(this,this$,uri);
case  3 :
return G__2902__2904.call(this,this$,uri,method);
case  4 :
return G__2902__2905.call(this,this$,uri,method,content);
case  5 :
return G__2902__2906.call(this,this$,uri,method,content,headers);
case  6 :
return G__2902__2907.call(this,this$,uri,method,content,headers,timeout);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2902;
})()
;
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__2909){
var vec__2910__2911 = p__2909;
var k__2912 = cljs.core.nth.call(null,vec__2910__2911,0,null);
var v__2913 = cljs.core.nth.call(null,vec__2910__2911,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__2912.toLowerCase()),v__2913]);
}),cljs.core.js__GT_clj.call(null,goog.net.xpc.CfgFields)));
/**
* Returns an XhrIo connection
*/
clojure.browser.net.xhr_connection = (function xhr_connection(){
return (new goog.net.XhrIo());
});
clojure.browser.net.ICrossPageChannel = {};
clojure.browser.net.register_service = (function() {
var register_service = null;
var register_service__2920 = (function (this$,service_name,fn){
if(cljs.core.truth_((function (){var and__3546__auto____2914 = this$;

if(cljs.core.truth_(and__3546__auto____2914))
{return this$.clojure$browser$net$ICrossPageChannel$register_service;
} else
{return and__3546__auto____2914;
}
})()))
{return this$.clojure$browser$net$ICrossPageChannel$register_service(this$,service_name,fn);
} else
{return (function (){var or__3548__auto____2915 = (clojure.browser.net.register_service[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2915))
{return or__3548__auto____2915;
} else
{var or__3548__auto____2916 = (clojure.browser.net.register_service["_"]);

if(cljs.core.truth_(or__3548__auto____2916))
{return or__3548__auto____2916;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn);
}
});
var register_service__2921 = (function (this$,service_name,fn,encode_json_QMARK_){
if(cljs.core.truth_((function (){var and__3546__auto____2917 = this$;

if(cljs.core.truth_(and__3546__auto____2917))
{return this$.clojure$browser$net$ICrossPageChannel$register_service;
} else
{return and__3546__auto____2917;
}
})()))
{return this$.clojure$browser$net$ICrossPageChannel$register_service(this$,service_name,fn,encode_json_QMARK_);
} else
{return (function (){var or__3548__auto____2918 = (clojure.browser.net.register_service[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2918))
{return or__3548__auto____2918;
} else
{var or__3548__auto____2919 = (clojure.browser.net.register_service["_"]);

if(cljs.core.truth_(or__3548__auto____2919))
{return or__3548__auto____2919;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn,encode_json_QMARK_);
}
});
register_service = function(this$,service_name,fn,encode_json_QMARK_){
switch(arguments.length){
case  3 :
return register_service__2920.call(this,this$,service_name,fn);
case  4 :
return register_service__2921.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
return register_service;
})()
;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect = (function() {
var G__2923 = null;
var G__2923__2924 = (function (this$){
return clojure.browser.net.connect.call(null,this$,null);
});
var G__2923__2925 = (function (this$,on_connect_fn){
return this$.connect(on_connect_fn);
});
var G__2923__2926 = (function (this$,on_connect_fn,config_iframe_fn){
return clojure.browser.net.connect.call(null,this$,on_connect_fn,config_iframe_fn,document.body);
});
var G__2923__2927 = (function (this$,on_connect_fn,config_iframe_fn,iframe_parent){
this$.createPeerIframe(iframe_parent,config_iframe_fn);
return this$.connect(on_connect_fn);
});
G__2923 = function(this$,on_connect_fn,config_iframe_fn,iframe_parent){
switch(arguments.length){
case  1 :
return G__2923__2924.call(this,this$);
case  2 :
return G__2923__2925.call(this,this$,on_connect_fn);
case  3 :
return G__2923__2926.call(this,this$,on_connect_fn,config_iframe_fn);
case  4 :
return G__2923__2927.call(this,this$,on_connect_fn,config_iframe_fn,iframe_parent);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2923;
})()
;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit = (function (this$,service_name,payload){
return this$.send(cljs.core.name.call(null,service_name),payload);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close = (function (this$){
return this$.close(cljs.core.List.EMPTY);
});
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service = (function() {
var G__2929 = null;
var G__2929__2930 = (function (this$,service_name,fn){
return clojure.browser.net.register_service.call(null,this$,service_name,fn,false);
});
var G__2929__2931 = (function (this$,service_name,fn,encode_json_QMARK_){
return this$.registerService(cljs.core.name.call(null,service_name),fn,encode_json_QMARK_);
});
G__2929 = function(this$,service_name,fn,encode_json_QMARK_){
switch(arguments.length){
case  3 :
return G__2929__2930.call(this,this$,service_name,fn);
case  4 :
return G__2929__2931.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2929;
})()
;
/**
* When passed with a config hash-map, returns a parent
* CrossPageChannel object. Keys in the config hash map are downcased
* versions of the goog.net.xpc.CfgFields enum keys,
* e.g. goog.net.xpc.CfgFields.PEER_URI becomes :peer_uri in the config
* hash.
* 
* When passed with no args, creates a child CrossPageChannel object,
* and the config is automatically taken from the URL param 'xpc', as
* per the CrossPageChannel API.
*/
clojure.browser.net.xpc_connection = (function() {
var xpc_connection = null;
var xpc_connection__2942 = (function (){
var temp__3698__auto____2933 = (new goog.Uri(window.location.href)).getParameterValue("xpc");

if(cljs.core.truth_(temp__3698__auto____2933))
{var config__2934 = temp__3698__auto____2933;

return (new goog.net.xpc.CrossPageChannel(goog.json.parse.call(null,config__2934)));
} else
{return null;
}
});
var xpc_connection__2943 = (function (config){
return (new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null,(function (sum,p__2935){
var vec__2936__2937 = p__2935;
var k__2938 = cljs.core.nth.call(null,vec__2936__2937,0,null);
var v__2939 = cljs.core.nth.call(null,vec__2936__2937,1,null);

var temp__3695__auto____2940 = cljs.core.get.call(null,clojure.browser.net.xpc_config_fields,k__2938);

if(cljs.core.truth_(temp__3695__auto____2940))
{var field__2941 = temp__3695__auto____2940;

return cljs.core.assoc.call(null,sum,field__2941,v__2939);
} else
{return sum;
}
}),cljs.core.ObjMap.fromObject([],{}),config).strobj));
});
xpc_connection = function(config){
switch(arguments.length){
case  0 :
return xpc_connection__2942.call(this);
case  1 :
return xpc_connection__2943.call(this,config);
}
throw('Invalid arity: ' + arguments.length);
};
return xpc_connection;
})()
;