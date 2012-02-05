goog.provide('clojure.browser.net');
goog.require('cljs.core');
goog.require('clojure.browser.event');
goog.require('goog.net.XhrIo');
goog.require('goog.net.EventType');
goog.require('goog.net.xpc.CfgFields');
goog.require('goog.net.xpc.CrossPageChannel');
goog.require('goog.json');
clojure.browser.net._STAR_timeout_STAR_ = 10000;
clojure.browser.net.event_types = cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__4621){
var vec__4622__4623 = p__4621;
var k__4624 = cljs.core.nth.call(null,vec__4622__4623,0,null);
var v__4625 = cljs.core.nth.call(null,vec__4622__4623,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4624.toLowerCase()),v__4625]);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = (function() {
var connect = null;
var connect__4656 = (function (this$){
if(cljs.core.truth_((function (){var and__3546__auto____4626 = this$;

if(cljs.core.truth_(and__3546__auto____4626))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4626;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$);
} else
{return (function (){var or__3548__auto____4627 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4627))
{return or__3548__auto____4627;
} else
{var or__3548__auto____4628 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4628))
{return or__3548__auto____4628;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$);
}
});
var connect__4657 = (function (this$,opt1){
if(cljs.core.truth_((function (){var and__3546__auto____4629 = this$;

if(cljs.core.truth_(and__3546__auto____4629))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4629;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1);
} else
{return (function (){var or__3548__auto____4630 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4630))
{return or__3548__auto____4630;
} else
{var or__3548__auto____4631 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4631))
{return or__3548__auto____4631;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1);
}
});
var connect__4658 = (function (this$,opt1,opt2){
if(cljs.core.truth_((function (){var and__3546__auto____4632 = this$;

if(cljs.core.truth_(and__3546__auto____4632))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4632;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1,opt2);
} else
{return (function (){var or__3548__auto____4633 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4633))
{return or__3548__auto____4633;
} else
{var or__3548__auto____4634 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4634))
{return or__3548__auto____4634;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2);
}
});
var connect__4659 = (function (this$,opt1,opt2,opt3){
if(cljs.core.truth_((function (){var and__3546__auto____4635 = this$;

if(cljs.core.truth_(and__3546__auto____4635))
{return this$.clojure$browser$net$IConnection$connect;
} else
{return and__3546__auto____4635;
}
})()))
{return this$.clojure$browser$net$IConnection$connect(this$,opt1,opt2,opt3);
} else
{return (function (){var or__3548__auto____4636 = (clojure.browser.net.connect[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4636))
{return or__3548__auto____4636;
} else
{var or__3548__auto____4637 = (clojure.browser.net.connect["_"]);

if(cljs.core.truth_(or__3548__auto____4637))
{return or__3548__auto____4637;
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
return connect__4656.call(this,this$);
case  2 :
return connect__4657.call(this,this$,opt1);
case  3 :
return connect__4658.call(this,this$,opt1,opt2);
case  4 :
return connect__4659.call(this,this$,opt1,opt2,opt3);
}
throw('Invalid arity: ' + arguments.length);
};
return connect;
})()
;
clojure.browser.net.transmit = (function() {
var transmit = null;
var transmit__4661 = (function (this$,opt){
if(cljs.core.truth_((function (){var and__3546__auto____4638 = this$;

if(cljs.core.truth_(and__3546__auto____4638))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4638;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt);
} else
{return (function (){var or__3548__auto____4639 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4639))
{return or__3548__auto____4639;
} else
{var or__3548__auto____4640 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4640))
{return or__3548__auto____4640;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt);
}
});
var transmit__4662 = (function (this$,opt,opt2){
if(cljs.core.truth_((function (){var and__3546__auto____4641 = this$;

if(cljs.core.truth_(and__3546__auto____4641))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4641;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2);
} else
{return (function (){var or__3548__auto____4642 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4642))
{return or__3548__auto____4642;
} else
{var or__3548__auto____4643 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4643))
{return or__3548__auto____4643;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2);
}
});
var transmit__4663 = (function (this$,opt,opt2,opt3){
if(cljs.core.truth_((function (){var and__3546__auto____4644 = this$;

if(cljs.core.truth_(and__3546__auto____4644))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4644;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3);
} else
{return (function (){var or__3548__auto____4645 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4645))
{return or__3548__auto____4645;
} else
{var or__3548__auto____4646 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4646))
{return or__3548__auto____4646;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3);
}
});
var transmit__4664 = (function (this$,opt,opt2,opt3,opt4){
if(cljs.core.truth_((function (){var and__3546__auto____4647 = this$;

if(cljs.core.truth_(and__3546__auto____4647))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4647;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3,opt4);
} else
{return (function (){var or__3548__auto____4648 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4648))
{return or__3548__auto____4648;
} else
{var or__3548__auto____4649 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4649))
{return or__3548__auto____4649;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4);
}
});
var transmit__4665 = (function (this$,opt,opt2,opt3,opt4,opt5){
if(cljs.core.truth_((function (){var and__3546__auto____4650 = this$;

if(cljs.core.truth_(and__3546__auto____4650))
{return this$.clojure$browser$net$IConnection$transmit;
} else
{return and__3546__auto____4650;
}
})()))
{return this$.clojure$browser$net$IConnection$transmit(this$,opt,opt2,opt3,opt4,opt5);
} else
{return (function (){var or__3548__auto____4651 = (clojure.browser.net.transmit[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4651))
{return or__3548__auto____4651;
} else
{var or__3548__auto____4652 = (clojure.browser.net.transmit["_"]);

if(cljs.core.truth_(or__3548__auto____4652))
{return or__3548__auto____4652;
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
return transmit__4661.call(this,this$,opt);
case  3 :
return transmit__4662.call(this,this$,opt,opt2);
case  4 :
return transmit__4663.call(this,this$,opt,opt2,opt3);
case  5 :
return transmit__4664.call(this,this$,opt,opt2,opt3,opt4);
case  6 :
return transmit__4665.call(this,this$,opt,opt2,opt3,opt4,opt5);
}
throw('Invalid arity: ' + arguments.length);
};
return transmit;
})()
;
clojure.browser.net.close = (function close(this$){
if(cljs.core.truth_((function (){var and__3546__auto____4653 = this$;

if(cljs.core.truth_(and__3546__auto____4653))
{return this$.clojure$browser$net$IConnection$close;
} else
{return and__3546__auto____4653;
}
})()))
{return this$.clojure$browser$net$IConnection$close(this$);
} else
{return (function (){var or__3548__auto____4654 = (clojure.browser.net.close[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4654))
{return or__3548__auto____4654;
} else
{var or__3548__auto____4655 = (clojure.browser.net.close["_"]);

if(cljs.core.truth_(or__3548__auto____4655))
{return or__3548__auto____4655;
} else
{throw cljs.core.missing_protocol.call(null,"IConnection.close",this$);
}
}
})().call(null,this$);
}
});
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types = (function (this$){
return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__4667){
var vec__4668__4669 = p__4667;
var k__4670 = cljs.core.nth.call(null,vec__4668__4669,0,null);
var v__4671 = cljs.core.nth.call(null,vec__4668__4669,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4670.toLowerCase()),v__4671]);
}),cljs.core.merge.call(null,cljs.core.js__GT_clj.call(null,goog.net.EventType))));
});
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit = (function() {
var G__4672 = null;
var G__4672__4673 = (function (this$,uri){
return clojure.browser.net.transmit.call(null,this$,uri,"GET",null,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4672__4674 = (function (this$,uri,method){
return clojure.browser.net.transmit.call(null,this$,uri,method,null,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4672__4675 = (function (this$,uri,method,content){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,null,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4672__4676 = (function (this$,uri,method,content,headers){
return clojure.browser.net.transmit.call(null,this$,uri,method,content,headers,clojure.browser.net._STAR_timeout_STAR_);
});
var G__4672__4677 = (function (this$,uri,method,content,headers,timeout){
this$.setTimeoutInterval(timeout);
return this$.send(uri,method,content,headers);
});
G__4672 = function(this$,uri,method,content,headers,timeout){
switch(arguments.length){
case  2 :
return G__4672__4673.call(this,this$,uri);
case  3 :
return G__4672__4674.call(this,this$,uri,method);
case  4 :
return G__4672__4675.call(this,this$,uri,method,content);
case  5 :
return G__4672__4676.call(this,this$,uri,method,content,headers);
case  6 :
return G__4672__4677.call(this,this$,uri,method,content,headers,timeout);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4672;
})()
;
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p__4679){
var vec__4680__4681 = p__4679;
var k__4682 = cljs.core.nth.call(null,vec__4680__4681,0,null);
var v__4683 = cljs.core.nth.call(null,vec__4680__4681,1,null);

return cljs.core.Vector.fromArray([cljs.core.keyword.call(null,k__4682.toLowerCase()),v__4683]);
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
var register_service__4690 = (function (this$,service_name,fn){
if(cljs.core.truth_((function (){var and__3546__auto____4684 = this$;

if(cljs.core.truth_(and__3546__auto____4684))
{return this$.clojure$browser$net$ICrossPageChannel$register_service;
} else
{return and__3546__auto____4684;
}
})()))
{return this$.clojure$browser$net$ICrossPageChannel$register_service(this$,service_name,fn);
} else
{return (function (){var or__3548__auto____4685 = (clojure.browser.net.register_service[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4685))
{return or__3548__auto____4685;
} else
{var or__3548__auto____4686 = (clojure.browser.net.register_service["_"]);

if(cljs.core.truth_(or__3548__auto____4686))
{return or__3548__auto____4686;
} else
{throw cljs.core.missing_protocol.call(null,"ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn);
}
});
var register_service__4691 = (function (this$,service_name,fn,encode_json_QMARK_){
if(cljs.core.truth_((function (){var and__3546__auto____4687 = this$;

if(cljs.core.truth_(and__3546__auto____4687))
{return this$.clojure$browser$net$ICrossPageChannel$register_service;
} else
{return and__3546__auto____4687;
}
})()))
{return this$.clojure$browser$net$ICrossPageChannel$register_service(this$,service_name,fn,encode_json_QMARK_);
} else
{return (function (){var or__3548__auto____4688 = (clojure.browser.net.register_service[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____4688))
{return or__3548__auto____4688;
} else
{var or__3548__auto____4689 = (clojure.browser.net.register_service["_"]);

if(cljs.core.truth_(or__3548__auto____4689))
{return or__3548__auto____4689;
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
return register_service__4690.call(this,this$,service_name,fn);
case  4 :
return register_service__4691.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
return register_service;
})()
;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect = (function() {
var G__4693 = null;
var G__4693__4694 = (function (this$){
return clojure.browser.net.connect.call(null,this$,null);
});
var G__4693__4695 = (function (this$,on_connect_fn){
return this$.connect(on_connect_fn);
});
var G__4693__4696 = (function (this$,on_connect_fn,config_iframe_fn){
return clojure.browser.net.connect.call(null,this$,on_connect_fn,config_iframe_fn,document.body);
});
var G__4693__4697 = (function (this$,on_connect_fn,config_iframe_fn,iframe_parent){
this$.createPeerIframe(iframe_parent,config_iframe_fn);
return this$.connect(on_connect_fn);
});
G__4693 = function(this$,on_connect_fn,config_iframe_fn,iframe_parent){
switch(arguments.length){
case  1 :
return G__4693__4694.call(this,this$);
case  2 :
return G__4693__4695.call(this,this$,on_connect_fn);
case  3 :
return G__4693__4696.call(this,this$,on_connect_fn,config_iframe_fn);
case  4 :
return G__4693__4697.call(this,this$,on_connect_fn,config_iframe_fn,iframe_parent);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4693;
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
var G__4699 = null;
var G__4699__4700 = (function (this$,service_name,fn){
return clojure.browser.net.register_service.call(null,this$,service_name,fn,false);
});
var G__4699__4701 = (function (this$,service_name,fn,encode_json_QMARK_){
return this$.registerService(cljs.core.name.call(null,service_name),fn,encode_json_QMARK_);
});
G__4699 = function(this$,service_name,fn,encode_json_QMARK_){
switch(arguments.length){
case  3 :
return G__4699__4700.call(this,this$,service_name,fn);
case  4 :
return G__4699__4701.call(this,this$,service_name,fn,encode_json_QMARK_);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4699;
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
var xpc_connection__4712 = (function (){
var temp__3698__auto____4703 = (new goog.Uri(window.location.href)).getParameterValue("xpc");

if(cljs.core.truth_(temp__3698__auto____4703))
{var config__4704 = temp__3698__auto____4703;

return (new goog.net.xpc.CrossPageChannel(goog.json.parse.call(null,config__4704)));
} else
{return null;
}
});
var xpc_connection__4713 = (function (config){
return (new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null,(function (sum,p__4705){
var vec__4706__4707 = p__4705;
var k__4708 = cljs.core.nth.call(null,vec__4706__4707,0,null);
var v__4709 = cljs.core.nth.call(null,vec__4706__4707,1,null);

var temp__3695__auto____4710 = cljs.core.get.call(null,clojure.browser.net.xpc_config_fields,k__4708);

if(cljs.core.truth_(temp__3695__auto____4710))
{var field__4711 = temp__3695__auto____4710;

return cljs.core.assoc.call(null,sum,field__4711,v__4709);
} else
{return sum;
}
}),cljs.core.ObjMap.fromObject([],{}),config).strobj));
});
xpc_connection = function(config){
switch(arguments.length){
case  0 :
return xpc_connection__4712.call(this);
case  1 :
return xpc_connection__4713.call(this,config);
}
throw('Invalid arity: ' + arguments.length);
};
return xpc_connection;
})()
;
