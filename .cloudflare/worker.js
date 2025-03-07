var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key2 of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key2) && key2 !== except)
        __defProp(to2, key2, { get: () => from2[key2], enumerable: !(desc = __getOwnPropDesc(from2, key2)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback2 of callbacks) {
      callback2(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function set_current_component(component7) {
  current_component = component7;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component7 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component7.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component7, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name)) return;
    const value = attributes[name];
    if (value === true) str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value) str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name) continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component7, name) {
  if (!component7 || !component7.$$render) {
    if (name === "svelte:component") name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component7;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value) return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2] != null && style_object[key2] !== "").map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
var current_component, _boolean_attributes, boolean_attributes, ATTR_REGEX, CONTENT_REGEX, invalid_attribute_name_character, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/ssr2.js
function onMount() {
}
function afterUpdate() {
}
var init_ssr2 = __esm({
  ".svelte-kit/output/server/chunks/ssr2.js"() {
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback2, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback2();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback2();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  if (!allow_hash) {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index7 = 0;
      while (index7 < str.length) {
        var eqIdx = str.indexOf("=", index7);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index7);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index7 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index7, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index7 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides2 = part.split("=");
        var key2 = sides2.shift().trimLeft().toLowerCase();
        var value2 = sides2.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else if (key2 === "partitioned") {
          cookie.partitioned = true;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.js
var layout_exports = {};
__export(layout_exports, {
  prerender: () => prerender
});
var prerender;
var init_layout = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.js"() {
    prerender = false;
  }
});

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
function twJoin() {
  let index7 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index7 < arguments.length) {
    if (argument = arguments[index7++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var CLASS_PART_SEPARATOR, createClassGroupUtils, getGroupRecursive, arbitraryPropertyRegex, getGroupIdForArbitraryProperty, createClassMap, processClassesRecursively, getPart, isThemeGetter, getPrefixedClassGroupEntries, createLruCache, IMPORTANT_MODIFIER, createParseClassName, sortModifiers, createConfigUtils, SPLIT_CLASSES_REGEX, mergeClassList, toValue, fromTheme, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, isLength, isArbitraryLength, isNumber, isArbitraryNumber, isInteger, isPercent, isArbitraryValue, isTshirtSize, sizeLabels, isArbitrarySize, isArbitraryPosition, imageLabels, isArbitraryImage, isArbitraryShadow, isAny, getIsArbitraryValue, isLengthOnly, isNever, isShadow, isImage, getDefaultConfig, twMerge;
var init_bundle_mjs = __esm({
  "node_modules/tailwind-merge/dist/bundle-mjs.mjs"() {
    CLASS_PART_SEPARATOR = "-";
    createClassGroupUtils = (config) => {
      const classMap = createClassMap(config);
      const {
        conflictingClassGroups,
        conflictingClassGroupModifiers
      } = config;
      const getClassGroupId = (className) => {
        const classParts = className.split(CLASS_PART_SEPARATOR);
        if (classParts[0] === "" && classParts.length !== 1) {
          classParts.shift();
        }
        return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
      };
      const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
        const conflicts = conflictingClassGroups[classGroupId] || [];
        if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
          return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
        }
        return conflicts;
      };
      return {
        getClassGroupId,
        getConflictingClassGroupIds
      };
    };
    getGroupRecursive = (classParts, classPartObject) => {
      if (classParts.length === 0) {
        return classPartObject.classGroupId;
      }
      const currentClassPart = classParts[0];
      const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
      const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
      if (classGroupFromNextClassPart) {
        return classGroupFromNextClassPart;
      }
      if (classPartObject.validators.length === 0) {
        return void 0;
      }
      const classRest = classParts.join(CLASS_PART_SEPARATOR);
      return classPartObject.validators.find(({
        validator: validator2
      }) => validator2(classRest))?.classGroupId;
    };
    arbitraryPropertyRegex = /^\[(.+)\]$/;
    getGroupIdForArbitraryProperty = (className) => {
      if (arbitraryPropertyRegex.test(className)) {
        const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
        const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
        if (property) {
          return "arbitrary.." + property;
        }
      }
    };
    createClassMap = (config) => {
      const {
        theme,
        prefix
      } = config;
      const classMap = {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      };
      const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
      prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
        processClassesRecursively(classGroup, classMap, classGroupId, theme);
      });
      return classMap;
    };
    processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
      classGroup.forEach((classDefinition) => {
        if (typeof classDefinition === "string") {
          const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
          classPartObjectToEdit.classGroupId = classGroupId;
          return;
        }
        if (typeof classDefinition === "function") {
          if (isThemeGetter(classDefinition)) {
            processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
            return;
          }
          classPartObject.validators.push({
            validator: classDefinition,
            classGroupId
          });
          return;
        }
        Object.entries(classDefinition).forEach(([key2, classGroup2]) => {
          processClassesRecursively(classGroup2, getPart(classPartObject, key2), classGroupId, theme);
        });
      });
    };
    getPart = (classPartObject, path) => {
      let currentClassPartObject = classPartObject;
      path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
        if (!currentClassPartObject.nextPart.has(pathPart)) {
          currentClassPartObject.nextPart.set(pathPart, {
            nextPart: /* @__PURE__ */ new Map(),
            validators: []
          });
        }
        currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
      });
      return currentClassPartObject;
    };
    isThemeGetter = (func) => func.isThemeGetter;
    getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
      if (!prefix) {
        return classGroupEntries;
      }
      return classGroupEntries.map(([classGroupId, classGroup]) => {
        const prefixedClassGroup = classGroup.map((classDefinition) => {
          if (typeof classDefinition === "string") {
            return prefix + classDefinition;
          }
          if (typeof classDefinition === "object") {
            return Object.fromEntries(Object.entries(classDefinition).map(([key2, value]) => [prefix + key2, value]));
          }
          return classDefinition;
        });
        return [classGroupId, prefixedClassGroup];
      });
    };
    createLruCache = (maxCacheSize) => {
      if (maxCacheSize < 1) {
        return {
          get: () => void 0,
          set: () => {
          }
        };
      }
      let cacheSize = 0;
      let cache = /* @__PURE__ */ new Map();
      let previousCache = /* @__PURE__ */ new Map();
      const update = (key2, value) => {
        cache.set(key2, value);
        cacheSize++;
        if (cacheSize > maxCacheSize) {
          cacheSize = 0;
          previousCache = cache;
          cache = /* @__PURE__ */ new Map();
        }
      };
      return {
        get(key2) {
          let value = cache.get(key2);
          if (value !== void 0) {
            return value;
          }
          if ((value = previousCache.get(key2)) !== void 0) {
            update(key2, value);
            return value;
          }
        },
        set(key2, value) {
          if (cache.has(key2)) {
            cache.set(key2, value);
          } else {
            update(key2, value);
          }
        }
      };
    };
    IMPORTANT_MODIFIER = "!";
    createParseClassName = (config) => {
      const {
        separator,
        experimentalParseClassName
      } = config;
      const isSeparatorSingleCharacter = separator.length === 1;
      const firstSeparatorCharacter = separator[0];
      const separatorLength = separator.length;
      const parseClassName = (className) => {
        const modifiers = [];
        let bracketDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        for (let index7 = 0; index7 < className.length; index7++) {
          let currentCharacter = className[index7];
          if (bracketDepth === 0) {
            if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index7, index7 + separatorLength) === separator)) {
              modifiers.push(className.slice(modifierStart, index7));
              modifierStart = index7 + separatorLength;
              continue;
            }
            if (currentCharacter === "/") {
              postfixModifierPosition = index7;
              continue;
            }
          }
          if (currentCharacter === "[") {
            bracketDepth++;
          } else if (currentCharacter === "]") {
            bracketDepth--;
          }
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
        const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
        const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
        return {
          modifiers,
          hasImportantModifier,
          baseClassName,
          maybePostfixModifierPosition
        };
      };
      if (experimentalParseClassName) {
        return (className) => experimentalParseClassName({
          className,
          parseClassName
        });
      }
      return parseClassName;
    };
    sortModifiers = (modifiers) => {
      if (modifiers.length <= 1) {
        return modifiers;
      }
      const sortedModifiers = [];
      let unsortedModifiers = [];
      modifiers.forEach((modifier) => {
        const isArbitraryVariant = modifier[0] === "[";
        if (isArbitraryVariant) {
          sortedModifiers.push(...unsortedModifiers.sort(), modifier);
          unsortedModifiers = [];
        } else {
          unsortedModifiers.push(modifier);
        }
      });
      sortedModifiers.push(...unsortedModifiers.sort());
      return sortedModifiers;
    };
    createConfigUtils = (config) => ({
      cache: createLruCache(config.cacheSize),
      parseClassName: createParseClassName(config),
      ...createClassGroupUtils(config)
    });
    SPLIT_CLASSES_REGEX = /\s+/;
    mergeClassList = (classList, configUtils) => {
      const {
        parseClassName,
        getClassGroupId,
        getConflictingClassGroupIds
      } = configUtils;
      const classGroupsInConflict = [];
      const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
      let result = "";
      for (let index7 = classNames.length - 1; index7 >= 0; index7 -= 1) {
        const originalClassName = classNames[index7];
        const {
          modifiers,
          hasImportantModifier,
          baseClassName,
          maybePostfixModifierPosition
        } = parseClassName(originalClassName);
        let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
        let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        if (!classGroupId) {
          if (!hasPostfixModifier) {
            result = originalClassName + (result.length > 0 ? " " + result : result);
            continue;
          }
          classGroupId = getClassGroupId(baseClassName);
          if (!classGroupId) {
            result = originalClassName + (result.length > 0 ? " " + result : result);
            continue;
          }
          hasPostfixModifier = false;
        }
        const variantModifier = sortModifiers(modifiers).join(":");
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.includes(classId)) {
          continue;
        }
        classGroupsInConflict.push(classId);
        const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
        for (let i = 0; i < conflictGroups.length; ++i) {
          const group = conflictGroups[i];
          classGroupsInConflict.push(modifierId + group);
        }
        result = originalClassName + (result.length > 0 ? " " + result : result);
      }
      return result;
    };
    toValue = (mix) => {
      if (typeof mix === "string") {
        return mix;
      }
      let resolvedValue;
      let string = "";
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (resolvedValue = toValue(mix[k])) {
            string && (string += " ");
            string += resolvedValue;
          }
        }
      }
      return string;
    };
    fromTheme = (key2) => {
      const themeGetter = (theme) => theme[key2] || [];
      themeGetter.isThemeGetter = true;
      return themeGetter;
    };
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
    isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
    isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
    isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
    isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
    isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
    isArbitraryValue = (value) => arbitraryValueRegex.test(value);
    isTshirtSize = (value) => tshirtUnitRegex.test(value);
    sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
    isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
    imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
    isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
    isAny = () => true;
    getIsArbitraryValue = (value, label, testValue) => {
      const result = arbitraryValueRegex.exec(value);
      if (result) {
        if (result[1]) {
          return typeof label === "string" ? result[1] === label : label.has(result[1]);
        }
        return testValue(result[2]);
      }
      return false;
    };
    isLengthOnly = (value) => (
      // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
      // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
      // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
      lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
    );
    isNever = () => false;
    isShadow = (value) => shadowRegex.test(value);
    isImage = (value) => imageRegex.test(value);
    getDefaultConfig = () => {
      const colors2 = fromTheme("colors");
      const spacing = fromTheme("spacing");
      const blur = fromTheme("blur");
      const brightness = fromTheme("brightness");
      const borderColor = fromTheme("borderColor");
      const borderRadius = fromTheme("borderRadius");
      const borderSpacing = fromTheme("borderSpacing");
      const borderWidth = fromTheme("borderWidth");
      const contrast = fromTheme("contrast");
      const grayscale = fromTheme("grayscale");
      const hueRotate = fromTheme("hueRotate");
      const invert = fromTheme("invert");
      const gap = fromTheme("gap");
      const gradientColorStops = fromTheme("gradientColorStops");
      const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
      const inset = fromTheme("inset");
      const margin = fromTheme("margin");
      const opacity = fromTheme("opacity");
      const padding = fromTheme("padding");
      const saturate = fromTheme("saturate");
      const scale = fromTheme("scale");
      const sepia = fromTheme("sepia");
      const skew = fromTheme("skew");
      const space = fromTheme("space");
      const translate = fromTheme("translate");
      const getOverscroll = () => ["auto", "contain", "none"];
      const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
      const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
      const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
      const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
      const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
      const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
      const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
      const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
      const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
      const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
      const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
      const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [isAny],
          spacing: [isLength, isArbitraryLength],
          blur: ["none", "", isTshirtSize, isArbitraryValue],
          brightness: getNumberAndArbitrary(),
          borderColor: [colors2],
          borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
          borderSpacing: getSpacingWithArbitrary(),
          borderWidth: getLengthWithEmptyAndArbitrary(),
          contrast: getNumberAndArbitrary(),
          grayscale: getZeroAndEmpty(),
          hueRotate: getNumberAndArbitrary(),
          invert: getZeroAndEmpty(),
          gap: getSpacingWithArbitrary(),
          gradientColorStops: [colors2],
          gradientColorStopPositions: [isPercent, isArbitraryLength],
          inset: getSpacingWithAutoAndArbitrary(),
          margin: getSpacingWithAutoAndArbitrary(),
          opacity: getNumberAndArbitrary(),
          padding: getSpacingWithArbitrary(),
          saturate: getNumberAndArbitrary(),
          scale: getNumberAndArbitrary(),
          sepia: getZeroAndEmpty(),
          skew: getNumberAndArbitrary(),
          space: getSpacingWithArbitrary(),
          translate: getSpacingWithArbitrary()
        },
        classGroups: {
          // Layout
          /**
           * Aspect Ratio
           * @see https://tailwindcss.com/docs/aspect-ratio
           */
          aspect: [{
            aspect: ["auto", "square", "video", isArbitraryValue]
          }],
          /**
           * Container
           * @see https://tailwindcss.com/docs/container
           */
          container: ["container"],
          /**
           * Columns
           * @see https://tailwindcss.com/docs/columns
           */
          columns: [{
            columns: [isTshirtSize]
          }],
          /**
           * Break After
           * @see https://tailwindcss.com/docs/break-after
           */
          "break-after": [{
            "break-after": getBreaks()
          }],
          /**
           * Break Before
           * @see https://tailwindcss.com/docs/break-before
           */
          "break-before": [{
            "break-before": getBreaks()
          }],
          /**
           * Break Inside
           * @see https://tailwindcss.com/docs/break-inside
           */
          "break-inside": [{
            "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
          }],
          /**
           * Box Decoration Break
           * @see https://tailwindcss.com/docs/box-decoration-break
           */
          "box-decoration": [{
            "box-decoration": ["slice", "clone"]
          }],
          /**
           * Box Sizing
           * @see https://tailwindcss.com/docs/box-sizing
           */
          box: [{
            box: ["border", "content"]
          }],
          /**
           * Display
           * @see https://tailwindcss.com/docs/display
           */
          display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
          /**
           * Floats
           * @see https://tailwindcss.com/docs/float
           */
          float: [{
            float: ["right", "left", "none", "start", "end"]
          }],
          /**
           * Clear
           * @see https://tailwindcss.com/docs/clear
           */
          clear: [{
            clear: ["left", "right", "both", "none", "start", "end"]
          }],
          /**
           * Isolation
           * @see https://tailwindcss.com/docs/isolation
           */
          isolation: ["isolate", "isolation-auto"],
          /**
           * Object Fit
           * @see https://tailwindcss.com/docs/object-fit
           */
          "object-fit": [{
            object: ["contain", "cover", "fill", "none", "scale-down"]
          }],
          /**
           * Object Position
           * @see https://tailwindcss.com/docs/object-position
           */
          "object-position": [{
            object: [...getPositions(), isArbitraryValue]
          }],
          /**
           * Overflow
           * @see https://tailwindcss.com/docs/overflow
           */
          overflow: [{
            overflow: getOverflow()
          }],
          /**
           * Overflow X
           * @see https://tailwindcss.com/docs/overflow
           */
          "overflow-x": [{
            "overflow-x": getOverflow()
          }],
          /**
           * Overflow Y
           * @see https://tailwindcss.com/docs/overflow
           */
          "overflow-y": [{
            "overflow-y": getOverflow()
          }],
          /**
           * Overscroll Behavior
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          overscroll: [{
            overscroll: getOverscroll()
          }],
          /**
           * Overscroll Behavior X
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          "overscroll-x": [{
            "overscroll-x": getOverscroll()
          }],
          /**
           * Overscroll Behavior Y
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          "overscroll-y": [{
            "overscroll-y": getOverscroll()
          }],
          /**
           * Position
           * @see https://tailwindcss.com/docs/position
           */
          position: ["static", "fixed", "absolute", "relative", "sticky"],
          /**
           * Top / Right / Bottom / Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          inset: [{
            inset: [inset]
          }],
          /**
           * Right / Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          "inset-x": [{
            "inset-x": [inset]
          }],
          /**
           * Top / Bottom
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          "inset-y": [{
            "inset-y": [inset]
          }],
          /**
           * Start
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          start: [{
            start: [inset]
          }],
          /**
           * End
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          end: [{
            end: [inset]
          }],
          /**
           * Top
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          top: [{
            top: [inset]
          }],
          /**
           * Right
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          right: [{
            right: [inset]
          }],
          /**
           * Bottom
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          bottom: [{
            bottom: [inset]
          }],
          /**
           * Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          left: [{
            left: [inset]
          }],
          /**
           * Visibility
           * @see https://tailwindcss.com/docs/visibility
           */
          visibility: ["visible", "invisible", "collapse"],
          /**
           * Z-Index
           * @see https://tailwindcss.com/docs/z-index
           */
          z: [{
            z: ["auto", isInteger, isArbitraryValue]
          }],
          // Flexbox and Grid
          /**
           * Flex Basis
           * @see https://tailwindcss.com/docs/flex-basis
           */
          basis: [{
            basis: getSpacingWithAutoAndArbitrary()
          }],
          /**
           * Flex Direction
           * @see https://tailwindcss.com/docs/flex-direction
           */
          "flex-direction": [{
            flex: ["row", "row-reverse", "col", "col-reverse"]
          }],
          /**
           * Flex Wrap
           * @see https://tailwindcss.com/docs/flex-wrap
           */
          "flex-wrap": [{
            flex: ["wrap", "wrap-reverse", "nowrap"]
          }],
          /**
           * Flex
           * @see https://tailwindcss.com/docs/flex
           */
          flex: [{
            flex: ["1", "auto", "initial", "none", isArbitraryValue]
          }],
          /**
           * Flex Grow
           * @see https://tailwindcss.com/docs/flex-grow
           */
          grow: [{
            grow: getZeroAndEmpty()
          }],
          /**
           * Flex Shrink
           * @see https://tailwindcss.com/docs/flex-shrink
           */
          shrink: [{
            shrink: getZeroAndEmpty()
          }],
          /**
           * Order
           * @see https://tailwindcss.com/docs/order
           */
          order: [{
            order: ["first", "last", "none", isInteger, isArbitraryValue]
          }],
          /**
           * Grid Template Columns
           * @see https://tailwindcss.com/docs/grid-template-columns
           */
          "grid-cols": [{
            "grid-cols": [isAny]
          }],
          /**
           * Grid Column Start / End
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-start-end": [{
            col: ["auto", {
              span: ["full", isInteger, isArbitraryValue]
            }, isArbitraryValue]
          }],
          /**
           * Grid Column Start
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-start": [{
            "col-start": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Column End
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-end": [{
            "col-end": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Template Rows
           * @see https://tailwindcss.com/docs/grid-template-rows
           */
          "grid-rows": [{
            "grid-rows": [isAny]
          }],
          /**
           * Grid Row Start / End
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-start-end": [{
            row: ["auto", {
              span: [isInteger, isArbitraryValue]
            }, isArbitraryValue]
          }],
          /**
           * Grid Row Start
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-start": [{
            "row-start": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Row End
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-end": [{
            "row-end": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Auto Flow
           * @see https://tailwindcss.com/docs/grid-auto-flow
           */
          "grid-flow": [{
            "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
          }],
          /**
           * Grid Auto Columns
           * @see https://tailwindcss.com/docs/grid-auto-columns
           */
          "auto-cols": [{
            "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
          }],
          /**
           * Grid Auto Rows
           * @see https://tailwindcss.com/docs/grid-auto-rows
           */
          "auto-rows": [{
            "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
          }],
          /**
           * Gap
           * @see https://tailwindcss.com/docs/gap
           */
          gap: [{
            gap: [gap]
          }],
          /**
           * Gap X
           * @see https://tailwindcss.com/docs/gap
           */
          "gap-x": [{
            "gap-x": [gap]
          }],
          /**
           * Gap Y
           * @see https://tailwindcss.com/docs/gap
           */
          "gap-y": [{
            "gap-y": [gap]
          }],
          /**
           * Justify Content
           * @see https://tailwindcss.com/docs/justify-content
           */
          "justify-content": [{
            justify: ["normal", ...getAlign()]
          }],
          /**
           * Justify Items
           * @see https://tailwindcss.com/docs/justify-items
           */
          "justify-items": [{
            "justify-items": ["start", "end", "center", "stretch"]
          }],
          /**
           * Justify Self
           * @see https://tailwindcss.com/docs/justify-self
           */
          "justify-self": [{
            "justify-self": ["auto", "start", "end", "center", "stretch"]
          }],
          /**
           * Align Content
           * @see https://tailwindcss.com/docs/align-content
           */
          "align-content": [{
            content: ["normal", ...getAlign(), "baseline"]
          }],
          /**
           * Align Items
           * @see https://tailwindcss.com/docs/align-items
           */
          "align-items": [{
            items: ["start", "end", "center", "baseline", "stretch"]
          }],
          /**
           * Align Self
           * @see https://tailwindcss.com/docs/align-self
           */
          "align-self": [{
            self: ["auto", "start", "end", "center", "stretch", "baseline"]
          }],
          /**
           * Place Content
           * @see https://tailwindcss.com/docs/place-content
           */
          "place-content": [{
            "place-content": [...getAlign(), "baseline"]
          }],
          /**
           * Place Items
           * @see https://tailwindcss.com/docs/place-items
           */
          "place-items": [{
            "place-items": ["start", "end", "center", "baseline", "stretch"]
          }],
          /**
           * Place Self
           * @see https://tailwindcss.com/docs/place-self
           */
          "place-self": [{
            "place-self": ["auto", "start", "end", "center", "stretch"]
          }],
          // Spacing
          /**
           * Padding
           * @see https://tailwindcss.com/docs/padding
           */
          p: [{
            p: [padding]
          }],
          /**
           * Padding X
           * @see https://tailwindcss.com/docs/padding
           */
          px: [{
            px: [padding]
          }],
          /**
           * Padding Y
           * @see https://tailwindcss.com/docs/padding
           */
          py: [{
            py: [padding]
          }],
          /**
           * Padding Start
           * @see https://tailwindcss.com/docs/padding
           */
          ps: [{
            ps: [padding]
          }],
          /**
           * Padding End
           * @see https://tailwindcss.com/docs/padding
           */
          pe: [{
            pe: [padding]
          }],
          /**
           * Padding Top
           * @see https://tailwindcss.com/docs/padding
           */
          pt: [{
            pt: [padding]
          }],
          /**
           * Padding Right
           * @see https://tailwindcss.com/docs/padding
           */
          pr: [{
            pr: [padding]
          }],
          /**
           * Padding Bottom
           * @see https://tailwindcss.com/docs/padding
           */
          pb: [{
            pb: [padding]
          }],
          /**
           * Padding Left
           * @see https://tailwindcss.com/docs/padding
           */
          pl: [{
            pl: [padding]
          }],
          /**
           * Margin
           * @see https://tailwindcss.com/docs/margin
           */
          m: [{
            m: [margin]
          }],
          /**
           * Margin X
           * @see https://tailwindcss.com/docs/margin
           */
          mx: [{
            mx: [margin]
          }],
          /**
           * Margin Y
           * @see https://tailwindcss.com/docs/margin
           */
          my: [{
            my: [margin]
          }],
          /**
           * Margin Start
           * @see https://tailwindcss.com/docs/margin
           */
          ms: [{
            ms: [margin]
          }],
          /**
           * Margin End
           * @see https://tailwindcss.com/docs/margin
           */
          me: [{
            me: [margin]
          }],
          /**
           * Margin Top
           * @see https://tailwindcss.com/docs/margin
           */
          mt: [{
            mt: [margin]
          }],
          /**
           * Margin Right
           * @see https://tailwindcss.com/docs/margin
           */
          mr: [{
            mr: [margin]
          }],
          /**
           * Margin Bottom
           * @see https://tailwindcss.com/docs/margin
           */
          mb: [{
            mb: [margin]
          }],
          /**
           * Margin Left
           * @see https://tailwindcss.com/docs/margin
           */
          ml: [{
            ml: [margin]
          }],
          /**
           * Space Between X
           * @see https://tailwindcss.com/docs/space
           */
          "space-x": [{
            "space-x": [space]
          }],
          /**
           * Space Between X Reverse
           * @see https://tailwindcss.com/docs/space
           */
          "space-x-reverse": ["space-x-reverse"],
          /**
           * Space Between Y
           * @see https://tailwindcss.com/docs/space
           */
          "space-y": [{
            "space-y": [space]
          }],
          /**
           * Space Between Y Reverse
           * @see https://tailwindcss.com/docs/space
           */
          "space-y-reverse": ["space-y-reverse"],
          // Sizing
          /**
           * Width
           * @see https://tailwindcss.com/docs/width
           */
          w: [{
            w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
          }],
          /**
           * Min-Width
           * @see https://tailwindcss.com/docs/min-width
           */
          "min-w": [{
            "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
          }],
          /**
           * Max-Width
           * @see https://tailwindcss.com/docs/max-width
           */
          "max-w": [{
            "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
              screen: [isTshirtSize]
            }, isTshirtSize]
          }],
          /**
           * Height
           * @see https://tailwindcss.com/docs/height
           */
          h: [{
            h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Min-Height
           * @see https://tailwindcss.com/docs/min-height
           */
          "min-h": [{
            "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Max-Height
           * @see https://tailwindcss.com/docs/max-height
           */
          "max-h": [{
            "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Size
           * @see https://tailwindcss.com/docs/size
           */
          size: [{
            size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
          }],
          // Typography
          /**
           * Font Size
           * @see https://tailwindcss.com/docs/font-size
           */
          "font-size": [{
            text: ["base", isTshirtSize, isArbitraryLength]
          }],
          /**
           * Font Smoothing
           * @see https://tailwindcss.com/docs/font-smoothing
           */
          "font-smoothing": ["antialiased", "subpixel-antialiased"],
          /**
           * Font Style
           * @see https://tailwindcss.com/docs/font-style
           */
          "font-style": ["italic", "not-italic"],
          /**
           * Font Weight
           * @see https://tailwindcss.com/docs/font-weight
           */
          "font-weight": [{
            font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
          }],
          /**
           * Font Family
           * @see https://tailwindcss.com/docs/font-family
           */
          "font-family": [{
            font: [isAny]
          }],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-normal": ["normal-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-ordinal": ["ordinal"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-slashed-zero": ["slashed-zero"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-figure": ["lining-nums", "oldstyle-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-spacing": ["proportional-nums", "tabular-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
          /**
           * Letter Spacing
           * @see https://tailwindcss.com/docs/letter-spacing
           */
          tracking: [{
            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
          }],
          /**
           * Line Clamp
           * @see https://tailwindcss.com/docs/line-clamp
           */
          "line-clamp": [{
            "line-clamp": ["none", isNumber, isArbitraryNumber]
          }],
          /**
           * Line Height
           * @see https://tailwindcss.com/docs/line-height
           */
          leading: [{
            leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
          }],
          /**
           * List Style Image
           * @see https://tailwindcss.com/docs/list-style-image
           */
          "list-image": [{
            "list-image": ["none", isArbitraryValue]
          }],
          /**
           * List Style Type
           * @see https://tailwindcss.com/docs/list-style-type
           */
          "list-style-type": [{
            list: ["none", "disc", "decimal", isArbitraryValue]
          }],
          /**
           * List Style Position
           * @see https://tailwindcss.com/docs/list-style-position
           */
          "list-style-position": [{
            list: ["inside", "outside"]
          }],
          /**
           * Placeholder Color
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/placeholder-color
           */
          "placeholder-color": [{
            placeholder: [colors2]
          }],
          /**
           * Placeholder Opacity
           * @see https://tailwindcss.com/docs/placeholder-opacity
           */
          "placeholder-opacity": [{
            "placeholder-opacity": [opacity]
          }],
          /**
           * Text Alignment
           * @see https://tailwindcss.com/docs/text-align
           */
          "text-alignment": [{
            text: ["left", "center", "right", "justify", "start", "end"]
          }],
          /**
           * Text Color
           * @see https://tailwindcss.com/docs/text-color
           */
          "text-color": [{
            text: [colors2]
          }],
          /**
           * Text Opacity
           * @see https://tailwindcss.com/docs/text-opacity
           */
          "text-opacity": [{
            "text-opacity": [opacity]
          }],
          /**
           * Text Decoration
           * @see https://tailwindcss.com/docs/text-decoration
           */
          "text-decoration": ["underline", "overline", "line-through", "no-underline"],
          /**
           * Text Decoration Style
           * @see https://tailwindcss.com/docs/text-decoration-style
           */
          "text-decoration-style": [{
            decoration: [...getLineStyles(), "wavy"]
          }],
          /**
           * Text Decoration Thickness
           * @see https://tailwindcss.com/docs/text-decoration-thickness
           */
          "text-decoration-thickness": [{
            decoration: ["auto", "from-font", isLength, isArbitraryLength]
          }],
          /**
           * Text Underline Offset
           * @see https://tailwindcss.com/docs/text-underline-offset
           */
          "underline-offset": [{
            "underline-offset": ["auto", isLength, isArbitraryValue]
          }],
          /**
           * Text Decoration Color
           * @see https://tailwindcss.com/docs/text-decoration-color
           */
          "text-decoration-color": [{
            decoration: [colors2]
          }],
          /**
           * Text Transform
           * @see https://tailwindcss.com/docs/text-transform
           */
          "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
          /**
           * Text Overflow
           * @see https://tailwindcss.com/docs/text-overflow
           */
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          /**
           * Text Wrap
           * @see https://tailwindcss.com/docs/text-wrap
           */
          "text-wrap": [{
            text: ["wrap", "nowrap", "balance", "pretty"]
          }],
          /**
           * Text Indent
           * @see https://tailwindcss.com/docs/text-indent
           */
          indent: [{
            indent: getSpacingWithArbitrary()
          }],
          /**
           * Vertical Alignment
           * @see https://tailwindcss.com/docs/vertical-align
           */
          "vertical-align": [{
            align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
          }],
          /**
           * Whitespace
           * @see https://tailwindcss.com/docs/whitespace
           */
          whitespace: [{
            whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
          }],
          /**
           * Word Break
           * @see https://tailwindcss.com/docs/word-break
           */
          break: [{
            break: ["normal", "words", "all", "keep"]
          }],
          /**
           * Hyphens
           * @see https://tailwindcss.com/docs/hyphens
           */
          hyphens: [{
            hyphens: ["none", "manual", "auto"]
          }],
          /**
           * Content
           * @see https://tailwindcss.com/docs/content
           */
          content: [{
            content: ["none", isArbitraryValue]
          }],
          // Backgrounds
          /**
           * Background Attachment
           * @see https://tailwindcss.com/docs/background-attachment
           */
          "bg-attachment": [{
            bg: ["fixed", "local", "scroll"]
          }],
          /**
           * Background Clip
           * @see https://tailwindcss.com/docs/background-clip
           */
          "bg-clip": [{
            "bg-clip": ["border", "padding", "content", "text"]
          }],
          /**
           * Background Opacity
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/background-opacity
           */
          "bg-opacity": [{
            "bg-opacity": [opacity]
          }],
          /**
           * Background Origin
           * @see https://tailwindcss.com/docs/background-origin
           */
          "bg-origin": [{
            "bg-origin": ["border", "padding", "content"]
          }],
          /**
           * Background Position
           * @see https://tailwindcss.com/docs/background-position
           */
          "bg-position": [{
            bg: [...getPositions(), isArbitraryPosition]
          }],
          /**
           * Background Repeat
           * @see https://tailwindcss.com/docs/background-repeat
           */
          "bg-repeat": [{
            bg: ["no-repeat", {
              repeat: ["", "x", "y", "round", "space"]
            }]
          }],
          /**
           * Background Size
           * @see https://tailwindcss.com/docs/background-size
           */
          "bg-size": [{
            bg: ["auto", "cover", "contain", isArbitrarySize]
          }],
          /**
           * Background Image
           * @see https://tailwindcss.com/docs/background-image
           */
          "bg-image": [{
            bg: ["none", {
              "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, isArbitraryImage]
          }],
          /**
           * Background Color
           * @see https://tailwindcss.com/docs/background-color
           */
          "bg-color": [{
            bg: [colors2]
          }],
          /**
           * Gradient Color Stops From Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-from-pos": [{
            from: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops Via Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-via-pos": [{
            via: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops To Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-to-pos": [{
            to: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops From
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-from": [{
            from: [gradientColorStops]
          }],
          /**
           * Gradient Color Stops Via
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-via": [{
            via: [gradientColorStops]
          }],
          /**
           * Gradient Color Stops To
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-to": [{
            to: [gradientColorStops]
          }],
          // Borders
          /**
           * Border Radius
           * @see https://tailwindcss.com/docs/border-radius
           */
          rounded: [{
            rounded: [borderRadius]
          }],
          /**
           * Border Radius Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-s": [{
            "rounded-s": [borderRadius]
          }],
          /**
           * Border Radius End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-e": [{
            "rounded-e": [borderRadius]
          }],
          /**
           * Border Radius Top
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-t": [{
            "rounded-t": [borderRadius]
          }],
          /**
           * Border Radius Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-r": [{
            "rounded-r": [borderRadius]
          }],
          /**
           * Border Radius Bottom
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-b": [{
            "rounded-b": [borderRadius]
          }],
          /**
           * Border Radius Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-l": [{
            "rounded-l": [borderRadius]
          }],
          /**
           * Border Radius Start Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-ss": [{
            "rounded-ss": [borderRadius]
          }],
          /**
           * Border Radius Start End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-se": [{
            "rounded-se": [borderRadius]
          }],
          /**
           * Border Radius End End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-ee": [{
            "rounded-ee": [borderRadius]
          }],
          /**
           * Border Radius End Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-es": [{
            "rounded-es": [borderRadius]
          }],
          /**
           * Border Radius Top Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-tl": [{
            "rounded-tl": [borderRadius]
          }],
          /**
           * Border Radius Top Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-tr": [{
            "rounded-tr": [borderRadius]
          }],
          /**
           * Border Radius Bottom Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-br": [{
            "rounded-br": [borderRadius]
          }],
          /**
           * Border Radius Bottom Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-bl": [{
            "rounded-bl": [borderRadius]
          }],
          /**
           * Border Width
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w": [{
            border: [borderWidth]
          }],
          /**
           * Border Width X
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-x": [{
            "border-x": [borderWidth]
          }],
          /**
           * Border Width Y
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-y": [{
            "border-y": [borderWidth]
          }],
          /**
           * Border Width Start
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-s": [{
            "border-s": [borderWidth]
          }],
          /**
           * Border Width End
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-e": [{
            "border-e": [borderWidth]
          }],
          /**
           * Border Width Top
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-t": [{
            "border-t": [borderWidth]
          }],
          /**
           * Border Width Right
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-r": [{
            "border-r": [borderWidth]
          }],
          /**
           * Border Width Bottom
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-b": [{
            "border-b": [borderWidth]
          }],
          /**
           * Border Width Left
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-l": [{
            "border-l": [borderWidth]
          }],
          /**
           * Border Opacity
           * @see https://tailwindcss.com/docs/border-opacity
           */
          "border-opacity": [{
            "border-opacity": [opacity]
          }],
          /**
           * Border Style
           * @see https://tailwindcss.com/docs/border-style
           */
          "border-style": [{
            border: [...getLineStyles(), "hidden"]
          }],
          /**
           * Divide Width X
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-x": [{
            "divide-x": [borderWidth]
          }],
          /**
           * Divide Width X Reverse
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-x-reverse": ["divide-x-reverse"],
          /**
           * Divide Width Y
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-y": [{
            "divide-y": [borderWidth]
          }],
          /**
           * Divide Width Y Reverse
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-y-reverse": ["divide-y-reverse"],
          /**
           * Divide Opacity
           * @see https://tailwindcss.com/docs/divide-opacity
           */
          "divide-opacity": [{
            "divide-opacity": [opacity]
          }],
          /**
           * Divide Style
           * @see https://tailwindcss.com/docs/divide-style
           */
          "divide-style": [{
            divide: getLineStyles()
          }],
          /**
           * Border Color
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color": [{
            border: [borderColor]
          }],
          /**
           * Border Color X
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-x": [{
            "border-x": [borderColor]
          }],
          /**
           * Border Color Y
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-y": [{
            "border-y": [borderColor]
          }],
          /**
           * Border Color S
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-s": [{
            "border-s": [borderColor]
          }],
          /**
           * Border Color E
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-e": [{
            "border-e": [borderColor]
          }],
          /**
           * Border Color Top
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-t": [{
            "border-t": [borderColor]
          }],
          /**
           * Border Color Right
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-r": [{
            "border-r": [borderColor]
          }],
          /**
           * Border Color Bottom
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-b": [{
            "border-b": [borderColor]
          }],
          /**
           * Border Color Left
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-l": [{
            "border-l": [borderColor]
          }],
          /**
           * Divide Color
           * @see https://tailwindcss.com/docs/divide-color
           */
          "divide-color": [{
            divide: [borderColor]
          }],
          /**
           * Outline Style
           * @see https://tailwindcss.com/docs/outline-style
           */
          "outline-style": [{
            outline: ["", ...getLineStyles()]
          }],
          /**
           * Outline Offset
           * @see https://tailwindcss.com/docs/outline-offset
           */
          "outline-offset": [{
            "outline-offset": [isLength, isArbitraryValue]
          }],
          /**
           * Outline Width
           * @see https://tailwindcss.com/docs/outline-width
           */
          "outline-w": [{
            outline: [isLength, isArbitraryLength]
          }],
          /**
           * Outline Color
           * @see https://tailwindcss.com/docs/outline-color
           */
          "outline-color": [{
            outline: [colors2]
          }],
          /**
           * Ring Width
           * @see https://tailwindcss.com/docs/ring-width
           */
          "ring-w": [{
            ring: getLengthWithEmptyAndArbitrary()
          }],
          /**
           * Ring Width Inset
           * @see https://tailwindcss.com/docs/ring-width
           */
          "ring-w-inset": ["ring-inset"],
          /**
           * Ring Color
           * @see https://tailwindcss.com/docs/ring-color
           */
          "ring-color": [{
            ring: [colors2]
          }],
          /**
           * Ring Opacity
           * @see https://tailwindcss.com/docs/ring-opacity
           */
          "ring-opacity": [{
            "ring-opacity": [opacity]
          }],
          /**
           * Ring Offset Width
           * @see https://tailwindcss.com/docs/ring-offset-width
           */
          "ring-offset-w": [{
            "ring-offset": [isLength, isArbitraryLength]
          }],
          /**
           * Ring Offset Color
           * @see https://tailwindcss.com/docs/ring-offset-color
           */
          "ring-offset-color": [{
            "ring-offset": [colors2]
          }],
          // Effects
          /**
           * Box Shadow
           * @see https://tailwindcss.com/docs/box-shadow
           */
          shadow: [{
            shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
          }],
          /**
           * Box Shadow Color
           * @see https://tailwindcss.com/docs/box-shadow-color
           */
          "shadow-color": [{
            shadow: [isAny]
          }],
          /**
           * Opacity
           * @see https://tailwindcss.com/docs/opacity
           */
          opacity: [{
            opacity: [opacity]
          }],
          /**
           * Mix Blend Mode
           * @see https://tailwindcss.com/docs/mix-blend-mode
           */
          "mix-blend": [{
            "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
          }],
          /**
           * Background Blend Mode
           * @see https://tailwindcss.com/docs/background-blend-mode
           */
          "bg-blend": [{
            "bg-blend": getBlendModes()
          }],
          // Filters
          /**
           * Filter
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/filter
           */
          filter: [{
            filter: ["", "none"]
          }],
          /**
           * Blur
           * @see https://tailwindcss.com/docs/blur
           */
          blur: [{
            blur: [blur]
          }],
          /**
           * Brightness
           * @see https://tailwindcss.com/docs/brightness
           */
          brightness: [{
            brightness: [brightness]
          }],
          /**
           * Contrast
           * @see https://tailwindcss.com/docs/contrast
           */
          contrast: [{
            contrast: [contrast]
          }],
          /**
           * Drop Shadow
           * @see https://tailwindcss.com/docs/drop-shadow
           */
          "drop-shadow": [{
            "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
          }],
          /**
           * Grayscale
           * @see https://tailwindcss.com/docs/grayscale
           */
          grayscale: [{
            grayscale: [grayscale]
          }],
          /**
           * Hue Rotate
           * @see https://tailwindcss.com/docs/hue-rotate
           */
          "hue-rotate": [{
            "hue-rotate": [hueRotate]
          }],
          /**
           * Invert
           * @see https://tailwindcss.com/docs/invert
           */
          invert: [{
            invert: [invert]
          }],
          /**
           * Saturate
           * @see https://tailwindcss.com/docs/saturate
           */
          saturate: [{
            saturate: [saturate]
          }],
          /**
           * Sepia
           * @see https://tailwindcss.com/docs/sepia
           */
          sepia: [{
            sepia: [sepia]
          }],
          /**
           * Backdrop Filter
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/backdrop-filter
           */
          "backdrop-filter": [{
            "backdrop-filter": ["", "none"]
          }],
          /**
           * Backdrop Blur
           * @see https://tailwindcss.com/docs/backdrop-blur
           */
          "backdrop-blur": [{
            "backdrop-blur": [blur]
          }],
          /**
           * Backdrop Brightness
           * @see https://tailwindcss.com/docs/backdrop-brightness
           */
          "backdrop-brightness": [{
            "backdrop-brightness": [brightness]
          }],
          /**
           * Backdrop Contrast
           * @see https://tailwindcss.com/docs/backdrop-contrast
           */
          "backdrop-contrast": [{
            "backdrop-contrast": [contrast]
          }],
          /**
           * Backdrop Grayscale
           * @see https://tailwindcss.com/docs/backdrop-grayscale
           */
          "backdrop-grayscale": [{
            "backdrop-grayscale": [grayscale]
          }],
          /**
           * Backdrop Hue Rotate
           * @see https://tailwindcss.com/docs/backdrop-hue-rotate
           */
          "backdrop-hue-rotate": [{
            "backdrop-hue-rotate": [hueRotate]
          }],
          /**
           * Backdrop Invert
           * @see https://tailwindcss.com/docs/backdrop-invert
           */
          "backdrop-invert": [{
            "backdrop-invert": [invert]
          }],
          /**
           * Backdrop Opacity
           * @see https://tailwindcss.com/docs/backdrop-opacity
           */
          "backdrop-opacity": [{
            "backdrop-opacity": [opacity]
          }],
          /**
           * Backdrop Saturate
           * @see https://tailwindcss.com/docs/backdrop-saturate
           */
          "backdrop-saturate": [{
            "backdrop-saturate": [saturate]
          }],
          /**
           * Backdrop Sepia
           * @see https://tailwindcss.com/docs/backdrop-sepia
           */
          "backdrop-sepia": [{
            "backdrop-sepia": [sepia]
          }],
          // Tables
          /**
           * Border Collapse
           * @see https://tailwindcss.com/docs/border-collapse
           */
          "border-collapse": [{
            border: ["collapse", "separate"]
          }],
          /**
           * Border Spacing
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing": [{
            "border-spacing": [borderSpacing]
          }],
          /**
           * Border Spacing X
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing-x": [{
            "border-spacing-x": [borderSpacing]
          }],
          /**
           * Border Spacing Y
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing-y": [{
            "border-spacing-y": [borderSpacing]
          }],
          /**
           * Table Layout
           * @see https://tailwindcss.com/docs/table-layout
           */
          "table-layout": [{
            table: ["auto", "fixed"]
          }],
          /**
           * Caption Side
           * @see https://tailwindcss.com/docs/caption-side
           */
          caption: [{
            caption: ["top", "bottom"]
          }],
          // Transitions and Animation
          /**
           * Tranisition Property
           * @see https://tailwindcss.com/docs/transition-property
           */
          transition: [{
            transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
          }],
          /**
           * Transition Duration
           * @see https://tailwindcss.com/docs/transition-duration
           */
          duration: [{
            duration: getNumberAndArbitrary()
          }],
          /**
           * Transition Timing Function
           * @see https://tailwindcss.com/docs/transition-timing-function
           */
          ease: [{
            ease: ["linear", "in", "out", "in-out", isArbitraryValue]
          }],
          /**
           * Transition Delay
           * @see https://tailwindcss.com/docs/transition-delay
           */
          delay: [{
            delay: getNumberAndArbitrary()
          }],
          /**
           * Animation
           * @see https://tailwindcss.com/docs/animation
           */
          animate: [{
            animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
          }],
          // Transforms
          /**
           * Transform
           * @see https://tailwindcss.com/docs/transform
           */
          transform: [{
            transform: ["", "gpu", "none"]
          }],
          /**
           * Scale
           * @see https://tailwindcss.com/docs/scale
           */
          scale: [{
            scale: [scale]
          }],
          /**
           * Scale X
           * @see https://tailwindcss.com/docs/scale
           */
          "scale-x": [{
            "scale-x": [scale]
          }],
          /**
           * Scale Y
           * @see https://tailwindcss.com/docs/scale
           */
          "scale-y": [{
            "scale-y": [scale]
          }],
          /**
           * Rotate
           * @see https://tailwindcss.com/docs/rotate
           */
          rotate: [{
            rotate: [isInteger, isArbitraryValue]
          }],
          /**
           * Translate X
           * @see https://tailwindcss.com/docs/translate
           */
          "translate-x": [{
            "translate-x": [translate]
          }],
          /**
           * Translate Y
           * @see https://tailwindcss.com/docs/translate
           */
          "translate-y": [{
            "translate-y": [translate]
          }],
          /**
           * Skew X
           * @see https://tailwindcss.com/docs/skew
           */
          "skew-x": [{
            "skew-x": [skew]
          }],
          /**
           * Skew Y
           * @see https://tailwindcss.com/docs/skew
           */
          "skew-y": [{
            "skew-y": [skew]
          }],
          /**
           * Transform Origin
           * @see https://tailwindcss.com/docs/transform-origin
           */
          "transform-origin": [{
            origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
          }],
          // Interactivity
          /**
           * Accent Color
           * @see https://tailwindcss.com/docs/accent-color
           */
          accent: [{
            accent: ["auto", colors2]
          }],
          /**
           * Appearance
           * @see https://tailwindcss.com/docs/appearance
           */
          appearance: [{
            appearance: ["none", "auto"]
          }],
          /**
           * Cursor
           * @see https://tailwindcss.com/docs/cursor
           */
          cursor: [{
            cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
          }],
          /**
           * Caret Color
           * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
           */
          "caret-color": [{
            caret: [colors2]
          }],
          /**
           * Pointer Events
           * @see https://tailwindcss.com/docs/pointer-events
           */
          "pointer-events": [{
            "pointer-events": ["none", "auto"]
          }],
          /**
           * Resize
           * @see https://tailwindcss.com/docs/resize
           */
          resize: [{
            resize: ["none", "y", "x", ""]
          }],
          /**
           * Scroll Behavior
           * @see https://tailwindcss.com/docs/scroll-behavior
           */
          "scroll-behavior": [{
            scroll: ["auto", "smooth"]
          }],
          /**
           * Scroll Margin
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-m": [{
            "scroll-m": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin X
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mx": [{
            "scroll-mx": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Y
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-my": [{
            "scroll-my": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Start
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-ms": [{
            "scroll-ms": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin End
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-me": [{
            "scroll-me": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Top
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mt": [{
            "scroll-mt": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Right
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mr": [{
            "scroll-mr": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Bottom
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mb": [{
            "scroll-mb": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Left
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-ml": [{
            "scroll-ml": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-p": [{
            "scroll-p": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding X
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-px": [{
            "scroll-px": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Y
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-py": [{
            "scroll-py": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Start
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-ps": [{
            "scroll-ps": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding End
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pe": [{
            "scroll-pe": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Top
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pt": [{
            "scroll-pt": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Right
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pr": [{
            "scroll-pr": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Bottom
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pb": [{
            "scroll-pb": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Left
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pl": [{
            "scroll-pl": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Snap Align
           * @see https://tailwindcss.com/docs/scroll-snap-align
           */
          "snap-align": [{
            snap: ["start", "end", "center", "align-none"]
          }],
          /**
           * Scroll Snap Stop
           * @see https://tailwindcss.com/docs/scroll-snap-stop
           */
          "snap-stop": [{
            snap: ["normal", "always"]
          }],
          /**
           * Scroll Snap Type
           * @see https://tailwindcss.com/docs/scroll-snap-type
           */
          "snap-type": [{
            snap: ["none", "x", "y", "both"]
          }],
          /**
           * Scroll Snap Type Strictness
           * @see https://tailwindcss.com/docs/scroll-snap-type
           */
          "snap-strictness": [{
            snap: ["mandatory", "proximity"]
          }],
          /**
           * Touch Action
           * @see https://tailwindcss.com/docs/touch-action
           */
          touch: [{
            touch: ["auto", "none", "manipulation"]
          }],
          /**
           * Touch Action X
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-x": [{
            "touch-pan": ["x", "left", "right"]
          }],
          /**
           * Touch Action Y
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-y": [{
            "touch-pan": ["y", "up", "down"]
          }],
          /**
           * Touch Action Pinch Zoom
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-pz": ["touch-pinch-zoom"],
          /**
           * User Select
           * @see https://tailwindcss.com/docs/user-select
           */
          select: [{
            select: ["none", "text", "all", "auto"]
          }],
          /**
           * Will Change
           * @see https://tailwindcss.com/docs/will-change
           */
          "will-change": [{
            "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
          }],
          // SVG
          /**
           * Fill
           * @see https://tailwindcss.com/docs/fill
           */
          fill: [{
            fill: [colors2, "none"]
          }],
          /**
           * Stroke Width
           * @see https://tailwindcss.com/docs/stroke-width
           */
          "stroke-w": [{
            stroke: [isLength, isArbitraryLength, isArbitraryNumber]
          }],
          /**
           * Stroke
           * @see https://tailwindcss.com/docs/stroke
           */
          stroke: [{
            stroke: [colors2, "none"]
          }],
          // Accessibility
          /**
           * Screen Readers
           * @see https://tailwindcss.com/docs/screen-readers
           */
          sr: ["sr-only", "not-sr-only"],
          /**
           * Forced Color Adjust
           * @see https://tailwindcss.com/docs/forced-color-adjust
           */
          "forced-color-adjust": [{
            "forced-color-adjust": ["auto", "none"]
          }]
        },
        conflictingClassGroups: {
          overflow: ["overflow-x", "overflow-y"],
          overscroll: ["overscroll-x", "overscroll-y"],
          inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
          "inset-x": ["right", "left"],
          "inset-y": ["top", "bottom"],
          flex: ["basis", "grow", "shrink"],
          gap: ["gap-x", "gap-y"],
          p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
          px: ["pr", "pl"],
          py: ["pt", "pb"],
          m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
          mx: ["mr", "ml"],
          my: ["mt", "mb"],
          size: ["w", "h"],
          "font-size": ["leading"],
          "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
          "fvn-ordinal": ["fvn-normal"],
          "fvn-slashed-zero": ["fvn-normal"],
          "fvn-figure": ["fvn-normal"],
          "fvn-spacing": ["fvn-normal"],
          "fvn-fraction": ["fvn-normal"],
          "line-clamp": ["display", "overflow"],
          rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
          "rounded-s": ["rounded-ss", "rounded-es"],
          "rounded-e": ["rounded-se", "rounded-ee"],
          "rounded-t": ["rounded-tl", "rounded-tr"],
          "rounded-r": ["rounded-tr", "rounded-br"],
          "rounded-b": ["rounded-br", "rounded-bl"],
          "rounded-l": ["rounded-tl", "rounded-bl"],
          "border-spacing": ["border-spacing-x", "border-spacing-y"],
          "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
          "border-w-x": ["border-w-r", "border-w-l"],
          "border-w-y": ["border-w-t", "border-w-b"],
          "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
          "border-color-x": ["border-color-r", "border-color-l"],
          "border-color-y": ["border-color-t", "border-color-b"],
          "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
          "scroll-mx": ["scroll-mr", "scroll-ml"],
          "scroll-my": ["scroll-mt", "scroll-mb"],
          "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
          "scroll-px": ["scroll-pr", "scroll-pl"],
          "scroll-py": ["scroll-pt", "scroll-pb"],
          touch: ["touch-x", "touch-y", "touch-pz"],
          "touch-x": ["touch"],
          "touch-y": ["touch"],
          "touch-pz": ["touch"]
        },
        conflictingClassGroupModifiers: {
          "font-size": ["leading"]
        }
      };
    };
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
var min, max, round, floor, createCoords, oppositeSideMap, oppositeAlignmentMap;
var init_floating_ui_utils = __esm({
  "node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v) => ({
      x: v,
      y: v
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options2) {
  var _await$platform$isEle;
  if (options2 === void 0) {
    options2 = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options2, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
async function convertValueToCoords(state, options2) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options2, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var computePosition, flip, offset, shift;
var init_floating_ui_core = __esm({
  "node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    init_floating_ui_utils();
    init_floating_ui_utils();
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x,
        y
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i = 0; i < validMiddleware.length; i++) {
        const {
          name,
          fn
        } = validMiddleware[i];
        const {
          x: nextX,
          y: nextY,
          data,
          reset: reset2
        } = await fn({
          x,
          y,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platform2,
          elements: {
            reference,
            floating
          }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data
          }
        };
        if (reset2 && resetCount <= 50) {
          resetCount++;
          if (typeof reset2 === "object") {
            if (reset2.placement) {
              statefulPlacement = reset2.placement;
            }
            if (reset2.rects) {
              rects = reset2.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset2.rects;
            }
            ({
              x,
              y
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i = -1;
        }
      }
      return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    flip = function(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return {
        name: "flip",
        options: options2,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options2, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === "y";
                    }
                    return true;
                  }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    offset = function(options2) {
      if (options2 === void 0) {
        options2 = 0;
      }
      return {
        name: "offset",
        options: options2,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x,
            y,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options2);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };
    shift = function(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return {
        name: "shift",
        options: options2,
        async fn(state) {
          const {
            x,
            y,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x2,
                  y: y2
                } = _ref;
                return {
                  x: x2,
                  y: y2
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options2, state);
          const coords = {
            x,
            y
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis
              }
            }
          };
        }
      };
    };
  }
});

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css3 = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css3[value] ? css3[value] !== "none" : false) || (css3.containerType ? css3.containerType !== "normal" : false) || !webkit && (css3.backdropFilter ? css3.backdropFilter !== "none" : false) || !webkit && (css3.filter ? css3.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css3.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css3.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
var init_floating_ui_utils_dom = __esm({
  "node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
  }
});

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css3 = getComputedStyle(element);
  let width = parseFloat(css3.width) || 0;
  let height = parseFloat(css3.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css3 = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css3.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css3.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body2 = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body2.scrollWidth, body2.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body2.scrollHeight, body2.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body2).direction === "rtl") {
    x += max(html.clientWidth, body2.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip2, threshold) {
    if (skip2 === void 0) {
      skip2 = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip2) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options2 = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options2,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options2);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options2;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var noOffsets, getElementRects, platform, offset2, shift2, flip2, computePosition2;
var init_floating_ui_dom = __esm({
  "node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    init_floating_ui_core();
    init_floating_ui_utils();
    init_floating_ui_utils_dom();
    noOffsets = /* @__PURE__ */ createCoords(0);
    getElementRects = async function(data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    offset2 = offset;
    shift2 = shift;
    flip2 = flip;
    computePosition2 = (reference, floating, options2) => {
      const cache = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options2
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// .svelte-kit/output/server/chunks/names.js
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
var void_element_names;
var init_names = __esm({
  ".svelte-kit/output/server/chunks/names.js"() {
    void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
  }
});

// .svelte-kit/output/server/chunks/Frame.js
var bgColors, Frame;
var init_Frame = __esm({
  ".svelte-kit/output/server/chunks/Frame.js"() {
    init_ssr();
    init_names();
    init_bundle_mjs();
    bgColors = {
      gray: "bg-gray-50 dark:bg-gray-800",
      red: "bg-red-50 dark:bg-gray-800",
      yellow: "bg-yellow-50 dark:bg-gray-800 ",
      green: "bg-green-50 dark:bg-gray-800 ",
      indigo: "bg-indigo-50 dark:bg-gray-800 ",
      purple: "bg-purple-50 dark:bg-gray-800 ",
      pink: "bg-pink-50 dark:bg-gray-800 ",
      blue: "bg-blue-50 dark:bg-gray-800 ",
      light: "bg-gray-50 dark:bg-gray-700",
      dark: "bg-gray-50 dark:bg-gray-800",
      default: "bg-white dark:bg-gray-800",
      dropdown: "bg-white dark:bg-gray-700",
      navbar: "bg-white dark:bg-gray-900",
      navbarUl: "bg-gray-50 dark:bg-gray-800",
      form: "bg-gray-50 dark:bg-gray-700",
      primary: "bg-primary-50 dark:bg-gray-800 ",
      orange: "bg-orange-50 dark:bg-orange-800",
      none: ""
    };
    Frame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "tag",
        "color",
        "rounded",
        "border",
        "shadow",
        "node",
        "use",
        "options",
        "role",
        "transition",
        "params",
        "open"
      ]);
      const noop3 = () => {
      };
      setContext("background", true);
      let { tag = $$restProps.href ? "a" : "div" } = $$props;
      let { color: color2 = "default" } = $$props;
      let { rounded = false } = $$props;
      let { border = false } = $$props;
      let { shadow = false } = $$props;
      let { node = void 0 } = $$props;
      let { use = noop3 } = $$props;
      let { options: options2 = {} } = $$props;
      let { role = void 0 } = $$props;
      let { transition = void 0 } = $$props;
      let { params = {} } = $$props;
      let { open = true } = $$props;
      const dispatch = createEventDispatcher();
      const textColors = {
        gray: "text-gray-800 dark:text-gray-300",
        red: "text-red-800 dark:text-red-400",
        yellow: "text-yellow-800 dark:text-yellow-300",
        green: "text-green-800 dark:text-green-400",
        indigo: "text-indigo-800 dark:text-indigo-400",
        purple: "text-purple-800 dark:text-purple-400",
        pink: "text-pink-800 dark:text-pink-400",
        blue: "text-blue-800 dark:text-blue-400",
        light: "text-gray-700 dark:text-gray-300",
        dark: "text-gray-700 dark:text-gray-300",
        default: "text-gray-500 dark:text-gray-400",
        dropdown: "text-gray-700 dark:text-gray-200",
        navbar: "text-gray-700 dark:text-gray-200",
        navbarUl: "text-gray-700 dark:text-gray-400",
        form: "text-gray-900 dark:text-white",
        primary: "text-primary-800 dark:text-primary-400",
        orange: "text-orange-800 dark:text-orange-400",
        none: ""
      };
      const borderColors = {
        gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
        red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
        yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
        green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
        indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
        purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
        pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
        blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
        light: "border-gray-500 divide-gray-500",
        dark: "border-gray-500 divide-gray-500",
        default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
        dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
        navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
        primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
        orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
        none: ""
      };
      let divClass;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
      if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
      if ($$props.node === void 0 && $$bindings.node && node !== void 0) $$bindings.node(node);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
      if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
      if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
      {
        dispatch(open ? "open" : "close");
      }
      {
        dispatch("show", open);
      }
      color2 = color2 ?? "default";
      {
        setContext("color", color2);
      }
      divClass = twMerge(bgColors[color2], textColors[color2], rounded && "rounded-lg", border && "border", borderColors[color2], shadow && "shadow-md", $$props.class);
      return `${transition && open ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            { role: escape_attribute_value(role) },
            escape_object($$restProps),
            { class: escape_attribute_value(divClass) }
          ],
          {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}` : `${open ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            { role: escape_attribute_value(role) },
            escape_object($$restProps),
            { class: escape_attribute_value(divClass) }
          ],
          {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}` : ``}`} `;
    });
  }
});

// .svelte-kit/output/server/chunks/DropdownItem.js
var Popper, Dropdown, DropdownDivider, Wrapper, DropdownItem;
var init_DropdownItem = __esm({
  ".svelte-kit/output/server/chunks/DropdownItem.js"() {
    init_ssr();
    init_bundle_mjs();
    init_floating_ui_dom();
    init_Frame();
    init_chunks();
    init_names();
    Popper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let middleware;
      let $$restProps = compute_rest_props($$props, [
        "activeContent",
        "arrow",
        "offset",
        "placement",
        "trigger",
        "triggeredBy",
        "reference",
        "strategy",
        "open",
        "yOnly",
        "middlewares"
      ]);
      let { activeContent = false } = $$props;
      let { arrow: arrow2 = true } = $$props;
      let { offset: offset3 = 8 } = $$props;
      let { placement = "top" } = $$props;
      let { trigger = "hover" } = $$props;
      let { triggeredBy = void 0 } = $$props;
      let { reference = void 0 } = $$props;
      let { strategy = "absolute" } = $$props;
      let { open = false } = $$props;
      let { yOnly = false } = $$props;
      let { middlewares = [flip2(), shift2()] } = $$props;
      const dispatch = createEventDispatcher();
      let referenceEl;
      let floatingEl;
      let arrowEl;
      let contentEl;
      const px = (n) => n ? `${n}px` : "";
      let arrowSide;
      const oppositeSideMap2 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };
      function updatePosition() {
        computePosition2(referenceEl, floatingEl, { placement, strategy, middleware }).then(({ x, y, middlewareData, placement: placement2, strategy: strategy2 }) => {
          floatingEl.style.position = strategy2;
          floatingEl.style.left = yOnly ? "0" : px(x);
          floatingEl.style.top = px(y);
          if (middlewareData.arrow && arrowEl instanceof HTMLDivElement) {
            arrowEl.style.left = px(middlewareData.arrow.x);
            arrowEl.style.top = px(middlewareData.arrow.y);
            arrowSide = oppositeSideMap2[placement2.split("-")[0]];
            arrowEl.style[arrowSide] = px(-arrowEl.offsetWidth / 2 - ($$props.border ? 1 : 0));
          }
        });
      }
      function init2(node, _referenceEl) {
        floatingEl = node;
        let cleanup = autoUpdate(_referenceEl, floatingEl, updatePosition);
        return {
          update(_referenceEl2) {
            cleanup();
            cleanup = autoUpdate(_referenceEl2, floatingEl, updatePosition);
          },
          destroy() {
            cleanup();
          }
        };
      }
      let arrowClass;
      if ($$props.activeContent === void 0 && $$bindings.activeContent && activeContent !== void 0) $$bindings.activeContent(activeContent);
      if ($$props.arrow === void 0 && $$bindings.arrow && arrow2 !== void 0) $$bindings.arrow(arrow2);
      if ($$props.offset === void 0 && $$bindings.offset && offset3 !== void 0) $$bindings.offset(offset3);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0) $$bindings.placement(placement);
      if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0) $$bindings.trigger(trigger);
      if ($$props.triggeredBy === void 0 && $$bindings.triggeredBy && triggeredBy !== void 0) $$bindings.triggeredBy(triggeredBy);
      if ($$props.reference === void 0 && $$bindings.reference && reference !== void 0) $$bindings.reference(reference);
      if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
      if ($$props.yOnly === void 0 && $$bindings.yOnly && yOnly !== void 0) $$bindings.yOnly(yOnly);
      if ($$props.middlewares === void 0 && $$bindings.middlewares && middlewares !== void 0) $$bindings.middlewares(middlewares);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        {
          dispatch("show", open);
        }
        placement && (referenceEl = referenceEl);
        middleware = [
          ...middlewares,
          offset2(+offset3),
          arrowEl
        ];
        arrowClass = twJoin("absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit", $$props.border && arrowSide === "bottom" && "border-b border-e", $$props.border && arrowSide === "top" && "border-t border-s ", $$props.border && arrowSide === "right" && "border-t border-e ", $$props.border && arrowSide === "left" && "border-b border-s ");
        $$rendered = `${!referenceEl ? `<div${add_attribute("this", contentEl, 0)}></div>` : ``} ${referenceEl ? `${validate_component(Frame, "Frame").$$render(
          $$result,
          Object.assign({}, { use: init2 }, { options: referenceEl }, { role: "tooltip" }, { tabindex: activeContent ? -1 : void 0 }, $$restProps, { open }),
          {
            open: ($$value) => {
              open = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${slots.default ? slots.default({}) : ``} ${arrow2 ? `<div${add_attribute("class", arrowClass, 0)}></div>` : ``}`;
            }
          }
        )}` : ``} `;
      } while (!$$settled);
      return $$rendered;
    });
    Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let containerCls;
      let headerCls;
      let ulCls;
      let footerCls;
      let $$restProps = compute_rest_props($$props, [
        "activeUrl",
        "open",
        "containerClass",
        "classContainer",
        "headerClass",
        "classHeader",
        "footerClass",
        "classFooter",
        "activeClass",
        "classActive",
        "arrow",
        "trigger",
        "placement",
        "color",
        "shadow",
        "rounded"
      ]);
      let $$slots = compute_slots(slots);
      let { activeUrl = void 0 } = $$props;
      let { open = false } = $$props;
      let { containerClass = "divide-y z-50" } = $$props;
      let { classContainer = void 0 } = $$props;
      let { headerClass = "py-1 overflow-hidden rounded-t-lg" } = $$props;
      let { classHeader = void 0 } = $$props;
      let { footerClass = "py-1 overflow-hidden rounded-b-lg" } = $$props;
      let { classFooter = void 0 } = $$props;
      let { activeClass = "text-primary-700 dark:text-primary-700 hover:text-primary-900 dark:hover:text-primary-900" } = $$props;
      let { classActive = void 0 } = $$props;
      let { arrow: arrow2 = false } = $$props;
      let { trigger = "click" } = $$props;
      let { placement = "bottom" } = $$props;
      let { color: color2 = "dropdown" } = $$props;
      let { shadow = true } = $$props;
      let { rounded = true } = $$props;
      const activeUrlStore = writable("");
      let activeCls = twMerge(activeClass, classActive);
      setContext("DropdownType", { activeClass: activeCls });
      setContext("activeUrl", activeUrlStore);
      if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0) $$bindings.activeUrl(activeUrl);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
      if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0) $$bindings.containerClass(containerClass);
      if ($$props.classContainer === void 0 && $$bindings.classContainer && classContainer !== void 0) $$bindings.classContainer(classContainer);
      if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0) $$bindings.headerClass(headerClass);
      if ($$props.classHeader === void 0 && $$bindings.classHeader && classHeader !== void 0) $$bindings.classHeader(classHeader);
      if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0) $$bindings.footerClass(footerClass);
      if ($$props.classFooter === void 0 && $$bindings.classFooter && classFooter !== void 0) $$bindings.classFooter(classFooter);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
      if ($$props.classActive === void 0 && $$bindings.classActive && classActive !== void 0) $$bindings.classActive(classActive);
      if ($$props.arrow === void 0 && $$bindings.arrow && arrow2 !== void 0) $$bindings.arrow(arrow2);
      if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0) $$bindings.trigger(trigger);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0) $$bindings.placement(placement);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
      if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        {
          activeUrlStore.set(activeUrl ?? "");
        }
        containerCls = twMerge(containerClass, classContainer);
        headerCls = twMerge(headerClass, classHeader);
        ulCls = twMerge("py-1", $$props.class);
        footerCls = twMerge(footerClass, classFooter);
        $$rendered = `${validate_component(Popper, "Popper").$$render(
          $$result,
          Object.assign({}, { activeContent: true }, $$restProps, { trigger }, { arrow: arrow2 }, { placement }, { shadow }, { rounded }, { color: color2 }, { class: containerCls }, { open }),
          {
            open: ($$value) => {
              open = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${$$slots.header ? `<div${add_attribute("class", headerCls, 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} <ul${add_attribute("class", ulCls, 0)}>${slots.default ? slots.default({}) : ``}</ul> ${$$slots.footer ? `<div${add_attribute("class", footerCls, 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
            }
          }
        )} `;
      } while (!$$settled);
      return $$rendered;
    });
    DropdownDivider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["divClass"]);
      let { divClass = "my-1 h-px bg-gray-100 dark:bg-gray-600" } = $$props;
      if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
      return `<div${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge(divClass, $$props.class))
          }
        ],
        {}
      )}></div> `;
    });
    Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
      let { tag = "div" } = $$props;
      let { show } = $$props;
      let { use = () => {
      } } = $$props;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
      if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
      return `${show ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
    });
    DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let active;
      let liClass;
      let $$restProps = compute_rest_props($$props, ["defaultClass", "href", "activeClass"]);
      let { defaultClass = "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" } = $$props;
      let { href = void 0 } = $$props;
      let { activeClass = void 0 } = $$props;
      const context = getContext("DropdownType") ?? {};
      const activeUrlStore = getContext("activeUrl");
      let sidebarUrl = "";
      activeUrlStore.subscribe((value) => {
        sidebarUrl = value;
      });
      let wrap = true;
      function init2(node) {
        wrap = node.parentElement?.tagName === "UL";
      }
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0) $$bindings.defaultClass(defaultClass);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
      active = sidebarUrl ? href === sidebarUrl : false;
      liClass = twMerge(defaultClass, href ? "block" : "w-full text-left", active && (activeClass ?? context.activeClass), $$props.class);
      return `${validate_component(Wrapper, "Wrapper").$$render($$result, { tag: "li", show: wrap, use: init2 }, {}, {
        default: () => {
          return `${((tag) => {
            return tag ? `<${href ? "a" : "button"}${spread(
              [
                { href: escape_attribute_value(href) },
                {
                  type: escape_attribute_value(href ? void 0 : "button")
                },
                {
                  role: escape_attribute_value(href ? "link" : "button")
                },
                escape_object($$restProps),
                { class: escape_attribute_value(liClass) }
              ],
              {}
            )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
          })(href ? "a" : "button")}`;
        }
      })} `;
    });
  }
});

// .svelte-kit/output/server/chunks/ChevronDownOutline.js
var ChevronDownOutline;
var init_ChevronDownOutline = __esm({
  ".svelte-kit/output/server/chunks/ChevronDownOutline.js"() {
    init_ssr();
    init_bundle_mjs();
    ChevronDownOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
      const ctx = getContext("iconCtx") ?? {};
      const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
      };
      let { size: size2 = ctx.size || "md" } = $$props;
      let { role = ctx.role || "img" } = $$props;
      let { color: color2 = ctx.color || "currentColor" } = $$props;
      let { withEvents = ctx.withEvents || false } = $$props;
      let { title = {} } = $$props;
      let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
      let { desc = {} } = $$props;
      let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
      let hasDescription = false;
      let { ariaLabel = "chevron down outline" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
      if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
      if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
      {
        if (title.id || desc.id) {
          hasDescription = true;
        } else {
          hasDescription = false;
        }
      }
      return `${withEvents ? `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { fill: "none" },
          { color: escape_attribute_value(color2) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("shrink-0", sizes[size2 ?? "md"], $$props.class))
          },
          { role: escape_attribute_value(role) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          {
            "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
          },
          { viewBox: "0 0 24 24" }
        ],
        {}
      )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="m8 10 4 4 4-4"></path></svg>` : `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { fill: "none" },
          { color: escape_attribute_value(color2) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("shrink-0", sizes[size2 ?? "md"], $$props.class))
          },
          { role: escape_attribute_value(role) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          {
            "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
          },
          { viewBox: "0 0 24 24" }
        ],
        {}
      )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="m8 10 4 4 4-4"></path></svg>`} `;
    });
  }
});

// .svelte-kit/output/server/chunks/stores.js
function get(key2, parse3 = JSON.parse) {
  try {
    return parse3(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, is_legacy, getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_ssr();
    init_exports();
    init_ssr2();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
    if (is_legacy) {
      ({
        data: {},
        form: null,
        error: null,
        params: {},
        route: { id: null },
        state: {},
        status: -1,
        url: new URL("https://example.com")
      });
    }
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
var ToolbarButton, Footer, FooterLink, FooterLinkGroup, NavContainer, Navbar, NavBrand, Menu, btnClass, NavHamburger, NavLi, NavUl, Nav, Footer_1, css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_DropdownItem();
    init_Frame();
    init_bundle_mjs();
    init_chunks();
    init_names();
    init_ChevronDownOutline();
    init_stores();
    ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
      let { color: color2 = "default" } = $$props;
      let { name = void 0 } = $$props;
      let { ariaLabel = void 0 } = $$props;
      let { size: size2 = "md" } = $$props;
      let { href = void 0 } = $$props;
      const background = getContext("background");
      const colors2 = {
        dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
        gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
        red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
        yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
        green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
        indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
        purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
        pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
        blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
        primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
        default: "focus:ring-gray-400 hover:bg-gray-100"
      };
      const sizing = {
        xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
        sm: "m-0.5 rounded focus:ring-1 p-0.5",
        md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
        lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
      };
      let buttonClass;
      const svgSizes = {
        xs: "w-3 h-3",
        sm: "w-3.5 h-3.5",
        md: "w-5 h-5",
        lg: "w-5 h-5"
      };
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
      if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      buttonClass = twMerge(
        "focus:outline-none whitespace-normal",
        sizing[size2],
        colors2[color2],
        color2 === "default" && (background ? "dark:hover:bg-gray-600" : "dark:hover:bg-gray-700"),
        $$props.class
      );
      return `${href ? `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          {
            "aria-label": escape_attribute_value(ariaLabel ?? name)
          }
        ],
        {}
      )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size2] }) : ``}</a>` : `<button${spread(
        [
          { type: "button" },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          {
            "aria-label": escape_attribute_value(ariaLabel ?? name)
          }
        ],
        {}
      )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size2] }) : ``}</button>`} `;
    });
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["footerType"]);
      let { footerType = void 0 } = $$props;
      let footerClass = twMerge(footerType === "sitemap" && "bg-gray-800", footerType === "socialmedia" && "p-4 bg-white sm:p-6 dark:bg-gray-800", footerType === "logo" && "p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800", footerType === "default" && "p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800", $$props.class);
      if ($$props.footerType === void 0 && $$bindings.footerType && footerType !== void 0) $$bindings.footerType(footerType);
      return `<footer${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(footerClass)
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</footer> `;
    });
    FooterLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["liClass", "aClass", "href", "target"]);
      let { liClass = "me-4 last:me-0 md:me-6" } = $$props;
      let { aClass = "hover:underline" } = $$props;
      let { href = "" } = $$props;
      let { target = void 0 } = $$props;
      let liCls = twMerge(liClass, $$props.classLi);
      let aCls = twMerge(aClass, $$props.classA);
      if ($$props.liClass === void 0 && $$bindings.liClass && liClass !== void 0) $$bindings.liClass(liClass);
      if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0) $$bindings.aClass(aClass);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
      return `<li${add_attribute("class", liCls, 0)}><a${spread(
        [
          escape_object($$restProps),
          { href: escape_attribute_value(href) },
          { class: escape_attribute_value(aCls) },
          { target: escape_attribute_value(target) }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a></li> `;
    });
    FooterLinkGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["ulClass"]);
      let { ulClass = "text-gray-600 dark:text-gray-400" } = $$props;
      if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
      return `<ul${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge(ulClass, $$props.class))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</ul> `;
    });
    NavContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["fluid"]);
      let { fluid = false } = $$props;
      if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
      return `<div${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("mx-auto flex flex-wrap justify-between items-center ", fluid ? "w-full" : "container", $$props.class))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</div> `;
    });
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["fluid"]);
      let $hidden, $$unsubscribe_hidden;
      let { fluid = false } = $$props;
      let hidden = writable(true);
      $$unsubscribe_hidden = subscribe(hidden, (value) => $hidden = value);
      setContext("navHidden", hidden);
      let toggle = () => hidden.update((hidden2) => !hidden2);
      if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
      {
        {
          $$restProps.color = $$restProps.color ?? "navbar";
        }
      }
      $$unsubscribe_hidden();
      return `${validate_component(Frame, "Frame").$$render(
        $$result,
        Object.assign({}, { tag: "nav" }, $$restProps, {
          class: twMerge("px-2 sm:px-4 py-2.5 w-full", $$props.class)
        }),
        {},
        {
          default: () => {
            return `${validate_component(NavContainer, "NavContainer").$$render($$result, { fluid }, {}, {
              default: () => {
                return `${slots.default ? slots.default({ hidden: $hidden, toggle, NavContainer }) : ``}`;
              }
            })}`;
          }
        }
      )} `;
    });
    NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href"]);
      let { href = "" } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      return `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(twMerge("flex items-center", $$props.class))
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a> `;
    });
    Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
      let { size: size2 = "24" } = $$props;
      let { color: color2 = "currentColor" } = $$props;
      let { variation = "outline" } = $$props;
      let { ariaLabel = "bars 3" } = $$props;
      let viewBox;
      let svgpath;
      let svgoutline = `<path stroke="${color2}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
      let svgsolid = `<path fill="${color2}" clip-rule="evenodd" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path> `;
      if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0) $$bindings.variation(variation);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
      {
        switch (variation) {
          case "outline":
            svgpath = svgoutline;
            viewBox = "0 0 24 24";
            break;
          case "solid":
            svgpath = svgsolid;
            viewBox = "0 0 24 24";
            break;
          default:
            svgpath = svgoutline;
            viewBox = "0 0 24 24";
        }
      }
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { role: "button" },
          { tabindex: "0" },
          { width: escape_attribute_value(size2) },
          { height: escape_attribute_value(size2) },
          {
            class: escape_attribute_value($$props.class)
          },
          escape_object($$restProps),
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          { fill: "none" },
          { viewBox: escape_attribute_value(viewBox) },
          { "stroke-width": "2" }
        ],
        {}
      )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg> `;
    });
    btnClass = "ms-3 md:hidden";
    NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["menuClass", "onClick"]);
      let { menuClass = "h-6 w-6 shrink-0" } = $$props;
      let { onClick = void 0 } = $$props;
      getContext("navHidden") ?? writable(true);
      if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0) $$bindings.menuClass(menuClass);
      if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
      return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
        default: () => {
          return `${validate_component(Menu, "Menu").$$render(
            $$result,
            {
              class: twMerge(menuClass, $$props.classMenu)
            },
            {},
            {}
          )}`;
        }
      })} `;
    });
    NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let active;
      let liClass;
      let $$restProps = compute_rest_props($$props, ["href", "activeClass", "nonActiveClass"]);
      let { href = "" } = $$props;
      let { activeClass = void 0 } = $$props;
      let { nonActiveClass = void 0 } = $$props;
      const context = getContext("navbarContext") ?? {};
      const activeUrlStore = getContext("activeUrl");
      let navUrl = "";
      activeUrlStore.subscribe((value) => {
        navUrl = value;
      });
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
      if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
      active = navUrl ? href === navUrl : false;
      liClass = twMerge(
        "block py-2 pe-4 ps-3 md:p-0 rounded md:border-0",
        active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
        $$props.class
      );
      return `<li>${((tag) => {
        return tag ? `<${href ? "a" : "div"}${spread(
          [
            {
              role: escape_attribute_value(href ? void 0 : "link")
            },
            { href: escape_attribute_value(href) },
            escape_object($$restProps),
            { class: escape_attribute_value(liClass) }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "div")}</li> `;
    });
    NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "activeUrl",
        "divClass",
        "ulClass",
        "hidden",
        "slideParams",
        "activeClass",
        "nonActiveClass"
      ]);
      let $hiddenStore, $$unsubscribe_hiddenStore;
      let { activeUrl = "" } = $$props;
      let { divClass = "w-full md:block md:w-auto" } = $$props;
      let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium" } = $$props;
      let { hidden = void 0 } = $$props;
      let { slideParams = {
        delay: 250,
        duration: 500,
        easing: sineIn
      } } = $$props;
      let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
      let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
      const activeUrlStore = writable("");
      setContext("navbarContext", { activeClass, nonActiveClass });
      setContext("activeUrl", activeUrlStore);
      let hiddenStore = getContext("navHidden");
      $$unsubscribe_hiddenStore = subscribe(hiddenStore, (value) => $hiddenStore = value);
      let _hidden;
      let _divClass;
      let _ulClass;
      if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0) $$bindings.activeUrl(activeUrl);
      if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
      if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
      if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
      if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0) $$bindings.slideParams(slideParams);
      if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
      if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
      {
        {
          activeUrlStore.set(activeUrl);
        }
      }
      _hidden = hidden ?? $hiddenStore ?? true;
      _divClass = twMerge(divClass, $$props.class);
      _ulClass = twMerge(
        ulClass,
        // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
        $$props.classUl
      );
      $$unsubscribe_hiddenStore();
      return `${!_hidden ? `<div${spread(
        [
          escape_object($$restProps),
          { class: escape_attribute_value(_divClass) },
          { role: "button" },
          { tabindex: "0" }
        ],
        {}
      )}>${validate_component(Frame, "Frame").$$render(
        $$result,
        {
          tag: "ul",
          border: true,
          rounded: true,
          color: "navbarUl",
          class: _ulClass
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}</div>` : `<div${spread(
        [
          escape_object($$restProps),
          { class: escape_attribute_value(_divClass) },
          { hidden: _hidden || null }
        ],
        {}
      )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
    });
    Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let activeUrl;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      activeUrl = $page.url.pathname;
      $$unsubscribe_page();
      return `<div class="w-full bg-accent-3">${validate_component(Navbar, "Navbar").$$render(
        $$result,
        {
          color: "primary",
          class: "w-4/5 place-self-center mx-auto"
        },
        {},
        {
          default: () => {
            return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
              default: () => {
                return `<img src="https://i.imgur.com/TModnbu.png" class="me-3 h-6 sm:h-9" alt="GFRIEND Logo"> <span class="self-center whitespace-nowrap text-xl font-semibold text-black" data-svelte-h="svelte-y6a6iu">Buddyville</span>`;
              }
            })} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})} ${validate_component(NavUl, "NavUl").$$render(
              $$result,
              {
                activeUrl,
                activeClass: "font-bold text-accent-1",
                nonActiveClass: "text-accent-5 hover:text-white"
              },
              {},
              {
                default: () => {
                  return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/" }, {}, {
                    default: () => {
                      return `Home`;
                    }
                  })} ${validate_component(NavLi, "NavLi").$$render($$result, { class: "cursor-pointer" }, {}, {
                    default: () => {
                      return `Profiles${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
                        $$result,
                        {
                          class: "w-6 h-6 ms-2 text-accent-5 inline"
                        },
                        {},
                        {}
                      )}`;
                    }
                  })} ${validate_component(Dropdown, "Dropdown").$$render($$result, { class: "w-44 z-20" }, {}, {
                    default: () => {
                      return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/profile" }, {}, {
                        default: () => {
                          return `GFRIEND`;
                        }
                      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/newjeans" }, {}, {
                        default: () => {
                          return `NewJeans`;
                        }
                      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/lesserafim" }, {}, {
                        default: () => {
                          return `LE SSERAFIM`;
                        }
                      })} ${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/source-music" }, {}, {
                        default: () => {
                          return `Source Music`;
                        }
                      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/ador" }, {}, {
                        default: () => {
                          return `ADOR`;
                        }
                      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/hybe" }, {}, {
                        default: () => {
                          return `HYBE`;
                        }
                      })}`;
                    }
                  })} ${validate_component(NavLi, "NavLi").$$render($$result, { class: "cursor-pointer" }, {}, {
                    default: () => {
                      return `Achivements${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
                        $$result,
                        {
                          class: "w-6 h-6 ms-2 text-accent-5 inline"
                        },
                        {},
                        {}
                      )}`;
                    }
                  })} ${validate_component(Dropdown, "Dropdown").$$render($$result, { class: "w-44 z-20" }, {}, {
                    default: () => {
                      return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/wins" }, {}, {
                        default: () => {
                          return `Music Show Wins`;
                        }
                      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/accomplishments" }, {}, {
                        default: () => {
                          return `Accomplishments`;
                        }
                      })}`;
                    }
                  })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/timeline" }, {}, {
                    default: () => {
                      return `Timeline`;
                    }
                  })}`;
                }
              }
            )}`;
          }
        }
      )}</div>`;
    });
    Footer_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="w-full bg-accent-2">${validate_component(Footer, "Footer").$$render(
        $$result,
        {
          color: "primary",
          class: "w-4/5 place-self-center mx-auto my-3"
        },
        {},
        {
          default: () => {
            return `<div class="sm:flex sm:items-center sm:justify-between"><div class="overflow-hidden"><h2 class="self-center" data-svelte-h="svelte-kk4ps2">Made With:</h2> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render(
              $$result,
              {
                ulClass: "flex flex-wrap items-center mt-3 text-sm text-black sm:mt-0"
              },
              {},
              {
                default: () => {
                  return `${validate_component(FooterLink, "FooterLink").$$render(
                    $$result,
                    {
                      href: "https://tailwindcss.com/",
                      target: "_blank"
                    },
                    {},
                    {
                      default: () => {
                        return `Tailwind CSS`;
                      }
                    }
                  )} ${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "https://svelte.dev/" }, {}, {
                    default: () => {
                      return `Svelte`;
                    }
                  })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "https://flowbite-svelte.com/" }, {}, {
                    default: () => {
                      return `Flowbite Svelte`;
                    }
                  })}`;
                }
              }
            )}</div> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render(
              $$result,
              {
                ulClass: "flex flex-wrap items-center mt-3 text-sm text-black sm:mt-0"
              },
              {},
              {
                default: () => {
                  return `${validate_component(FooterLink, "FooterLink").$$render(
                    $$result,
                    {
                      href: "https://x.com/TerrifiedPigeon",
                      target: "_blank"
                    },
                    {},
                    {
                      default: () => {
                        return `Contact`;
                      }
                    }
                  )}`;
                }
              }
            )}</div>`;
          }
        }
      )}</div>`;
    });
    css = {
      code: ".app.svelte-1e7kqks{display:flex;flex-direction:column;min-height:100vh}main.svelte-1e7kqks{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:72rem;margin:0 auto;box-sizing:border-box}",
      map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n\\timport '../app.css';\\n\\timport Nav from '../lib/components/Nav.svelte';\\n\\timport Footer from '../lib/components/Footer.svelte';\\n<\/script>\\n\\n<div class=\\"app bg-background\\">\\n\\t<Nav />\\n\\t<main>\\n\\t\\t<slot />\\n\\t</main>\\n\\t<Footer />\\n\\n</div>\\n\\n<style>\\n\\t.app {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tmin-height: 100vh;\\n\\t}\\n\\n\\tmain {\\n\\t\\tflex: 1;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tpadding: 1rem;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 72rem;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n</style>\\n"],"names":[],"mappings":"AAgBC,mBAAK,CACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KACb,CAEA,mBAAK,CACJ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UACb"}`
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css);
      return `<div class="app bg-background svelte-1e7kqks">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="svelte-1e7kqks">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer_1, "Footer").$$render($$result, {}, {}, {})} </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets,
  universal: () => layout_exports,
  universal_id: () => universal_id
});
var index, component_cache, component, universal_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout();
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    universal_id = "src/routes/+layout.js";
    imports = ["_app/immutable/nodes/0.DnjP4fag.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js", "_app/immutable/chunks/B-j-nzhe.js", "_app/immutable/chunks/CTIfdKuQ.js", "_app/immutable/chunks/DUjiu_U4.js", "_app/immutable/chunks/J6ZmAdDH.js", "_app/immutable/chunks/Drs2_v4N.js", "_app/immutable/chunks/BUQRgvq-.js", "_app/immutable/chunks/ETQbwrEZ.js"];
    stylesheets = ["_app/immutable/assets/0.CiA9g6rf.css", "_app/immutable/assets/app.ZtUZiSHB.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.BuI_Usal.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js", "_app/immutable/chunks/BUQRgvq-.js", "_app/immutable/chunks/ETQbwrEZ.js", "_app/immutable/chunks/J6ZmAdDH.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<p data-svelte-h="svelte-1wr15oe">please click the timeline sub-page in the nav bar</p> <p data-svelte-h="svelte-wb78fm"><a class="underline text-lg text-primary-2" href="https://www.buddyville.xyz/timeline">or click here</a></p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports3 = ["_app/immutable/nodes/2.CX3bDu5r.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/Card.js
var Card;
var init_Card = __esm({
  ".svelte-kit/output/server/chunks/Card.js"() {
    init_ssr();
    init_bundle_mjs();
    init_Frame();
    Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "horizontal", "reverse", "img", "padding", "size", "imgClass"]);
      let { href = void 0 } = $$props;
      let { horizontal = false } = $$props;
      let { reverse = false } = $$props;
      let { img = void 0 } = $$props;
      let { padding = "lg" } = $$props;
      let { size: size2 = "sm" } = $$props;
      let { imgClass = "" } = $$props;
      const paddings = {
        none: "",
        xs: "p-2",
        sm: "p-4",
        md: "p-4 sm:p-5",
        lg: "p-4 sm:p-6",
        xl: "p-4 sm:p-8"
      };
      const sizes = {
        none: "",
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-xl",
        lg: "max-w-2xl",
        xl: "max-w-screen-xl"
      };
      let innerPadding;
      let cardClass;
      let imgCls;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0) $$bindings.horizontal(horizontal);
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0) $$bindings.reverse(reverse);
      if ($$props.img === void 0 && $$bindings.img && img !== void 0) $$bindings.img(img);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
      if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
      if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0) $$bindings.imgClass(imgClass);
      innerPadding = paddings[padding];
      cardClass = twMerge("flex w-full", sizes[size2], reverse ? "flex-col-reverse" : "flex-col", horizontal && (reverse ? "md:flex-row-reverse" : "md:flex-row"), href && "hover:bg-gray-100 dark:hover:bg-gray-700", !img && innerPadding, $$props.class);
      imgCls = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-e-lg" : "md:rounded-s-lg"), imgClass);
      return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: href ? "a" : "div" }, { rounded: true }, { shadow: true }, { border: true }, { href }, $$restProps, { class: cardClass }), {}, {
        default: () => {
          return `${img ? `<img${add_attribute("class", imgCls, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerPadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
        }
      })} `;
    });
  }
});

// .svelte-kit/output/server/chunks/timeline.js
var liClasses, divClasses, timeClasses, h3Cls, TimelineItem, olClasses, Timeline, hybe_timeline;
var init_timeline = __esm({
  ".svelte-kit/output/server/chunks/timeline.js"() {
    init_ssr();
    init_ChevronDownOutline();
    init_bundle_mjs();
    liClasses = "mb-10 ms-4";
    divClasses = "absolute w-3 h-3 bg-primary-2 rounded-full mt-1.5 -start-1.5 border border-white";
    timeClasses = "mb-1 text-xs font-normal leading-none text-gray-500 dark:text-gray-500";
    h3Cls = "text-md font-semibold text-gray-900 dark:text-white";
    TimelineItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { desc = false } = $$props;
      let { title = "" } = $$props;
      let { date = "" } = $$props;
      if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
      if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
      return `  <li${add_attribute("class", liClasses, 0)}><div${add_attribute("class", divClasses, 0)}></div> <time${add_attribute("class", timeClasses, 0)}>${escape(date)}</time> ${title ? `<div><h3${add_attribute("class", h3Cls, 0)}>${desc ? `<button class="justify-between flex">${escape(title)} <div class="justify-center ms-2 items-center w-6 h-6 bg-gray-200 rounded-full">${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render($$result, { class: "w-6 h-6 ms-0 text-black" }, {}, {})}</div></button>` : `${escape(title)}`}</h3></div>` : ``} <div>${slots.default ? slots.default({}) : ``}</div></li> `;
    });
    olClasses = "relative border-s border-black dark:border-gray-700";
    Timeline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `  <ol${add_attribute("class", twMerge(olClasses, $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</ol> `;
    });
    hybe_timeline = {
      labels: {
        labelCategoryNames: ["groups", "other", "companies", "type"]
      },
      events: [
        {
          title: "Source Music Casts Minji",
          date: "2017",
          labels: {
            groups: [],
            other: ["Team N"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "",
          notes: "",
          sources: ["https://m.entertain.naver.com/article/433/0000106807", "https://www.koreatimes.co.kr/www/art/2025/03/398_362674.html"]
        },
        {
          title: `GFriend's 2nd Album: "Time For Us" is Released`,
          date: "January 01, 2019",
          labels: {
            group: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: ["Music"]
          },
          text: "Time For Us is release with positive reactions.",
          notes: "",
          sources: ["https://kpopreviewed.com/2019/01/14/sunrise-gfriend/"]
        },
        {
          title: `GFriend's 7th EP: "Fever Season" is Released`,
          date: "July 01, 2019",
          labels: {
            group: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: ["Music"]
          },
          text: 'Fever Season is release with mixed reactions. Some fans stating the title track "Fever" felt generaic and lacklustre.',
          notes: "This was GFriend's last release outside of HYBE and may have been a budget release as Source Music likely joined HYBE for financial support.",
          sources: ["https://www.asianjunkie.com/2019/07/01/review-gfriends-fever-provides-a-summer-vibe-but-is-disappointingly-generic/", "https://www.allkpop.com/article/2021/03/hybe-releases-the-2020-financial-report-for-sublabels-pledis-entertainment-and-source-music"]
        },
        {
          title: "Min Hee-Jin Joins BigHit (HYBE)",
          date: "July 01, 2019",
          labels: {
            groups: [],
            other: ["Team N", "Min Hee-Jin"],
            companies: ["Source Music"],
            type: []
          },
          text: 'Min Hee-Jin joined BigHit (HYBE) as its Chief Brand Officer (CBO), with one of her responsibilities being to "lead the launch of a new girl group"',
          notes: `It can be concluded that Min Hee-Jin was set to work with Souce Music's "Team N" as there were no other female trainee teams, under hybe, until 2021.`,
          sources: ["https://m.entertain.naver.com/now/article/081/0003010589"]
        },
        {
          title: `GFriend's 2nd Japanese Album: "Fallin' Light" is Released`,
          date: "November 13, 2019",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: ["Music"]
          },
          text: "Fallin' Light is release with positive reactions. This is GFriend's first release uder HYBE and the debut of their mature concept.",
          notes: "",
          sources: ["https://kpopreviewed.com/2019/11/16/fallin-light-gfriend/"]
        },
        {
          title: "Source Music Casts Hanni",
          date: "November 2019",
          labels: {
            groups: [],
            other: ["Team N"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: `Hanni is cast as a Source Music trainee in November 2019 through Source Music and Bit Hit's "Plus Global Audition".`,
          notes: "",
          sources: ["https://m.entertain.naver.com/article/433/0000106807"]
        },
        {
          title: `GFriend's 8th EP: "\u56DE:Labyrinth" is Released`,
          date: "Febuary 3, 2020",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: ["Music"]
          },
          text: "\u56DE:Labyrinth is release with positive reactions. This is GFriend's first Korean release uder HYBE and introduces the mature concept to their Korean fanbase.",
          notes: "",
          sources: ["https://thebiaslist.com/2020/02/04/buried-treasure-gfriend-labyrinth/"]
        },
        {
          title: "Haerin Joins Source Music",
          date: "February 2020",
          labels: {
            groups: [],
            other: ["Team N"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Haerin first discovered in November 2019, at the time she was a trainee under another company. However in December of that year her mother reached out to Source Music and she signed with Source Music in February of 2020.",
          notes: "",
          sources: ["https://m.entertain.naver.com/article/433/0000106807"]
        },
        {
          title: `GFriend's 9th EP: "\u56DE:Song of the Sirens" is Released`,
          date: "Febuary 3, 2020",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: ["Music"]
          },
          text: "\u56DE:Song of the Sirens is release with positive reactions.",
          notes: "",
          sources: ["https://kpopreviewed.com/2020/07/14/apple-gfriend/"]
        },
        {
          title: "Danielle Joins Source Music",
          date: "July 2020",
          labels: {
            groups: [],
            other: ["Team N"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Danielle signed in July 2020 and was a former YG trainee.",
          notes: "",
          sources: ["https://m.entertain.naver.com/article/433/0000106807"]
        },
        {
          title: "Hyein Joins Source Music",
          date: "January 2021",
          labels: {
            groups: [],
            other: ["Team N"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Hyein signed in January 2021 after the CEO of Source Music took it upon himself to persuade her parents.",
          notes: "",
          sources: ["https://m.entertain.naver.com/article/433/0000106807"]
        },
        {
          title: "Source Music Casts Eunchae",
          date: "January 9, 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Eunchae leaves her dance school to join Source Music as a trainee.",
          notes: "",
          sources: ["https://magazine.weverse.io/article/view/401?lang=en&ref=main&artist=LESSERAFIM"]
        },
        {
          title: `GFriend's 3rd Album: "\u56DE:Walpurgis Night" is Released`,
          date: "November 9, 2020",
          labels: {
            group: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: ["Music"]
          },
          text: "\u56DE:Song of the Sirens is release with positive reactions.",
          notes: "",
          sources: ["https://kpopreviewed.com/2020/12/30/album-walpurgis-night-gfriend/"]
        },
        {
          title: 'Source Music Submits Trademarks for "GFriend"',
          date: "March 11, 2021",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: []
          },
          text: 'Source Music Submits Trademarks for "GFriend", all of which have been rejected due to the group no longer being under Source Music.',
          notes: "",
          sources: ["https://www.koreaboo.com/news/source-music-copyright-fail-file-gfriend/"]
        },
        {
          title: "It's Reported That Sakura Will Be Going To BigHit",
          date: "March 11, 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: []
          },
          text: "It's reported that Sakura will be going to Bit Hit after Iz*One disbands.",
          notes: "",
          sources: ["https://m.entertain.naver.com/now/article/015/0004511578"]
        },
        {
          title: "N Teams's Debut Evaluation",
          date: "March 27, 2021",
          labels: {
            groups: [],
            other: ["Team N"],
            companies: ["Source Music"],
            type: []
          },
          text: 'N Teams Debut Evaluation was conducted with the song "Attention". In the debut evaluation Minji, Hanni, Haerin, Danielle, and Hyein can be seen along side 2 other trainees.',
          notes: "",
          sources: ["https://m.entertain.naver.com/ranking/article/433/0000106807"]
        },
        {
          title: "GFriend Learn Their Contract is Ending",
          date: "April 2021",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: []
          },
          text: "Roughly a month prior to GFriend's disbandment under Source Music, GFriend were notified their contract would be ending. GFriend can be seen crying on VLIVE from April until their contract ended.",
          notes: "",
          sources: ["https://www.soompi.com/article/1515881wpp/sinb-reveals-she-didnt-know-mago-would-be-gfriends-final-round-of-promotions-says-shes-confident-they-will-reunite"]
        },
        {
          title: "Source Music Casts Garam",
          date: "May 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Garam joins Source Music as a trainee.",
          notes: "",
          sources: ["https://magazine.weverse.io/article/view/401?lang=en&ref=main&artist=LESSERAFIM"]
        },
        {
          title: "Source Music Announces GFriend's Contract is Ending",
          date: "May 17, 2021",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: []
          },
          text: "Source Music announced that GFriend's contract would be ending on the May 22nd despite debuting in January of 2015. Suprising everyone including most of their own staff. Additionally GFriend's upcoming schedule was deleted.",
          notes: "The members have said they were fired, with SinB saying they they didn't know MAGO would be their last comeback. In a HYBE investment report it had GFriend down for a 10th mini album in June and contract renewal in Q4 of 2021.",
          sources: ["https://weverse.io/gfriend/notice/1282", "http://www.heraldpop.com/view.php?ud=202105181644230496316_1", "https://securities.miraeasset.com/bbs/download/2084380.pdf?attachmentId=2084380"]
        },
        {
          title: "GFriend's Contract Ends",
          date: "May 22, 2021",
          labels: {
            groups: ["GFriend"],
            other: [],
            companies: ["Source Music"],
            type: []
          },
          text: "GFriend's contract under Source Music end and all members leave.",
          notes: "",
          sources: []
        },
        {
          title: "Source Music's New Team Launch Meeting",
          date: "June 18, 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: []
          },
          text: 'Source Music creates a new trainee team "Team S", with the plan to debut at the latest of Q1 2022 because of the "popularity of the S-Team members". This would imply Sakura and Chaewon had already begun contract talks. Additionally at this time "Team N" is still first in the debut priority however if that gets post-poned then "Team S" is to take priority.',
          notes: 'Min Hee-Jin has refered to "Team S" as "Team Sakura" several times implying that "Team S" was built around Sakura.',
          sources: ["https://m.entertain.naver.com/article/433/0000106807"]
        },
        {
          title: "Source Music Recruits Sakura and Chaewon",
          date: "August 17, 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Source Music reportedly signs Chaewon and is negotiating with Sakura's Japanese management regarding her joining the agency.",
          notes: "",
          sources: ["https://www.nme.com/news/music/hybe-girl-group-reportedly-recruit-izone-kim-chae-won-miyawaki-sakura-3021027"]
        },
        {
          title: "Yunjin transfers to Source Music",
          date: "August 25, 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Yunjin reportedly transfers from PLEDIS to Source Music.",
          notes: "",
          sources: ["https://www.nme.com/news/music/heo-yun-jin-produce-48-source-music-hybe-upcoming-girl-group-3028474"]
        },
        {
          title: "Source Music Signs Sakura",
          date: "September 23, 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Source Music reportedly signs Sakura.",
          notes: "Sakura's final performance with HKT48 was on June 27. However it was not announced that her contract had ended until November 2021.",
          sources: ["https://www.hkt48.jp/news/2021/06/7460", "https://www.allkpop.com/article/2021/09/miyawaki-sakura-has-reportedly-finalized-her-exclusive-contract-with-source-music-x-hybe-labels", "https://www.oricon.co.jp/news/2212359/full/"]
        },
        {
          title: `HYBE's New Label "ADOR"`,
          date: "November 12, 2021",
          labels: {
            groups: [],
            other: ["Team N", "Min Hee-Jin"],
            companies: ["Source Music", "ADOR"],
            type: []
          },
          text: `HYBE's New Label "ADOR" is established with Min Hee-Jin apointed as the CEO. ADOR was set to introduce a new girl group in 2022 with the members selected from Source Music and Bit Hit's "Plus Global Audition" back in 2019.`,
          notes: "",
          sources: ["https://sports.khan.co.kr/article/202111120921003", "https://m.entertain.naver.com/now/article/081/0003010589"]
        },
        {
          title: "Source Music Recruits Kazuha",
          date: "November 2021",
          labels: {
            groups: [],
            other: ["Team S"],
            companies: ["Source Music"],
            type: ["Trainee"]
          },
          text: "Kazuha is said to have trained for approximately 6 months prior to Le Sserafim's debut, placing her recuitment in November 2021.",
          notes: "",
          sources: ["https://www.envimedia.co/7-things-to-know-about-le-sserafims-kazuha/"]
        }
      ]
    };
  }
});

// .svelte-kit/output/server/entries/pages/timeline/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Button, Label, colorClasses, labelClass, inputClass, Checkbox, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/timeline/_page.svelte.js"() {
    init_ssr();
    init_names();
    init_bundle_mjs();
    init_Card();
    init_DropdownItem();
    init_timeline();
    init_ChevronDownOutline();
    Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "pill",
        "outline",
        "size",
        "href",
        "type",
        "color",
        "shadow",
        "tag",
        "checked",
        "disabled"
      ]);
      const group = getContext("group");
      let { pill = false } = $$props;
      let { outline = false } = $$props;
      let { size: size2 = group ? "sm" : "md" } = $$props;
      let { href = void 0 } = $$props;
      let { type = "button" } = $$props;
      let { color: color2 = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
      let { shadow = false } = $$props;
      let { tag = "button" } = $$props;
      let { checked = void 0 } = $$props;
      let { disabled = false } = $$props;
      const colorClasses2 = {
        alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700",
        blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
        green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
        light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
        primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
        purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
        red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
        yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
        none: ""
      };
      const colorCheckedClasses = {
        alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
        blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
        dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
        green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
        light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
        primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
        purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
        red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
        yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
        none: ""
      };
      const coloredFocusClasses = {
        alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
        dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
        green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
        light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
        purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
        red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
        yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
        none: ""
      };
      const coloredShadowClasses = {
        alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
        blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
        dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
        green: "shadow-green-500/50 dark:shadow-green-800/80",
        light: "shadow-gray-500/50 dark:shadow-gray-800/80",
        primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
        purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
        red: "shadow-red-500/50 dark:shadow-red-800/80 ",
        yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
        none: ""
      };
      const outlineClasses = {
        alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
        blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
        dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
        green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
        light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
        primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
        purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
        red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
        yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
        none: ""
      };
      const sizeClasses = {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base"
      };
      const hasBorder = () => outline || color2 === "alternative" || color2 === "light";
      let buttonClass;
      if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0) $$bindings.pill(pill);
      if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0) $$bindings.outline(outline);
      if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
      buttonClass = twMerge(
        "text-center font-medium",
        group ? "focus-within:ring-2" : "focus-within:ring-4",
        group && "focus-within:z-10",
        group || "focus-within:outline-none",
        "inline-flex items-center justify-center " + sizeClasses[size2],
        outline && checked && "border dark:border-gray-900",
        outline && checked && colorCheckedClasses[color2],
        outline && !checked && outlineClasses[color2],
        !outline && checked && colorCheckedClasses[color2],
        !outline && !checked && colorClasses2[color2],
        color2 === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-600"),
        outline && color2 === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
        coloredFocusClasses[color2],
        hasBorder() && group && "[&:not(:first-child)]:-ms-px",
        group ? pill && "first:rounded-s-full last:rounded-e-full" || "first:rounded-s-lg last:rounded-e-lg" : pill && "rounded-full" || "rounded-lg",
        shadow && "shadow-lg",
        shadow && coloredShadowClasses[color2],
        disabled && "cursor-not-allowed opacity-50",
        $$props.class
      );
      return `${href && !disabled ? `<a${spread(
        [
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            class: escape_attribute_value(buttonClass)
          },
          { role: "button" }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</a>` : `${tag === "button" ? `<button${spread(
        [
          { type: escape_attribute_value(type) },
          escape_object($$restProps),
          { disabled: disabled || null },
          {
            class: escape_attribute_value(buttonClass)
          }
        ],
        {}
      )}>${slots.default ? slots.default({}) : ``}</button>` : `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            escape_object($$restProps),
            {
              class: escape_attribute_value(buttonClass)
            }
          ],
          {}
        )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}`}`} `;
    });
    Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelClass2;
      let $$restProps = compute_rest_props($$props, ["color", "defaultClass", "show"]);
      let { color: color2 = "gray" } = $$props;
      let { defaultClass = "text-sm rtl:text-right font-medium block" } = $$props;
      let { show = true } = $$props;
      let node;
      const colorClasses2 = {
        gray: "text-gray-900 dark:text-gray-300",
        green: "text-green-700 dark:text-green-500",
        red: "text-red-700 dark:text-red-500",
        disabled: "text-gray-400 dark:text-gray-500 grayscale contrast-50"
      };
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0) $$bindings.defaultClass(defaultClass);
      if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
      {
        {
          color2 = color2;
        }
      }
      labelClass2 = twMerge(defaultClass, colorClasses2[color2], $$props.class);
      return `${show ? ` <label${spread(
        [
          escape_object($$restProps),
          {
            class: escape_attribute_value(labelClass2)
          }
        ],
        {}
      )}${add_attribute("this", node, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${slots.default ? slots.default({}) : ``}`} `;
    });
    colorClasses = {
      primary: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600",
      secondary: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600",
      red: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600",
      green: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600",
      purple: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
      teal: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
      yellow: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
      orange: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600",
      blue: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
    };
    labelClass = (inline2, extraClass) => twMerge(inline2 ? "inline-flex" : "flex", "items-center", extraClass);
    inputClass = (custom, color2, rounded, tinted, spacing, extraClass) => twMerge(
      "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2",
      spacing,
      tinted ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
      custom && "sr-only peer",
      "rounded",
      colorClasses[color2],
      extraClass
    );
    Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "color",
        "custom",
        "inline",
        "group",
        "choices",
        "value",
        "checked",
        "spacing",
        "groupLabelClass",
        "groupInputClass"
      ]);
      let $$slots = compute_slots(slots);
      let { color: color2 = "primary" } = $$props;
      let { custom = false } = $$props;
      let { inline: inline2 = false } = $$props;
      let { group = [] } = $$props;
      let { choices = [] } = $$props;
      let { value = "on" } = $$props;
      let { checked = void 0 } = $$props;
      let { spacing = $$slots.default ? "me-2" : "" } = $$props;
      let { groupLabelClass = "" } = $$props;
      let { groupInputClass = "" } = $$props;
      let background = getContext("background");
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
      if ($$props.inline === void 0 && $$bindings.inline && inline2 !== void 0) $$bindings.inline(inline2);
      if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
      if ($$props.choices === void 0 && $$bindings.choices && choices !== void 0) $$bindings.choices(choices);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
      if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
      if ($$props.groupLabelClass === void 0 && $$bindings.groupLabelClass && groupLabelClass !== void 0) $$bindings.groupLabelClass(groupLabelClass);
      if ($$props.groupInputClass === void 0 && $$bindings.groupInputClass && groupInputClass !== void 0) $$bindings.groupInputClass(groupInputClass);
      return `${choices.length > 0 ? `${each(choices, ({ value: value2, label }, i) => {
        return `${validate_component(Label, "Label").$$render(
          $$result,
          {
            class: labelClass(inline2, groupLabelClass),
            show: $$slots.default,
            for: `checkbox-${i}`
          },
          {},
          {
            default: () => {
              return `${escape(label)} <input${spread(
                [
                  {
                    id: escape_attribute_value(`checkbox-${i}`)
                  },
                  { type: "checkbox" },
                  { value: escape_attribute_value(value2) },
                  escape_object($$restProps),
                  {
                    class: escape_attribute_value(inputClass(custom, color2, true, background, spacing, groupInputClass))
                  }
                ],
                {}
              )}${~group.indexOf(value2) ? add_attribute("checked", true, 1) : ""}> ${slots.default ? slots.default({}) : ``} `;
            }
          }
        )}`;
      })}` : `${validate_component(Label, "Label").$$render(
        $$result,
        {
          class: labelClass(inline2, $$props.class),
          show: $$slots.default
        },
        {},
        {
          default: () => {
            return `<input${spread(
              [
                { type: "checkbox" },
                { value: escape_attribute_value(value) },
                escape_object($$restProps),
                {
                  class: escape_attribute_value(inputClass(custom, color2, true, background, spacing, $$slots.default || $$props.class))
                }
              ],
              {}
            )}${add_attribute("checked", checked, 1)}> ${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`} `;
    });
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let timeline_events = hybe_timeline["events"];
      const static_all_true = {
        "Music": true,
        "Trainee": true,
        "GFriend": true,
        "NewJeans": true,
        "LE SSERAFIM": true,
        "Team N": true,
        "Team S": true,
        "Min Hee-Jin": true,
        "HYBE": true,
        "BigHit": true,
        "Belift": true,
        "Source Music": true,
        "Pledis": true,
        "KOZ": true,
        "ADOR": true
      };
      let values = JSON.parse(JSON.stringify(static_all_true));
      function checkCheckbox(label) {
        let labels = [];
        for (let labelCategoryNames in hybe_timeline["labels"]["labelCategoryNames"]) {
          for (let tag in label[hybe_timeline["labels"]["labelCategoryNames"][labelCategoryNames]]) {
            labels.push(label[hybe_timeline["labels"]["labelCategoryNames"][labelCategoryNames]][tag]);
          }
        }
        let showItem = false;
        for (let labelVar in labels) {
          if (values[labels[labelVar]]) {
            showItem = true;
          }
        }
        return showItem;
      }
      return `<div class="overflow-hidden -mt-5"> ${validate_component(Card, "Card").$$render($$result, { class: "float-right mt-5 space-y-2" }, {}, {
        default: () => {
          return `<div>Groups
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["GFriend"] }, {}, {
            default: () => {
              return `GFriend`;
            }
          })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["NewJeans"] }, {}, {
            default: () => {
              return `NewJeans`;
            }
          })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["LE SSERAFIM"] }, {}, {
            default: () => {
              return `LE SSERAFIM`;
            }
          })}</div> <div>Trainee Groups
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Team N"] }, {}, {
            default: () => {
              return `Team N`;
            }
          })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Team S"] }, {}, {
            default: () => {
              return `Team S`;
            }
          })}</div> <div>People
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Min Hee-Jin"] }, {}, {
            default: () => {
              return `Min Hee-Jin`;
            }
          })}</div> <div>Companies
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Source Music"] }, {}, {
            default: () => {
              return `Source Music`;
            }
          })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["ADOR"] }, {}, {
            default: () => {
              return `ADOR`;
            }
          })}</div> <div>Event Type
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Music"] }, {}, {
            default: () => {
              return `Musical Release`;
            }
          })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Trainee"] }, {}, {
            default: () => {
              return `New Trainee`;
            }
          })}</div> <div class="flex place-content-center space-x-4">${validate_component(Button, "Button").$$render($$result, { color: "red", class: "w-1/3 h-10 " }, {}, {
            default: () => {
              return `Toggle All`;
            }
          })}</div> ${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, { class: "bg-black" }, {}, {})} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Presets${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
                $$result,
                {
                  class: "w-6 h-6 ms-2 text-white dark:text-white"
                },
                {},
                {}
              )}`;
            }
          })} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `GFriend`;
                }
              })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `Min Hee-Jin`;
                }
              })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                default: () => {
                  return `NewJeans`;
                }
              })}`;
            }
          })}`;
        }
      })} ${validate_component(Card, "Card").$$render($$result, { size: "lg", class: "float-left mt-5" }, {}, {
        default: () => {
          return `${validate_component(Timeline, "Timeline").$$render($$result, { order: "default" }, {}, {
            default: () => {
              return `${each(timeline_events, (item) => {
                return `${checkCheckbox(item["labels"]) ? `${validate_component(TimelineItem, "TimelineItem").$$render(
                  $$result,
                  {
                    title: item["title"],
                    date: item["date"],
                    desc: item["text"] || item["sources"].length != 0 ? true : false
                  },
                  {},
                  {
                    default: () => {
                      return `<p class="mb-4 text-base font-normal text-gray-500 text-sm"><br> ${escape(item["text"])} ${item["notes"] != "" ? `<br><i>Note: ${escape(item["notes"])}</i>` : ``} ${item["text"] != "" ? `<br><br>` : ``} ${item["sources"].length != 0 ? `<small>Sources:
              ${each(item["sources"], (source) => {
                        return `<a class="text-primary-2"${add_attribute("href", source, 0)} target="_blank">(${escape(item["sources"].indexOf(source) + 1)})</a>`;
                      })} </small>` : ``}</p> `;
                    }
                  }
                )}` : ``}`;
              })}`;
            }
          })}`;
        }
      })}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    imports4 = ["_app/immutable/nodes/3.CdenvGpn.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js", "_app/immutable/chunks/MDm--iX7.js", "_app/immutable/chunks/Drs2_v4N.js", "_app/immutable/chunks/CTIfdKuQ.js", "_app/immutable/chunks/Cu52Q1Rw.js", "_app/immutable/chunks/DUjiu_U4.js", "_app/immutable/chunks/B-j-nzhe.js", "_app/immutable/chunks/J6ZmAdDH.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/timeline/gfriend_termination/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var bgColors2, Frame2, Card2, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/timeline/gfriend_termination/_page.svelte.js"() {
    init_ssr();
    init_bundle_mjs();
    init_names();
    init_timeline();
    bgColors2 = {
      gray: "bg-gray-50 dark:bg-gray-800",
      red: "bg-red-50 dark:bg-gray-800",
      yellow: "bg-yellow-50 dark:bg-gray-800 ",
      green: "bg-green-50 dark:bg-gray-800 ",
      indigo: "bg-indigo-50 dark:bg-gray-800 ",
      purple: "bg-purple-50 dark:bg-gray-800 ",
      pink: "bg-pink-50 dark:bg-gray-800 ",
      blue: "bg-blue-50 dark:bg-gray-800 ",
      light: "bg-gray-50 dark:bg-gray-700",
      dark: "bg-gray-50 dark:bg-gray-800",
      default: "bg-white dark:bg-gray-800",
      dropdown: "bg-white dark:bg-gray-700",
      navbar: "bg-white dark:bg-gray-900",
      navbarUl: "bg-gray-50 dark:bg-gray-800",
      form: "bg-gray-50 dark:bg-gray-700",
      primary: "bg-primary-50 dark:bg-gray-800 ",
      orange: "bg-orange-50 dark:bg-orange-800",
      none: "",
      secondary: "bg-secondary-1"
    };
    Frame2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "tag",
        "color",
        "rounded",
        "border",
        "shadow",
        "node",
        "use",
        "options",
        "role",
        "transition",
        "params",
        "open"
      ]);
      const noop3 = () => {
      };
      setContext("background", true);
      let { tag = $$restProps.href ? "a" : "div" } = $$props;
      let { color: color2 = "default" } = $$props;
      let { rounded = false } = $$props;
      let { border = false } = $$props;
      let { shadow = false } = $$props;
      let { node = void 0 } = $$props;
      let { use = noop3 } = $$props;
      let { options: options2 = {} } = $$props;
      let { role = void 0 } = $$props;
      let { transition = void 0 } = $$props;
      let { params = {} } = $$props;
      let { open = true } = $$props;
      const dispatch = createEventDispatcher();
      const textColors = {
        gray: "text-gray-800 dark:text-gray-300",
        red: "text-red-800 dark:text-red-400",
        yellow: "text-yellow-800 dark:text-yellow-300",
        green: "text-green-800 dark:text-green-400",
        indigo: "text-indigo-800 dark:text-indigo-400",
        purple: "text-purple-800 dark:text-purple-400",
        pink: "text-pink-800 dark:text-pink-400",
        blue: "text-blue-800 dark:text-blue-400",
        light: "text-gray-700 dark:text-gray-300",
        dark: "text-gray-700 dark:text-gray-300",
        default: "text-gray-500 dark:text-gray-400",
        dropdown: "text-gray-700 dark:text-gray-200",
        navbar: "text-gray-700 dark:text-gray-200",
        navbarUl: "text-gray-700 dark:text-gray-400",
        form: "text-gray-900 dark:text-white",
        primary: "text-primary-800 dark:text-primary-400",
        orange: "text-orange-800 dark:text-orange-400",
        none: "",
        secondary: "text-secondary-1"
      };
      const borderColors = {
        gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
        red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
        yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
        green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
        indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
        purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
        pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
        blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
        light: "border-gray-500 divide-gray-500",
        dark: "border-gray-500 divide-gray-500",
        default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
        dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
        navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
        primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
        orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
        none: "",
        secondary: "border-secondary-3 divide-secondary-3"
      };
      let divClass;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
      if ($$props.color === void 0 && $$bindings.color && color2 !== void 0) $$bindings.color(color2);
      if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
      if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
      if ($$props.node === void 0 && $$bindings.node && node !== void 0) $$bindings.node(node);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0) $$bindings.use(use);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
      if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
      if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
      {
        dispatch(open ? "open" : "close");
      }
      {
        dispatch("show", open);
      }
      color2 = color2 ?? "default";
      {
        setContext("color", color2);
      }
      divClass = twMerge(bgColors2[color2], textColors[color2], rounded && "rounded-lg", border && "border", borderColors[color2], shadow && "shadow-md", $$props.class);
      return `${transition && open ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            { role: escape_attribute_value(role) },
            escape_object($$restProps),
            { class: escape_attribute_value(divClass) }
          ],
          {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}` : `${open ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
          [
            { role: escape_attribute_value(role) },
            escape_object($$restProps),
            { class: escape_attribute_value(divClass) }
          ],
          {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}` : ``}`} `;
    });
    Card2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "horizontal", "reverse", "img", "padding", "size", "imgClass"]);
      let { href = void 0 } = $$props;
      let { horizontal = false } = $$props;
      let { reverse = false } = $$props;
      let { img = void 0 } = $$props;
      let { padding = "lg" } = $$props;
      let { size: size2 = "sm" } = $$props;
      let { imgClass = "" } = $$props;
      const paddings = {
        none: "",
        xs: "p-2",
        sm: "p-4",
        md: "p-4 sm:p-5",
        lg: "p-4 sm:p-6",
        xl: "p-4 sm:p-8"
      };
      const sizes = {
        none: "",
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-xl",
        lg: "max-w-2xl",
        xl: "max-w-(--breakpoint-xl)"
      };
      let innerPadding;
      let cardClass;
      let imgCls;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
      if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0) $$bindings.horizontal(horizontal);
      if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0) $$bindings.reverse(reverse);
      if ($$props.img === void 0 && $$bindings.img && img !== void 0) $$bindings.img(img);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
      if ($$props.size === void 0 && $$bindings.size && size2 !== void 0) $$bindings.size(size2);
      if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0) $$bindings.imgClass(imgClass);
      innerPadding = paddings[padding];
      cardClass = twMerge("flex w-full", sizes[size2], reverse ? "flex-col-reverse" : "flex-col", horizontal && (reverse ? "md:flex-row-reverse" : "md:flex-row"), href && "hover:bg-gray-100 dark:hover:bg-gray-700", !img && innerPadding, $$props.class);
      imgCls = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-e-lg" : "md:rounded-s-lg"), imgClass);
      return `${validate_component(Frame2, "Frame").$$render($$result, Object.assign({}, { tag: href ? "a" : "div" }, { rounded: true }, { shadow: true }, { border: true }, { href }, $$restProps, { class: cardClass }), {}, {
        default: () => {
          return `${img ? `<img${add_attribute("class", imgCls, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerPadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
        }
      })} `;
    });
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let timeline_events = hybe_timeline["events"];
      return `<div class="overflow-hidden -mt-5">${validate_component(Card2, "Card").$$render(
        $$result,
        {
          size: "lg",
          class: "float-left mt-5",
          color: "secondary"
        },
        {},
        {
          default: () => {
            return `${validate_component(Timeline, "Timeline").$$render($$result, { order: "default" }, {}, {
              default: () => {
                return `${each(timeline_events, (item) => {
                  return `${validate_component(TimelineItem, "TimelineItem").$$render(
                    $$result,
                    {
                      title: item["title"],
                      date: item["date"],
                      desc: item["text"] || item["sources"].length != 0 ? true : false
                    },
                    {},
                    {
                      default: () => {
                        return `<p class="mb-4 text-base font-normal text-gray-500 text-sm"><br> ${escape(item["text"])} ${item["notes"] != "" ? `<br><i>Note: ${escape(item["notes"])}</i>` : ``} ${item["text"] != "" ? `<br><br>` : ``} ${item["sources"].length != 0 ? `<small>Sources:
            ${each(item["sources"], (source) => {
                          return `<a class="text-primary-2"${add_attribute("href", source, 0)} target="_blank">(${escape(item["sources"].indexOf(source) + 1)})</a>`;
                        })} </small>` : ``}</p> `;
                      }
                    }
                  )}`;
                })}`;
              }
            })}`;
          }
        }
      )}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    imports5 = ["_app/immutable/nodes/4.DwPSOTRu.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js", "_app/immutable/chunks/MDm--iX7.js", "_app/immutable/chunks/Drs2_v4N.js", "_app/immutable/chunks/CTIfdKuQ.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// node_modules/@kurkle/color/dist/color.esm.js
function round2(v) {
  return v + 0.5 | 0;
}
function p2b(v) {
  return lim(round2(v * 2.55), 0, 255);
}
function n2b(v) {
  return lim(round2(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round2(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round2(v * 100), 0, 100);
}
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === "#") {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map$1[str[1]] * 17,
        g: 255 & map$1[str[2]] * 17,
        b: 255 & map$1[str[3]] * 17,
        a: len === 5 ? map$1[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map$1[str[1]] << 4 | map$1[str[2]],
        g: map$1[str[3]] << 4 | map$1[str[4]],
        b: map$1[str[5]] << 4 | map$1[str[6]],
        a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
      };
    }
  }
  return ret;
}
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
}
function hsl2rgbn(h, s2, l) {
  const a = s2 * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h, s2, v) {
  const f = (n, k = (n + h / 60) % 6) => v - v * s2 * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h, w, b) {
  const rgb = hsl2rgbn(h, 1, 0.5);
  let i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function hueValue(r, g, b, d, max2) {
  if (r === max2) {
    return (g - b) / d + (g < b ? 6 : 0);
  }
  if (g === max2) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
}
function rgb2hsl(v) {
  const range = 255;
  const r = v.r / range;
  const g = v.g / range;
  const b = v.b / range;
  const max2 = Math.max(r, g, b);
  const min2 = Math.min(r, g, b);
  const l = (max2 + min2) / 2;
  let h, s2, d;
  if (max2 !== min2) {
    d = max2 - min2;
    s2 = l > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
    h = hueValue(r, g, b, d, max2);
    h = h * 60 + 0.5;
  }
  return [h | 0, s2 || 0, l];
}
function calln(f, a, b, c) {
  return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
}
function hsl2rgb(h, s2, l) {
  return calln(hsl2rgbn, h, s2, l);
}
function hwb2rgb(h, w, b) {
  return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s2, v) {
  return calln(hsv2rgbn, h, s2, v);
}
function hue(h) {
  return (h % 360 + 360) % 360;
}
function hueParse(str) {
  const m = HUE_RE.exec(str);
  let a = 255;
  let v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  const h = hue(+m[2]);
  const p1 = +m[3] / 100;
  const p2 = +m[4] / 100;
  if (m[1] === "hwb") {
    v = hwb2rgb(h, p1, p2);
  } else if (m[1] === "hsv") {
    v = hsv2rgb(h, p1, p2);
  } else {
    v = hsl2rgb(h, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a
  };
}
function rotate(v, deg) {
  var h = rgb2hsl(v);
  h[0] = hue(h[0] + deg);
  h = hsl2rgb(h);
  v.r = h[0];
  v.g = h[1];
  v.b = h[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  const a = rgb2hsl(v);
  const h = a[0];
  const s2 = n2p(a[1]);
  const l = n2p(a[2]);
  return v.a < 255 ? `hsla(${h}, ${s2}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s2}%, ${l}%)`;
}
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map);
  let i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map[k]);
    }
    k = parseInt(names$1[ok], 16);
    unpacked[nk] = [k >> 16 & 255, k >> 8 & 255, k & 255];
  }
  return unpacked;
}
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a = names[str.toLowerCase()];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
  };
}
function rgbParse(str) {
  const m = RGB_RE.exec(str);
  let a = 255;
  let r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    const v = +m[7];
    a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
  g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
  b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
  return {
    r,
    g,
    b,
    a
  };
}
function rgbString(v) {
  return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
}
function interpolate(rgb1, rgb2, t) {
  const r = from(b2n(rgb1.r));
  const g = from(b2n(rgb1.g));
  const b = from(b2n(rgb1.b));
  return {
    r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
    g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
    b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
    a: rgb1.a + t * (rgb2.a - rgb1.a)
  };
}
function modHSL(v, i, ratio) {
  if (v) {
    let tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone(v, proto) {
  return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
  var v = { r: 0, g: 0, b: 0, a: 255 };
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = { r: input[0], g: input[1], b: input[2], a: 255 };
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone(input, { r: 0, g: 0, b: 0, a: 1 });
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === "r") {
    return rgbParse(str);
  }
  return hueParse(str);
}
var lim, map$1, hex, h1, h2, eq, isShort, alpha, HUE_RE, map, names$1, names, RGB_RE, to, from, Color;
var init_color_esm = __esm({
  "node_modules/@kurkle/color/dist/color.esm.js"() {
    lim = (v, l, h) => Math.max(Math.min(v, h), l);
    map$1 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
    hex = [..."0123456789ABCDEF"];
    h1 = (b) => hex[b & 15];
    h2 = (b) => hex[(b & 240) >> 4] + hex[b & 15];
    eq = (b) => (b & 240) >> 4 === (b & 15);
    isShort = (v) => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
    alpha = (a, f) => a < 255 ? f(a) : "";
    HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
    map = {
      x: "dark",
      Z: "light",
      Y: "re",
      X: "blu",
      W: "gr",
      V: "medium",
      U: "slate",
      A: "ee",
      T: "ol",
      S: "or",
      B: "ra",
      C: "lateg",
      D: "ights",
      R: "in",
      Q: "turquois",
      E: "hi",
      P: "ro",
      O: "al",
      N: "le",
      M: "de",
      L: "yello",
      F: "en",
      K: "ch",
      G: "arks",
      H: "ea",
      I: "ightg",
      J: "wh"
    };
    names$1 = {
      OiceXe: "f0f8ff",
      antiquewEte: "faebd7",
      aqua: "ffff",
      aquamarRe: "7fffd4",
      azuY: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "0",
      blanKedOmond: "ffebcd",
      Xe: "ff",
      XeviTet: "8a2be2",
      bPwn: "a52a2a",
      burlywood: "deb887",
      caMtXe: "5f9ea0",
      KartYuse: "7fff00",
      KocTate: "d2691e",
      cSO: "ff7f50",
      cSnflowerXe: "6495ed",
      cSnsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "ffff",
      xXe: "8b",
      xcyan: "8b8b",
      xgTMnPd: "b8860b",
      xWay: "a9a9a9",
      xgYF: "6400",
      xgYy: "a9a9a9",
      xkhaki: "bdb76b",
      xmagFta: "8b008b",
      xTivegYF: "556b2f",
      xSange: "ff8c00",
      xScEd: "9932cc",
      xYd: "8b0000",
      xsOmon: "e9967a",
      xsHgYF: "8fbc8f",
      xUXe: "483d8b",
      xUWay: "2f4f4f",
      xUgYy: "2f4f4f",
      xQe: "ced1",
      xviTet: "9400d3",
      dAppRk: "ff1493",
      dApskyXe: "bfff",
      dimWay: "696969",
      dimgYy: "696969",
      dodgerXe: "1e90ff",
      fiYbrick: "b22222",
      flSOwEte: "fffaf0",
      foYstWAn: "228b22",
      fuKsia: "ff00ff",
      gaRsbSo: "dcdcdc",
      ghostwEte: "f8f8ff",
      gTd: "ffd700",
      gTMnPd: "daa520",
      Way: "808080",
      gYF: "8000",
      gYFLw: "adff2f",
      gYy: "808080",
      honeyMw: "f0fff0",
      hotpRk: "ff69b4",
      RdianYd: "cd5c5c",
      Rdigo: "4b0082",
      ivSy: "fffff0",
      khaki: "f0e68c",
      lavFMr: "e6e6fa",
      lavFMrXsh: "fff0f5",
      lawngYF: "7cfc00",
      NmoncEffon: "fffacd",
      ZXe: "add8e6",
      ZcSO: "f08080",
      Zcyan: "e0ffff",
      ZgTMnPdLw: "fafad2",
      ZWay: "d3d3d3",
      ZgYF: "90ee90",
      ZgYy: "d3d3d3",
      ZpRk: "ffb6c1",
      ZsOmon: "ffa07a",
      ZsHgYF: "20b2aa",
      ZskyXe: "87cefa",
      ZUWay: "778899",
      ZUgYy: "778899",
      ZstAlXe: "b0c4de",
      ZLw: "ffffe0",
      lime: "ff00",
      limegYF: "32cd32",
      lRF: "faf0e6",
      magFta: "ff00ff",
      maPon: "800000",
      VaquamarRe: "66cdaa",
      VXe: "cd",
      VScEd: "ba55d3",
      VpurpN: "9370db",
      VsHgYF: "3cb371",
      VUXe: "7b68ee",
      VsprRggYF: "fa9a",
      VQe: "48d1cc",
      VviTetYd: "c71585",
      midnightXe: "191970",
      mRtcYam: "f5fffa",
      mistyPse: "ffe4e1",
      moccasR: "ffe4b5",
      navajowEte: "ffdead",
      navy: "80",
      Tdlace: "fdf5e6",
      Tive: "808000",
      TivedBb: "6b8e23",
      Sange: "ffa500",
      SangeYd: "ff4500",
      ScEd: "da70d6",
      pOegTMnPd: "eee8aa",
      pOegYF: "98fb98",
      pOeQe: "afeeee",
      pOeviTetYd: "db7093",
      papayawEp: "ffefd5",
      pHKpuff: "ffdab9",
      peru: "cd853f",
      pRk: "ffc0cb",
      plum: "dda0dd",
      powMrXe: "b0e0e6",
      purpN: "800080",
      YbeccapurpN: "663399",
      Yd: "ff0000",
      Psybrown: "bc8f8f",
      PyOXe: "4169e1",
      saddNbPwn: "8b4513",
      sOmon: "fa8072",
      sandybPwn: "f4a460",
      sHgYF: "2e8b57",
      sHshell: "fff5ee",
      siFna: "a0522d",
      silver: "c0c0c0",
      skyXe: "87ceeb",
      UXe: "6a5acd",
      UWay: "708090",
      UgYy: "708090",
      snow: "fffafa",
      sprRggYF: "ff7f",
      stAlXe: "4682b4",
      tan: "d2b48c",
      teO: "8080",
      tEstN: "d8bfd8",
      tomato: "ff6347",
      Qe: "40e0d0",
      viTet: "ee82ee",
      JHt: "f5deb3",
      wEte: "ffffff",
      wEtesmoke: "f5f5f5",
      Lw: "ffff00",
      LwgYF: "9acd32"
    };
    RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
    to = (v) => v <= 31308e-7 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - 0.055;
    from = (v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    Color = class _Color {
      constructor(input) {
        if (input instanceof _Color) {
          return input;
        }
        const type = typeof input;
        let v;
        if (type === "object") {
          v = fromObject(input);
        } else if (type === "string") {
          v = hexParse(input) || nameParse(input) || functionParse(input);
        }
        this._rgb = v;
        this._valid = !!v;
      }
      get valid() {
        return this._valid;
      }
      get rgb() {
        var v = clone(this._rgb);
        if (v) {
          v.a = b2n(v.a);
        }
        return v;
      }
      set rgb(obj) {
        this._rgb = fromObject(obj);
      }
      rgbString() {
        return this._valid ? rgbString(this._rgb) : void 0;
      }
      hexString() {
        return this._valid ? hexString(this._rgb) : void 0;
      }
      hslString() {
        return this._valid ? hslString(this._rgb) : void 0;
      }
      mix(color2, weight) {
        if (color2) {
          const c1 = this.rgb;
          const c2 = color2.rgb;
          let w2;
          const p = weight === w2 ? 0.5 : weight;
          const w = 2 * p - 1;
          const a = c1.a - c2.a;
          const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
          w2 = 1 - w1;
          c1.r = 255 & w1 * c1.r + w2 * c2.r + 0.5;
          c1.g = 255 & w1 * c1.g + w2 * c2.g + 0.5;
          c1.b = 255 & w1 * c1.b + w2 * c2.b + 0.5;
          c1.a = p * c1.a + (1 - p) * c2.a;
          this.rgb = c1;
        }
        return this;
      }
      interpolate(color2, t) {
        if (color2) {
          this._rgb = interpolate(this._rgb, color2._rgb, t);
        }
        return this;
      }
      clone() {
        return new _Color(this.rgb);
      }
      alpha(a) {
        this._rgb.a = n2b(a);
        return this;
      }
      clearer(ratio) {
        const rgb = this._rgb;
        rgb.a *= 1 - ratio;
        return this;
      }
      greyscale() {
        const rgb = this._rgb;
        const val = round2(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
        rgb.r = rgb.g = rgb.b = val;
        return this;
      }
      opaquer(ratio) {
        const rgb = this._rgb;
        rgb.a *= 1 + ratio;
        return this;
      }
      negate() {
        const v = this._rgb;
        v.r = 255 - v.r;
        v.g = 255 - v.g;
        v.b = 255 - v.b;
        return this;
      }
      lighten(ratio) {
        modHSL(this._rgb, 2, ratio);
        return this;
      }
      darken(ratio) {
        modHSL(this._rgb, 2, -ratio);
        return this;
      }
      saturate(ratio) {
        modHSL(this._rgb, 1, ratio);
        return this;
      }
      desaturate(ratio) {
        modHSL(this._rgb, 1, -ratio);
        return this;
      }
      rotate(deg) {
        rotate(this._rgb, deg);
        return this;
      }
    };
  }
});

// node_modules/chart.js/dist/chunks/helpers.segment.js
function noop2() {
}
function isNullOrUndef(value) {
  return value === null || value === void 0;
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === "[object Object]";
}
function isNumberFinite(value) {
  return (typeof value === "number" || value instanceof Number) && isFinite(+value);
}
function finiteOrDefault(value, defaultValue) {
  return isNumberFinite(value) ? value : defaultValue;
}
function valueOrDefault(value, defaultValue) {
  return typeof value === "undefined" ? defaultValue : value;
}
function callback(fn, args, thisArg) {
  if (fn && typeof fn.call === "function") {
    return fn.apply(thisArg, args);
  }
}
function each2(loopable, fn, thisArg, reverse) {
  let i, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    if (reverse) {
      for (i = len - 1; i >= 0; i--) {
        fn.call(thisArg, loopable[i], i);
      }
    } else {
      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[i], i);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, loopable[keys[i]], keys[i]);
    }
  }
}
function _elementsEqual(a0, a1) {
  let i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone2(source) {
  if (isArray(source)) {
    return source.map(clone2);
  }
  if (isObject(source)) {
    const target = /* @__PURE__ */ Object.create(null);
    const keys = Object.keys(source);
    const klen = keys.length;
    let k = 0;
    for (; k < klen; ++k) {
      target[keys[k]] = clone2(source[keys[k]]);
    }
    return target;
  }
  return source;
}
function isValidKey(key2) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(key2) === -1;
}
function _merger(key2, target, source, options2) {
  if (!isValidKey(key2)) {
    return;
  }
  const tval = target[key2];
  const sval = source[key2];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options2);
  } else {
    target[key2] = clone2(sval);
  }
}
function merge(target, source, options2) {
  const sources = isArray(source) ? source : [
    source
  ];
  const ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options2 = options2 || {};
  const merger = options2.merger || _merger;
  let current;
  for (let i = 0; i < ilen; ++i) {
    current = sources[i];
    if (!isObject(current)) {
      continue;
    }
    const keys = Object.keys(current);
    for (let k = 0, klen = keys.length; k < klen; ++k) {
      merger(keys[k], target, current, options2);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {
    merger: _mergerIf
  });
}
function _mergerIf(key2, target, source) {
  if (!isValidKey(key2)) {
    return;
  }
  const tval = target[key2];
  const sval = source[key2];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key2)) {
    target[key2] = clone2(sval);
  }
}
function _splitKey(key2) {
  const parts = key2.split(".");
  const keys = [];
  let tmp = "";
  for (const part of parts) {
    tmp += part;
    if (tmp.endsWith("\\")) {
      tmp = tmp.slice(0, -1) + ".";
    } else {
      keys.push(tmp);
      tmp = "";
    }
  }
  return keys;
}
function _getKeyResolver(key2) {
  const keys = _splitKey(key2);
  return (obj) => {
    for (const k of keys) {
      if (k === "") {
        break;
      }
      obj = obj && obj[k];
    }
    return obj;
  };
}
function resolveObjectKey(obj, key2) {
  const resolver = keyResolvers[key2] || (keyResolvers[key2] = _getKeyResolver(key2));
  return resolver(obj);
}
function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function _isClickEvent(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
function almostEquals(x, y, epsilon) {
  return Math.abs(x - y) < epsilon;
}
function niceNum(range) {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
  const niceRange = Math.pow(10, Math.floor(log10(range)));
  const fraction = range / niceRange;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
}
function _factorize(value) {
  const result = [];
  const sqrt = Math.sqrt(value);
  let i;
  for (i = 1; i < sqrt; i++) {
    if (value % i === 0) {
      result.push(i);
      result.push(value / i);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a, b) => a - b).pop();
  return result;
}
function isNonPrimitive(n) {
  return typeof n === "symbol" || typeof n === "object" && n !== null && !(Symbol.toPrimitive in n || "toString" in n || "valueOf" in n);
}
function isNumber2(n) {
  return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
  const rounded = Math.round(x);
  return rounded - epsilon <= x && rounded + epsilon >= x;
}
function _setMinAndMaxByKey(array2, target, property) {
  let i, ilen, value;
  for (i = 0, ilen = array2.length; i < ilen; i++) {
    value = array2[i][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
function toRadians(degrees) {
  return degrees * (PI / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI);
}
function _decimalPlaces(x) {
  if (!isNumberFinite(x)) {
    return;
  }
  let e = 1;
  let p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  const distanceFromXCenter = anglePoint.x - centrePoint.x;
  const distanceFromYCenter = anglePoint.y - centrePoint.y;
  const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
  let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < -0.5 * PI) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _angleDiff(a, b) {
  return (a - b + PITAU) % TAU - PI;
}
function _normalizeAngle(a) {
  return (a % TAU + TAU) % TAU;
}
function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
  const a = _normalizeAngle(angle);
  const s2 = _normalizeAngle(start);
  const e = _normalizeAngle(end);
  const angleToStart = _normalizeAngle(s2 - a);
  const angleToEnd = _normalizeAngle(e - a);
  const startToAngle = _normalizeAngle(a - s2);
  const endToAngle = _normalizeAngle(a - e);
  return a === s2 || a === e || sameAngleIsFullCircle && s2 === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
function _limitValue(value, min2, max2) {
  return Math.max(min2, Math.min(max2, value));
}
function _int16Range(value) {
  return _limitValue(value, -32768, 32767);
}
function _isBetween(value, start, end, epsilon = 1e-6) {
  return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}
function _lookup(table, value, cmp) {
  cmp = cmp || ((index7) => table[index7] < value);
  let hi = table.length - 1;
  let lo = 0;
  let mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (cmp(mid)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi
  };
}
function _filterBetween(values, min2, max2) {
  let start = 0;
  let end = values.length;
  while (start < end && values[start] < min2) {
    start++;
  }
  while (end > start && values[end - 1] > max2) {
    end--;
  }
  return start > 0 || end < values.length ? values.slice(start, end) : values;
}
function listenArrayEvents(array2, listener) {
  if (array2._chartjs) {
    array2._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array2, "_chartjs", {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [
        listener
      ]
    }
  });
  arrayEvents.forEach((key2) => {
    const method = "_onData" + _capitalize(key2);
    const base2 = array2[key2];
    Object.defineProperty(array2, key2, {
      configurable: true,
      enumerable: false,
      value(...args) {
        const res = base2.apply(this, args);
        array2._chartjs.listeners.forEach((object) => {
          if (typeof object[method] === "function") {
            object[method](...args);
          }
        });
        return res;
      }
    });
  });
}
function unlistenArrayEvents(array2, listener) {
  const stub = array2._chartjs;
  if (!stub) {
    return;
  }
  const listeners = stub.listeners;
  const index7 = listeners.indexOf(listener);
  if (index7 !== -1) {
    listeners.splice(index7, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach((key2) => {
    delete array2[key2];
  });
  delete array2._chartjs;
}
function _arrayUnique(items) {
  const set2 = new Set(items);
  if (set2.size === items.length) {
    return items;
  }
  return Array.from(set2);
}
function throttled(fn, thisArg) {
  let argsToUse = [];
  let ticking = false;
  return function(...args) {
    argsToUse = args;
    if (!ticking) {
      ticking = true;
      requestAnimFrame.call(window, () => {
        ticking = false;
        fn.apply(thisArg, argsToUse);
      });
    }
  };
}
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    if (delay) {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay, args);
    } else {
      fn.apply(this, args);
    }
    return delay;
  };
}
function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
  const pointCount = points.length;
  let start = 0;
  let count = pointCount;
  if (meta._sorted) {
    const { iScale, vScale, _parsed } = meta;
    const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
    const axis = iScale.axis;
    const { min: min2, max: max2, minDefined, maxDefined } = iScale.getUserBounds();
    if (minDefined) {
      start = Math.min(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, axis, min2).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min2)).lo
      );
      if (spanGaps) {
        const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        start -= Math.max(0, distanceToDefinedLo);
      }
      start = _limitValue(start, 0, pointCount - 1);
    }
    if (maxDefined) {
      let end = Math.max(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, iScale.axis, max2, true).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max2), true).hi + 1
      );
      if (spanGaps) {
        const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        end += Math.max(0, distanceToDefinedHi);
      }
      count = _limitValue(end, start, pointCount) - start;
    } else {
      count = pointCount - start;
    }
  }
  return {
    start,
    count
  };
}
function _scaleRangesChanged(meta) {
  const { xScale, yScale, _scaleRanges } = meta;
  const newRanges = {
    xmin: xScale.min,
    xmax: xScale.max,
    ymin: yScale.min,
    ymax: yScale.max
  };
  if (!_scaleRanges) {
    meta._scaleRanges = newRanges;
    return true;
  }
  const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
  Object.assign(_scaleRanges, newRanges);
  return changed;
}
function isPatternOrGradient(value) {
  if (value && typeof value === "object") {
    const type = value.toString();
    return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
  }
  return false;
}
function color(value) {
  return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value) ? value : new Color(value).saturate(0.5).darken(0.1).hexString();
}
function applyAnimationsDefaults(defaults2) {
  defaults2.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  });
  defaults2.describe("animation", {
    _fallback: false,
    _indexable: false,
    _scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
  });
  defaults2.set("animations", {
    colors: {
      type: "color",
      properties: colors
    },
    numbers: {
      type: "number",
      properties: numbers
    }
  });
  defaults2.describe("animations", {
    _fallback: "animation"
  });
  defaults2.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (v) => v | 0
        }
      }
    }
  });
}
function applyLayoutsDefaults(defaults2) {
  defaults2.set("layout", {
    autoPadding: true,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
function getNumberFormat(locale, options2) {
  options2 = options2 || {};
  const cacheKey = locale + JSON.stringify(options2);
  let formatter = intlCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options2);
    intlCache.set(cacheKey, formatter);
  }
  return formatter;
}
function formatNumber(num, locale, options2) {
  return getNumberFormat(locale, options2).format(num);
}
function calculateDelta(tickValue, ticks) {
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}
function applyScaleDefaults(defaults2) {
  defaults2.set("scale", {
    display: true,
    offset: false,
    reverse: false,
    beginAtZero: false,
    bounds: "ticks",
    clip: true,
    grace: 0,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: true,
      tickLength: 8,
      tickWidth: (_ctx, options2) => options2.lineWidth,
      tickColor: (_ctx, options2) => options2.color,
      offset: false
    },
    border: {
      display: true,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: false,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ticks.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: false,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  });
  defaults2.route("scale.ticks", "color", "", "color");
  defaults2.route("scale.grid", "color", "", "borderColor");
  defaults2.route("scale.border", "color", "", "borderColor");
  defaults2.route("scale.title", "color", "", "color");
  defaults2.describe("scale", {
    _fallback: false,
    _scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
    _indexable: (name) => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
  });
  defaults2.describe("scales", {
    _fallback: "scale"
  });
  defaults2.describe("scale.ticks", {
    _scriptable: (name) => name !== "backdropPadding" && name !== "callback",
    _indexable: (name) => name !== "backdropPadding"
  });
}
function getScope$1(node, key2) {
  if (!key2) {
    return node;
  }
  const keys = key2.split(".");
  for (let i = 0, n = keys.length; i < n; ++i) {
    const k = keys[i];
    node = node[k] || (node[k] = /* @__PURE__ */ Object.create(null));
  }
  return node;
}
function set(root, scope, values) {
  if (typeof scope === "string") {
    return merge(getScope$1(root, scope), values);
  }
  return merge(getScope$1(root, ""), scope);
}
function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
}
function _measureText(ctx, data, gc, longest, string) {
  let textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _longestText(ctx, font, arrayOfThings, cache) {
  cache = cache || {};
  let data = cache.data = cache.data || {};
  let gc = cache.garbageCollect = cache.garbageCollect || [];
  if (cache.font !== font) {
    data = cache.data = {};
    gc = cache.garbageCollect = [];
    cache.font = font;
  }
  ctx.save();
  ctx.font = font;
  let longest = 0;
  const ilen = arrayOfThings.length;
  let i, j, jlen, thing, nestedThing;
  for (i = 0; i < ilen; i++) {
    thing = arrayOfThings[i];
    if (thing !== void 0 && thing !== null && !isArray(thing)) {
      longest = _measureText(ctx, data, gc, longest, thing);
    } else if (isArray(thing)) {
      for (j = 0, jlen = thing.length; j < jlen; j++) {
        nestedThing = thing[j];
        if (nestedThing !== void 0 && nestedThing !== null && !isArray(nestedThing)) {
          longest = _measureText(ctx, data, gc, longest, nestedThing);
        }
      }
    }
  }
  ctx.restore();
  const gcLen = gc.length / 2;
  if (gcLen > arrayOfThings.length) {
    for (i = 0; i < gcLen; i++) {
      delete data[gc[i]];
    }
    gc.splice(0, gcLen);
  }
  return longest;
}
function _alignPixel(chart2, pixel, width) {
  const devicePixelRatio = chart2.currentDevicePixelRatio;
  const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clearCanvas(canvas, ctx) {
  if (!ctx && !canvas) {
    return;
  }
  ctx = ctx || canvas.getContext("2d");
  ctx.save();
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
function drawPoint(ctx, options2, x, y) {
  drawPointLegend(ctx, options2, x, y, null);
}
function drawPointLegend(ctx, options2, x, y, w) {
  let type, xOffset, yOffset, size2, cornerRadius, width, xOffsetW, yOffsetW;
  const style = options2.pointStyle;
  const rotation = options2.rotation;
  const radius = options2.radius;
  let rad = (rotation || 0) * RAD_PER_DEG;
  if (style && typeof style === "object") {
    type = style.toString();
    if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rad);
      ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
      ctx.restore();
      return;
    }
  }
  if (isNaN(radius) || radius <= 0) {
    return;
  }
  ctx.beginPath();
  switch (style) {
    // Default includes circle
    default:
      if (w) {
        ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
      } else {
        ctx.arc(x, y, radius, 0, TAU);
      }
      ctx.closePath();
      break;
    case "triangle":
      width = w ? w / 2 : radius;
      ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      ctx.closePath();
      break;
    case "rectRounded":
      cornerRadius = radius * 0.516;
      size2 = radius - cornerRadius;
      xOffset = Math.cos(rad + QUARTER_PI) * size2;
      xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size2);
      yOffset = Math.sin(rad + QUARTER_PI) * size2;
      yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size2);
      ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
      ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
      ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
      ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
      ctx.closePath();
      break;
    case "rect":
      if (!rotation) {
        size2 = Math.SQRT1_2 * radius;
        width = w ? w / 2 : size2;
        ctx.rect(x - width, y - size2, 2 * width, 2 * size2);
        break;
      }
      rad += QUARTER_PI;
    /* falls through */
    case "rectRot":
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      ctx.closePath();
      break;
    case "crossRot":
      rad += QUARTER_PI;
    /* falls through */
    case "cross":
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      break;
    case "star":
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      rad += QUARTER_PI;
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      break;
    case "line":
      xOffset = w ? w / 2 : Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      break;
    case "dash":
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
      break;
    case false:
      ctx.closePath();
      break;
  }
  ctx.fill();
  if (options2.borderWidth > 0) {
    ctx.stroke();
  }
}
function _isPointInArea(point, area, margin) {
  margin = margin || 0.5;
  return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function _steppedLineTo(ctx, previous, target, flip3, mode) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  if (mode === "middle") {
    const midpoint = (previous.x + target.x) / 2;
    ctx.lineTo(midpoint, previous.y);
    ctx.lineTo(midpoint, target.y);
  } else if (mode === "after" !== !!flip3) {
    ctx.lineTo(previous.x, target.y);
  } else {
    ctx.lineTo(target.x, previous.y);
  }
  ctx.lineTo(target.x, target.y);
}
function _bezierCurveTo(ctx, previous, target, flip3) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(flip3 ? previous.cp1x : previous.cp2x, flip3 ? previous.cp1y : previous.cp2y, flip3 ? target.cp2x : target.cp1x, flip3 ? target.cp2y : target.cp1y, target.x, target.y);
}
function setRenderOpts(ctx, opts) {
  if (opts.translation) {
    ctx.translate(opts.translation[0], opts.translation[1]);
  }
  if (!isNullOrUndef(opts.rotation)) {
    ctx.rotate(opts.rotation);
  }
  if (opts.color) {
    ctx.fillStyle = opts.color;
  }
  if (opts.textAlign) {
    ctx.textAlign = opts.textAlign;
  }
  if (opts.textBaseline) {
    ctx.textBaseline = opts.textBaseline;
  }
}
function decorateText(ctx, x, y, line, opts) {
  if (opts.strikethrough || opts.underline) {
    const metrics = ctx.measureText(line);
    const left = x - metrics.actualBoundingBoxLeft;
    const right = x + metrics.actualBoundingBoxRight;
    const top = y - metrics.actualBoundingBoxAscent;
    const bottom = y + metrics.actualBoundingBoxDescent;
    const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.lineWidth = opts.decorationWidth || 2;
    ctx.moveTo(left, yDecoration);
    ctx.lineTo(right, yDecoration);
    ctx.stroke();
  }
}
function drawBackdrop(ctx, opts) {
  const oldColor = ctx.fillStyle;
  ctx.fillStyle = opts.color;
  ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
  ctx.fillStyle = oldColor;
}
function renderText(ctx, text2, x, y, font, opts = {}) {
  const lines = isArray(text2) ? text2 : [
    text2
  ];
  const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
  let i, line;
  ctx.save();
  ctx.font = font.string;
  setRenderOpts(ctx, opts);
  for (i = 0; i < lines.length; ++i) {
    line = lines[i];
    if (opts.backdrop) {
      drawBackdrop(ctx, opts.backdrop);
    }
    if (stroke) {
      if (opts.strokeColor) {
        ctx.strokeStyle = opts.strokeColor;
      }
      if (!isNullOrUndef(opts.strokeWidth)) {
        ctx.lineWidth = opts.strokeWidth;
      }
      ctx.strokeText(line, x, y, opts.maxWidth);
    }
    ctx.fillText(line, x, y, opts.maxWidth);
    decorateText(ctx, x, y, line, opts);
    y += Number(font.lineHeight);
  }
  ctx.restore();
}
function addRoundedRectPath(ctx, rect) {
  const { x, y, w, h, radius } = rect;
  ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
  ctx.lineTo(x, y + h - radius.bottomLeft);
  ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
  ctx.lineTo(x + w - radius.bottomRight, y + h);
  ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
  ctx.lineTo(x + w, y + radius.topRight);
  ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
  ctx.lineTo(x + radius.topLeft, y);
}
function toLineHeight(value, size2) {
  const matches = ("" + value).match(LINE_HEIGHT);
  if (!matches || matches[1] === "normal") {
    return size2 * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
    case "px":
      return value;
    case "%":
      value /= 100;
      break;
  }
  return size2 * value;
}
function _readValueToProps(value, props) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props[prop]]) : (prop) => value[prop] : () => value;
  for (const prop of keys) {
    ret[prop] = numberOrZero(read(prop));
  }
  return ret;
}
function toTRBL(value) {
  return _readValueToProps(value, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function toTRBLCorners(value) {
  return _readValueToProps(value, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function toPadding(value) {
  const obj = toTRBL(value);
  obj.width = obj.left + obj.right;
  obj.height = obj.top + obj.bottom;
  return obj;
}
function toFont(options2, fallback) {
  options2 = options2 || {};
  fallback = fallback || defaults.font;
  let size2 = valueOrDefault(options2.size, fallback.size);
  if (typeof size2 === "string") {
    size2 = parseInt(size2, 10);
  }
  let style = valueOrDefault(options2.style, fallback.style);
  if (style && !("" + style).match(FONT_STYLE)) {
    console.warn('Invalid font style specified: "' + style + '"');
    style = void 0;
  }
  const font = {
    family: valueOrDefault(options2.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options2.lineHeight, fallback.lineHeight), size2),
    size: size2,
    style,
    weight: valueOrDefault(options2.weight, fallback.weight),
    string: ""
  };
  font.string = toFontString(font);
  return font;
}
function resolve2(inputs, context, index7, info) {
  let cacheable = true;
  let i, ilen, value;
  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i];
    if (value === void 0) {
      continue;
    }
    if (context !== void 0 && typeof value === "function") {
      value = value(context);
      cacheable = false;
    }
    if (index7 !== void 0 && isArray(value)) {
      value = value[index7 % value.length];
      cacheable = false;
    }
    if (value !== void 0) {
      if (info && !cacheable) {
        info.cacheable = false;
      }
      return value;
    }
  }
}
function _addGrace(minmax, grace, beginAtZero) {
  const { min: min2, max: max2 } = minmax;
  const change = toDimension(grace, (max2 - min2) / 2);
  const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
  return {
    min: keepZero(min2, -Math.abs(change)),
    max: keepZero(max2, change)
  };
}
function createContext(parentContext, context) {
  return Object.assign(Object.create(parentContext), context);
}
function _createResolver(scopes, prefixes = [
  ""
], rootScopes, fallback, getTarget = () => scopes[0]) {
  const finalRootScopes = rootScopes || scopes;
  if (typeof fallback === "undefined") {
    fallback = _resolve("_fallback", scopes);
  }
  const cache = {
    [Symbol.toStringTag]: "Object",
    _cacheable: true,
    _scopes: scopes,
    _rootScopes: finalRootScopes,
    _fallback: fallback,
    _getTarget: getTarget,
    override: (scope) => _createResolver([
      scope,
      ...scopes
    ], prefixes, finalRootScopes, fallback)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete target._keys;
      delete scopes[0][prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop) {
      return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(scopes[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return getKeysFromAllScopes(target).includes(prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(target) {
      return getKeysFromAllScopes(target);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      const storage = target._storage || (target._storage = getTarget());
      target[prop] = storage[prop] = value;
      delete target._keys;
      return true;
    }
  });
}
function _attachContext(proxy, context, subProxy, descriptorDefaults) {
  const cache = {
    _cacheable: false,
    _proxy: proxy,
    _context: context,
    _subProxy: subProxy,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: _descriptors(proxy, descriptorDefaults),
    setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
    override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete proxy[prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop, receiver) {
      return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
        enumerable: true,
        configurable: true
      } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(proxy);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return Reflect.has(proxy, prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(proxy);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      proxy[prop] = value;
      delete target[prop];
      return true;
    }
  });
}
function _descriptors(proxy, defaults2 = {
  scriptable: true,
  indexable: true
}) {
  const { _scriptable = defaults2.scriptable, _indexable = defaults2.indexable, _allKeys = defaults2.allKeys } = proxy;
  return {
    allKeys: _allKeys,
    scriptable: _scriptable,
    indexable: _indexable,
    isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
    isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
  };
}
function _cached(target, prop, resolve3) {
  if (Object.prototype.hasOwnProperty.call(target, prop) || prop === "constructor") {
    return target[prop];
  }
  const value = resolve3();
  target[prop] = value;
  return value;
}
function _resolveWithContext(target, prop, receiver) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  let value = _proxy[prop];
  if (isFunction(value) && descriptors2.isScriptable(prop)) {
    value = _resolveScriptable(prop, value, target, receiver);
  }
  if (isArray(value) && value.length) {
    value = _resolveArray(prop, value, target, descriptors2.isIndexable);
  }
  if (needsSubResolver(prop, value)) {
    value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
  }
  return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
  const { _proxy, _context, _subProxy, _stack } = target;
  if (_stack.has(prop)) {
    throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
  }
  _stack.add(prop);
  let value = getValue(_context, _subProxy || receiver);
  _stack.delete(prop);
  if (needsSubResolver(prop, value)) {
    value = createSubResolver(_proxy._scopes, _proxy, prop, value);
  }
  return value;
}
function _resolveArray(prop, value, target, isIndexable) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  if (typeof _context.index !== "undefined" && isIndexable(prop)) {
    return value[_context.index % value.length];
  } else if (isObject(value[0])) {
    const arr = value;
    const scopes = _proxy._scopes.filter((s2) => s2 !== arr);
    value = [];
    for (const item of arr) {
      const resolver = createSubResolver(scopes, _proxy, prop, item);
      value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
    }
  }
  return value;
}
function resolveFallback(fallback, prop, value) {
  return isFunction(fallback) ? fallback(prop, value) : fallback;
}
function addScopes(set2, parentScopes, key2, parentFallback, value) {
  for (const parent of parentScopes) {
    const scope = getScope(key2, parent);
    if (scope) {
      set2.add(scope);
      const fallback = resolveFallback(scope._fallback, key2, value);
      if (typeof fallback !== "undefined" && fallback !== key2 && fallback !== parentFallback) {
        return fallback;
      }
    } else if (scope === false && typeof parentFallback !== "undefined" && key2 !== parentFallback) {
      return null;
    }
  }
  return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
  const rootScopes = resolver._rootScopes;
  const fallback = resolveFallback(resolver._fallback, prop, value);
  const allScopes = [
    ...parentScopes,
    ...rootScopes
  ];
  const set2 = /* @__PURE__ */ new Set();
  set2.add(value);
  let key2 = addScopesFromKey(set2, allScopes, prop, fallback || prop, value);
  if (key2 === null) {
    return false;
  }
  if (typeof fallback !== "undefined" && fallback !== prop) {
    key2 = addScopesFromKey(set2, allScopes, fallback, key2, value);
    if (key2 === null) {
      return false;
    }
  }
  return _createResolver(Array.from(set2), [
    ""
  ], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set2, allScopes, key2, fallback, item) {
  while (key2) {
    key2 = addScopes(set2, allScopes, key2, fallback, item);
  }
  return key2;
}
function subGetTarget(resolver, prop, value) {
  const parent = resolver._getTarget();
  if (!(prop in parent)) {
    parent[prop] = {};
  }
  const target = parent[prop];
  if (isArray(target) && isObject(value)) {
    return value;
  }
  return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
  let value;
  for (const prefix of prefixes) {
    value = _resolve(readKey(prefix, prop), scopes);
    if (typeof value !== "undefined") {
      return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
    }
  }
}
function _resolve(key2, scopes) {
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }
    const value = scope[key2];
    if (typeof value !== "undefined") {
      return value;
    }
  }
}
function getKeysFromAllScopes(target) {
  let keys = target._keys;
  if (!keys) {
    keys = target._keys = resolveKeysFromAllScopes(target._scopes);
  }
  return keys;
}
function resolveKeysFromAllScopes(scopes) {
  const set2 = /* @__PURE__ */ new Set();
  for (const scope of scopes) {
    for (const key2 of Object.keys(scope).filter((k) => !k.startsWith("_"))) {
      set2.add(key2);
    }
  }
  return Array.from(set2);
}
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;
  const d01 = distanceBetweenPoints(current, previous);
  const d12 = distanceBetweenPoints(next, current);
  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;
  const fa = t * s01;
  const fb = t * s12;
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y)
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y)
    }
  };
}
function monotoneAdjust(points, deltaK, mK) {
  const pointsLen = points.length;
  let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen - 1; ++i) {
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent || !pointAfter) {
      continue;
    }
    if (almostEquals(deltaK[i], 0, EPSILON)) {
      mK[i] = mK[i + 1] = 0;
      continue;
    }
    alphaK = mK[i] / deltaK[i];
    betaK = mK[i + 1] / deltaK[i];
    squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
    if (squaredMagnitude <= 9) {
      continue;
    }
    tauK = 3 / Math.sqrt(squaredMagnitude);
    mK[i] = alphaK * tauK * deltaK[i];
    mK[i + 1] = betaK * tauK * deltaK[i];
  }
}
function monotoneCompute(points, mK, indexAxis = "x") {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  let delta, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    const iPixel = pointCurrent[indexAxis];
    const vPixel = pointCurrent[valueAxis];
    if (pointBefore) {
      delta = (iPixel - pointBefore[indexAxis]) / 3;
      pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
      pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
    }
    if (pointAfter) {
      delta = (pointAfter[indexAxis] - iPixel) / 3;
      pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
      pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
    }
  }
}
function splineCurveMonotone(points, indexAxis = "x") {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  const deltaK = Array(pointsLen).fill(0);
  const mK = Array(pointsLen);
  let i, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    if (pointAfter) {
      const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
      deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
    }
    mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
  }
  monotoneAdjust(points, deltaK, mK);
  monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min2, max2) {
  return Math.max(Math.min(pt, max2), min2);
}
function capBezierPoints(points, area) {
  let i, ilen, point, inArea, inAreaPrev;
  let inAreaNext = _isPointInArea(points[0], area);
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    inAreaPrev = inArea;
    inArea = inAreaNext;
    inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
    if (!inArea) {
      continue;
    }
    point = points[i];
    if (inAreaPrev) {
      point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
      point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
    }
    if (inAreaNext) {
      point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
      point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
    }
  }
}
function _updateBezierControlPoints(points, options2, area, loop, indexAxis) {
  let i, ilen, point, controlPoints;
  if (options2.spanGaps) {
    points = points.filter((pt) => !pt.skip);
  }
  if (options2.cubicInterpolationMode === "monotone") {
    splineCurveMonotone(points, indexAxis);
  } else {
    let prev = loop ? points[points.length - 1] : points[0];
    for (i = 0, ilen = points.length; i < ilen; ++i) {
      point = points[i];
      controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options2.tension);
      point.cp1x = controlPoints.previous.x;
      point.cp1y = controlPoints.previous.y;
      point.cp2x = controlPoints.next.x;
      point.cp2y = controlPoints.next.y;
      prev = point;
    }
  }
  if (options2.capBezierPoints) {
    capBezierPoints(points, area);
  }
}
function _isDomSupported() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function _getParentNode(domNode) {
  let parent = domNode.parentNode;
  if (parent && parent.toString() === "[object ShadowRoot]") {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  let valueInPixels;
  if (typeof styleValue === "string") {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf("%") !== -1) {
      valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
function getStyle(el, property) {
  return getComputedStyle2(el).getPropertyValue(property);
}
function getPositionedStyle(styles, style, suffix) {
  const result = {};
  suffix = suffix ? "-" + suffix : "";
  for (let i = 0; i < 4; i++) {
    const pos = positions[i];
    result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
  }
  result.width = result.left + result.right;
  result.height = result.top + result.bottom;
  return result;
}
function getCanvasPosition(e, canvas) {
  const touches = e.touches;
  const source = touches && touches.length ? touches[0] : e;
  const { offsetX, offsetY } = source;
  let box = false;
  let x, y;
  if (useOffsetPos(offsetX, offsetY, e.target)) {
    x = offsetX;
    y = offsetY;
  } else {
    const rect = canvas.getBoundingClientRect();
    x = source.clientX - rect.left;
    y = source.clientY - rect.top;
    box = true;
  }
  return {
    x,
    y,
    box
  };
}
function getRelativePosition(event, chart2) {
  if ("native" in event) {
    return event;
  }
  const { canvas, currentDevicePixelRatio } = chart2;
  const style = getComputedStyle2(canvas);
  const borderBox = style.boxSizing === "border-box";
  const paddings = getPositionedStyle(style, "padding");
  const borders = getPositionedStyle(style, "border", "width");
  const { x, y, box } = getCanvasPosition(event, canvas);
  const xOffset = paddings.left + (box && borders.left);
  const yOffset = paddings.top + (box && borders.top);
  let { width, height } = chart2;
  if (borderBox) {
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  return {
    x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
    y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
  };
}
function getContainerSize(canvas, width, height) {
  let maxWidth, maxHeight;
  if (width === void 0 || height === void 0) {
    const container = canvas && _getParentNode(canvas);
    if (!container) {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    } else {
      const rect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle2(container);
      const containerBorder = getPositionedStyle(containerStyle, "border", "width");
      const containerPadding = getPositionedStyle(containerStyle, "padding");
      width = rect.width - containerPadding.width - containerBorder.width;
      height = rect.height - containerPadding.height - containerBorder.height;
      maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
      maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
    }
  }
  return {
    width,
    height,
    maxWidth: maxWidth || INFINITY,
    maxHeight: maxHeight || INFINITY
  };
}
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
  const style = getComputedStyle2(canvas);
  const margins = getPositionedStyle(style, "margin");
  const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
  const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
  const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
  let { width, height } = containerSize;
  if (style.boxSizing === "content-box") {
    const borders = getPositionedStyle(style, "border", "width");
    const paddings = getPositionedStyle(style, "padding");
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  width = Math.max(0, width - margins.width);
  height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
  width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
  height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
  if (width && !height) {
    height = round1(width / 2);
  }
  const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
  if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
    height = containerSize.height;
    width = round1(Math.floor(height * aspectRatio));
  }
  return {
    width,
    height
  };
}
function retinaScale(chart2, forceRatio, forceStyle) {
  const pixelRatio = forceRatio || 1;
  const deviceHeight = Math.floor(chart2.height * pixelRatio);
  const deviceWidth = Math.floor(chart2.width * pixelRatio);
  chart2.height = Math.floor(chart2.height);
  chart2.width = Math.floor(chart2.width);
  const canvas = chart2.canvas;
  if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
    canvas.style.height = `${chart2.height}px`;
    canvas.style.width = `${chart2.width}px`;
  }
  if (chart2.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
    chart2.currentDevicePixelRatio = pixelRatio;
    canvas.height = deviceHeight;
    canvas.width = deviceWidth;
    chart2.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return true;
  }
  return false;
}
function readUsedSize(element, property) {
  const value = getStyle(element, property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : void 0;
}
function _pointInLine(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y)
  };
}
function _steppedInterpolation(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: mode === "middle" ? t < 0.5 ? p1.y : p2.y : mode === "after" ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
  };
}
function _bezierInterpolation(p1, p2, t, mode) {
  const cp1 = {
    x: p1.cp2x,
    y: p1.cp2y
  };
  const cp2 = {
    x: p2.cp1x,
    y: p2.cp1y
  };
  const a = _pointInLine(p1, cp1, t);
  const b = _pointInLine(cp1, cp2, t);
  const c = _pointInLine(cp2, p2, t);
  const d = _pointInLine(a, b, t);
  const e = _pointInLine(b, c, t);
  return _pointInLine(d, e, t);
}
function getRtlAdapter(rtl, rectX, width) {
  return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
  let style, original;
  if (direction === "ltr" || direction === "rtl") {
    style = ctx.canvas.style;
    original = [
      style.getPropertyValue("direction"),
      style.getPropertyPriority("direction")
    ];
    style.setProperty("direction", direction, "important");
    ctx.prevTextDirection = original;
  }
}
function restoreTextDirection(ctx, original) {
  if (original !== void 0) {
    delete ctx.prevTextDirection;
    ctx.canvas.style.setProperty("direction", original[0], original[1]);
  }
}
function propertyFn(property) {
  if (property === "angle") {
    return {
      between: _angleBetween,
      compare: _angleDiff,
      normalize: _normalizeAngle
    };
  }
  return {
    between: _isBetween,
    compare: (a, b) => a - b,
    normalize: (x) => x
  };
}
function normalizeSegment({ start, end, count, loop, style }) {
  return {
    start: start % count,
    end: end % count,
    loop: loop && (end - start + 1) % count === 0,
    style
  };
}
function getSegment(segment, points, bounds) {
  const { property, start: startBound, end: endBound } = bounds;
  const { between, normalize } = propertyFn(property);
  const count = points.length;
  let { start, end, loop } = segment;
  let i, ilen;
  if (loop) {
    start += count;
    end += count;
    for (i = 0, ilen = count; i < ilen; ++i) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }
  if (end < start) {
    end += count;
  }
  return {
    start,
    end,
    loop,
    style: segment.style
  };
}
function _boundSegment(segment, points, bounds) {
  if (!bounds) {
    return [
      segment
    ];
  }
  const { property, start: startBound, end: endBound } = bounds;
  const count = points.length;
  const { compare, between, normalize } = propertyFn(property);
  const { start, end, loop, style } = getSegment(segment, points, bounds);
  const result = [];
  let inside = false;
  let subStart = null;
  let value, point, prevValue;
  const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
  const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
  const shouldStart = () => inside || startIsBefore();
  const shouldStop = () => !inside || endIsBefore();
  for (let i = start, prev = start; i <= end; ++i) {
    point = points[i % count];
    if (point.skip) {
      continue;
    }
    value = normalize(point[property]);
    if (value === prevValue) {
      continue;
    }
    inside = between(value, startBound, endBound);
    if (subStart === null && shouldStart()) {
      subStart = compare(value, startBound) === 0 ? i : prev;
    }
    if (subStart !== null && shouldStop()) {
      result.push(normalizeSegment({
        start: subStart,
        end: i,
        loop,
        count,
        style
      }));
      subStart = null;
    }
    prev = i;
    prevValue = value;
  }
  if (subStart !== null) {
    result.push(normalizeSegment({
      start: subStart,
      end,
      loop,
      count,
      style
    }));
  }
  return result;
}
function _boundSegments(line, bounds) {
  const result = [];
  const segments = line.segments;
  for (let i = 0; i < segments.length; i++) {
    const sub = _boundSegment(segments[i], line.points, bounds);
    if (sub.length) {
      result.push(...sub);
    }
  }
  return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
  let start = 0;
  let end = count - 1;
  if (loop && !spanGaps) {
    while (start < count && !points[start].skip) {
      start++;
    }
  }
  while (start < count && points[start].skip) {
    start++;
  }
  start %= count;
  if (loop) {
    end += start;
  }
  while (end > start && points[end % count].skip) {
    end--;
  }
  end %= count;
  return {
    start,
    end
  };
}
function solidSegments(points, start, max2, loop) {
  const count = points.length;
  const result = [];
  let last = start;
  let prev = points[start];
  let end;
  for (end = start + 1; end <= max2; ++end) {
    const cur = points[end % count];
    if (cur.skip || cur.stop) {
      if (!prev.skip) {
        loop = false;
        result.push({
          start: start % count,
          end: (end - 1) % count,
          loop
        });
        start = last = cur.stop ? end : null;
      }
    } else {
      last = end;
      if (prev.skip) {
        start = end;
      }
    }
    prev = cur;
  }
  if (last !== null) {
    result.push({
      start: start % count,
      end: last % count,
      loop
    });
  }
  return result;
}
function _computeSegments(line, segmentOptions) {
  const points = line.points;
  const spanGaps = line.options.spanGaps;
  const count = points.length;
  if (!count) {
    return [];
  }
  const loop = !!line._loop;
  const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
  if (spanGaps === true) {
    return splitByStyles(line, [
      {
        start,
        end,
        loop
      }
    ], points, segmentOptions);
  }
  const max2 = end < start ? end + count : end;
  const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
  return splitByStyles(line, solidSegments(points, start, max2, completeLoop), points, segmentOptions);
}
function splitByStyles(line, segments, points, segmentOptions) {
  if (!segmentOptions || !segmentOptions.setContext || !points) {
    return segments;
  }
  return doSplitByStyles(line, segments, points, segmentOptions);
}
function doSplitByStyles(line, segments, points, segmentOptions) {
  const chartContext = line._chart.getContext();
  const baseStyle = readStyle(line.options);
  const { _datasetIndex: datasetIndex, options: { spanGaps } } = line;
  const count = points.length;
  const result = [];
  let prevStyle = baseStyle;
  let start = segments[0].start;
  let i = start;
  function addStyle(s2, e, l, st) {
    const dir = spanGaps ? -1 : 1;
    if (s2 === e) {
      return;
    }
    s2 += count;
    while (points[s2 % count].skip) {
      s2 -= dir;
    }
    while (points[e % count].skip) {
      e += dir;
    }
    if (s2 % count !== e % count) {
      result.push({
        start: s2 % count,
        end: e % count,
        loop: l,
        style: st
      });
      prevStyle = st;
      start = e % count;
    }
  }
  for (const segment of segments) {
    start = spanGaps ? start : segment.start;
    let prev = points[start % count];
    let style;
    for (i = start + 1; i <= segment.end; i++) {
      const pt = points[i % count];
      style = readStyle(segmentOptions.setContext(createContext(chartContext, {
        type: "segment",
        p0: prev,
        p1: pt,
        p0DataIndex: (i - 1) % count,
        p1DataIndex: i % count,
        datasetIndex
      })));
      if (styleChanged(style, prevStyle)) {
        addStyle(start, i - 1, segment.loop, prevStyle);
      }
      prev = pt;
      prevStyle = style;
    }
    if (start < i - 1) {
      addStyle(start, i - 1, segment.loop, prevStyle);
    }
  }
  return result;
}
function readStyle(options2) {
  return {
    backgroundColor: options2.backgroundColor,
    borderCapStyle: options2.borderCapStyle,
    borderDash: options2.borderDash,
    borderDashOffset: options2.borderDashOffset,
    borderJoinStyle: options2.borderJoinStyle,
    borderWidth: options2.borderWidth,
    borderColor: options2.borderColor
  };
}
function styleChanged(style, prevStyle) {
  if (!prevStyle) {
    return false;
  }
  const cache = [];
  const replacer = function(key2, value) {
    if (!isPatternOrGradient(value)) {
      return value;
    }
    if (!cache.includes(value)) {
      cache.push(value);
    }
    return cache.indexOf(value);
  };
  return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
}
var uid, toDimension, keyResolvers, defined, isFunction, setsEqual, PI, TAU, PITAU, INFINITY, RAD_PER_DEG, HALF_PI, QUARTER_PI, TWO_THIRDS_PI, log10, sign, _lookupByKey, _rlookupByKey, arrayEvents, requestAnimFrame, _toLeftRightCenter, _alignStartEnd, _textX, atEdge, elasticIn, elasticOut, effects, numbers, colors, intlCache, formatters, Ticks, overrides, descriptors, Defaults, defaults, LINE_HEIGHT, FONT_STYLE, numberOrZero, readKey, needsSubResolver, getScope, EPSILON, getPoint, getValueAxis, getComputedStyle2, positions, useOffsetPos, round1, supportsEventListenerOptions, getRightToLeftAdapter, getLeftToRightAdapter;
var init_helpers_segment = __esm({
  "node_modules/chart.js/dist/chunks/helpers.segment.js"() {
    init_color_esm();
    uid = /* @__PURE__ */ (() => {
      let id = 0;
      return () => id++;
    })();
    toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
    keyResolvers = {
      // Chart.helpers.core resolveObjectKey should resolve empty key to root object
      "": (v) => v,
      // default resolvers
      x: (o) => o.x,
      y: (o) => o.y
    };
    defined = (value) => typeof value !== "undefined";
    isFunction = (value) => typeof value === "function";
    setsEqual = (a, b) => {
      if (a.size !== b.size) {
        return false;
      }
      for (const item of a) {
        if (!b.has(item)) {
          return false;
        }
      }
      return true;
    };
    PI = Math.PI;
    TAU = 2 * PI;
    PITAU = TAU + PI;
    INFINITY = Number.POSITIVE_INFINITY;
    RAD_PER_DEG = PI / 180;
    HALF_PI = PI / 2;
    QUARTER_PI = PI / 4;
    TWO_THIRDS_PI = PI * 2 / 3;
    log10 = Math.log10;
    sign = Math.sign;
    _lookupByKey = (table, key2, value, last) => _lookup(table, value, last ? (index7) => {
      const ti = table[index7][key2];
      return ti < value || ti === value && table[index7 + 1][key2] === value;
    } : (index7) => table[index7][key2] < value);
    _rlookupByKey = (table, key2, value) => _lookup(table, value, (index7) => table[index7][key2] >= value);
    arrayEvents = [
      "push",
      "pop",
      "shift",
      "splice",
      "unshift"
    ];
    requestAnimFrame = function() {
      if (typeof window === "undefined") {
        return function(callback2) {
          return callback2();
        };
      }
      return window.requestAnimationFrame;
    }();
    _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
    _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
    _textX = (align, left, right, rtl) => {
      const check = rtl ? "left" : "right";
      return align === check ? right : align === "center" ? (left + right) / 2 : left;
    };
    atEdge = (t) => t === 0 || t === 1;
    elasticIn = (t, s2, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s2) * TAU / p));
    elasticOut = (t, s2, p) => Math.pow(2, -10 * t) * Math.sin((t - s2) * TAU / p) + 1;
    effects = {
      linear: (t) => t,
      easeInQuad: (t) => t * t,
      easeOutQuad: (t) => -t * (t - 2),
      easeInOutQuad: (t) => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
      easeInCubic: (t) => t * t * t,
      easeOutCubic: (t) => (t -= 1) * t * t + 1,
      easeInOutCubic: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
      easeInQuart: (t) => t * t * t * t,
      easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
      easeInOutQuart: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
      easeInQuint: (t) => t * t * t * t * t,
      easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
      easeInOutQuint: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
      easeInSine: (t) => -Math.cos(t * HALF_PI) + 1,
      easeOutSine: (t) => Math.sin(t * HALF_PI),
      easeInOutSine: (t) => -0.5 * (Math.cos(PI * t) - 1),
      easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
      easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
      easeInOutExpo: (t) => atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
      easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
      easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
      easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
      easeInElastic: (t) => atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
      easeOutElastic: (t) => atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
      easeInOutElastic(t) {
        const s2 = 0.1125;
        const p = 0.45;
        return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s2, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s2, p);
      },
      easeInBack(t) {
        const s2 = 1.70158;
        return t * t * ((s2 + 1) * t - s2);
      },
      easeOutBack(t) {
        const s2 = 1.70158;
        return (t -= 1) * t * ((s2 + 1) * t + s2) + 1;
      },
      easeInOutBack(t) {
        let s2 = 1.70158;
        if ((t /= 0.5) < 1) {
          return 0.5 * (t * t * (((s2 *= 1.525) + 1) * t - s2));
        }
        return 0.5 * ((t -= 2) * t * (((s2 *= 1.525) + 1) * t + s2) + 2);
      },
      easeInBounce: (t) => 1 - effects.easeOutBounce(1 - t),
      easeOutBounce(t) {
        const m = 7.5625;
        const d = 2.75;
        if (t < 1 / d) {
          return m * t * t;
        }
        if (t < 2 / d) {
          return m * (t -= 1.5 / d) * t + 0.75;
        }
        if (t < 2.5 / d) {
          return m * (t -= 2.25 / d) * t + 0.9375;
        }
        return m * (t -= 2.625 / d) * t + 0.984375;
      },
      easeInOutBounce: (t) => t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
    };
    numbers = [
      "x",
      "y",
      "borderWidth",
      "radius",
      "tension"
    ];
    colors = [
      "color",
      "borderColor",
      "backgroundColor"
    ];
    intlCache = /* @__PURE__ */ new Map();
    formatters = {
      values(value) {
        return isArray(value) ? value : "" + value;
      },
      numeric(tickValue, index7, ticks) {
        if (tickValue === 0) {
          return "0";
        }
        const locale = this.chart.options.locale;
        let notation;
        let delta = tickValue;
        if (ticks.length > 1) {
          const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
          if (maxTick < 1e-4 || maxTick > 1e15) {
            notation = "scientific";
          }
          delta = calculateDelta(tickValue, ticks);
        }
        const logDelta = log10(Math.abs(delta));
        const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
        const options2 = {
          notation,
          minimumFractionDigits: numDecimal,
          maximumFractionDigits: numDecimal
        };
        Object.assign(options2, this.options.ticks.format);
        return formatNumber(tickValue, locale, options2);
      },
      logarithmic(tickValue, index7, ticks) {
        if (tickValue === 0) {
          return "0";
        }
        const remain = ticks[index7].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
        if ([
          1,
          2,
          3,
          5,
          10,
          15
        ].includes(remain) || index7 > 0.8 * ticks.length) {
          return formatters.numeric.call(this, tickValue, index7, ticks);
        }
        return "";
      }
    };
    Ticks = {
      formatters
    };
    overrides = /* @__PURE__ */ Object.create(null);
    descriptors = /* @__PURE__ */ Object.create(null);
    Defaults = class {
      constructor(_descriptors2, _appliers) {
        this.animation = void 0;
        this.backgroundColor = "rgba(0,0,0,0.1)";
        this.borderColor = "rgba(0,0,0,0.1)";
        this.color = "#666";
        this.datasets = {};
        this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
        this.elements = {};
        this.events = [
          "mousemove",
          "mouseout",
          "click",
          "touchstart",
          "touchmove"
        ];
        this.font = {
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 12,
          style: "normal",
          lineHeight: 1.2,
          weight: null
        };
        this.hover = {};
        this.hoverBackgroundColor = (ctx, options2) => getHoverColor(options2.backgroundColor);
        this.hoverBorderColor = (ctx, options2) => getHoverColor(options2.borderColor);
        this.hoverColor = (ctx, options2) => getHoverColor(options2.color);
        this.indexAxis = "x";
        this.interaction = {
          mode: "nearest",
          intersect: true,
          includeInvisible: false
        };
        this.maintainAspectRatio = true;
        this.onHover = null;
        this.onClick = null;
        this.parsing = true;
        this.plugins = {};
        this.responsive = true;
        this.scale = void 0;
        this.scales = {};
        this.showLine = true;
        this.drawActiveElementsOnTop = true;
        this.describe(_descriptors2);
        this.apply(_appliers);
      }
      set(scope, values) {
        return set(this, scope, values);
      }
      get(scope) {
        return getScope$1(this, scope);
      }
      describe(scope, values) {
        return set(descriptors, scope, values);
      }
      override(scope, values) {
        return set(overrides, scope, values);
      }
      route(scope, name, targetScope, targetName) {
        const scopeObject = getScope$1(this, scope);
        const targetScopeObject = getScope$1(this, targetScope);
        const privateName = "_" + name;
        Object.defineProperties(scopeObject, {
          [privateName]: {
            value: scopeObject[name],
            writable: true
          },
          [name]: {
            enumerable: true,
            get() {
              const local = this[privateName];
              const target = targetScopeObject[targetName];
              if (isObject(local)) {
                return Object.assign({}, target, local);
              }
              return valueOrDefault(local, target);
            },
            set(value) {
              this[privateName] = value;
            }
          }
        });
      }
      apply(appliers) {
        appliers.forEach((apply) => apply(this));
      }
    };
    defaults = /* @__PURE__ */ new Defaults({
      _scriptable: (name) => !name.startsWith("on"),
      _indexable: (name) => name !== "events",
      hover: {
        _fallback: "interaction"
      },
      interaction: {
        _scriptable: false,
        _indexable: false
      }
    }, [
      applyAnimationsDefaults,
      applyLayoutsDefaults,
      applyScaleDefaults
    ]);
    LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
    FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
    numberOrZero = (v) => +v || 0;
    readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
    needsSubResolver = (prop, value) => isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
    getScope = (key2, parent) => key2 === true ? parent : typeof key2 === "string" ? resolveObjectKey(parent, key2) : void 0;
    EPSILON = Number.EPSILON || 1e-14;
    getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
    getValueAxis = (indexAxis) => indexAxis === "x" ? "y" : "x";
    getComputedStyle2 = (element) => element.ownerDocument.defaultView.getComputedStyle(element, null);
    positions = [
      "top",
      "right",
      "bottom",
      "left"
    ];
    useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
    round1 = (v) => Math.round(v * 10) / 10;
    supportsEventListenerOptions = function() {
      let passiveSupported = false;
      try {
        const options2 = {
          get passive() {
            passiveSupported = true;
            return false;
          }
        };
        if (_isDomSupported()) {
          window.addEventListener("test", null, options2);
          window.removeEventListener("test", null, options2);
        }
      } catch (e) {
      }
      return passiveSupported;
    }();
    getRightToLeftAdapter = function(rectX, width) {
      return {
        x(x) {
          return rectX + rectX + width - x;
        },
        setWidth(w) {
          width = w;
        },
        textAlign(align) {
          if (align === "center") {
            return align;
          }
          return align === "right" ? "left" : "right";
        },
        xPlus(x, value) {
          return x - value;
        },
        leftForLtr(x, itemWidth) {
          return x - itemWidth;
        }
      };
    };
    getLeftToRightAdapter = function() {
      return {
        x(x) {
          return x;
        },
        setWidth(w) {
        },
        textAlign(align) {
          return align;
        },
        xPlus(x, value) {
          return x + value;
        },
        leftForLtr(x, _itemWidth) {
          return x;
        }
      };
    };
  }
});

// node_modules/chart.js/dist/chart.js
function awaitAll(animations, properties) {
  const running = [];
  const keys = Object.keys(properties);
  for (let i = 0; i < keys.length; i++) {
    const anim = animations[keys[i]];
    if (anim && anim.active()) {
      running.push(anim.wait());
    }
  }
  return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
  if (!newOptions) {
    return;
  }
  let options2 = target.options;
  if (!options2) {
    target.options = newOptions;
    return;
  }
  if (options2.$shared) {
    target.options = options2 = Object.assign({}, options2, {
      $shared: false,
      $animations: {}
    });
  }
  return options2;
}
function scaleClip(scale, allowedOverflow) {
  const opts = scale && scale.options || {};
  const reverse = opts.reverse;
  const min2 = opts.min === void 0 ? allowedOverflow : 0;
  const max2 = opts.max === void 0 ? allowedOverflow : 0;
  return {
    start: reverse ? max2 : min2,
    end: reverse ? min2 : max2
  };
}
function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  const x = scaleClip(xScale, allowedOverflow);
  const y = scaleClip(yScale, allowedOverflow);
  return {
    top: y.end,
    right: x.end,
    bottom: y.start,
    left: x.start
  };
}
function toClip(value) {
  let t, r, b, l;
  if (isObject(value)) {
    t = value.top;
    r = value.right;
    b = value.bottom;
    l = value.left;
  } else {
    t = r = b = l = value;
  }
  return {
    top: t,
    right: r,
    bottom: b,
    left: l,
    disabled: value === false
  };
}
function getSortedDatasetIndices(chart2, filterVisible) {
  const keys = [];
  const metasets = chart2._getSortedDatasetMetas(filterVisible);
  let i, ilen;
  for (i = 0, ilen = metasets.length; i < ilen; ++i) {
    keys.push(metasets[i].index);
  }
  return keys;
}
function applyStack(stack, value, dsIndex, options2 = {}) {
  const keys = stack.keys;
  const singleMode = options2.mode === "single";
  let i, ilen, datasetIndex, otherValue;
  if (value === null) {
    return;
  }
  let found = false;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    datasetIndex = +keys[i];
    if (datasetIndex === dsIndex) {
      found = true;
      if (options2.all) {
        continue;
      }
      break;
    }
    otherValue = stack.values[datasetIndex];
    if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
      value += otherValue;
    }
  }
  if (!found && !options2.all) {
    return 0;
  }
  return value;
}
function convertObjectDataToArray(data, meta) {
  const { iScale, vScale } = meta;
  const iAxisKey = iScale.axis === "x" ? "x" : "y";
  const vAxisKey = vScale.axis === "x" ? "x" : "y";
  const keys = Object.keys(data);
  const adata = new Array(keys.length);
  let i, ilen, key2;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    key2 = keys[i];
    adata[i] = {
      [iAxisKey]: key2,
      [vAxisKey]: data[key2]
    };
  }
  return adata;
}
function isStacked(scale, meta) {
  const stacked = scale && scale.options.stacked;
  return stacked || stacked === void 0 && meta.stack !== void 0;
}
function getStackKey(indexScale, valueScale, meta) {
  return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
  const { min: min2, max: max2, minDefined, maxDefined } = scale.getUserBounds();
  return {
    min: minDefined ? min2 : Number.NEGATIVE_INFINITY,
    max: maxDefined ? max2 : Number.POSITIVE_INFINITY
  };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
  const subStack = stacks[stackKey] || (stacks[stackKey] = {});
  return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
  for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
    const value = stack[meta.index];
    if (positive && value > 0 || !positive && value < 0) {
      return meta.index;
    }
  }
  return null;
}
function updateStacks(controller, parsed) {
  const { chart: chart2, _cachedMeta: meta } = controller;
  const stacks = chart2._stacks || (chart2._stacks = {});
  const { iScale, vScale, index: datasetIndex } = meta;
  const iAxis = iScale.axis;
  const vAxis = vScale.axis;
  const key2 = getStackKey(iScale, vScale, meta);
  const ilen = parsed.length;
  let stack;
  for (let i = 0; i < ilen; ++i) {
    const item = parsed[i];
    const { [iAxis]: index7, [vAxis]: value } = item;
    const itemStacks = item._stacks || (item._stacks = {});
    stack = itemStacks[vAxis] = getOrCreateStack(stacks, key2, index7);
    stack[datasetIndex] = value;
    stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
    stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
    const visualValues = stack._visualValues || (stack._visualValues = {});
    visualValues[datasetIndex] = value;
  }
}
function getFirstScaleId(chart2, axis) {
  const scales = chart2.scales;
  return Object.keys(scales).filter((key2) => scales[key2].axis === axis).shift();
}
function createDatasetContext(parent, index7) {
  return createContext(parent, {
    active: false,
    dataset: void 0,
    datasetIndex: index7,
    index: index7,
    mode: "default",
    type: "dataset"
  });
}
function createDataContext(parent, index7, element) {
  return createContext(parent, {
    active: false,
    dataIndex: index7,
    parsed: void 0,
    raw: void 0,
    element,
    index: index7,
    mode: "default",
    type: "data"
  });
}
function clearStacks(meta, items) {
  const datasetIndex = meta.controller.index;
  const axis = meta.vScale && meta.vScale.axis;
  if (!axis) {
    return;
  }
  items = items || meta._parsed;
  for (const parsed of items) {
    const stacks = parsed._stacks;
    if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) {
      return;
    }
    delete stacks[axis][datasetIndex];
    if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) {
      delete stacks[axis]._visualValues[datasetIndex];
    }
  }
}
function abstract() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
function binarySearch(metaset, axis, value, intersect) {
  const { controller, data, _sorted } = metaset;
  const iScale = controller._cachedMeta.iScale;
  const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
  if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
    const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
    if (!intersect) {
      const result = lookupMethod(data, axis, value);
      if (spanGaps) {
        const { vScale } = controller._cachedMeta;
        const { _parsed } = metaset;
        const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        result.lo -= Math.max(0, distanceToDefinedLo);
        const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        result.hi += Math.max(0, distanceToDefinedHi);
      }
      return result;
    } else if (controller._sharedOptions) {
      const el = data[0];
      const range = typeof el.getRange === "function" && el.getRange(axis);
      if (range) {
        const start = lookupMethod(data, axis, value - range);
        const end = lookupMethod(data, axis, value + range);
        return {
          lo: start.lo,
          hi: end.hi
        };
      }
    }
  }
  return {
    lo: 0,
    hi: data.length - 1
  };
}
function evaluateInteractionItems(chart2, axis, position, handler, intersect) {
  const metasets = chart2.getSortedVisibleDatasetMetas();
  const value = position[axis];
  for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
    const { index: index7, data } = metasets[i];
    const { lo, hi } = binarySearch(metasets[i], axis, value, intersect);
    for (let j = lo; j <= hi; ++j) {
      const element = data[j];
      if (!element.skip) {
        handler(element, index7, j);
      }
    }
  }
}
function getDistanceMetricForAxis(axis) {
  const useX = axis.indexOf("x") !== -1;
  const useY = axis.indexOf("y") !== -1;
  return function(pt1, pt2) {
    const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
    const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
}
function getIntersectItems(chart2, position, axis, useFinalPosition, includeInvisible) {
  const items = [];
  if (!includeInvisible && !chart2.isPointInArea(position)) {
    return items;
  }
  const evaluationFunc = function(element, datasetIndex, index7) {
    if (!includeInvisible && !_isPointInArea(element, chart2.chartArea, 0)) {
      return;
    }
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index: index7
      });
    }
  };
  evaluateInteractionItems(chart2, axis, position, evaluationFunc, true);
  return items;
}
function getNearestRadialItems(chart2, position, axis, useFinalPosition) {
  let items = [];
  function evaluationFunc(element, datasetIndex, index7) {
    const { startAngle, endAngle } = element.getProps([
      "startAngle",
      "endAngle"
    ], useFinalPosition);
    const { angle } = getAngleFromPoint(element, {
      x: position.x,
      y: position.y
    });
    if (_angleBetween(angle, startAngle, endAngle)) {
      items.push({
        element,
        datasetIndex,
        index: index7
      });
    }
  }
  evaluateInteractionItems(chart2, axis, position, evaluationFunc);
  return items;
}
function getNearestCartesianItems(chart2, position, axis, intersect, useFinalPosition, includeInvisible) {
  let items = [];
  const distanceMetric = getDistanceMetricForAxis(axis);
  let minDistance = Number.POSITIVE_INFINITY;
  function evaluationFunc(element, datasetIndex, index7) {
    const inRange = element.inRange(position.x, position.y, useFinalPosition);
    if (intersect && !inRange) {
      return;
    }
    const center = element.getCenterPoint(useFinalPosition);
    const pointInArea = !!includeInvisible || chart2.isPointInArea(center);
    if (!pointInArea && !inRange) {
      return;
    }
    const distance = distanceMetric(position, center);
    if (distance < minDistance) {
      items = [
        {
          element,
          datasetIndex,
          index: index7
        }
      ];
      minDistance = distance;
    } else if (distance === minDistance) {
      items.push({
        element,
        datasetIndex,
        index: index7
      });
    }
  }
  evaluateInteractionItems(chart2, axis, position, evaluationFunc);
  return items;
}
function getNearestItems(chart2, position, axis, intersect, useFinalPosition, includeInvisible) {
  if (!includeInvisible && !chart2.isPointInArea(position)) {
    return [];
  }
  return axis === "r" && !intersect ? getNearestRadialItems(chart2, position, axis, useFinalPosition) : getNearestCartesianItems(chart2, position, axis, intersect, useFinalPosition, includeInvisible);
}
function getAxisItems(chart2, position, axis, intersect, useFinalPosition) {
  const items = [];
  const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
  let intersectsItem = false;
  evaluateInteractionItems(chart2, axis, position, (element, datasetIndex, index7) => {
    if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index: index7
      });
      intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
    }
  });
  if (intersect && !intersectsItem) {
    return [];
  }
  return items;
}
function filterByPosition(array2, position) {
  return array2.filter((v) => v.pos === position);
}
function filterDynamicPositionByAxis(array2, axis) {
  return array2.filter((v) => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array2, reverse) {
  return array2.sort((a, b) => {
    const v0 = reverse ? b : a;
    const v1 = reverse ? a : b;
    return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
  });
}
function wrapBoxes(boxes) {
  const layoutBoxes = [];
  let i, ilen, box, pos, stack, stackWeight;
  for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
    box = boxes[i];
    ({ position: pos, options: { stack, stackWeight = 1 } } = box);
    layoutBoxes.push({
      index: i,
      box,
      pos,
      horizontal: box.isHorizontal(),
      weight: box.weight,
      stack: stack && pos + stack,
      stackWeight
    });
  }
  return layoutBoxes;
}
function buildStacks(layouts2) {
  const stacks = {};
  for (const wrap of layouts2) {
    const { stack, pos, stackWeight } = wrap;
    if (!stack || !STATIC_POSITIONS.includes(pos)) {
      continue;
    }
    const _stack = stacks[stack] || (stacks[stack] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    _stack.count++;
    _stack.weight += stackWeight;
  }
  return stacks;
}
function setLayoutDims(layouts2, params) {
  const stacks = buildStacks(layouts2);
  const { vBoxMaxWidth, hBoxMaxHeight } = params;
  let i, ilen, layout;
  for (i = 0, ilen = layouts2.length; i < ilen; ++i) {
    layout = layouts2[i];
    const { fullSize } = layout.box;
    const stack = stacks[layout.stack];
    const factor = stack && layout.stackWeight / stack.weight;
    if (layout.horizontal) {
      layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
      layout.height = hBoxMaxHeight;
    } else {
      layout.width = vBoxMaxWidth;
      layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
    }
  }
  return stacks;
}
function buildLayoutBoxes(boxes) {
  const layoutBoxes = wrapBoxes(boxes);
  const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
  const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
  const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
  const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
  const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
  const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
  const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
  return {
    fullSize,
    leftAndTop: left.concat(top),
    rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
    chartArea: filterByPosition(layoutBoxes, "chartArea"),
    vertical: left.concat(right).concat(centerVertical),
    horizontal: top.concat(bottom).concat(centerHorizontal)
  };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
  return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
  maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
  maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
  maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
  maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
  const { pos, box } = layout;
  const maxPadding = chartArea.maxPadding;
  if (!isObject(pos)) {
    if (layout.size) {
      chartArea[pos] -= layout.size;
    }
    const stack = stacks[layout.stack] || {
      size: 0,
      count: 1
    };
    stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
    layout.size = stack.size / stack.count;
    chartArea[pos] += layout.size;
  }
  if (box.getPadding) {
    updateMaxPadding(maxPadding, box.getPadding());
  }
  const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
  const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
  const widthChanged = newWidth !== chartArea.w;
  const heightChanged = newHeight !== chartArea.h;
  chartArea.w = newWidth;
  chartArea.h = newHeight;
  return layout.horizontal ? {
    same: widthChanged,
    other: heightChanged
  } : {
    same: heightChanged,
    other: widthChanged
  };
}
function handleMaxPadding(chartArea) {
  const maxPadding = chartArea.maxPadding;
  function updatePos(pos) {
    const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
    chartArea[pos] += change;
    return change;
  }
  chartArea.y += updatePos("top");
  chartArea.x += updatePos("left");
  updatePos("right");
  updatePos("bottom");
}
function getMargins(horizontal, chartArea) {
  const maxPadding = chartArea.maxPadding;
  function marginForPositions(positions2) {
    const margin = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    positions2.forEach((pos) => {
      margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
    });
    return margin;
  }
  return horizontal ? marginForPositions([
    "left",
    "right"
  ]) : marginForPositions([
    "top",
    "bottom"
  ]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
  const refitBoxes = [];
  let i, ilen, layout, box, refit, changed;
  for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;
    box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
    const { same, other } = updateDims(chartArea, params, layout, stacks);
    refit |= same && refitBoxes.length;
    changed = changed || other;
    if (!box.fullSize) {
      refitBoxes.push(layout);
    }
  }
  return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
  box.top = top;
  box.left = left;
  box.right = left + width;
  box.bottom = top + height;
  box.width = width;
  box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
  const userPadding = params.padding;
  let { x, y } = chartArea;
  for (const layout of boxes) {
    const box = layout.box;
    const stack = stacks[layout.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    };
    const weight = layout.stackWeight / stack.weight || 1;
    if (layout.horizontal) {
      const width = chartArea.w * weight;
      const height = stack.size || box.height;
      if (defined(stack.start)) {
        y = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
      } else {
        setBoxDims(box, chartArea.left + stack.placed, y, width, height);
      }
      stack.start = y;
      stack.placed += width;
      y = box.bottom;
    } else {
      const height = chartArea.h * weight;
      const width = stack.size || box.width;
      if (defined(stack.start)) {
        x = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
      } else {
        setBoxDims(box, x, chartArea.top + stack.placed, width, height);
      }
      stack.start = x;
      stack.placed += height;
      x = box.right;
    }
  }
  chartArea.x = x;
  chartArea.y = y;
}
function initCanvas(canvas, aspectRatio) {
  const style = canvas.style;
  const renderHeight = canvas.getAttribute("height");
  const renderWidth = canvas.getAttribute("width");
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };
  style.display = style.display || "block";
  style.boxSizing = style.boxSizing || "border-box";
  if (isNullOrEmpty(renderWidth)) {
    const displayWidth = readUsedSize(canvas, "width");
    if (displayWidth !== void 0) {
      canvas.width = displayWidth;
    }
  }
  if (isNullOrEmpty(renderHeight)) {
    if (canvas.style.height === "") {
      canvas.height = canvas.width / (aspectRatio || 2);
    } else {
      const displayHeight = readUsedSize(canvas, "height");
      if (displayHeight !== void 0) {
        canvas.height = displayHeight;
      }
    }
  }
  return canvas;
}
function addListener(node, type, listener) {
  if (node) {
    node.addEventListener(type, listener, eventListenerOptions);
  }
}
function removeListener(chart2, type, listener) {
  if (chart2 && chart2.canvas) {
    chart2.canvas.removeEventListener(type, listener, eventListenerOptions);
  }
}
function fromNativeEvent(event, chart2) {
  const type = EVENT_TYPES[event.type] || event.type;
  const { x, y } = getRelativePosition(event, chart2);
  return {
    type,
    chart: chart2,
    native: event,
    x: x !== void 0 ? x : null,
    y: y !== void 0 ? y : null
  };
}
function nodeListContains(nodeList, canvas) {
  for (const node of nodeList) {
    if (node === canvas || node.contains(canvas)) {
      return true;
    }
  }
}
function createAttachObserver(chart2, type, listener) {
  const canvas = chart2.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.addedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
function createDetachObserver(chart2, type, listener) {
  const canvas = chart2.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.removedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
function onWindowResize() {
  const dpr = window.devicePixelRatio;
  if (dpr === oldDevicePixelRatio) {
    return;
  }
  oldDevicePixelRatio = dpr;
  drpListeningCharts.forEach((resize, chart2) => {
    if (chart2.currentDevicePixelRatio !== dpr) {
      resize();
    }
  });
}
function listenDevicePixelRatioChanges(chart2, resize) {
  if (!drpListeningCharts.size) {
    window.addEventListener("resize", onWindowResize);
  }
  drpListeningCharts.set(chart2, resize);
}
function unlistenDevicePixelRatioChanges(chart2) {
  drpListeningCharts.delete(chart2);
  if (!drpListeningCharts.size) {
    window.removeEventListener("resize", onWindowResize);
  }
}
function createResizeObserver(chart2, type, listener) {
  const canvas = chart2.canvas;
  const container = canvas && _getParentNode(canvas);
  if (!container) {
    return;
  }
  const resize = throttled((width, height) => {
    const w = container.clientWidth;
    listener(width, height);
    if (w < container.clientWidth) {
      listener();
    }
  }, window);
  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    if (width === 0 && height === 0) {
      return;
    }
    resize(width, height);
  });
  observer.observe(container);
  listenDevicePixelRatioChanges(chart2, resize);
  return observer;
}
function releaseObserver(chart2, type, observer) {
  if (observer) {
    observer.disconnect();
  }
  if (type === "resize") {
    unlistenDevicePixelRatioChanges(chart2);
  }
}
function createProxyAndListen(chart2, type, listener) {
  const canvas = chart2.canvas;
  const proxy = throttled((event) => {
    if (chart2.ctx !== null) {
      listener(fromNativeEvent(event, chart2));
    }
  }, chart2);
  addListener(canvas, type, proxy);
  return proxy;
}
function _detectPlatform(canvas) {
  if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return BasicPlatform;
  }
  return DomPlatform;
}
function autoSkip(scale, ticks) {
  const tickOpts = scale.options.ticks;
  const determinedMaxTicks = determineMaxTicks(scale);
  const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
  const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
  const numMajorIndices = majorIndices.length;
  const first = majorIndices[0];
  const last = majorIndices[numMajorIndices - 1];
  const newTicks = [];
  if (numMajorIndices > ticksLimit) {
    skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
    return newTicks;
  }
  const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
  if (numMajorIndices > 0) {
    let i, ilen;
    const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
    skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
    for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
      skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
    }
    skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
    return newTicks;
  }
  skip(ticks, newTicks, spacing);
  return newTicks;
}
function determineMaxTicks(scale) {
  const offset3 = scale.options.offset;
  const tickLength = scale._tickSize();
  const maxScale = scale._length / tickLength + (offset3 ? 0 : 1);
  const maxChart = scale._maxLength / tickLength;
  return Math.floor(Math.min(maxScale, maxChart));
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
  const evenMajorSpacing = getEvenSpacing(majorIndices);
  const spacing = ticks.length / ticksLimit;
  if (!evenMajorSpacing) {
    return Math.max(spacing, 1);
  }
  const factors = _factorize(evenMajorSpacing);
  for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
    const factor = factors[i];
    if (factor > spacing) {
      return factor;
    }
  }
  return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
  const result = [];
  let i, ilen;
  for (i = 0, ilen = ticks.length; i < ilen; i++) {
    if (ticks[i].major) {
      result.push(i);
    }
  }
  return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
  let count = 0;
  let next = majorIndices[0];
  let i;
  spacing = Math.ceil(spacing);
  for (i = 0; i < ticks.length; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = majorIndices[count * spacing];
    }
  }
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
  const start = valueOrDefault(majorStart, 0);
  const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
  let count = 0;
  let length, i, next;
  spacing = Math.ceil(spacing);
  if (majorEnd) {
    length = majorEnd - majorStart;
    spacing = length / Math.floor(length / spacing);
  }
  next = start;
  while (next < 0) {
    count++;
    next = Math.round(start + count * spacing);
  }
  for (i = Math.max(start, 0); i < end; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = Math.round(start + count * spacing);
    }
  }
}
function getEvenSpacing(arr) {
  const len = arr.length;
  let i, diff;
  if (len < 2) {
    return false;
  }
  for (diff = arr[0], i = 1; i < len; ++i) {
    if (arr[i] - arr[i - 1] !== diff) {
      return false;
    }
  }
  return diff;
}
function sample(arr, numItems) {
  const result = [];
  const increment = arr.length / numItems;
  const len = arr.length;
  let i = 0;
  for (; i < len; i += increment) {
    result.push(arr[Math.floor(i)]);
  }
  return result;
}
function getPixelForGridLine(scale, index7, offsetGridLines) {
  const length = scale.ticks.length;
  const validIndex2 = Math.min(index7, length - 1);
  const start = scale._startPixel;
  const end = scale._endPixel;
  const epsilon = 1e-6;
  let lineValue = scale.getPixelForTick(validIndex2);
  let offset3;
  if (offsetGridLines) {
    if (length === 1) {
      offset3 = Math.max(lineValue - start, end - lineValue);
    } else if (index7 === 0) {
      offset3 = (scale.getPixelForTick(1) - lineValue) / 2;
    } else {
      offset3 = (lineValue - scale.getPixelForTick(validIndex2 - 1)) / 2;
    }
    lineValue += validIndex2 < index7 ? offset3 : -offset3;
    if (lineValue < start - epsilon || lineValue > end + epsilon) {
      return;
    }
  }
  return lineValue;
}
function garbageCollect(caches2, length) {
  each2(caches2, (cache) => {
    const gc = cache.gc;
    const gcLen = gc.length / 2;
    let i;
    if (gcLen > length) {
      for (i = 0; i < gcLen; ++i) {
        delete cache.data[gc[i]];
      }
      gc.splice(0, gcLen);
    }
  });
}
function getTickMarkLength(options2) {
  return options2.drawTicks ? options2.tickLength : 0;
}
function getTitleHeight(options2, fallback) {
  if (!options2.display) {
    return 0;
  }
  const font = toFont(options2.font, fallback);
  const padding = toPadding(options2.padding);
  const lines = isArray(options2.text) ? options2.text.length : 1;
  return lines * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
  return createContext(parent, {
    scale,
    type: "scale"
  });
}
function createTickContext(parent, index7, tick) {
  return createContext(parent, {
    tick,
    index: index7,
    type: "tick"
  });
}
function titleAlign(align, position, reverse) {
  let ret = _toLeftRightCenter(align);
  if (reverse && position !== "right" || !reverse && position === "right") {
    ret = reverseAlign(ret);
  }
  return ret;
}
function titleArgs(scale, offset3, position, align) {
  const { top, left, bottom, right, chart: chart2 } = scale;
  const { chartArea, scales } = chart2;
  let rotation = 0;
  let maxWidth, titleX, titleY;
  const height = bottom - top;
  const width = right - left;
  if (scale.isHorizontal()) {
    titleX = _alignStartEnd(align, left, right);
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleY = scales[positionAxisID].getPixelForValue(value) + height - offset3;
    } else if (position === "center") {
      titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset3;
    } else {
      titleY = offsetFromEdge(scale, position, offset3);
    }
    maxWidth = right - left;
  } else {
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleX = scales[positionAxisID].getPixelForValue(value) - width + offset3;
    } else if (position === "center") {
      titleX = (chartArea.left + chartArea.right) / 2 - width + offset3;
    } else {
      titleX = offsetFromEdge(scale, position, offset3);
    }
    titleY = _alignStartEnd(align, bottom, top);
    rotation = position === "left" ? -HALF_PI : HALF_PI;
  }
  return {
    titleX,
    titleY,
    maxWidth,
    rotation
  };
}
function registerDefaults(item, scope, parentScope) {
  const itemDefaults = merge(/* @__PURE__ */ Object.create(null), [
    parentScope ? defaults.get(parentScope) : {},
    defaults.get(scope),
    item.defaults
  ]);
  defaults.set(scope, itemDefaults);
  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }
  if (item.descriptors) {
    defaults.describe(scope, item.descriptors);
  }
}
function routeDefaults(scope, routes) {
  Object.keys(routes).forEach((property) => {
    const propertyParts = property.split(".");
    const sourceName = propertyParts.pop();
    const sourceScope = [
      scope
    ].concat(propertyParts).join(".");
    const parts = routes[property].split(".");
    const targetName = parts.pop();
    const targetScope = parts.join(".");
    defaults.route(sourceScope, sourceName, targetScope, targetName);
  });
}
function isIChartComponent(proto) {
  return "id" in proto && "defaults" in proto;
}
function allPlugins(config) {
  const localIds = {};
  const plugins = [];
  const keys = Object.keys(registry.plugins.items);
  for (let i = 0; i < keys.length; i++) {
    plugins.push(registry.getPlugin(keys[i]));
  }
  const local = config.plugins || [];
  for (let i = 0; i < local.length; i++) {
    const plugin = local[i];
    if (plugins.indexOf(plugin) === -1) {
      plugins.push(plugin);
      localIds[plugin.id] = true;
    }
  }
  return {
    plugins,
    localIds
  };
}
function getOpts(options2, all) {
  if (!all && options2 === false) {
    return null;
  }
  if (options2 === true) {
    return {};
  }
  return options2;
}
function createDescriptors(chart2, { plugins, localIds }, options2, all) {
  const result = [];
  const context = chart2.getContext();
  for (const plugin of plugins) {
    const id = plugin.id;
    const opts = getOpts(options2[id], all);
    if (opts === null) {
      continue;
    }
    result.push({
      plugin,
      options: pluginOpts(chart2.config, {
        plugin,
        local: localIds[id]
      }, opts, context)
    });
  }
  return result;
}
function pluginOpts(config, { plugin, local }, opts, context) {
  const keys = config.pluginScopeKeys(plugin);
  const scopes = config.getOptionScopes(opts, keys);
  if (local && plugin.defaults) {
    scopes.push(plugin.defaults);
  }
  return config.createResolver(scopes, context, [
    ""
  ], {
    scriptable: false,
    indexable: false,
    allKeys: true
  });
}
function getIndexAxis(type, options2) {
  const datasetDefaults = defaults.datasets[type] || {};
  const datasetOptions = (options2.datasets || {})[type] || {};
  return datasetOptions.indexAxis || options2.indexAxis || datasetDefaults.indexAxis || "x";
}
function getAxisFromDefaultScaleID(id, indexAxis) {
  let axis = id;
  if (id === "_index_") {
    axis = indexAxis;
  } else if (id === "_value_") {
    axis = indexAxis === "x" ? "y" : "x";
  }
  return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
  return axis === indexAxis ? "_index_" : "_value_";
}
function idMatchesAxis(id) {
  if (id === "x" || id === "y" || id === "r") {
    return id;
  }
}
function axisFromPosition(position) {
  if (position === "top" || position === "bottom") {
    return "x";
  }
  if (position === "left" || position === "right") {
    return "y";
  }
}
function determineAxis(id, ...scaleOptions) {
  if (idMatchesAxis(id)) {
    return id;
  }
  for (const opts of scaleOptions) {
    const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
    if (axis) {
      return axis;
    }
  }
  throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
}
function getAxisFromDataset(id, axis, dataset) {
  if (dataset[axis + "AxisID"] === id) {
    return {
      axis
    };
  }
}
function retrieveAxisFromDatasets(id, config) {
  if (config.data && config.data.datasets) {
    const boundDs = config.data.datasets.filter((d) => d.xAxisID === id || d.yAxisID === id);
    if (boundDs.length) {
      return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
    }
  }
  return {};
}
function mergeScaleConfig(config, options2) {
  const chartDefaults = overrides[config.type] || {
    scales: {}
  };
  const configScales = options2.scales || {};
  const chartIndexAxis = getIndexAxis(config.type, options2);
  const scales = /* @__PURE__ */ Object.create(null);
  Object.keys(configScales).forEach((id) => {
    const scaleConf = configScales[id];
    if (!isObject(scaleConf)) {
      return console.error(`Invalid scale configuration for scale: ${id}`);
    }
    if (scaleConf._proxy) {
      return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
    }
    const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
    const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
    const defaultScaleOptions = chartDefaults.scales || {};
    scales[id] = mergeIf(/* @__PURE__ */ Object.create(null), [
      {
        axis
      },
      scaleConf,
      defaultScaleOptions[axis],
      defaultScaleOptions[defaultId]
    ]);
  });
  config.data.datasets.forEach((dataset) => {
    const type = dataset.type || config.type;
    const indexAxis = dataset.indexAxis || getIndexAxis(type, options2);
    const datasetDefaults = overrides[type] || {};
    const defaultScaleOptions = datasetDefaults.scales || {};
    Object.keys(defaultScaleOptions).forEach((defaultID) => {
      const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
      const id = dataset[axis + "AxisID"] || axis;
      scales[id] = scales[id] || /* @__PURE__ */ Object.create(null);
      mergeIf(scales[id], [
        {
          axis
        },
        configScales[id],
        defaultScaleOptions[defaultID]
      ]);
    });
  });
  Object.keys(scales).forEach((key2) => {
    const scale = scales[key2];
    mergeIf(scale, [
      defaults.scales[scale.type],
      defaults.scale
    ]);
  });
  return scales;
}
function initOptions(config) {
  const options2 = config.options || (config.options = {});
  options2.plugins = valueOrDefault(options2.plugins, {});
  options2.scales = mergeScaleConfig(config, options2);
}
function initData(data) {
  data = data || {};
  data.datasets = data.datasets || [];
  data.labels = data.labels || [];
  return data;
}
function initConfig(config) {
  config = config || {};
  config.data = initData(config.data);
  initOptions(config);
  return config;
}
function cachedKeys(cacheKey, generate) {
  let keys = keyCache.get(cacheKey);
  if (!keys) {
    keys = generate();
    keyCache.set(cacheKey, keys);
    keysCached.add(keys);
  }
  return keys;
}
function getResolver(resolverCache, scopes, prefixes) {
  let cache = resolverCache.get(scopes);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    resolverCache.set(scopes, cache);
  }
  const cacheKey = prefixes.join();
  let cached = cache.get(cacheKey);
  if (!cached) {
    const resolver = _createResolver(scopes, prefixes);
    cached = {
      resolver,
      subPrefixes: prefixes.filter((p) => !p.toLowerCase().includes("hover"))
    };
    cache.set(cacheKey, cached);
  }
  return cached;
}
function needContext(proxy, names2) {
  const { isScriptable, isIndexable } = _descriptors(proxy);
  for (const prop of names2) {
    const scriptable = isScriptable(prop);
    const indexable = isIndexable(prop);
    const value = (indexable || scriptable) && proxy[prop];
    if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
      return true;
    }
  }
  return false;
}
function positionIsHorizontal(position, axis) {
  return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
}
function compare2Level(l1, l2) {
  return function(a, b) {
    return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
  };
}
function onAnimationsComplete(context) {
  const chart2 = context.chart;
  const animationOptions = chart2.options.animation;
  chart2.notifyPlugins("afterRender");
  callback(animationOptions && animationOptions.onComplete, [
    context
  ], chart2);
}
function onAnimationProgress(context) {
  const chart2 = context.chart;
  const animationOptions = chart2.options.animation;
  callback(animationOptions && animationOptions.onProgress, [
    context
  ], chart2);
}
function getCanvas(item) {
  if (_isDomSupported() && typeof item === "string") {
    item = document.getElementById(item);
  } else if (item && item.length) {
    item = item[0];
  }
  if (item && item.canvas) {
    item = item.canvas;
  }
  return item;
}
function moveNumericKeys(obj, start, move) {
  const keys = Object.keys(obj);
  for (const key2 of keys) {
    const intKey = +key2;
    if (intKey >= start) {
      const value = obj[key2];
      delete obj[key2];
      if (move > 0 || intKey > start) {
        obj[intKey + move] = value;
      }
    }
  }
}
function determineLastEvent(e, lastEvent, inChartArea, isClick) {
  if (!inChartArea || e.type === "mouseout") {
    return null;
  }
  if (isClick) {
    return lastEvent;
  }
  return e;
}
function getSizeForArea(scale, chartArea, field) {
  return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
  const { xScale, yScale } = meta;
  if (xScale && yScale) {
    return {
      left: getSizeForArea(xScale, chartArea, "left"),
      right: getSizeForArea(xScale, chartArea, "right"),
      top: getSizeForArea(yScale, chartArea, "top"),
      bottom: getSizeForArea(yScale, chartArea, "bottom")
    };
  }
  return chartArea;
}
function invalidatePlugins() {
  return each2(Chart.instances, (chart2) => chart2._plugins.invalidate());
}
function setStyle(ctx, options2, style = options2) {
  ctx.lineCap = valueOrDefault(style.borderCapStyle, options2.borderCapStyle);
  ctx.setLineDash(valueOrDefault(style.borderDash, options2.borderDash));
  ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options2.borderDashOffset);
  ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options2.borderJoinStyle);
  ctx.lineWidth = valueOrDefault(style.borderWidth, options2.borderWidth);
  ctx.strokeStyle = valueOrDefault(style.borderColor, options2.borderColor);
}
function lineTo(ctx, previous, target) {
  ctx.lineTo(target.x, target.y);
}
function getLineMethod(options2) {
  if (options2.stepped) {
    return _steppedLineTo;
  }
  if (options2.tension || options2.cubicInterpolationMode === "monotone") {
    return _bezierCurveTo;
  }
  return lineTo;
}
function pathVars(points, segment, params = {}) {
  const count = points.length;
  const { start: paramsStart = 0, end: paramsEnd = count - 1 } = params;
  const { start: segmentStart, end: segmentEnd } = segment;
  const start = Math.max(paramsStart, segmentStart);
  const end = Math.min(paramsEnd, segmentEnd);
  const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
  return {
    count,
    start,
    loop: segment.loop,
    ilen: end < start && !outside ? count + end - start : end - start
  };
}
function pathSegment(ctx, line, segment, params) {
  const { points, options: options2 } = line;
  const { count, start, loop, ilen } = pathVars(points, segment, params);
  const lineMethod = getLineMethod(options2);
  let { move = true, reverse } = params || {};
  let i, point, prev;
  for (i = 0; i <= ilen; ++i) {
    point = points[(start + (reverse ? ilen - i : i)) % count];
    if (point.skip) {
      continue;
    } else if (move) {
      ctx.moveTo(point.x, point.y);
      move = false;
    } else {
      lineMethod(ctx, prev, point, reverse, options2.stepped);
    }
    prev = point;
  }
  if (loop) {
    point = points[(start + (reverse ? ilen : 0)) % count];
    lineMethod(ctx, prev, point, reverse, options2.stepped);
  }
  return !!loop;
}
function fastPathSegment(ctx, line, segment, params) {
  const points = line.points;
  const { count, start, ilen } = pathVars(points, segment, params);
  const { move = true, reverse } = params || {};
  let avgX = 0;
  let countX = 0;
  let i, point, prevX, minY, maxY, lastY;
  const pointIndex = (index7) => (start + (reverse ? ilen - index7 : index7)) % count;
  const drawX = () => {
    if (minY !== maxY) {
      ctx.lineTo(avgX, maxY);
      ctx.lineTo(avgX, minY);
      ctx.lineTo(avgX, lastY);
    }
  };
  if (move) {
    point = points[pointIndex(0)];
    ctx.moveTo(point.x, point.y);
  }
  for (i = 0; i <= ilen; ++i) {
    point = points[pointIndex(i)];
    if (point.skip) {
      continue;
    }
    const x = point.x;
    const y = point.y;
    const truncX = x | 0;
    if (truncX === prevX) {
      if (y < minY) {
        minY = y;
      } else if (y > maxY) {
        maxY = y;
      }
      avgX = (countX * avgX + x) / ++countX;
    } else {
      drawX();
      ctx.lineTo(x, y);
      prevX = truncX;
      countX = 0;
      minY = maxY = y;
    }
    lastY = y;
  }
  drawX();
}
function _getSegmentMethod(line) {
  const opts = line.options;
  const borderDash = opts.borderDash && opts.borderDash.length;
  const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
  return useFastPath ? fastPathSegment : pathSegment;
}
function _getInterpolationMethod(options2) {
  if (options2.stepped) {
    return _steppedInterpolation;
  }
  if (options2.tension || options2.cubicInterpolationMode === "monotone") {
    return _bezierInterpolation;
  }
  return _pointInLine;
}
function strokePathWithCache(ctx, line, start, count) {
  let path = line._path;
  if (!path) {
    path = line._path = new Path2D();
    if (line.path(path, start, count)) {
      path.closePath();
    }
  }
  setStyle(ctx, line.options);
  ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
  const { segments, options: options2 } = line;
  const segmentMethod = _getSegmentMethod(line);
  for (const segment of segments) {
    setStyle(ctx, options2, segment.style);
    ctx.beginPath();
    if (segmentMethod(ctx, line, segment, {
      start,
      end: start + count - 1
    })) {
      ctx.closePath();
    }
    ctx.stroke();
  }
}
function draw(ctx, line, start, count) {
  if (usePath2D && !line.options.segment) {
    strokePathWithCache(ctx, line, start, count);
  } else {
    strokePathDirect(ctx, line, start, count);
  }
}
function inRange$1(el, pos, axis, useFinalPosition) {
  const options2 = el.options;
  const { [axis]: value } = el.getProps([
    axis
  ], useFinalPosition);
  return Math.abs(pos - value) < options2.radius + options2.hitRadius;
}
function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
  const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
  const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
  return {
    itemWidth,
    itemHeight
  };
}
function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
  let legendItemText = legendItem.text;
  if (legendItemText && typeof legendItemText !== "string") {
    legendItemText = legendItemText.reduce((a, b) => a.length > b.length ? a : b);
  }
  return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
}
function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
  let itemHeight = _itemHeight;
  if (typeof legendItem.text !== "string") {
    itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
  }
  return itemHeight;
}
function calculateLegendItemHeight(legendItem, fontLineHeight) {
  const labelHeight = legendItem.text ? legendItem.text.length : 0;
  return fontLineHeight * labelHeight;
}
function isListened(type, opts) {
  if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) {
    return true;
  }
  if (opts.onClick && (type === "click" || type === "mouseup")) {
    return true;
  }
  return false;
}
function createTitle(chart2, titleOpts) {
  const title = new Title({
    ctx: chart2.ctx,
    options: titleOpts,
    chart: chart2
  });
  layouts.configure(chart2, title, titleOpts);
  layouts.addBox(chart2, title);
  chart2.titleBlock = title;
}
function pushOrConcat(base2, toPush) {
  if (toPush) {
    if (isArray(toPush)) {
      Array.prototype.push.apply(base2, toPush);
    } else {
      base2.push(toPush);
    }
  }
  return base2;
}
function splitNewlines(str) {
  if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) {
    return str.split("\n");
  }
  return str;
}
function createTooltipItem(chart2, item) {
  const { element, datasetIndex, index: index7 } = item;
  const controller = chart2.getDatasetMeta(datasetIndex).controller;
  const { label, value } = controller.getLabelAndValue(index7);
  return {
    chart: chart2,
    label,
    parsed: controller.getParsed(index7),
    raw: chart2.data.datasets[datasetIndex].data[index7],
    formattedValue: value,
    dataset: controller.getDataset(),
    dataIndex: index7,
    datasetIndex,
    element
  };
}
function getTooltipSize(tooltip, options2) {
  const ctx = tooltip.chart.ctx;
  const { body: body2, footer, title } = tooltip;
  const { boxWidth, boxHeight } = options2;
  const bodyFont = toFont(options2.bodyFont);
  const titleFont = toFont(options2.titleFont);
  const footerFont = toFont(options2.footerFont);
  const titleLineCount = title.length;
  const footerLineCount = footer.length;
  const bodyLineItemCount = body2.length;
  const padding = toPadding(options2.padding);
  let height = padding.height;
  let width = 0;
  let combinedBodyLength = body2.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
  combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
  if (titleLineCount) {
    height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options2.titleSpacing + options2.titleMarginBottom;
  }
  if (combinedBodyLength) {
    const bodyLineHeight = options2.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
    height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options2.bodySpacing;
  }
  if (footerLineCount) {
    height += options2.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options2.footerSpacing;
  }
  let widthPadding = 0;
  const maxLineWidth = function(line) {
    width = Math.max(width, ctx.measureText(line).width + widthPadding);
  };
  ctx.save();
  ctx.font = titleFont.string;
  each2(tooltip.title, maxLineWidth);
  ctx.font = bodyFont.string;
  each2(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
  widthPadding = options2.displayColors ? boxWidth + 2 + options2.boxPadding : 0;
  each2(body2, (bodyItem) => {
    each2(bodyItem.before, maxLineWidth);
    each2(bodyItem.lines, maxLineWidth);
    each2(bodyItem.after, maxLineWidth);
  });
  widthPadding = 0;
  ctx.font = footerFont.string;
  each2(tooltip.footer, maxLineWidth);
  ctx.restore();
  width += padding.width;
  return {
    width,
    height
  };
}
function determineYAlign(chart2, size2) {
  const { y, height } = size2;
  if (y < height / 2) {
    return "top";
  } else if (y > chart2.height - height / 2) {
    return "bottom";
  }
  return "center";
}
function doesNotFitWithAlign(xAlign, chart2, options2, size2) {
  const { x, width } = size2;
  const caret = options2.caretSize + options2.caretPadding;
  if (xAlign === "left" && x + width + caret > chart2.width) {
    return true;
  }
  if (xAlign === "right" && x - width - caret < 0) {
    return true;
  }
}
function determineXAlign(chart2, options2, size2, yAlign) {
  const { x, width } = size2;
  const { width: chartWidth, chartArea: { left, right } } = chart2;
  let xAlign = "center";
  if (yAlign === "center") {
    xAlign = x <= (left + right) / 2 ? "left" : "right";
  } else if (x <= width / 2) {
    xAlign = "left";
  } else if (x >= chartWidth - width / 2) {
    xAlign = "right";
  }
  if (doesNotFitWithAlign(xAlign, chart2, options2, size2)) {
    xAlign = "center";
  }
  return xAlign;
}
function determineAlignment(chart2, options2, size2) {
  const yAlign = size2.yAlign || options2.yAlign || determineYAlign(chart2, size2);
  return {
    xAlign: size2.xAlign || options2.xAlign || determineXAlign(chart2, options2, size2, yAlign),
    yAlign
  };
}
function alignX(size2, xAlign) {
  let { x, width } = size2;
  if (xAlign === "right") {
    x -= width;
  } else if (xAlign === "center") {
    x -= width / 2;
  }
  return x;
}
function alignY(size2, yAlign, paddingAndSize) {
  let { y, height } = size2;
  if (yAlign === "top") {
    y += paddingAndSize;
  } else if (yAlign === "bottom") {
    y -= height + paddingAndSize;
  } else {
    y -= height / 2;
  }
  return y;
}
function getBackgroundPoint(options2, size2, alignment, chart2) {
  const { caretSize, caretPadding, cornerRadius } = options2;
  const { xAlign, yAlign } = alignment;
  const paddingAndSize = caretSize + caretPadding;
  const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
  let x = alignX(size2, xAlign);
  const y = alignY(size2, yAlign, paddingAndSize);
  if (yAlign === "center") {
    if (xAlign === "left") {
      x += paddingAndSize;
    } else if (xAlign === "right") {
      x -= paddingAndSize;
    }
  } else if (xAlign === "left") {
    x -= Math.max(topLeft, bottomLeft) + caretSize;
  } else if (xAlign === "right") {
    x += Math.max(topRight, bottomRight) + caretSize;
  }
  return {
    x: _limitValue(x, 0, chart2.width - size2.width),
    y: _limitValue(y, 0, chart2.height - size2.height)
  };
}
function getAlignedX(tooltip, align, options2) {
  const padding = toPadding(options2.padding);
  return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
}
function getBeforeAfterBodyLines(callback2) {
  return pushOrConcat([], splitNewlines(callback2));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
  return createContext(parent, {
    tooltip,
    tooltipItems,
    type: "tooltip"
  });
}
function overrideCallbacks(callbacks, context) {
  const override2 = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
  return override2 ? callbacks.override(override2) : callbacks;
}
function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
  const result = callbacks[name].call(ctx, arg);
  if (typeof result === "undefined") {
    return defaultCallbacks[name].call(ctx, arg);
  }
  return result;
}
function findOrAddLabel(labels, raw, index7, addedLabels) {
  const first = labels.indexOf(raw);
  if (first === -1) {
    return addIfString(labels, raw, index7, addedLabels);
  }
  const last = labels.lastIndexOf(raw);
  return first !== last ? index7 : first;
}
function _getLabelForValue(value) {
  const labels = this.getLabels();
  if (value >= 0 && value < labels.length) {
    return labels[value];
  }
  return value;
}
function generateTicks$1(generationOptions, dataRange) {
  const ticks = [];
  const MIN_SPACING = 1e-14;
  const { bounds, step, min: min2, max: max2, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
  const unit = step || 1;
  const maxSpaces = maxTicks - 1;
  const { min: rmin, max: rmax } = dataRange;
  const minDefined = !isNullOrUndef(min2);
  const maxDefined = !isNullOrUndef(max2);
  const countDefined = !isNullOrUndef(count);
  const minSpacing = (rmax - rmin) / (maxDigits + 1);
  let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
  let factor, niceMin, niceMax, numSpaces;
  if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
    return [
      {
        value: rmin
      },
      {
        value: rmax
      }
    ];
  }
  numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
  if (numSpaces > maxSpaces) {
    spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
  }
  if (!isNullOrUndef(precision)) {
    factor = Math.pow(10, precision);
    spacing = Math.ceil(spacing * factor) / factor;
  }
  if (bounds === "ticks") {
    niceMin = Math.floor(rmin / spacing) * spacing;
    niceMax = Math.ceil(rmax / spacing) * spacing;
  } else {
    niceMin = rmin;
    niceMax = rmax;
  }
  if (minDefined && maxDefined && step && almostWhole((max2 - min2) / step, spacing / 1e3)) {
    numSpaces = Math.round(Math.min((max2 - min2) / spacing, maxTicks));
    spacing = (max2 - min2) / numSpaces;
    niceMin = min2;
    niceMax = max2;
  } else if (countDefined) {
    niceMin = minDefined ? min2 : niceMin;
    niceMax = maxDefined ? max2 : niceMax;
    numSpaces = count - 1;
    spacing = (niceMax - niceMin) / numSpaces;
  } else {
    numSpaces = (niceMax - niceMin) / spacing;
    if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
      numSpaces = Math.round(numSpaces);
    } else {
      numSpaces = Math.ceil(numSpaces);
    }
  }
  const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
  factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;
  let j = 0;
  if (minDefined) {
    if (includeBounds && niceMin !== min2) {
      ticks.push({
        value: min2
      });
      if (niceMin < min2) {
        j++;
      }
      if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min2, relativeLabelSize(min2, minSpacing, generationOptions))) {
        j++;
      }
    } else if (niceMin < min2) {
      j++;
    }
  }
  for (; j < numSpaces; ++j) {
    const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
    if (maxDefined && tickValue > max2) {
      break;
    }
    ticks.push({
      value: tickValue
    });
  }
  if (maxDefined && includeBounds && niceMax !== max2) {
    if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max2, relativeLabelSize(max2, minSpacing, generationOptions))) {
      ticks[ticks.length - 1].value = max2;
    } else {
      ticks.push({
        value: max2
      });
    }
  } else if (!maxDefined || niceMax === max2) {
    ticks.push({
      value: niceMax
    });
  }
  return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
  const rad = toRadians(minRotation);
  const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 1e-3;
  const length = 0.75 * minSpacing * ("" + value).length;
  return Math.min(minSpacing / ratio, length);
}
function isMajor(tickVal) {
  const remain = tickVal / Math.pow(10, log10Floor(tickVal));
  return remain === 1;
}
function steps(min2, max2, rangeExp) {
  const rangeStep = Math.pow(10, rangeExp);
  const start = Math.floor(min2 / rangeStep);
  const end = Math.ceil(max2 / rangeStep);
  return end - start;
}
function startExp(min2, max2) {
  const range = max2 - min2;
  let rangeExp = log10Floor(range);
  while (steps(min2, max2, rangeExp) > 10) {
    rangeExp++;
  }
  while (steps(min2, max2, rangeExp) < 10) {
    rangeExp--;
  }
  return Math.min(rangeExp, log10Floor(min2));
}
function generateTicks(generationOptions, { min: min2, max: max2 }) {
  min2 = finiteOrDefault(generationOptions.min, min2);
  const ticks = [];
  const minExp = log10Floor(min2);
  let exp = startExp(min2, max2);
  let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
  const stepSize = Math.pow(10, exp);
  const base2 = minExp > exp ? Math.pow(10, minExp) : 0;
  const start = Math.round((min2 - base2) * precision) / precision;
  const offset3 = Math.floor((min2 - base2) / stepSize / 10) * stepSize * 10;
  let significand = Math.floor((start - offset3) / Math.pow(10, exp));
  let value = finiteOrDefault(generationOptions.min, Math.round((base2 + offset3 + significand * Math.pow(10, exp)) * precision) / precision);
  while (value < max2) {
    ticks.push({
      value,
      major: isMajor(value),
      significand
    });
    if (significand >= 10) {
      significand = significand < 15 ? 15 : 20;
    } else {
      significand++;
    }
    if (significand >= 20) {
      exp++;
      significand = 2;
      precision = exp >= 0 ? 1 : precision;
    }
    value = Math.round((base2 + offset3 + significand * Math.pow(10, exp)) * precision) / precision;
  }
  const lastTick = finiteOrDefault(generationOptions.max, value);
  ticks.push({
    value: lastTick,
    major: isMajor(lastTick),
    significand
  });
  return ticks;
}
function getTickBackdropHeight(opts) {
  const tickOpts = opts.ticks;
  if (tickOpts.display && opts.display) {
    const padding = toPadding(tickOpts.backdropPadding);
    return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
  }
  return 0;
}
function measureLabelSize(ctx, font, label) {
  label = isArray(label) ? label : [
    label
  ];
  return {
    w: _longestText(ctx, font.string, label),
    h: label.length * font.lineHeight
  };
}
function determineLimits(angle, pos, size2, min2, max2) {
  if (angle === min2 || angle === max2) {
    return {
      start: pos - size2 / 2,
      end: pos + size2 / 2
    };
  } else if (angle < min2 || angle > max2) {
    return {
      start: pos - size2,
      end: pos
    };
  }
  return {
    start: pos,
    end: pos + size2
  };
}
function fitWithPointLabels(scale) {
  const orig = {
    l: scale.left + scale._padding.left,
    r: scale.right - scale._padding.right,
    t: scale.top + scale._padding.top,
    b: scale.bottom - scale._padding.bottom
  };
  const limits = Object.assign({}, orig);
  const labelSizes = [];
  const padding = [];
  const valueCount = scale._pointLabels.length;
  const pointLabelOpts = scale.options.pointLabels;
  const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
  for (let i = 0; i < valueCount; i++) {
    const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
    padding[i] = opts.padding;
    const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
    const plFont = toFont(opts.font);
    const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
    labelSizes[i] = textSize;
    const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
    const angle = Math.round(toDegrees(angleRadians));
    const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
    const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
    updateLimits(limits, orig, angleRadians, hLimits, vLimits);
  }
  scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
  scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
  const sin = Math.abs(Math.sin(angle));
  const cos = Math.abs(Math.cos(angle));
  let x = 0;
  let y = 0;
  if (hLimits.start < orig.l) {
    x = (orig.l - hLimits.start) / sin;
    limits.l = Math.min(limits.l, orig.l - x);
  } else if (hLimits.end > orig.r) {
    x = (hLimits.end - orig.r) / sin;
    limits.r = Math.max(limits.r, orig.r + x);
  }
  if (vLimits.start < orig.t) {
    y = (orig.t - vLimits.start) / cos;
    limits.t = Math.min(limits.t, orig.t - y);
  } else if (vLimits.end > orig.b) {
    y = (vLimits.end - orig.b) / cos;
    limits.b = Math.max(limits.b, orig.b + y);
  }
}
function createPointLabelItem(scale, index7, itemOpts) {
  const outerDistance = scale.drawingArea;
  const { extra, additionalAngle, padding, size: size2 } = itemOpts;
  const pointLabelPosition = scale.getPointPosition(index7, outerDistance + extra + padding, additionalAngle);
  const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
  const y = yForAngle(pointLabelPosition.y, size2.h, angle);
  const textAlign = getTextAlignForAngle(angle);
  const left = leftForTextAlign(pointLabelPosition.x, size2.w, textAlign);
  return {
    visible: true,
    x: pointLabelPosition.x,
    y,
    textAlign,
    left,
    top: y,
    right: left + size2.w,
    bottom: y + size2.h
  };
}
function isNotOverlapped(item, area) {
  if (!area) {
    return true;
  }
  const { left, top, right, bottom } = item;
  const apexesInArea = _isPointInArea({
    x: left,
    y: top
  }, area) || _isPointInArea({
    x: left,
    y: bottom
  }, area) || _isPointInArea({
    x: right,
    y: top
  }, area) || _isPointInArea({
    x: right,
    y: bottom
  }, area);
  return !apexesInArea;
}
function buildPointLabelItems(scale, labelSizes, padding) {
  const items = [];
  const valueCount = scale._pointLabels.length;
  const opts = scale.options;
  const { centerPointLabels, display } = opts.pointLabels;
  const itemOpts = {
    extra: getTickBackdropHeight(opts) / 2,
    additionalAngle: centerPointLabels ? PI / valueCount : 0
  };
  let area;
  for (let i = 0; i < valueCount; i++) {
    itemOpts.padding = padding[i];
    itemOpts.size = labelSizes[i];
    const item = createPointLabelItem(scale, i, itemOpts);
    items.push(item);
    if (display === "auto") {
      item.visible = isNotOverlapped(item, area);
      if (item.visible) {
        area = item;
      }
    }
  }
  return items;
}
function getTextAlignForAngle(angle) {
  if (angle === 0 || angle === 180) {
    return "center";
  } else if (angle < 180) {
    return "left";
  }
  return "right";
}
function leftForTextAlign(x, w, align) {
  if (align === "right") {
    x -= w;
  } else if (align === "center") {
    x -= w / 2;
  }
  return x;
}
function yForAngle(y, h, angle) {
  if (angle === 90 || angle === 270) {
    y -= h / 2;
  } else if (angle > 270 || angle < 90) {
    y -= h;
  }
  return y;
}
function drawPointLabelBox(ctx, opts, item) {
  const { left, top, right, bottom } = item;
  const { backdropColor } = opts;
  if (!isNullOrUndef(backdropColor)) {
    const borderRadius = toTRBLCorners(opts.borderRadius);
    const padding = toPadding(opts.backdropPadding);
    ctx.fillStyle = backdropColor;
    const backdropLeft = left - padding.left;
    const backdropTop = top - padding.top;
    const backdropWidth = right - left + padding.width;
    const backdropHeight = bottom - top + padding.height;
    if (Object.values(borderRadius).some((v) => v !== 0)) {
      ctx.beginPath();
      addRoundedRectPath(ctx, {
        x: backdropLeft,
        y: backdropTop,
        w: backdropWidth,
        h: backdropHeight,
        radius: borderRadius
      });
      ctx.fill();
    } else {
      ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
    }
  }
}
function drawPointLabels(scale, labelCount) {
  const { ctx, options: { pointLabels } } = scale;
  for (let i = labelCount - 1; i >= 0; i--) {
    const item = scale._pointLabelItems[i];
    if (!item.visible) {
      continue;
    }
    const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
    drawPointLabelBox(ctx, optsAtIndex, item);
    const plFont = toFont(optsAtIndex.font);
    const { x, y, textAlign } = item;
    renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
      color: optsAtIndex.color,
      textAlign,
      textBaseline: "middle"
    });
  }
}
function pathRadiusLine(scale, radius, circular, labelCount) {
  const { ctx } = scale;
  if (circular) {
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
  } else {
    let pointPosition = scale.getPointPosition(0, radius);
    ctx.moveTo(pointPosition.x, pointPosition.y);
    for (let i = 1; i < labelCount; i++) {
      pointPosition = scale.getPointPosition(i, radius);
      ctx.lineTo(pointPosition.x, pointPosition.y);
    }
  }
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
  const ctx = scale.ctx;
  const circular = gridLineOpts.circular;
  const { color: color2, lineWidth } = gridLineOpts;
  if (!circular && !labelCount || !color2 || !lineWidth || radius < 0) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = color2;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(borderOpts.dash || []);
  ctx.lineDashOffset = borderOpts.dashOffset;
  ctx.beginPath();
  pathRadiusLine(scale, radius, circular, labelCount);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function createPointLabelContext(parent, index7, label) {
  return createContext(parent, {
    label,
    index: index7,
    type: "pointLabel"
  });
}
function sorter(a, b) {
  return a - b;
}
function parse2(scale, input) {
  if (isNullOrUndef(input)) {
    return null;
  }
  const adapter = scale._adapter;
  const { parser, round: round3, isoWeekday } = scale._parseOpts;
  let value = input;
  if (typeof parser === "function") {
    value = parser(value);
  }
  if (!isNumberFinite(value)) {
    value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
  }
  if (value === null) {
    return null;
  }
  if (round3) {
    value = round3 === "week" && (isNumber2(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round3);
  }
  return +value;
}
function determineUnitForAutoTicks(minUnit, min2, max2, capacity) {
  const ilen = UNITS.length;
  for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    const interval = INTERVALS[UNITS[i]];
    const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
    if (interval.common && Math.ceil((max2 - min2) / (factor * interval.size)) <= capacity) {
      return UNITS[i];
    }
  }
  return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min2, max2) {
  for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
    const unit = UNITS[i];
    if (INTERVALS[unit].common && scale._adapter.diff(max2, min2, unit) >= numTicks - 1) {
      return unit;
    }
  }
  return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
  for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const { lo, hi } = _lookup(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}
function setMajorTicks(scale, ticks, map2, majorUnit) {
  const adapter = scale._adapter;
  const first = +adapter.startOf(ticks[0].value, majorUnit);
  const last = ticks[ticks.length - 1].value;
  let major, index7;
  for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
    index7 = map2[major];
    if (index7 >= 0) {
      ticks[index7].major = true;
    }
  }
  return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
  const ticks = [];
  const map2 = {};
  const ilen = values.length;
  let i, value;
  for (i = 0; i < ilen; ++i) {
    value = values[i];
    map2[value] = i;
    ticks.push({
      value,
      major: false
    });
  }
  return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map2, majorUnit);
}
function interpolate2(table, val, reverse) {
  let lo = 0;
  let hi = table.length - 1;
  let prevSource, nextSource, prevTarget, nextTarget;
  if (reverse) {
    if (val >= table[lo].pos && val <= table[hi].pos) {
      ({ lo, hi } = _lookupByKey(table, "pos", val));
    }
    ({ pos: prevSource, time: prevTarget } = table[lo]);
    ({ pos: nextSource, time: nextTarget } = table[hi]);
  } else {
    if (val >= table[lo].time && val <= table[hi].time) {
      ({ lo, hi } = _lookupByKey(table, "time", val));
    }
    ({ time: prevSource, pos: prevTarget } = table[lo]);
    ({ time: nextSource, pos: nextTarget } = table[hi]);
  }
  const span = nextSource - prevSource;
  return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
var Animator, animator, transparent, interpolators, Animation, Animations, isDirectUpdateMode, cloneIfNotShared, createStack, DatasetController, LineController, DateAdapterBase, adapters, Interaction, STATIC_POSITIONS, layouts, BasePlatform, BasicPlatform, EXPANDO_KEY, EVENT_TYPES, isNullOrEmpty, eventListenerOptions, drpListeningCharts, oldDevicePixelRatio, DomPlatform, Element2, reverseAlign, offsetFromEdge, getTicksLimit, Scale, TypedRegistry, Registry, registry, PluginService, keyCache, keysCached, addIfFound, Config, hasFunction, version, KNOWN_POSITIONS, instances, getChart, Chart, usePath2D, LineElement, PointElement, getBoxSize, itemsEqual, Legend, plugin_legend, Title, plugin_title, positioners, defaultCallbacks, Tooltip, plugin_tooltip, addIfString, validIndex, CategoryScale, LinearScaleBase, LinearScale, log10Floor, changeExponent, LogarithmicScale, RadialLinearScale, INTERVALS, UNITS, TimeScale, TimeSeriesScale;
var init_chart = __esm({
  "node_modules/chart.js/dist/chart.js"() {
    init_helpers_segment();
    Animator = class {
      constructor() {
        this._request = null;
        this._charts = /* @__PURE__ */ new Map();
        this._running = false;
        this._lastDate = void 0;
      }
      _notify(chart2, anims, date, type) {
        const callbacks = anims.listeners[type];
        const numSteps = anims.duration;
        callbacks.forEach((fn) => fn({
          chart: chart2,
          initial: anims.initial,
          numSteps,
          currentStep: Math.min(date - anims.start, numSteps)
        }));
      }
      _refresh() {
        if (this._request) {
          return;
        }
        this._running = true;
        this._request = requestAnimFrame.call(window, () => {
          this._update();
          this._request = null;
          if (this._running) {
            this._refresh();
          }
        });
      }
      _update(date = Date.now()) {
        let remaining = 0;
        this._charts.forEach((anims, chart2) => {
          if (!anims.running || !anims.items.length) {
            return;
          }
          const items = anims.items;
          let i = items.length - 1;
          let draw2 = false;
          let item;
          for (; i >= 0; --i) {
            item = items[i];
            if (item._active) {
              if (item._total > anims.duration) {
                anims.duration = item._total;
              }
              item.tick(date);
              draw2 = true;
            } else {
              items[i] = items[items.length - 1];
              items.pop();
            }
          }
          if (draw2) {
            chart2.draw();
            this._notify(chart2, anims, date, "progress");
          }
          if (!items.length) {
            anims.running = false;
            this._notify(chart2, anims, date, "complete");
            anims.initial = false;
          }
          remaining += items.length;
        });
        this._lastDate = date;
        if (remaining === 0) {
          this._running = false;
        }
      }
      _getAnims(chart2) {
        const charts = this._charts;
        let anims = charts.get(chart2);
        if (!anims) {
          anims = {
            running: false,
            initial: true,
            items: [],
            listeners: {
              complete: [],
              progress: []
            }
          };
          charts.set(chart2, anims);
        }
        return anims;
      }
      listen(chart2, event, cb) {
        this._getAnims(chart2).listeners[event].push(cb);
      }
      add(chart2, items) {
        if (!items || !items.length) {
          return;
        }
        this._getAnims(chart2).items.push(...items);
      }
      has(chart2) {
        return this._getAnims(chart2).items.length > 0;
      }
      start(chart2) {
        const anims = this._charts.get(chart2);
        if (!anims) {
          return;
        }
        anims.running = true;
        anims.start = Date.now();
        anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
        this._refresh();
      }
      running(chart2) {
        if (!this._running) {
          return false;
        }
        const anims = this._charts.get(chart2);
        if (!anims || !anims.running || !anims.items.length) {
          return false;
        }
        return true;
      }
      stop(chart2) {
        const anims = this._charts.get(chart2);
        if (!anims || !anims.items.length) {
          return;
        }
        const items = anims.items;
        let i = items.length - 1;
        for (; i >= 0; --i) {
          items[i].cancel();
        }
        anims.items = [];
        this._notify(chart2, anims, Date.now(), "complete");
      }
      remove(chart2) {
        return this._charts.delete(chart2);
      }
    };
    animator = /* @__PURE__ */ new Animator();
    transparent = "transparent";
    interpolators = {
      boolean(from2, to2, factor) {
        return factor > 0.5 ? to2 : from2;
      },
      color(from2, to2, factor) {
        const c0 = color(from2 || transparent);
        const c1 = c0.valid && color(to2 || transparent);
        return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to2;
      },
      number(from2, to2, factor) {
        return from2 + (to2 - from2) * factor;
      }
    };
    Animation = class {
      constructor(cfg, target, prop, to2) {
        const currentValue = target[prop];
        to2 = resolve2([
          cfg.to,
          to2,
          currentValue,
          cfg.from
        ]);
        const from2 = resolve2([
          cfg.from,
          currentValue,
          to2
        ]);
        this._active = true;
        this._fn = cfg.fn || interpolators[cfg.type || typeof from2];
        this._easing = effects[cfg.easing] || effects.linear;
        this._start = Math.floor(Date.now() + (cfg.delay || 0));
        this._duration = this._total = Math.floor(cfg.duration);
        this._loop = !!cfg.loop;
        this._target = target;
        this._prop = prop;
        this._from = from2;
        this._to = to2;
        this._promises = void 0;
      }
      active() {
        return this._active;
      }
      update(cfg, to2, date) {
        if (this._active) {
          this._notify(false);
          const currentValue = this._target[this._prop];
          const elapsed = date - this._start;
          const remain = this._duration - elapsed;
          this._start = date;
          this._duration = Math.floor(Math.max(remain, cfg.duration));
          this._total += elapsed;
          this._loop = !!cfg.loop;
          this._to = resolve2([
            cfg.to,
            to2,
            currentValue,
            cfg.from
          ]);
          this._from = resolve2([
            cfg.from,
            currentValue,
            to2
          ]);
        }
      }
      cancel() {
        if (this._active) {
          this.tick(Date.now());
          this._active = false;
          this._notify(false);
        }
      }
      tick(date) {
        const elapsed = date - this._start;
        const duration = this._duration;
        const prop = this._prop;
        const from2 = this._from;
        const loop = this._loop;
        const to2 = this._to;
        let factor;
        this._active = from2 !== to2 && (loop || elapsed < duration);
        if (!this._active) {
          this._target[prop] = to2;
          this._notify(true);
          return;
        }
        if (elapsed < 0) {
          this._target[prop] = from2;
          return;
        }
        factor = elapsed / duration % 2;
        factor = loop && factor > 1 ? 2 - factor : factor;
        factor = this._easing(Math.min(1, Math.max(0, factor)));
        this._target[prop] = this._fn(from2, to2, factor);
      }
      wait() {
        const promises = this._promises || (this._promises = []);
        return new Promise((res, rej) => {
          promises.push({
            res,
            rej
          });
        });
      }
      _notify(resolved) {
        const method = resolved ? "res" : "rej";
        const promises = this._promises || [];
        for (let i = 0; i < promises.length; i++) {
          promises[i][method]();
        }
      }
    };
    Animations = class {
      constructor(chart2, config) {
        this._chart = chart2;
        this._properties = /* @__PURE__ */ new Map();
        this.configure(config);
      }
      configure(config) {
        if (!isObject(config)) {
          return;
        }
        const animationOptions = Object.keys(defaults.animation);
        const animatedProps = this._properties;
        Object.getOwnPropertyNames(config).forEach((key2) => {
          const cfg = config[key2];
          if (!isObject(cfg)) {
            return;
          }
          const resolved = {};
          for (const option of animationOptions) {
            resolved[option] = cfg[option];
          }
          (isArray(cfg.properties) && cfg.properties || [
            key2
          ]).forEach((prop) => {
            if (prop === key2 || !animatedProps.has(prop)) {
              animatedProps.set(prop, resolved);
            }
          });
        });
      }
      _animateOptions(target, values) {
        const newOptions = values.options;
        const options2 = resolveTargetOptions(target, newOptions);
        if (!options2) {
          return [];
        }
        const animations = this._createAnimations(options2, newOptions);
        if (newOptions.$shared) {
          awaitAll(target.options.$animations, newOptions).then(() => {
            target.options = newOptions;
          }, () => {
          });
        }
        return animations;
      }
      _createAnimations(target, values) {
        const animatedProps = this._properties;
        const animations = [];
        const running = target.$animations || (target.$animations = {});
        const props = Object.keys(values);
        const date = Date.now();
        let i;
        for (i = props.length - 1; i >= 0; --i) {
          const prop = props[i];
          if (prop.charAt(0) === "$") {
            continue;
          }
          if (prop === "options") {
            animations.push(...this._animateOptions(target, values));
            continue;
          }
          const value = values[prop];
          let animation = running[prop];
          const cfg = animatedProps.get(prop);
          if (animation) {
            if (cfg && animation.active()) {
              animation.update(cfg, value, date);
              continue;
            } else {
              animation.cancel();
            }
          }
          if (!cfg || !cfg.duration) {
            target[prop] = value;
            continue;
          }
          running[prop] = animation = new Animation(cfg, target, prop, value);
          animations.push(animation);
        }
        return animations;
      }
      update(target, values) {
        if (this._properties.size === 0) {
          Object.assign(target, values);
          return;
        }
        const animations = this._createAnimations(target, values);
        if (animations.length) {
          animator.add(this._chart, animations);
          return true;
        }
      }
    };
    isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
    cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
    createStack = (canStack, meta, chart2) => canStack && !meta.hidden && meta._stacked && {
      keys: getSortedDatasetIndices(chart2, true),
      values: null
    };
    DatasetController = class {
      static defaults = {};
      static datasetElementType = null;
      static dataElementType = null;
      constructor(chart2, datasetIndex) {
        this.chart = chart2;
        this._ctx = chart2.ctx;
        this.index = datasetIndex;
        this._cachedDataOpts = {};
        this._cachedMeta = this.getMeta();
        this._type = this._cachedMeta.type;
        this.options = void 0;
        this._parsing = false;
        this._data = void 0;
        this._objectData = void 0;
        this._sharedOptions = void 0;
        this._drawStart = void 0;
        this._drawCount = void 0;
        this.enableOptionSharing = false;
        this.supportsDecimation = false;
        this.$context = void 0;
        this._syncList = [];
        this.datasetElementType = new.target.datasetElementType;
        this.dataElementType = new.target.dataElementType;
        this.initialize();
      }
      initialize() {
        const meta = this._cachedMeta;
        this.configure();
        this.linkScales();
        meta._stacked = isStacked(meta.vScale, meta);
        this.addElements();
        if (this.options.fill && !this.chart.isPluginEnabled("filler")) {
          console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
        }
      }
      updateIndex(datasetIndex) {
        if (this.index !== datasetIndex) {
          clearStacks(this._cachedMeta);
        }
        this.index = datasetIndex;
      }
      linkScales() {
        const chart2 = this.chart;
        const meta = this._cachedMeta;
        const dataset = this.getDataset();
        const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
        const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart2, "x"));
        const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart2, "y"));
        const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart2, "r"));
        const indexAxis = meta.indexAxis;
        const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
        const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
        meta.xScale = this.getScaleForId(xid);
        meta.yScale = this.getScaleForId(yid);
        meta.rScale = this.getScaleForId(rid);
        meta.iScale = this.getScaleForId(iid);
        meta.vScale = this.getScaleForId(vid);
      }
      getDataset() {
        return this.chart.data.datasets[this.index];
      }
      getMeta() {
        return this.chart.getDatasetMeta(this.index);
      }
      getScaleForId(scaleID) {
        return this.chart.scales[scaleID];
      }
      _getOtherScale(scale) {
        const meta = this._cachedMeta;
        return scale === meta.iScale ? meta.vScale : meta.iScale;
      }
      reset() {
        this._update("reset");
      }
      _destroy() {
        const meta = this._cachedMeta;
        if (this._data) {
          unlistenArrayEvents(this._data, this);
        }
        if (meta._stacked) {
          clearStacks(meta);
        }
      }
      _dataCheck() {
        const dataset = this.getDataset();
        const data = dataset.data || (dataset.data = []);
        const _data = this._data;
        if (isObject(data)) {
          const meta = this._cachedMeta;
          this._data = convertObjectDataToArray(data, meta);
        } else if (_data !== data) {
          if (_data) {
            unlistenArrayEvents(_data, this);
            const meta = this._cachedMeta;
            clearStacks(meta);
            meta._parsed = [];
          }
          if (data && Object.isExtensible(data)) {
            listenArrayEvents(data, this);
          }
          this._syncList = [];
          this._data = data;
        }
      }
      addElements() {
        const meta = this._cachedMeta;
        this._dataCheck();
        if (this.datasetElementType) {
          meta.dataset = new this.datasetElementType();
        }
      }
      buildOrUpdateElements(resetNewElements) {
        const meta = this._cachedMeta;
        const dataset = this.getDataset();
        let stackChanged = false;
        this._dataCheck();
        const oldStacked = meta._stacked;
        meta._stacked = isStacked(meta.vScale, meta);
        if (meta.stack !== dataset.stack) {
          stackChanged = true;
          clearStacks(meta);
          meta.stack = dataset.stack;
        }
        this._resyncElements(resetNewElements);
        if (stackChanged || oldStacked !== meta._stacked) {
          updateStacks(this, meta._parsed);
          meta._stacked = isStacked(meta.vScale, meta);
        }
      }
      configure() {
        const config = this.chart.config;
        const scopeKeys = config.datasetScopeKeys(this._type);
        const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
        this.options = config.createResolver(scopes, this.getContext());
        this._parsing = this.options.parsing;
        this._cachedDataOpts = {};
      }
      parse(start, count) {
        const { _cachedMeta: meta, _data: data } = this;
        const { iScale, _stacked } = meta;
        const iAxis = iScale.axis;
        let sorted = start === 0 && count === data.length ? true : meta._sorted;
        let prev = start > 0 && meta._parsed[start - 1];
        let i, cur, parsed;
        if (this._parsing === false) {
          meta._parsed = data;
          meta._sorted = true;
          parsed = data;
        } else {
          if (isArray(data[start])) {
            parsed = this.parseArrayData(meta, data, start, count);
          } else if (isObject(data[start])) {
            parsed = this.parseObjectData(meta, data, start, count);
          } else {
            parsed = this.parsePrimitiveData(meta, data, start, count);
          }
          const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
          for (i = 0; i < count; ++i) {
            meta._parsed[i + start] = cur = parsed[i];
            if (sorted) {
              if (isNotInOrderComparedToPrev()) {
                sorted = false;
              }
              prev = cur;
            }
          }
          meta._sorted = sorted;
        }
        if (_stacked) {
          updateStacks(this, parsed);
        }
      }
      parsePrimitiveData(meta, data, start, count) {
        const { iScale, vScale } = meta;
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const labels = iScale.getLabels();
        const singleScale = iScale === vScale;
        const parsed = new Array(count);
        let i, ilen, index7;
        for (i = 0, ilen = count; i < ilen; ++i) {
          index7 = i + start;
          parsed[i] = {
            [iAxis]: singleScale || iScale.parse(labels[index7], index7),
            [vAxis]: vScale.parse(data[index7], index7)
          };
        }
        return parsed;
      }
      parseArrayData(meta, data, start, count) {
        const { xScale, yScale } = meta;
        const parsed = new Array(count);
        let i, ilen, index7, item;
        for (i = 0, ilen = count; i < ilen; ++i) {
          index7 = i + start;
          item = data[index7];
          parsed[i] = {
            x: xScale.parse(item[0], index7),
            y: yScale.parse(item[1], index7)
          };
        }
        return parsed;
      }
      parseObjectData(meta, data, start, count) {
        const { xScale, yScale } = meta;
        const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
        const parsed = new Array(count);
        let i, ilen, index7, item;
        for (i = 0, ilen = count; i < ilen; ++i) {
          index7 = i + start;
          item = data[index7];
          parsed[i] = {
            x: xScale.parse(resolveObjectKey(item, xAxisKey), index7),
            y: yScale.parse(resolveObjectKey(item, yAxisKey), index7)
          };
        }
        return parsed;
      }
      getParsed(index7) {
        return this._cachedMeta._parsed[index7];
      }
      getDataElement(index7) {
        return this._cachedMeta.data[index7];
      }
      applyStack(scale, parsed, mode) {
        const chart2 = this.chart;
        const meta = this._cachedMeta;
        const value = parsed[scale.axis];
        const stack = {
          keys: getSortedDatasetIndices(chart2, true),
          values: parsed._stacks[scale.axis]._visualValues
        };
        return applyStack(stack, value, meta.index, {
          mode
        });
      }
      updateRangeFromParsed(range, scale, parsed, stack) {
        const parsedValue = parsed[scale.axis];
        let value = parsedValue === null ? NaN : parsedValue;
        const values = stack && parsed._stacks[scale.axis];
        if (stack && values) {
          stack.values = values;
          value = applyStack(stack, parsedValue, this._cachedMeta.index);
        }
        range.min = Math.min(range.min, value);
        range.max = Math.max(range.max, value);
      }
      getMinMax(scale, canStack) {
        const meta = this._cachedMeta;
        const _parsed = meta._parsed;
        const sorted = meta._sorted && scale === meta.iScale;
        const ilen = _parsed.length;
        const otherScale = this._getOtherScale(scale);
        const stack = createStack(canStack, meta, this.chart);
        const range = {
          min: Number.POSITIVE_INFINITY,
          max: Number.NEGATIVE_INFINITY
        };
        const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
        let i, parsed;
        function _skip() {
          parsed = _parsed[i];
          const otherValue = parsed[otherScale.axis];
          return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
        }
        for (i = 0; i < ilen; ++i) {
          if (_skip()) {
            continue;
          }
          this.updateRangeFromParsed(range, scale, parsed, stack);
          if (sorted) {
            break;
          }
        }
        if (sorted) {
          for (i = ilen - 1; i >= 0; --i) {
            if (_skip()) {
              continue;
            }
            this.updateRangeFromParsed(range, scale, parsed, stack);
            break;
          }
        }
        return range;
      }
      getAllParsedValues(scale) {
        const parsed = this._cachedMeta._parsed;
        const values = [];
        let i, ilen, value;
        for (i = 0, ilen = parsed.length; i < ilen; ++i) {
          value = parsed[i][scale.axis];
          if (isNumberFinite(value)) {
            values.push(value);
          }
        }
        return values;
      }
      getMaxOverflow() {
        return false;
      }
      getLabelAndValue(index7) {
        const meta = this._cachedMeta;
        const iScale = meta.iScale;
        const vScale = meta.vScale;
        const parsed = this.getParsed(index7);
        return {
          label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
          value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
        };
      }
      _update(mode) {
        const meta = this._cachedMeta;
        this.update(mode || "default");
        meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
      }
      update(mode) {
      }
      draw() {
        const ctx = this._ctx;
        const chart2 = this.chart;
        const meta = this._cachedMeta;
        const elements = meta.data || [];
        const area = chart2.chartArea;
        const active = [];
        const start = this._drawStart || 0;
        const count = this._drawCount || elements.length - start;
        const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
        let i;
        if (meta.dataset) {
          meta.dataset.draw(ctx, area, start, count);
        }
        for (i = start; i < start + count; ++i) {
          const element = elements[i];
          if (element.hidden) {
            continue;
          }
          if (element.active && drawActiveElementsOnTop) {
            active.push(element);
          } else {
            element.draw(ctx, area);
          }
        }
        for (i = 0; i < active.length; ++i) {
          active[i].draw(ctx, area);
        }
      }
      getStyle(index7, active) {
        const mode = active ? "active" : "default";
        return index7 === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index7 || 0, mode);
      }
      getContext(index7, active, mode) {
        const dataset = this.getDataset();
        let context;
        if (index7 >= 0 && index7 < this._cachedMeta.data.length) {
          const element = this._cachedMeta.data[index7];
          context = element.$context || (element.$context = createDataContext(this.getContext(), index7, element));
          context.parsed = this.getParsed(index7);
          context.raw = dataset.data[index7];
          context.index = context.dataIndex = index7;
        } else {
          context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
          context.dataset = dataset;
          context.index = context.datasetIndex = this.index;
        }
        context.active = !!active;
        context.mode = mode;
        return context;
      }
      resolveDatasetElementOptions(mode) {
        return this._resolveElementOptions(this.datasetElementType.id, mode);
      }
      resolveDataElementOptions(index7, mode) {
        return this._resolveElementOptions(this.dataElementType.id, mode, index7);
      }
      _resolveElementOptions(elementType, mode = "default", index7) {
        const active = mode === "active";
        const cache = this._cachedDataOpts;
        const cacheKey = elementType + "-" + mode;
        const cached = cache[cacheKey];
        const sharing = this.enableOptionSharing && defined(index7);
        if (cached) {
          return cloneIfNotShared(cached, sharing);
        }
        const config = this.chart.config;
        const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
        const prefixes = active ? [
          `${elementType}Hover`,
          "hover",
          elementType,
          ""
        ] : [
          elementType,
          ""
        ];
        const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
        const names2 = Object.keys(defaults.elements[elementType]);
        const context = () => this.getContext(index7, active, mode);
        const values = config.resolveNamedOptions(scopes, names2, context, prefixes);
        if (values.$shared) {
          values.$shared = sharing;
          cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
        }
        return values;
      }
      _resolveAnimations(index7, transition, active) {
        const chart2 = this.chart;
        const cache = this._cachedDataOpts;
        const cacheKey = `animation-${transition}`;
        const cached = cache[cacheKey];
        if (cached) {
          return cached;
        }
        let options2;
        if (chart2.options.animation !== false) {
          const config = this.chart.config;
          const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
          const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
          options2 = config.createResolver(scopes, this.getContext(index7, active, transition));
        }
        const animations = new Animations(chart2, options2 && options2.animations);
        if (options2 && options2._cacheable) {
          cache[cacheKey] = Object.freeze(animations);
        }
        return animations;
      }
      getSharedOptions(options2) {
        if (!options2.$shared) {
          return;
        }
        return this._sharedOptions || (this._sharedOptions = Object.assign({}, options2));
      }
      includeOptions(mode, sharedOptions) {
        return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
      }
      _getSharedOptions(start, mode) {
        const firstOpts = this.resolveDataElementOptions(start, mode);
        const previouslySharedOptions = this._sharedOptions;
        const sharedOptions = this.getSharedOptions(firstOpts);
        const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
        this.updateSharedOptions(sharedOptions, mode, firstOpts);
        return {
          sharedOptions,
          includeOptions
        };
      }
      updateElement(element, index7, properties, mode) {
        if (isDirectUpdateMode(mode)) {
          Object.assign(element, properties);
        } else {
          this._resolveAnimations(index7, mode).update(element, properties);
        }
      }
      updateSharedOptions(sharedOptions, mode, newOptions) {
        if (sharedOptions && !isDirectUpdateMode(mode)) {
          this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
        }
      }
      _setStyle(element, index7, mode, active) {
        element.active = active;
        const options2 = this.getStyle(index7, active);
        this._resolveAnimations(index7, mode, active).update(element, {
          options: !active && this.getSharedOptions(options2) || options2
        });
      }
      removeHoverStyle(element, datasetIndex, index7) {
        this._setStyle(element, index7, "active", false);
      }
      setHoverStyle(element, datasetIndex, index7) {
        this._setStyle(element, index7, "active", true);
      }
      _removeDatasetHoverStyle() {
        const element = this._cachedMeta.dataset;
        if (element) {
          this._setStyle(element, void 0, "active", false);
        }
      }
      _setDatasetHoverStyle() {
        const element = this._cachedMeta.dataset;
        if (element) {
          this._setStyle(element, void 0, "active", true);
        }
      }
      _resyncElements(resetNewElements) {
        const data = this._data;
        const elements = this._cachedMeta.data;
        for (const [method, arg1, arg2] of this._syncList) {
          this[method](arg1, arg2);
        }
        this._syncList = [];
        const numMeta = elements.length;
        const numData = data.length;
        const count = Math.min(numData, numMeta);
        if (count) {
          this.parse(0, count);
        }
        if (numData > numMeta) {
          this._insertElements(numMeta, numData - numMeta, resetNewElements);
        } else if (numData < numMeta) {
          this._removeElements(numData, numMeta - numData);
        }
      }
      _insertElements(start, count, resetNewElements = true) {
        const meta = this._cachedMeta;
        const data = meta.data;
        const end = start + count;
        let i;
        const move = (arr) => {
          arr.length += count;
          for (i = arr.length - 1; i >= end; i--) {
            arr[i] = arr[i - count];
          }
        };
        move(data);
        for (i = start; i < end; ++i) {
          data[i] = new this.dataElementType();
        }
        if (this._parsing) {
          move(meta._parsed);
        }
        this.parse(start, count);
        if (resetNewElements) {
          this.updateElements(data, start, count, "reset");
        }
      }
      updateElements(element, start, count, mode) {
      }
      _removeElements(start, count) {
        const meta = this._cachedMeta;
        if (this._parsing) {
          const removed = meta._parsed.splice(start, count);
          if (meta._stacked) {
            clearStacks(meta, removed);
          }
        }
        meta.data.splice(start, count);
      }
      _sync(args) {
        if (this._parsing) {
          this._syncList.push(args);
        } else {
          const [method, arg1, arg2] = args;
          this[method](arg1, arg2);
        }
        this.chart._dataChanges.push([
          this.index,
          ...args
        ]);
      }
      _onDataPush() {
        const count = arguments.length;
        this._sync([
          "_insertElements",
          this.getDataset().data.length - count,
          count
        ]);
      }
      _onDataPop() {
        this._sync([
          "_removeElements",
          this._cachedMeta.data.length - 1,
          1
        ]);
      }
      _onDataShift() {
        this._sync([
          "_removeElements",
          0,
          1
        ]);
      }
      _onDataSplice(start, count) {
        if (count) {
          this._sync([
            "_removeElements",
            start,
            count
          ]);
        }
        const newCount = arguments.length - 2;
        if (newCount) {
          this._sync([
            "_insertElements",
            start,
            newCount
          ]);
        }
      }
      _onDataUnshift() {
        this._sync([
          "_insertElements",
          0,
          arguments.length
        ]);
      }
    };
    LineController = class extends DatasetController {
      static id = "line";
      static defaults = {
        datasetElementType: "line",
        dataElementType: "point",
        showLine: true,
        spanGaps: false
      };
      static overrides = {
        scales: {
          _index_: {
            type: "category"
          },
          _value_: {
            type: "linear"
          }
        }
      };
      initialize() {
        this.enableOptionSharing = true;
        this.supportsDecimation = true;
        super.initialize();
      }
      update(mode) {
        const meta = this._cachedMeta;
        const { dataset: line, data: points = [], _dataset } = meta;
        const animationsDisabled = this.chart._animationsDisabled;
        let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
        this._drawStart = start;
        this._drawCount = count;
        if (_scaleRangesChanged(meta)) {
          start = 0;
          count = points.length;
        }
        line._chart = this.chart;
        line._datasetIndex = this.index;
        line._decimated = !!_dataset._decimated;
        line.points = points;
        const options2 = this.resolveDatasetElementOptions(mode);
        if (!this.options.showLine) {
          options2.borderWidth = 0;
        }
        options2.segment = this.options.segment;
        this.updateElement(line, void 0, {
          animated: !animationsDisabled,
          options: options2
        }, mode);
        this.updateElements(points, start, count, mode);
      }
      updateElements(points, start, count, mode) {
        const reset2 = mode === "reset";
        const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
        const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const { spanGaps, segment } = this.options;
        const maxGapLength = isNumber2(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
        const directUpdate = this.chart._animationsDisabled || reset2 || mode === "none";
        const end = start + count;
        const pointsCount = points.length;
        let prevParsed = start > 0 && this.getParsed(start - 1);
        for (let i = 0; i < pointsCount; ++i) {
          const point = points[i];
          const properties = directUpdate ? point : {};
          if (i < start || i >= end) {
            properties.skip = true;
            continue;
          }
          const parsed = this.getParsed(i);
          const nullData = isNullOrUndef(parsed[vAxis]);
          const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
          const vPixel = properties[vAxis] = reset2 || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
          properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
          properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
          if (segment) {
            properties.parsed = parsed;
            properties.raw = _dataset.data[i];
          }
          if (includeOptions) {
            properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
          }
          if (!directUpdate) {
            this.updateElement(point, i, properties, mode);
          }
          prevParsed = parsed;
        }
      }
      getMaxOverflow() {
        const meta = this._cachedMeta;
        const dataset = meta.dataset;
        const border = dataset.options && dataset.options.borderWidth || 0;
        const data = meta.data || [];
        if (!data.length) {
          return border;
        }
        const firstPoint = data[0].size(this.resolveDataElementOptions(0));
        const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
        return Math.max(border, firstPoint, lastPoint) / 2;
      }
      draw() {
        const meta = this._cachedMeta;
        meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
        super.draw();
      }
    };
    DateAdapterBase = class _DateAdapterBase {
      /**
      * Override default date adapter methods.
      * Accepts type parameter to define options type.
      * @example
      * Chart._adapters._date.override<{myAdapterOption: string}>({
      *   init() {
      *     console.log(this.options.myAdapterOption);
      *   }
      * })
      */
      static override(members) {
        Object.assign(_DateAdapterBase.prototype, members);
      }
      options;
      constructor(options2) {
        this.options = options2 || {};
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      init() {
      }
      formats() {
        return abstract();
      }
      parse() {
        return abstract();
      }
      format() {
        return abstract();
      }
      add() {
        return abstract();
      }
      diff() {
        return abstract();
      }
      startOf() {
        return abstract();
      }
      endOf() {
        return abstract();
      }
    };
    adapters = {
      _date: DateAdapterBase
    };
    Interaction = {
      evaluateInteractionItems,
      modes: {
        index(chart2, e, options2, useFinalPosition) {
          const position = getRelativePosition(e, chart2);
          const axis = options2.axis || "x";
          const includeInvisible = options2.includeInvisible || false;
          const items = options2.intersect ? getIntersectItems(chart2, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart2, position, axis, false, useFinalPosition, includeInvisible);
          const elements = [];
          if (!items.length) {
            return [];
          }
          chart2.getSortedVisibleDatasetMetas().forEach((meta) => {
            const index7 = items[0].index;
            const element = meta.data[index7];
            if (element && !element.skip) {
              elements.push({
                element,
                datasetIndex: meta.index,
                index: index7
              });
            }
          });
          return elements;
        },
        dataset(chart2, e, options2, useFinalPosition) {
          const position = getRelativePosition(e, chart2);
          const axis = options2.axis || "xy";
          const includeInvisible = options2.includeInvisible || false;
          let items = options2.intersect ? getIntersectItems(chart2, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart2, position, axis, false, useFinalPosition, includeInvisible);
          if (items.length > 0) {
            const datasetIndex = items[0].datasetIndex;
            const data = chart2.getDatasetMeta(datasetIndex).data;
            items = [];
            for (let i = 0; i < data.length; ++i) {
              items.push({
                element: data[i],
                datasetIndex,
                index: i
              });
            }
          }
          return items;
        },
        point(chart2, e, options2, useFinalPosition) {
          const position = getRelativePosition(e, chart2);
          const axis = options2.axis || "xy";
          const includeInvisible = options2.includeInvisible || false;
          return getIntersectItems(chart2, position, axis, useFinalPosition, includeInvisible);
        },
        nearest(chart2, e, options2, useFinalPosition) {
          const position = getRelativePosition(e, chart2);
          const axis = options2.axis || "xy";
          const includeInvisible = options2.includeInvisible || false;
          return getNearestItems(chart2, position, axis, options2.intersect, useFinalPosition, includeInvisible);
        },
        x(chart2, e, options2, useFinalPosition) {
          const position = getRelativePosition(e, chart2);
          return getAxisItems(chart2, position, "x", options2.intersect, useFinalPosition);
        },
        y(chart2, e, options2, useFinalPosition) {
          const position = getRelativePosition(e, chart2);
          return getAxisItems(chart2, position, "y", options2.intersect, useFinalPosition);
        }
      }
    };
    STATIC_POSITIONS = [
      "left",
      "top",
      "right",
      "bottom"
    ];
    layouts = {
      addBox(chart2, item) {
        if (!chart2.boxes) {
          chart2.boxes = [];
        }
        item.fullSize = item.fullSize || false;
        item.position = item.position || "top";
        item.weight = item.weight || 0;
        item._layers = item._layers || function() {
          return [
            {
              z: 0,
              draw(chartArea) {
                item.draw(chartArea);
              }
            }
          ];
        };
        chart2.boxes.push(item);
      },
      removeBox(chart2, layoutItem) {
        const index7 = chart2.boxes ? chart2.boxes.indexOf(layoutItem) : -1;
        if (index7 !== -1) {
          chart2.boxes.splice(index7, 1);
        }
      },
      configure(chart2, item, options2) {
        item.fullSize = options2.fullSize;
        item.position = options2.position;
        item.weight = options2.weight;
      },
      update(chart2, width, height, minPadding) {
        if (!chart2) {
          return;
        }
        const padding = toPadding(chart2.options.layout.padding);
        const availableWidth = Math.max(width - padding.width, 0);
        const availableHeight = Math.max(height - padding.height, 0);
        const boxes = buildLayoutBoxes(chart2.boxes);
        const verticalBoxes = boxes.vertical;
        const horizontalBoxes = boxes.horizontal;
        each2(chart2.boxes, (box) => {
          if (typeof box.beforeLayout === "function") {
            box.beforeLayout();
          }
        });
        const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
        const params = Object.freeze({
          outerWidth: width,
          outerHeight: height,
          padding,
          availableWidth,
          availableHeight,
          vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
          hBoxMaxHeight: availableHeight / 2
        });
        const maxPadding = Object.assign({}, padding);
        updateMaxPadding(maxPadding, toPadding(minPadding));
        const chartArea = Object.assign({
          maxPadding,
          w: availableWidth,
          h: availableHeight,
          x: padding.left,
          y: padding.top
        }, padding);
        const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
        fitBoxes(boxes.fullSize, chartArea, params, stacks);
        fitBoxes(verticalBoxes, chartArea, params, stacks);
        if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
          fitBoxes(verticalBoxes, chartArea, params, stacks);
        }
        handleMaxPadding(chartArea);
        placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
        chartArea.x += chartArea.w;
        chartArea.y += chartArea.h;
        placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
        chart2.chartArea = {
          left: chartArea.left,
          top: chartArea.top,
          right: chartArea.left + chartArea.w,
          bottom: chartArea.top + chartArea.h,
          height: chartArea.h,
          width: chartArea.w
        };
        each2(boxes.chartArea, (layout) => {
          const box = layout.box;
          Object.assign(box, chart2.chartArea);
          box.update(chartArea.w, chartArea.h, {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          });
        });
      }
    };
    BasePlatform = class {
      acquireContext(canvas, aspectRatio) {
      }
      releaseContext(context) {
        return false;
      }
      addEventListener(chart2, type, listener) {
      }
      removeEventListener(chart2, type, listener) {
      }
      getDevicePixelRatio() {
        return 1;
      }
      getMaximumSize(element, width, height, aspectRatio) {
        width = Math.max(0, width || element.width);
        height = height || element.height;
        return {
          width,
          height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
        };
      }
      isAttached(canvas) {
        return true;
      }
      updateConfig(config) {
      }
    };
    BasicPlatform = class extends BasePlatform {
      acquireContext(item) {
        return item && item.getContext && item.getContext("2d") || null;
      }
      updateConfig(config) {
        config.options.animation = false;
      }
    };
    EXPANDO_KEY = "$chartjs";
    EVENT_TYPES = {
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup",
      pointerenter: "mouseenter",
      pointerdown: "mousedown",
      pointermove: "mousemove",
      pointerup: "mouseup",
      pointerleave: "mouseout",
      pointerout: "mouseout"
    };
    isNullOrEmpty = (value) => value === null || value === "";
    eventListenerOptions = supportsEventListenerOptions ? {
      passive: true
    } : false;
    drpListeningCharts = /* @__PURE__ */ new Map();
    oldDevicePixelRatio = 0;
    DomPlatform = class extends BasePlatform {
      acquireContext(canvas, aspectRatio) {
        const context = canvas && canvas.getContext && canvas.getContext("2d");
        if (context && context.canvas === canvas) {
          initCanvas(canvas, aspectRatio);
          return context;
        }
        return null;
      }
      releaseContext(context) {
        const canvas = context.canvas;
        if (!canvas[EXPANDO_KEY]) {
          return false;
        }
        const initial2 = canvas[EXPANDO_KEY].initial;
        [
          "height",
          "width"
        ].forEach((prop) => {
          const value = initial2[prop];
          if (isNullOrUndef(value)) {
            canvas.removeAttribute(prop);
          } else {
            canvas.setAttribute(prop, value);
          }
        });
        const style = initial2.style || {};
        Object.keys(style).forEach((key2) => {
          canvas.style[key2] = style[key2];
        });
        canvas.width = canvas.width;
        delete canvas[EXPANDO_KEY];
        return true;
      }
      addEventListener(chart2, type, listener) {
        this.removeEventListener(chart2, type);
        const proxies = chart2.$proxies || (chart2.$proxies = {});
        const handlers = {
          attach: createAttachObserver,
          detach: createDetachObserver,
          resize: createResizeObserver
        };
        const handler = handlers[type] || createProxyAndListen;
        proxies[type] = handler(chart2, type, listener);
      }
      removeEventListener(chart2, type) {
        const proxies = chart2.$proxies || (chart2.$proxies = {});
        const proxy = proxies[type];
        if (!proxy) {
          return;
        }
        const handlers = {
          attach: releaseObserver,
          detach: releaseObserver,
          resize: releaseObserver
        };
        const handler = handlers[type] || removeListener;
        handler(chart2, type, proxy);
        proxies[type] = void 0;
      }
      getDevicePixelRatio() {
        return window.devicePixelRatio;
      }
      getMaximumSize(canvas, width, height, aspectRatio) {
        return getMaximumSize(canvas, width, height, aspectRatio);
      }
      isAttached(canvas) {
        const container = canvas && _getParentNode(canvas);
        return !!(container && container.isConnected);
      }
    };
    Element2 = class {
      static defaults = {};
      static defaultRoutes = void 0;
      x;
      y;
      active = false;
      options;
      $animations;
      tooltipPosition(useFinalPosition) {
        const { x, y } = this.getProps([
          "x",
          "y"
        ], useFinalPosition);
        return {
          x,
          y
        };
      }
      hasValue() {
        return isNumber2(this.x) && isNumber2(this.y);
      }
      getProps(props, final) {
        const anims = this.$animations;
        if (!final || !anims) {
          return this;
        }
        const ret = {};
        props.forEach((prop) => {
          ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
        });
        return ret;
      }
    };
    reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
    offsetFromEdge = (scale, edge, offset3) => edge === "top" || edge === "left" ? scale[edge] + offset3 : scale[edge] - offset3;
    getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
    Scale = class _Scale extends Element2 {
      constructor(cfg) {
        super();
        this.id = cfg.id;
        this.type = cfg.type;
        this.options = void 0;
        this.ctx = cfg.ctx;
        this.chart = cfg.chart;
        this.top = void 0;
        this.bottom = void 0;
        this.left = void 0;
        this.right = void 0;
        this.width = void 0;
        this.height = void 0;
        this._margins = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
        this.maxWidth = void 0;
        this.maxHeight = void 0;
        this.paddingTop = void 0;
        this.paddingBottom = void 0;
        this.paddingLeft = void 0;
        this.paddingRight = void 0;
        this.axis = void 0;
        this.labelRotation = void 0;
        this.min = void 0;
        this.max = void 0;
        this._range = void 0;
        this.ticks = [];
        this._gridLineItems = null;
        this._labelItems = null;
        this._labelSizes = null;
        this._length = 0;
        this._maxLength = 0;
        this._longestTextCache = {};
        this._startPixel = void 0;
        this._endPixel = void 0;
        this._reversePixels = false;
        this._userMax = void 0;
        this._userMin = void 0;
        this._suggestedMax = void 0;
        this._suggestedMin = void 0;
        this._ticksLength = 0;
        this._borderValue = 0;
        this._cache = {};
        this._dataLimitsCached = false;
        this.$context = void 0;
      }
      init(options2) {
        this.options = options2.setContext(this.getContext());
        this.axis = options2.axis;
        this._userMin = this.parse(options2.min);
        this._userMax = this.parse(options2.max);
        this._suggestedMin = this.parse(options2.suggestedMin);
        this._suggestedMax = this.parse(options2.suggestedMax);
      }
      parse(raw, index7) {
        return raw;
      }
      getUserBounds() {
        let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
        _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
        _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
        _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
        _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
        return {
          min: finiteOrDefault(_userMin, _suggestedMin),
          max: finiteOrDefault(_userMax, _suggestedMax),
          minDefined: isNumberFinite(_userMin),
          maxDefined: isNumberFinite(_userMax)
        };
      }
      getMinMax(canStack) {
        let { min: min2, max: max2, minDefined, maxDefined } = this.getUserBounds();
        let range;
        if (minDefined && maxDefined) {
          return {
            min: min2,
            max: max2
          };
        }
        const metas = this.getMatchingVisibleMetas();
        for (let i = 0, ilen = metas.length; i < ilen; ++i) {
          range = metas[i].controller.getMinMax(this, canStack);
          if (!minDefined) {
            min2 = Math.min(min2, range.min);
          }
          if (!maxDefined) {
            max2 = Math.max(max2, range.max);
          }
        }
        min2 = maxDefined && min2 > max2 ? max2 : min2;
        max2 = minDefined && min2 > max2 ? min2 : max2;
        return {
          min: finiteOrDefault(min2, finiteOrDefault(max2, min2)),
          max: finiteOrDefault(max2, finiteOrDefault(min2, max2))
        };
      }
      getPadding() {
        return {
          left: this.paddingLeft || 0,
          top: this.paddingTop || 0,
          right: this.paddingRight || 0,
          bottom: this.paddingBottom || 0
        };
      }
      getTicks() {
        return this.ticks;
      }
      getLabels() {
        const data = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
      }
      getLabelItems(chartArea = this.chart.chartArea) {
        const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
        return items;
      }
      beforeLayout() {
        this._cache = {};
        this._dataLimitsCached = false;
      }
      beforeUpdate() {
        callback(this.options.beforeUpdate, [
          this
        ]);
      }
      update(maxWidth, maxHeight, margins) {
        const { beginAtZero, grace, ticks: tickOpts } = this.options;
        const sampleSize = tickOpts.sampleSize;
        this.beforeUpdate();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this._margins = margins = Object.assign({
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, margins);
        this.ticks = null;
        this._labelSizes = null;
        this._gridLineItems = null;
        this._labelItems = null;
        this.beforeSetDimensions();
        this.setDimensions();
        this.afterSetDimensions();
        this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
        if (!this._dataLimitsCached) {
          this.beforeDataLimits();
          this.determineDataLimits();
          this.afterDataLimits();
          this._range = _addGrace(this, grace, beginAtZero);
          this._dataLimitsCached = true;
        }
        this.beforeBuildTicks();
        this.ticks = this.buildTicks() || [];
        this.afterBuildTicks();
        const samplingEnabled = sampleSize < this.ticks.length;
        this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
        this.configure();
        this.beforeCalculateLabelRotation();
        this.calculateLabelRotation();
        this.afterCalculateLabelRotation();
        if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
          this.ticks = autoSkip(this, this.ticks);
          this._labelSizes = null;
          this.afterAutoSkip();
        }
        if (samplingEnabled) {
          this._convertTicksToLabels(this.ticks);
        }
        this.beforeFit();
        this.fit();
        this.afterFit();
        this.afterUpdate();
      }
      configure() {
        let reversePixels = this.options.reverse;
        let startPixel, endPixel;
        if (this.isHorizontal()) {
          startPixel = this.left;
          endPixel = this.right;
        } else {
          startPixel = this.top;
          endPixel = this.bottom;
          reversePixels = !reversePixels;
        }
        this._startPixel = startPixel;
        this._endPixel = endPixel;
        this._reversePixels = reversePixels;
        this._length = endPixel - startPixel;
        this._alignToPixels = this.options.alignToPixels;
      }
      afterUpdate() {
        callback(this.options.afterUpdate, [
          this
        ]);
      }
      beforeSetDimensions() {
        callback(this.options.beforeSetDimensions, [
          this
        ]);
      }
      setDimensions() {
        if (this.isHorizontal()) {
          this.width = this.maxWidth;
          this.left = 0;
          this.right = this.width;
        } else {
          this.height = this.maxHeight;
          this.top = 0;
          this.bottom = this.height;
        }
        this.paddingLeft = 0;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;
      }
      afterSetDimensions() {
        callback(this.options.afterSetDimensions, [
          this
        ]);
      }
      _callHooks(name) {
        this.chart.notifyPlugins(name, this.getContext());
        callback(this.options[name], [
          this
        ]);
      }
      beforeDataLimits() {
        this._callHooks("beforeDataLimits");
      }
      determineDataLimits() {
      }
      afterDataLimits() {
        this._callHooks("afterDataLimits");
      }
      beforeBuildTicks() {
        this._callHooks("beforeBuildTicks");
      }
      buildTicks() {
        return [];
      }
      afterBuildTicks() {
        this._callHooks("afterBuildTicks");
      }
      beforeTickToLabelConversion() {
        callback(this.options.beforeTickToLabelConversion, [
          this
        ]);
      }
      generateTickLabels(ticks) {
        const tickOpts = this.options.ticks;
        let i, ilen, tick;
        for (i = 0, ilen = ticks.length; i < ilen; i++) {
          tick = ticks[i];
          tick.label = callback(tickOpts.callback, [
            tick.value,
            i,
            ticks
          ], this);
        }
      }
      afterTickToLabelConversion() {
        callback(this.options.afterTickToLabelConversion, [
          this
        ]);
      }
      beforeCalculateLabelRotation() {
        callback(this.options.beforeCalculateLabelRotation, [
          this
        ]);
      }
      calculateLabelRotation() {
        const options2 = this.options;
        const tickOpts = options2.ticks;
        const numTicks = getTicksLimit(this.ticks.length, options2.ticks.maxTicksLimit);
        const minRotation = tickOpts.minRotation || 0;
        const maxRotation = tickOpts.maxRotation;
        let labelRotation = minRotation;
        let tickWidth, maxHeight, maxLabelDiagonal;
        if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
          this.labelRotation = minRotation;
          return;
        }
        const labelSizes = this._getLabelSizes();
        const maxLabelWidth = labelSizes.widest.width;
        const maxLabelHeight = labelSizes.highest.height;
        const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
        tickWidth = options2.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
        if (maxLabelWidth + 6 > tickWidth) {
          tickWidth = maxWidth / (numTicks - (options2.offset ? 0.5 : 1));
          maxHeight = this.maxHeight - getTickMarkLength(options2.grid) - tickOpts.padding - getTitleHeight(options2.title, this.chart.options.font);
          maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
          labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
          labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
        }
        this.labelRotation = labelRotation;
      }
      afterCalculateLabelRotation() {
        callback(this.options.afterCalculateLabelRotation, [
          this
        ]);
      }
      afterAutoSkip() {
      }
      beforeFit() {
        callback(this.options.beforeFit, [
          this
        ]);
      }
      fit() {
        const minSize = {
          width: 0,
          height: 0
        };
        const { chart: chart2, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
        const display = this._isVisible();
        const isHorizontal = this.isHorizontal();
        if (display) {
          const titleHeight = getTitleHeight(titleOpts, chart2.options.font);
          if (isHorizontal) {
            minSize.width = this.maxWidth;
            minSize.height = getTickMarkLength(gridOpts) + titleHeight;
          } else {
            minSize.height = this.maxHeight;
            minSize.width = getTickMarkLength(gridOpts) + titleHeight;
          }
          if (tickOpts.display && this.ticks.length) {
            const { first, last, widest, highest } = this._getLabelSizes();
            const tickPadding = tickOpts.padding * 2;
            const angleRadians = toRadians(this.labelRotation);
            const cos = Math.cos(angleRadians);
            const sin = Math.sin(angleRadians);
            if (isHorizontal) {
              const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
              minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
            } else {
              const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
              minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
            }
            this._calculatePadding(first, last, sin, cos);
          }
        }
        this._handleMargins();
        if (isHorizontal) {
          this.width = this._length = chart2.width - this._margins.left - this._margins.right;
          this.height = minSize.height;
        } else {
          this.width = minSize.width;
          this.height = this._length = chart2.height - this._margins.top - this._margins.bottom;
        }
      }
      _calculatePadding(first, last, sin, cos) {
        const { ticks: { align, padding }, position } = this.options;
        const isRotated = this.labelRotation !== 0;
        const labelsBelowTicks = position !== "top" && this.axis === "x";
        if (this.isHorizontal()) {
          const offsetLeft = this.getPixelForTick(0) - this.left;
          const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
          let paddingLeft = 0;
          let paddingRight = 0;
          if (isRotated) {
            if (labelsBelowTicks) {
              paddingLeft = cos * first.width;
              paddingRight = sin * last.height;
            } else {
              paddingLeft = sin * first.height;
              paddingRight = cos * last.width;
            }
          } else if (align === "start") {
            paddingRight = last.width;
          } else if (align === "end") {
            paddingLeft = first.width;
          } else if (align !== "inner") {
            paddingLeft = first.width / 2;
            paddingRight = last.width / 2;
          }
          this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
          this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
        } else {
          let paddingTop = last.height / 2;
          let paddingBottom = first.height / 2;
          if (align === "start") {
            paddingTop = 0;
            paddingBottom = first.height;
          } else if (align === "end") {
            paddingTop = last.height;
            paddingBottom = 0;
          }
          this.paddingTop = paddingTop + padding;
          this.paddingBottom = paddingBottom + padding;
        }
      }
      _handleMargins() {
        if (this._margins) {
          this._margins.left = Math.max(this.paddingLeft, this._margins.left);
          this._margins.top = Math.max(this.paddingTop, this._margins.top);
          this._margins.right = Math.max(this.paddingRight, this._margins.right);
          this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
        }
      }
      afterFit() {
        callback(this.options.afterFit, [
          this
        ]);
      }
      isHorizontal() {
        const { axis, position } = this.options;
        return position === "top" || position === "bottom" || axis === "x";
      }
      isFullSize() {
        return this.options.fullSize;
      }
      _convertTicksToLabels(ticks) {
        this.beforeTickToLabelConversion();
        this.generateTickLabels(ticks);
        let i, ilen;
        for (i = 0, ilen = ticks.length; i < ilen; i++) {
          if (isNullOrUndef(ticks[i].label)) {
            ticks.splice(i, 1);
            ilen--;
            i--;
          }
        }
        this.afterTickToLabelConversion();
      }
      _getLabelSizes() {
        let labelSizes = this._labelSizes;
        if (!labelSizes) {
          const sampleSize = this.options.ticks.sampleSize;
          let ticks = this.ticks;
          if (sampleSize < ticks.length) {
            ticks = sample(ticks, sampleSize);
          }
          this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
        }
        return labelSizes;
      }
      _computeLabelSizes(ticks, length, maxTicksLimit) {
        const { ctx, _longestTextCache: caches2 } = this;
        const widths = [];
        const heights = [];
        const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
        let widestLabelSize = 0;
        let highestLabelSize = 0;
        let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
        for (i = 0; i < length; i += increment) {
          label = ticks[i].label;
          tickFont = this._resolveTickFontOptions(i);
          ctx.font = fontString = tickFont.string;
          cache = caches2[fontString] = caches2[fontString] || {
            data: {},
            gc: []
          };
          lineHeight = tickFont.lineHeight;
          width = height = 0;
          if (!isNullOrUndef(label) && !isArray(label)) {
            width = _measureText(ctx, cache.data, cache.gc, width, label);
            height = lineHeight;
          } else if (isArray(label)) {
            for (j = 0, jlen = label.length; j < jlen; ++j) {
              nestedLabel = label[j];
              if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                height += lineHeight;
              }
            }
          }
          widths.push(width);
          heights.push(height);
          widestLabelSize = Math.max(width, widestLabelSize);
          highestLabelSize = Math.max(height, highestLabelSize);
        }
        garbageCollect(caches2, length);
        const widest = widths.indexOf(widestLabelSize);
        const highest = heights.indexOf(highestLabelSize);
        const valueAt = (idx) => ({
          width: widths[idx] || 0,
          height: heights[idx] || 0
        });
        return {
          first: valueAt(0),
          last: valueAt(length - 1),
          widest: valueAt(widest),
          highest: valueAt(highest),
          widths,
          heights
        };
      }
      getLabelForValue(value) {
        return value;
      }
      getPixelForValue(value, index7) {
        return NaN;
      }
      getValueForPixel(pixel) {
      }
      getPixelForTick(index7) {
        const ticks = this.ticks;
        if (index7 < 0 || index7 > ticks.length - 1) {
          return null;
        }
        return this.getPixelForValue(ticks[index7].value);
      }
      getPixelForDecimal(decimal) {
        if (this._reversePixels) {
          decimal = 1 - decimal;
        }
        const pixel = this._startPixel + decimal * this._length;
        return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
      }
      getDecimalForPixel(pixel) {
        const decimal = (pixel - this._startPixel) / this._length;
        return this._reversePixels ? 1 - decimal : decimal;
      }
      getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
      }
      getBaseValue() {
        const { min: min2, max: max2 } = this;
        return min2 < 0 && max2 < 0 ? max2 : min2 > 0 && max2 > 0 ? min2 : 0;
      }
      getContext(index7) {
        const ticks = this.ticks || [];
        if (index7 >= 0 && index7 < ticks.length) {
          const tick = ticks[index7];
          return tick.$context || (tick.$context = createTickContext(this.getContext(), index7, tick));
        }
        return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
      }
      _tickSize() {
        const optionTicks = this.options.ticks;
        const rot = toRadians(this.labelRotation);
        const cos = Math.abs(Math.cos(rot));
        const sin = Math.abs(Math.sin(rot));
        const labelSizes = this._getLabelSizes();
        const padding = optionTicks.autoSkipPadding || 0;
        const w = labelSizes ? labelSizes.widest.width + padding : 0;
        const h = labelSizes ? labelSizes.highest.height + padding : 0;
        return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
      }
      _isVisible() {
        const display = this.options.display;
        if (display !== "auto") {
          return !!display;
        }
        return this.getMatchingVisibleMetas().length > 0;
      }
      _computeGridLineItems(chartArea) {
        const axis = this.axis;
        const chart2 = this.chart;
        const options2 = this.options;
        const { grid, position, border } = options2;
        const offset3 = grid.offset;
        const isHorizontal = this.isHorizontal();
        const ticks = this.ticks;
        const ticksLength = ticks.length + (offset3 ? 1 : 0);
        const tl = getTickMarkLength(grid);
        const items = [];
        const borderOpts = border.setContext(this.getContext());
        const axisWidth = borderOpts.display ? borderOpts.width : 0;
        const axisHalfWidth = axisWidth / 2;
        const alignBorderValue = function(pixel) {
          return _alignPixel(chart2, pixel, axisWidth);
        };
        let borderValue, i, lineValue, alignedLineValue;
        let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
        if (position === "top") {
          borderValue = alignBorderValue(this.bottom);
          ty1 = this.bottom - tl;
          ty2 = borderValue - axisHalfWidth;
          y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
          y2 = chartArea.bottom;
        } else if (position === "bottom") {
          borderValue = alignBorderValue(this.top);
          y1 = chartArea.top;
          y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
          ty1 = borderValue + axisHalfWidth;
          ty2 = this.top + tl;
        } else if (position === "left") {
          borderValue = alignBorderValue(this.right);
          tx1 = this.right - tl;
          tx2 = borderValue - axisHalfWidth;
          x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
          x2 = chartArea.right;
        } else if (position === "right") {
          borderValue = alignBorderValue(this.left);
          x1 = chartArea.left;
          x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
          tx1 = borderValue + axisHalfWidth;
          tx2 = this.left + tl;
        } else if (axis === "x") {
          if (position === "center") {
            borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
          } else if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
          }
          y1 = chartArea.top;
          y2 = chartArea.bottom;
          ty1 = borderValue + axisHalfWidth;
          ty2 = ty1 + tl;
        } else if (axis === "y") {
          if (position === "center") {
            borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
          } else if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
          }
          tx1 = borderValue - axisHalfWidth;
          tx2 = tx1 - tl;
          x1 = chartArea.left;
          x2 = chartArea.right;
        }
        const limit = valueOrDefault(options2.ticks.maxTicksLimit, ticksLength);
        const step = Math.max(1, Math.ceil(ticksLength / limit));
        for (i = 0; i < ticksLength; i += step) {
          const context = this.getContext(i);
          const optsAtIndex = grid.setContext(context);
          const optsAtIndexBorder = border.setContext(context);
          const lineWidth = optsAtIndex.lineWidth;
          const lineColor = optsAtIndex.color;
          const borderDash = optsAtIndexBorder.dash || [];
          const borderDashOffset = optsAtIndexBorder.dashOffset;
          const tickWidth = optsAtIndex.tickWidth;
          const tickColor = optsAtIndex.tickColor;
          const tickBorderDash = optsAtIndex.tickBorderDash || [];
          const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
          lineValue = getPixelForGridLine(this, i, offset3);
          if (lineValue === void 0) {
            continue;
          }
          alignedLineValue = _alignPixel(chart2, lineValue, lineWidth);
          if (isHorizontal) {
            tx1 = tx2 = x1 = x2 = alignedLineValue;
          } else {
            ty1 = ty2 = y1 = y2 = alignedLineValue;
          }
          items.push({
            tx1,
            ty1,
            tx2,
            ty2,
            x1,
            y1,
            x2,
            y2,
            width: lineWidth,
            color: lineColor,
            borderDash,
            borderDashOffset,
            tickWidth,
            tickColor,
            tickBorderDash,
            tickBorderDashOffset
          });
        }
        this._ticksLength = ticksLength;
        this._borderValue = borderValue;
        return items;
      }
      _computeLabelItems(chartArea) {
        const axis = this.axis;
        const options2 = this.options;
        const { position, ticks: optionTicks } = options2;
        const isHorizontal = this.isHorizontal();
        const ticks = this.ticks;
        const { align, crossAlign, padding, mirror } = optionTicks;
        const tl = getTickMarkLength(options2.grid);
        const tickAndPadding = tl + padding;
        const hTickAndPadding = mirror ? -padding : tickAndPadding;
        const rotation = -toRadians(this.labelRotation);
        const items = [];
        let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
        let textBaseline = "middle";
        if (position === "top") {
          y = this.bottom - hTickAndPadding;
          textAlign = this._getXAxisLabelAlignment();
        } else if (position === "bottom") {
          y = this.top + hTickAndPadding;
          textAlign = this._getXAxisLabelAlignment();
        } else if (position === "left") {
          const ret = this._getYAxisLabelAlignment(tl);
          textAlign = ret.textAlign;
          x = ret.x;
        } else if (position === "right") {
          const ret = this._getYAxisLabelAlignment(tl);
          textAlign = ret.textAlign;
          x = ret.x;
        } else if (axis === "x") {
          if (position === "center") {
            y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
          } else if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
          }
          textAlign = this._getXAxisLabelAlignment();
        } else if (axis === "y") {
          if (position === "center") {
            x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
          } else if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            x = this.chart.scales[positionAxisID].getPixelForValue(value);
          }
          textAlign = this._getYAxisLabelAlignment(tl).textAlign;
        }
        if (axis === "y") {
          if (align === "start") {
            textBaseline = "top";
          } else if (align === "end") {
            textBaseline = "bottom";
          }
        }
        const labelSizes = this._getLabelSizes();
        for (i = 0, ilen = ticks.length; i < ilen; ++i) {
          tick = ticks[i];
          label = tick.label;
          const optsAtIndex = optionTicks.setContext(this.getContext(i));
          pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
          font = this._resolveTickFontOptions(i);
          lineHeight = font.lineHeight;
          lineCount = isArray(label) ? label.length : 1;
          const halfCount = lineCount / 2;
          const color2 = optsAtIndex.color;
          const strokeColor = optsAtIndex.textStrokeColor;
          const strokeWidth = optsAtIndex.textStrokeWidth;
          let tickTextAlign = textAlign;
          if (isHorizontal) {
            x = pixel;
            if (textAlign === "inner") {
              if (i === ilen - 1) {
                tickTextAlign = !this.options.reverse ? "right" : "left";
              } else if (i === 0) {
                tickTextAlign = !this.options.reverse ? "left" : "right";
              } else {
                tickTextAlign = "center";
              }
            }
            if (position === "top") {
              if (crossAlign === "near" || rotation !== 0) {
                textOffset = -lineCount * lineHeight + lineHeight / 2;
              } else if (crossAlign === "center") {
                textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
              } else {
                textOffset = -labelSizes.highest.height + lineHeight / 2;
              }
            } else {
              if (crossAlign === "near" || rotation !== 0) {
                textOffset = lineHeight / 2;
              } else if (crossAlign === "center") {
                textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
              } else {
                textOffset = labelSizes.highest.height - lineCount * lineHeight;
              }
            }
            if (mirror) {
              textOffset *= -1;
            }
            if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
              x += lineHeight / 2 * Math.sin(rotation);
            }
          } else {
            y = pixel;
            textOffset = (1 - lineCount) * lineHeight / 2;
          }
          let backdrop;
          if (optsAtIndex.showLabelBackdrop) {
            const labelPadding = toPadding(optsAtIndex.backdropPadding);
            const height = labelSizes.heights[i];
            const width = labelSizes.widths[i];
            let top = textOffset - labelPadding.top;
            let left = 0 - labelPadding.left;
            switch (textBaseline) {
              case "middle":
                top -= height / 2;
                break;
              case "bottom":
                top -= height;
                break;
            }
            switch (textAlign) {
              case "center":
                left -= width / 2;
                break;
              case "right":
                left -= width;
                break;
              case "inner":
                if (i === ilen - 1) {
                  left -= width;
                } else if (i > 0) {
                  left -= width / 2;
                }
                break;
            }
            backdrop = {
              left,
              top,
              width: width + labelPadding.width,
              height: height + labelPadding.height,
              color: optsAtIndex.backdropColor
            };
          }
          items.push({
            label,
            font,
            textOffset,
            options: {
              rotation,
              color: color2,
              strokeColor,
              strokeWidth,
              textAlign: tickTextAlign,
              textBaseline,
              translation: [
                x,
                y
              ],
              backdrop
            }
          });
        }
        return items;
      }
      _getXAxisLabelAlignment() {
        const { position, ticks } = this.options;
        const rotation = -toRadians(this.labelRotation);
        if (rotation) {
          return position === "top" ? "left" : "right";
        }
        let align = "center";
        if (ticks.align === "start") {
          align = "left";
        } else if (ticks.align === "end") {
          align = "right";
        } else if (ticks.align === "inner") {
          align = "inner";
        }
        return align;
      }
      _getYAxisLabelAlignment(tl) {
        const { position, ticks: { crossAlign, mirror, padding } } = this.options;
        const labelSizes = this._getLabelSizes();
        const tickAndPadding = tl + padding;
        const widest = labelSizes.widest.width;
        let textAlign;
        let x;
        if (position === "left") {
          if (mirror) {
            x = this.right + padding;
            if (crossAlign === "near") {
              textAlign = "left";
            } else if (crossAlign === "center") {
              textAlign = "center";
              x += widest / 2;
            } else {
              textAlign = "right";
              x += widest;
            }
          } else {
            x = this.right - tickAndPadding;
            if (crossAlign === "near") {
              textAlign = "right";
            } else if (crossAlign === "center") {
              textAlign = "center";
              x -= widest / 2;
            } else {
              textAlign = "left";
              x = this.left;
            }
          }
        } else if (position === "right") {
          if (mirror) {
            x = this.left + padding;
            if (crossAlign === "near") {
              textAlign = "right";
            } else if (crossAlign === "center") {
              textAlign = "center";
              x -= widest / 2;
            } else {
              textAlign = "left";
              x -= widest;
            }
          } else {
            x = this.left + tickAndPadding;
            if (crossAlign === "near") {
              textAlign = "left";
            } else if (crossAlign === "center") {
              textAlign = "center";
              x += widest / 2;
            } else {
              textAlign = "right";
              x = this.right;
            }
          }
        } else {
          textAlign = "right";
        }
        return {
          textAlign,
          x
        };
      }
      _computeLabelArea() {
        if (this.options.ticks.mirror) {
          return;
        }
        const chart2 = this.chart;
        const position = this.options.position;
        if (position === "left" || position === "right") {
          return {
            top: 0,
            left: this.left,
            bottom: chart2.height,
            right: this.right
          };
        }
        if (position === "top" || position === "bottom") {
          return {
            top: this.top,
            left: 0,
            bottom: this.bottom,
            right: chart2.width
          };
        }
      }
      drawBackground() {
        const { ctx, options: { backgroundColor }, left, top, width, height } = this;
        if (backgroundColor) {
          ctx.save();
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(left, top, width, height);
          ctx.restore();
        }
      }
      getLineWidthForValue(value) {
        const grid = this.options.grid;
        if (!this._isVisible() || !grid.display) {
          return 0;
        }
        const ticks = this.ticks;
        const index7 = ticks.findIndex((t) => t.value === value);
        if (index7 >= 0) {
          const opts = grid.setContext(this.getContext(index7));
          return opts.lineWidth;
        }
        return 0;
      }
      drawGrid(chartArea) {
        const grid = this.options.grid;
        const ctx = this.ctx;
        const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
        let i, ilen;
        const drawLine = (p1, p2, style) => {
          if (!style.width || !style.color) {
            return;
          }
          ctx.save();
          ctx.lineWidth = style.width;
          ctx.strokeStyle = style.color;
          ctx.setLineDash(style.borderDash || []);
          ctx.lineDashOffset = style.borderDashOffset;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.restore();
        };
        if (grid.display) {
          for (i = 0, ilen = items.length; i < ilen; ++i) {
            const item = items[i];
            if (grid.drawOnChartArea) {
              drawLine({
                x: item.x1,
                y: item.y1
              }, {
                x: item.x2,
                y: item.y2
              }, item);
            }
            if (grid.drawTicks) {
              drawLine({
                x: item.tx1,
                y: item.ty1
              }, {
                x: item.tx2,
                y: item.ty2
              }, {
                color: item.tickColor,
                width: item.tickWidth,
                borderDash: item.tickBorderDash,
                borderDashOffset: item.tickBorderDashOffset
              });
            }
          }
        }
      }
      drawBorder() {
        const { chart: chart2, ctx, options: { border, grid } } = this;
        const borderOpts = border.setContext(this.getContext());
        const axisWidth = border.display ? borderOpts.width : 0;
        if (!axisWidth) {
          return;
        }
        const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
        const borderValue = this._borderValue;
        let x1, x2, y1, y2;
        if (this.isHorizontal()) {
          x1 = _alignPixel(chart2, this.left, axisWidth) - axisWidth / 2;
          x2 = _alignPixel(chart2, this.right, lastLineWidth) + lastLineWidth / 2;
          y1 = y2 = borderValue;
        } else {
          y1 = _alignPixel(chart2, this.top, axisWidth) - axisWidth / 2;
          y2 = _alignPixel(chart2, this.bottom, lastLineWidth) + lastLineWidth / 2;
          x1 = x2 = borderValue;
        }
        ctx.save();
        ctx.lineWidth = borderOpts.width;
        ctx.strokeStyle = borderOpts.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }
      drawLabels(chartArea) {
        const optionTicks = this.options.ticks;
        if (!optionTicks.display) {
          return;
        }
        const ctx = this.ctx;
        const area = this._computeLabelArea();
        if (area) {
          clipArea(ctx, area);
        }
        const items = this.getLabelItems(chartArea);
        for (const item of items) {
          const renderTextOptions = item.options;
          const tickFont = item.font;
          const label = item.label;
          const y = item.textOffset;
          renderText(ctx, label, 0, y, tickFont, renderTextOptions);
        }
        if (area) {
          unclipArea(ctx);
        }
      }
      drawTitle() {
        const { ctx, options: { position, title, reverse } } = this;
        if (!title.display) {
          return;
        }
        const font = toFont(title.font);
        const padding = toPadding(title.padding);
        const align = title.align;
        let offset3 = font.lineHeight / 2;
        if (position === "bottom" || position === "center" || isObject(position)) {
          offset3 += padding.bottom;
          if (isArray(title.text)) {
            offset3 += font.lineHeight * (title.text.length - 1);
          }
        } else {
          offset3 += padding.top;
        }
        const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset3, position, align);
        renderText(ctx, title.text, 0, 0, font, {
          color: title.color,
          maxWidth,
          rotation,
          textAlign: titleAlign(align, position, reverse),
          textBaseline: "middle",
          translation: [
            titleX,
            titleY
          ]
        });
      }
      draw(chartArea) {
        if (!this._isVisible()) {
          return;
        }
        this.drawBackground();
        this.drawGrid(chartArea);
        this.drawBorder();
        this.drawTitle();
        this.drawLabels(chartArea);
      }
      _layers() {
        const opts = this.options;
        const tz = opts.ticks && opts.ticks.z || 0;
        const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
        const bz = valueOrDefault(opts.border && opts.border.z, 0);
        if (!this._isVisible() || this.draw !== _Scale.prototype.draw) {
          return [
            {
              z: tz,
              draw: (chartArea) => {
                this.draw(chartArea);
              }
            }
          ];
        }
        return [
          {
            z: gz,
            draw: (chartArea) => {
              this.drawBackground();
              this.drawGrid(chartArea);
              this.drawTitle();
            }
          },
          {
            z: bz,
            draw: () => {
              this.drawBorder();
            }
          },
          {
            z: tz,
            draw: (chartArea) => {
              this.drawLabels(chartArea);
            }
          }
        ];
      }
      getMatchingVisibleMetas(type) {
        const metas = this.chart.getSortedVisibleDatasetMetas();
        const axisID = this.axis + "AxisID";
        const result = [];
        let i, ilen;
        for (i = 0, ilen = metas.length; i < ilen; ++i) {
          const meta = metas[i];
          if (meta[axisID] === this.id && (!type || meta.type === type)) {
            result.push(meta);
          }
        }
        return result;
      }
      _resolveTickFontOptions(index7) {
        const opts = this.options.ticks.setContext(this.getContext(index7));
        return toFont(opts.font);
      }
      _maxDigits() {
        const fontSize = this._resolveTickFontOptions(0).lineHeight;
        return (this.isHorizontal() ? this.width : this.height) / fontSize;
      }
    };
    TypedRegistry = class {
      constructor(type, scope, override2) {
        this.type = type;
        this.scope = scope;
        this.override = override2;
        this.items = /* @__PURE__ */ Object.create(null);
      }
      isForType(type) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
      }
      register(item) {
        const proto = Object.getPrototypeOf(item);
        let parentScope;
        if (isIChartComponent(proto)) {
          parentScope = this.register(proto);
        }
        const items = this.items;
        const id = item.id;
        const scope = this.scope + "." + id;
        if (!id) {
          throw new Error("class does not have id: " + item);
        }
        if (id in items) {
          return scope;
        }
        items[id] = item;
        registerDefaults(item, scope, parentScope);
        if (this.override) {
          defaults.override(item.id, item.overrides);
        }
        return scope;
      }
      get(id) {
        return this.items[id];
      }
      unregister(item) {
        const items = this.items;
        const id = item.id;
        const scope = this.scope;
        if (id in items) {
          delete items[id];
        }
        if (scope && id in defaults[scope]) {
          delete defaults[scope][id];
          if (this.override) {
            delete overrides[id];
          }
        }
      }
    };
    Registry = class {
      constructor() {
        this.controllers = new TypedRegistry(DatasetController, "datasets", true);
        this.elements = new TypedRegistry(Element2, "elements");
        this.plugins = new TypedRegistry(Object, "plugins");
        this.scales = new TypedRegistry(Scale, "scales");
        this._typedRegistries = [
          this.controllers,
          this.scales,
          this.elements
        ];
      }
      add(...args) {
        this._each("register", args);
      }
      remove(...args) {
        this._each("unregister", args);
      }
      addControllers(...args) {
        this._each("register", args, this.controllers);
      }
      addElements(...args) {
        this._each("register", args, this.elements);
      }
      addPlugins(...args) {
        this._each("register", args, this.plugins);
      }
      addScales(...args) {
        this._each("register", args, this.scales);
      }
      getController(id) {
        return this._get(id, this.controllers, "controller");
      }
      getElement(id) {
        return this._get(id, this.elements, "element");
      }
      getPlugin(id) {
        return this._get(id, this.plugins, "plugin");
      }
      getScale(id) {
        return this._get(id, this.scales, "scale");
      }
      removeControllers(...args) {
        this._each("unregister", args, this.controllers);
      }
      removeElements(...args) {
        this._each("unregister", args, this.elements);
      }
      removePlugins(...args) {
        this._each("unregister", args, this.plugins);
      }
      removeScales(...args) {
        this._each("unregister", args, this.scales);
      }
      _each(method, args, typedRegistry) {
        [
          ...args
        ].forEach((arg) => {
          const reg = typedRegistry || this._getRegistryForType(arg);
          if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
            this._exec(method, reg, arg);
          } else {
            each2(arg, (item) => {
              const itemReg = typedRegistry || this._getRegistryForType(item);
              this._exec(method, itemReg, item);
            });
          }
        });
      }
      _exec(method, registry2, component7) {
        const camelMethod = _capitalize(method);
        callback(component7["before" + camelMethod], [], component7);
        registry2[method](component7);
        callback(component7["after" + camelMethod], [], component7);
      }
      _getRegistryForType(type) {
        for (let i = 0; i < this._typedRegistries.length; i++) {
          const reg = this._typedRegistries[i];
          if (reg.isForType(type)) {
            return reg;
          }
        }
        return this.plugins;
      }
      _get(id, typedRegistry, type) {
        const item = typedRegistry.get(id);
        if (item === void 0) {
          throw new Error('"' + id + '" is not a registered ' + type + ".");
        }
        return item;
      }
    };
    registry = /* @__PURE__ */ new Registry();
    PluginService = class {
      constructor() {
        this._init = [];
      }
      notify(chart2, hook, args, filter) {
        if (hook === "beforeInit") {
          this._init = this._createDescriptors(chart2, true);
          this._notify(this._init, chart2, "install");
        }
        const descriptors2 = filter ? this._descriptors(chart2).filter(filter) : this._descriptors(chart2);
        const result = this._notify(descriptors2, chart2, hook, args);
        if (hook === "afterDestroy") {
          this._notify(descriptors2, chart2, "stop");
          this._notify(this._init, chart2, "uninstall");
        }
        return result;
      }
      _notify(descriptors2, chart2, hook, args) {
        args = args || {};
        for (const descriptor of descriptors2) {
          const plugin = descriptor.plugin;
          const method = plugin[hook];
          const params = [
            chart2,
            args,
            descriptor.options
          ];
          if (callback(method, params, plugin) === false && args.cancelable) {
            return false;
          }
        }
        return true;
      }
      invalidate() {
        if (!isNullOrUndef(this._cache)) {
          this._oldCache = this._cache;
          this._cache = void 0;
        }
      }
      _descriptors(chart2) {
        if (this._cache) {
          return this._cache;
        }
        const descriptors2 = this._cache = this._createDescriptors(chart2);
        this._notifyStateChanges(chart2);
        return descriptors2;
      }
      _createDescriptors(chart2, all) {
        const config = chart2 && chart2.config;
        const options2 = valueOrDefault(config.options && config.options.plugins, {});
        const plugins = allPlugins(config);
        return options2 === false && !all ? [] : createDescriptors(chart2, plugins, options2, all);
      }
      _notifyStateChanges(chart2) {
        const previousDescriptors = this._oldCache || [];
        const descriptors2 = this._cache;
        const diff = (a, b) => a.filter((x) => !b.some((y) => x.plugin.id === y.plugin.id));
        this._notify(diff(previousDescriptors, descriptors2), chart2, "stop");
        this._notify(diff(descriptors2, previousDescriptors), chart2, "start");
      }
    };
    keyCache = /* @__PURE__ */ new Map();
    keysCached = /* @__PURE__ */ new Set();
    addIfFound = (set2, obj, key2) => {
      const opts = resolveObjectKey(obj, key2);
      if (opts !== void 0) {
        set2.add(opts);
      }
    };
    Config = class {
      constructor(config) {
        this._config = initConfig(config);
        this._scopeCache = /* @__PURE__ */ new Map();
        this._resolverCache = /* @__PURE__ */ new Map();
      }
      get platform() {
        return this._config.platform;
      }
      get type() {
        return this._config.type;
      }
      set type(type) {
        this._config.type = type;
      }
      get data() {
        return this._config.data;
      }
      set data(data) {
        this._config.data = initData(data);
      }
      get options() {
        return this._config.options;
      }
      set options(options2) {
        this._config.options = options2;
      }
      get plugins() {
        return this._config.plugins;
      }
      update() {
        const config = this._config;
        this.clearCache();
        initOptions(config);
      }
      clearCache() {
        this._scopeCache.clear();
        this._resolverCache.clear();
      }
      datasetScopeKeys(datasetType) {
        return cachedKeys(datasetType, () => [
          [
            `datasets.${datasetType}`,
            ""
          ]
        ]);
      }
      datasetAnimationScopeKeys(datasetType, transition) {
        return cachedKeys(`${datasetType}.transition.${transition}`, () => [
          [
            `datasets.${datasetType}.transitions.${transition}`,
            `transitions.${transition}`
          ],
          [
            `datasets.${datasetType}`,
            ""
          ]
        ]);
      }
      datasetElementScopeKeys(datasetType, elementType) {
        return cachedKeys(`${datasetType}-${elementType}`, () => [
          [
            `datasets.${datasetType}.elements.${elementType}`,
            `datasets.${datasetType}`,
            `elements.${elementType}`,
            ""
          ]
        ]);
      }
      pluginScopeKeys(plugin) {
        const id = plugin.id;
        const type = this.type;
        return cachedKeys(`${type}-plugin-${id}`, () => [
          [
            `plugins.${id}`,
            ...plugin.additionalOptionScopes || []
          ]
        ]);
      }
      _cachedScopes(mainScope, resetCache) {
        const _scopeCache = this._scopeCache;
        let cache = _scopeCache.get(mainScope);
        if (!cache || resetCache) {
          cache = /* @__PURE__ */ new Map();
          _scopeCache.set(mainScope, cache);
        }
        return cache;
      }
      getOptionScopes(mainScope, keyLists, resetCache) {
        const { options: options2, type } = this;
        const cache = this._cachedScopes(mainScope, resetCache);
        const cached = cache.get(keyLists);
        if (cached) {
          return cached;
        }
        const scopes = /* @__PURE__ */ new Set();
        keyLists.forEach((keys) => {
          if (mainScope) {
            scopes.add(mainScope);
            keys.forEach((key2) => addIfFound(scopes, mainScope, key2));
          }
          keys.forEach((key2) => addIfFound(scopes, options2, key2));
          keys.forEach((key2) => addIfFound(scopes, overrides[type] || {}, key2));
          keys.forEach((key2) => addIfFound(scopes, defaults, key2));
          keys.forEach((key2) => addIfFound(scopes, descriptors, key2));
        });
        const array2 = Array.from(scopes);
        if (array2.length === 0) {
          array2.push(/* @__PURE__ */ Object.create(null));
        }
        if (keysCached.has(keyLists)) {
          cache.set(keyLists, array2);
        }
        return array2;
      }
      chartOptionScopes() {
        const { options: options2, type } = this;
        return [
          options2,
          overrides[type] || {},
          defaults.datasets[type] || {},
          {
            type
          },
          defaults,
          descriptors
        ];
      }
      resolveNamedOptions(scopes, names2, context, prefixes = [
        ""
      ]) {
        const result = {
          $shared: true
        };
        const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
        let options2 = resolver;
        if (needContext(resolver, names2)) {
          result.$shared = false;
          context = isFunction(context) ? context() : context;
          const subResolver = this.createResolver(scopes, context, subPrefixes);
          options2 = _attachContext(resolver, context, subResolver);
        }
        for (const prop of names2) {
          result[prop] = options2[prop];
        }
        return result;
      }
      createResolver(scopes, context, prefixes = [
        ""
      ], descriptorDefaults) {
        const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
        return isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
      }
    };
    hasFunction = (value) => isObject(value) && Object.getOwnPropertyNames(value).some((key2) => isFunction(value[key2]));
    version = "4.4.8";
    KNOWN_POSITIONS = [
      "top",
      "bottom",
      "left",
      "right",
      "chartArea"
    ];
    instances = {};
    getChart = (key2) => {
      const canvas = getCanvas(key2);
      return Object.values(instances).filter((c) => c.canvas === canvas).pop();
    };
    Chart = class {
      static defaults = defaults;
      static instances = instances;
      static overrides = overrides;
      static registry = registry;
      static version = version;
      static getChart = getChart;
      static register(...items) {
        registry.add(...items);
        invalidatePlugins();
      }
      static unregister(...items) {
        registry.remove(...items);
        invalidatePlugins();
      }
      constructor(item, userConfig) {
        const config = this.config = new Config(userConfig);
        const initialCanvas = getCanvas(item);
        const existingChart = getChart(initialCanvas);
        if (existingChart) {
          throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
        }
        const options2 = config.createResolver(config.chartOptionScopes(), this.getContext());
        this.platform = new (config.platform || _detectPlatform(initialCanvas))();
        this.platform.updateConfig(config);
        const context = this.platform.acquireContext(initialCanvas, options2.aspectRatio);
        const canvas = context && context.canvas;
        const height = canvas && canvas.height;
        const width = canvas && canvas.width;
        this.id = uid();
        this.ctx = context;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this._options = options2;
        this._aspectRatio = this.aspectRatio;
        this._layers = [];
        this._metasets = [];
        this._stacks = void 0;
        this.boxes = [];
        this.currentDevicePixelRatio = void 0;
        this.chartArea = void 0;
        this._active = [];
        this._lastEvent = void 0;
        this._listeners = {};
        this._responsiveListeners = void 0;
        this._sortedMetasets = [];
        this.scales = {};
        this._plugins = new PluginService();
        this.$proxies = {};
        this._hiddenIndices = {};
        this.attached = false;
        this._animationsDisabled = void 0;
        this.$context = void 0;
        this._doResize = debounce((mode) => this.update(mode), options2.resizeDelay || 0);
        this._dataChanges = [];
        instances[this.id] = this;
        if (!context || !canvas) {
          console.error("Failed to create chart: can't acquire context from the given item");
          return;
        }
        animator.listen(this, "complete", onAnimationsComplete);
        animator.listen(this, "progress", onAnimationProgress);
        this._initialize();
        if (this.attached) {
          this.update();
        }
      }
      get aspectRatio() {
        const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
        if (!isNullOrUndef(aspectRatio)) {
          return aspectRatio;
        }
        if (maintainAspectRatio && _aspectRatio) {
          return _aspectRatio;
        }
        return height ? width / height : null;
      }
      get data() {
        return this.config.data;
      }
      set data(data) {
        this.config.data = data;
      }
      get options() {
        return this._options;
      }
      set options(options2) {
        this.config.options = options2;
      }
      get registry() {
        return registry;
      }
      _initialize() {
        this.notifyPlugins("beforeInit");
        if (this.options.responsive) {
          this.resize();
        } else {
          retinaScale(this, this.options.devicePixelRatio);
        }
        this.bindEvents();
        this.notifyPlugins("afterInit");
        return this;
      }
      clear() {
        clearCanvas(this.canvas, this.ctx);
        return this;
      }
      stop() {
        animator.stop(this);
        return this;
      }
      resize(width, height) {
        if (!animator.running(this)) {
          this._resize(width, height);
        } else {
          this._resizeBeforeDraw = {
            width,
            height
          };
        }
      }
      _resize(width, height) {
        const options2 = this.options;
        const canvas = this.canvas;
        const aspectRatio = options2.maintainAspectRatio && this.aspectRatio;
        const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
        const newRatio = options2.devicePixelRatio || this.platform.getDevicePixelRatio();
        const mode = this.width ? "resize" : "attach";
        this.width = newSize.width;
        this.height = newSize.height;
        this._aspectRatio = this.aspectRatio;
        if (!retinaScale(this, newRatio, true)) {
          return;
        }
        this.notifyPlugins("resize", {
          size: newSize
        });
        callback(options2.onResize, [
          this,
          newSize
        ], this);
        if (this.attached) {
          if (this._doResize(mode)) {
            this.render();
          }
        }
      }
      ensureScalesHaveIDs() {
        const options2 = this.options;
        const scalesOptions = options2.scales || {};
        each2(scalesOptions, (axisOptions, axisID) => {
          axisOptions.id = axisID;
        });
      }
      buildOrUpdateScales() {
        const options2 = this.options;
        const scaleOpts = options2.scales;
        const scales = this.scales;
        const updated2 = Object.keys(scales).reduce((obj, id) => {
          obj[id] = false;
          return obj;
        }, {});
        let items = [];
        if (scaleOpts) {
          items = items.concat(Object.keys(scaleOpts).map((id) => {
            const scaleOptions = scaleOpts[id];
            const axis = determineAxis(id, scaleOptions);
            const isRadial = axis === "r";
            const isHorizontal = axis === "x";
            return {
              options: scaleOptions,
              dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
              dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
            };
          }));
        }
        each2(items, (item) => {
          const scaleOptions = item.options;
          const id = scaleOptions.id;
          const axis = determineAxis(id, scaleOptions);
          const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
          if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
            scaleOptions.position = item.dposition;
          }
          updated2[id] = true;
          let scale = null;
          if (id in scales && scales[id].type === scaleType) {
            scale = scales[id];
          } else {
            const scaleClass = registry.getScale(scaleType);
            scale = new scaleClass({
              id,
              type: scaleType,
              ctx: this.ctx,
              chart: this
            });
            scales[scale.id] = scale;
          }
          scale.init(scaleOptions, options2);
        });
        each2(updated2, (hasUpdated, id) => {
          if (!hasUpdated) {
            delete scales[id];
          }
        });
        each2(scales, (scale) => {
          layouts.configure(this, scale, scale.options);
          layouts.addBox(this, scale);
        });
      }
      _updateMetasets() {
        const metasets = this._metasets;
        const numData = this.data.datasets.length;
        const numMeta = metasets.length;
        metasets.sort((a, b) => a.index - b.index);
        if (numMeta > numData) {
          for (let i = numData; i < numMeta; ++i) {
            this._destroyDatasetMeta(i);
          }
          metasets.splice(numData, numMeta - numData);
        }
        this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
      }
      _removeUnreferencedMetasets() {
        const { _metasets: metasets, data: { datasets } } = this;
        if (metasets.length > datasets.length) {
          delete this._stacks;
        }
        metasets.forEach((meta, index7) => {
          if (datasets.filter((x) => x === meta._dataset).length === 0) {
            this._destroyDatasetMeta(index7);
          }
        });
      }
      buildOrUpdateControllers() {
        const newControllers = [];
        const datasets = this.data.datasets;
        let i, ilen;
        this._removeUnreferencedMetasets();
        for (i = 0, ilen = datasets.length; i < ilen; i++) {
          const dataset = datasets[i];
          let meta = this.getDatasetMeta(i);
          const type = dataset.type || this.config.type;
          if (meta.type && meta.type !== type) {
            this._destroyDatasetMeta(i);
            meta = this.getDatasetMeta(i);
          }
          meta.type = type;
          meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
          meta.order = dataset.order || 0;
          meta.index = i;
          meta.label = "" + dataset.label;
          meta.visible = this.isDatasetVisible(i);
          if (meta.controller) {
            meta.controller.updateIndex(i);
            meta.controller.linkScales();
          } else {
            const ControllerClass = registry.getController(type);
            const { datasetElementType, dataElementType } = defaults.datasets[type];
            Object.assign(ControllerClass, {
              dataElementType: registry.getElement(dataElementType),
              datasetElementType: datasetElementType && registry.getElement(datasetElementType)
            });
            meta.controller = new ControllerClass(this, i);
            newControllers.push(meta.controller);
          }
        }
        this._updateMetasets();
        return newControllers;
      }
      _resetElements() {
        each2(this.data.datasets, (dataset, datasetIndex) => {
          this.getDatasetMeta(datasetIndex).controller.reset();
        }, this);
      }
      reset() {
        this._resetElements();
        this.notifyPlugins("reset");
      }
      update(mode) {
        const config = this.config;
        config.update();
        const options2 = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
        const animsDisabled = this._animationsDisabled = !options2.animation;
        this._updateScales();
        this._checkEventBindings();
        this._updateHiddenIndices();
        this._plugins.invalidate();
        if (this.notifyPlugins("beforeUpdate", {
          mode,
          cancelable: true
        }) === false) {
          return;
        }
        const newControllers = this.buildOrUpdateControllers();
        this.notifyPlugins("beforeElementsUpdate");
        let minPadding = 0;
        for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
          const { controller } = this.getDatasetMeta(i);
          const reset2 = !animsDisabled && newControllers.indexOf(controller) === -1;
          controller.buildOrUpdateElements(reset2);
          minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
        }
        minPadding = this._minPadding = options2.layout.autoPadding ? minPadding : 0;
        this._updateLayout(minPadding);
        if (!animsDisabled) {
          each2(newControllers, (controller) => {
            controller.reset();
          });
        }
        this._updateDatasets(mode);
        this.notifyPlugins("afterUpdate", {
          mode
        });
        this._layers.sort(compare2Level("z", "_idx"));
        const { _active, _lastEvent } = this;
        if (_lastEvent) {
          this._eventHandler(_lastEvent, true);
        } else if (_active.length) {
          this._updateHoverStyles(_active, _active, true);
        }
        this.render();
      }
      _updateScales() {
        each2(this.scales, (scale) => {
          layouts.removeBox(this, scale);
        });
        this.ensureScalesHaveIDs();
        this.buildOrUpdateScales();
      }
      _checkEventBindings() {
        const options2 = this.options;
        const existingEvents = new Set(Object.keys(this._listeners));
        const newEvents = new Set(options2.events);
        if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options2.responsive) {
          this.unbindEvents();
          this.bindEvents();
        }
      }
      _updateHiddenIndices() {
        const { _hiddenIndices } = this;
        const changes = this._getUniformDataChanges() || [];
        for (const { method, start, count } of changes) {
          const move = method === "_removeElements" ? -count : count;
          moveNumericKeys(_hiddenIndices, start, move);
        }
      }
      _getUniformDataChanges() {
        const _dataChanges = this._dataChanges;
        if (!_dataChanges || !_dataChanges.length) {
          return;
        }
        this._dataChanges = [];
        const datasetCount = this.data.datasets.length;
        const makeSet = (idx) => new Set(_dataChanges.filter((c) => c[0] === idx).map((c, i) => i + "," + c.splice(1).join(",")));
        const changeSet = makeSet(0);
        for (let i = 1; i < datasetCount; i++) {
          if (!setsEqual(changeSet, makeSet(i))) {
            return;
          }
        }
        return Array.from(changeSet).map((c) => c.split(",")).map((a) => ({
          method: a[1],
          start: +a[2],
          count: +a[3]
        }));
      }
      _updateLayout(minPadding) {
        if (this.notifyPlugins("beforeLayout", {
          cancelable: true
        }) === false) {
          return;
        }
        layouts.update(this, this.width, this.height, minPadding);
        const area = this.chartArea;
        const noArea = area.width <= 0 || area.height <= 0;
        this._layers = [];
        each2(this.boxes, (box) => {
          if (noArea && box.position === "chartArea") {
            return;
          }
          if (box.configure) {
            box.configure();
          }
          this._layers.push(...box._layers());
        }, this);
        this._layers.forEach((item, index7) => {
          item._idx = index7;
        });
        this.notifyPlugins("afterLayout");
      }
      _updateDatasets(mode) {
        if (this.notifyPlugins("beforeDatasetsUpdate", {
          mode,
          cancelable: true
        }) === false) {
          return;
        }
        for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
          this.getDatasetMeta(i).controller.configure();
        }
        for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
          this._updateDataset(i, isFunction(mode) ? mode({
            datasetIndex: i
          }) : mode);
        }
        this.notifyPlugins("afterDatasetsUpdate", {
          mode
        });
      }
      _updateDataset(index7, mode) {
        const meta = this.getDatasetMeta(index7);
        const args = {
          meta,
          index: index7,
          mode,
          cancelable: true
        };
        if (this.notifyPlugins("beforeDatasetUpdate", args) === false) {
          return;
        }
        meta.controller._update(mode);
        args.cancelable = false;
        this.notifyPlugins("afterDatasetUpdate", args);
      }
      render() {
        if (this.notifyPlugins("beforeRender", {
          cancelable: true
        }) === false) {
          return;
        }
        if (animator.has(this)) {
          if (this.attached && !animator.running(this)) {
            animator.start(this);
          }
        } else {
          this.draw();
          onAnimationsComplete({
            chart: this
          });
        }
      }
      draw() {
        let i;
        if (this._resizeBeforeDraw) {
          const { width, height } = this._resizeBeforeDraw;
          this._resizeBeforeDraw = null;
          this._resize(width, height);
        }
        this.clear();
        if (this.width <= 0 || this.height <= 0) {
          return;
        }
        if (this.notifyPlugins("beforeDraw", {
          cancelable: true
        }) === false) {
          return;
        }
        const layers = this._layers;
        for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
          layers[i].draw(this.chartArea);
        }
        this._drawDatasets();
        for (; i < layers.length; ++i) {
          layers[i].draw(this.chartArea);
        }
        this.notifyPlugins("afterDraw");
      }
      _getSortedDatasetMetas(filterVisible) {
        const metasets = this._sortedMetasets;
        const result = [];
        let i, ilen;
        for (i = 0, ilen = metasets.length; i < ilen; ++i) {
          const meta = metasets[i];
          if (!filterVisible || meta.visible) {
            result.push(meta);
          }
        }
        return result;
      }
      getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(true);
      }
      _drawDatasets() {
        if (this.notifyPlugins("beforeDatasetsDraw", {
          cancelable: true
        }) === false) {
          return;
        }
        const metasets = this.getSortedVisibleDatasetMetas();
        for (let i = metasets.length - 1; i >= 0; --i) {
          this._drawDataset(metasets[i]);
        }
        this.notifyPlugins("afterDatasetsDraw");
      }
      _drawDataset(meta) {
        const ctx = this.ctx;
        const clip = meta._clip;
        const useClip = !clip.disabled;
        const area = getDatasetArea(meta, this.chartArea);
        const args = {
          meta,
          index: meta.index,
          cancelable: true
        };
        if (this.notifyPlugins("beforeDatasetDraw", args) === false) {
          return;
        }
        if (useClip) {
          clipArea(ctx, {
            left: clip.left === false ? 0 : area.left - clip.left,
            right: clip.right === false ? this.width : area.right + clip.right,
            top: clip.top === false ? 0 : area.top - clip.top,
            bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
          });
        }
        meta.controller.draw();
        if (useClip) {
          unclipArea(ctx);
        }
        args.cancelable = false;
        this.notifyPlugins("afterDatasetDraw", args);
      }
      isPointInArea(point) {
        return _isPointInArea(point, this.chartArea, this._minPadding);
      }
      getElementsAtEventForMode(e, mode, options2, useFinalPosition) {
        const method = Interaction.modes[mode];
        if (typeof method === "function") {
          return method(this, e, options2, useFinalPosition);
        }
        return [];
      }
      getDatasetMeta(datasetIndex) {
        const dataset = this.data.datasets[datasetIndex];
        const metasets = this._metasets;
        let meta = metasets.filter((x) => x && x._dataset === dataset).pop();
        if (!meta) {
          meta = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null,
            order: dataset && dataset.order || 0,
            index: datasetIndex,
            _dataset: dataset,
            _parsed: [],
            _sorted: false
          };
          metasets.push(meta);
        }
        return meta;
      }
      getContext() {
        return this.$context || (this.$context = createContext(null, {
          chart: this,
          type: "chart"
        }));
      }
      getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
      }
      isDatasetVisible(datasetIndex) {
        const dataset = this.data.datasets[datasetIndex];
        if (!dataset) {
          return false;
        }
        const meta = this.getDatasetMeta(datasetIndex);
        return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
      }
      setDatasetVisibility(datasetIndex, visible) {
        const meta = this.getDatasetMeta(datasetIndex);
        meta.hidden = !visible;
      }
      toggleDataVisibility(index7) {
        this._hiddenIndices[index7] = !this._hiddenIndices[index7];
      }
      getDataVisibility(index7) {
        return !this._hiddenIndices[index7];
      }
      _updateVisibility(datasetIndex, dataIndex, visible) {
        const mode = visible ? "show" : "hide";
        const meta = this.getDatasetMeta(datasetIndex);
        const anims = meta.controller._resolveAnimations(void 0, mode);
        if (defined(dataIndex)) {
          meta.data[dataIndex].hidden = !visible;
          this.update();
        } else {
          this.setDatasetVisibility(datasetIndex, visible);
          anims.update(meta, {
            visible
          });
          this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
        }
      }
      hide(datasetIndex, dataIndex) {
        this._updateVisibility(datasetIndex, dataIndex, false);
      }
      show(datasetIndex, dataIndex) {
        this._updateVisibility(datasetIndex, dataIndex, true);
      }
      _destroyDatasetMeta(datasetIndex) {
        const meta = this._metasets[datasetIndex];
        if (meta && meta.controller) {
          meta.controller._destroy();
        }
        delete this._metasets[datasetIndex];
      }
      _stop() {
        let i, ilen;
        this.stop();
        animator.remove(this);
        for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
          this._destroyDatasetMeta(i);
        }
      }
      destroy() {
        this.notifyPlugins("beforeDestroy");
        const { canvas, ctx } = this;
        this._stop();
        this.config.clearCache();
        if (canvas) {
          this.unbindEvents();
          clearCanvas(canvas, ctx);
          this.platform.releaseContext(ctx);
          this.canvas = null;
          this.ctx = null;
        }
        delete instances[this.id];
        this.notifyPlugins("afterDestroy");
      }
      toBase64Image(...args) {
        return this.canvas.toDataURL(...args);
      }
      bindEvents() {
        this.bindUserEvents();
        if (this.options.responsive) {
          this.bindResponsiveEvents();
        } else {
          this.attached = true;
        }
      }
      bindUserEvents() {
        const listeners = this._listeners;
        const platform2 = this.platform;
        const _add = (type, listener2) => {
          platform2.addEventListener(this, type, listener2);
          listeners[type] = listener2;
        };
        const listener = (e, x, y) => {
          e.offsetX = x;
          e.offsetY = y;
          this._eventHandler(e);
        };
        each2(this.options.events, (type) => _add(type, listener));
      }
      bindResponsiveEvents() {
        if (!this._responsiveListeners) {
          this._responsiveListeners = {};
        }
        const listeners = this._responsiveListeners;
        const platform2 = this.platform;
        const _add = (type, listener2) => {
          platform2.addEventListener(this, type, listener2);
          listeners[type] = listener2;
        };
        const _remove = (type, listener2) => {
          if (listeners[type]) {
            platform2.removeEventListener(this, type, listener2);
            delete listeners[type];
          }
        };
        const listener = (width, height) => {
          if (this.canvas) {
            this.resize(width, height);
          }
        };
        let detached;
        const attached = () => {
          _remove("attach", attached);
          this.attached = true;
          this.resize();
          _add("resize", listener);
          _add("detach", detached);
        };
        detached = () => {
          this.attached = false;
          _remove("resize", listener);
          this._stop();
          this._resize(0, 0);
          _add("attach", attached);
        };
        if (platform2.isAttached(this.canvas)) {
          attached();
        } else {
          detached();
        }
      }
      unbindEvents() {
        each2(this._listeners, (listener, type) => {
          this.platform.removeEventListener(this, type, listener);
        });
        this._listeners = {};
        each2(this._responsiveListeners, (listener, type) => {
          this.platform.removeEventListener(this, type, listener);
        });
        this._responsiveListeners = void 0;
      }
      updateHoverStyle(items, mode, enabled) {
        const prefix = enabled ? "set" : "remove";
        let meta, item, i, ilen;
        if (mode === "dataset") {
          meta = this.getDatasetMeta(items[0].datasetIndex);
          meta.controller["_" + prefix + "DatasetHoverStyle"]();
        }
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          item = items[i];
          const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
          if (controller) {
            controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
          }
        }
      }
      getActiveElements() {
        return this._active || [];
      }
      setActiveElements(activeElements) {
        const lastActive = this._active || [];
        const active = activeElements.map(({ datasetIndex, index: index7 }) => {
          const meta = this.getDatasetMeta(datasetIndex);
          if (!meta) {
            throw new Error("No dataset found at index " + datasetIndex);
          }
          return {
            datasetIndex,
            element: meta.data[index7],
            index: index7
          };
        });
        const changed = !_elementsEqual(active, lastActive);
        if (changed) {
          this._active = active;
          this._lastEvent = null;
          this._updateHoverStyles(active, lastActive);
        }
      }
      notifyPlugins(hook, args, filter) {
        return this._plugins.notify(this, hook, args, filter);
      }
      isPluginEnabled(pluginId) {
        return this._plugins._cache.filter((p) => p.plugin.id === pluginId).length === 1;
      }
      _updateHoverStyles(active, lastActive, replay) {
        const hoverOptions = this.options.hover;
        const diff = (a, b) => a.filter((x) => !b.some((y) => x.datasetIndex === y.datasetIndex && x.index === y.index));
        const deactivated = diff(lastActive, active);
        const activated = replay ? active : diff(active, lastActive);
        if (deactivated.length) {
          this.updateHoverStyle(deactivated, hoverOptions.mode, false);
        }
        if (activated.length && hoverOptions.mode) {
          this.updateHoverStyle(activated, hoverOptions.mode, true);
        }
      }
      _eventHandler(e, replay) {
        const args = {
          event: e,
          replay,
          cancelable: true,
          inChartArea: this.isPointInArea(e)
        };
        const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e.native.type);
        if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) {
          return;
        }
        const changed = this._handleEvent(e, replay, args.inChartArea);
        args.cancelable = false;
        this.notifyPlugins("afterEvent", args, eventFilter);
        if (changed || args.changed) {
          this.render();
        }
        return this;
      }
      _handleEvent(e, replay, inChartArea) {
        const { _active: lastActive = [], options: options2 } = this;
        const useFinalPosition = replay;
        const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
        const isClick = _isClickEvent(e);
        const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
        if (inChartArea) {
          this._lastEvent = null;
          callback(options2.onHover, [
            e,
            active,
            this
          ], this);
          if (isClick) {
            callback(options2.onClick, [
              e,
              active,
              this
            ], this);
          }
        }
        const changed = !_elementsEqual(active, lastActive);
        if (changed || replay) {
          this._active = active;
          this._updateHoverStyles(active, lastActive, replay);
        }
        this._lastEvent = lastEvent;
        return changed;
      }
      _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
        if (e.type === "mouseout") {
          return [];
        }
        if (!inChartArea) {
          return lastActive;
        }
        const hoverOptions = this.options.hover;
        return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
      }
    };
    usePath2D = typeof Path2D === "function";
    LineElement = class extends Element2 {
      static id = "line";
      static defaults = {
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        capBezierPoints: true,
        cubicInterpolationMode: "default",
        fill: false,
        spanGaps: false,
        stepped: false,
        tension: 0
      };
      static defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
      };
      static descriptors = {
        _scriptable: true,
        _indexable: (name) => name !== "borderDash" && name !== "fill"
      };
      constructor(cfg) {
        super();
        this.animated = true;
        this.options = void 0;
        this._chart = void 0;
        this._loop = void 0;
        this._fullLoop = void 0;
        this._path = void 0;
        this._points = void 0;
        this._segments = void 0;
        this._decimated = false;
        this._pointsUpdated = false;
        this._datasetIndex = void 0;
        if (cfg) {
          Object.assign(this, cfg);
        }
      }
      updateControlPoints(chartArea, indexAxis) {
        const options2 = this.options;
        if ((options2.tension || options2.cubicInterpolationMode === "monotone") && !options2.stepped && !this._pointsUpdated) {
          const loop = options2.spanGaps ? this._loop : this._fullLoop;
          _updateBezierControlPoints(this._points, options2, chartArea, loop, indexAxis);
          this._pointsUpdated = true;
        }
      }
      set points(points) {
        this._points = points;
        delete this._segments;
        delete this._path;
        this._pointsUpdated = false;
      }
      get points() {
        return this._points;
      }
      get segments() {
        return this._segments || (this._segments = _computeSegments(this, this.options.segment));
      }
      first() {
        const segments = this.segments;
        const points = this.points;
        return segments.length && points[segments[0].start];
      }
      last() {
        const segments = this.segments;
        const points = this.points;
        const count = segments.length;
        return count && points[segments[count - 1].end];
      }
      interpolate(point, property) {
        const options2 = this.options;
        const value = point[property];
        const points = this.points;
        const segments = _boundSegments(this, {
          property,
          start: value,
          end: value
        });
        if (!segments.length) {
          return;
        }
        const result = [];
        const _interpolate = _getInterpolationMethod(options2);
        let i, ilen;
        for (i = 0, ilen = segments.length; i < ilen; ++i) {
          const { start, end } = segments[i];
          const p1 = points[start];
          const p2 = points[end];
          if (p1 === p2) {
            result.push(p1);
            continue;
          }
          const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
          const interpolated = _interpolate(p1, p2, t, options2.stepped);
          interpolated[property] = point[property];
          result.push(interpolated);
        }
        return result.length === 1 ? result[0] : result;
      }
      pathSegment(ctx, segment, params) {
        const segmentMethod = _getSegmentMethod(this);
        return segmentMethod(ctx, this, segment, params);
      }
      path(ctx, start, count) {
        const segments = this.segments;
        const segmentMethod = _getSegmentMethod(this);
        let loop = this._loop;
        start = start || 0;
        count = count || this.points.length - start;
        for (const segment of segments) {
          loop &= segmentMethod(ctx, this, segment, {
            start,
            end: start + count - 1
          });
        }
        return !!loop;
      }
      draw(ctx, chartArea, start, count) {
        const options2 = this.options || {};
        const points = this.points || [];
        if (points.length && options2.borderWidth) {
          ctx.save();
          draw(ctx, this, start, count);
          ctx.restore();
        }
        if (this.animated) {
          this._pointsUpdated = false;
          this._path = void 0;
        }
      }
    };
    PointElement = class extends Element2 {
      static id = "point";
      parsed;
      skip;
      stop;
      /**
      * @type {any}
      */
      static defaults = {
        borderWidth: 1,
        hitRadius: 1,
        hoverBorderWidth: 1,
        hoverRadius: 4,
        pointStyle: "circle",
        radius: 3,
        rotation: 0
      };
      /**
      * @type {any}
      */
      static defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
      };
      constructor(cfg) {
        super();
        this.options = void 0;
        this.parsed = void 0;
        this.skip = void 0;
        this.stop = void 0;
        if (cfg) {
          Object.assign(this, cfg);
        }
      }
      inRange(mouseX, mouseY, useFinalPosition) {
        const options2 = this.options;
        const { x, y } = this.getProps([
          "x",
          "y"
        ], useFinalPosition);
        return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options2.hitRadius + options2.radius, 2);
      }
      inXRange(mouseX, useFinalPosition) {
        return inRange$1(this, mouseX, "x", useFinalPosition);
      }
      inYRange(mouseY, useFinalPosition) {
        return inRange$1(this, mouseY, "y", useFinalPosition);
      }
      getCenterPoint(useFinalPosition) {
        const { x, y } = this.getProps([
          "x",
          "y"
        ], useFinalPosition);
        return {
          x,
          y
        };
      }
      size(options2) {
        options2 = options2 || this.options || {};
        let radius = options2.radius || 0;
        radius = Math.max(radius, radius && options2.hoverRadius || 0);
        const borderWidth = radius && options2.borderWidth || 0;
        return (radius + borderWidth) * 2;
      }
      draw(ctx, area) {
        const options2 = this.options;
        if (this.skip || options2.radius < 0.1 || !_isPointInArea(this, area, this.size(options2) / 2)) {
          return;
        }
        ctx.strokeStyle = options2.borderColor;
        ctx.lineWidth = options2.borderWidth;
        ctx.fillStyle = options2.backgroundColor;
        drawPoint(ctx, options2, this.x, this.y);
      }
      getRange() {
        const options2 = this.options || {};
        return options2.radius + options2.hitRadius;
      }
    };
    getBoxSize = (labelOpts, fontSize) => {
      let { boxHeight = fontSize, boxWidth = fontSize } = labelOpts;
      if (labelOpts.usePointStyle) {
        boxHeight = Math.min(boxHeight, fontSize);
        boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
      }
      return {
        boxWidth,
        boxHeight,
        itemHeight: Math.max(fontSize, boxHeight)
      };
    };
    itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
    Legend = class extends Element2 {
      constructor(config) {
        super();
        this._added = false;
        this.legendHitBoxes = [];
        this._hoveredItem = null;
        this.doughnutMode = false;
        this.chart = config.chart;
        this.options = config.options;
        this.ctx = config.ctx;
        this.legendItems = void 0;
        this.columnSizes = void 0;
        this.lineWidths = void 0;
        this.maxHeight = void 0;
        this.maxWidth = void 0;
        this.top = void 0;
        this.bottom = void 0;
        this.left = void 0;
        this.right = void 0;
        this.height = void 0;
        this.width = void 0;
        this._margins = void 0;
        this.position = void 0;
        this.weight = void 0;
        this.fullSize = void 0;
      }
      update(maxWidth, maxHeight, margins) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this._margins = margins;
        this.setDimensions();
        this.buildLabels();
        this.fit();
      }
      setDimensions() {
        if (this.isHorizontal()) {
          this.width = this.maxWidth;
          this.left = this._margins.left;
          this.right = this.width;
        } else {
          this.height = this.maxHeight;
          this.top = this._margins.top;
          this.bottom = this.height;
        }
      }
      buildLabels() {
        const labelOpts = this.options.labels || {};
        let legendItems = callback(labelOpts.generateLabels, [
          this.chart
        ], this) || [];
        if (labelOpts.filter) {
          legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
        }
        if (labelOpts.sort) {
          legendItems = legendItems.sort((a, b) => labelOpts.sort(a, b, this.chart.data));
        }
        if (this.options.reverse) {
          legendItems.reverse();
        }
        this.legendItems = legendItems;
      }
      fit() {
        const { options: options2, ctx } = this;
        if (!options2.display) {
          this.width = this.height = 0;
          return;
        }
        const labelOpts = options2.labels;
        const labelFont = toFont(labelOpts.font);
        const fontSize = labelFont.size;
        const titleHeight = this._computeTitleHeight();
        const { boxWidth, itemHeight } = getBoxSize(labelOpts, fontSize);
        let width, height;
        ctx.font = labelFont.string;
        if (this.isHorizontal()) {
          width = this.maxWidth;
          height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
        } else {
          height = this.maxHeight;
          width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
        }
        this.width = Math.min(width, options2.maxWidth || this.maxWidth);
        this.height = Math.min(height, options2.maxHeight || this.maxHeight);
      }
      _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
        const { ctx, maxWidth, options: { labels: { padding } } } = this;
        const hitboxes = this.legendHitBoxes = [];
        const lineWidths = this.lineWidths = [
          0
        ];
        const lineHeight = itemHeight + padding;
        let totalHeight = titleHeight;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        let row = -1;
        let top = -lineHeight;
        this.legendItems.forEach((legendItem, i) => {
          const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
          if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
            totalHeight += lineHeight;
            lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
            top += lineHeight;
            row++;
          }
          hitboxes[i] = {
            left: 0,
            top,
            row,
            width: itemWidth,
            height: itemHeight
          };
          lineWidths[lineWidths.length - 1] += itemWidth + padding;
        });
        return totalHeight;
      }
      _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
        const { ctx, maxHeight, options: { labels: { padding } } } = this;
        const hitboxes = this.legendHitBoxes = [];
        const columnSizes = this.columnSizes = [];
        const heightLimit = maxHeight - titleHeight;
        let totalWidth = padding;
        let currentColWidth = 0;
        let currentColHeight = 0;
        let left = 0;
        let col = 0;
        this.legendItems.forEach((legendItem, i) => {
          const { itemWidth, itemHeight } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
          if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
            totalWidth += currentColWidth + padding;
            columnSizes.push({
              width: currentColWidth,
              height: currentColHeight
            });
            left += currentColWidth + padding;
            col++;
            currentColWidth = currentColHeight = 0;
          }
          hitboxes[i] = {
            left,
            top: currentColHeight,
            col,
            width: itemWidth,
            height: itemHeight
          };
          currentColWidth = Math.max(currentColWidth, itemWidth);
          currentColHeight += itemHeight + padding;
        });
        totalWidth += currentColWidth;
        columnSizes.push({
          width: currentColWidth,
          height: currentColHeight
        });
        return totalWidth;
      }
      adjustHitBoxes() {
        if (!this.options.display) {
          return;
        }
        const titleHeight = this._computeTitleHeight();
        const { legendHitBoxes: hitboxes, options: { align, labels: { padding }, rtl } } = this;
        const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
        if (this.isHorizontal()) {
          let row = 0;
          let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
          for (const hitbox of hitboxes) {
            if (row !== hitbox.row) {
              row = hitbox.row;
              left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
            }
            hitbox.top += this.top + titleHeight + padding;
            hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
            left += hitbox.width + padding;
          }
        } else {
          let col = 0;
          let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
          for (const hitbox of hitboxes) {
            if (hitbox.col !== col) {
              col = hitbox.col;
              top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
            }
            hitbox.top = top;
            hitbox.left += this.left + padding;
            hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
            top += hitbox.height + padding;
          }
        }
      }
      isHorizontal() {
        return this.options.position === "top" || this.options.position === "bottom";
      }
      draw() {
        if (this.options.display) {
          const ctx = this.ctx;
          clipArea(ctx, this);
          this._draw();
          unclipArea(ctx);
        }
      }
      _draw() {
        const { options: opts, columnSizes, lineWidths, ctx } = this;
        const { align, labels: labelOpts } = opts;
        const defaultColor = defaults.color;
        const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
        const labelFont = toFont(labelOpts.font);
        const { padding } = labelOpts;
        const fontSize = labelFont.size;
        const halfFontSize = fontSize / 2;
        let cursor;
        this.drawTitle();
        ctx.textAlign = rtlHelper.textAlign("left");
        ctx.textBaseline = "middle";
        ctx.lineWidth = 0.5;
        ctx.font = labelFont.string;
        const { boxWidth, boxHeight, itemHeight } = getBoxSize(labelOpts, fontSize);
        const drawLegendBox = function(x, y, legendItem) {
          if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
            return;
          }
          ctx.save();
          const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
          ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
          ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
          ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
          ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
          ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
          if (labelOpts.usePointStyle) {
            const drawOptions = {
              radius: boxHeight * Math.SQRT2 / 2,
              pointStyle: legendItem.pointStyle,
              rotation: legendItem.rotation,
              borderWidth: lineWidth
            };
            const centerX = rtlHelper.xPlus(x, boxWidth / 2);
            const centerY = y + halfFontSize;
            drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
          } else {
            const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
            const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
            const borderRadius = toTRBLCorners(legendItem.borderRadius);
            ctx.beginPath();
            if (Object.values(borderRadius).some((v) => v !== 0)) {
              addRoundedRectPath(ctx, {
                x: xBoxLeft,
                y: yBoxTop,
                w: boxWidth,
                h: boxHeight,
                radius: borderRadius
              });
            } else {
              ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
            }
            ctx.fill();
            if (lineWidth !== 0) {
              ctx.stroke();
            }
          }
          ctx.restore();
        };
        const fillText = function(x, y, legendItem) {
          renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
            strikethrough: legendItem.hidden,
            textAlign: rtlHelper.textAlign(legendItem.textAlign)
          });
        };
        const isHorizontal = this.isHorizontal();
        const titleHeight = this._computeTitleHeight();
        if (isHorizontal) {
          cursor = {
            x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
            y: this.top + padding + titleHeight,
            line: 0
          };
        } else {
          cursor = {
            x: this.left + padding,
            y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
            line: 0
          };
        }
        overrideTextDirection(this.ctx, opts.textDirection);
        const lineHeight = itemHeight + padding;
        this.legendItems.forEach((legendItem, i) => {
          ctx.strokeStyle = legendItem.fontColor;
          ctx.fillStyle = legendItem.fontColor;
          const textWidth = ctx.measureText(legendItem.text).width;
          const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
          const width = boxWidth + halfFontSize + textWidth;
          let x = cursor.x;
          let y = cursor.y;
          rtlHelper.setWidth(this.width);
          if (isHorizontal) {
            if (i > 0 && x + width + padding > this.right) {
              y = cursor.y += lineHeight;
              cursor.line++;
              x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
            }
          } else if (i > 0 && y + lineHeight > this.bottom) {
            x = cursor.x = x + columnSizes[cursor.line].width + padding;
            cursor.line++;
            y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
          }
          const realX = rtlHelper.x(x);
          drawLegendBox(realX, y, legendItem);
          x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
          fillText(rtlHelper.x(x), y, legendItem);
          if (isHorizontal) {
            cursor.x += width + padding;
          } else if (typeof legendItem.text !== "string") {
            const fontLineHeight = labelFont.lineHeight;
            cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
          } else {
            cursor.y += lineHeight;
          }
        });
        restoreTextDirection(this.ctx, opts.textDirection);
      }
      drawTitle() {
        const opts = this.options;
        const titleOpts = opts.title;
        const titleFont = toFont(titleOpts.font);
        const titlePadding = toPadding(titleOpts.padding);
        if (!titleOpts.display) {
          return;
        }
        const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
        const ctx = this.ctx;
        const position = titleOpts.position;
        const halfFontSize = titleFont.size / 2;
        const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
        let y;
        let left = this.left;
        let maxWidth = this.width;
        if (this.isHorizontal()) {
          maxWidth = Math.max(...this.lineWidths);
          y = this.top + topPaddingPlusHalfFontSize;
          left = _alignStartEnd(opts.align, left, this.right - maxWidth);
        } else {
          const maxHeight = this.columnSizes.reduce((acc, size2) => Math.max(acc, size2.height), 0);
          y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
        }
        const x = _alignStartEnd(position, left, left + maxWidth);
        ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
        ctx.textBaseline = "middle";
        ctx.strokeStyle = titleOpts.color;
        ctx.fillStyle = titleOpts.color;
        ctx.font = titleFont.string;
        renderText(ctx, titleOpts.text, x, y, titleFont);
      }
      _computeTitleHeight() {
        const titleOpts = this.options.title;
        const titleFont = toFont(titleOpts.font);
        const titlePadding = toPadding(titleOpts.padding);
        return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
      }
      _getLegendItemAt(x, y) {
        let i, hitBox, lh;
        if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
          lh = this.legendHitBoxes;
          for (i = 0; i < lh.length; ++i) {
            hitBox = lh[i];
            if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) {
              return this.legendItems[i];
            }
          }
        }
        return null;
      }
      handleEvent(e) {
        const opts = this.options;
        if (!isListened(e.type, opts)) {
          return;
        }
        const hoveredItem = this._getLegendItemAt(e.x, e.y);
        if (e.type === "mousemove" || e.type === "mouseout") {
          const previous = this._hoveredItem;
          const sameItem = itemsEqual(previous, hoveredItem);
          if (previous && !sameItem) {
            callback(opts.onLeave, [
              e,
              previous,
              this
            ], this);
          }
          this._hoveredItem = hoveredItem;
          if (hoveredItem && !sameItem) {
            callback(opts.onHover, [
              e,
              hoveredItem,
              this
            ], this);
          }
        } else if (hoveredItem) {
          callback(opts.onClick, [
            e,
            hoveredItem,
            this
          ], this);
        }
      }
    };
    plugin_legend = {
      id: "legend",
      _element: Legend,
      start(chart2, _args, options2) {
        const legend = chart2.legend = new Legend({
          ctx: chart2.ctx,
          options: options2,
          chart: chart2
        });
        layouts.configure(chart2, legend, options2);
        layouts.addBox(chart2, legend);
      },
      stop(chart2) {
        layouts.removeBox(chart2, chart2.legend);
        delete chart2.legend;
      },
      beforeUpdate(chart2, _args, options2) {
        const legend = chart2.legend;
        layouts.configure(chart2, legend, options2);
        legend.options = options2;
      },
      afterUpdate(chart2) {
        const legend = chart2.legend;
        legend.buildLabels();
        legend.adjustHitBoxes();
      },
      afterEvent(chart2, args) {
        if (!args.replay) {
          chart2.legend.handleEvent(args.event);
        }
      },
      defaults: {
        display: true,
        position: "top",
        align: "center",
        fullSize: true,
        reverse: false,
        weight: 1e3,
        onClick(e, legendItem, legend) {
          const index7 = legendItem.datasetIndex;
          const ci = legend.chart;
          if (ci.isDatasetVisible(index7)) {
            ci.hide(index7);
            legendItem.hidden = true;
          } else {
            ci.show(index7);
            legendItem.hidden = false;
          }
        },
        onHover: null,
        onLeave: null,
        labels: {
          color: (ctx) => ctx.chart.options.color,
          boxWidth: 40,
          padding: 10,
          generateLabels(chart2) {
            const datasets = chart2.data.datasets;
            const { labels: { usePointStyle, pointStyle, textAlign, color: color2, useBorderRadius, borderRadius } } = chart2.legend.options;
            return chart2._getSortedDatasetMetas().map((meta) => {
              const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
              const borderWidth = toPadding(style.borderWidth);
              return {
                text: datasets[meta.index].label,
                fillStyle: style.backgroundColor,
                fontColor: color2,
                hidden: !meta.visible,
                lineCap: style.borderCapStyle,
                lineDash: style.borderDash,
                lineDashOffset: style.borderDashOffset,
                lineJoin: style.borderJoinStyle,
                lineWidth: (borderWidth.width + borderWidth.height) / 4,
                strokeStyle: style.borderColor,
                pointStyle: pointStyle || style.pointStyle,
                rotation: style.rotation,
                textAlign: textAlign || style.textAlign,
                borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                datasetIndex: meta.index
              };
            }, this);
          }
        },
        title: {
          color: (ctx) => ctx.chart.options.color,
          display: false,
          position: "center",
          text: ""
        }
      },
      descriptors: {
        _scriptable: (name) => !name.startsWith("on"),
        labels: {
          _scriptable: (name) => ![
            "generateLabels",
            "filter",
            "sort"
          ].includes(name)
        }
      }
    };
    Title = class extends Element2 {
      constructor(config) {
        super();
        this.chart = config.chart;
        this.options = config.options;
        this.ctx = config.ctx;
        this._padding = void 0;
        this.top = void 0;
        this.bottom = void 0;
        this.left = void 0;
        this.right = void 0;
        this.width = void 0;
        this.height = void 0;
        this.position = void 0;
        this.weight = void 0;
        this.fullSize = void 0;
      }
      update(maxWidth, maxHeight) {
        const opts = this.options;
        this.left = 0;
        this.top = 0;
        if (!opts.display) {
          this.width = this.height = this.right = this.bottom = 0;
          return;
        }
        this.width = this.right = maxWidth;
        this.height = this.bottom = maxHeight;
        const lineCount = isArray(opts.text) ? opts.text.length : 1;
        this._padding = toPadding(opts.padding);
        const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
        if (this.isHorizontal()) {
          this.height = textSize;
        } else {
          this.width = textSize;
        }
      }
      isHorizontal() {
        const pos = this.options.position;
        return pos === "top" || pos === "bottom";
      }
      _drawArgs(offset3) {
        const { top, left, bottom, right, options: options2 } = this;
        const align = options2.align;
        let rotation = 0;
        let maxWidth, titleX, titleY;
        if (this.isHorizontal()) {
          titleX = _alignStartEnd(align, left, right);
          titleY = top + offset3;
          maxWidth = right - left;
        } else {
          if (options2.position === "left") {
            titleX = left + offset3;
            titleY = _alignStartEnd(align, bottom, top);
            rotation = PI * -0.5;
          } else {
            titleX = right - offset3;
            titleY = _alignStartEnd(align, top, bottom);
            rotation = PI * 0.5;
          }
          maxWidth = bottom - top;
        }
        return {
          titleX,
          titleY,
          maxWidth,
          rotation
        };
      }
      draw() {
        const ctx = this.ctx;
        const opts = this.options;
        if (!opts.display) {
          return;
        }
        const fontOpts = toFont(opts.font);
        const lineHeight = fontOpts.lineHeight;
        const offset3 = lineHeight / 2 + this._padding.top;
        const { titleX, titleY, maxWidth, rotation } = this._drawArgs(offset3);
        renderText(ctx, opts.text, 0, 0, fontOpts, {
          color: opts.color,
          maxWidth,
          rotation,
          textAlign: _toLeftRightCenter(opts.align),
          textBaseline: "middle",
          translation: [
            titleX,
            titleY
          ]
        });
      }
    };
    plugin_title = {
      id: "title",
      _element: Title,
      start(chart2, _args, options2) {
        createTitle(chart2, options2);
      },
      stop(chart2) {
        const titleBlock = chart2.titleBlock;
        layouts.removeBox(chart2, titleBlock);
        delete chart2.titleBlock;
      },
      beforeUpdate(chart2, _args, options2) {
        const title = chart2.titleBlock;
        layouts.configure(chart2, title, options2);
        title.options = options2;
      },
      defaults: {
        align: "center",
        display: false,
        font: {
          weight: "bold"
        },
        fullSize: true,
        padding: 10,
        position: "top",
        text: "",
        weight: 2e3
      },
      defaultRoutes: {
        color: "color"
      },
      descriptors: {
        _scriptable: true,
        _indexable: false
      }
    };
    positioners = {
      average(items) {
        if (!items.length) {
          return false;
        }
        let i, len;
        let xSet = /* @__PURE__ */ new Set();
        let y = 0;
        let count = 0;
        for (i = 0, len = items.length; i < len; ++i) {
          const el = items[i].element;
          if (el && el.hasValue()) {
            const pos = el.tooltipPosition();
            xSet.add(pos.x);
            y += pos.y;
            ++count;
          }
        }
        if (count === 0 || xSet.size === 0) {
          return false;
        }
        const xAverage = [
          ...xSet
        ].reduce((a, b) => a + b) / xSet.size;
        return {
          x: xAverage,
          y: y / count
        };
      },
      nearest(items, eventPosition) {
        if (!items.length) {
          return false;
        }
        let x = eventPosition.x;
        let y = eventPosition.y;
        let minDistance = Number.POSITIVE_INFINITY;
        let i, len, nearestElement;
        for (i = 0, len = items.length; i < len; ++i) {
          const el = items[i].element;
          if (el && el.hasValue()) {
            const center = el.getCenterPoint();
            const d = distanceBetweenPoints(eventPosition, center);
            if (d < minDistance) {
              minDistance = d;
              nearestElement = el;
            }
          }
        }
        if (nearestElement) {
          const tp = nearestElement.tooltipPosition();
          x = tp.x;
          y = tp.y;
        }
        return {
          x,
          y
        };
      }
    };
    defaultCallbacks = {
      beforeTitle: noop2,
      title(tooltipItems) {
        if (tooltipItems.length > 0) {
          const item = tooltipItems[0];
          const labels = item.chart.data.labels;
          const labelCount = labels ? labels.length : 0;
          if (this && this.options && this.options.mode === "dataset") {
            return item.dataset.label || "";
          } else if (item.label) {
            return item.label;
          } else if (labelCount > 0 && item.dataIndex < labelCount) {
            return labels[item.dataIndex];
          }
        }
        return "";
      },
      afterTitle: noop2,
      beforeBody: noop2,
      beforeLabel: noop2,
      label(tooltipItem) {
        if (this && this.options && this.options.mode === "dataset") {
          return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
        }
        let label = tooltipItem.dataset.label || "";
        if (label) {
          label += ": ";
        }
        const value = tooltipItem.formattedValue;
        if (!isNullOrUndef(value)) {
          label += value;
        }
        return label;
      },
      labelColor(tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options2 = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
          borderColor: options2.borderColor,
          backgroundColor: options2.backgroundColor,
          borderWidth: options2.borderWidth,
          borderDash: options2.borderDash,
          borderDashOffset: options2.borderDashOffset,
          borderRadius: 0
        };
      },
      labelTextColor() {
        return this.options.bodyColor;
      },
      labelPointStyle(tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options2 = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
          pointStyle: options2.pointStyle,
          rotation: options2.rotation
        };
      },
      afterLabel: noop2,
      afterBody: noop2,
      beforeFooter: noop2,
      footer: noop2,
      afterFooter: noop2
    };
    Tooltip = class extends Element2 {
      static positioners = positioners;
      constructor(config) {
        super();
        this.opacity = 0;
        this._active = [];
        this._eventPosition = void 0;
        this._size = void 0;
        this._cachedAnimations = void 0;
        this._tooltipItems = [];
        this.$animations = void 0;
        this.$context = void 0;
        this.chart = config.chart;
        this.options = config.options;
        this.dataPoints = void 0;
        this.title = void 0;
        this.beforeBody = void 0;
        this.body = void 0;
        this.afterBody = void 0;
        this.footer = void 0;
        this.xAlign = void 0;
        this.yAlign = void 0;
        this.x = void 0;
        this.y = void 0;
        this.height = void 0;
        this.width = void 0;
        this.caretX = void 0;
        this.caretY = void 0;
        this.labelColors = void 0;
        this.labelPointStyles = void 0;
        this.labelTextColors = void 0;
      }
      initialize(options2) {
        this.options = options2;
        this._cachedAnimations = void 0;
        this.$context = void 0;
      }
      _resolveAnimations() {
        const cached = this._cachedAnimations;
        if (cached) {
          return cached;
        }
        const chart2 = this.chart;
        const options2 = this.options.setContext(this.getContext());
        const opts = options2.enabled && chart2.options.animation && options2.animations;
        const animations = new Animations(this.chart, opts);
        if (opts._cacheable) {
          this._cachedAnimations = Object.freeze(animations);
        }
        return animations;
      }
      getContext() {
        return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
      }
      getTitle(context, options2) {
        const { callbacks } = options2;
        const beforeTitle = invokeCallbackWithFallback(callbacks, "beforeTitle", this, context);
        const title = invokeCallbackWithFallback(callbacks, "title", this, context);
        const afterTitle = invokeCallbackWithFallback(callbacks, "afterTitle", this, context);
        let lines = [];
        lines = pushOrConcat(lines, splitNewlines(beforeTitle));
        lines = pushOrConcat(lines, splitNewlines(title));
        lines = pushOrConcat(lines, splitNewlines(afterTitle));
        return lines;
      }
      getBeforeBody(tooltipItems, options2) {
        return getBeforeAfterBodyLines(invokeCallbackWithFallback(options2.callbacks, "beforeBody", this, tooltipItems));
      }
      getBody(tooltipItems, options2) {
        const { callbacks } = options2;
        const bodyItems = [];
        each2(tooltipItems, (context) => {
          const bodyItem = {
            before: [],
            lines: [],
            after: []
          };
          const scoped = overrideCallbacks(callbacks, context);
          pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, "beforeLabel", this, context)));
          pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, "label", this, context));
          pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, "afterLabel", this, context)));
          bodyItems.push(bodyItem);
        });
        return bodyItems;
      }
      getAfterBody(tooltipItems, options2) {
        return getBeforeAfterBodyLines(invokeCallbackWithFallback(options2.callbacks, "afterBody", this, tooltipItems));
      }
      getFooter(tooltipItems, options2) {
        const { callbacks } = options2;
        const beforeFooter = invokeCallbackWithFallback(callbacks, "beforeFooter", this, tooltipItems);
        const footer = invokeCallbackWithFallback(callbacks, "footer", this, tooltipItems);
        const afterFooter = invokeCallbackWithFallback(callbacks, "afterFooter", this, tooltipItems);
        let lines = [];
        lines = pushOrConcat(lines, splitNewlines(beforeFooter));
        lines = pushOrConcat(lines, splitNewlines(footer));
        lines = pushOrConcat(lines, splitNewlines(afterFooter));
        return lines;
      }
      _createItems(options2) {
        const active = this._active;
        const data = this.chart.data;
        const labelColors = [];
        const labelPointStyles = [];
        const labelTextColors = [];
        let tooltipItems = [];
        let i, len;
        for (i = 0, len = active.length; i < len; ++i) {
          tooltipItems.push(createTooltipItem(this.chart, active[i]));
        }
        if (options2.filter) {
          tooltipItems = tooltipItems.filter((element, index7, array2) => options2.filter(element, index7, array2, data));
        }
        if (options2.itemSort) {
          tooltipItems = tooltipItems.sort((a, b) => options2.itemSort(a, b, data));
        }
        each2(tooltipItems, (context) => {
          const scoped = overrideCallbacks(options2.callbacks, context);
          labelColors.push(invokeCallbackWithFallback(scoped, "labelColor", this, context));
          labelPointStyles.push(invokeCallbackWithFallback(scoped, "labelPointStyle", this, context));
          labelTextColors.push(invokeCallbackWithFallback(scoped, "labelTextColor", this, context));
        });
        this.labelColors = labelColors;
        this.labelPointStyles = labelPointStyles;
        this.labelTextColors = labelTextColors;
        this.dataPoints = tooltipItems;
        return tooltipItems;
      }
      update(changed, replay) {
        const options2 = this.options.setContext(this.getContext());
        const active = this._active;
        let properties;
        let tooltipItems = [];
        if (!active.length) {
          if (this.opacity !== 0) {
            properties = {
              opacity: 0
            };
          }
        } else {
          const position = positioners[options2.position].call(this, active, this._eventPosition);
          tooltipItems = this._createItems(options2);
          this.title = this.getTitle(tooltipItems, options2);
          this.beforeBody = this.getBeforeBody(tooltipItems, options2);
          this.body = this.getBody(tooltipItems, options2);
          this.afterBody = this.getAfterBody(tooltipItems, options2);
          this.footer = this.getFooter(tooltipItems, options2);
          const size2 = this._size = getTooltipSize(this, options2);
          const positionAndSize = Object.assign({}, position, size2);
          const alignment = determineAlignment(this.chart, options2, positionAndSize);
          const backgroundPoint = getBackgroundPoint(options2, positionAndSize, alignment, this.chart);
          this.xAlign = alignment.xAlign;
          this.yAlign = alignment.yAlign;
          properties = {
            opacity: 1,
            x: backgroundPoint.x,
            y: backgroundPoint.y,
            width: size2.width,
            height: size2.height,
            caretX: position.x,
            caretY: position.y
          };
        }
        this._tooltipItems = tooltipItems;
        this.$context = void 0;
        if (properties) {
          this._resolveAnimations().update(this, properties);
        }
        if (changed && options2.external) {
          options2.external.call(this, {
            chart: this.chart,
            tooltip: this,
            replay
          });
        }
      }
      drawCaret(tooltipPoint, ctx, size2, options2) {
        const caretPosition = this.getCaretPosition(tooltipPoint, size2, options2);
        ctx.lineTo(caretPosition.x1, caretPosition.y1);
        ctx.lineTo(caretPosition.x2, caretPosition.y2);
        ctx.lineTo(caretPosition.x3, caretPosition.y3);
      }
      getCaretPosition(tooltipPoint, size2, options2) {
        const { xAlign, yAlign } = this;
        const { caretSize, cornerRadius } = options2;
        const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
        const { x: ptX, y: ptY } = tooltipPoint;
        const { width, height } = size2;
        let x1, x2, x3, y1, y2, y3;
        if (yAlign === "center") {
          y2 = ptY + height / 2;
          if (xAlign === "left") {
            x1 = ptX;
            x2 = x1 - caretSize;
            y1 = y2 + caretSize;
            y3 = y2 - caretSize;
          } else {
            x1 = ptX + width;
            x2 = x1 + caretSize;
            y1 = y2 - caretSize;
            y3 = y2 + caretSize;
          }
          x3 = x1;
        } else {
          if (xAlign === "left") {
            x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
          } else if (xAlign === "right") {
            x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
          } else {
            x2 = this.caretX;
          }
          if (yAlign === "top") {
            y1 = ptY;
            y2 = y1 - caretSize;
            x1 = x2 - caretSize;
            x3 = x2 + caretSize;
          } else {
            y1 = ptY + height;
            y2 = y1 + caretSize;
            x1 = x2 + caretSize;
            x3 = x2 - caretSize;
          }
          y3 = y1;
        }
        return {
          x1,
          x2,
          x3,
          y1,
          y2,
          y3
        };
      }
      drawTitle(pt, ctx, options2) {
        const title = this.title;
        const length = title.length;
        let titleFont, titleSpacing, i;
        if (length) {
          const rtlHelper = getRtlAdapter(options2.rtl, this.x, this.width);
          pt.x = getAlignedX(this, options2.titleAlign, options2);
          ctx.textAlign = rtlHelper.textAlign(options2.titleAlign);
          ctx.textBaseline = "middle";
          titleFont = toFont(options2.titleFont);
          titleSpacing = options2.titleSpacing;
          ctx.fillStyle = options2.titleColor;
          ctx.font = titleFont.string;
          for (i = 0; i < length; ++i) {
            ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
            pt.y += titleFont.lineHeight + titleSpacing;
            if (i + 1 === length) {
              pt.y += options2.titleMarginBottom - titleSpacing;
            }
          }
        }
      }
      _drawColorBox(ctx, pt, i, rtlHelper, options2) {
        const labelColor = this.labelColors[i];
        const labelPointStyle = this.labelPointStyles[i];
        const { boxHeight, boxWidth } = options2;
        const bodyFont = toFont(options2.bodyFont);
        const colorX = getAlignedX(this, "left", options2);
        const rtlColorX = rtlHelper.x(colorX);
        const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
        const colorY = pt.y + yOffSet;
        if (options2.usePointStyle) {
          const drawOptions = {
            radius: Math.min(boxWidth, boxHeight) / 2,
            pointStyle: labelPointStyle.pointStyle,
            rotation: labelPointStyle.rotation,
            borderWidth: 1
          };
          const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
          const centerY = colorY + boxHeight / 2;
          ctx.strokeStyle = options2.multiKeyBackground;
          ctx.fillStyle = options2.multiKeyBackground;
          drawPoint(ctx, drawOptions, centerX, centerY);
          ctx.strokeStyle = labelColor.borderColor;
          ctx.fillStyle = labelColor.backgroundColor;
          drawPoint(ctx, drawOptions, centerX, centerY);
        } else {
          ctx.lineWidth = isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
          ctx.strokeStyle = labelColor.borderColor;
          ctx.setLineDash(labelColor.borderDash || []);
          ctx.lineDashOffset = labelColor.borderDashOffset || 0;
          const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
          const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
          const borderRadius = toTRBLCorners(labelColor.borderRadius);
          if (Object.values(borderRadius).some((v) => v !== 0)) {
            ctx.beginPath();
            ctx.fillStyle = options2.multiKeyBackground;
            addRoundedRectPath(ctx, {
              x: outerX,
              y: colorY,
              w: boxWidth,
              h: boxHeight,
              radius: borderRadius
            });
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = labelColor.backgroundColor;
            ctx.beginPath();
            addRoundedRectPath(ctx, {
              x: innerX,
              y: colorY + 1,
              w: boxWidth - 2,
              h: boxHeight - 2,
              radius: borderRadius
            });
            ctx.fill();
          } else {
            ctx.fillStyle = options2.multiKeyBackground;
            ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
            ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
            ctx.fillStyle = labelColor.backgroundColor;
            ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
          }
        }
        ctx.fillStyle = this.labelTextColors[i];
      }
      drawBody(pt, ctx, options2) {
        const { body: body2 } = this;
        const { bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding } = options2;
        const bodyFont = toFont(options2.bodyFont);
        let bodyLineHeight = bodyFont.lineHeight;
        let xLinePadding = 0;
        const rtlHelper = getRtlAdapter(options2.rtl, this.x, this.width);
        const fillLineOfText = function(line) {
          ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
          pt.y += bodyLineHeight + bodySpacing;
        };
        const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
        let bodyItem, textColor, lines, i, j, ilen, jlen;
        ctx.textAlign = bodyAlign;
        ctx.textBaseline = "middle";
        ctx.font = bodyFont.string;
        pt.x = getAlignedX(this, bodyAlignForCalculation, options2);
        ctx.fillStyle = options2.bodyColor;
        each2(this.beforeBody, fillLineOfText);
        xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
        for (i = 0, ilen = body2.length; i < ilen; ++i) {
          bodyItem = body2[i];
          textColor = this.labelTextColors[i];
          ctx.fillStyle = textColor;
          each2(bodyItem.before, fillLineOfText);
          lines = bodyItem.lines;
          if (displayColors && lines.length) {
            this._drawColorBox(ctx, pt, i, rtlHelper, options2);
            bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
          }
          for (j = 0, jlen = lines.length; j < jlen; ++j) {
            fillLineOfText(lines[j]);
            bodyLineHeight = bodyFont.lineHeight;
          }
          each2(bodyItem.after, fillLineOfText);
        }
        xLinePadding = 0;
        bodyLineHeight = bodyFont.lineHeight;
        each2(this.afterBody, fillLineOfText);
        pt.y -= bodySpacing;
      }
      drawFooter(pt, ctx, options2) {
        const footer = this.footer;
        const length = footer.length;
        let footerFont, i;
        if (length) {
          const rtlHelper = getRtlAdapter(options2.rtl, this.x, this.width);
          pt.x = getAlignedX(this, options2.footerAlign, options2);
          pt.y += options2.footerMarginTop;
          ctx.textAlign = rtlHelper.textAlign(options2.footerAlign);
          ctx.textBaseline = "middle";
          footerFont = toFont(options2.footerFont);
          ctx.fillStyle = options2.footerColor;
          ctx.font = footerFont.string;
          for (i = 0; i < length; ++i) {
            ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
            pt.y += footerFont.lineHeight + options2.footerSpacing;
          }
        }
      }
      drawBackground(pt, ctx, tooltipSize, options2) {
        const { xAlign, yAlign } = this;
        const { x, y } = pt;
        const { width, height } = tooltipSize;
        const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(options2.cornerRadius);
        ctx.fillStyle = options2.backgroundColor;
        ctx.strokeStyle = options2.borderColor;
        ctx.lineWidth = options2.borderWidth;
        ctx.beginPath();
        ctx.moveTo(x + topLeft, y);
        if (yAlign === "top") {
          this.drawCaret(pt, ctx, tooltipSize, options2);
        }
        ctx.lineTo(x + width - topRight, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
        if (yAlign === "center" && xAlign === "right") {
          this.drawCaret(pt, ctx, tooltipSize, options2);
        }
        ctx.lineTo(x + width, y + height - bottomRight);
        ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
        if (yAlign === "bottom") {
          this.drawCaret(pt, ctx, tooltipSize, options2);
        }
        ctx.lineTo(x + bottomLeft, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
        if (yAlign === "center" && xAlign === "left") {
          this.drawCaret(pt, ctx, tooltipSize, options2);
        }
        ctx.lineTo(x, y + topLeft);
        ctx.quadraticCurveTo(x, y, x + topLeft, y);
        ctx.closePath();
        ctx.fill();
        if (options2.borderWidth > 0) {
          ctx.stroke();
        }
      }
      _updateAnimationTarget(options2) {
        const chart2 = this.chart;
        const anims = this.$animations;
        const animX = anims && anims.x;
        const animY = anims && anims.y;
        if (animX || animY) {
          const position = positioners[options2.position].call(this, this._active, this._eventPosition);
          if (!position) {
            return;
          }
          const size2 = this._size = getTooltipSize(this, options2);
          const positionAndSize = Object.assign({}, position, this._size);
          const alignment = determineAlignment(chart2, options2, positionAndSize);
          const point = getBackgroundPoint(options2, positionAndSize, alignment, chart2);
          if (animX._to !== point.x || animY._to !== point.y) {
            this.xAlign = alignment.xAlign;
            this.yAlign = alignment.yAlign;
            this.width = size2.width;
            this.height = size2.height;
            this.caretX = position.x;
            this.caretY = position.y;
            this._resolveAnimations().update(this, point);
          }
        }
      }
      _willRender() {
        return !!this.opacity;
      }
      draw(ctx) {
        const options2 = this.options.setContext(this.getContext());
        let opacity = this.opacity;
        if (!opacity) {
          return;
        }
        this._updateAnimationTarget(options2);
        const tooltipSize = {
          width: this.width,
          height: this.height
        };
        const pt = {
          x: this.x,
          y: this.y
        };
        opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
        const padding = toPadding(options2.padding);
        const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
        if (options2.enabled && hasTooltipContent) {
          ctx.save();
          ctx.globalAlpha = opacity;
          this.drawBackground(pt, ctx, tooltipSize, options2);
          overrideTextDirection(ctx, options2.textDirection);
          pt.y += padding.top;
          this.drawTitle(pt, ctx, options2);
          this.drawBody(pt, ctx, options2);
          this.drawFooter(pt, ctx, options2);
          restoreTextDirection(ctx, options2.textDirection);
          ctx.restore();
        }
      }
      getActiveElements() {
        return this._active || [];
      }
      setActiveElements(activeElements, eventPosition) {
        const lastActive = this._active;
        const active = activeElements.map(({ datasetIndex, index: index7 }) => {
          const meta = this.chart.getDatasetMeta(datasetIndex);
          if (!meta) {
            throw new Error("Cannot find a dataset at index " + datasetIndex);
          }
          return {
            datasetIndex,
            element: meta.data[index7],
            index: index7
          };
        });
        const changed = !_elementsEqual(lastActive, active);
        const positionChanged = this._positionChanged(active, eventPosition);
        if (changed || positionChanged) {
          this._active = active;
          this._eventPosition = eventPosition;
          this._ignoreReplayEvents = true;
          this.update(true);
        }
      }
      handleEvent(e, replay, inChartArea = true) {
        if (replay && this._ignoreReplayEvents) {
          return false;
        }
        this._ignoreReplayEvents = false;
        const options2 = this.options;
        const lastActive = this._active || [];
        const active = this._getActiveElements(e, lastActive, replay, inChartArea);
        const positionChanged = this._positionChanged(active, e);
        const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
        if (changed) {
          this._active = active;
          if (options2.enabled || options2.external) {
            this._eventPosition = {
              x: e.x,
              y: e.y
            };
            this.update(true, replay);
          }
        }
        return changed;
      }
      _getActiveElements(e, lastActive, replay, inChartArea) {
        const options2 = this.options;
        if (e.type === "mouseout") {
          return [];
        }
        if (!inChartArea) {
          return lastActive.filter((i) => this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== void 0);
        }
        const active = this.chart.getElementsAtEventForMode(e, options2.mode, options2, replay);
        if (options2.reverse) {
          active.reverse();
        }
        return active;
      }
      _positionChanged(active, e) {
        const { caretX, caretY, options: options2 } = this;
        const position = positioners[options2.position].call(this, active, e);
        return position !== false && (caretX !== position.x || caretY !== position.y);
      }
    };
    plugin_tooltip = {
      id: "tooltip",
      _element: Tooltip,
      positioners,
      afterInit(chart2, _args, options2) {
        if (options2) {
          chart2.tooltip = new Tooltip({
            chart: chart2,
            options: options2
          });
        }
      },
      beforeUpdate(chart2, _args, options2) {
        if (chart2.tooltip) {
          chart2.tooltip.initialize(options2);
        }
      },
      reset(chart2, _args, options2) {
        if (chart2.tooltip) {
          chart2.tooltip.initialize(options2);
        }
      },
      afterDraw(chart2) {
        const tooltip = chart2.tooltip;
        if (tooltip && tooltip._willRender()) {
          const args = {
            tooltip
          };
          if (chart2.notifyPlugins("beforeTooltipDraw", {
            ...args,
            cancelable: true
          }) === false) {
            return;
          }
          tooltip.draw(chart2.ctx);
          chart2.notifyPlugins("afterTooltipDraw", args);
        }
      },
      afterEvent(chart2, args) {
        if (chart2.tooltip) {
          const useFinalPosition = args.replay;
          if (chart2.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
            args.changed = true;
          }
        }
      },
      defaults: {
        enabled: true,
        external: null,
        position: "average",
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        titleFont: {
          weight: "bold"
        },
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleAlign: "left",
        bodyColor: "#fff",
        bodySpacing: 2,
        bodyFont: {},
        bodyAlign: "left",
        footerColor: "#fff",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFont: {
          weight: "bold"
        },
        footerAlign: "left",
        padding: 6,
        caretPadding: 2,
        caretSize: 5,
        cornerRadius: 6,
        boxHeight: (ctx, opts) => opts.bodyFont.size,
        boxWidth: (ctx, opts) => opts.bodyFont.size,
        multiKeyBackground: "#fff",
        displayColors: true,
        boxPadding: 0,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        animation: {
          duration: 400,
          easing: "easeOutQuart"
        },
        animations: {
          numbers: {
            type: "number",
            properties: [
              "x",
              "y",
              "width",
              "height",
              "caretX",
              "caretY"
            ]
          },
          opacity: {
            easing: "linear",
            duration: 200
          }
        },
        callbacks: defaultCallbacks
      },
      defaultRoutes: {
        bodyFont: "font",
        footerFont: "font",
        titleFont: "font"
      },
      descriptors: {
        _scriptable: (name) => name !== "filter" && name !== "itemSort" && name !== "external",
        _indexable: false,
        callbacks: {
          _scriptable: false,
          _indexable: false
        },
        animation: {
          _fallback: false
        },
        animations: {
          _fallback: "animation"
        }
      },
      additionalOptionScopes: [
        "interaction"
      ]
    };
    addIfString = (labels, raw, index7, addedLabels) => {
      if (typeof raw === "string") {
        index7 = labels.push(raw) - 1;
        addedLabels.unshift({
          index: index7,
          label: raw
        });
      } else if (isNaN(raw)) {
        index7 = null;
      }
      return index7;
    };
    validIndex = (index7, max2) => index7 === null ? null : _limitValue(Math.round(index7), 0, max2);
    CategoryScale = class extends Scale {
      static id = "category";
      static defaults = {
        ticks: {
          callback: _getLabelForValue
        }
      };
      constructor(cfg) {
        super(cfg);
        this._startValue = void 0;
        this._valueRange = 0;
        this._addedLabels = [];
      }
      init(scaleOptions) {
        const added = this._addedLabels;
        if (added.length) {
          const labels = this.getLabels();
          for (const { index: index7, label } of added) {
            if (labels[index7] === label) {
              labels.splice(index7, 1);
            }
          }
          this._addedLabels = [];
        }
        super.init(scaleOptions);
      }
      parse(raw, index7) {
        if (isNullOrUndef(raw)) {
          return null;
        }
        const labels = this.getLabels();
        index7 = isFinite(index7) && labels[index7] === raw ? index7 : findOrAddLabel(labels, raw, valueOrDefault(index7, raw), this._addedLabels);
        return validIndex(index7, labels.length - 1);
      }
      determineDataLimits() {
        const { minDefined, maxDefined } = this.getUserBounds();
        let { min: min2, max: max2 } = this.getMinMax(true);
        if (this.options.bounds === "ticks") {
          if (!minDefined) {
            min2 = 0;
          }
          if (!maxDefined) {
            max2 = this.getLabels().length - 1;
          }
        }
        this.min = min2;
        this.max = max2;
      }
      buildTicks() {
        const min2 = this.min;
        const max2 = this.max;
        const offset3 = this.options.offset;
        const ticks = [];
        let labels = this.getLabels();
        labels = min2 === 0 && max2 === labels.length - 1 ? labels : labels.slice(min2, max2 + 1);
        this._valueRange = Math.max(labels.length - (offset3 ? 0 : 1), 1);
        this._startValue = this.min - (offset3 ? 0.5 : 0);
        for (let value = min2; value <= max2; value++) {
          ticks.push({
            value
          });
        }
        return ticks;
      }
      getLabelForValue(value) {
        return _getLabelForValue.call(this, value);
      }
      configure() {
        super.configure();
        if (!this.isHorizontal()) {
          this._reversePixels = !this._reversePixels;
        }
      }
      getPixelForValue(value) {
        if (typeof value !== "number") {
          value = this.parse(value);
        }
        return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
      }
      getPixelForTick(index7) {
        const ticks = this.ticks;
        if (index7 < 0 || index7 > ticks.length - 1) {
          return null;
        }
        return this.getPixelForValue(ticks[index7].value);
      }
      getValueForPixel(pixel) {
        return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
      }
      getBasePixel() {
        return this.bottom;
      }
    };
    LinearScaleBase = class extends Scale {
      constructor(cfg) {
        super(cfg);
        this.start = void 0;
        this.end = void 0;
        this._startValue = void 0;
        this._endValue = void 0;
        this._valueRange = 0;
      }
      parse(raw, index7) {
        if (isNullOrUndef(raw)) {
          return null;
        }
        if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) {
          return null;
        }
        return +raw;
      }
      handleTickRangeOptions() {
        const { beginAtZero } = this.options;
        const { minDefined, maxDefined } = this.getUserBounds();
        let { min: min2, max: max2 } = this;
        const setMin = (v) => min2 = minDefined ? min2 : v;
        const setMax = (v) => max2 = maxDefined ? max2 : v;
        if (beginAtZero) {
          const minSign = sign(min2);
          const maxSign = sign(max2);
          if (minSign < 0 && maxSign < 0) {
            setMax(0);
          } else if (minSign > 0 && maxSign > 0) {
            setMin(0);
          }
        }
        if (min2 === max2) {
          let offset3 = max2 === 0 ? 1 : Math.abs(max2 * 0.05);
          setMax(max2 + offset3);
          if (!beginAtZero) {
            setMin(min2 - offset3);
          }
        }
        this.min = min2;
        this.max = max2;
      }
      getTickLimit() {
        const tickOpts = this.options.ticks;
        let { maxTicksLimit, stepSize } = tickOpts;
        let maxTicks;
        if (stepSize) {
          maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
          if (maxTicks > 1e3) {
            console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
            maxTicks = 1e3;
          }
        } else {
          maxTicks = this.computeTickLimit();
          maxTicksLimit = maxTicksLimit || 11;
        }
        if (maxTicksLimit) {
          maxTicks = Math.min(maxTicksLimit, maxTicks);
        }
        return maxTicks;
      }
      computeTickLimit() {
        return Number.POSITIVE_INFINITY;
      }
      buildTicks() {
        const opts = this.options;
        const tickOpts = opts.ticks;
        let maxTicks = this.getTickLimit();
        maxTicks = Math.max(2, maxTicks);
        const numericGeneratorOptions = {
          maxTicks,
          bounds: opts.bounds,
          min: opts.min,
          max: opts.max,
          precision: tickOpts.precision,
          step: tickOpts.stepSize,
          count: tickOpts.count,
          maxDigits: this._maxDigits(),
          horizontal: this.isHorizontal(),
          minRotation: tickOpts.minRotation || 0,
          includeBounds: tickOpts.includeBounds !== false
        };
        const dataRange = this._range || this;
        const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
        if (opts.bounds === "ticks") {
          _setMinAndMaxByKey(ticks, this, "value");
        }
        if (opts.reverse) {
          ticks.reverse();
          this.start = this.max;
          this.end = this.min;
        } else {
          this.start = this.min;
          this.end = this.max;
        }
        return ticks;
      }
      configure() {
        const ticks = this.ticks;
        let start = this.min;
        let end = this.max;
        super.configure();
        if (this.options.offset && ticks.length) {
          const offset3 = (end - start) / Math.max(ticks.length - 1, 1) / 2;
          start -= offset3;
          end += offset3;
        }
        this._startValue = start;
        this._endValue = end;
        this._valueRange = end - start;
      }
      getLabelForValue(value) {
        return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
      }
    };
    LinearScale = class extends LinearScaleBase {
      static id = "linear";
      static defaults = {
        ticks: {
          callback: Ticks.formatters.numeric
        }
      };
      determineDataLimits() {
        const { min: min2, max: max2 } = this.getMinMax(true);
        this.min = isNumberFinite(min2) ? min2 : 0;
        this.max = isNumberFinite(max2) ? max2 : 1;
        this.handleTickRangeOptions();
      }
      computeTickLimit() {
        const horizontal = this.isHorizontal();
        const length = horizontal ? this.width : this.height;
        const minRotation = toRadians(this.options.ticks.minRotation);
        const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 1e-3;
        const tickFont = this._resolveTickFontOptions(0);
        return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
      }
      getPixelForValue(value) {
        return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
      }
      getValueForPixel(pixel) {
        return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
      }
    };
    log10Floor = (v) => Math.floor(log10(v));
    changeExponent = (v, m) => Math.pow(10, log10Floor(v) + m);
    LogarithmicScale = class extends Scale {
      static id = "logarithmic";
      static defaults = {
        ticks: {
          callback: Ticks.formatters.logarithmic,
          major: {
            enabled: true
          }
        }
      };
      constructor(cfg) {
        super(cfg);
        this.start = void 0;
        this.end = void 0;
        this._startValue = void 0;
        this._valueRange = 0;
      }
      parse(raw, index7) {
        const value = LinearScaleBase.prototype.parse.apply(this, [
          raw,
          index7
        ]);
        if (value === 0) {
          this._zero = true;
          return void 0;
        }
        return isNumberFinite(value) && value > 0 ? value : null;
      }
      determineDataLimits() {
        const { min: min2, max: max2 } = this.getMinMax(true);
        this.min = isNumberFinite(min2) ? Math.max(0, min2) : null;
        this.max = isNumberFinite(max2) ? Math.max(0, max2) : null;
        if (this.options.beginAtZero) {
          this._zero = true;
        }
        if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) {
          this.min = min2 === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
        }
        this.handleTickRangeOptions();
      }
      handleTickRangeOptions() {
        const { minDefined, maxDefined } = this.getUserBounds();
        let min2 = this.min;
        let max2 = this.max;
        const setMin = (v) => min2 = minDefined ? min2 : v;
        const setMax = (v) => max2 = maxDefined ? max2 : v;
        if (min2 === max2) {
          if (min2 <= 0) {
            setMin(1);
            setMax(10);
          } else {
            setMin(changeExponent(min2, -1));
            setMax(changeExponent(max2, 1));
          }
        }
        if (min2 <= 0) {
          setMin(changeExponent(max2, -1));
        }
        if (max2 <= 0) {
          setMax(changeExponent(min2, 1));
        }
        this.min = min2;
        this.max = max2;
      }
      buildTicks() {
        const opts = this.options;
        const generationOptions = {
          min: this._userMin,
          max: this._userMax
        };
        const ticks = generateTicks(generationOptions, this);
        if (opts.bounds === "ticks") {
          _setMinAndMaxByKey(ticks, this, "value");
        }
        if (opts.reverse) {
          ticks.reverse();
          this.start = this.max;
          this.end = this.min;
        } else {
          this.start = this.min;
          this.end = this.max;
        }
        return ticks;
      }
      getLabelForValue(value) {
        return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
      }
      configure() {
        const start = this.min;
        super.configure();
        this._startValue = log10(start);
        this._valueRange = log10(this.max) - log10(start);
      }
      getPixelForValue(value) {
        if (value === void 0 || value === 0) {
          value = this.min;
        }
        if (value === null || isNaN(value)) {
          return NaN;
        }
        return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
      }
      getValueForPixel(pixel) {
        const decimal = this.getDecimalForPixel(pixel);
        return Math.pow(10, this._startValue + decimal * this._valueRange);
      }
    };
    RadialLinearScale = class extends LinearScaleBase {
      static id = "radialLinear";
      static defaults = {
        display: true,
        animate: true,
        position: "chartArea",
        angleLines: {
          display: true,
          lineWidth: 1,
          borderDash: [],
          borderDashOffset: 0
        },
        grid: {
          circular: false
        },
        startAngle: 0,
        ticks: {
          showLabelBackdrop: true,
          callback: Ticks.formatters.numeric
        },
        pointLabels: {
          backdropColor: void 0,
          backdropPadding: 2,
          display: true,
          font: {
            size: 10
          },
          callback(label) {
            return label;
          },
          padding: 5,
          centerPointLabels: false
        }
      };
      static defaultRoutes = {
        "angleLines.color": "borderColor",
        "pointLabels.color": "color",
        "ticks.color": "color"
      };
      static descriptors = {
        angleLines: {
          _fallback: "grid"
        }
      };
      constructor(cfg) {
        super(cfg);
        this.xCenter = void 0;
        this.yCenter = void 0;
        this.drawingArea = void 0;
        this._pointLabels = [];
        this._pointLabelItems = [];
      }
      setDimensions() {
        const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
        const w = this.width = this.maxWidth - padding.width;
        const h = this.height = this.maxHeight - padding.height;
        this.xCenter = Math.floor(this.left + w / 2 + padding.left);
        this.yCenter = Math.floor(this.top + h / 2 + padding.top);
        this.drawingArea = Math.floor(Math.min(w, h) / 2);
      }
      determineDataLimits() {
        const { min: min2, max: max2 } = this.getMinMax(false);
        this.min = isNumberFinite(min2) && !isNaN(min2) ? min2 : 0;
        this.max = isNumberFinite(max2) && !isNaN(max2) ? max2 : 0;
        this.handleTickRangeOptions();
      }
      computeTickLimit() {
        return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
      }
      generateTickLabels(ticks) {
        LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
        this._pointLabels = this.getLabels().map((value, index7) => {
          const label = callback(this.options.pointLabels.callback, [
            value,
            index7
          ], this);
          return label || label === 0 ? label : "";
        }).filter((v, i) => this.chart.getDataVisibility(i));
      }
      fit() {
        const opts = this.options;
        if (opts.display && opts.pointLabels.display) {
          fitWithPointLabels(this);
        } else {
          this.setCenterPoint(0, 0, 0, 0);
        }
      }
      setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
        this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
        this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
        this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
      }
      getIndexAngle(index7) {
        const angleMultiplier = TAU / (this._pointLabels.length || 1);
        const startAngle = this.options.startAngle || 0;
        return _normalizeAngle(index7 * angleMultiplier + toRadians(startAngle));
      }
      getDistanceFromCenterForValue(value) {
        if (isNullOrUndef(value)) {
          return NaN;
        }
        const scalingFactor = this.drawingArea / (this.max - this.min);
        if (this.options.reverse) {
          return (this.max - value) * scalingFactor;
        }
        return (value - this.min) * scalingFactor;
      }
      getValueForDistanceFromCenter(distance) {
        if (isNullOrUndef(distance)) {
          return NaN;
        }
        const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
        return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
      }
      getPointLabelContext(index7) {
        const pointLabels = this._pointLabels || [];
        if (index7 >= 0 && index7 < pointLabels.length) {
          const pointLabel = pointLabels[index7];
          return createPointLabelContext(this.getContext(), index7, pointLabel);
        }
      }
      getPointPosition(index7, distanceFromCenter, additionalAngle = 0) {
        const angle = this.getIndexAngle(index7) - HALF_PI + additionalAngle;
        return {
          x: Math.cos(angle) * distanceFromCenter + this.xCenter,
          y: Math.sin(angle) * distanceFromCenter + this.yCenter,
          angle
        };
      }
      getPointPositionForValue(index7, value) {
        return this.getPointPosition(index7, this.getDistanceFromCenterForValue(value));
      }
      getBasePosition(index7) {
        return this.getPointPositionForValue(index7 || 0, this.getBaseValue());
      }
      getPointLabelPosition(index7) {
        const { left, top, right, bottom } = this._pointLabelItems[index7];
        return {
          left,
          top,
          right,
          bottom
        };
      }
      drawBackground() {
        const { backgroundColor, grid: { circular } } = this.options;
        if (backgroundColor) {
          const ctx = this.ctx;
          ctx.save();
          ctx.beginPath();
          pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
          ctx.closePath();
          ctx.fillStyle = backgroundColor;
          ctx.fill();
          ctx.restore();
        }
      }
      drawGrid() {
        const ctx = this.ctx;
        const opts = this.options;
        const { angleLines, grid, border } = opts;
        const labelCount = this._pointLabels.length;
        let i, offset3, position;
        if (opts.pointLabels.display) {
          drawPointLabels(this, labelCount);
        }
        if (grid.display) {
          this.ticks.forEach((tick, index7) => {
            if (index7 !== 0 || index7 === 0 && this.min < 0) {
              offset3 = this.getDistanceFromCenterForValue(tick.value);
              const context = this.getContext(index7);
              const optsAtIndex = grid.setContext(context);
              const optsAtIndexBorder = border.setContext(context);
              drawRadiusLine(this, optsAtIndex, offset3, labelCount, optsAtIndexBorder);
            }
          });
        }
        if (angleLines.display) {
          ctx.save();
          for (i = labelCount - 1; i >= 0; i--) {
            const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
            const { color: color2, lineWidth } = optsAtIndex;
            if (!lineWidth || !color2) {
              continue;
            }
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color2;
            ctx.setLineDash(optsAtIndex.borderDash);
            ctx.lineDashOffset = optsAtIndex.borderDashOffset;
            offset3 = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
            position = this.getPointPosition(i, offset3);
            ctx.beginPath();
            ctx.moveTo(this.xCenter, this.yCenter);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
          }
          ctx.restore();
        }
      }
      drawBorder() {
      }
      drawLabels() {
        const ctx = this.ctx;
        const opts = this.options;
        const tickOpts = opts.ticks;
        if (!tickOpts.display) {
          return;
        }
        const startAngle = this.getIndexAngle(0);
        let offset3, width;
        ctx.save();
        ctx.translate(this.xCenter, this.yCenter);
        ctx.rotate(startAngle);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        this.ticks.forEach((tick, index7) => {
          if (index7 === 0 && this.min >= 0 && !opts.reverse) {
            return;
          }
          const optsAtIndex = tickOpts.setContext(this.getContext(index7));
          const tickFont = toFont(optsAtIndex.font);
          offset3 = this.getDistanceFromCenterForValue(this.ticks[index7].value);
          if (optsAtIndex.showLabelBackdrop) {
            ctx.font = tickFont.string;
            width = ctx.measureText(tick.label).width;
            ctx.fillStyle = optsAtIndex.backdropColor;
            const padding = toPadding(optsAtIndex.backdropPadding);
            ctx.fillRect(-width / 2 - padding.left, -offset3 - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
          }
          renderText(ctx, tick.label, 0, -offset3, tickFont, {
            color: optsAtIndex.color,
            strokeColor: optsAtIndex.textStrokeColor,
            strokeWidth: optsAtIndex.textStrokeWidth
          });
        });
        ctx.restore();
      }
      drawTitle() {
      }
    };
    INTERVALS = {
      millisecond: {
        common: true,
        size: 1,
        steps: 1e3
      },
      second: {
        common: true,
        size: 1e3,
        steps: 60
      },
      minute: {
        common: true,
        size: 6e4,
        steps: 60
      },
      hour: {
        common: true,
        size: 36e5,
        steps: 24
      },
      day: {
        common: true,
        size: 864e5,
        steps: 30
      },
      week: {
        common: false,
        size: 6048e5,
        steps: 4
      },
      month: {
        common: true,
        size: 2628e6,
        steps: 12
      },
      quarter: {
        common: false,
        size: 7884e6,
        steps: 4
      },
      year: {
        common: true,
        size: 3154e7
      }
    };
    UNITS = /* @__PURE__ */ Object.keys(INTERVALS);
    TimeScale = class extends Scale {
      static id = "time";
      static defaults = {
        bounds: "data",
        adapters: {},
        time: {
          parser: false,
          unit: false,
          round: false,
          isoWeekday: false,
          minUnit: "millisecond",
          displayFormats: {}
        },
        ticks: {
          source: "auto",
          callback: false,
          major: {
            enabled: false
          }
        }
      };
      constructor(props) {
        super(props);
        this._cache = {
          data: [],
          labels: [],
          all: []
        };
        this._unit = "day";
        this._majorUnit = void 0;
        this._offsets = {};
        this._normalized = false;
        this._parseOpts = void 0;
      }
      init(scaleOpts, opts = {}) {
        const time = scaleOpts.time || (scaleOpts.time = {});
        const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
        adapter.init(opts);
        mergeIf(time.displayFormats, adapter.formats());
        this._parseOpts = {
          parser: time.parser,
          round: time.round,
          isoWeekday: time.isoWeekday
        };
        super.init(scaleOpts);
        this._normalized = opts.normalized;
      }
      parse(raw, index7) {
        if (raw === void 0) {
          return null;
        }
        return parse2(this, raw);
      }
      beforeLayout() {
        super.beforeLayout();
        this._cache = {
          data: [],
          labels: [],
          all: []
        };
      }
      determineDataLimits() {
        const options2 = this.options;
        const adapter = this._adapter;
        const unit = options2.time.unit || "day";
        let { min: min2, max: max2, minDefined, maxDefined } = this.getUserBounds();
        function _applyBounds(bounds) {
          if (!minDefined && !isNaN(bounds.min)) {
            min2 = Math.min(min2, bounds.min);
          }
          if (!maxDefined && !isNaN(bounds.max)) {
            max2 = Math.max(max2, bounds.max);
          }
        }
        if (!minDefined || !maxDefined) {
          _applyBounds(this._getLabelBounds());
          if (options2.bounds !== "ticks" || options2.ticks.source !== "labels") {
            _applyBounds(this.getMinMax(false));
          }
        }
        min2 = isNumberFinite(min2) && !isNaN(min2) ? min2 : +adapter.startOf(Date.now(), unit);
        max2 = isNumberFinite(max2) && !isNaN(max2) ? max2 : +adapter.endOf(Date.now(), unit) + 1;
        this.min = Math.min(min2, max2 - 1);
        this.max = Math.max(min2 + 1, max2);
      }
      _getLabelBounds() {
        const arr = this.getLabelTimestamps();
        let min2 = Number.POSITIVE_INFINITY;
        let max2 = Number.NEGATIVE_INFINITY;
        if (arr.length) {
          min2 = arr[0];
          max2 = arr[arr.length - 1];
        }
        return {
          min: min2,
          max: max2
        };
      }
      buildTicks() {
        const options2 = this.options;
        const timeOpts = options2.time;
        const tickOpts = options2.ticks;
        const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
        if (options2.bounds === "ticks" && timestamps.length) {
          this.min = this._userMin || timestamps[0];
          this.max = this._userMax || timestamps[timestamps.length - 1];
        }
        const min2 = this.min;
        const max2 = this.max;
        const ticks = _filterBetween(timestamps, min2, max2);
        this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min2)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
        this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
        this.initOffsets(timestamps);
        if (options2.reverse) {
          ticks.reverse();
        }
        return ticksFromTimestamps(this, ticks, this._majorUnit);
      }
      afterAutoSkip() {
        if (this.options.offsetAfterAutoskip) {
          this.initOffsets(this.ticks.map((tick) => +tick.value));
        }
      }
      initOffsets(timestamps = []) {
        let start = 0;
        let end = 0;
        let first, last;
        if (this.options.offset && timestamps.length) {
          first = this.getDecimalForValue(timestamps[0]);
          if (timestamps.length === 1) {
            start = 1 - first;
          } else {
            start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
          }
          last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
          if (timestamps.length === 1) {
            end = last;
          } else {
            end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
          }
        }
        const limit = timestamps.length < 3 ? 0.5 : 0.25;
        start = _limitValue(start, 0, limit);
        end = _limitValue(end, 0, limit);
        this._offsets = {
          start,
          end,
          factor: 1 / (start + 1 + end)
        };
      }
      _generate() {
        const adapter = this._adapter;
        const min2 = this.min;
        const max2 = this.max;
        const options2 = this.options;
        const timeOpts = options2.time;
        const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min2, max2, this._getLabelCapacity(min2));
        const stepSize = valueOrDefault(options2.ticks.stepSize, 1);
        const weekday = minor === "week" ? timeOpts.isoWeekday : false;
        const hasWeekday = isNumber2(weekday) || weekday === true;
        const ticks = {};
        let first = min2;
        let time, count;
        if (hasWeekday) {
          first = +adapter.startOf(first, "isoWeek", weekday);
        }
        first = +adapter.startOf(first, hasWeekday ? "day" : minor);
        if (adapter.diff(max2, min2, minor) > 1e5 * stepSize) {
          throw new Error(min2 + " and " + max2 + " are too far apart with stepSize of " + stepSize + " " + minor);
        }
        const timestamps = options2.ticks.source === "data" && this.getDataTimestamps();
        for (time = first, count = 0; time < max2; time = +adapter.add(time, stepSize, minor), count++) {
          addTick(ticks, time, timestamps);
        }
        if (time === max2 || options2.bounds === "ticks" || count === 1) {
          addTick(ticks, time, timestamps);
        }
        return Object.keys(ticks).sort(sorter).map((x) => +x);
      }
      getLabelForValue(value) {
        const adapter = this._adapter;
        const timeOpts = this.options.time;
        if (timeOpts.tooltipFormat) {
          return adapter.format(value, timeOpts.tooltipFormat);
        }
        return adapter.format(value, timeOpts.displayFormats.datetime);
      }
      format(value, format) {
        const options2 = this.options;
        const formats = options2.time.displayFormats;
        const unit = this._unit;
        const fmt = format || formats[unit];
        return this._adapter.format(value, fmt);
      }
      _tickFormatFunction(time, index7, ticks, format) {
        const options2 = this.options;
        const formatter = options2.ticks.callback;
        if (formatter) {
          return callback(formatter, [
            time,
            index7,
            ticks
          ], this);
        }
        const formats = options2.time.displayFormats;
        const unit = this._unit;
        const majorUnit = this._majorUnit;
        const minorFormat = unit && formats[unit];
        const majorFormat = majorUnit && formats[majorUnit];
        const tick = ticks[index7];
        const major = majorUnit && majorFormat && tick && tick.major;
        return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
      }
      generateTickLabels(ticks) {
        let i, ilen, tick;
        for (i = 0, ilen = ticks.length; i < ilen; ++i) {
          tick = ticks[i];
          tick.label = this._tickFormatFunction(tick.value, i, ticks);
        }
      }
      getDecimalForValue(value) {
        return value === null ? NaN : (value - this.min) / (this.max - this.min);
      }
      getPixelForValue(value) {
        const offsets = this._offsets;
        const pos = this.getDecimalForValue(value);
        return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
      }
      getValueForPixel(pixel) {
        const offsets = this._offsets;
        const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
        return this.min + pos * (this.max - this.min);
      }
      _getLabelSize(label) {
        const ticksOpts = this.options.ticks;
        const tickLabelWidth = this.ctx.measureText(label).width;
        const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
        const cosRotation = Math.cos(angle);
        const sinRotation = Math.sin(angle);
        const tickFontSize = this._resolveTickFontOptions(0).size;
        return {
          w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
          h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
        };
      }
      _getLabelCapacity(exampleTime) {
        const timeOpts = this.options.time;
        const displayFormats = timeOpts.displayFormats;
        const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
        const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
          exampleTime
        ], this._majorUnit), format);
        const size2 = this._getLabelSize(exampleLabel);
        const capacity = Math.floor(this.isHorizontal() ? this.width / size2.w : this.height / size2.h) - 1;
        return capacity > 0 ? capacity : 1;
      }
      getDataTimestamps() {
        let timestamps = this._cache.data || [];
        let i, ilen;
        if (timestamps.length) {
          return timestamps;
        }
        const metas = this.getMatchingVisibleMetas();
        if (this._normalized && metas.length) {
          return this._cache.data = metas[0].controller.getAllParsedValues(this);
        }
        for (i = 0, ilen = metas.length; i < ilen; ++i) {
          timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
        }
        return this._cache.data = this.normalize(timestamps);
      }
      getLabelTimestamps() {
        const timestamps = this._cache.labels || [];
        let i, ilen;
        if (timestamps.length) {
          return timestamps;
        }
        const labels = this.getLabels();
        for (i = 0, ilen = labels.length; i < ilen; ++i) {
          timestamps.push(parse2(this, labels[i]));
        }
        return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
      }
      normalize(values) {
        return _arrayUnique(values.sort(sorter));
      }
    };
    TimeSeriesScale = class extends TimeScale {
      static id = "timeseries";
      static defaults = TimeScale.defaults;
      constructor(props) {
        super(props);
        this._table = [];
        this._minPos = void 0;
        this._tableRange = void 0;
      }
      initOffsets() {
        const timestamps = this._getTimestampsForTable();
        const table = this._table = this.buildLookupTable(timestamps);
        this._minPos = interpolate2(table, this.min);
        this._tableRange = interpolate2(table, this.max) - this._minPos;
        super.initOffsets(timestamps);
      }
      buildLookupTable(timestamps) {
        const { min: min2, max: max2 } = this;
        const items = [];
        const table = [];
        let i, ilen, prev, curr, next;
        for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
          curr = timestamps[i];
          if (curr >= min2 && curr <= max2) {
            items.push(curr);
          }
        }
        if (items.length < 2) {
          return [
            {
              time: min2,
              pos: 0
            },
            {
              time: max2,
              pos: 1
            }
          ];
        }
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          next = items[i + 1];
          prev = items[i - 1];
          curr = items[i];
          if (Math.round((next + prev) / 2) !== curr) {
            table.push({
              time: curr,
              pos: i / (ilen - 1)
            });
          }
        }
        return table;
      }
      _generate() {
        const min2 = this.min;
        const max2 = this.max;
        let timestamps = super.getDataTimestamps();
        if (!timestamps.includes(min2) || !timestamps.length) {
          timestamps.splice(0, 0, min2);
        }
        if (!timestamps.includes(max2) || timestamps.length === 1) {
          timestamps.push(max2);
        }
        return timestamps.sort((a, b) => a - b);
      }
      _getTimestampsForTable() {
        let timestamps = this._cache.all || [];
        if (timestamps.length) {
          return timestamps;
        }
        const data = this.getDataTimestamps();
        const label = this.getLabelTimestamps();
        if (data.length && label.length) {
          timestamps = this.normalize(data.concat(label));
        } else {
          timestamps = data.length ? data : label;
        }
        timestamps = this._cache.all = timestamps;
        return timestamps;
      }
      getDecimalForValue(value) {
        return (interpolate2(this._table, value) - this._minPos) / this._tableRange;
      }
      getValueForPixel(pixel) {
        const offsets = this._offsets;
        const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
        return interpolate2(this._table, decimal * this._tableRange + this._minPos, true);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/wins/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
function useForwardEvents(getRef) {
  const destructors = [];
  onDestroy(() => {
    while (destructors.length) {
      destructors.pop()();
    }
  });
}
function clean(props2) {
  let { data: data2, type: type2, options: options2, plugins: plugins2, children, $$scope, $$slots, ...rest } = props2;
  return rest;
}
var eventPrefix, events, Chart$1, Line, chart, Chart2, css2, Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/wins/_page.svelte.js"() {
    init_ssr();
    init_chart();
    init_Card();
    eventPrefix = /^on/;
    events = [];
    Object.keys(globalThis).forEach((key2) => {
      if (eventPrefix.test(key2)) {
        events.push(key2.replace(eventPrefix, ""));
      }
    });
    Chart$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { type } = $$props;
      let { data = { datasets: [] } } = $$props;
      let { options: options2 = {} } = $$props;
      let { plugins = [] } = $$props;
      let { updateMode = void 0 } = $$props;
      let { chart: chart2 = null } = $$props;
      let canvasRef;
      let props = clean($$props);
      onDestroy(() => {
        if (chart2) chart2.destroy();
        chart2 = null;
      });
      useForwardEvents();
      if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0) $$bindings.plugins(plugins);
      if ($$props.updateMode === void 0 && $$bindings.updateMode && updateMode !== void 0) $$bindings.updateMode(updateMode);
      if ($$props.chart === void 0 && $$bindings.chart && chart2 !== void 0) $$bindings.chart(chart2);
      return `<canvas${spread([escape_object(props)], {})}${add_attribute("this", canvasRef, 0)}></canvas>`;
    });
    Line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      Chart.register(LineController);
      let { chart: chart2 = null } = $$props;
      let props;
      let baseChartRef;
      useForwardEvents();
      if ($$props.chart === void 0 && $$bindings.chart && chart2 !== void 0) $$bindings.chart(chart2);
      let $$settled;
      let $$rendered;
      let previous_head = $$result.head;
      do {
        $$settled = true;
        $$result.head = previous_head;
        props = $$props;
        $$rendered = `${validate_component(Chart$1, "Chart").$$render(
          $$result,
          Object.assign({}, { type: "line" }, props, { this: baseChartRef }, { chart: chart2 }),
          {
            this: ($$value) => {
              baseChartRef = $$value;
              $$settled = false;
            },
            chart: ($$value) => {
              chart2 = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      } while (!$$settled);
      return $$rendered;
    });
    chart = {
      labels: ["January 2012", "February 2012", "March 2012", "April 2012", "May 2012", "June 2012", "July 2012", "August 2012", "September 2012", "October 2012", "November 2012", "December 2012", "January 2013", "February 2013", "March 2013", "April 2013", "May 2013", "June 2013", "July 2013", "August 2013", "September 2013", "October 2013", "November 2013", "December 2013", "January 2014", "February 2014", "March 2014", "April 2014", "May 2014", "June 2014", "July 2014", "August 2014", "September 2014", "October 2014", "November 2014", "December 2014", "January 2015", "February 2015", "March 2015", "April 2015", "May 2015", "June 2015", "July 2015", "August 2015", "September 2015", "October 2015", "November 2015", "December 2015", "January 2016", "February 2016", "March 2016", "April 2016", "May 2016", "June 2016", "July 2016", "August 2016", "September 2016", "October 2016", "November 2016", "December 2016", "January 2017", "February 2017", "March 2017", "April 2017", "May 2017", "June 2017", "July 2017", "August 2017", "September 2017", "October 2017", "November 2017", "December 2017", "January 2018", "February 2018", "March 2018", "April 2018", "May 2018", "June 2018", "July 2018", "August 2018", "September 2018", "October 2018", "November 2018", "December 2018", "January 2019", "February 2019", "March 2019", "April 2019", "May 2019", "June 2019", "July 2019", "August 2019", "September 2019", "October 2019", "November 2019", "December 2019", "January 2020", "February 2020", "March 2020", "April 2020", "May 2020", "June 2020", "July 2020", "August 2020", "September 2020", "October 2020", "November 2020", "December 2020", "January 2021", "February 2021", "March 2021", "April 2021", "May 2021", "June 2021", "July 2021", "August 2021", "September 2021", "October 2021", "November 2021", "December 2021", "January 2022", "February 2022", "March 2022", "April 2022", "May 2022", "June 2022", "July 2022", "August 2022", "September 2022", "October 2022", "November 2022", "December 2022", "January 2023", "February 2023", "March 2023", "April 2023", "May 2023", "June 2023", "July 2023", "August 2023", "September 2023", "October 2023", "November 2023", "December 2023", "January 2024", "February 2024", "March 2024", "April 2024", "May 2024", "June 2024", "July 2024", "August 2024", "September 2024"],
      datasets: [
        {
          label: "GFriend",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(106,50,159)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(106,50,159)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          data: [
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            15,
            15,
            15,
            15,
            15,
            23,
            29,
            29,
            29,
            29,
            29,
            29,
            29,
            30,
            31,
            31,
            31,
            31,
            35,
            37,
            37,
            37,
            37,
            37,
            37,
            37,
            37,
            47,
            47,
            47,
            47,
            47,
            47,
            47,
            47,
            53,
            53,
            53,
            53,
            53,
            53,
            59,
            59,
            59,
            59,
            59,
            59,
            59,
            66,
            66,
            66,
            66,
            66,
            69,
            69,
            69,
            69,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71,
            71
          ]
        },
        {
          label: "TWICE",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(228,127,186)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(228,127,186)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          data: [
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            9,
            11,
            11,
            11,
            11,
            11,
            22,
            23,
            24,
            24,
            33,
            33,
            39,
            45,
            45,
            45,
            45,
            45,
            52,
            59,
            61,
            61,
            61,
            71,
            73,
            73,
            79,
            83,
            83,
            83,
            87,
            87,
            87,
            87,
            87,
            87,
            90,
            90,
            90,
            90,
            90,
            97,
            97,
            97,
            97,
            97,
            97,
            97,
            97,
            106,
            106,
            106,
            106,
            106,
            112,
            112,
            113,
            113,
            113,
            113,
            113,
            117,
            117,
            117,
            117,
            117,
            119,
            119,
            119,
            119,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121,
            121
          ]
        },
        {
          label: "Red Velvet",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(215, 0, 64)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(215, 0, 64)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          data: [
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            3,
            6,
            6,
            6,
            6,
            6,
            11,
            11,
            11,
            11,
            11,
            11,
            16,
            16,
            16,
            16,
            16,
            16,
            22,
            22,
            22,
            22,
            22,
            31,
            31,
            31,
            31,
            31,
            36,
            36,
            36,
            36,
            36,
            37,
            38,
            43,
            43,
            43,
            43,
            43,
            43,
            53,
            53,
            53,
            53,
            53,
            53,
            53,
            53,
            53,
            53,
            58,
            58,
            63,
            64,
            64,
            64,
            64,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            73,
            77,
            80,
            80,
            80,
            80,
            80,
            80,
            80,
            81,
            81,
            81,
            81,
            81,
            81,
            81,
            81,
            83,
            83,
            83,
            83,
            83,
            83,
            83,
            83,
            83,
            83,
            83,
            84,
            84,
            84,
            84,
            84,
            84,
            84,
            84,
            84,
            84
          ]
        },
        {
          label: "BLACKPINK",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(86, 101, 115)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(86, 101, 115)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          data: [
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            3,
            3,
            4,
            5,
            5,
            5,
            5,
            5,
            5,
            8,
            8,
            8,
            8,
            8,
            8,
            8,
            8,
            8,
            8,
            8,
            13,
            19,
            19,
            19,
            19,
            19,
            19,
            19,
            19,
            19,
            20,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            21,
            34,
            34,
            36,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            43,
            45,
            54,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60,
            60
          ]
        }
      ]
    };
    Chart2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      Chart.register(plugin_title, plugin_tooltip, plugin_legend, LineElement, LinearScale, PointElement, CategoryScale);
      const options2 = {
        responsive: true,
        interaction: false,
        scales: {
          y: { max: 150, min: 0, display: false },
          x: { display: false }
        }
      };
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      return `${validate_component(Card, "Card").$$render($$result, { size: "xxl" }, {}, {
        default: () => {
          return `${validate_component(Line, "Line").$$render($$result, { data: chart, options: options2 }, {}, {})}`;
        }
      })}`;
    });
    css2 = {
      code: "section.svelte-7w87tm{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:0.6}",
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport Chart from '../../lib/components/Chart.svelte';\\n\\timport '../../app.css';\\n<\/script>\\n<section>\\n\\t<p>This is incomplete i only added gfriend and the highest preforming gg so far</p>\\n<Chart />\\n\\n</section>\\n\\n<style>\\n\\tsection {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tflex: 0.6;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAWC,qBAAQ,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,GACP"}`
    };
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `<section class="svelte-7w87tm"><p data-svelte-h="svelte-1w46p3a">This is incomplete i only added gfriend and the highest preforming gg so far</p> ${validate_component(Chart2, "Chart").$$render($$result, {}, {}, {})} </section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    imports6 = ["_app/immutable/nodes/5.WR6mhrAi.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js", "_app/immutable/chunks/CTIfdKuQ.js", "_app/immutable/chunks/Cu52Q1Rw.js", "_app/immutable/chunks/DUjiu_U4.js"];
    stylesheets6 = ["_app/immutable/assets/5.520sU_rV.css", "_app/immutable/assets/app.ZtUZiSHB.css"];
    fonts6 = [];
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js
var require_other = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js
var require_mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class _KVError extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = _KVError.name;
        this.status = status;
      }
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve3) {
          resolve3(value);
        });
      }
      return new (P || (P = Promise))(function(resolve3, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve3(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = require_mime();
    var types_1 = require_types();
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      bypassCache: false
      // do not bypass Cloudflare's cache
    };
    var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : void 0,
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html"
    };
    function assignOptions(options2) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options2);
    }
    var mapRequestToAsset2 = (request, options2) => {
      options2 = assignOptions(options2);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options2.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options2.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    };
    exports.mapRequestToAsset = mapRequestToAsset2;
    function serveSinglePageApp(request, options2) {
      options2 = assignOptions(options2);
      request = mapRequestToAsset2(request, options2);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options2.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = (event, options2) => __awaiter(void 0, void 0, void 0, function* () {
      options2 = assignOptions(options2);
      const request = event.request;
      const ASSET_NAMESPACE = options2.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options2.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = false;
      let requestKey;
      if (options2.mapRequestToAsset) {
        requestKey = options2.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset2(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset2(request, options2);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options2.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options2.cacheControl) {
          case "function":
            return options2.cacheControl(request);
          case "object":
            return options2.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = (entityId = pathKey, validatorType = "strong") => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              return `W/${entityId}`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      };
      options2.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options2.cacheControl.bypassCache || options2.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options2.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = yield cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
            console.log("Body exists and environment supports readable streams. Body cancelled");
          } else {
            console.log("Environment doesnt support readable streams");
          }
          response = new Response(null, response);
        } else {
          let opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body2 = yield ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body2 === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body2);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", body2.length);
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey, "strong"));
          }
          response.headers.set("Cache-Control", `max-age=${options2.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag2 = formatETag(response.headers.get("etag"), "strong");
        let ifNoneMatch = cacheKey.headers.get("if-none-match");
        let proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag2) {
          if (ifNoneMatch && ifNoneMatch === etag2 && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag2, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options2.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    });
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
init_ssr2();
var base = "";
var assets = base;
var app_dir = "_app";
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta property="og:title" content="Buddyville" /> \n		<meta property="og:description" content="Dive into the world of GFriend! This fan page is dedicated to the girls history and achievements." /> \n		<meta property="og:image" content="https://assets.teenvogue.com/photos/5fa97b1cae4e8fa5ef375193/16:9/w_6575,h_3698,c_limit/GFRIEND%20Press%20Photo_Photo%20Credit%20SOURCE%20MUSIC%201.jpg" /> \n		<meta property="og:site" content="https://www.buddyville.xyz/" />\n		<meta property="og:type" content="image/jpg" />\n		<meta name="twitter:site" content="summary_large_image" />\n		<meta name="twitter:creator" content="terrifiedpigeon" />\n		<meta name="twitter:title" content="Buddyville" />\n		<meta name="twitter:description" content="TEST" />\n		<meta name="twitter:image:alt" content="Picture of gfriend" />\n		<meta charset="utf-8" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "wsq8j8"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let init2;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    init: init2,
    reroute,
    transport
  };
}

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return;
        case "ArrayBuffer":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names2 = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names2.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names2.has(thing)) {
      return names2.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        const typedArray = thing;
        return `new ${type}([${typedArray.toString()}])`;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names2.size) {
    const params = [];
    const statements = [];
    const values = [];
    names2.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}

// node_modules/devalue/src/base64.js
function encode64(arraybuffer) {
  const dv = new DataView(arraybuffer);
  let binaryString = "";
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    binaryString += String.fromCharCode(dv.getUint8(i));
  }
  return binaryToAscii(binaryString);
}
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function binaryToAscii(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 3) {
    const groupsOfSix = [void 0, void 0, void 0, void 0];
    groupsOfSix[0] = str.charCodeAt(i) >> 2;
    groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
    if (str.length > i + 1) {
      groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
    }
    if (str.length > i + 2) {
      groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += KEY_STRING[groupsOfSix[j]];
      }
    }
  }
  return out;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing)) return indexes.get(thing);
    if (thing === void 0) return UNDEFINED;
    if (Number.isNaN(thing)) return NAN;
    if (thing === Infinity) return POSITIVE_INFINITY;
    if (thing === -Infinity) return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;
    const index8 = p++;
    indexes.set(thing, index8);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index8] = `["${key2}",${flatten(value2)}]`;
        return index8;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0) str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const typedArray = thing;
          const base642 = encode64(typedArray.buffer);
          str = '["' + type + '","' + base642 + '"]';
          break;
        }
        case "ArrayBuffer": {
          const arraybuffer = thing;
          const base642 = encode64(arraybuffer);
          str = `["ArrayBuffer","${base642}"]`;
          break;
        }
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started) str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index8] = str;
    return index8;
  }
  const index7 = flatten(value);
  if (index7 < 0) return `${index7}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing instanceof String) return stringify_string(thing.toString());
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_exports();
init_chunks();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var BROWSER = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
var DATA_SUFFIX = "/__data.json";
var HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var ROUTE_SUFFIX = "/__route.js";
function has_resolution_suffix(pathname) {
  return pathname.endsWith(ROUTE_SUFFIX);
}
function add_resolution_suffix(pathname) {
  return pathname.replace(/\/$/, "") + ROUTE_SUFFIX;
}
function strip_resolution_suffix(pathname) {
  return pathname.slice(0, -ROUTE_SUFFIX.length);
}
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
  // Svelte also escapes < because the escape function could be called inside a `noscript` there
  // https://github.com/sveltejs/svelte/security/advisories/GHSA-8266-84wp-wv5c
  // However, that doesn't apply in SvelteKit
};
var escape_html_dict = {
  "&": "&amp;",
  "<": "&lt;"
};
var surrogates = (
  // high surrogate without paired low surrogate
  "[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]"
);
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|` + surrogates,
  "g"
);
var escape_html_regex = new RegExp(
  `[${Object.keys(escape_html_dict).join("")}]|` + surrogates,
  "g"
);
function escape_html(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  const escaped_str = str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return escaped_str;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message: escape_html(message) });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender2 = mod.prerender ?? state.prerender_default;
  if (prerender2 && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender2) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender2));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      `POST method not allowed. No form actions exist for ${"this page"}`
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id, transport) {
  const replacer = (thing) => {
    for (const key2 in transport) {
      const encoded = transport[key2].encode(thing);
      if (encoded) {
        return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
      }
    }
  };
  return try_serialize(data, (value) => uneval(value, replacer), route_id);
}
function stringify_action_response(data, route_id, transport) {
  const encoders = Object.fromEntries(
    Object.entries(transport).map(([key2, value]) => [key2, value.encode])
  );
  return try_serialize(data, (value) => stringify(value, encoders), route_id);
}
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`
      );
    }
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "") message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
function get_relative_path(from2, to2) {
  const from_parts = from2.split(/[/\\]/);
  const to_parts = to2.split(/[/\\]/);
  from_parts.pop();
  while (from_parts[0] === to_parts[0]) {
    from_parts.shift();
    to_parts.shift();
  }
  let i = from_parts.length;
  while (i--) from_parts[i] = "..";
  return from_parts.concat(to_parts).join("/");
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else if (url.protocol === "https:" || url.protocol === "http:") {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#Server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html(fetched.url, true)}"`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size2 = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size2 / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #script_src_needs_csp;
  /** @type {boolean} */
  #script_src_elem_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {boolean} */
  #style_src_needs_csp;
  /** @type {boolean} */
  #style_src_attr_needs_csp;
  /** @type {boolean} */
  #style_src_elem_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    const needs_csp = (directive) => !!directive && !directive.some((value) => value === "unsafe-inline");
    this.#script_src_needs_csp = needs_csp(effective_script_src);
    this.#script_src_elem_needs_csp = needs_csp(script_src_elem);
    this.#style_src_needs_csp = needs_csp(effective_style_src);
    this.#style_src_attr_needs_csp = needs_csp(style_src_attr);
    this.#style_src_elem_needs_csp = needs_csp(style_src_elem);
    this.#script_needs_csp = this.#script_src_needs_csp || this.#script_src_elem_needs_csp;
    this.#style_needs_csp = this.#style_src_needs_csp || this.#style_src_attr_needs_csp || this.#style_src_elem_needs_csp;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (!this.#script_needs_csp) return;
    const source = this.#use_hashes ? `sha256-${sha256(content)}` : `nonce-${this.#nonce}`;
    if (this.#script_src_needs_csp) {
      this.#script_src.push(source);
    }
    if (this.#script_src_elem_needs_csp) {
      this.#script_src_elem.push(source);
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (!this.#style_needs_csp) return;
    const source = this.#use_hashes ? `sha256-${sha256(content)}` : `nonce-${this.#nonce}`;
    if (this.#style_src_needs_csp) {
      this.#style_src.push(source);
    }
    if (this.#style_src_attr_needs_csp) {
      this.#style_src_attr.push(source);
    }
    if (this.#style_src_elem_needs_csp) {
      const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !this.#style_src_elem.includes(sha256_empty_comment_hash)) {
        this.#style_src_elem.push(sha256_empty_comment_hash);
      }
      if (source !== sha256_empty_comment_hash) {
        this.#style_src_elem.push(source);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content="${escape_html(content, true)}">`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender: prerender2 }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender2;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function generate_route_object(route, url, manifest2) {
  const { errors, layouts: layouts2, leaf } = route;
  const nodes = [...errors, ...layouts2.map((l) => l?.[1]), leaf[1]].filter((n) => typeof n === "number").map((n) => `'${n}': () => ${create_client_import(manifest2._.client.nodes?.[n], url)}`).join(",\n		");
  return [
    `{
	id: ${s(route.id)}`,
    `errors: ${s(route.errors)}`,
    `layouts: ${s(route.layouts)}`,
    `leaf: ${s(route.leaf)}`,
    `nodes: {
		${nodes}
	}
}`
  ].join(",\n	");
}
function create_client_import(import_path, url) {
  if (!import_path) return "Promise.resolve({})";
  if (import_path[0] === "/") {
    return `import('${import_path}')`;
  }
  if (assets !== "") {
    return `import('${assets}/${import_path}')`;
  }
  let path = get_relative_path(url.pathname, `${base}/${import_path}`);
  if (path[0] !== ".") path = `./${path}`;
  return `import('${path}')`;
}
async function resolve_route(resolved_path, url, manifest2) {
  if (!manifest2._.client.routes) {
    return text("Server-side route resolution disabled", { status: 400 });
  }
  let route = null;
  let params = {};
  const matchers = await manifest2._.matchers();
  for (const candidate of manifest2._.client.routes) {
    const match = candidate.pattern.exec(resolved_path);
    if (!match) continue;
    const matched = exec(match, candidate.params, matchers);
    if (matched) {
      route = candidate;
      params = decode_params(matched);
      break;
    }
  }
  return create_server_routing_response(route, params, url, manifest2).response;
}
function create_server_routing_response(route, params, url, manifest2) {
  const headers2 = new Headers({
    "content-type": "application/javascript; charset=utf-8"
  });
  if (route) {
    const csr_route = generate_route_object(route, url, manifest2);
    const body2 = `${create_css_import(route, url, manifest2)}
export const route = ${csr_route}; export const params = ${JSON.stringify(params)};`;
    return { response: text(body2, { headers: headers2 }), body: body2 };
  } else {
    return { response: text("", { headers: headers2 }), body: "" };
  }
}
function create_css_import(route, url, manifest2) {
  const { errors, layouts: layouts2, leaf } = route;
  let css3 = "";
  for (const node of [...errors, ...layouts2.map((l) => l?.[1]), leaf[1]]) {
    if (typeof node !== "number") continue;
    const node_css = manifest2._.client.css?.[node];
    for (const css_path of node_css ?? []) {
      css3 += `'${assets || base}/${css_path}',`;
    }
  }
  if (!css3) return "";
  return `${create_client_import(
    /** @type {string} */
    manifest2._.client.start,
    url
  )}.then(x => x.load_css([${css3}]));`;
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets7 = new Set(client.stylesheets);
  const fonts7 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  {
    if (!state.prerendering?.fallback) {
      const segments = event.url.pathname.slice(base.length).split("/").slice(2);
      base$1 = segments.map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
      if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
        assets$1 = base$1;
      }
    } else if (options2.hash_routing) {
      base_expression = "new URL('.', location).pathname.slice(0, -1)";
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    const render_opts = {
      context: /* @__PURE__ */ new Map([
        [
          "__request__",
          {
            page: props.page
          }
        ]
      ])
    };
    {
      try {
        rendered = options2.root.render(props, render_opts);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets7.add(url);
      for (const url of node.fonts) fonts7.add(url);
      if (node.inline_styles && !client.inline) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  const style = client.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(style);
    head += `
	<style${attributes.join("")}>${style}</style>`;
  }
  for (const dep of stylesheets7) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts7) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    csp,
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const route = manifest2._.client.routes?.find((r) => r.id === event.route.id) ?? null;
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${app_dir}/env.js`);
    }
    if (!client.inline) {
      const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
        (path) => resolve_opts.preload({ type: "js", path })
      );
      for (const path of included_modulepreloads) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (options2.preload_strategy !== "modulepreload") {
          head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
        } else if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    if (manifest2._.client.routes && state.prerendering && !state.prerendering.fallback) {
      const pathname = add_resolution_suffix(event.url.pathname);
      state.prerendering.dependencies.set(
        pathname,
        create_server_routing_response(route, event.params, new URL(pathname, event.url), manifest2)
      );
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (manifest2._.client.routes) {
        if (route) {
          const stringified = generate_route_object(route, event.url, manifest2).replaceAll(
            "\n",
            "\n							"
          );
          hydrate.push(`params: ${uneval(event.params)}`, `server_route: ${stringified}`);
        }
      } else if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    const boot = client.inline ? `${client.inline.script}

					__sveltekit_${options2.version_hash}.app.start(${args.join(", ")});` : client.app ? `Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    } else {
      blocks.push(boot);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
function get_data(event, options2, nodes, csp, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          const nonce = csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : "";
          push(`<script${nonce}>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id})`;
    } else {
      for (const key2 in options2.hooks.transport) {
        const encoded = options2.hooks.transport[key2].encode(thing);
        if (encoded) {
          return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
        }
      }
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    ...Object.fromEntries(
      Object.entries(options2.hooks.transport).map(([key2, value]) => [key2, value.encode])
    ),
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some(
      // prerender in case of trailingSlash because the client retrieves that value from the server
      (node) => node?.server?.load || node?.server?.trailingSlash !== void 0
    );
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      if (BROWSER && action_result && !event.request.headers.has("x-sveltekit-action")) ;
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(() => {
    });
    for (const p of load_promises) p.catch(() => {
    });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index7 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index7]();
              let j = i;
              while (!branch[j]) j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults2 = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const req_cookies = (0, import_cookie.parse)(header, { decode: opts?.decode });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    getAll(opts) {
      const cookies2 = (0, import_cookie.parse)(header, { decode: opts?.decode });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(
            " and "
          )}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults2, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults2, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type
              }
            });
          }
          return await fetch(request);
        }
        if (manifest2._.prerendered_routes.has(decoded) || decoded.at(-1) === "/" && manifest2._.prerendered_routes.has(decoded.slice(0, -1))) {
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config) continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  if (options2.hash_routing && url.pathname !== base + "/" && url.pathname !== "/[fallback]") {
    return text("Not found", { status: 404 });
  }
  let invalidated_data_nodes;
  const is_route_resolution_request = has_resolution_suffix(url.pathname);
  const is_data_request = has_data_suffix(url.pathname);
  if (is_route_resolution_request) {
    url.pathname = strip_resolution_suffix(url.pathname);
  } else if (is_data_request) {
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  let resolved_path;
  try {
    resolved_path = await options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  try {
    resolved_path = decode_pathname(resolved_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!resolved_path.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    resolved_path = resolved_path.slice(base.length) || "/";
  }
  if (is_route_resolution_request) {
    return resolve_route(resolved_path, new URL(request.url), manifest2);
  }
  if (resolved_path === `/${app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (resolved_path.startsWith(`/${app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(resolved_path);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare-workers"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (BROWSER) ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (BROWSER) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender2 = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender2 = node.prerender ?? prerender2;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender2 = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender2);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender: prerender2 });
        }
      }
    } else if (state.emulator?.platform) {
      event.platform = await state.emulator.platform({
        config: {},
        prerender: !!state.prerendering?.fallback
      });
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback) disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve22(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve22(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (options2.hash_routing || state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        const headers22 = new Headers(request.headers);
        headers22.set("x-sveltekit-error", "true");
        return await fetch(request, { headers: headers22 });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var init_promise;
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (read) {
      set_read_implementation(read);
    }
    await (init_promise ??= (async () => {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve22 }) => resolve22(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          }),
          transport: module.transport || {}
        };
        if (module.init) {
          await module.init();
        }
      } catch (error) {
        {
          throw error;
        }
      }
    })());
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/cloudflare-workers-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([".nojekyll"]),
    mimeTypes: {},
    _: {
      client: { start: "_app/immutable/entry/start.n5OF2YHI.js", app: "_app/immutable/entry/app.bN7uUzvf.js", imports: ["_app/immutable/entry/start.n5OF2YHI.js", "_app/immutable/chunks/ETQbwrEZ.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/J6ZmAdDH.js", "_app/immutable/entry/app.bN7uUzvf.js", "_app/immutable/chunks/CE_swLSu.js", "_app/immutable/chunks/BYLTsbat.js"], stylesheets: [], fonts: [], uses_env_dynamic_public: false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/timeline",
          pattern: /^\/timeline\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/timeline/gfriend_termination",
          pattern: /^\/timeline\/gfriend_termination\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/wins",
          pattern: /^\/wins\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        }
      ],
      prerendered_routes: /* @__PURE__ */ new Set([]),
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Map([]);
var base_path = "";

// .svelte-kit/cloudflare-workers-tmp/entry.js
var import_kv_asset_handler = __toESM(require_dist());
import static_asset_manifest_json from "__STATIC_CONTENT_MANIFEST";
var static_asset_manifest = JSON.parse(static_asset_manifest_json);
var server = new Server(manifest);
var app_path = `/${manifest.appPath}`;
var immutable = `${app_path}/immutable/`;
var version_file = `${app_path}/version.json`;
var entry_default = {
  /**
   * @param {Request} req
   * @param {any} env
   * @param {any} context
   */
  async fetch(req, env, context) {
    await server.init({ env });
    const url = new URL(req.url);
    if (url.pathname.startsWith(app_path)) {
      const res = await get_asset_from_kv(req, env, context);
      if (is_error(res.status)) return res;
      const cache_control = url.pathname.startsWith(immutable) ? "public, immutable, max-age=31536000" : "no-cache";
      return new Response(res.body, {
        headers: {
          // include original headers, minus cache-control which
          // is overridden, and etag which is no longer useful
          "cache-control": cache_control,
          "content-type": res.headers.get("content-type"),
          "x-robots-tag": "noindex"
        }
      });
    }
    let { pathname, search } = url;
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.slice(base_path.length + 1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html") || filename in manifest._.server_assets || filename + "/index.html" in manifest._.server_assets;
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      return get_asset_from_kv(req, env, context, (request, options2) => {
        if (prerendered.has(pathname)) {
          url.pathname = "/" + prerendered.get(pathname).file;
          return new Request(url.toString(), request);
        }
        return (0, import_kv_asset_handler.mapRequestToAsset)(request, options2);
      });
    } else if (location && prerendered.has(location)) {
      if (search) location += search;
      return new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    }
    return await server.respond(req, {
      platform: {
        env,
        context,
        // @ts-expect-error lib.dom is interfering with workers-types
        caches,
        // @ts-expect-error req is actually a Cloudflare request not a standard request
        cf: req.cf
      },
      getClientAddress() {
        return req.headers.get("cf-connecting-ip");
      }
    });
  }
};
async function get_asset_from_kv(req, env, context, map2 = import_kv_asset_handler.mapRequestToAsset) {
  return await (0, import_kv_asset_handler.getAssetFromKV)(
    {
      request: req,
      waitUntil(promise) {
        return context.waitUntil(promise);
      }
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: static_asset_manifest,
      mapRequestToAsset: map2
    }
  );
}
function is_error(status) {
  return status > 399;
}
export {
  entry_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@kurkle/color/dist/color.esm.js:
  (*!
   * @kurkle/color v0.3.4
   * https://github.com/kurkle/color#readme
   * (c) 2024 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.segment.js:
  (*!
   * Chart.js v4.4.8
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chart.js:
  (*!
   * Chart.js v4.4.8
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)
*/
//# sourceMappingURL=worker.js.map
