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
var or__3548__auto____2838 = (p[goog.typeOf.call(null,x)]);

if(cljs.core.truth_(or__3548__auto____2838))
{return or__3548__auto____2838;
} else
{var or__3548__auto____2839 = (p["_"]);

if(cljs.core.truth_(or__3548__auto____2839))
{return or__3548__auto____2839;
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
return array[i];
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
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2840 = coll;

if(cljs.core.truth_(and__3546__auto____2840))
{return coll.cljs$core$ICounted$_count;
} else
{return and__3546__auto____2840;
}
})()))
{return coll.cljs$core$ICounted$_count(coll);
} else
{return (function (){var or__3548__auto____2841 = (cljs.core._count[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2841))
{return or__3548__auto____2841;
} else
{var or__3548__auto____2842 = (cljs.core._count["_"]);

if(cljs.core.truth_(or__3548__auto____2842))
{return or__3548__auto____2842;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2843 = coll;

if(cljs.core.truth_(and__3546__auto____2843))
{return coll.cljs$core$IEmptyableCollection$_empty;
} else
{return and__3546__auto____2843;
}
})()))
{return coll.cljs$core$IEmptyableCollection$_empty(coll);
} else
{return (function (){var or__3548__auto____2844 = (cljs.core._empty[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2844))
{return or__3548__auto____2844;
} else
{var or__3548__auto____2845 = (cljs.core._empty["_"]);

if(cljs.core.truth_(or__3548__auto____2845))
{return or__3548__auto____2845;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if(cljs.core.truth_((function (){var and__3546__auto____2846 = coll;

if(cljs.core.truth_(and__3546__auto____2846))
{return coll.cljs$core$ICollection$_conj;
} else
{return and__3546__auto____2846;
}
})()))
{return coll.cljs$core$ICollection$_conj(coll,o);
} else
{return (function (){var or__3548__auto____2847 = (cljs.core._conj[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2847))
{return or__3548__auto____2847;
} else
{var or__3548__auto____2848 = (cljs.core._conj["_"]);

if(cljs.core.truth_(or__3548__auto____2848))
{return or__3548__auto____2848;
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
var _nth__2855 = (function (coll,n){
if(cljs.core.truth_((function (){var and__3546__auto____2849 = coll;

if(cljs.core.truth_(and__3546__auto____2849))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____2849;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n);
} else
{return (function (){var or__3548__auto____2850 = (cljs.core._nth[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2850))
{return or__3548__auto____2850;
} else
{var or__3548__auto____2851 = (cljs.core._nth["_"]);

if(cljs.core.truth_(or__3548__auto____2851))
{return or__3548__auto____2851;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__2856 = (function (coll,n,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____2852 = coll;

if(cljs.core.truth_(and__3546__auto____2852))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____2852;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n,not_found);
} else
{return (function (){var or__3548__auto____2853 = (cljs.core._nth[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2853))
{return or__3548__auto____2853;
} else
{var or__3548__auto____2854 = (cljs.core._nth["_"]);

if(cljs.core.truth_(or__3548__auto____2854))
{return or__3548__auto____2854;
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
return _nth__2855.call(this,coll,n);
case  3 :
return _nth__2856.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _nth;
})()
;
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2858 = coll;

if(cljs.core.truth_(and__3546__auto____2858))
{return coll.cljs$core$ISeq$_first;
} else
{return and__3546__auto____2858;
}
})()))
{return coll.cljs$core$ISeq$_first(coll);
} else
{return (function (){var or__3548__auto____2859 = (cljs.core._first[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2859))
{return or__3548__auto____2859;
} else
{var or__3548__auto____2860 = (cljs.core._first["_"]);

if(cljs.core.truth_(or__3548__auto____2860))
{return or__3548__auto____2860;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2861 = coll;

if(cljs.core.truth_(and__3546__auto____2861))
{return coll.cljs$core$ISeq$_rest;
} else
{return and__3546__auto____2861;
}
})()))
{return coll.cljs$core$ISeq$_rest(coll);
} else
{return (function (){var or__3548__auto____2862 = (cljs.core._rest[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2862))
{return or__3548__auto____2862;
} else
{var or__3548__auto____2863 = (cljs.core._rest["_"]);

if(cljs.core.truth_(or__3548__auto____2863))
{return or__3548__auto____2863;
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
var _lookup__2870 = (function (o,k){
if(cljs.core.truth_((function (){var and__3546__auto____2864 = o;

if(cljs.core.truth_(and__3546__auto____2864))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____2864;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k);
} else
{return (function (){var or__3548__auto____2865 = (cljs.core._lookup[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2865))
{return or__3548__auto____2865;
} else
{var or__3548__auto____2866 = (cljs.core._lookup["_"]);

if(cljs.core.truth_(or__3548__auto____2866))
{return or__3548__auto____2866;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__2871 = (function (o,k,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____2867 = o;

if(cljs.core.truth_(and__3546__auto____2867))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____2867;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k,not_found);
} else
{return (function (){var or__3548__auto____2868 = (cljs.core._lookup[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2868))
{return or__3548__auto____2868;
} else
{var or__3548__auto____2869 = (cljs.core._lookup["_"]);

if(cljs.core.truth_(or__3548__auto____2869))
{return or__3548__auto____2869;
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
return _lookup__2870.call(this,o,k);
case  3 :
return _lookup__2871.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2873 = coll;

if(cljs.core.truth_(and__3546__auto____2873))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_;
} else
{return and__3546__auto____2873;
}
})()))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_(coll,k);
} else
{return (function (){var or__3548__auto____2874 = (cljs.core._contains_key_QMARK_[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2874))
{return or__3548__auto____2874;
} else
{var or__3548__auto____2875 = (cljs.core._contains_key_QMARK_["_"]);

if(cljs.core.truth_(or__3548__auto____2875))
{return or__3548__auto____2875;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if(cljs.core.truth_((function (){var and__3546__auto____2876 = coll;

if(cljs.core.truth_(and__3546__auto____2876))
{return coll.cljs$core$IAssociative$_assoc;
} else
{return and__3546__auto____2876;
}
})()))
{return coll.cljs$core$IAssociative$_assoc(coll,k,v);
} else
{return (function (){var or__3548__auto____2877 = (cljs.core._assoc[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2877))
{return or__3548__auto____2877;
} else
{var or__3548__auto____2878 = (cljs.core._assoc["_"]);

if(cljs.core.truth_(or__3548__auto____2878))
{return or__3548__auto____2878;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2879 = coll;

if(cljs.core.truth_(and__3546__auto____2879))
{return coll.cljs$core$IMap$_dissoc;
} else
{return and__3546__auto____2879;
}
})()))
{return coll.cljs$core$IMap$_dissoc(coll,k);
} else
{return (function (){var or__3548__auto____2880 = (cljs.core._dissoc[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2880))
{return or__3548__auto____2880;
} else
{var or__3548__auto____2881 = (cljs.core._dissoc["_"]);

if(cljs.core.truth_(or__3548__auto____2881))
{return or__3548__auto____2881;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if(cljs.core.truth_((function (){var and__3546__auto____2882 = coll;

if(cljs.core.truth_(and__3546__auto____2882))
{return coll.cljs$core$ISet$_disjoin;
} else
{return and__3546__auto____2882;
}
})()))
{return coll.cljs$core$ISet$_disjoin(coll,v);
} else
{return (function (){var or__3548__auto____2883 = (cljs.core._disjoin[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2883))
{return or__3548__auto____2883;
} else
{var or__3548__auto____2884 = (cljs.core._disjoin["_"]);

if(cljs.core.truth_(or__3548__auto____2884))
{return or__3548__auto____2884;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2885 = coll;

if(cljs.core.truth_(and__3546__auto____2885))
{return coll.cljs$core$IStack$_peek;
} else
{return and__3546__auto____2885;
}
})()))
{return coll.cljs$core$IStack$_peek(coll);
} else
{return (function (){var or__3548__auto____2886 = (cljs.core._peek[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2886))
{return or__3548__auto____2886;
} else
{var or__3548__auto____2887 = (cljs.core._peek["_"]);

if(cljs.core.truth_(or__3548__auto____2887))
{return or__3548__auto____2887;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2888 = coll;

if(cljs.core.truth_(and__3546__auto____2888))
{return coll.cljs$core$IStack$_pop;
} else
{return and__3546__auto____2888;
}
})()))
{return coll.cljs$core$IStack$_pop(coll);
} else
{return (function (){var or__3548__auto____2889 = (cljs.core._pop[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2889))
{return or__3548__auto____2889;
} else
{var or__3548__auto____2890 = (cljs.core._pop["_"]);

if(cljs.core.truth_(or__3548__auto____2890))
{return or__3548__auto____2890;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if(cljs.core.truth_((function (){var and__3546__auto____2891 = coll;

if(cljs.core.truth_(and__3546__auto____2891))
{return coll.cljs$core$IVector$_assoc_n;
} else
{return and__3546__auto____2891;
}
})()))
{return coll.cljs$core$IVector$_assoc_n(coll,n,val);
} else
{return (function (){var or__3548__auto____2892 = (cljs.core._assoc_n[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2892))
{return or__3548__auto____2892;
} else
{var or__3548__auto____2893 = (cljs.core._assoc_n["_"]);

if(cljs.core.truth_(or__3548__auto____2893))
{return or__3548__auto____2893;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if(cljs.core.truth_((function (){var and__3546__auto____2894 = o;

if(cljs.core.truth_(and__3546__auto____2894))
{return o.cljs$core$IDeref$_deref;
} else
{return and__3546__auto____2894;
}
})()))
{return o.cljs$core$IDeref$_deref(o);
} else
{return (function (){var or__3548__auto____2895 = (cljs.core._deref[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2895))
{return or__3548__auto____2895;
} else
{var or__3548__auto____2896 = (cljs.core._deref["_"]);

if(cljs.core.truth_(or__3548__auto____2896))
{return or__3548__auto____2896;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if(cljs.core.truth_((function (){var and__3546__auto____2897 = o;

if(cljs.core.truth_(and__3546__auto____2897))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout;
} else
{return and__3546__auto____2897;
}
})()))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout(o,msec,timeout_val);
} else
{return (function (){var or__3548__auto____2898 = (cljs.core._deref_with_timeout[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2898))
{return or__3548__auto____2898;
} else
{var or__3548__auto____2899 = (cljs.core._deref_with_timeout["_"]);

if(cljs.core.truth_(or__3548__auto____2899))
{return or__3548__auto____2899;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if(cljs.core.truth_((function (){var and__3546__auto____2900 = o;

if(cljs.core.truth_(and__3546__auto____2900))
{return o.cljs$core$IMeta$_meta;
} else
{return and__3546__auto____2900;
}
})()))
{return o.cljs$core$IMeta$_meta(o);
} else
{return (function (){var or__3548__auto____2901 = (cljs.core._meta[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2901))
{return or__3548__auto____2901;
} else
{var or__3548__auto____2902 = (cljs.core._meta["_"]);

if(cljs.core.truth_(or__3548__auto____2902))
{return or__3548__auto____2902;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if(cljs.core.truth_((function (){var and__3546__auto____2903 = o;

if(cljs.core.truth_(and__3546__auto____2903))
{return o.cljs$core$IWithMeta$_with_meta;
} else
{return and__3546__auto____2903;
}
})()))
{return o.cljs$core$IWithMeta$_with_meta(o,meta);
} else
{return (function (){var or__3548__auto____2904 = (cljs.core._with_meta[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2904))
{return or__3548__auto____2904;
} else
{var or__3548__auto____2905 = (cljs.core._with_meta["_"]);

if(cljs.core.truth_(or__3548__auto____2905))
{return or__3548__auto____2905;
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
var _reduce__2912 = (function (coll,f){
if(cljs.core.truth_((function (){var and__3546__auto____2906 = coll;

if(cljs.core.truth_(and__3546__auto____2906))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____2906;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f);
} else
{return (function (){var or__3548__auto____2907 = (cljs.core._reduce[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2907))
{return or__3548__auto____2907;
} else
{var or__3548__auto____2908 = (cljs.core._reduce["_"]);

if(cljs.core.truth_(or__3548__auto____2908))
{return or__3548__auto____2908;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__2913 = (function (coll,f,start){
if(cljs.core.truth_((function (){var and__3546__auto____2909 = coll;

if(cljs.core.truth_(and__3546__auto____2909))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____2909;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f,start);
} else
{return (function (){var or__3548__auto____2910 = (cljs.core._reduce[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2910))
{return or__3548__auto____2910;
} else
{var or__3548__auto____2911 = (cljs.core._reduce["_"]);

if(cljs.core.truth_(or__3548__auto____2911))
{return or__3548__auto____2911;
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
return _reduce__2912.call(this,coll,f);
case  3 :
return _reduce__2913.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return _reduce;
})()
;
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if(cljs.core.truth_((function (){var and__3546__auto____2915 = o;

if(cljs.core.truth_(and__3546__auto____2915))
{return o.cljs$core$IEquiv$_equiv;
} else
{return and__3546__auto____2915;
}
})()))
{return o.cljs$core$IEquiv$_equiv(o,other);
} else
{return (function (){var or__3548__auto____2916 = (cljs.core._equiv[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2916))
{return or__3548__auto____2916;
} else
{var or__3548__auto____2917 = (cljs.core._equiv["_"]);

if(cljs.core.truth_(or__3548__auto____2917))
{return or__3548__auto____2917;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if(cljs.core.truth_((function (){var and__3546__auto____2918 = o;

if(cljs.core.truth_(and__3546__auto____2918))
{return o.cljs$core$IHash$_hash;
} else
{return and__3546__auto____2918;
}
})()))
{return o.cljs$core$IHash$_hash(o);
} else
{return (function (){var or__3548__auto____2919 = (cljs.core._hash[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2919))
{return or__3548__auto____2919;
} else
{var or__3548__auto____2920 = (cljs.core._hash["_"]);

if(cljs.core.truth_(or__3548__auto____2920))
{return or__3548__auto____2920;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if(cljs.core.truth_((function (){var and__3546__auto____2921 = o;

if(cljs.core.truth_(and__3546__auto____2921))
{return o.cljs$core$ISeqable$_seq;
} else
{return and__3546__auto____2921;
}
})()))
{return o.cljs$core$ISeqable$_seq(o);
} else
{return (function (){var or__3548__auto____2922 = (cljs.core._seq[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2922))
{return or__3548__auto____2922;
} else
{var or__3548__auto____2923 = (cljs.core._seq["_"]);

if(cljs.core.truth_(or__3548__auto____2923))
{return or__3548__auto____2923;
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
if(cljs.core.truth_((function (){var and__3546__auto____2924 = o;

if(cljs.core.truth_(and__3546__auto____2924))
{return o.cljs$core$IPrintable$_pr_seq;
} else
{return and__3546__auto____2924;
}
})()))
{return o.cljs$core$IPrintable$_pr_seq(o,opts);
} else
{return (function (){var or__3548__auto____2925 = (cljs.core._pr_seq[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2925))
{return or__3548__auto____2925;
} else
{var or__3548__auto____2926 = (cljs.core._pr_seq["_"]);

if(cljs.core.truth_(or__3548__auto____2926))
{return or__3548__auto____2926;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if(cljs.core.truth_((function (){var and__3546__auto____2927 = d;

if(cljs.core.truth_(and__3546__auto____2927))
{return d.cljs$core$IPending$_realized_QMARK_;
} else
{return and__3546__auto____2927;
}
})()))
{return d.cljs$core$IPending$_realized_QMARK_(d);
} else
{return (function (){var or__3548__auto____2928 = (cljs.core._realized_QMARK_[goog.typeOf.call(null,d)]);

if(cljs.core.truth_(or__3548__auto____2928))
{return or__3548__auto____2928;
} else
{var or__3548__auto____2929 = (cljs.core._realized_QMARK_["_"]);

if(cljs.core.truth_(or__3548__auto____2929))
{return or__3548__auto____2929;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if(cljs.core.truth_((function (){var and__3546__auto____2930 = this$;

if(cljs.core.truth_(and__3546__auto____2930))
{return this$.cljs$core$IWatchable$_notify_watches;
} else
{return and__3546__auto____2930;
}
})()))
{return this$.cljs$core$IWatchable$_notify_watches(this$,oldval,newval);
} else
{return (function (){var or__3548__auto____2931 = (cljs.core._notify_watches[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2931))
{return or__3548__auto____2931;
} else
{var or__3548__auto____2932 = (cljs.core._notify_watches["_"]);

if(cljs.core.truth_(or__3548__auto____2932))
{return or__3548__auto____2932;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if(cljs.core.truth_((function (){var and__3546__auto____2933 = this$;

if(cljs.core.truth_(and__3546__auto____2933))
{return this$.cljs$core$IWatchable$_add_watch;
} else
{return and__3546__auto____2933;
}
})()))
{return this$.cljs$core$IWatchable$_add_watch(this$,key,f);
} else
{return (function (){var or__3548__auto____2934 = (cljs.core._add_watch[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2934))
{return or__3548__auto____2934;
} else
{var or__3548__auto____2935 = (cljs.core._add_watch["_"]);

if(cljs.core.truth_(or__3548__auto____2935))
{return or__3548__auto____2935;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if(cljs.core.truth_((function (){var and__3546__auto____2936 = this$;

if(cljs.core.truth_(and__3546__auto____2936))
{return this$.cljs$core$IWatchable$_remove_watch;
} else
{return and__3546__auto____2936;
}
})()))
{return this$.cljs$core$IWatchable$_remove_watch(this$,key);
} else
{return (function (){var or__3548__auto____2937 = (cljs.core._remove_watch[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2937))
{return or__3548__auto____2937;
} else
{var or__3548__auto____2938 = (cljs.core._remove_watch["_"]);

if(cljs.core.truth_(or__3548__auto____2938))
{return or__3548__auto____2938;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
cljs.core._EQ_ = (function _EQ_(x,y){
return cljs.core._equiv.call(null,x,y);
});
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return (x === null);
});
(cljs.core.IHash["null"] = true);
(cljs.core._hash["null"] = (function (o){
return 0;
}));
(cljs.core.ILookup["null"] = true);
(cljs.core._lookup["null"] = (function() {
var G__2939 = null;
var G__2939__2940 = (function (o,k){
return null;
});
var G__2939__2941 = (function (o,k,not_found){
return not_found;
});
G__2939 = function(o,k,not_found){
switch(arguments.length){
case  2 :
return G__2939__2940.call(this,o,k);
case  3 :
return G__2939__2941.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2939;
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
var G__2943 = null;
var G__2943__2944 = (function (_,f){
return f.call(null);
});
var G__2943__2945 = (function (_,f,start){
return start;
});
G__2943 = function(_,f,start){
switch(arguments.length){
case  2 :
return G__2943__2944.call(this,_,f);
case  3 :
return G__2943__2945.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2943;
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
var G__2947 = null;
var G__2947__2948 = (function (_,n){
return null;
});
var G__2947__2949 = (function (_,n,not_found){
return not_found;
});
G__2947 = function(_,n,not_found){
switch(arguments.length){
case  2 :
return G__2947__2948.call(this,_,n);
case  3 :
return G__2947__2949.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2947;
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
var ci_reduce__2957 = (function (cicoll,f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,cljs.core._count.call(null,cicoll))))
{return f.call(null);
} else
{var val__2951 = cljs.core._nth.call(null,cicoll,0);
var n__2952 = 1;

while(true){
if(cljs.core.truth_((n__2952 < cljs.core._count.call(null,cicoll))))
{{
var G__2961 = f.call(null,val__2951,cljs.core._nth.call(null,cicoll,n__2952));
var G__2962 = (n__2952 + 1);
val__2951 = G__2961;
n__2952 = G__2962;
continue;
}
} else
{return val__2951;
}
break;
}
}
});
var ci_reduce__2958 = (function (cicoll,f,val){
var val__2953 = val;
var n__2954 = 0;

while(true){
if(cljs.core.truth_((n__2954 < cljs.core._count.call(null,cicoll))))
{{
var G__2963 = f.call(null,val__2953,cljs.core._nth.call(null,cicoll,n__2954));
var G__2964 = (n__2954 + 1);
val__2953 = G__2963;
n__2954 = G__2964;
continue;
}
} else
{return val__2953;
}
break;
}
});
var ci_reduce__2959 = (function (cicoll,f,val,idx){
var val__2955 = val;
var n__2956 = idx;

while(true){
if(cljs.core.truth_((n__2956 < cljs.core._count.call(null,cicoll))))
{{
var G__2965 = f.call(null,val__2955,cljs.core._nth.call(null,cicoll,n__2956));
var G__2966 = (n__2956 + 1);
val__2955 = G__2965;
n__2956 = G__2966;
continue;
}
} else
{return val__2955;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case  2 :
return ci_reduce__2957.call(this,cicoll,f);
case  3 :
return ci_reduce__2958.call(this,cicoll,f,val);
case  4 :
return ci_reduce__2959.call(this,cicoll,f,val,idx);
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
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2967 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = (function() {
var G__2980 = null;
var G__2980__2981 = (function (coll,f){
var this__2968 = this;
return cljs.core.ci_reduce.call(null,coll,f,(this__2968.a[this__2968.i]),(this__2968.i + 1));
});
var G__2980__2982 = (function (coll,f,start){
var this__2969 = this;
return cljs.core.ci_reduce.call(null,coll,f,start,this__2969.i);
});
G__2980 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__2980__2981.call(this,coll,f);
case  3 :
return G__2980__2982.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2980;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2970 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2971 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = (function() {
var G__2984 = null;
var G__2984__2985 = (function (coll,n){
var this__2972 = this;
var i__2973 = (n + this__2972.i);

if(cljs.core.truth_((i__2973 < this__2972.a.length)))
{return (this__2972.a[i__2973]);
} else
{return null;
}
});
var G__2984__2986 = (function (coll,n,not_found){
var this__2974 = this;
var i__2975 = (n + this__2974.i);

if(cljs.core.truth_((i__2975 < this__2974.a.length)))
{return (this__2974.a[i__2975]);
} else
{return not_found;
}
});
G__2984 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__2984__2985.call(this,coll,n);
case  3 :
return G__2984__2986.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2984;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = (function (_){
var this__2976 = this;
return (this__2976.a.length - this__2976.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = (function (_){
var this__2977 = this;
return (this__2977.a[this__2977.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = (function (_){
var this__2978 = this;
if(cljs.core.truth_(((this__2978.i + 1) < this__2978.a.length)))
{return (new cljs.core.IndexedSeq(this__2978.a,(this__2978.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = (function (this$){
var this__2979 = this;
return this$;
});
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
var G__2988 = null;
var G__2988__2989 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__2988__2990 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__2988 = function(array,f,start){
switch(arguments.length){
case  2 :
return G__2988__2989.call(this,array,f);
case  3 :
return G__2988__2990.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2988;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__2992 = null;
var G__2992__2993 = (function (array,k){
return (array[k]);
});
var G__2992__2994 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__2992 = function(array,k,not_found){
switch(arguments.length){
case  2 :
return G__2992__2993.call(this,array,k);
case  3 :
return G__2992__2994.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2992;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__2996 = null;
var G__2996__2997 = (function (array,n){
if(cljs.core.truth_((n < array.length)))
{return (array[n]);
} else
{return null;
}
});
var G__2996__2998 = (function (array,n,not_found){
if(cljs.core.truth_((n < array.length)))
{return (array[n]);
} else
{return not_found;
}
});
G__2996 = function(array,n,not_found){
switch(arguments.length){
case  2 :
return G__2996__2997.call(this,array,n);
case  3 :
return G__2996__2998.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2996;
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
var temp__3698__auto____3000 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3000))
{var s__3001 = temp__3698__auto____3000;

return cljs.core._first.call(null,s__3001);
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
var G__3002 = cljs.core.next.call(null,s);
s = G__3002;
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
var s__3003 = cljs.core.seq.call(null,x);
var n__3004 = 0;

while(true){
if(cljs.core.truth_(s__3003))
{{
var G__3005 = cljs.core.next.call(null,s__3003);
var G__3006 = (n__3004 + 1);
s__3003 = G__3005;
n__3004 = G__3006;
continue;
}
} else
{return n__3004;
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
var conj__3007 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__3008 = (function() { 
var G__3010__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__3011 = conj.call(null,coll,x);
var G__3012 = cljs.core.first.call(null,xs);
var G__3013 = cljs.core.next.call(null,xs);
coll = G__3011;
x = G__3012;
xs = G__3013;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__3010 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3010__delegate.call(this, coll, x, xs);
};
G__3010.cljs$lang$maxFixedArity = 2;
G__3010.cljs$lang$applyTo = (function (arglist__3014){
var coll = cljs.core.first(arglist__3014);
var x = cljs.core.first(cljs.core.next(arglist__3014));
var xs = cljs.core.rest(cljs.core.next(arglist__3014));
return G__3010__delegate.call(this, coll, x, xs);
});
return G__3010;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case  2 :
return conj__3007.call(this,coll,x);
default:
return conj__3008.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__3008.cljs$lang$applyTo;
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
var nth__3015 = (function (coll,n){
return cljs.core._nth.call(null,coll,Math.floor(n));
});
var nth__3016 = (function (coll,n,not_found){
return cljs.core._nth.call(null,coll,Math.floor(n),not_found);
});
nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return nth__3015.call(this,coll,n);
case  3 :
return nth__3016.call(this,coll,n,not_found);
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
var get__3018 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__3019 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case  2 :
return get__3018.call(this,o,k);
case  3 :
return get__3019.call(this,o,k,not_found);
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
var assoc__3022 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__3023 = (function() { 
var G__3025__delegate = function (coll,k,v,kvs){
while(true){
var ret__3021 = assoc.call(null,coll,k,v);

if(cljs.core.truth_(kvs))
{{
var G__3026 = ret__3021;
var G__3027 = cljs.core.first.call(null,kvs);
var G__3028 = cljs.core.second.call(null,kvs);
var G__3029 = cljs.core.nnext.call(null,kvs);
coll = G__3026;
k = G__3027;
v = G__3028;
kvs = G__3029;
continue;
}
} else
{return ret__3021;
}
break;
}
};
var G__3025 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3025__delegate.call(this, coll, k, v, kvs);
};
G__3025.cljs$lang$maxFixedArity = 3;
G__3025.cljs$lang$applyTo = (function (arglist__3030){
var coll = cljs.core.first(arglist__3030);
var k = cljs.core.first(cljs.core.next(arglist__3030));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3030)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3030)));
return G__3025__delegate.call(this, coll, k, v, kvs);
});
return G__3025;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case  3 :
return assoc__3022.call(this,coll,k,v);
default:
return assoc__3023.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__3023.cljs$lang$applyTo;
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
var dissoc__3032 = (function (coll){
return coll;
});
var dissoc__3033 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__3034 = (function() { 
var G__3036__delegate = function (coll,k,ks){
while(true){
var ret__3031 = dissoc.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__3037 = ret__3031;
var G__3038 = cljs.core.first.call(null,ks);
var G__3039 = cljs.core.next.call(null,ks);
coll = G__3037;
k = G__3038;
ks = G__3039;
continue;
}
} else
{return ret__3031;
}
break;
}
};
var G__3036 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3036__delegate.call(this, coll, k, ks);
};
G__3036.cljs$lang$maxFixedArity = 2;
G__3036.cljs$lang$applyTo = (function (arglist__3040){
var coll = cljs.core.first(arglist__3040);
var k = cljs.core.first(cljs.core.next(arglist__3040));
var ks = cljs.core.rest(cljs.core.next(arglist__3040));
return G__3036__delegate.call(this, coll, k, ks);
});
return G__3036;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return dissoc__3032.call(this,coll);
case  2 :
return dissoc__3033.call(this,coll,k);
default:
return dissoc__3034.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__3034.cljs$lang$applyTo;
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
if(cljs.core.truth_((function (){var x__417__auto____3041 = o;

if(cljs.core.truth_((function (){var and__3546__auto____3042 = x__417__auto____3041;

if(cljs.core.truth_(and__3546__auto____3042))
{var and__3546__auto____3043 = x__417__auto____3041.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____3043))
{return cljs.core.not.call(null,x__417__auto____3041.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____3043;
}
} else
{return and__3546__auto____3042;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__417__auto____3041);
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
var disj__3045 = (function (coll){
return coll;
});
var disj__3046 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__3047 = (function() { 
var G__3049__delegate = function (coll,k,ks){
while(true){
var ret__3044 = disj.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__3050 = ret__3044;
var G__3051 = cljs.core.first.call(null,ks);
var G__3052 = cljs.core.next.call(null,ks);
coll = G__3050;
k = G__3051;
ks = G__3052;
continue;
}
} else
{return ret__3044;
}
break;
}
};
var G__3049 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3049__delegate.call(this, coll, k, ks);
};
G__3049.cljs$lang$maxFixedArity = 2;
G__3049.cljs$lang$applyTo = (function (arglist__3053){
var coll = cljs.core.first(arglist__3053);
var k = cljs.core.first(cljs.core.next(arglist__3053));
var ks = cljs.core.rest(cljs.core.next(arglist__3053));
return G__3049__delegate.call(this, coll, k, ks);
});
return G__3049;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return disj__3045.call(this,coll);
case  2 :
return disj__3046.call(this,coll,k);
default:
return disj__3047.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__3047.cljs$lang$applyTo;
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
{var x__417__auto____3054 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3055 = x__417__auto____3054;

if(cljs.core.truth_(and__3546__auto____3055))
{var and__3546__auto____3056 = x__417__auto____3054.cljs$core$ICollection$;

if(cljs.core.truth_(and__3546__auto____3056))
{return cljs.core.not.call(null,x__417__auto____3054.hasOwnProperty("cljs$core$ICollection$"));
} else
{return and__3546__auto____3056;
}
} else
{return and__3546__auto____3055;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,x__417__auto____3054);
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
{var x__417__auto____3057 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3058 = x__417__auto____3057;

if(cljs.core.truth_(and__3546__auto____3058))
{var and__3546__auto____3059 = x__417__auto____3057.cljs$core$ISet$;

if(cljs.core.truth_(and__3546__auto____3059))
{return cljs.core.not.call(null,x__417__auto____3057.hasOwnProperty("cljs$core$ISet$"));
} else
{return and__3546__auto____3059;
}
} else
{return and__3546__auto____3058;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,x__417__auto____3057);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var x__417__auto____3060 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3061 = x__417__auto____3060;

if(cljs.core.truth_(and__3546__auto____3061))
{var and__3546__auto____3062 = x__417__auto____3060.cljs$core$IAssociative$;

if(cljs.core.truth_(and__3546__auto____3062))
{return cljs.core.not.call(null,x__417__auto____3060.hasOwnProperty("cljs$core$IAssociative$"));
} else
{return and__3546__auto____3062;
}
} else
{return and__3546__auto____3061;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,x__417__auto____3060);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var x__417__auto____3063 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3064 = x__417__auto____3063;

if(cljs.core.truth_(and__3546__auto____3064))
{var and__3546__auto____3065 = x__417__auto____3063.cljs$core$ISequential$;

if(cljs.core.truth_(and__3546__auto____3065))
{return cljs.core.not.call(null,x__417__auto____3063.hasOwnProperty("cljs$core$ISequential$"));
} else
{return and__3546__auto____3065;
}
} else
{return and__3546__auto____3064;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,x__417__auto____3063);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var x__417__auto____3066 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3067 = x__417__auto____3066;

if(cljs.core.truth_(and__3546__auto____3067))
{var and__3546__auto____3068 = x__417__auto____3066.cljs$core$ICounted$;

if(cljs.core.truth_(and__3546__auto____3068))
{return cljs.core.not.call(null,x__417__auto____3066.hasOwnProperty("cljs$core$ICounted$"));
} else
{return and__3546__auto____3068;
}
} else
{return and__3546__auto____3067;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,x__417__auto____3066);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__417__auto____3069 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3070 = x__417__auto____3069;

if(cljs.core.truth_(and__3546__auto____3070))
{var and__3546__auto____3071 = x__417__auto____3069.cljs$core$IMap$;

if(cljs.core.truth_(and__3546__auto____3071))
{return cljs.core.not.call(null,x__417__auto____3069.hasOwnProperty("cljs$core$IMap$"));
} else
{return and__3546__auto____3071;
}
} else
{return and__3546__auto____3070;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,x__417__auto____3069);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var x__417__auto____3072 = x;

if(cljs.core.truth_((function (){var and__3546__auto____3073 = x__417__auto____3072;

if(cljs.core.truth_(and__3546__auto____3073))
{var and__3546__auto____3074 = x__417__auto____3072.cljs$core$IVector$;

if(cljs.core.truth_(and__3546__auto____3074))
{return cljs.core.not.call(null,x__417__auto____3072.hasOwnProperty("cljs$core$IVector$"));
} else
{return and__3546__auto____3074;
}
} else
{return and__3546__auto____3073;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,x__417__auto____3072);
}
});
cljs.core.js_obj = (function js_obj(){
return {};
});
cljs.core.js_keys = (function js_keys(obj){
var keys__3075 = cljs.core.array.call(null);

goog.object.forEach.call(null,obj,(function (val,key,obj){
return keys__3075.push(key);
}));
return keys__3075;
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
{var x__417__auto____3076 = s;

if(cljs.core.truth_((function (){var and__3546__auto____3077 = x__417__auto____3076;

if(cljs.core.truth_(and__3546__auto____3077))
{var and__3546__auto____3078 = x__417__auto____3076.cljs$core$ISeq$;

if(cljs.core.truth_(and__3546__auto____3078))
{return cljs.core.not.call(null,x__417__auto____3076.hasOwnProperty("cljs$core$ISeq$"));
} else
{return and__3546__auto____3078;
}
} else
{return and__3546__auto____3077;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,x__417__auto____3076);
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
var and__3546__auto____3079 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____3079))
{return cljs.core.not.call(null,(function (){var or__3548__auto____3080 = cljs.core._EQ_.call(null,x.charAt(0),"﷐");

if(cljs.core.truth_(or__3548__auto____3080))
{return or__3548__auto____3080;
} else
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
}
})());
} else
{return and__3546__auto____3079;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3546__auto____3081 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____3081))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷐");
} else
{return and__3546__auto____3081;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3546__auto____3082 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____3082))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
} else
{return and__3546__auto____3082;
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
var and__3546__auto____3083 = cljs.core.number_QMARK_.call(null,n);

if(cljs.core.truth_(and__3546__auto____3083))
{return (n == n.toFixed());
} else
{return and__3546__auto____3083;
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
if(cljs.core.truth_((function (){var and__3546__auto____3084 = coll;

if(cljs.core.truth_(and__3546__auto____3084))
{var and__3546__auto____3085 = cljs.core.associative_QMARK_.call(null,coll);

if(cljs.core.truth_(and__3546__auto____3085))
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3546__auto____3085;
}
} else
{return and__3546__auto____3084;
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
var distinct_QMARK___3090 = (function (x){
return true;
});
var distinct_QMARK___3091 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___3092 = (function() { 
var G__3094__delegate = function (x,y,more){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y))))
{var s__3086 = cljs.core.set([y,x]);
var xs__3087 = more;

while(true){
var x__3088 = cljs.core.first.call(null,xs__3087);
var etc__3089 = cljs.core.next.call(null,xs__3087);

if(cljs.core.truth_(xs__3087))
{if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,s__3086,x__3088)))
{return false;
} else
{{
var G__3095 = cljs.core.conj.call(null,s__3086,x__3088);
var G__3096 = etc__3089;
s__3086 = G__3095;
xs__3087 = G__3096;
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
var G__3094 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3094__delegate.call(this, x, y, more);
};
G__3094.cljs$lang$maxFixedArity = 2;
G__3094.cljs$lang$applyTo = (function (arglist__3097){
var x = cljs.core.first(arglist__3097);
var y = cljs.core.first(cljs.core.next(arglist__3097));
var more = cljs.core.rest(cljs.core.next(arglist__3097));
return G__3094__delegate.call(this, x, y, more);
});
return G__3094;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return distinct_QMARK___3090.call(this,x);
case  2 :
return distinct_QMARK___3091.call(this,x,y);
default:
return distinct_QMARK___3092.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3092.cljs$lang$applyTo;
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
var r__3098 = f.call(null,x,y);

if(cljs.core.truth_(cljs.core.number_QMARK_.call(null,r__3098)))
{return r__3098;
} else
{if(cljs.core.truth_(r__3098))
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
var sort__3100 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__3101 = (function (comp,coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var a__3099 = cljs.core.to_array.call(null,coll);

goog.array.stableSort.call(null,a__3099,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__3099);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case  1 :
return sort__3100.call(this,comp);
case  2 :
return sort__3101.call(this,comp,coll);
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
var sort_by__3103 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__3104 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case  2 :
return sort_by__3103.call(this,keyfn,comp);
case  3 :
return sort_by__3104.call(this,keyfn,comp,coll);
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
var reduce__3106 = (function (f,coll){
return cljs.core._reduce.call(null,coll,f);
});
var reduce__3107 = (function (f,val,coll){
return cljs.core._reduce.call(null,coll,f,val);
});
reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return reduce__3106.call(this,f,val);
case  3 :
return reduce__3107.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reduce;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__3113 = (function (f,coll){
var temp__3695__auto____3109 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3109))
{var s__3110 = temp__3695__auto____3109;

return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__3110),cljs.core.next.call(null,s__3110));
} else
{return f.call(null);
}
});
var seq_reduce__3114 = (function (f,val,coll){
var val__3111 = val;
var coll__3112 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_(coll__3112))
{{
var G__3116 = f.call(null,val__3111,cljs.core.first.call(null,coll__3112));
var G__3117 = cljs.core.next.call(null,coll__3112);
val__3111 = G__3116;
coll__3112 = G__3117;
continue;
}
} else
{return val__3111;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return seq_reduce__3113.call(this,f,val);
case  3 :
return seq_reduce__3114.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return seq_reduce;
})()
;
(cljs.core.IReduce["_"] = true);
(cljs.core._reduce["_"] = (function() {
var G__3118 = null;
var G__3118__3119 = (function (coll,f){
return cljs.core.seq_reduce.call(null,f,coll);
});
var G__3118__3120 = (function (coll,f,start){
return cljs.core.seq_reduce.call(null,f,start,coll);
});
G__3118 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__3118__3119.call(this,coll,f);
case  3 :
return G__3118__3120.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3118;
})()
);
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___3122 = (function (){
return 0;
});
var _PLUS___3123 = (function (x){
return x;
});
var _PLUS___3124 = (function (x,y){
return (x + y);
});
var _PLUS___3125 = (function() { 
var G__3127__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,_PLUS_.call(null,x,y),more);
};
var G__3127 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3127__delegate.call(this, x, y, more);
};
G__3127.cljs$lang$maxFixedArity = 2;
G__3127.cljs$lang$applyTo = (function (arglist__3128){
var x = cljs.core.first(arglist__3128);
var y = cljs.core.first(cljs.core.next(arglist__3128));
var more = cljs.core.rest(cljs.core.next(arglist__3128));
return G__3127__delegate.call(this, x, y, more);
});
return G__3127;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _PLUS___3122.call(this);
case  1 :
return _PLUS___3123.call(this,x);
case  2 :
return _PLUS___3124.call(this,x,y);
default:
return _PLUS___3125.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___3125.cljs$lang$applyTo;
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
var ___3129 = (function (x){
return (- x);
});
var ___3130 = (function (x,y){
return (x - y);
});
var ___3131 = (function() { 
var G__3133__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,_.call(null,x,y),more);
};
var G__3133 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3133__delegate.call(this, x, y, more);
};
G__3133.cljs$lang$maxFixedArity = 2;
G__3133.cljs$lang$applyTo = (function (arglist__3134){
var x = cljs.core.first(arglist__3134);
var y = cljs.core.first(cljs.core.next(arglist__3134));
var more = cljs.core.rest(cljs.core.next(arglist__3134));
return G__3133__delegate.call(this, x, y, more);
});
return G__3133;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return ___3129.call(this,x);
case  2 :
return ___3130.call(this,x,y);
default:
return ___3131.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___3131.cljs$lang$applyTo;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___3135 = (function (){
return 1;
});
var _STAR___3136 = (function (x){
return x;
});
var _STAR___3137 = (function (x,y){
return (x * y);
});
var _STAR___3138 = (function() { 
var G__3140__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,_STAR_.call(null,x,y),more);
};
var G__3140 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3140__delegate.call(this, x, y, more);
};
G__3140.cljs$lang$maxFixedArity = 2;
G__3140.cljs$lang$applyTo = (function (arglist__3141){
var x = cljs.core.first(arglist__3141);
var y = cljs.core.first(cljs.core.next(arglist__3141));
var more = cljs.core.rest(cljs.core.next(arglist__3141));
return G__3140__delegate.call(this, x, y, more);
});
return G__3140;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _STAR___3135.call(this);
case  1 :
return _STAR___3136.call(this,x);
case  2 :
return _STAR___3137.call(this,x,y);
default:
return _STAR___3138.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___3138.cljs$lang$applyTo;
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
var _SLASH___3142 = (function (x){
return (1 / x);
});
var _SLASH___3143 = (function (x,y){
return (x / y);
});
var _SLASH___3144 = (function() { 
var G__3146__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__3146 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3146__delegate.call(this, x, y, more);
};
G__3146.cljs$lang$maxFixedArity = 2;
G__3146.cljs$lang$applyTo = (function (arglist__3147){
var x = cljs.core.first(arglist__3147);
var y = cljs.core.first(cljs.core.next(arglist__3147));
var more = cljs.core.rest(cljs.core.next(arglist__3147));
return G__3146__delegate.call(this, x, y, more);
});
return G__3146;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _SLASH___3142.call(this,x);
case  2 :
return _SLASH___3143.call(this,x,y);
default:
return _SLASH___3144.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___3144.cljs$lang$applyTo;
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
var _LT___3148 = (function (x){
return true;
});
var _LT___3149 = (function (x,y){
return (x < y);
});
var _LT___3150 = (function() { 
var G__3152__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_LT_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3153 = y;
var G__3154 = cljs.core.first.call(null,more);
var G__3155 = cljs.core.next.call(null,more);
x = G__3153;
y = G__3154;
more = G__3155;
continue;
}
} else
{return _LT_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3152 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3152__delegate.call(this, x, y, more);
};
G__3152.cljs$lang$maxFixedArity = 2;
G__3152.cljs$lang$applyTo = (function (arglist__3156){
var x = cljs.core.first(arglist__3156);
var y = cljs.core.first(cljs.core.next(arglist__3156));
var more = cljs.core.rest(cljs.core.next(arglist__3156));
return G__3152__delegate.call(this, x, y, more);
});
return G__3152;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT___3148.call(this,x);
case  2 :
return _LT___3149.call(this,x,y);
default:
return _LT___3150.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___3150.cljs$lang$applyTo;
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
var _LT__EQ___3157 = (function (x){
return true;
});
var _LT__EQ___3158 = (function (x,y){
return (x <= y);
});
var _LT__EQ___3159 = (function() { 
var G__3161__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_LT__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3162 = y;
var G__3163 = cljs.core.first.call(null,more);
var G__3164 = cljs.core.next.call(null,more);
x = G__3162;
y = G__3163;
more = G__3164;
continue;
}
} else
{return _LT__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3161 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3161__delegate.call(this, x, y, more);
};
G__3161.cljs$lang$maxFixedArity = 2;
G__3161.cljs$lang$applyTo = (function (arglist__3165){
var x = cljs.core.first(arglist__3165);
var y = cljs.core.first(cljs.core.next(arglist__3165));
var more = cljs.core.rest(cljs.core.next(arglist__3165));
return G__3161__delegate.call(this, x, y, more);
});
return G__3161;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT__EQ___3157.call(this,x);
case  2 :
return _LT__EQ___3158.call(this,x,y);
default:
return _LT__EQ___3159.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___3159.cljs$lang$applyTo;
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
var _GT___3166 = (function (x){
return true;
});
var _GT___3167 = (function (x,y){
return (x > y);
});
var _GT___3168 = (function() { 
var G__3170__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_GT_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3171 = y;
var G__3172 = cljs.core.first.call(null,more);
var G__3173 = cljs.core.next.call(null,more);
x = G__3171;
y = G__3172;
more = G__3173;
continue;
}
} else
{return _GT_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3170 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3170__delegate.call(this, x, y, more);
};
G__3170.cljs$lang$maxFixedArity = 2;
G__3170.cljs$lang$applyTo = (function (arglist__3174){
var x = cljs.core.first(arglist__3174);
var y = cljs.core.first(cljs.core.next(arglist__3174));
var more = cljs.core.rest(cljs.core.next(arglist__3174));
return G__3170__delegate.call(this, x, y, more);
});
return G__3170;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT___3166.call(this,x);
case  2 :
return _GT___3167.call(this,x,y);
default:
return _GT___3168.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___3168.cljs$lang$applyTo;
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
var _GT__EQ___3175 = (function (x){
return true;
});
var _GT__EQ___3176 = (function (x,y){
return (x >= y);
});
var _GT__EQ___3177 = (function() { 
var G__3179__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_GT__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3180 = y;
var G__3181 = cljs.core.first.call(null,more);
var G__3182 = cljs.core.next.call(null,more);
x = G__3180;
y = G__3181;
more = G__3182;
continue;
}
} else
{return _GT__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3179 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3179__delegate.call(this, x, y, more);
};
G__3179.cljs$lang$maxFixedArity = 2;
G__3179.cljs$lang$applyTo = (function (arglist__3183){
var x = cljs.core.first(arglist__3183);
var y = cljs.core.first(cljs.core.next(arglist__3183));
var more = cljs.core.rest(cljs.core.next(arglist__3183));
return G__3179__delegate.call(this, x, y, more);
});
return G__3179;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT__EQ___3175.call(this,x);
case  2 :
return _GT__EQ___3176.call(this,x,y);
default:
return _GT__EQ___3177.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___3177.cljs$lang$applyTo;
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
var max__3184 = (function (x){
return x;
});
var max__3185 = (function (x,y){
return ((x > y) ? x : y);
});
var max__3186 = (function() { 
var G__3188__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,max.call(null,x,y),more);
};
var G__3188 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3188__delegate.call(this, x, y, more);
};
G__3188.cljs$lang$maxFixedArity = 2;
G__3188.cljs$lang$applyTo = (function (arglist__3189){
var x = cljs.core.first(arglist__3189);
var y = cljs.core.first(cljs.core.next(arglist__3189));
var more = cljs.core.rest(cljs.core.next(arglist__3189));
return G__3188__delegate.call(this, x, y, more);
});
return G__3188;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return max__3184.call(this,x);
case  2 :
return max__3185.call(this,x,y);
default:
return max__3186.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__3186.cljs$lang$applyTo;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__3190 = (function (x){
return x;
});
var min__3191 = (function (x,y){
return ((x < y) ? x : y);
});
var min__3192 = (function() { 
var G__3194__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,min.call(null,x,y),more);
};
var G__3194 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3194__delegate.call(this, x, y, more);
};
G__3194.cljs$lang$maxFixedArity = 2;
G__3194.cljs$lang$applyTo = (function (arglist__3195){
var x = cljs.core.first(arglist__3195);
var y = cljs.core.first(cljs.core.next(arglist__3195));
var more = cljs.core.rest(cljs.core.next(arglist__3195));
return G__3194__delegate.call(this, x, y, more);
});
return G__3194;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return min__3190.call(this,x);
case  2 :
return min__3191.call(this,x,y);
default:
return min__3192.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__3192.cljs$lang$applyTo;
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
var rem__3196 = (n % d);

return cljs.core.fix.call(null,((n - rem__3196) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__3197 = cljs.core.quot.call(null,n,d);

return (n - (d * q__3197));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__3198 = (function (){
return Math.random.call(null);
});
var rand__3199 = (function (n){
return (n * rand.call(null));
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__3198.call(this);
case  1 :
return rand__3199.call(this,n);
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
return (~x);
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
var _EQ__EQ___3201 = (function (x){
return true;
});
var _EQ__EQ___3202 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___3203 = (function() { 
var G__3205__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3206 = y;
var G__3207 = cljs.core.first.call(null,more);
var G__3208 = cljs.core.next.call(null,more);
x = G__3206;
y = G__3207;
more = G__3208;
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
var G__3205 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3205__delegate.call(this, x, y, more);
};
G__3205.cljs$lang$maxFixedArity = 2;
G__3205.cljs$lang$applyTo = (function (arglist__3209){
var x = cljs.core.first(arglist__3209);
var y = cljs.core.first(cljs.core.next(arglist__3209));
var more = cljs.core.rest(cljs.core.next(arglist__3209));
return G__3205__delegate.call(this, x, y, more);
});
return G__3205;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _EQ__EQ___3201.call(this,x);
case  2 :
return _EQ__EQ___3202.call(this,x,y);
default:
return _EQ__EQ___3203.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3203.cljs$lang$applyTo;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return (0 < n);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return (0 === n);
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
var n__3210 = n;
var xs__3211 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3212 = xs__3211;

if(cljs.core.truth_(and__3546__auto____3212))
{return (n__3210 > 0);
} else
{return and__3546__auto____3212;
}
})()))
{{
var G__3213 = (n__3210 - 1);
var G__3214 = cljs.core.next.call(null,xs__3211);
n__3210 = G__3213;
xs__3211 = G__3214;
continue;
}
} else
{return xs__3211;
}
break;
}
});
(cljs.core.IIndexed["_"] = true);
(cljs.core._nth["_"] = (function() {
var G__3219 = null;
var G__3219__3220 = (function (coll,n){
var temp__3695__auto____3215 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____3215))
{var xs__3216 = temp__3695__auto____3215;

return cljs.core.first.call(null,xs__3216);
} else
{throw (new Error("Index out of bounds"));
}
});
var G__3219__3221 = (function (coll,n,not_found){
var temp__3695__auto____3217 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____3217))
{var xs__3218 = temp__3695__auto____3217;

return cljs.core.first.call(null,xs__3218);
} else
{return not_found;
}
});
G__3219 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3219__3220.call(this,coll,n);
case  3 :
return G__3219__3221.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3219;
})()
);
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___3223 = (function (){
return "";
});
var str_STAR___3224 = (function (x){
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
var str_STAR___3225 = (function() { 
var G__3227__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__3228 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__3229 = cljs.core.next.call(null,more);
sb = G__3228;
more = G__3229;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__3227 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3227__delegate.call(this, x, ys);
};
G__3227.cljs$lang$maxFixedArity = 1;
G__3227.cljs$lang$applyTo = (function (arglist__3230){
var x = cljs.core.first(arglist__3230);
var ys = cljs.core.rest(arglist__3230);
return G__3227__delegate.call(this, x, ys);
});
return G__3227;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str_STAR___3223.call(this);
case  1 :
return str_STAR___3224.call(this,x);
default:
return str_STAR___3225.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___3225.cljs$lang$applyTo;
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
var str__3231 = (function (){
return "";
});
var str__3232 = (function (x){
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
var str__3233 = (function() { 
var G__3235__delegate = function (x,ys){
return cljs.core.apply.call(null,cljs.core.str_STAR_,x,ys);
};
var G__3235 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3235__delegate.call(this, x, ys);
};
G__3235.cljs$lang$maxFixedArity = 1;
G__3235.cljs$lang$applyTo = (function (arglist__3236){
var x = cljs.core.first(arglist__3236);
var ys = cljs.core.rest(arglist__3236);
return G__3235__delegate.call(this, x, ys);
});
return G__3235;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str__3231.call(this);
case  1 :
return str__3232.call(this,x);
default:
return str__3233.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__3233.cljs$lang$applyTo;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__3237 = (function (s,start){
return s.substring(start);
});
var subs__3238 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case  2 :
return subs__3237.call(this,s,start);
case  3 :
return subs__3238.call(this,s,start,end);
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
var symbol__3240 = (function (name){
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
var symbol__3241 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case  1 :
return symbol__3240.call(this,ns);
case  2 :
return symbol__3241.call(this,ns,name);
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
var keyword__3243 = (function (name){
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
var keyword__3244 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case  1 :
return keyword__3243.call(this,ns);
case  2 :
return keyword__3244.call(this,ns,name);
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
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__3246 = cljs.core.seq.call(null,x);
var ys__3247 = cljs.core.seq.call(null,y);

while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,xs__3246)))
{return cljs.core.nil_QMARK_.call(null,ys__3247);
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,ys__3247)))
{return false;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__3246),cljs.core.first.call(null,ys__3247))))
{{
var G__3248 = cljs.core.next.call(null,xs__3246);
var G__3249 = cljs.core.next.call(null,ys__3247);
xs__3246 = G__3248;
ys__3247 = G__3249;
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
return cljs.core.reduce.call(null,(function (p1__3250_SHARP_,p2__3251_SHARP_){
return cljs.core.hash_combine.call(null,p1__3250_SHARP_,cljs.core.hash.call(null,p2__3251_SHARP_));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll)),cljs.core.next.call(null,coll));
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__3252__3253 = cljs.core.seq.call(null,fn_map);

if(cljs.core.truth_(G__3252__3253))
{var G__3255__3257 = cljs.core.first.call(null,G__3252__3253);
var vec__3256__3258 = G__3255__3257;
var key_name__3259 = cljs.core.nth.call(null,vec__3256__3258,0,null);
var f__3260 = cljs.core.nth.call(null,vec__3256__3258,1,null);
var G__3252__3261 = G__3252__3253;

var G__3255__3262 = G__3255__3257;
var G__3252__3263 = G__3252__3261;

while(true){
var vec__3264__3265 = G__3255__3262;
var key_name__3266 = cljs.core.nth.call(null,vec__3264__3265,0,null);
var f__3267 = cljs.core.nth.call(null,vec__3264__3265,1,null);
var G__3252__3268 = G__3252__3263;

var str_name__3269 = cljs.core.name.call(null,key_name__3266);

obj[str_name__3269] = f__3267;
var temp__3698__auto____3270 = cljs.core.next.call(null,G__3252__3268);

if(cljs.core.truth_(temp__3698__auto____3270))
{var G__3252__3271 = temp__3698__auto____3270;

{
var G__3272 = cljs.core.first.call(null,G__3252__3271);
var G__3273 = G__3252__3271;
G__3255__3262 = G__3272;
G__3252__3263 = G__3273;
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
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3274 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3275 = this;
return (new cljs.core.List(this__3275.meta,o,coll,(this__3275.count + 1)));
});
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3276 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3277 = this;
return this__3277.count;
});
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3278 = this;
return this__3278.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3279 = this;
return cljs.core._rest.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3280 = this;
return this__3280.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3281 = this;
return this__3281.rest;
});
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3282 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3283 = this;
return (new cljs.core.List(meta,this__3283.first,this__3283.rest,this__3283.count));
});
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3284 = this;
return this__3284.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3285 = this;
return cljs.core.List.EMPTY;
});

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
})
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3286 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3287 = this;
return (new cljs.core.List(this__3287.meta,o,null,1));
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3288 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3289 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3290 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3291 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3292 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3293 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3294 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3295 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3296 = this;
return this__3296.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3297 = this;
return coll;
});
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
list.cljs$lang$applyTo = (function (arglist__3298){
var items = cljs.core.seq( arglist__3298 );;
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
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3299 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3300 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3301 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3302 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3302.meta);
});
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3303 = this;
return (new cljs.core.Cons(null,o,coll));
});
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3304 = this;
return this__3304.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3305 = this;
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__3305.rest)))
{return cljs.core.List.EMPTY;
} else
{return this__3305.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3306 = this;
return this__3306.meta;
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3307 = this;
return (new cljs.core.Cons(meta,this__3307.first,this__3307.rest));
});
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,seq){
return (new cljs.core.Cons(null,x,seq));
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__3308 = null;
var G__3308__3309 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__3308__3310 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__3308 = function(string,f,start){
switch(arguments.length){
case  2 :
return G__3308__3309.call(this,string,f);
case  3 :
return G__3308__3310.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3308;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__3312 = null;
var G__3312__3313 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__3312__3314 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__3312 = function(string,k,not_found){
switch(arguments.length){
case  2 :
return G__3312__3313.call(this,string,k);
case  3 :
return G__3312__3314.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3312;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__3316 = null;
var G__3316__3317 = (function (string,n){
if(cljs.core.truth_((n < cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return null;
}
});
var G__3316__3318 = (function (string,n,not_found){
if(cljs.core.truth_((n < cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return not_found;
}
});
G__3316 = function(string,n,not_found){
switch(arguments.length){
case  2 :
return G__3316__3317.call(this,string,n);
case  3 :
return G__3316__3318.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3316;
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
String['prototype']['call'] = (function() {
var G__3320 = null;
var G__3320__3321 = (function (_,coll){
return cljs.core.get.call(null,coll,this.toString());
});
var G__3320__3322 = (function (_,coll,not_found){
return cljs.core.get.call(null,coll,this.toString(),not_found);
});
G__3320 = function(_,coll,not_found){
switch(arguments.length){
case  2 :
return G__3320__3321.call(this,_,coll);
case  3 :
return G__3320__3322.call(this,_,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3320;
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
var x__3324 = lazy_seq.x;

if(cljs.core.truth_(lazy_seq.realized))
{return x__3324;
} else
{lazy_seq.x = x__3324.call(null);
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
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3325 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3326 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3327 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3328 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3328.meta);
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3329 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3330 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3331 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3332 = this;
return this__3332.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3333 = this;
return (new cljs.core.LazySeq(meta,this__3333.realized,this__3333.x));
});
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__3334 = cljs.core.array.call(null);

var s__3335 = s;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__3335)))
{ary__3334.push(cljs.core.first.call(null,s__3335));
{
var G__3336 = cljs.core.next.call(null,s__3335);
s__3335 = G__3336;
continue;
}
} else
{return ary__3334;
}
break;
}
});
cljs.core.bounded_count = (function bounded_count(s,n){
var s__3337 = s;
var i__3338 = n;
var sum__3339 = 0;

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3340 = (i__3338 > 0);

if(cljs.core.truth_(and__3546__auto____3340))
{return cljs.core.seq.call(null,s__3337);
} else
{return and__3546__auto____3340;
}
})()))
{{
var G__3341 = cljs.core.next.call(null,s__3337);
var G__3342 = (i__3338 - 1);
var G__3343 = (sum__3339 + 1);
s__3337 = G__3341;
i__3338 = G__3342;
sum__3339 = G__3343;
continue;
}
} else
{return sum__3339;
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
var concat__3347 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
})));
});
var concat__3348 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
})));
});
var concat__3349 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3344 = cljs.core.seq.call(null,x);

if(cljs.core.truth_(s__3344))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__3344),concat.call(null,cljs.core.rest.call(null,s__3344),y));
} else
{return y;
}
})));
});
var concat__3350 = (function() { 
var G__3352__delegate = function (x,y,zs){
var cat__3346 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__3345 = cljs.core.seq.call(null,xys);

if(cljs.core.truth_(xys__3345))
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__3345),cat.call(null,cljs.core.rest.call(null,xys__3345),zs));
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
})));
});

return cat__3346.call(null,concat.call(null,x,y),zs);
};
var G__3352 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3352__delegate.call(this, x, y, zs);
};
G__3352.cljs$lang$maxFixedArity = 2;
G__3352.cljs$lang$applyTo = (function (arglist__3353){
var x = cljs.core.first(arglist__3353);
var y = cljs.core.first(cljs.core.next(arglist__3353));
var zs = cljs.core.rest(cljs.core.next(arglist__3353));
return G__3352__delegate.call(this, x, y, zs);
});
return G__3352;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return concat__3347.call(this);
case  1 :
return concat__3348.call(this,x);
case  2 :
return concat__3349.call(this,x,y);
default:
return concat__3350.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__3350.cljs$lang$applyTo;
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
var list_STAR___3354 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___3355 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___3356 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___3357 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___3358 = (function() { 
var G__3360__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__3360 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3360__delegate.call(this, a, b, c, d, more);
};
G__3360.cljs$lang$maxFixedArity = 4;
G__3360.cljs$lang$applyTo = (function (arglist__3361){
var a = cljs.core.first(arglist__3361);
var b = cljs.core.first(cljs.core.next(arglist__3361));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3361)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3361))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3361))));
return G__3360__delegate.call(this, a, b, c, d, more);
});
return G__3360;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return list_STAR___3354.call(this,a);
case  2 :
return list_STAR___3355.call(this,a,b);
case  3 :
return list_STAR___3356.call(this,a,b,c);
case  4 :
return list_STAR___3357.call(this,a,b,c,d);
default:
return list_STAR___3358.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___3358.cljs$lang$applyTo;
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
var apply__3371 = (function (f,args){
var fixed_arity__3362 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,args,(fixed_arity__3362 + 1)) <= fixed_arity__3362)))
{return f.apply(f,cljs.core.to_array.call(null,args));
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3372 = (function (f,x,args){
var arglist__3363 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__3364 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3363,fixed_arity__3364) <= fixed_arity__3364)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3363));
} else
{return f.cljs$lang$applyTo(arglist__3363);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3363));
}
});
var apply__3373 = (function (f,x,y,args){
var arglist__3365 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__3366 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3365,fixed_arity__3366) <= fixed_arity__3366)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3365));
} else
{return f.cljs$lang$applyTo(arglist__3365);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3365));
}
});
var apply__3374 = (function (f,x,y,z,args){
var arglist__3367 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__3368 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3367,fixed_arity__3368) <= fixed_arity__3368)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3367));
} else
{return f.cljs$lang$applyTo(arglist__3367);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3367));
}
});
var apply__3375 = (function() { 
var G__3377__delegate = function (f,a,b,c,d,args){
var arglist__3369 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__3370 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3369,fixed_arity__3370) <= fixed_arity__3370)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3369));
} else
{return f.cljs$lang$applyTo(arglist__3369);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3369));
}
};
var G__3377 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__3377__delegate.call(this, f, a, b, c, d, args);
};
G__3377.cljs$lang$maxFixedArity = 5;
G__3377.cljs$lang$applyTo = (function (arglist__3378){
var f = cljs.core.first(arglist__3378);
var a = cljs.core.first(cljs.core.next(arglist__3378));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3378)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3378))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3378)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3378)))));
return G__3377__delegate.call(this, f, a, b, c, d, args);
});
return G__3377;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case  2 :
return apply__3371.call(this,f,a);
case  3 :
return apply__3372.call(this,f,a,b);
case  4 :
return apply__3373.call(this,f,a,b,c);
case  5 :
return apply__3374.call(this,f,a,b,c,d);
default:
return apply__3375.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__3375.cljs$lang$applyTo;
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
vary_meta.cljs$lang$applyTo = (function (arglist__3379){
var obj = cljs.core.first(arglist__3379);
var f = cljs.core.first(cljs.core.next(arglist__3379));
var args = cljs.core.rest(cljs.core.next(arglist__3379));
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
var not_EQ___3380 = (function (x){
return false;
});
var not_EQ___3381 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var not_EQ___3382 = (function() { 
var G__3384__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__3384 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3384__delegate.call(this, x, y, more);
};
G__3384.cljs$lang$maxFixedArity = 2;
G__3384.cljs$lang$applyTo = (function (arglist__3385){
var x = cljs.core.first(arglist__3385);
var y = cljs.core.first(cljs.core.next(arglist__3385));
var more = cljs.core.rest(cljs.core.next(arglist__3385));
return G__3384__delegate.call(this, x, y, more);
});
return G__3384;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return not_EQ___3380.call(this,x);
case  2 :
return not_EQ___3381.call(this,x,y);
default:
return not_EQ___3382.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___3382.cljs$lang$applyTo;
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
var G__3386 = pred;
var G__3387 = cljs.core.next.call(null,coll);
pred = G__3386;
coll = G__3387;
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
{var or__3548__auto____3388 = pred.call(null,cljs.core.first.call(null,coll));

if(cljs.core.truth_(or__3548__auto____3388))
{return or__3548__auto____3388;
} else
{{
var G__3389 = pred;
var G__3390 = cljs.core.next.call(null,coll);
pred = G__3389;
coll = G__3390;
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
var G__3391 = null;
var G__3391__3392 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__3391__3393 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__3391__3394 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__3391__3395 = (function() { 
var G__3397__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__3397 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3397__delegate.call(this, x, y, zs);
};
G__3397.cljs$lang$maxFixedArity = 2;
G__3397.cljs$lang$applyTo = (function (arglist__3398){
var x = cljs.core.first(arglist__3398);
var y = cljs.core.first(cljs.core.next(arglist__3398));
var zs = cljs.core.rest(cljs.core.next(arglist__3398));
return G__3397__delegate.call(this, x, y, zs);
});
return G__3397;
})()
;
G__3391 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return G__3391__3392.call(this);
case  1 :
return G__3391__3393.call(this,x);
case  2 :
return G__3391__3394.call(this,x,y);
default:
return G__3391__3395.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3391.cljs$lang$maxFixedArity = 2;
G__3391.cljs$lang$applyTo = G__3391__3395.cljs$lang$applyTo;
return G__3391;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__3399__delegate = function (args){
return x;
};
var G__3399 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3399__delegate.call(this, args);
};
G__3399.cljs$lang$maxFixedArity = 0;
G__3399.cljs$lang$applyTo = (function (arglist__3400){
var args = cljs.core.seq( arglist__3400 );;
return G__3399__delegate.call(this, args);
});
return G__3399;
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
var comp__3404 = (function (){
return cljs.core.identity;
});
var comp__3405 = (function (f){
return f;
});
var comp__3406 = (function (f,g){
return (function() {
var G__3410 = null;
var G__3410__3411 = (function (){
return f.call(null,g.call(null));
});
var G__3410__3412 = (function (x){
return f.call(null,g.call(null,x));
});
var G__3410__3413 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__3410__3414 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__3410__3415 = (function() { 
var G__3417__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__3417 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3417__delegate.call(this, x, y, z, args);
};
G__3417.cljs$lang$maxFixedArity = 3;
G__3417.cljs$lang$applyTo = (function (arglist__3418){
var x = cljs.core.first(arglist__3418);
var y = cljs.core.first(cljs.core.next(arglist__3418));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3418)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3418)));
return G__3417__delegate.call(this, x, y, z, args);
});
return G__3417;
})()
;
G__3410 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3410__3411.call(this);
case  1 :
return G__3410__3412.call(this,x);
case  2 :
return G__3410__3413.call(this,x,y);
case  3 :
return G__3410__3414.call(this,x,y,z);
default:
return G__3410__3415.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3410.cljs$lang$maxFixedArity = 3;
G__3410.cljs$lang$applyTo = G__3410__3415.cljs$lang$applyTo;
return G__3410;
})()
});
var comp__3407 = (function (f,g,h){
return (function() {
var G__3419 = null;
var G__3419__3420 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__3419__3421 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__3419__3422 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__3419__3423 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__3419__3424 = (function() { 
var G__3426__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__3426 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3426__delegate.call(this, x, y, z, args);
};
G__3426.cljs$lang$maxFixedArity = 3;
G__3426.cljs$lang$applyTo = (function (arglist__3427){
var x = cljs.core.first(arglist__3427);
var y = cljs.core.first(cljs.core.next(arglist__3427));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3427)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3427)));
return G__3426__delegate.call(this, x, y, z, args);
});
return G__3426;
})()
;
G__3419 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3419__3420.call(this);
case  1 :
return G__3419__3421.call(this,x);
case  2 :
return G__3419__3422.call(this,x,y);
case  3 :
return G__3419__3423.call(this,x,y,z);
default:
return G__3419__3424.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3419.cljs$lang$maxFixedArity = 3;
G__3419.cljs$lang$applyTo = G__3419__3424.cljs$lang$applyTo;
return G__3419;
})()
});
var comp__3408 = (function() { 
var G__3428__delegate = function (f1,f2,f3,fs){
var fs__3401 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));

return (function() { 
var G__3429__delegate = function (args){
var ret__3402 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__3401),args);
var fs__3403 = cljs.core.next.call(null,fs__3401);

while(true){
if(cljs.core.truth_(fs__3403))
{{
var G__3430 = cljs.core.first.call(null,fs__3403).call(null,ret__3402);
var G__3431 = cljs.core.next.call(null,fs__3403);
ret__3402 = G__3430;
fs__3403 = G__3431;
continue;
}
} else
{return ret__3402;
}
break;
}
};
var G__3429 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3429__delegate.call(this, args);
};
G__3429.cljs$lang$maxFixedArity = 0;
G__3429.cljs$lang$applyTo = (function (arglist__3432){
var args = cljs.core.seq( arglist__3432 );;
return G__3429__delegate.call(this, args);
});
return G__3429;
})()
;
};
var G__3428 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3428__delegate.call(this, f1, f2, f3, fs);
};
G__3428.cljs$lang$maxFixedArity = 3;
G__3428.cljs$lang$applyTo = (function (arglist__3433){
var f1 = cljs.core.first(arglist__3433);
var f2 = cljs.core.first(cljs.core.next(arglist__3433));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3433)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3433)));
return G__3428__delegate.call(this, f1, f2, f3, fs);
});
return G__3428;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case  0 :
return comp__3404.call(this);
case  1 :
return comp__3405.call(this,f1);
case  2 :
return comp__3406.call(this,f1,f2);
case  3 :
return comp__3407.call(this,f1,f2,f3);
default:
return comp__3408.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__3408.cljs$lang$applyTo;
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
var partial__3434 = (function (f,arg1){
return (function() { 
var G__3439__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__3439 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3439__delegate.call(this, args);
};
G__3439.cljs$lang$maxFixedArity = 0;
G__3439.cljs$lang$applyTo = (function (arglist__3440){
var args = cljs.core.seq( arglist__3440 );;
return G__3439__delegate.call(this, args);
});
return G__3439;
})()
;
});
var partial__3435 = (function (f,arg1,arg2){
return (function() { 
var G__3441__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__3441 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3441__delegate.call(this, args);
};
G__3441.cljs$lang$maxFixedArity = 0;
G__3441.cljs$lang$applyTo = (function (arglist__3442){
var args = cljs.core.seq( arglist__3442 );;
return G__3441__delegate.call(this, args);
});
return G__3441;
})()
;
});
var partial__3436 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__3443__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__3443 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3443__delegate.call(this, args);
};
G__3443.cljs$lang$maxFixedArity = 0;
G__3443.cljs$lang$applyTo = (function (arglist__3444){
var args = cljs.core.seq( arglist__3444 );;
return G__3443__delegate.call(this, args);
});
return G__3443;
})()
;
});
var partial__3437 = (function() { 
var G__3445__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__3446__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__3446 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3446__delegate.call(this, args);
};
G__3446.cljs$lang$maxFixedArity = 0;
G__3446.cljs$lang$applyTo = (function (arglist__3447){
var args = cljs.core.seq( arglist__3447 );;
return G__3446__delegate.call(this, args);
});
return G__3446;
})()
;
};
var G__3445 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3445__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__3445.cljs$lang$maxFixedArity = 4;
G__3445.cljs$lang$applyTo = (function (arglist__3448){
var f = cljs.core.first(arglist__3448);
var arg1 = cljs.core.first(cljs.core.next(arglist__3448));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3448)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3448))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3448))));
return G__3445__delegate.call(this, f, arg1, arg2, arg3, more);
});
return G__3445;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return partial__3434.call(this,f,arg1);
case  3 :
return partial__3435.call(this,f,arg1,arg2);
case  4 :
return partial__3436.call(this,f,arg1,arg2,arg3);
default:
return partial__3437.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__3437.cljs$lang$applyTo;
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
var fnil__3449 = (function (f,x){
return (function() {
var G__3453 = null;
var G__3453__3454 = (function (a){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a));
});
var G__3453__3455 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b);
});
var G__3453__3456 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c);
});
var G__3453__3457 = (function() { 
var G__3459__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c,ds);
};
var G__3459 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3459__delegate.call(this, a, b, c, ds);
};
G__3459.cljs$lang$maxFixedArity = 3;
G__3459.cljs$lang$applyTo = (function (arglist__3460){
var a = cljs.core.first(arglist__3460);
var b = cljs.core.first(cljs.core.next(arglist__3460));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3460)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3460)));
return G__3459__delegate.call(this, a, b, c, ds);
});
return G__3459;
})()
;
G__3453 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  1 :
return G__3453__3454.call(this,a);
case  2 :
return G__3453__3455.call(this,a,b);
case  3 :
return G__3453__3456.call(this,a,b,c);
default:
return G__3453__3457.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3453.cljs$lang$maxFixedArity = 3;
G__3453.cljs$lang$applyTo = G__3453__3457.cljs$lang$applyTo;
return G__3453;
})()
});
var fnil__3450 = (function (f,x,y){
return (function() {
var G__3461 = null;
var G__3461__3462 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__3461__3463 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c);
});
var G__3461__3464 = (function() { 
var G__3466__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c,ds);
};
var G__3466 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3466__delegate.call(this, a, b, c, ds);
};
G__3466.cljs$lang$maxFixedArity = 3;
G__3466.cljs$lang$applyTo = (function (arglist__3467){
var a = cljs.core.first(arglist__3467);
var b = cljs.core.first(cljs.core.next(arglist__3467));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3467)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3467)));
return G__3466__delegate.call(this, a, b, c, ds);
});
return G__3466;
})()
;
G__3461 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__3461__3462.call(this,a,b);
case  3 :
return G__3461__3463.call(this,a,b,c);
default:
return G__3461__3464.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3461.cljs$lang$maxFixedArity = 3;
G__3461.cljs$lang$applyTo = G__3461__3464.cljs$lang$applyTo;
return G__3461;
})()
});
var fnil__3451 = (function (f,x,y,z){
return (function() {
var G__3468 = null;
var G__3468__3469 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__3468__3470 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c));
});
var G__3468__3471 = (function() { 
var G__3473__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c),ds);
};
var G__3473 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3473__delegate.call(this, a, b, c, ds);
};
G__3473.cljs$lang$maxFixedArity = 3;
G__3473.cljs$lang$applyTo = (function (arglist__3474){
var a = cljs.core.first(arglist__3474);
var b = cljs.core.first(cljs.core.next(arglist__3474));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3474)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3474)));
return G__3473__delegate.call(this, a, b, c, ds);
});
return G__3473;
})()
;
G__3468 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__3468__3469.call(this,a,b);
case  3 :
return G__3468__3470.call(this,a,b,c);
default:
return G__3468__3471.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3468.cljs$lang$maxFixedArity = 3;
G__3468.cljs$lang$applyTo = G__3468__3471.cljs$lang$applyTo;
return G__3468;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case  2 :
return fnil__3449.call(this,f,x);
case  3 :
return fnil__3450.call(this,f,x,y);
case  4 :
return fnil__3451.call(this,f,x,y,z);
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
var mapi__3477 = (function mpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3475 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3475))
{var s__3476 = temp__3698__auto____3475;

return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__3476)),mpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3476)));
} else
{return null;
}
})));
});

return mapi__3477.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3478 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3478))
{var s__3479 = temp__3698__auto____3478;

var x__3480 = f.call(null,cljs.core.first.call(null,s__3479));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__3480)))
{return keep.call(null,f,cljs.core.rest.call(null,s__3479));
} else
{return cljs.core.cons.call(null,x__3480,keep.call(null,f,cljs.core.rest.call(null,s__3479)));
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
var keepi__3490 = (function kpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3487 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3487))
{var s__3488 = temp__3698__auto____3487;

var x__3489 = f.call(null,idx,cljs.core.first.call(null,s__3488));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__3489)))
{return kpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3488));
} else
{return cljs.core.cons.call(null,x__3489,kpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3488)));
}
} else
{return null;
}
})));
});

return keepi__3490.call(null,0,coll);
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
var every_pred__3535 = (function (p){
return (function() {
var ep1 = null;
var ep1__3540 = (function (){
return true;
});
var ep1__3541 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__3542 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3497 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____3497))
{return p.call(null,y);
} else
{return and__3546__auto____3497;
}
})());
});
var ep1__3543 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3498 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____3498))
{var and__3546__auto____3499 = p.call(null,y);

if(cljs.core.truth_(and__3546__auto____3499))
{return p.call(null,z);
} else
{return and__3546__auto____3499;
}
} else
{return and__3546__auto____3498;
}
})());
});
var ep1__3544 = (function() { 
var G__3546__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3500 = ep1.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3500))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3546__auto____3500;
}
})());
};
var G__3546 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3546__delegate.call(this, x, y, z, args);
};
G__3546.cljs$lang$maxFixedArity = 3;
G__3546.cljs$lang$applyTo = (function (arglist__3547){
var x = cljs.core.first(arglist__3547);
var y = cljs.core.first(cljs.core.next(arglist__3547));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3547)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3547)));
return G__3546__delegate.call(this, x, y, z, args);
});
return G__3546;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep1__3540.call(this);
case  1 :
return ep1__3541.call(this,x);
case  2 :
return ep1__3542.call(this,x,y);
case  3 :
return ep1__3543.call(this,x,y,z);
default:
return ep1__3544.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__3544.cljs$lang$applyTo;
return ep1;
})()
});
var every_pred__3536 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__3548 = (function (){
return true;
});
var ep2__3549 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3501 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3501))
{return p2.call(null,x);
} else
{return and__3546__auto____3501;
}
})());
});
var ep2__3550 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3502 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3502))
{var and__3546__auto____3503 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3503))
{var and__3546__auto____3504 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3504))
{return p2.call(null,y);
} else
{return and__3546__auto____3504;
}
} else
{return and__3546__auto____3503;
}
} else
{return and__3546__auto____3502;
}
})());
});
var ep2__3551 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3505 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3505))
{var and__3546__auto____3506 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3506))
{var and__3546__auto____3507 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____3507))
{var and__3546__auto____3508 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3508))
{var and__3546__auto____3509 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3509))
{return p2.call(null,z);
} else
{return and__3546__auto____3509;
}
} else
{return and__3546__auto____3508;
}
} else
{return and__3546__auto____3507;
}
} else
{return and__3546__auto____3506;
}
} else
{return and__3546__auto____3505;
}
})());
});
var ep2__3552 = (function() { 
var G__3554__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3510 = ep2.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3510))
{return cljs.core.every_QMARK_.call(null,(function (p1__3481_SHARP_){
var and__3546__auto____3511 = p1.call(null,p1__3481_SHARP_);

if(cljs.core.truth_(and__3546__auto____3511))
{return p2.call(null,p1__3481_SHARP_);
} else
{return and__3546__auto____3511;
}
}),args);
} else
{return and__3546__auto____3510;
}
})());
};
var G__3554 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3554__delegate.call(this, x, y, z, args);
};
G__3554.cljs$lang$maxFixedArity = 3;
G__3554.cljs$lang$applyTo = (function (arglist__3555){
var x = cljs.core.first(arglist__3555);
var y = cljs.core.first(cljs.core.next(arglist__3555));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3555)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3555)));
return G__3554__delegate.call(this, x, y, z, args);
});
return G__3554;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep2__3548.call(this);
case  1 :
return ep2__3549.call(this,x);
case  2 :
return ep2__3550.call(this,x,y);
case  3 :
return ep2__3551.call(this,x,y,z);
default:
return ep2__3552.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__3552.cljs$lang$applyTo;
return ep2;
})()
});
var every_pred__3537 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__3556 = (function (){
return true;
});
var ep3__3557 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3512 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3512))
{var and__3546__auto____3513 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3513))
{return p3.call(null,x);
} else
{return and__3546__auto____3513;
}
} else
{return and__3546__auto____3512;
}
})());
});
var ep3__3558 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3514 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3514))
{var and__3546__auto____3515 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3515))
{var and__3546__auto____3516 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____3516))
{var and__3546__auto____3517 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3517))
{var and__3546__auto____3518 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3518))
{return p3.call(null,y);
} else
{return and__3546__auto____3518;
}
} else
{return and__3546__auto____3517;
}
} else
{return and__3546__auto____3516;
}
} else
{return and__3546__auto____3515;
}
} else
{return and__3546__auto____3514;
}
})());
});
var ep3__3559 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3519 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3519))
{var and__3546__auto____3520 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3520))
{var and__3546__auto____3521 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____3521))
{var and__3546__auto____3522 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3522))
{var and__3546__auto____3523 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3523))
{var and__3546__auto____3524 = p3.call(null,y);

if(cljs.core.truth_(and__3546__auto____3524))
{var and__3546__auto____3525 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____3525))
{var and__3546__auto____3526 = p2.call(null,z);

if(cljs.core.truth_(and__3546__auto____3526))
{return p3.call(null,z);
} else
{return and__3546__auto____3526;
}
} else
{return and__3546__auto____3525;
}
} else
{return and__3546__auto____3524;
}
} else
{return and__3546__auto____3523;
}
} else
{return and__3546__auto____3522;
}
} else
{return and__3546__auto____3521;
}
} else
{return and__3546__auto____3520;
}
} else
{return and__3546__auto____3519;
}
})());
});
var ep3__3560 = (function() { 
var G__3562__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3527 = ep3.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3527))
{return cljs.core.every_QMARK_.call(null,(function (p1__3482_SHARP_){
var and__3546__auto____3528 = p1.call(null,p1__3482_SHARP_);

if(cljs.core.truth_(and__3546__auto____3528))
{var and__3546__auto____3529 = p2.call(null,p1__3482_SHARP_);

if(cljs.core.truth_(and__3546__auto____3529))
{return p3.call(null,p1__3482_SHARP_);
} else
{return and__3546__auto____3529;
}
} else
{return and__3546__auto____3528;
}
}),args);
} else
{return and__3546__auto____3527;
}
})());
};
var G__3562 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3562__delegate.call(this, x, y, z, args);
};
G__3562.cljs$lang$maxFixedArity = 3;
G__3562.cljs$lang$applyTo = (function (arglist__3563){
var x = cljs.core.first(arglist__3563);
var y = cljs.core.first(cljs.core.next(arglist__3563));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3563)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3563)));
return G__3562__delegate.call(this, x, y, z, args);
});
return G__3562;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep3__3556.call(this);
case  1 :
return ep3__3557.call(this,x);
case  2 :
return ep3__3558.call(this,x,y);
case  3 :
return ep3__3559.call(this,x,y,z);
default:
return ep3__3560.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__3560.cljs$lang$applyTo;
return ep3;
})()
});
var every_pred__3538 = (function() { 
var G__3564__delegate = function (p1,p2,p3,ps){
var ps__3530 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var epn = null;
var epn__3565 = (function (){
return true;
});
var epn__3566 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__3483_SHARP_){
return p1__3483_SHARP_.call(null,x);
}),ps__3530);
});
var epn__3567 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__3484_SHARP_){
var and__3546__auto____3531 = p1__3484_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____3531))
{return p1__3484_SHARP_.call(null,y);
} else
{return and__3546__auto____3531;
}
}),ps__3530);
});
var epn__3568 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__3485_SHARP_){
var and__3546__auto____3532 = p1__3485_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____3532))
{var and__3546__auto____3533 = p1__3485_SHARP_.call(null,y);

if(cljs.core.truth_(and__3546__auto____3533))
{return p1__3485_SHARP_.call(null,z);
} else
{return and__3546__auto____3533;
}
} else
{return and__3546__auto____3532;
}
}),ps__3530);
});
var epn__3569 = (function() { 
var G__3571__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3534 = epn.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3534))
{return cljs.core.every_QMARK_.call(null,(function (p1__3486_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__3486_SHARP_,args);
}),ps__3530);
} else
{return and__3546__auto____3534;
}
})());
};
var G__3571 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3571__delegate.call(this, x, y, z, args);
};
G__3571.cljs$lang$maxFixedArity = 3;
G__3571.cljs$lang$applyTo = (function (arglist__3572){
var x = cljs.core.first(arglist__3572);
var y = cljs.core.first(cljs.core.next(arglist__3572));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3572)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3572)));
return G__3571__delegate.call(this, x, y, z, args);
});
return G__3571;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return epn__3565.call(this);
case  1 :
return epn__3566.call(this,x);
case  2 :
return epn__3567.call(this,x,y);
case  3 :
return epn__3568.call(this,x,y,z);
default:
return epn__3569.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__3569.cljs$lang$applyTo;
return epn;
})()
};
var G__3564 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3564__delegate.call(this, p1, p2, p3, ps);
};
G__3564.cljs$lang$maxFixedArity = 3;
G__3564.cljs$lang$applyTo = (function (arglist__3573){
var p1 = cljs.core.first(arglist__3573);
var p2 = cljs.core.first(cljs.core.next(arglist__3573));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3573)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3573)));
return G__3564__delegate.call(this, p1, p2, p3, ps);
});
return G__3564;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return every_pred__3535.call(this,p1);
case  2 :
return every_pred__3536.call(this,p1,p2);
case  3 :
return every_pred__3537.call(this,p1,p2,p3);
default:
return every_pred__3538.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__3538.cljs$lang$applyTo;
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
var some_fn__3613 = (function (p){
return (function() {
var sp1 = null;
var sp1__3618 = (function (){
return null;
});
var sp1__3619 = (function (x){
return p.call(null,x);
});
var sp1__3620 = (function (x,y){
var or__3548__auto____3575 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____3575))
{return or__3548__auto____3575;
} else
{return p.call(null,y);
}
});
var sp1__3621 = (function (x,y,z){
var or__3548__auto____3576 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____3576))
{return or__3548__auto____3576;
} else
{var or__3548__auto____3577 = p.call(null,y);

if(cljs.core.truth_(or__3548__auto____3577))
{return or__3548__auto____3577;
} else
{return p.call(null,z);
}
}
});
var sp1__3622 = (function() { 
var G__3624__delegate = function (x,y,z,args){
var or__3548__auto____3578 = sp1.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3578))
{return or__3548__auto____3578;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__3624 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3624__delegate.call(this, x, y, z, args);
};
G__3624.cljs$lang$maxFixedArity = 3;
G__3624.cljs$lang$applyTo = (function (arglist__3625){
var x = cljs.core.first(arglist__3625);
var y = cljs.core.first(cljs.core.next(arglist__3625));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3625)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3625)));
return G__3624__delegate.call(this, x, y, z, args);
});
return G__3624;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp1__3618.call(this);
case  1 :
return sp1__3619.call(this,x);
case  2 :
return sp1__3620.call(this,x,y);
case  3 :
return sp1__3621.call(this,x,y,z);
default:
return sp1__3622.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__3622.cljs$lang$applyTo;
return sp1;
})()
});
var some_fn__3614 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__3626 = (function (){
return null;
});
var sp2__3627 = (function (x){
var or__3548__auto____3579 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3579))
{return or__3548__auto____3579;
} else
{return p2.call(null,x);
}
});
var sp2__3628 = (function (x,y){
var or__3548__auto____3580 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3580))
{return or__3548__auto____3580;
} else
{var or__3548__auto____3581 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3581))
{return or__3548__auto____3581;
} else
{var or__3548__auto____3582 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3582))
{return or__3548__auto____3582;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3629 = (function (x,y,z){
var or__3548__auto____3583 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3583))
{return or__3548__auto____3583;
} else
{var or__3548__auto____3584 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3584))
{return or__3548__auto____3584;
} else
{var or__3548__auto____3585 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____3585))
{return or__3548__auto____3585;
} else
{var or__3548__auto____3586 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3586))
{return or__3548__auto____3586;
} else
{var or__3548__auto____3587 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3587))
{return or__3548__auto____3587;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__3630 = (function() { 
var G__3632__delegate = function (x,y,z,args){
var or__3548__auto____3588 = sp2.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3588))
{return or__3548__auto____3588;
} else
{return cljs.core.some.call(null,(function (p1__3491_SHARP_){
var or__3548__auto____3589 = p1.call(null,p1__3491_SHARP_);

if(cljs.core.truth_(or__3548__auto____3589))
{return or__3548__auto____3589;
} else
{return p2.call(null,p1__3491_SHARP_);
}
}),args);
}
};
var G__3632 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3632__delegate.call(this, x, y, z, args);
};
G__3632.cljs$lang$maxFixedArity = 3;
G__3632.cljs$lang$applyTo = (function (arglist__3633){
var x = cljs.core.first(arglist__3633);
var y = cljs.core.first(cljs.core.next(arglist__3633));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3633)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3633)));
return G__3632__delegate.call(this, x, y, z, args);
});
return G__3632;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp2__3626.call(this);
case  1 :
return sp2__3627.call(this,x);
case  2 :
return sp2__3628.call(this,x,y);
case  3 :
return sp2__3629.call(this,x,y,z);
default:
return sp2__3630.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__3630.cljs$lang$applyTo;
return sp2;
})()
});
var some_fn__3615 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__3634 = (function (){
return null;
});
var sp3__3635 = (function (x){
var or__3548__auto____3590 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3590))
{return or__3548__auto____3590;
} else
{var or__3548__auto____3591 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3591))
{return or__3548__auto____3591;
} else
{return p3.call(null,x);
}
}
});
var sp3__3636 = (function (x,y){
var or__3548__auto____3592 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3592))
{return or__3548__auto____3592;
} else
{var or__3548__auto____3593 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3593))
{return or__3548__auto____3593;
} else
{var or__3548__auto____3594 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____3594))
{return or__3548__auto____3594;
} else
{var or__3548__auto____3595 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3595))
{return or__3548__auto____3595;
} else
{var or__3548__auto____3596 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3596))
{return or__3548__auto____3596;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3637 = (function (x,y,z){
var or__3548__auto____3597 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3597))
{return or__3548__auto____3597;
} else
{var or__3548__auto____3598 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3598))
{return or__3548__auto____3598;
} else
{var or__3548__auto____3599 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____3599))
{return or__3548__auto____3599;
} else
{var or__3548__auto____3600 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3600))
{return or__3548__auto____3600;
} else
{var or__3548__auto____3601 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3601))
{return or__3548__auto____3601;
} else
{var or__3548__auto____3602 = p3.call(null,y);

if(cljs.core.truth_(or__3548__auto____3602))
{return or__3548__auto____3602;
} else
{var or__3548__auto____3603 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____3603))
{return or__3548__auto____3603;
} else
{var or__3548__auto____3604 = p2.call(null,z);

if(cljs.core.truth_(or__3548__auto____3604))
{return or__3548__auto____3604;
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
var sp3__3638 = (function() { 
var G__3640__delegate = function (x,y,z,args){
var or__3548__auto____3605 = sp3.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3605))
{return or__3548__auto____3605;
} else
{return cljs.core.some.call(null,(function (p1__3492_SHARP_){
var or__3548__auto____3606 = p1.call(null,p1__3492_SHARP_);

if(cljs.core.truth_(or__3548__auto____3606))
{return or__3548__auto____3606;
} else
{var or__3548__auto____3607 = p2.call(null,p1__3492_SHARP_);

if(cljs.core.truth_(or__3548__auto____3607))
{return or__3548__auto____3607;
} else
{return p3.call(null,p1__3492_SHARP_);
}
}
}),args);
}
};
var G__3640 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3640__delegate.call(this, x, y, z, args);
};
G__3640.cljs$lang$maxFixedArity = 3;
G__3640.cljs$lang$applyTo = (function (arglist__3641){
var x = cljs.core.first(arglist__3641);
var y = cljs.core.first(cljs.core.next(arglist__3641));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3641)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3641)));
return G__3640__delegate.call(this, x, y, z, args);
});
return G__3640;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp3__3634.call(this);
case  1 :
return sp3__3635.call(this,x);
case  2 :
return sp3__3636.call(this,x,y);
case  3 :
return sp3__3637.call(this,x,y,z);
default:
return sp3__3638.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__3638.cljs$lang$applyTo;
return sp3;
})()
});
var some_fn__3616 = (function() { 
var G__3642__delegate = function (p1,p2,p3,ps){
var ps__3608 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var spn = null;
var spn__3643 = (function (){
return null;
});
var spn__3644 = (function (x){
return cljs.core.some.call(null,(function (p1__3493_SHARP_){
return p1__3493_SHARP_.call(null,x);
}),ps__3608);
});
var spn__3645 = (function (x,y){
return cljs.core.some.call(null,(function (p1__3494_SHARP_){
var or__3548__auto____3609 = p1__3494_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3609))
{return or__3548__auto____3609;
} else
{return p1__3494_SHARP_.call(null,y);
}
}),ps__3608);
});
var spn__3646 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__3495_SHARP_){
var or__3548__auto____3610 = p1__3495_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3610))
{return or__3548__auto____3610;
} else
{var or__3548__auto____3611 = p1__3495_SHARP_.call(null,y);

if(cljs.core.truth_(or__3548__auto____3611))
{return or__3548__auto____3611;
} else
{return p1__3495_SHARP_.call(null,z);
}
}
}),ps__3608);
});
var spn__3647 = (function() { 
var G__3649__delegate = function (x,y,z,args){
var or__3548__auto____3612 = spn.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3612))
{return or__3548__auto____3612;
} else
{return cljs.core.some.call(null,(function (p1__3496_SHARP_){
return cljs.core.some.call(null,p1__3496_SHARP_,args);
}),ps__3608);
}
};
var G__3649 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3649__delegate.call(this, x, y, z, args);
};
G__3649.cljs$lang$maxFixedArity = 3;
G__3649.cljs$lang$applyTo = (function (arglist__3650){
var x = cljs.core.first(arglist__3650);
var y = cljs.core.first(cljs.core.next(arglist__3650));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3650)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3650)));
return G__3649__delegate.call(this, x, y, z, args);
});
return G__3649;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return spn__3643.call(this);
case  1 :
return spn__3644.call(this,x);
case  2 :
return spn__3645.call(this,x,y);
case  3 :
return spn__3646.call(this,x,y,z);
default:
return spn__3647.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__3647.cljs$lang$applyTo;
return spn;
})()
};
var G__3642 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3642__delegate.call(this, p1, p2, p3, ps);
};
G__3642.cljs$lang$maxFixedArity = 3;
G__3642.cljs$lang$applyTo = (function (arglist__3651){
var p1 = cljs.core.first(arglist__3651);
var p2 = cljs.core.first(cljs.core.next(arglist__3651));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3651)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3651)));
return G__3642__delegate.call(this, p1, p2, p3, ps);
});
return G__3642;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return some_fn__3613.call(this,p1);
case  2 :
return some_fn__3614.call(this,p1,p2);
case  3 :
return some_fn__3615.call(this,p1,p2,p3);
default:
return some_fn__3616.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__3616.cljs$lang$applyTo;
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
var map__3664 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3652 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3652))
{var s__3653 = temp__3698__auto____3652;

return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__3653)),map.call(null,f,cljs.core.rest.call(null,s__3653)));
} else
{return null;
}
})));
});
var map__3665 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3654 = cljs.core.seq.call(null,c1);
var s2__3655 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3656 = s1__3654;

if(cljs.core.truth_(and__3546__auto____3656))
{return s2__3655;
} else
{return and__3546__auto____3656;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3654),cljs.core.first.call(null,s2__3655)),map.call(null,f,cljs.core.rest.call(null,s1__3654),cljs.core.rest.call(null,s2__3655)));
} else
{return null;
}
})));
});
var map__3666 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3657 = cljs.core.seq.call(null,c1);
var s2__3658 = cljs.core.seq.call(null,c2);
var s3__3659 = cljs.core.seq.call(null,c3);

if(cljs.core.truth_((function (){var and__3546__auto____3660 = s1__3657;

if(cljs.core.truth_(and__3546__auto____3660))
{var and__3546__auto____3661 = s2__3658;

if(cljs.core.truth_(and__3546__auto____3661))
{return s3__3659;
} else
{return and__3546__auto____3661;
}
} else
{return and__3546__auto____3660;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3657),cljs.core.first.call(null,s2__3658),cljs.core.first.call(null,s3__3659)),map.call(null,f,cljs.core.rest.call(null,s1__3657),cljs.core.rest.call(null,s2__3658),cljs.core.rest.call(null,s3__3659)));
} else
{return null;
}
})));
});
var map__3667 = (function() { 
var G__3669__delegate = function (f,c1,c2,c3,colls){
var step__3663 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3662 = map.call(null,cljs.core.seq,cs);

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3662)))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__3662),step.call(null,map.call(null,cljs.core.rest,ss__3662)));
} else
{return null;
}
})));
});

return map.call(null,(function (p1__3574_SHARP_){
return cljs.core.apply.call(null,f,p1__3574_SHARP_);
}),step__3663.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__3669 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3669__delegate.call(this, f, c1, c2, c3, colls);
};
G__3669.cljs$lang$maxFixedArity = 4;
G__3669.cljs$lang$applyTo = (function (arglist__3670){
var f = cljs.core.first(arglist__3670);
var c1 = cljs.core.first(cljs.core.next(arglist__3670));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3670)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3670))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3670))));
return G__3669__delegate.call(this, f, c1, c2, c3, colls);
});
return G__3669;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return map__3664.call(this,f,c1);
case  3 :
return map__3665.call(this,f,c1,c2);
case  4 :
return map__3666.call(this,f,c1,c2,c3);
default:
return map__3667.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__3667.cljs$lang$applyTo;
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
{var temp__3698__auto____3671 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3671))
{var s__3672 = temp__3698__auto____3671;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__3672),take.call(null,(n - 1),cljs.core.rest.call(null,s__3672)));
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
var step__3675 = (function (n,coll){
while(true){
var s__3673 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3674 = (n > 0);

if(cljs.core.truth_(and__3546__auto____3674))
{return s__3673;
} else
{return and__3546__auto____3674;
}
})()))
{{
var G__3676 = (n - 1);
var G__3677 = cljs.core.rest.call(null,s__3673);
n = G__3676;
coll = G__3677;
continue;
}
} else
{return s__3673;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3675.call(null,n,coll);
})));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__3678 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__3679 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case  1 :
return drop_last__3678.call(this,n);
case  2 :
return drop_last__3679.call(this,n,s);
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
var s__3681 = cljs.core.seq.call(null,coll);
var lead__3682 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));

while(true){
if(cljs.core.truth_(lead__3682))
{{
var G__3683 = cljs.core.next.call(null,s__3681);
var G__3684 = cljs.core.next.call(null,lead__3682);
s__3681 = G__3683;
lead__3682 = G__3684;
continue;
}
} else
{return s__3681;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__3687 = (function (pred,coll){
while(true){
var s__3685 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3686 = s__3685;

if(cljs.core.truth_(and__3546__auto____3686))
{return pred.call(null,cljs.core.first.call(null,s__3685));
} else
{return and__3546__auto____3686;
}
})()))
{{
var G__3688 = pred;
var G__3689 = cljs.core.rest.call(null,s__3685);
pred = G__3688;
coll = G__3689;
continue;
}
} else
{return s__3685;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3687.call(null,pred,coll);
})));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3690 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3690))
{var s__3691 = temp__3698__auto____3690;

return cljs.core.concat.call(null,s__3691,cycle.call(null,s__3691));
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
var repeat__3692 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
})));
});
var repeat__3693 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case  1 :
return repeat__3692.call(this,n);
case  2 :
return repeat__3693.call(this,n,x);
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
var repeatedly__3695 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
})));
});
var repeatedly__3696 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case  1 :
return repeatedly__3695.call(this,n);
case  2 :
return repeatedly__3696.call(this,n,f);
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
var interleave__3702 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3698 = cljs.core.seq.call(null,c1);
var s2__3699 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3700 = s1__3698;

if(cljs.core.truth_(and__3546__auto____3700))
{return s2__3699;
} else
{return and__3546__auto____3700;
}
})()))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__3698),cljs.core.cons.call(null,cljs.core.first.call(null,s2__3699),interleave.call(null,cljs.core.rest.call(null,s1__3698),cljs.core.rest.call(null,s2__3699))));
} else
{return null;
}
})));
});
var interleave__3703 = (function() { 
var G__3705__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3701 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3701)))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__3701),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__3701)));
} else
{return null;
}
})));
};
var G__3705 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3705__delegate.call(this, c1, c2, colls);
};
G__3705.cljs$lang$maxFixedArity = 2;
G__3705.cljs$lang$applyTo = (function (arglist__3706){
var c1 = cljs.core.first(arglist__3706);
var c2 = cljs.core.first(cljs.core.next(arglist__3706));
var colls = cljs.core.rest(cljs.core.next(arglist__3706));
return G__3705__delegate.call(this, c1, c2, colls);
});
return G__3705;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return interleave__3702.call(this,c1,c2);
default:
return interleave__3703.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3703.cljs$lang$applyTo;
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
var cat__3709 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____3707 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3707))
{var coll__3708 = temp__3695__auto____3707;

return cljs.core.cons.call(null,cljs.core.first.call(null,coll__3708),cat.call(null,cljs.core.rest.call(null,coll__3708),colls));
} else
{if(cljs.core.truth_(cljs.core.seq.call(null,colls)))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
})));
});

return cat__3709.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__3710 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3711 = (function() { 
var G__3713__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__3713 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3713__delegate.call(this, f, coll, colls);
};
G__3713.cljs$lang$maxFixedArity = 2;
G__3713.cljs$lang$applyTo = (function (arglist__3714){
var f = cljs.core.first(arglist__3714);
var coll = cljs.core.first(cljs.core.next(arglist__3714));
var colls = cljs.core.rest(cljs.core.next(arglist__3714));
return G__3713__delegate.call(this, f, coll, colls);
});
return G__3713;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return mapcat__3710.call(this,f,coll);
default:
return mapcat__3711.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3711.cljs$lang$applyTo;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3715 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3715))
{var s__3716 = temp__3698__auto____3715;

var f__3717 = cljs.core.first.call(null,s__3716);
var r__3718 = cljs.core.rest.call(null,s__3716);

if(cljs.core.truth_(pred.call(null,f__3717)))
{return cljs.core.cons.call(null,f__3717,filter.call(null,pred,r__3718));
} else
{return filter.call(null,pred,r__3718);
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
var walk__3720 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
})));
});

return walk__3720.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__3719_SHARP_){
return cljs.core.not.call(null,cljs.core.sequential_QMARK_.call(null,p1__3719_SHARP_));
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
var partition__3727 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3728 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3721 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3721))
{var s__3722 = temp__3698__auto____3721;

var p__3723 = cljs.core.take.call(null,n,s__3722);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3723))))
{return cljs.core.cons.call(null,p__3723,partition.call(null,n,step,cljs.core.drop.call(null,step,s__3722)));
} else
{return null;
}
} else
{return null;
}
})));
});
var partition__3729 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3724 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3724))
{var s__3725 = temp__3698__auto____3724;

var p__3726 = cljs.core.take.call(null,n,s__3725);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3726))))
{return cljs.core.cons.call(null,p__3726,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__3725)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__3726,pad)));
}
} else
{return null;
}
})));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case  2 :
return partition__3727.call(this,n,step);
case  3 :
return partition__3728.call(this,n,step,pad);
case  4 :
return partition__3729.call(this,n,step,pad,coll);
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
var get_in__3735 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3736 = (function (m,ks,not_found){
var sentinel__3731 = cljs.core.lookup_sentinel;
var m__3732 = m;
var ks__3733 = cljs.core.seq.call(null,ks);

while(true){
if(cljs.core.truth_(ks__3733))
{var m__3734 = cljs.core.get.call(null,m__3732,cljs.core.first.call(null,ks__3733),sentinel__3731);

if(cljs.core.truth_((sentinel__3731 === m__3734)))
{return not_found;
} else
{{
var G__3738 = sentinel__3731;
var G__3739 = m__3734;
var G__3740 = cljs.core.next.call(null,ks__3733);
sentinel__3731 = G__3738;
m__3732 = G__3739;
ks__3733 = G__3740;
continue;
}
}
} else
{return m__3732;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case  2 :
return get_in__3735.call(this,m,ks);
case  3 :
return get_in__3736.call(this,m,ks,not_found);
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
cljs.core.assoc_in = (function assoc_in(m,p__3741,v){
var vec__3742__3743 = p__3741;
var k__3744 = cljs.core.nth.call(null,vec__3742__3743,0,null);
var ks__3745 = cljs.core.nthnext.call(null,vec__3742__3743,1);

if(cljs.core.truth_(ks__3745))
{return cljs.core.assoc.call(null,m,k__3744,assoc_in.call(null,cljs.core.get.call(null,m,k__3744),ks__3745,v));
} else
{return cljs.core.assoc.call(null,m,k__3744,v);
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
var update_in__delegate = function (m,p__3746,f,args){
var vec__3747__3748 = p__3746;
var k__3749 = cljs.core.nth.call(null,vec__3747__3748,0,null);
var ks__3750 = cljs.core.nthnext.call(null,vec__3747__3748,1);

if(cljs.core.truth_(ks__3750))
{return cljs.core.assoc.call(null,m,k__3749,cljs.core.apply.call(null,update_in,cljs.core.get.call(null,m,k__3749),ks__3750,f,args));
} else
{return cljs.core.assoc.call(null,m,k__3749,cljs.core.apply.call(null,f,cljs.core.get.call(null,m,k__3749),args));
}
};
var update_in = function (m,p__3746,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__3746, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__3751){
var m = cljs.core.first(arglist__3751);
var p__3746 = cljs.core.first(cljs.core.next(arglist__3751));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3751)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3751)));
return update_in__delegate.call(this, m, p__3746, f, args);
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
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3752 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3777 = null;
var G__3777__3778 = (function (coll,k){
var this__3753 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__3777__3779 = (function (coll,k,not_found){
var this__3754 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__3777 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3777__3778.call(this,coll,k);
case  3 :
return G__3777__3779.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3777;
})()
;
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3755 = this;
var new_array__3756 = cljs.core.aclone.call(null,this__3755.array);

(new_array__3756[k] = v);
return (new cljs.core.Vector(this__3755.meta,new_array__3756));
});
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3757 = this;
var new_array__3758 = cljs.core.aclone.call(null,this__3757.array);

new_array__3758.push(o);
return (new cljs.core.Vector(this__3757.meta,new_array__3758));
});
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3781 = null;
var G__3781__3782 = (function (v,f){
var this__3759 = this;
return cljs.core.ci_reduce.call(null,this__3759.array,f);
});
var G__3781__3783 = (function (v,f,start){
var this__3760 = this;
return cljs.core.ci_reduce.call(null,this__3760.array,f,start);
});
G__3781 = function(v,f,start){
switch(arguments.length){
case  2 :
return G__3781__3782.call(this,v,f);
case  3 :
return G__3781__3783.call(this,v,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3781;
})()
;
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3761 = this;
if(cljs.core.truth_((this__3761.array.length > 0)))
{var vector_seq__3762 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_((i < this__3761.array.length)))
{return cljs.core.cons.call(null,(this__3761.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
})));
});

return vector_seq__3762.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3763 = this;
return this__3763.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3764 = this;
var count__3765 = this__3764.array.length;

if(cljs.core.truth_((count__3765 > 0)))
{return (this__3764.array[(count__3765 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3766 = this;
if(cljs.core.truth_((this__3766.array.length > 0)))
{var new_array__3767 = cljs.core.aclone.call(null,this__3766.array);

new_array__3767.pop();
return (new cljs.core.Vector(this__3766.meta,new_array__3767));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__3768 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3769 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3770 = this;
return (new cljs.core.Vector(meta,this__3770.array));
});
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3771 = this;
return this__3771.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3785 = null;
var G__3785__3786 = (function (coll,n){
var this__3772 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3773 = (0 <= n);

if(cljs.core.truth_(and__3546__auto____3773))
{return (n < this__3772.array.length);
} else
{return and__3546__auto____3773;
}
})()))
{return (this__3772.array[n]);
} else
{return null;
}
});
var G__3785__3787 = (function (coll,n,not_found){
var this__3774 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3775 = (0 <= n);

if(cljs.core.truth_(and__3546__auto____3775))
{return (n < this__3774.array.length);
} else
{return and__3546__auto____3775;
}
})()))
{return (this__3774.array[n]);
} else
{return not_found;
}
});
G__3785 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3785__3786.call(this,coll,n);
case  3 :
return G__3785__3787.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3785;
})()
;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3776 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__3776.meta);
});
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,cljs.core.array.call(null)));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs));
});
cljs.core.Vector.prototype.call = (function() {
var G__3789 = null;
var G__3789__3790 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3789__3791 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3789 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3789__3790.call(this,_,k);
case  3 :
return G__3789__3791.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3789;
})()
;
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
vector.cljs$lang$applyTo = (function (arglist__3793){
var args = cljs.core.seq( arglist__3793 );;
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
cljs.core.Subvec.prototype.cljs$core$IHash$ = true;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3794 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$ = true;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3814 = null;
var G__3814__3815 = (function (coll,k){
var this__3795 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__3814__3816 = (function (coll,k,not_found){
var this__3796 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__3814 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3814__3815.call(this,coll,k);
case  3 :
return G__3814__3816.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3814;
})()
;
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = true;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = (function (coll,key,val){
var this__3797 = this;
var v_pos__3798 = (this__3797.start + key);

return (new cljs.core.Subvec(this__3797.meta,cljs.core._assoc.call(null,this__3797.v,v_pos__3798,val),this__3797.start,((this__3797.end > (v_pos__3798 + 1)) ? this__3797.end : (v_pos__3798 + 1))));
});
cljs.core.Subvec.prototype.cljs$core$ISequential$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3799 = this;
return (new cljs.core.Subvec(this__3799.meta,cljs.core._assoc_n.call(null,this__3799.v,this__3799.end,o),this__3799.start,(this__3799.end + 1)));
});
cljs.core.Subvec.prototype.cljs$core$IReduce$ = true;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3818 = null;
var G__3818__3819 = (function (coll,f){
var this__3800 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
var G__3818__3820 = (function (coll,f,start){
var this__3801 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
G__3818 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__3818__3819.call(this,coll,f);
case  3 :
return G__3818__3820.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3818;
})()
;
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = true;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3802 = this;
var subvec_seq__3803 = (function subvec_seq(i){
if(cljs.core.truth_(cljs.core._EQ_.call(null,i,this__3802.end)))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__3802.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}))));
}
});

return subvec_seq__3803.call(null,this__3802.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$ = true;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3804 = this;
return (this__3804.end - this__3804.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$ = true;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3805 = this;
return cljs.core._nth.call(null,this__3805.v,(this__3805.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3806 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,this__3806.start,this__3806.end)))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__3806.meta,this__3806.v,this__3806.start,(this__3806.end - 1)));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$ = true;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__3807 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = true;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3808 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3809 = this;
return (new cljs.core.Subvec(meta,this__3809.v,this__3809.start,this__3809.end));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3810 = this;
return this__3810.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = true;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3822 = null;
var G__3822__3823 = (function (coll,n){
var this__3811 = this;
return cljs.core._nth.call(null,this__3811.v,(this__3811.start + n));
});
var G__3822__3824 = (function (coll,n,not_found){
var this__3812 = this;
return cljs.core._nth.call(null,this__3812.v,(this__3812.start + n),not_found);
});
G__3822 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3822__3823.call(this,coll,n);
case  3 :
return G__3822__3824.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3822;
})()
;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3813 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__3813.meta);
});
/**
* Returns a persistent vector of the items in vector from
* start (inclusive) to end (exclusive).  If end is not supplied,
* defaults to (count vector). This operation is O(1) and very fast, as
* the resulting vector shares structure with the original and no
* trimming is done.
*/
cljs.core.subvec = (function() {
var subvec = null;
var subvec__3826 = (function (v,start){
return subvec.call(null,v,start,cljs.core.count.call(null,v));
});
var subvec__3827 = (function (v,start,end){
return (new cljs.core.Subvec(null,v,start,end));
});
subvec = function(v,start,end){
switch(arguments.length){
case  2 :
return subvec__3826.call(this,v,start);
case  3 :
return subvec__3827.call(this,v,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
return subvec;
})()
;
cljs.core.Subvec.prototype.call = (function() {
var G__3829 = null;
var G__3829__3830 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3829__3831 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3829 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3829__3830.call(this,_,k);
case  3 :
return G__3829__3831.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3829;
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
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3833 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3834 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3835 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3836 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3836.meta);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3837 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3838 = this;
return cljs.core._first.call(null,this__3838.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3839 = this;
var temp__3695__auto____3840 = cljs.core.next.call(null,this__3839.front);

if(cljs.core.truth_(temp__3695__auto____3840))
{var f1__3841 = temp__3695__auto____3840;

return (new cljs.core.PersistentQueueSeq(this__3839.meta,f1__3841,this__3839.rear));
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__3839.rear)))
{return cljs.core._empty.call(null,coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__3839.meta,this__3839.rear,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3842 = this;
return this__3842.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3843 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__3843.front,this__3843.rear));
});

/**
* @constructor
*/
cljs.core.PersistentQueue = (function (meta,count,front,rear){
this.meta = meta;
this.count = count;
this.front = front;
this.rear = rear;
})
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3844 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3845 = this;
if(cljs.core.truth_(this__3845.front))
{return (new cljs.core.PersistentQueue(this__3845.meta,(this__3845.count + 1),this__3845.front,cljs.core.conj.call(null,(function (){var or__3548__auto____3846 = this__3845.rear;

if(cljs.core.truth_(or__3548__auto____3846))
{return or__3548__auto____3846;
} else
{return cljs.core.Vector.fromArray([]);
}
})(),o)));
} else
{return (new cljs.core.PersistentQueue(this__3845.meta,(this__3845.count + 1),cljs.core.conj.call(null,this__3845.front,o),cljs.core.Vector.fromArray([])));
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3847 = this;
var rear__3848 = cljs.core.seq.call(null,this__3847.rear);

if(cljs.core.truth_((function (){var or__3548__auto____3849 = this__3847.front;

if(cljs.core.truth_(or__3548__auto____3849))
{return or__3548__auto____3849;
} else
{return rear__3848;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__3847.front,cljs.core.seq.call(null,rear__3848)));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3850 = this;
return this__3850.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3851 = this;
return cljs.core._first.call(null,this__3851.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3852 = this;
if(cljs.core.truth_(this__3852.front))
{var temp__3695__auto____3853 = cljs.core.next.call(null,this__3852.front);

if(cljs.core.truth_(temp__3695__auto____3853))
{var f1__3854 = temp__3695__auto____3853;

return (new cljs.core.PersistentQueue(this__3852.meta,(this__3852.count - 1),f1__3854,this__3852.rear));
} else
{return (new cljs.core.PersistentQueue(this__3852.meta,(this__3852.count - 1),cljs.core.seq.call(null,this__3852.rear),cljs.core.Vector.fromArray([])));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3855 = this;
return cljs.core.first.call(null,this__3855.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3856 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3857 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3858 = this;
return (new cljs.core.PersistentQueue(meta,this__3858.count,this__3858.front,this__3858.rear));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3859 = this;
return this__3859.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3860 = this;
return cljs.core.PersistentQueue.EMPTY;
});
cljs.core.PersistentQueue.EMPTY = (new cljs.core.PersistentQueue(null,0,null,cljs.core.Vector.fromArray([])));

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
})
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__3861 = this;
return false;
});
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
var len__3862 = array.length;

var i__3863 = 0;

while(true){
if(cljs.core.truth_((i__3863 < len__3862)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,k,(array[i__3863]))))
{return i__3863;
} else
{{
var G__3864 = (i__3863 + incr);
i__3863 = G__3864;
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
var obj_map_contains_key_QMARK___3866 = (function (k,strobj){
return obj_map_contains_key_QMARK_.call(null,k,strobj,true,false);
});
var obj_map_contains_key_QMARK___3867 = (function (k,strobj,true_val,false_val){
if(cljs.core.truth_((function (){var and__3546__auto____3865 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____3865))
{return strobj.hasOwnProperty(k);
} else
{return and__3546__auto____3865;
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
return obj_map_contains_key_QMARK___3866.call(this,k,strobj);
case  4 :
return obj_map_contains_key_QMARK___3867.call(this,k,strobj,true_val,false_val);
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
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3870 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3889 = null;
var G__3889__3890 = (function (coll,k){
var this__3871 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__3889__3891 = (function (coll,k,not_found){
var this__3872 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__3872.strobj,(this__3872.strobj[k]),not_found);
});
G__3889 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3889__3890.call(this,coll,k);
case  3 :
return G__3889__3891.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3889;
})()
;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3873 = this;
if(cljs.core.truth_(goog.isString.call(null,k)))
{var new_strobj__3874 = goog.object.clone.call(null,this__3873.strobj);
var overwrite_QMARK___3875 = new_strobj__3874.hasOwnProperty(k);

(new_strobj__3874[k] = v);
if(cljs.core.truth_(overwrite_QMARK___3875))
{return (new cljs.core.ObjMap(this__3873.meta,this__3873.keys,new_strobj__3874));
} else
{var new_keys__3876 = cljs.core.aclone.call(null,this__3873.keys);

new_keys__3876.push(k);
return (new cljs.core.ObjMap(this__3873.meta,new_keys__3876,new_strobj__3874));
}
} else
{return cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null,k,v),cljs.core.seq.call(null,coll)),this__3873.meta);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__3877 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__3877.strobj);
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__3878 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3879 = this;
if(cljs.core.truth_((this__3879.keys.length > 0)))
{return cljs.core.map.call(null,(function (p1__3869_SHARP_){
return cljs.core.vector.call(null,p1__3869_SHARP_,(this__3879.strobj[p1__3869_SHARP_]));
}),this__3879.keys);
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3880 = this;
return this__3880.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3881 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3882 = this;
return (new cljs.core.ObjMap(meta,this__3882.keys,this__3882.strobj));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3883 = this;
return this__3883.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3884 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__3884.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__3885 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3886 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____3886))
{return this__3885.strobj.hasOwnProperty(k);
} else
{return and__3546__auto____3886;
}
})()))
{var new_keys__3887 = cljs.core.aclone.call(null,this__3885.keys);
var new_strobj__3888 = goog.object.clone.call(null,this__3885.strobj);

new_keys__3887.splice(cljs.core.scan_array.call(null,1,k,new_keys__3887),1);
cljs.core.js_delete.call(null,new_strobj__3888,k);
return (new cljs.core.ObjMap(this__3885.meta,new_keys__3887,new_strobj__3888));
} else
{return coll;
}
});
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,cljs.core.array.call(null),cljs.core.js_obj.call(null)));
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj));
});
cljs.core.ObjMap.prototype.call = (function() {
var G__3894 = null;
var G__3894__3895 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3894__3896 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3894 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3894__3895.call(this,_,k);
case  3 :
return G__3894__3896.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3894;
})()
;

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
})
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3898 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3928 = null;
var G__3928__3929 = (function (coll,k){
var this__3899 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__3928__3930 = (function (coll,k,not_found){
var this__3900 = this;
var bucket__3901 = (this__3900.hashobj[cljs.core.hash.call(null,k)]);
var i__3902 = (cljs.core.truth_(bucket__3901)?cljs.core.scan_array.call(null,2,k,bucket__3901):null);

if(cljs.core.truth_(i__3902))
{return (bucket__3901[(i__3902 + 1)]);
} else
{return not_found;
}
});
G__3928 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3928__3929.call(this,coll,k);
case  3 :
return G__3928__3930.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3928;
})()
;
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3903 = this;
var h__3904 = cljs.core.hash.call(null,k);
var bucket__3905 = (this__3903.hashobj[h__3904]);

if(cljs.core.truth_(bucket__3905))
{var new_bucket__3906 = cljs.core.aclone.call(null,bucket__3905);
var new_hashobj__3907 = goog.object.clone.call(null,this__3903.hashobj);

(new_hashobj__3907[h__3904] = new_bucket__3906);
var temp__3695__auto____3908 = cljs.core.scan_array.call(null,2,k,new_bucket__3906);

if(cljs.core.truth_(temp__3695__auto____3908))
{var i__3909 = temp__3695__auto____3908;

(new_bucket__3906[(i__3909 + 1)] = v);
return (new cljs.core.HashMap(this__3903.meta,this__3903.count,new_hashobj__3907));
} else
{new_bucket__3906.push(k,v);
return (new cljs.core.HashMap(this__3903.meta,(this__3903.count + 1),new_hashobj__3907));
}
} else
{var new_hashobj__3910 = goog.object.clone.call(null,this__3903.hashobj);

(new_hashobj__3910[h__3904] = cljs.core.array.call(null,k,v));
return (new cljs.core.HashMap(this__3903.meta,(this__3903.count + 1),new_hashobj__3910));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__3911 = this;
var bucket__3912 = (this__3911.hashobj[cljs.core.hash.call(null,k)]);
var i__3913 = (cljs.core.truth_(bucket__3912)?cljs.core.scan_array.call(null,2,k,bucket__3912):null);

if(cljs.core.truth_(i__3913))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__3914 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3915 = this;
if(cljs.core.truth_((this__3915.count > 0)))
{var hashes__3916 = cljs.core.js_keys.call(null,this__3915.hashobj);

return cljs.core.mapcat.call(null,(function (p1__3893_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__3915.hashobj[p1__3893_SHARP_])));
}),hashes__3916);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3917 = this;
return this__3917.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3918 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3919 = this;
return (new cljs.core.HashMap(meta,this__3919.count,this__3919.hashobj));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3920 = this;
return this__3920.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3921 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__3921.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__3922 = this;
var h__3923 = cljs.core.hash.call(null,k);
var bucket__3924 = (this__3922.hashobj[h__3923]);
var i__3925 = (cljs.core.truth_(bucket__3924)?cljs.core.scan_array.call(null,2,k,bucket__3924):null);

if(cljs.core.truth_(cljs.core.not.call(null,i__3925)))
{return coll;
} else
{var new_hashobj__3926 = goog.object.clone.call(null,this__3922.hashobj);

if(cljs.core.truth_((3 > bucket__3924.length)))
{cljs.core.js_delete.call(null,new_hashobj__3926,h__3923);
} else
{var new_bucket__3927 = cljs.core.aclone.call(null,bucket__3924);

new_bucket__3927.splice(i__3925,2);
(new_hashobj__3926[h__3923] = new_bucket__3927);
}
return (new cljs.core.HashMap(this__3922.meta,(this__3922.count - 1),new_hashobj__3926));
}
});
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,cljs.core.js_obj.call(null)));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__3932 = ks.length;

var i__3933 = 0;
var out__3934 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_((i__3933 < len__3932)))
{{
var G__3935 = (i__3933 + 1);
var G__3936 = cljs.core.assoc.call(null,out__3934,(ks[i__3933]),(vs[i__3933]));
i__3933 = G__3935;
out__3934 = G__3936;
continue;
}
} else
{return out__3934;
}
break;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__3937 = null;
var G__3937__3938 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3937__3939 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3937 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3937__3938.call(this,_,k);
case  3 :
return G__3937__3939.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3937;
})()
;
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in$__3941 = cljs.core.seq.call(null,keyvals);
var out__3942 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_(in$__3941))
{{
var G__3943 = cljs.core.nnext.call(null,in$__3941);
var G__3944 = cljs.core.assoc.call(null,out__3942,cljs.core.first.call(null,in$__3941),cljs.core.second.call(null,in$__3941));
in$__3941 = G__3943;
out__3942 = G__3944;
continue;
}
} else
{return out__3942;
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
hash_map.cljs$lang$applyTo = (function (arglist__3945){
var keyvals = cljs.core.seq( arglist__3945 );;
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
{return cljs.core.reduce.call(null,(function (p1__3946_SHARP_,p2__3947_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3548__auto____3948 = p1__3946_SHARP_;

if(cljs.core.truth_(or__3548__auto____3948))
{return or__3548__auto____3948;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),p2__3947_SHARP_);
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
merge.cljs$lang$applyTo = (function (arglist__3949){
var maps = cljs.core.seq( arglist__3949 );;
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
{var merge_entry__3952 = (function (m,e){
var k__3950 = cljs.core.first.call(null,e);
var v__3951 = cljs.core.second.call(null,e);

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,m,k__3950)))
{return cljs.core.assoc.call(null,m,k__3950,f.call(null,cljs.core.get.call(null,m,k__3950),v__3951));
} else
{return cljs.core.assoc.call(null,m,k__3950,v__3951);
}
});
var merge2__3954 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__3952,(function (){var or__3548__auto____3953 = m1;

if(cljs.core.truth_(or__3548__auto____3953))
{return or__3548__auto____3953;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),cljs.core.seq.call(null,m2));
});

return cljs.core.reduce.call(null,merge2__3954,maps);
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
merge_with.cljs$lang$applyTo = (function (arglist__3955){
var f = cljs.core.first(arglist__3955);
var maps = cljs.core.rest(arglist__3955);
return merge_with__delegate.call(this, f, maps);
});
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__3957 = cljs.core.ObjMap.fromObject([],{});
var keys__3958 = cljs.core.seq.call(null,keyseq);

while(true){
if(cljs.core.truth_(keys__3958))
{var key__3959 = cljs.core.first.call(null,keys__3958);
var entry__3960 = cljs.core.get.call(null,map,key__3959,"﷐'user/not-found");

{
var G__3961 = (cljs.core.truth_(cljs.core.not_EQ_.call(null,entry__3960,"﷐'user/not-found"))?cljs.core.assoc.call(null,ret__3957,key__3959,entry__3960):ret__3957);
var G__3962 = cljs.core.next.call(null,keys__3958);
ret__3957 = G__3961;
keys__3958 = G__3962;
continue;
}
} else
{return ret__3957;
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
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3963 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3976 = null;
var G__3976__3977 = (function (coll,v){
var this__3964 = this;
return cljs.core._lookup.call(null,coll,v,null);
});
var G__3976__3978 = (function (coll,v,not_found){
var this__3965 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__3965.hash_map,v)))
{return v;
} else
{return not_found;
}
});
G__3976 = function(coll,v,not_found){
switch(arguments.length){
case  2 :
return G__3976__3977.call(this,coll,v);
case  3 :
return G__3976__3978.call(this,coll,v,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3976;
})()
;
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3966 = this;
return (new cljs.core.Set(this__3966.meta,cljs.core.assoc.call(null,this__3966.hash_map,o,null)));
});
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3967 = this;
return cljs.core.keys.call(null,this__3967.hash_map);
});
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = (function (coll,v){
var this__3968 = this;
return (new cljs.core.Set(this__3968.meta,cljs.core.dissoc.call(null,this__3968.hash_map,v)));
});
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3969 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3970 = this;
var and__3546__auto____3971 = cljs.core.set_QMARK_.call(null,other);

if(cljs.core.truth_(and__3546__auto____3971))
{var and__3546__auto____3972 = cljs.core._EQ_.call(null,cljs.core.count.call(null,coll),cljs.core.count.call(null,other));

if(cljs.core.truth_(and__3546__auto____3972))
{return cljs.core.every_QMARK_.call(null,(function (p1__3956_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__3956_SHARP_);
}),other);
} else
{return and__3546__auto____3972;
}
} else
{return and__3546__auto____3971;
}
});
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3973 = this;
return (new cljs.core.Set(meta,this__3973.hash_map));
});
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3974 = this;
return this__3974.meta;
});
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3975 = this;
return cljs.core.with_meta.call(null,cljs.core.Set.EMPTY,this__3975.meta);
});
cljs.core.Set.EMPTY = (new cljs.core.Set(null,cljs.core.hash_map.call(null)));
cljs.core.Set.prototype.call = (function() {
var G__3980 = null;
var G__3980__3981 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3980__3982 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3980 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3980__3981.call(this,_,k);
case  3 :
return G__3980__3982.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3980;
})()
;
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
var in$__3985 = cljs.core.seq.call(null,coll);
var out__3986 = cljs.core.Set.EMPTY;

while(true){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core.empty_QMARK_.call(null,in$__3985))))
{{
var G__3987 = cljs.core.rest.call(null,in$__3985);
var G__3988 = cljs.core.conj.call(null,out__3986,cljs.core.first.call(null,in$__3985));
in$__3985 = G__3987;
out__3986 = G__3988;
continue;
}
} else
{return out__3986;
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
{var n__3989 = cljs.core.count.call(null,coll);

return cljs.core.reduce.call(null,(function (v,i){
var temp__3695__auto____3990 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));

if(cljs.core.truth_(temp__3695__auto____3990))
{var e__3991 = temp__3695__auto____3990;

return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__3991));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__3989,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__3984_SHARP_){
var temp__3695__auto____3992 = cljs.core.find.call(null,smap,p1__3984_SHARP_);

if(cljs.core.truth_(temp__3695__auto____3992))
{var e__3993 = temp__3695__auto____3992;

return cljs.core.second.call(null,e__3993);
} else
{return p1__3984_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__4001 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__3994,seen){
while(true){
var vec__3995__3996 = p__3994;
var f__3997 = cljs.core.nth.call(null,vec__3995__3996,0,null);
var xs__3998 = vec__3995__3996;

var temp__3698__auto____3999 = cljs.core.seq.call(null,xs__3998);

if(cljs.core.truth_(temp__3698__auto____3999))
{var s__4000 = temp__3698__auto____3999;

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,seen,f__3997)))
{{
var G__4002 = cljs.core.rest.call(null,s__4000);
var G__4003 = seen;
p__3994 = G__4002;
seen = G__4003;
continue;
}
} else
{return cljs.core.cons.call(null,f__3997,step.call(null,cljs.core.rest.call(null,s__4000),cljs.core.conj.call(null,seen,f__3997)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
})));
});

return step__4001.call(null,coll,cljs.core.set([]));
});
cljs.core.butlast = (function butlast(s){
var ret__4004 = cljs.core.Vector.fromArray([]);
var s__4005 = s;

while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s__4005)))
{{
var G__4006 = cljs.core.conj.call(null,ret__4004,cljs.core.first.call(null,s__4005));
var G__4007 = cljs.core.next.call(null,s__4005);
ret__4004 = G__4006;
s__4005 = G__4007;
continue;
}
} else
{return cljs.core.seq.call(null,ret__4004);
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
{if(cljs.core.truth_((function (){var or__3548__auto____4008 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____4008))
{return or__3548__auto____4008;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__4009 = x.lastIndexOf("/");

if(cljs.core.truth_((i__4009 < 0)))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__4009 + 1));
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
if(cljs.core.truth_((function (){var or__3548__auto____4010 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____4010))
{return or__3548__auto____4010;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__4011 = x.lastIndexOf("/");

if(cljs.core.truth_((i__4011 > -1)))
{return cljs.core.subs.call(null,x,2,i__4011);
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
var map__4014 = cljs.core.ObjMap.fromObject([],{});
var ks__4015 = cljs.core.seq.call(null,keys);
var vs__4016 = cljs.core.seq.call(null,vals);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____4017 = ks__4015;

if(cljs.core.truth_(and__3546__auto____4017))
{return vs__4016;
} else
{return and__3546__auto____4017;
}
})()))
{{
var G__4018 = cljs.core.assoc.call(null,map__4014,cljs.core.first.call(null,ks__4015),cljs.core.first.call(null,vs__4016));
var G__4019 = cljs.core.next.call(null,ks__4015);
var G__4020 = cljs.core.next.call(null,vs__4016);
map__4014 = G__4018;
ks__4015 = G__4019;
vs__4016 = G__4020;
continue;
}
} else
{return map__4014;
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
var max_key__4023 = (function (k,x){
return x;
});
var max_key__4024 = (function (k,x,y){
if(cljs.core.truth_((k.call(null,x) > k.call(null,y))))
{return x;
} else
{return y;
}
});
var max_key__4025 = (function() { 
var G__4027__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__4012_SHARP_,p2__4013_SHARP_){
return max_key.call(null,k,p1__4012_SHARP_,p2__4013_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__4027 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4027__delegate.call(this, k, x, y, more);
};
G__4027.cljs$lang$maxFixedArity = 3;
G__4027.cljs$lang$applyTo = (function (arglist__4028){
var k = cljs.core.first(arglist__4028);
var x = cljs.core.first(cljs.core.next(arglist__4028));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4028)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4028)));
return G__4027__delegate.call(this, k, x, y, more);
});
return G__4027;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return max_key__4023.call(this,k,x);
case  3 :
return max_key__4024.call(this,k,x,y);
default:
return max_key__4025.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__4025.cljs$lang$applyTo;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__4029 = (function (k,x){
return x;
});
var min_key__4030 = (function (k,x,y){
if(cljs.core.truth_((k.call(null,x) < k.call(null,y))))
{return x;
} else
{return y;
}
});
var min_key__4031 = (function() { 
var G__4033__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__4021_SHARP_,p2__4022_SHARP_){
return min_key.call(null,k,p1__4021_SHARP_,p2__4022_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__4033 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4033__delegate.call(this, k, x, y, more);
};
G__4033.cljs$lang$maxFixedArity = 3;
G__4033.cljs$lang$applyTo = (function (arglist__4034){
var k = cljs.core.first(arglist__4034);
var x = cljs.core.first(cljs.core.next(arglist__4034));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4034)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4034)));
return G__4033__delegate.call(this, k, x, y, more);
});
return G__4033;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return min_key__4029.call(this,k,x);
case  3 :
return min_key__4030.call(this,k,x,y);
default:
return min_key__4031.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__4031.cljs$lang$applyTo;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__4037 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__4038 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4035 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4035))
{var s__4036 = temp__3698__auto____4035;

return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__4036),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__4036)));
} else
{return null;
}
})));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case  2 :
return partition_all__4037.call(this,n,step);
case  3 :
return partition_all__4038.call(this,n,step,coll);
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
var temp__3698__auto____4040 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4040))
{var s__4041 = temp__3698__auto____4040;

if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__4041))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__4041),take_while.call(null,pred,cljs.core.rest.call(null,s__4041)));
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
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = (function (rng){
var this__4042 = this;
return cljs.core.hash_coll.call(null,rng);
});
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = (function (rng,o){
var this__4043 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = (function() {
var G__4059 = null;
var G__4059__4060 = (function (rng,f){
var this__4044 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
var G__4059__4061 = (function (rng,f,s){
var this__4045 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
G__4059 = function(rng,f,s){
switch(arguments.length){
case  2 :
return G__4059__4060.call(this,rng,f);
case  3 :
return G__4059__4061.call(this,rng,f,s);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4059;
})()
;
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = (function (rng){
var this__4046 = this;
var comp__4047 = (cljs.core.truth_((this__4046.step > 0))?cljs.core._LT_:cljs.core._GT_);

if(cljs.core.truth_(comp__4047.call(null,this__4046.start,this__4046.end)))
{return rng;
} else
{return null;
}
});
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = (function (rng){
var this__4048 = this;
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._seq.call(null,rng))))
{return 0;
} else
{return Math['ceil'].call(null,((this__4048.end - this__4048.start) / this__4048.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = (function (rng){
var this__4049 = this;
return this__4049.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest = (function (rng){
var this__4050 = this;
if(cljs.core.truth_(cljs.core._seq.call(null,rng)))
{return (new cljs.core.Range(this__4050.meta,(this__4050.start + this__4050.step),this__4050.end,this__4050.step));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = (function (rng,other){
var this__4051 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = (function (rng,meta){
var this__4052 = this;
return (new cljs.core.Range(meta,this__4052.start,this__4052.end,this__4052.step));
});
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = (function (rng){
var this__4053 = this;
return this__4053.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = (function() {
var G__4063 = null;
var G__4063__4064 = (function (rng,n){
var this__4054 = this;
if(cljs.core.truth_((n < cljs.core._count.call(null,rng))))
{return (this__4054.start + (n * this__4054.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____4055 = (this__4054.start > this__4054.end);

if(cljs.core.truth_(and__3546__auto____4055))
{return cljs.core._EQ_.call(null,this__4054.step,0);
} else
{return and__3546__auto____4055;
}
})()))
{return this__4054.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
var G__4063__4065 = (function (rng,n,not_found){
var this__4056 = this;
if(cljs.core.truth_((n < cljs.core._count.call(null,rng))))
{return (this__4056.start + (n * this__4056.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____4057 = (this__4056.start > this__4056.end);

if(cljs.core.truth_(and__3546__auto____4057))
{return cljs.core._EQ_.call(null,this__4056.step,0);
} else
{return and__3546__auto____4057;
}
})()))
{return this__4056.start;
} else
{return not_found;
}
}
});
G__4063 = function(rng,n,not_found){
switch(arguments.length){
case  2 :
return G__4063__4064.call(this,rng,n);
case  3 :
return G__4063__4065.call(this,rng,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__4063;
})()
;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = (function (rng){
var this__4058 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__4058.meta);
});
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__4067 = (function (){
return range.call(null,0,Number['MAX_VALUE'],1);
});
var range__4068 = (function (end){
return range.call(null,0,end,1);
});
var range__4069 = (function (start,end){
return range.call(null,start,end,1);
});
var range__4070 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step));
});
range = function(start,end,step){
switch(arguments.length){
case  0 :
return range__4067.call(this);
case  1 :
return range__4068.call(this,start);
case  2 :
return range__4069.call(this,start,end);
case  3 :
return range__4070.call(this,start,end,step);
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
var temp__3698__auto____4072 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4072))
{var s__4073 = temp__3698__auto____4072;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__4073),take_nth.call(null,n,cljs.core.drop.call(null,n,s__4073)));
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
var temp__3698__auto____4075 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4075))
{var s__4076 = temp__3698__auto____4075;

var fst__4077 = cljs.core.first.call(null,s__4076);
var fv__4078 = f.call(null,fst__4077);
var run__4079 = cljs.core.cons.call(null,fst__4077,cljs.core.take_while.call(null,(function (p1__4074_SHARP_){
return cljs.core._EQ_.call(null,fv__4078,f.call(null,p1__4074_SHARP_));
}),cljs.core.next.call(null,s__4076)));

return cljs.core.cons.call(null,run__4079,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__4079),s__4076))));
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
var reductions__4094 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____4090 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____4090))
{var s__4091 = temp__3695__auto____4090;

return reductions.call(null,f,cljs.core.first.call(null,s__4091),cljs.core.rest.call(null,s__4091));
} else
{return cljs.core.list.call(null,f.call(null));
}
})));
});
var reductions__4095 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____4092 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____4092))
{var s__4093 = temp__3698__auto____4092;

return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__4093)),cljs.core.rest.call(null,s__4093));
} else
{return null;
}
}))));
});
reductions = function(f,init,coll){
switch(arguments.length){
case  2 :
return reductions__4094.call(this,f,init);
case  3 :
return reductions__4095.call(this,f,init,coll);
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
var juxt__4098 = (function (f){
return (function() {
var G__4103 = null;
var G__4103__4104 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__4103__4105 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__4103__4106 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__4103__4107 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__4103__4108 = (function() { 
var G__4110__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__4110 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4110__delegate.call(this, x, y, z, args);
};
G__4110.cljs$lang$maxFixedArity = 3;
G__4110.cljs$lang$applyTo = (function (arglist__4111){
var x = cljs.core.first(arglist__4111);
var y = cljs.core.first(cljs.core.next(arglist__4111));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4111)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4111)));
return G__4110__delegate.call(this, x, y, z, args);
});
return G__4110;
})()
;
G__4103 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4103__4104.call(this);
case  1 :
return G__4103__4105.call(this,x);
case  2 :
return G__4103__4106.call(this,x,y);
case  3 :
return G__4103__4107.call(this,x,y,z);
default:
return G__4103__4108.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4103.cljs$lang$maxFixedArity = 3;
G__4103.cljs$lang$applyTo = G__4103__4108.cljs$lang$applyTo;
return G__4103;
})()
});
var juxt__4099 = (function (f,g){
return (function() {
var G__4112 = null;
var G__4112__4113 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__4112__4114 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__4112__4115 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__4112__4116 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__4112__4117 = (function() { 
var G__4119__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__4119 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4119__delegate.call(this, x, y, z, args);
};
G__4119.cljs$lang$maxFixedArity = 3;
G__4119.cljs$lang$applyTo = (function (arglist__4120){
var x = cljs.core.first(arglist__4120);
var y = cljs.core.first(cljs.core.next(arglist__4120));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4120)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4120)));
return G__4119__delegate.call(this, x, y, z, args);
});
return G__4119;
})()
;
G__4112 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4112__4113.call(this);
case  1 :
return G__4112__4114.call(this,x);
case  2 :
return G__4112__4115.call(this,x,y);
case  3 :
return G__4112__4116.call(this,x,y,z);
default:
return G__4112__4117.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4112.cljs$lang$maxFixedArity = 3;
G__4112.cljs$lang$applyTo = G__4112__4117.cljs$lang$applyTo;
return G__4112;
})()
});
var juxt__4100 = (function (f,g,h){
return (function() {
var G__4121 = null;
var G__4121__4122 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__4121__4123 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__4121__4124 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__4121__4125 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__4121__4126 = (function() { 
var G__4128__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__4128 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4128__delegate.call(this, x, y, z, args);
};
G__4128.cljs$lang$maxFixedArity = 3;
G__4128.cljs$lang$applyTo = (function (arglist__4129){
var x = cljs.core.first(arglist__4129);
var y = cljs.core.first(cljs.core.next(arglist__4129));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4129)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4129)));
return G__4128__delegate.call(this, x, y, z, args);
});
return G__4128;
})()
;
G__4121 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4121__4122.call(this);
case  1 :
return G__4121__4123.call(this,x);
case  2 :
return G__4121__4124.call(this,x,y);
case  3 :
return G__4121__4125.call(this,x,y,z);
default:
return G__4121__4126.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4121.cljs$lang$maxFixedArity = 3;
G__4121.cljs$lang$applyTo = G__4121__4126.cljs$lang$applyTo;
return G__4121;
})()
});
var juxt__4101 = (function() { 
var G__4130__delegate = function (f,g,h,fs){
var fs__4097 = cljs.core.list_STAR_.call(null,f,g,h,fs);

return (function() {
var G__4131 = null;
var G__4131__4132 = (function (){
return cljs.core.reduce.call(null,(function (p1__4080_SHARP_,p2__4081_SHARP_){
return cljs.core.conj.call(null,p1__4080_SHARP_,p2__4081_SHARP_.call(null));
}),cljs.core.Vector.fromArray([]),fs__4097);
});
var G__4131__4133 = (function (x){
return cljs.core.reduce.call(null,(function (p1__4082_SHARP_,p2__4083_SHARP_){
return cljs.core.conj.call(null,p1__4082_SHARP_,p2__4083_SHARP_.call(null,x));
}),cljs.core.Vector.fromArray([]),fs__4097);
});
var G__4131__4134 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__4084_SHARP_,p2__4085_SHARP_){
return cljs.core.conj.call(null,p1__4084_SHARP_,p2__4085_SHARP_.call(null,x,y));
}),cljs.core.Vector.fromArray([]),fs__4097);
});
var G__4131__4135 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__4086_SHARP_,p2__4087_SHARP_){
return cljs.core.conj.call(null,p1__4086_SHARP_,p2__4087_SHARP_.call(null,x,y,z));
}),cljs.core.Vector.fromArray([]),fs__4097);
});
var G__4131__4136 = (function() { 
var G__4138__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__4088_SHARP_,p2__4089_SHARP_){
return cljs.core.conj.call(null,p1__4088_SHARP_,cljs.core.apply.call(null,p2__4089_SHARP_,x,y,z,args));
}),cljs.core.Vector.fromArray([]),fs__4097);
};
var G__4138 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4138__delegate.call(this, x, y, z, args);
};
G__4138.cljs$lang$maxFixedArity = 3;
G__4138.cljs$lang$applyTo = (function (arglist__4139){
var x = cljs.core.first(arglist__4139);
var y = cljs.core.first(cljs.core.next(arglist__4139));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4139)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4139)));
return G__4138__delegate.call(this, x, y, z, args);
});
return G__4138;
})()
;
G__4131 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__4131__4132.call(this);
case  1 :
return G__4131__4133.call(this,x);
case  2 :
return G__4131__4134.call(this,x,y);
case  3 :
return G__4131__4135.call(this,x,y,z);
default:
return G__4131__4136.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__4131.cljs$lang$maxFixedArity = 3;
G__4131.cljs$lang$applyTo = G__4131__4136.cljs$lang$applyTo;
return G__4131;
})()
};
var G__4130 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__4130__delegate.call(this, f, g, h, fs);
};
G__4130.cljs$lang$maxFixedArity = 3;
G__4130.cljs$lang$applyTo = (function (arglist__4140){
var f = cljs.core.first(arglist__4140);
var g = cljs.core.first(cljs.core.next(arglist__4140));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4140)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4140)));
return G__4130__delegate.call(this, f, g, h, fs);
});
return G__4130;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case  1 :
return juxt__4098.call(this,f);
case  2 :
return juxt__4099.call(this,f,g);
case  3 :
return juxt__4100.call(this,f,g,h);
default:
return juxt__4101.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__4101.cljs$lang$applyTo;
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
var dorun__4142 = (function (coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{{
var G__4145 = cljs.core.next.call(null,coll);
coll = G__4145;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__4143 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3546__auto____4141 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(and__3546__auto____4141))
{return (n > 0);
} else
{return and__3546__auto____4141;
}
})()))
{{
var G__4146 = (n - 1);
var G__4147 = cljs.core.next.call(null,coll);
n = G__4146;
coll = G__4147;
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
return dorun__4142.call(this,n);
case  2 :
return dorun__4143.call(this,n,coll);
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
var doall__4148 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__4149 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case  1 :
return doall__4148.call(this,n);
case  2 :
return doall__4149.call(this,n,coll);
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
var matches__4151 = re.exec(s);

if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__4151),s)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__4151),1)))
{return cljs.core.first.call(null,matches__4151);
} else
{return cljs.core.vec.call(null,matches__4151);
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
var matches__4152 = re.exec(s);

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,matches__4152)))
{return null;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__4152),1)))
{return cljs.core.first.call(null,matches__4152);
} else
{return cljs.core.vec.call(null,matches__4152);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__4153 = cljs.core.re_find.call(null,re,s);
var match_idx__4154 = s.search(re);
var match_str__4155 = (cljs.core.truth_(cljs.core.coll_QMARK_.call(null,match_data__4153))?cljs.core.first.call(null,match_data__4153):match_data__4153);
var post_match__4156 = cljs.core.subs.call(null,s,(match_idx__4154 + cljs.core.count.call(null,match_str__4155)));

if(cljs.core.truth_(match_data__4153))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__4153,re_seq.call(null,re,post_match__4156));
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
return cljs.core.concat.call(null,cljs.core.Vector.fromArray([begin]),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.Vector.fromArray([sep]),cljs.core.map.call(null,(function (p1__4157_SHARP_){
return print_one.call(null,p1__4157_SHARP_,opts);
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
{if(cljs.core.truth_(cljs.core.undefined_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3546__auto____4158 = cljs.core.get.call(null,opts,"﷐'meta");

if(cljs.core.truth_(and__3546__auto____4158))
{var and__3546__auto____4162 = (function (){var x__417__auto____4159 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____4160 = x__417__auto____4159;

if(cljs.core.truth_(and__3546__auto____4160))
{var and__3546__auto____4161 = x__417__auto____4159.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____4161))
{return cljs.core.not.call(null,x__417__auto____4159.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____4161;
}
} else
{return and__3546__auto____4160;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__417__auto____4159);
}
})();

if(cljs.core.truth_(and__3546__auto____4162))
{return cljs.core.meta.call(null,obj);
} else
{return and__3546__auto____4162;
}
} else
{return and__3546__auto____4158;
}
})())?cljs.core.concat.call(null,cljs.core.Vector.fromArray(["^"]),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.Vector.fromArray([" "])):null),(cljs.core.truth_((function (){var x__417__auto____4163 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____4164 = x__417__auto____4163;

if(cljs.core.truth_(and__3546__auto____4164))
{var and__3546__auto____4165 = x__417__auto____4163.cljs$core$IPrintable$;

if(cljs.core.truth_(and__3546__auto____4165))
{return cljs.core.not.call(null,x__417__auto____4163.hasOwnProperty("cljs$core$IPrintable$"));
} else
{return and__3546__auto____4165;
}
} else
{return and__3546__auto____4164;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,x__417__auto____4163);
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
var first_obj__4166 = cljs.core.first.call(null,objs);
var sb__4167 = (new goog.string.StringBuffer());

var G__4168__4169 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__4168__4169))
{var obj__4170 = cljs.core.first.call(null,G__4168__4169);
var G__4168__4171 = G__4168__4169;

while(true){
if(cljs.core.truth_((obj__4170 === first_obj__4166)))
{} else
{sb__4167.append(" ");
}
var G__4172__4173 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__4170,opts));

if(cljs.core.truth_(G__4172__4173))
{var string__4174 = cljs.core.first.call(null,G__4172__4173);
var G__4172__4175 = G__4172__4173;

while(true){
sb__4167.append(string__4174);
var temp__3698__auto____4176 = cljs.core.next.call(null,G__4172__4175);

if(cljs.core.truth_(temp__3698__auto____4176))
{var G__4172__4177 = temp__3698__auto____4176;

{
var G__4180 = cljs.core.first.call(null,G__4172__4177);
var G__4181 = G__4172__4177;
string__4174 = G__4180;
G__4172__4175 = G__4181;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____4178 = cljs.core.next.call(null,G__4168__4171);

if(cljs.core.truth_(temp__3698__auto____4178))
{var G__4168__4179 = temp__3698__auto____4178;

{
var G__4182 = cljs.core.first.call(null,G__4168__4179);
var G__4183 = G__4168__4179;
obj__4170 = G__4182;
G__4168__4171 = G__4183;
continue;
}
} else
{}
break;
}
} else
{}
return cljs.core.str.call(null,sb__4167);
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var first_obj__4184 = cljs.core.first.call(null,objs);

var G__4185__4186 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__4185__4186))
{var obj__4187 = cljs.core.first.call(null,G__4185__4186);
var G__4185__4188 = G__4185__4186;

while(true){
if(cljs.core.truth_((obj__4187 === first_obj__4184)))
{} else
{cljs.core.string_print.call(null," ");
}
var G__4189__4190 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__4187,opts));

if(cljs.core.truth_(G__4189__4190))
{var string__4191 = cljs.core.first.call(null,G__4189__4190);
var G__4189__4192 = G__4189__4190;

while(true){
cljs.core.string_print.call(null,string__4191);
var temp__3698__auto____4193 = cljs.core.next.call(null,G__4189__4192);

if(cljs.core.truth_(temp__3698__auto____4193))
{var G__4189__4194 = temp__3698__auto____4193;

{
var G__4197 = cljs.core.first.call(null,G__4189__4194);
var G__4198 = G__4189__4194;
string__4191 = G__4197;
G__4189__4192 = G__4198;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____4195 = cljs.core.next.call(null,G__4185__4188);

if(cljs.core.truth_(temp__3698__auto____4195))
{var G__4185__4196 = temp__3698__auto____4195;

{
var G__4199 = cljs.core.first.call(null,G__4185__4196);
var G__4200 = G__4185__4196;
obj__4187 = G__4199;
G__4185__4188 = G__4200;
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
pr_str.cljs$lang$applyTo = (function (arglist__4201){
var objs = cljs.core.seq( arglist__4201 );;
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
pr.cljs$lang$applyTo = (function (arglist__4202){
var objs = cljs.core.seq( arglist__4202 );;
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
cljs_core_print.cljs$lang$applyTo = (function (arglist__4203){
var objs = cljs.core.seq( arglist__4203 );;
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
println.cljs$lang$applyTo = (function (arglist__4204){
var objs = cljs.core.seq( arglist__4204 );;
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
prn.cljs$lang$applyTo = (function (arglist__4205){
var objs = cljs.core.seq( arglist__4205 );;
return prn__delegate.call(this, objs);
});
return prn;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__4206 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__4206,"{",", ","}",opts,coll);
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
{return cljs.core.list.call(null,cljs.core.str.call(null,":",(function (){var temp__3698__auto____4207 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____4207))
{var nspc__4208 = temp__3698__auto____4207;

return cljs.core.str.call(null,nspc__4208,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,(function (){var temp__3698__auto____4209 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____4209))
{var nspc__4210 = temp__3698__auto____4209;

return cljs.core.str.call(null,nspc__4210,"/");
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
var pr_pair__4211 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__4211,"{",", ","}",opts,coll);
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
cljs.core.Atom.prototype.cljs$core$IHash$ = true;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = (function (this$){
var this__4212 = this;
return goog.getUid.call(null,this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = (function (this$,oldval,newval){
var this__4213 = this;
var G__4214__4215 = cljs.core.seq.call(null,this__4213.watches);

if(cljs.core.truth_(G__4214__4215))
{var G__4217__4219 = cljs.core.first.call(null,G__4214__4215);
var vec__4218__4220 = G__4217__4219;
var key__4221 = cljs.core.nth.call(null,vec__4218__4220,0,null);
var f__4222 = cljs.core.nth.call(null,vec__4218__4220,1,null);
var G__4214__4223 = G__4214__4215;

var G__4217__4224 = G__4217__4219;
var G__4214__4225 = G__4214__4223;

while(true){
var vec__4226__4227 = G__4217__4224;
var key__4228 = cljs.core.nth.call(null,vec__4226__4227,0,null);
var f__4229 = cljs.core.nth.call(null,vec__4226__4227,1,null);
var G__4214__4230 = G__4214__4225;

f__4229.call(null,key__4228,this$,oldval,newval);
var temp__3698__auto____4231 = cljs.core.next.call(null,G__4214__4230);

if(cljs.core.truth_(temp__3698__auto____4231))
{var G__4214__4232 = temp__3698__auto____4231;

{
var G__4239 = cljs.core.first.call(null,G__4214__4232);
var G__4240 = G__4214__4232;
G__4217__4224 = G__4239;
G__4214__4225 = G__4240;
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
var this__4233 = this;
return this$.watches = cljs.core.assoc.call(null,this__4233.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = (function (this$,key){
var this__4234 = this;
return this$.watches = cljs.core.dissoc.call(null,this__4234.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = (function (a,opts){
var this__4235 = this;
return cljs.core.concat.call(null,cljs.core.Vector.fromArray(["#<Atom: "]),cljs.core._pr_seq.call(null,this__4235.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = (function (_){
var this__4236 = this;
return this__4236.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = (function (_){
var this__4237 = this;
return this__4237.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__4238 = this;
return (o === other);
});
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
var atom__4247 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__4248 = (function() { 
var G__4250__delegate = function (x,p__4241){
var map__4242__4243 = p__4241;
var map__4242__4244 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__4242__4243))?cljs.core.apply.call(null,cljs.core.hash_map,map__4242__4243):map__4242__4243);
var validator__4245 = cljs.core.get.call(null,map__4242__4244,"﷐'validator");
var meta__4246 = cljs.core.get.call(null,map__4242__4244,"﷐'meta");

return (new cljs.core.Atom(x,meta__4246,validator__4245,null));
};
var G__4250 = function (x,var_args){
var p__4241 = null;
if (goog.isDef(var_args)) {
  p__4241 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4250__delegate.call(this, x, p__4241);
};
G__4250.cljs$lang$maxFixedArity = 1;
G__4250.cljs$lang$applyTo = (function (arglist__4251){
var x = cljs.core.first(arglist__4251);
var p__4241 = cljs.core.rest(arglist__4251);
return G__4250__delegate.call(this, x, p__4241);
});
return G__4250;
})()
;
atom = function(x,var_args){
var p__4241 = var_args;
switch(arguments.length){
case  1 :
return atom__4247.call(this,x);
default:
return atom__4248.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__4248.cljs$lang$applyTo;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__3698__auto____4252 = a.validator;

if(cljs.core.truth_(temp__3698__auto____4252))
{var validate__4253 = temp__3698__auto____4252;

if(cljs.core.truth_(validate__4253.call(null,new_value)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ","Validator rejected reference state","\n",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'validate","﷑'new-value"),cljs.core.hash_map("﷐'line",3016))))));
}
} else
{}
var old_value__4254 = a.state;

a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__4254,new_value);
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
var swap_BANG___4255 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___4256 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___4257 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___4258 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___4259 = (function() { 
var G__4261__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__4261 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__4261__delegate.call(this, a, f, x, y, z, more);
};
G__4261.cljs$lang$maxFixedArity = 5;
G__4261.cljs$lang$applyTo = (function (arglist__4262){
var a = cljs.core.first(arglist__4262);
var f = cljs.core.first(cljs.core.next(arglist__4262));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4262)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4262))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4262)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4262)))));
return G__4261__delegate.call(this, a, f, x, y, z, more);
});
return G__4261;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return swap_BANG___4255.call(this,a,f);
case  3 :
return swap_BANG___4256.call(this,a,f,x);
case  4 :
return swap_BANG___4257.call(this,a,f,x,y);
case  5 :
return swap_BANG___4258.call(this,a,f,x,y,z);
default:
return swap_BANG___4259.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___4259.cljs$lang$applyTo;
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
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__4263){
var iref = cljs.core.first(arglist__4263);
var f = cljs.core.first(cljs.core.next(arglist__4263));
var args = cljs.core.rest(cljs.core.next(arglist__4263));
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
var gensym__4264 = (function (){
return gensym.call(null,"G__");
});
var gensym__4265 = (function (prefix_string){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.gensym_counter)))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,cljs.core.str.call(null,prefix_string,cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc)));
});
gensym = function(prefix_string){
switch(arguments.length){
case  0 :
return gensym__4264.call(this);
case  1 :
return gensym__4265.call(this,prefix_string);
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
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = (function (d){
var this__4267 = this;
return cljs.core.not.call(null,cljs.core.nil_QMARK_.call(null,cljs.core.deref.call(null,this__4267.state)));
});
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = (function (_){
var this__4268 = this;
if(cljs.core.truth_(cljs.core.deref.call(null,this__4268.state)))
{} else
{cljs.core.swap_BANG_.call(null,this__4268.state,this__4268.f);
}
return cljs.core.deref.call(null,this__4268.state);
});
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
delay.cljs$lang$applyTo = (function (arglist__4269){
var body = cljs.core.seq( arglist__4269 );;
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
var map__4270__4271 = options;
var map__4270__4272 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__4270__4271))?cljs.core.apply.call(null,cljs.core.hash_map,map__4270__4271):map__4270__4271);
var keywordize_keys__4273 = cljs.core.get.call(null,map__4270__4272,"﷐'keywordize-keys");
var keyfn__4274 = (cljs.core.truth_(keywordize_keys__4273)?cljs.core.keyword:cljs.core.str);
var f__4280 = (function thisfn(x){
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
{return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),(function (){var iter__481__auto____4279 = (function iter__4275(s__4276){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4276__4277 = s__4276;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__4276__4277)))
{var k__4278 = cljs.core.first.call(null,s__4276__4277);

return cljs.core.cons.call(null,cljs.core.Vector.fromArray([keyfn__4274.call(null,k__4278),thisfn.call(null,(x[k__4278]))]),iter__4275.call(null,cljs.core.rest.call(null,s__4276__4277)));
} else
{return null;
}
break;
}
})));
});

return iter__481__auto____4279.call(null,cljs.core.js_keys.call(null,x));
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

return f__4280.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__4281){
var x = cljs.core.first(arglist__4281);
var options = cljs.core.rest(arglist__4281);
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
var mem__4282 = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));

return (function() { 
var G__4286__delegate = function (args){
var temp__3695__auto____4283 = cljs.core.get.call(null,cljs.core.deref.call(null,mem__4282),args);

if(cljs.core.truth_(temp__3695__auto____4283))
{var v__4284 = temp__3695__auto____4283;

return v__4284;
} else
{var ret__4285 = cljs.core.apply.call(null,f,args);

cljs.core.swap_BANG_.call(null,mem__4282,cljs.core.assoc,args,ret__4285);
return ret__4285;
}
};
var G__4286 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4286__delegate.call(this, args);
};
G__4286.cljs$lang$maxFixedArity = 0;
G__4286.cljs$lang$applyTo = (function (arglist__4287){
var args = cljs.core.seq( arglist__4287 );;
return G__4286__delegate.call(this, args);
});
return G__4286;
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
var trampoline__4289 = (function (f){
while(true){
var ret__4288 = f.call(null);

if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,ret__4288)))
{{
var G__4292 = ret__4288;
f = G__4292;
continue;
}
} else
{return ret__4288;
}
break;
}
});
var trampoline__4290 = (function() { 
var G__4293__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__4293 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4293__delegate.call(this, f, args);
};
G__4293.cljs$lang$maxFixedArity = 1;
G__4293.cljs$lang$applyTo = (function (arglist__4294){
var f = cljs.core.first(arglist__4294);
var args = cljs.core.rest(arglist__4294);
return G__4293__delegate.call(this, f, args);
});
return G__4293;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case  1 :
return trampoline__4289.call(this,f);
default:
return trampoline__4290.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__4290.cljs$lang$applyTo;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__4295 = (function (){
return rand.call(null,1);
});
var rand__4296 = (function (n){
return Math.random() * n;
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__4295.call(this);
case  1 :
return rand__4296.call(this,n);
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
var k__4298 = f.call(null,x);

return cljs.core.assoc.call(null,ret,k__4298,cljs.core.conj.call(null,cljs.core.get.call(null,ret,k__4298,cljs.core.Vector.fromArray([])),x));
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
var isa_QMARK___4307 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___4308 = (function (h,child,parent){
var or__3548__auto____4299 = cljs.core._EQ_.call(null,child,parent);

if(cljs.core.truth_(or__3548__auto____4299))
{return or__3548__auto____4299;
} else
{var or__3548__auto____4300 = cljs.core.contains_QMARK_.call(null,"﷐'ancestors".call(null,h).call(null,child),parent);

if(cljs.core.truth_(or__3548__auto____4300))
{return or__3548__auto____4300;
} else
{var and__3546__auto____4301 = cljs.core.vector_QMARK_.call(null,parent);

if(cljs.core.truth_(and__3546__auto____4301))
{var and__3546__auto____4302 = cljs.core.vector_QMARK_.call(null,child);

if(cljs.core.truth_(and__3546__auto____4302))
{var and__3546__auto____4303 = cljs.core._EQ_.call(null,cljs.core.count.call(null,parent),cljs.core.count.call(null,child));

if(cljs.core.truth_(and__3546__auto____4303))
{var ret__4304 = true;
var i__4305 = 0;

while(true){
if(cljs.core.truth_((function (){var or__3548__auto____4306 = cljs.core.not.call(null,ret__4304);

if(cljs.core.truth_(or__3548__auto____4306))
{return or__3548__auto____4306;
} else
{return cljs.core._EQ_.call(null,i__4305,cljs.core.count.call(null,parent));
}
})()))
{return ret__4304;
} else
{{
var G__4310 = isa_QMARK_.call(null,h,child.call(null,i__4305),parent.call(null,i__4305));
var G__4311 = (i__4305 + 1);
ret__4304 = G__4310;
i__4305 = G__4311;
continue;
}
}
break;
}
} else
{return and__3546__auto____4303;
}
} else
{return and__3546__auto____4302;
}
} else
{return and__3546__auto____4301;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case  2 :
return isa_QMARK___4307.call(this,h,child);
case  3 :
return isa_QMARK___4308.call(this,h,child,parent);
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
var parents__4312 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__4313 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'parents".call(null,h),tag));
});
parents = function(h,tag){
switch(arguments.length){
case  1 :
return parents__4312.call(this,h);
case  2 :
return parents__4313.call(this,h,tag);
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
var ancestors__4315 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__4316 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'ancestors".call(null,h),tag));
});
ancestors = function(h,tag){
switch(arguments.length){
case  1 :
return ancestors__4315.call(this,h);
case  2 :
return ancestors__4316.call(this,h,tag);
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
var descendants__4318 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__4319 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'descendants".call(null,h),tag));
});
descendants = function(h,tag){
switch(arguments.length){
case  1 :
return descendants__4318.call(this,h);
case  2 :
return descendants__4319.call(this,h,tag);
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
var derive__4329 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'namespace","﷑'parent"),cljs.core.hash_map("﷐'line",3308))))));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__4330 = (function (h,tag,parent){
if(cljs.core.truth_(cljs.core.not_EQ_.call(null,tag,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'not=","﷑'tag","﷑'parent"),cljs.core.hash_map("﷐'line",3312))))));
}
var tp__4324 = "﷐'parents".call(null,h);
var td__4325 = "﷐'descendants".call(null,h);
var ta__4326 = "﷐'ancestors".call(null,h);
var tf__4327 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.get.call(null,targets,k,cljs.core.set([])),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});

var or__3548__auto____4328 = (cljs.core.truth_(cljs.core.contains_QMARK_.call(null,tp__4324.call(null,tag),parent))?null:(function (){if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__4326.call(null,tag),parent)))
{throw (new Error(cljs.core.str.call(null,tag,"already has",parent,"as ancestor")));
} else
{}
if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__4326.call(null,parent),tag)))
{throw (new Error(cljs.core.str.call(null,"Cyclic derivation:",parent,"has",tag,"as ancestor")));
} else
{}
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'ancestors","﷐'descendants"],{"﷐'parents":cljs.core.assoc.call(null,"﷐'parents".call(null,h),tag,cljs.core.conj.call(null,cljs.core.get.call(null,tp__4324,tag,cljs.core.set([])),parent)),"﷐'ancestors":tf__4327.call(null,"﷐'ancestors".call(null,h),tag,td__4325,parent,ta__4326),"﷐'descendants":tf__4327.call(null,"﷐'descendants".call(null,h),parent,ta__4326,tag,td__4325)});
})());

if(cljs.core.truth_(or__3548__auto____4328))
{return or__3548__auto____4328;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return derive__4329.call(this,h,tag);
case  3 :
return derive__4330.call(this,h,tag,parent);
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
var underive__4336 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__4337 = (function (h,tag,parent){
var parentMap__4332 = "﷐'parents".call(null,h);
var childsParents__4333 = (cljs.core.truth_(parentMap__4332.call(null,tag))?cljs.core.disj.call(null,parentMap__4332.call(null,tag),parent):cljs.core.set([]));
var newParents__4334 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__4333))?cljs.core.assoc.call(null,parentMap__4332,tag,childsParents__4333):cljs.core.dissoc.call(null,parentMap__4332,tag));
var deriv_seq__4335 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__4321_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__4321_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__4321_SHARP_),cljs.core.second.call(null,p1__4321_SHARP_)));
}),cljs.core.seq.call(null,newParents__4334)));

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,parentMap__4332.call(null,tag),parent)))
{return cljs.core.reduce.call(null,(function (p1__4322_SHARP_,p2__4323_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__4322_SHARP_,p2__4323_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__4335));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return underive__4336.call(this,h,tag);
case  3 :
return underive__4337.call(this,h,tag,parent);
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
var xprefs__4339 = cljs.core.deref.call(null,prefer_table).call(null,x);

var or__3548__auto____4341 = (cljs.core.truth_((function (){var and__3546__auto____4340 = xprefs__4339;

if(cljs.core.truth_(and__3546__auto____4340))
{return xprefs__4339.call(null,y);
} else
{return and__3546__auto____4340;
}
})())?true:null);

if(cljs.core.truth_(or__3548__auto____4341))
{return or__3548__auto____4341;
} else
{var or__3548__auto____4343 = (function (){var ps__4342 = cljs.core.parents.call(null,y);

while(true){
if(cljs.core.truth_((cljs.core.count.call(null,ps__4342) > 0)))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__4342),prefer_table)))
{} else
{}
{
var G__4346 = cljs.core.rest.call(null,ps__4342);
ps__4342 = G__4346;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____4343))
{return or__3548__auto____4343;
} else
{var or__3548__auto____4345 = (function (){var ps__4344 = cljs.core.parents.call(null,x);

while(true){
if(cljs.core.truth_((cljs.core.count.call(null,ps__4344) > 0)))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__4344),y,prefer_table)))
{} else
{}
{
var G__4347 = cljs.core.rest.call(null,ps__4344);
ps__4344 = G__4347;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____4345))
{return or__3548__auto____4345;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3548__auto____4348 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);

if(cljs.core.truth_(or__3548__auto____4348))
{return or__3548__auto____4348;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__4357 = cljs.core.reduce.call(null,(function (be,p__4349){
var vec__4350__4351 = p__4349;
var k__4352 = cljs.core.nth.call(null,vec__4350__4351,0,null);
var ___4353 = cljs.core.nth.call(null,vec__4350__4351,1,null);
var e__4354 = vec__4350__4351;

if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null,dispatch_val,k__4352)))
{var be2__4356 = (cljs.core.truth_((function (){var or__3548__auto____4355 = cljs.core.nil_QMARK_.call(null,be);

if(cljs.core.truth_(or__3548__auto____4355))
{return or__3548__auto____4355;
} else
{return cljs.core.dominates.call(null,k__4352,cljs.core.first.call(null,be),prefer_table);
}
})())?e__4354:be);

if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__4356),k__4352,prefer_table)))
{} else
{throw (new Error(cljs.core.str.call(null,"Multiple methods in multimethod '",name,"' match dispatch value: ",dispatch_val," -> ",k__4352," and ",cljs.core.first.call(null,be2__4356),", and neither is preferred")));
}
return be2__4356;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));

if(cljs.core.truth_(best_entry__4357))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy))))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__4357));
return cljs.core.second.call(null,best_entry__4357);
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
if(cljs.core.truth_((function (){var and__3546__auto____4358 = mf;

if(cljs.core.truth_(and__3546__auto____4358))
{return mf.cljs$core$IMultiFn$_reset;
} else
{return and__3546__auto____4358;
}
})()))
{return mf.cljs$core$IMultiFn$_reset(mf);
} else
{return (function (){var or__3548__auto____4359 = (cljs.core._reset[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4359))
{return or__3548__auto____4359;
} else
{var or__3548__auto____4360 = (cljs.core._reset["_"]);

if(cljs.core.truth_(or__3548__auto____4360))
{return or__3548__auto____4360;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if(cljs.core.truth_((function (){var and__3546__auto____4361 = mf;

if(cljs.core.truth_(and__3546__auto____4361))
{return mf.cljs$core$IMultiFn$_add_method;
} else
{return and__3546__auto____4361;
}
})()))
{return mf.cljs$core$IMultiFn$_add_method(mf,dispatch_val,method);
} else
{return (function (){var or__3548__auto____4362 = (cljs.core._add_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4362))
{return or__3548__auto____4362;
} else
{var or__3548__auto____4363 = (cljs.core._add_method["_"]);

if(cljs.core.truth_(or__3548__auto____4363))
{return or__3548__auto____4363;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____4364 = mf;

if(cljs.core.truth_(and__3546__auto____4364))
{return mf.cljs$core$IMultiFn$_remove_method;
} else
{return and__3546__auto____4364;
}
})()))
{return mf.cljs$core$IMultiFn$_remove_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____4365 = (cljs.core._remove_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4365))
{return or__3548__auto____4365;
} else
{var or__3548__auto____4366 = (cljs.core._remove_method["_"]);

if(cljs.core.truth_(or__3548__auto____4366))
{return or__3548__auto____4366;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if(cljs.core.truth_((function (){var and__3546__auto____4367 = mf;

if(cljs.core.truth_(and__3546__auto____4367))
{return mf.cljs$core$IMultiFn$_prefer_method;
} else
{return and__3546__auto____4367;
}
})()))
{return mf.cljs$core$IMultiFn$_prefer_method(mf,dispatch_val,dispatch_val_y);
} else
{return (function (){var or__3548__auto____4368 = (cljs.core._prefer_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4368))
{return or__3548__auto____4368;
} else
{var or__3548__auto____4369 = (cljs.core._prefer_method["_"]);

if(cljs.core.truth_(or__3548__auto____4369))
{return or__3548__auto____4369;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____4370 = mf;

if(cljs.core.truth_(and__3546__auto____4370))
{return mf.cljs$core$IMultiFn$_get_method;
} else
{return and__3546__auto____4370;
}
})()))
{return mf.cljs$core$IMultiFn$_get_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____4371 = (cljs.core._get_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4371))
{return or__3548__auto____4371;
} else
{var or__3548__auto____4372 = (cljs.core._get_method["_"]);

if(cljs.core.truth_(or__3548__auto____4372))
{return or__3548__auto____4372;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4373 = mf;

if(cljs.core.truth_(and__3546__auto____4373))
{return mf.cljs$core$IMultiFn$_methods;
} else
{return and__3546__auto____4373;
}
})()))
{return mf.cljs$core$IMultiFn$_methods(mf);
} else
{return (function (){var or__3548__auto____4374 = (cljs.core._methods[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4374))
{return or__3548__auto____4374;
} else
{var or__3548__auto____4375 = (cljs.core._methods["_"]);

if(cljs.core.truth_(or__3548__auto____4375))
{return or__3548__auto____4375;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4376 = mf;

if(cljs.core.truth_(and__3546__auto____4376))
{return mf.cljs$core$IMultiFn$_prefers;
} else
{return and__3546__auto____4376;
}
})()))
{return mf.cljs$core$IMultiFn$_prefers(mf);
} else
{return (function (){var or__3548__auto____4377 = (cljs.core._prefers[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4377))
{return or__3548__auto____4377;
} else
{var or__3548__auto____4378 = (cljs.core._prefers["_"]);

if(cljs.core.truth_(or__3548__auto____4378))
{return or__3548__auto____4378;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._invoke = (function _invoke(mf,args){
if(cljs.core.truth_((function (){var and__3546__auto____4379 = mf;

if(cljs.core.truth_(and__3546__auto____4379))
{return mf.cljs$core$IMultiFn$_invoke;
} else
{return and__3546__auto____4379;
}
})()))
{return mf.cljs$core$IMultiFn$_invoke(mf,args);
} else
{return (function (){var or__3548__auto____4380 = (cljs.core._invoke[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4380))
{return or__3548__auto____4380;
} else
{var or__3548__auto____4381 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____4381))
{return or__3548__auto____4381;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-invoke",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_invoke = (function do_invoke(mf,dispatch_fn,args){
var dispatch_val__4382 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__4383 = cljs.core._get_method.call(null,mf,dispatch_val__4382);

if(cljs.core.truth_(target_fn__4383))
{} else
{throw (new Error(cljs.core.str.call(null,"No method in multimethod '",cljs.core.name,"' for dispatch value: ",dispatch_val__4382)));
}
return cljs.core.apply.call(null,target_fn__4383,args);
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
cljs.core.MultiFn.prototype.cljs$core$IHash$ = true;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = (function (this$){
var this__4384 = this;
return goog.getUid.call(null,this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = (function (mf){
var this__4385 = this;
cljs.core.swap_BANG_.call(null,this__4385.method_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4385.method_cache,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4385.prefer_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4385.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = (function (mf,dispatch_val,method){
var this__4386 = this;
cljs.core.swap_BANG_.call(null,this__4386.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__4386.method_cache,this__4386.method_table,this__4386.cached_hierarchy,this__4386.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = (function (mf,dispatch_val){
var this__4387 = this;
cljs.core.swap_BANG_.call(null,this__4387.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__4387.method_cache,this__4387.method_table,this__4387.cached_hierarchy,this__4387.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = (function (mf,dispatch_val){
var this__4388 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__4388.cached_hierarchy),cljs.core.deref.call(null,this__4388.hierarchy))))
{} else
{cljs.core.reset_cache.call(null,this__4388.method_cache,this__4388.method_table,this__4388.cached_hierarchy,this__4388.hierarchy);
}
var temp__3695__auto____4389 = cljs.core.deref.call(null,this__4388.method_cache).call(null,dispatch_val);

if(cljs.core.truth_(temp__3695__auto____4389))
{var target_fn__4390 = temp__3695__auto____4389;

return target_fn__4390;
} else
{var temp__3695__auto____4391 = cljs.core.find_and_cache_best_method.call(null,this__4388.name,dispatch_val,this__4388.hierarchy,this__4388.method_table,this__4388.prefer_table,this__4388.method_cache,this__4388.cached_hierarchy);

if(cljs.core.truth_(temp__3695__auto____4391))
{var target_fn__4392 = temp__3695__auto____4391;

return target_fn__4392;
} else
{return cljs.core.deref.call(null,this__4388.method_table).call(null,this__4388.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = (function (mf,dispatch_val_x,dispatch_val_y){
var this__4393 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__4393.prefer_table)))
{throw (new Error(cljs.core.str.call(null,"Preference conflict in multimethod '",this__4393.name,"': ",dispatch_val_y," is already preferred to ",dispatch_val_x)));
} else
{}
cljs.core.swap_BANG_.call(null,this__4393.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core.get.call(null,old,dispatch_val_x,cljs.core.set([])),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__4393.method_cache,this__4393.method_table,this__4393.cached_hierarchy,this__4393.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = (function (mf){
var this__4394 = this;
return cljs.core.deref.call(null,this__4394.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = (function (mf){
var this__4395 = this;
return cljs.core.deref.call(null,this__4395.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_invoke = (function (mf,args){
var this__4396 = this;
return cljs.core.do_invoke.call(null,mf,this__4396.dispatch_fn,args);
});
cljs.core.MultiFn.prototype.call = (function() { 
var G__4397__delegate = function (_,args){
return cljs.core._invoke.call(null,this,args);
};
var G__4397 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4397__delegate.call(this, _, args);
};
G__4397.cljs$lang$maxFixedArity = 1;
G__4397.cljs$lang$applyTo = (function (arglist__4398){
var _ = cljs.core.first(arglist__4398);
var args = cljs.core.rest(arglist__4398);
return G__4397__delegate.call(this, _, args);
});
return G__4397;
})()
;
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
