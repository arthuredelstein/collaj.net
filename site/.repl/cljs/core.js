goog.provide('cljs.core');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');
goog.require('goog.object');
goog.require('goog.array');
/**
* Each runtime environment provides a diffenent way to print output.
* Whatever function *print-fn* is bound to will be passed any
* Strings which should be printed.
*/
cljs.core._STAR_print_fn_STAR_ = (function _STAR_print_fn_STAR_(_){
throw (new Error("No *print-fn* fn set for evaluation environment"));
});
/**
* Internal - do not use!
*/
cljs.core.truth_ = (function truth_(x){
return (x != null && x !== false);
});
/**
* Internal - do not use!
*/
cljs.core.type_satisfies_ = (function type_satisfies_(p,x){
var or__3548__auto____2952 = (p[goog.typeOf.call(null,x)]);

if(cljs.core.truth_(or__3548__auto____2952))
{return or__3548__auto____2952;
} else
{var or__3548__auto____2953 = (p["_"]);

if(cljs.core.truth_(or__3548__auto____2953))
{return or__3548__auto____2953;
} else
{return false;
}
}
});
cljs.core.is_proto_ = (function is_proto_(x){
return (x).constructor.prototype === x;
});
/**
* When compiled for a command-line target, whatever
* function *main-fn* is set to will be called with the command-line
* argv as arguments
*/
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = (function missing_protocol(proto,obj){
return Error.call(null,"No protocol method "+proto+" defined for type "+goog.typeOf.call(null,obj)+": "+obj);
});
/**
* Returns a javascript array, cloned from the passed in array
*/
cljs.core.aclone = (function aclone(array_like){
return Array.prototype.slice.call(array_like);
});
/**
* Creates a new javascript array.
* @param {...*} var_args
*/
cljs.core.array = (function array(var_args){
return Array.prototype.slice.call(arguments);
});
/**
* Returns the value at the index.
*/
cljs.core.aget = (function aget(array,i){
return (array[i]);
});
/**
* Sets the value at the index.
*/
cljs.core.aset = (function aset(array,i,val){
return (array[i] = val);
});
/**
* Returns the length of the Java array. Works on arrays of all types.
*/
cljs.core.alength = (function alength(array){
return array.length;
});
cljs.core.IFn = {};
cljs.core._invoke = (function() {
var _invoke = null;
var _invoke__3017 = (function (this$){
if(cljs.core.truth_((function (){var and__3546__auto____2954 = this$;

if(cljs.core.truth_(and__3546__auto____2954))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2954;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$);
} else
{return (function (){var or__3548__auto____2955 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2955))
{return or__3548__auto____2955;
} else
{var or__3548__auto____2956 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2956))
{return or__3548__auto____2956;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$);
}
});
var _invoke__3018 = (function (this$,a){
if(cljs.core.truth_((function (){var and__3546__auto____2957 = this$;

if(cljs.core.truth_(and__3546__auto____2957))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2957;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a);
} else
{return (function (){var or__3548__auto____2958 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2958))
{return or__3548__auto____2958;
} else
{var or__3548__auto____2959 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2959))
{return or__3548__auto____2959;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a);
}
});
var _invoke__3019 = (function (this$,a,b){
if(cljs.core.truth_((function (){var and__3546__auto____2960 = this$;

if(cljs.core.truth_(and__3546__auto____2960))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2960;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b);
} else
{return (function (){var or__3548__auto____2961 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2961))
{return or__3548__auto____2961;
} else
{var or__3548__auto____2962 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2962))
{return or__3548__auto____2962;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b);
}
});
var _invoke__3020 = (function (this$,a,b,c){
if(cljs.core.truth_((function (){var and__3546__auto____2963 = this$;

if(cljs.core.truth_(and__3546__auto____2963))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2963;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c);
} else
{return (function (){var or__3548__auto____2964 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2964))
{return or__3548__auto____2964;
} else
{var or__3548__auto____2965 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2965))
{return or__3548__auto____2965;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c);
}
});
var _invoke__3021 = (function (this$,a,b,c,d){
if(cljs.core.truth_((function (){var and__3546__auto____2966 = this$;

if(cljs.core.truth_(and__3546__auto____2966))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2966;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d);
} else
{return (function (){var or__3548__auto____2967 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2967))
{return or__3548__auto____2967;
} else
{var or__3548__auto____2968 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2968))
{return or__3548__auto____2968;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d);
}
});
var _invoke__3022 = (function (this$,a,b,c,d,e){
if(cljs.core.truth_((function (){var and__3546__auto____2969 = this$;

if(cljs.core.truth_(and__3546__auto____2969))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2969;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e);
} else
{return (function (){var or__3548__auto____2970 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2970))
{return or__3548__auto____2970;
} else
{var or__3548__auto____2971 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2971))
{return or__3548__auto____2971;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e);
}
});
var _invoke__3023 = (function (this$,a,b,c,d,e,f){
if(cljs.core.truth_((function (){var and__3546__auto____2972 = this$;

if(cljs.core.truth_(and__3546__auto____2972))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2972;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f);
} else
{return (function (){var or__3548__auto____2973 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2973))
{return or__3548__auto____2973;
} else
{var or__3548__auto____2974 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2974))
{return or__3548__auto____2974;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f);
}
});
var _invoke__3024 = (function (this$,a,b,c,d,e,f,g){
if(cljs.core.truth_((function (){var and__3546__auto____2975 = this$;

if(cljs.core.truth_(and__3546__auto____2975))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2975;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g);
} else
{return (function (){var or__3548__auto____2976 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2976))
{return or__3548__auto____2976;
} else
{var or__3548__auto____2977 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2977))
{return or__3548__auto____2977;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g);
}
});
var _invoke__3025 = (function (this$,a,b,c,d,e,f,g,h){
if(cljs.core.truth_((function (){var and__3546__auto____2978 = this$;

if(cljs.core.truth_(and__3546__auto____2978))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2978;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h);
} else
{return (function (){var or__3548__auto____2979 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2979))
{return or__3548__auto____2979;
} else
{var or__3548__auto____2980 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2980))
{return or__3548__auto____2980;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h);
}
});
var _invoke__3026 = (function (this$,a,b,c,d,e,f,g,h,i){
if(cljs.core.truth_((function (){var and__3546__auto____2981 = this$;

if(cljs.core.truth_(and__3546__auto____2981))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2981;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i);
} else
{return (function (){var or__3548__auto____2982 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2982))
{return or__3548__auto____2982;
} else
{var or__3548__auto____2983 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2983))
{return or__3548__auto____2983;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i);
}
});
var _invoke__3027 = (function (this$,a,b,c,d,e,f,g,h,i,j){
if(cljs.core.truth_((function (){var and__3546__auto____2984 = this$;

if(cljs.core.truth_(and__3546__auto____2984))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2984;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j);
} else
{return (function (){var or__3548__auto____2985 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2985))
{return or__3548__auto____2985;
} else
{var or__3548__auto____2986 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2986))
{return or__3548__auto____2986;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j);
}
});
var _invoke__3028 = (function (this$,a,b,c,d,e,f,g,h,i,j,k){
if(cljs.core.truth_((function (){var and__3546__auto____2987 = this$;

if(cljs.core.truth_(and__3546__auto____2987))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2987;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k);
} else
{return (function (){var or__3548__auto____2988 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2988))
{return or__3548__auto____2988;
} else
{var or__3548__auto____2989 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2989))
{return or__3548__auto____2989;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k);
}
});
var _invoke__3029 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l){
if(cljs.core.truth_((function (){var and__3546__auto____2990 = this$;

if(cljs.core.truth_(and__3546__auto____2990))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2990;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l);
} else
{return (function (){var or__3548__auto____2991 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2991))
{return or__3548__auto____2991;
} else
{var or__3548__auto____2992 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2992))
{return or__3548__auto____2992;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l);
}
});
var _invoke__3030 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m){
if(cljs.core.truth_((function (){var and__3546__auto____2993 = this$;

if(cljs.core.truth_(and__3546__auto____2993))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2993;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
} else
{return (function (){var or__3548__auto____2994 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2994))
{return or__3548__auto____2994;
} else
{var or__3548__auto____2995 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2995))
{return or__3548__auto____2995;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
}
});
var _invoke__3031 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n){
if(cljs.core.truth_((function (){var and__3546__auto____2996 = this$;

if(cljs.core.truth_(and__3546__auto____2996))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2996;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
} else
{return (function (){var or__3548__auto____2997 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2997))
{return or__3548__auto____2997;
} else
{var or__3548__auto____2998 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____2998))
{return or__3548__auto____2998;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
}
});
var _invoke__3032 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
if(cljs.core.truth_((function (){var and__3546__auto____2999 = this$;

if(cljs.core.truth_(and__3546__auto____2999))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____2999;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
} else
{return (function (){var or__3548__auto____3000 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3000))
{return or__3548__auto____3000;
} else
{var or__3548__auto____3001 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____3001))
{return or__3548__auto____3001;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}
});
var _invoke__3033 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
if(cljs.core.truth_((function (){var and__3546__auto____3002 = this$;

if(cljs.core.truth_(and__3546__auto____3002))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____3002;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
} else
{return (function (){var or__3548__auto____3003 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3003))
{return or__3548__auto____3003;
} else
{var or__3548__auto____3004 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____3004))
{return or__3548__auto____3004;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
}
});
var _invoke__3034 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){
if(cljs.core.truth_((function (){var and__3546__auto____3005 = this$;

if(cljs.core.truth_(and__3546__auto____3005))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____3005;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
} else
{return (function (){var or__3548__auto____3006 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3006))
{return or__3548__auto____3006;
} else
{var or__3548__auto____3007 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____3007))
{return or__3548__auto____3007;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
}
});
var _invoke__3035 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s){
if(cljs.core.truth_((function (){var and__3546__auto____3008 = this$;

if(cljs.core.truth_(and__3546__auto____3008))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____3008;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
} else
{return (function (){var or__3548__auto____3009 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3009))
{return or__3548__auto____3009;
} else
{var or__3548__auto____3010 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____3010))
{return or__3548__auto____3010;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
}
});
var _invoke__3036 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t){
if(cljs.core.truth_((function (){var and__3546__auto____3011 = this$;

if(cljs.core.truth_(and__3546__auto____3011))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____3011;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
} else
{return (function (){var or__3548__auto____3012 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3012))
{return or__3548__auto____3012;
} else
{var or__3548__auto____3013 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____3013))
{return or__3548__auto____3013;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
}
});
var _invoke__3037 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
if(cljs.core.truth_((function (){var and__3546__auto____3014 = this$;

if(cljs.core.truth_(and__3546__auto____3014))
{return this$.cljs$core$IFn$_invoke;
} else
{return and__3546__auto____3014;
}
})()))
{return this$.cljs$core$IFn$_invoke(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
} else
{return (function (){var or__3548__auto____3015 = (cljs.core._invoke[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3015))
{return or__3548__auto____3015;
} else
{var or__3548__auto____3016 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____3016))
{return or__3548__auto____3016;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
});
_invoke = function(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
switch(arguments.length){
case  1 :
return _invoke__3017.call(this,this$);
case  2 :
return _invoke__3018.call(this,this$,a);
case  3 :
return _invoke__3019.call(this,this$,a,b);
case  4 :
return _invoke__3020.call(this,this$,a,b,c);
case  5 :
return _invoke__3021.call(this,this$,a,b,c,d);
case  6 :
return _invoke__3022.call(this,this$,a,b,c,d,e);
case  7 :
return _invoke__3023.call(this,this$,a,b,c,d,e,f);
case  8 :
return _invoke__3024.call(this,this$,a,b,c,d,e,f,g);
case  9 :
return _invoke__3025.call(this,this$,a,b,c,d,e,f,g,h);
case  10 :
return _invoke__3026.call(this,this$,a,b,c,d,e,f,g,h,i);
case  11 :
return _invoke__3027.call(this,this$,a,b,c,d,e,f,g,h,i,j);
case  12 :
return _invoke__3028.call(this,this$,a,b,c,d,e,f,g,h,i,j,k);
case  13 :
return _invoke__3029.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l);
case  14 :
return _invoke__3030.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
case  15 :
return _invoke__3031.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
case  16 :
return _invoke__3032.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
case  17 :
return _invoke__3033.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
case  18 :
return _invoke__3034.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
case  19 :
return _invoke__3035.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
case  20 :
return _invoke__3036.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
case  21 :
return _invoke__3037.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
throw('Invalid arity: ' + arguments.length);
};
return _invoke;
})()
;
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if(cljs.core.truth_((function (){var and__3546__auto____3039 = coll;

if(cljs.core.truth_(and__3546__auto____3039))
{return coll.cljs$core$ICounted$_count;
} else
{return and__3546__auto____3039;
}
})()))
{return coll.cljs$core$ICounted$_count(coll);
} else
{return (function (){var or__3548__auto____3040 = (cljs.core._count[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3040))
{return or__3548__auto____3040;
} else
{var or__3548__auto____3041 = (cljs.core._count["_"]);

if(cljs.core.truth_(or__3548__auto____3041))
{return or__3548__auto____3041;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if(cljs.core.truth_((function (){var and__3546__auto____3042 = coll;

if(cljs.core.truth_(and__3546__auto____3042))
{return coll.cljs$core$IEmptyableCollection$_empty;
} else
{return and__3546__auto____3042;
}
})()))
{return coll.cljs$core$IEmptyableCollection$_empty(coll);
} else
{return (function (){var or__3548__auto____3043 = (cljs.core._empty[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3043))
{return or__3548__auto____3043;
} else
{var or__3548__auto____3044 = (cljs.core._empty["_"]);

if(cljs.core.truth_(or__3548__auto____3044))
{return or__3548__auto____3044;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if(cljs.core.truth_((function (){var and__3546__auto____3045 = coll;

if(cljs.core.truth_(and__3546__auto____3045))
{return coll.cljs$core$ICollection$_conj;
} else
{return and__3546__auto____3045;
}
})()))
{return coll.cljs$core$ICollection$_conj(coll,o);
} else
{return (function (){var or__3548__auto____3046 = (cljs.core._conj[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3046))
{return or__3548__auto____3046;
} else
{var or__3548__auto____3047 = (cljs.core._conj["_"]);

if(cljs.core.truth_(or__3548__auto____3047))
{return or__3548__auto____3047;
} else
{throw cljs.core.missing_protocol.call(null,"ICollection.-conj",coll);
}
}
})().call(null,coll,o);
}
});
cljs.core.IIndexed = {};
cljs.core._nth = (function() {
var _nth = null;
var _nth__3054 = (function (coll,n){
if(cljs.core.truth_((function (){var and__3546__auto____3048 = coll;

if(cljs.core.truth_(and__3546__auto____3048))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____3048;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n);
} else
{return (function (){var or__3548__auto____3049 = (cljs.core._nth[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3049))
{return or__3548__auto____3049;
} else
{var or__3548__auto____3050 = (cljs.core._nth["_"]);

if(cljs.core.truth_(or__3548__auto____3050))
{return or__3548__auto____3050;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__3055 = (function (coll,n,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____3051 = coll;

if(cljs.core.truth_(and__3546__auto____3051))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____3051;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n,not_found);
} else
{return (function (){var or__3548__auto____3052 = (cljs.core._nth[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3052))
{return or__3548__auto____3052;
} else
{var or__3548__auto____3053 = (cljs.core._nth["_"]);

if(cljs.core.truth_(or__3548__auto____3053))
{return or__3548__auto____3053;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n,not_found);
}
});
_nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return _nth__3054.call(this,coll,n);
case  3 :
return _nth__3055.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _nth;
})()
;
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if(cljs.core.truth_((function (){var and__3546__auto____3057 = coll;

if(cljs.core.truth_(and__3546__auto____3057))
{return coll.cljs$core$ISeq$_first;
} else
{return and__3546__auto____3057;
}
})()))
{return coll.cljs$core$ISeq$_first(coll);
} else
{return (function (){var or__3548__auto____3058 = (cljs.core._first[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3058))
{return or__3548__auto____3058;
} else
{var or__3548__auto____3059 = (cljs.core._first["_"]);

if(cljs.core.truth_(or__3548__auto____3059))
{return or__3548__auto____3059;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if(cljs.core.truth_((function (){var and__3546__auto____3060 = coll;

if(cljs.core.truth_(and__3546__auto____3060))
{return coll.cljs$core$ISeq$_rest;
} else
{return and__3546__auto____3060;
}
})()))
{return coll.cljs$core$ISeq$_rest(coll);
} else
{return (function (){var or__3548__auto____3061 = (cljs.core._rest[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3061))
{return or__3548__auto____3061;
} else
{var or__3548__auto____3062 = (cljs.core._rest["_"]);

if(cljs.core.truth_(or__3548__auto____3062))
{return or__3548__auto____3062;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ILookup = {};
cljs.core._lookup = (function() {
var _lookup = null;
var _lookup__3069 = (function (o,k){
if(cljs.core.truth_((function (){var and__3546__auto____3063 = o;

if(cljs.core.truth_(and__3546__auto____3063))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____3063;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k);
} else
{return (function (){var or__3548__auto____3064 = (cljs.core._lookup[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3064))
{return or__3548__auto____3064;
} else
{var or__3548__auto____3065 = (cljs.core._lookup["_"]);

if(cljs.core.truth_(or__3548__auto____3065))
{return or__3548__auto____3065;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__3070 = (function (o,k,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____3066 = o;

if(cljs.core.truth_(and__3546__auto____3066))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____3066;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k,not_found);
} else
{return (function (){var or__3548__auto____3067 = (cljs.core._lookup[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3067))
{return or__3548__auto____3067;
} else
{var or__3548__auto____3068 = (cljs.core._lookup["_"]);

if(cljs.core.truth_(or__3548__auto____3068))
{return or__3548__auto____3068;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k,not_found);
}
});
_lookup = function(o,k,not_found){
switch(arguments.length){
case  2 :
return _lookup__3069.call(this,o,k);
case  3 :
return _lookup__3070.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____3072 = coll;

if(cljs.core.truth_(and__3546__auto____3072))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_;
} else
{return and__3546__auto____3072;
}
})()))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_(coll,k);
} else
{return (function (){var or__3548__auto____3073 = (cljs.core._contains_key_QMARK_[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3073))
{return or__3548__auto____3073;
} else
{var or__3548__auto____3074 = (cljs.core._contains_key_QMARK_["_"]);

if(cljs.core.truth_(or__3548__auto____3074))
{return or__3548__auto____3074;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if(cljs.core.truth_((function (){var and__3546__auto____3075 = coll;

if(cljs.core.truth_(and__3546__auto____3075))
{return coll.cljs$core$IAssociative$_assoc;
} else
{return and__3546__auto____3075;
}
})()))
{return coll.cljs$core$IAssociative$_assoc(coll,k,v);
} else
{return (function (){var or__3548__auto____3076 = (cljs.core._assoc[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3076))
{return or__3548__auto____3076;
} else
{var or__3548__auto____3077 = (cljs.core._assoc["_"]);

if(cljs.core.truth_(or__3548__auto____3077))
{return or__3548__auto____3077;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____3078 = coll;

if(cljs.core.truth_(and__3546__auto____3078))
{return coll.cljs$core$IMap$_dissoc;
} else
{return and__3546__auto____3078;
}
})()))
{return coll.cljs$core$IMap$_dissoc(coll,k);
} else
{return (function (){var or__3548__auto____3079 = (cljs.core._dissoc[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3079))
{return or__3548__auto____3079;
} else
{var or__3548__auto____3080 = (cljs.core._dissoc["_"]);

if(cljs.core.truth_(or__3548__auto____3080))
{return or__3548__auto____3080;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if(cljs.core.truth_((function (){var and__3546__auto____3081 = coll;

if(cljs.core.truth_(and__3546__auto____3081))
{return coll.cljs$core$ISet$_disjoin;
} else
{return and__3546__auto____3081;
}
})()))
{return coll.cljs$core$ISet$_disjoin(coll,v);
} else
{return (function (){var or__3548__auto____3082 = (cljs.core._disjoin[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3082))
{return or__3548__auto____3082;
} else
{var or__3548__auto____3083 = (cljs.core._disjoin["_"]);

if(cljs.core.truth_(or__3548__auto____3083))
{return or__3548__auto____3083;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if(cljs.core.truth_((function (){var and__3546__auto____3084 = coll;

if(cljs.core.truth_(and__3546__auto____3084))
{return coll.cljs$core$IStack$_peek;
} else
{return and__3546__auto____3084;
}
})()))
{return coll.cljs$core$IStack$_peek(coll);
} else
{return (function (){var or__3548__auto____3085 = (cljs.core._peek[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3085))
{return or__3548__auto____3085;
} else
{var or__3548__auto____3086 = (cljs.core._peek["_"]);

if(cljs.core.truth_(or__3548__auto____3086))
{return or__3548__auto____3086;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if(cljs.core.truth_((function (){var and__3546__auto____3087 = coll;

if(cljs.core.truth_(and__3546__auto____3087))
{return coll.cljs$core$IStack$_pop;
} else
{return and__3546__auto____3087;
}
})()))
{return coll.cljs$core$IStack$_pop(coll);
} else
{return (function (){var or__3548__auto____3088 = (cljs.core._pop[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3088))
{return or__3548__auto____3088;
} else
{var or__3548__auto____3089 = (cljs.core._pop["_"]);

if(cljs.core.truth_(or__3548__auto____3089))
{return or__3548__auto____3089;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if(cljs.core.truth_((function (){var and__3546__auto____3090 = coll;

if(cljs.core.truth_(and__3546__auto____3090))
{return coll.cljs$core$IVector$_assoc_n;
} else
{return and__3546__auto____3090;
}
})()))
{return coll.cljs$core$IVector$_assoc_n(coll,n,val);
} else
{return (function (){var or__3548__auto____3091 = (cljs.core._assoc_n[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3091))
{return or__3548__auto____3091;
} else
{var or__3548__auto____3092 = (cljs.core._assoc_n["_"]);

if(cljs.core.truth_(or__3548__auto____3092))
{return or__3548__auto____3092;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if(cljs.core.truth_((function (){var and__3546__auto____3093 = o;

if(cljs.core.truth_(and__3546__auto____3093))
{return o.cljs$core$IDeref$_deref;
} else
{return and__3546__auto____3093;
}
})()))
{return o.cljs$core$IDeref$_deref(o);
} else
{return (function (){var or__3548__auto____3094 = (cljs.core._deref[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3094))
{return or__3548__auto____3094;
} else
{var or__3548__auto____3095 = (cljs.core._deref["_"]);

if(cljs.core.truth_(or__3548__auto____3095))
{return or__3548__auto____3095;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if(cljs.core.truth_((function (){var and__3546__auto____3096 = o;

if(cljs.core.truth_(and__3546__auto____3096))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout;
} else
{return and__3546__auto____3096;
}
})()))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout(o,msec,timeout_val);
} else
{return (function (){var or__3548__auto____3097 = (cljs.core._deref_with_timeout[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3097))
{return or__3548__auto____3097;
} else
{var or__3548__auto____3098 = (cljs.core._deref_with_timeout["_"]);

if(cljs.core.truth_(or__3548__auto____3098))
{return or__3548__auto____3098;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if(cljs.core.truth_((function (){var and__3546__auto____3099 = o;

if(cljs.core.truth_(and__3546__auto____3099))
{return o.cljs$core$IMeta$_meta;
} else
{return and__3546__auto____3099;
}
})()))
{return o.cljs$core$IMeta$_meta(o);
} else
{return (function (){var or__3548__auto____3100 = (cljs.core._meta[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3100))
{return or__3548__auto____3100;
} else
{var or__3548__auto____3101 = (cljs.core._meta["_"]);

if(cljs.core.truth_(or__3548__auto____3101))
{return or__3548__auto____3101;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if(cljs.core.truth_((function (){var and__3546__auto____3102 = o;

if(cljs.core.truth_(and__3546__auto____3102))
{return o.cljs$core$IWithMeta$_with_meta;
} else
{return and__3546__auto____3102;
}
})()))
{return o.cljs$core$IWithMeta$_with_meta(o,meta);
} else
{return (function (){var or__3548__auto____3103 = (cljs.core._with_meta[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3103))
{return or__3548__auto____3103;
} else
{var or__3548__auto____3104 = (cljs.core._with_meta["_"]);

if(cljs.core.truth_(or__3548__auto____3104))
{return or__3548__auto____3104;
} else
{throw cljs.core.missing_protocol.call(null,"IWithMeta.-with-meta",o);
}
}
})().call(null,o,meta);
}
});
cljs.core.IReduce = {};
cljs.core._reduce = (function() {
var _reduce = null;
var _reduce__3111 = (function (coll,f){
if(cljs.core.truth_((function (){var and__3546__auto____3105 = coll;

if(cljs.core.truth_(and__3546__auto____3105))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____3105;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f);
} else
{return (function (){var or__3548__auto____3106 = (cljs.core._reduce[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3106))
{return or__3548__auto____3106;
} else
{var or__3548__auto____3107 = (cljs.core._reduce["_"]);

if(cljs.core.truth_(or__3548__auto____3107))
{return or__3548__auto____3107;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__3112 = (function (coll,f,start){
if(cljs.core.truth_((function (){var and__3546__auto____3108 = coll;

if(cljs.core.truth_(and__3546__auto____3108))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____3108;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f,start);
} else
{return (function (){var or__3548__auto____3109 = (cljs.core._reduce[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____3109))
{return or__3548__auto____3109;
} else
{var or__3548__auto____3110 = (cljs.core._reduce["_"]);

if(cljs.core.truth_(or__3548__auto____3110))
{return or__3548__auto____3110;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f,start);
}
});
_reduce = function(coll,f,start){
switch(arguments.length){
case  2 :
return _reduce__3111.call(this,coll,f);
case  3 :
return _reduce__3112.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return _reduce;
})()
;
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if(cljs.core.truth_((function (){var and__3546__auto____3114 = o;

if(cljs.core.truth_(and__3546__auto____3114))
{return o.cljs$core$IEquiv$_equiv;
} else
{return and__3546__auto____3114;
}
})()))
{return o.cljs$core$IEquiv$_equiv(o,other);
} else
{return (function (){var or__3548__auto____3115 = (cljs.core._equiv[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3115))
{return or__3548__auto____3115;
} else
{var or__3548__auto____3116 = (cljs.core._equiv["_"]);

if(cljs.core.truth_(or__3548__auto____3116))
{return or__3548__auto____3116;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if(cljs.core.truth_((function (){var and__3546__auto____3117 = o;

if(cljs.core.truth_(and__3546__auto____3117))
{return o.cljs$core$IHash$_hash;
} else
{return and__3546__auto____3117;
}
})()))
{return o.cljs$core$IHash$_hash(o);
} else
{return (function (){var or__3548__auto____3118 = (cljs.core._hash[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3118))
{return or__3548__auto____3118;
} else
{var or__3548__auto____3119 = (cljs.core._hash["_"]);

if(cljs.core.truth_(or__3548__auto____3119))
{return or__3548__auto____3119;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if(cljs.core.truth_((function (){var and__3546__auto____3120 = o;

if(cljs.core.truth_(and__3546__auto____3120))
{return o.cljs$core$ISeqable$_seq;
} else
{return and__3546__auto____3120;
}
})()))
{return o.cljs$core$ISeqable$_seq(o);
} else
{return (function (){var or__3548__auto____3121 = (cljs.core._seq[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3121))
{return or__3548__auto____3121;
} else
{var or__3548__auto____3122 = (cljs.core._seq["_"]);

if(cljs.core.truth_(or__3548__auto____3122))
{return or__3548__auto____3122;
} else
{throw cljs.core.missing_protocol.call(null,"ISeqable.-seq",o);
}
}
})().call(null,o);
}
});
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if(cljs.core.truth_((function (){var and__3546__auto____3123 = o;

if(cljs.core.truth_(and__3546__auto____3123))
{return o.cljs$core$IPrintable$_pr_seq;
} else
{return and__3546__auto____3123;
}
})()))
{return o.cljs$core$IPrintable$_pr_seq(o,opts);
} else
{return (function (){var or__3548__auto____3124 = (cljs.core._pr_seq[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____3124))
{return or__3548__auto____3124;
} else
{var or__3548__auto____3125 = (cljs.core._pr_seq["_"]);

if(cljs.core.truth_(or__3548__auto____3125))
{return or__3548__auto____3125;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if(cljs.core.truth_((function (){var and__3546__auto____3126 = d;

if(cljs.core.truth_(and__3546__auto____3126))
{return d.cljs$core$IPending$_realized_QMARK_;
} else
{return and__3546__auto____3126;
}
})()))
{return d.cljs$core$IPending$_realized_QMARK_(d);
} else
{return (function (){var or__3548__auto____3127 = (cljs.core._realized_QMARK_[goog.typeOf.call(null,d)]);

if(cljs.core.truth_(or__3548__auto____3127))
{return or__3548__auto____3127;
} else
{var or__3548__auto____3128 = (cljs.core._realized_QMARK_["_"]);

if(cljs.core.truth_(or__3548__auto____3128))
{return or__3548__auto____3128;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if(cljs.core.truth_((function (){var and__3546__auto____3129 = this$;

if(cljs.core.truth_(and__3546__auto____3129))
{return this$.cljs$core$IWatchable$_notify_watches;
} else
{return and__3546__auto____3129;
}
})()))
{return this$.cljs$core$IWatchable$_notify_watches(this$,oldval,newval);
} else
{return (function (){var or__3548__auto____3130 = (cljs.core._notify_watches[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3130))
{return or__3548__auto____3130;
} else
{var or__3548__auto____3131 = (cljs.core._notify_watches["_"]);

if(cljs.core.truth_(or__3548__auto____3131))
{return or__3548__auto____3131;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if(cljs.core.truth_((function (){var and__3546__auto____3132 = this$;

if(cljs.core.truth_(and__3546__auto____3132))
{return this$.cljs$core$IWatchable$_add_watch;
} else
{return and__3546__auto____3132;
}
})()))
{return this$.cljs$core$IWatchable$_add_watch(this$,key,f);
} else
{return (function (){var or__3548__auto____3133 = (cljs.core._add_watch[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3133))
{return or__3548__auto____3133;
} else
{var or__3548__auto____3134 = (cljs.core._add_watch["_"]);

if(cljs.core.truth_(or__3548__auto____3134))
{return or__3548__auto____3134;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if(cljs.core.truth_((function (){var and__3546__auto____3135 = this$;

if(cljs.core.truth_(and__3546__auto____3135))
{return this$.cljs$core$IWatchable$_remove_watch;
} else
{return and__3546__auto____3135;
}
})()))
{return this$.cljs$core$IWatchable$_remove_watch(this$,key);
} else
{return (function (){var or__3548__auto____3136 = (cljs.core._remove_watch[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____3136))
{return or__3548__auto____3136;
} else
{var or__3548__auto____3137 = (cljs.core._remove_watch["_"]);

if(cljs.core.truth_(or__3548__auto____3137))
{return or__3548__auto____3137;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
/**
* Tests if 2 arguments are the same object
*/
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
/**
* Equality. Returns true if x equals y, false if not. Compares
* numbers and collections in a type-independent manner.  Clojure's immutable data
* structures define -equiv (and thus =) as a value, not an identity,
* comparison.
*/
cljs.core._EQ_ = (function _EQ_(x,y){
return cljs.core._equiv.call(null,x,y);
});
/**
* Returns true if x is nil, false otherwise.
*/
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return (x === null);
});
cljs.core.type = (function type(x){
return (x).constructor;
});
Function.prototype.cljs$core$IPrintable$ = true;
Function.prototype.cljs$core$IPrintable$_pr_seq = (function (this$){
return cljs.core.list.call(null,"#<",cljs.core.str.call(null,this$),">");
});
(cljs.core.IHash["null"] = true);
(cljs.core._hash["null"] = (function (o){
return 0;
}));
(cljs.core.ILookup["null"] = true);
(cljs.core._lookup["null"] = (function() {
var G__3138 = null;
var G__3138__3139 = (function (o,k){
return null;
});
var G__3138__3140 = (function (o,k,not_found){
return not_found;
});
G__3138 = function(o,k,not_found){
switch(arguments.length){
case  2 :
return G__3138__3139.call(this,o,k);
case  3 :
return G__3138__3140.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3138;
})()
);
(cljs.core.IAssociative["null"] = true);
(cljs.core._assoc["null"] = (function (_,k,v){
return cljs.core.hash_map.call(null,k,v);
}));
(cljs.core.ICollection["null"] = true);
(cljs.core._conj["null"] = (function (_,o){
return cljs.core.list.call(null,o);
}));
(cljs.core.IReduce["null"] = true);
(cljs.core._reduce["null"] = (function() {
var G__3142 = null;
var G__3142__3143 = (function (_,f){
return f.call(null);
});
var G__3142__3144 = (function (_,f,start){
return start;
});
G__3142 = function(_,f,start){
switch(arguments.length){
case  2 :
return G__3142__3143.call(this,_,f);
case  3 :
return G__3142__3144.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3142;
})()
);
(cljs.core.IPrintable["null"] = true);
(cljs.core._pr_seq["null"] = (function (o){
return cljs.core.list.call(null,"nil");
}));
(cljs.core.ISet["null"] = true);
(cljs.core._disjoin["null"] = (function (_,v){
return null;
}));
(cljs.core.ICounted["null"] = true);
(cljs.core._count["null"] = (function (_){
return 0;
}));
(cljs.core.IStack["null"] = true);
(cljs.core._peek["null"] = (function (_){
return null;
}));
(cljs.core._pop["null"] = (function (_){
return null;
}));
(cljs.core.ISeq["null"] = true);
(cljs.core._first["null"] = (function (_){
return null;
}));
(cljs.core._rest["null"] = (function (_){
return cljs.core.list.call(null);
}));
(cljs.core.IEquiv["null"] = true);
(cljs.core._equiv["null"] = (function (_,o){
return cljs.core.nil_QMARK_.call(null,o);
}));
(cljs.core.IWithMeta["null"] = true);
(cljs.core._with_meta["null"] = (function (_,meta){
return null;
}));
(cljs.core.IMeta["null"] = true);
(cljs.core._meta["null"] = (function (_){
return null;
}));
(cljs.core.IIndexed["null"] = true);
(cljs.core._nth["null"] = (function() {
var G__3146 = null;
var G__3146__3147 = (function (_,n){
return null;
});
var G__3146__3148 = (function (_,n,not_found){
return not_found;
});
G__3146 = function(_,n,not_found){
switch(arguments.length){
case  2 :
return G__3146__3147.call(this,_,n);
case  3 :
return G__3146__3148.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3146;
})()
);
(cljs.core.IEmptyableCollection["null"] = true);
(cljs.core._empty["null"] = (function (_){
return null;
}));
(cljs.core.IMap["null"] = true);
(cljs.core._dissoc["null"] = (function (_,k){
return null;
}));
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
return (o.toString() === other.toString());
});
(cljs.core.IHash["number"] = true);
(cljs.core._hash["number"] = (function (o){
return o;
}));
(cljs.core.IEquiv["number"] = true);
(cljs.core._equiv["number"] = (function (x,o){
return (x === o);
}));
(cljs.core.IHash["boolean"] = true);
(cljs.core._hash["boolean"] = (function (o){
return ((o === true) ? 1 : 0);
}));
(cljs.core.IHash["function"] = true);
(cljs.core._hash["function"] = (function (o){
return goog.getUid.call(null,o);
}));
/**
* Returns a number one greater than num.
*/
cljs.core.inc = (function inc(x){
return (x + 1);
});
/**
* Accepts any collection which satisfies the ICount and IIndexed protocols and
* reduces them without incurring seq initialization
*/
cljs.core.ci_reduce = (function() {
var ci_reduce = null;
var ci_reduce__3156 = (function (cicoll,f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,cljs.core._count.call(null,cicoll))))
{return f.call(null);
} else
{var val__3150 = cljs.core._nth.call(null,cicoll,0);
var n__3151 = 1;

while(true){
if(cljs.core.truth_((n__3151 < cljs.core._count.call(null,cicoll))))
{{
var G__3160 = f.call(null,val__3150,cljs.core._nth.call(null,cicoll,n__3151));
var G__3161 = (n__3151 + 1);
val__3150 = G__3160;
n__3151 = G__3161;
continue;
}
} else
{return val__3150;
}
break;
}
}
});
var ci_reduce__3157 = (function (cicoll,f,val){
var val__3152 = val;
var n__3153 = 0;

while(true){
if(cljs.core.truth_((n__3153 < cljs.core._count.call(null,cicoll))))
{{
var G__3162 = f.call(null,val__3152,cljs.core._nth.call(null,cicoll,n__3153));
var G__3163 = (n__3153 + 1);
val__3152 = G__3162;
n__3153 = G__3163;
continue;
}
} else
{return val__3152;
}
break;
}
});
var ci_reduce__3158 = (function (cicoll,f,val,idx){
var val__3154 = val;
var n__3155 = idx;

while(true){
if(cljs.core.truth_((n__3155 < cljs.core._count.call(null,cicoll))))
{{
var G__3164 = f.call(null,val__3154,cljs.core._nth.call(null,cicoll,n__3155));
var G__3165 = (n__3155 + 1);
val__3154 = G__3164;
n__3155 = G__3165;
continue;
}
} else
{return val__3154;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case  2 :
return ci_reduce__3156.call(this,cicoll,f);
case  3 :
return ci_reduce__3157.call(this,cicoll,f,val);
case  4 :
return ci_reduce__3158.call(this,cicoll,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
return ci_reduce;
})()
;

/**
* @constructor
*/
cljs.core.IndexedSeq = (function (a,i){
this.a = a;
this.i = i;
})
cljs.core.IndexedSeq.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.IndexedSeq");
});
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3166 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3179 = null;
var G__3179__3180 = (function (_,f){
var this__3167 = this;
return cljs.core.ci_reduce.call(null,this__3167.a,f,(this__3167.a[this__3167.i]),(this__3167.i + 1));
});
var G__3179__3181 = (function (_,f,start){
var this__3168 = this;
return cljs.core.ci_reduce.call(null,this__3168.a,f,start,this__3168.i);
});
G__3179 = function(_,f,start){
switch(arguments.length){
case  2 :
return G__3179__3180.call(this,_,f);
case  3 :
return G__3179__3181.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3179;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3169 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3170 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3183 = null;
var G__3183__3184 = (function (coll,n){
var this__3171 = this;
var i__3172 = (n + this__3171.i);

if(cljs.core.truth_((i__3172 < this__3171.a.length)))
{return (this__3171.a[i__3172]);
} else
{return null;
}
});
var G__3183__3185 = (function (coll,n,not_found){
var this__3173 = this;
var i__3174 = (n + this__3173.i);

if(cljs.core.truth_((i__3174 < this__3173.a.length)))
{return (this__3173.a[i__3174]);
} else
{return not_found;
}
});
G__3183 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3183__3184.call(this,coll,n);
case  3 :
return G__3183__3185.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3183;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = (function (_){
var this__3175 = this;
return (this__3175.a.length - this__3175.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = (function (_){
var this__3176 = this;
return (this__3176.a[this__3176.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = (function (_){
var this__3177 = this;
if(cljs.core.truth_(((this__3177.i + 1) < this__3177.a.length)))
{return (new cljs.core.IndexedSeq(this__3177.a,(this__3177.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = (function (this$){
var this__3178 = this;
return this$;
});
cljs.core.IndexedSeq;
cljs.core.prim_seq = (function prim_seq(prim,i){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,prim.length)))
{return null;
} else
{return (new cljs.core.IndexedSeq(prim,i));
}
});
cljs.core.array_seq = (function array_seq(array,i){
return cljs.core.prim_seq.call(null,array,i);
});
(cljs.core.IReduce["array"] = true);
(cljs.core._reduce["array"] = (function() {
var G__3187 = null;
var G__3187__3188 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__3187__3189 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__3187 = function(array,f,start){
switch(arguments.length){
case  2 :
return G__3187__3188.call(this,array,f);
case  3 :
return G__3187__3189.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3187;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__3191 = null;
var G__3191__3192 = (function (array,k){
return (array[k]);
});
var G__3191__3193 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__3191 = function(array,k,not_found){
switch(arguments.length){
case  2 :
return G__3191__3192.call(this,array,k);
case  3 :
return G__3191__3193.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3191;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__3195 = null;
var G__3195__3196 = (function (array,n){
if(cljs.core.truth_((n < array.length)))
{return (array[n]);
} else
{return null;
}
});
var G__3195__3197 = (function (array,n,not_found){
if(cljs.core.truth_((n < array.length)))
{return (array[n]);
} else
{return not_found;
}
});
G__3195 = function(array,n,not_found){
switch(arguments.length){
case  2 :
return G__3195__3196.call(this,array,n);
case  3 :
return G__3195__3197.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3195;
})()
);
(cljs.core.ICounted["array"] = true);
(cljs.core._count["array"] = (function (a){
return a.length;
}));
(cljs.core.ISeqable["array"] = true);
(cljs.core._seq["array"] = (function (array){
return cljs.core.array_seq.call(null,array,0);
}));
/**
* Returns a seq on the collection. If the collection is
* empty, returns nil.  (seq nil) returns nil. seq also works on
* Strings.
*/
cljs.core.seq = (function seq(coll){
if(cljs.core.truth_(coll))
{return cljs.core._seq.call(null,coll);
} else
{return null;
}
});
/**
* Returns the first item in the collection. Calls seq on its
* argument. If coll is nil, returns nil.
*/
cljs.core.first = (function first(coll){
var temp__3698__auto____3199 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3199))
{var s__3200 = temp__3698__auto____3199;

return cljs.core._first.call(null,s__3200);
} else
{return null;
}
});
/**
* Returns a possibly empty seq of the items after the first. Calls seq on its
* argument.
*/
cljs.core.rest = (function rest(coll){
return cljs.core._rest.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns a seq of the items after the first. Calls seq on its
* argument.  If there are no more items, returns nil
*/
cljs.core.next = (function next(coll){
if(cljs.core.truth_(coll))
{return cljs.core.seq.call(null,cljs.core.rest.call(null,coll));
} else
{return null;
}
});
/**
* Same as (first (next x))
*/
cljs.core.second = (function second(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (first (first x))
*/
cljs.core.ffirst = (function ffirst(coll){
return cljs.core.first.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (next (first x))
*/
cljs.core.nfirst = (function nfirst(coll){
return cljs.core.next.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (first (next x))
*/
cljs.core.fnext = (function fnext(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (next (next x))
*/
cljs.core.nnext = (function nnext(coll){
return cljs.core.next.call(null,cljs.core.next.call(null,coll));
});
/**
* Return the last item in coll, in linear time
*/
cljs.core.last = (function last(s){
while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s)))
{{
var G__3201 = cljs.core.next.call(null,s);
s = G__3201;
continue;
}
} else
{return cljs.core.first.call(null,s);
}
break;
}
});
(cljs.core.ICounted["_"] = true);
(cljs.core._count["_"] = (function (x){
var s__3202 = cljs.core.seq.call(null,x);
var n__3203 = 0;

while(true){
if(cljs.core.truth_(s__3202))
{{
var G__3204 = cljs.core.next.call(null,s__3202);
var G__3205 = (n__3203 + 1);
s__3202 = G__3204;
n__3203 = G__3205;
continue;
}
} else
{return n__3203;
}
break;
}
}));
(cljs.core.IEquiv["_"] = true);
(cljs.core._equiv["_"] = (function (x,o){
return (x === o);
}));
/**
* Returns true if x is logical false, false otherwise.
*/
cljs.core.not = (function not(x){
if(cljs.core.truth_(x))
{return false;
} else
{return true;
}
});
/**
* conj[oin]. Returns a new collection with the xs
* 'added'. (conj nil item) returns (item).  The 'addition' may
* happen at different 'places' depending on the concrete type.
* @param {...*} var_args
*/
cljs.core.conj = (function() {
var conj = null;
var conj__3206 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__3207 = (function() { 
var G__3209__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__3210 = conj.call(null,coll,x);
var G__3211 = cljs.core.first.call(null,xs);
var G__3212 = cljs.core.next.call(null,xs);
coll = G__3210;
x = G__3211;
xs = G__3212;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__3209 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3209__delegate.call(this, coll, x, xs);
};
G__3209.cljs$lang$maxFixedArity = 2;
G__3209.cljs$lang$applyTo = (function (arglist__3213){
var coll = cljs.core.first(arglist__3213);
var x = cljs.core.first(cljs.core.next(arglist__3213));
var xs = cljs.core.rest(cljs.core.next(arglist__3213));
return G__3209__delegate.call(this, coll, x, xs);
});
return G__3209;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case  2 :
return conj__3206.call(this,coll,x);
default:
return conj__3207.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__3207.cljs$lang$applyTo;
return conj;
})()
;
/**
* Returns an empty collection of the same category as coll, or nil
*/
cljs.core.empty = (function empty(coll){
return cljs.core._empty.call(null,coll);
});
/**
* Returns the number of items in the collection. (count nil) returns
* 0.  Also works on strings, arrays, and Maps
*/
cljs.core.count = (function count(coll){
return cljs.core._count.call(null,coll);
});
/**
* Returns the value at the index. get returns nil if index out of
* bounds, nth throws an exception unless not-found is supplied.  nth
* also works for strings, arrays, regex Matchers and Lists, and,
* in O(n) time, for sequences.
*/
cljs.core.nth = (function() {
var nth = null;
var nth__3214 = (function (coll,n){
return cljs.core._nth.call(null,coll,Math.floor(n));
});
var nth__3215 = (function (coll,n,not_found){
return cljs.core._nth.call(null,coll,Math.floor(n),not_found);
});
nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return nth__3214.call(this,coll,n);
case  3 :
return nth__3215.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return nth;
})()
;
/**
* Returns the value mapped to key, not-found or nil if key not present.
*/
cljs.core.get = (function() {
var get = null;
var get__3217 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__3218 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case  2 :
return get__3217.call(this,o,k);
case  3 :
return get__3218.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return get;
})()
;
/**
* assoc[iate]. When applied to a map, returns a new map of the
* same (hashed/sorted) type, that contains the mapping of key(s) to
* val(s). When applied to a vector, returns a new vector that
* contains val at index.
* @param {...*} var_args
*/
cljs.core.assoc = (function() {
var assoc = null;
var assoc__3221 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__3222 = (function() { 
var G__3224__delegate = function (coll,k,v,kvs){
while(true){
var ret__3220 = assoc.call(null,coll,k,v);

if(cljs.core.truth_(kvs))
{{
var G__3225 = ret__3220;
var G__3226 = cljs.core.first.call(null,kvs);
var G__3227 = cljs.core.second.call(null,kvs);
var G__3228 = cljs.core.nnext.call(null,kvs);
coll = G__3225;
k = G__3226;
v = G__3227;
kvs = G__3228;
continue;
}
} else
{return ret__3220;
}
break;
}
};
var G__3224 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3224__delegate.call(this, coll, k, v, kvs);
};
G__3224.cljs$lang$maxFixedArity = 3;
G__3224.cljs$lang$applyTo = (function (arglist__3229){
var coll = cljs.core.first(arglist__3229);
var k = cljs.core.first(cljs.core.next(arglist__3229));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3229)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3229)));
return G__3224__delegate.call(this, coll, k, v, kvs);
});
return G__3224;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case  3 :
return assoc__3221.call(this,coll,k,v);
default:
return assoc__3222.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__3222.cljs$lang$applyTo;
return assoc;
})()
;
/**
* dissoc[iate]. Returns a new map of the same (hashed/sorted) type,
* that does not contain a mapping for key(s).
* @param {...*} var_args
*/
cljs.core.dissoc = (function() {
var dissoc = null;
var dissoc__3231 = (function (coll){
return coll;
});
var dissoc__3232 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__3233 = (function() { 
var G__3235__delegate = function (coll,k,ks){
while(true){
var ret__3230 = dissoc.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__3236 = ret__3230;
var G__3237 = cljs.core.first.call(null,ks);
var G__3238 = cljs.core.next.call(null,ks);
coll = G__3236;
k = G__3237;
ks = G__3238;
continue;
}
} else
{return ret__3230;
}
break;
}
};
var G__3235 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3235__delegate.call(this, coll, k, ks);
};
G__3235.cljs$lang$maxFixedArity = 2;
G__3235.cljs$lang$applyTo = (function (arglist__3239){
var coll = cljs.core.first(arglist__3239);
var k = cljs.core.first(cljs.core.next(arglist__3239));
var ks = cljs.core.rest(cljs.core.next(arglist__3239));
return G__3235__delegate.call(this, coll, k, ks);
});
return G__3235;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return dissoc__3231.call(this,coll);
case  2 :
return dissoc__3232.call(this,coll,k);
default:
return dissoc__3233.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__3233.cljs$lang$applyTo;
return dissoc;
})()
;
/**
* Returns an object of the same type and value as obj, with
* map m as its metadata.
*/
cljs.core.with_meta = (function with_meta(o,meta){
return cljs.core._with_meta.call(null,o,meta);
});
/**
* Returns the metadata of obj, returns nil if there is no metadata.
*/
cljs.core.meta = (function meta(o){
if(cljs.core.truth_((function (){var x__412__auto____3240 = o;

if(cljs.core.truth_((function (){var and__3546__auto____3241 = x__412__auto____3240;

if(cljs.core.truth_(and__3546__auto____3241))
{var and__3546__auto____3242 = x__412__auto____3240.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____3242))
{return cljs.core.not.call(null,x__412__auto____3240.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____3242;
}
} else
{return and__3546__auto____3241;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__412__auto____3240);
}
})()))
{return cljs.core._meta.call(null,o);
} else
{return null;
}
});
/**
* For a list or queue, same as first, for a vector, same as, but much
* more efficient than, last. If the collection is empty, returns nil.
*/
cljs.core.peek = (function peek(coll){
return cljs.core._peek.call(null,coll);
});
/**
* For a list or queue, returns a new list/queue without the first
* item, for a vector, returns a new vector without the last item.
* Note - not the same as next/butlast.
*/
cljs.core.pop = (function pop(coll){
return cljs.core._pop.call(null,coll);
});
/**
* disj[oin]. Returns a new set of the same (hashed/sorted) type, that
* does not contain key(s).
* @param {...*} var_args
*/
cljs.core.disj = (function() {
var disj = null;
var disj__3244 = (function (coll){
return coll;
});
var disj__3245 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__3246 = (function() { 
var G__3248__delegate = function (coll,k,ks){
while(true){
var ret__3243 = disj.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__3249 = ret__3243;
var G__3250 = cljs.core.first.call(null,ks);
var G__3251 = cljs.core.next.call(null,ks);
coll = G__3249;
k = G__3250;
ks = G__3251;
continue;
}
} else
{return ret__3243;
}
break;
}
};
var G__3248 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3248__delegate.call(this, coll, k, ks);
};
G__3248.cljs$lang$maxFixedArity = 2;
G__3248.cljs$lang$applyTo = (function (arglist__3252){
var coll = cljs.core.first(arglist__3252);
var k = cljs.core.first(cljs.core.next(arglist__3252));
var ks = cljs.core.rest(cljs.core.next(arglist__3252));
return G__3248__delegate.call(this, coll, k, ks);
});
return G__3248;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return disj__3244.call(this,coll);
case  2 :
return disj__3245.call(this,coll,k);
default:
return disj__3246.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__3246.cljs$lang$applyTo;
return disj;
})()
;
cljs.core.hash = (function hash(o){
return cljs.core._hash.call(null,o);
});
/**
* Returns true if coll has no items - same as (not (seq coll)).
* Please use the idiom (seq x) rather than (not (empty? x))
*/
cljs.core.empty_QMARK_ = (function empty_QMARK_(coll){
return cljs.core.not.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns true if x satisfies ICollection
*/
cljs.core.coll_QMARK_ = (function coll_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__412__auto____3253 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3254 = x__412__auto____3253;

if(cljs.core.truth_(and__3546__auto____3254))
{var and__3546__auto____3255 = x__412__auto____3253.cljs$core$ICollection$;

if(cljs.core.truth_(and__3546__auto____3255))
{return cljs.core.not.call(null,x__412__auto____3253.hasOwnProperty("cljs$core$ICollection$"));
} else
{return and__3546__auto____3255;
}
} else
{return and__3546__auto____3254;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,x__412__auto____3253);
}
}
});
/**
* Returns true if x satisfies ISet
*/
cljs.core.set_QMARK_ = (function set_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__412__auto____3256 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3257 = x__412__auto____3256;

if(cljs.core.truth_(and__3546__auto____3257))
{var and__3546__auto____3258 = x__412__auto____3256.cljs$core$ISet$;

if(cljs.core.truth_(and__3546__auto____3258))
{return cljs.core.not.call(null,x__412__auto____3256.hasOwnProperty("cljs$core$ISet$"));
} else
{return and__3546__auto____3258;
}
} else
{return and__3546__auto____3257;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,x__412__auto____3256);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var x__412__auto____3259 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3260 = x__412__auto____3259;

if(cljs.core.truth_(and__3546__auto____3260))
{var and__3546__auto____3261 = x__412__auto____3259.cljs$core$IAssociative$;

if(cljs.core.truth_(and__3546__auto____3261))
{return cljs.core.not.call(null,x__412__auto____3259.hasOwnProperty("cljs$core$IAssociative$"));
} else
{return and__3546__auto____3261;
}
} else
{return and__3546__auto____3260;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,x__412__auto____3259);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var x__412__auto____3262 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3263 = x__412__auto____3262;

if(cljs.core.truth_(and__3546__auto____3263))
{var and__3546__auto____3264 = x__412__auto____3262.cljs$core$ISequential$;

if(cljs.core.truth_(and__3546__auto____3264))
{return cljs.core.not.call(null,x__412__auto____3262.hasOwnProperty("cljs$core$ISequential$"));
} else
{return and__3546__auto____3264;
}
} else
{return and__3546__auto____3263;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,x__412__auto____3262);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var x__412__auto____3265 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3266 = x__412__auto____3265;

if(cljs.core.truth_(and__3546__auto____3266))
{var and__3546__auto____3267 = x__412__auto____3265.cljs$core$ICounted$;

if(cljs.core.truth_(and__3546__auto____3267))
{return cljs.core.not.call(null,x__412__auto____3265.hasOwnProperty("cljs$core$ICounted$"));
} else
{return and__3546__auto____3267;
}
} else
{return and__3546__auto____3266;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,x__412__auto____3265);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__412__auto____3268 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3269 = x__412__auto____3268;

if(cljs.core.truth_(and__3546__auto____3269))
{var and__3546__auto____3270 = x__412__auto____3268.cljs$core$IMap$;

if(cljs.core.truth_(and__3546__auto____3270))
{return cljs.core.not.call(null,x__412__auto____3268.hasOwnProperty("cljs$core$IMap$"));
} else
{return and__3546__auto____3270;
}
} else
{return and__3546__auto____3269;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,x__412__auto____3268);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var x__412__auto____3271 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3272 = x__412__auto____3271;

if(cljs.core.truth_(and__3546__auto____3272))
{var and__3546__auto____3273 = x__412__auto____3271.cljs$core$IVector$;

if(cljs.core.truth_(and__3546__auto____3273))
{return cljs.core.not.call(null,x__412__auto____3271.hasOwnProperty("cljs$core$IVector$"));
} else
{return and__3546__auto____3273;
}
} else
{return and__3546__auto____3272;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,x__412__auto____3271);
}
});
cljs.core.js_obj = (function js_obj(){
return {};
});
cljs.core.js_keys = (function js_keys(obj){
var keys__3274 = cljs.core.array.call(null);

goog.object.forEach.call(null,obj,(function (val,key,obj){
return keys__3274.push(key);
}));
return keys__3274;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
/**
* Returns true if x is the value false, false otherwise.
*/
cljs.core.false_QMARK_ = (function false_QMARK_(x){
return x === false;
});
/**
* Returns true if x is the value true, false otherwise.
*/
cljs.core.true_QMARK_ = (function true_QMARK_(x){
return x === true;
});
cljs.core.undefined_QMARK_ = (function undefined_QMARK_(x){
return (void 0 === x);
});
cljs.core.instance_QMARK_ = (function instance_QMARK_(t,o){
return (o != null && (o instanceof t || o.constructor === t || t === Object));
});
/**
* Return true if s satisfies ISeq
*/
cljs.core.seq_QMARK_ = (function seq_QMARK_(s){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,s)))
{return false;
} else
{var x__412__auto____3275 = s;

if(cljs.core.truth_((function (){var and__3546__auto____3276 = x__412__auto____3275;

if(cljs.core.truth_(and__3546__auto____3276))
{var and__3546__auto____3277 = x__412__auto____3275.cljs$core$ISeq$;

if(cljs.core.truth_(and__3546__auto____3277))
{return cljs.core.not.call(null,x__412__auto____3275.hasOwnProperty("cljs$core$ISeq$"));
} else
{return and__3546__auto____3277;
}
} else
{return and__3546__auto____3276;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,x__412__auto____3275);
}
}
});
cljs.core.boolean$ = (function boolean$(x){
if(cljs.core.truth_(x))
{return true;
} else
{return false;
}
});
cljs.core.string_QMARK_ = (function string_QMARK_(x){
var and__3546__auto____3278 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____3278))
{return cljs.core.not.call(null,(function (){var or__3548__auto____3279 = cljs.core._EQ_.call(null,x.charAt(0),"﷐");

if(cljs.core.truth_(or__3548__auto____3279))
{return or__3548__auto____3279;
} else
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
}
})());
} else
{return and__3546__auto____3278;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3546__auto____3280 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____3280))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷐");
} else
{return and__3546__auto____3280;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3546__auto____3281 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____3281))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
} else
{return and__3546__auto____3281;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber.call(null,n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction.call(null,f);
});
/**
* Returns true if n is an integer.  Warning: returns true on underflow condition.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3546__auto____3282 = cljs.core.number_QMARK_.call(null,n);

if(cljs.core.truth_(and__3546__auto____3282))
{return (n == n.toFixed());
} else
{return and__3546__auto____3282;
}
});
/**
* Returns true if key is present in the given collection, otherwise
* returns false.  Note that for numerically indexed collections like
* vectors and arrays, this tests if the numeric key is within the
* range of indexes. 'contains?' operates constant or logarithmic time;
* it will not perform a linear search for a value.  See also 'some'.
*/
cljs.core.contains_QMARK_ = (function contains_QMARK_(coll,v){
if(cljs.core.truth_((cljs.core._lookup.call(null,coll,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)))
{return false;
} else
{return true;
}
});
/**
* Returns the map entry for key, or nil if key not present.
*/
cljs.core.find = (function find(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____3283 = coll;

if(cljs.core.truth_(and__3546__auto____3283))
{var and__3546__auto____3284 = cljs.core.associative_QMARK_.call(null,coll);

if(cljs.core.truth_(and__3546__auto____3284))
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3546__auto____3284;
}
} else
{return and__3546__auto____3283;
}
})()))
{return cljs.core.Vector.fromArray([k,cljs.core._lookup.call(null,coll,k)]);
} else
{return null;
}
});
/**
* Returns true if no two of the arguments are =
* @param {...*} var_args
*/
cljs.core.distinct_QMARK_ = (function() {
var distinct_QMARK_ = null;
var distinct_QMARK___3289 = (function (x){
return true;
});
var distinct_QMARK___3290 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___3291 = (function() { 
var G__3293__delegate = function (x,y,more){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y))))
{var s__3285 = cljs.core.set([y,x]);
var xs__3286 = more;

while(true){
var x__3287 = cljs.core.first.call(null,xs__3286);
var etc__3288 = cljs.core.next.call(null,xs__3286);

if(cljs.core.truth_(xs__3286))
{if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,s__3285,x__3287)))
{return false;
} else
{{
var G__3294 = cljs.core.conj.call(null,s__3285,x__3287);
var G__3295 = etc__3288;
s__3285 = G__3294;
xs__3286 = G__3295;
continue;
}
}
} else
{return true;
}
break;
}
} else
{return false;
}
};
var G__3293 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3293__delegate.call(this, x, y, more);
};
G__3293.cljs$lang$maxFixedArity = 2;
G__3293.cljs$lang$applyTo = (function (arglist__3296){
var x = cljs.core.first(arglist__3296);
var y = cljs.core.first(cljs.core.next(arglist__3296));
var more = cljs.core.rest(cljs.core.next(arglist__3296));
return G__3293__delegate.call(this, x, y, more);
});
return G__3293;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return distinct_QMARK___3289.call(this,x);
case  2 :
return distinct_QMARK___3290.call(this,x,y);
default:
return distinct_QMARK___3291.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3291.cljs$lang$applyTo;
return distinct_QMARK_;
})()
;
/**
* Comparator. Returns a negative number, zero, or a positive number
* when x is logically 'less than', 'equal to', or 'greater than'
* y. Uses google.array.defaultCompare.
*/
cljs.core.compare = (function compare(x,y){
return goog.array.defaultCompare.call(null,x,y);
});
/**
* Given a fn that might be boolean valued or a comparator,
* return a fn that is a comparator.
*/
cljs.core.fn__GT_comparator = (function fn__GT_comparator(f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,f,cljs.core.compare)))
{return cljs.core.compare;
} else
{return (function (x,y){
var r__3297 = f.call(null,x,y);

if(cljs.core.truth_(cljs.core.number_QMARK_.call(null,r__3297)))
{return r__3297;
} else
{if(cljs.core.truth_(r__3297))
{return -1;
} else
{if(cljs.core.truth_(f.call(null,y,x)))
{return 1;
} else
{return 0;
}
}
}
});
}
});
/**
* Returns a sorted sequence of the items in coll. Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort = (function() {
var sort = null;
var sort__3299 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__3300 = (function (comp,coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var a__3298 = cljs.core.to_array.call(null,coll);

goog.array.stableSort.call(null,a__3298,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__3298);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case  1 :
return sort__3299.call(this,comp);
case  2 :
return sort__3300.call(this,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return sort;
})()
;
/**
* Returns a sorted sequence of the items in coll, where the sort
* order is determined by comparing (keyfn item).  Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort_by = (function() {
var sort_by = null;
var sort_by__3302 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__3303 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case  2 :
return sort_by__3302.call(this,keyfn,comp);
case  3 :
return sort_by__3303.call(this,keyfn,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return sort_by;
})()
;
/**
* f should be a function of 2 arguments. If val is not supplied,
* returns the result of applying f to the first 2 items in coll, then
* applying f to that result and the 3rd item, etc. If coll contains no
* items, f must accept no arguments as well, and reduce returns the
* result of calling f with no arguments.  If coll has only 1 item, it
* is returned and f is not called.  If val is supplied, returns the
* result of applying f to val and the first item in coll, then
* applying f to that result and the 2nd item, etc. If coll contains no
* items, returns val and f is not called.
*/
cljs.core.reduce = (function() {
var reduce = null;
var reduce__3305 = (function (f,coll){
return cljs.core._reduce.call(null,coll,f);
});
var reduce__3306 = (function (f,val,coll){
return cljs.core._reduce.call(null,coll,f,val);
});
reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return reduce__3305.call(this,f,val);
case  3 :
return reduce__3306.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reduce;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__3312 = (function (f,coll){
var temp__3695__auto____3308 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3308))
{var s__3309 = temp__3695__auto____3308;

return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__3309),cljs.core.next.call(null,s__3309));
} else
{return f.call(null);
}
});
var seq_reduce__3313 = (function (f,val,coll){
var val__3310 = val;
var coll__3311 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_(coll__3311))
{{
var G__3315 = f.call(null,val__3310,cljs.core.first.call(null,coll__3311));
var G__3316 = cljs.core.next.call(null,coll__3311);
val__3310 = G__3315;
coll__3311 = G__3316;
continue;
}
} else
{return val__3310;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return seq_reduce__3312.call(this,f,val);
case  3 :
return seq_reduce__3313.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return seq_reduce;
})()
;
(cljs.core.IReduce["_"] = true);
(cljs.core._reduce["_"] = (function() {
var G__3317 = null;
var G__3317__3318 = (function (coll,f){
return cljs.core.seq_reduce.call(null,f,coll);
});
var G__3317__3319 = (function (coll,f,start){
return cljs.core.seq_reduce.call(null,f,start,coll);
});
G__3317 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__3317__3318.call(this,coll,f);
case  3 :
return G__3317__3319.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3317;
})()
);
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___3321 = (function (){
return 0;
});
var _PLUS___3322 = (function (x){
return x;
});
var _PLUS___3323 = (function (x,y){
return (x + y);
});
var _PLUS___3324 = (function() { 
var G__3326__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,(x + y),more);
};
var G__3326 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3326__delegate.call(this, x, y, more);
};
G__3326.cljs$lang$maxFixedArity = 2;
G__3326.cljs$lang$applyTo = (function (arglist__3327){
var x = cljs.core.first(arglist__3327);
var y = cljs.core.first(cljs.core.next(arglist__3327));
var more = cljs.core.rest(cljs.core.next(arglist__3327));
return G__3326__delegate.call(this, x, y, more);
});
return G__3326;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _PLUS___3321.call(this);
case  1 :
return _PLUS___3322.call(this,x);
case  2 :
return _PLUS___3323.call(this,x,y);
default:
return _PLUS___3324.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___3324.cljs$lang$applyTo;
return _PLUS_;
})()
;
/**
* If no ys are supplied, returns the negation of x, else subtracts
* the ys from x and returns the result.
* @param {...*} var_args
*/
cljs.core._ = (function() {
var _ = null;
var ___3328 = (function (x){
return (- x);
});
var ___3329 = (function (x,y){
return (x - y);
});
var ___3330 = (function() { 
var G__3332__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,(x - y),more);
};
var G__3332 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3332__delegate.call(this, x, y, more);
};
G__3332.cljs$lang$maxFixedArity = 2;
G__3332.cljs$lang$applyTo = (function (arglist__3333){
var x = cljs.core.first(arglist__3333);
var y = cljs.core.first(cljs.core.next(arglist__3333));
var more = cljs.core.rest(cljs.core.next(arglist__3333));
return G__3332__delegate.call(this, x, y, more);
});
return G__3332;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return ___3328.call(this,x);
case  2 :
return ___3329.call(this,x,y);
default:
return ___3330.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___3330.cljs$lang$applyTo;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___3334 = (function (){
return 1;
});
var _STAR___3335 = (function (x){
return x;
});
var _STAR___3336 = (function (x,y){
return (x * y);
});
var _STAR___3337 = (function() { 
var G__3339__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,(x * y),more);
};
var G__3339 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3339__delegate.call(this, x, y, more);
};
G__3339.cljs$lang$maxFixedArity = 2;
G__3339.cljs$lang$applyTo = (function (arglist__3340){
var x = cljs.core.first(arglist__3340);
var y = cljs.core.first(cljs.core.next(arglist__3340));
var more = cljs.core.rest(cljs.core.next(arglist__3340));
return G__3339__delegate.call(this, x, y, more);
});
return G__3339;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _STAR___3334.call(this);
case  1 :
return _STAR___3335.call(this,x);
case  2 :
return _STAR___3336.call(this,x,y);
default:
return _STAR___3337.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___3337.cljs$lang$applyTo;
return _STAR_;
})()
;
/**
* If no denominators are supplied, returns 1/numerator,
* else returns numerator divided by all of the denominators.
* @param {...*} var_args
*/
cljs.core._SLASH_ = (function() {
var _SLASH_ = null;
var _SLASH___3341 = (function (x){
return _SLASH_.call(null,1,x);
});
var _SLASH___3342 = (function (x,y){
return _SLASH_.call(null,x,y);
});
var _SLASH___3343 = (function() { 
var G__3345__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__3345 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3345__delegate.call(this, x, y, more);
};
G__3345.cljs$lang$maxFixedArity = 2;
G__3345.cljs$lang$applyTo = (function (arglist__3346){
var x = cljs.core.first(arglist__3346);
var y = cljs.core.first(cljs.core.next(arglist__3346));
var more = cljs.core.rest(cljs.core.next(arglist__3346));
return G__3345__delegate.call(this, x, y, more);
});
return G__3345;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _SLASH___3341.call(this,x);
case  2 :
return _SLASH___3342.call(this,x,y);
default:
return _SLASH___3343.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___3343.cljs$lang$applyTo;
return _SLASH_;
})()
;
/**
* Returns non-nil if nums are in monotonically increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT_ = (function() {
var _LT_ = null;
var _LT___3347 = (function (x){
return true;
});
var _LT___3348 = (function (x,y){
return (x < y);
});
var _LT___3349 = (function() { 
var G__3351__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_((x < y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3352 = y;
var G__3353 = cljs.core.first.call(null,more);
var G__3354 = cljs.core.next.call(null,more);
x = G__3352;
y = G__3353;
more = G__3354;
continue;
}
} else
{return (y < cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3351 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3351__delegate.call(this, x, y, more);
};
G__3351.cljs$lang$maxFixedArity = 2;
G__3351.cljs$lang$applyTo = (function (arglist__3355){
var x = cljs.core.first(arglist__3355);
var y = cljs.core.first(cljs.core.next(arglist__3355));
var more = cljs.core.rest(cljs.core.next(arglist__3355));
return G__3351__delegate.call(this, x, y, more);
});
return G__3351;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT___3347.call(this,x);
case  2 :
return _LT___3348.call(this,x,y);
default:
return _LT___3349.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___3349.cljs$lang$applyTo;
return _LT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT__EQ_ = (function() {
var _LT__EQ_ = null;
var _LT__EQ___3356 = (function (x){
return true;
});
var _LT__EQ___3357 = (function (x,y){
return (x <= y);
});
var _LT__EQ___3358 = (function() { 
var G__3360__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_((x <= y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3361 = y;
var G__3362 = cljs.core.first.call(null,more);
var G__3363 = cljs.core.next.call(null,more);
x = G__3361;
y = G__3362;
more = G__3363;
continue;
}
} else
{return (y <= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3360 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3360__delegate.call(this, x, y, more);
};
G__3360.cljs$lang$maxFixedArity = 2;
G__3360.cljs$lang$applyTo = (function (arglist__3364){
var x = cljs.core.first(arglist__3364);
var y = cljs.core.first(cljs.core.next(arglist__3364));
var more = cljs.core.rest(cljs.core.next(arglist__3364));
return G__3360__delegate.call(this, x, y, more);
});
return G__3360;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT__EQ___3356.call(this,x);
case  2 :
return _LT__EQ___3357.call(this,x,y);
default:
return _LT__EQ___3358.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___3358.cljs$lang$applyTo;
return _LT__EQ_;
})()
;
/**
* Returns non-nil if nums are in monotonically decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT_ = (function() {
var _GT_ = null;
var _GT___3365 = (function (x){
return true;
});
var _GT___3366 = (function (x,y){
return (x > y);
});
var _GT___3367 = (function() { 
var G__3369__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_((x > y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3370 = y;
var G__3371 = cljs.core.first.call(null,more);
var G__3372 = cljs.core.next.call(null,more);
x = G__3370;
y = G__3371;
more = G__3372;
continue;
}
} else
{return (y > cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3369 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3369__delegate.call(this, x, y, more);
};
G__3369.cljs$lang$maxFixedArity = 2;
G__3369.cljs$lang$applyTo = (function (arglist__3373){
var x = cljs.core.first(arglist__3373);
var y = cljs.core.first(cljs.core.next(arglist__3373));
var more = cljs.core.rest(cljs.core.next(arglist__3373));
return G__3369__delegate.call(this, x, y, more);
});
return G__3369;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT___3365.call(this,x);
case  2 :
return _GT___3366.call(this,x,y);
default:
return _GT___3367.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___3367.cljs$lang$applyTo;
return _GT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT__EQ_ = (function() {
var _GT__EQ_ = null;
var _GT__EQ___3374 = (function (x){
return true;
});
var _GT__EQ___3375 = (function (x,y){
return (x >= y);
});
var _GT__EQ___3376 = (function() { 
var G__3378__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_((x >= y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3379 = y;
var G__3380 = cljs.core.first.call(null,more);
var G__3381 = cljs.core.next.call(null,more);
x = G__3379;
y = G__3380;
more = G__3381;
continue;
}
} else
{return (y >= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3378 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3378__delegate.call(this, x, y, more);
};
G__3378.cljs$lang$maxFixedArity = 2;
G__3378.cljs$lang$applyTo = (function (arglist__3382){
var x = cljs.core.first(arglist__3382);
var y = cljs.core.first(cljs.core.next(arglist__3382));
var more = cljs.core.rest(cljs.core.next(arglist__3382));
return G__3378__delegate.call(this, x, y, more);
});
return G__3378;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT__EQ___3374.call(this,x);
case  2 :
return _GT__EQ___3375.call(this,x,y);
default:
return _GT__EQ___3376.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___3376.cljs$lang$applyTo;
return _GT__EQ_;
})()
;
/**
* Returns a number one less than num.
*/
cljs.core.dec = (function dec(x){
return (x - 1);
});
/**
* Returns the greatest of the nums.
* @param {...*} var_args
*/
cljs.core.max = (function() {
var max = null;
var max__3383 = (function (x){
return x;
});
var max__3384 = (function (x,y){
return ((x > y) ? x : y);
});
var max__3385 = (function() { 
var G__3387__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,((x > y) ? x : y),more);
};
var G__3387 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3387__delegate.call(this, x, y, more);
};
G__3387.cljs$lang$maxFixedArity = 2;
G__3387.cljs$lang$applyTo = (function (arglist__3388){
var x = cljs.core.first(arglist__3388);
var y = cljs.core.first(cljs.core.next(arglist__3388));
var more = cljs.core.rest(cljs.core.next(arglist__3388));
return G__3387__delegate.call(this, x, y, more);
});
return G__3387;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return max__3383.call(this,x);
case  2 :
return max__3384.call(this,x,y);
default:
return max__3385.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__3385.cljs$lang$applyTo;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__3389 = (function (x){
return x;
});
var min__3390 = (function (x,y){
return ((x < y) ? x : y);
});
var min__3391 = (function() { 
var G__3393__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,((x < y) ? x : y),more);
};
var G__3393 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3393__delegate.call(this, x, y, more);
};
G__3393.cljs$lang$maxFixedArity = 2;
G__3393.cljs$lang$applyTo = (function (arglist__3394){
var x = cljs.core.first(arglist__3394);
var y = cljs.core.first(cljs.core.next(arglist__3394));
var more = cljs.core.rest(cljs.core.next(arglist__3394));
return G__3393__delegate.call(this, x, y, more);
});
return G__3393;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return min__3389.call(this,x);
case  2 :
return min__3390.call(this,x,y);
default:
return min__3391.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__3391.cljs$lang$applyTo;
return min;
})()
;
cljs.core.fix = (function fix(q){
if(cljs.core.truth_((q >= 0)))
{return Math.floor.call(null,q);
} else
{return Math.ceil.call(null,q);
}
});
/**
* Modulus of num and div. Truncates toward negative infinity.
*/
cljs.core.mod = (function mod(n,d){
return (n % d);
});
/**
* quot[ient] of dividing numerator by denominator.
*/
cljs.core.quot = (function quot(n,d){
var rem__3395 = (n % d);

return cljs.core.fix.call(null,((n - rem__3395) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__3396 = cljs.core.quot.call(null,n,d);

return (n - (d * q__3396));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__3397 = (function (){
return Math.random.call(null);
});
var rand__3398 = (function (n){
return (n * rand.call(null));
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__3397.call(this);
case  1 :
return rand__3398.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return cljs.core.fix.call(null,cljs.core.rand.call(null,n));
});
/**
* Bitwise exclusive or
*/
cljs.core.bit_xor = (function bit_xor(x,y){
return (x ^ y);
});
/**
* Bitwise and
*/
cljs.core.bit_and = (function bit_and(x,y){
return (x & y);
});
/**
* Bitwise or
*/
cljs.core.bit_or = (function bit_or(x,y){
return (x | y);
});
/**
* Bitwise and
*/
cljs.core.bit_and_not = (function bit_and_not(x,y){
return (x & ~y);
});
/**
* Clear bit at index n
*/
cljs.core.bit_clear = (function bit_clear(x,n){
return (x & ~(1 << n));
});
/**
* Flip bit at index n
*/
cljs.core.bit_flip = (function bit_flip(x,n){
return (x ^ (1 << n));
});
/**
* Bitwise complement
*/
cljs.core.bit_not = (function bit_not(x){
return (~ x);
});
/**
* Set bit at index n
*/
cljs.core.bit_set = (function bit_set(x,n){
return (x | (1 << n));
});
/**
* Test bit at index n
*/
cljs.core.bit_test = (function bit_test(x,n){
return ((x & (1 << n)) != 0);
});
/**
* Bitwise shift left
*/
cljs.core.bit_shift_left = (function bit_shift_left(x,n){
return (x << n);
});
/**
* Bitwise shift right
*/
cljs.core.bit_shift_right = (function bit_shift_right(x,n){
return (x >> n);
});
/**
* Returns non-nil if nums all have the equivalent
* value (type-independent), otherwise false
* @param {...*} var_args
*/
cljs.core._EQ__EQ_ = (function() {
var _EQ__EQ_ = null;
var _EQ__EQ___3400 = (function (x){
return true;
});
var _EQ__EQ___3401 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___3402 = (function() { 
var G__3404__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3405 = y;
var G__3406 = cljs.core.first.call(null,more);
var G__3407 = cljs.core.next.call(null,more);
x = G__3405;
y = G__3406;
more = G__3407;
continue;
}
} else
{return _EQ__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3404 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3404__delegate.call(this, x, y, more);
};
G__3404.cljs$lang$maxFixedArity = 2;
G__3404.cljs$lang$applyTo = (function (arglist__3408){
var x = cljs.core.first(arglist__3408);
var y = cljs.core.first(cljs.core.next(arglist__3408));
var more = cljs.core.rest(cljs.core.next(arglist__3408));
return G__3404__delegate.call(this, x, y, more);
});
return G__3404;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _EQ__EQ___3400.call(this,x);
case  2 :
return _EQ__EQ___3401.call(this,x,y);
default:
return _EQ__EQ___3402.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3402.cljs$lang$applyTo;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return (n > 0);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return (n === 0);
});
/**
* Returns true if num is less than zero, else false
*/
cljs.core.neg_QMARK_ = (function neg_QMARK_(x){
return (x < 0);
});
/**
* Returns the nth next of coll, (seq coll) when n is 0.
*/
cljs.core.nthnext = (function nthnext(coll,n){
var n__3409 = n;
var xs__3410 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3411 = xs__3410;

if(cljs.core.truth_(and__3546__auto____3411))
{return (n__3409 > 0);
} else
{return and__3546__auto____3411;
}
})()))
{{
var G__3412 = (n__3409 - 1);
var G__3413 = cljs.core.next.call(null,xs__3410);
n__3409 = G__3412;
xs__3410 = G__3413;
continue;
}
} else
{return xs__3410;
}
break;
}
});
(cljs.core.IIndexed["_"] = true);
(cljs.core._nth["_"] = (function() {
var G__3418 = null;
var G__3418__3419 = (function (coll,n){
var temp__3695__auto____3414 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____3414))
{var xs__3415 = temp__3695__auto____3414;

return cljs.core.first.call(null,xs__3415);
} else
{throw (new Error("Index out of bounds"));
}
});
var G__3418__3420 = (function (coll,n,not_found){
var temp__3695__auto____3416 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____3416))
{var xs__3417 = temp__3695__auto____3416;

return cljs.core.first.call(null,xs__3417);
} else
{return not_found;
}
});
G__3418 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3418__3419.call(this,coll,n);
case  3 :
return G__3418__3420.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3418;
})()
);
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___3422 = (function (){
return "";
});
var str_STAR___3423 = (function (x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return "";
} else
{if(cljs.core.truth_("﷐'else"))
{return x.toString();
} else
{return null;
}
}
});
var str_STAR___3424 = (function() { 
var G__3426__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__3427 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__3428 = cljs.core.next.call(null,more);
sb = G__3427;
more = G__3428;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__3426 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3426__delegate.call(this, x, ys);
};
G__3426.cljs$lang$maxFixedArity = 1;
G__3426.cljs$lang$applyTo = (function (arglist__3429){
var x = cljs.core.first(arglist__3429);
var ys = cljs.core.rest(arglist__3429);
return G__3426__delegate.call(this, x, ys);
});
return G__3426;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str_STAR___3422.call(this);
case  1 :
return str_STAR___3423.call(this,x);
default:
return str_STAR___3424.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___3424.cljs$lang$applyTo;
return str_STAR_;
})()
;
/**
* With no args, returns the empty string. With one arg x, returns
* x.toString().  (str nil) returns the empty string. With more than
* one arg, returns the concatenation of the str values of the args.
* @param {...*} var_args
*/
cljs.core.str = (function() {
var str = null;
var str__3430 = (function (){
return "";
});
var str__3431 = (function (x){
if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,x)))
{return x.substring(2,x.length);
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,x)))
{return cljs.core.str_STAR_.call(null,":",x.substring(2,x.length));
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return "";
} else
{if(cljs.core.truth_("﷐'else"))
{return x.toString();
} else
{return null;
}
}
}
}
});
var str__3432 = (function() { 
var G__3434__delegate = function (x,ys){
return cljs.core.apply.call(null,cljs.core.str_STAR_,x,ys);
};
var G__3434 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3434__delegate.call(this, x, ys);
};
G__3434.cljs$lang$maxFixedArity = 1;
G__3434.cljs$lang$applyTo = (function (arglist__3435){
var x = cljs.core.first(arglist__3435);
var ys = cljs.core.rest(arglist__3435);
return G__3434__delegate.call(this, x, ys);
});
return G__3434;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str__3430.call(this);
case  1 :
return str__3431.call(this,x);
default:
return str__3432.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__3432.cljs$lang$applyTo;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__3436 = (function (s,start){
return s.substring(start);
});
var subs__3437 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case  2 :
return subs__3436.call(this,s,start);
case  3 :
return subs__3437.call(this,s,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
return subs;
})()
;
/**
* Returns a Symbol with the given namespace and name.
*/
cljs.core.symbol = (function() {
var symbol = null;
var symbol__3439 = (function (name){
if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,name)))
{name;
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,name)))
{cljs.core.str_STAR_.call(null,"﷑","'",cljs.core.subs.call(null,name,2));
} else
{}
}
return cljs.core.str_STAR_.call(null,"﷑","'",name);
});
var symbol__3440 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case  1 :
return symbol__3439.call(this,ns);
case  2 :
return symbol__3440.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
return symbol;
})()
;
/**
* Returns a Keyword with the given namespace and name.  Do not use :
* in the keyword strings, it will be added automatically.
*/
cljs.core.keyword = (function() {
var keyword = null;
var keyword__3442 = (function (name){
if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,name)))
{return name;
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,name)))
{return cljs.core.str_STAR_.call(null,"﷐","'",cljs.core.subs.call(null,name,2));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.str_STAR_.call(null,"﷐","'",name);
} else
{return null;
}
}
}
});
var keyword__3443 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case  1 :
return keyword__3442.call(this,ns);
case  2 :
return keyword__3443.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
return keyword;
})()
;
/**
* Assumes x is sequential. Returns true if x equals y, otherwise
* returns false.
*/
cljs.core.equiv_sequential = (function equiv_sequential(x,y){
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__3445 = cljs.core.seq.call(null,x);
var ys__3446 = cljs.core.seq.call(null,y);

while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,xs__3445)))
{return cljs.core.nil_QMARK_.call(null,ys__3446);
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,ys__3446)))
{return false;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__3445),cljs.core.first.call(null,ys__3446))))
{{
var G__3447 = cljs.core.next.call(null,xs__3445);
var G__3448 = cljs.core.next.call(null,ys__3446);
xs__3445 = G__3447;
ys__3446 = G__3448;
continue;
}
} else
{if(cljs.core.truth_("﷐'else"))
{return false;
} else
{return null;
}
}
}
}
break;
}
})():null));
});
cljs.core.hash_combine = (function hash_combine(seed,hash){
return (seed ^ (((hash + 2654435769) + (seed << 6)) + (seed >> 2)));
});
cljs.core.hash_coll = (function hash_coll(coll){
return cljs.core.reduce.call(null,(function (p1__3449_SHARP_,p2__3450_SHARP_){
return cljs.core.hash_combine.call(null,p1__3449_SHARP_,cljs.core.hash.call(null,p2__3450_SHARP_));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll)),cljs.core.next.call(null,coll));
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__3451__3452 = cljs.core.seq.call(null,fn_map);

if(cljs.core.truth_(G__3451__3452))
{var G__3454__3456 = cljs.core.first.call(null,G__3451__3452);
var vec__3455__3457 = G__3454__3456;
var key_name__3458 = cljs.core.nth.call(null,vec__3455__3457,0,null);
var f__3459 = cljs.core.nth.call(null,vec__3455__3457,1,null);
var G__3451__3460 = G__3451__3452;

var G__3454__3461 = G__3454__3456;
var G__3451__3462 = G__3451__3460;

while(true){
var vec__3463__3464 = G__3454__3461;
var key_name__3465 = cljs.core.nth.call(null,vec__3463__3464,0,null);
var f__3466 = cljs.core.nth.call(null,vec__3463__3464,1,null);
var G__3451__3467 = G__3451__3462;

var str_name__3468 = cljs.core.name.call(null,key_name__3465);

obj[str_name__3468] = f__3466;
var temp__3698__auto____3469 = cljs.core.next.call(null,G__3451__3467);

if(cljs.core.truth_(temp__3698__auto____3469))
{var G__3451__3470 = temp__3698__auto____3469;

{
var G__3471 = cljs.core.first.call(null,G__3451__3470);
var G__3472 = G__3451__3470;
G__3454__3461 = G__3471;
G__3451__3462 = G__3472;
continue;
}
} else
{}
break;
}
} else
{}
return obj;
});

/**
* @constructor
*/
cljs.core.List = (function (meta,first,rest,count){
this.meta = meta;
this.first = first;
this.rest = rest;
this.count = count;
})
cljs.core.List.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.List");
});
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3473 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3474 = this;
return (new cljs.core.List(this__3474.meta,o,coll,(this__3474.count + 1)));
});
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3475 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3476 = this;
return this__3476.count;
});
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3477 = this;
return this__3477.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3478 = this;
return cljs.core._rest.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3479 = this;
return this__3479.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3480 = this;
return this__3480.rest;
});
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3481 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3482 = this;
return (new cljs.core.List(meta,this__3482.first,this__3482.rest,this__3482.count));
});
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3483 = this;
return this__3483.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3484 = this;
return cljs.core.List.EMPTY;
});
cljs.core.List;

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
})
cljs.core.EmptyList.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.EmptyList");
});
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3485 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3486 = this;
return (new cljs.core.List(this__3486.meta,o,null,1));
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3487 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3488 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3489 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3490 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3491 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3492 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3493 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3494 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3495 = this;
return this__3495.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3496 = this;
return coll;
});
cljs.core.EmptyList;
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
/**
* Returns a seq of the items in coll in reverse order. Not lazy.
*/
cljs.core.reverse = (function reverse(coll){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,coll);
});
/**
* @param {...*} var_args
*/
cljs.core.list = (function() { 
var list__delegate = function (items){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items));
};
var list = function (var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return list__delegate.call(this, items);
};
list.cljs$lang$maxFixedArity = 0;
list.cljs$lang$applyTo = (function (arglist__3497){
var items = cljs.core.seq( arglist__3497 );;
return list__delegate.call(this, items);
});
return list;
})()
;

/**
* @constructor
*/
cljs.core.Cons = (function (meta,first,rest){
this.meta = meta;
this.first = first;
this.rest = rest;
})
cljs.core.Cons.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Cons");
});
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3498 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3499 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3500 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3501 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3501.meta);
});
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3502 = this;
return (new cljs.core.Cons(null,o,coll));
});
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3503 = this;
return this__3503.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3504 = this;
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__3504.rest)))
{return cljs.core.List.EMPTY;
} else
{return this__3504.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3505 = this;
return this__3505.meta;
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3506 = this;
return (new cljs.core.Cons(meta,this__3506.first,this__3506.rest));
});
cljs.core.Cons;
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,seq){
return (new cljs.core.Cons(null,x,seq));
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__3507 = null;
var G__3507__3508 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__3507__3509 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__3507 = function(string,f,start){
switch(arguments.length){
case  2 :
return G__3507__3508.call(this,string,f);
case  3 :
return G__3507__3509.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3507;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__3511 = null;
var G__3511__3512 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__3511__3513 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__3511 = function(string,k,not_found){
switch(arguments.length){
case  2 :
return G__3511__3512.call(this,string,k);
case  3 :
return G__3511__3513.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3511;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__3515 = null;
var G__3515__3516 = (function (string,n){
if(cljs.core.truth_((n < cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return null;
}
});
var G__3515__3517 = (function (string,n,not_found){
if(cljs.core.truth_((n < cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return not_found;
}
});
G__3515 = function(string,n,not_found){
switch(arguments.length){
case  2 :
return G__3515__3516.call(this,string,n);
case  3 :
return G__3515__3517.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3515;
})()
);
(cljs.core.ICounted["string"] = true);
(cljs.core._count["string"] = (function (s){
return s.length;
}));
(cljs.core.ISeqable["string"] = true);
(cljs.core._seq["string"] = (function (string){
return cljs.core.prim_seq.call(null,string,0);
}));
(cljs.core.IHash["string"] = true);
(cljs.core._hash["string"] = (function (o){
return goog.string.hashCode.call(null,o);
}));
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = (function() {
var G__3519 = null;
var G__3519__3520 = (function (this$,coll){
this$ = this;
return cljs.core.get.call(null,coll,this$.toString());
});
var G__3519__3521 = (function (this$,coll,not_found){
this$ = this;
return cljs.core.get.call(null,coll,this$.toString(),not_found);
});
G__3519 = function(this$,coll,not_found){
switch(arguments.length){
case  2 :
return G__3519__3520.call(this,this$,coll);
case  3 :
return G__3519__3521.call(this,this$,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3519;
})()
;
String['prototype']['apply'] = (function (s,args){
if(cljs.core.truth_((cljs.core.count.call(null,args) < 2)))
{return cljs.core.get.call(null,(args[0]),s);
} else
{return cljs.core.get.call(null,(args[0]),s,(args[1]));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__3523 = lazy_seq.x;

if(cljs.core.truth_(lazy_seq.realized))
{return x__3523;
} else
{lazy_seq.x = x__3523.call(null);
lazy_seq.realized = true;
return lazy_seq.x;
}
});

/**
* @constructor
*/
cljs.core.LazySeq = (function (meta,realized,x){
this.meta = meta;
this.realized = realized;
this.x = x;
})
cljs.core.LazySeq.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.LazySeq");
});
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3524 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3525 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3526 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3527 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3527.meta);
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3528 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3529 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3530 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3531 = this;
return this__3531.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3532 = this;
return (new cljs.core.LazySeq(meta,this__3532.realized,this__3532.x));
});
cljs.core.LazySeq;
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__3533 = cljs.core.array.call(null);

var s__3534 = s;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__3534)))
{ary__3533.push(cljs.core.first.call(null,s__3534));
{
var G__3535 = cljs.core.next.call(null,s__3534);
s__3534 = G__3535;
continue;
}
} else
{return ary__3533;
}
break;
}
});
cljs.core.bounded_count = (function bounded_count(s,n){
var s__3536 = s;
var i__3537 = n;
var sum__3538 = 0;

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3539 = (i__3537 > 0);

if(cljs.core.truth_(and__3546__auto____3539))
{return cljs.core.seq.call(null,s__3536);
} else
{return and__3546__auto____3539;
}
})()))
{{
var G__3540 = cljs.core.next.call(null,s__3536);
var G__3541 = (i__3537 - 1);
var G__3542 = (sum__3538 + 1);
s__3536 = G__3540;
i__3537 = G__3541;
sum__3538 = G__3542;
continue;
}
} else
{return sum__3538;
}
break;
}
});
cljs.core.spread = (function spread(arglist){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,arglist)))
{return null;
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.next.call(null,arglist))))
{return cljs.core.seq.call(null,cljs.core.first.call(null,arglist));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.cons.call(null,cljs.core.first.call(null,arglist),spread.call(null,cljs.core.next.call(null,arglist)));
} else
{return null;
}
}
}
});
/**
* Returns a lazy seq representing the concatenation of the elements in the supplied colls.
* @param {...*} var_args
*/
cljs.core.concat = (function() {
var concat = null;
var concat__3546 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
})));
});
var concat__3547 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
})));
});
var concat__3548 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3543 = cljs.core.seq.call(null,x);

if(cljs.core.truth_(s__3543))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__3543),concat.call(null,cljs.core.rest.call(null,s__3543),y));
} else
{return y;
}
})));
});
var concat__3549 = (function() { 
var G__3551__delegate = function (x,y,zs){
var cat__3545 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__3544 = cljs.core.seq.call(null,xys);

if(cljs.core.truth_(xys__3544))
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__3544),cat.call(null,cljs.core.rest.call(null,xys__3544),zs));
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
})));
});

return cat__3545.call(null,concat.call(null,x,y),zs);
};
var G__3551 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3551__delegate.call(this, x, y, zs);
};
G__3551.cljs$lang$maxFixedArity = 2;
G__3551.cljs$lang$applyTo = (function (arglist__3552){
var x = cljs.core.first(arglist__3552);
var y = cljs.core.first(cljs.core.next(arglist__3552));
var zs = cljs.core.rest(cljs.core.next(arglist__3552));
return G__3551__delegate.call(this, x, y, zs);
});
return G__3551;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return concat__3546.call(this);
case  1 :
return concat__3547.call(this,x);
case  2 :
return concat__3548.call(this,x,y);
default:
return concat__3549.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__3549.cljs$lang$applyTo;
return concat;
})()
;
/**
* Creates a new list containing the items prepended to the rest, the
* last of which will be treated as a sequence.
* @param {...*} var_args
*/
cljs.core.list_STAR_ = (function() {
var list_STAR_ = null;
var list_STAR___3553 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___3554 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___3555 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___3556 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___3557 = (function() { 
var G__3559__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__3559 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3559__delegate.call(this, a, b, c, d, more);
};
G__3559.cljs$lang$maxFixedArity = 4;
G__3559.cljs$lang$applyTo = (function (arglist__3560){
var a = cljs.core.first(arglist__3560);
var b = cljs.core.first(cljs.core.next(arglist__3560));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3560)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3560))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3560))));
return G__3559__delegate.call(this, a, b, c, d, more);
});
return G__3559;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return list_STAR___3553.call(this,a);
case  2 :
return list_STAR___3554.call(this,a,b);
case  3 :
return list_STAR___3555.call(this,a,b,c);
case  4 :
return list_STAR___3556.call(this,a,b,c,d);
default:
return list_STAR___3557.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___3557.cljs$lang$applyTo;
return list_STAR_;
})()
;
/**
* Applies fn f to the argument list formed by prepending intervening arguments to args.
* First cut.  Not lazy.  Needs to use emitted toApply.
* @param {...*} var_args
*/
cljs.core.apply = (function() {
var apply = null;
var apply__3570 = (function (f,args){
var fixed_arity__3561 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,args,(fixed_arity__3561 + 1)) <= fixed_arity__3561)))
{return f.apply(f,cljs.core.to_array.call(null,args));
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3571 = (function (f,x,args){
var arglist__3562 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__3563 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3562,fixed_arity__3563) <= fixed_arity__3563)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3562));
} else
{return f.cljs$lang$applyTo(arglist__3562);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3562));
}
});
var apply__3572 = (function (f,x,y,args){
var arglist__3564 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__3565 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3564,fixed_arity__3565) <= fixed_arity__3565)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3564));
} else
{return f.cljs$lang$applyTo(arglist__3564);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3564));
}
});
var apply__3573 = (function (f,x,y,z,args){
var arglist__3566 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__3567 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3566,fixed_arity__3567) <= fixed_arity__3567)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3566));
} else
{return f.cljs$lang$applyTo(arglist__3566);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3566));
}
});
var apply__3574 = (function() { 
var G__3576__delegate = function (f,a,b,c,d,args){
var arglist__3568 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__3569 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3568,fixed_arity__3569) <= fixed_arity__3569)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3568));
} else
{return f.cljs$lang$applyTo(arglist__3568);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3568));
}
};
var G__3576 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__3576__delegate.call(this, f, a, b, c, d, args);
};
G__3576.cljs$lang$maxFixedArity = 5;
G__3576.cljs$lang$applyTo = (function (arglist__3577){
var f = cljs.core.first(arglist__3577);
var a = cljs.core.first(cljs.core.next(arglist__3577));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3577)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3577))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3577)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3577)))));
return G__3576__delegate.call(this, f, a, b, c, d, args);
});
return G__3576;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case  2 :
return apply__3570.call(this,f,a);
case  3 :
return apply__3571.call(this,f,a,b);
case  4 :
return apply__3572.call(this,f,a,b,c);
case  5 :
return apply__3573.call(this,f,a,b,c,d);
default:
return apply__3574.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__3574.cljs$lang$applyTo;
return apply;
})()
;
/**
* Returns an object of the same type and value as obj, with
* (apply f (meta obj) args) as its metadata.
* @param {...*} var_args
*/
cljs.core.vary_meta = (function() { 
var vary_meta__delegate = function (obj,f,args){
return cljs.core.with_meta.call(null,obj,cljs.core.apply.call(null,f,cljs.core.meta.call(null,obj),args));
};
var vary_meta = function (obj,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return vary_meta__delegate.call(this, obj, f, args);
};
vary_meta.cljs$lang$maxFixedArity = 2;
vary_meta.cljs$lang$applyTo = (function (arglist__3578){
var obj = cljs.core.first(arglist__3578);
var f = cljs.core.first(cljs.core.next(arglist__3578));
var args = cljs.core.rest(cljs.core.next(arglist__3578));
return vary_meta__delegate.call(this, obj, f, args);
});
return vary_meta;
})()
;
/**
* Same as (not (= obj1 obj2))
* @param {...*} var_args
*/
cljs.core.not_EQ_ = (function() {
var not_EQ_ = null;
var not_EQ___3579 = (function (x){
return false;
});
var not_EQ___3580 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var not_EQ___3581 = (function() { 
var G__3583__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__3583 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3583__delegate.call(this, x, y, more);
};
G__3583.cljs$lang$maxFixedArity = 2;
G__3583.cljs$lang$applyTo = (function (arglist__3584){
var x = cljs.core.first(arglist__3584);
var y = cljs.core.first(cljs.core.next(arglist__3584));
var more = cljs.core.rest(cljs.core.next(arglist__3584));
return G__3583__delegate.call(this, x, y, more);
});
return G__3583;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return not_EQ___3579.call(this,x);
case  2 :
return not_EQ___3580.call(this,x,y);
default:
return not_EQ___3581.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___3581.cljs$lang$applyTo;
return not_EQ_;
})()
;
/**
* If coll is empty, returns nil, else coll
*/
cljs.core.not_empty = (function not_empty(coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{return coll;
} else
{return null;
}
});
/**
* Returns true if (pred x) is logical true for every x in coll, else
* false.
*/
cljs.core.every_QMARK_ = (function every_QMARK_(pred,coll){
while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.seq.call(null,coll))))
{return true;
} else
{if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,coll))))
{{
var G__3585 = pred;
var G__3586 = cljs.core.next.call(null,coll);
pred = G__3585;
coll = G__3586;
continue;
}
} else
{if(cljs.core.truth_("﷐'else"))
{return false;
} else
{return null;
}
}
}
break;
}
});
/**
* Returns false if (pred x) is logical true for every x in
* coll, else true.
*/
cljs.core.not_every_QMARK_ = (function not_every_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.every_QMARK_.call(null,pred,coll));
});
/**
* Returns the first logical true value of (pred x) for any x in coll,
* else nil.  One common idiom is to use a set as pred, for example
* this will return :fred if :fred is in the sequence, otherwise nil:
* (some #{:fred} coll)
*/
cljs.core.some = (function some(pred,coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var or__3548__auto____3587 = pred.call(null,cljs.core.first.call(null,coll));

if(cljs.core.truth_(or__3548__auto____3587))
{return or__3548__auto____3587;
} else
{{
var G__3588 = pred;
var G__3589 = cljs.core.next.call(null,coll);
pred = G__3588;
coll = G__3589;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Returns false if (pred x) is logical true for any x in coll,
* else true.
*/
cljs.core.not_any_QMARK_ = (function not_any_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.some.call(null,pred,coll));
});
/**
* Returns true if n is even, throws an exception if n is not an integer
*/
cljs.core.even_QMARK_ = (function even_QMARK_(n){
if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null,n)))
{return ((n & 1) === 0);
} else
{throw (new Error(cljs.core.str.call(null,"Argument must be an integer: ",n)));
}
});
/**
* Returns true if n is odd, throws an exception if n is not an integer
*/
cljs.core.odd_QMARK_ = (function odd_QMARK_(n){
return cljs.core.not.call(null,cljs.core.even_QMARK_.call(null,n));
});
cljs.core.identity = (function identity(x){
return x;
});
/**
* Takes a fn f and returns a fn that takes the same arguments as f,
* has the same effects, if any, and returns the opposite truth value.
*/
cljs.core.complement = (function complement(f){
return (function() {
var G__3590 = null;
var G__3590__3591 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__3590__3592 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__3590__3593 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__3590__3594 = (function() { 
var G__3596__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__3596 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3596__delegate.call(this, x, y, zs);
};
G__3596.cljs$lang$maxFixedArity = 2;
G__3596.cljs$lang$applyTo = (function (arglist__3597){
var x = cljs.core.first(arglist__3597);
var y = cljs.core.first(cljs.core.next(arglist__3597));
var zs = cljs.core.rest(cljs.core.next(arglist__3597));
return G__3596__delegate.call(this, x, y, zs);
});
return G__3596;
})()
;
G__3590 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return G__3590__3591.call(this);
case  1 :
return G__3590__3592.call(this,x);
case  2 :
return G__3590__3593.call(this,x,y);
default:
return G__3590__3594.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3590.cljs$lang$maxFixedArity = 2;
G__3590.cljs$lang$applyTo = G__3590__3594.cljs$lang$applyTo;
return G__3590;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__3598__delegate = function (args){
return x;
};
var G__3598 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3598__delegate.call(this, args);
};
G__3598.cljs$lang$maxFixedArity = 0;
G__3598.cljs$lang$applyTo = (function (arglist__3599){
var args = cljs.core.seq( arglist__3599 );;
return G__3598__delegate.call(this, args);
});
return G__3598;
})()
;
});
/**
* Takes a set of functions and returns a fn that is the composition
* of those fns.  The returned fn takes a variable number of args,
* applies the rightmost of fns to the args, the next
* fn (right-to-left) to the result, etc.
* @param {...*} var_args
*/
cljs.core.comp = (function() {
var comp = null;
var comp__3603 = (function (){
return cljs.core.identity;
});
var comp__3604 = (function (f){
return f;
});
var comp__3605 = (function (f,g){
return (function() {
var G__3609 = null;
var G__3609__3610 = (function (){
return f.call(null,g.call(null));
});
var G__3609__3611 = (function (x){
return f.call(null,g.call(null,x));
});
var G__3609__3612 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__3609__3613 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__3609__3614 = (function() { 
var G__3616__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__3616 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3616__delegate.call(this, x, y, z, args);
};
G__3616.cljs$lang$maxFixedArity = 3;
G__3616.cljs$lang$applyTo = (function (arglist__3617){
var x = cljs.core.first(arglist__3617);
var y = cljs.core.first(cljs.core.next(arglist__3617));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3617)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3617)));
return G__3616__delegate.call(this, x, y, z, args);
});
return G__3616;
})()
;
G__3609 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3609__3610.call(this);
case  1 :
return G__3609__3611.call(this,x);
case  2 :
return G__3609__3612.call(this,x,y);
case  3 :
return G__3609__3613.call(this,x,y,z);
default:
return G__3609__3614.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3609.cljs$lang$maxFixedArity = 3;
G__3609.cljs$lang$applyTo = G__3609__3614.cljs$lang$applyTo;
return G__3609;
})()
});
var comp__3606 = (function (f,g,h){
return (function() {
var G__3618 = null;
var G__3618__3619 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__3618__3620 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__3618__3621 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__3618__3622 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__3618__3623 = (function() { 
var G__3625__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__3625 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3625__delegate.call(this, x, y, z, args);
};
G__3625.cljs$lang$maxFixedArity = 3;
G__3625.cljs$lang$applyTo = (function (arglist__3626){
var x = cljs.core.first(arglist__3626);
var y = cljs.core.first(cljs.core.next(arglist__3626));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3626)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3626)));
return G__3625__delegate.call(this, x, y, z, args);
});
return G__3625;
})()
;
G__3618 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3618__3619.call(this);
case  1 :
return G__3618__3620.call(this,x);
case  2 :
return G__3618__3621.call(this,x,y);
case  3 :
return G__3618__3622.call(this,x,y,z);
default:
return G__3618__3623.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3618.cljs$lang$maxFixedArity = 3;
G__3618.cljs$lang$applyTo = G__3618__3623.cljs$lang$applyTo;
return G__3618;
})()
});
var comp__3607 = (function() { 
var G__3627__delegate = function (f1,f2,f3,fs){
var fs__3600 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));

return (function() { 
var G__3628__delegate = function (args){
var ret__3601 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__3600),args);
var fs__3602 = cljs.core.next.call(null,fs__3600);

while(true){
if(cljs.core.truth_(fs__3602))
{{
var G__3629 = cljs.core.first.call(null,fs__3602).call(null,ret__3601);
var G__3630 = cljs.core.next.call(null,fs__3602);
ret__3601 = G__3629;
fs__3602 = G__3630;
continue;
}
} else
{return ret__3601;
}
break;
}
};
var G__3628 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3628__delegate.call(this, args);
};
G__3628.cljs$lang$maxFixedArity = 0;
G__3628.cljs$lang$applyTo = (function (arglist__3631){
var args = cljs.core.seq( arglist__3631 );;
return G__3628__delegate.call(this, args);
});
return G__3628;
})()
;
};
var G__3627 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3627__delegate.call(this, f1, f2, f3, fs);
};
G__3627.cljs$lang$maxFixedArity = 3;
G__3627.cljs$lang$applyTo = (function (arglist__3632){
var f1 = cljs.core.first(arglist__3632);
var f2 = cljs.core.first(cljs.core.next(arglist__3632));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3632)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3632)));
return G__3627__delegate.call(this, f1, f2, f3, fs);
});
return G__3627;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case  0 :
return comp__3603.call(this);
case  1 :
return comp__3604.call(this,f1);
case  2 :
return comp__3605.call(this,f1,f2);
case  3 :
return comp__3606.call(this,f1,f2,f3);
default:
return comp__3607.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__3607.cljs$lang$applyTo;
return comp;
})()
;
/**
* Takes a function f and fewer than the normal arguments to f, and
* returns a fn that takes a variable number of additional args. When
* called, the returned function calls f with args + additional args.
* @param {...*} var_args
*/
cljs.core.partial = (function() {
var partial = null;
var partial__3633 = (function (f,arg1){
return (function() { 
var G__3638__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__3638 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3638__delegate.call(this, args);
};
G__3638.cljs$lang$maxFixedArity = 0;
G__3638.cljs$lang$applyTo = (function (arglist__3639){
var args = cljs.core.seq( arglist__3639 );;
return G__3638__delegate.call(this, args);
});
return G__3638;
})()
;
});
var partial__3634 = (function (f,arg1,arg2){
return (function() { 
var G__3640__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__3640 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3640__delegate.call(this, args);
};
G__3640.cljs$lang$maxFixedArity = 0;
G__3640.cljs$lang$applyTo = (function (arglist__3641){
var args = cljs.core.seq( arglist__3641 );;
return G__3640__delegate.call(this, args);
});
return G__3640;
})()
;
});
var partial__3635 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__3642__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__3642 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3642__delegate.call(this, args);
};
G__3642.cljs$lang$maxFixedArity = 0;
G__3642.cljs$lang$applyTo = (function (arglist__3643){
var args = cljs.core.seq( arglist__3643 );;
return G__3642__delegate.call(this, args);
});
return G__3642;
})()
;
});
var partial__3636 = (function() { 
var G__3644__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__3645__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__3645 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3645__delegate.call(this, args);
};
G__3645.cljs$lang$maxFixedArity = 0;
G__3645.cljs$lang$applyTo = (function (arglist__3646){
var args = cljs.core.seq( arglist__3646 );;
return G__3645__delegate.call(this, args);
});
return G__3645;
})()
;
};
var G__3644 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3644__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__3644.cljs$lang$maxFixedArity = 4;
G__3644.cljs$lang$applyTo = (function (arglist__3647){
var f = cljs.core.first(arglist__3647);
var arg1 = cljs.core.first(cljs.core.next(arglist__3647));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3647)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3647))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3647))));
return G__3644__delegate.call(this, f, arg1, arg2, arg3, more);
});
return G__3644;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return partial__3633.call(this,f,arg1);
case  3 :
return partial__3634.call(this,f,arg1,arg2);
case  4 :
return partial__3635.call(this,f,arg1,arg2,arg3);
default:
return partial__3636.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__3636.cljs$lang$applyTo;
return partial;
})()
;
/**
* Takes a function f, and returns a function that calls f, replacing
* a nil first argument to f with the supplied value x. Higher arity
* versions can replace arguments in the second and third
* positions (y, z). Note that the function f can take any number of
* arguments, not just the one(s) being nil-patched.
*/
cljs.core.fnil = (function() {
var fnil = null;
var fnil__3648 = (function (f,x){
return (function() {
var G__3652 = null;
var G__3652__3653 = (function (a){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a));
});
var G__3652__3654 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b);
});
var G__3652__3655 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c);
});
var G__3652__3656 = (function() { 
var G__3658__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c,ds);
};
var G__3658 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3658__delegate.call(this, a, b, c, ds);
};
G__3658.cljs$lang$maxFixedArity = 3;
G__3658.cljs$lang$applyTo = (function (arglist__3659){
var a = cljs.core.first(arglist__3659);
var b = cljs.core.first(cljs.core.next(arglist__3659));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3659)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3659)));
return G__3658__delegate.call(this, a, b, c, ds);
});
return G__3658;
})()
;
G__3652 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  1 :
return G__3652__3653.call(this,a);
case  2 :
return G__3652__3654.call(this,a,b);
case  3 :
return G__3652__3655.call(this,a,b,c);
default:
return G__3652__3656.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3652.cljs$lang$maxFixedArity = 3;
G__3652.cljs$lang$applyTo = G__3652__3656.cljs$lang$applyTo;
return G__3652;
})()
});
var fnil__3649 = (function (f,x,y){
return (function() {
var G__3660 = null;
var G__3660__3661 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__3660__3662 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c);
});
var G__3660__3663 = (function() { 
var G__3665__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c,ds);
};
var G__3665 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3665__delegate.call(this, a, b, c, ds);
};
G__3665.cljs$lang$maxFixedArity = 3;
G__3665.cljs$lang$applyTo = (function (arglist__3666){
var a = cljs.core.first(arglist__3666);
var b = cljs.core.first(cljs.core.next(arglist__3666));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3666)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3666)));
return G__3665__delegate.call(this, a, b, c, ds);
});
return G__3665;
})()
;
G__3660 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__3660__3661.call(this,a,b);
case  3 :
return G__3660__3662.call(this,a,b,c);
default:
return G__3660__3663.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3660.cljs$lang$maxFixedArity = 3;
G__3660.cljs$lang$applyTo = G__3660__3663.cljs$lang$applyTo;
return G__3660;
})()
});
var fnil__3650 = (function (f,x,y,z){
return (function() {
var G__3667 = null;
var G__3667__3668 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__3667__3669 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c));
});
var G__3667__3670 = (function() { 
var G__3672__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c),ds);
};
var G__3672 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3672__delegate.call(this, a, b, c, ds);
};
G__3672.cljs$lang$maxFixedArity = 3;
G__3672.cljs$lang$applyTo = (function (arglist__3673){
var a = cljs.core.first(arglist__3673);
var b = cljs.core.first(cljs.core.next(arglist__3673));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3673)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3673)));
return G__3672__delegate.call(this, a, b, c, ds);
});
return G__3672;
})()
;
G__3667 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__3667__3668.call(this,a,b);
case  3 :
return G__3667__3669.call(this,a,b,c);
default:
return G__3667__3670.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3667.cljs$lang$maxFixedArity = 3;
G__3667.cljs$lang$applyTo = G__3667__3670.cljs$lang$applyTo;
return G__3667;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case  2 :
return fnil__3648.call(this,f,x);
case  3 :
return fnil__3649.call(this,f,x,y);
case  4 :
return fnil__3650.call(this,f,x,y,z);
}
throw('Invalid arity: ' + arguments.length);
};
return fnil;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to 0
* and the first item of coll, followed by applying f to 1 and the second
* item in coll, etc, until coll is exhausted. Thus function f should
* accept 2 arguments, index and item.
*/
cljs.core.map_indexed = (function map_indexed(f,coll){
var mapi__3676 = (function mpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3674 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3674))
{var s__3675 = temp__3698__auto____3674;

return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__3675)),mpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3675)));
} else
{return null;
}
})));
});

return mapi__3676.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3677 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3677))
{var s__3678 = temp__3698__auto____3677;

var x__3679 = f.call(null,cljs.core.first.call(null,s__3678));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__3679)))
{return keep.call(null,f,cljs.core.rest.call(null,s__3678));
} else
{return cljs.core.cons.call(null,x__3679,keep.call(null,f,cljs.core.rest.call(null,s__3678)));
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of the non-nil results of (f index item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep_indexed = (function keep_indexed(f,coll){
var keepi__3689 = (function kpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3686 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3686))
{var s__3687 = temp__3698__auto____3686;

var x__3688 = f.call(null,idx,cljs.core.first.call(null,s__3687));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__3688)))
{return kpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3687));
} else
{return cljs.core.cons.call(null,x__3688,kpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3687)));
}
} else
{return null;
}
})));
});

return keepi__3689.call(null,0,coll);
});
/**
* Takes a set of predicates and returns a function f that returns true if all of its
* composing predicates return a logical true value against all of its arguments, else it returns
* false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical false result against the original predicates.
* @param {...*} var_args
*/
cljs.core.every_pred = (function() {
var every_pred = null;
var every_pred__3734 = (function (p){
return (function() {
var ep1 = null;
var ep1__3739 = (function (){
return true;
});
var ep1__3740 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__3741 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3696 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____3696))
{return p.call(null,y);
} else
{return and__3546__auto____3696;
}
})());
});
var ep1__3742 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3697 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____3697))
{var and__3546__auto____3698 = p.call(null,y);

if(cljs.core.truth_(and__3546__auto____3698))
{return p.call(null,z);
} else
{return and__3546__auto____3698;
}
} else
{return and__3546__auto____3697;
}
})());
});
var ep1__3743 = (function() { 
var G__3745__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3699 = ep1.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3699))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3546__auto____3699;
}
})());
};
var G__3745 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3745__delegate.call(this, x, y, z, args);
};
G__3745.cljs$lang$maxFixedArity = 3;
G__3745.cljs$lang$applyTo = (function (arglist__3746){
var x = cljs.core.first(arglist__3746);
var y = cljs.core.first(cljs.core.next(arglist__3746));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3746)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3746)));
return G__3745__delegate.call(this, x, y, z, args);
});
return G__3745;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep1__3739.call(this);
case  1 :
return ep1__3740.call(this,x);
case  2 :
return ep1__3741.call(this,x,y);
case  3 :
return ep1__3742.call(this,x,y,z);
default:
return ep1__3743.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__3743.cljs$lang$applyTo;
return ep1;
})()
});
var every_pred__3735 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__3747 = (function (){
return true;
});
var ep2__3748 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3700 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3700))
{return p2.call(null,x);
} else
{return and__3546__auto____3700;
}
})());
});
var ep2__3749 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3701 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3701))
{var and__3546__auto____3702 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3702))
{var and__3546__auto____3703 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3703))
{return p2.call(null,y);
} else
{return and__3546__auto____3703;
}
} else
{return and__3546__auto____3702;
}
} else
{return and__3546__auto____3701;
}
})());
});
var ep2__3750 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3704 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3704))
{var and__3546__auto____3705 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3705))
{var and__3546__auto____3706 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____3706))
{var and__3546__auto____3707 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3707))
{var and__3546__auto____3708 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3708))
{return p2.call(null,z);
} else
{return and__3546__auto____3708;
}
} else
{return and__3546__auto____3707;
}
} else
{return and__3546__auto____3706;
}
} else
{return and__3546__auto____3705;
}
} else
{return and__3546__auto____3704;
}
})());
});
var ep2__3751 = (function() { 
var G__3753__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3709 = ep2.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3709))
{return cljs.core.every_QMARK_.call(null,(function (p1__3680_SHARP_){
var and__3546__auto____3710 = p1.call(null,p1__3680_SHARP_);

if(cljs.core.truth_(and__3546__auto____3710))
{return p2.call(null,p1__3680_SHARP_);
} else
{return and__3546__auto____3710;
}
}),args);
} else
{return and__3546__auto____3709;
}
})());
};
var G__3753 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3753__delegate.call(this, x, y, z, args);
};
G__3753.cljs$lang$maxFixedArity = 3;
G__3753.cljs$lang$applyTo = (function (arglist__3754){
var x = cljs.core.first(arglist__3754);
var y = cljs.core.first(cljs.core.next(arglist__3754));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3754)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3754)));
return G__3753__delegate.call(this, x, y, z, args);
});
return G__3753;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep2__3747.call(this);
case  1 :
return ep2__3748.call(this,x);
case  2 :
return ep2__3749.call(this,x,y);
case  3 :
return ep2__3750.call(this,x,y,z);
default:
return ep2__3751.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__3751.cljs$lang$applyTo;
return ep2;
})()
});
var every_pred__3736 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__3755 = (function (){
return true;
});
var ep3__3756 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3711 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3711))
{var and__3546__auto____3712 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3712))
{return p3.call(null,x);
} else
{return and__3546__auto____3712;
}
} else
{return and__3546__auto____3711;
}
})());
});
var ep3__3757 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3713 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3713))
{var and__3546__auto____3714 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3714))
{var and__3546__auto____3715 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____3715))
{var and__3546__auto____3716 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3716))
{var and__3546__auto____3717 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3717))
{return p3.call(null,y);
} else
{return and__3546__auto____3717;
}
} else
{return and__3546__auto____3716;
}
} else
{return and__3546__auto____3715;
}
} else
{return and__3546__auto____3714;
}
} else
{return and__3546__auto____3713;
}
})());
});
var ep3__3758 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3718 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3718))
{var and__3546__auto____3719 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3719))
{var and__3546__auto____3720 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____3720))
{var and__3546__auto____3721 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3721))
{var and__3546__auto____3722 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3722))
{var and__3546__auto____3723 = p3.call(null,y);

if(cljs.core.truth_(and__3546__auto____3723))
{var and__3546__auto____3724 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____3724))
{var and__3546__auto____3725 = p2.call(null,z);

if(cljs.core.truth_(and__3546__auto____3725))
{return p3.call(null,z);
} else
{return and__3546__auto____3725;
}
} else
{return and__3546__auto____3724;
}
} else
{return and__3546__auto____3723;
}
} else
{return and__3546__auto____3722;
}
} else
{return and__3546__auto____3721;
}
} else
{return and__3546__auto____3720;
}
} else
{return and__3546__auto____3719;
}
} else
{return and__3546__auto____3718;
}
})());
});
var ep3__3759 = (function() { 
var G__3761__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3726 = ep3.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3726))
{return cljs.core.every_QMARK_.call(null,(function (p1__3681_SHARP_){
var and__3546__auto____3727 = p1.call(null,p1__3681_SHARP_);

if(cljs.core.truth_(and__3546__auto____3727))
{var and__3546__auto____3728 = p2.call(null,p1__3681_SHARP_);

if(cljs.core.truth_(and__3546__auto____3728))
{return p3.call(null,p1__3681_SHARP_);
} else
{return and__3546__auto____3728;
}
} else
{return and__3546__auto____3727;
}
}),args);
} else
{return and__3546__auto____3726;
}
})());
};
var G__3761 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3761__delegate.call(this, x, y, z, args);
};
G__3761.cljs$lang$maxFixedArity = 3;
G__3761.cljs$lang$applyTo = (function (arglist__3762){
var x = cljs.core.first(arglist__3762);
var y = cljs.core.first(cljs.core.next(arglist__3762));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3762)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3762)));
return G__3761__delegate.call(this, x, y, z, args);
});
return G__3761;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep3__3755.call(this);
case  1 :
return ep3__3756.call(this,x);
case  2 :
return ep3__3757.call(this,x,y);
case  3 :
return ep3__3758.call(this,x,y,z);
default:
return ep3__3759.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__3759.cljs$lang$applyTo;
return ep3;
})()
});
var every_pred__3737 = (function() { 
var G__3763__delegate = function (p1,p2,p3,ps){
var ps__3729 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var epn = null;
var epn__3764 = (function (){
return true;
});
var epn__3765 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__3682_SHARP_){
return p1__3682_SHARP_.call(null,x);
}),ps__3729);
});
var epn__3766 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__3683_SHARP_){
var and__3546__auto____3730 = p1__3683_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____3730))
{return p1__3683_SHARP_.call(null,y);
} else
{return and__3546__auto____3730;
}
}),ps__3729);
});
var epn__3767 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__3684_SHARP_){
var and__3546__auto____3731 = p1__3684_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____3731))
{var and__3546__auto____3732 = p1__3684_SHARP_.call(null,y);

if(cljs.core.truth_(and__3546__auto____3732))
{return p1__3684_SHARP_.call(null,z);
} else
{return and__3546__auto____3732;
}
} else
{return and__3546__auto____3731;
}
}),ps__3729);
});
var epn__3768 = (function() { 
var G__3770__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3733 = epn.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3733))
{return cljs.core.every_QMARK_.call(null,(function (p1__3685_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__3685_SHARP_,args);
}),ps__3729);
} else
{return and__3546__auto____3733;
}
})());
};
var G__3770 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3770__delegate.call(this, x, y, z, args);
};
G__3770.cljs$lang$maxFixedArity = 3;
G__3770.cljs$lang$applyTo = (function (arglist__3771){
var x = cljs.core.first(arglist__3771);
var y = cljs.core.first(cljs.core.next(arglist__3771));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3771)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3771)));
return G__3770__delegate.call(this, x, y, z, args);
});
return G__3770;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return epn__3764.call(this);
case  1 :
return epn__3765.call(this,x);
case  2 :
return epn__3766.call(this,x,y);
case  3 :
return epn__3767.call(this,x,y,z);
default:
return epn__3768.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__3768.cljs$lang$applyTo;
return epn;
})()
};
var G__3763 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3763__delegate.call(this, p1, p2, p3, ps);
};
G__3763.cljs$lang$maxFixedArity = 3;
G__3763.cljs$lang$applyTo = (function (arglist__3772){
var p1 = cljs.core.first(arglist__3772);
var p2 = cljs.core.first(cljs.core.next(arglist__3772));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3772)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3772)));
return G__3763__delegate.call(this, p1, p2, p3, ps);
});
return G__3763;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return every_pred__3734.call(this,p1);
case  2 :
return every_pred__3735.call(this,p1,p2);
case  3 :
return every_pred__3736.call(this,p1,p2,p3);
default:
return every_pred__3737.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__3737.cljs$lang$applyTo;
return every_pred;
})()
;
/**
* Takes a set of predicates and returns a function f that returns the first logical true value
* returned by one of its composing predicates against any of its arguments, else it returns
* logical false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical true result against the original predicates.
* @param {...*} var_args
*/
cljs.core.some_fn = (function() {
var some_fn = null;
var some_fn__3812 = (function (p){
return (function() {
var sp1 = null;
var sp1__3817 = (function (){
return null;
});
var sp1__3818 = (function (x){
return p.call(null,x);
});
var sp1__3819 = (function (x,y){
var or__3548__auto____3774 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____3774))
{return or__3548__auto____3774;
} else
{return p.call(null,y);
}
});
var sp1__3820 = (function (x,y,z){
var or__3548__auto____3775 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____3775))
{return or__3548__auto____3775;
} else
{var or__3548__auto____3776 = p.call(null,y);

if(cljs.core.truth_(or__3548__auto____3776))
{return or__3548__auto____3776;
} else
{return p.call(null,z);
}
}
});
var sp1__3821 = (function() { 
var G__3823__delegate = function (x,y,z,args){
var or__3548__auto____3777 = sp1.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3777))
{return or__3548__auto____3777;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__3823 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3823__delegate.call(this, x, y, z, args);
};
G__3823.cljs$lang$maxFixedArity = 3;
G__3823.cljs$lang$applyTo = (function (arglist__3824){
var x = cljs.core.first(arglist__3824);
var y = cljs.core.first(cljs.core.next(arglist__3824));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3824)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3824)));
return G__3823__delegate.call(this, x, y, z, args);
});
return G__3823;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp1__3817.call(this);
case  1 :
return sp1__3818.call(this,x);
case  2 :
return sp1__3819.call(this,x,y);
case  3 :
return sp1__3820.call(this,x,y,z);
default:
return sp1__3821.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__3821.cljs$lang$applyTo;
return sp1;
})()
});
var some_fn__3813 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__3825 = (function (){
return null;
});
var sp2__3826 = (function (x){
var or__3548__auto____3778 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3778))
{return or__3548__auto____3778;
} else
{return p2.call(null,x);
}
});
var sp2__3827 = (function (x,y){
var or__3548__auto____3779 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3779))
{return or__3548__auto____3779;
} else
{var or__3548__auto____3780 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3780))
{return or__3548__auto____3780;
} else
{var or__3548__auto____3781 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3781))
{return or__3548__auto____3781;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3828 = (function (x,y,z){
var or__3548__auto____3782 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3782))
{return or__3548__auto____3782;
} else
{var or__3548__auto____3783 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3783))
{return or__3548__auto____3783;
} else
{var or__3548__auto____3784 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____3784))
{return or__3548__auto____3784;
} else
{var or__3548__auto____3785 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3785))
{return or__3548__auto____3785;
} else
{var or__3548__auto____3786 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3786))
{return or__3548__auto____3786;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__3829 = (function() { 
var G__3831__delegate = function (x,y,z,args){
var or__3548__auto____3787 = sp2.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3787))
{return or__3548__auto____3787;
} else
{return cljs.core.some.call(null,(function (p1__3690_SHARP_){
var or__3548__auto____3788 = p1.call(null,p1__3690_SHARP_);

if(cljs.core.truth_(or__3548__auto____3788))
{return or__3548__auto____3788;
} else
{return p2.call(null,p1__3690_SHARP_);
}
}),args);
}
};
var G__3831 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3831__delegate.call(this, x, y, z, args);
};
G__3831.cljs$lang$maxFixedArity = 3;
G__3831.cljs$lang$applyTo = (function (arglist__3832){
var x = cljs.core.first(arglist__3832);
var y = cljs.core.first(cljs.core.next(arglist__3832));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3832)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3832)));
return G__3831__delegate.call(this, x, y, z, args);
});
return G__3831;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp2__3825.call(this);
case  1 :
return sp2__3826.call(this,x);
case  2 :
return sp2__3827.call(this,x,y);
case  3 :
return sp2__3828.call(this,x,y,z);
default:
return sp2__3829.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__3829.cljs$lang$applyTo;
return sp2;
})()
});
var some_fn__3814 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__3833 = (function (){
return null;
});
var sp3__3834 = (function (x){
var or__3548__auto____3789 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3789))
{return or__3548__auto____3789;
} else
{var or__3548__auto____3790 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3790))
{return or__3548__auto____3790;
} else
{return p3.call(null,x);
}
}
});
var sp3__3835 = (function (x,y){
var or__3548__auto____3791 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3791))
{return or__3548__auto____3791;
} else
{var or__3548__auto____3792 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3792))
{return or__3548__auto____3792;
} else
{var or__3548__auto____3793 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____3793))
{return or__3548__auto____3793;
} else
{var or__3548__auto____3794 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3794))
{return or__3548__auto____3794;
} else
{var or__3548__auto____3795 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3795))
{return or__3548__auto____3795;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3836 = (function (x,y,z){
var or__3548__auto____3796 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3796))
{return or__3548__auto____3796;
} else
{var or__3548__auto____3797 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3797))
{return or__3548__auto____3797;
} else
{var or__3548__auto____3798 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____3798))
{return or__3548__auto____3798;
} else
{var or__3548__auto____3799 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3799))
{return or__3548__auto____3799;
} else
{var or__3548__auto____3800 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3800))
{return or__3548__auto____3800;
} else
{var or__3548__auto____3801 = p3.call(null,y);

if(cljs.core.truth_(or__3548__auto____3801))
{return or__3548__auto____3801;
} else
{var or__3548__auto____3802 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____3802))
{return or__3548__auto____3802;
} else
{var or__3548__auto____3803 = p2.call(null,z);

if(cljs.core.truth_(or__3548__auto____3803))
{return or__3548__auto____3803;
} else
{return p3.call(null,z);
}
}
}
}
}
}
}
}
});
var sp3__3837 = (function() { 
var G__3839__delegate = function (x,y,z,args){
var or__3548__auto____3804 = sp3.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3804))
{return or__3548__auto____3804;
} else
{return cljs.core.some.call(null,(function (p1__3691_SHARP_){
var or__3548__auto____3805 = p1.call(null,p1__3691_SHARP_);

if(cljs.core.truth_(or__3548__auto____3805))
{return or__3548__auto____3805;
} else
{var or__3548__auto____3806 = p2.call(null,p1__3691_SHARP_);

if(cljs.core.truth_(or__3548__auto____3806))
{return or__3548__auto____3806;
} else
{return p3.call(null,p1__3691_SHARP_);
}
}
}),args);
}
};
var G__3839 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3839__delegate.call(this, x, y, z, args);
};
G__3839.cljs$lang$maxFixedArity = 3;
G__3839.cljs$lang$applyTo = (function (arglist__3840){
var x = cljs.core.first(arglist__3840);
var y = cljs.core.first(cljs.core.next(arglist__3840));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3840)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3840)));
return G__3839__delegate.call(this, x, y, z, args);
});
return G__3839;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp3__3833.call(this);
case  1 :
return sp3__3834.call(this,x);
case  2 :
return sp3__3835.call(this,x,y);
case  3 :
return sp3__3836.call(this,x,y,z);
default:
return sp3__3837.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__3837.cljs$lang$applyTo;
return sp3;
})()
});
var some_fn__3815 = (function() { 
var G__3841__delegate = function (p1,p2,p3,ps){
var ps__3807 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var spn = null;
var spn__3842 = (function (){
return null;
});
var spn__3843 = (function (x){
return cljs.core.some.call(null,(function (p1__3692_SHARP_){
return p1__3692_SHARP_.call(null,x);
}),ps__3807);
});
var spn__3844 = (function (x,y){
return cljs.core.some.call(null,(function (p1__3693_SHARP_){
var or__3548__auto____3808 = p1__3693_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3808))
{return or__3548__auto____3808;
} else
{return p1__3693_SHARP_.call(null,y);
}
}),ps__3807);
});
var spn__3845 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__3694_SHARP_){
var or__3548__auto____3809 = p1__3694_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3809))
{return or__3548__auto____3809;
} else
{var or__3548__auto____3810 = p1__3694_SHARP_.call(null,y);

if(cljs.core.truth_(or__3548__auto____3810))
{return or__3548__auto____3810;
} else
{return p1__3694_SHARP_.call(null,z);
}
}
}),ps__3807);
});
var spn__3846 = (function() { 
var G__3848__delegate = function (x,y,z,args){
var or__3548__auto____3811 = spn.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3811))
{return or__3548__auto____3811;
} else
{return cljs.core.some.call(null,(function (p1__3695_SHARP_){
return cljs.core.some.call(null,p1__3695_SHARP_,args);
}),ps__3807);
}
};
var G__3848 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3848__delegate.call(this, x, y, z, args);
};
G__3848.cljs$lang$maxFixedArity = 3;
G__3848.cljs$lang$applyTo = (function (arglist__3849){
var x = cljs.core.first(arglist__3849);
var y = cljs.core.first(cljs.core.next(arglist__3849));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3849)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3849)));
return G__3848__delegate.call(this, x, y, z, args);
});
return G__3848;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return spn__3842.call(this);
case  1 :
return spn__3843.call(this,x);
case  2 :
return spn__3844.call(this,x,y);
case  3 :
return spn__3845.call(this,x,y,z);
default:
return spn__3846.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__3846.cljs$lang$applyTo;
return spn;
})()
};
var G__3841 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3841__delegate.call(this, p1, p2, p3, ps);
};
G__3841.cljs$lang$maxFixedArity = 3;
G__3841.cljs$lang$applyTo = (function (arglist__3850){
var p1 = cljs.core.first(arglist__3850);
var p2 = cljs.core.first(cljs.core.next(arglist__3850));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3850)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3850)));
return G__3841__delegate.call(this, p1, p2, p3, ps);
});
return G__3841;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return some_fn__3812.call(this,p1);
case  2 :
return some_fn__3813.call(this,p1,p2);
case  3 :
return some_fn__3814.call(this,p1,p2,p3);
default:
return some_fn__3815.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__3815.cljs$lang$applyTo;
return some_fn;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.map = (function() {
var map = null;
var map__3863 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3851 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3851))
{var s__3852 = temp__3698__auto____3851;

return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__3852)),map.call(null,f,cljs.core.rest.call(null,s__3852)));
} else
{return null;
}
})));
});
var map__3864 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3853 = cljs.core.seq.call(null,c1);
var s2__3854 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3855 = s1__3853;

if(cljs.core.truth_(and__3546__auto____3855))
{return s2__3854;
} else
{return and__3546__auto____3855;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3853),cljs.core.first.call(null,s2__3854)),map.call(null,f,cljs.core.rest.call(null,s1__3853),cljs.core.rest.call(null,s2__3854)));
} else
{return null;
}
})));
});
var map__3865 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3856 = cljs.core.seq.call(null,c1);
var s2__3857 = cljs.core.seq.call(null,c2);
var s3__3858 = cljs.core.seq.call(null,c3);

if(cljs.core.truth_((function (){var and__3546__auto____3859 = s1__3856;

if(cljs.core.truth_(and__3546__auto____3859))
{var and__3546__auto____3860 = s2__3857;

if(cljs.core.truth_(and__3546__auto____3860))
{return s3__3858;
} else
{return and__3546__auto____3860;
}
} else
{return and__3546__auto____3859;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3856),cljs.core.first.call(null,s2__3857),cljs.core.first.call(null,s3__3858)),map.call(null,f,cljs.core.rest.call(null,s1__3856),cljs.core.rest.call(null,s2__3857),cljs.core.rest.call(null,s3__3858)));
} else
{return null;
}
})));
});
var map__3866 = (function() { 
var G__3868__delegate = function (f,c1,c2,c3,colls){
var step__3862 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3861 = map.call(null,cljs.core.seq,cs);

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3861)))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__3861),step.call(null,map.call(null,cljs.core.rest,ss__3861)));
} else
{return null;
}
})));
});

return map.call(null,(function (p1__3773_SHARP_){
return cljs.core.apply.call(null,f,p1__3773_SHARP_);
}),step__3862.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__3868 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3868__delegate.call(this, f, c1, c2, c3, colls);
};
G__3868.cljs$lang$maxFixedArity = 4;
G__3868.cljs$lang$applyTo = (function (arglist__3869){
var f = cljs.core.first(arglist__3869);
var c1 = cljs.core.first(cljs.core.next(arglist__3869));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3869)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3869))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3869))));
return G__3868__delegate.call(this, f, c1, c2, c3, colls);
});
return G__3868;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return map__3863.call(this,f,c1);
case  3 :
return map__3864.call(this,f,c1,c2);
case  4 :
return map__3865.call(this,f,c1,c2,c3);
default:
return map__3866.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__3866.cljs$lang$applyTo;
return map;
})()
;
/**
* Returns a lazy sequence of the first n items in coll, or all items if
* there are fewer than n.
*/
cljs.core.take = (function take(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_((n > 0)))
{var temp__3698__auto____3870 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3870))
{var s__3871 = temp__3698__auto____3870;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__3871),take.call(null,(n - 1),cljs.core.rest.call(null,s__3871)));
} else
{return null;
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of all but the first n items in coll.
*/
cljs.core.drop = (function drop(n,coll){
var step__3874 = (function (n,coll){
while(true){
var s__3872 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3873 = (n > 0);

if(cljs.core.truth_(and__3546__auto____3873))
{return s__3872;
} else
{return and__3546__auto____3873;
}
})()))
{{
var G__3875 = (n - 1);
var G__3876 = cljs.core.rest.call(null,s__3872);
n = G__3875;
coll = G__3876;
continue;
}
} else
{return s__3872;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3874.call(null,n,coll);
})));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__3877 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__3878 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case  1 :
return drop_last__3877.call(this,n);
case  2 :
return drop_last__3878.call(this,n,s);
}
throw('Invalid arity: ' + arguments.length);
};
return drop_last;
})()
;
/**
* Returns a seq of the last n items in coll.  Depending on the type
* of coll may be no better than linear time.  For vectors, see also subvec.
*/
cljs.core.take_last = (function take_last(n,coll){
var s__3880 = cljs.core.seq.call(null,coll);
var lead__3881 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));

while(true){
if(cljs.core.truth_(lead__3881))
{{
var G__3882 = cljs.core.next.call(null,s__3880);
var G__3883 = cljs.core.next.call(null,lead__3881);
s__3880 = G__3882;
lead__3881 = G__3883;
continue;
}
} else
{return s__3880;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__3886 = (function (pred,coll){
while(true){
var s__3884 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3885 = s__3884;

if(cljs.core.truth_(and__3546__auto____3885))
{return pred.call(null,cljs.core.first.call(null,s__3884));
} else
{return and__3546__auto____3885;
}
})()))
{{
var G__3887 = pred;
var G__3888 = cljs.core.rest.call(null,s__3884);
pred = G__3887;
coll = G__3888;
continue;
}
} else
{return s__3884;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3886.call(null,pred,coll);
})));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3889 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3889))
{var s__3890 = temp__3698__auto____3889;

return cljs.core.concat.call(null,s__3890,cycle.call(null,s__3890));
} else
{return null;
}
})));
});
/**
* Returns a vector of [(take n coll) (drop n coll)]
*/
cljs.core.split_at = (function split_at(n,coll){
return cljs.core.Vector.fromArray([cljs.core.take.call(null,n,coll),cljs.core.drop.call(null,n,coll)]);
});
/**
* Returns a lazy (infinite!, or length n if supplied) sequence of xs.
*/
cljs.core.repeat = (function() {
var repeat = null;
var repeat__3891 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
})));
});
var repeat__3892 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case  1 :
return repeat__3891.call(this,n);
case  2 :
return repeat__3892.call(this,n,x);
}
throw('Invalid arity: ' + arguments.length);
};
return repeat;
})()
;
/**
* Returns a lazy seq of n xs.
*/
cljs.core.replicate = (function replicate(n,x){
return cljs.core.take.call(null,n,cljs.core.repeat.call(null,x));
});
/**
* Takes a function of no args, presumably with side effects, and
* returns an infinite (or length n if supplied) lazy sequence of calls
* to it
*/
cljs.core.repeatedly = (function() {
var repeatedly = null;
var repeatedly__3894 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
})));
});
var repeatedly__3895 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case  1 :
return repeatedly__3894.call(this,n);
case  2 :
return repeatedly__3895.call(this,n,f);
}
throw('Invalid arity: ' + arguments.length);
};
return repeatedly;
})()
;
/**
* Returns a lazy sequence of x, (f x), (f (f x)) etc. f must be free of side-effects
*/
cljs.core.iterate = (function iterate(f,x){
return cljs.core.cons.call(null,x,(new cljs.core.LazySeq(null,false,(function (){
return iterate.call(null,f,f.call(null,x));
}))));
});
/**
* Returns a lazy seq of the first item in each coll, then the second etc.
* @param {...*} var_args
*/
cljs.core.interleave = (function() {
var interleave = null;
var interleave__3901 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3897 = cljs.core.seq.call(null,c1);
var s2__3898 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3899 = s1__3897;

if(cljs.core.truth_(and__3546__auto____3899))
{return s2__3898;
} else
{return and__3546__auto____3899;
}
})()))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__3897),cljs.core.cons.call(null,cljs.core.first.call(null,s2__3898),interleave.call(null,cljs.core.rest.call(null,s1__3897),cljs.core.rest.call(null,s2__3898))));
} else
{return null;
}
})));
});
var interleave__3902 = (function() { 
var G__3904__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3900 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3900)))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__3900),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__3900)));
} else
{return null;
}
})));
};
var G__3904 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3904__delegate.call(this, c1, c2, colls);
};
G__3904.cljs$lang$maxFixedArity = 2;
G__3904.cljs$lang$applyTo = (function (arglist__3905){
var c1 = cljs.core.first(arglist__3905);
var c2 = cljs.core.first(cljs.core.next(arglist__3905));
var colls = cljs.core.rest(cljs.core.next(arglist__3905));
return G__3904__delegate.call(this, c1, c2, colls);
});
return G__3904;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return interleave__3901.call(this,c1,c2);
default:
return interleave__3902.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3902.cljs$lang$applyTo;
return interleave;
})()
;
/**
* Returns a lazy seq of the elements of coll separated by sep
*/
cljs.core.interpose = (function interpose(sep,coll){
return cljs.core.drop.call(null,1,cljs.core.interleave.call(null,cljs.core.repeat.call(null,sep),coll));
});
/**
* Take a collection of collections, and return a lazy seq
* of items from the inner collection
*/
cljs.core.flatten1 = (function flatten1(colls){
var cat__3908 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____3906 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3906))
{var coll__3907 = temp__3695__auto____3906;

return cljs.core.cons.call(null,cljs.core.first.call(null,coll__3907),cat.call(null,cljs.core.rest.call(null,coll__3907),colls));
} else
{if(cljs.core.truth_(cljs.core.seq.call(null,colls)))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
})));
});

return cat__3908.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__3909 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3910 = (function() { 
var G__3912__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__3912 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3912__delegate.call(this, f, coll, colls);
};
G__3912.cljs$lang$maxFixedArity = 2;
G__3912.cljs$lang$applyTo = (function (arglist__3913){
var f = cljs.core.first(arglist__3913);
var coll = cljs.core.first(cljs.core.next(arglist__3913));
var colls = cljs.core.rest(cljs.core.next(arglist__3913));
return G__3912__delegate.call(this, f, coll, colls);
});
return G__3912;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return mapcat__3909.call(this,f,coll);
default:
return mapcat__3910.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3910.cljs$lang$applyTo;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3914 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3914))
{var s__3915 = temp__3698__auto____3914;

var f__3916 = cljs.core.first.call(null,s__3915);
var r__3917 = cljs.core.rest.call(null,s__3915);

if(cljs.core.truth_(pred.call(null,f__3916)))
{return cljs.core.cons.call(null,f__3916,filter.call(null,pred,r__3917));
} else
{return filter.call(null,pred,r__3917);
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns false. pred must be free of side-effects.
*/
cljs.core.remove = (function remove(pred,coll){
return cljs.core.filter.call(null,cljs.core.complement.call(null,pred),coll);
});
/**
* Returns a lazy sequence of the nodes in a tree, via a depth-first walk.
* branch? must be a fn of one arg that returns true if passed a node
* that can have children (but may not).  children must be a fn of one
* arg that returns a sequence of the children. Will only be called on
* nodes for which branch? returns true. Root is the root node of the
* tree.
*/
cljs.core.tree_seq = (function tree_seq(branch_QMARK_,children,root){
var walk__3919 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
})));
});

return walk__3919.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__3918_SHARP_){
return cljs.core.not.call(null,cljs.core.sequential_QMARK_.call(null,p1__3918_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
return cljs.core.reduce.call(null,cljs.core._conj,to,from);
});
/**
* Returns a lazy sequence of lists of n items each, at offsets step
* apart. If step is not supplied, defaults to n, i.e. the partitions
* do not overlap. If a pad collection is supplied, use its elements as
* necessary to complete last partition upto n items. In case there are
* not enough padding elements, return a partition with less than n items.
*/
cljs.core.partition = (function() {
var partition = null;
var partition__3926 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3927 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3920 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3920))
{var s__3921 = temp__3698__auto____3920;

var p__3922 = cljs.core.take.call(null,n,s__3921);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3922))))
{return cljs.core.cons.call(null,p__3922,partition.call(null,n,step,cljs.core.drop.call(null,step,s__3921)));
} else
{return null;
}
} else
{return null;
}
})));
});
var partition__3928 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3923 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3923))
{var s__3924 = temp__3698__auto____3923;

var p__3925 = cljs.core.take.call(null,n,s__3924);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3925))))
{return cljs.core.cons.call(null,p__3925,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__3924)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__3925,pad)));
}
} else
{return null;
}
})));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case  2 :
return partition__3926.call(this,n,step);
case  3 :
return partition__3927.call(this,n,step,pad);
case  4 :
return partition__3928.call(this,n,step,pad,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return partition;
})()
;
/**
* Returns the value in a nested associative structure,
* where ks is a sequence of ke(ys. Returns nil if the key is not present,
* or the not-found value if supplied.
*/
cljs.core.get_in = (function() {
var get_in = null;
var get_in__3934 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3935 = (function (m,ks,not_found){
var sentinel__3930 = cljs.core.lookup_sentinel;
var m__3931 = m;
var ks__3932 = cljs.core.seq.call(null,ks);

while(true){
if(cljs.core.truth_(ks__3932))
{var m__3933 = cljs.core.get.call(null,m__3931,cljs.core.first.call(null,ks__3932),sentinel__3930);

if(cljs.core.truth_((sentinel__3930 === m__3933)))
{return not_found;
} else
{{
var G__3937 = sentinel__3930;
var G__3938 = m__3933;
var G__3939 = cljs.core.next.call(null,ks__3932);
sentinel__3930 = G__3937;
m__3931 = G__3938;
ks__3932 = G__3939;
continue;
}
}
} else
{return m__3931;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case  2 :
return get_in__3934.call(this,m,ks);
case  3 :
return get_in__3935.call(this,m,ks,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return get_in;
})()
;
/**
* Associates a value in a nested associative structure, where ks is a
* sequence of keys and v is the new value and returns a new nested structure.
* If any levels do not exist, hash-maps will be created.
*/
cljs.core.assoc_in = (function assoc_in(m,p__3940,v){
var vec__3941__3942 = p__3940;
var k__3943 = cljs.core.nth.call(null,vec__3941__3942,0,null);
var ks__3944 = cljs.core.nthnext.call(null,vec__3941__3942,1);

if(cljs.core.truth_(ks__3944))
{return cljs.core.assoc.call(null,m,k__3943,assoc_in.call(null,cljs.core.get.call(null,m,k__3943),ks__3944,v));
} else
{return cljs.core.assoc.call(null,m,k__3943,v);
}
});
/**
* 'Updates' a value in a nested associative structure, where ks is a
* sequence of keys and f is a function that will take the old value
* and any supplied args and return the new value, and returns a new
* nested structure.  If any levels do not exist, hash-maps will be
* created.
* @param {...*} var_args
*/
cljs.core.update_in = (function() { 
var update_in__delegate = function (m,p__3945,f,args){
var vec__3946__3947 = p__3945;
var k__3948 = cljs.core.nth.call(null,vec__3946__3947,0,null);
var ks__3949 = cljs.core.nthnext.call(null,vec__3946__3947,1);

if(cljs.core.truth_(ks__3949))
{return cljs.core.assoc.call(null,m,k__3948,cljs.core.apply.call(null,update_in,cljs.core.get.call(null,m,k__3948),ks__3949,f,args));
} else
{return cljs.core.assoc.call(null,m,k__3948,cljs.core.apply.call(null,f,cljs.core.get.call(null,m,k__3948),args));
}
};
var update_in = function (m,p__3945,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__3945, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__3950){
var m = cljs.core.first(arglist__3950);
var p__3945 = cljs.core.first(cljs.core.next(arglist__3950));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3950)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3950)));
return update_in__delegate.call(this, m, p__3945, f, args);
});
return update_in;
})()
;

/**
* @constructor
*/
cljs.core.Vector = (function (meta,array){
this.meta = meta;
this.array = array;
})
cljs.core.Vector.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Vector");
});
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3951 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3978 = null;
var G__3978__3979 = (function (coll,k){
var this__3952 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__3978__3980 = (function (coll,k,not_found){
var this__3953 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__3978 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3978__3979.call(this,coll,k);
case  3 :
return G__3978__3980.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3978;
})()
;
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3954 = this;
var new_array__3955 = cljs.core.aclone.call(null,this__3954.array);

(new_array__3955[k] = v);
return (new cljs.core.Vector(this__3954.meta,new_array__3955));
});
cljs.core.Vector.prototype.cljs$core$IFn$ = true;
cljs.core.Vector.prototype.call = (function() {
var G__3982 = null;
var G__3982__3983 = (function (coll,k){
var this__3956 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k);
});
var G__3982__3984 = (function (coll,k,not_found){
var this__3957 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k,not_found);
});
G__3982 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3982__3983.call(this,coll,k);
case  3 :
return G__3982__3984.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3982;
})()
;
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3958 = this;
var new_array__3959 = cljs.core.aclone.call(null,this__3958.array);

new_array__3959.push(o);
return (new cljs.core.Vector(this__3958.meta,new_array__3959));
});
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3986 = null;
var G__3986__3987 = (function (v,f){
var this__3960 = this;
return cljs.core.ci_reduce.call(null,this__3960.array,f);
});
var G__3986__3988 = (function (v,f,start){
var this__3961 = this;
return cljs.core.ci_reduce.call(null,this__3961.array,f,start);
});
G__3986 = function(v,f,start){
switch(arguments.length){
case  2 :
return G__3986__3987.call(this,v,f);
case  3 :
return G__3986__3988.call(this,v,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3986;
})()
;
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3962 = this;
if(cljs.core.truth_((this__3962.array.length > 0)))
{var vector_seq__3963 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_((i < this__3962.array.length)))
{return cljs.core.cons.call(null,(this__3962.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
})));
});

return vector_seq__3963.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3964 = this;
return this__3964.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3965 = this;
var count__3966 = this__3965.array.length;

if(cljs.core.truth_((count__3966 > 0)))
{return (this__3965.array[(count__3966 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3967 = this;
if(cljs.core.truth_((this__3967.array.length > 0)))
{var new_array__3968 = cljs.core.aclone.call(null,this__3967.array);

new_array__3968.pop();
return (new cljs.core.Vector(this__3967.meta,new_array__3968));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__3969 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3970 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3971 = this;
return (new cljs.core.Vector(meta,this__3971.array));
});
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3972 = this;
return this__3972.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3990 = null;
var G__3990__3991 = (function (coll,n){
var this__3973 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3974 = (0 <= n);

if(cljs.core.truth_(and__3546__auto____3974))
{return (n < this__3973.array.length);
} else
{return and__3546__auto____3974;
}
})()))
{return (this__3973.array[n]);
} else
{return null;
}
});
var G__3990__3992 = (function (coll,n,not_found){
var this__3975 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3976 = (0 <= n);

if(cljs.core.truth_(and__3546__auto____3976))
{return (n < this__3975.array.length);
} else
{return and__3546__auto____3976;
}
})()))
{return (this__3975.array[n]);
} else
{return not_found;
}
});
G__3990 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3990__3991.call(this,coll,n);
case  3 :
return G__3990__3992.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3990;
})()
;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3977 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__3977.meta);
});
cljs.core.Vector;
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,cljs.core.array.call(null)));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs));
});
cljs.core.vec = (function vec(coll){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.Vector.EMPTY,coll);
});
/**
* @param {...*} var_args
*/
cljs.core.vector = (function() { 
var vector__delegate = function (args){
return cljs.core.vec.call(null,args);
};
var vector = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return vector__delegate.call(this, args);
};
vector.cljs$lang$maxFixedArity = 0;
vector.cljs$lang$applyTo = (function (arglist__3994){
var args = cljs.core.seq( arglist__3994 );;
return vector__delegate.call(this, args);
});
return vector;
})()
;

/**
* @constructor
*/
cljs.core.Subvec = (function (meta,v,start,end){
this.meta = meta;
this.v = v;
this.start = start;
this.end = end;
})
cljs.core.Subvec.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Subvec");
});
cljs.core.Subvec.prototype.cljs$core$IHash$ = true;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3995 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$ = true;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = (function() {
var G__4017 = null;
var G__4017__4018 = (function (coll,k){
var this__3996 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__4017__4019 = (function (coll,k,not_found){
var this__3997 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__4017 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4017__4018.call(this,coll,k);
case  3 :
return G__4017__4019.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4017;
})()
;
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = true;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = (function (coll,key,val){
var this__3998 = this;
var v_pos__3999 = (this__3998.start + key);

return (new cljs.core.Subvec(this__3998.meta,cljs.core._assoc.call(null,this__3998.v,v_pos__3999,val),this__3998.start,((this__3998.end > (v_pos__3999 + 1)) ? this__3998.end : (v_pos__3999 + 1))));
});
cljs.core.Subvec.prototype.cljs$core$IFn$ = true;
cljs.core.Subvec.prototype.call = (function() {
var G__4021 = null;
var G__4021__4022 = (function (coll,k){
var this__4000 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k);
});
var G__4021__4023 = (function (coll,k,not_found){
var this__4001 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k,not_found);
});
G__4021 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4021__4022.call(this,coll,k);
case  3 :
return G__4021__4023.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4021;
})()
;
cljs.core.Subvec.prototype.cljs$core$ISequential$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__4002 = this;
return (new cljs.core.Subvec(this__4002.meta,cljs.core._assoc_n.call(null,this__4002.v,this__4002.end,o),this__4002.start,(this__4002.end + 1)));
});
cljs.core.Subvec.prototype.cljs$core$IReduce$ = true;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = (function() {
var G__4025 = null;
var G__4025__4026 = (function (coll,f){
var this__4003 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
var G__4025__4027 = (function (coll,f,start){
var this__4004 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
G__4025 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__4025__4026.call(this,coll,f);
case  3 :
return G__4025__4027.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4025;
})()
;
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = true;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__4005 = this;
var subvec_seq__4006 = (function subvec_seq(i){
if(cljs.core.truth_(cljs.core._EQ_.call(null,i,this__4005.end)))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__4005.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}))));
}
});

return subvec_seq__4006.call(null,this__4005.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$ = true;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = (function (coll){
var this__4007 = this;
return (this__4007.end - this__4007.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$ = true;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = (function (coll){
var this__4008 = this;
return cljs.core._nth.call(null,this__4008.v,(this__4008.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = (function (coll){
var this__4009 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,this__4009.start,this__4009.end)))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__4009.meta,this__4009.v,this__4009.start,(this__4009.end - 1)));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$ = true;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__4010 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = true;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__4011 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__4012 = this;
return (new cljs.core.Subvec(meta,this__4012.v,this__4012.start,this__4012.end));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__4013 = this;
return this__4013.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = true;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = (function() {
var G__4029 = null;
var G__4029__4030 = (function (coll,n){
var this__4014 = this;
return cljs.core._nth.call(null,this__4014.v,(this__4014.start + n));
});
var G__4029__4031 = (function (coll,n,not_found){
var this__4015 = this;
return cljs.core._nth.call(null,this__4015.v,(this__4015.start + n),not_found);
});
G__4029 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__4029__4030.call(this,coll,n);
case  3 :
return G__4029__4031.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4029;
})()
;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__4016 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__4016.meta);
});
cljs.core.Subvec;
/**
* Returns a persistent vector of the items in vector from
* start (inclusive) to end (exclusive).  If end is not supplied,
* defaults to (count vector). This operation is O(1) and very fast, as
* the resulting vector shares structure with the original and no
* trimming is done.
*/
cljs.core.subvec = (function() {
var subvec = null;
var subvec__4033 = (function (v,start){
return subvec.call(null,v,start,cljs.core.count.call(null,v));
});
var subvec__4034 = (function (v,start,end){
return (new cljs.core.Subvec(null,v,start,end));
});
subvec = function(v,start,end){
switch(arguments.length){
case  2 :
return subvec__4033.call(this,v,start);
case  3 :
return subvec__4034.call(this,v,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
return subvec;
})()
;

/**
* @constructor
*/
cljs.core.PersistentQueueSeq = (function (meta,front,rear){
this.meta = meta;
this.front = front;
this.rear = rear;
})
cljs.core.PersistentQueueSeq.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.PersistentQueueSeq");
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__4036 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__4037 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__4038 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__4039 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__4039.meta);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__4040 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__4041 = this;
return cljs.core._first.call(null,this__4041.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__4042 = this;
var temp__3695__auto____4043 = cljs.core.next.call(null,this__4042.front);

if(cljs.core.truth_(temp__3695__auto____4043))
{var f1__4044 = temp__3695__auto____4043;

return (new cljs.core.PersistentQueueSeq(this__4042.meta,f1__4044,this__4042.rear));
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__4042.rear)))
{return cljs.core._empty.call(null,coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__4042.meta,this__4042.rear,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__4045 = this;
return this__4045.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__4046 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__4046.front,this__4046.rear));
});
cljs.core.PersistentQueueSeq;

/**
* @constructor
*/
cljs.core.PersistentQueue = (function (meta,count,front,rear){
this.meta = meta;
this.count = count;
this.front = front;
this.rear = rear;
})
cljs.core.PersistentQueue.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.PersistentQueue");
});
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = (function (coll){
var this__4047 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__4048 = this;
if(cljs.core.truth_(this__4048.front))
{return (new cljs.core.PersistentQueue(this__4048.meta,(this__4048.count + 1),this__4048.front,cljs.core.conj.call(null,(function (){var or__3548__auto____4049 = this__4048.rear;

if(cljs.core.truth_(or__3548__auto____4049))
{return or__3548__auto____4049;
} else
{return cljs.core.Vector.fromArray([]);
}
})(),o)));
} else
{return (new cljs.core.PersistentQueue(this__4048.meta,(this__4048.count + 1),cljs.core.conj.call(null,this__4048.front,o),cljs.core.Vector.fromArray([])));
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__4050 = this;
var rear__4051 = cljs.core.seq.call(null,this__4050.rear);

if(cljs.core.truth_((function (){var or__3548__auto____4052 = this__4050.front;

if(cljs.core.truth_(or__3548__auto____4052))
{return or__3548__auto____4052;
} else
{return rear__4051;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__4050.front,cljs.core.seq.call(null,rear__4051)));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = (function (coll){
var this__4053 = this;
return this__4053.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = (function (coll){
var this__4054 = this;
return cljs.core._first.call(null,this__4054.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = (function (coll){
var this__4055 = this;
if(cljs.core.truth_(this__4055.front))
{var temp__3695__auto____4056 = cljs.core.next.call(null,this__4055.front);

if(cljs.core.truth_(temp__3695__auto____4056))
{var f1__4057 = temp__3695__auto____4056;

return (new cljs.core.PersistentQueue(this__4055.meta,(this__4055.count - 1),f1__4057,this__4055.rear));
} else
{return (new cljs.core.PersistentQueue(this__4055.meta,(this__4055.count - 1),cljs.core.seq.call(null,this__4055.rear),cljs.core.Vector.fromArray([])));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = (function (coll){
var this__4058 = this;
return cljs.core.first.call(null,this__4058.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__4059 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__4060 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__4061 = this;
return (new cljs.core.PersistentQueue(meta,this__4061.count,this__4061.front,this__4061.rear));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__4062 = this;
return this__4062.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__4063 = this;
return cljs.core.PersistentQueue.EMPTY;
});
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = (new cljs.core.PersistentQueue(null,0,null,cljs.core.Vector.fromArray([])));

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
})
cljs.core.NeverEquiv.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.NeverEquiv");
});
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__4064 = this;
return false;
});
cljs.core.NeverEquiv;
cljs.core.never_equiv = (new cljs.core.NeverEquiv());
/**
* Assumes y is a map. Returns true if x equals y, otherwise returns
* false.
*/
cljs.core.equiv_map = (function equiv_map(x,y){
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.map_QMARK_.call(null,y))?(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,x),cljs.core.count.call(null,y)))?cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,(function (xkv){
return cljs.core._EQ_.call(null,cljs.core.get.call(null,y,cljs.core.first.call(null,xkv),cljs.core.never_equiv),cljs.core.second.call(null,xkv));
}),x)):null):null));
});
cljs.core.scan_array = (function scan_array(incr,k,array){
var len__4065 = array.length;

var i__4066 = 0;

while(true){
if(cljs.core.truth_((i__4066 < len__4065)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,k,(array[i__4066]))))
{return i__4066;
} else
{{
var G__4067 = (i__4066 + incr);
i__4066 = G__4067;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.obj_map_contains_key_QMARK_ = (function() {
var obj_map_contains_key_QMARK_ = null;
var obj_map_contains_key_QMARK___4069 = (function (k,strobj){
return obj_map_contains_key_QMARK_.call(null,k,strobj,true,false);
});
var obj_map_contains_key_QMARK___4070 = (function (k,strobj,true_val,false_val){
if(cljs.core.truth_((function (){var and__3546__auto____4068 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____4068))
{return strobj.hasOwnProperty(k);
} else
{return and__3546__auto____4068;
}
})()))
{return true_val;
} else
{return false_val;
}
});
obj_map_contains_key_QMARK_ = function(k,strobj,true_val,false_val){
switch(arguments.length){
case  2 :
return obj_map_contains_key_QMARK___4069.call(this,k,strobj);
case  4 :
return obj_map_contains_key_QMARK___4070.call(this,k,strobj,true_val,false_val);
}
throw('Invalid arity: ' + arguments.length);
};
return obj_map_contains_key_QMARK_;
})()
;

/**
* @constructor
*/
cljs.core.ObjMap = (function (meta,keys,strobj){
this.meta = meta;
this.keys = keys;
this.strobj = strobj;
})
cljs.core.ObjMap.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.ObjMap");
});
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__4073 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__4094 = null;
var G__4094__4095 = (function (coll,k){
var this__4074 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__4094__4096 = (function (coll,k,not_found){
var this__4075 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__4075.strobj,(this__4075.strobj[k]),not_found);
});
G__4094 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4094__4095.call(this,coll,k);
case  3 :
return G__4094__4096.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4094;
})()
;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__4076 = this;
if(cljs.core.truth_(goog.isString.call(null,k)))
{var new_strobj__4077 = goog.object.clone.call(null,this__4076.strobj);
var overwrite_QMARK___4078 = new_strobj__4077.hasOwnProperty(k);

(new_strobj__4077[k] = v);
if(cljs.core.truth_(overwrite_QMARK___4078))
{return (new cljs.core.ObjMap(this__4076.meta,this__4076.keys,new_strobj__4077));
} else
{var new_keys__4079 = cljs.core.aclone.call(null,this__4076.keys);

new_keys__4079.push(k);
return (new cljs.core.ObjMap(this__4076.meta,new_keys__4079,new_strobj__4077));
}
} else
{return cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null,k,v),cljs.core.seq.call(null,coll)),this__4076.meta);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__4080 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__4080.strobj);
});
cljs.core.ObjMap.prototype.cljs$core$IFn$ = true;
cljs.core.ObjMap.prototype.call = (function() {
var G__4098 = null;
var G__4098__4099 = (function (coll,k){
var this__4081 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k);
});
var G__4098__4100 = (function (coll,k,not_found){
var this__4082 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k,not_found);
});
G__4098 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4098__4099.call(this,coll,k);
case  3 :
return G__4098__4100.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4098;
})()
;
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__4083 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__4084 = this;
if(cljs.core.truth_((this__4084.keys.length > 0)))
{return cljs.core.map.call(null,(function (p1__4072_SHARP_){
return cljs.core.vector.call(null,p1__4072_SHARP_,(this__4084.strobj[p1__4072_SHARP_]));
}),this__4084.keys);
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__4085 = this;
return this__4085.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__4086 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__4087 = this;
return (new cljs.core.ObjMap(meta,this__4087.keys,this__4087.strobj));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__4088 = this;
return this__4088.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__4089 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__4089.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__4090 = this;
if(cljs.core.truth_((function (){var and__3546__auto____4091 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____4091))
{return this__4090.strobj.hasOwnProperty(k);
} else
{return and__3546__auto____4091;
}
})()))
{var new_keys__4092 = cljs.core.aclone.call(null,this__4090.keys);
var new_strobj__4093 = goog.object.clone.call(null,this__4090.strobj);

new_keys__4092.splice(cljs.core.scan_array.call(null,1,k,new_keys__4092),1);
cljs.core.js_delete.call(null,new_strobj__4093,k);
return (new cljs.core.ObjMap(this__4090.meta,new_keys__4092,new_strobj__4093));
} else
{return coll;
}
});
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,cljs.core.array.call(null),cljs.core.js_obj.call(null)));
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj));
});

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
})
cljs.core.HashMap.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.HashMap");
});
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__4103 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__4135 = null;
var G__4135__4136 = (function (coll,k){
var this__4104 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__4135__4137 = (function (coll,k,not_found){
var this__4105 = this;
var bucket__4106 = (this__4105.hashobj[cljs.core.hash.call(null,k)]);
var i__4107 = (cljs.core.truth_(bucket__4106)?cljs.core.scan_array.call(null,2,k,bucket__4106):null);

if(cljs.core.truth_(i__4107))
{return (bucket__4106[(i__4107 + 1)]);
} else
{return not_found;
}
});
G__4135 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4135__4136.call(this,coll,k);
case  3 :
return G__4135__4137.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4135;
})()
;
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__4108 = this;
var h__4109 = cljs.core.hash.call(null,k);
var bucket__4110 = (this__4108.hashobj[h__4109]);

if(cljs.core.truth_(bucket__4110))
{var new_bucket__4111 = cljs.core.aclone.call(null,bucket__4110);
var new_hashobj__4112 = goog.object.clone.call(null,this__4108.hashobj);

(new_hashobj__4112[h__4109] = new_bucket__4111);
var temp__3695__auto____4113 = cljs.core.scan_array.call(null,2,k,new_bucket__4111);

if(cljs.core.truth_(temp__3695__auto____4113))
{var i__4114 = temp__3695__auto____4113;

(new_bucket__4111[(i__4114 + 1)] = v);
return (new cljs.core.HashMap(this__4108.meta,this__4108.count,new_hashobj__4112));
} else
{new_bucket__4111.push(k,v);
return (new cljs.core.HashMap(this__4108.meta,(this__4108.count + 1),new_hashobj__4112));
}
} else
{var new_hashobj__4115 = goog.object.clone.call(null,this__4108.hashobj);

(new_hashobj__4115[h__4109] = cljs.core.array.call(null,k,v));
return (new cljs.core.HashMap(this__4108.meta,(this__4108.count + 1),new_hashobj__4115));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__4116 = this;
var bucket__4117 = (this__4116.hashobj[cljs.core.hash.call(null,k)]);
var i__4118 = (cljs.core.truth_(bucket__4117)?cljs.core.scan_array.call(null,2,k,bucket__4117):null);

if(cljs.core.truth_(i__4118))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.cljs$core$IFn$ = true;
cljs.core.HashMap.prototype.call = (function() {
var G__4139 = null;
var G__4139__4140 = (function (coll,k){
var this__4119 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k);
});
var G__4139__4141 = (function (coll,k,not_found){
var this__4120 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k,not_found);
});
G__4139 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4139__4140.call(this,coll,k);
case  3 :
return G__4139__4141.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4139;
})()
;
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__4121 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__4122 = this;
if(cljs.core.truth_((this__4122.count > 0)))
{var hashes__4123 = cljs.core.js_keys.call(null,this__4122.hashobj).sort();

return cljs.core.mapcat.call(null,(function (p1__4102_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__4122.hashobj[p1__4102_SHARP_])));
}),hashes__4123);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__4124 = this;
return this__4124.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__4125 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__4126 = this;
return (new cljs.core.HashMap(meta,this__4126.count,this__4126.hashobj));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__4127 = this;
return this__4127.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__4128 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__4128.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__4129 = this;
var h__4130 = cljs.core.hash.call(null,k);
var bucket__4131 = (this__4129.hashobj[h__4130]);
var i__4132 = (cljs.core.truth_(bucket__4131)?cljs.core.scan_array.call(null,2,k,bucket__4131):null);

if(cljs.core.truth_(cljs.core.not.call(null,i__4132)))
{return coll;
} else
{var new_hashobj__4133 = goog.object.clone.call(null,this__4129.hashobj);

if(cljs.core.truth_((3 > bucket__4131.length)))
{cljs.core.js_delete.call(null,new_hashobj__4133,h__4130);
} else
{var new_bucket__4134 = cljs.core.aclone.call(null,bucket__4131);

new_bucket__4134.splice(i__4132,2);
(new_hashobj__4133[h__4130] = new_bucket__4134);
}
return (new cljs.core.HashMap(this__4129.meta,(this__4129.count - 1),new_hashobj__4133));
}
});
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,cljs.core.js_obj.call(null)));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__4143 = ks.length;

var i__4144 = 0;
var out__4145 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_((i__4144 < len__4143)))
{{
var G__4146 = (i__4144 + 1);
var G__4147 = cljs.core.assoc.call(null,out__4145,(ks[i__4144]),(vs[i__4144]));
i__4144 = G__4146;
out__4145 = G__4147;
continue;
}
} else
{return out__4145;
}
break;
}
});
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in$__4148 = cljs.core.seq.call(null,keyvals);
var out__4149 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_(in$__4148))
{{
var G__4150 = cljs.core.nnext.call(null,in$__4148);
var G__4151 = cljs.core.assoc.call(null,out__4149,cljs.core.first.call(null,in$__4148),cljs.core.second.call(null,in$__4148));
in$__4148 = G__4150;
out__4149 = G__4151;
continue;
}
} else
{return out__4149;
}
break;
}
};
var hash_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return hash_map__delegate.call(this, keyvals);
};
hash_map.cljs$lang$maxFixedArity = 0;
hash_map.cljs$lang$applyTo = (function (arglist__4152){
var keyvals = cljs.core.seq( arglist__4152 );;
return hash_map__delegate.call(this, keyvals);
});
return hash_map;
})()
;
/**
* Returns a sequence of the map's keys.
*/
cljs.core.keys = (function keys(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,hash_map));
});
/**
* Returns a sequence of the map's values.
*/
cljs.core.vals = (function vals(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.second,hash_map));
});
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping from
* the latter (left-to-right) will be the mapping in the result.
* @param {...*} var_args
*/
cljs.core.merge = (function() { 
var merge__delegate = function (maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{return cljs.core.reduce.call(null,(function (p1__4153_SHARP_,p2__4154_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3548__auto____4155 = p1__4153_SHARP_;

if(cljs.core.truth_(or__3548__auto____4155))
{return or__3548__auto____4155;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),p2__4154_SHARP_);
}),maps);
} else
{return null;
}
};
var merge = function (var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return merge__delegate.call(this, maps);
};
merge.cljs$lang$maxFixedArity = 0;
merge.cljs$lang$applyTo = (function (arglist__4156){
var maps = cljs.core.seq( arglist__4156 );;
return merge__delegate.call(this, maps);
});
return merge;
})()
;
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping(s)
* from the latter (left-to-right) will be combined with the mapping in
* the result by calling (f val-in-result val-in-latter).
* @param {...*} var_args
*/
cljs.core.merge_with = (function() { 
var merge_with__delegate = function (f,maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{var merge_entry__4159 = (function (m,e){
var k__4157 = cljs.core.first.call(null,e);
var v__4158 = cljs.core.second.call(null,e);

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,m,k__4157)))
{return cljs.core.assoc.call(null,m,k__4157,f.call(null,cljs.core.get.call(null,m,k__4157),v__4158));
} else
{return cljs.core.assoc.call(null,m,k__4157,v__4158);
}
});
var merge2__4161 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__4159,(function (){var or__3548__auto____4160 = m1;

if(cljs.core.truth_(or__3548__auto____4160))
{return or__3548__auto____4160;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),cljs.core.seq.call(null,m2));
});

return cljs.core.reduce.call(null,merge2__4161,maps);
} else
{return null;
}
};
var merge_with = function (f,var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return merge_with__delegate.call(this, f, maps);
};
merge_with.cljs$lang$maxFixedArity = 1;
merge_with.cljs$lang$applyTo = (function (arglist__4162){
var f = cljs.core.first(arglist__4162);
var maps = cljs.core.rest(arglist__4162);
return merge_with__delegate.call(this, f, maps);
});
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__4164 = cljs.core.ObjMap.fromObject([],{});
var keys__4165 = cljs.core.seq.call(null,keyseq);

while(true){
if(cljs.core.truth_(keys__4165))
{var key__4166 = cljs.core.first.call(null,keys__4165);
var entry__4167 = cljs.core.get.call(null,map,key__4166,"﷐'user/not-found");

{
var G__4168 = (cljs.core.truth_(cljs.core.not_EQ_.call(null,entry__4167,"﷐'user/not-found"))?cljs.core.assoc.call(null,ret__4164,key__4166,entry__4167):ret__4164);
var G__4169 = cljs.core.next.call(null,keys__4165);
ret__4164 = G__4168;
keys__4165 = G__4169;
continue;
}
} else
{return ret__4164;
}
break;
}
});

/**
* @constructor
*/
cljs.core.Set = (function (meta,hash_map){
this.meta = meta;
this.hash_map = hash_map;
})
cljs.core.Set.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Set");
});
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = (function (coll){
var this__4170 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = (function() {
var G__4185 = null;
var G__4185__4186 = (function (coll,v){
var this__4171 = this;
return cljs.core._lookup.call(null,coll,v,null);
});
var G__4185__4187 = (function (coll,v,not_found){
var this__4172 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__4172.hash_map,v)))
{return v;
} else
{return not_found;
}
});
G__4185 = function(coll,v,not_found){
switch(arguments.length){
case  2 :
return G__4185__4186.call(this,coll,v);
case  3 :
return G__4185__4187.call(this,coll,v,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4185;
})()
;
cljs.core.Set.prototype.cljs$core$IFn$ = true;
cljs.core.Set.prototype.call = (function() {
var G__4189 = null;
var G__4189__4190 = (function (coll,k){
var this__4173 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k);
});
var G__4189__4191 = (function (coll,k,not_found){
var this__4174 = this;
coll = this;
return cljs.core._lookup.call(null,coll,k,not_found);
});
G__4189 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__4189__4190.call(this,coll,k);
case  3 :
return G__4189__4191.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4189;
})()
;
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__4175 = this;
return (new cljs.core.Set(this__4175.meta,cljs.core.assoc.call(null,this__4175.hash_map,o,null)));
});
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__4176 = this;
return cljs.core.keys.call(null,this__4176.hash_map);
});
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = (function (coll,v){
var this__4177 = this;
return (new cljs.core.Set(this__4177.meta,cljs.core.dissoc.call(null,this__4177.hash_map,v)));
});
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = (function (coll){
var this__4178 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__4179 = this;
var and__3546__auto____4180 = cljs.core.set_QMARK_.call(null,other);

if(cljs.core.truth_(and__3546__auto____4180))
{var and__3546__auto____4181 = cljs.core._EQ_.call(null,cljs.core.count.call(null,coll),cljs.core.count.call(null,other));

if(cljs.core.truth_(and__3546__auto____4181))
{return cljs.core.every_QMARK_.call(null,(function (p1__4163_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__4163_SHARP_);
}),other);
} else
{return and__3546__auto____4181;
}
} else
{return and__3546__auto____4180;
}
});
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__4182 = this;
return (new cljs.core.Set(meta,this__4182.hash_map));
});
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__4183 = this;
return this__4183.meta;
});
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__4184 = this;
return cljs.core.with_meta.call(null,cljs.core.Set.EMPTY,this__4184.meta);
});
cljs.core.Set;
cljs.core.Set.EMPTY = (new cljs.core.Set(null,cljs.core.hash_map.call(null)));
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
var in$__4194 = cljs.core.seq.call(null,coll);
var out__4195 = cljs.core.Set.EMPTY;

while(true){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core.empty_QMARK_.call(null,in$__4194))))
{{
var G__4196 = cljs.core.rest.call(null,in$__4194);
var G__4197 = cljs.core.conj.call(null,out__4195,cljs.core.first.call(null,in$__4194));
in$__4194 = G__4196;
out__4195 = G__4197;
continue;
}
} else
{return out__4195;
}
break;
}
});
/**
* Given a map of replacement pairs and a vector/collection, returns a
* vector/seq with any elements = a key in smap replaced with the
* corresponding val in smap
*/
cljs.core.replace = (function replace(smap,coll){
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,coll)))
{var n__4198 = cljs.core.count.call(null,coll);

return cljs.core.reduce.call(null,(function (v,i){
var temp__3695__auto____4199 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));

if(cljs.core.truth_(temp__3695__auto____4199))
{var e__4200 = temp__3695__auto____4199;

return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__4200));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__4198,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__4193_SHARP_){
var temp__3695__auto____4201 = cljs.core.find.call(null,smap,p1__4193_SHARP_);

if(cljs.core.truth_(temp__3695__auto____4201))
{var e__4202 = temp__3695__auto____4201;

return cljs.core.second.call(null,e__4202);
} else
{return p1__4193_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__4210 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__4203,seen){
while(true){
var vec__4204__4205 = p__4203;
var f__4206 = cljs.core.nth.call(null,vec__4204__4205,0,null);
var xs__4207 = vec__4204__4205;

var temp__3698__auto____4208 = cljs.core.seq.call(null,xs__4207);

if(cljs.core.truth_(temp__3698__auto____4208))
{var s__4209 = temp__3698__auto____4208;

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,seen,f__4206)))
{{
var G__4211 = cljs.core.rest.call(null,s__4209);
var G__4212 = seen;
p__4203 = G__4211;
seen = G__4212;
continue;
}
} else
{return cljs.core.cons.call(null,f__4206,step.call(null,cljs.core.rest.call(null,s__4209),cljs.core.conj.call(null,seen,f__4206)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
})));
});

return step__4210.call(null,coll,cljs.core.set([]));
});
cljs.core.butlast = (function butlast(s){
var ret__4213 = cljs.core.Vector.fromArray([]);
var s__4214 = s;

while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s__4214)))
{{
var G__4215 = cljs.core.conj.call(null,ret__4213,cljs.core.first.call(null,s__4214));
var G__4216 = cljs.core.next.call(null,s__4214);
ret__4213 = G__4215;
s__4214 = G__4216;
continue;
}
} else
{return cljs.core.seq.call(null,ret__4213);
}
break;
}
});
/**
* Returns the name String of a string, symbol or keyword.
*/
cljs.core.name = (function name(x){
if(cljs.core.truth_(cljs.core.string_QMARK_.call(null,x)))
{return x;
} else
{if(cljs.core.truth_((function (){var or__3548__auto____4217 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____4217))
{return or__3548__auto____4217;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__4218 = x.lastIndexOf("/");

if(cljs.core.truth_((i__4218 < 0)))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__4218 + 1));
}
} else
{if(cljs.core.truth_("﷐'else"))
{throw (new Error(cljs.core.str.call(null,"Doesn't support name: ",x)));
} else
{return null;
}
}
}
});
/**
* Returns the namespace String of a symbol or keyword, or nil if not present.
*/
cljs.core.namespace = (function namespace(x){
if(cljs.core.truth_((function (){var or__3548__auto____4219 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____4219))
{return or__3548__auto____4219;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__4220 = x.lastIndexOf("/");

if(cljs.core.truth_((i__4220 > -1)))
{return cljs.core.subs.call(null,x,2,i__4220);
} else
{return null;
}
} else
{throw (new Error(cljs.core.str.call(null,"Doesn't support namespace: ",x)));
}
});
/**
* Returns a map with the keys mapped to the corresponding vals.
*/
cljs.core.zipmap = (function zipmap(keys,vals){
var map__4223 = cljs.core.ObjMap.fromObject([],{});
var ks__4224 = cljs.core.seq.call(null,keys);
var vs__4225 = cljs.core.seq.call(null,vals);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____4226 = ks__4224;

if(cljs.core.truth_(and__3546__auto____4226))
{return vs__4225;
} else
{return and__3546__auto____4226;
}
})()))
{{
var G__4227 = cljs.core.assoc.call(null,map__4223,cljs.core.first.call(null,ks__4224),cljs.core.first.call(null,vs__4225));
var G__4228 = cljs.core.next.call(null,ks__4224);
var G__4229 = cljs.core.next.call(null,vs__4225);
map__4223 = G__4227;
ks__4224 = G__4228;
vs__4225 = G__4229;
continue;
}
} else
{return map__4223;
}
break;
}
});
/**
* Returns the x for which (k x), a number, is greatest.
* @param {...*} var_args
*/
cljs.core.max_key = (function() {
var max_key = null;
var max_key__4232 = (function (k,x){
return x;
});
var max_key__4233 = (function (k,x,y){
if(cljs.core.truth_((k.call(null,x) > k.call(null,y))))
{return x;
} else
{return y;
}
});
var max_key__4234 = (function() { 
var G__4236__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__4221_SHARP_,p2__4222_SHARP_){
return max_key.call(null,k,p1__4221_SHARP_,p2__4222_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__4236 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4236__delegate.call(this, k, x, y, more);
};
G__4236.cljs$lang$maxFixedArity = 3;
G__4236.cljs$lang$applyTo = (function (arglist__4237){
var k = cljs.core.first(arglist__4237);
var x = cljs.core.first(cljs.core.next(arglist__4237));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4237)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4237)));
return G__4236__delegate.call(this, k, x, y, more);
});
return G__4236;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return max_key__4232.call(this,k,x);
case  3 :
return max_key__4233.call(this,k,x,y);
default:
return max_key__4234.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__4234.cljs$lang$applyTo;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__4238 = (function (k,x){
return x;
});
var min_key__4239 = (function (k,x,y){
if(cljs.core.truth_((k.call(null,x) < k.call(null,y))))
{return x;
} else
{return y;
}
});
var min_key__4240 = (function() { 
var G__4242__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__4230_SHARP_,p2__4231_SHARP_){
return min_key.call(null,k,p1__4230_SHARP_,p2__4231_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__4242 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4242__delegate.call(this, k, x, y, more);
};
G__4242.cljs$lang$maxFixedArity = 3;
G__4242.cljs$lang$applyTo = (function (arglist__4243){
var k = cljs.core.first(arglist__4243);
var x = cljs.core.first(cljs.core.next(arglist__4243));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4243)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4243)));
return G__4242__delegate.call(this, k, x, y, more);
});
return G__4242;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return min_key__4238.call(this,k,x);
case  3 :
return min_key__4239.call(this,k,x,y);
default:
return min_key__4240.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__4240.cljs$lang$applyTo;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__4246 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__4247 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4244 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4244))
{var s__4245 = temp__3698__auto____4244;

return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__4245),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__4245)));
} else
{return null;
}
})));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case  2 :
return partition_all__4246.call(this,n,step);
case  3 :
return partition_all__4247.call(this,n,step,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return partition_all;
})()
;
/**
* Returns a lazy sequence of successive items from coll while
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.take_while = (function take_while(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4249 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4249))
{var s__4250 = temp__3698__auto____4249;

if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__4250))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__4250),take_while.call(null,pred,cljs.core.rest.call(null,s__4250)));
} else
{return null;
}
} else
{return null;
}
})));
});

/**
* @constructor
*/
cljs.core.Range = (function (meta,start,end,step){
this.meta = meta;
this.start = start;
this.end = end;
this.step = step;
})
cljs.core.Range.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Range");
});
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = (function (rng){
var this__4251 = this;
return cljs.core.hash_coll.call(null,rng);
});
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = (function (rng,o){
var this__4252 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = (function() {
var G__4268 = null;
var G__4268__4269 = (function (rng,f){
var this__4253 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
var G__4268__4270 = (function (rng,f,s){
var this__4254 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
G__4268 = function(rng,f,s){
switch(arguments.length){
case  2 :
return G__4268__4269.call(this,rng,f);
case  3 :
return G__4268__4270.call(this,rng,f,s);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4268;
})()
;
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = (function (rng){
var this__4255 = this;
var comp__4256 = (cljs.core.truth_((this__4255.step > 0))?cljs.core._LT_:cljs.core._GT_);

if(cljs.core.truth_(comp__4256.call(null,this__4255.start,this__4255.end)))
{return rng;
} else
{return null;
}
});
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = (function (rng){
var this__4257 = this;
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._seq.call(null,rng))))
{return 0;
} else
{return Math['ceil'].call(null,((this__4257.end - this__4257.start) / this__4257.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = (function (rng){
var this__4258 = this;
return this__4258.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest = (function (rng){
var this__4259 = this;
if(cljs.core.truth_(cljs.core._seq.call(null,rng)))
{return (new cljs.core.Range(this__4259.meta,(this__4259.start + this__4259.step),this__4259.end,this__4259.step));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = (function (rng,other){
var this__4260 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = (function (rng,meta){
var this__4261 = this;
return (new cljs.core.Range(meta,this__4261.start,this__4261.end,this__4261.step));
});
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = (function (rng){
var this__4262 = this;
return this__4262.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = (function() {
var G__4272 = null;
var G__4272__4273 = (function (rng,n){
var this__4263 = this;
if(cljs.core.truth_((n < cljs.core._count.call(null,rng))))
{return (this__4263.start + (n * this__4263.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____4264 = (this__4263.start > this__4263.end);

if(cljs.core.truth_(and__3546__auto____4264))
{return cljs.core._EQ_.call(null,this__4263.step,0);
} else
{return and__3546__auto____4264;
}
})()))
{return this__4263.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
var G__4272__4274 = (function (rng,n,not_found){
var this__4265 = this;
if(cljs.core.truth_((n < cljs.core._count.call(null,rng))))
{return (this__4265.start + (n * this__4265.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____4266 = (this__4265.start > this__4265.end);

if(cljs.core.truth_(and__3546__auto____4266))
{return cljs.core._EQ_.call(null,this__4265.step,0);
} else
{return and__3546__auto____4266;
}
})()))
{return this__4265.start;
} else
{return not_found;
}
}
});
G__4272 = function(rng,n,not_found){
switch(arguments.length){
case  2 :
return G__4272__4273.call(this,rng,n);
case  3 :
return G__4272__4274.call(this,rng,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4272;
})()
;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = (function (rng){
var this__4267 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__4267.meta);
});
cljs.core.Range;
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__4276 = (function (){
return range.call(null,0,Number['MAX_VALUE'],1);
});
var range__4277 = (function (end){
return range.call(null,0,end,1);
});
var range__4278 = (function (start,end){
return range.call(null,start,end,1);
});
var range__4279 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step));
});
range = function(start,end,step){
switch(arguments.length){
case  0 :
return range__4276.call(this);
case  1 :
return range__4277.call(this,start);
case  2 :
return range__4278.call(this,start,end);
case  3 :
return range__4279.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
return range;
})()
;
/**
* Returns a lazy seq of every nth item in coll.
*/
cljs.core.take_nth = (function take_nth(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4281 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4281))
{var s__4282 = temp__3698__auto____4281;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__4282),take_nth.call(null,n,cljs.core.drop.call(null,n,s__4282)));
} else
{return null;
}
})));
});
/**
* Returns a vector of [(take-while pred coll) (drop-while pred coll)]
*/
cljs.core.split_with = (function split_with(pred,coll){
return cljs.core.Vector.fromArray([cljs.core.take_while.call(null,pred,coll),cljs.core.drop_while.call(null,pred,coll)]);
});
/**
* Applies f to each value in coll, splitting it each time f returns
* a new value.  Returns a lazy seq of partitions.
*/
cljs.core.partition_by = (function partition_by(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4284 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4284))
{var s__4285 = temp__3698__auto____4284;

var fst__4286 = cljs.core.first.call(null,s__4285);
var fv__4287 = f.call(null,fst__4286);
var run__4288 = cljs.core.cons.call(null,fst__4286,cljs.core.take_while.call(null,(function (p1__4283_SHARP_){
return cljs.core._EQ_.call(null,fv__4287,f.call(null,p1__4283_SHARP_));
}),cljs.core.next.call(null,s__4285)));

return cljs.core.cons.call(null,run__4288,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__4288),s__4285))));
} else
{return null;
}
})));
});
/**
* Returns a map from distinct items in coll to the number of times
* they appear.
*/
cljs.core.frequencies = (function frequencies(coll){
return cljs.core.reduce.call(null,(function (counts,x){
return cljs.core.assoc.call(null,counts,x,(cljs.core.get.call(null,counts,x,0) + 1));
}),cljs.core.ObjMap.fromObject([],{}),coll);
});
/**
* Returns a lazy seq of the intermediate values of the reduction (as
* per reduce) of coll by f, starting with init.
*/
cljs.core.reductions = (function() {
var reductions = null;
var reductions__4303 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____4299 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____4299))
{var s__4300 = temp__3695__auto____4299;

return reductions.call(null,f,cljs.core.first.call(null,s__4300),cljs.core.rest.call(null,s__4300));
} else
{return cljs.core.list.call(null,f.call(null));
}
})));
});
var reductions__4304 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4301 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4301))
{var s__4302 = temp__3698__auto____4301;

return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__4302)),cljs.core.rest.call(null,s__4302));
} else
{return null;
}
}))));
});
reductions = function(f,init,coll){
switch(arguments.length){
case  2 :
return reductions__4303.call(this,f,init);
case  3 :
return reductions__4304.call(this,f,init,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reductions;
})()
;
/**
* Takes a set of functions and returns a fn that is the juxtaposition
* of those fns.  The returned fn takes a variable number of args, and
* returns a vector containing the result of applying each fn to the
* args (left-to-right).
* ((juxt a b c) x) => [(a x) (b x) (c x)]
* @param {...*} var_args
*/
cljs.core.juxt = (function() {
var juxt = null;
var juxt__4307 = (function (f){
return (function() {
var G__4312 = null;
var G__4312__4313 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__4312__4314 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__4312__4315 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__4312__4316 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__4312__4317 = (function() { 
var G__4319__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__4319 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4319__delegate.call(this, x, y, z, args);
};
G__4319.cljs$lang$maxFixedArity = 3;
G__4319.cljs$lang$applyTo = (function (arglist__4320){
var x = cljs.core.first(arglist__4320);
var y = cljs.core.first(cljs.core.next(arglist__4320));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4320)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4320)));
return G__4319__delegate.call(this, x, y, z, args);
});
return G__4319;
})()
;
G__4312 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4312__4313.call(this);
case  1 :
return G__4312__4314.call(this,x);
case  2 :
return G__4312__4315.call(this,x,y);
case  3 :
return G__4312__4316.call(this,x,y,z);
default:
return G__4312__4317.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4312.cljs$lang$maxFixedArity = 3;
G__4312.cljs$lang$applyTo = G__4312__4317.cljs$lang$applyTo;
return G__4312;
})()
});
var juxt__4308 = (function (f,g){
return (function() {
var G__4321 = null;
var G__4321__4322 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__4321__4323 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__4321__4324 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__4321__4325 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__4321__4326 = (function() { 
var G__4328__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__4328 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4328__delegate.call(this, x, y, z, args);
};
G__4328.cljs$lang$maxFixedArity = 3;
G__4328.cljs$lang$applyTo = (function (arglist__4329){
var x = cljs.core.first(arglist__4329);
var y = cljs.core.first(cljs.core.next(arglist__4329));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4329)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4329)));
return G__4328__delegate.call(this, x, y, z, args);
});
return G__4328;
})()
;
G__4321 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4321__4322.call(this);
case  1 :
return G__4321__4323.call(this,x);
case  2 :
return G__4321__4324.call(this,x,y);
case  3 :
return G__4321__4325.call(this,x,y,z);
default:
return G__4321__4326.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4321.cljs$lang$maxFixedArity = 3;
G__4321.cljs$lang$applyTo = G__4321__4326.cljs$lang$applyTo;
return G__4321;
})()
});
var juxt__4309 = (function (f,g,h){
return (function() {
var G__4330 = null;
var G__4330__4331 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__4330__4332 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__4330__4333 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__4330__4334 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__4330__4335 = (function() { 
var G__4337__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__4337 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4337__delegate.call(this, x, y, z, args);
};
G__4337.cljs$lang$maxFixedArity = 3;
G__4337.cljs$lang$applyTo = (function (arglist__4338){
var x = cljs.core.first(arglist__4338);
var y = cljs.core.first(cljs.core.next(arglist__4338));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4338)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4338)));
return G__4337__delegate.call(this, x, y, z, args);
});
return G__4337;
})()
;
G__4330 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4330__4331.call(this);
case  1 :
return G__4330__4332.call(this,x);
case  2 :
return G__4330__4333.call(this,x,y);
case  3 :
return G__4330__4334.call(this,x,y,z);
default:
return G__4330__4335.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4330.cljs$lang$maxFixedArity = 3;
G__4330.cljs$lang$applyTo = G__4330__4335.cljs$lang$applyTo;
return G__4330;
})()
});
var juxt__4310 = (function() { 
var G__4339__delegate = function (f,g,h,fs){
var fs__4306 = cljs.core.list_STAR_.call(null,f,g,h,fs);

return (function() {
var G__4340 = null;
var G__4340__4341 = (function (){
return cljs.core.reduce.call(null,(function (p1__4289_SHARP_,p2__4290_SHARP_){
return cljs.core.conj.call(null,p1__4289_SHARP_,p2__4290_SHARP_.call(null));
}),cljs.core.Vector.fromArray([]),fs__4306);
});
var G__4340__4342 = (function (x){
return cljs.core.reduce.call(null,(function (p1__4291_SHARP_,p2__4292_SHARP_){
return cljs.core.conj.call(null,p1__4291_SHARP_,p2__4292_SHARP_.call(null,x));
}),cljs.core.Vector.fromArray([]),fs__4306);
});
var G__4340__4343 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__4293_SHARP_,p2__4294_SHARP_){
return cljs.core.conj.call(null,p1__4293_SHARP_,p2__4294_SHARP_.call(null,x,y));
}),cljs.core.Vector.fromArray([]),fs__4306);
});
var G__4340__4344 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__4295_SHARP_,p2__4296_SHARP_){
return cljs.core.conj.call(null,p1__4295_SHARP_,p2__4296_SHARP_.call(null,x,y,z));
}),cljs.core.Vector.fromArray([]),fs__4306);
});
var G__4340__4345 = (function() { 
var G__4347__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__4297_SHARP_,p2__4298_SHARP_){
return cljs.core.conj.call(null,p1__4297_SHARP_,cljs.core.apply.call(null,p2__4298_SHARP_,x,y,z,args));
}),cljs.core.Vector.fromArray([]),fs__4306);
};
var G__4347 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4347__delegate.call(this, x, y, z, args);
};
G__4347.cljs$lang$maxFixedArity = 3;
G__4347.cljs$lang$applyTo = (function (arglist__4348){
var x = cljs.core.first(arglist__4348);
var y = cljs.core.first(cljs.core.next(arglist__4348));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4348)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4348)));
return G__4347__delegate.call(this, x, y, z, args);
});
return G__4347;
})()
;
G__4340 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4340__4341.call(this);
case  1 :
return G__4340__4342.call(this,x);
case  2 :
return G__4340__4343.call(this,x,y);
case  3 :
return G__4340__4344.call(this,x,y,z);
default:
return G__4340__4345.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4340.cljs$lang$maxFixedArity = 3;
G__4340.cljs$lang$applyTo = G__4340__4345.cljs$lang$applyTo;
return G__4340;
})()
};
var G__4339 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4339__delegate.call(this, f, g, h, fs);
};
G__4339.cljs$lang$maxFixedArity = 3;
G__4339.cljs$lang$applyTo = (function (arglist__4349){
var f = cljs.core.first(arglist__4349);
var g = cljs.core.first(cljs.core.next(arglist__4349));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4349)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4349)));
return G__4339__delegate.call(this, f, g, h, fs);
});
return G__4339;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case  1 :
return juxt__4307.call(this,f);
case  2 :
return juxt__4308.call(this,f,g);
case  3 :
return juxt__4309.call(this,f,g,h);
default:
return juxt__4310.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__4310.cljs$lang$applyTo;
return juxt;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. dorun can
* be used to force any effects. Walks through the successive nexts of
* the seq, does not retain the head and returns nil.
*/
cljs.core.dorun = (function() {
var dorun = null;
var dorun__4351 = (function (coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{{
var G__4354 = cljs.core.next.call(null,coll);
coll = G__4354;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__4352 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3546__auto____4350 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(and__3546__auto____4350))
{return (n > 0);
} else
{return and__3546__auto____4350;
}
})()))
{{
var G__4355 = (n - 1);
var G__4356 = cljs.core.next.call(null,coll);
n = G__4355;
coll = G__4356;
continue;
}
} else
{return null;
}
break;
}
});
dorun = function(n,coll){
switch(arguments.length){
case  1 :
return dorun__4351.call(this,n);
case  2 :
return dorun__4352.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return dorun;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. doall can
* be used to force any effects. Walks through the successive nexts of
* the seq, retains the head and returns it, thus causing the entire
* seq to reside in memory at one time.
*/
cljs.core.doall = (function() {
var doall = null;
var doall__4357 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__4358 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case  1 :
return doall__4357.call(this,n);
case  2 :
return doall__4358.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return doall;
})()
;
/**
* Returns the result of (re-find re s) if re fully matches s.
*/
cljs.core.re_matches = (function re_matches(re,s){
var matches__4360 = re.exec(s);

if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__4360),s)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__4360),1)))
{return cljs.core.first.call(null,matches__4360);
} else
{return cljs.core.vec.call(null,matches__4360);
}
} else
{return null;
}
});
/**
* Returns the first regex match, if any, of s to re, using
* re.exec(s). Returns a vector, containing first the matching
* substring, then any capturing groups if the regular expression contains
* capturing groups.
*/
cljs.core.re_find = (function re_find(re,s){
var matches__4361 = re.exec(s);

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,matches__4361)))
{return null;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__4361),1)))
{return cljs.core.first.call(null,matches__4361);
} else
{return cljs.core.vec.call(null,matches__4361);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__4362 = cljs.core.re_find.call(null,re,s);
var match_idx__4363 = s.search(re);
var match_str__4364 = (cljs.core.truth_(cljs.core.coll_QMARK_.call(null,match_data__4362))?cljs.core.first.call(null,match_data__4362):match_data__4362);
var post_match__4365 = cljs.core.subs.call(null,s,(match_idx__4363 + cljs.core.count.call(null,match_str__4364)));

if(cljs.core.truth_(match_data__4362))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__4362,re_seq.call(null,re,post_match__4365));
})));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
return (new RegExp(s));
});
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.Vector.fromArray([begin]),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.Vector.fromArray([sep]),cljs.core.map.call(null,(function (p1__4366_SHARP_){
return print_one.call(null,p1__4366_SHARP_,opts);
}),coll))),cljs.core.Vector.fromArray([end]));
});
cljs.core.string_print = (function string_print(x){
cljs.core._STAR_print_fn_STAR_.call(null,x);
return null;
});
cljs.core.flush = (function flush(){
return null;
});
cljs.core.pr_seq = (function pr_seq(obj,opts){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,"nil");
} else
{if(cljs.core.truth_((void 0 === obj)))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3546__auto____4367 = cljs.core.get.call(null,opts,"﷐'meta");

if(cljs.core.truth_(and__3546__auto____4367))
{var and__3546__auto____4371 = (function (){var x__412__auto____4368 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____4369 = x__412__auto____4368;

if(cljs.core.truth_(and__3546__auto____4369))
{var and__3546__auto____4370 = x__412__auto____4368.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____4370))
{return cljs.core.not.call(null,x__412__auto____4368.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____4370;
}
} else
{return and__3546__auto____4369;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__412__auto____4368);
}
})();

if(cljs.core.truth_(and__3546__auto____4371))
{return cljs.core.meta.call(null,obj);
} else
{return and__3546__auto____4371;
}
} else
{return and__3546__auto____4367;
}
})())?cljs.core.concat.call(null,cljs.core.Vector.fromArray(["^"]),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.Vector.fromArray([" "])):null),(cljs.core.truth_((function (){var x__412__auto____4372 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____4373 = x__412__auto____4372;

if(cljs.core.truth_(and__3546__auto____4373))
{var and__3546__auto____4374 = x__412__auto____4372.cljs$core$IPrintable$;

if(cljs.core.truth_(and__3546__auto____4374))
{return cljs.core.not.call(null,x__412__auto____4372.hasOwnProperty("cljs$core$IPrintable$"));
} else
{return and__3546__auto____4374;
}
} else
{return and__3546__auto____4373;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,x__412__auto____4372);
}
})())?cljs.core._pr_seq.call(null,obj,opts):cljs.core.list.call(null,"#<",cljs.core.str.call(null,obj),">")));
} else
{return null;
}
}
}
});
/**
* Prints a sequence of objects to a string, observing all the
* options given in opts
*/
cljs.core.pr_str_with_opts = (function pr_str_with_opts(objs,opts){
var first_obj__4375 = cljs.core.first.call(null,objs);
var sb__4376 = (new goog.string.StringBuffer());

var G__4377__4378 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__4377__4378))
{var obj__4379 = cljs.core.first.call(null,G__4377__4378);
var G__4377__4380 = G__4377__4378;

while(true){
if(cljs.core.truth_((obj__4379 === first_obj__4375)))
{} else
{sb__4376.append(" ");
}
var G__4381__4382 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__4379,opts));

if(cljs.core.truth_(G__4381__4382))
{var string__4383 = cljs.core.first.call(null,G__4381__4382);
var G__4381__4384 = G__4381__4382;

while(true){
sb__4376.append(string__4383);
var temp__3698__auto____4385 = cljs.core.next.call(null,G__4381__4384);

if(cljs.core.truth_(temp__3698__auto____4385))
{var G__4381__4386 = temp__3698__auto____4385;

{
var G__4389 = cljs.core.first.call(null,G__4381__4386);
var G__4390 = G__4381__4386;
string__4383 = G__4389;
G__4381__4384 = G__4390;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____4387 = cljs.core.next.call(null,G__4377__4380);

if(cljs.core.truth_(temp__3698__auto____4387))
{var G__4377__4388 = temp__3698__auto____4387;

{
var G__4391 = cljs.core.first.call(null,G__4377__4388);
var G__4392 = G__4377__4388;
obj__4379 = G__4391;
G__4377__4380 = G__4392;
continue;
}
} else
{}
break;
}
} else
{}
return cljs.core.str.call(null,sb__4376);
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var first_obj__4393 = cljs.core.first.call(null,objs);

var G__4394__4395 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__4394__4395))
{var obj__4396 = cljs.core.first.call(null,G__4394__4395);
var G__4394__4397 = G__4394__4395;

while(true){
if(cljs.core.truth_((obj__4396 === first_obj__4393)))
{} else
{cljs.core.string_print.call(null," ");
}
var G__4398__4399 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__4396,opts));

if(cljs.core.truth_(G__4398__4399))
{var string__4400 = cljs.core.first.call(null,G__4398__4399);
var G__4398__4401 = G__4398__4399;

while(true){
cljs.core.string_print.call(null,string__4400);
var temp__3698__auto____4402 = cljs.core.next.call(null,G__4398__4401);

if(cljs.core.truth_(temp__3698__auto____4402))
{var G__4398__4403 = temp__3698__auto____4402;

{
var G__4406 = cljs.core.first.call(null,G__4398__4403);
var G__4407 = G__4398__4403;
string__4400 = G__4406;
G__4398__4401 = G__4407;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____4404 = cljs.core.next.call(null,G__4394__4397);

if(cljs.core.truth_(temp__3698__auto____4404))
{var G__4394__4405 = temp__3698__auto____4404;

{
var G__4408 = cljs.core.first.call(null,G__4394__4405);
var G__4409 = G__4394__4405;
obj__4396 = G__4408;
G__4394__4397 = G__4409;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.newline = (function newline(opts){
cljs.core.string_print.call(null,"\n");
if(cljs.core.truth_(cljs.core.get.call(null,opts,"﷐'flush-on-newline")))
{return cljs.core.flush.call(null);
} else
{return null;
}
});
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = (function pr_opts(){
return cljs.core.ObjMap.fromObject(["﷐'flush-on-newline","﷐'readably","﷐'meta","﷐'dup"],{"﷐'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_,"﷐'readably":cljs.core._STAR_print_readably_STAR_,"﷐'meta":cljs.core._STAR_print_meta_STAR_,"﷐'dup":cljs.core._STAR_print_dup_STAR_});
});
/**
* pr to a string, returning it. Fundamental entrypoint to IPrintable.
* @param {...*} var_args
*/
cljs.core.pr_str = (function() { 
var pr_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr_str__delegate.call(this, objs);
};
pr_str.cljs$lang$maxFixedArity = 0;
pr_str.cljs$lang$applyTo = (function (arglist__4410){
var objs = cljs.core.seq( arglist__4410 );;
return pr_str__delegate.call(this, objs);
});
return pr_str;
})()
;
/**
* Prints the object(s) using string-print.  Prints the
* object(s), separated by spaces if there is more than one.
* By default, pr and prn print in a way that objects can be
* read by the reader
* @param {...*} var_args
*/
cljs.core.pr = (function() { 
var pr__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr__delegate.call(this, objs);
};
pr.cljs$lang$maxFixedArity = 0;
pr.cljs$lang$applyTo = (function (arglist__4411){
var objs = cljs.core.seq( arglist__4411 );;
return pr__delegate.call(this, objs);
});
return pr;
})()
;
/**
* Prints the object(s) using string-print.
* print and println produce output for human consumption.
* @param {...*} var_args
*/
cljs.core.print = (function() { 
var cljs_core_print__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"﷐'readably",false));
};
var cljs_core_print = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return cljs_core_print__delegate.call(this, objs);
};
cljs_core_print.cljs$lang$maxFixedArity = 0;
cljs_core_print.cljs$lang$applyTo = (function (arglist__4412){
var objs = cljs.core.seq( arglist__4412 );;
return cljs_core_print__delegate.call(this, objs);
});
return cljs_core_print;
})()
;
/**
* Same as print followed by (newline)
* @param {...*} var_args
*/
cljs.core.println = (function() { 
var println__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"﷐'readably",false));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var println = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println__delegate.call(this, objs);
};
println.cljs$lang$maxFixedArity = 0;
println.cljs$lang$applyTo = (function (arglist__4413){
var objs = cljs.core.seq( arglist__4413 );;
return println__delegate.call(this, objs);
});
return println;
})()
;
/**
* Same as pr followed by (newline).
* @param {...*} var_args
*/
cljs.core.prn = (function() { 
var prn__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var prn = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn__delegate.call(this, objs);
};
prn.cljs$lang$maxFixedArity = 0;
prn.cljs$lang$applyTo = (function (arglist__4414){
var objs = cljs.core.seq( arglist__4414 );;
return prn__delegate.call(this, objs);
});
return prn;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__4415 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__4415,"{",", ","}",opts,coll);
});
(cljs.core.IPrintable["number"] = true);
(cljs.core._pr_seq["number"] = (function (n,opts){
return cljs.core.list.call(null,cljs.core.str.call(null,n));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["boolean"] = true);
(cljs.core._pr_seq["boolean"] = (function (bool,opts){
return cljs.core.list.call(null,cljs.core.str.call(null,bool));
}));
cljs.core.Set.prototype.cljs$core$IPrintable$ = true;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
(cljs.core.IPrintable["string"] = true);
(cljs.core._pr_seq["string"] = (function (obj,opts){
if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,":",(function (){var temp__3698__auto____4416 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____4416))
{var nspc__4417 = temp__3698__auto____4416;

return cljs.core.str.call(null,nspc__4417,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,(function (){var temp__3698__auto____4418 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____4418))
{var nspc__4419 = temp__3698__auto____4418;

return cljs.core.str.call(null,nspc__4419,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.list.call(null,(cljs.core.truth_("﷐'readably".call(null,opts))?goog.string.quote.call(null,obj):obj));
} else
{return null;
}
}
}
}));
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["array"] = true);
(cljs.core._pr_seq["array"] = (function (a,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#<Array [",", ","]>",opts,a);
}));
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.list.call(null,"()");
});
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__4420 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__4420,"{",", ","}",opts,coll);
});

/**
* @constructor
*/
cljs.core.Atom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
})
cljs.core.Atom.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Atom");
});
cljs.core.Atom.prototype.cljs$core$IHash$ = true;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = (function (this$){
var this__4421 = this;
return goog.getUid.call(null,this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = (function (this$,oldval,newval){
var this__4422 = this;
var G__4423__4424 = cljs.core.seq.call(null,this__4422.watches);

if(cljs.core.truth_(G__4423__4424))
{var G__4426__4428 = cljs.core.first.call(null,G__4423__4424);
var vec__4427__4429 = G__4426__4428;
var key__4430 = cljs.core.nth.call(null,vec__4427__4429,0,null);
var f__4431 = cljs.core.nth.call(null,vec__4427__4429,1,null);
var G__4423__4432 = G__4423__4424;

var G__4426__4433 = G__4426__4428;
var G__4423__4434 = G__4423__4432;

while(true){
var vec__4435__4436 = G__4426__4433;
var key__4437 = cljs.core.nth.call(null,vec__4435__4436,0,null);
var f__4438 = cljs.core.nth.call(null,vec__4435__4436,1,null);
var G__4423__4439 = G__4423__4434;

f__4438.call(null,key__4437,this$,oldval,newval);
var temp__3698__auto____4440 = cljs.core.next.call(null,G__4423__4439);

if(cljs.core.truth_(temp__3698__auto____4440))
{var G__4423__4441 = temp__3698__auto____4440;

{
var G__4448 = cljs.core.first.call(null,G__4423__4441);
var G__4449 = G__4423__4441;
G__4426__4433 = G__4448;
G__4423__4434 = G__4449;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = (function (this$,key,f){
var this__4442 = this;
return this$.watches = cljs.core.assoc.call(null,this__4442.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = (function (this$,key){
var this__4443 = this;
return this$.watches = cljs.core.dissoc.call(null,this__4443.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = (function (a,opts){
var this__4444 = this;
return cljs.core.concat.call(null,cljs.core.Vector.fromArray(["#<Atom: "]),cljs.core._pr_seq.call(null,this__4444.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = (function (_){
var this__4445 = this;
return this__4445.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = (function (_){
var this__4446 = this;
return this__4446.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__4447 = this;
return (o === other);
});
cljs.core.Atom;
/**
* Creates and returns an Atom with an initial value of x and zero or
* more options (in any order):
* 
* :meta metadata-map
* 
* :validator validate-fn
* 
* If metadata-map is supplied, it will be come the metadata on the
* atom. validate-fn must be nil or a side-effect-free fn of one
* argument, which will be passed the intended new state on any state
* change. If the new state is unacceptable, the validate-fn should
* return false or throw an Error.  If either of these error conditions
* occur, then the value of the atom will not change.
* @param {...*} var_args
*/
cljs.core.atom = (function() {
var atom = null;
var atom__4456 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__4457 = (function() { 
var G__4459__delegate = function (x,p__4450){
var map__4451__4452 = p__4450;
var map__4451__4453 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__4451__4452))?cljs.core.apply.call(null,cljs.core.hash_map,map__4451__4452):map__4451__4452);
var validator__4454 = cljs.core.get.call(null,map__4451__4453,"﷐'validator");
var meta__4455 = cljs.core.get.call(null,map__4451__4453,"﷐'meta");

return (new cljs.core.Atom(x,meta__4455,validator__4454,null));
};
var G__4459 = function (x,var_args){
var p__4450 = null;
if (goog.isDef(var_args)) {
  p__4450 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4459__delegate.call(this, x, p__4450);
};
G__4459.cljs$lang$maxFixedArity = 1;
G__4459.cljs$lang$applyTo = (function (arglist__4460){
var x = cljs.core.first(arglist__4460);
var p__4450 = cljs.core.rest(arglist__4460);
return G__4459__delegate.call(this, x, p__4450);
});
return G__4459;
})()
;
atom = function(x,var_args){
var p__4450 = var_args;
switch(arguments.length){
case  1 :
return atom__4456.call(this,x);
default:
return atom__4457.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__4457.cljs$lang$applyTo;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__3698__auto____4461 = a.validator;

if(cljs.core.truth_(temp__3698__auto____4461))
{var validate__4462 = temp__3698__auto____4461;

if(cljs.core.truth_(validate__4462.call(null,new_value)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ","Validator rejected reference state","\n",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'validate","﷑'new-value"),cljs.core.hash_map("﷐'line",3061))))));
}
} else
{}
var old_value__4463 = a.state;

a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__4463,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
cljs.core.swap_BANG_ = (function() {
var swap_BANG_ = null;
var swap_BANG___4464 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___4465 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___4466 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___4467 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___4468 = (function() { 
var G__4470__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__4470 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__4470__delegate.call(this, a, f, x, y, z, more);
};
G__4470.cljs$lang$maxFixedArity = 5;
G__4470.cljs$lang$applyTo = (function (arglist__4471){
var a = cljs.core.first(arglist__4471);
var f = cljs.core.first(cljs.core.next(arglist__4471));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4471)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4471))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4471)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4471)))));
return G__4470__delegate.call(this, a, f, x, y, z, more);
});
return G__4470;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return swap_BANG___4464.call(this,a,f);
case  3 :
return swap_BANG___4465.call(this,a,f,x);
case  4 :
return swap_BANG___4466.call(this,a,f,x,y);
case  5 :
return swap_BANG___4467.call(this,a,f,x,y,z);
default:
return swap_BANG___4468.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___4468.cljs$lang$applyTo;
return swap_BANG_;
})()
;
/**
* Atomically sets the value of atom to newval if and only if the
* current value of the atom is identical to oldval. Returns true if
* set happened, else false.
*/
cljs.core.compare_and_set_BANG_ = (function compare_and_set_BANG_(a,oldval,newval){
if(cljs.core.truth_(cljs.core._EQ_.call(null,a.state,oldval)))
{cljs.core.reset_BANG_.call(null,a,newval);
return true;
} else
{return false;
}
});
cljs.core.deref = (function deref(o){
return cljs.core._deref.call(null,o);
});
/**
* Sets the validator-fn for an atom. validator-fn must be nil or a
* side-effect-free fn of one argument, which will be passed the intended
* new state on any state change. If the new state is unacceptable, the
* validator-fn should return false or throw an Error. If the current state
* is not acceptable to the new validator, an Error will be thrown and the
* validator will not be changed.
*/
cljs.core.set_validator_BANG_ = (function set_validator_BANG_(iref,val){
return iref.validator = val;
});
/**
* Gets the validator-fn for a var/ref/agent/atom.
*/
cljs.core.get_validator = (function get_validator(iref){
return iref.validator;
});
/**
* Atomically sets the metadata for a namespace/var/ref/agent/atom to be:
* 
* (apply f its-current-meta args)
* 
* f must be free of side-effects
* @param {...*} var_args
*/
cljs.core.alter_meta_BANG_ = (function() { 
var alter_meta_BANG___delegate = function (iref,f,args){
return iref.meta = cljs.core.apply.call(null,f,iref.meta,args);
};
var alter_meta_BANG_ = function (iref,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return alter_meta_BANG___delegate.call(this, iref, f, args);
};
alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__4472){
var iref = cljs.core.first(arglist__4472);
var f = cljs.core.first(cljs.core.next(arglist__4472));
var args = cljs.core.rest(cljs.core.next(arglist__4472));
return alter_meta_BANG___delegate.call(this, iref, f, args);
});
return alter_meta_BANG_;
})()
;
/**
* Atomically resets the metadata for an atom
*/
cljs.core.reset_meta_BANG_ = (function reset_meta_BANG_(iref,m){
return iref.meta = m;
});
/**
* Alpha - subject to change.
* 
* Adds a watch function to an atom reference. The watch fn must be a
* fn of 4 args: a key, the reference, its old-state, its
* new-state. Whenever the reference's state might have been changed,
* any registered watches will have their functions called. The watch
* fn will be called synchronously. Note that an atom's state
* may have changed again prior to the fn call, so use old/new-state
* rather than derefing the reference. Keys must be unique per
* reference, and can be used to remove the watch with remove-watch,
* but are otherwise considered opaque by the watch mechanism.  Bear in
* mind that regardless of the result or action of the watch fns the
* atom's value will change.  Example:
* 
* (def a (atom 0))
* (add-watch a :inc (fn [k r o n] (assert (== 0 n))))
* (swap! a inc)
* ;; Assertion Error
* (deref a)
* ;=> 1
*/
cljs.core.add_watch = (function add_watch(iref,key,f){
return cljs.core._add_watch.call(null,iref,key,f);
});
/**
* Alpha - subject to change.
* 
* Removes a watch (set by add-watch) from a reference
*/
cljs.core.remove_watch = (function remove_watch(iref,key){
return cljs.core._remove_watch.call(null,iref,key);
});
cljs.core.gensym_counter = null;
/**
* Returns a new symbol with a unique name. If a prefix string is
* supplied, the name is prefix# where # is some unique number. If
* prefix is not supplied, the prefix is 'G__'.
*/
cljs.core.gensym = (function() {
var gensym = null;
var gensym__4473 = (function (){
return gensym.call(null,"G__");
});
var gensym__4474 = (function (prefix_string){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.gensym_counter)))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,cljs.core.str.call(null,prefix_string,cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc)));
});
gensym = function(prefix_string){
switch(arguments.length){
case  0 :
return gensym__4473.call(this);
case  1 :
return gensym__4474.call(this,prefix_string);
}
throw('Invalid arity: ' + arguments.length);
};
return gensym;
})()
;
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;

/**
* @constructor
*/
cljs.core.Delay = (function (f,state){
this.f = f;
this.state = state;
})
cljs.core.Delay.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.Delay");
});
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = (function (d){
var this__4476 = this;
return cljs.core.not.call(null,cljs.core.nil_QMARK_.call(null,cljs.core.deref.call(null,this__4476.state)));
});
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = (function (_){
var this__4477 = this;
if(cljs.core.truth_(cljs.core.deref.call(null,this__4477.state)))
{} else
{cljs.core.swap_BANG_.call(null,this__4477.state,this__4477.f);
}
return cljs.core.deref.call(null,this__4477.state);
});
cljs.core.Delay;
/**
* Takes a body of expressions and yields a Delay object that will
* invoke the body only the first time it is forced (with force or deref/@), and
* will cache the result and return it on all subsequent force
* calls.
* @param {...*} var_args
*/
cljs.core.delay = (function() { 
var delay__delegate = function (body){
return (new cljs.core.Delay((function (){
return cljs.core.apply.call(null,cljs.core.identity,body);
}),cljs.core.atom.call(null,null)));
};
var delay = function (var_args){
var body = null;
if (goog.isDef(var_args)) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return delay__delegate.call(this, body);
};
delay.cljs$lang$maxFixedArity = 0;
delay.cljs$lang$applyTo = (function (arglist__4478){
var body = cljs.core.seq( arglist__4478 );;
return delay__delegate.call(this, body);
});
return delay;
})()
;
/**
* returns true if x is a Delay created with delay
*/
cljs.core.delay_QMARK_ = (function delay_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.Delay,x);
});
/**
* If x is a Delay, returns the (possibly cached) value of its expression, else returns x
*/
cljs.core.force = (function force(x){
if(cljs.core.truth_(cljs.core.delay_QMARK_.call(null,x)))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
/**
* Returns true if a value has been produced for a promise, delay, future or lazy sequence.
*/
cljs.core.realized_QMARK_ = (function realized_QMARK_(d){
return cljs.core._realized_QMARK_.call(null,d);
});
/**
* Recursively transforms JavaScript arrays into ClojureScript
* vectors, and JavaScript objects into ClojureScript maps.  With
* option ':keywordize-keys true' will convert object fields from
* strings to keywords.
* @param {...*} var_args
*/
cljs.core.js__GT_clj = (function() { 
var js__GT_clj__delegate = function (x,options){
var map__4479__4480 = options;
var map__4479__4481 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__4479__4480))?cljs.core.apply.call(null,cljs.core.hash_map,map__4479__4480):map__4479__4480);
var keywordize_keys__4482 = cljs.core.get.call(null,map__4479__4481,"﷐'keywordize-keys");
var keyfn__4483 = (cljs.core.truth_(keywordize_keys__4482)?cljs.core.keyword:cljs.core.str);
var f__4489 = (function thisfn(x){
if(cljs.core.truth_(cljs.core.seq_QMARK_.call(null,x)))
{return cljs.core.doall.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null,x)))
{return cljs.core.into.call(null,cljs.core.empty.call(null,x),cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isArray.call(null,x)))
{return cljs.core.vec.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isObject.call(null,x)))
{return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),(function (){var iter__476__auto____4488 = (function iter__4484(s__4485){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4485__4486 = s__4485;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__4485__4486)))
{var k__4487 = cljs.core.first.call(null,s__4485__4486);

return cljs.core.cons.call(null,cljs.core.Vector.fromArray([keyfn__4483.call(null,k__4487),thisfn.call(null,(x[k__4487]))]),iter__4484.call(null,cljs.core.rest.call(null,s__4485__4486)));
} else
{return null;
}
break;
}
})));
});

return iter__476__auto____4488.call(null,cljs.core.js_keys.call(null,x));
})());
} else
{if(cljs.core.truth_("﷐'else"))
{return x;
} else
{return null;
}
}
}
}
}
});

return f__4489.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__4490){
var x = cljs.core.first(arglist__4490);
var options = cljs.core.rest(arglist__4490);
return js__GT_clj__delegate.call(this, x, options);
});
return js__GT_clj;
})()
;
/**
* Returns a memoized version of a referentially transparent function. The
* memoized version of the function keeps a cache of the mapping from arguments
* to results and, when calls with the same arguments are repeated often, has
* higher performance at the expense of higher memory use.
*/
cljs.core.memoize = (function memoize(f){
var mem__4491 = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));

return (function() { 
var G__4495__delegate = function (args){
var temp__3695__auto____4492 = cljs.core.get.call(null,cljs.core.deref.call(null,mem__4491),args);

if(cljs.core.truth_(temp__3695__auto____4492))
{var v__4493 = temp__3695__auto____4492;

return v__4493;
} else
{var ret__4494 = cljs.core.apply.call(null,f,args);

cljs.core.swap_BANG_.call(null,mem__4491,cljs.core.assoc,args,ret__4494);
return ret__4494;
}
};
var G__4495 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4495__delegate.call(this, args);
};
G__4495.cljs$lang$maxFixedArity = 0;
G__4495.cljs$lang$applyTo = (function (arglist__4496){
var args = cljs.core.seq( arglist__4496 );;
return G__4495__delegate.call(this, args);
});
return G__4495;
})()
;
});
/**
* trampoline can be used to convert algorithms requiring mutual
* recursion without stack consumption. Calls f with supplied args, if
* any. If f returns a fn, calls that fn with no arguments, and
* continues to repeat, until the return value is not a fn, then
* returns that non-fn value. Note that if you want to return a fn as a
* final value, you must wrap it in some data structure and unpack it
* after trampoline returns.
* @param {...*} var_args
*/
cljs.core.trampoline = (function() {
var trampoline = null;
var trampoline__4498 = (function (f){
while(true){
var ret__4497 = f.call(null);

if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,ret__4497)))
{{
var G__4501 = ret__4497;
f = G__4501;
continue;
}
} else
{return ret__4497;
}
break;
}
});
var trampoline__4499 = (function() { 
var G__4502__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__4502 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4502__delegate.call(this, f, args);
};
G__4502.cljs$lang$maxFixedArity = 1;
G__4502.cljs$lang$applyTo = (function (arglist__4503){
var f = cljs.core.first(arglist__4503);
var args = cljs.core.rest(arglist__4503);
return G__4502__delegate.call(this, f, args);
});
return G__4502;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case  1 :
return trampoline__4498.call(this,f);
default:
return trampoline__4499.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__4499.cljs$lang$applyTo;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__4504 = (function (){
return rand.call(null,1);
});
var rand__4505 = (function (n){
return Math.random() * n;
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__4504.call(this);
case  1 :
return rand__4505.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return Math.floor(Math.random() * n);
});
/**
* Return a random element of the (sequential) collection. Will have
* the same performance characteristics as nth for the given
* collection.
*/
cljs.core.rand_nth = (function rand_nth(coll){
return cljs.core.nth.call(null,coll,cljs.core.rand_int.call(null,cljs.core.count.call(null,coll)));
});
/**
* Returns a map of the elements of coll keyed by the result of
* f on each element. The value at each key will be a vector of the
* corresponding elements, in the order they appeared in coll.
*/
cljs.core.group_by = (function group_by(f,coll){
return cljs.core.reduce.call(null,(function (ret,x){
var k__4507 = f.call(null,x);

return cljs.core.assoc.call(null,ret,k__4507,cljs.core.conj.call(null,cljs.core.get.call(null,ret,k__4507,cljs.core.Vector.fromArray([])),x));
}),cljs.core.ObjMap.fromObject([],{}),coll);
});
/**
* Creates a hierarchy object for use with derive, isa? etc.
*/
cljs.core.make_hierarchy = (function make_hierarchy(){
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'descendants","﷐'ancestors"],{"﷐'parents":cljs.core.ObjMap.fromObject([],{}),"﷐'descendants":cljs.core.ObjMap.fromObject([],{}),"﷐'ancestors":cljs.core.ObjMap.fromObject([],{})});
});
cljs.core.global_hierarchy = cljs.core.atom.call(null,cljs.core.make_hierarchy.call(null));
/**
* Returns true if (= child parent), or child is directly or indirectly derived from
* parent, either via a Java type inheritance relationship or a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy
*/
cljs.core.isa_QMARK_ = (function() {
var isa_QMARK_ = null;
var isa_QMARK___4516 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___4517 = (function (h,child,parent){
var or__3548__auto____4508 = cljs.core._EQ_.call(null,child,parent);

if(cljs.core.truth_(or__3548__auto____4508))
{return or__3548__auto____4508;
} else
{var or__3548__auto____4509 = cljs.core.contains_QMARK_.call(null,"﷐'ancestors".call(null,h).call(null,child),parent);

if(cljs.core.truth_(or__3548__auto____4509))
{return or__3548__auto____4509;
} else
{var and__3546__auto____4510 = cljs.core.vector_QMARK_.call(null,parent);

if(cljs.core.truth_(and__3546__auto____4510))
{var and__3546__auto____4511 = cljs.core.vector_QMARK_.call(null,child);

if(cljs.core.truth_(and__3546__auto____4511))
{var and__3546__auto____4512 = cljs.core._EQ_.call(null,cljs.core.count.call(null,parent),cljs.core.count.call(null,child));

if(cljs.core.truth_(and__3546__auto____4512))
{var ret__4513 = true;
var i__4514 = 0;

while(true){
if(cljs.core.truth_((function (){var or__3548__auto____4515 = cljs.core.not.call(null,ret__4513);

if(cljs.core.truth_(or__3548__auto____4515))
{return or__3548__auto____4515;
} else
{return cljs.core._EQ_.call(null,i__4514,cljs.core.count.call(null,parent));
}
})()))
{return ret__4513;
} else
{{
var G__4519 = isa_QMARK_.call(null,h,child.call(null,i__4514),parent.call(null,i__4514));
var G__4520 = (i__4514 + 1);
ret__4513 = G__4519;
i__4514 = G__4520;
continue;
}
}
break;
}
} else
{return and__3546__auto____4512;
}
} else
{return and__3546__auto____4511;
}
} else
{return and__3546__auto____4510;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case  2 :
return isa_QMARK___4516.call(this,h,child);
case  3 :
return isa_QMARK___4517.call(this,h,child,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return isa_QMARK_;
})()
;
/**
* Returns the immediate parents of tag, either via a Java type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.parents = (function() {
var parents = null;
var parents__4521 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__4522 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'parents".call(null,h),tag));
});
parents = function(h,tag){
switch(arguments.length){
case  1 :
return parents__4521.call(this,h);
case  2 :
return parents__4522.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return parents;
})()
;
/**
* Returns the immediate and indirect parents of tag, either via a Java type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.ancestors = (function() {
var ancestors = null;
var ancestors__4524 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__4525 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'ancestors".call(null,h),tag));
});
ancestors = function(h,tag){
switch(arguments.length){
case  1 :
return ancestors__4524.call(this,h);
case  2 :
return ancestors__4525.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return ancestors;
})()
;
/**
* Returns the immediate and indirect children of tag, through a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy. Note: does not work on Java type inheritance
* relationships.
*/
cljs.core.descendants = (function() {
var descendants = null;
var descendants__4527 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__4528 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'descendants".call(null,h),tag));
});
descendants = function(h,tag){
switch(arguments.length){
case  1 :
return descendants__4527.call(this,h);
case  2 :
return descendants__4528.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return descendants;
})()
;
/**
* Establishes a parent/child relationship between parent and
* tag. Parent must be a namespace-qualified symbol or keyword and
* child can be either a namespace-qualified symbol or keyword or a
* class. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.derive = (function() {
var derive = null;
var derive__4538 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'namespace","﷑'parent"),cljs.core.hash_map("﷐'line",3353))))));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__4539 = (function (h,tag,parent){
if(cljs.core.truth_(cljs.core.not_EQ_.call(null,tag,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'not=","﷑'tag","﷑'parent"),cljs.core.hash_map("﷐'line",3357))))));
}
var tp__4533 = "﷐'parents".call(null,h);
var td__4534 = "﷐'descendants".call(null,h);
var ta__4535 = "﷐'ancestors".call(null,h);
var tf__4536 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.get.call(null,targets,k,cljs.core.set([])),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});

var or__3548__auto____4537 = (cljs.core.truth_(cljs.core.contains_QMARK_.call(null,tp__4533.call(null,tag),parent))?null:(function (){if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__4535.call(null,tag),parent)))
{throw (new Error(cljs.core.str.call(null,tag,"already has",parent,"as ancestor")));
} else
{}
if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__4535.call(null,parent),tag)))
{throw (new Error(cljs.core.str.call(null,"Cyclic derivation:",parent,"has",tag,"as ancestor")));
} else
{}
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'ancestors","﷐'descendants"],{"﷐'parents":cljs.core.assoc.call(null,"﷐'parents".call(null,h),tag,cljs.core.conj.call(null,cljs.core.get.call(null,tp__4533,tag,cljs.core.set([])),parent)),"﷐'ancestors":tf__4536.call(null,"﷐'ancestors".call(null,h),tag,td__4534,parent,ta__4535),"﷐'descendants":tf__4536.call(null,"﷐'descendants".call(null,h),parent,ta__4535,tag,td__4534)});
})());

if(cljs.core.truth_(or__3548__auto____4537))
{return or__3548__auto____4537;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return derive__4538.call(this,h,tag);
case  3 :
return derive__4539.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return derive;
})()
;
/**
* Removes a parent/child relationship between parent and
* tag. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.underive = (function() {
var underive = null;
var underive__4545 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__4546 = (function (h,tag,parent){
var parentMap__4541 = "﷐'parents".call(null,h);
var childsParents__4542 = (cljs.core.truth_(parentMap__4541.call(null,tag))?cljs.core.disj.call(null,parentMap__4541.call(null,tag),parent):cljs.core.set([]));
var newParents__4543 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__4542))?cljs.core.assoc.call(null,parentMap__4541,tag,childsParents__4542):cljs.core.dissoc.call(null,parentMap__4541,tag));
var deriv_seq__4544 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__4530_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__4530_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__4530_SHARP_),cljs.core.second.call(null,p1__4530_SHARP_)));
}),cljs.core.seq.call(null,newParents__4543)));

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,parentMap__4541.call(null,tag),parent)))
{return cljs.core.reduce.call(null,(function (p1__4531_SHARP_,p2__4532_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__4531_SHARP_,p2__4532_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__4544));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return underive__4545.call(this,h,tag);
case  3 :
return underive__4546.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return underive;
})()
;
cljs.core.reset_cache = (function reset_cache(method_cache,method_table,cached_hierarchy,hierarchy){
cljs.core.swap_BANG_.call(null,method_cache,(function (_){
return cljs.core.deref.call(null,method_table);
}));
return cljs.core.swap_BANG_.call(null,cached_hierarchy,(function (_){
return cljs.core.deref.call(null,hierarchy);
}));
});
cljs.core.prefers_STAR_ = (function prefers_STAR_(x,y,prefer_table){
var xprefs__4548 = cljs.core.deref.call(null,prefer_table).call(null,x);

var or__3548__auto____4550 = (cljs.core.truth_((function (){var and__3546__auto____4549 = xprefs__4548;

if(cljs.core.truth_(and__3546__auto____4549))
{return xprefs__4548.call(null,y);
} else
{return and__3546__auto____4549;
}
})())?true:null);

if(cljs.core.truth_(or__3548__auto____4550))
{return or__3548__auto____4550;
} else
{var or__3548__auto____4552 = (function (){var ps__4551 = cljs.core.parents.call(null,y);

while(true){
if(cljs.core.truth_((cljs.core.count.call(null,ps__4551) > 0)))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__4551),prefer_table)))
{} else
{}
{
var G__4555 = cljs.core.rest.call(null,ps__4551);
ps__4551 = G__4555;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____4552))
{return or__3548__auto____4552;
} else
{var or__3548__auto____4554 = (function (){var ps__4553 = cljs.core.parents.call(null,x);

while(true){
if(cljs.core.truth_((cljs.core.count.call(null,ps__4553) > 0)))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__4553),y,prefer_table)))
{} else
{}
{
var G__4556 = cljs.core.rest.call(null,ps__4553);
ps__4553 = G__4556;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____4554))
{return or__3548__auto____4554;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3548__auto____4557 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);

if(cljs.core.truth_(or__3548__auto____4557))
{return or__3548__auto____4557;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__4566 = cljs.core.reduce.call(null,(function (be,p__4558){
var vec__4559__4560 = p__4558;
var k__4561 = cljs.core.nth.call(null,vec__4559__4560,0,null);
var ___4562 = cljs.core.nth.call(null,vec__4559__4560,1,null);
var e__4563 = vec__4559__4560;

if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null,dispatch_val,k__4561)))
{var be2__4565 = (cljs.core.truth_((function (){var or__3548__auto____4564 = cljs.core.nil_QMARK_.call(null,be);

if(cljs.core.truth_(or__3548__auto____4564))
{return or__3548__auto____4564;
} else
{return cljs.core.dominates.call(null,k__4561,cljs.core.first.call(null,be),prefer_table);
}
})())?e__4563:be);

if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__4565),k__4561,prefer_table)))
{} else
{throw (new Error(cljs.core.str.call(null,"Multiple methods in multimethod '",name,"' match dispatch value: ",dispatch_val," -> ",k__4561," and ",cljs.core.first.call(null,be2__4565),", and neither is preferred")));
}
return be2__4565;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));

if(cljs.core.truth_(best_entry__4566))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy))))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__4566));
return cljs.core.second.call(null,best_entry__4566);
} else
{cljs.core.reset_cache.call(null,method_cache,method_table,cached_hierarchy,hierarchy);
return find_and_cache_best_method.call(null,name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy);
}
} else
{return null;
}
});
cljs.core.IMultiFn = {};
cljs.core._reset = (function _reset(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4567 = mf;

if(cljs.core.truth_(and__3546__auto____4567))
{return mf.cljs$core$IMultiFn$_reset;
} else
{return and__3546__auto____4567;
}
})()))
{return mf.cljs$core$IMultiFn$_reset(mf);
} else
{return (function (){var or__3548__auto____4568 = (cljs.core._reset[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4568))
{return or__3548__auto____4568;
} else
{var or__3548__auto____4569 = (cljs.core._reset["_"]);

if(cljs.core.truth_(or__3548__auto____4569))
{return or__3548__auto____4569;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if(cljs.core.truth_((function (){var and__3546__auto____4570 = mf;

if(cljs.core.truth_(and__3546__auto____4570))
{return mf.cljs$core$IMultiFn$_add_method;
} else
{return and__3546__auto____4570;
}
})()))
{return mf.cljs$core$IMultiFn$_add_method(mf,dispatch_val,method);
} else
{return (function (){var or__3548__auto____4571 = (cljs.core._add_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4571))
{return or__3548__auto____4571;
} else
{var or__3548__auto____4572 = (cljs.core._add_method["_"]);

if(cljs.core.truth_(or__3548__auto____4572))
{return or__3548__auto____4572;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____4573 = mf;

if(cljs.core.truth_(and__3546__auto____4573))
{return mf.cljs$core$IMultiFn$_remove_method;
} else
{return and__3546__auto____4573;
}
})()))
{return mf.cljs$core$IMultiFn$_remove_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____4574 = (cljs.core._remove_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4574))
{return or__3548__auto____4574;
} else
{var or__3548__auto____4575 = (cljs.core._remove_method["_"]);

if(cljs.core.truth_(or__3548__auto____4575))
{return or__3548__auto____4575;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if(cljs.core.truth_((function (){var and__3546__auto____4576 = mf;

if(cljs.core.truth_(and__3546__auto____4576))
{return mf.cljs$core$IMultiFn$_prefer_method;
} else
{return and__3546__auto____4576;
}
})()))
{return mf.cljs$core$IMultiFn$_prefer_method(mf,dispatch_val,dispatch_val_y);
} else
{return (function (){var or__3548__auto____4577 = (cljs.core._prefer_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4577))
{return or__3548__auto____4577;
} else
{var or__3548__auto____4578 = (cljs.core._prefer_method["_"]);

if(cljs.core.truth_(or__3548__auto____4578))
{return or__3548__auto____4578;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____4579 = mf;

if(cljs.core.truth_(and__3546__auto____4579))
{return mf.cljs$core$IMultiFn$_get_method;
} else
{return and__3546__auto____4579;
}
})()))
{return mf.cljs$core$IMultiFn$_get_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____4580 = (cljs.core._get_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4580))
{return or__3548__auto____4580;
} else
{var or__3548__auto____4581 = (cljs.core._get_method["_"]);

if(cljs.core.truth_(or__3548__auto____4581))
{return or__3548__auto____4581;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4582 = mf;

if(cljs.core.truth_(and__3546__auto____4582))
{return mf.cljs$core$IMultiFn$_methods;
} else
{return and__3546__auto____4582;
}
})()))
{return mf.cljs$core$IMultiFn$_methods(mf);
} else
{return (function (){var or__3548__auto____4583 = (cljs.core._methods[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4583))
{return or__3548__auto____4583;
} else
{var or__3548__auto____4584 = (cljs.core._methods["_"]);

if(cljs.core.truth_(or__3548__auto____4584))
{return or__3548__auto____4584;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4585 = mf;

if(cljs.core.truth_(and__3546__auto____4585))
{return mf.cljs$core$IMultiFn$_prefers;
} else
{return and__3546__auto____4585;
}
})()))
{return mf.cljs$core$IMultiFn$_prefers(mf);
} else
{return (function (){var or__3548__auto____4586 = (cljs.core._prefers[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4586))
{return or__3548__auto____4586;
} else
{var or__3548__auto____4587 = (cljs.core._prefers["_"]);

if(cljs.core.truth_(or__3548__auto____4587))
{return or__3548__auto____4587;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._dispatch = (function _dispatch(mf,args){
if(cljs.core.truth_((function (){var and__3546__auto____4588 = mf;

if(cljs.core.truth_(and__3546__auto____4588))
{return mf.cljs$core$IMultiFn$_dispatch;
} else
{return and__3546__auto____4588;
}
})()))
{return mf.cljs$core$IMultiFn$_dispatch(mf,args);
} else
{return (function (){var or__3548__auto____4589 = (cljs.core._dispatch[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4589))
{return or__3548__auto____4589;
} else
{var or__3548__auto____4590 = (cljs.core._dispatch["_"]);

if(cljs.core.truth_(or__3548__auto____4590))
{return or__3548__auto____4590;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-dispatch",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_dispatch = (function do_dispatch(mf,dispatch_fn,args){
var dispatch_val__4591 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__4592 = cljs.core._get_method.call(null,mf,dispatch_val__4591);

if(cljs.core.truth_(target_fn__4592))
{} else
{throw (new Error(cljs.core.str.call(null,"No method in multimethod '",cljs.core.name,"' for dispatch value: ",dispatch_val__4591)));
}
return cljs.core.apply.call(null,target_fn__4592,args);
});

/**
* @constructor
*/
cljs.core.MultiFn = (function (name,dispatch_fn,default_dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
this.name = name;
this.dispatch_fn = dispatch_fn;
this.default_dispatch_val = default_dispatch_val;
this.hierarchy = hierarchy;
this.method_table = method_table;
this.prefer_table = prefer_table;
this.method_cache = method_cache;
this.cached_hierarchy = cached_hierarchy;
})
cljs.core.MultiFn.cljs$core$IPrintable$_pr_seq = (function (this__327__auto__){
return cljs.core.list.call(null,"cljs.core.MultiFn");
});
cljs.core.MultiFn.prototype.cljs$core$IHash$ = true;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = (function (this$){
var this__4593 = this;
return goog.getUid.call(null,this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = (function (mf){
var this__4594 = this;
cljs.core.swap_BANG_.call(null,this__4594.method_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4594.method_cache,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4594.prefer_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4594.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = (function (mf,dispatch_val,method){
var this__4595 = this;
cljs.core.swap_BANG_.call(null,this__4595.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__4595.method_cache,this__4595.method_table,this__4595.cached_hierarchy,this__4595.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = (function (mf,dispatch_val){
var this__4596 = this;
cljs.core.swap_BANG_.call(null,this__4596.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__4596.method_cache,this__4596.method_table,this__4596.cached_hierarchy,this__4596.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = (function (mf,dispatch_val){
var this__4597 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__4597.cached_hierarchy),cljs.core.deref.call(null,this__4597.hierarchy))))
{} else
{cljs.core.reset_cache.call(null,this__4597.method_cache,this__4597.method_table,this__4597.cached_hierarchy,this__4597.hierarchy);
}
var temp__3695__auto____4598 = cljs.core.deref.call(null,this__4597.method_cache).call(null,dispatch_val);

if(cljs.core.truth_(temp__3695__auto____4598))
{var target_fn__4599 = temp__3695__auto____4598;

return target_fn__4599;
} else
{var temp__3695__auto____4600 = cljs.core.find_and_cache_best_method.call(null,this__4597.name,dispatch_val,this__4597.hierarchy,this__4597.method_table,this__4597.prefer_table,this__4597.method_cache,this__4597.cached_hierarchy);

if(cljs.core.truth_(temp__3695__auto____4600))
{var target_fn__4601 = temp__3695__auto____4600;

return target_fn__4601;
} else
{return cljs.core.deref.call(null,this__4597.method_table).call(null,this__4597.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = (function (mf,dispatch_val_x,dispatch_val_y){
var this__4602 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__4602.prefer_table)))
{throw (new Error(cljs.core.str.call(null,"Preference conflict in multimethod '",this__4602.name,"': ",dispatch_val_y," is already preferred to ",dispatch_val_x)));
} else
{}
cljs.core.swap_BANG_.call(null,this__4602.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core.get.call(null,old,dispatch_val_x,cljs.core.set([])),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__4602.method_cache,this__4602.method_table,this__4602.cached_hierarchy,this__4602.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = (function (mf){
var this__4603 = this;
return cljs.core.deref.call(null,this__4603.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = (function (mf){
var this__4604 = this;
return cljs.core.deref.call(null,this__4604.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch = (function (mf,args){
var this__4605 = this;
return cljs.core.do_dispatch.call(null,mf,this__4605.dispatch_fn,args);
});
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = (function() { 
var G__4606__delegate = function (_,args){
return cljs.core._dispatch.call(null,this,args);
};
var G__4606 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4606__delegate.call(this, _, args);
};
G__4606.cljs$lang$maxFixedArity = 1;
G__4606.cljs$lang$applyTo = (function (arglist__4607){
var _ = cljs.core.first(arglist__4607);
var args = cljs.core.rest(arglist__4607);
return G__4606__delegate.call(this, _, args);
});
return G__4606;
})()
;
cljs.core.MultiFn.prototype.apply = (function (_,args){
return cljs.core._dispatch.call(null,this,args);
});
/**
* Removes all of the methods of multimethod.
*/
cljs.core.remove_all_methods = (function remove_all_methods(multifn){
return cljs.core._reset.call(null,multifn);
});
/**
* Removes the method of multimethod associated with dispatch-value.
*/
cljs.core.remove_method = (function remove_method(multifn,dispatch_val){
return cljs.core._remove_method.call(null,multifn,dispatch_val);
});
/**
* Causes the multimethod to prefer matches of dispatch-val-x over dispatch-val-y
* when there is a conflict
*/
cljs.core.prefer_method = (function prefer_method(multifn,dispatch_val_x,dispatch_val_y){
return cljs.core._prefer_method.call(null,multifn,dispatch_val_x,dispatch_val_y);
});
/**
* Given a multimethod, returns a map of dispatch values -> dispatch fns
*/
cljs.core.methods$ = (function methods$(multifn){
return cljs.core._methods.call(null,multifn);
});
/**
* Given a multimethod and a dispatch value, returns the dispatch fn
* that would apply to that value, or nil if none apply and no default
*/
cljs.core.get_method = (function get_method(multifn,dispatch_val){
return cljs.core._get_method.call(null,multifn,dispatch_val);
});
/**
* Given a multimethod, returns a map of preferred value -> set of other values
*/
cljs.core.prefers = (function prefers(multifn){
return cljs.core._prefers.call(null,multifn);
});
