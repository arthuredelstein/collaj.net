var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(name) {
  if(!COMPILED) {
    if(goog.getObjectByName(name) && !goog.implicitNamespaces_[name]) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      goog.implicitNamespaces_[namespace] = true
    }
  }
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(COMPILED && !goog.DEBUG) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
if(!COMPILED) {
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if(!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
goog.require = function(rule) {
  if(!COMPILED) {
    if(goog.getObjectByName(rule)) {
      return
    }
    var path = goog.getPathFromDeps_(rule);
    if(path) {
      goog.included_[path] = true;
      goog.writeScripts_()
    }else {
      var errorMessage = "goog.require could not find: " + rule;
      if(goog.global.console) {
        goog.global.console["error"](errorMessage)
      }
      throw Error(errorMessage);
    }
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(var_args) {
  return arguments[0]
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
if(!COMPILED) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!goog.inHtmlDocument_()) {
        return
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if(!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true
    }
  };
  goog.writeScriptTag_ = function(src) {
    if(goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(requireName in deps.nameToPath) {
            visitNode(deps.nameToPath[requireName])
          }else {
            if(!goog.getObjectByName(requireName)) {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in goog.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if(rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  goog.findBasePath_();
  if(!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js")
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call(value);
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(object, propName) {
  if(object instanceof Object) {
    return Object.prototype.propertyIsEnumerable.call(object, propName)
  }else {
    return goog.propertyIsEnumerableCustom_(object, propName)
  }
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(obj) {
  if("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_)
  }
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
Object.prototype.clone;
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments)
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  var context = selfObj || goog.global;
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(context, newArgs)
    }
  }else {
    return function() {
      return fn.apply(context, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if(Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_
  }else {
    goog.bind = goog.bindJs_
  }
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  if(goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts
  }else {
    rename = function(a) {
      return a
    }
  }
  if(opt_modifier) {
    return className + "-" + rename(opt_modifier)
  }else {
    return rename(className)
  }
};
goog.setCssNameMapping = function(mapping, style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = style
};
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = true
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.provide("goog.disposable.IDisposable");
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose;
goog.disposable.IDisposable.prototype.isDisposed;
goog.provide("goog.Disposable");
goog.provide("goog.dispose");
goog.require("goog.disposable.IDisposable");
goog.Disposable = function() {
  if(goog.Disposable.ENABLE_MONITORING) {
    goog.Disposable.instances_[goog.getUid(this)] = this
  }
};
goog.Disposable.ENABLE_MONITORING = false;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var ret = [];
  for(var id in goog.Disposable.instances_) {
    if(goog.Disposable.instances_.hasOwnProperty(id)) {
      ret.push(goog.Disposable.instances_[Number(id)])
    }
  }
  return ret
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
    if(goog.Disposable.ENABLE_MONITORING) {
      var uid = goog.getUid(this);
      if(!goog.Disposable.instances_.hasOwnProperty(uid)) {
        throw Error(this + " did not call the goog.Disposable base " + "constructor or was disposed of after a clearUndisposedObjects " + "call");
      }
      delete goog.Disposable.instances_[uid]
    }
  }
};
goog.Disposable.prototype.disposeInternal = function() {
};
goog.dispose = function(obj) {
  if(obj && typeof obj.dispose == "function") {
    obj.dispose()
  }
};
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  this.stack = (new Error).stack || "";
  if(opt_msg) {
    this.message = String(opt_msg)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0
};
goog.string.subs = function(str, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var replacement = String(arguments[i]).replace(/\$/g, "$$$$");
    str = str.replace(/\%s/, replacement)
  }
  return str
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(str) {
  return/^[\s\xa0]*$/.test(str)
};
goog.string.isEmptySafe = function(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str))
};
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str)
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str)
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str)
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str)
};
goog.string.isSpace = function(ch) {
  return ch == " "
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd"
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if(test1 < test2) {
    return-1
  }else {
    if(test1 == test2) {
      return 0
    }else {
      return 1
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if(str1 == str2) {
    return 0
  }
  if(!str1) {
    return-1
  }
  if(!str2) {
    return 1
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for(var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if(a != b) {
      var num1 = parseInt(a, 10);
      if(!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if(!isNaN(num2) && num1 - num2) {
          return num1 - num2
        }
      }
      return a < b ? -1 : 1
    }
  }
  if(tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length
  }
  return str1 < str2 ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(str) {
  str = String(str);
  if(!goog.string.encodeUriRegExp_.test(str)) {
    return encodeURIComponent(str)
  }
  return str
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if(opt_isLikelyToContainHtmlChars) {
    return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(str)) {
      return str
    }
    if(str.indexOf("&") != -1) {
      str = str.replace(goog.string.amperRe_, "&amp;")
    }
    if(str.indexOf("<") != -1) {
      str = str.replace(goog.string.ltRe_, "&lt;")
    }
    if(str.indexOf(">") != -1) {
      str = str.replace(goog.string.gtRe_, "&gt;")
    }
    if(str.indexOf('"') != -1) {
      str = str.replace(goog.string.quotRe_, "&quot;")
    }
    return str
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(str) {
  if(goog.string.contains(str, "&")) {
    if("document" in goog.global && !goog.string.contains(str, "<")) {
      return goog.string.unescapeEntitiesUsingDom_(str)
    }else {
      return goog.string.unescapePureXmlEntities_(str)
    }
  }
  return str
};
goog.string.unescapeEntitiesUsingDom_ = function(str) {
  var el = goog.global["document"]["createElement"]("div");
  el["innerHTML"] = "<pre>x" + str + "</pre>";
  if(el["firstChild"][goog.string.NORMALIZE_FN_]) {
    el["firstChild"][goog.string.NORMALIZE_FN_]()
  }
  str = el["firstChild"]["firstChild"]["nodeValue"].slice(1);
  el["innerHTML"] = "";
  return goog.string.canonicalizeNewlines(str)
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if(!isNaN(n)) {
            return String.fromCharCode(n)
          }
        }
        return s
    }
  })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml)
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for(var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if(str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1)
    }
  }
  return str
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(str.length > chars) {
    str = str.substring(0, chars - 3) + "..."
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(opt_trailingChars) {
    if(opt_trailingChars > chars) {
      opt_trailingChars = chars
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint)
  }else {
    if(str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos)
    }
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if(s.quote) {
    return s.quote()
  }else {
    var sb = ['"'];
    for(var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch))
    }
    sb.push('"');
    return sb.join("")
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for(var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i))
  }
  return sb.join("")
};
goog.string.escapeChar = function(c) {
  if(c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c]
  }
  if(c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c]
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if(cc > 31 && cc < 127) {
    rv = c
  }else {
    if(cc < 256) {
      rv = "\\x";
      if(cc < 16 || cc > 256) {
        rv += "0"
      }
    }else {
      rv = "\\u";
      if(cc < 4096) {
        rv += "0"
      }
    }
    rv += cc.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[c] = rv
};
goog.string.toMap = function(s) {
  var rv = {};
  for(var i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = true
  }
  return rv
};
goog.string.contains = function(s, ss) {
  return s.indexOf(ss) != -1
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if(index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength)
  }
  return resultStr
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "")
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "")
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if(index == -1) {
    index = s.length
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj)
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for(var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if(v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2])
    }while(order == 0)
  }
  return order
};
goog.string.compareElements_ = function(left, right) {
  if(left < right) {
    return-1
  }else {
    if(left > right) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for(var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_
  }
  return result
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if(num == 0 && goog.string.isEmpty(str)) {
    return NaN
  }
  return num
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(str) {
  return goog.string.toCamelCaseCache_[str] || (goog.string.toCamelCaseCache_[str] = String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(str) {
  return goog.string.toSelectorCaseCache_[str] || (goog.string.toSelectorCaseCache_[str] = String(str).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.string");
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if(givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs
  }else {
    if(defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs
    }
  }
  throw new goog.asserts.AssertionError("" + message, args || []);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return condition
};
goog.asserts.fail = function(opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3))
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.NATIVE_ARRAY_PROTOTYPES = true;
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.indexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i < arr.length;i++) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if(fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex)
  }
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.lastIndexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i >= 0;i--) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;--i) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      var val = arr2[i];
      if(f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val
      }
    }
  }
  return res
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr)
    }
  }
  return res
};
goog.array.reduce = function(arr, f, val, opt_obj) {
  if(arr.reduce) {
    if(opt_obj) {
      return arr.reduce(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduce(f, val)
    }
  }
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.reduceRight = function(arr, f, val, opt_obj) {
  if(arr.reduceRight) {
    if(opt_obj) {
      return arr.reduceRight(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduceRight(f, val)
    }
  }
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true
    }
  }
  return false
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false
    }
  }
  return true
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;i--) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0
};
goog.array.clear = function(arr) {
  if(!goog.isArray(arr)) {
    for(var i = arr.length - 1;i >= 0;i--) {
      delete arr[i]
    }
  }
  arr.length = 0
};
goog.array.insert = function(arr, obj) {
  if(!goog.array.contains(arr, obj)) {
    arr.push(obj)
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj)
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd)
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if(arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj)
  }else {
    goog.array.insertAt(arr, obj, i)
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if(rv = i >= 0) {
    goog.array.removeAt(arr, i)
  }
  return rv
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if(i >= 0) {
    goog.array.removeAt(arr, i);
    return true
  }
  return false
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(arr) {
  if(goog.isArray(arr)) {
    return goog.array.concat(arr)
  }else {
    var rv = [];
    for(var i = 0, len = arr.length;i < len;i++) {
      rv[i] = arr[i]
    }
    return rv
  }
};
goog.array.toArray = function(object) {
  if(goog.isArray(object)) {
    return goog.array.concat(object)
  }
  return goog.array.clone(object)
};
goog.array.extend = function(arr1, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    var isArrayLike;
    if(goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && arr2.hasOwnProperty("callee")) {
      arr1.push.apply(arr1, arr2)
    }else {
      if(isArrayLike) {
        var len1 = arr1.length;
        var len2 = arr2.length;
        for(var j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j]
        }
      }else {
        arr1.push(arr2)
      }
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1))
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if(arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start)
  }else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end)
  }
};
goog.array.removeDuplicates = function(arr, opt_rv) {
  var returnArray = opt_rv || arr;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while(cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
    if(!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current
    }
  }
  returnArray.length = cursorInsert
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target)
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj)
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while(left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if(isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr)
    }else {
      compareResult = compareFn(opt_target, arr[middle])
    }
    if(compareResult > 0) {
      left = middle + 1
    }else {
      right = middle;
      found = !compareResult
    }
  }
  return found ? left : ~left
};
goog.array.sort = function(arr, opt_compareFn) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog.array.defaultCompare)
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for(var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]}
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index
  }
  goog.array.sort(arr, stableCompareFn);
  for(var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value
  }
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key])
  })
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for(var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if(compareResult > 0 || compareResult == 0 && opt_strict) {
      return false
    }
  }
  return true
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if(!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for(var i = 0;i < l;i++) {
    if(!equalsFn(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
};
goog.array.compare = function(arr1, arr2, opt_equalsFn) {
  return goog.array.equals(arr1, arr2, opt_equalsFn)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if(index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true
  }
  return false
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false
};
goog.array.bucket = function(array, sorter) {
  var buckets = {};
  for(var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter(value, i, array);
    if(goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value)
    }
  }
  return buckets
};
goog.array.repeat = function(value, n) {
  var array = [];
  for(var i = 0;i < n;i++) {
    array[i] = value
  }
  return array
};
goog.array.flatten = function(var_args) {
  var result = [];
  for(var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if(goog.isArray(element)) {
      result.push.apply(result, goog.array.flatten.apply(null, element))
    }else {
      result.push(element)
    }
  }
  return result
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if(array.length) {
    n %= array.length;
    if(n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n))
    }else {
      if(n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n))
      }
    }
  }
  return array
};
goog.array.zip = function(var_args) {
  if(!arguments.length) {
    return[]
  }
  var result = [];
  for(var i = 0;true;i++) {
    var value = [];
    for(var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if(i >= arr.length) {
        return result
      }
      value.push(arr[i])
    }
    result.push(value)
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for(var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp
  }
};
goog.provide("goog.debug.EntryPointMonitor");
goog.provide("goog.debug.entryPointRegistry");
goog.debug.EntryPointMonitor = function() {
};
goog.debug.EntryPointMonitor.prototype.wrap;
goog.debug.EntryPointMonitor.prototype.unwrap;
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  var transformer = goog.bind(monitor.wrap, monitor);
  for(var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer)
  }
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var transformer = goog.bind(monitor.unwrap, monitor);
  for(var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer)
  }
};
goog.provide("goog.debug.errorHandlerWeakDep");
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(fn, opt_tracers) {
  return fn
}};
goog.provide("goog.userAgent");
goog.require("goog.string");
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global["navigator"] ? goog.global["navigator"].userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global["navigator"]
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = false;
  goog.userAgent.detectedIe_ = false;
  goog.userAgent.detectedWebkit_ = false;
  goog.userAgent.detectedMobile_ = false;
  goog.userAgent.detectedGecko_ = false;
  var ua;
  if(!goog.userAgent.BROWSER_KNOWN_ && (ua = goog.userAgent.getUserAgentString())) {
    var navigator = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = ua.indexOf("Opera") == 0;
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && ua.indexOf("MSIE") != -1;
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && ua.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && ua.indexOf("Mobile") != -1;
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && navigator.product == "Gecko"
  }
};
if(!goog.userAgent.BROWSER_KNOWN_) {
  goog.userAgent.init_()
}
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator()["appVersion"] || "", "X11")
};
if(!goog.userAgent.PLATFORM_KNOWN_) {
  goog.userAgent.initPlatform_()
}
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var version = "", re;
  if(goog.userAgent.OPERA && goog.global["opera"]) {
    var operaVersion = goog.global["opera"].version;
    version = typeof operaVersion == "function" ? operaVersion() : operaVersion
  }else {
    if(goog.userAgent.GECKO) {
      re = /rv\:([^\);]+)(\)|;)/
    }else {
      if(goog.userAgent.IE) {
        re = /MSIE\s+([^\);]+)(\)|;)/
      }else {
        if(goog.userAgent.WEBKIT) {
          re = /WebKit\/(\S+)/
        }
      }
    }
    if(re) {
      var arr = re.exec(goog.userAgent.getUserAgentString());
      version = arr ? arr[1] : ""
    }
  }
  if(goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if(docMode > parseFloat(version)) {
      return String(docMode)
    }
  }
  return version
};
goog.userAgent.getDocumentMode_ = function() {
  var doc = goog.global["document"];
  return doc ? doc["documentMode"] : undefined
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return goog.string.compareVersions(v1, v2)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(version) {
  return goog.userAgent.isVersionCache_[version] || (goog.userAgent.isVersionCache_[version] = goog.string.compareVersions(goog.userAgent.VERSION, version) >= 0)
};
goog.provide("goog.events.BrowserFeature");
goog.require("goog.userAgent");
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isVersion("9"), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("8")};
goog.provide("goog.events.Event");
goog.require("goog.Disposable");
goog.events.Event = function(type, opt_target) {
  goog.Disposable.call(this);
  this.type = type;
  this.target = opt_target;
  this.currentTarget = this.target
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = false;
goog.events.Event.prototype.returnValue_ = true;
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = true
};
goog.events.Event.prototype.preventDefault = function() {
  this.returnValue_ = false
};
goog.events.Event.stopPropagation = function(e) {
  e.stopPropagation()
};
goog.events.Event.preventDefault = function(e) {
  e.preventDefault()
};
goog.provide("goog.events.EventType");
goog.require("goog.userAgent");
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
MESSAGE:"message", CONNECT:"connect"};
goog.provide("goog.reflect");
goog.reflect.object = function(type, object) {
  return object
};
goog.reflect.sinkValue = new Function("a", "return a");
goog.provide("goog.events.BrowserEvent");
goog.provide("goog.events.BrowserEvent.MouseButton");
goog.require("goog.events.BrowserFeature");
goog.require("goog.events.Event");
goog.require("goog.events.EventType");
goog.require("goog.reflect");
goog.require("goog.userAgent");
goog.events.BrowserEvent = function(opt_e, opt_currentTarget) {
  if(opt_e) {
    this.init(opt_e, opt_currentTarget)
  }
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.currentTarget;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = false;
goog.events.BrowserEvent.prototype.altKey = false;
goog.events.BrowserEvent.prototype.shiftKey = false;
goog.events.BrowserEvent.prototype.metaKey = false;
goog.events.BrowserEvent.prototype.state;
goog.events.BrowserEvent.prototype.platformModifierKey = false;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(e, opt_currentTarget) {
  var type = this.type = e.type;
  goog.events.Event.call(this, type);
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  if(relatedTarget) {
    if(goog.userAgent.GECKO) {
      try {
        goog.reflect.sinkValue(relatedTarget.nodeName)
      }catch(err) {
        relatedTarget = null
      }
    }
  }else {
    if(type == goog.events.EventType.MOUSEOVER) {
      relatedTarget = e.fromElement
    }else {
      if(type == goog.events.EventType.MOUSEOUT) {
        relatedTarget = e.toElement
      }
    }
  }
  this.relatedTarget = relatedTarget;
  this.offsetX = e.offsetX !== undefined ? e.offsetX : e.layerX;
  this.offsetY = e.offsetY !== undefined ? e.offsetY : e.layerY;
  this.clientX = e.clientX !== undefined ? e.clientX : e.pageX;
  this.clientY = e.clientY !== undefined ? e.clientY : e.pageY;
  this.screenX = e.screenX || 0;
  this.screenY = e.screenY || 0;
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.charCode = e.charCode || (type == "keypress" ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey;
  this.state = e.state;
  this.event_ = e;
  delete this.returnValue_;
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(button) {
  if(!goog.events.BrowserFeature.HAS_W3C_BUTTON) {
    if(this.type == "click") {
      return button == goog.events.BrowserEvent.MouseButton.LEFT
    }else {
      return!!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[button])
    }
  }else {
    return this.event_.button == button
  }
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  if(this.event_.stopPropagation) {
    this.event_.stopPropagation()
  }else {
    this.event_.cancelBubble = true
  }
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  if(!be.preventDefault) {
    be.returnValue = false;
    if(goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        var VK_F1 = 112;
        var VK_F12 = 123;
        if(be.ctrlKey || be.keyCode >= VK_F1 && be.keyCode <= VK_F12) {
          be.keyCode = -1
        }
      }catch(ex) {
      }
    }
  }else {
    be.preventDefault()
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.event_ = null;
  this.target = null;
  this.currentTarget = null;
  this.relatedTarget = null
};
goog.provide("goog.events.EventWrapper");
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function(src, listener, opt_capt, opt_scope, opt_eventHandler) {
};
goog.events.EventWrapper.prototype.unlisten = function(src, listener, opt_capt, opt_scope, opt_eventHandler) {
};
goog.provide("goog.events.Listener");
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.isFunctionListener_;
goog.events.Listener.prototype.listener;
goog.events.Listener.prototype.proxy;
goog.events.Listener.prototype.src;
goog.events.Listener.prototype.type;
goog.events.Listener.prototype.capture;
goog.events.Listener.prototype.handler;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = false;
goog.events.Listener.prototype.callOnce = false;
goog.events.Listener.prototype.init = function(listener, proxy, src, type, capture, opt_handler) {
  if(goog.isFunction(listener)) {
    this.isFunctionListener_ = true
  }else {
    if(listener && listener.handleEvent && goog.isFunction(listener.handleEvent)) {
      this.isFunctionListener_ = false
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.callOnce = false;
  this.key = ++goog.events.Listener.counter_;
  this.removed = false
};
goog.events.Listener.prototype.handleEvent = function(eventObject) {
  if(this.isFunctionListener_) {
    return this.listener.call(this.handler || this.src, eventObject)
  }
  return this.listener.handleEvent.call(this.listener, eventObject)
};
goog.provide("goog.structs.SimplePool");
goog.require("goog.Disposable");
goog.structs.SimplePool = function(initialCount, maxCount) {
  goog.Disposable.call(this);
  this.maxCount_ = maxCount;
  this.freeQueue_ = [];
  this.createInitial_(initialCount)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
goog.structs.SimplePool.prototype.createObjectFn_ = null;
goog.structs.SimplePool.prototype.disposeObjectFn_ = null;
goog.structs.SimplePool.prototype.setCreateObjectFn = function(createObjectFn) {
  this.createObjectFn_ = createObjectFn
};
goog.structs.SimplePool.prototype.setDisposeObjectFn = function(disposeObjectFn) {
  this.disposeObjectFn_ = disposeObjectFn
};
goog.structs.SimplePool.prototype.getObject = function() {
  if(this.freeQueue_.length) {
    return this.freeQueue_.pop()
  }
  return this.createObject()
};
goog.structs.SimplePool.prototype.releaseObject = function(obj) {
  if(this.freeQueue_.length < this.maxCount_) {
    this.freeQueue_.push(obj)
  }else {
    this.disposeObject(obj)
  }
};
goog.structs.SimplePool.prototype.createInitial_ = function(initialCount) {
  if(initialCount > this.maxCount_) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var i = 0;i < initialCount;i++) {
    this.freeQueue_.push(this.createObject())
  }
};
goog.structs.SimplePool.prototype.createObject = function() {
  if(this.createObjectFn_) {
    return this.createObjectFn_()
  }else {
    return{}
  }
};
goog.structs.SimplePool.prototype.disposeObject = function(obj) {
  if(this.disposeObjectFn_) {
    this.disposeObjectFn_(obj)
  }else {
    if(goog.isObject(obj)) {
      if(goog.isFunction(obj.dispose)) {
        obj.dispose()
      }else {
        for(var i in obj) {
          delete obj[i]
        }
      }
    }
  }
};
goog.structs.SimplePool.prototype.disposeInternal = function() {
  goog.structs.SimplePool.superClass_.disposeInternal.call(this);
  var freeQueue = this.freeQueue_;
  while(freeQueue.length) {
    this.disposeObject(freeQueue.pop())
  }
  delete this.freeQueue_
};
goog.provide("goog.userAgent.jscript");
goog.require("goog.string");
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  var hasScriptEngine = "ScriptEngine" in goog.global;
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = hasScriptEngine && goog.global["ScriptEngine"]() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global["ScriptEngineMajorVersion"]() + "." + goog.global["ScriptEngineMinorVersion"]() + "." + goog.global["ScriptEngineBuildVersion"]() : "0"
};
if(!goog.userAgent.jscript.ASSUME_NO_JSCRIPT) {
  goog.userAgent.jscript.init_()
}
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(version) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, version) >= 0
};
goog.provide("goog.events.pools");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.Listener");
goog.require("goog.structs.SimplePool");
goog.require("goog.userAgent.jscript");
goog.events.ASSUME_GOOD_GC = false;
goog.events.pools.getObject;
goog.events.pools.releaseObject;
goog.events.pools.getArray;
goog.events.pools.releaseArray;
goog.events.pools.getProxy;
goog.events.pools.setProxyCallbackFunction;
goog.events.pools.releaseProxy;
goog.events.pools.getListener;
goog.events.pools.releaseListener;
goog.events.pools.getEvent;
goog.events.pools.releaseEvent;
(function() {
  var BAD_GC = !goog.events.ASSUME_GOOD_GC && goog.userAgent.jscript.HAS_JSCRIPT && !goog.userAgent.jscript.isVersion("5.7");
  function getObject() {
    return{count_:0, remaining_:0}
  }
  function getArray() {
    return[]
  }
  var proxyCallbackFunction;
  goog.events.pools.setProxyCallbackFunction = function(cb) {
    proxyCallbackFunction = cb
  };
  function getProxy() {
    var f = function(eventObject) {
      return proxyCallbackFunction.call(f.src, f.key, eventObject)
    };
    return f
  }
  function getListener() {
    return new goog.events.Listener
  }
  function getEvent() {
    return new goog.events.BrowserEvent
  }
  if(!BAD_GC) {
    goog.events.pools.getObject = getObject;
    goog.events.pools.releaseObject = goog.nullFunction;
    goog.events.pools.getArray = getArray;
    goog.events.pools.releaseArray = goog.nullFunction;
    goog.events.pools.getProxy = getProxy;
    goog.events.pools.releaseProxy = goog.nullFunction;
    goog.events.pools.getListener = getListener;
    goog.events.pools.releaseListener = goog.nullFunction;
    goog.events.pools.getEvent = getEvent;
    goog.events.pools.releaseEvent = goog.nullFunction
  }else {
    goog.events.pools.getObject = function() {
      return objectPool.getObject()
    };
    goog.events.pools.releaseObject = function(obj) {
      objectPool.releaseObject(obj)
    };
    goog.events.pools.getArray = function() {
      return arrayPool.getObject()
    };
    goog.events.pools.releaseArray = function(obj) {
      arrayPool.releaseObject(obj)
    };
    goog.events.pools.getProxy = function() {
      return proxyPool.getObject()
    };
    goog.events.pools.releaseProxy = function(obj) {
      proxyPool.releaseObject(getProxy())
    };
    goog.events.pools.getListener = function() {
      return listenerPool.getObject()
    };
    goog.events.pools.releaseListener = function(obj) {
      listenerPool.releaseObject(obj)
    };
    goog.events.pools.getEvent = function() {
      return eventPool.getObject()
    };
    goog.events.pools.releaseEvent = function(obj) {
      eventPool.releaseObject(obj)
    };
    var OBJECT_POOL_INITIAL_COUNT = 0;
    var OBJECT_POOL_MAX_COUNT = 600;
    var objectPool = new goog.structs.SimplePool(OBJECT_POOL_INITIAL_COUNT, OBJECT_POOL_MAX_COUNT);
    objectPool.setCreateObjectFn(getObject);
    var ARRAY_POOL_INITIAL_COUNT = 0;
    var ARRAY_POOL_MAX_COUNT = 600;
    var arrayPool = new goog.structs.SimplePool(ARRAY_POOL_INITIAL_COUNT, ARRAY_POOL_MAX_COUNT);
    arrayPool.setCreateObjectFn(getArray);
    var HANDLE_EVENT_PROXY_POOL_INITIAL_COUNT = 0;
    var HANDLE_EVENT_PROXY_POOL_MAX_COUNT = 600;
    var proxyPool = new goog.structs.SimplePool(HANDLE_EVENT_PROXY_POOL_INITIAL_COUNT, HANDLE_EVENT_PROXY_POOL_MAX_COUNT);
    proxyPool.setCreateObjectFn(getProxy);
    var LISTENER_POOL_INITIAL_COUNT = 0;
    var LISTENER_POOL_MAX_COUNT = 600;
    var listenerPool = new goog.structs.SimplePool(LISTENER_POOL_INITIAL_COUNT, LISTENER_POOL_MAX_COUNT);
    listenerPool.setCreateObjectFn(getListener);
    var EVENT_POOL_INITIAL_COUNT = 0;
    var EVENT_POOL_MAX_COUNT = 600;
    var eventPool = new goog.structs.SimplePool(EVENT_POOL_INITIAL_COUNT, EVENT_POOL_MAX_COUNT);
    eventPool.setCreateObjectFn(getEvent)
  }
})();
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for(var key in obj) {
    f.call(opt_obj, obj[key], key, obj)
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key]
    }
  }
  return res
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj)
  }
  return res
};
goog.object.some = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      return true
    }
  }
  return false
};
goog.object.every = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(!f.call(opt_obj, obj[key], key, obj)) {
      return false
    }
  }
  return true
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for(var key in obj) {
    rv++
  }
  return rv
};
goog.object.getAnyKey = function(obj) {
  for(var key in obj) {
    return key
  }
};
goog.object.getAnyValue = function(obj) {
  for(var key in obj) {
    return obj[key]
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val)
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = obj[key]
  }
  return res
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = key
  }
  return res
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for(var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if(!goog.isDef(obj)) {
      break
    }
  }
  return obj
};
goog.object.containsKey = function(obj, key) {
  return key in obj
};
goog.object.containsValue = function(obj, val) {
  for(var key in obj) {
    if(obj[key] == val) {
      return true
    }
  }
  return false
};
goog.object.findKey = function(obj, f, opt_this) {
  for(var key in obj) {
    if(f.call(opt_this, obj[key], key, obj)) {
      return key
    }
  }
  return undefined
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key]
};
goog.object.isEmpty = function(obj) {
  for(var key in obj) {
    return false
  }
  return true
};
goog.object.clear = function(obj) {
  for(var i in obj) {
    delete obj[i]
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if(rv = key in obj) {
    delete obj[key]
  }
  return rv
};
goog.object.add = function(obj, key, val) {
  if(key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val)
};
goog.object.get = function(obj, key, opt_val) {
  if(key in obj) {
    return obj[key]
  }
  return opt_val
};
goog.object.set = function(obj, key, value) {
  obj[key] = value
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value
};
goog.object.clone = function(obj) {
  var res = {};
  for(var key in obj) {
    res[key] = obj[key]
  }
  return res
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key])
    }
    return clone
  }
  return obj
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for(var key in obj) {
    transposed[obj[key]] = key
  }
  return transposed
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for(var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for(key in source) {
      target[key] = source[key]
    }
    for(var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if(Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for(var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1]
  }
  return rv
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  var rv = {};
  for(var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true
  }
  return rv
};
goog.provide("goog.events");
goog.require("goog.array");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.debug.errorHandlerWeakDep");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.Event");
goog.require("goog.events.EventWrapper");
goog.require("goog.events.pools");
goog.require("goog.object");
goog.require("goog.userAgent");
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.requiresSyntheticEventPropagation_;
goog.events.listen = function(src, type, listener, opt_capt, opt_handler) {
  if(!type) {
    throw Error("Invalid event type");
  }else {
    if(goog.isArray(type)) {
      for(var i = 0;i < type.length;i++) {
        goog.events.listen(src, type[i], listener, opt_capt, opt_handler)
      }
      return null
    }else {
      var capture = !!opt_capt;
      var map = goog.events.listenerTree_;
      if(!(type in map)) {
        map[type] = goog.events.pools.getObject()
      }
      map = map[type];
      if(!(capture in map)) {
        map[capture] = goog.events.pools.getObject();
        map.count_++
      }
      map = map[capture];
      var srcUid = goog.getUid(src);
      var listenerArray, listenerObj;
      map.remaining_++;
      if(!map[srcUid]) {
        listenerArray = map[srcUid] = goog.events.pools.getArray();
        map.count_++
      }else {
        listenerArray = map[srcUid];
        for(var i = 0;i < listenerArray.length;i++) {
          listenerObj = listenerArray[i];
          if(listenerObj.listener == listener && listenerObj.handler == opt_handler) {
            if(listenerObj.removed) {
              break
            }
            return listenerArray[i].key
          }
        }
      }
      var proxy = goog.events.pools.getProxy();
      proxy.src = src;
      listenerObj = goog.events.pools.getListener();
      listenerObj.init(listener, proxy, src, type, capture, opt_handler);
      var key = listenerObj.key;
      proxy.key = key;
      listenerArray.push(listenerObj);
      goog.events.listeners_[key] = listenerObj;
      if(!goog.events.sources_[srcUid]) {
        goog.events.sources_[srcUid] = goog.events.pools.getArray()
      }
      goog.events.sources_[srcUid].push(listenerObj);
      if(src.addEventListener) {
        if(src == goog.global || !src.customEvent_) {
          src.addEventListener(type, proxy, capture)
        }
      }else {
        src.attachEvent(goog.events.getOnString_(type), proxy)
      }
      return key
    }
  }
};
goog.events.listenOnce = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++) {
      goog.events.listenOnce(src, type[i], listener, opt_capt, opt_handler)
    }
    return null
  }
  var key = goog.events.listen(src, type, listener, opt_capt, opt_handler);
  var listenerObj = goog.events.listeners_[key];
  listenerObj.callOnce = true;
  return key
};
goog.events.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler)
};
goog.events.unlisten = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++) {
      goog.events.unlisten(src, type[i], listener, opt_capt, opt_handler)
    }
    return null
  }
  var capture = !!opt_capt;
  var listenerArray = goog.events.getListeners_(src, type, capture);
  if(!listenerArray) {
    return false
  }
  for(var i = 0;i < listenerArray.length;i++) {
    if(listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler) {
      return goog.events.unlistenByKey(listenerArray[i].key)
    }
  }
  return false
};
goog.events.unlistenByKey = function(key) {
  if(!goog.events.listeners_[key]) {
    return false
  }
  var listener = goog.events.listeners_[key];
  if(listener.removed) {
    return false
  }
  var src = listener.src;
  var type = listener.type;
  var proxy = listener.proxy;
  var capture = listener.capture;
  if(src.removeEventListener) {
    if(src == goog.global || !src.customEvent_) {
      src.removeEventListener(type, proxy, capture)
    }
  }else {
    if(src.detachEvent) {
      src.detachEvent(goog.events.getOnString_(type), proxy)
    }
  }
  var srcUid = goog.getUid(src);
  var listenerArray = goog.events.listenerTree_[type][capture][srcUid];
  if(goog.events.sources_[srcUid]) {
    var sourcesArray = goog.events.sources_[srcUid];
    goog.array.remove(sourcesArray, listener);
    if(sourcesArray.length == 0) {
      delete goog.events.sources_[srcUid]
    }
  }
  listener.removed = true;
  listenerArray.needsCleanup_ = true;
  goog.events.cleanUp_(type, capture, srcUid, listenerArray);
  delete goog.events.listeners_[key];
  return true
};
goog.events.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler)
};
goog.events.cleanUp_ = function(type, capture, srcUid, listenerArray) {
  if(!listenerArray.locked_) {
    if(listenerArray.needsCleanup_) {
      for(var oldIndex = 0, newIndex = 0;oldIndex < listenerArray.length;oldIndex++) {
        if(listenerArray[oldIndex].removed) {
          var proxy = listenerArray[oldIndex].proxy;
          proxy.src = null;
          goog.events.pools.releaseProxy(proxy);
          goog.events.pools.releaseListener(listenerArray[oldIndex]);
          continue
        }
        if(oldIndex != newIndex) {
          listenerArray[newIndex] = listenerArray[oldIndex]
        }
        newIndex++
      }
      listenerArray.length = newIndex;
      listenerArray.needsCleanup_ = false;
      if(newIndex == 0) {
        goog.events.pools.releaseArray(listenerArray);
        delete goog.events.listenerTree_[type][capture][srcUid];
        goog.events.listenerTree_[type][capture].count_--;
        if(goog.events.listenerTree_[type][capture].count_ == 0) {
          goog.events.pools.releaseObject(goog.events.listenerTree_[type][capture]);
          delete goog.events.listenerTree_[type][capture];
          goog.events.listenerTree_[type].count_--
        }
        if(goog.events.listenerTree_[type].count_ == 0) {
          goog.events.pools.releaseObject(goog.events.listenerTree_[type]);
          delete goog.events.listenerTree_[type]
        }
      }
    }
  }
};
goog.events.removeAll = function(opt_obj, opt_type, opt_capt) {
  var count = 0;
  var noObj = opt_obj == null;
  var noType = opt_type == null;
  var noCapt = opt_capt == null;
  opt_capt = !!opt_capt;
  if(!noObj) {
    var srcUid = goog.getUid(opt_obj);
    if(goog.events.sources_[srcUid]) {
      var sourcesArray = goog.events.sources_[srcUid];
      for(var i = sourcesArray.length - 1;i >= 0;i--) {
        var listener = sourcesArray[i];
        if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
          goog.events.unlistenByKey(listener.key);
          count++
        }
      }
    }
  }else {
    goog.object.forEach(goog.events.sources_, function(listeners) {
      for(var i = listeners.length - 1;i >= 0;i--) {
        var listener = listeners[i];
        if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
          goog.events.unlistenByKey(listener.key);
          count++
        }
      }
    })
  }
  return count
};
goog.events.getListeners = function(obj, type, capture) {
  return goog.events.getListeners_(obj, type, capture) || []
};
goog.events.getListeners_ = function(obj, type, capture) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      map = map[capture];
      var objUid = goog.getUid(obj);
      if(map[objUid]) {
        return map[objUid]
      }
    }
  }
  return null
};
goog.events.getListener = function(src, type, listener, opt_capt, opt_handler) {
  var capture = !!opt_capt;
  var listenerArray = goog.events.getListeners_(src, type, capture);
  if(listenerArray) {
    for(var i = 0;i < listenerArray.length;i++) {
      if(listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler) {
        return listenerArray[i]
      }
    }
  }
  return null
};
goog.events.hasListener = function(obj, opt_type, opt_capture) {
  var objUid = goog.getUid(obj);
  var listeners = goog.events.sources_[objUid];
  if(listeners) {
    var hasType = goog.isDef(opt_type);
    var hasCapture = goog.isDef(opt_capture);
    if(hasType && hasCapture) {
      var map = goog.events.listenerTree_[opt_type];
      return!!map && !!map[opt_capture] && objUid in map[opt_capture]
    }else {
      if(!(hasType || hasCapture)) {
        return true
      }else {
        return goog.array.some(listeners, function(listener) {
          return hasType && listener.type == opt_type || hasCapture && listener.capture == opt_capture
        })
      }
    }
  }
  return false
};
goog.events.expose = function(e) {
  var str = [];
  for(var key in e) {
    if(e[key] && e[key].id) {
      str.push(key + " = " + e[key] + " (" + e[key].id + ")")
    }else {
      str.push(key + " = " + e[key])
    }
  }
  return str.join("\n")
};
goog.events.getOnString_ = function(type) {
  if(type in goog.events.onStringMap_) {
    return goog.events.onStringMap_[type]
  }
  return goog.events.onStringMap_[type] = goog.events.onString_ + type
};
goog.events.fireListeners = function(obj, type, capture, eventObject) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      return goog.events.fireListeners_(map[capture], obj, type, capture, eventObject)
    }
  }
  return true
};
goog.events.fireListeners_ = function(map, obj, type, capture, eventObject) {
  var retval = 1;
  var objUid = goog.getUid(obj);
  if(map[objUid]) {
    map.remaining_--;
    var listenerArray = map[objUid];
    if(!listenerArray.locked_) {
      listenerArray.locked_ = 1
    }else {
      listenerArray.locked_++
    }
    try {
      var length = listenerArray.length;
      for(var i = 0;i < length;i++) {
        var listener = listenerArray[i];
        if(listener && !listener.removed) {
          retval &= goog.events.fireListener(listener, eventObject) !== false
        }
      }
    }finally {
      listenerArray.locked_--;
      goog.events.cleanUp_(type, capture, objUid, listenerArray)
    }
  }
  return Boolean(retval)
};
goog.events.fireListener = function(listener, eventObject) {
  var rv = listener.handleEvent(eventObject);
  if(listener.callOnce) {
    goog.events.unlistenByKey(listener.key)
  }
  return rv
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(src, e) {
  var type = e.type || e;
  var map = goog.events.listenerTree_;
  if(!(type in map)) {
    return true
  }
  if(goog.isString(e)) {
    e = new goog.events.Event(e, src)
  }else {
    if(!(e instanceof goog.events.Event)) {
      var oldEvent = e;
      e = new goog.events.Event(type, src);
      goog.object.extend(e, oldEvent)
    }else {
      e.target = e.target || src
    }
  }
  var rv = 1, ancestors;
  map = map[type];
  var hasCapture = true in map;
  var targetsMap;
  if(hasCapture) {
    ancestors = [];
    for(var parent = src;parent;parent = parent.getParentEventTarget()) {
      ancestors.push(parent)
    }
    targetsMap = map[true];
    targetsMap.remaining_ = targetsMap.count_;
    for(var i = ancestors.length - 1;!e.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
      e.currentTarget = ancestors[i];
      rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, true, e) && e.returnValue_ != false
    }
  }
  var hasBubble = false in map;
  if(hasBubble) {
    targetsMap = map[false];
    targetsMap.remaining_ = targetsMap.count_;
    if(hasCapture) {
      for(var i = 0;!e.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
        e.currentTarget = ancestors[i];
        rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, false, e) && e.returnValue_ != false
      }
    }else {
      for(var current = src;!e.propagationStopped_ && current && targetsMap.remaining_;current = current.getParentEventTarget()) {
        e.currentTarget = current;
        rv &= goog.events.fireListeners_(targetsMap, current, e.type, false, e) && e.returnValue_ != false
      }
    }
  }
  return Boolean(rv)
};
goog.events.protectBrowserEventEntryPoint = function(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(key, opt_evt) {
  if(!goog.events.listeners_[key]) {
    return true
  }
  var listener = goog.events.listeners_[key];
  var type = listener.type;
  var map = goog.events.listenerTree_;
  if(!(type in map)) {
    return true
  }
  map = map[type];
  var retval, targetsMap;
  if(goog.events.synthesizeEventPropagation_()) {
    var ieEvent = opt_evt || goog.getObjectByName("window.event");
    var hasCapture = true in map;
    var hasBubble = false in map;
    if(hasCapture) {
      if(goog.events.isMarkedIeEvent_(ieEvent)) {
        return true
      }
      goog.events.markIeEvent_(ieEvent)
    }
    var evt = goog.events.pools.getEvent();
    evt.init(ieEvent, this);
    retval = true;
    try {
      if(hasCapture) {
        var ancestors = goog.events.pools.getArray();
        for(var parent = evt.currentTarget;parent;parent = parent.parentNode) {
          ancestors.push(parent)
        }
        targetsMap = map[true];
        targetsMap.remaining_ = targetsMap.count_;
        for(var i = ancestors.length - 1;!evt.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
          evt.currentTarget = ancestors[i];
          retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, true, evt)
        }
        if(hasBubble) {
          targetsMap = map[false];
          targetsMap.remaining_ = targetsMap.count_;
          for(var i = 0;!evt.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
            evt.currentTarget = ancestors[i];
            retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, false, evt)
          }
        }
      }else {
        retval = goog.events.fireListener(listener, evt)
      }
    }finally {
      if(ancestors) {
        ancestors.length = 0;
        goog.events.pools.releaseArray(ancestors)
      }
      evt.dispose();
      goog.events.pools.releaseEvent(evt)
    }
    return retval
  }
  var be = new goog.events.BrowserEvent(opt_evt, this);
  try {
    retval = goog.events.fireListener(listener, be)
  }finally {
    be.dispose()
  }
  return retval
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(e) {
  var useReturnValue = false;
  if(e.keyCode == 0) {
    try {
      e.keyCode = -1;
      return
    }catch(ex) {
      useReturnValue = true
    }
  }
  if(useReturnValue || e.returnValue == undefined) {
    e.returnValue = true
  }
};
goog.events.isMarkedIeEvent_ = function(e) {
  return e.keyCode < 0 || e.returnValue != undefined
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++
};
goog.events.synthesizeEventPropagation_ = function() {
  if(goog.events.requiresSyntheticEventPropagation_ === undefined) {
    goog.events.requiresSyntheticEventPropagation_ = goog.userAgent.IE && !goog.global["addEventListener"]
  }
  return goog.events.requiresSyntheticEventPropagation_
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
});
goog.provide("goog.events.EventTarget");
goog.require("goog.Disposable");
goog.require("goog.events");
goog.events.EventTarget = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = true;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(parent) {
  this.parentEventTarget_ = parent
};
goog.events.EventTarget.prototype.addEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope)
};
goog.events.EventTarget.prototype.removeEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope)
};
goog.events.EventTarget.prototype.dispatchEvent = function(e) {
  return goog.events.dispatchEvent(this, e)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.provide("goog.Timer");
goog.require("goog.events.EventTarget");
goog.Timer = function(opt_interval, opt_timerObject) {
  goog.events.EventTarget.call(this);
  this.interval_ = opt_interval || 1;
  this.timerObject_ = opt_timerObject || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = false;
goog.Timer.defaultTimerObject = goog.global["window"];
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function(interval) {
  this.interval_ = interval;
  if(this.timer_ && this.enabled) {
    this.stop();
    this.start()
  }else {
    if(this.timer_) {
      this.stop()
    }
  }
};
goog.Timer.prototype.tick_ = function() {
  if(this.enabled) {
    var elapsed = goog.now() - this.last_;
    if(elapsed > 0 && elapsed < this.interval_ * goog.Timer.intervalScale) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - elapsed);
      return
    }
    this.dispatchTick();
    if(this.enabled) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
      this.last_ = goog.now()
    }
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
  this.enabled = true;
  if(!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
    this.last_ = goog.now()
  }
};
goog.Timer.prototype.stop = function() {
  this.enabled = false;
  if(this.timer_) {
    this.timerObject_.clearTimeout(this.timer_);
    this.timer_ = null
  }
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(listener, opt_delay, opt_handler) {
  if(goog.isFunction(listener)) {
    if(opt_handler) {
      listener = goog.bind(listener, opt_handler)
    }
  }else {
    if(listener && typeof listener.handleEvent == "function") {
      listener = goog.bind(listener.handleEvent, listener)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  if(opt_delay > goog.Timer.MAX_TIMEOUT_) {
    return-1
  }else {
    return goog.Timer.defaultTimerObject.setTimeout(listener, opt_delay || 0)
  }
};
goog.Timer.clear = function(timerId) {
  goog.Timer.defaultTimerObject.clearTimeout(timerId)
};
goog.provide("goog.structs");
goog.require("goog.array");
goog.require("goog.object");
goog.structs.getCount = function(col) {
  if(typeof col.getCount == "function") {
    return col.getCount()
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return col.length
  }
  return goog.object.getCount(col)
};
goog.structs.getValues = function(col) {
  if(typeof col.getValues == "function") {
    return col.getValues()
  }
  if(goog.isString(col)) {
    return col.split("")
  }
  if(goog.isArrayLike(col)) {
    var rv = [];
    var l = col.length;
    for(var i = 0;i < l;i++) {
      rv.push(col[i])
    }
    return rv
  }
  return goog.object.getValues(col)
};
goog.structs.getKeys = function(col) {
  if(typeof col.getKeys == "function") {
    return col.getKeys()
  }
  if(typeof col.getValues == "function") {
    return undefined
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    var rv = [];
    var l = col.length;
    for(var i = 0;i < l;i++) {
      rv.push(i)
    }
    return rv
  }
  return goog.object.getKeys(col)
};
goog.structs.contains = function(col, val) {
  if(typeof col.contains == "function") {
    return col.contains(val)
  }
  if(typeof col.containsValue == "function") {
    return col.containsValue(val)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.contains(col, val)
  }
  return goog.object.containsValue(col, val)
};
goog.structs.isEmpty = function(col) {
  if(typeof col.isEmpty == "function") {
    return col.isEmpty()
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.isEmpty(col)
  }
  return goog.object.isEmpty(col)
};
goog.structs.clear = function(col) {
  if(typeof col.clear == "function") {
    col.clear()
  }else {
    if(goog.isArrayLike(col)) {
      goog.array.clear(col)
    }else {
      goog.object.clear(col)
    }
  }
};
goog.structs.forEach = function(col, f, opt_obj) {
  if(typeof col.forEach == "function") {
    col.forEach(f, opt_obj)
  }else {
    if(goog.isArrayLike(col) || goog.isString(col)) {
      goog.array.forEach(col, f, opt_obj)
    }else {
      var keys = goog.structs.getKeys(col);
      var values = goog.structs.getValues(col);
      var l = values.length;
      for(var i = 0;i < l;i++) {
        f.call(opt_obj, values[i], keys && keys[i], col)
      }
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if(typeof col.filter == "function") {
    return col.filter(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.filter(col, f, opt_obj)
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++) {
      if(f.call(opt_obj, values[i], keys[i], col)) {
        rv[keys[i]] = values[i]
      }
    }
  }else {
    rv = [];
    for(var i = 0;i < l;i++) {
      if(f.call(opt_obj, values[i], undefined, col)) {
        rv.push(values[i])
      }
    }
  }
  return rv
};
goog.structs.map = function(col, f, opt_obj) {
  if(typeof col.map == "function") {
    return col.map(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.map(col, f, opt_obj)
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col)
    }
  }else {
    rv = [];
    for(var i = 0;i < l;i++) {
      rv[i] = f.call(opt_obj, values[i], undefined, col)
    }
  }
  return rv
};
goog.structs.some = function(col, f, opt_obj) {
  if(typeof col.some == "function") {
    return col.some(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.some(col, f, opt_obj)
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    if(f.call(opt_obj, values[i], keys && keys[i], col)) {
      return true
    }
  }
  return false
};
goog.structs.every = function(col, f, opt_obj) {
  if(typeof col.every == "function") {
    return col.every(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.every(col, f, opt_obj)
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    if(!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return false
    }
  }
  return true
};
goog.provide("goog.iter");
goog.provide("goog.iter.Iterator");
goog.provide("goog.iter.StopIteration");
goog.require("goog.array");
goog.require("goog.asserts");
goog.iter.Iterable;
if("StopIteration" in goog.global) {
  goog.iter.StopIteration = goog.global["StopIteration"]
}else {
  goog.iter.StopIteration = Error("StopIteration")
}
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(opt_keys) {
  return this
};
goog.iter.toIterator = function(iterable) {
  if(iterable instanceof goog.iter.Iterator) {
    return iterable
  }
  if(typeof iterable.__iterator__ == "function") {
    return iterable.__iterator__(false)
  }
  if(goog.isArrayLike(iterable)) {
    var i = 0;
    var newIter = new goog.iter.Iterator;
    newIter.next = function() {
      while(true) {
        if(i >= iterable.length) {
          throw goog.iter.StopIteration;
        }
        if(!(i in iterable)) {
          i++;
          continue
        }
        return iterable[i++]
      }
    };
    return newIter
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if(goog.isArrayLike(iterable)) {
    try {
      goog.array.forEach(iterable, f, opt_obj)
    }catch(ex) {
      if(ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }else {
    iterable = goog.iter.toIterator(iterable);
    try {
      while(true) {
        f.call(opt_obj, iterable.next(), undefined, iterable)
      }
    }catch(ex) {
      if(ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      if(f.call(opt_obj, val, undefined, iterable)) {
        return val
      }
    }
  };
  return newIter
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  var start = 0;
  var stop = startOrStop;
  var step = opt_step || 1;
  if(arguments.length > 1) {
    start = startOrStop;
    stop = opt_stop
  }
  if(step == 0) {
    throw Error("Range step argument must not be zero");
  }
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if(step > 0 && start >= stop || step < 0 && start <= stop) {
      throw goog.iter.StopIteration;
    }
    var rv = start;
    start += step;
    return rv
  };
  return newIter
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator)
};
goog.iter.map = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      return f.call(opt_obj, val, undefined, iterable)
    }
  };
  return newIter
};
goog.iter.reduce = function(iterable, f, val, opt_obj) {
  var rval = val;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val)
  });
  return rval
};
goog.iter.some = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while(true) {
      if(f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return true
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return false
};
goog.iter.every = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while(true) {
      if(!f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return false
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return true
};
goog.iter.chain = function(var_args) {
  var args = arguments;
  var length = args.length;
  var i = 0;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    try {
      if(i >= length) {
        throw goog.iter.StopIteration;
      }
      var current = goog.iter.toIterator(args[i]);
      return current.next()
    }catch(ex) {
      if(ex !== goog.iter.StopIteration || i >= length) {
        throw ex;
      }else {
        i++;
        return this.next()
      }
    }
  };
  return newIter
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var dropping = true;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      if(dropping && f.call(opt_obj, val, undefined, iterable)) {
        continue
      }else {
        dropping = false
      }
      return val
    }
  };
  return newIter
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var taking = true;
  newIter.next = function() {
    while(true) {
      if(taking) {
        var val = iterable.next();
        if(f.call(opt_obj, val, undefined, iterable)) {
          return val
        }else {
          taking = false
        }
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return newIter
};
goog.iter.toArray = function(iterable) {
  if(goog.isArrayLike(iterable)) {
    return goog.array.toArray(iterable)
  }
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val)
  });
  return array
};
goog.iter.equals = function(iterable1, iterable2) {
  iterable1 = goog.iter.toIterator(iterable1);
  iterable2 = goog.iter.toIterator(iterable2);
  var b1, b2;
  try {
    while(true) {
      b1 = b2 = false;
      var val1 = iterable1.next();
      b1 = true;
      var val2 = iterable2.next();
      b2 = true;
      if(val1 != val2) {
        return false
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }else {
      if(b1 && !b2) {
        return false
      }
      if(!b2) {
        try {
          val2 = iterable2.next();
          return false
        }catch(ex1) {
          if(ex1 !== goog.iter.StopIteration) {
            throw ex1;
          }
          return true
        }
      }
    }
  }
  return false
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next()
  }catch(e) {
    if(e != goog.iter.StopIteration) {
      throw e;
    }
    return defaultValue
  }
};
goog.iter.product = function(var_args) {
  var someArrayEmpty = goog.array.some(arguments, function(arr) {
    return!arr.length
  });
  if(someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator
  }
  var iter = new goog.iter.Iterator;
  var arrays = arguments;
  var indicies = goog.array.repeat(0, arrays.length);
  iter.next = function() {
    if(indicies) {
      var retVal = goog.array.map(indicies, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex]
      });
      for(var i = indicies.length - 1;i >= 0;i--) {
        goog.asserts.assert(indicies);
        if(indicies[i] < arrays[i].length - 1) {
          indicies[i]++;
          break
        }
        if(i == 0) {
          indicies = null;
          break
        }
        indicies[i] = 0
      }
      return retVal
    }
    throw goog.iter.StopIteration;
  };
  return iter
};
goog.provide("goog.structs.Map");
goog.require("goog.iter.Iterator");
goog.require("goog.iter.StopIteration");
goog.require("goog.object");
goog.require("goog.structs");
goog.structs.Map = function(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  var argLength = arguments.length;
  if(argLength > 1) {
    if(argLength % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var i = 0;i < argLength;i += 2) {
      this.set(arguments[i], arguments[i + 1])
    }
  }else {
    if(opt_map) {
      this.addAll(opt_map)
    }
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  var rv = [];
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key])
  }
  return rv
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key)
};
goog.structs.Map.prototype.containsValue = function(val) {
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if(goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return true
    }
  }
  return false
};
goog.structs.Map.prototype.equals = function(otherMap, opt_equalityFn) {
  if(this === otherMap) {
    return true
  }
  if(this.count_ != otherMap.getCount()) {
    return false
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var key, i = 0;key = this.keys_[i];i++) {
    if(!equalityFn(this.get(key), otherMap.get(key))) {
      return false
    }
  }
  return true
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return this.count_ == 0
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.keys_.length = 0;
  this.count_ = 0;
  this.version_ = 0
};
goog.structs.Map.prototype.remove = function(key) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    delete this.map_[key];
    this.count_--;
    this.version_++;
    if(this.keys_.length > 2 * this.count_) {
      this.cleanupKeysArray_()
    }
    return true
  }
  return false
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    var srcIndex = 0;
    var destIndex = 0;
    while(srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if(goog.structs.Map.hasKey_(this.map_, key)) {
        this.keys_[destIndex++] = key
      }
      srcIndex++
    }
    this.keys_.length = destIndex
  }
  if(this.count_ != this.keys_.length) {
    var seen = {};
    var srcIndex = 0;
    var destIndex = 0;
    while(srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if(!goog.structs.Map.hasKey_(seen, key)) {
        this.keys_[destIndex++] = key;
        seen[key] = 1
      }
      srcIndex++
    }
    this.keys_.length = destIndex
  }
};
goog.structs.Map.prototype.get = function(key, opt_val) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    return this.map_[key]
  }
  return opt_val
};
goog.structs.Map.prototype.set = function(key, value) {
  if(!goog.structs.Map.hasKey_(this.map_, key)) {
    this.count_++;
    this.keys_.push(key);
    this.version_++
  }
  this.map_[key] = value
};
goog.structs.Map.prototype.addAll = function(map) {
  var keys, values;
  if(map instanceof goog.structs.Map) {
    keys = map.getKeys();
    values = map.getValues()
  }else {
    keys = goog.object.getKeys(map);
    values = goog.object.getValues(map)
  }
  for(var i = 0;i < keys.length;i++) {
    this.set(keys[i], values[i])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  var transposed = new goog.structs.Map;
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    var value = this.map_[key];
    transposed.set(value, key)
  }
  return transposed
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  var obj = {};
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key]
  }
  return obj
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(true)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(false)
};
goog.structs.Map.prototype.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0;
  var keys = this.keys_;
  var map = this.map_;
  var version = this.version_;
  var selfObj = this;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      if(version != selfObj.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(i >= keys.length) {
        throw goog.iter.StopIteration;
      }
      var key = keys[i++];
      return opt_keys ? key : map[key]
    }
  };
  return newIter
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
};
goog.provide("goog.structs.Set");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map;
  if(opt_values) {
    this.addAll(opt_values)
  }
};
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  if(type == "object" && val || type == "function") {
    return"o" + goog.getUid(val)
  }else {
    return type.substr(0, 1) + val
  }
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element)
};
goog.structs.Set.prototype.addAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    this.add(values[i])
  }
};
goog.structs.Set.prototype.removeAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    this.remove(values[i])
  }
};
goog.structs.Set.prototype.remove = function(element) {
  return this.map_.remove(goog.structs.Set.getKey_(element))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element))
};
goog.structs.Set.prototype.containsAll = function(col) {
  return goog.structs.every(col, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(col) {
  var result = new goog.structs.Set;
  var values = goog.structs.getValues(col);
  for(var i = 0;i < values.length;i++) {
    var value = values[i];
    if(this.contains(value)) {
      result.add(value)
    }
  }
  return result
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col)
};
goog.structs.Set.prototype.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if(this.getCount() > colCount) {
    return false
  }
  if(!(col instanceof goog.structs.Set) && colCount > 5) {
    col = new goog.structs.Set(col)
  }
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value)
  })
};
goog.structs.Set.prototype.__iterator__ = function(opt_keys) {
  return this.map_.__iterator__(false)
};
goog.provide("goog.debug");
goog.require("goog.array");
goog.require("goog.string");
goog.require("goog.structs.Set");
goog.debug.catchErrors = function(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global;
  var oldErrorHandler = target.onerror;
  target.onerror = function(message, url, line) {
    if(oldErrorHandler) {
      oldErrorHandler(message, url, line)
    }
    logFunc({message:message, fileName:url, line:line});
    return Boolean(opt_cancel)
  }
};
goog.debug.expose = function(obj, opt_showFn) {
  if(typeof obj == "undefined") {
    return"undefined"
  }
  if(obj == null) {
    return"NULL"
  }
  var str = [];
  for(var x in obj) {
    if(!opt_showFn && goog.isFunction(obj[x])) {
      continue
    }
    var s = x + " = ";
    try {
      s += obj[x]
    }catch(e) {
      s += "*** " + e + " ***"
    }
    str.push(s)
  }
  return str.join("\n")
};
goog.debug.deepExpose = function(obj, opt_showFn) {
  var previous = new goog.structs.Set;
  var str = [];
  var helper = function(obj, space) {
    var nestspace = space + "  ";
    var indentMultiline = function(str) {
      return str.replace(/\n/g, "\n" + space)
    };
    try {
      if(!goog.isDef(obj)) {
        str.push("undefined")
      }else {
        if(goog.isNull(obj)) {
          str.push("NULL")
        }else {
          if(goog.isString(obj)) {
            str.push('"' + indentMultiline(obj) + '"')
          }else {
            if(goog.isFunction(obj)) {
              str.push(indentMultiline(String(obj)))
            }else {
              if(goog.isObject(obj)) {
                if(previous.contains(obj)) {
                  str.push("*** reference loop detected ***")
                }else {
                  previous.add(obj);
                  str.push("{");
                  for(var x in obj) {
                    if(!opt_showFn && goog.isFunction(obj[x])) {
                      continue
                    }
                    str.push("\n");
                    str.push(nestspace);
                    str.push(x + " = ");
                    helper(obj[x], nestspace)
                  }
                  str.push("\n" + space + "}")
                }
              }else {
                str.push(obj)
              }
            }
          }
        }
      }
    }catch(e) {
      str.push("*** " + e + " ***")
    }
  };
  helper(obj, "");
  return str.join("")
};
goog.debug.exposeArray = function(arr) {
  var str = [];
  for(var i = 0;i < arr.length;i++) {
    if(goog.isArray(arr[i])) {
      str.push(goog.debug.exposeArray(arr[i]))
    }else {
      str.push(arr[i])
    }
  }
  return"[ " + str.join(", ") + " ]"
};
goog.debug.exposeException = function(err, opt_fn) {
  try {
    var e = goog.debug.normalizeErrorObject(err);
    var error = "Message: " + goog.string.htmlEscape(e.message) + '\nUrl: <a href="view-source:' + e.fileName + '" target="_new">' + e.fileName + "</a>\nLine: " + e.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(e.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(opt_fn) + "-> ");
    return error
  }catch(e2) {
    return"Exception trying to expose exception! You win, we lose. " + e2
  }
};
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName("window.location.href");
  if(goog.isString(err)) {
    return{"message":err, "name":"Unknown error", "lineNumber":"Not available", "fileName":href, "stack":"Not available"}
  }
  var lineNumber, fileName;
  var threwError = false;
  try {
    lineNumber = err.lineNumber || err.line || "Not available"
  }catch(e) {
    lineNumber = "Not available";
    threwError = true
  }
  try {
    fileName = err.fileName || err.filename || err.sourceURL || href
  }catch(e) {
    fileName = "Not available";
    threwError = true
  }
  if(threwError || !err.lineNumber || !err.fileName || !err.stack) {
    return{"message":err.message, "name":err.name, "lineNumber":lineNumber, "fileName":fileName, "stack":err.stack || "Not available"}
  }
  return err
};
goog.debug.enhanceError = function(err, opt_message) {
  var error = typeof err == "string" ? Error(err) : err;
  if(!error.stack) {
    error.stack = goog.debug.getStacktrace(arguments.callee.caller)
  }
  if(opt_message) {
    var x = 0;
    while(error["message" + x]) {
      ++x
    }
    error["message" + x] = String(opt_message)
  }
  return error
};
goog.debug.getStacktraceSimple = function(opt_depth) {
  var sb = [];
  var fn = arguments.callee.caller;
  var depth = 0;
  while(fn && (!opt_depth || depth < opt_depth)) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller
    }catch(e) {
      sb.push("[exception trying to get caller]\n");
      break
    }
    depth++;
    if(depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break
    }
  }
  if(opt_depth && depth >= opt_depth) {
    sb.push("[...reached max depth limit...]")
  }else {
    sb.push("[end]")
  }
  return sb.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(opt_fn) {
  return goog.debug.getStacktraceHelper_(opt_fn || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];
  if(goog.array.contains(visited, fn)) {
    sb.push("[...circular reference...]")
  }else {
    if(fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
      sb.push(goog.debug.getFunctionName(fn) + "(");
      var args = fn.arguments;
      for(var i = 0;i < args.length;i++) {
        if(i > 0) {
          sb.push(", ")
        }
        var argDesc;
        var arg = args[i];
        switch(typeof arg) {
          case "object":
            argDesc = arg ? "object" : "null";
            break;
          case "string":
            argDesc = arg;
            break;
          case "number":
            argDesc = String(arg);
            break;
          case "boolean":
            argDesc = arg ? "true" : "false";
            break;
          case "function":
            argDesc = goog.debug.getFunctionName(arg);
            argDesc = argDesc ? argDesc : "[fn]";
            break;
          case "undefined":
          ;
          default:
            argDesc = typeof arg;
            break
        }
        if(argDesc.length > 40) {
          argDesc = argDesc.substr(0, 40) + "..."
        }
        sb.push(argDesc)
      }
      visited.push(fn);
      sb.push(")\n");
      try {
        sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited))
      }catch(e) {
        sb.push("[exception trying to get caller]\n")
      }
    }else {
      if(fn) {
        sb.push("[...long stack...]")
      }else {
        sb.push("[end]")
      }
    }
  }
  return sb.join("")
};
goog.debug.getFunctionName = function(fn) {
  var functionSource = String(fn);
  if(!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function ([^\(]+)/.exec(functionSource);
    if(matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method
    }else {
      goog.debug.fnNameCache_[functionSource] = "[Anonymous]"
    }
  }
  return goog.debug.fnNameCache_[functionSource]
};
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.provide("goog.debug.LogRecord");
goog.debug.LogRecord = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  this.reset(level, msg, loggerName, opt_time, opt_sequenceNumber)
};
goog.debug.LogRecord.prototype.time_;
goog.debug.LogRecord.prototype.level_;
goog.debug.LogRecord.prototype.msg_;
goog.debug.LogRecord.prototype.loggerName_;
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = true;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  if(goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS) {
    this.sequenceNumber_ = typeof opt_sequenceNumber == "number" ? opt_sequenceNumber : goog.debug.LogRecord.nextSequenceNumber_++
  }
  this.time_ = opt_time || goog.now();
  this.level_ = level;
  this.msg_ = msg;
  this.loggerName_ = loggerName;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(exception) {
  this.exception_ = exception
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(text) {
  this.exceptionText_ = text
};
goog.debug.LogRecord.prototype.setLoggerName = function(loggerName) {
  this.loggerName_ = loggerName
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(level) {
  this.level_ = level
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(msg) {
  this.msg_ = msg
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(time) {
  this.time_ = time
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.provide("goog.debug.LogBuffer");
goog.require("goog.asserts");
goog.require("goog.debug.LogRecord");
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining " + "goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  if(!goog.debug.LogBuffer.instance_) {
    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer
  }
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.buffer_;
goog.debug.LogBuffer.prototype.curIndex_;
goog.debug.LogBuffer.prototype.isFull_;
goog.debug.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {
  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = curIndex;
  if(this.isFull_) {
    var ret = this.buffer_[curIndex];
    ret.reset(level, msg, loggerName);
    return ret
  }
  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[curIndex] = new goog.debug.LogRecord(level, msg, loggerName)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return goog.debug.LogBuffer.CAPACITY > 0
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = false
};
goog.debug.LogBuffer.prototype.forEachRecord = function(func) {
  var buffer = this.buffer_;
  if(!buffer[0]) {
    return
  }
  var curIndex = this.curIndex_;
  var i = this.isFull_ ? curIndex : -1;
  do {
    i = (i + 1) % goog.debug.LogBuffer.CAPACITY;
    func(buffer[i])
  }while(i != curIndex)
};
goog.provide("goog.debug.LogManager");
goog.provide("goog.debug.Logger");
goog.provide("goog.debug.Logger.Level");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.debug");
goog.require("goog.debug.LogBuffer");
goog.require("goog.debug.LogRecord");
goog.debug.Logger = function(name) {
  this.name_ = name
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = true;
if(!goog.debug.Logger.ENABLE_HIERARCHY) {
  goog.debug.Logger.rootHandlers_ = [];
  goog.debug.Logger.rootLevel_
}
goog.debug.Logger.Level = function(name, value) {
  this.name = name;
  this.value = value
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var i = 0, level;level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];i++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[level.value] = level;
    goog.debug.Logger.Level.predefinedLevelsCache_[level.name] = level
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(name) {
  if(!goog.debug.Logger.Level.predefinedLevelsCache_) {
    goog.debug.Logger.Level.createPredefinedLevelsCache_()
  }
  return goog.debug.Logger.Level.predefinedLevelsCache_[name] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(value) {
  if(!goog.debug.Logger.Level.predefinedLevelsCache_) {
    goog.debug.Logger.Level.createPredefinedLevelsCache_()
  }
  if(value in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[value]
  }
  for(var i = 0;i < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++i) {
    var level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];
    if(level.value <= value) {
      return level
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(name) {
  return goog.debug.LogManager.getLogger(name)
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(handler) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(handler)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when " + "goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootHandlers_.push(handler)
  }
};
goog.debug.Logger.prototype.removeHandler = function(handler) {
  var handlers = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!handlers && goog.array.remove(handlers, handler)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(level) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    this.level_ = level
  }else {
    goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when " + "goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootLevel_ = level
  }
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(level) {
  return level.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(level, msg, opt_exception) {
  if(this.isLoggable(level)) {
    this.doLogRecord_(this.getLogRecord(level, msg, opt_exception))
  }
};
goog.debug.Logger.prototype.getLogRecord = function(level, msg, opt_exception) {
  if(goog.debug.LogBuffer.isBufferingEnabled()) {
    var logRecord = goog.debug.LogBuffer.getInstance().addRecord(level, msg, this.name_)
  }else {
    logRecord = new goog.debug.LogRecord(level, String(msg), this.name_)
  }
  if(opt_exception) {
    logRecord.setException(opt_exception);
    logRecord.setExceptionText(goog.debug.exposeException(opt_exception, arguments.callee.caller))
  }
  return logRecord
};
goog.debug.Logger.prototype.shout = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SHOUT, msg, opt_exception)
};
goog.debug.Logger.prototype.severe = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SEVERE, msg, opt_exception)
};
goog.debug.Logger.prototype.warning = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.WARNING, msg, opt_exception)
};
goog.debug.Logger.prototype.info = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.INFO, msg, opt_exception)
};
goog.debug.Logger.prototype.config = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.CONFIG, msg, opt_exception)
};
goog.debug.Logger.prototype.fine = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINE, msg, opt_exception)
};
goog.debug.Logger.prototype.finer = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINER, msg, opt_exception)
};
goog.debug.Logger.prototype.finest = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINEST, msg, opt_exception)
};
goog.debug.Logger.prototype.logRecord = function(logRecord) {
  if(this.isLoggable(logRecord.getLevel())) {
    this.doLogRecord_(logRecord)
  }
};
goog.debug.Logger.prototype.logToSpeedTracer_ = function(msg) {
  if(goog.global["console"] && goog.global["console"]["markTimeline"]) {
    goog.global["console"]["markTimeline"](msg)
  }
};
goog.debug.Logger.prototype.doLogRecord_ = function(logRecord) {
  this.logToSpeedTracer_("log:" + logRecord.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var target = this;
    while(target) {
      target.callPublish_(logRecord);
      target = target.getParent()
    }
  }else {
    for(var i = 0, handler;handler = goog.debug.Logger.rootHandlers_[i++];) {
      handler(logRecord)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(logRecord) {
  if(this.handlers_) {
    for(var i = 0, handler;handler = this.handlers_[i];i++) {
      handler(logRecord)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(parent) {
  this.parent_ = parent
};
goog.debug.Logger.prototype.addChild_ = function(name, logger) {
  this.getChildren()[name] = logger
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger("");
    goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(name) {
  goog.debug.LogManager.initialize();
  var ret = goog.debug.LogManager.loggers_[name];
  return ret || goog.debug.LogManager.createLogger_(name)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(opt_logger) {
  return function(info) {
    var logger = opt_logger || goog.debug.LogManager.getRoot();
    logger.severe("Error: " + info.message + " (" + info.fileName + " @ Line: " + info.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(name) {
  var logger = new goog.debug.Logger(name);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var lastDotIndex = name.lastIndexOf(".");
    var parentName = name.substr(0, lastDotIndex);
    var leafName = name.substr(lastDotIndex + 1);
    var parentLogger = goog.debug.LogManager.getLogger(parentName);
    parentLogger.addChild_(leafName, logger);
    logger.setParent_(parentLogger)
  }
  goog.debug.LogManager.loggers_[name] = logger;
  return logger
};
goog.provide("goog.json");
goog.provide("goog.json.Serializer");
goog.json.isValid_ = function(s) {
  if(/^\s*$/.test(s)) {
    return false
  }
  var backslashesRe = /\\["\\\/bfnrtu]/g;
  var simpleValuesRe = /"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g;
  var remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""))
};
goog.json.parse = function(s) {
  var o = String(s);
  if(goog.json.isValid_(o)) {
    try {
      return eval("(" + o + ")")
    }catch(ex) {
    }
  }
  throw Error("Invalid JSON string: " + o);
};
goog.json.unsafeParse = function(s) {
  return eval("(" + s + ")")
};
goog.json.serialize = function(object) {
  return(new goog.json.Serializer).serialize(object)
};
goog.json.Serializer = function() {
};
goog.json.Serializer.prototype.serialize = function(object) {
  var sb = [];
  this.serialize_(object, sb);
  return sb.join("")
};
goog.json.Serializer.prototype.serialize_ = function(object, sb) {
  switch(typeof object) {
    case "string":
      this.serializeString_(object, sb);
      break;
    case "number":
      this.serializeNumber_(object, sb);
      break;
    case "boolean":
      sb.push(object);
      break;
    case "undefined":
      sb.push("null");
      break;
    case "object":
      if(object == null) {
        sb.push("null");
        break
      }
      if(goog.isArray(object)) {
        this.serializeArray_(object, sb);
        break
      }
      this.serializeObject_(object, sb);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof object);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    if(c in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[c]
    }
    var cc = c.charCodeAt(0);
    var rv = "\\u";
    if(cc < 16) {
      rv += "000"
    }else {
      if(cc < 256) {
        rv += "00"
      }else {
        if(cc < 4096) {
          rv += "0"
        }
      }
    }
    return goog.json.Serializer.charToJsonCharCache_[c] = rv + cc.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? n : "null")
};
goog.json.Serializer.prototype.serializeArray_ = function(arr, sb) {
  var l = arr.length;
  sb.push("[");
  var sep = "";
  for(var i = 0;i < l;i++) {
    sb.push(sep);
    this.serialize_(arr[i], sb);
    sep = ","
  }
  sb.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  var sep = "";
  for(var key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];
      if(typeof value != "function") {
        sb.push(sep);
        this.serializeString_(key, sb);
        sb.push(":");
        this.serialize_(value, sb);
        sep = ","
      }
    }
  }
  sb.push("}")
};
goog.provide("goog.net.ErrorCode");
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return"No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return"Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return"File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return"Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return"Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return"An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return"Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return"Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return"Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return"The resource is not available offline";
    default:
      return"Unrecognized error code"
  }
};
goog.provide("goog.net.EventType");
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress"};
goog.provide("goog.net.HttpStatus");
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505};
goog.provide("goog.net.XmlHttpFactory");
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;
goog.provide("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.net.WrapperXmlHttpFactory = function(xhrFactory, optionsFactory) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = xhrFactory;
  this.optionsFactory_ = optionsFactory
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_()
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_()
};
goog.provide("goog.net.DefaultXmlHttpFactory");
goog.provide("goog.net.XmlHttp");
goog.provide("goog.net.XmlHttp.OptionType");
goog.provide("goog.net.XmlHttp.ReadyState");
goog.require("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance()
};
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions()
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.factory_;
goog.net.XmlHttp.setFactory = function(factory, optionsFactory) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(factory, optionsFactory))
};
goog.net.XmlHttp.setGlobalFactory = function(factory) {
  goog.net.XmlHttp.factory_ = factory
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this)
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  var progId = this.getProgId_();
  if(progId) {
    return new ActiveXObject(progId)
  }else {
    return new XMLHttpRequest
  }
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  var progId = this.getProgId_();
  var options = {};
  if(progId) {
    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;
    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true
  }
  return options
};
goog.net.DefaultXmlHttpFactory.prototype.ieProgId_ = null;
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if(!this.ieProgId_ && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
    var ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    for(var i = 0;i < ACTIVE_X_IDENTS.length;i++) {
      var candidate = ACTIVE_X_IDENTS[i];
      try {
        new ActiveXObject(candidate);
        this.ieProgId_ = candidate;
        return candidate
      }catch(e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled," + " or MSXML might not be installed");
  }
  return this.ieProgId_
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.provide("goog.net.xhrMonitor");
goog.require("goog.array");
goog.require("goog.debug.Logger");
goog.require("goog.userAgent");
goog.net.XhrMonitor_ = function() {
  if(!goog.userAgent.GECKO) {
    return
  }
  this.contextsToXhr_ = {};
  this.xhrToContexts_ = {};
  this.stack_ = []
};
goog.net.XhrMonitor_.getKey = function(obj) {
  return goog.isString(obj) ? obj : goog.isObject(obj) ? goog.getUid(obj) : ""
};
goog.net.XhrMonitor_.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.xhrMonitor");
goog.net.XhrMonitor_.prototype.enabled_ = goog.userAgent.GECKO;
goog.net.XhrMonitor_.prototype.setEnabled = function(val) {
  this.enabled_ = goog.userAgent.GECKO && val
};
goog.net.XhrMonitor_.prototype.pushContext = function(context) {
  if(!this.enabled_) {
    return
  }
  var key = goog.net.XhrMonitor_.getKey(context);
  this.logger_.finest("Pushing context: " + context + " (" + key + ")");
  this.stack_.push(key)
};
goog.net.XhrMonitor_.prototype.popContext = function() {
  if(!this.enabled_) {
    return
  }
  var context = this.stack_.pop();
  this.logger_.finest("Popping context: " + context);
  this.updateDependentContexts_(context)
};
goog.net.XhrMonitor_.prototype.isContextSafe = function(context) {
  if(!this.enabled_) {
    return true
  }
  var deps = this.contextsToXhr_[goog.net.XhrMonitor_.getKey(context)];
  this.logger_.fine("Context is safe : " + context + " - " + deps);
  return!deps
};
goog.net.XhrMonitor_.prototype.markXhrOpen = function(xhr) {
  if(!this.enabled_) {
    return
  }
  var uid = goog.getUid(xhr);
  this.logger_.fine("Opening XHR : " + uid);
  for(var i = 0;i < this.stack_.length;i++) {
    var context = this.stack_[i];
    this.addToMap_(this.contextsToXhr_, context, uid);
    this.addToMap_(this.xhrToContexts_, uid, context)
  }
};
goog.net.XhrMonitor_.prototype.markXhrClosed = function(xhr) {
  if(!this.enabled_) {
    return
  }
  var uid = goog.getUid(xhr);
  this.logger_.fine("Closing XHR : " + uid);
  delete this.xhrToContexts_[uid];
  for(var context in this.contextsToXhr_) {
    goog.array.remove(this.contextsToXhr_[context], uid);
    if(this.contextsToXhr_[context].length == 0) {
      delete this.contextsToXhr_[context]
    }
  }
};
goog.net.XhrMonitor_.prototype.updateDependentContexts_ = function(xhrUid) {
  var contexts = this.xhrToContexts_[xhrUid];
  var xhrs = this.contextsToXhr_[xhrUid];
  if(contexts && xhrs) {
    this.logger_.finest("Updating dependent contexts");
    goog.array.forEach(contexts, function(context) {
      goog.array.forEach(xhrs, function(xhr) {
        this.addToMap_(this.contextsToXhr_, context, xhr);
        this.addToMap_(this.xhrToContexts_, xhr, context)
      }, this)
    }, this)
  }
};
goog.net.XhrMonitor_.prototype.addToMap_ = function(map, key, value) {
  if(!map[key]) {
    map[key] = []
  }
  if(!goog.array.contains(map[key], value)) {
    map[key].push(value)
  }
};
goog.net.xhrMonitor = new goog.net.XhrMonitor_;
goog.provide("goog.uri.utils");
goog.provide("goog.uri.utils.ComponentIndex");
goog.require("goog.asserts");
goog.require("goog.string");
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = [];
  if(opt_scheme) {
    out.push(opt_scheme, ":")
  }
  if(opt_domain) {
    out.push("//");
    if(opt_userInfo) {
      out.push(opt_userInfo, "@")
    }
    out.push(opt_domain);
    if(opt_port) {
      out.push(":", opt_port)
    }
  }
  if(opt_path) {
    out.push(opt_path)
  }
  if(opt_queryData) {
    out.push("?", opt_queryData)
  }
  if(opt_fragment) {
    out.push("#", opt_fragment)
  }
  return out.join("")
};
goog.uri.utils.splitRe_ = new RegExp("^" + "(?:" + "([^:/?#.]+)" + ":)?" + "(?://" + "(?:([^/?#]*)@)?" + "([\\w\\d\\-\\u0100-\\uffff.%]*)" + "(?::([0-9]+))?" + ")?" + "([^?#]+)?" + "(?:\\?([^#]*))?" + "(?:#(.*))?" + "$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(uri) {
  return uri.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(uri) {
  return uri && decodeURIComponent(uri)
};
goog.uri.utils.getComponentByIndex_ = function(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null
};
goog.uri.utils.getScheme = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri)
};
goog.uri.utils.getUserInfoEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri)
};
goog.uri.utils.getUserInfo = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri))
};
goog.uri.utils.getDomainEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri)
};
goog.uri.utils.getDomain = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri))
};
goog.uri.utils.getPort = function(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null
};
goog.uri.utils.getPathEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri)
};
goog.uri.utils.getPath = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri))
};
goog.uri.utils.getQueryData = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri)
};
goog.uri.utils.getFragmentEncoded = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? null : uri.substr(hashIndex + 1)
};
goog.uri.utils.setFragmentEncoded = function(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "")
};
goog.uri.utils.getFragment = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri))
};
goog.uri.utils.getHost = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? uri : uri.substr(0, hashIndex)
};
goog.uri.utils.haveSameDomain = function(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1);
  var pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(uri) {
  if(goog.DEBUG && (uri.indexOf("#") >= 0 || uri.indexOf("?") >= 0)) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not " + "supported: [" + uri + "]");
  }
};
goog.uri.utils.QueryValue;
goog.uri.utils.QueryArray;
goog.uri.utils.appendQueryData_ = function(buffer) {
  if(buffer[1]) {
    var baseUri = buffer[0];
    var hashIndex = baseUri.indexOf("#");
    if(hashIndex >= 0) {
      buffer.push(baseUri.substr(hashIndex));
      buffer[0] = baseUri = baseUri.substr(0, hashIndex)
    }
    var questionIndex = baseUri.indexOf("?");
    if(questionIndex < 0) {
      buffer[1] = "?"
    }else {
      if(questionIndex == baseUri.length - 1) {
        buffer[1] = undefined
      }
    }
  }
  return buffer.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(key, value, pairs) {
  if(goog.isArray(value)) {
    value = value;
    for(var j = 0;j < value.length;j++) {
      pairs.push("&", key);
      if(value[j] !== "") {
        pairs.push("=", goog.string.urlEncode(value[j]))
      }
    }
  }else {
    if(value != null) {
      pairs.push("&", key);
      if(value !== "") {
        pairs.push("=", goog.string.urlEncode(value))
      }
    }
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(buffer, keysAndValues, opt_startIndex) {
  goog.asserts.assert(Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
  for(var i = opt_startIndex || 0;i < keysAndValues.length;i += 2) {
    goog.uri.utils.appendKeyValuePairs_(keysAndValues[i], keysAndValues[i + 1], buffer)
  }
  return buffer
};
goog.uri.utils.buildQueryData = function(keysAndValues, opt_startIndex) {
  var buffer = goog.uri.utils.buildQueryDataBuffer_([], keysAndValues, opt_startIndex);
  buffer[0] = "";
  return buffer.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(buffer, map) {
  for(var key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], buffer)
  }
  return buffer
};
goog.uri.utils.buildQueryDataFromMap = function(map) {
  var buffer = goog.uri.utils.buildQueryDataBufferFromMap_([], map);
  buffer[0] = "";
  return buffer.join("")
};
goog.uri.utils.appendParams = function(uri, var_args) {
  return goog.uri.utils.appendQueryData_(arguments.length == 2 ? goog.uri.utils.buildQueryDataBuffer_([uri], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([uri], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(uri, map) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([uri], map))
};
goog.uri.utils.appendParam = function(uri, key, value) {
  return goog.uri.utils.appendQueryData_([uri, "&", key, "=", goog.string.urlEncode(value)])
};
goog.uri.utils.findParam_ = function(uri, startIndex, keyEncoded, hashOrEndIndex) {
  var index = startIndex;
  var keyLength = keyEncoded.length;
  while((index = uri.indexOf(keyEncoded, index)) >= 0 && index < hashOrEndIndex) {
    var precedingChar = uri.charCodeAt(index - 1);
    if(precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if(!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index
      }
    }
    index += keyLength + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(uri, keyEncoded) {
  return goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_)) >= 0
};
goog.uri.utils.getParamValue = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if(foundIndex < 0) {
    return null
  }else {
    var endPosition = uri.indexOf("&", foundIndex);
    if(endPosition < 0 || endPosition > hashOrEndIndex) {
      endPosition = hashOrEndIndex
    }
    foundIndex += keyEncoded.length + 1;
    return goog.string.urlDecode(uri.substr(foundIndex, endPosition - foundIndex))
  }
};
goog.uri.utils.getParamValues = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var result = [];
  while((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    position = uri.indexOf("&", foundIndex);
    if(position < 0 || position > hashOrEndIndex) {
      position = hashOrEndIndex
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.substr(foundIndex, position - foundIndex)))
  }
  return result
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var buffer = [];
  while((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    buffer.push(uri.substring(position, foundIndex));
    position = Math.min(uri.indexOf("&", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex)
  }
  buffer.push(uri.substr(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value)
};
goog.uri.utils.appendPath = function(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  if(goog.string.endsWith(baseUri, "/")) {
    baseUri = baseUri.substr(0, baseUri.length - 1)
  }
  if(goog.string.startsWith(path, "/")) {
    path = path.substr(1)
  }
  return goog.string.buildString(baseUri, "/", path)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.provide("goog.net.XhrIo");
goog.provide("goog.net.XhrIo.ResponseType");
goog.require("goog.Timer");
goog.require("goog.debug.Logger");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.debug.errorHandlerWeakDep");
goog.require("goog.events.EventTarget");
goog.require("goog.json");
goog.require("goog.net.ErrorCode");
goog.require("goog.net.EventType");
goog.require("goog.net.HttpStatus");
goog.require("goog.net.XmlHttp");
goog.require("goog.net.xhrMonitor");
goog.require("goog.object");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.require("goog.uri.utils");
goog.net.XhrIo = function(opt_xmlHttpFactory) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = opt_xmlHttpFactory || null
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?:?$/i;
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval) {
  var x = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(x);
  if(opt_callback) {
    goog.events.listen(x, goog.net.EventType.COMPLETE, opt_callback)
  }
  goog.events.listen(x, goog.net.EventType.READY, goog.partial(goog.net.XhrIo.cleanupSend_, x));
  if(opt_timeoutInterval) {
    x.setTimeoutInterval(opt_timeoutInterval)
  }
  x.send(url, opt_method, opt_content, opt_headers)
};
goog.net.XhrIo.cleanup = function() {
  var instances = goog.net.XhrIo.sendInstances_;
  while(instances.length) {
    instances.pop().dispose()
  }
};
goog.net.XhrIo.protectEntryPoints = function(errorHandler) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
};
goog.net.XhrIo.cleanupSend_ = function(XhrIo) {
  XhrIo.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, XhrIo)
};
goog.net.XhrIo.prototype.active_ = false;
goog.net.XhrIo.prototype.xhr_ = null;
goog.net.XhrIo.prototype.xhrOptions_ = null;
goog.net.XhrIo.prototype.lastUri_ = "";
goog.net.XhrIo.prototype.lastMethod_ = "";
goog.net.XhrIo.prototype.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
goog.net.XhrIo.prototype.lastError_ = "";
goog.net.XhrIo.prototype.errorDispatched_ = false;
goog.net.XhrIo.prototype.inSend_ = false;
goog.net.XhrIo.prototype.inOpen_ = false;
goog.net.XhrIo.prototype.inAbort_ = false;
goog.net.XhrIo.prototype.timeoutInterval_ = 0;
goog.net.XhrIo.prototype.timeoutId_ = null;
goog.net.XhrIo.prototype.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
goog.net.XhrIo.prototype.withCredentials_ = false;
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms)
};
goog.net.XhrIo.prototype.setResponseType = function(type) {
  this.responseType_ = type
};
goog.net.XhrIo.prototype.getResponseType = function() {
  return this.responseType_
};
goog.net.XhrIo.prototype.setWithCredentials = function(withCredentials) {
  this.withCredentials_ = withCredentials
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
  return this.withCredentials_
};
goog.net.XhrIo.prototype.send = function(url, opt_method, opt_content, opt_headers) {
  if(this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request");
  }
  var method = opt_method || "GET";
  this.lastUri_ = url;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = method;
  this.errorDispatched_ = false;
  this.active_ = true;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  goog.net.xhrMonitor.markXhrOpen(this.xhr_);
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    this.logger_.fine(this.formatMsg_("Opening Xhr"));
    this.inOpen_ = true;
    this.xhr_.open(method, url, true);
    this.inOpen_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Error opening Xhr: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err);
    return
  }
  var content = opt_content || "";
  var headers = this.headers.clone();
  if(opt_headers) {
    goog.structs.forEach(opt_headers, function(value, key) {
      headers.set(key, value)
    })
  }
  if(method == "POST" && !headers.containsKey(goog.net.XhrIo.CONTENT_TYPE_HEADER)) {
    headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE)
  }
  goog.structs.forEach(headers, function(value, key) {
    this.xhr_.setRequestHeader(key, value)
  }, this);
  if(this.responseType_) {
    this.xhr_.responseType = this.responseType_
  }
  if(goog.object.containsKey(this.xhr_, "withCredentials")) {
    this.xhr_.withCredentials = this.withCredentials_
  }
  try {
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }
    if(this.timeoutInterval_ > 0) {
      this.logger_.fine(this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete"));
      this.timeoutId_ = goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.timeout_, this), this.timeoutInterval_)
    }
    this.logger_.fine(this.formatMsg_("Sending request"));
    this.inSend_ = true;
    this.xhr_.send(content);
    this.inSend_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Send error: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err)
  }
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : new goog.net.XmlHttp
};
goog.net.XhrIo.prototype.dispatchEvent = function(e) {
  if(this.xhr_) {
    goog.net.xhrMonitor.pushContext(this.xhr_);
    try {
      return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
    }finally {
      goog.net.xhrMonitor.popContext()
    }
  }else {
    return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
  }
};
goog.net.XhrIo.prototype.timeout_ = function() {
  if(typeof goog == "undefined") {
  }else {
    if(this.xhr_) {
      this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting";
      this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT;
      this.logger_.fine(this.formatMsg_(this.lastError_));
      this.dispatchEvent(goog.net.EventType.TIMEOUT);
      this.abort(goog.net.ErrorCode.TIMEOUT)
    }
  }
};
goog.net.XhrIo.prototype.error_ = function(errorCode, err) {
  this.active_ = false;
  if(this.xhr_) {
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false
  }
  this.lastError_ = err;
  this.lastErrorCode_ = errorCode;
  this.dispatchErrors_();
  this.cleanUpXhr_()
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  if(!this.errorDispatched_) {
    this.errorDispatched_ = true;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ERROR)
  }
};
goog.net.XhrIo.prototype.abort = function(opt_failureCode) {
  if(this.xhr_ && this.active_) {
    this.logger_.fine(this.formatMsg_("Aborting"));
    this.active_ = false;
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false;
    this.lastErrorCode_ = opt_failureCode || goog.net.ErrorCode.ABORT;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ABORT);
    this.cleanUpXhr_()
  }
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  if(this.xhr_) {
    if(this.active_) {
      this.active_ = false;
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false
    }
    this.cleanUpXhr_(true)
  }
  goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if(!this.inOpen_ && !this.inSend_ && !this.inAbort_) {
    this.onReadyStateChangeEntryPoint_()
  }else {
    this.onReadyStateChangeHelper_()
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_()
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if(!this.active_) {
    return
  }
  if(typeof goog == "undefined") {
  }else {
    if(this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && this.getStatus() == 2) {
      this.logger_.fine(this.formatMsg_("Local request error detected and ignored"))
    }else {
      if(this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.onReadyStateChange_, this), 0);
        return
      }
      this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE);
      if(this.isComplete()) {
        this.logger_.fine(this.formatMsg_("Request complete"));
        this.active_ = false;
        if(this.isSuccess()) {
          this.dispatchEvent(goog.net.EventType.COMPLETE);
          this.dispatchEvent(goog.net.EventType.SUCCESS)
        }else {
          this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR;
          this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]";
          this.dispatchErrors_()
        }
        this.cleanUpXhr_()
      }
    }
  }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(opt_fromDispose) {
  if(this.xhr_) {
    var xhr = this.xhr_;
    var clearedOnReadyStateChange = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhr_ = null;
    this.xhrOptions_ = null;
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }
    if(!opt_fromDispose) {
      goog.net.xhrMonitor.pushContext(xhr);
      this.dispatchEvent(goog.net.EventType.READY);
      goog.net.xhrMonitor.popContext()
    }
    goog.net.xhrMonitor.markXhrClosed(xhr);
    try {
      xhr.onreadystatechange = clearedOnReadyStateChange
    }catch(e) {
      this.logger_.severe("Problem encountered resetting onreadystatechange: " + e.message)
    }
  }
};
goog.net.XhrIo.prototype.isActive = function() {
  return!!this.xhr_
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
goog.net.XhrIo.prototype.isSuccess = function() {
  switch(this.getStatus()) {
    case 0:
      return!this.isLastUriEffectiveSchemeHttp_();
    case goog.net.HttpStatus.OK:
    ;
    case goog.net.HttpStatus.NO_CONTENT:
    ;
    case goog.net.HttpStatus.NOT_MODIFIED:
      return true;
    default:
      return false
  }
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var lastUriScheme = goog.isString(this.lastUri_) ? goog.uri.utils.getScheme(this.lastUri_) : this.lastUri_.getScheme();
  if(lastUriScheme) {
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(lastUriScheme)
  }
  if(self.location) {
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(self.location.protocol)
  }else {
    return true
  }
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
  }catch(e) {
    this.logger_.warning("Can not get status: " + e.message);
    return-1
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
  }catch(e) {
    this.logger_.fine("Can not get status: " + e.message);
    return""
  }
};
goog.net.XhrIo.prototype.getLastUri = function() {
  return String(this.lastUri_)
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : ""
  }catch(e) {
    this.logger_.fine("Can not get responseText: " + e.message);
    return""
  }
};
goog.net.XhrIo.prototype.getResponseXml = function() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null
  }catch(e) {
    this.logger_.fine("Can not get responseXML: " + e.message);
    return null
  }
};
goog.net.XhrIo.prototype.getResponseJson = function(opt_xssiPrefix) {
  if(!this.xhr_) {
    return undefined
  }
  var responseText = this.xhr_.responseText;
  if(opt_xssiPrefix && responseText.indexOf(opt_xssiPrefix) == 0) {
    responseText = responseText.substring(opt_xssiPrefix.length)
  }
  return goog.json.parse(responseText)
};
goog.net.XhrIo.prototype.getResponse = function() {
  try {
    return this.xhr_ && this.xhr_.response
  }catch(e) {
    this.logger_.fine("Can not get response: " + e.message);
    return null
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(key) {
  return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(key) : undefined
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_
};
goog.net.XhrIo.prototype.getLastError = function() {
  return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_)
};
goog.net.XhrIo.prototype.formatMsg_ = function(msg) {
  return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = transformer(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
goog.provide("goog.string.StringBuffer");
goog.require("goog.userAgent.jscript");
goog.string.StringBuffer = function(opt_a1, var_args) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  if(opt_a1 != null) {
    this.append.apply(this, arguments)
  }
};
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s)
};
if(goog.userAgent.jscript.HAS_JSCRIPT) {
  goog.string.StringBuffer.prototype.bufferLength_ = 0;
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    if(opt_a2 == null) {
      this.buffer_[this.bufferLength_++] = a1
    }else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length
    }
    return this
  }
}else {
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    this.buffer_ += a1;
    if(opt_a2 != null) {
      for(var i = 1;i < arguments.length;i++) {
        this.buffer_ += arguments[i]
      }
    }
    return this
  }
}
goog.string.StringBuffer.prototype.clear = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    this.buffer_.length = 0;
    this.bufferLength_ = 0
  }else {
    this.buffer_ = ""
  }
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join("");
    this.clear();
    if(str) {
      this.append(str)
    }
    return str
  }else {
    return this.buffer_
  }
};
goog.provide("goog.messaging.MessageChannel");
goog.messaging.MessageChannel = function() {
};
goog.messaging.MessageChannel.prototype.connect = function(opt_connectCb) {
};
goog.messaging.MessageChannel.prototype.isConnected = function() {
};
goog.messaging.MessageChannel.prototype.registerService = function(serviceName, callback, opt_objectPayload) {
};
goog.messaging.MessageChannel.prototype.registerDefaultService = function(callback) {
};
goog.messaging.MessageChannel.prototype.send = function(serviceName, payload) {
};
goog.provide("goog.net.xpc");
goog.provide("goog.net.xpc.CfgFields");
goog.provide("goog.net.xpc.ChannelStates");
goog.provide("goog.net.xpc.TransportNames");
goog.provide("goog.net.xpc.TransportTypes");
goog.provide("goog.net.xpc.UriCfgFields");
goog.require("goog.debug.Logger");
goog.net.xpc.TransportTypes = {NATIVE_MESSAGING:1, FRAME_ELEMENT_METHOD:2, IFRAME_RELAY:3, IFRAME_POLLING:4, FLASH:5, NIX:6};
goog.net.xpc.TransportNames = {1:"NativeMessagingTransport", 2:"FrameElementMethodTransport", 3:"IframeRelayTransport", 4:"IframePollingTransport", 5:"FlashTransport", 6:"NixTransport"};
goog.net.xpc.CfgFields = {CHANNEL_NAME:"cn", AUTH_TOKEN:"at", REMOTE_AUTH_TOKEN:"rat", PEER_URI:"pu", IFRAME_ID:"ifrid", TRANSPORT:"tp", LOCAL_RELAY_URI:"lru", PEER_RELAY_URI:"pru", LOCAL_POLL_URI:"lpu", PEER_POLL_URI:"ppu", PEER_HOSTNAME:"ph"};
goog.net.xpc.UriCfgFields = [goog.net.xpc.CfgFields.PEER_URI, goog.net.xpc.CfgFields.LOCAL_RELAY_URI, goog.net.xpc.CfgFields.PEER_RELAY_URI, goog.net.xpc.CfgFields.LOCAL_POLL_URI, goog.net.xpc.CfgFields.PEER_POLL_URI];
goog.net.xpc.ChannelStates = {NOT_CONNECTED:1, CONNECTED:2, CLOSED:3};
goog.net.xpc.TRANSPORT_SERVICE_ = "tp";
goog.net.xpc.SETUP = "SETUP";
goog.net.xpc.SETUP_ACK_ = "SETUP_ACK";
goog.net.xpc.channels_ = {};
goog.net.xpc.getRandomString = function(length, opt_characters) {
  var chars = opt_characters || goog.net.xpc.randomStringCharacters_;
  var charsLength = chars.length;
  var s = "";
  while(length-- > 0) {
    s += chars.charAt(Math.floor(Math.random() * charsLength))
  }
  return s
};
goog.net.xpc.randomStringCharacters_ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
goog.net.xpc.logger = goog.debug.Logger.getLogger("goog.net.xpc");
goog.provide("goog.Uri");
goog.provide("goog.Uri.QueryData");
goog.require("goog.array");
goog.require("goog.string");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.require("goog.uri.utils");
goog.require("goog.uri.utils.ComponentIndex");
goog.Uri = function(opt_uri, opt_ignoreCase) {
  var m;
  if(opt_uri instanceof goog.Uri) {
    this.setIgnoreCase(opt_ignoreCase == null ? opt_uri.getIgnoreCase() : opt_ignoreCase);
    this.setScheme(opt_uri.getScheme());
    this.setUserInfo(opt_uri.getUserInfo());
    this.setDomain(opt_uri.getDomain());
    this.setPort(opt_uri.getPort());
    this.setPath(opt_uri.getPath());
    this.setQueryData(opt_uri.getQueryData().clone());
    this.setFragment(opt_uri.getFragment())
  }else {
    if(opt_uri && (m = goog.uri.utils.split(String(opt_uri)))) {
      this.setIgnoreCase(!!opt_ignoreCase);
      this.setScheme(m[goog.uri.utils.ComponentIndex.SCHEME] || "", true);
      this.setUserInfo(m[goog.uri.utils.ComponentIndex.USER_INFO] || "", true);
      this.setDomain(m[goog.uri.utils.ComponentIndex.DOMAIN] || "", true);
      this.setPort(m[goog.uri.utils.ComponentIndex.PORT]);
      this.setPath(m[goog.uri.utils.ComponentIndex.PATH] || "", true);
      this.setQuery(m[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", true);
      this.setFragment(m[goog.uri.utils.ComponentIndex.FRAGMENT] || "", true)
    }else {
      this.setIgnoreCase(!!opt_ignoreCase);
      this.queryData_ = new goog.Uri.QueryData(null, this, this.ignoreCase_)
    }
  }
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.queryData_;
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = false;
goog.Uri.prototype.ignoreCase_ = false;
goog.Uri.prototype.toString = function() {
  if(this.cachedToString_) {
    return this.cachedToString_
  }
  var out = [];
  if(this.scheme_) {
    out.push(goog.Uri.encodeSpecialChars_(this.scheme_, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":")
  }
  if(this.domain_) {
    out.push("//");
    if(this.userInfo_) {
      out.push(goog.Uri.encodeSpecialChars_(this.userInfo_, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@")
    }
    out.push(goog.Uri.encodeString_(this.domain_));
    if(this.port_ != null) {
      out.push(":", String(this.getPort()))
    }
  }
  if(this.path_) {
    if(this.hasDomain() && this.path_.charAt(0) != "/") {
      out.push("/")
    }
    out.push(goog.Uri.encodeSpecialChars_(this.path_, goog.Uri.reDisallowedInPath_))
  }
  var query = String(this.queryData_);
  if(query) {
    out.push("?", query)
  }
  if(this.fragment_) {
    out.push("#", goog.Uri.encodeSpecialChars_(this.fragment_, goog.Uri.reDisallowedInFragment_))
  }
  return this.cachedToString_ = out.join("")
};
goog.Uri.prototype.resolve = function(relativeUri) {
  var absoluteUri = this.clone();
  var overridden = relativeUri.hasScheme();
  if(overridden) {
    absoluteUri.setScheme(relativeUri.getScheme())
  }else {
    overridden = relativeUri.hasUserInfo()
  }
  if(overridden) {
    absoluteUri.setUserInfo(relativeUri.getUserInfo())
  }else {
    overridden = relativeUri.hasDomain()
  }
  if(overridden) {
    absoluteUri.setDomain(relativeUri.getDomain())
  }else {
    overridden = relativeUri.hasPort()
  }
  var path = relativeUri.getPath();
  if(overridden) {
    absoluteUri.setPort(relativeUri.getPort())
  }else {
    overridden = relativeUri.hasPath();
    if(overridden) {
      if(path.charAt(0) != "/") {
        if(this.hasDomain() && !this.hasPath()) {
          path = "/" + path
        }else {
          var lastSlashIndex = absoluteUri.getPath().lastIndexOf("/");
          if(lastSlashIndex != -1) {
            path = absoluteUri.getPath().substr(0, lastSlashIndex + 1) + path
          }
        }
      }
      path = goog.Uri.removeDotSegments(path)
    }
  }
  if(overridden) {
    absoluteUri.setPath(path)
  }else {
    overridden = relativeUri.hasQuery()
  }
  if(overridden) {
    absoluteUri.setQuery(relativeUri.getDecodedQuery())
  }else {
    overridden = relativeUri.hasFragment()
  }
  if(overridden) {
    absoluteUri.setFragment(relativeUri.getFragment())
  }
  return absoluteUri
};
goog.Uri.prototype.clone = function() {
  return goog.Uri.create(this.scheme_, this.userInfo_, this.domain_, this.port_, this.path_, this.queryData_.clone(), this.fragment_, this.ignoreCase_)
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function(newScheme, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.scheme_ = opt_decode ? goog.Uri.decodeOrEmpty_(newScheme) : newScheme;
  if(this.scheme_) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(newUserInfo, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.userInfo_ = opt_decode ? goog.Uri.decodeOrEmpty_(newUserInfo) : newUserInfo;
  return this
};
goog.Uri.prototype.hasUserInfo = function() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function(newDomain, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.domain_ = opt_decode ? goog.Uri.decodeOrEmpty_(newDomain) : newDomain;
  return this
};
goog.Uri.prototype.hasDomain = function() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function() {
  return this.port_
};
goog.Uri.prototype.setPort = function(newPort) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(newPort) {
    newPort = Number(newPort);
    if(isNaN(newPort) || newPort < 0) {
      throw Error("Bad port number " + newPort);
    }
    this.port_ = newPort
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function() {
  return this.port_ != null
};
goog.Uri.prototype.getPath = function() {
  return this.path_
};
goog.Uri.prototype.setPath = function(newPath, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.path_ = opt_decode ? goog.Uri.decodeOrEmpty_(newPath) : newPath;
  return this
};
goog.Uri.prototype.hasPath = function() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function() {
  return this.queryData_.toString() !== ""
};
goog.Uri.prototype.setQueryData = function(queryData, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(queryData instanceof goog.Uri.QueryData) {
    this.queryData_ = queryData;
    this.queryData_.uri_ = this;
    this.queryData_.setIgnoreCase(this.ignoreCase_)
  }else {
    if(!opt_decode) {
      queryData = goog.Uri.encodeSpecialChars_(queryData, goog.Uri.reDisallowedInQuery_)
    }
    this.queryData_ = new goog.Uri.QueryData(queryData, this, this.ignoreCase_)
  }
  return this
};
goog.Uri.prototype.setQuery = function(newQuery, opt_decode) {
  return this.setQueryData(newQuery, opt_decode)
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(key, value) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.queryData_.set(key, value);
  return this
};
goog.Uri.prototype.setParameterValues = function(key, values) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(!goog.isArray(values)) {
    values = [String(values)]
  }
  this.queryData_.setValues(key, values);
  return this
};
goog.Uri.prototype.getParameterValues = function(name) {
  return this.queryData_.getValues(name)
};
goog.Uri.prototype.getParameterValue = function(paramName) {
  return this.queryData_.get(paramName)
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function(newFragment, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.fragment_ = opt_decode ? goog.Uri.decodeOrEmpty_(newFragment) : newFragment;
  return this
};
goog.Uri.prototype.hasFragment = function() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(uri2) {
  return(!this.hasDomain() && !uri2.hasDomain() || this.getDomain() == uri2.getDomain()) && (!this.hasPort() && !uri2.hasPort() || this.getPort() == uri2.getPort())
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function(key) {
  this.enforceReadOnly();
  this.queryData_.remove(key);
  return this
};
goog.Uri.prototype.setReadOnly = function(isReadOnly) {
  this.isReadOnly_ = isReadOnly;
  return this
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(ignoreCase) {
  this.ignoreCase_ = ignoreCase;
  if(this.queryData_) {
    this.queryData_.setIgnoreCase(ignoreCase)
  }
  return this
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_
};
goog.Uri.parse = function(uri, opt_ignoreCase) {
  return uri instanceof goog.Uri ? uri.clone() : new goog.Uri(uri, opt_ignoreCase)
};
goog.Uri.create = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_query, opt_fragment, opt_ignoreCase) {
  var uri = new goog.Uri(null, opt_ignoreCase);
  opt_scheme && uri.setScheme(opt_scheme);
  opt_userInfo && uri.setUserInfo(opt_userInfo);
  opt_domain && uri.setDomain(opt_domain);
  opt_port && uri.setPort(opt_port);
  opt_path && uri.setPath(opt_path);
  opt_query && uri.setQueryData(opt_query);
  opt_fragment && uri.setFragment(opt_fragment);
  return uri
};
goog.Uri.resolve = function(base, rel) {
  if(!(base instanceof goog.Uri)) {
    base = goog.Uri.parse(base)
  }
  if(!(rel instanceof goog.Uri)) {
    rel = goog.Uri.parse(rel)
  }
  return base.resolve(rel)
};
goog.Uri.removeDotSegments = function(path) {
  if(path == ".." || path == ".") {
    return""
  }else {
    if(!goog.string.contains(path, "./") && !goog.string.contains(path, "/.")) {
      return path
    }else {
      var leadingSlash = goog.string.startsWith(path, "/");
      var segments = path.split("/");
      var out = [];
      for(var pos = 0;pos < segments.length;) {
        var segment = segments[pos++];
        if(segment == ".") {
          if(leadingSlash && pos == segments.length) {
            out.push("")
          }
        }else {
          if(segment == "..") {
            if(out.length > 1 || out.length == 1 && out[0] != "") {
              out.pop()
            }
            if(leadingSlash && pos == segments.length) {
              out.push("")
            }
          }else {
            out.push(segment);
            leadingSlash = true
          }
        }
      }
      return out.join("/")
    }
  }
};
goog.Uri.decodeOrEmpty_ = function(val) {
  return val ? decodeURIComponent(val) : ""
};
goog.Uri.encodeString_ = function(unescapedPart) {
  if(goog.isString(unescapedPart)) {
    return encodeURIComponent(unescapedPart)
  }
  return null
};
goog.Uri.encodeSpecialRegExp_ = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
goog.Uri.encodeSpecialChars_ = function(unescapedPart, extra) {
  var ret = null;
  if(goog.isString(unescapedPart)) {
    ret = unescapedPart;
    if(!goog.Uri.encodeSpecialRegExp_.test(ret)) {
      ret = encodeURI(unescapedPart)
    }
    if(ret.search(extra) >= 0) {
      ret = ret.replace(extra, goog.Uri.encodeChar_)
    }
  }
  return ret
};
goog.Uri.encodeChar_ = function(ch) {
  var n = ch.charCodeAt(0);
  return"%" + (n >> 4 & 15).toString(16) + (n & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInPath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(uri1String, uri2String) {
  var pieces1 = goog.uri.utils.split(uri1String);
  var pieces2 = goog.uri.utils.split(uri2String);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(opt_query, opt_uri, opt_ignoreCase) {
  this.encodedQuery_ = opt_query || null;
  this.uri_ = opt_uri || null;
  this.ignoreCase_ = !!opt_ignoreCase
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if(!this.keyMap_) {
    this.keyMap_ = new goog.structs.Map;
    if(this.encodedQuery_) {
      var pairs = this.encodedQuery_.split("&");
      for(var i = 0;i < pairs.length;i++) {
        var indexOfEquals = pairs[i].indexOf("=");
        var name = null;
        var value = null;
        if(indexOfEquals >= 0) {
          name = pairs[i].substring(0, indexOfEquals);
          value = pairs[i].substring(indexOfEquals + 1)
        }else {
          name = pairs[i]
        }
        name = goog.string.urlDecode(name);
        name = this.getKeyName_(name);
        this.add(name, value ? goog.string.urlDecode(value) : "")
      }
    }
  }
};
goog.Uri.QueryData.createFromMap = function(map, opt_uri, opt_ignoreCase) {
  var keys = goog.structs.getKeys(map);
  if(typeof keys == "undefined") {
    throw Error("Keys are undefined");
  }
  return goog.Uri.QueryData.createFromKeysValues(keys, goog.structs.getValues(map), opt_uri, opt_ignoreCase)
};
goog.Uri.QueryData.createFromKeysValues = function(keys, values, opt_uri, opt_ignoreCase) {
  if(keys.length != values.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  var queryData = new goog.Uri.QueryData(null, opt_uri, opt_ignoreCase);
  for(var i = 0;i < keys.length;i++) {
    queryData.add(keys[i], values[i])
  }
  return queryData
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.decodedQuery_ = null;
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(!this.containsKey(key)) {
    this.keyMap_.set(key, value)
  }else {
    var current = this.keyMap_.get(key);
    if(goog.isArray(current)) {
      current.push(value)
    }else {
      this.keyMap_.set(key, [current, value])
    }
  }
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if(this.keyMap_.containsKey(key)) {
    this.invalidateCache_();
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
    return this.keyMap_.remove(key)
  }
  return false
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  if(this.keyMap_) {
    this.keyMap_.clear()
  }
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return this.count_ == 0
};
goog.Uri.QueryData.prototype.containsKey = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.containsKey(key)
};
goog.Uri.QueryData.prototype.containsValue = function(value) {
  var vals = this.getValues();
  return goog.array.contains(vals, value)
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  var vals = this.keyMap_.getValues();
  var keys = this.keyMap_.getKeys();
  var rv = [];
  for(var i = 0;i < keys.length;i++) {
    var val = vals[i];
    if(goog.isArray(val)) {
      for(var j = 0;j < val.length;j++) {
        rv.push(keys[i])
      }
    }else {
      rv.push(keys[i])
    }
  }
  return rv
};
goog.Uri.QueryData.prototype.getValues = function(opt_key) {
  this.ensureKeyMapInitialized_();
  var rv;
  if(opt_key) {
    var key = this.getKeyName_(opt_key);
    if(this.containsKey(key)) {
      var value = this.keyMap_.get(key);
      if(goog.isArray(value)) {
        return value
      }else {
        rv = [];
        rv.push(value)
      }
    }else {
      rv = []
    }
  }else {
    var vals = this.keyMap_.getValues();
    rv = [];
    for(var i = 0;i < vals.length;i++) {
      var val = vals[i];
      if(goog.isArray(val)) {
        goog.array.extend(rv, val)
      }else {
        rv.push(val)
      }
    }
  }
  return rv
};
goog.Uri.QueryData.prototype.set = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
  }
  this.keyMap_.set(key, value);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function(key, opt_default) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var val = this.keyMap_.get(key);
    if(goog.isArray(val)) {
      return val[0]
    }else {
      return val
    }
  }else {
    return opt_default
  }
};
goog.Uri.QueryData.prototype.setValues = function(key, values) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
  }
  if(values.length > 0) {
    this.keyMap_.set(key, values);
    this.count_ += values.length
  }
};
goog.Uri.QueryData.prototype.toString = function() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  var sb = [];
  var count = 0;
  var keys = this.keyMap_.getKeys();
  for(var i = 0;i < keys.length;i++) {
    var key = keys[i];
    var encodedKey = goog.string.urlEncode(key);
    var val = this.keyMap_.get(key);
    if(goog.isArray(val)) {
      for(var j = 0;j < val.length;j++) {
        if(count > 0) {
          sb.push("&")
        }
        sb.push(encodedKey);
        if(val[j] !== "") {
          sb.push("=", goog.string.urlEncode(val[j]))
        }
        count++
      }
    }else {
      if(count > 0) {
        sb.push("&")
      }
      sb.push(encodedKey);
      if(val !== "") {
        sb.push("=", goog.string.urlEncode(val))
      }
      count++
    }
  }
  return this.encodedQuery_ = sb.join("")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  if(!this.decodedQuery_) {
    this.decodedQuery_ = goog.Uri.decodeOrEmpty_(this.toString())
  }
  return this.decodedQuery_
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  delete this.decodedQuery_;
  delete this.encodedQuery_;
  if(this.uri_) {
    delete this.uri_.cachedToString_
  }
};
goog.Uri.QueryData.prototype.filterKeys = function(keys) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function(value, key, map) {
    if(!goog.array.contains(keys, key)) {
      this.remove(key)
    }
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function() {
  var rv = new goog.Uri.QueryData;
  if(this.decodedQuery_) {
    rv.decodedQuery_ = this.decodedQuery_
  }
  if(this.encodedQuery_) {
    rv.encodedQuery_ = this.encodedQuery_
  }
  if(this.keyMap_) {
    rv.keyMap_ = this.keyMap_.clone()
  }
  return rv
};
goog.Uri.QueryData.prototype.getKeyName_ = function(arg) {
  var keyName = String(arg);
  if(this.ignoreCase_) {
    keyName = keyName.toLowerCase()
  }
  return keyName
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(ignoreCase) {
  var resetKeys = ignoreCase && !this.ignoreCase_;
  if(resetKeys) {
    this.ensureKeyMapInitialized_();
    this.invalidateCache_();
    goog.structs.forEach(this.keyMap_, function(value, key, map) {
      var lowerCase = key.toLowerCase();
      if(key != lowerCase) {
        this.remove(key);
        this.add(lowerCase, value)
      }
    }, this)
  }
  this.ignoreCase_ = ignoreCase
};
goog.Uri.QueryData.prototype.extend = function(var_args) {
  for(var i = 0;i < arguments.length;i++) {
    var data = arguments[i];
    goog.structs.forEach(data, function(value, key) {
      this.add(key, value)
    }, this)
  }
};
goog.provide("goog.net.xpc.Transport");
goog.require("goog.Disposable");
goog.require("goog.net.xpc");
goog.net.xpc.Transport = function(opt_domHelper) {
  goog.Disposable.call(this);
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper()
};
goog.inherits(goog.net.xpc.Transport, goog.Disposable);
goog.net.xpc.Transport.prototype.transportType = 0;
goog.net.xpc.Transport.prototype.getType = function() {
  return this.transportType
};
goog.net.xpc.Transport.prototype.getWindow = function() {
  return this.domHelper_.getWindow()
};
goog.net.xpc.Transport.prototype.getName = function() {
  return goog.net.xpc.TransportNames[this.transportType] || ""
};
goog.net.xpc.Transport.prototype.transportServiceHandler = goog.abstractMethod;
goog.net.xpc.Transport.prototype.connect = goog.abstractMethod;
goog.net.xpc.Transport.prototype.send = goog.abstractMethod;
goog.provide("goog.net.xpc.FrameElementMethodTransport");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.FrameElementMethodTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.queue_ = [];
  this.deliverQueuedCb_ = goog.bind(this.deliverQueued_, this)
};
goog.inherits(goog.net.xpc.FrameElementMethodTransport, goog.net.xpc.Transport);
goog.net.xpc.FrameElementMethodTransport.prototype.transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD;
goog.net.xpc.FrameElementMethodTransport.prototype.recursive_ = false;
goog.net.xpc.FrameElementMethodTransport.prototype.timer_ = 0;
goog.net.xpc.FrameElementMethodTransport.outgoing_ = null;
goog.net.xpc.FrameElementMethodTransport.prototype.connect = function() {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER) {
    this.iframeElm_ = this.channel_.iframeElement_;
    this.iframeElm_["XPC_toOuter"] = goog.bind(this.incoming_, this)
  }else {
    this.attemptSetup_()
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.attemptSetup_ = function() {
  var retry = true;
  try {
    if(!this.iframeElm_) {
      this.iframeElm_ = this.getWindow().frameElement
    }
    if(this.iframeElm_ && this.iframeElm_["XPC_toOuter"]) {
      this.outgoing_ = this.iframeElm_["XPC_toOuter"];
      this.iframeElm_["XPC_toOuter"]["XPC_toInner"] = goog.bind(this.incoming_, this);
      retry = false;
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      this.channel_.notifyConnected_()
    }
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e)
  }
  if(retry) {
    if(!this.attemptSetupCb_) {
      this.attemptSetupCb_ = goog.bind(this.attemptSetup_, this)
    }
    this.getWindow().setTimeout(this.attemptSetupCb_, 100)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.transportServiceHandler = function(payload) {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER && !this.channel_.isConnected() && payload == goog.net.xpc.SETUP_ACK_) {
    this.outgoing_ = this.iframeElm_["XPC_toOuter"]["XPC_toInner"];
    this.channel_.notifyConnected_()
  }else {
    throw Error("Got unexpected transport message.");
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.incoming_ = function(serviceName, payload) {
  if(!this.recursive_ && this.queue_.length == 0) {
    this.channel_.deliver_(serviceName, payload)
  }else {
    this.queue_.push({serviceName:serviceName, payload:payload});
    if(this.queue_.length == 1) {
      this.timer_ = this.getWindow().setTimeout(this.deliverQueuedCb_, 1)
    }
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.deliverQueued_ = function() {
  while(this.queue_.length) {
    var msg = this.queue_.shift();
    this.channel_.deliver_(msg.serviceName, msg.payload)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.send = function(service, payload) {
  this.recursive_ = true;
  this.outgoing_(service, payload);
  this.recursive_ = false
};
goog.net.xpc.FrameElementMethodTransport.prototype.disposeInternal = function() {
  goog.net.xpc.FrameElementMethodTransport.superClass_.disposeInternal.call(this);
  this.outgoing_ = null;
  this.iframeElm_ = null
};
goog.provide("goog.net.xpc.NixTransport");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.NixTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.authToken_ = channel[goog.net.xpc.CfgFields.AUTH_TOKEN] || "";
  this.remoteAuthToken_ = channel[goog.net.xpc.CfgFields.REMOTE_AUTH_TOKEN] || "";
  goog.net.xpc.NixTransport.conductGlobalSetup_(this.getWindow());
  this[goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE] = this.handleMessage_;
  this[goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL] = this.createChannel_
};
goog.inherits(goog.net.xpc.NixTransport, goog.net.xpc.Transport);
goog.net.xpc.NixTransport.NIX_WRAPPER = "GCXPC____NIXVBS_wrapper";
goog.net.xpc.NixTransport.NIX_GET_WRAPPER = "GCXPC____NIXVBS_get_wrapper";
goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE = "GCXPC____NIXJS_handle_message";
goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL = "GCXPC____NIXJS_create_channel";
goog.net.xpc.NixTransport.NIX_ID_FIELD = "GCXPC____NIXVBS_container";
goog.net.xpc.NixTransport.conductGlobalSetup_ = function(listenWindow) {
  if(listenWindow["nix_setup_complete"]) {
    return
  }
  var vbscript = "Class " + goog.net.xpc.NixTransport.NIX_WRAPPER + "\n " + "Private m_Transport\n" + "Private m_Auth\n" + "Public Sub SetTransport(transport)\n" + "If isEmpty(m_Transport) Then\n" + "Set m_Transport = transport\n" + "End If\n" + "End Sub\n" + "Public Sub SetAuth(auth)\n" + "If isEmpty(m_Auth) Then\n" + "m_Auth = auth\n" + "End If\n" + "End Sub\n" + "Public Function GetAuthToken()\n " + "GetAuthToken = m_Auth\n" + "End Function\n" + "Public Sub SendMessage(service, payload)\n " + 
  "Call m_Transport." + goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE + "(service, payload)\n" + "End Sub\n" + "Public Sub CreateChannel(channel)\n " + "Call m_Transport." + goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL + "(channel)\n" + "End Sub\n" + "Public Sub " + goog.net.xpc.NixTransport.NIX_ID_FIELD + "()\n " + "End Sub\n" + "End Class\n " + "Function " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + "(transport, auth)\n" + "Dim wrap\n" + "Set wrap = New " + goog.net.xpc.NixTransport.NIX_WRAPPER + 
  "\n" + "wrap.SetTransport transport\n" + "wrap.SetAuth auth\n" + "Set " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + " = wrap\n" + "End Function";
  try {
    listenWindow.execScript(vbscript, "vbscript");
    listenWindow["nix_setup_complete"] = true
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting global setup: " + e)
  }
};
goog.net.xpc.NixTransport.prototype.transportType = goog.net.xpc.TransportTypes.NIX;
goog.net.xpc.NixTransport.prototype.localSetupCompleted_ = false;
goog.net.xpc.NixTransport.prototype.nixChannel_ = null;
goog.net.xpc.NixTransport.prototype.connect = function() {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER) {
    this.attemptOuterSetup_()
  }else {
    this.attemptInnerSetup_()
  }
};
goog.net.xpc.NixTransport.prototype.attemptOuterSetup_ = function() {
  if(this.localSetupCompleted_) {
    return
  }
  var innerFrame = this.channel_.iframeElement_;
  try {
    innerFrame.contentWindow.opener = this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_);
    this.localSetupCompleted_ = true
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e)
  }
  if(!this.localSetupCompleted_) {
    this.getWindow().setTimeout(goog.bind(this.attemptOuterSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.attemptInnerSetup_ = function() {
  if(this.localSetupCompleted_) {
    return
  }
  try {
    var opener = this.getWindow().opener;
    if(opener && goog.net.xpc.NixTransport.NIX_ID_FIELD in opener) {
      this.nixChannel_ = opener;
      var remoteAuthToken = this.nixChannel_["GetAuthToken"]();
      if(remoteAuthToken != this.remoteAuthToken_) {
        goog.net.xpc.logger.severe("Invalid auth token from other party");
        return
      }
      this.nixChannel_["CreateChannel"](this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_));
      this.localSetupCompleted_ = true;
      this.channel_.notifyConnected_()
    }
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e);
    return
  }
  if(!this.localSetupCompleted_) {
    this.getWindow().setTimeout(goog.bind(this.attemptInnerSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.createChannel_ = function(channel) {
  if(typeof channel != "unknown" || !(goog.net.xpc.NixTransport.NIX_ID_FIELD in channel)) {
    goog.net.xpc.logger.severe("Invalid NIX channel given to createChannel_")
  }
  this.nixChannel_ = channel;
  var remoteAuthToken = this.nixChannel_["GetAuthToken"]();
  if(remoteAuthToken != this.remoteAuthToken_) {
    goog.net.xpc.logger.severe("Invalid auth token from other party");
    return
  }
  this.channel_.notifyConnected_()
};
goog.net.xpc.NixTransport.prototype.handleMessage_ = function(serviceName, payload) {
  function deliveryHandler() {
    this.channel_.deliver_(serviceName, payload)
  }
  this.getWindow().setTimeout(goog.bind(deliveryHandler, this), 1)
};
goog.net.xpc.NixTransport.prototype.send = function(service, payload) {
  if(typeof this.nixChannel_ !== "unknown") {
    goog.net.xpc.logger.severe("NIX channel not connected")
  }
  this.nixChannel_["SendMessage"](service, payload)
};
goog.net.xpc.NixTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  this.nixChannel_ = null
};
goog.provide("goog.math.Coordinate");
goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
if(goog.DEBUG) {
  goog.math.Coordinate.prototype.toString = function() {
    return"(" + this.x + ", " + this.y + ")"
  }
}
goog.math.Coordinate.equals = function(a, b) {
  if(a == b) {
    return true
  }
  if(!a || !b) {
    return false
  }
  return a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return dx * dx + dy * dy
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.provide("goog.dom.BrowserFeature");
goog.require("goog.userAgent");
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isVersion("9"), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isVersion("9") || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.provide("goog.dom.TagName");
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", 
H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};
goog.provide("goog.dom.classes");
goog.require("goog.array");
goog.dom.classes.set = function(element, className) {
  element.className = className
};
goog.dom.classes.get = function(element) {
  var className = element.className;
  return className && typeof className.split == "function" ? className.split(/\s+/) : []
};
goog.dom.classes.add = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var b = goog.dom.classes.add_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.remove = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var b = goog.dom.classes.remove_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.add_ = function(classes, args) {
  var rv = 0;
  for(var i = 0;i < args.length;i++) {
    if(!goog.array.contains(classes, args[i])) {
      classes.push(args[i]);
      rv++
    }
  }
  return rv == args.length
};
goog.dom.classes.remove_ = function(classes, args) {
  var rv = 0;
  for(var i = 0;i < classes.length;i++) {
    if(goog.array.contains(args, classes[i])) {
      goog.array.splice(classes, i--, 1);
      rv++
    }
  }
  return rv == args.length
};
goog.dom.classes.swap = function(element, fromClass, toClass) {
  var classes = goog.dom.classes.get(element);
  var removed = false;
  for(var i = 0;i < classes.length;i++) {
    if(classes[i] == fromClass) {
      goog.array.splice(classes, i--, 1);
      removed = true
    }
  }
  if(removed) {
    classes.push(toClass);
    element.className = classes.join(" ")
  }
  return removed
};
goog.dom.classes.addRemove = function(element, classesToRemove, classesToAdd) {
  var classes = goog.dom.classes.get(element);
  if(goog.isString(classesToRemove)) {
    goog.array.remove(classes, classesToRemove)
  }else {
    if(goog.isArray(classesToRemove)) {
      goog.dom.classes.remove_(classes, classesToRemove)
    }
  }
  if(goog.isString(classesToAdd) && !goog.array.contains(classes, classesToAdd)) {
    classes.push(classesToAdd)
  }else {
    if(goog.isArray(classesToAdd)) {
      goog.dom.classes.add_(classes, classesToAdd)
    }
  }
  element.className = classes.join(" ")
};
goog.dom.classes.has = function(element, className) {
  return goog.array.contains(goog.dom.classes.get(element), className)
};
goog.dom.classes.enable = function(element, className, enabled) {
  if(enabled) {
    goog.dom.classes.add(element, className)
  }else {
    goog.dom.classes.remove(element, className)
  }
};
goog.dom.classes.toggle = function(element, className) {
  var add = !goog.dom.classes.has(element, className);
  goog.dom.classes.enable(element, className, add);
  return add
};
goog.provide("goog.math.Size");
goog.math.Size = function(width, height) {
  this.width = width;
  this.height = height
};
goog.math.Size.equals = function(a, b) {
  if(a == b) {
    return true
  }
  if(!a || !b) {
    return false
  }
  return a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
if(goog.DEBUG) {
  goog.math.Size.prototype.toString = function() {
    return"(" + this.width + " x " + this.height + ")"
  }
}
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
  return(this.width + this.height) * 2
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function(target) {
  return this.width <= target.width && this.height <= target.height
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function(s) {
  this.width *= s;
  this.height *= s;
  return this
};
goog.math.Size.prototype.scaleToFit = function(target) {
  var s = this.aspectRatio() > target.aspectRatio() ? target.width / this.width : target.height / this.height;
  return this.scale(s)
};
goog.provide("goog.dom");
goog.provide("goog.dom.DomHelper");
goog.provide("goog.dom.NodeType");
goog.require("goog.array");
goog.require("goog.dom.BrowserFeature");
goog.require("goog.dom.TagName");
goog.require("goog.dom.classes");
goog.require("goog.math.Coordinate");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.string");
goog.require("goog.userAgent");
goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.defaultDomHelper_;
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(element) {
  return goog.isString(element) ? document.getElementById(element) : element
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el)
};
goog.dom.getElementsByClass = function(className, opt_el) {
  var parent = opt_el || document;
  if(goog.dom.canUseQuerySelector_(parent)) {
    return parent.querySelectorAll("." + className)
  }else {
    if(parent.getElementsByClassName) {
      return parent.getElementsByClassName(className)
    }
  }
  return goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el)
};
goog.dom.getElementByClass = function(className, opt_el) {
  var parent = opt_el || document;
  var retVal = null;
  if(goog.dom.canUseQuerySelector_(parent)) {
    retVal = parent.querySelector("." + className)
  }else {
    retVal = goog.dom.getElementsByClass(className, opt_el)[0]
  }
  return retVal || null
};
goog.dom.canUseQuerySelector_ = function(parent) {
  return parent.querySelectorAll && parent.querySelector && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(document) || goog.userAgent.isVersion("528"))
};
goog.dom.getElementsByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc;
  var tagName = opt_tag && opt_tag != "*" ? opt_tag.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_(parent) && (tagName || opt_class)) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query)
  }
  if(opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if(tagName) {
      var arrayLike = {};
      var len = 0;
      for(var i = 0, el;el = els[i];i++) {
        if(tagName == el.nodeName) {
          arrayLike[len++] = el
        }
      }
      arrayLike.length = len;
      return arrayLike
    }else {
      return els
    }
  }
  var els = parent.getElementsByTagName(tagName || "*");
  if(opt_class) {
    var arrayLike = {};
    var len = 0;
    for(var i = 0, el;el = els[i];i++) {
      var className = el.className;
      if(typeof className.split == "function" && goog.array.contains(className.split(/\s+/), opt_class)) {
        arrayLike[len++] = el
      }
    }
    arrayLike.length = len;
    return arrayLike
  }else {
    return els
  }
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    if(key == "style") {
      element.style.cssText = val
    }else {
      if(key == "class") {
        element.className = val
      }else {
        if(key == "for") {
          element.htmlFor = val
        }else {
          if(key in goog.dom.DIRECT_ATTRIBUTE_MAP_) {
            element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val)
          }else {
            element[key] = val
          }
        }
      }
    }
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {"cellpadding":"cellPadding", "cellspacing":"cellSpacing", "colspan":"colSpan", "rowspan":"rowSpan", "valign":"vAlign", "height":"height", "width":"width", "usemap":"useMap", "frameborder":"frameBorder", "maxlength":"maxLength", "type":"type"};
goog.dom.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window)
};
goog.dom.getViewportSize_ = function(win) {
  var doc = win.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    if(typeof win.innerHeight == "undefined") {
      win = window
    }
    var innerHeight = win.innerHeight;
    var scrollHeight = win.document.documentElement.scrollHeight;
    if(win == win.top) {
      if(scrollHeight < innerHeight) {
        innerHeight -= 15
      }
    }
    return new goog.math.Size(win.innerWidth, innerHeight)
  }
  var el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(win) {
  var doc = win.document;
  var height = 0;
  if(doc) {
    var vh = goog.dom.getViewportSize_(win).height;
    var body = doc.body;
    var docEl = doc.documentElement;
    if(goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight
    }else {
      var sh = docEl.scrollHeight;
      var oh = docEl.offsetHeight;
      if(docEl.clientHeight != oh) {
        sh = body.scrollHeight;
        oh = body.offsetHeight
      }
      if(sh > vh) {
        height = sh > oh ? sh : oh
      }else {
        height = sh < oh ? sh : oh
      }
    }
  }
  return height
};
goog.dom.getPageScroll = function(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc);
  var win = goog.dom.getWindow_(doc);
  return new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(doc) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body
};
goog.dom.getWindow = function(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window
};
goog.dom.getWindow_ = function(doc) {
  return doc.parentWindow || doc.defaultView
};
goog.dom.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(doc, args) {
  var tagName = args[0];
  var attributes = args[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && attributes && (attributes.name || attributes.type)) {
    var tagNameArr = ["<", tagName];
    if(attributes.name) {
      tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"')
    }
    if(attributes.type) {
      tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
      var clone = {};
      goog.object.extend(clone, attributes);
      attributes = clone;
      delete attributes.type
    }
    tagNameArr.push(">");
    tagName = tagNameArr.join("")
  }
  var element = doc.createElement(tagName);
  if(attributes) {
    if(goog.isString(attributes)) {
      element.className = attributes
    }else {
      if(goog.isArray(attributes)) {
        goog.dom.classes.add.apply(null, [element].concat(attributes))
      }else {
        goog.dom.setProperties(element, attributes)
      }
    }
  }
  if(args.length > 2) {
    goog.dom.append_(doc, element, args, 2)
  }
  return element
};
goog.dom.append_ = function(doc, parent, args, startIndex) {
  function childHandler(child) {
    if(child) {
      parent.appendChild(goog.isString(child) ? doc.createTextNode(child) : child)
    }
  }
  for(var i = startIndex;i < args.length;i++) {
    var arg = args[i];
    if(goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg)) {
      goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.clone(arg) : arg, childHandler)
    }else {
      childHandler(arg)
    }
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(name) {
  return document.createElement(name)
};
goog.dom.createTextNode = function(content) {
  return document.createTextNode(content)
};
goog.dom.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp)
};
goog.dom.createTable_ = function(doc, rows, columns, fillWithNbsp) {
  var rowHtml = ["<tr>"];
  for(var i = 0;i < columns;i++) {
    rowHtml.push(fillWithNbsp ? "<td>&nbsp;</td>" : "<td></td>")
  }
  rowHtml.push("</tr>");
  rowHtml = rowHtml.join("");
  var totalHtml = ["<table>"];
  for(i = 0;i < rows;i++) {
    totalHtml.push(rowHtml)
  }
  totalHtml.push("</table>");
  var elem = doc.createElement(goog.dom.TagName.DIV);
  elem.innerHTML = totalHtml.join("");
  return elem.removeChild(elem.firstChild)
};
goog.dom.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(document, htmlString)
};
goog.dom.htmlToDocumentFragment_ = function(doc, htmlString) {
  var tempDiv = doc.createElement("div");
  if(goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT) {
    tempDiv.innerHTML = "<br>" + htmlString;
    tempDiv.removeChild(tempDiv.firstChild)
  }else {
    tempDiv.innerHTML = htmlString
  }
  if(tempDiv.childNodes.length == 1) {
    return tempDiv.removeChild(tempDiv.firstChild)
  }else {
    var fragment = doc.createDocumentFragment();
    while(tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }
    return fragment
  }
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(doc) {
  if(goog.dom.COMPAT_MODE_KNOWN_) {
    return goog.dom.ASSUME_STANDARDS_MODE
  }
  return doc.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(node) {
  if(node.nodeType != goog.dom.NodeType.ELEMENT) {
    return false
  }
  switch(node.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return false
  }
  return true
};
goog.dom.appendChild = function(parent, child) {
  parent.appendChild(child)
};
goog.dom.append = function(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1)
};
goog.dom.removeChildren = function(node) {
  var child;
  while(child = node.firstChild) {
    node.removeChild(child)
  }
};
goog.dom.insertSiblingBefore = function(newNode, refNode) {
  if(refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode)
  }
};
goog.dom.insertSiblingAfter = function(newNode, refNode) {
  if(refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling)
  }
};
goog.dom.insertChildAt = function(parent, child, index) {
  parent.insertBefore(child, parent.childNodes[index] || null)
};
goog.dom.removeNode = function(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null
};
goog.dom.replaceNode = function(newNode, oldNode) {
  var parent = oldNode.parentNode;
  if(parent) {
    parent.replaceChild(newNode, oldNode)
  }
};
goog.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if(parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if(element.removeNode) {
      return element.removeNode(false)
    }else {
      while(child = element.firstChild) {
        parent.insertBefore(child, element)
      }
      return goog.dom.removeNode(element)
    }
  }
};
goog.dom.getChildren = function(element) {
  if(goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && element.children != undefined) {
    return element.children
  }
  return goog.array.filter(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function(node) {
  if(node.firstElementChild != undefined) {
    return node.firstElementChild
  }
  return goog.dom.getNextElementNode_(node.firstChild, true)
};
goog.dom.getLastElementChild = function(node) {
  if(node.lastElementChild != undefined) {
    return node.lastElementChild
  }
  return goog.dom.getNextElementNode_(node.lastChild, false)
};
goog.dom.getNextElementSibling = function(node) {
  if(node.nextElementSibling != undefined) {
    return node.nextElementSibling
  }
  return goog.dom.getNextElementNode_(node.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(node) {
  if(node.previousElementSibling != undefined) {
    return node.previousElementSibling
  }
  return goog.dom.getNextElementNode_(node.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(node, forward) {
  while(node && node.nodeType != goog.dom.NodeType.ELEMENT) {
    node = forward ? node.nextSibling : node.previousSibling
  }
  return node
};
goog.dom.getNextNode = function(node) {
  if(!node) {
    return null
  }
  if(node.firstChild) {
    return node.firstChild
  }
  while(node && !node.nextSibling) {
    node = node.parentNode
  }
  return node ? node.nextSibling : null
};
goog.dom.getPreviousNode = function(node) {
  if(!node) {
    return null
  }
  if(!node.previousSibling) {
    return node.parentNode
  }
  node = node.previousSibling;
  while(node && node.lastChild) {
    node = node.lastChild
  }
  return node
};
goog.dom.isNodeLike = function(obj) {
  return goog.isObject(obj) && obj.nodeType > 0
};
goog.dom.isWindow = function(obj) {
  return goog.isObject(obj) && obj["window"] == obj
};
goog.dom.contains = function(parent, descendant) {
  if(parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant)
  }
  if(typeof parent.compareDocumentPosition != "undefined") {
    return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16)
  }
  while(descendant && parent != descendant) {
    descendant = descendant.parentNode
  }
  return descendant == parent
};
goog.dom.compareNodeOrder = function(node1, node2) {
  if(node1 == node2) {
    return 0
  }
  if(node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1
  }
  if("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT;
    var isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if(isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex
    }else {
      var parent1 = node1.parentNode;
      var parent2 = node2.parentNode;
      if(parent1 == parent2) {
        return goog.dom.compareSiblingOrder_(node1, node2)
      }
      if(!isElement1 && goog.dom.contains(parent1, node2)) {
        return-1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2)
      }
      if(!isElement2 && goog.dom.contains(parent2, node1)) {
        return goog.dom.compareParentsDescendantNodeIe_(node2, node1)
      }
      return(isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex)
    }
  }
  var doc = goog.dom.getOwnerDocument(node1);
  var range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(true);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(true);
  return range1.compareBoundaryPoints(goog.global["Range"].START_TO_END, range2)
};
goog.dom.compareParentsDescendantNodeIe_ = function(textNode, node) {
  var parent = textNode.parentNode;
  if(parent == node) {
    return-1
  }
  var sibling = node;
  while(sibling.parentNode != parent) {
    sibling = sibling.parentNode
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode)
};
goog.dom.compareSiblingOrder_ = function(node1, node2) {
  var s = node2;
  while(s = s.previousSibling) {
    if(s == node1) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function(var_args) {
  var i, count = arguments.length;
  if(!count) {
    return null
  }else {
    if(count == 1) {
      return arguments[0]
    }
  }
  var paths = [];
  var minLength = Infinity;
  for(i = 0;i < count;i++) {
    var ancestors = [];
    var node = arguments[i];
    while(node) {
      ancestors.unshift(node);
      node = node.parentNode
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length)
  }
  var output = null;
  for(i = 0;i < minLength;i++) {
    var first = paths[0][i];
    for(var j = 1;j < count;j++) {
      if(first != paths[j][i]) {
        return output
      }
    }
    output = first
  }
  return output
};
goog.dom.getOwnerDocument = function(node) {
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document
};
goog.dom.getFrameContentDocument = function(frame) {
  var doc;
  if(goog.userAgent.WEBKIT) {
    doc = frame.document || frame.contentWindow.document
  }else {
    doc = frame.contentDocument || frame.contentWindow.document
  }
  return doc
};
goog.dom.getFrameContentWindow = function(frame) {
  return frame.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(frame))
};
goog.dom.setTextContent = function(element, text) {
  if("textContent" in element) {
    element.textContent = text
  }else {
    if(element.firstChild && element.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      while(element.lastChild != element.firstChild) {
        element.removeChild(element.lastChild)
      }
      element.firstChild.data = text
    }else {
      goog.dom.removeChildren(element);
      var doc = goog.dom.getOwnerDocument(element);
      element.appendChild(doc.createTextNode(text))
    }
  }
};
goog.dom.getOuterHtml = function(element) {
  if("outerHTML" in element) {
    return element.outerHTML
  }else {
    var doc = goog.dom.getOwnerDocument(element);
    var div = doc.createElement("div");
    div.appendChild(element.cloneNode(true));
    return div.innerHTML
  }
};
goog.dom.findNode = function(root, p) {
  var rv = [];
  var found = goog.dom.findNodes_(root, p, rv, true);
  return found ? rv[0] : undefined
};
goog.dom.findNodes = function(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, false);
  return rv
};
goog.dom.findNodes_ = function(root, p, rv, findOne) {
  if(root != null) {
    for(var i = 0, child;child = root.childNodes[i];i++) {
      if(p(child)) {
        rv.push(child);
        if(findOne) {
          return true
        }
      }
      if(goog.dom.findNodes_(child, p, rv, findOne)) {
        return true
      }
    }
  }
  return false
};
goog.dom.TAGS_TO_IGNORE_ = {"SCRIPT":1, "STYLE":1, "HEAD":1, "IFRAME":1, "OBJECT":1};
goog.dom.PREDEFINED_TAG_VALUES_ = {"IMG":" ", "BR":"\n"};
goog.dom.isFocusableTabIndex = function(element) {
  var attrNode = element.getAttributeNode("tabindex");
  if(attrNode && attrNode.specified) {
    var index = element.tabIndex;
    return goog.isNumber(index) && index >= 0
  }
  return false
};
goog.dom.setFocusableTabIndex = function(element, enable) {
  if(enable) {
    element.tabIndex = 0
  }else {
    element.removeAttribute("tabIndex")
  }
};
goog.dom.getTextContent = function(node) {
  var textContent;
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in node) {
    textContent = goog.string.canonicalizeNewlines(node.innerText)
  }else {
    var buf = [];
    goog.dom.getTextContent_(node, buf, true);
    textContent = buf.join("")
  }
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  if(!goog.userAgent.IE) {
    textContent = textContent.replace(/ +/g, " ")
  }
  if(textContent != " ") {
    textContent = textContent.replace(/^\s*/, "")
  }
  return textContent
};
goog.dom.getRawTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, false);
  return buf.join("")
};
goog.dom.getTextContent_ = function(node, buf, normalizeWhitespace) {
  if(node.nodeName in goog.dom.TAGS_TO_IGNORE_) {
  }else {
    if(node.nodeType == goog.dom.NodeType.TEXT) {
      if(normalizeWhitespace) {
        buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
      }else {
        buf.push(node.nodeValue)
      }
    }else {
      if(node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName])
      }else {
        var child = node.firstChild;
        while(child) {
          goog.dom.getTextContent_(child, buf, normalizeWhitespace);
          child = child.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(node) {
  return goog.dom.getTextContent(node).length
};
goog.dom.getNodeTextOffset = function(node, opt_offsetParent) {
  var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body;
  var buf = [];
  while(node && node != root) {
    var cur = node;
    while(cur = cur.previousSibling) {
      buf.unshift(goog.dom.getTextContent(cur))
    }
    node = node.parentNode
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(parent, offset, opt_result) {
  var stack = [parent], pos = 0, cur;
  while(stack.length > 0 && pos < offset) {
    cur = stack.pop();
    if(cur.nodeName in goog.dom.TAGS_TO_IGNORE_) {
    }else {
      if(cur.nodeType == goog.dom.NodeType.TEXT) {
        var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
        pos += text.length
      }else {
        if(cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length
        }else {
          for(var i = cur.childNodes.length - 1;i >= 0;i--) {
            stack.push(cur.childNodes[i])
          }
        }
      }
    }
  }
  if(goog.isObject(opt_result)) {
    opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0;
    opt_result.node = cur
  }
  return cur
};
goog.dom.isNodeList = function(val) {
  if(val && typeof val.length == "number") {
    if(goog.isObject(val)) {
      return typeof val.item == "function" || typeof val.item == "string"
    }else {
      if(goog.isFunction(val)) {
        return typeof val.item == "function"
      }
    }
  }
  return false
};
goog.dom.getAncestorByTagNameAndClass = function(element, opt_tag, opt_class) {
  var tagName = opt_tag ? opt_tag.toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return(!tagName || node.nodeName == tagName) && (!opt_class || goog.dom.classes.has(node, opt_class))
  }, true)
};
goog.dom.getAncestorByClass = function(element, opt_class) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, opt_class)
};
goog.dom.getAncestor = function(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  if(!opt_includeNode) {
    element = element.parentNode
  }
  var ignoreSearchSteps = opt_maxSearchSteps == null;
  var steps = 0;
  while(element && (ignoreSearchSteps || steps <= opt_maxSearchSteps)) {
    if(matcher(element)) {
      return element
    }
    element = element.parentNode;
    steps++
  }
  return null
};
goog.dom.DomHelper = function(opt_document) {
  this.document_ = opt_document || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(document) {
  this.document_ = document
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(element) {
  if(goog.isString(element)) {
    return this.document_.getElementById(element)
  }else {
    return element
  }
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc)
};
goog.dom.DomHelper.prototype.getElementByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.Appendable;
goog.dom.DomHelper.prototype.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(name) {
  return this.document_.createElement(name)
};
goog.dom.DomHelper.prototype.createTextNode = function(content) {
  return this.document_.createTextNode(content)
};
goog.dom.DomHelper.prototype.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(this.document_, htmlString)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.provide("goog.net.xpc.IframePollingTransport");
goog.provide("goog.net.xpc.IframePollingTransport.Receiver");
goog.provide("goog.net.xpc.IframePollingTransport.Sender");
goog.require("goog.array");
goog.require("goog.dom");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.IframePollingTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.sendUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI];
  this.rcvUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI];
  this.sendQueue_ = []
};
goog.inherits(goog.net.xpc.IframePollingTransport, goog.net.xpc.Transport);
goog.net.xpc.IframePollingTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING;
goog.net.xpc.IframePollingTransport.prototype.sequence_ = 0;
goog.net.xpc.IframePollingTransport.prototype.waitForAck_ = false;
goog.net.xpc.IframePollingTransport.prototype.initialized_ = false;
goog.net.xpc.IframePollingTransport.IFRAME_PREFIX = "googlexpc";
goog.net.xpc.IframePollingTransport.prototype.getMsgFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_msg"
};
goog.net.xpc.IframePollingTransport.prototype.getAckFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_ack"
};
goog.net.xpc.IframePollingTransport.prototype.connect = function() {
  goog.net.xpc.logger.fine("transport connect called");
  if(!this.initialized_) {
    goog.net.xpc.logger.fine("initializing...");
    this.constructSenderFrames_();
    this.initialized_ = true
  }
  this.checkForeignFramesReady_()
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrames_ = function() {
  var name = this.getMsgFrameName_();
  this.msgIframeElm_ = this.constructSenderFrame_(name);
  this.msgWinObj_ = this.getWindow().frames[name];
  name = this.getAckFrameName_();
  this.ackIframeElm_ = this.constructSenderFrame_(name);
  this.ackWinObj_ = this.getWindow().frames[name]
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrame_ = function(id) {
  goog.net.xpc.logger.finest("constructing sender frame: " + id);
  var ifr = goog.dom.createElement("iframe");
  var s = ifr.style;
  s.position = "absolute";
  s.top = "-10px";
  s.left = "10px";
  s.width = "1px";
  s.height = "1px";
  ifr.id = ifr.name = id;
  ifr.src = this.sendUri_ + "#INITIAL";
  this.getWindow().document.body.appendChild(ifr);
  return ifr
};
goog.net.xpc.IframePollingTransport.prototype.innerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("innerPeerReconnect called");
  this.channel_.name = goog.net.xpc.getRandomString(10);
  goog.net.xpc.logger.finest("switching channels: " + this.channel_.name);
  this.deconstructSenderFrames_();
  this.initialized_ = false;
  this.reconnectFrame_ = this.constructSenderFrame_(goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_reconnect_" + this.channel_.name)
};
goog.net.xpc.IframePollingTransport.prototype.outerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("outerPeerReconnect called");
  var frames = this.channel_.peerWindowObject_.frames;
  var length = frames.length;
  for(var i = 0;i < length;i++) {
    var frameName;
    try {
      if(frames[i] && frames[i].name) {
        frameName = frames[i].name
      }
    }catch(e) {
    }
    if(!frameName) {
      continue
    }
    var message = frameName.split("_");
    if(message.length == 3 && message[0] == goog.net.xpc.IframePollingTransport.IFRAME_PREFIX && message[1] == "reconnect") {
      this.channel_.name = message[2];
      this.deconstructSenderFrames_();
      this.initialized_ = false;
      break
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.deconstructSenderFrames_ = function() {
  goog.net.xpc.logger.finest("deconstructSenderFrames called");
  if(this.msgIframeElm_) {
    this.msgIframeElm_.parentNode.removeChild(this.msgIframeElm_);
    this.msgIframeElm_ = null;
    this.msgWinObj_ = null
  }
  if(this.ackIframeElm_) {
    this.ackIframeElm_.parentNode.removeChild(this.ackIframeElm_);
    this.ackIframeElm_ = null;
    this.ackWinObj_ = null
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkForeignFramesReady_ = function() {
  if(!(this.isRcvFrameReady_(this.getMsgFrameName_()) && this.isRcvFrameReady_(this.getAckFrameName_()))) {
    goog.net.xpc.logger.finest("foreign frames not (yet) present");
    if(this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.INNER && !this.reconnectFrame_) {
      this.innerPeerReconnect_()
    }else {
      if(this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER) {
        this.outerPeerReconnect_()
      }
    }
    this.getWindow().setTimeout(goog.bind(this.connect, this), 100)
  }else {
    goog.net.xpc.logger.fine("foreign frames present");
    this.msgReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getMsgFrameName_()], goog.bind(this.processIncomingMsg, this));
    this.ackReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getAckFrameName_()], goog.bind(this.processIncomingAck, this));
    this.checkLocalFramesPresent_()
  }
};
goog.net.xpc.IframePollingTransport.prototype.isRcvFrameReady_ = function(frameName) {
  goog.net.xpc.logger.finest("checking for receive frame: " + frameName);
  try {
    var winObj = this.channel_.peerWindowObject_.frames[frameName];
    if(!winObj || winObj.location.href.indexOf(this.rcvUri_) != 0) {
      return false
    }
  }catch(e) {
    return false
  }
  return true
};
goog.net.xpc.IframePollingTransport.prototype.checkLocalFramesPresent_ = function() {
  var frames = this.channel_.peerWindowObject_.frames;
  if(!(frames[this.getAckFrameName_()] && frames[this.getMsgFrameName_()])) {
    if(!this.checkLocalFramesPresentCb_) {
      this.checkLocalFramesPresentCb_ = goog.bind(this.checkLocalFramesPresent_, this)
    }
    this.getWindow().setTimeout(this.checkLocalFramesPresentCb_, 100);
    goog.net.xpc.logger.fine("local frames not (yet) present")
  }else {
    this.msgSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.msgWinObj_);
    this.ackSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.ackWinObj_);
    goog.net.xpc.logger.fine("local frames ready");
    this.getWindow().setTimeout(goog.bind(function() {
      this.msgSender_.send(goog.net.xpc.SETUP);
      this.sentConnectionSetup_ = true;
      this.waitForAck_ = true;
      goog.net.xpc.logger.fine("SETUP sent")
    }, this), 100)
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkIfConnected_ = function() {
  if(this.sentConnectionSetupAck_ && this.rcvdConnectionSetupAck_) {
    this.channel_.notifyConnected_();
    if(this.deliveryQueue_) {
      goog.net.xpc.logger.fine("delivering queued messages " + "(" + this.deliveryQueue_.length + ")");
      for(var i = 0, m;i < this.deliveryQueue_.length;i++) {
        m = this.deliveryQueue_[i];
        this.channel_.deliver_(m.service, m.payload)
      }
      delete this.deliveryQueue_
    }
  }else {
    goog.net.xpc.logger.finest("checking if connected: " + "ack sent:" + this.sentConnectionSetupAck_ + ", ack rcvd: " + this.rcvdConnectionSetupAck_)
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingMsg = function(raw) {
  goog.net.xpc.logger.finest("msg received: " + raw);
  if(raw == goog.net.xpc.SETUP) {
    if(!this.ackSender_) {
      return
    }
    this.ackSender_.send(goog.net.xpc.SETUP_ACK_);
    goog.net.xpc.logger.finest("SETUP_ACK sent");
    this.sentConnectionSetupAck_ = true;
    this.checkIfConnected_()
  }else {
    if(this.channel_.isConnected() || this.sentConnectionSetupAck_) {
      var pos = raw.indexOf("|");
      var head = raw.substring(0, pos);
      var frame = raw.substring(pos + 1);
      pos = head.indexOf(",");
      if(pos == -1) {
        var seq = head;
        this.ackSender_.send("ACK:" + seq);
        this.deliverPayload_(frame)
      }else {
        var seq = head.substring(0, pos);
        this.ackSender_.send("ACK:" + seq);
        var partInfo = head.substring(pos + 1).split("/");
        var part0 = parseInt(partInfo[0], 10);
        var part1 = parseInt(partInfo[1], 10);
        if(part0 == 1) {
          this.parts_ = []
        }
        this.parts_.push(frame);
        if(part0 == part1) {
          this.deliverPayload_(this.parts_.join(""));
          delete this.parts_
        }
      }
    }else {
      goog.net.xpc.logger.warning("received msg, but channel is not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingAck = function(msgStr) {
  goog.net.xpc.logger.finest("ack received: " + msgStr);
  if(msgStr == goog.net.xpc.SETUP_ACK_) {
    this.waitForAck_ = false;
    this.rcvdConnectionSetupAck_ = true;
    this.checkIfConnected_()
  }else {
    if(this.channel_.isConnected()) {
      if(!this.waitForAck_) {
        goog.net.xpc.logger.warning("got unexpected ack");
        return
      }
      var seq = parseInt(msgStr.split(":")[1], 10);
      if(seq == this.sequence_) {
        this.waitForAck_ = false;
        this.sendNextFrame_()
      }else {
        goog.net.xpc.logger.warning("got ack with wrong sequence")
      }
    }else {
      goog.net.xpc.logger.warning("received ack, but channel not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.sendNextFrame_ = function() {
  if(this.waitForAck_ || !this.sendQueue_.length) {
    return
  }
  var s = this.sendQueue_.shift();
  ++this.sequence_;
  this.msgSender_.send(this.sequence_ + s);
  goog.net.xpc.logger.finest("msg sent: " + this.sequence_ + s);
  this.waitForAck_ = true
};
goog.net.xpc.IframePollingTransport.prototype.deliverPayload_ = function(s) {
  var pos = s.indexOf(":");
  var service = s.substr(0, pos);
  var payload = s.substring(pos + 1);
  if(!this.channel_.isConnected()) {
    (this.deliveryQueue_ || (this.deliveryQueue_ = [])).push({service:service, payload:payload});
    goog.net.xpc.logger.finest("queued delivery")
  }else {
    this.channel_.deliver_(service, payload)
  }
};
goog.net.xpc.IframePollingTransport.prototype.MAX_FRAME_LENGTH_ = 3800;
goog.net.xpc.IframePollingTransport.prototype.send = function(service, payload) {
  var frame = service + ":" + payload;
  if(!goog.userAgent.IE || payload.length <= this.MAX_FRAME_LENGTH_) {
    this.sendQueue_.push("|" + frame)
  }else {
    var l = payload.length;
    var num = Math.ceil(l / this.MAX_FRAME_LENGTH_);
    var pos = 0;
    var i = 1;
    while(pos < l) {
      this.sendQueue_.push("," + i + "/" + num + "|" + frame.substr(pos, this.MAX_FRAME_LENGTH_));
      i++;
      pos += this.MAX_FRAME_LENGTH_
    }
  }
  this.sendNextFrame_()
};
goog.net.xpc.IframePollingTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  var receivers = goog.net.xpc.IframePollingTransport.receivers_;
  goog.array.remove(receivers, this.msgReceiver_);
  goog.array.remove(receivers, this.ackReceiver_);
  this.msgReceiver_ = this.ackReceiver_ = null;
  goog.dom.removeNode(this.msgIframeElm_);
  goog.dom.removeNode(this.ackIframeElm_);
  this.msgIframeElm_ = this.ackIframeElm_ = null;
  this.msgWinObj_ = this.ackWinObj_ = null
};
goog.net.xpc.IframePollingTransport.receivers_ = [];
goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ = 10;
goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_ = 100;
goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ = 1E3;
goog.net.xpc.IframePollingTransport.receive_ = function() {
  var rcvd = false;
  try {
    for(var i = 0, l = goog.net.xpc.IframePollingTransport.receivers_.length;i < l;i++) {
      rcvd = rcvd || goog.net.xpc.IframePollingTransport.receivers_[i].receive()
    }
  }catch(e) {
    goog.net.xpc.logger.info("receive_() failed: " + e);
    goog.net.xpc.IframePollingTransport.receivers_[i].transport_.channel_.notifyTransportError_();
    if(!goog.net.xpc.IframePollingTransport.receivers_.length) {
      return
    }
  }
  var now = goog.now();
  if(rcvd) {
    goog.net.xpc.IframePollingTransport.lastActivity_ = now
  }
  var t = now - goog.net.xpc.IframePollingTransport.lastActivity_ < goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ ? goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ : goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_;
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, t)
};
goog.net.xpc.IframePollingTransport.receiveCb_ = goog.bind(goog.net.xpc.IframePollingTransport.receive_, goog.net.xpc.IframePollingTransport);
goog.net.xpc.IframePollingTransport.startRcvTimer_ = function() {
  goog.net.xpc.logger.fine("starting receive-timer");
  goog.net.xpc.IframePollingTransport.lastActivity_ = goog.now();
  if(goog.net.xpc.IframePollingTransport.rcvTimer_) {
    window.clearTimeout(goog.net.xpc.IframePollingTransport.rcvTimer_)
  }
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_)
};
goog.net.xpc.IframePollingTransport.Sender = function(url, windowObj) {
  this.sendUri_ = url;
  this.sendFrame_ = windowObj;
  this.cycle_ = 0
};
goog.net.xpc.IframePollingTransport.Sender.prototype.send = function(payload) {
  this.cycle_ = ++this.cycle_ % 2;
  var url = this.sendUri_ + "#" + this.cycle_ + encodeURIComponent(payload);
  try {
    if(goog.userAgent.WEBKIT) {
      this.sendFrame_.location.href = url
    }else {
      this.sendFrame_.location.replace(url)
    }
  }catch(e) {
    goog.net.xpc.logger.severe("sending failed", e)
  }
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver = function(transport, windowObj, callback) {
  this.transport_ = transport;
  this.rcvFrame_ = windowObj;
  this.cb_ = callback;
  this.currentLoc_ = this.rcvFrame_.location.href.split("#")[0] + "#INITIAL";
  goog.net.xpc.IframePollingTransport.receivers_.push(this);
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver.prototype.receive = function() {
  var loc = this.rcvFrame_.location.href;
  if(loc != this.currentLoc_) {
    this.currentLoc_ = loc;
    var payload = loc.split("#")[1];
    if(payload) {
      payload = payload.substr(1);
      this.cb_(decodeURIComponent(payload))
    }
    return true
  }else {
    return false
  }
};
goog.provide("goog.messaging.AbstractChannel");
goog.require("goog.Disposable");
goog.require("goog.debug");
goog.require("goog.debug.Logger");
goog.require("goog.json");
goog.require("goog.messaging.MessageChannel");
goog.messaging.AbstractChannel = function() {
  goog.base(this);
  this.services_ = {}
};
goog.inherits(goog.messaging.AbstractChannel, goog.Disposable);
goog.messaging.AbstractChannel.prototype.defaultService_;
goog.messaging.AbstractChannel.prototype.logger = goog.debug.Logger.getLogger("goog.messaging.AbstractChannel");
goog.messaging.AbstractChannel.prototype.connect = function(opt_connectCb) {
  if(opt_connectCb) {
    opt_connectCb()
  }
};
goog.messaging.AbstractChannel.prototype.isConnected = function() {
  return true
};
goog.messaging.AbstractChannel.prototype.registerService = function(serviceName, callback, opt_objectPayload) {
  this.services_[serviceName] = {callback:callback, objectPayload:!!opt_objectPayload}
};
goog.messaging.AbstractChannel.prototype.registerDefaultService = function(callback) {
  this.defaultService_ = callback
};
goog.messaging.AbstractChannel.prototype.send = goog.abstractMethod;
goog.messaging.AbstractChannel.prototype.deliver = function(serviceName, payload) {
  var service = this.getService(serviceName, payload);
  if(!service) {
    return
  }
  payload = this.decodePayload(serviceName, payload, service.objectPayload);
  if(goog.isDefAndNotNull(payload)) {
    service.callback(payload)
  }
};
goog.messaging.AbstractChannel.prototype.getService = function(serviceName, payload) {
  var service = this.services_[serviceName];
  if(service) {
    return service
  }else {
    if(this.defaultService_) {
      var callback = goog.partial(this.defaultService_, serviceName);
      var objectPayload = goog.isObject(payload);
      return{callback:callback, objectPayload:objectPayload}
    }
  }
  this.logger.warning('Unknown service name "' + serviceName + '"');
  return null
};
goog.messaging.AbstractChannel.prototype.decodePayload = function(serviceName, payload, objectPayload) {
  if(objectPayload && goog.isString(payload)) {
    try {
      return goog.json.parse(payload)
    }catch(err) {
      this.logger.warning("Expected JSON payload for " + serviceName + ', was "' + payload + '"');
      return null
    }
  }else {
    if(!objectPayload && !goog.isString(payload)) {
      return goog.json.serialize(payload)
    }
  }
  return payload
};
goog.messaging.AbstractChannel.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  goog.dispose(this.logger);
  delete this.logger;
  delete this.services_;
  delete this.defaultService_
};
goog.provide("goog.net.xpc.IframeRelayTransport");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.IframeRelayTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.peerRelayUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI];
  this.peerIframeId_ = this.channel_.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  if(goog.userAgent.WEBKIT) {
    goog.net.xpc.IframeRelayTransport.startCleanupTimer_()
  }
};
goog.inherits(goog.net.xpc.IframeRelayTransport, goog.net.xpc.Transport);
if(goog.userAgent.WEBKIT) {
  goog.net.xpc.IframeRelayTransport.iframeRefs_ = [];
  goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_ = 1E3;
  goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_ = 3E3;
  goog.net.xpc.IframeRelayTransport.cleanupTimer_ = 0;
  goog.net.xpc.IframeRelayTransport.startCleanupTimer_ = function() {
    if(!goog.net.xpc.IframeRelayTransport.cleanupTimer_) {
      goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(function() {
        goog.net.xpc.IframeRelayTransport.cleanup_()
      }, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
    }
  };
  goog.net.xpc.IframeRelayTransport.cleanup_ = function(opt_maxAge) {
    var now = goog.now();
    var maxAge = opt_maxAge || goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_;
    while(goog.net.xpc.IframeRelayTransport.iframeRefs_.length && now - goog.net.xpc.IframeRelayTransport.iframeRefs_[0].timestamp >= maxAge) {
      var ifr = goog.net.xpc.IframeRelayTransport.iframeRefs_.shift().iframeElement;
      goog.dom.removeNode(ifr);
      goog.net.xpc.logger.finest("iframe removed")
    }
    goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(goog.net.xpc.IframeRelayTransport.cleanupCb_, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
  };
  goog.net.xpc.IframeRelayTransport.cleanupCb_ = function() {
    goog.net.xpc.IframeRelayTransport.cleanup_()
  }
}
goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_ = 1800;
goog.net.xpc.IframeRelayTransport.FragmentInfo;
goog.net.xpc.IframeRelayTransport.fragmentMap_ = {};
goog.net.xpc.IframeRelayTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY;
goog.net.xpc.IframeRelayTransport.prototype.connect = function() {
  if(!this.getWindow()["xpcRelay"]) {
    this.getWindow()["xpcRelay"] = goog.net.xpc.IframeRelayTransport.receiveMessage_
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP)
};
goog.net.xpc.IframeRelayTransport.receiveMessage_ = function(channelName, frame) {
  var pos = frame.indexOf(":");
  var header = frame.substr(0, pos);
  var payload = frame.substr(pos + 1);
  if(!goog.userAgent.IE || (pos = header.indexOf("|")) == -1) {
    var service = header
  }else {
    var service = header.substr(0, pos);
    var fragmentIdStr = header.substr(pos + 1);
    pos = fragmentIdStr.indexOf("+");
    var messageIdStr = fragmentIdStr.substr(0, pos);
    var fragmentNum = parseInt(fragmentIdStr.substr(pos + 1), 10);
    var fragmentInfo = goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr];
    if(!fragmentInfo) {
      fragmentInfo = goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr] = {fragments:[], received:0, expected:0}
    }
    if(goog.string.contains(fragmentIdStr, "++")) {
      fragmentInfo.expected = fragmentNum + 1
    }
    fragmentInfo.fragments[fragmentNum] = payload;
    fragmentInfo.received++;
    if(fragmentInfo.received != fragmentInfo.expected) {
      return
    }
    payload = fragmentInfo.fragments.join("");
    delete goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr]
  }
  goog.net.xpc.channels_[channelName].deliver_(service, decodeURIComponent(payload))
};
goog.net.xpc.IframeRelayTransport.prototype.transportServiceHandler = function(payload) {
  if(payload == goog.net.xpc.SETUP) {
    this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
    this.channel_.notifyConnected_()
  }else {
    if(payload == goog.net.xpc.SETUP_ACK_) {
      this.channel_.notifyConnected_()
    }
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send = function(service, payload) {
  var encodedPayload = encodeURIComponent(payload);
  var encodedLen = encodedPayload.length;
  var maxSize = goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_;
  if(goog.userAgent.IE && encodedLen > maxSize) {
    var messageIdStr = goog.string.getRandomString();
    for(var startIndex = 0, fragmentNum = 0;startIndex < encodedLen;fragmentNum++) {
      var payloadFragment = encodedPayload.substr(startIndex, maxSize);
      startIndex += maxSize;
      var fragmentIdStr = messageIdStr + (startIndex >= encodedLen ? "++" : "+") + fragmentNum;
      this.send_(service, payloadFragment, fragmentIdStr)
    }
  }else {
    this.send_(service, encodedPayload)
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send_ = function(service, encodedPayload, opt_fragmentIdStr) {
  if(goog.userAgent.IE) {
    var div = this.getWindow().document.createElement("div");
    div.innerHTML = '<iframe onload="this.xpcOnload()"></iframe>';
    var ifr = div.childNodes[0];
    div = null;
    ifr["xpcOnload"] = goog.net.xpc.IframeRelayTransport.iframeLoadHandler_
  }else {
    var ifr = this.getWindow().document.createElement("iframe");
    if(goog.userAgent.WEBKIT) {
      goog.net.xpc.IframeRelayTransport.iframeRefs_.push({timestamp:goog.now(), iframeElement:ifr})
    }else {
      goog.events.listen(ifr, "load", goog.net.xpc.IframeRelayTransport.iframeLoadHandler_)
    }
  }
  var style = ifr.style;
  style.visibility = "hidden";
  style.width = ifr.style.height = "0px";
  style.position = "absolute";
  var url = this.peerRelayUri_;
  url += "#" + this.channel_.name;
  if(this.peerIframeId_) {
    url += "," + this.peerIframeId_
  }
  url += "|" + service;
  if(opt_fragmentIdStr) {
    url += "|" + opt_fragmentIdStr
  }
  url += ":" + encodedPayload;
  ifr.src = url;
  this.getWindow().document.body.appendChild(ifr);
  goog.net.xpc.logger.finest("msg sent: " + url)
};
goog.net.xpc.IframeRelayTransport.iframeLoadHandler_ = function() {
  goog.net.xpc.logger.finest("iframe-load");
  goog.dom.removeNode(this);
  this.xpcOnload = null
};
goog.net.xpc.IframeRelayTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  if(goog.userAgent.WEBKIT) {
    goog.net.xpc.IframeRelayTransport.cleanup_(0)
  }
};
goog.provide("goog.net.xpc.NativeMessagingTransport");
goog.require("goog.events");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.NativeMessagingTransport = function(channel, peerHostname, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.peerHostname_ = peerHostname || "*"
};
goog.inherits(goog.net.xpc.NativeMessagingTransport, goog.net.xpc.Transport);
goog.net.xpc.NativeMessagingTransport.prototype.initialized_ = false;
goog.net.xpc.NativeMessagingTransport.prototype.transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING;
goog.net.xpc.NativeMessagingTransport.activeCount_ = {};
goog.net.xpc.NativeMessagingTransport.initialize_ = function(listenWindow) {
  var uid = goog.getUid(listenWindow);
  var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
  if(!goog.isNumber(value)) {
    value = 0
  }
  if(value == 0) {
    goog.events.listen(listenWindow.postMessage ? listenWindow : listenWindow.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, false, goog.net.xpc.NativeMessagingTransport)
  }
  goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value + 1
};
goog.net.xpc.NativeMessagingTransport.messageReceived_ = function(msgEvt) {
  var data = msgEvt.getBrowserEvent().data;
  var headDelim = data.indexOf("|");
  var serviceDelim = data.indexOf(":");
  if(headDelim == -1 || serviceDelim == -1) {
    return false
  }
  var channelName = data.substring(0, headDelim);
  var service = data.substring(headDelim + 1, serviceDelim);
  var payload = data.substring(serviceDelim + 1);
  goog.net.xpc.logger.fine("messageReceived: channel=" + channelName + ", service=" + service + ", payload=" + payload);
  var channel = goog.net.xpc.channels_[channelName];
  if(channel) {
    channel.deliver_(service, payload, msgEvt.getBrowserEvent().origin);
    return true
  }
  for(var staleChannelName in goog.net.xpc.channels_) {
    var staleChannel = goog.net.xpc.channels_[staleChannelName];
    if(staleChannel.getRole() == goog.net.xpc.CrossPageChannel.Role.INNER && !staleChannel.isConnected() && service == goog.net.xpc.TRANSPORT_SERVICE_ && payload == goog.net.xpc.SETUP) {
      goog.net.xpc.logger.fine("changing channel name to " + channelName);
      staleChannel.name = channelName;
      delete goog.net.xpc.channels_[staleChannelName];
      goog.net.xpc.channels_[channelName] = staleChannel;
      staleChannel.deliver_(service, payload);
      return true
    }
  }
  goog.net.xpc.logger.info('channel name mismatch; message ignored"');
  return false
};
goog.net.xpc.NativeMessagingTransport.prototype.transportServiceHandler = function(payload) {
  switch(payload) {
    case goog.net.xpc.SETUP:
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      break;
    case goog.net.xpc.SETUP_ACK_:
      this.channel_.notifyConnected_();
      break
  }
};
goog.net.xpc.NativeMessagingTransport.prototype.connect = function() {
  goog.net.xpc.NativeMessagingTransport.initialize_(this.getWindow());
  this.initialized_ = true;
  this.connectWithRetries_()
};
goog.net.xpc.NativeMessagingTransport.prototype.connectWithRetries_ = function() {
  if(this.channel_.isConnected() || this.isDisposed()) {
    return
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP);
  this.getWindow().setTimeout(goog.bind(this.connectWithRetries_, this), 100)
};
goog.net.xpc.NativeMessagingTransport.prototype.send = function(service, payload) {
  var win = this.channel_.peerWindowObject_;
  if(!win) {
    goog.net.xpc.logger.fine("send(): window not ready");
    return
  }
  var obj = win.postMessage ? win : win.document;
  this.send = function(service, payload) {
    goog.net.xpc.logger.fine("send(): payload=" + payload + " to hostname=" + this.peerHostname_);
    obj.postMessage(this.channel_.name + "|" + service + ":" + payload, this.peerHostname_)
  };
  this.send(service, payload)
};
goog.net.xpc.NativeMessagingTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  if(this.initialized_) {
    var listenWindow = this.getWindow();
    var uid = goog.getUid(listenWindow);
    var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
    goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value - 1;
    if(value == 1) {
      goog.events.unlisten(listenWindow.postMessage ? listenWindow : listenWindow.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, false, goog.net.xpc.NativeMessagingTransport)
    }
  }
};
goog.provide("goog.net.xpc.CrossPageChannel");
goog.provide("goog.net.xpc.CrossPageChannel.Role");
goog.require("goog.Disposable");
goog.require("goog.Uri");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.json");
goog.require("goog.messaging.AbstractChannel");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.FrameElementMethodTransport");
goog.require("goog.net.xpc.IframePollingTransport");
goog.require("goog.net.xpc.IframeRelayTransport");
goog.require("goog.net.xpc.NativeMessagingTransport");
goog.require("goog.net.xpc.NixTransport");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.CrossPageChannel = function(cfg, opt_domHelper) {
  goog.base(this);
  for(var i = 0, uriField;uriField = goog.net.xpc.UriCfgFields[i];i++) {
    if(uriField in cfg && !/^https?:\/\//.test(cfg[uriField])) {
      throw Error("URI " + cfg[uriField] + " is invalid for field " + uriField);
    }
  }
  this.cfg_ = cfg;
  this.name = this.cfg_[goog.net.xpc.CfgFields.CHANNEL_NAME] || goog.net.xpc.getRandomString(10);
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();
  goog.net.xpc.channels_[this.name] = this;
  goog.events.listen(window, "unload", goog.net.xpc.CrossPageChannel.disposeAll_);
  goog.net.xpc.logger.info("CrossPageChannel created: " + this.name)
};
goog.inherits(goog.net.xpc.CrossPageChannel, goog.messaging.AbstractChannel);
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_ = new RegExp("^%*" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_ = new RegExp("^%+" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.prototype.transport_ = null;
goog.net.xpc.CrossPageChannel.prototype.state_ = goog.net.xpc.ChannelStates.NOT_CONNECTED;
goog.net.xpc.CrossPageChannel.prototype.isConnected = function() {
  return this.state_ == goog.net.xpc.ChannelStates.CONNECTED
};
goog.net.xpc.CrossPageChannel.prototype.peerWindowObject_ = null;
goog.net.xpc.CrossPageChannel.prototype.iframeElement_ = null;
goog.net.xpc.CrossPageChannel.prototype.setPeerWindowObject = function(peerWindowObject) {
  this.peerWindowObject_ = peerWindowObject
};
goog.net.xpc.CrossPageChannel.prototype.determineTransportType_ = function() {
  var transportType;
  if(goog.isFunction(document.postMessage) || goog.isFunction(window.postMessage) || goog.userAgent.IE && window.postMessage) {
    transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING
  }else {
    if(goog.userAgent.GECKO) {
      transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD
    }else {
      if(goog.userAgent.IE && this.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI]) {
        transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY
      }else {
        if(goog.userAgent.IE) {
          transportType = goog.net.xpc.TransportTypes.NIX
        }else {
          if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI] && this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]) {
            transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING
          }
        }
      }
    }
  }
  return transportType
};
goog.net.xpc.CrossPageChannel.prototype.createTransport_ = function() {
  if(this.transport_) {
    return
  }
  if(!this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    this.cfg_[goog.net.xpc.CfgFields.TRANSPORT] = this.determineTransportType_()
  }
  switch(this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    case goog.net.xpc.TransportTypes.NATIVE_MESSAGING:
      this.transport_ = new goog.net.xpc.NativeMessagingTransport(this, this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME], this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.NIX:
      this.transport_ = new goog.net.xpc.NixTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD:
      this.transport_ = new goog.net.xpc.FrameElementMethodTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_RELAY:
      this.transport_ = new goog.net.xpc.IframeRelayTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_POLLING:
      this.transport_ = new goog.net.xpc.IframePollingTransport(this, this.domHelper_);
      break
  }
  if(this.transport_) {
    goog.net.xpc.logger.info("Transport created: " + this.transport_.getName())
  }else {
    throw Error("CrossPageChannel: No suitable transport found!");
  }
};
goog.net.xpc.CrossPageChannel.prototype.getTransportType = function() {
  return this.transport_.getType()
};
goog.net.xpc.CrossPageChannel.prototype.getTransportName = function() {
  return this.transport_.getName()
};
goog.net.xpc.CrossPageChannel.prototype.getPeerConfiguration = function() {
  var peerCfg = {};
  peerCfg[goog.net.xpc.CfgFields.CHANNEL_NAME] = this.name;
  peerCfg[goog.net.xpc.CfgFields.TRANSPORT] = this.cfg_[goog.net.xpc.CfgFields.TRANSPORT];
  if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_RELAY_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]
  }
  if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]
  }
  if(this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]
  }
  return peerCfg
};
goog.net.xpc.CrossPageChannel.prototype.createPeerIframe = function(parentElm, opt_configureIframeCb, opt_addCfgParam) {
  var iframeId = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  if(!iframeId) {
    iframeId = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID] = "xpcpeer" + goog.net.xpc.getRandomString(4)
  }
  var iframeElm = goog.dom.createElement("IFRAME");
  iframeElm.id = iframeElm.name = iframeId;
  if(opt_configureIframeCb) {
    opt_configureIframeCb(iframeElm)
  }else {
    iframeElm.style.width = iframeElm.style.height = "100%"
  }
  var peerUri = this.cfg_[goog.net.xpc.CfgFields.PEER_URI];
  if(goog.isString(peerUri)) {
    peerUri = this.cfg_[goog.net.xpc.CfgFields.PEER_URI] = new goog.Uri(peerUri)
  }
  if(opt_addCfgParam !== false) {
    peerUri.setParameterValue("xpc", goog.json.serialize(this.getPeerConfiguration()))
  }
  if(goog.userAgent.GECKO || goog.userAgent.WEBKIT) {
    this.deferConnect_ = true;
    window.setTimeout(goog.bind(function() {
      this.deferConnect_ = false;
      parentElm.appendChild(iframeElm);
      iframeElm.src = peerUri.toString();
      goog.net.xpc.logger.info("peer iframe created (" + iframeId + ")");
      if(this.connectDeferred_) {
        this.connect(this.connectCb_)
      }
    }, this), 1)
  }else {
    iframeElm.src = peerUri.toString();
    parentElm.appendChild(iframeElm);
    goog.net.xpc.logger.info("peer iframe created (" + iframeId + ")")
  }
  return iframeElm
};
goog.net.xpc.CrossPageChannel.prototype.deferConnect_ = false;
goog.net.xpc.CrossPageChannel.prototype.connectDeferred_ = false;
goog.net.xpc.CrossPageChannel.prototype.connect = function(opt_connectCb) {
  this.connectCb_ = opt_connectCb || goog.nullFunction;
  if(this.deferConnect_) {
    goog.net.xpc.logger.info("connect() deferred");
    this.connectDeferred_ = true;
    return
  }
  goog.net.xpc.logger.info("connect()");
  if(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]) {
    this.iframeElement_ = this.domHelper_.getElement(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID])
  }
  if(this.iframeElement_) {
    var winObj = this.iframeElement_.contentWindow;
    if(!winObj) {
      winObj = window.frames[this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]]
    }
    this.setPeerWindowObject(winObj)
  }
  if(!this.peerWindowObject_) {
    if(window == top) {
      throw Error("CrossPageChannel: Can't connect, peer window-object not set.");
    }else {
      this.setPeerWindowObject(window.parent)
    }
  }
  this.createTransport_();
  this.transport_.connect()
};
goog.net.xpc.CrossPageChannel.prototype.close = function() {
  if(!this.isConnected()) {
    return
  }
  this.state_ = goog.net.xpc.ChannelStates.CLOSED;
  this.transport_.dispose();
  this.transport_ = null;
  goog.net.xpc.logger.info('Channel "' + this.name + '" closed')
};
goog.net.xpc.CrossPageChannel.prototype.notifyConnected_ = function() {
  if(this.isConnected()) {
    return
  }
  this.state_ = goog.net.xpc.ChannelStates.CONNECTED;
  goog.net.xpc.logger.info('Channel "' + this.name + '" connected');
  this.connectCb_()
};
goog.net.xpc.CrossPageChannel.prototype.notifyTransportError_ = function() {
  goog.net.xpc.logger.info("Transport Error");
  this.close()
};
goog.net.xpc.CrossPageChannel.prototype.send = function(serviceName, payload) {
  if(!this.isConnected()) {
    goog.net.xpc.logger.severe("Can't send. Channel not connected.");
    return
  }
  if(this.peerWindowObject_.closed) {
    goog.net.xpc.logger.severe("Peer has disappeared.");
    this.close();
    return
  }
  if(goog.isObject(payload)) {
    payload = goog.json.serialize(payload)
  }
  this.transport_.send(this.escapeServiceName_(serviceName), payload)
};
goog.net.xpc.CrossPageChannel.prototype.deliver_ = function(serviceName, payload, opt_origin) {
  if(!this.isMessageOriginAcceptable_(opt_origin)) {
    goog.net.xpc.logger.warning('Message received from unapproved origin "' + opt_origin + '" - rejected.');
    return
  }
  if(this.isDisposed()) {
    goog.net.xpc.logger.warning("CrossPageChannel::deliver_(): Disposed.")
  }else {
    if(!serviceName || serviceName == goog.net.xpc.TRANSPORT_SERVICE_) {
      this.transport_.transportServiceHandler(payload)
    }else {
      if(this.isConnected()) {
        this.deliver(this.unescapeServiceName_(serviceName), payload)
      }else {
        goog.net.xpc.logger.info("CrossPageChannel::deliver_(): Not connected.")
      }
    }
  }
};
goog.net.xpc.CrossPageChannel.prototype.escapeServiceName_ = function(name) {
  if(goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_.test(name)) {
    name = "%" + name
  }
  return name.replace(/[%:|]/g, encodeURIComponent)
};
goog.net.xpc.CrossPageChannel.prototype.unescapeServiceName_ = function(name) {
  name = name.replace(/%[0-9a-f]{2}/gi, decodeURIComponent);
  if(goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_.test(name)) {
    return name.substring(1)
  }else {
    return name
  }
};
goog.net.xpc.CrossPageChannel.Role = {OUTER:0, INNER:1};
goog.net.xpc.CrossPageChannel.prototype.getRole = function() {
  return window.parent == this.peerWindowObject_ ? goog.net.xpc.CrossPageChannel.Role.INNER : goog.net.xpc.CrossPageChannel.Role.OUTER
};
goog.net.xpc.CrossPageChannel.prototype.isMessageOriginAcceptable_ = function(opt_origin) {
  var peerHostname = this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME];
  return goog.string.isEmptySafe(opt_origin) || goog.string.isEmptySafe(peerHostname) || opt_origin == this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME]
};
goog.net.xpc.CrossPageChannel.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  this.close();
  this.peerWindowObject_ = null;
  this.iframeElement_ = null;
  delete goog.net.xpc.channels_[this.name]
};
goog.net.xpc.CrossPageChannel.disposeAll_ = function() {
  for(var name in goog.net.xpc.channels_) {
    var ch = goog.net.xpc.channels_[name];
    if(ch) {
      ch.dispose()
    }
  }
};
goog.provide("cljs.core");
goog.require("goog.string");
goog.require("goog.string.StringBuffer");
goog.require("goog.object");
goog.require("goog.array");
cljs.core._STAR_print_fn_STAR_ = function _STAR_print_fn_STAR_(_) {
  throw new Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function truth_(x) {
  return x != null && x !== false
};
cljs.core.type_satisfies_ = function type_satisfies_(p, x) {
  var or__3548__auto____2838 = p[goog.typeOf.call(null, x)];
  if(cljs.core.truth_(or__3548__auto____2838)) {
    return or__3548__auto____2838
  }else {
    var or__3548__auto____2839 = p["_"];
    if(cljs.core.truth_(or__3548__auto____2839)) {
      return or__3548__auto____2839
    }else {
      return false
    }
  }
};
cljs.core.is_proto_ = function is_proto_(x) {
  return x.constructor.prototype === x
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function missing_protocol(proto, obj) {
  return Error.call(null, "No protocol method " + proto + " defined for type " + goog.typeOf.call(null, obj) + ": " + obj)
};
cljs.core.aclone = function aclone(array_like) {
  return Array.prototype.slice.call(array_like)
};
cljs.core.array = function array(var_args) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.aget = function aget(array, i) {
  return array[i]
};
cljs.core.aset = function aset(array, i, val) {
  return array[i] = val
};
cljs.core.alength = function alength(array) {
  return array.length
};
cljs.core.ICounted = {};
cljs.core._count = function _count(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2840 = coll;
    if(cljs.core.truth_(and__3546__auto____2840)) {
      return coll.cljs$core$ICounted$_count
    }else {
      return and__3546__auto____2840
    }
  }())) {
    return coll.cljs$core$ICounted$_count(coll)
  }else {
    return function() {
      var or__3548__auto____2841 = cljs.core._count[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2841)) {
        return or__3548__auto____2841
      }else {
        var or__3548__auto____2842 = cljs.core._count["_"];
        if(cljs.core.truth_(or__3548__auto____2842)) {
          return or__3548__auto____2842
        }else {
          throw cljs.core.missing_protocol.call(null, "ICounted.-count", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function _empty(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2843 = coll;
    if(cljs.core.truth_(and__3546__auto____2843)) {
      return coll.cljs$core$IEmptyableCollection$_empty
    }else {
      return and__3546__auto____2843
    }
  }())) {
    return coll.cljs$core$IEmptyableCollection$_empty(coll)
  }else {
    return function() {
      var or__3548__auto____2844 = cljs.core._empty[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2844)) {
        return or__3548__auto____2844
      }else {
        var or__3548__auto____2845 = cljs.core._empty["_"];
        if(cljs.core.truth_(or__3548__auto____2845)) {
          return or__3548__auto____2845
        }else {
          throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ICollection = {};
cljs.core._conj = function _conj(coll, o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2846 = coll;
    if(cljs.core.truth_(and__3546__auto____2846)) {
      return coll.cljs$core$ICollection$_conj
    }else {
      return and__3546__auto____2846
    }
  }())) {
    return coll.cljs$core$ICollection$_conj(coll, o)
  }else {
    return function() {
      var or__3548__auto____2847 = cljs.core._conj[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2847)) {
        return or__3548__auto____2847
      }else {
        var or__3548__auto____2848 = cljs.core._conj["_"];
        if(cljs.core.truth_(or__3548__auto____2848)) {
          return or__3548__auto____2848
        }else {
          throw cljs.core.missing_protocol.call(null, "ICollection.-conj", coll);
        }
      }
    }().call(null, coll, o)
  }
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var _nth = null;
  var _nth__2855 = function(coll, n) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____2849 = coll;
      if(cljs.core.truth_(and__3546__auto____2849)) {
        return coll.cljs$core$IIndexed$_nth
      }else {
        return and__3546__auto____2849
      }
    }())) {
      return coll.cljs$core$IIndexed$_nth(coll, n)
    }else {
      return function() {
        var or__3548__auto____2850 = cljs.core._nth[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____2850)) {
          return or__3548__auto____2850
        }else {
          var or__3548__auto____2851 = cljs.core._nth["_"];
          if(cljs.core.truth_(or__3548__auto____2851)) {
            return or__3548__auto____2851
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n)
    }
  };
  var _nth__2856 = function(coll, n, not_found) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____2852 = coll;
      if(cljs.core.truth_(and__3546__auto____2852)) {
        return coll.cljs$core$IIndexed$_nth
      }else {
        return and__3546__auto____2852
      }
    }())) {
      return coll.cljs$core$IIndexed$_nth(coll, n, not_found)
    }else {
      return function() {
        var or__3548__auto____2853 = cljs.core._nth[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____2853)) {
          return or__3548__auto____2853
        }else {
          var or__3548__auto____2854 = cljs.core._nth["_"];
          if(cljs.core.truth_(or__3548__auto____2854)) {
            return or__3548__auto____2854
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n, not_found)
    }
  };
  _nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return _nth__2855.call(this, coll, n);
      case 3:
        return _nth__2856.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _nth
}();
cljs.core.ISeq = {};
cljs.core._first = function _first(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2858 = coll;
    if(cljs.core.truth_(and__3546__auto____2858)) {
      return coll.cljs$core$ISeq$_first
    }else {
      return and__3546__auto____2858
    }
  }())) {
    return coll.cljs$core$ISeq$_first(coll)
  }else {
    return function() {
      var or__3548__auto____2859 = cljs.core._first[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2859)) {
        return or__3548__auto____2859
      }else {
        var or__3548__auto____2860 = cljs.core._first["_"];
        if(cljs.core.truth_(or__3548__auto____2860)) {
          return or__3548__auto____2860
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._rest = function _rest(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2861 = coll;
    if(cljs.core.truth_(and__3546__auto____2861)) {
      return coll.cljs$core$ISeq$_rest
    }else {
      return and__3546__auto____2861
    }
  }())) {
    return coll.cljs$core$ISeq$_rest(coll)
  }else {
    return function() {
      var or__3548__auto____2862 = cljs.core._rest[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2862)) {
        return or__3548__auto____2862
      }else {
        var or__3548__auto____2863 = cljs.core._rest["_"];
        if(cljs.core.truth_(or__3548__auto____2863)) {
          return or__3548__auto____2863
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var _lookup = null;
  var _lookup__2870 = function(o, k) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____2864 = o;
      if(cljs.core.truth_(and__3546__auto____2864)) {
        return o.cljs$core$ILookup$_lookup
      }else {
        return and__3546__auto____2864
      }
    }())) {
      return o.cljs$core$ILookup$_lookup(o, k)
    }else {
      return function() {
        var or__3548__auto____2865 = cljs.core._lookup[goog.typeOf.call(null, o)];
        if(cljs.core.truth_(or__3548__auto____2865)) {
          return or__3548__auto____2865
        }else {
          var or__3548__auto____2866 = cljs.core._lookup["_"];
          if(cljs.core.truth_(or__3548__auto____2866)) {
            return or__3548__auto____2866
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k)
    }
  };
  var _lookup__2871 = function(o, k, not_found) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____2867 = o;
      if(cljs.core.truth_(and__3546__auto____2867)) {
        return o.cljs$core$ILookup$_lookup
      }else {
        return and__3546__auto____2867
      }
    }())) {
      return o.cljs$core$ILookup$_lookup(o, k, not_found)
    }else {
      return function() {
        var or__3548__auto____2868 = cljs.core._lookup[goog.typeOf.call(null, o)];
        if(cljs.core.truth_(or__3548__auto____2868)) {
          return or__3548__auto____2868
        }else {
          var or__3548__auto____2869 = cljs.core._lookup["_"];
          if(cljs.core.truth_(or__3548__auto____2869)) {
            return or__3548__auto____2869
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k, not_found)
    }
  };
  _lookup = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return _lookup__2870.call(this, o, k);
      case 3:
        return _lookup__2871.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _lookup
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function _contains_key_QMARK_(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2873 = coll;
    if(cljs.core.truth_(and__3546__auto____2873)) {
      return coll.cljs$core$IAssociative$_contains_key_QMARK_
    }else {
      return and__3546__auto____2873
    }
  }())) {
    return coll.cljs$core$IAssociative$_contains_key_QMARK_(coll, k)
  }else {
    return function() {
      var or__3548__auto____2874 = cljs.core._contains_key_QMARK_[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2874)) {
        return or__3548__auto____2874
      }else {
        var or__3548__auto____2875 = cljs.core._contains_key_QMARK_["_"];
        if(cljs.core.truth_(or__3548__auto____2875)) {
          return or__3548__auto____2875
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core._assoc = function _assoc(coll, k, v) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2876 = coll;
    if(cljs.core.truth_(and__3546__auto____2876)) {
      return coll.cljs$core$IAssociative$_assoc
    }else {
      return and__3546__auto____2876
    }
  }())) {
    return coll.cljs$core$IAssociative$_assoc(coll, k, v)
  }else {
    return function() {
      var or__3548__auto____2877 = cljs.core._assoc[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2877)) {
        return or__3548__auto____2877
      }else {
        var or__3548__auto____2878 = cljs.core._assoc["_"];
        if(cljs.core.truth_(or__3548__auto____2878)) {
          return or__3548__auto____2878
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", coll);
        }
      }
    }().call(null, coll, k, v)
  }
};
cljs.core.IMap = {};
cljs.core._dissoc = function _dissoc(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2879 = coll;
    if(cljs.core.truth_(and__3546__auto____2879)) {
      return coll.cljs$core$IMap$_dissoc
    }else {
      return and__3546__auto____2879
    }
  }())) {
    return coll.cljs$core$IMap$_dissoc(coll, k)
  }else {
    return function() {
      var or__3548__auto____2880 = cljs.core._dissoc[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2880)) {
        return or__3548__auto____2880
      }else {
        var or__3548__auto____2881 = cljs.core._dissoc["_"];
        if(cljs.core.truth_(or__3548__auto____2881)) {
          return or__3548__auto____2881
        }else {
          throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core.ISet = {};
cljs.core._disjoin = function _disjoin(coll, v) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2882 = coll;
    if(cljs.core.truth_(and__3546__auto____2882)) {
      return coll.cljs$core$ISet$_disjoin
    }else {
      return and__3546__auto____2882
    }
  }())) {
    return coll.cljs$core$ISet$_disjoin(coll, v)
  }else {
    return function() {
      var or__3548__auto____2883 = cljs.core._disjoin[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2883)) {
        return or__3548__auto____2883
      }else {
        var or__3548__auto____2884 = cljs.core._disjoin["_"];
        if(cljs.core.truth_(or__3548__auto____2884)) {
          return or__3548__auto____2884
        }else {
          throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", coll);
        }
      }
    }().call(null, coll, v)
  }
};
cljs.core.IStack = {};
cljs.core._peek = function _peek(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2885 = coll;
    if(cljs.core.truth_(and__3546__auto____2885)) {
      return coll.cljs$core$IStack$_peek
    }else {
      return and__3546__auto____2885
    }
  }())) {
    return coll.cljs$core$IStack$_peek(coll)
  }else {
    return function() {
      var or__3548__auto____2886 = cljs.core._peek[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2886)) {
        return or__3548__auto____2886
      }else {
        var or__3548__auto____2887 = cljs.core._peek["_"];
        if(cljs.core.truth_(or__3548__auto____2887)) {
          return or__3548__auto____2887
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-peek", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._pop = function _pop(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2888 = coll;
    if(cljs.core.truth_(and__3546__auto____2888)) {
      return coll.cljs$core$IStack$_pop
    }else {
      return and__3546__auto____2888
    }
  }())) {
    return coll.cljs$core$IStack$_pop(coll)
  }else {
    return function() {
      var or__3548__auto____2889 = cljs.core._pop[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2889)) {
        return or__3548__auto____2889
      }else {
        var or__3548__auto____2890 = cljs.core._pop["_"];
        if(cljs.core.truth_(or__3548__auto____2890)) {
          return or__3548__auto____2890
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-pop", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IVector = {};
cljs.core._assoc_n = function _assoc_n(coll, n, val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2891 = coll;
    if(cljs.core.truth_(and__3546__auto____2891)) {
      return coll.cljs$core$IVector$_assoc_n
    }else {
      return and__3546__auto____2891
    }
  }())) {
    return coll.cljs$core$IVector$_assoc_n(coll, n, val)
  }else {
    return function() {
      var or__3548__auto____2892 = cljs.core._assoc_n[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____2892)) {
        return or__3548__auto____2892
      }else {
        var or__3548__auto____2893 = cljs.core._assoc_n["_"];
        if(cljs.core.truth_(or__3548__auto____2893)) {
          return or__3548__auto____2893
        }else {
          throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", coll);
        }
      }
    }().call(null, coll, n, val)
  }
};
cljs.core.IDeref = {};
cljs.core._deref = function _deref(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2894 = o;
    if(cljs.core.truth_(and__3546__auto____2894)) {
      return o.cljs$core$IDeref$_deref
    }else {
      return and__3546__auto____2894
    }
  }())) {
    return o.cljs$core$IDeref$_deref(o)
  }else {
    return function() {
      var or__3548__auto____2895 = cljs.core._deref[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2895)) {
        return or__3548__auto____2895
      }else {
        var or__3548__auto____2896 = cljs.core._deref["_"];
        if(cljs.core.truth_(or__3548__auto____2896)) {
          return or__3548__auto____2896
        }else {
          throw cljs.core.missing_protocol.call(null, "IDeref.-deref", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function _deref_with_timeout(o, msec, timeout_val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2897 = o;
    if(cljs.core.truth_(and__3546__auto____2897)) {
      return o.cljs$core$IDerefWithTimeout$_deref_with_timeout
    }else {
      return and__3546__auto____2897
    }
  }())) {
    return o.cljs$core$IDerefWithTimeout$_deref_with_timeout(o, msec, timeout_val)
  }else {
    return function() {
      var or__3548__auto____2898 = cljs.core._deref_with_timeout[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2898)) {
        return or__3548__auto____2898
      }else {
        var or__3548__auto____2899 = cljs.core._deref_with_timeout["_"];
        if(cljs.core.truth_(or__3548__auto____2899)) {
          return or__3548__auto____2899
        }else {
          throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", o);
        }
      }
    }().call(null, o, msec, timeout_val)
  }
};
cljs.core.IMeta = {};
cljs.core._meta = function _meta(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2900 = o;
    if(cljs.core.truth_(and__3546__auto____2900)) {
      return o.cljs$core$IMeta$_meta
    }else {
      return and__3546__auto____2900
    }
  }())) {
    return o.cljs$core$IMeta$_meta(o)
  }else {
    return function() {
      var or__3548__auto____2901 = cljs.core._meta[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2901)) {
        return or__3548__auto____2901
      }else {
        var or__3548__auto____2902 = cljs.core._meta["_"];
        if(cljs.core.truth_(or__3548__auto____2902)) {
          return or__3548__auto____2902
        }else {
          throw cljs.core.missing_protocol.call(null, "IMeta.-meta", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function _with_meta(o, meta) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2903 = o;
    if(cljs.core.truth_(and__3546__auto____2903)) {
      return o.cljs$core$IWithMeta$_with_meta
    }else {
      return and__3546__auto____2903
    }
  }())) {
    return o.cljs$core$IWithMeta$_with_meta(o, meta)
  }else {
    return function() {
      var or__3548__auto____2904 = cljs.core._with_meta[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2904)) {
        return or__3548__auto____2904
      }else {
        var or__3548__auto____2905 = cljs.core._with_meta["_"];
        if(cljs.core.truth_(or__3548__auto____2905)) {
          return or__3548__auto____2905
        }else {
          throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", o);
        }
      }
    }().call(null, o, meta)
  }
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var _reduce = null;
  var _reduce__2912 = function(coll, f) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____2906 = coll;
      if(cljs.core.truth_(and__3546__auto____2906)) {
        return coll.cljs$core$IReduce$_reduce
      }else {
        return and__3546__auto____2906
      }
    }())) {
      return coll.cljs$core$IReduce$_reduce(coll, f)
    }else {
      return function() {
        var or__3548__auto____2907 = cljs.core._reduce[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____2907)) {
          return or__3548__auto____2907
        }else {
          var or__3548__auto____2908 = cljs.core._reduce["_"];
          if(cljs.core.truth_(or__3548__auto____2908)) {
            return or__3548__auto____2908
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f)
    }
  };
  var _reduce__2913 = function(coll, f, start) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____2909 = coll;
      if(cljs.core.truth_(and__3546__auto____2909)) {
        return coll.cljs$core$IReduce$_reduce
      }else {
        return and__3546__auto____2909
      }
    }())) {
      return coll.cljs$core$IReduce$_reduce(coll, f, start)
    }else {
      return function() {
        var or__3548__auto____2910 = cljs.core._reduce[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____2910)) {
          return or__3548__auto____2910
        }else {
          var or__3548__auto____2911 = cljs.core._reduce["_"];
          if(cljs.core.truth_(or__3548__auto____2911)) {
            return or__3548__auto____2911
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f, start)
    }
  };
  _reduce = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return _reduce__2912.call(this, coll, f);
      case 3:
        return _reduce__2913.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _reduce
}();
cljs.core.IEquiv = {};
cljs.core._equiv = function _equiv(o, other) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2915 = o;
    if(cljs.core.truth_(and__3546__auto____2915)) {
      return o.cljs$core$IEquiv$_equiv
    }else {
      return and__3546__auto____2915
    }
  }())) {
    return o.cljs$core$IEquiv$_equiv(o, other)
  }else {
    return function() {
      var or__3548__auto____2916 = cljs.core._equiv[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2916)) {
        return or__3548__auto____2916
      }else {
        var or__3548__auto____2917 = cljs.core._equiv["_"];
        if(cljs.core.truth_(or__3548__auto____2917)) {
          return or__3548__auto____2917
        }else {
          throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", o);
        }
      }
    }().call(null, o, other)
  }
};
cljs.core.IHash = {};
cljs.core._hash = function _hash(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2918 = o;
    if(cljs.core.truth_(and__3546__auto____2918)) {
      return o.cljs$core$IHash$_hash
    }else {
      return and__3546__auto____2918
    }
  }())) {
    return o.cljs$core$IHash$_hash(o)
  }else {
    return function() {
      var or__3548__auto____2919 = cljs.core._hash[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2919)) {
        return or__3548__auto____2919
      }else {
        var or__3548__auto____2920 = cljs.core._hash["_"];
        if(cljs.core.truth_(or__3548__auto____2920)) {
          return or__3548__auto____2920
        }else {
          throw cljs.core.missing_protocol.call(null, "IHash.-hash", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISeqable = {};
cljs.core._seq = function _seq(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2921 = o;
    if(cljs.core.truth_(and__3546__auto____2921)) {
      return o.cljs$core$ISeqable$_seq
    }else {
      return and__3546__auto____2921
    }
  }())) {
    return o.cljs$core$ISeqable$_seq(o)
  }else {
    return function() {
      var or__3548__auto____2922 = cljs.core._seq[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2922)) {
        return or__3548__auto____2922
      }else {
        var or__3548__auto____2923 = cljs.core._seq["_"];
        if(cljs.core.truth_(or__3548__auto____2923)) {
          return or__3548__auto____2923
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function _pr_seq(o, opts) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2924 = o;
    if(cljs.core.truth_(and__3546__auto____2924)) {
      return o.cljs$core$IPrintable$_pr_seq
    }else {
      return and__3546__auto____2924
    }
  }())) {
    return o.cljs$core$IPrintable$_pr_seq(o, opts)
  }else {
    return function() {
      var or__3548__auto____2925 = cljs.core._pr_seq[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____2925)) {
        return or__3548__auto____2925
      }else {
        var or__3548__auto____2926 = cljs.core._pr_seq["_"];
        if(cljs.core.truth_(or__3548__auto____2926)) {
          return or__3548__auto____2926
        }else {
          throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", o);
        }
      }
    }().call(null, o, opts)
  }
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function _realized_QMARK_(d) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2927 = d;
    if(cljs.core.truth_(and__3546__auto____2927)) {
      return d.cljs$core$IPending$_realized_QMARK_
    }else {
      return and__3546__auto____2927
    }
  }())) {
    return d.cljs$core$IPending$_realized_QMARK_(d)
  }else {
    return function() {
      var or__3548__auto____2928 = cljs.core._realized_QMARK_[goog.typeOf.call(null, d)];
      if(cljs.core.truth_(or__3548__auto____2928)) {
        return or__3548__auto____2928
      }else {
        var or__3548__auto____2929 = cljs.core._realized_QMARK_["_"];
        if(cljs.core.truth_(or__3548__auto____2929)) {
          return or__3548__auto____2929
        }else {
          throw cljs.core.missing_protocol.call(null, "IPending.-realized?", d);
        }
      }
    }().call(null, d)
  }
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function _notify_watches(this$, oldval, newval) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2930 = this$;
    if(cljs.core.truth_(and__3546__auto____2930)) {
      return this$.cljs$core$IWatchable$_notify_watches
    }else {
      return and__3546__auto____2930
    }
  }())) {
    return this$.cljs$core$IWatchable$_notify_watches(this$, oldval, newval)
  }else {
    return function() {
      var or__3548__auto____2931 = cljs.core._notify_watches[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____2931)) {
        return or__3548__auto____2931
      }else {
        var or__3548__auto____2932 = cljs.core._notify_watches["_"];
        if(cljs.core.truth_(or__3548__auto____2932)) {
          return or__3548__auto____2932
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", this$);
        }
      }
    }().call(null, this$, oldval, newval)
  }
};
cljs.core._add_watch = function _add_watch(this$, key, f) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2933 = this$;
    if(cljs.core.truth_(and__3546__auto____2933)) {
      return this$.cljs$core$IWatchable$_add_watch
    }else {
      return and__3546__auto____2933
    }
  }())) {
    return this$.cljs$core$IWatchable$_add_watch(this$, key, f)
  }else {
    return function() {
      var or__3548__auto____2934 = cljs.core._add_watch[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____2934)) {
        return or__3548__auto____2934
      }else {
        var or__3548__auto____2935 = cljs.core._add_watch["_"];
        if(cljs.core.truth_(or__3548__auto____2935)) {
          return or__3548__auto____2935
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", this$);
        }
      }
    }().call(null, this$, key, f)
  }
};
cljs.core._remove_watch = function _remove_watch(this$, key) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____2936 = this$;
    if(cljs.core.truth_(and__3546__auto____2936)) {
      return this$.cljs$core$IWatchable$_remove_watch
    }else {
      return and__3546__auto____2936
    }
  }())) {
    return this$.cljs$core$IWatchable$_remove_watch(this$, key)
  }else {
    return function() {
      var or__3548__auto____2937 = cljs.core._remove_watch[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____2937)) {
        return or__3548__auto____2937
      }else {
        var or__3548__auto____2938 = cljs.core._remove_watch["_"];
        if(cljs.core.truth_(or__3548__auto____2938)) {
          return or__3548__auto____2938
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", this$);
        }
      }
    }().call(null, this$, key)
  }
};
cljs.core.identical_QMARK_ = function identical_QMARK_(x, y) {
  return x === y
};
cljs.core._EQ_ = function _EQ_(x, y) {
  return cljs.core._equiv.call(null, x, y)
};
cljs.core.nil_QMARK_ = function nil_QMARK_(x) {
  return x === null
};
cljs.core.IHash["null"] = true;
cljs.core._hash["null"] = function(o) {
  return 0
};
cljs.core.ILookup["null"] = true;
cljs.core._lookup["null"] = function() {
  var G__2939 = null;
  var G__2939__2940 = function(o, k) {
    return null
  };
  var G__2939__2941 = function(o, k, not_found) {
    return not_found
  };
  G__2939 = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__2939__2940.call(this, o, k);
      case 3:
        return G__2939__2941.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2939
}();
cljs.core.IAssociative["null"] = true;
cljs.core._assoc["null"] = function(_, k, v) {
  return cljs.core.hash_map.call(null, k, v)
};
cljs.core.ICollection["null"] = true;
cljs.core._conj["null"] = function(_, o) {
  return cljs.core.list.call(null, o)
};
cljs.core.IReduce["null"] = true;
cljs.core._reduce["null"] = function() {
  var G__2943 = null;
  var G__2943__2944 = function(_, f) {
    return f.call(null)
  };
  var G__2943__2945 = function(_, f, start) {
    return start
  };
  G__2943 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__2943__2944.call(this, _, f);
      case 3:
        return G__2943__2945.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2943
}();
cljs.core.IPrintable["null"] = true;
cljs.core._pr_seq["null"] = function(o) {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = true;
cljs.core._disjoin["null"] = function(_, v) {
  return null
};
cljs.core.ICounted["null"] = true;
cljs.core._count["null"] = function(_) {
  return 0
};
cljs.core.IStack["null"] = true;
cljs.core._peek["null"] = function(_) {
  return null
};
cljs.core._pop["null"] = function(_) {
  return null
};
cljs.core.ISeq["null"] = true;
cljs.core._first["null"] = function(_) {
  return null
};
cljs.core._rest["null"] = function(_) {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = true;
cljs.core._equiv["null"] = function(_, o) {
  return cljs.core.nil_QMARK_.call(null, o)
};
cljs.core.IWithMeta["null"] = true;
cljs.core._with_meta["null"] = function(_, meta) {
  return null
};
cljs.core.IMeta["null"] = true;
cljs.core._meta["null"] = function(_) {
  return null
};
cljs.core.IIndexed["null"] = true;
cljs.core._nth["null"] = function() {
  var G__2947 = null;
  var G__2947__2948 = function(_, n) {
    return null
  };
  var G__2947__2949 = function(_, n, not_found) {
    return not_found
  };
  G__2947 = function(_, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__2947__2948.call(this, _, n);
      case 3:
        return G__2947__2949.call(this, _, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2947
}();
cljs.core.IEmptyableCollection["null"] = true;
cljs.core._empty["null"] = function(_) {
  return null
};
cljs.core.IMap["null"] = true;
cljs.core._dissoc["null"] = function(_, k) {
  return null
};
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv = function(o, other) {
  return o.toString() === other.toString()
};
cljs.core.IHash["number"] = true;
cljs.core._hash["number"] = function(o) {
  return o
};
cljs.core.IEquiv["number"] = true;
cljs.core._equiv["number"] = function(x, o) {
  return x === o
};
cljs.core.IHash["boolean"] = true;
cljs.core._hash["boolean"] = function(o) {
  return o === true ? 1 : 0
};
cljs.core.IHash["function"] = true;
cljs.core._hash["function"] = function(o) {
  return goog.getUid.call(null, o)
};
cljs.core.inc = function inc(x) {
  return x + 1
};
cljs.core.ci_reduce = function() {
  var ci_reduce = null;
  var ci_reduce__2957 = function(cicoll, f) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, cljs.core._count.call(null, cicoll)))) {
      return f.call(null)
    }else {
      var val__2951 = cljs.core._nth.call(null, cicoll, 0);
      var n__2952 = 1;
      while(true) {
        if(cljs.core.truth_(n__2952 < cljs.core._count.call(null, cicoll))) {
          var G__2961 = f.call(null, val__2951, cljs.core._nth.call(null, cicoll, n__2952));
          var G__2962 = n__2952 + 1;
          val__2951 = G__2961;
          n__2952 = G__2962;
          continue
        }else {
          return val__2951
        }
        break
      }
    }
  };
  var ci_reduce__2958 = function(cicoll, f, val) {
    var val__2953 = val;
    var n__2954 = 0;
    while(true) {
      if(cljs.core.truth_(n__2954 < cljs.core._count.call(null, cicoll))) {
        var G__2963 = f.call(null, val__2953, cljs.core._nth.call(null, cicoll, n__2954));
        var G__2964 = n__2954 + 1;
        val__2953 = G__2963;
        n__2954 = G__2964;
        continue
      }else {
        return val__2953
      }
      break
    }
  };
  var ci_reduce__2959 = function(cicoll, f, val, idx) {
    var val__2955 = val;
    var n__2956 = idx;
    while(true) {
      if(cljs.core.truth_(n__2956 < cljs.core._count.call(null, cicoll))) {
        var G__2965 = f.call(null, val__2955, cljs.core._nth.call(null, cicoll, n__2956));
        var G__2966 = n__2956 + 1;
        val__2955 = G__2965;
        n__2956 = G__2966;
        continue
      }else {
        return val__2955
      }
      break
    }
  };
  ci_reduce = function(cicoll, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return ci_reduce__2957.call(this, cicoll, f);
      case 3:
        return ci_reduce__2958.call(this, cicoll, f, val);
      case 4:
        return ci_reduce__2959.call(this, cicoll, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return ci_reduce
}();
cljs.core.IndexedSeq = function(a, i) {
  this.a = a;
  this.i = i
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__2967 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = function() {
  var G__2980 = null;
  var G__2980__2981 = function(coll, f) {
    var this__2968 = this;
    return cljs.core.ci_reduce.call(null, coll, f, this__2968.a[this__2968.i], this__2968.i + 1)
  };
  var G__2980__2982 = function(coll, f, start) {
    var this__2969 = this;
    return cljs.core.ci_reduce.call(null, coll, f, start, this__2969.i)
  };
  G__2980 = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return G__2980__2981.call(this, coll, f);
      case 3:
        return G__2980__2982.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2980
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__2970 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__2971 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = function() {
  var G__2984 = null;
  var G__2984__2985 = function(coll, n) {
    var this__2972 = this;
    var i__2973 = n + this__2972.i;
    if(cljs.core.truth_(i__2973 < this__2972.a.length)) {
      return this__2972.a[i__2973]
    }else {
      return null
    }
  };
  var G__2984__2986 = function(coll, n, not_found) {
    var this__2974 = this;
    var i__2975 = n + this__2974.i;
    if(cljs.core.truth_(i__2975 < this__2974.a.length)) {
      return this__2974.a[i__2975]
    }else {
      return not_found
    }
  };
  G__2984 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__2984__2985.call(this, coll, n);
      case 3:
        return G__2984__2986.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2984
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = function(_) {
  var this__2976 = this;
  return this__2976.a.length - this__2976.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = function(_) {
  var this__2977 = this;
  return this__2977.a[this__2977.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = function(_) {
  var this__2978 = this;
  if(cljs.core.truth_(this__2978.i + 1 < this__2978.a.length)) {
    return new cljs.core.IndexedSeq(this__2978.a, this__2978.i + 1)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = function(this$) {
  var this__2979 = this;
  return this$
};
cljs.core.prim_seq = function prim_seq(prim, i) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, prim.length))) {
    return null
  }else {
    return new cljs.core.IndexedSeq(prim, i)
  }
};
cljs.core.array_seq = function array_seq(array, i) {
  return cljs.core.prim_seq.call(null, array, i)
};
cljs.core.IReduce["array"] = true;
cljs.core._reduce["array"] = function() {
  var G__2988 = null;
  var G__2988__2989 = function(array, f) {
    return cljs.core.ci_reduce.call(null, array, f)
  };
  var G__2988__2990 = function(array, f, start) {
    return cljs.core.ci_reduce.call(null, array, f, start)
  };
  G__2988 = function(array, f, start) {
    switch(arguments.length) {
      case 2:
        return G__2988__2989.call(this, array, f);
      case 3:
        return G__2988__2990.call(this, array, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2988
}();
cljs.core.ILookup["array"] = true;
cljs.core._lookup["array"] = function() {
  var G__2992 = null;
  var G__2992__2993 = function(array, k) {
    return array[k]
  };
  var G__2992__2994 = function(array, k, not_found) {
    return cljs.core._nth.call(null, array, k, not_found)
  };
  G__2992 = function(array, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__2992__2993.call(this, array, k);
      case 3:
        return G__2992__2994.call(this, array, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2992
}();
cljs.core.IIndexed["array"] = true;
cljs.core._nth["array"] = function() {
  var G__2996 = null;
  var G__2996__2997 = function(array, n) {
    if(cljs.core.truth_(n < array.length)) {
      return array[n]
    }else {
      return null
    }
  };
  var G__2996__2998 = function(array, n, not_found) {
    if(cljs.core.truth_(n < array.length)) {
      return array[n]
    }else {
      return not_found
    }
  };
  G__2996 = function(array, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__2996__2997.call(this, array, n);
      case 3:
        return G__2996__2998.call(this, array, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__2996
}();
cljs.core.ICounted["array"] = true;
cljs.core._count["array"] = function(a) {
  return a.length
};
cljs.core.ISeqable["array"] = true;
cljs.core._seq["array"] = function(array) {
  return cljs.core.array_seq.call(null, array, 0)
};
cljs.core.seq = function seq(coll) {
  if(cljs.core.truth_(coll)) {
    return cljs.core._seq.call(null, coll)
  }else {
    return null
  }
};
cljs.core.first = function first(coll) {
  var temp__3698__auto____3000 = cljs.core.seq.call(null, coll);
  if(cljs.core.truth_(temp__3698__auto____3000)) {
    var s__3001 = temp__3698__auto____3000;
    return cljs.core._first.call(null, s__3001)
  }else {
    return null
  }
};
cljs.core.rest = function rest(coll) {
  return cljs.core._rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.next = function next(coll) {
  if(cljs.core.truth_(coll)) {
    return cljs.core.seq.call(null, cljs.core.rest.call(null, coll))
  }else {
    return null
  }
};
cljs.core.second = function second(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.ffirst = function ffirst(coll) {
  return cljs.core.first.call(null, cljs.core.first.call(null, coll))
};
cljs.core.nfirst = function nfirst(coll) {
  return cljs.core.next.call(null, cljs.core.first.call(null, coll))
};
cljs.core.fnext = function fnext(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.nnext = function nnext(coll) {
  return cljs.core.next.call(null, cljs.core.next.call(null, coll))
};
cljs.core.last = function last(s) {
  while(true) {
    if(cljs.core.truth_(cljs.core.next.call(null, s))) {
      var G__3002 = cljs.core.next.call(null, s);
      s = G__3002;
      continue
    }else {
      return cljs.core.first.call(null, s)
    }
    break
  }
};
cljs.core.ICounted["_"] = true;
cljs.core._count["_"] = function(x) {
  var s__3003 = cljs.core.seq.call(null, x);
  var n__3004 = 0;
  while(true) {
    if(cljs.core.truth_(s__3003)) {
      var G__3005 = cljs.core.next.call(null, s__3003);
      var G__3006 = n__3004 + 1;
      s__3003 = G__3005;
      n__3004 = G__3006;
      continue
    }else {
      return n__3004
    }
    break
  }
};
cljs.core.IEquiv["_"] = true;
cljs.core._equiv["_"] = function(x, o) {
  return x === o
};
cljs.core.not = function not(x) {
  if(cljs.core.truth_(x)) {
    return false
  }else {
    return true
  }
};
cljs.core.conj = function() {
  var conj = null;
  var conj__3007 = function(coll, x) {
    return cljs.core._conj.call(null, coll, x)
  };
  var conj__3008 = function() {
    var G__3010__delegate = function(coll, x, xs) {
      while(true) {
        if(cljs.core.truth_(xs)) {
          var G__3011 = conj.call(null, coll, x);
          var G__3012 = cljs.core.first.call(null, xs);
          var G__3013 = cljs.core.next.call(null, xs);
          coll = G__3011;
          x = G__3012;
          xs = G__3013;
          continue
        }else {
          return conj.call(null, coll, x)
        }
        break
      }
    };
    var G__3010 = function(coll, x, var_args) {
      var xs = null;
      if(goog.isDef(var_args)) {
        xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3010__delegate.call(this, coll, x, xs)
    };
    G__3010.cljs$lang$maxFixedArity = 2;
    G__3010.cljs$lang$applyTo = function(arglist__3014) {
      var coll = cljs.core.first(arglist__3014);
      var x = cljs.core.first(cljs.core.next(arglist__3014));
      var xs = cljs.core.rest(cljs.core.next(arglist__3014));
      return G__3010__delegate.call(this, coll, x, xs)
    };
    return G__3010
  }();
  conj = function(coll, x, var_args) {
    var xs = var_args;
    switch(arguments.length) {
      case 2:
        return conj__3007.call(this, coll, x);
      default:
        return conj__3008.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  conj.cljs$lang$maxFixedArity = 2;
  conj.cljs$lang$applyTo = conj__3008.cljs$lang$applyTo;
  return conj
}();
cljs.core.empty = function empty(coll) {
  return cljs.core._empty.call(null, coll)
};
cljs.core.count = function count(coll) {
  return cljs.core._count.call(null, coll)
};
cljs.core.nth = function() {
  var nth = null;
  var nth__3015 = function(coll, n) {
    return cljs.core._nth.call(null, coll, Math.floor(n))
  };
  var nth__3016 = function(coll, n, not_found) {
    return cljs.core._nth.call(null, coll, Math.floor(n), not_found)
  };
  nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return nth__3015.call(this, coll, n);
      case 3:
        return nth__3016.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return nth
}();
cljs.core.get = function() {
  var get = null;
  var get__3018 = function(o, k) {
    return cljs.core._lookup.call(null, o, k)
  };
  var get__3019 = function(o, k, not_found) {
    return cljs.core._lookup.call(null, o, k, not_found)
  };
  get = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return get__3018.call(this, o, k);
      case 3:
        return get__3019.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return get
}();
cljs.core.assoc = function() {
  var assoc = null;
  var assoc__3022 = function(coll, k, v) {
    return cljs.core._assoc.call(null, coll, k, v)
  };
  var assoc__3023 = function() {
    var G__3025__delegate = function(coll, k, v, kvs) {
      while(true) {
        var ret__3021 = assoc.call(null, coll, k, v);
        if(cljs.core.truth_(kvs)) {
          var G__3026 = ret__3021;
          var G__3027 = cljs.core.first.call(null, kvs);
          var G__3028 = cljs.core.second.call(null, kvs);
          var G__3029 = cljs.core.nnext.call(null, kvs);
          coll = G__3026;
          k = G__3027;
          v = G__3028;
          kvs = G__3029;
          continue
        }else {
          return ret__3021
        }
        break
      }
    };
    var G__3025 = function(coll, k, v, var_args) {
      var kvs = null;
      if(goog.isDef(var_args)) {
        kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3025__delegate.call(this, coll, k, v, kvs)
    };
    G__3025.cljs$lang$maxFixedArity = 3;
    G__3025.cljs$lang$applyTo = function(arglist__3030) {
      var coll = cljs.core.first(arglist__3030);
      var k = cljs.core.first(cljs.core.next(arglist__3030));
      var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3030)));
      var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3030)));
      return G__3025__delegate.call(this, coll, k, v, kvs)
    };
    return G__3025
  }();
  assoc = function(coll, k, v, var_args) {
    var kvs = var_args;
    switch(arguments.length) {
      case 3:
        return assoc__3022.call(this, coll, k, v);
      default:
        return assoc__3023.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  assoc.cljs$lang$maxFixedArity = 3;
  assoc.cljs$lang$applyTo = assoc__3023.cljs$lang$applyTo;
  return assoc
}();
cljs.core.dissoc = function() {
  var dissoc = null;
  var dissoc__3032 = function(coll) {
    return coll
  };
  var dissoc__3033 = function(coll, k) {
    return cljs.core._dissoc.call(null, coll, k)
  };
  var dissoc__3034 = function() {
    var G__3036__delegate = function(coll, k, ks) {
      while(true) {
        var ret__3031 = dissoc.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__3037 = ret__3031;
          var G__3038 = cljs.core.first.call(null, ks);
          var G__3039 = cljs.core.next.call(null, ks);
          coll = G__3037;
          k = G__3038;
          ks = G__3039;
          continue
        }else {
          return ret__3031
        }
        break
      }
    };
    var G__3036 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3036__delegate.call(this, coll, k, ks)
    };
    G__3036.cljs$lang$maxFixedArity = 2;
    G__3036.cljs$lang$applyTo = function(arglist__3040) {
      var coll = cljs.core.first(arglist__3040);
      var k = cljs.core.first(cljs.core.next(arglist__3040));
      var ks = cljs.core.rest(cljs.core.next(arglist__3040));
      return G__3036__delegate.call(this, coll, k, ks)
    };
    return G__3036
  }();
  dissoc = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return dissoc__3032.call(this, coll);
      case 2:
        return dissoc__3033.call(this, coll, k);
      default:
        return dissoc__3034.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  dissoc.cljs$lang$maxFixedArity = 2;
  dissoc.cljs$lang$applyTo = dissoc__3034.cljs$lang$applyTo;
  return dissoc
}();
cljs.core.with_meta = function with_meta(o, meta) {
  return cljs.core._with_meta.call(null, o, meta)
};
cljs.core.meta = function meta(o) {
  if(cljs.core.truth_(function() {
    var x__417__auto____3041 = o;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3042 = x__417__auto____3041;
      if(cljs.core.truth_(and__3546__auto____3042)) {
        var and__3546__auto____3043 = x__417__auto____3041.cljs$core$IMeta$;
        if(cljs.core.truth_(and__3546__auto____3043)) {
          return cljs.core.not.call(null, x__417__auto____3041.hasOwnProperty("cljs$core$IMeta$"))
        }else {
          return and__3546__auto____3043
        }
      }else {
        return and__3546__auto____3042
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, x__417__auto____3041)
    }
  }())) {
    return cljs.core._meta.call(null, o)
  }else {
    return null
  }
};
cljs.core.peek = function peek(coll) {
  return cljs.core._peek.call(null, coll)
};
cljs.core.pop = function pop(coll) {
  return cljs.core._pop.call(null, coll)
};
cljs.core.disj = function() {
  var disj = null;
  var disj__3045 = function(coll) {
    return coll
  };
  var disj__3046 = function(coll, k) {
    return cljs.core._disjoin.call(null, coll, k)
  };
  var disj__3047 = function() {
    var G__3049__delegate = function(coll, k, ks) {
      while(true) {
        var ret__3044 = disj.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__3050 = ret__3044;
          var G__3051 = cljs.core.first.call(null, ks);
          var G__3052 = cljs.core.next.call(null, ks);
          coll = G__3050;
          k = G__3051;
          ks = G__3052;
          continue
        }else {
          return ret__3044
        }
        break
      }
    };
    var G__3049 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3049__delegate.call(this, coll, k, ks)
    };
    G__3049.cljs$lang$maxFixedArity = 2;
    G__3049.cljs$lang$applyTo = function(arglist__3053) {
      var coll = cljs.core.first(arglist__3053);
      var k = cljs.core.first(cljs.core.next(arglist__3053));
      var ks = cljs.core.rest(cljs.core.next(arglist__3053));
      return G__3049__delegate.call(this, coll, k, ks)
    };
    return G__3049
  }();
  disj = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return disj__3045.call(this, coll);
      case 2:
        return disj__3046.call(this, coll, k);
      default:
        return disj__3047.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  disj.cljs$lang$maxFixedArity = 2;
  disj.cljs$lang$applyTo = disj__3047.cljs$lang$applyTo;
  return disj
}();
cljs.core.hash = function hash(o) {
  return cljs.core._hash.call(null, o)
};
cljs.core.empty_QMARK_ = function empty_QMARK_(coll) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.coll_QMARK_ = function coll_QMARK_(x) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
    return false
  }else {
    var x__417__auto____3054 = x;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3055 = x__417__auto____3054;
      if(cljs.core.truth_(and__3546__auto____3055)) {
        var and__3546__auto____3056 = x__417__auto____3054.cljs$core$ICollection$;
        if(cljs.core.truth_(and__3546__auto____3056)) {
          return cljs.core.not.call(null, x__417__auto____3054.hasOwnProperty("cljs$core$ICollection$"))
        }else {
          return and__3546__auto____3056
        }
      }else {
        return and__3546__auto____3055
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, x__417__auto____3054)
    }
  }
};
cljs.core.set_QMARK_ = function set_QMARK_(x) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
    return false
  }else {
    var x__417__auto____3057 = x;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3058 = x__417__auto____3057;
      if(cljs.core.truth_(and__3546__auto____3058)) {
        var and__3546__auto____3059 = x__417__auto____3057.cljs$core$ISet$;
        if(cljs.core.truth_(and__3546__auto____3059)) {
          return cljs.core.not.call(null, x__417__auto____3057.hasOwnProperty("cljs$core$ISet$"))
        }else {
          return and__3546__auto____3059
        }
      }else {
        return and__3546__auto____3058
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISet, x__417__auto____3057)
    }
  }
};
cljs.core.associative_QMARK_ = function associative_QMARK_(x) {
  var x__417__auto____3060 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3061 = x__417__auto____3060;
    if(cljs.core.truth_(and__3546__auto____3061)) {
      var and__3546__auto____3062 = x__417__auto____3060.cljs$core$IAssociative$;
      if(cljs.core.truth_(and__3546__auto____3062)) {
        return cljs.core.not.call(null, x__417__auto____3060.hasOwnProperty("cljs$core$IAssociative$"))
      }else {
        return and__3546__auto____3062
      }
    }else {
      return and__3546__auto____3061
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, x__417__auto____3060)
  }
};
cljs.core.sequential_QMARK_ = function sequential_QMARK_(x) {
  var x__417__auto____3063 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3064 = x__417__auto____3063;
    if(cljs.core.truth_(and__3546__auto____3064)) {
      var and__3546__auto____3065 = x__417__auto____3063.cljs$core$ISequential$;
      if(cljs.core.truth_(and__3546__auto____3065)) {
        return cljs.core.not.call(null, x__417__auto____3063.hasOwnProperty("cljs$core$ISequential$"))
      }else {
        return and__3546__auto____3065
      }
    }else {
      return and__3546__auto____3064
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, x__417__auto____3063)
  }
};
cljs.core.counted_QMARK_ = function counted_QMARK_(x) {
  var x__417__auto____3066 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3067 = x__417__auto____3066;
    if(cljs.core.truth_(and__3546__auto____3067)) {
      var and__3546__auto____3068 = x__417__auto____3066.cljs$core$ICounted$;
      if(cljs.core.truth_(and__3546__auto____3068)) {
        return cljs.core.not.call(null, x__417__auto____3066.hasOwnProperty("cljs$core$ICounted$"))
      }else {
        return and__3546__auto____3068
      }
    }else {
      return and__3546__auto____3067
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, x__417__auto____3066)
  }
};
cljs.core.map_QMARK_ = function map_QMARK_(x) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
    return false
  }else {
    var x__417__auto____3069 = x;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3070 = x__417__auto____3069;
      if(cljs.core.truth_(and__3546__auto____3070)) {
        var and__3546__auto____3071 = x__417__auto____3069.cljs$core$IMap$;
        if(cljs.core.truth_(and__3546__auto____3071)) {
          return cljs.core.not.call(null, x__417__auto____3069.hasOwnProperty("cljs$core$IMap$"))
        }else {
          return and__3546__auto____3071
        }
      }else {
        return and__3546__auto____3070
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMap, x__417__auto____3069)
    }
  }
};
cljs.core.vector_QMARK_ = function vector_QMARK_(x) {
  var x__417__auto____3072 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3073 = x__417__auto____3072;
    if(cljs.core.truth_(and__3546__auto____3073)) {
      var and__3546__auto____3074 = x__417__auto____3072.cljs$core$IVector$;
      if(cljs.core.truth_(and__3546__auto____3074)) {
        return cljs.core.not.call(null, x__417__auto____3072.hasOwnProperty("cljs$core$IVector$"))
      }else {
        return and__3546__auto____3074
      }
    }else {
      return and__3546__auto____3073
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IVector, x__417__auto____3072)
  }
};
cljs.core.js_obj = function js_obj() {
  return{}
};
cljs.core.js_keys = function js_keys(obj) {
  var keys__3075 = cljs.core.array.call(null);
  goog.object.forEach.call(null, obj, function(val, key, obj) {
    return keys__3075.push(key)
  });
  return keys__3075
};
cljs.core.js_delete = function js_delete(obj, key) {
  return delete obj[key]
};
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
cljs.core.false_QMARK_ = function false_QMARK_(x) {
  return x === false
};
cljs.core.true_QMARK_ = function true_QMARK_(x) {
  return x === true
};
cljs.core.undefined_QMARK_ = function undefined_QMARK_(x) {
  return void 0 === x
};
cljs.core.instance_QMARK_ = function instance_QMARK_(t, o) {
  return o != null && (o instanceof t || o.constructor === t || t === Object)
};
cljs.core.seq_QMARK_ = function seq_QMARK_(s) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, s))) {
    return false
  }else {
    var x__417__auto____3076 = s;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3077 = x__417__auto____3076;
      if(cljs.core.truth_(and__3546__auto____3077)) {
        var and__3546__auto____3078 = x__417__auto____3076.cljs$core$ISeq$;
        if(cljs.core.truth_(and__3546__auto____3078)) {
          return cljs.core.not.call(null, x__417__auto____3076.hasOwnProperty("cljs$core$ISeq$"))
        }else {
          return and__3546__auto____3078
        }
      }else {
        return and__3546__auto____3077
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, x__417__auto____3076)
    }
  }
};
cljs.core.boolean$ = function boolean$(x) {
  if(cljs.core.truth_(x)) {
    return true
  }else {
    return false
  }
};
cljs.core.string_QMARK_ = function string_QMARK_(x) {
  var and__3546__auto____3079 = goog.isString.call(null, x);
  if(cljs.core.truth_(and__3546__auto____3079)) {
    return cljs.core.not.call(null, function() {
      var or__3548__auto____3080 = cljs.core._EQ_.call(null, x.charAt(0), "\ufdd0");
      if(cljs.core.truth_(or__3548__auto____3080)) {
        return or__3548__auto____3080
      }else {
        return cljs.core._EQ_.call(null, x.charAt(0), "\ufdd1")
      }
    }())
  }else {
    return and__3546__auto____3079
  }
};
cljs.core.keyword_QMARK_ = function keyword_QMARK_(x) {
  var and__3546__auto____3081 = goog.isString.call(null, x);
  if(cljs.core.truth_(and__3546__auto____3081)) {
    return cljs.core._EQ_.call(null, x.charAt(0), "\ufdd0")
  }else {
    return and__3546__auto____3081
  }
};
cljs.core.symbol_QMARK_ = function symbol_QMARK_(x) {
  var and__3546__auto____3082 = goog.isString.call(null, x);
  if(cljs.core.truth_(and__3546__auto____3082)) {
    return cljs.core._EQ_.call(null, x.charAt(0), "\ufdd1")
  }else {
    return and__3546__auto____3082
  }
};
cljs.core.number_QMARK_ = function number_QMARK_(n) {
  return goog.isNumber.call(null, n)
};
cljs.core.fn_QMARK_ = function fn_QMARK_(f) {
  return goog.isFunction.call(null, f)
};
cljs.core.integer_QMARK_ = function integer_QMARK_(n) {
  var and__3546__auto____3083 = cljs.core.number_QMARK_.call(null, n);
  if(cljs.core.truth_(and__3546__auto____3083)) {
    return n == n.toFixed()
  }else {
    return and__3546__auto____3083
  }
};
cljs.core.contains_QMARK_ = function contains_QMARK_(coll, v) {
  if(cljs.core.truth_(cljs.core._lookup.call(null, coll, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)) {
    return false
  }else {
    return true
  }
};
cljs.core.find = function find(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3084 = coll;
    if(cljs.core.truth_(and__3546__auto____3084)) {
      var and__3546__auto____3085 = cljs.core.associative_QMARK_.call(null, coll);
      if(cljs.core.truth_(and__3546__auto____3085)) {
        return cljs.core.contains_QMARK_.call(null, coll, k)
      }else {
        return and__3546__auto____3085
      }
    }else {
      return and__3546__auto____3084
    }
  }())) {
    return cljs.core.Vector.fromArray([k, cljs.core._lookup.call(null, coll, k)])
  }else {
    return null
  }
};
cljs.core.distinct_QMARK_ = function() {
  var distinct_QMARK_ = null;
  var distinct_QMARK___3090 = function(x) {
    return true
  };
  var distinct_QMARK___3091 = function(x, y) {
    return cljs.core.not.call(null, cljs.core._EQ_.call(null, x, y))
  };
  var distinct_QMARK___3092 = function() {
    var G__3094__delegate = function(x, y, more) {
      if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._EQ_.call(null, x, y)))) {
        var s__3086 = cljs.core.set([y, x]);
        var xs__3087 = more;
        while(true) {
          var x__3088 = cljs.core.first.call(null, xs__3087);
          var etc__3089 = cljs.core.next.call(null, xs__3087);
          if(cljs.core.truth_(xs__3087)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, s__3086, x__3088))) {
              return false
            }else {
              var G__3095 = cljs.core.conj.call(null, s__3086, x__3088);
              var G__3096 = etc__3089;
              s__3086 = G__3095;
              xs__3087 = G__3096;
              continue
            }
          }else {
            return true
          }
          break
        }
      }else {
        return false
      }
    };
    var G__3094 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3094__delegate.call(this, x, y, more)
    };
    G__3094.cljs$lang$maxFixedArity = 2;
    G__3094.cljs$lang$applyTo = function(arglist__3097) {
      var x = cljs.core.first(arglist__3097);
      var y = cljs.core.first(cljs.core.next(arglist__3097));
      var more = cljs.core.rest(cljs.core.next(arglist__3097));
      return G__3094__delegate.call(this, x, y, more)
    };
    return G__3094
  }();
  distinct_QMARK_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return distinct_QMARK___3090.call(this, x);
      case 2:
        return distinct_QMARK___3091.call(this, x, y);
      default:
        return distinct_QMARK___3092.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  distinct_QMARK_.cljs$lang$maxFixedArity = 2;
  distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3092.cljs$lang$applyTo;
  return distinct_QMARK_
}();
cljs.core.compare = function compare(x, y) {
  return goog.array.defaultCompare.call(null, x, y)
};
cljs.core.fn__GT_comparator = function fn__GT_comparator(f) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, f, cljs.core.compare))) {
    return cljs.core.compare
  }else {
    return function(x, y) {
      var r__3098 = f.call(null, x, y);
      if(cljs.core.truth_(cljs.core.number_QMARK_.call(null, r__3098))) {
        return r__3098
      }else {
        if(cljs.core.truth_(r__3098)) {
          return-1
        }else {
          if(cljs.core.truth_(f.call(null, y, x))) {
            return 1
          }else {
            return 0
          }
        }
      }
    }
  }
};
cljs.core.sort = function() {
  var sort = null;
  var sort__3100 = function(coll) {
    return sort.call(null, cljs.core.compare, coll)
  };
  var sort__3101 = function(comp, coll) {
    if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
      var a__3099 = cljs.core.to_array.call(null, coll);
      goog.array.stableSort.call(null, a__3099, cljs.core.fn__GT_comparator.call(null, comp));
      return cljs.core.seq.call(null, a__3099)
    }else {
      return cljs.core.List.EMPTY
    }
  };
  sort = function(comp, coll) {
    switch(arguments.length) {
      case 1:
        return sort__3100.call(this, comp);
      case 2:
        return sort__3101.call(this, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return sort
}();
cljs.core.sort_by = function() {
  var sort_by = null;
  var sort_by__3103 = function(keyfn, coll) {
    return sort_by.call(null, keyfn, cljs.core.compare, coll)
  };
  var sort_by__3104 = function(keyfn, comp, coll) {
    return cljs.core.sort.call(null, function(x, y) {
      return cljs.core.fn__GT_comparator.call(null, comp).call(null, keyfn.call(null, x), keyfn.call(null, y))
    }, coll)
  };
  sort_by = function(keyfn, comp, coll) {
    switch(arguments.length) {
      case 2:
        return sort_by__3103.call(this, keyfn, comp);
      case 3:
        return sort_by__3104.call(this, keyfn, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return sort_by
}();
cljs.core.reduce = function() {
  var reduce = null;
  var reduce__3106 = function(f, coll) {
    return cljs.core._reduce.call(null, coll, f)
  };
  var reduce__3107 = function(f, val, coll) {
    return cljs.core._reduce.call(null, coll, f, val)
  };
  reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return reduce__3106.call(this, f, val);
      case 3:
        return reduce__3107.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return reduce
}();
cljs.core.seq_reduce = function() {
  var seq_reduce = null;
  var seq_reduce__3113 = function(f, coll) {
    var temp__3695__auto____3109 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3695__auto____3109)) {
      var s__3110 = temp__3695__auto____3109;
      return cljs.core.reduce.call(null, f, cljs.core.first.call(null, s__3110), cljs.core.next.call(null, s__3110))
    }else {
      return f.call(null)
    }
  };
  var seq_reduce__3114 = function(f, val, coll) {
    var val__3111 = val;
    var coll__3112 = cljs.core.seq.call(null, coll);
    while(true) {
      if(cljs.core.truth_(coll__3112)) {
        var G__3116 = f.call(null, val__3111, cljs.core.first.call(null, coll__3112));
        var G__3117 = cljs.core.next.call(null, coll__3112);
        val__3111 = G__3116;
        coll__3112 = G__3117;
        continue
      }else {
        return val__3111
      }
      break
    }
  };
  seq_reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return seq_reduce__3113.call(this, f, val);
      case 3:
        return seq_reduce__3114.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return seq_reduce
}();
cljs.core.IReduce["_"] = true;
cljs.core._reduce["_"] = function() {
  var G__3118 = null;
  var G__3118__3119 = function(coll, f) {
    return cljs.core.seq_reduce.call(null, f, coll)
  };
  var G__3118__3120 = function(coll, f, start) {
    return cljs.core.seq_reduce.call(null, f, start, coll)
  };
  G__3118 = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3118__3119.call(this, coll, f);
      case 3:
        return G__3118__3120.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3118
}();
cljs.core._PLUS_ = function() {
  var _PLUS_ = null;
  var _PLUS___3122 = function() {
    return 0
  };
  var _PLUS___3123 = function(x) {
    return x
  };
  var _PLUS___3124 = function(x, y) {
    return x + y
  };
  var _PLUS___3125 = function() {
    var G__3127__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _PLUS_, _PLUS_.call(null, x, y), more)
    };
    var G__3127 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3127__delegate.call(this, x, y, more)
    };
    G__3127.cljs$lang$maxFixedArity = 2;
    G__3127.cljs$lang$applyTo = function(arglist__3128) {
      var x = cljs.core.first(arglist__3128);
      var y = cljs.core.first(cljs.core.next(arglist__3128));
      var more = cljs.core.rest(cljs.core.next(arglist__3128));
      return G__3127__delegate.call(this, x, y, more)
    };
    return G__3127
  }();
  _PLUS_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _PLUS___3122.call(this);
      case 1:
        return _PLUS___3123.call(this, x);
      case 2:
        return _PLUS___3124.call(this, x, y);
      default:
        return _PLUS___3125.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _PLUS_.cljs$lang$maxFixedArity = 2;
  _PLUS_.cljs$lang$applyTo = _PLUS___3125.cljs$lang$applyTo;
  return _PLUS_
}();
cljs.core._ = function() {
  var _ = null;
  var ___3129 = function(x) {
    return-x
  };
  var ___3130 = function(x, y) {
    return x - y
  };
  var ___3131 = function() {
    var G__3133__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _, _.call(null, x, y), more)
    };
    var G__3133 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3133__delegate.call(this, x, y, more)
    };
    G__3133.cljs$lang$maxFixedArity = 2;
    G__3133.cljs$lang$applyTo = function(arglist__3134) {
      var x = cljs.core.first(arglist__3134);
      var y = cljs.core.first(cljs.core.next(arglist__3134));
      var more = cljs.core.rest(cljs.core.next(arglist__3134));
      return G__3133__delegate.call(this, x, y, more)
    };
    return G__3133
  }();
  _ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return ___3129.call(this, x);
      case 2:
        return ___3130.call(this, x, y);
      default:
        return ___3131.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _.cljs$lang$maxFixedArity = 2;
  _.cljs$lang$applyTo = ___3131.cljs$lang$applyTo;
  return _
}();
cljs.core._STAR_ = function() {
  var _STAR_ = null;
  var _STAR___3135 = function() {
    return 1
  };
  var _STAR___3136 = function(x) {
    return x
  };
  var _STAR___3137 = function(x, y) {
    return x * y
  };
  var _STAR___3138 = function() {
    var G__3140__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _STAR_, _STAR_.call(null, x, y), more)
    };
    var G__3140 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3140__delegate.call(this, x, y, more)
    };
    G__3140.cljs$lang$maxFixedArity = 2;
    G__3140.cljs$lang$applyTo = function(arglist__3141) {
      var x = cljs.core.first(arglist__3141);
      var y = cljs.core.first(cljs.core.next(arglist__3141));
      var more = cljs.core.rest(cljs.core.next(arglist__3141));
      return G__3140__delegate.call(this, x, y, more)
    };
    return G__3140
  }();
  _STAR_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _STAR___3135.call(this);
      case 1:
        return _STAR___3136.call(this, x);
      case 2:
        return _STAR___3137.call(this, x, y);
      default:
        return _STAR___3138.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _STAR_.cljs$lang$maxFixedArity = 2;
  _STAR_.cljs$lang$applyTo = _STAR___3138.cljs$lang$applyTo;
  return _STAR_
}();
cljs.core._SLASH_ = function() {
  var _SLASH_ = null;
  var _SLASH___3142 = function(x) {
    return 1 / x
  };
  var _SLASH___3143 = function(x, y) {
    return x / y
  };
  var _SLASH___3144 = function() {
    var G__3146__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _SLASH_, _SLASH_.call(null, x, y), more)
    };
    var G__3146 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3146__delegate.call(this, x, y, more)
    };
    G__3146.cljs$lang$maxFixedArity = 2;
    G__3146.cljs$lang$applyTo = function(arglist__3147) {
      var x = cljs.core.first(arglist__3147);
      var y = cljs.core.first(cljs.core.next(arglist__3147));
      var more = cljs.core.rest(cljs.core.next(arglist__3147));
      return G__3146__delegate.call(this, x, y, more)
    };
    return G__3146
  }();
  _SLASH_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _SLASH___3142.call(this, x);
      case 2:
        return _SLASH___3143.call(this, x, y);
      default:
        return _SLASH___3144.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _SLASH_.cljs$lang$maxFixedArity = 2;
  _SLASH_.cljs$lang$applyTo = _SLASH___3144.cljs$lang$applyTo;
  return _SLASH_
}();
cljs.core._LT_ = function() {
  var _LT_ = null;
  var _LT___3148 = function(x) {
    return true
  };
  var _LT___3149 = function(x, y) {
    return x < y
  };
  var _LT___3150 = function() {
    var G__3152__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_LT_.call(null, x, y))) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3153 = y;
            var G__3154 = cljs.core.first.call(null, more);
            var G__3155 = cljs.core.next.call(null, more);
            x = G__3153;
            y = G__3154;
            more = G__3155;
            continue
          }else {
            return _LT_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3152 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3152__delegate.call(this, x, y, more)
    };
    G__3152.cljs$lang$maxFixedArity = 2;
    G__3152.cljs$lang$applyTo = function(arglist__3156) {
      var x = cljs.core.first(arglist__3156);
      var y = cljs.core.first(cljs.core.next(arglist__3156));
      var more = cljs.core.rest(cljs.core.next(arglist__3156));
      return G__3152__delegate.call(this, x, y, more)
    };
    return G__3152
  }();
  _LT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT___3148.call(this, x);
      case 2:
        return _LT___3149.call(this, x, y);
      default:
        return _LT___3150.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT_.cljs$lang$maxFixedArity = 2;
  _LT_.cljs$lang$applyTo = _LT___3150.cljs$lang$applyTo;
  return _LT_
}();
cljs.core._LT__EQ_ = function() {
  var _LT__EQ_ = null;
  var _LT__EQ___3157 = function(x) {
    return true
  };
  var _LT__EQ___3158 = function(x, y) {
    return x <= y
  };
  var _LT__EQ___3159 = function() {
    var G__3161__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_LT__EQ_.call(null, x, y))) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3162 = y;
            var G__3163 = cljs.core.first.call(null, more);
            var G__3164 = cljs.core.next.call(null, more);
            x = G__3162;
            y = G__3163;
            more = G__3164;
            continue
          }else {
            return _LT__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3161 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3161__delegate.call(this, x, y, more)
    };
    G__3161.cljs$lang$maxFixedArity = 2;
    G__3161.cljs$lang$applyTo = function(arglist__3165) {
      var x = cljs.core.first(arglist__3165);
      var y = cljs.core.first(cljs.core.next(arglist__3165));
      var more = cljs.core.rest(cljs.core.next(arglist__3165));
      return G__3161__delegate.call(this, x, y, more)
    };
    return G__3161
  }();
  _LT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT__EQ___3157.call(this, x);
      case 2:
        return _LT__EQ___3158.call(this, x, y);
      default:
        return _LT__EQ___3159.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT__EQ_.cljs$lang$maxFixedArity = 2;
  _LT__EQ_.cljs$lang$applyTo = _LT__EQ___3159.cljs$lang$applyTo;
  return _LT__EQ_
}();
cljs.core._GT_ = function() {
  var _GT_ = null;
  var _GT___3166 = function(x) {
    return true
  };
  var _GT___3167 = function(x, y) {
    return x > y
  };
  var _GT___3168 = function() {
    var G__3170__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_GT_.call(null, x, y))) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3171 = y;
            var G__3172 = cljs.core.first.call(null, more);
            var G__3173 = cljs.core.next.call(null, more);
            x = G__3171;
            y = G__3172;
            more = G__3173;
            continue
          }else {
            return _GT_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3170 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3170__delegate.call(this, x, y, more)
    };
    G__3170.cljs$lang$maxFixedArity = 2;
    G__3170.cljs$lang$applyTo = function(arglist__3174) {
      var x = cljs.core.first(arglist__3174);
      var y = cljs.core.first(cljs.core.next(arglist__3174));
      var more = cljs.core.rest(cljs.core.next(arglist__3174));
      return G__3170__delegate.call(this, x, y, more)
    };
    return G__3170
  }();
  _GT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT___3166.call(this, x);
      case 2:
        return _GT___3167.call(this, x, y);
      default:
        return _GT___3168.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT_.cljs$lang$maxFixedArity = 2;
  _GT_.cljs$lang$applyTo = _GT___3168.cljs$lang$applyTo;
  return _GT_
}();
cljs.core._GT__EQ_ = function() {
  var _GT__EQ_ = null;
  var _GT__EQ___3175 = function(x) {
    return true
  };
  var _GT__EQ___3176 = function(x, y) {
    return x >= y
  };
  var _GT__EQ___3177 = function() {
    var G__3179__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_GT__EQ_.call(null, x, y))) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3180 = y;
            var G__3181 = cljs.core.first.call(null, more);
            var G__3182 = cljs.core.next.call(null, more);
            x = G__3180;
            y = G__3181;
            more = G__3182;
            continue
          }else {
            return _GT__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3179 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3179__delegate.call(this, x, y, more)
    };
    G__3179.cljs$lang$maxFixedArity = 2;
    G__3179.cljs$lang$applyTo = function(arglist__3183) {
      var x = cljs.core.first(arglist__3183);
      var y = cljs.core.first(cljs.core.next(arglist__3183));
      var more = cljs.core.rest(cljs.core.next(arglist__3183));
      return G__3179__delegate.call(this, x, y, more)
    };
    return G__3179
  }();
  _GT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT__EQ___3175.call(this, x);
      case 2:
        return _GT__EQ___3176.call(this, x, y);
      default:
        return _GT__EQ___3177.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT__EQ_.cljs$lang$maxFixedArity = 2;
  _GT__EQ_.cljs$lang$applyTo = _GT__EQ___3177.cljs$lang$applyTo;
  return _GT__EQ_
}();
cljs.core.dec = function dec(x) {
  return x - 1
};
cljs.core.max = function() {
  var max = null;
  var max__3184 = function(x) {
    return x
  };
  var max__3185 = function(x, y) {
    return x > y ? x : y
  };
  var max__3186 = function() {
    var G__3188__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, max, max.call(null, x, y), more)
    };
    var G__3188 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3188__delegate.call(this, x, y, more)
    };
    G__3188.cljs$lang$maxFixedArity = 2;
    G__3188.cljs$lang$applyTo = function(arglist__3189) {
      var x = cljs.core.first(arglist__3189);
      var y = cljs.core.first(cljs.core.next(arglist__3189));
      var more = cljs.core.rest(cljs.core.next(arglist__3189));
      return G__3188__delegate.call(this, x, y, more)
    };
    return G__3188
  }();
  max = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return max__3184.call(this, x);
      case 2:
        return max__3185.call(this, x, y);
      default:
        return max__3186.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  max.cljs$lang$maxFixedArity = 2;
  max.cljs$lang$applyTo = max__3186.cljs$lang$applyTo;
  return max
}();
cljs.core.min = function() {
  var min = null;
  var min__3190 = function(x) {
    return x
  };
  var min__3191 = function(x, y) {
    return x < y ? x : y
  };
  var min__3192 = function() {
    var G__3194__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, min, min.call(null, x, y), more)
    };
    var G__3194 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3194__delegate.call(this, x, y, more)
    };
    G__3194.cljs$lang$maxFixedArity = 2;
    G__3194.cljs$lang$applyTo = function(arglist__3195) {
      var x = cljs.core.first(arglist__3195);
      var y = cljs.core.first(cljs.core.next(arglist__3195));
      var more = cljs.core.rest(cljs.core.next(arglist__3195));
      return G__3194__delegate.call(this, x, y, more)
    };
    return G__3194
  }();
  min = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return min__3190.call(this, x);
      case 2:
        return min__3191.call(this, x, y);
      default:
        return min__3192.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  min.cljs$lang$maxFixedArity = 2;
  min.cljs$lang$applyTo = min__3192.cljs$lang$applyTo;
  return min
}();
cljs.core.fix = function fix(q) {
  if(cljs.core.truth_(q >= 0)) {
    return Math.floor.call(null, q)
  }else {
    return Math.ceil.call(null, q)
  }
};
cljs.core.mod = function mod(n, d) {
  return n % d
};
cljs.core.quot = function quot(n, d) {
  var rem__3196 = n % d;
  return cljs.core.fix.call(null, (n - rem__3196) / d)
};
cljs.core.rem = function rem(n, d) {
  var q__3197 = cljs.core.quot.call(null, n, d);
  return n - d * q__3197
};
cljs.core.rand = function() {
  var rand = null;
  var rand__3198 = function() {
    return Math.random.call(null)
  };
  var rand__3199 = function(n) {
    return n * rand.call(null)
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__3198.call(this);
      case 1:
        return rand__3199.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, n))
};
cljs.core.bit_xor = function bit_xor(x, y) {
  return x ^ y
};
cljs.core.bit_and = function bit_and(x, y) {
  return x & y
};
cljs.core.bit_or = function bit_or(x, y) {
  return x | y
};
cljs.core.bit_and_not = function bit_and_not(x, y) {
  return x & ~y
};
cljs.core.bit_clear = function bit_clear(x, n) {
  return x & ~(1 << n)
};
cljs.core.bit_flip = function bit_flip(x, n) {
  return x ^ 1 << n
};
cljs.core.bit_not = function bit_not(x) {
  return~x
};
cljs.core.bit_set = function bit_set(x, n) {
  return x | 1 << n
};
cljs.core.bit_test = function bit_test(x, n) {
  return(x & 1 << n) != 0
};
cljs.core.bit_shift_left = function bit_shift_left(x, n) {
  return x << n
};
cljs.core.bit_shift_right = function bit_shift_right(x, n) {
  return x >> n
};
cljs.core._EQ__EQ_ = function() {
  var _EQ__EQ_ = null;
  var _EQ__EQ___3201 = function(x) {
    return true
  };
  var _EQ__EQ___3202 = function(x, y) {
    return cljs.core._equiv.call(null, x, y)
  };
  var _EQ__EQ___3203 = function() {
    var G__3205__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ__EQ_.call(null, x, y))) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3206 = y;
            var G__3207 = cljs.core.first.call(null, more);
            var G__3208 = cljs.core.next.call(null, more);
            x = G__3206;
            y = G__3207;
            more = G__3208;
            continue
          }else {
            return _EQ__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3205 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3205__delegate.call(this, x, y, more)
    };
    G__3205.cljs$lang$maxFixedArity = 2;
    G__3205.cljs$lang$applyTo = function(arglist__3209) {
      var x = cljs.core.first(arglist__3209);
      var y = cljs.core.first(cljs.core.next(arglist__3209));
      var more = cljs.core.rest(cljs.core.next(arglist__3209));
      return G__3205__delegate.call(this, x, y, more)
    };
    return G__3205
  }();
  _EQ__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ__EQ___3201.call(this, x);
      case 2:
        return _EQ__EQ___3202.call(this, x, y);
      default:
        return _EQ__EQ___3203.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ__EQ_.cljs$lang$maxFixedArity = 2;
  _EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3203.cljs$lang$applyTo;
  return _EQ__EQ_
}();
cljs.core.pos_QMARK_ = function pos_QMARK_(n) {
  return 0 < n
};
cljs.core.zero_QMARK_ = function zero_QMARK_(n) {
  return 0 === n
};
cljs.core.neg_QMARK_ = function neg_QMARK_(x) {
  return x < 0
};
cljs.core.nthnext = function nthnext(coll, n) {
  var n__3210 = n;
  var xs__3211 = cljs.core.seq.call(null, coll);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3212 = xs__3211;
      if(cljs.core.truth_(and__3546__auto____3212)) {
        return n__3210 > 0
      }else {
        return and__3546__auto____3212
      }
    }())) {
      var G__3213 = n__3210 - 1;
      var G__3214 = cljs.core.next.call(null, xs__3211);
      n__3210 = G__3213;
      xs__3211 = G__3214;
      continue
    }else {
      return xs__3211
    }
    break
  }
};
cljs.core.IIndexed["_"] = true;
cljs.core._nth["_"] = function() {
  var G__3219 = null;
  var G__3219__3220 = function(coll, n) {
    var temp__3695__auto____3215 = cljs.core.nthnext.call(null, coll, n);
    if(cljs.core.truth_(temp__3695__auto____3215)) {
      var xs__3216 = temp__3695__auto____3215;
      return cljs.core.first.call(null, xs__3216)
    }else {
      throw new Error("Index out of bounds");
    }
  };
  var G__3219__3221 = function(coll, n, not_found) {
    var temp__3695__auto____3217 = cljs.core.nthnext.call(null, coll, n);
    if(cljs.core.truth_(temp__3695__auto____3217)) {
      var xs__3218 = temp__3695__auto____3217;
      return cljs.core.first.call(null, xs__3218)
    }else {
      return not_found
    }
  };
  G__3219 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3219__3220.call(this, coll, n);
      case 3:
        return G__3219__3221.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3219
}();
cljs.core.str_STAR_ = function() {
  var str_STAR_ = null;
  var str_STAR___3223 = function() {
    return""
  };
  var str_STAR___3224 = function(x) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
      return""
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return x.toString()
      }else {
        return null
      }
    }
  };
  var str_STAR___3225 = function() {
    var G__3227__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__3228 = sb.append(str_STAR_.call(null, cljs.core.first.call(null, more)));
            var G__3229 = cljs.core.next.call(null, more);
            sb = G__3228;
            more = G__3229;
            continue
          }else {
            return str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str_STAR_.call(null, x)), ys)
    };
    var G__3227 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__3227__delegate.call(this, x, ys)
    };
    G__3227.cljs$lang$maxFixedArity = 1;
    G__3227.cljs$lang$applyTo = function(arglist__3230) {
      var x = cljs.core.first(arglist__3230);
      var ys = cljs.core.rest(arglist__3230);
      return G__3227__delegate.call(this, x, ys)
    };
    return G__3227
  }();
  str_STAR_ = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str_STAR___3223.call(this);
      case 1:
        return str_STAR___3224.call(this, x);
      default:
        return str_STAR___3225.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  str_STAR_.cljs$lang$maxFixedArity = 1;
  str_STAR_.cljs$lang$applyTo = str_STAR___3225.cljs$lang$applyTo;
  return str_STAR_
}();
cljs.core.str = function() {
  var str = null;
  var str__3231 = function() {
    return""
  };
  var str__3232 = function(x) {
    if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, x))) {
      return x.substring(2, x.length)
    }else {
      if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, x))) {
        return cljs.core.str_STAR_.call(null, ":", x.substring(2, x.length))
      }else {
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
          return""
        }else {
          if(cljs.core.truth_("\ufdd0'else")) {
            return x.toString()
          }else {
            return null
          }
        }
      }
    }
  };
  var str__3233 = function() {
    var G__3235__delegate = function(x, ys) {
      return cljs.core.apply.call(null, cljs.core.str_STAR_, x, ys)
    };
    var G__3235 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__3235__delegate.call(this, x, ys)
    };
    G__3235.cljs$lang$maxFixedArity = 1;
    G__3235.cljs$lang$applyTo = function(arglist__3236) {
      var x = cljs.core.first(arglist__3236);
      var ys = cljs.core.rest(arglist__3236);
      return G__3235__delegate.call(this, x, ys)
    };
    return G__3235
  }();
  str = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str__3231.call(this);
      case 1:
        return str__3232.call(this, x);
      default:
        return str__3233.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  str.cljs$lang$maxFixedArity = 1;
  str.cljs$lang$applyTo = str__3233.cljs$lang$applyTo;
  return str
}();
cljs.core.subs = function() {
  var subs = null;
  var subs__3237 = function(s, start) {
    return s.substring(start)
  };
  var subs__3238 = function(s, start, end) {
    return s.substring(start, end)
  };
  subs = function(s, start, end) {
    switch(arguments.length) {
      case 2:
        return subs__3237.call(this, s, start);
      case 3:
        return subs__3238.call(this, s, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return subs
}();
cljs.core.symbol = function() {
  var symbol = null;
  var symbol__3240 = function(name) {
    if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, name))) {
      name
    }else {
      if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, name))) {
        cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, name, 2))
      }else {
      }
    }
    return cljs.core.str_STAR_.call(null, "\ufdd1", "'", name)
  };
  var symbol__3241 = function(ns, name) {
    return symbol.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  symbol = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return symbol__3240.call(this, ns);
      case 2:
        return symbol__3241.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return symbol
}();
cljs.core.keyword = function() {
  var keyword = null;
  var keyword__3243 = function(name) {
    if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, name))) {
      return name
    }else {
      if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, name))) {
        return cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, name, 2))
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          return cljs.core.str_STAR_.call(null, "\ufdd0", "'", name)
        }else {
          return null
        }
      }
    }
  };
  var keyword__3244 = function(ns, name) {
    return keyword.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  keyword = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return keyword__3243.call(this, ns);
      case 2:
        return keyword__3244.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return keyword
}();
cljs.core.equiv_sequential = function equiv_sequential(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.sequential_QMARK_.call(null, y)) ? function() {
    var xs__3246 = cljs.core.seq.call(null, x);
    var ys__3247 = cljs.core.seq.call(null, y);
    while(true) {
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, xs__3246))) {
        return cljs.core.nil_QMARK_.call(null, ys__3247)
      }else {
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, ys__3247))) {
          return false
        }else {
          if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, xs__3246), cljs.core.first.call(null, ys__3247)))) {
            var G__3248 = cljs.core.next.call(null, xs__3246);
            var G__3249 = cljs.core.next.call(null, ys__3247);
            xs__3246 = G__3248;
            ys__3247 = G__3249;
            continue
          }else {
            if(cljs.core.truth_("\ufdd0'else")) {
              return false
            }else {
              return null
            }
          }
        }
      }
      break
    }
  }() : null)
};
cljs.core.hash_combine = function hash_combine(seed, hash) {
  return seed ^ hash + 2654435769 + (seed << 6) + (seed >> 2)
};
cljs.core.hash_coll = function hash_coll(coll) {
  return cljs.core.reduce.call(null, function(p1__3250_SHARP_, p2__3251_SHARP_) {
    return cljs.core.hash_combine.call(null, p1__3250_SHARP_, cljs.core.hash.call(null, p2__3251_SHARP_))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, coll)), cljs.core.next.call(null, coll))
};
cljs.core.extend_object_BANG_ = function extend_object_BANG_(obj, fn_map) {
  var G__3252__3253 = cljs.core.seq.call(null, fn_map);
  if(cljs.core.truth_(G__3252__3253)) {
    var G__3255__3257 = cljs.core.first.call(null, G__3252__3253);
    var vec__3256__3258 = G__3255__3257;
    var key_name__3259 = cljs.core.nth.call(null, vec__3256__3258, 0, null);
    var f__3260 = cljs.core.nth.call(null, vec__3256__3258, 1, null);
    var G__3252__3261 = G__3252__3253;
    var G__3255__3262 = G__3255__3257;
    var G__3252__3263 = G__3252__3261;
    while(true) {
      var vec__3264__3265 = G__3255__3262;
      var key_name__3266 = cljs.core.nth.call(null, vec__3264__3265, 0, null);
      var f__3267 = cljs.core.nth.call(null, vec__3264__3265, 1, null);
      var G__3252__3268 = G__3252__3263;
      var str_name__3269 = cljs.core.name.call(null, key_name__3266);
      obj[str_name__3269] = f__3267;
      var temp__3698__auto____3270 = cljs.core.next.call(null, G__3252__3268);
      if(cljs.core.truth_(temp__3698__auto____3270)) {
        var G__3252__3271 = temp__3698__auto____3270;
        var G__3272 = cljs.core.first.call(null, G__3252__3271);
        var G__3273 = G__3252__3271;
        G__3255__3262 = G__3272;
        G__3252__3263 = G__3273;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return obj
};
cljs.core.List = function(meta, first, rest, count) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.count = count
};
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3274 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3275 = this;
  return new cljs.core.List(this__3275.meta, o, coll, this__3275.count + 1)
};
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3276 = this;
  return coll
};
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3277 = this;
  return this__3277.count
};
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3278 = this;
  return this__3278.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3279 = this;
  return cljs.core._rest.call(null, coll)
};
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3280 = this;
  return this__3280.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3281 = this;
  return this__3281.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3282 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3283 = this;
  return new cljs.core.List(meta, this__3283.first, this__3283.rest, this__3283.count)
};
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3284 = this;
  return this__3284.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3285 = this;
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList = function(meta) {
  this.meta = meta
};
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3286 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3287 = this;
  return new cljs.core.List(this__3287.meta, o, null, 1)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3288 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3289 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3290 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3291 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3292 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3293 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3294 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3295 = this;
  return new cljs.core.EmptyList(meta)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3296 = this;
  return this__3296.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3297 = this;
  return coll
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reverse = function reverse(coll) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, coll)
};
cljs.core.list = function() {
  var list__delegate = function(items) {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, items))
  };
  var list = function(var_args) {
    var items = null;
    if(goog.isDef(var_args)) {
      items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return list__delegate.call(this, items)
  };
  list.cljs$lang$maxFixedArity = 0;
  list.cljs$lang$applyTo = function(arglist__3298) {
    var items = cljs.core.seq(arglist__3298);
    return list__delegate.call(this, items)
  };
  return list
}();
cljs.core.Cons = function(meta, first, rest) {
  this.meta = meta;
  this.first = first;
  this.rest = rest
};
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3299 = this;
  return coll
};
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3300 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3301 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3302 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__3302.meta)
};
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3303 = this;
  return new cljs.core.Cons(null, o, coll)
};
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3304 = this;
  return this__3304.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3305 = this;
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this__3305.rest))) {
    return cljs.core.List.EMPTY
  }else {
    return this__3305.rest
  }
};
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3306 = this;
  return this__3306.meta
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3307 = this;
  return new cljs.core.Cons(meta, this__3307.first, this__3307.rest)
};
cljs.core.cons = function cons(x, seq) {
  return new cljs.core.Cons(null, x, seq)
};
cljs.core.IReduce["string"] = true;
cljs.core._reduce["string"] = function() {
  var G__3308 = null;
  var G__3308__3309 = function(string, f) {
    return cljs.core.ci_reduce.call(null, string, f)
  };
  var G__3308__3310 = function(string, f, start) {
    return cljs.core.ci_reduce.call(null, string, f, start)
  };
  G__3308 = function(string, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3308__3309.call(this, string, f);
      case 3:
        return G__3308__3310.call(this, string, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3308
}();
cljs.core.ILookup["string"] = true;
cljs.core._lookup["string"] = function() {
  var G__3312 = null;
  var G__3312__3313 = function(string, k) {
    return cljs.core._nth.call(null, string, k)
  };
  var G__3312__3314 = function(string, k, not_found) {
    return cljs.core._nth.call(null, string, k, not_found)
  };
  G__3312 = function(string, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3312__3313.call(this, string, k);
      case 3:
        return G__3312__3314.call(this, string, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3312
}();
cljs.core.IIndexed["string"] = true;
cljs.core._nth["string"] = function() {
  var G__3316 = null;
  var G__3316__3317 = function(string, n) {
    if(cljs.core.truth_(n < cljs.core._count.call(null, string))) {
      return string.charAt(n)
    }else {
      return null
    }
  };
  var G__3316__3318 = function(string, n, not_found) {
    if(cljs.core.truth_(n < cljs.core._count.call(null, string))) {
      return string.charAt(n)
    }else {
      return not_found
    }
  };
  G__3316 = function(string, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3316__3317.call(this, string, n);
      case 3:
        return G__3316__3318.call(this, string, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3316
}();
cljs.core.ICounted["string"] = true;
cljs.core._count["string"] = function(s) {
  return s.length
};
cljs.core.ISeqable["string"] = true;
cljs.core._seq["string"] = function(string) {
  return cljs.core.prim_seq.call(null, string, 0)
};
cljs.core.IHash["string"] = true;
cljs.core._hash["string"] = function(o) {
  return goog.string.hashCode.call(null, o)
};
String["prototype"]["call"] = function() {
  var G__3320 = null;
  var G__3320__3321 = function(_, coll) {
    return cljs.core.get.call(null, coll, this.toString())
  };
  var G__3320__3322 = function(_, coll, not_found) {
    return cljs.core.get.call(null, coll, this.toString(), not_found)
  };
  G__3320 = function(_, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3320__3321.call(this, _, coll);
      case 3:
        return G__3320__3322.call(this, _, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3320
}();
String["prototype"]["apply"] = function(s, args) {
  if(cljs.core.truth_(cljs.core.count.call(null, args) < 2)) {
    return cljs.core.get.call(null, args[0], s)
  }else {
    return cljs.core.get.call(null, args[0], s, args[1])
  }
};
cljs.core.lazy_seq_value = function lazy_seq_value(lazy_seq) {
  var x__3324 = lazy_seq.x;
  if(cljs.core.truth_(lazy_seq.realized)) {
    return x__3324
  }else {
    lazy_seq.x = x__3324.call(null);
    lazy_seq.realized = true;
    return lazy_seq.x
  }
};
cljs.core.LazySeq = function(meta, realized, x) {
  this.meta = meta;
  this.realized = realized;
  this.x = x
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3325 = this;
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3326 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3327 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3328 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__3328.meta)
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3329 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3330 = this;
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3331 = this;
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3332 = this;
  return this__3332.meta
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3333 = this;
  return new cljs.core.LazySeq(meta, this__3333.realized, this__3333.x)
};
cljs.core.to_array = function to_array(s) {
  var ary__3334 = cljs.core.array.call(null);
  var s__3335 = s;
  while(true) {
    if(cljs.core.truth_(cljs.core.seq.call(null, s__3335))) {
      ary__3334.push(cljs.core.first.call(null, s__3335));
      var G__3336 = cljs.core.next.call(null, s__3335);
      s__3335 = G__3336;
      continue
    }else {
      return ary__3334
    }
    break
  }
};
cljs.core.bounded_count = function bounded_count(s, n) {
  var s__3337 = s;
  var i__3338 = n;
  var sum__3339 = 0;
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3340 = i__3338 > 0;
      if(cljs.core.truth_(and__3546__auto____3340)) {
        return cljs.core.seq.call(null, s__3337)
      }else {
        return and__3546__auto____3340
      }
    }())) {
      var G__3341 = cljs.core.next.call(null, s__3337);
      var G__3342 = i__3338 - 1;
      var G__3343 = sum__3339 + 1;
      s__3337 = G__3341;
      i__3338 = G__3342;
      sum__3339 = G__3343;
      continue
    }else {
      return sum__3339
    }
    break
  }
};
cljs.core.spread = function spread(arglist) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, arglist))) {
    return null
  }else {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.next.call(null, arglist)))) {
      return cljs.core.seq.call(null, cljs.core.first.call(null, arglist))
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, arglist), spread.call(null, cljs.core.next.call(null, arglist)))
      }else {
        return null
      }
    }
  }
};
cljs.core.concat = function() {
  var concat = null;
  var concat__3347 = function() {
    return new cljs.core.LazySeq(null, false, function() {
      return null
    })
  };
  var concat__3348 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return x
    })
  };
  var concat__3349 = function(x, y) {
    return new cljs.core.LazySeq(null, false, function() {
      var s__3344 = cljs.core.seq.call(null, x);
      if(cljs.core.truth_(s__3344)) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__3344), concat.call(null, cljs.core.rest.call(null, s__3344), y))
      }else {
        return y
      }
    })
  };
  var concat__3350 = function() {
    var G__3352__delegate = function(x, y, zs) {
      var cat__3346 = function cat(xys, zs) {
        return new cljs.core.LazySeq(null, false, function() {
          var xys__3345 = cljs.core.seq.call(null, xys);
          if(cljs.core.truth_(xys__3345)) {
            return cljs.core.cons.call(null, cljs.core.first.call(null, xys__3345), cat.call(null, cljs.core.rest.call(null, xys__3345), zs))
          }else {
            if(cljs.core.truth_(zs)) {
              return cat.call(null, cljs.core.first.call(null, zs), cljs.core.next.call(null, zs))
            }else {
              return null
            }
          }
        })
      };
      return cat__3346.call(null, concat.call(null, x, y), zs)
    };
    var G__3352 = function(x, y, var_args) {
      var zs = null;
      if(goog.isDef(var_args)) {
        zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3352__delegate.call(this, x, y, zs)
    };
    G__3352.cljs$lang$maxFixedArity = 2;
    G__3352.cljs$lang$applyTo = function(arglist__3353) {
      var x = cljs.core.first(arglist__3353);
      var y = cljs.core.first(cljs.core.next(arglist__3353));
      var zs = cljs.core.rest(cljs.core.next(arglist__3353));
      return G__3352__delegate.call(this, x, y, zs)
    };
    return G__3352
  }();
  concat = function(x, y, var_args) {
    var zs = var_args;
    switch(arguments.length) {
      case 0:
        return concat__3347.call(this);
      case 1:
        return concat__3348.call(this, x);
      case 2:
        return concat__3349.call(this, x, y);
      default:
        return concat__3350.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  concat.cljs$lang$maxFixedArity = 2;
  concat.cljs$lang$applyTo = concat__3350.cljs$lang$applyTo;
  return concat
}();
cljs.core.list_STAR_ = function() {
  var list_STAR_ = null;
  var list_STAR___3354 = function(args) {
    return cljs.core.seq.call(null, args)
  };
  var list_STAR___3355 = function(a, args) {
    return cljs.core.cons.call(null, a, args)
  };
  var list_STAR___3356 = function(a, b, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, args))
  };
  var list_STAR___3357 = function(a, b, c, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, args)))
  };
  var list_STAR___3358 = function() {
    var G__3360__delegate = function(a, b, c, d, more) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, more)))))
    };
    var G__3360 = function(a, b, c, d, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__3360__delegate.call(this, a, b, c, d, more)
    };
    G__3360.cljs$lang$maxFixedArity = 4;
    G__3360.cljs$lang$applyTo = function(arglist__3361) {
      var a = cljs.core.first(arglist__3361);
      var b = cljs.core.first(cljs.core.next(arglist__3361));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3361)));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3361))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3361))));
      return G__3360__delegate.call(this, a, b, c, d, more)
    };
    return G__3360
  }();
  list_STAR_ = function(a, b, c, d, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return list_STAR___3354.call(this, a);
      case 2:
        return list_STAR___3355.call(this, a, b);
      case 3:
        return list_STAR___3356.call(this, a, b, c);
      case 4:
        return list_STAR___3357.call(this, a, b, c, d);
      default:
        return list_STAR___3358.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  list_STAR_.cljs$lang$maxFixedArity = 4;
  list_STAR_.cljs$lang$applyTo = list_STAR___3358.cljs$lang$applyTo;
  return list_STAR_
}();
cljs.core.apply = function() {
  var apply = null;
  var apply__3371 = function(f, args) {
    var fixed_arity__3362 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, args, fixed_arity__3362 + 1) <= fixed_arity__3362)) {
        return f.apply(f, cljs.core.to_array.call(null, args))
      }else {
        return f.cljs$lang$applyTo(args)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, args))
    }
  };
  var apply__3372 = function(f, x, args) {
    var arglist__3363 = cljs.core.list_STAR_.call(null, x, args);
    var fixed_arity__3364 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3363, fixed_arity__3364) <= fixed_arity__3364)) {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3363))
      }else {
        return f.cljs$lang$applyTo(arglist__3363)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__3363))
    }
  };
  var apply__3373 = function(f, x, y, args) {
    var arglist__3365 = cljs.core.list_STAR_.call(null, x, y, args);
    var fixed_arity__3366 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3365, fixed_arity__3366) <= fixed_arity__3366)) {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3365))
      }else {
        return f.cljs$lang$applyTo(arglist__3365)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__3365))
    }
  };
  var apply__3374 = function(f, x, y, z, args) {
    var arglist__3367 = cljs.core.list_STAR_.call(null, x, y, z, args);
    var fixed_arity__3368 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3367, fixed_arity__3368) <= fixed_arity__3368)) {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3367))
      }else {
        return f.cljs$lang$applyTo(arglist__3367)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__3367))
    }
  };
  var apply__3375 = function() {
    var G__3377__delegate = function(f, a, b, c, d, args) {
      var arglist__3369 = cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, args)))));
      var fixed_arity__3370 = f.cljs$lang$maxFixedArity;
      if(cljs.core.truth_(f.cljs$lang$applyTo)) {
        if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3369, fixed_arity__3370) <= fixed_arity__3370)) {
          return f.apply(f, cljs.core.to_array.call(null, arglist__3369))
        }else {
          return f.cljs$lang$applyTo(arglist__3369)
        }
      }else {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3369))
      }
    };
    var G__3377 = function(f, a, b, c, d, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__3377__delegate.call(this, f, a, b, c, d, args)
    };
    G__3377.cljs$lang$maxFixedArity = 5;
    G__3377.cljs$lang$applyTo = function(arglist__3378) {
      var f = cljs.core.first(arglist__3378);
      var a = cljs.core.first(cljs.core.next(arglist__3378));
      var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3378)));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3378))));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3378)))));
      var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3378)))));
      return G__3377__delegate.call(this, f, a, b, c, d, args)
    };
    return G__3377
  }();
  apply = function(f, a, b, c, d, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 2:
        return apply__3371.call(this, f, a);
      case 3:
        return apply__3372.call(this, f, a, b);
      case 4:
        return apply__3373.call(this, f, a, b, c);
      case 5:
        return apply__3374.call(this, f, a, b, c, d);
      default:
        return apply__3375.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  apply.cljs$lang$maxFixedArity = 5;
  apply.cljs$lang$applyTo = apply__3375.cljs$lang$applyTo;
  return apply
}();
cljs.core.vary_meta = function() {
  var vary_meta__delegate = function(obj, f, args) {
    return cljs.core.with_meta.call(null, obj, cljs.core.apply.call(null, f, cljs.core.meta.call(null, obj), args))
  };
  var vary_meta = function(obj, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return vary_meta__delegate.call(this, obj, f, args)
  };
  vary_meta.cljs$lang$maxFixedArity = 2;
  vary_meta.cljs$lang$applyTo = function(arglist__3379) {
    var obj = cljs.core.first(arglist__3379);
    var f = cljs.core.first(cljs.core.next(arglist__3379));
    var args = cljs.core.rest(cljs.core.next(arglist__3379));
    return vary_meta__delegate.call(this, obj, f, args)
  };
  return vary_meta
}();
cljs.core.not_EQ_ = function() {
  var not_EQ_ = null;
  var not_EQ___3380 = function(x) {
    return false
  };
  var not_EQ___3381 = function(x, y) {
    return cljs.core.not.call(null, cljs.core._EQ_.call(null, x, y))
  };
  var not_EQ___3382 = function() {
    var G__3384__delegate = function(x, y, more) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, x, y, more))
    };
    var G__3384 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3384__delegate.call(this, x, y, more)
    };
    G__3384.cljs$lang$maxFixedArity = 2;
    G__3384.cljs$lang$applyTo = function(arglist__3385) {
      var x = cljs.core.first(arglist__3385);
      var y = cljs.core.first(cljs.core.next(arglist__3385));
      var more = cljs.core.rest(cljs.core.next(arglist__3385));
      return G__3384__delegate.call(this, x, y, more)
    };
    return G__3384
  }();
  not_EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return not_EQ___3380.call(this, x);
      case 2:
        return not_EQ___3381.call(this, x, y);
      default:
        return not_EQ___3382.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  not_EQ_.cljs$lang$maxFixedArity = 2;
  not_EQ_.cljs$lang$applyTo = not_EQ___3382.cljs$lang$applyTo;
  return not_EQ_
}();
cljs.core.not_empty = function not_empty(coll) {
  if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
    return coll
  }else {
    return null
  }
};
cljs.core.every_QMARK_ = function every_QMARK_(pred, coll) {
  while(true) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.seq.call(null, coll)))) {
      return true
    }else {
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, coll)))) {
        var G__3386 = pred;
        var G__3387 = cljs.core.next.call(null, coll);
        pred = G__3386;
        coll = G__3387;
        continue
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          return false
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.not_every_QMARK_ = function not_every_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.every_QMARK_.call(null, pred, coll))
};
cljs.core.some = function some(pred, coll) {
  while(true) {
    if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
      var or__3548__auto____3388 = pred.call(null, cljs.core.first.call(null, coll));
      if(cljs.core.truth_(or__3548__auto____3388)) {
        return or__3548__auto____3388
      }else {
        var G__3389 = pred;
        var G__3390 = cljs.core.next.call(null, coll);
        pred = G__3389;
        coll = G__3390;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.not_any_QMARK_ = function not_any_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.some.call(null, pred, coll))
};
cljs.core.even_QMARK_ = function even_QMARK_(n) {
  if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null, n))) {
    return(n & 1) === 0
  }else {
    throw new Error(cljs.core.str.call(null, "Argument must be an integer: ", n));
  }
};
cljs.core.odd_QMARK_ = function odd_QMARK_(n) {
  return cljs.core.not.call(null, cljs.core.even_QMARK_.call(null, n))
};
cljs.core.identity = function identity(x) {
  return x
};
cljs.core.complement = function complement(f) {
  return function() {
    var G__3391 = null;
    var G__3391__3392 = function() {
      return cljs.core.not.call(null, f.call(null))
    };
    var G__3391__3393 = function(x) {
      return cljs.core.not.call(null, f.call(null, x))
    };
    var G__3391__3394 = function(x, y) {
      return cljs.core.not.call(null, f.call(null, x, y))
    };
    var G__3391__3395 = function() {
      var G__3397__delegate = function(x, y, zs) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, f, x, y, zs))
      };
      var G__3397 = function(x, y, var_args) {
        var zs = null;
        if(goog.isDef(var_args)) {
          zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
        }
        return G__3397__delegate.call(this, x, y, zs)
      };
      G__3397.cljs$lang$maxFixedArity = 2;
      G__3397.cljs$lang$applyTo = function(arglist__3398) {
        var x = cljs.core.first(arglist__3398);
        var y = cljs.core.first(cljs.core.next(arglist__3398));
        var zs = cljs.core.rest(cljs.core.next(arglist__3398));
        return G__3397__delegate.call(this, x, y, zs)
      };
      return G__3397
    }();
    G__3391 = function(x, y, var_args) {
      var zs = var_args;
      switch(arguments.length) {
        case 0:
          return G__3391__3392.call(this);
        case 1:
          return G__3391__3393.call(this, x);
        case 2:
          return G__3391__3394.call(this, x, y);
        default:
          return G__3391__3395.apply(this, arguments)
      }
      throw"Invalid arity: " + arguments.length;
    };
    G__3391.cljs$lang$maxFixedArity = 2;
    G__3391.cljs$lang$applyTo = G__3391__3395.cljs$lang$applyTo;
    return G__3391
  }()
};
cljs.core.constantly = function constantly(x) {
  return function() {
    var G__3399__delegate = function(args) {
      return x
    };
    var G__3399 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__3399__delegate.call(this, args)
    };
    G__3399.cljs$lang$maxFixedArity = 0;
    G__3399.cljs$lang$applyTo = function(arglist__3400) {
      var args = cljs.core.seq(arglist__3400);
      return G__3399__delegate.call(this, args)
    };
    return G__3399
  }()
};
cljs.core.comp = function() {
  var comp = null;
  var comp__3404 = function() {
    return cljs.core.identity
  };
  var comp__3405 = function(f) {
    return f
  };
  var comp__3406 = function(f, g) {
    return function() {
      var G__3410 = null;
      var G__3410__3411 = function() {
        return f.call(null, g.call(null))
      };
      var G__3410__3412 = function(x) {
        return f.call(null, g.call(null, x))
      };
      var G__3410__3413 = function(x, y) {
        return f.call(null, g.call(null, x, y))
      };
      var G__3410__3414 = function(x, y, z) {
        return f.call(null, g.call(null, x, y, z))
      };
      var G__3410__3415 = function() {
        var G__3417__delegate = function(x, y, z, args) {
          return f.call(null, cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__3417 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3417__delegate.call(this, x, y, z, args)
        };
        G__3417.cljs$lang$maxFixedArity = 3;
        G__3417.cljs$lang$applyTo = function(arglist__3418) {
          var x = cljs.core.first(arglist__3418);
          var y = cljs.core.first(cljs.core.next(arglist__3418));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3418)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3418)));
          return G__3417__delegate.call(this, x, y, z, args)
        };
        return G__3417
      }();
      G__3410 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__3410__3411.call(this);
          case 1:
            return G__3410__3412.call(this, x);
          case 2:
            return G__3410__3413.call(this, x, y);
          case 3:
            return G__3410__3414.call(this, x, y, z);
          default:
            return G__3410__3415.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3410.cljs$lang$maxFixedArity = 3;
      G__3410.cljs$lang$applyTo = G__3410__3415.cljs$lang$applyTo;
      return G__3410
    }()
  };
  var comp__3407 = function(f, g, h) {
    return function() {
      var G__3419 = null;
      var G__3419__3420 = function() {
        return f.call(null, g.call(null, h.call(null)))
      };
      var G__3419__3421 = function(x) {
        return f.call(null, g.call(null, h.call(null, x)))
      };
      var G__3419__3422 = function(x, y) {
        return f.call(null, g.call(null, h.call(null, x, y)))
      };
      var G__3419__3423 = function(x, y, z) {
        return f.call(null, g.call(null, h.call(null, x, y, z)))
      };
      var G__3419__3424 = function() {
        var G__3426__delegate = function(x, y, z, args) {
          return f.call(null, g.call(null, cljs.core.apply.call(null, h, x, y, z, args)))
        };
        var G__3426 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3426__delegate.call(this, x, y, z, args)
        };
        G__3426.cljs$lang$maxFixedArity = 3;
        G__3426.cljs$lang$applyTo = function(arglist__3427) {
          var x = cljs.core.first(arglist__3427);
          var y = cljs.core.first(cljs.core.next(arglist__3427));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3427)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3427)));
          return G__3426__delegate.call(this, x, y, z, args)
        };
        return G__3426
      }();
      G__3419 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__3419__3420.call(this);
          case 1:
            return G__3419__3421.call(this, x);
          case 2:
            return G__3419__3422.call(this, x, y);
          case 3:
            return G__3419__3423.call(this, x, y, z);
          default:
            return G__3419__3424.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3419.cljs$lang$maxFixedArity = 3;
      G__3419.cljs$lang$applyTo = G__3419__3424.cljs$lang$applyTo;
      return G__3419
    }()
  };
  var comp__3408 = function() {
    var G__3428__delegate = function(f1, f2, f3, fs) {
      var fs__3401 = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, f1, f2, f3, fs));
      return function() {
        var G__3429__delegate = function(args) {
          var ret__3402 = cljs.core.apply.call(null, cljs.core.first.call(null, fs__3401), args);
          var fs__3403 = cljs.core.next.call(null, fs__3401);
          while(true) {
            if(cljs.core.truth_(fs__3403)) {
              var G__3430 = cljs.core.first.call(null, fs__3403).call(null, ret__3402);
              var G__3431 = cljs.core.next.call(null, fs__3403);
              ret__3402 = G__3430;
              fs__3403 = G__3431;
              continue
            }else {
              return ret__3402
            }
            break
          }
        };
        var G__3429 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__3429__delegate.call(this, args)
        };
        G__3429.cljs$lang$maxFixedArity = 0;
        G__3429.cljs$lang$applyTo = function(arglist__3432) {
          var args = cljs.core.seq(arglist__3432);
          return G__3429__delegate.call(this, args)
        };
        return G__3429
      }()
    };
    var G__3428 = function(f1, f2, f3, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3428__delegate.call(this, f1, f2, f3, fs)
    };
    G__3428.cljs$lang$maxFixedArity = 3;
    G__3428.cljs$lang$applyTo = function(arglist__3433) {
      var f1 = cljs.core.first(arglist__3433);
      var f2 = cljs.core.first(cljs.core.next(arglist__3433));
      var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3433)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3433)));
      return G__3428__delegate.call(this, f1, f2, f3, fs)
    };
    return G__3428
  }();
  comp = function(f1, f2, f3, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 0:
        return comp__3404.call(this);
      case 1:
        return comp__3405.call(this, f1);
      case 2:
        return comp__3406.call(this, f1, f2);
      case 3:
        return comp__3407.call(this, f1, f2, f3);
      default:
        return comp__3408.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  comp.cljs$lang$maxFixedArity = 3;
  comp.cljs$lang$applyTo = comp__3408.cljs$lang$applyTo;
  return comp
}();
cljs.core.partial = function() {
  var partial = null;
  var partial__3434 = function(f, arg1) {
    return function() {
      var G__3439__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, args)
      };
      var G__3439 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__3439__delegate.call(this, args)
      };
      G__3439.cljs$lang$maxFixedArity = 0;
      G__3439.cljs$lang$applyTo = function(arglist__3440) {
        var args = cljs.core.seq(arglist__3440);
        return G__3439__delegate.call(this, args)
      };
      return G__3439
    }()
  };
  var partial__3435 = function(f, arg1, arg2) {
    return function() {
      var G__3441__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, args)
      };
      var G__3441 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__3441__delegate.call(this, args)
      };
      G__3441.cljs$lang$maxFixedArity = 0;
      G__3441.cljs$lang$applyTo = function(arglist__3442) {
        var args = cljs.core.seq(arglist__3442);
        return G__3441__delegate.call(this, args)
      };
      return G__3441
    }()
  };
  var partial__3436 = function(f, arg1, arg2, arg3) {
    return function() {
      var G__3443__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, arg3, args)
      };
      var G__3443 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__3443__delegate.call(this, args)
      };
      G__3443.cljs$lang$maxFixedArity = 0;
      G__3443.cljs$lang$applyTo = function(arglist__3444) {
        var args = cljs.core.seq(arglist__3444);
        return G__3443__delegate.call(this, args)
      };
      return G__3443
    }()
  };
  var partial__3437 = function() {
    var G__3445__delegate = function(f, arg1, arg2, arg3, more) {
      return function() {
        var G__3446__delegate = function(args) {
          return cljs.core.apply.call(null, f, arg1, arg2, arg3, cljs.core.concat.call(null, more, args))
        };
        var G__3446 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__3446__delegate.call(this, args)
        };
        G__3446.cljs$lang$maxFixedArity = 0;
        G__3446.cljs$lang$applyTo = function(arglist__3447) {
          var args = cljs.core.seq(arglist__3447);
          return G__3446__delegate.call(this, args)
        };
        return G__3446
      }()
    };
    var G__3445 = function(f, arg1, arg2, arg3, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__3445__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    G__3445.cljs$lang$maxFixedArity = 4;
    G__3445.cljs$lang$applyTo = function(arglist__3448) {
      var f = cljs.core.first(arglist__3448);
      var arg1 = cljs.core.first(cljs.core.next(arglist__3448));
      var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3448)));
      var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3448))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3448))));
      return G__3445__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    return G__3445
  }();
  partial = function(f, arg1, arg2, arg3, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return partial__3434.call(this, f, arg1);
      case 3:
        return partial__3435.call(this, f, arg1, arg2);
      case 4:
        return partial__3436.call(this, f, arg1, arg2, arg3);
      default:
        return partial__3437.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partial.cljs$lang$maxFixedArity = 4;
  partial.cljs$lang$applyTo = partial__3437.cljs$lang$applyTo;
  return partial
}();
cljs.core.fnil = function() {
  var fnil = null;
  var fnil__3449 = function(f, x) {
    return function() {
      var G__3453 = null;
      var G__3453__3454 = function(a) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a)
      };
      var G__3453__3455 = function(a, b) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, b)
      };
      var G__3453__3456 = function(a, b, c) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, b, c)
      };
      var G__3453__3457 = function() {
        var G__3459__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, b, c, ds)
        };
        var G__3459 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3459__delegate.call(this, a, b, c, ds)
        };
        G__3459.cljs$lang$maxFixedArity = 3;
        G__3459.cljs$lang$applyTo = function(arglist__3460) {
          var a = cljs.core.first(arglist__3460);
          var b = cljs.core.first(cljs.core.next(arglist__3460));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3460)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3460)));
          return G__3459__delegate.call(this, a, b, c, ds)
        };
        return G__3459
      }();
      G__3453 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 1:
            return G__3453__3454.call(this, a);
          case 2:
            return G__3453__3455.call(this, a, b);
          case 3:
            return G__3453__3456.call(this, a, b, c);
          default:
            return G__3453__3457.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3453.cljs$lang$maxFixedArity = 3;
      G__3453.cljs$lang$applyTo = G__3453__3457.cljs$lang$applyTo;
      return G__3453
    }()
  };
  var fnil__3450 = function(f, x, y) {
    return function() {
      var G__3461 = null;
      var G__3461__3462 = function(a, b) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b)
      };
      var G__3461__3463 = function(a, b, c) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, c)
      };
      var G__3461__3464 = function() {
        var G__3466__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, c, ds)
        };
        var G__3466 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3466__delegate.call(this, a, b, c, ds)
        };
        G__3466.cljs$lang$maxFixedArity = 3;
        G__3466.cljs$lang$applyTo = function(arglist__3467) {
          var a = cljs.core.first(arglist__3467);
          var b = cljs.core.first(cljs.core.next(arglist__3467));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3467)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3467)));
          return G__3466__delegate.call(this, a, b, c, ds)
        };
        return G__3466
      }();
      G__3461 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__3461__3462.call(this, a, b);
          case 3:
            return G__3461__3463.call(this, a, b, c);
          default:
            return G__3461__3464.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3461.cljs$lang$maxFixedArity = 3;
      G__3461.cljs$lang$applyTo = G__3461__3464.cljs$lang$applyTo;
      return G__3461
    }()
  };
  var fnil__3451 = function(f, x, y, z) {
    return function() {
      var G__3468 = null;
      var G__3468__3469 = function(a, b) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b)
      };
      var G__3468__3470 = function(a, b, c) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? z : c)
      };
      var G__3468__3471 = function() {
        var G__3473__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? z : c, ds)
        };
        var G__3473 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3473__delegate.call(this, a, b, c, ds)
        };
        G__3473.cljs$lang$maxFixedArity = 3;
        G__3473.cljs$lang$applyTo = function(arglist__3474) {
          var a = cljs.core.first(arglist__3474);
          var b = cljs.core.first(cljs.core.next(arglist__3474));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3474)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3474)));
          return G__3473__delegate.call(this, a, b, c, ds)
        };
        return G__3473
      }();
      G__3468 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__3468__3469.call(this, a, b);
          case 3:
            return G__3468__3470.call(this, a, b, c);
          default:
            return G__3468__3471.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3468.cljs$lang$maxFixedArity = 3;
      G__3468.cljs$lang$applyTo = G__3468__3471.cljs$lang$applyTo;
      return G__3468
    }()
  };
  fnil = function(f, x, y, z) {
    switch(arguments.length) {
      case 2:
        return fnil__3449.call(this, f, x);
      case 3:
        return fnil__3450.call(this, f, x, y);
      case 4:
        return fnil__3451.call(this, f, x, y, z)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return fnil
}();
cljs.core.map_indexed = function map_indexed(f, coll) {
  var mapi__3477 = function mpi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3475 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3475)) {
        var s__3476 = temp__3698__auto____3475;
        return cljs.core.cons.call(null, f.call(null, idx, cljs.core.first.call(null, s__3476)), mpi.call(null, idx + 1, cljs.core.rest.call(null, s__3476)))
      }else {
        return null
      }
    })
  };
  return mapi__3477.call(null, 0, coll)
};
cljs.core.keep = function keep(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____3478 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____3478)) {
      var s__3479 = temp__3698__auto____3478;
      var x__3480 = f.call(null, cljs.core.first.call(null, s__3479));
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x__3480))) {
        return keep.call(null, f, cljs.core.rest.call(null, s__3479))
      }else {
        return cljs.core.cons.call(null, x__3480, keep.call(null, f, cljs.core.rest.call(null, s__3479)))
      }
    }else {
      return null
    }
  })
};
cljs.core.keep_indexed = function keep_indexed(f, coll) {
  var keepi__3490 = function kpi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3487 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3487)) {
        var s__3488 = temp__3698__auto____3487;
        var x__3489 = f.call(null, idx, cljs.core.first.call(null, s__3488));
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x__3489))) {
          return kpi.call(null, idx + 1, cljs.core.rest.call(null, s__3488))
        }else {
          return cljs.core.cons.call(null, x__3489, kpi.call(null, idx + 1, cljs.core.rest.call(null, s__3488)))
        }
      }else {
        return null
      }
    })
  };
  return keepi__3490.call(null, 0, coll)
};
cljs.core.every_pred = function() {
  var every_pred = null;
  var every_pred__3535 = function(p) {
    return function() {
      var ep1 = null;
      var ep1__3540 = function() {
        return true
      };
      var ep1__3541 = function(x) {
        return cljs.core.boolean$.call(null, p.call(null, x))
      };
      var ep1__3542 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3497 = p.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3497)) {
            return p.call(null, y)
          }else {
            return and__3546__auto____3497
          }
        }())
      };
      var ep1__3543 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3498 = p.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3498)) {
            var and__3546__auto____3499 = p.call(null, y);
            if(cljs.core.truth_(and__3546__auto____3499)) {
              return p.call(null, z)
            }else {
              return and__3546__auto____3499
            }
          }else {
            return and__3546__auto____3498
          }
        }())
      };
      var ep1__3544 = function() {
        var G__3546__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3546__auto____3500 = ep1.call(null, x, y, z);
            if(cljs.core.truth_(and__3546__auto____3500)) {
              return cljs.core.every_QMARK_.call(null, p, args)
            }else {
              return and__3546__auto____3500
            }
          }())
        };
        var G__3546 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3546__delegate.call(this, x, y, z, args)
        };
        G__3546.cljs$lang$maxFixedArity = 3;
        G__3546.cljs$lang$applyTo = function(arglist__3547) {
          var x = cljs.core.first(arglist__3547);
          var y = cljs.core.first(cljs.core.next(arglist__3547));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3547)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3547)));
          return G__3546__delegate.call(this, x, y, z, args)
        };
        return G__3546
      }();
      ep1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep1__3540.call(this);
          case 1:
            return ep1__3541.call(this, x);
          case 2:
            return ep1__3542.call(this, x, y);
          case 3:
            return ep1__3543.call(this, x, y, z);
          default:
            return ep1__3544.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep1.cljs$lang$maxFixedArity = 3;
      ep1.cljs$lang$applyTo = ep1__3544.cljs$lang$applyTo;
      return ep1
    }()
  };
  var every_pred__3536 = function(p1, p2) {
    return function() {
      var ep2 = null;
      var ep2__3548 = function() {
        return true
      };
      var ep2__3549 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3501 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3501)) {
            return p2.call(null, x)
          }else {
            return and__3546__auto____3501
          }
        }())
      };
      var ep2__3550 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3502 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3502)) {
            var and__3546__auto____3503 = p1.call(null, y);
            if(cljs.core.truth_(and__3546__auto____3503)) {
              var and__3546__auto____3504 = p2.call(null, x);
              if(cljs.core.truth_(and__3546__auto____3504)) {
                return p2.call(null, y)
              }else {
                return and__3546__auto____3504
              }
            }else {
              return and__3546__auto____3503
            }
          }else {
            return and__3546__auto____3502
          }
        }())
      };
      var ep2__3551 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3505 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3505)) {
            var and__3546__auto____3506 = p1.call(null, y);
            if(cljs.core.truth_(and__3546__auto____3506)) {
              var and__3546__auto____3507 = p1.call(null, z);
              if(cljs.core.truth_(and__3546__auto____3507)) {
                var and__3546__auto____3508 = p2.call(null, x);
                if(cljs.core.truth_(and__3546__auto____3508)) {
                  var and__3546__auto____3509 = p2.call(null, y);
                  if(cljs.core.truth_(and__3546__auto____3509)) {
                    return p2.call(null, z)
                  }else {
                    return and__3546__auto____3509
                  }
                }else {
                  return and__3546__auto____3508
                }
              }else {
                return and__3546__auto____3507
              }
            }else {
              return and__3546__auto____3506
            }
          }else {
            return and__3546__auto____3505
          }
        }())
      };
      var ep2__3552 = function() {
        var G__3554__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3546__auto____3510 = ep2.call(null, x, y, z);
            if(cljs.core.truth_(and__3546__auto____3510)) {
              return cljs.core.every_QMARK_.call(null, function(p1__3481_SHARP_) {
                var and__3546__auto____3511 = p1.call(null, p1__3481_SHARP_);
                if(cljs.core.truth_(and__3546__auto____3511)) {
                  return p2.call(null, p1__3481_SHARP_)
                }else {
                  return and__3546__auto____3511
                }
              }, args)
            }else {
              return and__3546__auto____3510
            }
          }())
        };
        var G__3554 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3554__delegate.call(this, x, y, z, args)
        };
        G__3554.cljs$lang$maxFixedArity = 3;
        G__3554.cljs$lang$applyTo = function(arglist__3555) {
          var x = cljs.core.first(arglist__3555);
          var y = cljs.core.first(cljs.core.next(arglist__3555));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3555)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3555)));
          return G__3554__delegate.call(this, x, y, z, args)
        };
        return G__3554
      }();
      ep2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep2__3548.call(this);
          case 1:
            return ep2__3549.call(this, x);
          case 2:
            return ep2__3550.call(this, x, y);
          case 3:
            return ep2__3551.call(this, x, y, z);
          default:
            return ep2__3552.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep2.cljs$lang$maxFixedArity = 3;
      ep2.cljs$lang$applyTo = ep2__3552.cljs$lang$applyTo;
      return ep2
    }()
  };
  var every_pred__3537 = function(p1, p2, p3) {
    return function() {
      var ep3 = null;
      var ep3__3556 = function() {
        return true
      };
      var ep3__3557 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3512 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3512)) {
            var and__3546__auto____3513 = p2.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3513)) {
              return p3.call(null, x)
            }else {
              return and__3546__auto____3513
            }
          }else {
            return and__3546__auto____3512
          }
        }())
      };
      var ep3__3558 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3514 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3514)) {
            var and__3546__auto____3515 = p2.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3515)) {
              var and__3546__auto____3516 = p3.call(null, x);
              if(cljs.core.truth_(and__3546__auto____3516)) {
                var and__3546__auto____3517 = p1.call(null, y);
                if(cljs.core.truth_(and__3546__auto____3517)) {
                  var and__3546__auto____3518 = p2.call(null, y);
                  if(cljs.core.truth_(and__3546__auto____3518)) {
                    return p3.call(null, y)
                  }else {
                    return and__3546__auto____3518
                  }
                }else {
                  return and__3546__auto____3517
                }
              }else {
                return and__3546__auto____3516
              }
            }else {
              return and__3546__auto____3515
            }
          }else {
            return and__3546__auto____3514
          }
        }())
      };
      var ep3__3559 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3519 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3519)) {
            var and__3546__auto____3520 = p2.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3520)) {
              var and__3546__auto____3521 = p3.call(null, x);
              if(cljs.core.truth_(and__3546__auto____3521)) {
                var and__3546__auto____3522 = p1.call(null, y);
                if(cljs.core.truth_(and__3546__auto____3522)) {
                  var and__3546__auto____3523 = p2.call(null, y);
                  if(cljs.core.truth_(and__3546__auto____3523)) {
                    var and__3546__auto____3524 = p3.call(null, y);
                    if(cljs.core.truth_(and__3546__auto____3524)) {
                      var and__3546__auto____3525 = p1.call(null, z);
                      if(cljs.core.truth_(and__3546__auto____3525)) {
                        var and__3546__auto____3526 = p2.call(null, z);
                        if(cljs.core.truth_(and__3546__auto____3526)) {
                          return p3.call(null, z)
                        }else {
                          return and__3546__auto____3526
                        }
                      }else {
                        return and__3546__auto____3525
                      }
                    }else {
                      return and__3546__auto____3524
                    }
                  }else {
                    return and__3546__auto____3523
                  }
                }else {
                  return and__3546__auto____3522
                }
              }else {
                return and__3546__auto____3521
              }
            }else {
              return and__3546__auto____3520
            }
          }else {
            return and__3546__auto____3519
          }
        }())
      };
      var ep3__3560 = function() {
        var G__3562__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3546__auto____3527 = ep3.call(null, x, y, z);
            if(cljs.core.truth_(and__3546__auto____3527)) {
              return cljs.core.every_QMARK_.call(null, function(p1__3482_SHARP_) {
                var and__3546__auto____3528 = p1.call(null, p1__3482_SHARP_);
                if(cljs.core.truth_(and__3546__auto____3528)) {
                  var and__3546__auto____3529 = p2.call(null, p1__3482_SHARP_);
                  if(cljs.core.truth_(and__3546__auto____3529)) {
                    return p3.call(null, p1__3482_SHARP_)
                  }else {
                    return and__3546__auto____3529
                  }
                }else {
                  return and__3546__auto____3528
                }
              }, args)
            }else {
              return and__3546__auto____3527
            }
          }())
        };
        var G__3562 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3562__delegate.call(this, x, y, z, args)
        };
        G__3562.cljs$lang$maxFixedArity = 3;
        G__3562.cljs$lang$applyTo = function(arglist__3563) {
          var x = cljs.core.first(arglist__3563);
          var y = cljs.core.first(cljs.core.next(arglist__3563));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3563)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3563)));
          return G__3562__delegate.call(this, x, y, z, args)
        };
        return G__3562
      }();
      ep3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep3__3556.call(this);
          case 1:
            return ep3__3557.call(this, x);
          case 2:
            return ep3__3558.call(this, x, y);
          case 3:
            return ep3__3559.call(this, x, y, z);
          default:
            return ep3__3560.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep3.cljs$lang$maxFixedArity = 3;
      ep3.cljs$lang$applyTo = ep3__3560.cljs$lang$applyTo;
      return ep3
    }()
  };
  var every_pred__3538 = function() {
    var G__3564__delegate = function(p1, p2, p3, ps) {
      var ps__3530 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var epn = null;
        var epn__3565 = function() {
          return true
        };
        var epn__3566 = function(x) {
          return cljs.core.every_QMARK_.call(null, function(p1__3483_SHARP_) {
            return p1__3483_SHARP_.call(null, x)
          }, ps__3530)
        };
        var epn__3567 = function(x, y) {
          return cljs.core.every_QMARK_.call(null, function(p1__3484_SHARP_) {
            var and__3546__auto____3531 = p1__3484_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3531)) {
              return p1__3484_SHARP_.call(null, y)
            }else {
              return and__3546__auto____3531
            }
          }, ps__3530)
        };
        var epn__3568 = function(x, y, z) {
          return cljs.core.every_QMARK_.call(null, function(p1__3485_SHARP_) {
            var and__3546__auto____3532 = p1__3485_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3532)) {
              var and__3546__auto____3533 = p1__3485_SHARP_.call(null, y);
              if(cljs.core.truth_(and__3546__auto____3533)) {
                return p1__3485_SHARP_.call(null, z)
              }else {
                return and__3546__auto____3533
              }
            }else {
              return and__3546__auto____3532
            }
          }, ps__3530)
        };
        var epn__3569 = function() {
          var G__3571__delegate = function(x, y, z, args) {
            return cljs.core.boolean$.call(null, function() {
              var and__3546__auto____3534 = epn.call(null, x, y, z);
              if(cljs.core.truth_(and__3546__auto____3534)) {
                return cljs.core.every_QMARK_.call(null, function(p1__3486_SHARP_) {
                  return cljs.core.every_QMARK_.call(null, p1__3486_SHARP_, args)
                }, ps__3530)
              }else {
                return and__3546__auto____3534
              }
            }())
          };
          var G__3571 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__3571__delegate.call(this, x, y, z, args)
          };
          G__3571.cljs$lang$maxFixedArity = 3;
          G__3571.cljs$lang$applyTo = function(arglist__3572) {
            var x = cljs.core.first(arglist__3572);
            var y = cljs.core.first(cljs.core.next(arglist__3572));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3572)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3572)));
            return G__3571__delegate.call(this, x, y, z, args)
          };
          return G__3571
        }();
        epn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return epn__3565.call(this);
            case 1:
              return epn__3566.call(this, x);
            case 2:
              return epn__3567.call(this, x, y);
            case 3:
              return epn__3568.call(this, x, y, z);
            default:
              return epn__3569.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        epn.cljs$lang$maxFixedArity = 3;
        epn.cljs$lang$applyTo = epn__3569.cljs$lang$applyTo;
        return epn
      }()
    };
    var G__3564 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3564__delegate.call(this, p1, p2, p3, ps)
    };
    G__3564.cljs$lang$maxFixedArity = 3;
    G__3564.cljs$lang$applyTo = function(arglist__3573) {
      var p1 = cljs.core.first(arglist__3573);
      var p2 = cljs.core.first(cljs.core.next(arglist__3573));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3573)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3573)));
      return G__3564__delegate.call(this, p1, p2, p3, ps)
    };
    return G__3564
  }();
  every_pred = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return every_pred__3535.call(this, p1);
      case 2:
        return every_pred__3536.call(this, p1, p2);
      case 3:
        return every_pred__3537.call(this, p1, p2, p3);
      default:
        return every_pred__3538.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  every_pred.cljs$lang$maxFixedArity = 3;
  every_pred.cljs$lang$applyTo = every_pred__3538.cljs$lang$applyTo;
  return every_pred
}();
cljs.core.some_fn = function() {
  var some_fn = null;
  var some_fn__3613 = function(p) {
    return function() {
      var sp1 = null;
      var sp1__3618 = function() {
        return null
      };
      var sp1__3619 = function(x) {
        return p.call(null, x)
      };
      var sp1__3620 = function(x, y) {
        var or__3548__auto____3575 = p.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3575)) {
          return or__3548__auto____3575
        }else {
          return p.call(null, y)
        }
      };
      var sp1__3621 = function(x, y, z) {
        var or__3548__auto____3576 = p.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3576)) {
          return or__3548__auto____3576
        }else {
          var or__3548__auto____3577 = p.call(null, y);
          if(cljs.core.truth_(or__3548__auto____3577)) {
            return or__3548__auto____3577
          }else {
            return p.call(null, z)
          }
        }
      };
      var sp1__3622 = function() {
        var G__3624__delegate = function(x, y, z, args) {
          var or__3548__auto____3578 = sp1.call(null, x, y, z);
          if(cljs.core.truth_(or__3548__auto____3578)) {
            return or__3548__auto____3578
          }else {
            return cljs.core.some.call(null, p, args)
          }
        };
        var G__3624 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3624__delegate.call(this, x, y, z, args)
        };
        G__3624.cljs$lang$maxFixedArity = 3;
        G__3624.cljs$lang$applyTo = function(arglist__3625) {
          var x = cljs.core.first(arglist__3625);
          var y = cljs.core.first(cljs.core.next(arglist__3625));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3625)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3625)));
          return G__3624__delegate.call(this, x, y, z, args)
        };
        return G__3624
      }();
      sp1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp1__3618.call(this);
          case 1:
            return sp1__3619.call(this, x);
          case 2:
            return sp1__3620.call(this, x, y);
          case 3:
            return sp1__3621.call(this, x, y, z);
          default:
            return sp1__3622.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp1.cljs$lang$maxFixedArity = 3;
      sp1.cljs$lang$applyTo = sp1__3622.cljs$lang$applyTo;
      return sp1
    }()
  };
  var some_fn__3614 = function(p1, p2) {
    return function() {
      var sp2 = null;
      var sp2__3626 = function() {
        return null
      };
      var sp2__3627 = function(x) {
        var or__3548__auto____3579 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3579)) {
          return or__3548__auto____3579
        }else {
          return p2.call(null, x)
        }
      };
      var sp2__3628 = function(x, y) {
        var or__3548__auto____3580 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3580)) {
          return or__3548__auto____3580
        }else {
          var or__3548__auto____3581 = p1.call(null, y);
          if(cljs.core.truth_(or__3548__auto____3581)) {
            return or__3548__auto____3581
          }else {
            var or__3548__auto____3582 = p2.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3582)) {
              return or__3548__auto____3582
            }else {
              return p2.call(null, y)
            }
          }
        }
      };
      var sp2__3629 = function(x, y, z) {
        var or__3548__auto____3583 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3583)) {
          return or__3548__auto____3583
        }else {
          var or__3548__auto____3584 = p1.call(null, y);
          if(cljs.core.truth_(or__3548__auto____3584)) {
            return or__3548__auto____3584
          }else {
            var or__3548__auto____3585 = p1.call(null, z);
            if(cljs.core.truth_(or__3548__auto____3585)) {
              return or__3548__auto____3585
            }else {
              var or__3548__auto____3586 = p2.call(null, x);
              if(cljs.core.truth_(or__3548__auto____3586)) {
                return or__3548__auto____3586
              }else {
                var or__3548__auto____3587 = p2.call(null, y);
                if(cljs.core.truth_(or__3548__auto____3587)) {
                  return or__3548__auto____3587
                }else {
                  return p2.call(null, z)
                }
              }
            }
          }
        }
      };
      var sp2__3630 = function() {
        var G__3632__delegate = function(x, y, z, args) {
          var or__3548__auto____3588 = sp2.call(null, x, y, z);
          if(cljs.core.truth_(or__3548__auto____3588)) {
            return or__3548__auto____3588
          }else {
            return cljs.core.some.call(null, function(p1__3491_SHARP_) {
              var or__3548__auto____3589 = p1.call(null, p1__3491_SHARP_);
              if(cljs.core.truth_(or__3548__auto____3589)) {
                return or__3548__auto____3589
              }else {
                return p2.call(null, p1__3491_SHARP_)
              }
            }, args)
          }
        };
        var G__3632 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3632__delegate.call(this, x, y, z, args)
        };
        G__3632.cljs$lang$maxFixedArity = 3;
        G__3632.cljs$lang$applyTo = function(arglist__3633) {
          var x = cljs.core.first(arglist__3633);
          var y = cljs.core.first(cljs.core.next(arglist__3633));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3633)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3633)));
          return G__3632__delegate.call(this, x, y, z, args)
        };
        return G__3632
      }();
      sp2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp2__3626.call(this);
          case 1:
            return sp2__3627.call(this, x);
          case 2:
            return sp2__3628.call(this, x, y);
          case 3:
            return sp2__3629.call(this, x, y, z);
          default:
            return sp2__3630.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp2.cljs$lang$maxFixedArity = 3;
      sp2.cljs$lang$applyTo = sp2__3630.cljs$lang$applyTo;
      return sp2
    }()
  };
  var some_fn__3615 = function(p1, p2, p3) {
    return function() {
      var sp3 = null;
      var sp3__3634 = function() {
        return null
      };
      var sp3__3635 = function(x) {
        var or__3548__auto____3590 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3590)) {
          return or__3548__auto____3590
        }else {
          var or__3548__auto____3591 = p2.call(null, x);
          if(cljs.core.truth_(or__3548__auto____3591)) {
            return or__3548__auto____3591
          }else {
            return p3.call(null, x)
          }
        }
      };
      var sp3__3636 = function(x, y) {
        var or__3548__auto____3592 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3592)) {
          return or__3548__auto____3592
        }else {
          var or__3548__auto____3593 = p2.call(null, x);
          if(cljs.core.truth_(or__3548__auto____3593)) {
            return or__3548__auto____3593
          }else {
            var or__3548__auto____3594 = p3.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3594)) {
              return or__3548__auto____3594
            }else {
              var or__3548__auto____3595 = p1.call(null, y);
              if(cljs.core.truth_(or__3548__auto____3595)) {
                return or__3548__auto____3595
              }else {
                var or__3548__auto____3596 = p2.call(null, y);
                if(cljs.core.truth_(or__3548__auto____3596)) {
                  return or__3548__auto____3596
                }else {
                  return p3.call(null, y)
                }
              }
            }
          }
        }
      };
      var sp3__3637 = function(x, y, z) {
        var or__3548__auto____3597 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3597)) {
          return or__3548__auto____3597
        }else {
          var or__3548__auto____3598 = p2.call(null, x);
          if(cljs.core.truth_(or__3548__auto____3598)) {
            return or__3548__auto____3598
          }else {
            var or__3548__auto____3599 = p3.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3599)) {
              return or__3548__auto____3599
            }else {
              var or__3548__auto____3600 = p1.call(null, y);
              if(cljs.core.truth_(or__3548__auto____3600)) {
                return or__3548__auto____3600
              }else {
                var or__3548__auto____3601 = p2.call(null, y);
                if(cljs.core.truth_(or__3548__auto____3601)) {
                  return or__3548__auto____3601
                }else {
                  var or__3548__auto____3602 = p3.call(null, y);
                  if(cljs.core.truth_(or__3548__auto____3602)) {
                    return or__3548__auto____3602
                  }else {
                    var or__3548__auto____3603 = p1.call(null, z);
                    if(cljs.core.truth_(or__3548__auto____3603)) {
                      return or__3548__auto____3603
                    }else {
                      var or__3548__auto____3604 = p2.call(null, z);
                      if(cljs.core.truth_(or__3548__auto____3604)) {
                        return or__3548__auto____3604
                      }else {
                        return p3.call(null, z)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      var sp3__3638 = function() {
        var G__3640__delegate = function(x, y, z, args) {
          var or__3548__auto____3605 = sp3.call(null, x, y, z);
          if(cljs.core.truth_(or__3548__auto____3605)) {
            return or__3548__auto____3605
          }else {
            return cljs.core.some.call(null, function(p1__3492_SHARP_) {
              var or__3548__auto____3606 = p1.call(null, p1__3492_SHARP_);
              if(cljs.core.truth_(or__3548__auto____3606)) {
                return or__3548__auto____3606
              }else {
                var or__3548__auto____3607 = p2.call(null, p1__3492_SHARP_);
                if(cljs.core.truth_(or__3548__auto____3607)) {
                  return or__3548__auto____3607
                }else {
                  return p3.call(null, p1__3492_SHARP_)
                }
              }
            }, args)
          }
        };
        var G__3640 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3640__delegate.call(this, x, y, z, args)
        };
        G__3640.cljs$lang$maxFixedArity = 3;
        G__3640.cljs$lang$applyTo = function(arglist__3641) {
          var x = cljs.core.first(arglist__3641);
          var y = cljs.core.first(cljs.core.next(arglist__3641));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3641)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3641)));
          return G__3640__delegate.call(this, x, y, z, args)
        };
        return G__3640
      }();
      sp3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp3__3634.call(this);
          case 1:
            return sp3__3635.call(this, x);
          case 2:
            return sp3__3636.call(this, x, y);
          case 3:
            return sp3__3637.call(this, x, y, z);
          default:
            return sp3__3638.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp3.cljs$lang$maxFixedArity = 3;
      sp3.cljs$lang$applyTo = sp3__3638.cljs$lang$applyTo;
      return sp3
    }()
  };
  var some_fn__3616 = function() {
    var G__3642__delegate = function(p1, p2, p3, ps) {
      var ps__3608 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var spn = null;
        var spn__3643 = function() {
          return null
        };
        var spn__3644 = function(x) {
          return cljs.core.some.call(null, function(p1__3493_SHARP_) {
            return p1__3493_SHARP_.call(null, x)
          }, ps__3608)
        };
        var spn__3645 = function(x, y) {
          return cljs.core.some.call(null, function(p1__3494_SHARP_) {
            var or__3548__auto____3609 = p1__3494_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3609)) {
              return or__3548__auto____3609
            }else {
              return p1__3494_SHARP_.call(null, y)
            }
          }, ps__3608)
        };
        var spn__3646 = function(x, y, z) {
          return cljs.core.some.call(null, function(p1__3495_SHARP_) {
            var or__3548__auto____3610 = p1__3495_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3610)) {
              return or__3548__auto____3610
            }else {
              var or__3548__auto____3611 = p1__3495_SHARP_.call(null, y);
              if(cljs.core.truth_(or__3548__auto____3611)) {
                return or__3548__auto____3611
              }else {
                return p1__3495_SHARP_.call(null, z)
              }
            }
          }, ps__3608)
        };
        var spn__3647 = function() {
          var G__3649__delegate = function(x, y, z, args) {
            var or__3548__auto____3612 = spn.call(null, x, y, z);
            if(cljs.core.truth_(or__3548__auto____3612)) {
              return or__3548__auto____3612
            }else {
              return cljs.core.some.call(null, function(p1__3496_SHARP_) {
                return cljs.core.some.call(null, p1__3496_SHARP_, args)
              }, ps__3608)
            }
          };
          var G__3649 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__3649__delegate.call(this, x, y, z, args)
          };
          G__3649.cljs$lang$maxFixedArity = 3;
          G__3649.cljs$lang$applyTo = function(arglist__3650) {
            var x = cljs.core.first(arglist__3650);
            var y = cljs.core.first(cljs.core.next(arglist__3650));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3650)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3650)));
            return G__3649__delegate.call(this, x, y, z, args)
          };
          return G__3649
        }();
        spn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return spn__3643.call(this);
            case 1:
              return spn__3644.call(this, x);
            case 2:
              return spn__3645.call(this, x, y);
            case 3:
              return spn__3646.call(this, x, y, z);
            default:
              return spn__3647.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        spn.cljs$lang$maxFixedArity = 3;
        spn.cljs$lang$applyTo = spn__3647.cljs$lang$applyTo;
        return spn
      }()
    };
    var G__3642 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3642__delegate.call(this, p1, p2, p3, ps)
    };
    G__3642.cljs$lang$maxFixedArity = 3;
    G__3642.cljs$lang$applyTo = function(arglist__3651) {
      var p1 = cljs.core.first(arglist__3651);
      var p2 = cljs.core.first(cljs.core.next(arglist__3651));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3651)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3651)));
      return G__3642__delegate.call(this, p1, p2, p3, ps)
    };
    return G__3642
  }();
  some_fn = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return some_fn__3613.call(this, p1);
      case 2:
        return some_fn__3614.call(this, p1, p2);
      case 3:
        return some_fn__3615.call(this, p1, p2, p3);
      default:
        return some_fn__3616.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  some_fn.cljs$lang$maxFixedArity = 3;
  some_fn.cljs$lang$applyTo = some_fn__3616.cljs$lang$applyTo;
  return some_fn
}();
cljs.core.map = function() {
  var map = null;
  var map__3664 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3652 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3652)) {
        var s__3653 = temp__3698__auto____3652;
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s__3653)), map.call(null, f, cljs.core.rest.call(null, s__3653)))
      }else {
        return null
      }
    })
  };
  var map__3665 = function(f, c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__3654 = cljs.core.seq.call(null, c1);
      var s2__3655 = cljs.core.seq.call(null, c2);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3656 = s1__3654;
        if(cljs.core.truth_(and__3546__auto____3656)) {
          return s2__3655
        }else {
          return and__3546__auto____3656
        }
      }())) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__3654), cljs.core.first.call(null, s2__3655)), map.call(null, f, cljs.core.rest.call(null, s1__3654), cljs.core.rest.call(null, s2__3655)))
      }else {
        return null
      }
    })
  };
  var map__3666 = function(f, c1, c2, c3) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__3657 = cljs.core.seq.call(null, c1);
      var s2__3658 = cljs.core.seq.call(null, c2);
      var s3__3659 = cljs.core.seq.call(null, c3);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3660 = s1__3657;
        if(cljs.core.truth_(and__3546__auto____3660)) {
          var and__3546__auto____3661 = s2__3658;
          if(cljs.core.truth_(and__3546__auto____3661)) {
            return s3__3659
          }else {
            return and__3546__auto____3661
          }
        }else {
          return and__3546__auto____3660
        }
      }())) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__3657), cljs.core.first.call(null, s2__3658), cljs.core.first.call(null, s3__3659)), map.call(null, f, cljs.core.rest.call(null, s1__3657), cljs.core.rest.call(null, s2__3658), cljs.core.rest.call(null, s3__3659)))
      }else {
        return null
      }
    })
  };
  var map__3667 = function() {
    var G__3669__delegate = function(f, c1, c2, c3, colls) {
      var step__3663 = function step(cs) {
        return new cljs.core.LazySeq(null, false, function() {
          var ss__3662 = map.call(null, cljs.core.seq, cs);
          if(cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__3662))) {
            return cljs.core.cons.call(null, map.call(null, cljs.core.first, ss__3662), step.call(null, map.call(null, cljs.core.rest, ss__3662)))
          }else {
            return null
          }
        })
      };
      return map.call(null, function(p1__3574_SHARP_) {
        return cljs.core.apply.call(null, f, p1__3574_SHARP_)
      }, step__3663.call(null, cljs.core.conj.call(null, colls, c3, c2, c1)))
    };
    var G__3669 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__3669__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__3669.cljs$lang$maxFixedArity = 4;
    G__3669.cljs$lang$applyTo = function(arglist__3670) {
      var f = cljs.core.first(arglist__3670);
      var c1 = cljs.core.first(cljs.core.next(arglist__3670));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3670)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3670))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3670))));
      return G__3669__delegate.call(this, f, c1, c2, c3, colls)
    };
    return G__3669
  }();
  map = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return map__3664.call(this, f, c1);
      case 3:
        return map__3665.call(this, f, c1, c2);
      case 4:
        return map__3666.call(this, f, c1, c2, c3);
      default:
        return map__3667.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  map.cljs$lang$maxFixedArity = 4;
  map.cljs$lang$applyTo = map__3667.cljs$lang$applyTo;
  return map
}();
cljs.core.take = function take(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    if(cljs.core.truth_(n > 0)) {
      var temp__3698__auto____3671 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3671)) {
        var s__3672 = temp__3698__auto____3671;
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__3672), take.call(null, n - 1, cljs.core.rest.call(null, s__3672)))
      }else {
        return null
      }
    }else {
      return null
    }
  })
};
cljs.core.drop = function drop(n, coll) {
  var step__3675 = function(n, coll) {
    while(true) {
      var s__3673 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3674 = n > 0;
        if(cljs.core.truth_(and__3546__auto____3674)) {
          return s__3673
        }else {
          return and__3546__auto____3674
        }
      }())) {
        var G__3676 = n - 1;
        var G__3677 = cljs.core.rest.call(null, s__3673);
        n = G__3676;
        coll = G__3677;
        continue
      }else {
        return s__3673
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__3675.call(null, n, coll)
  })
};
cljs.core.drop_last = function() {
  var drop_last = null;
  var drop_last__3678 = function(s) {
    return drop_last.call(null, 1, s)
  };
  var drop_last__3679 = function(n, s) {
    return cljs.core.map.call(null, function(x, _) {
      return x
    }, s, cljs.core.drop.call(null, n, s))
  };
  drop_last = function(n, s) {
    switch(arguments.length) {
      case 1:
        return drop_last__3678.call(this, n);
      case 2:
        return drop_last__3679.call(this, n, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return drop_last
}();
cljs.core.take_last = function take_last(n, coll) {
  var s__3681 = cljs.core.seq.call(null, coll);
  var lead__3682 = cljs.core.seq.call(null, cljs.core.drop.call(null, n, coll));
  while(true) {
    if(cljs.core.truth_(lead__3682)) {
      var G__3683 = cljs.core.next.call(null, s__3681);
      var G__3684 = cljs.core.next.call(null, lead__3682);
      s__3681 = G__3683;
      lead__3682 = G__3684;
      continue
    }else {
      return s__3681
    }
    break
  }
};
cljs.core.drop_while = function drop_while(pred, coll) {
  var step__3687 = function(pred, coll) {
    while(true) {
      var s__3685 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3686 = s__3685;
        if(cljs.core.truth_(and__3546__auto____3686)) {
          return pred.call(null, cljs.core.first.call(null, s__3685))
        }else {
          return and__3546__auto____3686
        }
      }())) {
        var G__3688 = pred;
        var G__3689 = cljs.core.rest.call(null, s__3685);
        pred = G__3688;
        coll = G__3689;
        continue
      }else {
        return s__3685
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__3687.call(null, pred, coll)
  })
};
cljs.core.cycle = function cycle(coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____3690 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____3690)) {
      var s__3691 = temp__3698__auto____3690;
      return cljs.core.concat.call(null, s__3691, cycle.call(null, s__3691))
    }else {
      return null
    }
  })
};
cljs.core.split_at = function split_at(n, coll) {
  return cljs.core.Vector.fromArray([cljs.core.take.call(null, n, coll), cljs.core.drop.call(null, n, coll)])
};
cljs.core.repeat = function() {
  var repeat = null;
  var repeat__3692 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, x, repeat.call(null, x))
    })
  };
  var repeat__3693 = function(n, x) {
    return cljs.core.take.call(null, n, repeat.call(null, x))
  };
  repeat = function(n, x) {
    switch(arguments.length) {
      case 1:
        return repeat__3692.call(this, n);
      case 2:
        return repeat__3693.call(this, n, x)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return repeat
}();
cljs.core.replicate = function replicate(n, x) {
  return cljs.core.take.call(null, n, cljs.core.repeat.call(null, x))
};
cljs.core.repeatedly = function() {
  var repeatedly = null;
  var repeatedly__3695 = function(f) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, f.call(null), repeatedly.call(null, f))
    })
  };
  var repeatedly__3696 = function(n, f) {
    return cljs.core.take.call(null, n, repeatedly.call(null, f))
  };
  repeatedly = function(n, f) {
    switch(arguments.length) {
      case 1:
        return repeatedly__3695.call(this, n);
      case 2:
        return repeatedly__3696.call(this, n, f)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return repeatedly
}();
cljs.core.iterate = function iterate(f, x) {
  return cljs.core.cons.call(null, x, new cljs.core.LazySeq(null, false, function() {
    return iterate.call(null, f, f.call(null, x))
  }))
};
cljs.core.interleave = function() {
  var interleave = null;
  var interleave__3702 = function(c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__3698 = cljs.core.seq.call(null, c1);
      var s2__3699 = cljs.core.seq.call(null, c2);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3700 = s1__3698;
        if(cljs.core.truth_(and__3546__auto____3700)) {
          return s2__3699
        }else {
          return and__3546__auto____3700
        }
      }())) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s1__3698), cljs.core.cons.call(null, cljs.core.first.call(null, s2__3699), interleave.call(null, cljs.core.rest.call(null, s1__3698), cljs.core.rest.call(null, s2__3699))))
      }else {
        return null
      }
    })
  };
  var interleave__3703 = function() {
    var G__3705__delegate = function(c1, c2, colls) {
      return new cljs.core.LazySeq(null, false, function() {
        var ss__3701 = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, colls, c2, c1));
        if(cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__3701))) {
          return cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, ss__3701), cljs.core.apply.call(null, interleave, cljs.core.map.call(null, cljs.core.rest, ss__3701)))
        }else {
          return null
        }
      })
    };
    var G__3705 = function(c1, c2, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3705__delegate.call(this, c1, c2, colls)
    };
    G__3705.cljs$lang$maxFixedArity = 2;
    G__3705.cljs$lang$applyTo = function(arglist__3706) {
      var c1 = cljs.core.first(arglist__3706);
      var c2 = cljs.core.first(cljs.core.next(arglist__3706));
      var colls = cljs.core.rest(cljs.core.next(arglist__3706));
      return G__3705__delegate.call(this, c1, c2, colls)
    };
    return G__3705
  }();
  interleave = function(c1, c2, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return interleave__3702.call(this, c1, c2);
      default:
        return interleave__3703.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  interleave.cljs$lang$maxFixedArity = 2;
  interleave.cljs$lang$applyTo = interleave__3703.cljs$lang$applyTo;
  return interleave
}();
cljs.core.interpose = function interpose(sep, coll) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, sep), coll))
};
cljs.core.flatten1 = function flatten1(colls) {
  var cat__3709 = function cat(coll, colls) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3695__auto____3707 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3695__auto____3707)) {
        var coll__3708 = temp__3695__auto____3707;
        return cljs.core.cons.call(null, cljs.core.first.call(null, coll__3708), cat.call(null, cljs.core.rest.call(null, coll__3708), colls))
      }else {
        if(cljs.core.truth_(cljs.core.seq.call(null, colls))) {
          return cat.call(null, cljs.core.first.call(null, colls), cljs.core.rest.call(null, colls))
        }else {
          return null
        }
      }
    })
  };
  return cat__3709.call(null, null, colls)
};
cljs.core.mapcat = function() {
  var mapcat = null;
  var mapcat__3710 = function(f, coll) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, f, coll))
  };
  var mapcat__3711 = function() {
    var G__3713__delegate = function(f, coll, colls) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, f, coll, colls))
    };
    var G__3713 = function(f, coll, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3713__delegate.call(this, f, coll, colls)
    };
    G__3713.cljs$lang$maxFixedArity = 2;
    G__3713.cljs$lang$applyTo = function(arglist__3714) {
      var f = cljs.core.first(arglist__3714);
      var coll = cljs.core.first(cljs.core.next(arglist__3714));
      var colls = cljs.core.rest(cljs.core.next(arglist__3714));
      return G__3713__delegate.call(this, f, coll, colls)
    };
    return G__3713
  }();
  mapcat = function(f, coll, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapcat__3710.call(this, f, coll);
      default:
        return mapcat__3711.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapcat.cljs$lang$maxFixedArity = 2;
  mapcat.cljs$lang$applyTo = mapcat__3711.cljs$lang$applyTo;
  return mapcat
}();
cljs.core.filter = function filter(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____3715 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____3715)) {
      var s__3716 = temp__3698__auto____3715;
      var f__3717 = cljs.core.first.call(null, s__3716);
      var r__3718 = cljs.core.rest.call(null, s__3716);
      if(cljs.core.truth_(pred.call(null, f__3717))) {
        return cljs.core.cons.call(null, f__3717, filter.call(null, pred, r__3718))
      }else {
        return filter.call(null, pred, r__3718)
      }
    }else {
      return null
    }
  })
};
cljs.core.remove = function remove(pred, coll) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, pred), coll)
};
cljs.core.tree_seq = function tree_seq(branch_QMARK_, children, root) {
  var walk__3720 = function walk(node) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, node, cljs.core.truth_(branch_QMARK_.call(null, node)) ? cljs.core.mapcat.call(null, walk, children.call(null, node)) : null)
    })
  };
  return walk__3720.call(null, root)
};
cljs.core.flatten = function flatten(x) {
  return cljs.core.filter.call(null, function(p1__3719_SHARP_) {
    return cljs.core.not.call(null, cljs.core.sequential_QMARK_.call(null, p1__3719_SHARP_))
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, x)))
};
cljs.core.into = function into(to, from) {
  return cljs.core.reduce.call(null, cljs.core._conj, to, from)
};
cljs.core.partition = function() {
  var partition = null;
  var partition__3727 = function(n, coll) {
    return partition.call(null, n, n, coll)
  };
  var partition__3728 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3721 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3721)) {
        var s__3722 = temp__3698__auto____3721;
        var p__3723 = cljs.core.take.call(null, n, s__3722);
        if(cljs.core.truth_(cljs.core._EQ_.call(null, n, cljs.core.count.call(null, p__3723)))) {
          return cljs.core.cons.call(null, p__3723, partition.call(null, n, step, cljs.core.drop.call(null, step, s__3722)))
        }else {
          return null
        }
      }else {
        return null
      }
    })
  };
  var partition__3729 = function(n, step, pad, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3724 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3724)) {
        var s__3725 = temp__3698__auto____3724;
        var p__3726 = cljs.core.take.call(null, n, s__3725);
        if(cljs.core.truth_(cljs.core._EQ_.call(null, n, cljs.core.count.call(null, p__3726)))) {
          return cljs.core.cons.call(null, p__3726, partition.call(null, n, step, pad, cljs.core.drop.call(null, step, s__3725)))
        }else {
          return cljs.core.list.call(null, cljs.core.take.call(null, n, cljs.core.concat.call(null, p__3726, pad)))
        }
      }else {
        return null
      }
    })
  };
  partition = function(n, step, pad, coll) {
    switch(arguments.length) {
      case 2:
        return partition__3727.call(this, n, step);
      case 3:
        return partition__3728.call(this, n, step, pad);
      case 4:
        return partition__3729.call(this, n, step, pad, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return partition
}();
cljs.core.get_in = function() {
  var get_in = null;
  var get_in__3735 = function(m, ks) {
    return cljs.core.reduce.call(null, cljs.core.get, m, ks)
  };
  var get_in__3736 = function(m, ks, not_found) {
    var sentinel__3731 = cljs.core.lookup_sentinel;
    var m__3732 = m;
    var ks__3733 = cljs.core.seq.call(null, ks);
    while(true) {
      if(cljs.core.truth_(ks__3733)) {
        var m__3734 = cljs.core.get.call(null, m__3732, cljs.core.first.call(null, ks__3733), sentinel__3731);
        if(cljs.core.truth_(sentinel__3731 === m__3734)) {
          return not_found
        }else {
          var G__3738 = sentinel__3731;
          var G__3739 = m__3734;
          var G__3740 = cljs.core.next.call(null, ks__3733);
          sentinel__3731 = G__3738;
          m__3732 = G__3739;
          ks__3733 = G__3740;
          continue
        }
      }else {
        return m__3732
      }
      break
    }
  };
  get_in = function(m, ks, not_found) {
    switch(arguments.length) {
      case 2:
        return get_in__3735.call(this, m, ks);
      case 3:
        return get_in__3736.call(this, m, ks, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return get_in
}();
cljs.core.assoc_in = function assoc_in(m, p__3741, v) {
  var vec__3742__3743 = p__3741;
  var k__3744 = cljs.core.nth.call(null, vec__3742__3743, 0, null);
  var ks__3745 = cljs.core.nthnext.call(null, vec__3742__3743, 1);
  if(cljs.core.truth_(ks__3745)) {
    return cljs.core.assoc.call(null, m, k__3744, assoc_in.call(null, cljs.core.get.call(null, m, k__3744), ks__3745, v))
  }else {
    return cljs.core.assoc.call(null, m, k__3744, v)
  }
};
cljs.core.update_in = function() {
  var update_in__delegate = function(m, p__3746, f, args) {
    var vec__3747__3748 = p__3746;
    var k__3749 = cljs.core.nth.call(null, vec__3747__3748, 0, null);
    var ks__3750 = cljs.core.nthnext.call(null, vec__3747__3748, 1);
    if(cljs.core.truth_(ks__3750)) {
      return cljs.core.assoc.call(null, m, k__3749, cljs.core.apply.call(null, update_in, cljs.core.get.call(null, m, k__3749), ks__3750, f, args))
    }else {
      return cljs.core.assoc.call(null, m, k__3749, cljs.core.apply.call(null, f, cljs.core.get.call(null, m, k__3749), args))
    }
  };
  var update_in = function(m, p__3746, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
    }
    return update_in__delegate.call(this, m, p__3746, f, args)
  };
  update_in.cljs$lang$maxFixedArity = 3;
  update_in.cljs$lang$applyTo = function(arglist__3751) {
    var m = cljs.core.first(arglist__3751);
    var p__3746 = cljs.core.first(cljs.core.next(arglist__3751));
    var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3751)));
    var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3751)));
    return update_in__delegate.call(this, m, p__3746, f, args)
  };
  return update_in
}();
cljs.core.Vector = function(meta, array) {
  this.meta = meta;
  this.array = array
};
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3752 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = function() {
  var G__3777 = null;
  var G__3777__3778 = function(coll, k) {
    var this__3753 = this;
    return cljs.core._nth.call(null, coll, k, null)
  };
  var G__3777__3779 = function(coll, k, not_found) {
    var this__3754 = this;
    return cljs.core._nth.call(null, coll, k, not_found)
  };
  G__3777 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3777__3778.call(this, coll, k);
      case 3:
        return G__3777__3779.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3777
}();
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = function(coll, k, v) {
  var this__3755 = this;
  var new_array__3756 = cljs.core.aclone.call(null, this__3755.array);
  new_array__3756[k] = v;
  return new cljs.core.Vector(this__3755.meta, new_array__3756)
};
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3757 = this;
  var new_array__3758 = cljs.core.aclone.call(null, this__3757.array);
  new_array__3758.push(o);
  return new cljs.core.Vector(this__3757.meta, new_array__3758)
};
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = function() {
  var G__3781 = null;
  var G__3781__3782 = function(v, f) {
    var this__3759 = this;
    return cljs.core.ci_reduce.call(null, this__3759.array, f)
  };
  var G__3781__3783 = function(v, f, start) {
    var this__3760 = this;
    return cljs.core.ci_reduce.call(null, this__3760.array, f, start)
  };
  G__3781 = function(v, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3781__3782.call(this, v, f);
      case 3:
        return G__3781__3783.call(this, v, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3781
}();
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3761 = this;
  if(cljs.core.truth_(this__3761.array.length > 0)) {
    var vector_seq__3762 = function vector_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(cljs.core.truth_(i < this__3761.array.length)) {
          return cljs.core.cons.call(null, this__3761.array[i], vector_seq.call(null, i + 1))
        }else {
          return null
        }
      })
    };
    return vector_seq__3762.call(null, 0)
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3763 = this;
  return this__3763.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3764 = this;
  var count__3765 = this__3764.array.length;
  if(cljs.core.truth_(count__3765 > 0)) {
    return this__3764.array[count__3765 - 1]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3766 = this;
  if(cljs.core.truth_(this__3766.array.length > 0)) {
    var new_array__3767 = cljs.core.aclone.call(null, this__3766.array);
    new_array__3767.pop();
    return new cljs.core.Vector(this__3766.meta, new_array__3767)
  }else {
    throw new Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = function(coll, n, val) {
  var this__3768 = this;
  return cljs.core._assoc.call(null, coll, n, val)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3769 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3770 = this;
  return new cljs.core.Vector(meta, this__3770.array)
};
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3771 = this;
  return this__3771.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = function() {
  var G__3785 = null;
  var G__3785__3786 = function(coll, n) {
    var this__3772 = this;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3773 = 0 <= n;
      if(cljs.core.truth_(and__3546__auto____3773)) {
        return n < this__3772.array.length
      }else {
        return and__3546__auto____3773
      }
    }())) {
      return this__3772.array[n]
    }else {
      return null
    }
  };
  var G__3785__3787 = function(coll, n, not_found) {
    var this__3774 = this;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3775 = 0 <= n;
      if(cljs.core.truth_(and__3546__auto____3775)) {
        return n < this__3774.array.length
      }else {
        return and__3546__auto____3775
      }
    }())) {
      return this__3774.array[n]
    }else {
      return not_found
    }
  };
  G__3785 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3785__3786.call(this, coll, n);
      case 3:
        return G__3785__3787.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3785
}();
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3776 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__3776.meta)
};
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, cljs.core.array.call(null));
cljs.core.Vector.fromArray = function(xs) {
  return new cljs.core.Vector(null, xs)
};
cljs.core.Vector.prototype.call = function() {
  var G__3789 = null;
  var G__3789__3790 = function(_, k) {
    return cljs.core._lookup.call(null, this, k)
  };
  var G__3789__3791 = function(_, k, not_found) {
    return cljs.core._lookup.call(null, this, k, not_found)
  };
  G__3789 = function(_, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3789__3790.call(this, _, k);
      case 3:
        return G__3789__3791.call(this, _, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3789
}();
cljs.core.vec = function vec(coll) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.Vector.EMPTY, coll)
};
cljs.core.vector = function() {
  var vector__delegate = function(args) {
    return cljs.core.vec.call(null, args)
  };
  var vector = function(var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return vector__delegate.call(this, args)
  };
  vector.cljs$lang$maxFixedArity = 0;
  vector.cljs$lang$applyTo = function(arglist__3793) {
    var args = cljs.core.seq(arglist__3793);
    return vector__delegate.call(this, args)
  };
  return vector
}();
cljs.core.Subvec = function(meta, v, start, end) {
  this.meta = meta;
  this.v = v;
  this.start = start;
  this.end = end
};
cljs.core.Subvec.prototype.cljs$core$IHash$ = true;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3794 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$ = true;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = function() {
  var G__3814 = null;
  var G__3814__3815 = function(coll, k) {
    var this__3795 = this;
    return cljs.core._nth.call(null, coll, k, null)
  };
  var G__3814__3816 = function(coll, k, not_found) {
    var this__3796 = this;
    return cljs.core._nth.call(null, coll, k, not_found)
  };
  G__3814 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3814__3815.call(this, coll, k);
      case 3:
        return G__3814__3816.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3814
}();
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = true;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = function(coll, key, val) {
  var this__3797 = this;
  var v_pos__3798 = this__3797.start + key;
  return new cljs.core.Subvec(this__3797.meta, cljs.core._assoc.call(null, this__3797.v, v_pos__3798, val), this__3797.start, this__3797.end > v_pos__3798 + 1 ? this__3797.end : v_pos__3798 + 1)
};
cljs.core.Subvec.prototype.cljs$core$ISequential$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3799 = this;
  return new cljs.core.Subvec(this__3799.meta, cljs.core._assoc_n.call(null, this__3799.v, this__3799.end, o), this__3799.start, this__3799.end + 1)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$ = true;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = function() {
  var G__3818 = null;
  var G__3818__3819 = function(coll, f) {
    var this__3800 = this;
    return cljs.core.ci_reduce.call(null, coll, f)
  };
  var G__3818__3820 = function(coll, f, start) {
    var this__3801 = this;
    return cljs.core.ci_reduce.call(null, coll, f, start)
  };
  G__3818 = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3818__3819.call(this, coll, f);
      case 3:
        return G__3818__3820.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3818
}();
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = true;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3802 = this;
  var subvec_seq__3803 = function subvec_seq(i) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, i, this__3802.end))) {
      return null
    }else {
      return cljs.core.cons.call(null, cljs.core._nth.call(null, this__3802.v, i), new cljs.core.LazySeq(null, false, function() {
        return subvec_seq.call(null, i + 1)
      }))
    }
  };
  return subvec_seq__3803.call(null, this__3802.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$ = true;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3804 = this;
  return this__3804.end - this__3804.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$ = true;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3805 = this;
  return cljs.core._nth.call(null, this__3805.v, this__3805.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3806 = this;
  if(cljs.core.truth_(cljs.core._EQ_.call(null, this__3806.start, this__3806.end))) {
    throw new Error("Can't pop empty vector");
  }else {
    return new cljs.core.Subvec(this__3806.meta, this__3806.v, this__3806.start, this__3806.end - 1)
  }
};
cljs.core.Subvec.prototype.cljs$core$IVector$ = true;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = function(coll, n, val) {
  var this__3807 = this;
  return cljs.core._assoc.call(null, coll, n, val)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = true;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3808 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3809 = this;
  return new cljs.core.Subvec(meta, this__3809.v, this__3809.start, this__3809.end)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3810 = this;
  return this__3810.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = true;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = function() {
  var G__3822 = null;
  var G__3822__3823 = function(coll, n) {
    var this__3811 = this;
    return cljs.core._nth.call(null, this__3811.v, this__3811.start + n)
  };
  var G__3822__3824 = function(coll, n, not_found) {
    var this__3812 = this;
    return cljs.core._nth.call(null, this__3812.v, this__3812.start + n, not_found)
  };
  G__3822 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3822__3823.call(this, coll, n);
      case 3:
        return G__3822__3824.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3822
}();
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3813 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__3813.meta)
};
cljs.core.subvec = function() {
  var subvec = null;
  var subvec__3826 = function(v, start) {
    return subvec.call(null, v, start, cljs.core.count.call(null, v))
  };
  var subvec__3827 = function(v, start, end) {
    return new cljs.core.Subvec(null, v, start, end)
  };
  subvec = function(v, start, end) {
    switch(arguments.length) {
      case 2:
        return subvec__3826.call(this, v, start);
      case 3:
        return subvec__3827.call(this, v, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return subvec
}();
cljs.core.Subvec.prototype.call = function() {
  var G__3829 = null;
  var G__3829__3830 = function(_, k) {
    return cljs.core._lookup.call(null, this, k)
  };
  var G__3829__3831 = function(_, k, not_found) {
    return cljs.core._lookup.call(null, this, k, not_found)
  };
  G__3829 = function(_, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3829__3830.call(this, _, k);
      case 3:
        return G__3829__3831.call(this, _, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3829
}();
cljs.core.PersistentQueueSeq = function(meta, front, rear) {
  this.meta = meta;
  this.front = front;
  this.rear = rear
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3833 = this;
  return coll
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3834 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3835 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3836 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__3836.meta)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3837 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3838 = this;
  return cljs.core._first.call(null, this__3838.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3839 = this;
  var temp__3695__auto____3840 = cljs.core.next.call(null, this__3839.front);
  if(cljs.core.truth_(temp__3695__auto____3840)) {
    var f1__3841 = temp__3695__auto____3840;
    return new cljs.core.PersistentQueueSeq(this__3839.meta, f1__3841, this__3839.rear)
  }else {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this__3839.rear))) {
      return cljs.core._empty.call(null, coll)
    }else {
      return new cljs.core.PersistentQueueSeq(this__3839.meta, this__3839.rear, null)
    }
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3842 = this;
  return this__3842.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3843 = this;
  return new cljs.core.PersistentQueueSeq(meta, this__3843.front, this__3843.rear)
};
cljs.core.PersistentQueue = function(meta, count, front, rear) {
  this.meta = meta;
  this.count = count;
  this.front = front;
  this.rear = rear
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3844 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3845 = this;
  if(cljs.core.truth_(this__3845.front)) {
    return new cljs.core.PersistentQueue(this__3845.meta, this__3845.count + 1, this__3845.front, cljs.core.conj.call(null, function() {
      var or__3548__auto____3846 = this__3845.rear;
      if(cljs.core.truth_(or__3548__auto____3846)) {
        return or__3548__auto____3846
      }else {
        return cljs.core.Vector.fromArray([])
      }
    }(), o))
  }else {
    return new cljs.core.PersistentQueue(this__3845.meta, this__3845.count + 1, cljs.core.conj.call(null, this__3845.front, o), cljs.core.Vector.fromArray([]))
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3847 = this;
  var rear__3848 = cljs.core.seq.call(null, this__3847.rear);
  if(cljs.core.truth_(function() {
    var or__3548__auto____3849 = this__3847.front;
    if(cljs.core.truth_(or__3548__auto____3849)) {
      return or__3548__auto____3849
    }else {
      return rear__3848
    }
  }())) {
    return new cljs.core.PersistentQueueSeq(null, this__3847.front, cljs.core.seq.call(null, rear__3848))
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3850 = this;
  return this__3850.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3851 = this;
  return cljs.core._first.call(null, this__3851.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3852 = this;
  if(cljs.core.truth_(this__3852.front)) {
    var temp__3695__auto____3853 = cljs.core.next.call(null, this__3852.front);
    if(cljs.core.truth_(temp__3695__auto____3853)) {
      var f1__3854 = temp__3695__auto____3853;
      return new cljs.core.PersistentQueue(this__3852.meta, this__3852.count - 1, f1__3854, this__3852.rear)
    }else {
      return new cljs.core.PersistentQueue(this__3852.meta, this__3852.count - 1, cljs.core.seq.call(null, this__3852.rear), cljs.core.Vector.fromArray([]))
    }
  }else {
    return coll
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3855 = this;
  return cljs.core.first.call(null, this__3855.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3856 = this;
  return cljs.core.rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3857 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3858 = this;
  return new cljs.core.PersistentQueue(meta, this__3858.count, this__3858.front, this__3858.rear)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3859 = this;
  return this__3859.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3860 = this;
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.Vector.fromArray([]));
cljs.core.NeverEquiv = function() {
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = function(o, other) {
  var this__3861 = this;
  return false
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function equiv_map(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.map_QMARK_.call(null, y)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, x), cljs.core.count.call(null, y))) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(xkv) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, y, cljs.core.first.call(null, xkv), cljs.core.never_equiv), cljs.core.second.call(null, xkv))
  }, x)) : null : null)
};
cljs.core.scan_array = function scan_array(incr, k, array) {
  var len__3862 = array.length;
  var i__3863 = 0;
  while(true) {
    if(cljs.core.truth_(i__3863 < len__3862)) {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, k, array[i__3863]))) {
        return i__3863
      }else {
        var G__3864 = i__3863 + incr;
        i__3863 = G__3864;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.obj_map_contains_key_QMARK_ = function() {
  var obj_map_contains_key_QMARK_ = null;
  var obj_map_contains_key_QMARK___3866 = function(k, strobj) {
    return obj_map_contains_key_QMARK_.call(null, k, strobj, true, false)
  };
  var obj_map_contains_key_QMARK___3867 = function(k, strobj, true_val, false_val) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3865 = goog.isString.call(null, k);
      if(cljs.core.truth_(and__3546__auto____3865)) {
        return strobj.hasOwnProperty(k)
      }else {
        return and__3546__auto____3865
      }
    }())) {
      return true_val
    }else {
      return false_val
    }
  };
  obj_map_contains_key_QMARK_ = function(k, strobj, true_val, false_val) {
    switch(arguments.length) {
      case 2:
        return obj_map_contains_key_QMARK___3866.call(this, k, strobj);
      case 4:
        return obj_map_contains_key_QMARK___3867.call(this, k, strobj, true_val, false_val)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return obj_map_contains_key_QMARK_
}();
cljs.core.ObjMap = function(meta, keys, strobj) {
  this.meta = meta;
  this.keys = keys;
  this.strobj = strobj
};
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3870 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = function() {
  var G__3889 = null;
  var G__3889__3890 = function(coll, k) {
    var this__3871 = this;
    return cljs.core._lookup.call(null, coll, k, null)
  };
  var G__3889__3891 = function(coll, k, not_found) {
    var this__3872 = this;
    return cljs.core.obj_map_contains_key_QMARK_.call(null, k, this__3872.strobj, this__3872.strobj[k], not_found)
  };
  G__3889 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3889__3890.call(this, coll, k);
      case 3:
        return G__3889__3891.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3889
}();
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = function(coll, k, v) {
  var this__3873 = this;
  if(cljs.core.truth_(goog.isString.call(null, k))) {
    var new_strobj__3874 = goog.object.clone.call(null, this__3873.strobj);
    var overwrite_QMARK___3875 = new_strobj__3874.hasOwnProperty(k);
    new_strobj__3874[k] = v;
    if(cljs.core.truth_(overwrite_QMARK___3875)) {
      return new cljs.core.ObjMap(this__3873.meta, this__3873.keys, new_strobj__3874)
    }else {
      var new_keys__3876 = cljs.core.aclone.call(null, this__3873.keys);
      new_keys__3876.push(k);
      return new cljs.core.ObjMap(this__3873.meta, new_keys__3876, new_strobj__3874)
    }
  }else {
    return cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null, k, v), cljs.core.seq.call(null, coll)), this__3873.meta)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(coll, k) {
  var this__3877 = this;
  return cljs.core.obj_map_contains_key_QMARK_.call(null, k, this__3877.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = function(coll, entry) {
  var this__3878 = this;
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, entry))) {
    return cljs.core._assoc.call(null, coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3879 = this;
  if(cljs.core.truth_(this__3879.keys.length > 0)) {
    return cljs.core.map.call(null, function(p1__3869_SHARP_) {
      return cljs.core.vector.call(null, p1__3869_SHARP_, this__3879.strobj[p1__3869_SHARP_])
    }, this__3879.keys)
  }else {
    return null
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3880 = this;
  return this__3880.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3881 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3882 = this;
  return new cljs.core.ObjMap(meta, this__3882.keys, this__3882.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3883 = this;
  return this__3883.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3884 = this;
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this__3884.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = function(coll, k) {
  var this__3885 = this;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3886 = goog.isString.call(null, k);
    if(cljs.core.truth_(and__3546__auto____3886)) {
      return this__3885.strobj.hasOwnProperty(k)
    }else {
      return and__3546__auto____3886
    }
  }())) {
    var new_keys__3887 = cljs.core.aclone.call(null, this__3885.keys);
    var new_strobj__3888 = goog.object.clone.call(null, this__3885.strobj);
    new_keys__3887.splice(cljs.core.scan_array.call(null, 1, k, new_keys__3887), 1);
    cljs.core.js_delete.call(null, new_strobj__3888, k);
    return new cljs.core.ObjMap(this__3885.meta, new_keys__3887, new_strobj__3888)
  }else {
    return coll
  }
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, cljs.core.array.call(null), cljs.core.js_obj.call(null));
cljs.core.ObjMap.fromObject = function(ks, obj) {
  return new cljs.core.ObjMap(null, ks, obj)
};
cljs.core.ObjMap.prototype.call = function() {
  var G__3894 = null;
  var G__3894__3895 = function(_, k) {
    return cljs.core._lookup.call(null, this, k)
  };
  var G__3894__3896 = function(_, k, not_found) {
    return cljs.core._lookup.call(null, this, k, not_found)
  };
  G__3894 = function(_, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3894__3895.call(this, _, k);
      case 3:
        return G__3894__3896.call(this, _, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3894
}();
cljs.core.HashMap = function(meta, count, hashobj) {
  this.meta = meta;
  this.count = count;
  this.hashobj = hashobj
};
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3898 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = function() {
  var G__3928 = null;
  var G__3928__3929 = function(coll, k) {
    var this__3899 = this;
    return cljs.core._lookup.call(null, coll, k, null)
  };
  var G__3928__3930 = function(coll, k, not_found) {
    var this__3900 = this;
    var bucket__3901 = this__3900.hashobj[cljs.core.hash.call(null, k)];
    var i__3902 = cljs.core.truth_(bucket__3901) ? cljs.core.scan_array.call(null, 2, k, bucket__3901) : null;
    if(cljs.core.truth_(i__3902)) {
      return bucket__3901[i__3902 + 1]
    }else {
      return not_found
    }
  };
  G__3928 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3928__3929.call(this, coll, k);
      case 3:
        return G__3928__3930.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3928
}();
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = function(coll, k, v) {
  var this__3903 = this;
  var h__3904 = cljs.core.hash.call(null, k);
  var bucket__3905 = this__3903.hashobj[h__3904];
  if(cljs.core.truth_(bucket__3905)) {
    var new_bucket__3906 = cljs.core.aclone.call(null, bucket__3905);
    var new_hashobj__3907 = goog.object.clone.call(null, this__3903.hashobj);
    new_hashobj__3907[h__3904] = new_bucket__3906;
    var temp__3695__auto____3908 = cljs.core.scan_array.call(null, 2, k, new_bucket__3906);
    if(cljs.core.truth_(temp__3695__auto____3908)) {
      var i__3909 = temp__3695__auto____3908;
      new_bucket__3906[i__3909 + 1] = v;
      return new cljs.core.HashMap(this__3903.meta, this__3903.count, new_hashobj__3907)
    }else {
      new_bucket__3906.push(k, v);
      return new cljs.core.HashMap(this__3903.meta, this__3903.count + 1, new_hashobj__3907)
    }
  }else {
    var new_hashobj__3910 = goog.object.clone.call(null, this__3903.hashobj);
    new_hashobj__3910[h__3904] = cljs.core.array.call(null, k, v);
    return new cljs.core.HashMap(this__3903.meta, this__3903.count + 1, new_hashobj__3910)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(coll, k) {
  var this__3911 = this;
  var bucket__3912 = this__3911.hashobj[cljs.core.hash.call(null, k)];
  var i__3913 = cljs.core.truth_(bucket__3912) ? cljs.core.scan_array.call(null, 2, k, bucket__3912) : null;
  if(cljs.core.truth_(i__3913)) {
    return true
  }else {
    return false
  }
};
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = function(coll, entry) {
  var this__3914 = this;
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, entry))) {
    return cljs.core._assoc.call(null, coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3915 = this;
  if(cljs.core.truth_(this__3915.count > 0)) {
    var hashes__3916 = cljs.core.js_keys.call(null, this__3915.hashobj);
    return cljs.core.mapcat.call(null, function(p1__3893_SHARP_) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, this__3915.hashobj[p1__3893_SHARP_]))
    }, hashes__3916)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3917 = this;
  return this__3917.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3918 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3919 = this;
  return new cljs.core.HashMap(meta, this__3919.count, this__3919.hashobj)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3920 = this;
  return this__3920.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3921 = this;
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this__3921.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = function(coll, k) {
  var this__3922 = this;
  var h__3923 = cljs.core.hash.call(null, k);
  var bucket__3924 = this__3922.hashobj[h__3923];
  var i__3925 = cljs.core.truth_(bucket__3924) ? cljs.core.scan_array.call(null, 2, k, bucket__3924) : null;
  if(cljs.core.truth_(cljs.core.not.call(null, i__3925))) {
    return coll
  }else {
    var new_hashobj__3926 = goog.object.clone.call(null, this__3922.hashobj);
    if(cljs.core.truth_(3 > bucket__3924.length)) {
      cljs.core.js_delete.call(null, new_hashobj__3926, h__3923)
    }else {
      var new_bucket__3927 = cljs.core.aclone.call(null, bucket__3924);
      new_bucket__3927.splice(i__3925, 2);
      new_hashobj__3926[h__3923] = new_bucket__3927
    }
    return new cljs.core.HashMap(this__3922.meta, this__3922.count - 1, new_hashobj__3926)
  }
};
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, cljs.core.js_obj.call(null));
cljs.core.HashMap.fromArrays = function(ks, vs) {
  var len__3932 = ks.length;
  var i__3933 = 0;
  var out__3934 = cljs.core.HashMap.EMPTY;
  while(true) {
    if(cljs.core.truth_(i__3933 < len__3932)) {
      var G__3935 = i__3933 + 1;
      var G__3936 = cljs.core.assoc.call(null, out__3934, ks[i__3933], vs[i__3933]);
      i__3933 = G__3935;
      out__3934 = G__3936;
      continue
    }else {
      return out__3934
    }
    break
  }
};
cljs.core.HashMap.prototype.call = function() {
  var G__3937 = null;
  var G__3937__3938 = function(_, k) {
    return cljs.core._lookup.call(null, this, k)
  };
  var G__3937__3939 = function(_, k, not_found) {
    return cljs.core._lookup.call(null, this, k, not_found)
  };
  G__3937 = function(_, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3937__3938.call(this, _, k);
      case 3:
        return G__3937__3939.call(this, _, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3937
}();
cljs.core.hash_map = function() {
  var hash_map__delegate = function(keyvals) {
    var in$__3941 = cljs.core.seq.call(null, keyvals);
    var out__3942 = cljs.core.HashMap.EMPTY;
    while(true) {
      if(cljs.core.truth_(in$__3941)) {
        var G__3943 = cljs.core.nnext.call(null, in$__3941);
        var G__3944 = cljs.core.assoc.call(null, out__3942, cljs.core.first.call(null, in$__3941), cljs.core.second.call(null, in$__3941));
        in$__3941 = G__3943;
        out__3942 = G__3944;
        continue
      }else {
        return out__3942
      }
      break
    }
  };
  var hash_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return hash_map__delegate.call(this, keyvals)
  };
  hash_map.cljs$lang$maxFixedArity = 0;
  hash_map.cljs$lang$applyTo = function(arglist__3945) {
    var keyvals = cljs.core.seq(arglist__3945);
    return hash_map__delegate.call(this, keyvals)
  };
  return hash_map
}();
cljs.core.keys = function keys(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, hash_map))
};
cljs.core.vals = function vals(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, hash_map))
};
cljs.core.merge = function() {
  var merge__delegate = function(maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      return cljs.core.reduce.call(null, function(p1__3946_SHARP_, p2__3947_SHARP_) {
        return cljs.core.conj.call(null, function() {
          var or__3548__auto____3948 = p1__3946_SHARP_;
          if(cljs.core.truth_(or__3548__auto____3948)) {
            return or__3548__auto____3948
          }else {
            return cljs.core.ObjMap.fromObject([], {})
          }
        }(), p2__3947_SHARP_)
      }, maps)
    }else {
      return null
    }
  };
  var merge = function(var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return merge__delegate.call(this, maps)
  };
  merge.cljs$lang$maxFixedArity = 0;
  merge.cljs$lang$applyTo = function(arglist__3949) {
    var maps = cljs.core.seq(arglist__3949);
    return merge__delegate.call(this, maps)
  };
  return merge
}();
cljs.core.merge_with = function() {
  var merge_with__delegate = function(f, maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      var merge_entry__3952 = function(m, e) {
        var k__3950 = cljs.core.first.call(null, e);
        var v__3951 = cljs.core.second.call(null, e);
        if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, m, k__3950))) {
          return cljs.core.assoc.call(null, m, k__3950, f.call(null, cljs.core.get.call(null, m, k__3950), v__3951))
        }else {
          return cljs.core.assoc.call(null, m, k__3950, v__3951)
        }
      };
      var merge2__3954 = function(m1, m2) {
        return cljs.core.reduce.call(null, merge_entry__3952, function() {
          var or__3548__auto____3953 = m1;
          if(cljs.core.truth_(or__3548__auto____3953)) {
            return or__3548__auto____3953
          }else {
            return cljs.core.ObjMap.fromObject([], {})
          }
        }(), cljs.core.seq.call(null, m2))
      };
      return cljs.core.reduce.call(null, merge2__3954, maps)
    }else {
      return null
    }
  };
  var merge_with = function(f, var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return merge_with__delegate.call(this, f, maps)
  };
  merge_with.cljs$lang$maxFixedArity = 1;
  merge_with.cljs$lang$applyTo = function(arglist__3955) {
    var f = cljs.core.first(arglist__3955);
    var maps = cljs.core.rest(arglist__3955);
    return merge_with__delegate.call(this, f, maps)
  };
  return merge_with
}();
cljs.core.select_keys = function select_keys(map, keyseq) {
  var ret__3957 = cljs.core.ObjMap.fromObject([], {});
  var keys__3958 = cljs.core.seq.call(null, keyseq);
  while(true) {
    if(cljs.core.truth_(keys__3958)) {
      var key__3959 = cljs.core.first.call(null, keys__3958);
      var entry__3960 = cljs.core.get.call(null, map, key__3959, "\ufdd0'user/not-found");
      var G__3961 = cljs.core.truth_(cljs.core.not_EQ_.call(null, entry__3960, "\ufdd0'user/not-found")) ? cljs.core.assoc.call(null, ret__3957, key__3959, entry__3960) : ret__3957;
      var G__3962 = cljs.core.next.call(null, keys__3958);
      ret__3957 = G__3961;
      keys__3958 = G__3962;
      continue
    }else {
      return ret__3957
    }
    break
  }
};
cljs.core.Set = function(meta, hash_map) {
  this.meta = meta;
  this.hash_map = hash_map
};
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3963 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = function() {
  var G__3976 = null;
  var G__3976__3977 = function(coll, v) {
    var this__3964 = this;
    return cljs.core._lookup.call(null, coll, v, null)
  };
  var G__3976__3978 = function(coll, v, not_found) {
    var this__3965 = this;
    if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__3965.hash_map, v))) {
      return v
    }else {
      return not_found
    }
  };
  G__3976 = function(coll, v, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3976__3977.call(this, coll, v);
      case 3:
        return G__3976__3978.call(this, coll, v, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3976
}();
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3966 = this;
  return new cljs.core.Set(this__3966.meta, cljs.core.assoc.call(null, this__3966.hash_map, o, null))
};
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3967 = this;
  return cljs.core.keys.call(null, this__3967.hash_map)
};
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = function(coll, v) {
  var this__3968 = this;
  return new cljs.core.Set(this__3968.meta, cljs.core.dissoc.call(null, this__3968.hash_map, v))
};
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3969 = this;
  return cljs.core.count.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3970 = this;
  var and__3546__auto____3971 = cljs.core.set_QMARK_.call(null, other);
  if(cljs.core.truth_(and__3546__auto____3971)) {
    var and__3546__auto____3972 = cljs.core._EQ_.call(null, cljs.core.count.call(null, coll), cljs.core.count.call(null, other));
    if(cljs.core.truth_(and__3546__auto____3972)) {
      return cljs.core.every_QMARK_.call(null, function(p1__3956_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__3956_SHARP_)
      }, other)
    }else {
      return and__3546__auto____3972
    }
  }else {
    return and__3546__auto____3971
  }
};
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3973 = this;
  return new cljs.core.Set(meta, this__3973.hash_map)
};
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3974 = this;
  return this__3974.meta
};
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3975 = this;
  return cljs.core.with_meta.call(null, cljs.core.Set.EMPTY, this__3975.meta)
};
cljs.core.Set.EMPTY = new cljs.core.Set(null, cljs.core.hash_map.call(null));
cljs.core.Set.prototype.call = function() {
  var G__3980 = null;
  var G__3980__3981 = function(_, k) {
    return cljs.core._lookup.call(null, this, k)
  };
  var G__3980__3982 = function(_, k, not_found) {
    return cljs.core._lookup.call(null, this, k, not_found)
  };
  G__3980 = function(_, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3980__3981.call(this, _, k);
      case 3:
        return G__3980__3982.call(this, _, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3980
}();
cljs.core.set = function set(coll) {
  var in$__3985 = cljs.core.seq.call(null, coll);
  var out__3986 = cljs.core.Set.EMPTY;
  while(true) {
    if(cljs.core.truth_(cljs.core.not.call(null, cljs.core.empty_QMARK_.call(null, in$__3985)))) {
      var G__3987 = cljs.core.rest.call(null, in$__3985);
      var G__3988 = cljs.core.conj.call(null, out__3986, cljs.core.first.call(null, in$__3985));
      in$__3985 = G__3987;
      out__3986 = G__3988;
      continue
    }else {
      return out__3986
    }
    break
  }
};
cljs.core.replace = function replace(smap, coll) {
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, coll))) {
    var n__3989 = cljs.core.count.call(null, coll);
    return cljs.core.reduce.call(null, function(v, i) {
      var temp__3695__auto____3990 = cljs.core.find.call(null, smap, cljs.core.nth.call(null, v, i));
      if(cljs.core.truth_(temp__3695__auto____3990)) {
        var e__3991 = temp__3695__auto____3990;
        return cljs.core.assoc.call(null, v, i, cljs.core.second.call(null, e__3991))
      }else {
        return v
      }
    }, coll, cljs.core.take.call(null, n__3989, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(p1__3984_SHARP_) {
      var temp__3695__auto____3992 = cljs.core.find.call(null, smap, p1__3984_SHARP_);
      if(cljs.core.truth_(temp__3695__auto____3992)) {
        var e__3993 = temp__3695__auto____3992;
        return cljs.core.second.call(null, e__3993)
      }else {
        return p1__3984_SHARP_
      }
    }, coll)
  }
};
cljs.core.distinct = function distinct(coll) {
  var step__4001 = function step(xs, seen) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(p__3994, seen) {
        while(true) {
          var vec__3995__3996 = p__3994;
          var f__3997 = cljs.core.nth.call(null, vec__3995__3996, 0, null);
          var xs__3998 = vec__3995__3996;
          var temp__3698__auto____3999 = cljs.core.seq.call(null, xs__3998);
          if(cljs.core.truth_(temp__3698__auto____3999)) {
            var s__4000 = temp__3698__auto____3999;
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, seen, f__3997))) {
              var G__4002 = cljs.core.rest.call(null, s__4000);
              var G__4003 = seen;
              p__3994 = G__4002;
              seen = G__4003;
              continue
            }else {
              return cljs.core.cons.call(null, f__3997, step.call(null, cljs.core.rest.call(null, s__4000), cljs.core.conj.call(null, seen, f__3997)))
            }
          }else {
            return null
          }
          break
        }
      }.call(null, xs, seen)
    })
  };
  return step__4001.call(null, coll, cljs.core.set([]))
};
cljs.core.butlast = function butlast(s) {
  var ret__4004 = cljs.core.Vector.fromArray([]);
  var s__4005 = s;
  while(true) {
    if(cljs.core.truth_(cljs.core.next.call(null, s__4005))) {
      var G__4006 = cljs.core.conj.call(null, ret__4004, cljs.core.first.call(null, s__4005));
      var G__4007 = cljs.core.next.call(null, s__4005);
      ret__4004 = G__4006;
      s__4005 = G__4007;
      continue
    }else {
      return cljs.core.seq.call(null, ret__4004)
    }
    break
  }
};
cljs.core.name = function name(x) {
  if(cljs.core.truth_(cljs.core.string_QMARK_.call(null, x))) {
    return x
  }else {
    if(cljs.core.truth_(function() {
      var or__3548__auto____4008 = cljs.core.keyword_QMARK_.call(null, x);
      if(cljs.core.truth_(or__3548__auto____4008)) {
        return or__3548__auto____4008
      }else {
        return cljs.core.symbol_QMARK_.call(null, x)
      }
    }())) {
      var i__4009 = x.lastIndexOf("/");
      if(cljs.core.truth_(i__4009 < 0)) {
        return cljs.core.subs.call(null, x, 2)
      }else {
        return cljs.core.subs.call(null, x, i__4009 + 1)
      }
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        throw new Error(cljs.core.str.call(null, "Doesn't support name: ", x));
      }else {
        return null
      }
    }
  }
};
cljs.core.namespace = function namespace(x) {
  if(cljs.core.truth_(function() {
    var or__3548__auto____4010 = cljs.core.keyword_QMARK_.call(null, x);
    if(cljs.core.truth_(or__3548__auto____4010)) {
      return or__3548__auto____4010
    }else {
      return cljs.core.symbol_QMARK_.call(null, x)
    }
  }())) {
    var i__4011 = x.lastIndexOf("/");
    if(cljs.core.truth_(i__4011 > -1)) {
      return cljs.core.subs.call(null, x, 2, i__4011)
    }else {
      return null
    }
  }else {
    throw new Error(cljs.core.str.call(null, "Doesn't support namespace: ", x));
  }
};
cljs.core.zipmap = function zipmap(keys, vals) {
  var map__4014 = cljs.core.ObjMap.fromObject([], {});
  var ks__4015 = cljs.core.seq.call(null, keys);
  var vs__4016 = cljs.core.seq.call(null, vals);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4017 = ks__4015;
      if(cljs.core.truth_(and__3546__auto____4017)) {
        return vs__4016
      }else {
        return and__3546__auto____4017
      }
    }())) {
      var G__4018 = cljs.core.assoc.call(null, map__4014, cljs.core.first.call(null, ks__4015), cljs.core.first.call(null, vs__4016));
      var G__4019 = cljs.core.next.call(null, ks__4015);
      var G__4020 = cljs.core.next.call(null, vs__4016);
      map__4014 = G__4018;
      ks__4015 = G__4019;
      vs__4016 = G__4020;
      continue
    }else {
      return map__4014
    }
    break
  }
};
cljs.core.max_key = function() {
  var max_key = null;
  var max_key__4023 = function(k, x) {
    return x
  };
  var max_key__4024 = function(k, x, y) {
    if(cljs.core.truth_(k.call(null, x) > k.call(null, y))) {
      return x
    }else {
      return y
    }
  };
  var max_key__4025 = function() {
    var G__4027__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__4012_SHARP_, p2__4013_SHARP_) {
        return max_key.call(null, k, p1__4012_SHARP_, p2__4013_SHARP_)
      }, max_key.call(null, k, x, y), more)
    };
    var G__4027 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__4027__delegate.call(this, k, x, y, more)
    };
    G__4027.cljs$lang$maxFixedArity = 3;
    G__4027.cljs$lang$applyTo = function(arglist__4028) {
      var k = cljs.core.first(arglist__4028);
      var x = cljs.core.first(cljs.core.next(arglist__4028));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4028)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4028)));
      return G__4027__delegate.call(this, k, x, y, more)
    };
    return G__4027
  }();
  max_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return max_key__4023.call(this, k, x);
      case 3:
        return max_key__4024.call(this, k, x, y);
      default:
        return max_key__4025.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  max_key.cljs$lang$maxFixedArity = 3;
  max_key.cljs$lang$applyTo = max_key__4025.cljs$lang$applyTo;
  return max_key
}();
cljs.core.min_key = function() {
  var min_key = null;
  var min_key__4029 = function(k, x) {
    return x
  };
  var min_key__4030 = function(k, x, y) {
    if(cljs.core.truth_(k.call(null, x) < k.call(null, y))) {
      return x
    }else {
      return y
    }
  };
  var min_key__4031 = function() {
    var G__4033__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__4021_SHARP_, p2__4022_SHARP_) {
        return min_key.call(null, k, p1__4021_SHARP_, p2__4022_SHARP_)
      }, min_key.call(null, k, x, y), more)
    };
    var G__4033 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__4033__delegate.call(this, k, x, y, more)
    };
    G__4033.cljs$lang$maxFixedArity = 3;
    G__4033.cljs$lang$applyTo = function(arglist__4034) {
      var k = cljs.core.first(arglist__4034);
      var x = cljs.core.first(cljs.core.next(arglist__4034));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4034)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4034)));
      return G__4033__delegate.call(this, k, x, y, more)
    };
    return G__4033
  }();
  min_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return min_key__4029.call(this, k, x);
      case 3:
        return min_key__4030.call(this, k, x, y);
      default:
        return min_key__4031.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  min_key.cljs$lang$maxFixedArity = 3;
  min_key.cljs$lang$applyTo = min_key__4031.cljs$lang$applyTo;
  return min_key
}();
cljs.core.partition_all = function() {
  var partition_all = null;
  var partition_all__4037 = function(n, coll) {
    return partition_all.call(null, n, n, coll)
  };
  var partition_all__4038 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____4035 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____4035)) {
        var s__4036 = temp__3698__auto____4035;
        return cljs.core.cons.call(null, cljs.core.take.call(null, n, s__4036), partition_all.call(null, n, step, cljs.core.drop.call(null, step, s__4036)))
      }else {
        return null
      }
    })
  };
  partition_all = function(n, step, coll) {
    switch(arguments.length) {
      case 2:
        return partition_all__4037.call(this, n, step);
      case 3:
        return partition_all__4038.call(this, n, step, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return partition_all
}();
cljs.core.take_while = function take_while(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____4040 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____4040)) {
      var s__4041 = temp__3698__auto____4040;
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, s__4041)))) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__4041), take_while.call(null, pred, cljs.core.rest.call(null, s__4041)))
      }else {
        return null
      }
    }else {
      return null
    }
  })
};
cljs.core.Range = function(meta, start, end, step) {
  this.meta = meta;
  this.start = start;
  this.end = end;
  this.step = step
};
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = function(rng) {
  var this__4042 = this;
  return cljs.core.hash_coll.call(null, rng)
};
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = function(rng, o) {
  var this__4043 = this;
  return cljs.core.cons.call(null, o, rng)
};
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = function() {
  var G__4059 = null;
  var G__4059__4060 = function(rng, f) {
    var this__4044 = this;
    return cljs.core.ci_reduce.call(null, rng, f)
  };
  var G__4059__4061 = function(rng, f, s) {
    var this__4045 = this;
    return cljs.core.ci_reduce.call(null, rng, f, s)
  };
  G__4059 = function(rng, f, s) {
    switch(arguments.length) {
      case 2:
        return G__4059__4060.call(this, rng, f);
      case 3:
        return G__4059__4061.call(this, rng, f, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4059
}();
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = function(rng) {
  var this__4046 = this;
  var comp__4047 = cljs.core.truth_(this__4046.step > 0) ? cljs.core._LT_ : cljs.core._GT_;
  if(cljs.core.truth_(comp__4047.call(null, this__4046.start, this__4046.end))) {
    return rng
  }else {
    return null
  }
};
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = function(rng) {
  var this__4048 = this;
  if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._seq.call(null, rng)))) {
    return 0
  }else {
    return Math["ceil"].call(null, (this__4048.end - this__4048.start) / this__4048.step)
  }
};
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = function(rng) {
  var this__4049 = this;
  return this__4049.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest = function(rng) {
  var this__4050 = this;
  if(cljs.core.truth_(cljs.core._seq.call(null, rng))) {
    return new cljs.core.Range(this__4050.meta, this__4050.start + this__4050.step, this__4050.end, this__4050.step)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = function(rng, other) {
  var this__4051 = this;
  return cljs.core.equiv_sequential.call(null, rng, other)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = function(rng, meta) {
  var this__4052 = this;
  return new cljs.core.Range(meta, this__4052.start, this__4052.end, this__4052.step)
};
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = function(rng) {
  var this__4053 = this;
  return this__4053.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = function() {
  var G__4063 = null;
  var G__4063__4064 = function(rng, n) {
    var this__4054 = this;
    if(cljs.core.truth_(n < cljs.core._count.call(null, rng))) {
      return this__4054.start + n * this__4054.step
    }else {
      if(cljs.core.truth_(function() {
        var and__3546__auto____4055 = this__4054.start > this__4054.end;
        if(cljs.core.truth_(and__3546__auto____4055)) {
          return cljs.core._EQ_.call(null, this__4054.step, 0)
        }else {
          return and__3546__auto____4055
        }
      }())) {
        return this__4054.start
      }else {
        throw new Error("Index out of bounds");
      }
    }
  };
  var G__4063__4065 = function(rng, n, not_found) {
    var this__4056 = this;
    if(cljs.core.truth_(n < cljs.core._count.call(null, rng))) {
      return this__4056.start + n * this__4056.step
    }else {
      if(cljs.core.truth_(function() {
        var and__3546__auto____4057 = this__4056.start > this__4056.end;
        if(cljs.core.truth_(and__3546__auto____4057)) {
          return cljs.core._EQ_.call(null, this__4056.step, 0)
        }else {
          return and__3546__auto____4057
        }
      }())) {
        return this__4056.start
      }else {
        return not_found
      }
    }
  };
  G__4063 = function(rng, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4063__4064.call(this, rng, n);
      case 3:
        return G__4063__4065.call(this, rng, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4063
}();
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = function(rng) {
  var this__4058 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__4058.meta)
};
cljs.core.range = function() {
  var range = null;
  var range__4067 = function() {
    return range.call(null, 0, Number["MAX_VALUE"], 1)
  };
  var range__4068 = function(end) {
    return range.call(null, 0, end, 1)
  };
  var range__4069 = function(start, end) {
    return range.call(null, start, end, 1)
  };
  var range__4070 = function(start, end, step) {
    return new cljs.core.Range(null, start, end, step)
  };
  range = function(start, end, step) {
    switch(arguments.length) {
      case 0:
        return range__4067.call(this);
      case 1:
        return range__4068.call(this, start);
      case 2:
        return range__4069.call(this, start, end);
      case 3:
        return range__4070.call(this, start, end, step)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return range
}();
cljs.core.take_nth = function take_nth(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____4072 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____4072)) {
      var s__4073 = temp__3698__auto____4072;
      return cljs.core.cons.call(null, cljs.core.first.call(null, s__4073), take_nth.call(null, n, cljs.core.drop.call(null, n, s__4073)))
    }else {
      return null
    }
  })
};
cljs.core.split_with = function split_with(pred, coll) {
  return cljs.core.Vector.fromArray([cljs.core.take_while.call(null, pred, coll), cljs.core.drop_while.call(null, pred, coll)])
};
cljs.core.partition_by = function partition_by(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____4075 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____4075)) {
      var s__4076 = temp__3698__auto____4075;
      var fst__4077 = cljs.core.first.call(null, s__4076);
      var fv__4078 = f.call(null, fst__4077);
      var run__4079 = cljs.core.cons.call(null, fst__4077, cljs.core.take_while.call(null, function(p1__4074_SHARP_) {
        return cljs.core._EQ_.call(null, fv__4078, f.call(null, p1__4074_SHARP_))
      }, cljs.core.next.call(null, s__4076)));
      return cljs.core.cons.call(null, run__4079, partition_by.call(null, f, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, run__4079), s__4076))))
    }else {
      return null
    }
  })
};
cljs.core.frequencies = function frequencies(coll) {
  return cljs.core.reduce.call(null, function(counts, x) {
    return cljs.core.assoc.call(null, counts, x, cljs.core.get.call(null, counts, x, 0) + 1)
  }, cljs.core.ObjMap.fromObject([], {}), coll)
};
cljs.core.reductions = function() {
  var reductions = null;
  var reductions__4094 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3695__auto____4090 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3695__auto____4090)) {
        var s__4091 = temp__3695__auto____4090;
        return reductions.call(null, f, cljs.core.first.call(null, s__4091), cljs.core.rest.call(null, s__4091))
      }else {
        return cljs.core.list.call(null, f.call(null))
      }
    })
  };
  var reductions__4095 = function(f, init, coll) {
    return cljs.core.cons.call(null, init, new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____4092 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____4092)) {
        var s__4093 = temp__3698__auto____4092;
        return reductions.call(null, f, f.call(null, init, cljs.core.first.call(null, s__4093)), cljs.core.rest.call(null, s__4093))
      }else {
        return null
      }
    }))
  };
  reductions = function(f, init, coll) {
    switch(arguments.length) {
      case 2:
        return reductions__4094.call(this, f, init);
      case 3:
        return reductions__4095.call(this, f, init, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return reductions
}();
cljs.core.juxt = function() {
  var juxt = null;
  var juxt__4098 = function(f) {
    return function() {
      var G__4103 = null;
      var G__4103__4104 = function() {
        return cljs.core.vector.call(null, f.call(null))
      };
      var G__4103__4105 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x))
      };
      var G__4103__4106 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y))
      };
      var G__4103__4107 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z))
      };
      var G__4103__4108 = function() {
        var G__4110__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args))
        };
        var G__4110 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__4110__delegate.call(this, x, y, z, args)
        };
        G__4110.cljs$lang$maxFixedArity = 3;
        G__4110.cljs$lang$applyTo = function(arglist__4111) {
          var x = cljs.core.first(arglist__4111);
          var y = cljs.core.first(cljs.core.next(arglist__4111));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4111)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4111)));
          return G__4110__delegate.call(this, x, y, z, args)
        };
        return G__4110
      }();
      G__4103 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__4103__4104.call(this);
          case 1:
            return G__4103__4105.call(this, x);
          case 2:
            return G__4103__4106.call(this, x, y);
          case 3:
            return G__4103__4107.call(this, x, y, z);
          default:
            return G__4103__4108.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__4103.cljs$lang$maxFixedArity = 3;
      G__4103.cljs$lang$applyTo = G__4103__4108.cljs$lang$applyTo;
      return G__4103
    }()
  };
  var juxt__4099 = function(f, g) {
    return function() {
      var G__4112 = null;
      var G__4112__4113 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null))
      };
      var G__4112__4114 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x))
      };
      var G__4112__4115 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y))
      };
      var G__4112__4116 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z))
      };
      var G__4112__4117 = function() {
        var G__4119__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__4119 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__4119__delegate.call(this, x, y, z, args)
        };
        G__4119.cljs$lang$maxFixedArity = 3;
        G__4119.cljs$lang$applyTo = function(arglist__4120) {
          var x = cljs.core.first(arglist__4120);
          var y = cljs.core.first(cljs.core.next(arglist__4120));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4120)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4120)));
          return G__4119__delegate.call(this, x, y, z, args)
        };
        return G__4119
      }();
      G__4112 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__4112__4113.call(this);
          case 1:
            return G__4112__4114.call(this, x);
          case 2:
            return G__4112__4115.call(this, x, y);
          case 3:
            return G__4112__4116.call(this, x, y, z);
          default:
            return G__4112__4117.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__4112.cljs$lang$maxFixedArity = 3;
      G__4112.cljs$lang$applyTo = G__4112__4117.cljs$lang$applyTo;
      return G__4112
    }()
  };
  var juxt__4100 = function(f, g, h) {
    return function() {
      var G__4121 = null;
      var G__4121__4122 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null), h.call(null))
      };
      var G__4121__4123 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x), h.call(null, x))
      };
      var G__4121__4124 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y), h.call(null, x, y))
      };
      var G__4121__4125 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z), h.call(null, x, y, z))
      };
      var G__4121__4126 = function() {
        var G__4128__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args), cljs.core.apply.call(null, h, x, y, z, args))
        };
        var G__4128 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__4128__delegate.call(this, x, y, z, args)
        };
        G__4128.cljs$lang$maxFixedArity = 3;
        G__4128.cljs$lang$applyTo = function(arglist__4129) {
          var x = cljs.core.first(arglist__4129);
          var y = cljs.core.first(cljs.core.next(arglist__4129));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4129)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4129)));
          return G__4128__delegate.call(this, x, y, z, args)
        };
        return G__4128
      }();
      G__4121 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__4121__4122.call(this);
          case 1:
            return G__4121__4123.call(this, x);
          case 2:
            return G__4121__4124.call(this, x, y);
          case 3:
            return G__4121__4125.call(this, x, y, z);
          default:
            return G__4121__4126.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__4121.cljs$lang$maxFixedArity = 3;
      G__4121.cljs$lang$applyTo = G__4121__4126.cljs$lang$applyTo;
      return G__4121
    }()
  };
  var juxt__4101 = function() {
    var G__4130__delegate = function(f, g, h, fs) {
      var fs__4097 = cljs.core.list_STAR_.call(null, f, g, h, fs);
      return function() {
        var G__4131 = null;
        var G__4131__4132 = function() {
          return cljs.core.reduce.call(null, function(p1__4080_SHARP_, p2__4081_SHARP_) {
            return cljs.core.conj.call(null, p1__4080_SHARP_, p2__4081_SHARP_.call(null))
          }, cljs.core.Vector.fromArray([]), fs__4097)
        };
        var G__4131__4133 = function(x) {
          return cljs.core.reduce.call(null, function(p1__4082_SHARP_, p2__4083_SHARP_) {
            return cljs.core.conj.call(null, p1__4082_SHARP_, p2__4083_SHARP_.call(null, x))
          }, cljs.core.Vector.fromArray([]), fs__4097)
        };
        var G__4131__4134 = function(x, y) {
          return cljs.core.reduce.call(null, function(p1__4084_SHARP_, p2__4085_SHARP_) {
            return cljs.core.conj.call(null, p1__4084_SHARP_, p2__4085_SHARP_.call(null, x, y))
          }, cljs.core.Vector.fromArray([]), fs__4097)
        };
        var G__4131__4135 = function(x, y, z) {
          return cljs.core.reduce.call(null, function(p1__4086_SHARP_, p2__4087_SHARP_) {
            return cljs.core.conj.call(null, p1__4086_SHARP_, p2__4087_SHARP_.call(null, x, y, z))
          }, cljs.core.Vector.fromArray([]), fs__4097)
        };
        var G__4131__4136 = function() {
          var G__4138__delegate = function(x, y, z, args) {
            return cljs.core.reduce.call(null, function(p1__4088_SHARP_, p2__4089_SHARP_) {
              return cljs.core.conj.call(null, p1__4088_SHARP_, cljs.core.apply.call(null, p2__4089_SHARP_, x, y, z, args))
            }, cljs.core.Vector.fromArray([]), fs__4097)
          };
          var G__4138 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__4138__delegate.call(this, x, y, z, args)
          };
          G__4138.cljs$lang$maxFixedArity = 3;
          G__4138.cljs$lang$applyTo = function(arglist__4139) {
            var x = cljs.core.first(arglist__4139);
            var y = cljs.core.first(cljs.core.next(arglist__4139));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4139)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4139)));
            return G__4138__delegate.call(this, x, y, z, args)
          };
          return G__4138
        }();
        G__4131 = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return G__4131__4132.call(this);
            case 1:
              return G__4131__4133.call(this, x);
            case 2:
              return G__4131__4134.call(this, x, y);
            case 3:
              return G__4131__4135.call(this, x, y, z);
            default:
              return G__4131__4136.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        G__4131.cljs$lang$maxFixedArity = 3;
        G__4131.cljs$lang$applyTo = G__4131__4136.cljs$lang$applyTo;
        return G__4131
      }()
    };
    var G__4130 = function(f, g, h, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__4130__delegate.call(this, f, g, h, fs)
    };
    G__4130.cljs$lang$maxFixedArity = 3;
    G__4130.cljs$lang$applyTo = function(arglist__4140) {
      var f = cljs.core.first(arglist__4140);
      var g = cljs.core.first(cljs.core.next(arglist__4140));
      var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4140)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4140)));
      return G__4130__delegate.call(this, f, g, h, fs)
    };
    return G__4130
  }();
  juxt = function(f, g, h, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 1:
        return juxt__4098.call(this, f);
      case 2:
        return juxt__4099.call(this, f, g);
      case 3:
        return juxt__4100.call(this, f, g, h);
      default:
        return juxt__4101.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  juxt.cljs$lang$maxFixedArity = 3;
  juxt.cljs$lang$applyTo = juxt__4101.cljs$lang$applyTo;
  return juxt
}();
cljs.core.dorun = function() {
  var dorun = null;
  var dorun__4142 = function(coll) {
    while(true) {
      if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
        var G__4145 = cljs.core.next.call(null, coll);
        coll = G__4145;
        continue
      }else {
        return null
      }
      break
    }
  };
  var dorun__4143 = function(n, coll) {
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3546__auto____4141 = cljs.core.seq.call(null, coll);
        if(cljs.core.truth_(and__3546__auto____4141)) {
          return n > 0
        }else {
          return and__3546__auto____4141
        }
      }())) {
        var G__4146 = n - 1;
        var G__4147 = cljs.core.next.call(null, coll);
        n = G__4146;
        coll = G__4147;
        continue
      }else {
        return null
      }
      break
    }
  };
  dorun = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return dorun__4142.call(this, n);
      case 2:
        return dorun__4143.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return dorun
}();
cljs.core.doall = function() {
  var doall = null;
  var doall__4148 = function(coll) {
    cljs.core.dorun.call(null, coll);
    return coll
  };
  var doall__4149 = function(n, coll) {
    cljs.core.dorun.call(null, n, coll);
    return coll
  };
  doall = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return doall__4148.call(this, n);
      case 2:
        return doall__4149.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return doall
}();
cljs.core.re_matches = function re_matches(re, s) {
  var matches__4151 = re.exec(s);
  if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, matches__4151), s))) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, matches__4151), 1))) {
      return cljs.core.first.call(null, matches__4151)
    }else {
      return cljs.core.vec.call(null, matches__4151)
    }
  }else {
    return null
  }
};
cljs.core.re_find = function re_find(re, s) {
  var matches__4152 = re.exec(s);
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, matches__4152))) {
    return null
  }else {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, matches__4152), 1))) {
      return cljs.core.first.call(null, matches__4152)
    }else {
      return cljs.core.vec.call(null, matches__4152)
    }
  }
};
cljs.core.re_seq = function re_seq(re, s) {
  var match_data__4153 = cljs.core.re_find.call(null, re, s);
  var match_idx__4154 = s.search(re);
  var match_str__4155 = cljs.core.truth_(cljs.core.coll_QMARK_.call(null, match_data__4153)) ? cljs.core.first.call(null, match_data__4153) : match_data__4153;
  var post_match__4156 = cljs.core.subs.call(null, s, match_idx__4154 + cljs.core.count.call(null, match_str__4155));
  if(cljs.core.truth_(match_data__4153)) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, match_data__4153, re_seq.call(null, re, post_match__4156))
    })
  }else {
    return null
  }
};
cljs.core.re_pattern = function re_pattern(s) {
  return new RegExp(s)
};
cljs.core.pr_sequential = function pr_sequential(print_one, begin, sep, end, opts, coll) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray([begin]), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.Vector.fromArray([sep]), cljs.core.map.call(null, function(p1__4157_SHARP_) {
    return print_one.call(null, p1__4157_SHARP_, opts)
  }, coll))), cljs.core.Vector.fromArray([end]))
};
cljs.core.string_print = function string_print(x) {
  cljs.core._STAR_print_fn_STAR_.call(null, x);
  return null
};
cljs.core.flush = function flush() {
  return null
};
cljs.core.pr_seq = function pr_seq(obj, opts) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, obj))) {
    return cljs.core.list.call(null, "nil")
  }else {
    if(cljs.core.truth_(cljs.core.undefined_QMARK_.call(null, obj))) {
      return cljs.core.list.call(null, "#<undefined>")
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return cljs.core.concat.call(null, cljs.core.truth_(function() {
          var and__3546__auto____4158 = cljs.core.get.call(null, opts, "\ufdd0'meta");
          if(cljs.core.truth_(and__3546__auto____4158)) {
            var and__3546__auto____4162 = function() {
              var x__417__auto____4159 = obj;
              if(cljs.core.truth_(function() {
                var and__3546__auto____4160 = x__417__auto____4159;
                if(cljs.core.truth_(and__3546__auto____4160)) {
                  var and__3546__auto____4161 = x__417__auto____4159.cljs$core$IMeta$;
                  if(cljs.core.truth_(and__3546__auto____4161)) {
                    return cljs.core.not.call(null, x__417__auto____4159.hasOwnProperty("cljs$core$IMeta$"))
                  }else {
                    return and__3546__auto____4161
                  }
                }else {
                  return and__3546__auto____4160
                }
              }())) {
                return true
              }else {
                return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, x__417__auto____4159)
              }
            }();
            if(cljs.core.truth_(and__3546__auto____4162)) {
              return cljs.core.meta.call(null, obj)
            }else {
              return and__3546__auto____4162
            }
          }else {
            return and__3546__auto____4158
          }
        }()) ? cljs.core.concat.call(null, cljs.core.Vector.fromArray(["^"]), pr_seq.call(null, cljs.core.meta.call(null, obj), opts), cljs.core.Vector.fromArray([" "])) : null, cljs.core.truth_(function() {
          var x__417__auto____4163 = obj;
          if(cljs.core.truth_(function() {
            var and__3546__auto____4164 = x__417__auto____4163;
            if(cljs.core.truth_(and__3546__auto____4164)) {
              var and__3546__auto____4165 = x__417__auto____4163.cljs$core$IPrintable$;
              if(cljs.core.truth_(and__3546__auto____4165)) {
                return cljs.core.not.call(null, x__417__auto____4163.hasOwnProperty("cljs$core$IPrintable$"))
              }else {
                return and__3546__auto____4165
              }
            }else {
              return and__3546__auto____4164
            }
          }())) {
            return true
          }else {
            return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, x__417__auto____4163)
          }
        }()) ? cljs.core._pr_seq.call(null, obj, opts) : cljs.core.list.call(null, "#<", cljs.core.str.call(null, obj), ">"))
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_str_with_opts = function pr_str_with_opts(objs, opts) {
  var first_obj__4166 = cljs.core.first.call(null, objs);
  var sb__4167 = new goog.string.StringBuffer;
  var G__4168__4169 = cljs.core.seq.call(null, objs);
  if(cljs.core.truth_(G__4168__4169)) {
    var obj__4170 = cljs.core.first.call(null, G__4168__4169);
    var G__4168__4171 = G__4168__4169;
    while(true) {
      if(cljs.core.truth_(obj__4170 === first_obj__4166)) {
      }else {
        sb__4167.append(" ")
      }
      var G__4172__4173 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__4170, opts));
      if(cljs.core.truth_(G__4172__4173)) {
        var string__4174 = cljs.core.first.call(null, G__4172__4173);
        var G__4172__4175 = G__4172__4173;
        while(true) {
          sb__4167.append(string__4174);
          var temp__3698__auto____4176 = cljs.core.next.call(null, G__4172__4175);
          if(cljs.core.truth_(temp__3698__auto____4176)) {
            var G__4172__4177 = temp__3698__auto____4176;
            var G__4180 = cljs.core.first.call(null, G__4172__4177);
            var G__4181 = G__4172__4177;
            string__4174 = G__4180;
            G__4172__4175 = G__4181;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3698__auto____4178 = cljs.core.next.call(null, G__4168__4171);
      if(cljs.core.truth_(temp__3698__auto____4178)) {
        var G__4168__4179 = temp__3698__auto____4178;
        var G__4182 = cljs.core.first.call(null, G__4168__4179);
        var G__4183 = G__4168__4179;
        obj__4170 = G__4182;
        G__4168__4171 = G__4183;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return cljs.core.str.call(null, sb__4167)
};
cljs.core.pr_with_opts = function pr_with_opts(objs, opts) {
  var first_obj__4184 = cljs.core.first.call(null, objs);
  var G__4185__4186 = cljs.core.seq.call(null, objs);
  if(cljs.core.truth_(G__4185__4186)) {
    var obj__4187 = cljs.core.first.call(null, G__4185__4186);
    var G__4185__4188 = G__4185__4186;
    while(true) {
      if(cljs.core.truth_(obj__4187 === first_obj__4184)) {
      }else {
        cljs.core.string_print.call(null, " ")
      }
      var G__4189__4190 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__4187, opts));
      if(cljs.core.truth_(G__4189__4190)) {
        var string__4191 = cljs.core.first.call(null, G__4189__4190);
        var G__4189__4192 = G__4189__4190;
        while(true) {
          cljs.core.string_print.call(null, string__4191);
          var temp__3698__auto____4193 = cljs.core.next.call(null, G__4189__4192);
          if(cljs.core.truth_(temp__3698__auto____4193)) {
            var G__4189__4194 = temp__3698__auto____4193;
            var G__4197 = cljs.core.first.call(null, G__4189__4194);
            var G__4198 = G__4189__4194;
            string__4191 = G__4197;
            G__4189__4192 = G__4198;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3698__auto____4195 = cljs.core.next.call(null, G__4185__4188);
      if(cljs.core.truth_(temp__3698__auto____4195)) {
        var G__4185__4196 = temp__3698__auto____4195;
        var G__4199 = cljs.core.first.call(null, G__4185__4196);
        var G__4200 = G__4185__4196;
        obj__4187 = G__4199;
        G__4185__4188 = G__4200;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.newline = function newline(opts) {
  cljs.core.string_print.call(null, "\n");
  if(cljs.core.truth_(cljs.core.get.call(null, opts, "\ufdd0'flush-on-newline"))) {
    return cljs.core.flush.call(null)
  }else {
    return null
  }
};
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = function pr_opts() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var pr_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr_str__delegate.call(this, objs)
  };
  pr_str.cljs$lang$maxFixedArity = 0;
  pr_str.cljs$lang$applyTo = function(arglist__4201) {
    var objs = cljs.core.seq(arglist__4201);
    return pr_str__delegate.call(this, objs)
  };
  return pr_str
}();
cljs.core.pr = function() {
  var pr__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr__delegate.call(this, objs)
  };
  pr.cljs$lang$maxFixedArity = 0;
  pr.cljs$lang$applyTo = function(arglist__4202) {
    var objs = cljs.core.seq(arglist__4202);
    return pr__delegate.call(this, objs)
  };
  return pr
}();
cljs.core.print = function() {
  var cljs_core_print__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var cljs_core_print = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return cljs_core_print__delegate.call(this, objs)
  };
  cljs_core_print.cljs$lang$maxFixedArity = 0;
  cljs_core_print.cljs$lang$applyTo = function(arglist__4203) {
    var objs = cljs.core.seq(arglist__4203);
    return cljs_core_print__delegate.call(this, objs)
  };
  return cljs_core_print
}();
cljs.core.println = function() {
  var println__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var println = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println__delegate.call(this, objs)
  };
  println.cljs$lang$maxFixedArity = 0;
  println.cljs$lang$applyTo = function(arglist__4204) {
    var objs = cljs.core.seq(arglist__4204);
    return println__delegate.call(this, objs)
  };
  return println
}();
cljs.core.prn = function() {
  var prn__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var prn = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn__delegate.call(this, objs)
  };
  prn.cljs$lang$maxFixedArity = 0;
  prn.cljs$lang$applyTo = function(arglist__4205) {
    var objs = cljs.core.seq(arglist__4205);
    return prn__delegate.call(this, objs)
  };
  return prn
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  var pr_pair__4206 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__4206, "{", ", ", "}", opts, coll)
};
cljs.core.IPrintable["number"] = true;
cljs.core._pr_seq["number"] = function(n, opts) {
  return cljs.core.list.call(null, cljs.core.str.call(null, n))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["boolean"] = true;
cljs.core._pr_seq["boolean"] = function(bool, opts) {
  return cljs.core.list.call(null, cljs.core.str.call(null, bool))
};
cljs.core.Set.prototype.cljs$core$IPrintable$ = true;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.IPrintable["string"] = true;
cljs.core._pr_seq["string"] = function(obj, opts) {
  if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, obj))) {
    return cljs.core.list.call(null, cljs.core.str.call(null, ":", function() {
      var temp__3698__auto____4207 = cljs.core.namespace.call(null, obj);
      if(cljs.core.truth_(temp__3698__auto____4207)) {
        var nspc__4208 = temp__3698__auto____4207;
        return cljs.core.str.call(null, nspc__4208, "/")
      }else {
        return null
      }
    }(), cljs.core.name.call(null, obj)))
  }else {
    if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, obj))) {
      return cljs.core.list.call(null, cljs.core.str.call(null, function() {
        var temp__3698__auto____4209 = cljs.core.namespace.call(null, obj);
        if(cljs.core.truth_(temp__3698__auto____4209)) {
          var nspc__4210 = temp__3698__auto____4209;
          return cljs.core.str.call(null, nspc__4210, "/")
        }else {
          return null
        }
      }(), cljs.core.name.call(null, obj)))
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return cljs.core.list.call(null, cljs.core.truth_("\ufdd0'readably".call(null, opts)) ? goog.string.quote.call(null, obj) : obj)
      }else {
        return null
      }
    }
  }
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["array"] = true;
cljs.core._pr_seq["array"] = function(a, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", opts, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.list.call(null, "()")
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  var pr_pair__4211 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__4211, "{", ", ", "}", opts, coll)
};
cljs.core.Atom = function(state, meta, validator, watches) {
  this.state = state;
  this.meta = meta;
  this.validator = validator;
  this.watches = watches
};
cljs.core.Atom.prototype.cljs$core$IHash$ = true;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = function(this$) {
  var this__4212 = this;
  return goog.getUid.call(null, this$)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = function(this$, oldval, newval) {
  var this__4213 = this;
  var G__4214__4215 = cljs.core.seq.call(null, this__4213.watches);
  if(cljs.core.truth_(G__4214__4215)) {
    var G__4217__4219 = cljs.core.first.call(null, G__4214__4215);
    var vec__4218__4220 = G__4217__4219;
    var key__4221 = cljs.core.nth.call(null, vec__4218__4220, 0, null);
    var f__4222 = cljs.core.nth.call(null, vec__4218__4220, 1, null);
    var G__4214__4223 = G__4214__4215;
    var G__4217__4224 = G__4217__4219;
    var G__4214__4225 = G__4214__4223;
    while(true) {
      var vec__4226__4227 = G__4217__4224;
      var key__4228 = cljs.core.nth.call(null, vec__4226__4227, 0, null);
      var f__4229 = cljs.core.nth.call(null, vec__4226__4227, 1, null);
      var G__4214__4230 = G__4214__4225;
      f__4229.call(null, key__4228, this$, oldval, newval);
      var temp__3698__auto____4231 = cljs.core.next.call(null, G__4214__4230);
      if(cljs.core.truth_(temp__3698__auto____4231)) {
        var G__4214__4232 = temp__3698__auto____4231;
        var G__4239 = cljs.core.first.call(null, G__4214__4232);
        var G__4240 = G__4214__4232;
        G__4217__4224 = G__4239;
        G__4214__4225 = G__4240;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = function(this$, key, f) {
  var this__4233 = this;
  return this$.watches = cljs.core.assoc.call(null, this__4233.watches, key, f)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = function(this$, key) {
  var this__4234 = this;
  return this$.watches = cljs.core.dissoc.call(null, this__4234.watches, key)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = function(a, opts) {
  var this__4235 = this;
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray(["#<Atom: "]), cljs.core._pr_seq.call(null, this__4235.state, opts), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = function(_) {
  var this__4236 = this;
  return this__4236.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = function(_) {
  var this__4237 = this;
  return this__4237.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = function(o, other) {
  var this__4238 = this;
  return o === other
};
cljs.core.atom = function() {
  var atom = null;
  var atom__4247 = function(x) {
    return new cljs.core.Atom(x, null, null, null)
  };
  var atom__4248 = function() {
    var G__4250__delegate = function(x, p__4241) {
      var map__4242__4243 = p__4241;
      var map__4242__4244 = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, map__4242__4243)) ? cljs.core.apply.call(null, cljs.core.hash_map, map__4242__4243) : map__4242__4243;
      var validator__4245 = cljs.core.get.call(null, map__4242__4244, "\ufdd0'validator");
      var meta__4246 = cljs.core.get.call(null, map__4242__4244, "\ufdd0'meta");
      return new cljs.core.Atom(x, meta__4246, validator__4245, null)
    };
    var G__4250 = function(x, var_args) {
      var p__4241 = null;
      if(goog.isDef(var_args)) {
        p__4241 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__4250__delegate.call(this, x, p__4241)
    };
    G__4250.cljs$lang$maxFixedArity = 1;
    G__4250.cljs$lang$applyTo = function(arglist__4251) {
      var x = cljs.core.first(arglist__4251);
      var p__4241 = cljs.core.rest(arglist__4251);
      return G__4250__delegate.call(this, x, p__4241)
    };
    return G__4250
  }();
  atom = function(x, var_args) {
    var p__4241 = var_args;
    switch(arguments.length) {
      case 1:
        return atom__4247.call(this, x);
      default:
        return atom__4248.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  atom.cljs$lang$maxFixedArity = 1;
  atom.cljs$lang$applyTo = atom__4248.cljs$lang$applyTo;
  return atom
}();
cljs.core.reset_BANG_ = function reset_BANG_(a, new_value) {
  var temp__3698__auto____4252 = a.validator;
  if(cljs.core.truth_(temp__3698__auto____4252)) {
    var validate__4253 = temp__3698__auto____4252;
    if(cljs.core.truth_(validate__4253.call(null, new_value))) {
    }else {
      throw new Error(cljs.core.str.call(null, "Assert failed: ", "Validator rejected reference state", "\n", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 3016)))));
    }
  }else {
  }
  var old_value__4254 = a.state;
  a.state = new_value;
  cljs.core._notify_watches.call(null, a, old_value__4254, new_value);
  return new_value
};
cljs.core.swap_BANG_ = function() {
  var swap_BANG_ = null;
  var swap_BANG___4255 = function(a, f) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state))
  };
  var swap_BANG___4256 = function(a, f, x) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x))
  };
  var swap_BANG___4257 = function(a, f, x, y) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y))
  };
  var swap_BANG___4258 = function(a, f, x, y, z) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y, z))
  };
  var swap_BANG___4259 = function() {
    var G__4261__delegate = function(a, f, x, y, z, more) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, f, a.state, x, y, z, more))
    };
    var G__4261 = function(a, f, x, y, z, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__4261__delegate.call(this, a, f, x, y, z, more)
    };
    G__4261.cljs$lang$maxFixedArity = 5;
    G__4261.cljs$lang$applyTo = function(arglist__4262) {
      var a = cljs.core.first(arglist__4262);
      var f = cljs.core.first(cljs.core.next(arglist__4262));
      var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4262)));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4262))));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4262)))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4262)))));
      return G__4261__delegate.call(this, a, f, x, y, z, more)
    };
    return G__4261
  }();
  swap_BANG_ = function(a, f, x, y, z, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return swap_BANG___4255.call(this, a, f);
      case 3:
        return swap_BANG___4256.call(this, a, f, x);
      case 4:
        return swap_BANG___4257.call(this, a, f, x, y);
      case 5:
        return swap_BANG___4258.call(this, a, f, x, y, z);
      default:
        return swap_BANG___4259.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  swap_BANG_.cljs$lang$maxFixedArity = 5;
  swap_BANG_.cljs$lang$applyTo = swap_BANG___4259.cljs$lang$applyTo;
  return swap_BANG_
}();
cljs.core.compare_and_set_BANG_ = function compare_and_set_BANG_(a, oldval, newval) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, a.state, oldval))) {
    cljs.core.reset_BANG_.call(null, a, newval);
    return true
  }else {
    return false
  }
};
cljs.core.deref = function deref(o) {
  return cljs.core._deref.call(null, o)
};
cljs.core.set_validator_BANG_ = function set_validator_BANG_(iref, val) {
  return iref.validator = val
};
cljs.core.get_validator = function get_validator(iref) {
  return iref.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var alter_meta_BANG___delegate = function(iref, f, args) {
    return iref.meta = cljs.core.apply.call(null, f, iref.meta, args)
  };
  var alter_meta_BANG_ = function(iref, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
  alter_meta_BANG_.cljs$lang$applyTo = function(arglist__4263) {
    var iref = cljs.core.first(arglist__4263);
    var f = cljs.core.first(cljs.core.next(arglist__4263));
    var args = cljs.core.rest(cljs.core.next(arglist__4263));
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  return alter_meta_BANG_
}();
cljs.core.reset_meta_BANG_ = function reset_meta_BANG_(iref, m) {
  return iref.meta = m
};
cljs.core.add_watch = function add_watch(iref, key, f) {
  return cljs.core._add_watch.call(null, iref, key, f)
};
cljs.core.remove_watch = function remove_watch(iref, key) {
  return cljs.core._remove_watch.call(null, iref, key)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var gensym = null;
  var gensym__4264 = function() {
    return gensym.call(null, "G__")
  };
  var gensym__4265 = function(prefix_string) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.gensym_counter))) {
      cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
    }else {
    }
    return cljs.core.symbol.call(null, cljs.core.str.call(null, prefix_string, cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc)))
  };
  gensym = function(prefix_string) {
    switch(arguments.length) {
      case 0:
        return gensym__4264.call(this);
      case 1:
        return gensym__4265.call(this, prefix_string)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return gensym
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(f, state) {
  this.f = f;
  this.state = state
};
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = function(d) {
  var this__4267 = this;
  return cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, cljs.core.deref.call(null, this__4267.state)))
};
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = function(_) {
  var this__4268 = this;
  if(cljs.core.truth_(cljs.core.deref.call(null, this__4268.state))) {
  }else {
    cljs.core.swap_BANG_.call(null, this__4268.state, this__4268.f)
  }
  return cljs.core.deref.call(null, this__4268.state)
};
cljs.core.delay = function() {
  var delay__delegate = function(body) {
    return new cljs.core.Delay(function() {
      return cljs.core.apply.call(null, cljs.core.identity, body)
    }, cljs.core.atom.call(null, null))
  };
  var delay = function(var_args) {
    var body = null;
    if(goog.isDef(var_args)) {
      body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return delay__delegate.call(this, body)
  };
  delay.cljs$lang$maxFixedArity = 0;
  delay.cljs$lang$applyTo = function(arglist__4269) {
    var body = cljs.core.seq(arglist__4269);
    return delay__delegate.call(this, body)
  };
  return delay
}();
cljs.core.delay_QMARK_ = function delay_QMARK_(x) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, x)
};
cljs.core.force = function force(x) {
  if(cljs.core.truth_(cljs.core.delay_QMARK_.call(null, x))) {
    return cljs.core.deref.call(null, x)
  }else {
    return x
  }
};
cljs.core.realized_QMARK_ = function realized_QMARK_(d) {
  return cljs.core._realized_QMARK_.call(null, d)
};
cljs.core.js__GT_clj = function() {
  var js__GT_clj__delegate = function(x, options) {
    var map__4270__4271 = options;
    var map__4270__4272 = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, map__4270__4271)) ? cljs.core.apply.call(null, cljs.core.hash_map, map__4270__4271) : map__4270__4271;
    var keywordize_keys__4273 = cljs.core.get.call(null, map__4270__4272, "\ufdd0'keywordize-keys");
    var keyfn__4274 = cljs.core.truth_(keywordize_keys__4273) ? cljs.core.keyword : cljs.core.str;
    var f__4280 = function thisfn(x) {
      if(cljs.core.truth_(cljs.core.seq_QMARK_.call(null, x))) {
        return cljs.core.doall.call(null, cljs.core.map.call(null, thisfn, x))
      }else {
        if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null, x))) {
          return cljs.core.into.call(null, cljs.core.empty.call(null, x), cljs.core.map.call(null, thisfn, x))
        }else {
          if(cljs.core.truth_(goog.isArray.call(null, x))) {
            return cljs.core.vec.call(null, cljs.core.map.call(null, thisfn, x))
          }else {
            if(cljs.core.truth_(goog.isObject.call(null, x))) {
              return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), function() {
                var iter__481__auto____4279 = function iter__4275(s__4276) {
                  return new cljs.core.LazySeq(null, false, function() {
                    var s__4276__4277 = s__4276;
                    while(true) {
                      if(cljs.core.truth_(cljs.core.seq.call(null, s__4276__4277))) {
                        var k__4278 = cljs.core.first.call(null, s__4276__4277);
                        return cljs.core.cons.call(null, cljs.core.Vector.fromArray([keyfn__4274.call(null, k__4278), thisfn.call(null, x[k__4278])]), iter__4275.call(null, cljs.core.rest.call(null, s__4276__4277)))
                      }else {
                        return null
                      }
                      break
                    }
                  })
                };
                return iter__481__auto____4279.call(null, cljs.core.js_keys.call(null, x))
              }())
            }else {
              if(cljs.core.truth_("\ufdd0'else")) {
                return x
              }else {
                return null
              }
            }
          }
        }
      }
    };
    return f__4280.call(null, x)
  };
  var js__GT_clj = function(x, var_args) {
    var options = null;
    if(goog.isDef(var_args)) {
      options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return js__GT_clj__delegate.call(this, x, options)
  };
  js__GT_clj.cljs$lang$maxFixedArity = 1;
  js__GT_clj.cljs$lang$applyTo = function(arglist__4281) {
    var x = cljs.core.first(arglist__4281);
    var options = cljs.core.rest(arglist__4281);
    return js__GT_clj__delegate.call(this, x, options)
  };
  return js__GT_clj
}();
cljs.core.memoize = function memoize(f) {
  var mem__4282 = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
  return function() {
    var G__4286__delegate = function(args) {
      var temp__3695__auto____4283 = cljs.core.get.call(null, cljs.core.deref.call(null, mem__4282), args);
      if(cljs.core.truth_(temp__3695__auto____4283)) {
        var v__4284 = temp__3695__auto____4283;
        return v__4284
      }else {
        var ret__4285 = cljs.core.apply.call(null, f, args);
        cljs.core.swap_BANG_.call(null, mem__4282, cljs.core.assoc, args, ret__4285);
        return ret__4285
      }
    };
    var G__4286 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__4286__delegate.call(this, args)
    };
    G__4286.cljs$lang$maxFixedArity = 0;
    G__4286.cljs$lang$applyTo = function(arglist__4287) {
      var args = cljs.core.seq(arglist__4287);
      return G__4286__delegate.call(this, args)
    };
    return G__4286
  }()
};
cljs.core.trampoline = function() {
  var trampoline = null;
  var trampoline__4289 = function(f) {
    while(true) {
      var ret__4288 = f.call(null);
      if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null, ret__4288))) {
        var G__4292 = ret__4288;
        f = G__4292;
        continue
      }else {
        return ret__4288
      }
      break
    }
  };
  var trampoline__4290 = function() {
    var G__4293__delegate = function(f, args) {
      return trampoline.call(null, function() {
        return cljs.core.apply.call(null, f, args)
      })
    };
    var G__4293 = function(f, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__4293__delegate.call(this, f, args)
    };
    G__4293.cljs$lang$maxFixedArity = 1;
    G__4293.cljs$lang$applyTo = function(arglist__4294) {
      var f = cljs.core.first(arglist__4294);
      var args = cljs.core.rest(arglist__4294);
      return G__4293__delegate.call(this, f, args)
    };
    return G__4293
  }();
  trampoline = function(f, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 1:
        return trampoline__4289.call(this, f);
      default:
        return trampoline__4290.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  trampoline.cljs$lang$maxFixedArity = 1;
  trampoline.cljs$lang$applyTo = trampoline__4290.cljs$lang$applyTo;
  return trampoline
}();
cljs.core.rand = function() {
  var rand = null;
  var rand__4295 = function() {
    return rand.call(null, 1)
  };
  var rand__4296 = function(n) {
    return Math.random() * n
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__4295.call(this);
      case 1:
        return rand__4296.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return Math.floor(Math.random() * n)
};
cljs.core.rand_nth = function rand_nth(coll) {
  return cljs.core.nth.call(null, coll, cljs.core.rand_int.call(null, cljs.core.count.call(null, coll)))
};
cljs.core.group_by = function group_by(f, coll) {
  return cljs.core.reduce.call(null, function(ret, x) {
    var k__4298 = f.call(null, x);
    return cljs.core.assoc.call(null, ret, k__4298, cljs.core.conj.call(null, cljs.core.get.call(null, ret, k__4298, cljs.core.Vector.fromArray([])), x))
  }, cljs.core.ObjMap.fromObject([], {}), coll)
};
cljs.core.make_hierarchy = function make_hierarchy() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'descendants":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'ancestors":cljs.core.ObjMap.fromObject([], {})})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var isa_QMARK_ = null;
  var isa_QMARK___4307 = function(child, parent) {
    return isa_QMARK_.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), child, parent)
  };
  var isa_QMARK___4308 = function(h, child, parent) {
    var or__3548__auto____4299 = cljs.core._EQ_.call(null, child, parent);
    if(cljs.core.truth_(or__3548__auto____4299)) {
      return or__3548__auto____4299
    }else {
      var or__3548__auto____4300 = cljs.core.contains_QMARK_.call(null, "\ufdd0'ancestors".call(null, h).call(null, child), parent);
      if(cljs.core.truth_(or__3548__auto____4300)) {
        return or__3548__auto____4300
      }else {
        var and__3546__auto____4301 = cljs.core.vector_QMARK_.call(null, parent);
        if(cljs.core.truth_(and__3546__auto____4301)) {
          var and__3546__auto____4302 = cljs.core.vector_QMARK_.call(null, child);
          if(cljs.core.truth_(and__3546__auto____4302)) {
            var and__3546__auto____4303 = cljs.core._EQ_.call(null, cljs.core.count.call(null, parent), cljs.core.count.call(null, child));
            if(cljs.core.truth_(and__3546__auto____4303)) {
              var ret__4304 = true;
              var i__4305 = 0;
              while(true) {
                if(cljs.core.truth_(function() {
                  var or__3548__auto____4306 = cljs.core.not.call(null, ret__4304);
                  if(cljs.core.truth_(or__3548__auto____4306)) {
                    return or__3548__auto____4306
                  }else {
                    return cljs.core._EQ_.call(null, i__4305, cljs.core.count.call(null, parent))
                  }
                }())) {
                  return ret__4304
                }else {
                  var G__4310 = isa_QMARK_.call(null, h, child.call(null, i__4305), parent.call(null, i__4305));
                  var G__4311 = i__4305 + 1;
                  ret__4304 = G__4310;
                  i__4305 = G__4311;
                  continue
                }
                break
              }
            }else {
              return and__3546__auto____4303
            }
          }else {
            return and__3546__auto____4302
          }
        }else {
          return and__3546__auto____4301
        }
      }
    }
  };
  isa_QMARK_ = function(h, child, parent) {
    switch(arguments.length) {
      case 2:
        return isa_QMARK___4307.call(this, h, child);
      case 3:
        return isa_QMARK___4308.call(this, h, child, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return isa_QMARK_
}();
cljs.core.parents = function() {
  var parents = null;
  var parents__4312 = function(tag) {
    return parents.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var parents__4313 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'parents".call(null, h), tag))
  };
  parents = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return parents__4312.call(this, h);
      case 2:
        return parents__4313.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return parents
}();
cljs.core.ancestors = function() {
  var ancestors = null;
  var ancestors__4315 = function(tag) {
    return ancestors.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var ancestors__4316 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'ancestors".call(null, h), tag))
  };
  ancestors = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return ancestors__4315.call(this, h);
      case 2:
        return ancestors__4316.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return ancestors
}();
cljs.core.descendants = function() {
  var descendants = null;
  var descendants__4318 = function(tag) {
    return descendants.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var descendants__4319 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'descendants".call(null, h), tag))
  };
  descendants = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return descendants__4318.call(this, h);
      case 2:
        return descendants__4319.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return descendants
}();
cljs.core.derive = function() {
  var derive = null;
  var derive__4329 = function(tag, parent) {
    if(cljs.core.truth_(cljs.core.namespace.call(null, parent))) {
    }else {
      throw new Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3308)))));
    }
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, derive, tag, parent);
    return null
  };
  var derive__4330 = function(h, tag, parent) {
    if(cljs.core.truth_(cljs.core.not_EQ_.call(null, tag, parent))) {
    }else {
      throw new Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3312)))));
    }
    var tp__4324 = "\ufdd0'parents".call(null, h);
    var td__4325 = "\ufdd0'descendants".call(null, h);
    var ta__4326 = "\ufdd0'ancestors".call(null, h);
    var tf__4327 = function(m, source, sources, target, targets) {
      return cljs.core.reduce.call(null, function(ret, k) {
        return cljs.core.assoc.call(null, ret, k, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, targets, k, cljs.core.set([])), cljs.core.cons.call(null, target, targets.call(null, target))))
      }, m, cljs.core.cons.call(null, source, sources.call(null, source)))
    };
    var or__3548__auto____4328 = cljs.core.truth_(cljs.core.contains_QMARK_.call(null, tp__4324.call(null, tag), parent)) ? null : function() {
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, ta__4326.call(null, tag), parent))) {
        throw new Error(cljs.core.str.call(null, tag, "already has", parent, "as ancestor"));
      }else {
      }
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, ta__4326.call(null, parent), tag))) {
        throw new Error(cljs.core.str.call(null, "Cyclic derivation:", parent, "has", tag, "as ancestor"));
      }else {
      }
      return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, "\ufdd0'parents".call(null, h), tag, cljs.core.conj.call(null, cljs.core.get.call(null, tp__4324, tag, cljs.core.set([])), parent)), "\ufdd0'ancestors":tf__4327.call(null, "\ufdd0'ancestors".call(null, h), tag, td__4325, parent, ta__4326), "\ufdd0'descendants":tf__4327.call(null, "\ufdd0'descendants".call(null, h), parent, ta__4326, tag, td__4325)})
    }();
    if(cljs.core.truth_(or__3548__auto____4328)) {
      return or__3548__auto____4328
    }else {
      return h
    }
  };
  derive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return derive__4329.call(this, h, tag);
      case 3:
        return derive__4330.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return derive
}();
cljs.core.underive = function() {
  var underive = null;
  var underive__4336 = function(tag, parent) {
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, underive, tag, parent);
    return null
  };
  var underive__4337 = function(h, tag, parent) {
    var parentMap__4332 = "\ufdd0'parents".call(null, h);
    var childsParents__4333 = cljs.core.truth_(parentMap__4332.call(null, tag)) ? cljs.core.disj.call(null, parentMap__4332.call(null, tag), parent) : cljs.core.set([]);
    var newParents__4334 = cljs.core.truth_(cljs.core.not_empty.call(null, childsParents__4333)) ? cljs.core.assoc.call(null, parentMap__4332, tag, childsParents__4333) : cljs.core.dissoc.call(null, parentMap__4332, tag);
    var deriv_seq__4335 = cljs.core.flatten.call(null, cljs.core.map.call(null, function(p1__4321_SHARP_) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, p1__4321_SHARP_), cljs.core.interpose.call(null, cljs.core.first.call(null, p1__4321_SHARP_), cljs.core.second.call(null, p1__4321_SHARP_)))
    }, cljs.core.seq.call(null, newParents__4334)));
    if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, parentMap__4332.call(null, tag), parent))) {
      return cljs.core.reduce.call(null, function(p1__4322_SHARP_, p2__4323_SHARP_) {
        return cljs.core.apply.call(null, cljs.core.derive, p1__4322_SHARP_, p2__4323_SHARP_)
      }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, deriv_seq__4335))
    }else {
      return h
    }
  };
  underive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return underive__4336.call(this, h, tag);
      case 3:
        return underive__4337.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return underive
}();
cljs.core.reset_cache = function reset_cache(method_cache, method_table, cached_hierarchy, hierarchy) {
  cljs.core.swap_BANG_.call(null, method_cache, function(_) {
    return cljs.core.deref.call(null, method_table)
  });
  return cljs.core.swap_BANG_.call(null, cached_hierarchy, function(_) {
    return cljs.core.deref.call(null, hierarchy)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(x, y, prefer_table) {
  var xprefs__4339 = cljs.core.deref.call(null, prefer_table).call(null, x);
  var or__3548__auto____4341 = cljs.core.truth_(function() {
    var and__3546__auto____4340 = xprefs__4339;
    if(cljs.core.truth_(and__3546__auto____4340)) {
      return xprefs__4339.call(null, y)
    }else {
      return and__3546__auto____4340
    }
  }()) ? true : null;
  if(cljs.core.truth_(or__3548__auto____4341)) {
    return or__3548__auto____4341
  }else {
    var or__3548__auto____4343 = function() {
      var ps__4342 = cljs.core.parents.call(null, y);
      while(true) {
        if(cljs.core.truth_(cljs.core.count.call(null, ps__4342) > 0)) {
          if(cljs.core.truth_(prefers_STAR_.call(null, x, cljs.core.first.call(null, ps__4342), prefer_table))) {
          }else {
          }
          var G__4346 = cljs.core.rest.call(null, ps__4342);
          ps__4342 = G__4346;
          continue
        }else {
          return null
        }
        break
      }
    }();
    if(cljs.core.truth_(or__3548__auto____4343)) {
      return or__3548__auto____4343
    }else {
      var or__3548__auto____4345 = function() {
        var ps__4344 = cljs.core.parents.call(null, x);
        while(true) {
          if(cljs.core.truth_(cljs.core.count.call(null, ps__4344) > 0)) {
            if(cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, ps__4344), y, prefer_table))) {
            }else {
            }
            var G__4347 = cljs.core.rest.call(null, ps__4344);
            ps__4344 = G__4347;
            continue
          }else {
            return null
          }
          break
        }
      }();
      if(cljs.core.truth_(or__3548__auto____4345)) {
        return or__3548__auto____4345
      }else {
        return false
      }
    }
  }
};
cljs.core.dominates = function dominates(x, y, prefer_table) {
  var or__3548__auto____4348 = cljs.core.prefers_STAR_.call(null, x, y, prefer_table);
  if(cljs.core.truth_(or__3548__auto____4348)) {
    return or__3548__auto____4348
  }else {
    return cljs.core.isa_QMARK_.call(null, x, y)
  }
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  var best_entry__4357 = cljs.core.reduce.call(null, function(be, p__4349) {
    var vec__4350__4351 = p__4349;
    var k__4352 = cljs.core.nth.call(null, vec__4350__4351, 0, null);
    var ___4353 = cljs.core.nth.call(null, vec__4350__4351, 1, null);
    var e__4354 = vec__4350__4351;
    if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null, dispatch_val, k__4352))) {
      var be2__4356 = cljs.core.truth_(function() {
        var or__3548__auto____4355 = cljs.core.nil_QMARK_.call(null, be);
        if(cljs.core.truth_(or__3548__auto____4355)) {
          return or__3548__auto____4355
        }else {
          return cljs.core.dominates.call(null, k__4352, cljs.core.first.call(null, be), prefer_table)
        }
      }()) ? e__4354 : be;
      if(cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, be2__4356), k__4352, prefer_table))) {
      }else {
        throw new Error(cljs.core.str.call(null, "Multiple methods in multimethod '", name, "' match dispatch value: ", dispatch_val, " -> ", k__4352, " and ", cljs.core.first.call(null, be2__4356), ", and neither is preferred"));
      }
      return be2__4356
    }else {
      return be
    }
  }, null, cljs.core.deref.call(null, method_table));
  if(cljs.core.truth_(best_entry__4357)) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, cached_hierarchy), cljs.core.deref.call(null, hierarchy)))) {
      cljs.core.swap_BANG_.call(null, method_cache, cljs.core.assoc, dispatch_val, cljs.core.second.call(null, best_entry__4357));
      return cljs.core.second.call(null, best_entry__4357)
    }else {
      cljs.core.reset_cache.call(null, method_cache, method_table, cached_hierarchy, hierarchy);
      return find_and_cache_best_method.call(null, name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy)
    }
  }else {
    return null
  }
};
cljs.core.IMultiFn = {};
cljs.core._reset = function _reset(mf) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4358 = mf;
    if(cljs.core.truth_(and__3546__auto____4358)) {
      return mf.cljs$core$IMultiFn$_reset
    }else {
      return and__3546__auto____4358
    }
  }())) {
    return mf.cljs$core$IMultiFn$_reset(mf)
  }else {
    return function() {
      var or__3548__auto____4359 = cljs.core._reset[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4359)) {
        return or__3548__auto____4359
      }else {
        var or__3548__auto____4360 = cljs.core._reset["_"];
        if(cljs.core.truth_(or__3548__auto____4360)) {
          return or__3548__auto____4360
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._add_method = function _add_method(mf, dispatch_val, method) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4361 = mf;
    if(cljs.core.truth_(and__3546__auto____4361)) {
      return mf.cljs$core$IMultiFn$_add_method
    }else {
      return and__3546__auto____4361
    }
  }())) {
    return mf.cljs$core$IMultiFn$_add_method(mf, dispatch_val, method)
  }else {
    return function() {
      var or__3548__auto____4362 = cljs.core._add_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4362)) {
        return or__3548__auto____4362
      }else {
        var or__3548__auto____4363 = cljs.core._add_method["_"];
        if(cljs.core.truth_(or__3548__auto____4363)) {
          return or__3548__auto____4363
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, method)
  }
};
cljs.core._remove_method = function _remove_method(mf, dispatch_val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4364 = mf;
    if(cljs.core.truth_(and__3546__auto____4364)) {
      return mf.cljs$core$IMultiFn$_remove_method
    }else {
      return and__3546__auto____4364
    }
  }())) {
    return mf.cljs$core$IMultiFn$_remove_method(mf, dispatch_val)
  }else {
    return function() {
      var or__3548__auto____4365 = cljs.core._remove_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4365)) {
        return or__3548__auto____4365
      }else {
        var or__3548__auto____4366 = cljs.core._remove_method["_"];
        if(cljs.core.truth_(or__3548__auto____4366)) {
          return or__3548__auto____4366
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._prefer_method = function _prefer_method(mf, dispatch_val, dispatch_val_y) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4367 = mf;
    if(cljs.core.truth_(and__3546__auto____4367)) {
      return mf.cljs$core$IMultiFn$_prefer_method
    }else {
      return and__3546__auto____4367
    }
  }())) {
    return mf.cljs$core$IMultiFn$_prefer_method(mf, dispatch_val, dispatch_val_y)
  }else {
    return function() {
      var or__3548__auto____4368 = cljs.core._prefer_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4368)) {
        return or__3548__auto____4368
      }else {
        var or__3548__auto____4369 = cljs.core._prefer_method["_"];
        if(cljs.core.truth_(or__3548__auto____4369)) {
          return or__3548__auto____4369
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, dispatch_val_y)
  }
};
cljs.core._get_method = function _get_method(mf, dispatch_val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4370 = mf;
    if(cljs.core.truth_(and__3546__auto____4370)) {
      return mf.cljs$core$IMultiFn$_get_method
    }else {
      return and__3546__auto____4370
    }
  }())) {
    return mf.cljs$core$IMultiFn$_get_method(mf, dispatch_val)
  }else {
    return function() {
      var or__3548__auto____4371 = cljs.core._get_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4371)) {
        return or__3548__auto____4371
      }else {
        var or__3548__auto____4372 = cljs.core._get_method["_"];
        if(cljs.core.truth_(or__3548__auto____4372)) {
          return or__3548__auto____4372
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._methods = function _methods(mf) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4373 = mf;
    if(cljs.core.truth_(and__3546__auto____4373)) {
      return mf.cljs$core$IMultiFn$_methods
    }else {
      return and__3546__auto____4373
    }
  }())) {
    return mf.cljs$core$IMultiFn$_methods(mf)
  }else {
    return function() {
      var or__3548__auto____4374 = cljs.core._methods[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4374)) {
        return or__3548__auto____4374
      }else {
        var or__3548__auto____4375 = cljs.core._methods["_"];
        if(cljs.core.truth_(or__3548__auto____4375)) {
          return or__3548__auto____4375
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._prefers = function _prefers(mf) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4376 = mf;
    if(cljs.core.truth_(and__3546__auto____4376)) {
      return mf.cljs$core$IMultiFn$_prefers
    }else {
      return and__3546__auto____4376
    }
  }())) {
    return mf.cljs$core$IMultiFn$_prefers(mf)
  }else {
    return function() {
      var or__3548__auto____4377 = cljs.core._prefers[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4377)) {
        return or__3548__auto____4377
      }else {
        var or__3548__auto____4378 = cljs.core._prefers["_"];
        if(cljs.core.truth_(or__3548__auto____4378)) {
          return or__3548__auto____4378
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._invoke = function _invoke(mf, args) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4379 = mf;
    if(cljs.core.truth_(and__3546__auto____4379)) {
      return mf.cljs$core$IMultiFn$_invoke
    }else {
      return and__3546__auto____4379
    }
  }())) {
    return mf.cljs$core$IMultiFn$_invoke(mf, args)
  }else {
    return function() {
      var or__3548__auto____4380 = cljs.core._invoke[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4380)) {
        return or__3548__auto____4380
      }else {
        var or__3548__auto____4381 = cljs.core._invoke["_"];
        if(cljs.core.truth_(or__3548__auto____4381)) {
          return or__3548__auto____4381
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-invoke", mf);
        }
      }
    }().call(null, mf, args)
  }
};
cljs.core.do_invoke = function do_invoke(mf, dispatch_fn, args) {
  var dispatch_val__4382 = cljs.core.apply.call(null, dispatch_fn, args);
  var target_fn__4383 = cljs.core._get_method.call(null, mf, dispatch_val__4382);
  if(cljs.core.truth_(target_fn__4383)) {
  }else {
    throw new Error(cljs.core.str.call(null, "No method in multimethod '", cljs.core.name, "' for dispatch value: ", dispatch_val__4382));
  }
  return cljs.core.apply.call(null, target_fn__4383, args)
};
cljs.core.MultiFn = function(name, dispatch_fn, default_dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  this.name = name;
  this.dispatch_fn = dispatch_fn;
  this.default_dispatch_val = default_dispatch_val;
  this.hierarchy = hierarchy;
  this.method_table = method_table;
  this.prefer_table = prefer_table;
  this.method_cache = method_cache;
  this.cached_hierarchy = cached_hierarchy
};
cljs.core.MultiFn.prototype.cljs$core$IHash$ = true;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = function(this$) {
  var this__4384 = this;
  return goog.getUid.call(null, this$)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = function(mf) {
  var this__4385 = this;
  cljs.core.swap_BANG_.call(null, this__4385.method_table, function(mf) {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this__4385.method_cache, function(mf) {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this__4385.prefer_table, function(mf) {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this__4385.cached_hierarchy, function(mf) {
    return null
  });
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = function(mf, dispatch_val, method) {
  var this__4386 = this;
  cljs.core.swap_BANG_.call(null, this__4386.method_table, cljs.core.assoc, dispatch_val, method);
  cljs.core.reset_cache.call(null, this__4386.method_cache, this__4386.method_table, this__4386.cached_hierarchy, this__4386.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = function(mf, dispatch_val) {
  var this__4387 = this;
  cljs.core.swap_BANG_.call(null, this__4387.method_table, cljs.core.dissoc, dispatch_val);
  cljs.core.reset_cache.call(null, this__4387.method_cache, this__4387.method_table, this__4387.cached_hierarchy, this__4387.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = function(mf, dispatch_val) {
  var this__4388 = this;
  if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this__4388.cached_hierarchy), cljs.core.deref.call(null, this__4388.hierarchy)))) {
  }else {
    cljs.core.reset_cache.call(null, this__4388.method_cache, this__4388.method_table, this__4388.cached_hierarchy, this__4388.hierarchy)
  }
  var temp__3695__auto____4389 = cljs.core.deref.call(null, this__4388.method_cache).call(null, dispatch_val);
  if(cljs.core.truth_(temp__3695__auto____4389)) {
    var target_fn__4390 = temp__3695__auto____4389;
    return target_fn__4390
  }else {
    var temp__3695__auto____4391 = cljs.core.find_and_cache_best_method.call(null, this__4388.name, dispatch_val, this__4388.hierarchy, this__4388.method_table, this__4388.prefer_table, this__4388.method_cache, this__4388.cached_hierarchy);
    if(cljs.core.truth_(temp__3695__auto____4391)) {
      var target_fn__4392 = temp__3695__auto____4391;
      return target_fn__4392
    }else {
      return cljs.core.deref.call(null, this__4388.method_table).call(null, this__4388.default_dispatch_val)
    }
  }
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = function(mf, dispatch_val_x, dispatch_val_y) {
  var this__4393 = this;
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, dispatch_val_x, dispatch_val_y, this__4393.prefer_table))) {
    throw new Error(cljs.core.str.call(null, "Preference conflict in multimethod '", this__4393.name, "': ", dispatch_val_y, " is already preferred to ", dispatch_val_x));
  }else {
  }
  cljs.core.swap_BANG_.call(null, this__4393.prefer_table, function(old) {
    return cljs.core.assoc.call(null, old, dispatch_val_x, cljs.core.conj.call(null, cljs.core.get.call(null, old, dispatch_val_x, cljs.core.set([])), dispatch_val_y))
  });
  return cljs.core.reset_cache.call(null, this__4393.method_cache, this__4393.method_table, this__4393.cached_hierarchy, this__4393.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = function(mf) {
  var this__4394 = this;
  return cljs.core.deref.call(null, this__4394.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = function(mf) {
  var this__4395 = this;
  return cljs.core.deref.call(null, this__4395.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_invoke = function(mf, args) {
  var this__4396 = this;
  return cljs.core.do_invoke.call(null, mf, this__4396.dispatch_fn, args)
};
cljs.core.MultiFn.prototype.call = function() {
  var G__4397__delegate = function(_, args) {
    return cljs.core._invoke.call(null, this, args)
  };
  var G__4397 = function(_, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return G__4397__delegate.call(this, _, args)
  };
  G__4397.cljs$lang$maxFixedArity = 1;
  G__4397.cljs$lang$applyTo = function(arglist__4398) {
    var _ = cljs.core.first(arglist__4398);
    var args = cljs.core.rest(arglist__4398);
    return G__4397__delegate.call(this, _, args)
  };
  return G__4397
}();
cljs.core.remove_all_methods = function remove_all_methods(multifn) {
  return cljs.core._reset.call(null, multifn)
};
cljs.core.remove_method = function remove_method(multifn, dispatch_val) {
  return cljs.core._remove_method.call(null, multifn, dispatch_val)
};
cljs.core.prefer_method = function prefer_method(multifn, dispatch_val_x, dispatch_val_y) {
  return cljs.core._prefer_method.call(null, multifn, dispatch_val_x, dispatch_val_y)
};
cljs.core.methods$ = function methods$(multifn) {
  return cljs.core._methods.call(null, multifn)
};
cljs.core.get_method = function get_method(multifn, dispatch_val) {
  return cljs.core._get_method.call(null, multifn, dispatch_val)
};
cljs.core.prefers = function prefers(multifn) {
  return cljs.core._prefers.call(null, multifn)
};
goog.provide("clojure.browser.event");
goog.require("cljs.core");
goog.require("goog.events");
goog.require("goog.events.EventTarget");
goog.require("goog.events.EventType");
clojure.browser.event.EventType = {};
clojure.browser.event.event_types = function event_types(this$) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4506 = this$;
    if(cljs.core.truth_(and__3546__auto____4506)) {
      return this$.clojure$browser$event$EventType$event_types
    }else {
      return and__3546__auto____4506
    }
  }())) {
    return this$.clojure$browser$event$EventType$event_types(this$)
  }else {
    return function() {
      var or__3548__auto____4507 = clojure.browser.event.event_types[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____4507)) {
        return or__3548__auto____4507
      }else {
        var or__3548__auto____4508 = clojure.browser.event.event_types["_"];
        if(cljs.core.truth_(or__3548__auto____4508)) {
          return or__3548__auto____4508
        }else {
          throw cljs.core.missing_protocol.call(null, "EventType.event-types", this$);
        }
      }
    }().call(null, this$)
  }
};
Element.prototype.clojure$browser$event$EventType$ = true;
Element.prototype.clojure$browser$event$EventType$event_types = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(p__4509) {
    var vec__4510__4511 = p__4509;
    var k__4512 = cljs.core.nth.call(null, vec__4510__4511, 0, null);
    var v__4513 = cljs.core.nth.call(null, vec__4510__4511, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, k__4512.toLowerCase()), v__4513])
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
goog.events.EventTarget.prototype.clojure$browser$event$EventType$ = true;
goog.events.EventTarget.prototype.clojure$browser$event$EventType$event_types = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(p__4514) {
    var vec__4515__4516 = p__4514;
    var k__4517 = cljs.core.nth.call(null, vec__4515__4516, 0, null);
    var v__4518 = cljs.core.nth.call(null, vec__4515__4516, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, k__4517.toLowerCase()), v__4518])
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
clojure.browser.event.listen = function() {
  var listen = null;
  var listen__4519 = function(src, type, fn) {
    return listen.call(null, src, type, fn, false)
  };
  var listen__4520 = function(src, type, fn, capture_QMARK_) {
    return goog.events.listen.call(null, src, cljs.core.get.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  listen = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return listen__4519.call(this, src, type, fn);
      case 4:
        return listen__4520.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return listen
}();
clojure.browser.event.listen_once = function() {
  var listen_once = null;
  var listen_once__4522 = function(src, type, fn) {
    return listen_once.call(null, src, type, fn, false)
  };
  var listen_once__4523 = function(src, type, fn, capture_QMARK_) {
    return goog.events.listenOnce.call(null, src, cljs.core.get.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  listen_once = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return listen_once__4522.call(this, src, type, fn);
      case 4:
        return listen_once__4523.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return listen_once
}();
clojure.browser.event.unlisten = function() {
  var unlisten = null;
  var unlisten__4525 = function(src, type, fn) {
    return unlisten.call(null, src, type, fn, false)
  };
  var unlisten__4526 = function(src, type, fn, capture_QMARK_) {
    return goog.events.unlisten.call(null, src, cljs.core.get.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  unlisten = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return unlisten__4525.call(this, src, type, fn);
      case 4:
        return unlisten__4526.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return unlisten
}();
clojure.browser.event.unlisten_by_key = function unlisten_by_key(key) {
  return goog.events.unlistenByKey.call(null, key)
};
clojure.browser.event.dispatch_event = function dispatch_event(src, event) {
  return goog.events.dispatchEvent.call(null, src, event)
};
clojure.browser.event.expose = function expose(e) {
  return goog.events.expose.call(null, e)
};
clojure.browser.event.fire_listeners = function fire_listeners(obj, type, capture, event) {
  return null
};
clojure.browser.event.total_listener_count = function total_listener_count() {
  return goog.events.getTotalListenerCount.call(null)
};
clojure.browser.event.get_listener = function get_listener(src, type, listener, opt_capt, opt_handler) {
  return null
};
clojure.browser.event.all_listeners = function all_listeners(obj, type, capture) {
  return null
};
clojure.browser.event.unique_event_id = function unique_event_id(event_type) {
  return null
};
clojure.browser.event.has_listener = function has_listener(obj, opt_type, opt_capture) {
  return null
};
clojure.browser.event.remove_all = function remove_all(opt_obj, opt_type, opt_capt) {
  return null
};
goog.provide("clojure.browser.net");
goog.require("cljs.core");
goog.require("clojure.browser.event");
goog.require("goog.net.XhrIo");
goog.require("goog.net.EventType");
goog.require("goog.net.xpc.CfgFields");
goog.require("goog.net.xpc.CrossPageChannel");
goog.require("goog.json");
clojure.browser.net._STAR_timeout_STAR_ = 1E4;
clojure.browser.net.event_types = cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(p__4412) {
  var vec__4413__4414 = p__4412;
  var k__4415 = cljs.core.nth.call(null, vec__4413__4414, 0, null);
  var v__4416 = cljs.core.nth.call(null, vec__4413__4414, 1, null);
  return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, k__4415.toLowerCase()), v__4416])
}, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = function() {
  var connect = null;
  var connect__4447 = function(this$) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4417 = this$;
      if(cljs.core.truth_(and__3546__auto____4417)) {
        return this$.clojure$browser$net$IConnection$connect
      }else {
        return and__3546__auto____4417
      }
    }())) {
      return this$.clojure$browser$net$IConnection$connect(this$)
    }else {
      return function() {
        var or__3548__auto____4418 = clojure.browser.net.connect[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4418)) {
          return or__3548__auto____4418
        }else {
          var or__3548__auto____4419 = clojure.browser.net.connect["_"];
          if(cljs.core.truth_(or__3548__auto____4419)) {
            return or__3548__auto____4419
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var connect__4448 = function(this$, opt1) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4420 = this$;
      if(cljs.core.truth_(and__3546__auto____4420)) {
        return this$.clojure$browser$net$IConnection$connect
      }else {
        return and__3546__auto____4420
      }
    }())) {
      return this$.clojure$browser$net$IConnection$connect(this$, opt1)
    }else {
      return function() {
        var or__3548__auto____4421 = clojure.browser.net.connect[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4421)) {
          return or__3548__auto____4421
        }else {
          var or__3548__auto____4422 = clojure.browser.net.connect["_"];
          if(cljs.core.truth_(or__3548__auto____4422)) {
            return or__3548__auto____4422
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1)
    }
  };
  var connect__4449 = function(this$, opt1, opt2) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4423 = this$;
      if(cljs.core.truth_(and__3546__auto____4423)) {
        return this$.clojure$browser$net$IConnection$connect
      }else {
        return and__3546__auto____4423
      }
    }())) {
      return this$.clojure$browser$net$IConnection$connect(this$, opt1, opt2)
    }else {
      return function() {
        var or__3548__auto____4424 = clojure.browser.net.connect[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4424)) {
          return or__3548__auto____4424
        }else {
          var or__3548__auto____4425 = clojure.browser.net.connect["_"];
          if(cljs.core.truth_(or__3548__auto____4425)) {
            return or__3548__auto____4425
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1, opt2)
    }
  };
  var connect__4450 = function(this$, opt1, opt2, opt3) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4426 = this$;
      if(cljs.core.truth_(and__3546__auto____4426)) {
        return this$.clojure$browser$net$IConnection$connect
      }else {
        return and__3546__auto____4426
      }
    }())) {
      return this$.clojure$browser$net$IConnection$connect(this$, opt1, opt2, opt3)
    }else {
      return function() {
        var or__3548__auto____4427 = clojure.browser.net.connect[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4427)) {
          return or__3548__auto____4427
        }else {
          var or__3548__auto____4428 = clojure.browser.net.connect["_"];
          if(cljs.core.truth_(or__3548__auto____4428)) {
            return or__3548__auto____4428
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1, opt2, opt3)
    }
  };
  connect = function(this$, opt1, opt2, opt3) {
    switch(arguments.length) {
      case 1:
        return connect__4447.call(this, this$);
      case 2:
        return connect__4448.call(this, this$, opt1);
      case 3:
        return connect__4449.call(this, this$, opt1, opt2);
      case 4:
        return connect__4450.call(this, this$, opt1, opt2, opt3)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return connect
}();
clojure.browser.net.transmit = function() {
  var transmit = null;
  var transmit__4452 = function(this$, opt) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4429 = this$;
      if(cljs.core.truth_(and__3546__auto____4429)) {
        return this$.clojure$browser$net$IConnection$transmit
      }else {
        return and__3546__auto____4429
      }
    }())) {
      return this$.clojure$browser$net$IConnection$transmit(this$, opt)
    }else {
      return function() {
        var or__3548__auto____4430 = clojure.browser.net.transmit[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4430)) {
          return or__3548__auto____4430
        }else {
          var or__3548__auto____4431 = clojure.browser.net.transmit["_"];
          if(cljs.core.truth_(or__3548__auto____4431)) {
            return or__3548__auto____4431
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt)
    }
  };
  var transmit__4453 = function(this$, opt, opt2) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4432 = this$;
      if(cljs.core.truth_(and__3546__auto____4432)) {
        return this$.clojure$browser$net$IConnection$transmit
      }else {
        return and__3546__auto____4432
      }
    }())) {
      return this$.clojure$browser$net$IConnection$transmit(this$, opt, opt2)
    }else {
      return function() {
        var or__3548__auto____4433 = clojure.browser.net.transmit[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4433)) {
          return or__3548__auto____4433
        }else {
          var or__3548__auto____4434 = clojure.browser.net.transmit["_"];
          if(cljs.core.truth_(or__3548__auto____4434)) {
            return or__3548__auto____4434
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2)
    }
  };
  var transmit__4454 = function(this$, opt, opt2, opt3) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4435 = this$;
      if(cljs.core.truth_(and__3546__auto____4435)) {
        return this$.clojure$browser$net$IConnection$transmit
      }else {
        return and__3546__auto____4435
      }
    }())) {
      return this$.clojure$browser$net$IConnection$transmit(this$, opt, opt2, opt3)
    }else {
      return function() {
        var or__3548__auto____4436 = clojure.browser.net.transmit[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4436)) {
          return or__3548__auto____4436
        }else {
          var or__3548__auto____4437 = clojure.browser.net.transmit["_"];
          if(cljs.core.truth_(or__3548__auto____4437)) {
            return or__3548__auto____4437
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3)
    }
  };
  var transmit__4455 = function(this$, opt, opt2, opt3, opt4) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4438 = this$;
      if(cljs.core.truth_(and__3546__auto____4438)) {
        return this$.clojure$browser$net$IConnection$transmit
      }else {
        return and__3546__auto____4438
      }
    }())) {
      return this$.clojure$browser$net$IConnection$transmit(this$, opt, opt2, opt3, opt4)
    }else {
      return function() {
        var or__3548__auto____4439 = clojure.browser.net.transmit[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4439)) {
          return or__3548__auto____4439
        }else {
          var or__3548__auto____4440 = clojure.browser.net.transmit["_"];
          if(cljs.core.truth_(or__3548__auto____4440)) {
            return or__3548__auto____4440
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3, opt4)
    }
  };
  var transmit__4456 = function(this$, opt, opt2, opt3, opt4, opt5) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4441 = this$;
      if(cljs.core.truth_(and__3546__auto____4441)) {
        return this$.clojure$browser$net$IConnection$transmit
      }else {
        return and__3546__auto____4441
      }
    }())) {
      return this$.clojure$browser$net$IConnection$transmit(this$, opt, opt2, opt3, opt4, opt5)
    }else {
      return function() {
        var or__3548__auto____4442 = clojure.browser.net.transmit[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4442)) {
          return or__3548__auto____4442
        }else {
          var or__3548__auto____4443 = clojure.browser.net.transmit["_"];
          if(cljs.core.truth_(or__3548__auto____4443)) {
            return or__3548__auto____4443
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3, opt4, opt5)
    }
  };
  transmit = function(this$, opt, opt2, opt3, opt4, opt5) {
    switch(arguments.length) {
      case 2:
        return transmit__4452.call(this, this$, opt);
      case 3:
        return transmit__4453.call(this, this$, opt, opt2);
      case 4:
        return transmit__4454.call(this, this$, opt, opt2, opt3);
      case 5:
        return transmit__4455.call(this, this$, opt, opt2, opt3, opt4);
      case 6:
        return transmit__4456.call(this, this$, opt, opt2, opt3, opt4, opt5)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return transmit
}();
clojure.browser.net.close = function close(this$) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4444 = this$;
    if(cljs.core.truth_(and__3546__auto____4444)) {
      return this$.clojure$browser$net$IConnection$close
    }else {
      return and__3546__auto____4444
    }
  }())) {
    return this$.clojure$browser$net$IConnection$close(this$)
  }else {
    return function() {
      var or__3548__auto____4445 = clojure.browser.net.close[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____4445)) {
        return or__3548__auto____4445
      }else {
        var or__3548__auto____4446 = clojure.browser.net.close["_"];
        if(cljs.core.truth_(or__3548__auto____4446)) {
          return or__3548__auto____4446
        }else {
          throw cljs.core.missing_protocol.call(null, "IConnection.close", this$);
        }
      }
    }().call(null, this$)
  }
};
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(p__4458) {
    var vec__4459__4460 = p__4458;
    var k__4461 = cljs.core.nth.call(null, vec__4459__4460, 0, null);
    var v__4462 = cljs.core.nth.call(null, vec__4459__4460, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, k__4461.toLowerCase()), v__4462])
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))))
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit = function() {
  var G__4463 = null;
  var G__4463__4464 = function(this$, uri) {
    return clojure.browser.net.transmit.call(null, this$, uri, "GET", null, null, clojure.browser.net._STAR_timeout_STAR_)
  };
  var G__4463__4465 = function(this$, uri, method) {
    return clojure.browser.net.transmit.call(null, this$, uri, method, null, null, clojure.browser.net._STAR_timeout_STAR_)
  };
  var G__4463__4466 = function(this$, uri, method, content) {
    return clojure.browser.net.transmit.call(null, this$, uri, method, content, null, clojure.browser.net._STAR_timeout_STAR_)
  };
  var G__4463__4467 = function(this$, uri, method, content, headers) {
    return clojure.browser.net.transmit.call(null, this$, uri, method, content, headers, clojure.browser.net._STAR_timeout_STAR_)
  };
  var G__4463__4468 = function(this$, uri, method, content, headers, timeout) {
    this$.setTimeoutInterval(timeout);
    return this$.send(uri, method, content, headers)
  };
  G__4463 = function(this$, uri, method, content, headers, timeout) {
    switch(arguments.length) {
      case 2:
        return G__4463__4464.call(this, this$, uri);
      case 3:
        return G__4463__4465.call(this, this$, uri, method);
      case 4:
        return G__4463__4466.call(this, this$, uri, method, content);
      case 5:
        return G__4463__4467.call(this, this$, uri, method, content, headers);
      case 6:
        return G__4463__4468.call(this, this$, uri, method, content, headers, timeout)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4463
}();
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(p__4470) {
  var vec__4471__4472 = p__4470;
  var k__4473 = cljs.core.nth.call(null, vec__4471__4472, 0, null);
  var v__4474 = cljs.core.nth.call(null, vec__4471__4472, 1, null);
  return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, k__4473.toLowerCase()), v__4474])
}, cljs.core.js__GT_clj.call(null, goog.net.xpc.CfgFields)));
clojure.browser.net.xhr_connection = function xhr_connection() {
  return new goog.net.XhrIo
};
clojure.browser.net.ICrossPageChannel = {};
clojure.browser.net.register_service = function() {
  var register_service = null;
  var register_service__4481 = function(this$, service_name, fn) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4475 = this$;
      if(cljs.core.truth_(and__3546__auto____4475)) {
        return this$.clojure$browser$net$ICrossPageChannel$register_service
      }else {
        return and__3546__auto____4475
      }
    }())) {
      return this$.clojure$browser$net$ICrossPageChannel$register_service(this$, service_name, fn)
    }else {
      return function() {
        var or__3548__auto____4476 = clojure.browser.net.register_service[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4476)) {
          return or__3548__auto____4476
        }else {
          var or__3548__auto____4477 = clojure.browser.net.register_service["_"];
          if(cljs.core.truth_(or__3548__auto____4477)) {
            return or__3548__auto____4477
          }else {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", this$);
          }
        }
      }().call(null, this$, service_name, fn)
    }
  };
  var register_service__4482 = function(this$, service_name, fn, encode_json_QMARK_) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4478 = this$;
      if(cljs.core.truth_(and__3546__auto____4478)) {
        return this$.clojure$browser$net$ICrossPageChannel$register_service
      }else {
        return and__3546__auto____4478
      }
    }())) {
      return this$.clojure$browser$net$ICrossPageChannel$register_service(this$, service_name, fn, encode_json_QMARK_)
    }else {
      return function() {
        var or__3548__auto____4479 = clojure.browser.net.register_service[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____4479)) {
          return or__3548__auto____4479
        }else {
          var or__3548__auto____4480 = clojure.browser.net.register_service["_"];
          if(cljs.core.truth_(or__3548__auto____4480)) {
            return or__3548__auto____4480
          }else {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", this$);
          }
        }
      }().call(null, this$, service_name, fn, encode_json_QMARK_)
    }
  };
  register_service = function(this$, service_name, fn, encode_json_QMARK_) {
    switch(arguments.length) {
      case 3:
        return register_service__4481.call(this, this$, service_name, fn);
      case 4:
        return register_service__4482.call(this, this$, service_name, fn, encode_json_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return register_service
}();
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect = function() {
  var G__4484 = null;
  var G__4484__4485 = function(this$) {
    return clojure.browser.net.connect.call(null, this$, null)
  };
  var G__4484__4486 = function(this$, on_connect_fn) {
    return this$.connect(on_connect_fn)
  };
  var G__4484__4487 = function(this$, on_connect_fn, config_iframe_fn) {
    return clojure.browser.net.connect.call(null, this$, on_connect_fn, config_iframe_fn, document.body)
  };
  var G__4484__4488 = function(this$, on_connect_fn, config_iframe_fn, iframe_parent) {
    this$.createPeerIframe(iframe_parent, config_iframe_fn);
    return this$.connect(on_connect_fn)
  };
  G__4484 = function(this$, on_connect_fn, config_iframe_fn, iframe_parent) {
    switch(arguments.length) {
      case 1:
        return G__4484__4485.call(this, this$);
      case 2:
        return G__4484__4486.call(this, this$, on_connect_fn);
      case 3:
        return G__4484__4487.call(this, this$, on_connect_fn, config_iframe_fn);
      case 4:
        return G__4484__4488.call(this, this$, on_connect_fn, config_iframe_fn, iframe_parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4484
}();
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit = function(this$, service_name, payload) {
  return this$.send(cljs.core.name.call(null, service_name), payload)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close = function(this$) {
  return this$.close(cljs.core.List.EMPTY)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service = function() {
  var G__4490 = null;
  var G__4490__4491 = function(this$, service_name, fn) {
    return clojure.browser.net.register_service.call(null, this$, service_name, fn, false)
  };
  var G__4490__4492 = function(this$, service_name, fn, encode_json_QMARK_) {
    return this$.registerService(cljs.core.name.call(null, service_name), fn, encode_json_QMARK_)
  };
  G__4490 = function(this$, service_name, fn, encode_json_QMARK_) {
    switch(arguments.length) {
      case 3:
        return G__4490__4491.call(this, this$, service_name, fn);
      case 4:
        return G__4490__4492.call(this, this$, service_name, fn, encode_json_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4490
}();
clojure.browser.net.xpc_connection = function() {
  var xpc_connection = null;
  var xpc_connection__4503 = function() {
    var temp__3698__auto____4494 = (new goog.Uri(window.location.href)).getParameterValue("xpc");
    if(cljs.core.truth_(temp__3698__auto____4494)) {
      var config__4495 = temp__3698__auto____4494;
      return new goog.net.xpc.CrossPageChannel(goog.json.parse.call(null, config__4495))
    }else {
      return null
    }
  };
  var xpc_connection__4504 = function(config) {
    return new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null, function(sum, p__4496) {
      var vec__4497__4498 = p__4496;
      var k__4499 = cljs.core.nth.call(null, vec__4497__4498, 0, null);
      var v__4500 = cljs.core.nth.call(null, vec__4497__4498, 1, null);
      var temp__3695__auto____4501 = cljs.core.get.call(null, clojure.browser.net.xpc_config_fields, k__4499);
      if(cljs.core.truth_(temp__3695__auto____4501)) {
        var field__4502 = temp__3695__auto____4501;
        return cljs.core.assoc.call(null, sum, field__4502, v__4500)
      }else {
        return sum
      }
    }, cljs.core.ObjMap.fromObject([], {}), config).strobj)
  };
  xpc_connection = function(config) {
    switch(arguments.length) {
      case 0:
        return xpc_connection__4503.call(this);
      case 1:
        return xpc_connection__4504.call(this, config)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return xpc_connection
}();
goog.provide("clojure.browser.repl");
goog.require("cljs.core");
goog.require("clojure.browser.net");
goog.require("clojure.browser.event");
clojure.browser.repl.xpc_connection = cljs.core.atom.call(null, null);
clojure.browser.repl.repl_print = function repl_print(data) {
  var temp__3695__auto____4399 = cljs.core.deref.call(null, clojure.browser.repl.xpc_connection);
  if(cljs.core.truth_(temp__3695__auto____4399)) {
    var conn__4400 = temp__3695__auto____4399;
    return clojure.browser.net.transmit.call(null, conn__4400, "\ufdd0'print", cljs.core.pr_str.call(null, data))
  }else {
    return null
  }
};
clojure.browser.repl.evaluate_javascript = function evaluate_javascript(conn, block) {
  var result__4403 = function() {
    try {
      return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value"], {"\ufdd0'status":"\ufdd0'success", "\ufdd0'value":cljs.core.str.call(null, eval(block))})
    }catch(e4401) {
      if(cljs.core.truth_(cljs.core.instance_QMARK_.call(null, Error, e4401))) {
        var e__4402 = e4401;
        return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value", "\ufdd0'stacktrace"], {"\ufdd0'status":"\ufdd0'exception", "\ufdd0'value":cljs.core.pr_str.call(null, e__4402), "\ufdd0'stacktrace":cljs.core.truth_(e__4402.hasOwnProperty("stack")) ? e__4402.stack : "No stacktrace available."})
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          throw e4401;
        }else {
          return null
        }
      }
    }
  }();
  return cljs.core.pr_str.call(null, result__4403)
};
clojure.browser.repl.send_result = function send_result(connection, url, data) {
  return clojure.browser.net.transmit.call(null, connection, url, "POST", data, null, 0)
};
clojure.browser.repl.send_print = function() {
  var send_print = null;
  var send_print__4405 = function(url, data) {
    return send_print.call(null, url, data, 0)
  };
  var send_print__4406 = function(url, data, n) {
    var conn__4404 = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, conn__4404, "\ufdd0'error", function(_) {
      if(cljs.core.truth_(n < 10)) {
        return send_print.call(null, url, data, n + 1)
      }else {
        return console.log(cljs.core.str.call(null, "Could not send ", data, " after ", n, " attempts."))
      }
    });
    return clojure.browser.net.transmit.call(null, conn__4404, url, "POST", data, null, 0)
  };
  send_print = function(url, data, n) {
    switch(arguments.length) {
      case 2:
        return send_print__4405.call(this, url, data);
      case 3:
        return send_print__4406.call(this, url, data, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return send_print
}();
clojure.browser.repl.order = cljs.core.atom.call(null, 0);
clojure.browser.repl.wrap_message = function wrap_message(t, data) {
  return cljs.core.pr_str.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'content", "\ufdd0'order"], {"\ufdd0'type":t, "\ufdd0'content":data, "\ufdd0'order":cljs.core.swap_BANG_.call(null, clojure.browser.repl.order, cljs.core.inc)}))
};
clojure.browser.repl.start_evaluator = function start_evaluator(url) {
  var temp__3695__auto____4408 = clojure.browser.net.xpc_connection.call(null);
  if(cljs.core.truth_(temp__3695__auto____4408)) {
    var repl_connection__4409 = temp__3695__auto____4408;
    var connection__4410 = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, connection__4410, "\ufdd0'success", function(e) {
      return clojure.browser.net.transmit.call(null, repl_connection__4409, "\ufdd0'evaluate-javascript", e.currentTarget.getResponseText(cljs.core.List.EMPTY))
    });
    clojure.browser.net.register_service.call(null, repl_connection__4409, "\ufdd0'send-result", function(data) {
      return clojure.browser.repl.send_result.call(null, connection__4410, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'result", data))
    });
    clojure.browser.net.register_service.call(null, repl_connection__4409, "\ufdd0'print", function(data) {
      return clojure.browser.repl.send_print.call(null, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'print", data))
    });
    clojure.browser.net.connect.call(null, repl_connection__4409, cljs.core.constantly.call(null, null));
    return setTimeout.call(null, function() {
      return clojure.browser.repl.send_result.call(null, connection__4410, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'ready", "ready"))
    }, 50)
  }else {
    return alert.call(null, "No 'xpc' param provided to child iframe.")
  }
};
clojure.browser.repl.connect = function connect(repl_server_url) {
  var repl_connection__4411 = clojure.browser.net.xpc_connection.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'peer_uri"], {"\ufdd0'peer_uri":repl_server_url}));
  cljs.core.swap_BANG_.call(null, clojure.browser.repl.xpc_connection, cljs.core.constantly.call(null, repl_connection__4411));
  clojure.browser.net.register_service.call(null, repl_connection__4411, "\ufdd0'evaluate-javascript", function(js) {
    return clojure.browser.net.transmit.call(null, repl_connection__4411, "\ufdd0'send-result", clojure.browser.repl.evaluate_javascript.call(null, repl_connection__4411, js))
  });
  return clojure.browser.net.connect.call(null, repl_connection__4411, cljs.core.constantly.call(null, null), function(iframe) {
    return iframe.style.display = "none"
  })
};
goog.provide("foo");
goog.require("cljs.core");
goog.require("clojure.browser.repl");
clojure.browser.repl.connect.call(null, "http://localhost:9000/repl");
