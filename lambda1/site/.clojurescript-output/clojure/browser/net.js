goog.provide('clojure.browser.net');
goog.require('cljs.core');
goog.require('clojure.browser.event');
goog.require('goog.net.XhrIo');
goog.require('goog.net.EventType');
goog.require('goog.net.xpc.CfgFields');
goog.require('goog.net.xpc.CrossPageChannel');
goog.require('goog.json');
clojure.browser.net._STAR_timeout_STAR_ = 10000;
clojure.browser.net.event_types = cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__4412){
var vec__4413__4414 = p__4412;
var k__4415 = cljs.core.nth.call(null,vec__4413__4414,0,null);
var v__4416 = cljs.core.nth.call(null,vec__4413__4414,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4415.toLowerCase()),v__4416]);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = (function() {
var connect = null;
var connect__4447 = (function (this$){
if(cljs.core.truth_((function (){var and__3546__auto____4417 = this$;

if(cljs.core.truth_(and__3546__auto____4417))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4417;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$);
} else
{return (function (){var or__3548__auto____4418 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4418))
{return or__3548__auto____4418;
} else
{var or__3548__auto____4419 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4419))
{return or__3548__auto____4419;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$);
}
});
var connect__4448 = (function (this$,opt1){
if(cljs.core.truth_((function (){var and__3546__auto____4420 = this$;

if(cljs.core.truth_(and__3546__auto____4420))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4420;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1);
} else
{return (function (){var or__3548__auto____4421 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4421))
{return or__3548__auto____4421;
} else
{var or__3548__auto____4422 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4422))
{return or__3548__auto____4422;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1);
}
});
var connect__4449 = (function (this$,opt1,opt2){
if(cljs.core.truth_((function (){var and__3546__auto____4423 = this$;

if(cljs.core.truth_(and__3546__auto____4423))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4423;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1,opt2);
} else
{return (function (){var or__3548__auto____4424 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4424))
{return or__3548__auto____4424;
} else
{var or__3548__auto____4425 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4425))
{return or__3548__auto____4425;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2);
}
});
var connect__4450 = (function (this$,opt1,opt2,opt3){
if(cljs.core.truth_((function (){var and__3546__auto____4426 = this$;

if(cljs.core.truth_(and__3546__auto____4426))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4426;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1,opt2,opt3);
} else
{return (function (){var or__3548__auto____4427 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4427))
{return or__3548__auto____4427;
} else
{var or__3548__auto____4428 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4428))
{return or__3548__auto____4428;
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
return connect__4447.call(this,this$);
case  2 :
return connect__4448.call(this,this$,opt1);
case  3 :
return connect__4449.call(this,this$,opt1,opt2);
case  4 :
return connect__4450.call(this,this$,opt1,opt2,opt3);
}
throw('Invalid arity: ' + arguments.length);
};
return connect;
})()
;
clojure.browser.net.transmit = (function() {
var transmit = null;
var transmit__4452 = (function (this$,opt){
if(cljs.core.truth_((function (){var and__3546__auto____4429 = this$;

if(cljs.core.truth_(and__3546__auto____4429))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4429;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt);
} else
{return (function (){var or__3548__auto____4430 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4430))
{return or__3548__auto____4430;
} else
{var or__3548__auto____4431 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4431))
{return or__3548__auto____4431;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt);
}
});
var transmit__4453 = (function (this$,opt,opt2){
if(cljs.core.truth_((function (){var and__3546__auto____4432 = this$;

if(cljs.core.truth_(and__3546__auto____4432))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4432;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2);
} else
{return (function (){var or__3548__auto____4433 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4433))
{return or__3548__auto____4433;
} else
{var or__3548__auto____4434 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4434))
{return or__3548__auto____4434;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2);
}
});
var transmit__4454 = (function (this$,opt,opt2,opt3){
if(cljs.core.truth_((function (){var and__3546__auto____4435 = this$;

if(cljs.core.truth_(and__3546__auto____4435))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4435;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3);
} else
{return (function (){var or__3548__auto____4436 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4436))
{return or__3548__auto____4436;
} else
{var or__3548__auto____4437 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4437))
{return or__3548__auto____4437;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3);
}
});
var transmit__4455 = (function (this$,opt,opt2,opt3,opt4){
if(cljs.core.truth_((function (){var and__3546__auto____4438 = this$;

if(cljs.core.truth_(and__3546__auto____4438))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4438;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3,opt4);
} else
{return (function (){var or__3548__auto____4439 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4439))
{return or__3548__auto____4439;
} else
{var or__3548__auto____4440 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4440))
{return or__3548__auto____4440;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4);
}
});
var transmit__4456 = (function (this$,opt,opt2,opt3,opt4,opt5){
if(cljs.core.truth_((function (){var and__3546__auto____4441 = this$;

if(cljs.core.truth_(and__3546__auto____4441))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4441;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3,opt4,opt5);
} else
{return (function (){var or__3548__auto____4442 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4442))
{return or__3548__auto____4442;
} else
{var or__3548__auto____4443 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4443))
{return or__3548__auto____4443;
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
return transmit__4452.call(this,this$,opt);
case  3 :
return transmit__4453.call(this,this$,opt,opt2);
case  4 :
return transmit__4454.call(this,this$,opt,opt2,opt3);
case  5 :
return transmit__4455.call(this,this$,opt,opt2,opt3,opt4);
case  6 :
return transmit__4456.call(this,this$,opt,opt2,opt3,opt4,opt5);
}
throw('Invalid arity: ' + arguments.length);
};
return transmit;
})()
;
clojure.browser.net.close = (function close(this$){
if(cljs.core.truth_((function (){var and__3546__auto____4444 = this$;

if(cljs.core.truth_(and__3546__auto____4444))
{return this$.clojure$browser$net$IConnection$close;
} else
{return and__3546__auto____4444;
}
})()))
{return this$.clojure$browser$net$IConnection$close(this$);
} else
{return (function (){var or__3548__auto____4445 = (clojure.browser.net.close[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4445))
{return or__3548__auto____4445;
} else
{var or__3548__auto____4446 = (clojure.browser.net.close["_"]);

if(cljs.core.truth_(or__3548__auto____4446))
{return or__3548__auto____4446;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.close",this$);
}
}
})().call(null,this$);
}
});
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types = (function (this$){
return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__4458){
var vec__4459__4460 = p__4458;
var k__4461 = cljs.core.nth.call(null,vec__4459__4460,0,null);
var v__4462 = cljs.core.nth.call(null,vec__4459__4460,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4461.toLowerCase()),v__4462]);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit = (function() {
var G__4463 = null;
var G__4463__4464 = (function (this$,uri){
return clojure.browser.net.transmit.call(null,this$,uri,"GET",null,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4463__4465 = (function (this$,uri,method){
return clojure.browser.net.transmit.call(null,this$,uri,method,null,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4463__4466 = (function (this$,uri,method,content){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4463__4467 = (function (this$,uri,method,content,headers){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,headers,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4463__4468 = (function (this$,uri,method,content,headers,timeout){
this$.setTimeoutInterval(timeout);
return this$.send(uri,method,content,headers);
});
G__4463 = function(this$,uri,method,content,headers,timeout){
switch(arguments.length){
case  2 :
return G__4463__4464.call(this,this$,uri);
case  3 :
return G__4463__4465.call(this,this$,uri,method);
case  4 :
return G__4463__4466.call(this,this$,uri,method,content);
case  5 :
return G__4463__4467.call(this,this$,uri,method,content,headers);
case  6 :
return G__4463__4468.call(this,this$,uri,method,content,headers,timeout);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4463;
})()
;
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__4470){
var vec__4471__4472 = p__4470;
var k__4473 = cljs.core.nth.call(null,vec__4471__4472,0,null);
var v__4474 = cljs.core.nth.call(null,vec__4471__4472,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4473.toLowerCase()),v__4474]);
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
var register_service__4481 = (function (this$,service_name,fn){
if(cljs.core.truth_((function (){var and__3546__auto____4475 = this$;

if(cljs.core.truth_(and__3546__auto____4475))
{return this$.clojure$browser$net$ICrossPageChannel$register_service;
} else
{return and__3546__auto____4475;
}
})()))
{return this$.clojure$browser$net$ICrossPageChannel$register_service(this$,service_name,fn);
} else
{return (function (){var or__3548__auto____4476 = (clojure.browser.net.register_service[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4476))
{return or__3548__auto____4476;
} else
{var or__3548__auto____4477 = (clojure.browser.net.register_service["_"]);

if(cljs.core.truth_(or__3548__auto____4477))
{return or__3548__auto____4477;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn);
}
});
var register_service__4482 = (function (this$,service_name,fn,encode_json_QMARK_){
if(cljs.core.truth_((function (){var and__3546__auto____4478 = this$;

if(cljs.core.truth_(and__3546__auto____4478))
{return this$.clojure$browser$net$ICrossPageChannel$register_service;
} else
{return and__3546__auto____4478;
}
})()))
{return this$.clojure$browser$net$ICrossPageChannel$register_service(this$,service_name,fn,encode_json_QMARK_);
} else
{return (function (){var or__3548__auto____4479 = (clojure.browser.net.register_service[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4479))
{return or__3548__auto____4479;
} else
{var or__3548__auto____4480 = (clojure.browser.net.register_service["_"]);

if(cljs.core.truth_(or__3548__auto____4480))
{return or__3548__auto____4480;
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
return register_service__4481.call(this,this$,service_name,fn);
case  4 :
return register_service__4482.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
return register_service;
})()
;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect = (function() {
var G__4484 = null;
var G__4484__4485 = (function (this$){
return clojure.browser.net.connect.call(null,this$,null);
});
var G__4484__4486 = (function (this$,on_connect_fn){
return this$.connect(on_connect_fn);
});
var G__4484__4487 = (function (this$,on_connect_fn,config_iframe_fn){
return clojure.browser.net.connect.call(null,this$,on_connect_fn,config_iframe_fn,document.body);
});
var G__4484__4488 = (function (this$,on_connect_fn,config_iframe_fn,iframe_parent){
this$.createPeerIframe(iframe_parent,config_iframe_fn);
return this$.connect(on_connect_fn);
});
G__4484 = function(this$,on_connect_fn,config_iframe_fn,iframe_parent){
switch(arguments.length){
case  1 :
return G__4484__4485.call(this,this$);
case  2 :
return G__4484__4486.call(this,this$,on_connect_fn);
case  3 :
return G__4484__4487.call(this,this$,on_connect_fn,config_iframe_fn);
case  4 :
return G__4484__4488.call(this,this$,on_connect_fn,config_iframe_fn,iframe_parent);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4484;
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
var G__4490 = null;
var G__4490__4491 = (function (this$,service_name,fn){
return clojure.browser.net.register_service.call(null,this$,service_name,fn,false);
});
var G__4490__4492 = (function (this$,service_name,fn,encode_json_QMARK_){
return this$.registerService(cljs.core.name.call(null,service_name),fn,encode_json_QMARK_);
});
G__4490 = function(this$,service_name,fn,encode_json_QMARK_){
switch(arguments.length){
case  3 :
return G__4490__4491.call(this,this$,service_name,fn);
case  4 :
return G__4490__4492.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4490;
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
var xpc_connection__4503 = (function (){
var temp__3698__auto____4494 = (new goog.Uri(window.location.href)).getParameterValue("xpc");

if(cljs.core.truth_(temp__3698__auto____4494))
{var config__4495 = temp__3698__auto____4494;

return (new goog.net.xpc.CrossPageChannel(goog.json.parse.call(null,config__4495)));
} else
{return null;
}
});
var xpc_connection__4504 = (function (config){
return (new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null,(function (sum,p__4496){
var vec__4497__4498 = p__4496;
var k__4499 = cljs.core.nth.call(null,vec__4497__4498,0,null);
var v__4500 = cljs.core.nth.call(null,vec__4497__4498,1,null);

var temp__3695__auto____4501 = cljs.core.get.call(null,clojure.browser.net.xpc_config_fields,k__4499);

if(cljs.core.truth_(temp__3695__auto____4501))
{var field__4502 = temp__3695__auto____4501;

return cljs.core.assoc.call(null,sum,field__4502,v__4500);
} else
{return sum;
}
}),cljs.core.ObjMap.fromObject([],{}),config).strobj));
});
xpc_connection = function(config){
switch(arguments.length){
case  0 :
return xpc_connection__4503.call(this);
case  1 :
return xpc_connection__4504.call(this,config);
}
throw('Invalid arity: ' + arguments.length);
};
return xpc_connection;
})()
;
